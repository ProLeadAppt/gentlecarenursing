import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("condition hub and suburb template keep canonical page schema and suppress duplicate component schema", () => {
  for (const path of ["src/app/conditions/page.tsx", "src/app/suburbs/[suburb]/page.tsx"]) {
    const source = readFileSync(path, "utf8");
    assert.match(source, /<Breadcrumbs\s+includeSchema=\{false\}/);
    assert.ok(source.includes("getBreadcrumbListSchema("));
    assert.ok(source.includes('type="application/ld+json"'));
    assert.ok(!source.includes("LocalCarePilotPage"));
  }
});
