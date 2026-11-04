import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// Keep response wording consistent across marketing and legal pages.
// Runtime output must also be checked after an approved release.
const responseCopyFiles = [
  "src/app/terms/page.tsx",
  "src/content/services.ts", "src/content/conditions.ts",
  "src/content/service-regions.ts", "src/content/about.ts", "src/content/faq.ts",
  "src/content/blog.ts", "src/content/areas-content.ts", "src/content/homepage.ts",
  "src/content/suburbs.ts", "src/lib/constants.ts",
  ...["QuickResponseSection", "ReferralSection", "ServiceRegionPageLayout",
    "TrustMarquee", "ProcessTimeline", "PhilosophyJourney", "HomepageCtaSections",
    "ProcessSteps", "HomePageContent", "CredentialsSection", "ServicePageLayout"]
    .map((name) => `src/components/sections/${name}.tsx`),
  "src/components/ui/FloatingContact.tsx",
  ...["contact", "areas/[region]", "suburbs/[suburb]", "services", "referrers"]
    .map((path) => `src/app/${path}/page.tsx`),
];

for (const path of responseCopyFiles) {
  test(`${path} does not restore an unapproved response or start-time promise`, () => {
    const source = readFileSync(path, "utf8");
    assert.doesNotMatch(source, /within\s+(?:24(?:\s*(?:to|–|-)\s*48)?\s*(?:hours?|hrs?)|48\s*hours?|minutes|a few days|days)/i);
    assert.doesNotMatch(source, /~24hr|same-day response|always respond|immediate nursing response|no waitlists/i);
  });
}

test("response copy explains availability rather than inventing an SLA", () => {
  for (const path of ["src/content/services.ts", "src/content/conditions.ts", "src/content/service-regions.ts", "src/content/faq.ts"]) {
    assert.match(readFileSync(path, "utf8"), /discuss availability and next steps/);
  }
});
