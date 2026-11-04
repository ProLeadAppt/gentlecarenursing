import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { sanitizeAnalyticsReferrer } from "../src/lib/analytics-attribution";
import { buildPageViewParameters } from "../src/lib/analytics-pageviews";
import { buildAnalyticsPayload } from "../src/lib/analytics";
import { checkAnalyticsRelease } from "../tools/lib/analytics-release";

const review = () => ({
  decision: "preserve_reviewed",
  observed_public_measurement_id: "G-SYNTHETIC123",
  verified_stream_measurement_id: "G-SYNTHETIC123",
  property_id: "12345", stream_id: "67890",
  ...Object.fromEntries(["property_stream_review", "privacy_and_consent_review", "enhanced_measurement_review", "runtime_payload_review", "intentional_pause_approval", "synthetic_preview_approval"].map((key) => [key, { reviewed_by: "SYNTHETIC TEST ONLY", reviewed_at: "2026-11-04", evidence_reference: "fixture://not-an-approval", source_sha256: "a".repeat(64) }])),
});
const input = () => ({ context: "production", enabledFlag: "true", measurementId: "G-SYNTHETIC123", review: review(), sourceDigest: "a".repeat(64), today: "2026-11-04" });

test("known search and AI referrers retain only their exact origin", () => {
  for (const host of ["www.google.com.au", "www.google.com", "www.bing.com", "duckduckgo.com", "search.yahoo.com", "chatgpt.com", "www.perplexity.ai"]) {
    assert.equal(sanitizeAnalyticsReferrer(`https://${host}/private-person?q=private@example.test#health-details`), `https://${host}/`);
  }
});

test("referrer sanitization rejects unknown hosts, credentials, ports and non-HTTPS values", () => {
  for (const value of [undefined, "", 123, "not a URL", "https://google.com.evil.example/", "https://private.google.com/", "https://user:secret@www.google.com/", "https://www.google.com:8443/", "http://www.google.com/", "javascript:alert(1)", "https://private-person.example/"]) {
    assert.equal(sanitizeAnalyticsReferrer(value), "");
  }
});

test("same-site referrers retain only exact public paths without query or fragment", () => {
  assert.equal(sanitizeAnalyticsReferrer("https://gentlecarenursing.com.au/contact?email=private@example.test#notes"), "https://gentlecarenursing.com.au/contact");
  for (const path of ["/private-person", "/review", "/%63ontact", "//outside.example/path"]) {
    assert.equal(sanitizeAnalyticsReferrer(`https://gentlecarenursing.com.au${path}`), "");
  }
});

test("pageview builder preserves coarse source without raw location, query or title", () => {
  assert.deepEqual(buildPageViewParameters("/contact?name=Private#notes", "https://www.google.com/search?q=private-health-details"), {
    page_path: "/contact", page_location: "https://gentlecarenursing.com.au/contact",
    page_title: "Gentle Care Nursing Services", page_referrer: "https://www.google.com/",
  });
});

test("service choices and linkable provider receipts are never analytics fields", () => {
  assert.deepEqual(buildAnalyticsPayload({ form_type: "contact", cta_location: "contact_form", service_type: "Complex Care", submission_id: "8dd9d328-72ca-4a29-8022-735693bd84f7", email: "private@example.test", notes: "private clinical details" }, "/contact"), {
    form_type: "contact", cta_location: "contact_form", page_path: "/contact",
  });
});

test("pending production review blocks silent shutdown and automatic legacy enable", () => {
  const checkedIn = JSON.parse(readFileSync("docs/seo/analytics-release-review.json", "utf8"));
  assert.deepEqual(checkedIn, { version: 1, decision: "pending" });
  const result = checkAnalyticsRelease({ ...input(), enabledFlag: undefined, measurementId: undefined, review: checkedIn });
  assert.equal(result.passed, false);
  assert.ok(result.issues.includes("ANALYTICS_CUTOVER_DECISION_PENDING"));
  assert.ok(result.issues.includes("ACTIVE_MEASUREMENT_WOULD_BE_DISABLED"));
});

