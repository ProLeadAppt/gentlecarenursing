import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const dva = "https://www.dva.gov.au/what-we-help-with/care-at-home-and-aged-care-services/living-independently/dva-in-home-programs/community-nursing";
const oldDva = "https://www.dva.gov.au/get-support/health-support/help-cover-healthcare-costs/manage-your-health-care/community-nursing";

test("DVA programme references point directly to the current government source", () => {
  for (const path of ["src/content/services.ts", "public/ai-index.json", "public/llms-full.txt"]) {
    const contents = readFileSync(path, "utf8");
    assert.ok(contents.includes(dva), path);
    assert.ok(!contents.includes(oldDva), path);
  }
});

test("shared footer links to the canonical Munyal homepage without redirect", () => {
  const footer = readFileSync("src/components/layout/Footer.tsx", "utf8");
  assert.match(footer, /href="https:\/\/www\.munyal\.com\.au\/" target="_blank" rel="noopener noreferrer"/);
  assert.doesNotMatch(footer, /href="https:\/\/munyal\.com\.au"/);
});
