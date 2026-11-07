import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("region layouts and area/suburb hubs suppress duplicate component graphs", () => {
  for (const path of ["src/app/areas/page.tsx", "src/app/suburbs/page.tsx", "src/app/areas/[region]/page.tsx", "src/components/sections/ServiceRegionPageLayout.tsx"]) {
    const source = readFileSync(path, "utf8");
    assert.match(source, /<Breadcrumbs\s+includeSchema=\{false\}/);
  }
  for (const path of ["src/app/areas/page.tsx", "src/app/suburbs/page.tsx", "src/app/areas/[region]/page.tsx", "src/app/services/[service]/[region]/page.tsx"]) {
    const source = readFileSync(path, "utf8");
    assert.ok(source.includes("getBreadcrumbListSchema("));
    assert.ok(source.includes('type="application/ld+json"'));
  }
});
