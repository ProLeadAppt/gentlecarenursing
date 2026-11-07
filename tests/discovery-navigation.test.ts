import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { SERVICE_REGION_PAGES } from "../src/content/service-regions";
import { getAllAreaSlugs } from "../src/content/areas-content";

// Integration build audit verifies final rendered anchors and homepage reachability.
test("footer connects to existing condition and suburb hubs, never draft pages", () => {
  const source = readFileSync("src/components/layout/Footer.tsx", "utf8");
  const defaults = source.split("const defaultInfoLinks:")[1].split("];", 1)[0];
  for (const path of ["/conditions", "/suburbs"]) {
    assert.ok(defaults.includes(`href: "${path}"`));
    assert.ok(readFileSync(`src/app${path}/page.tsx`, "utf8"));
  }
  assert.doesNotMatch(defaults, /content-review|coverage-register/);
});
test("regional guide navigation covers all 30 existing routes with matching regions", () => {
  const source = readFileSync("src/app/areas/[region]/page.tsx", "utf8");
  assert.match(source, /SERVICE_REGION_PAGES\.filter\(\(page\) => page\.regionSlug === area\.slug\)/);
  assert.match(source, /<Link href=\{page\.path\}/);
  assert.doesNotMatch(source, /coverage-registry|service-track-drafts/);
  const paths = new Set<string>();
  for (const region of getAllAreaSlugs()) {
    const pages = SERVICE_REGION_PAGES.filter((page) => page.regionSlug === region);
    assert.equal(pages.length, 5);
    for (const page of pages) {
      assert.equal(page.path, `/services/${page.serviceSlug}/${region}`);
      assert.ok(page.service.shortTitle.trim());
      paths.add(page.path);
    }
  }
  assert.equal(paths.size, 30);
});
