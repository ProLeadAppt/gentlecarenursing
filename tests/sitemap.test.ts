import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import sitemap from "../src/app/sitemap";

test("sitemap includes the public services linked in the main navigation", () => {
  const urls = new Set(sitemap().map((entry) => new URL(entry.url).pathname));
  for (const slug of ["nursing-care", "personal-care", "overnight-support", "community-participation"]) {
    assert.ok(existsSync(`src/app/services/${slug}/page.tsx`));
    assert.ok(urls.has(`/services/${slug}`), `Missing public service: ${slug}`);
  }
});
