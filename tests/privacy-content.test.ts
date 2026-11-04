import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = (path: string) => readFileSync(path, "utf8");

test("privacy notice describes the implemented email path and minimises sensitive input", () => {
  const privacy = source("src/app/privacy/page.tsx");
  assert.match(privacy, /Resend/);
  assert.match(privacy, /receiving email service/);
  assert.match(privacy, /United States/);
  assert.match(privacy, /https:\/\/resend\.com\/security\/gdpr/);
  assert.doesNotMatch(privacy, /deleted after 30 days|stored only in Australia/i);
  assert.match(privacy, /does not confirm inbox receipt/);
  assert.match(privacy, /Do not include detailed medical records/);
  assert.match(privacy, /permission or the authority/);
  assert.match(privacy, /When analytics is enabled/);
  assert.doesNotMatch(privacy, /GoHighLevel|secure storage|staff training|we do not sell/i);
});

test("terms do not promise universal professional registration or automatic funding eligibility", () => {
  const terms = source("src/app/terms/page.tsx");
  assert.doesNotMatch(terms, /All services\s+are delivered by qualified, registered professionals/);
  assert.match(terms, /provider arrangements must be checked/);
  assert.match(terms, /Response and care-start times depend/);
});

test("service pages do not recycle a global date as clinical review evidence", () => {
  const layout = source("src/components/sections/ServicePageLayout.tsx");
  assert.doesNotMatch(layout, /SITE_LAST_UPDATED/);
  assert.match(layout, /data\.reviewedAt && data\.reviewer/);
  assert.doesNotMatch(source("src/content/services.ts"), /reviewedAt:/);
  assert.match(layout, /General information only/);
});

test("articles preserve publication dates without implying fresh clinical validation", () => {
  const blog = source("src/content/blog.ts");
  assert.match(blog, /publishedAt: "2025-/);
  assert.doesNotMatch(blog, /role: "Clinical Team"|our clinical director/);
  const layout = source("src/components/sections/BlogPostLayout.tsx");
  assert.match(layout, /not individual medical or/);
  assert.match(layout, /publication date shown above/);
});

test("placeholder biographies and universal compliance claims are removed", () => {
  const about = source("src/content/about.ts");
  assert.doesNotMatch(about, /TEAM_MEMBERS|name: "Sandra"|compliant with all relevant industry standards/i);
});


test("FAQ and area pages omit unsupported global freshness dates", () => {
  for (const path of ["src/app/faq/page.tsx", "src/app/areas/[region]/page.tsx", "src/lib/constants.ts"]) {
    assert.doesNotMatch(source(path), /SITE_LAST_UPDATED/);
  }
});