test("only complete synthetic review plus matching enabled stream passes preservation", () => {
  assert.equal(checkAnalyticsRelease(input()).passed, true);
  for (const patch of [{ enabledFlag: undefined }, { enabledFlag: "false" }, { measurementId: "G-WRONG123" }, { measurementId: "UA-123" }, { context: undefined }]) {
    assert.equal(checkAnalyticsRelease({ ...input(), ...patch }).passed, false);
  }
});

test("missing evidence and future/invalid review dates block production", () => {
  for (const key of ["property_stream_review", "privacy_and_consent_review", "enhanced_measurement_review", "runtime_payload_review"]) {
    assert.equal(checkAnalyticsRelease({ ...input(), review: { ...review(), [key]: null } }).passed, false);
    for (const date of ["2027-01-01", "2026-02-30", "not a date"]) {
      assert.equal(checkAnalyticsRelease({ ...input(), review: { ...review(), [key]: { reviewed_by: "fixture", reviewed_at: date, evidence_reference: "fixture://only" } } }).passed, false);
    }
  }
});

test("intentional pause requires explicit disabled flag and real approval record", () => {
  const paused = { ...review(), decision: "disable_approved" };
  assert.equal(checkAnalyticsRelease({ ...input(), enabledFlag: "false", review: paused }).passed, true);
  assert.equal(checkAnalyticsRelease({ ...input(), enabledFlag: "false", review: { ...paused, intentional_pause_approval: null } }).passed, false);
  assert.equal(checkAnalyticsRelease({ ...input(), review: paused }).passed, false);
});

test("draft builds do not count as production approval", () => {
  const result = checkAnalyticsRelease({ context: "deploy-preview", enabledFlag: "false", measurementId: "", review: null });
  assert.equal(result.passed, true);
  assert.equal(result.production, false);
});

test("configured hosting build runs the production cutover guard first", () => {
  assert.match(readFileSync("netlify.toml", "utf8"), /command = "npm run build:release"/);
  const pkg = JSON.parse(readFileSync("package.json", "utf8"));
  assert.equal(pkg.scripts["build:release"], "npm run check:analytics-release && npm run build");
  assert.equal(pkg.scripts.build, "next build");
  assert.throws(() => execFileSync(process.execPath, ["--import", "tsx", "tools/check-analytics-release.ts"], {
    env: { ...process.env, CONTEXT: "production", NEXT_PUBLIC_ANALYTICS_ENABLED: "false", NEXT_PUBLIC_GA_ID: "" },
    stdio: "pipe",
  }), (error: unknown) => {
    const result = error as { status?: number; stdout?: Buffer };
    assert.equal(result.status, 1);
    assert.match(result.stdout?.toString() ?? "", /ACTIVE_MEASUREMENT_WOULD_BE_DISABLED/);
    return true;
  });
});


test("inherited or unspecified preview tracking cannot bypass a pending review", () => {
  const checkedIn = JSON.parse(readFileSync("docs/seo/analytics-release-review.json", "utf8"));
  for (const context of ["deploy-preview", "branch-deploy", "dev"]) {
    for (const enabledFlag of [undefined, "true"]) {
      const result = checkAnalyticsRelease({ ...input(), context, enabledFlag, review: checkedIn });
      assert.equal(result.passed, false);
      assert.ok(result.issues.includes("NONPRODUCTION_ANALYTICS_REQUIRES_REVIEW"));
      assert.equal(result.production, false);
    }
    assert.equal(checkAnalyticsRelease({ ...input(), context, enabledFlag: "false", review: checkedIn }).passed, true);
  }
});

test("a synthetic preview requires separate scoped review and never approves production", () => {
  const ready = { ...input(), context: "deploy-preview", review: { ...review(), runtime_payload_review: null } };
  assert.deepEqual(checkAnalyticsRelease(ready), { production: false, passed: true, issues: [] });
  assert.equal(checkAnalyticsRelease({ ...ready, review: { ...ready.review, synthetic_preview_approval: null } }).passed, false);
  assert.equal(checkAnalyticsRelease({ ...ready, context: "production" }).passed, false);
});

test("runtime evidence cannot be reused after source changes", () => {
  for (const sourceDigest of [undefined, "", "b".repeat(64)]) {
    assert.ok(checkAnalyticsRelease({ ...input(), sourceDigest }).issues.includes("PAYLOAD_REVIEW_SOURCE_MISMATCH"));
  }
});
