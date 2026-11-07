import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { getAllSuburbSlugs } from "../src/content/suburbs";

const source = readFileSync("src/app/suburbs/[suburb]/page.tsx", "utf8");
test("suburb service uses Service vocabulary and retains the provider and served Place", () => {
  assert.ok(source.includes('"@type": "Service"'));
  assert.ok(!source.includes('"@type": "MedicalService"'));
  assert.ok(source.includes('"@id": `${canonical}#place`'));
  assert.ok(source.includes('"@id": `${INTEGRATIONS.siteUrl}/#organization`'));
});
test("technical suburb schema fix does not activate pilot or private draft routes", () => {
  assert.equal(getAllSuburbSlugs().length, 15);
  for (const term of ["LocalCarePilotPage", "local-care-pilot", "coverage-register", "content-review", "all-locality-drafts"]) {
    assert.ok(!source.includes(term), term);
  }
  assert.ok(source.includes('if (!entry) notFound();'));
});
