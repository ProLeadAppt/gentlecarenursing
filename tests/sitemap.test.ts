import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import sitemap from "../src/app/sitemap";

test("sitemap includes the public services linked from navigation and service pages", () => {
  const urls = new Set(sitemap().map((entry) => new URL(entry.url).pathname));
  for (const slug of ["nursing-care", "personal-care", "assistance-with-daily-living", "overnight-support", "community-participation"]) {
    assert.ok(existsSync(`src/app/services/${slug}/page.tsx`));
    assert.ok(urls.has(`/services/${slug}`), `Missing public service: ${slug}`);
  }
});

// A shared site timestamp cannot establish when every page changed.
test("static sitemap routes omit unsupported freshness dates", () => {
  for (const entry of sitemap().filter((entry) => !new URL(entry.url).pathname.startsWith("/blog/"))) {
    assert.equal(entry.lastModified, undefined, `Unsupported lastmod: ${entry.url}`);
  }
});

test("article sitemap entries retain recorded content dates", () => {
  const articles = sitemap().filter((entry) => new URL(entry.url).pathname.startsWith("/blog/"));
  assert.ok(articles.length > 0);
  for (const entry of articles) {
    assert.ok(entry.lastModified instanceof Date);
    assert.ok(Number.isFinite(entry.lastModified.getTime()));
  }
});
