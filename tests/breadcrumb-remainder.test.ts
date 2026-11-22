import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("condition hub and suburb template keep canonical page schema and suppress duplicate component schema", () => {
  const conditions = readFileSync("src/app/conditions/page.tsx", "utf8");
  assert.match(conditions, /<Breadcrumbs\s+includeSchema=\{false\}/);
  assert.ok(conditions.includes("getBreadcrumbListSchema("));
  assert.ok(conditions.includes('type="application/ld+json"'));
  const suburb = readFileSync("src/app/suburbs/[suburb]/page.tsx", "utf8");
  const landing = readFileSync("src/components/sections/SuburbLandingPage.tsx", "utf8");
  assert.match(landing, /<Breadcrumbs\s+includeSchema=\{false\}/);
  assert.ok(suburb.includes("SuburbLandingPage"));
  assert.ok(suburb.includes("getBreadcrumbListSchema("));
  assert.ok(suburb.includes("documentSchemas={schemas}"));
  assert.ok(!suburb.includes("LocalCarePilotPage"));
});
