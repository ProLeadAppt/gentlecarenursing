import test from "node:test";
import assert from "node:assert/strict";
import {
  inspectSeoHtml,
  isCanonicalMatch,
  normaliseAustralianPhone,
  parseSitemapUrls,
  rebaseUrlForAudit,
} from "../src/lib/seo-audit";

test("parseSitemapUrls extracts and deduplicates canonical URLs", () => {
  const xml = `<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url><loc>https://gentlecarenursing.com.au/</loc></url>
    <url><loc>https://gentlecarenursing.com.au/dva</loc></url>
    <url><loc>https://gentlecarenursing.com.au/dva</loc></url>
  </urlset>`;

  assert.deepEqual(parseSitemapUrls(xml), [
    "https://gentlecarenursing.com.au/",
    "https://gentlecarenursing.com.au/dva",
  ]);
});

test("inspectSeoHtml captures metadata, headings, schema and conversion facts", () => {
  const html = `<!doctype html><html><head>
    <title>DVA Community Nursing Sydney</title>
    <meta name="description" content="DVA nursing at home in Sydney.">
    <meta name="robots" content="index, follow">
    <meta property="og:url" content="https://gentlecarenursing.com.au/dva">
    <link rel="canonical" href="https://gentlecarenursing.com.au/dva">
    <script type="application/ld+json">{"@context":"https://schema.org","@type":["Organization","MedicalBusiness"],"telephone":"1300 004 267"}</script>
  </head><body><main><h1>DVA Community Nursing</h1><a href="tel:+611300004267">1300 004 267</a></main></body></html>`;

  assert.deepEqual(inspectSeoHtml(html), {
    title: "DVA Community Nursing Sydney",
    description: "DVA nursing at home in Sydney.",
    canonical: "https://gentlecarenursing.com.au/dva",
    ogUrl: "https://gentlecarenursing.com.au/dva",
    robots: "index, follow",
    h1Count: 1,
    schemaTypes: ["MedicalBusiness", "Organization"],
    unfinishedMarkers: [],
    visiblePhones: ["1300 004 267"],
    telephoneLinks: ["+611300004267"],
  });
});

test("inspectSeoHtml flags unfinished editorial markers", () => {
  const html = `<html><head><title>Page</title></head><body><main><h1>Page</h1><p>TODO: add real quote</p></main></body></html>`;
  const result = inspectSeoHtml(html);
  assert.deepEqual(result.unfinishedMarkers, ["TODO", "real quote"]);
});

test("normaliseAustralianPhone treats domestic and international 1300 numbers as equal", () => {
  assert.equal(normaliseAustralianPhone("1300 004 267"), "1300004267");
  assert.equal(normaliseAustralianPhone("+61 1300 004 267"), "1300004267");
  assert.equal(normaliseAustralianPhone("+61 400 000 000"), "0400000000");
});

test("isCanonicalMatch allows only the root trailing-slash equivalent", () => {
  assert.equal(
    isCanonicalMatch("https://gentlecarenursing.com.au/", "https://gentlecarenursing.com.au"),
    true
  );
  assert.equal(
    isCanonicalMatch("https://gentlecarenursing.com.au/dva/", "https://gentlecarenursing.com.au/dva"),
    false
  );
});

test("rebaseUrlForAudit points production sitemap URLs at a local build", () => {
  assert.equal(
    rebaseUrlForAudit(
      "https://gentlecarenursing.com.au/services?x=1",
      "http://127.0.0.1:3100"
    ),
    "http://127.0.0.1:3100/services?x=1"
  );
});
