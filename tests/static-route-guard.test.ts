import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("finite content route families reject non-generated parameters", () => {
  for (const path of ["areas/[region]", "blog/[slug]", "conditions/[condition]", "services/[service]/[region]", "suburbs/[suburb]"]) {
    const source = readFileSync(`src/app/${path}/page.tsx`, "utf8");
    assert.match(source, /export const dynamicParams = false;/);
    assert.match(source, /export (?:async )?function generateStaticParams/);
    assert.ok(source.includes("notFound()"));
  }
});
