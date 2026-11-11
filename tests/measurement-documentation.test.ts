import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import originalDocs from "./fixtures/measurement-docs-original.json";
import baseline from "./fixtures/complete-baseline.json";

const spec = readFileSync("docs/seo/measurement-specification.md", "utf8");
const report = readFileSync("docs/seo/monthly-report-template.md", "utf8");
const analytics = readFileSync("src/lib/analytics.ts", "utf8");
const submission = readFileSync("src/lib/submission.ts", "utf8");
const client = readFileSync("src/lib/form-client.ts", "utf8");

// These checks guard the documented source contract. They do not verify GA4,
// a production deployment, provider acceptance, inbox delivery or qualification.
test("measurement docs: preserve genuine originals against the immutable pre-presentation fixture", () => {
  assert.deepEqual(Object.keys(originalDocs).sort(), [
    "docs/seo/measurement-specification.md",
    "docs/seo/monthly-report-template.md",
  ]);
  for (const [path, text] of Object.entries(originalDocs)) {
    assert.equal(createHash("sha256").update(text).digest("hex"), baseline.unchangedFiles[path as keyof typeof baseline.unchangedFiles], path);
  }
});

test("measurement docs: current delivery uses Resend rather than a generated GHL website ID", () => {
  assert.match(submission, /https:\/\/api\.resend\.com\/emails/);
  assert.match(submission, /submissionId: receipt\.id/);
  assert.doesNotMatch(submission, /websiteSubmissionId|randomUUID|ghl|GoHighLevel/i);
  assert.match(spec, /GoHighLevel is not used by the current `\/api\/submit` delivery path/);
  assert.match(spec, /not a newly generated browser ID/);
  assert.doesNotMatch(spec + report, /accepted by GoHighLevel|receives a random|Count GHL records|Confirmed GHL total|reconcile to GHL|defined in GHL/i);
});

test("measurement docs: acceptance, receipt, qualification and care outcomes remain separate", () => {
  for (const phrase of ["Provider-accepted enquiry", "Inbox-confirmed enquiry", "Qualified enquiry", "Booked assessment or commenced care"]) assert.ok(spec.includes(phrase), phrase);
  assert.match(spec, /does not confirm inbox receipt, a booking or service availability/);
  assert.match(spec, /Clinical suitability/i);
  assert.match(client, /result\.success !== true/);
  assert.match(client, /!UUID_PATTERN\.test\(result\.submissionId\)/);
});

test("measurement docs: every existing analytics event is documented without adding an event", () => {
  const eventBlock = analytics.split("export type AnalyticsParameters")[0];
  const names = [...eventBlock.matchAll(/\| "([a-z_]+)"/g)].map(match => match[1]);
  assert.equal(names.length, 8);
  for (const name of names) assert.ok(spec.includes(`\`${name}\``), name);
  assert.match(spec, /Their implemented meaning is provider acceptance observed by the browser/);
  assert.match(spec, /does not deduplicate separate submissions/);
});

test("measurement docs: all four current acceptance call sites and CTA locations are covered", () => {
  for (const [component, event, locations] of [
    ["SimpleContactForm", "generate_lead", ["homepage"]],
    ["ContactForm", "generate_lead", ["contact_form"]],
    ["ReferralForm", "referral_submit", ["referral_form", "compact_referral_form"]],
    ["ReferralConcierge", "referral_submit", ["referral_concierge"]],
  ] as const) {
    const source = readFileSync(`src/components/forms/${component}.tsx`, "utf8");
    assert.ok(source.indexOf("await submitWebsiteForm(") < source.indexOf(`dispatchAnalyticsEvent("${event}"`), component);
    assert.ok(source.includes(`dispatchAnalyticsEvent("${event}"`), component);
    const row = spec.split("\n").find(line => line.startsWith(`| ${component} |`));
    assert.ok(row, component);
    assert.ok(row.includes(`\`${event}\``), component);
    for (const location of locations) {
      assert.ok(source.includes(`"${location}"`), location);
      assert.ok(row.includes(`\`${location}\``), location);
    }
  }
});

test("measurement docs: helper allowlist is documented without promising sensitive-value detection", () => {
  const block = analytics.match(/const APPROVED_PARAMETER_KEYS = new Set<string>\(\[([\s\S]*?)\]\)/)?.[1];
  assert.ok(block);
  const keys = [...block.matchAll(/"([a-z_]+)"/g)].map(match => match[1]);
  assert.equal(keys.length, 6);
  for (const key of keys) assert.ok(spec.includes(`\`${key}\``), key);
  assert.match(spec, /allowlist, not a general detector of sensitive values/);
  assert.match(spec, /Do not publish receipt IDs/);
  assert.match(spec, /Do not copy email bodies, API keys, idempotency keys or credentials/);
});

test("measurement docs: reporting deduplicates receipts without equating them to people or outcomes", () => {
  assert.match(submission, /Idempotency-Key/);
  assert.match(submission, /24h/);
  assert.match(spec, /distinct provider receipt IDs/i);
  assert.match(spec, /deduplicates these for 24 hours/);
  assert.match(spec, /does not deduplicate people or care episodes/);
  assert.match(spec, /Do not simply sum raw event counts/);
  assert.match(report, /Count distinct receipt IDs rather than summing raw GA4 event counts/);
});

test("measurement docs: uncertain outcomes and missing data are not non-delivery or zero", () => {
  assert.match(spec, /A form error or timeout can have an uncertain provider outcome/);
  assert.match(spec, /Missing values remain \*\*unavailable\*\*, not zero/);
  assert.match(report, /Use \*\*unavailable\*\*, not zero/);
  assert.match(report, /A timeout or missing GA4 event does not establish non-delivery/);
  assert.match(spec, /Code tests use synthetic inputs and mocked delivery/);
});

test("measurement docs: reporting does not authorise configuration or invent campaign attribution", () => {
  assert.match(spec, /No settings change is authorised by this specification/);
  assert.match(spec, /Do not register the receipt-level `submission_id` as a routine high-cardinality reporting dimension/);
  assert.match(spec, /current form payload does not forward UTMs to Resend/);
  assert.match(report, /Current form payloads do not forward UTMs to Resend/);
  assert.doesNotMatch(submission, /utm_source|utm_medium|utm_campaign/);
});

test("measurement docs: report retains distinct raw, deduplicated and later operational measures", () => {
  for (const phrase of ["Distinct provider receipt IDs", "Raw GA4 acceptance events", "Distinct GA4 receipt IDs", "Matched provider/GA4 receipt IDs", "Inbox-confirmed enquiries", "Qualified enquiries", "Booked assessments", "Provider acceptance on authorised tests", "Inbox receipt on authorised tests"]) assert.ok(report.includes(phrase), phrase);
  assert.match(report, /Clicks, not connected calls/);
  assert.match(report, /Clicks, not sent emails/);
  assert.match(report, /measurement-specification\.md/);
});
