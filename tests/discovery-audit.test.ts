import test from "node:test";
import assert from "node:assert/strict";
import { auditDiscovery, type DiscoveryInput } from "../src/lib/discovery-audit";

const origin = "https://gentlecarenursing.com.au";
function html(path: string, extra = "", schema: unknown = { "@type": "Organization", "@id": `${origin}/#organization`, name: "Gentle Care Nursing" }) {
  return `<html><head><title>Care page</title><meta name="description" content="A useful description"><link rel="canonical" href="${origin}${path}">${extra}<script type="application/ld+json">${JSON.stringify(schema)}</script></head><body><a href="/">Home</a></body></html>`;
}
function input(): DiscoveryInput {
  return { origin, pages: [{ path: "/", html: html("/") }], sitemap: `<urlset><url><loc>${origin}/</loc></url></urlset>`, robots: `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml` };
}
const codes = (value: DiscoveryInput) => auditDiscovery(value).issues.map((issue) => issue.code);

test("healthy static build passes", () => assert.equal(auditDiscovery(input()).passed, true));
test("missing metadata and malformed canonical fail without throwing", () => {
  const value = input(); value.pages[0].html = '<link rel="canonical" href="%%%">';
  assert.deepEqual(codes(value).sort(), ["INVALID_CANONICAL", "MISSING_DESCRIPTION", "MISSING_JSON_LD", "MISSING_TITLE"].sort());
});
test("draft sitemap, schema and public links are blocked", () => {
  const value = input(); value.pages[0].html += '<a href="/content-review/care">Draft</a>';
  value.pages.push({ path: "/content-review/care", html: html("/content-review/care") });
  value.sitemap += `<loc>${origin}/content-review/care</loc>`;
  for (const code of ["DRAFT_IN_SITEMAP", "DRAFT_INDEXABLE", "DRAFT_HAS_PAGE_SCHEMA", "PUBLIC_LINK_TO_DRAFT"]) assert.ok(codes(value).includes(code));
});
test("hidden draft requires noindex but not JSON-LD", () => {
  const value = input(); value.pages.push({ path: "/content-review", html: html("/content-review", '<meta name="robots" content="noindex,nofollow">').replace(/<script[\s\S]*?<\/script>/, "") });
  assert.equal(auditDiscovery(value).passed, true);
});
test("patient feedback review is not confused with draft workspace", () => {
  const value = input(); value.pages.push({ path: "/review", html: html("/review", '<meta name="robots" content="noindex">') });
  assert.equal(auditDiscovery(value).passed, true);
});
test("checks all bot directives, noindex sitemap conflicts and blocked robots", () => {
  const value = input(); value.pages[0].html = html("/", '<meta name="robots" content="index"><meta name="googlebot" content="none">'); value.robots += '\nDisallow: /';
  assert.ok(codes(value).includes("NOINDEX_IN_SITEMAP")); assert.ok(codes(value).includes("ROBOTS_BLOCKS_SITE"));
});
test("business IDs and nested draft references cannot diverge", () => {
  const value = input(); value.pages[0].html = html("/", "", [{ "@type": "Organization", name: "Gentle Care Nursing", "@id": `${origin}/#organization` }, { "@type": "MedicalBusiness", name: "Gentle Care Nursing", "@id": `${origin}/#business`, provider: { url: `${origin}/content-review/test` } }]);
  for (const code of ["CONFLICTING_BUSINESS_IDS", "CONFLICTING_BUSINESS_REFERENCE", "DRAFT_SCHEMA_REFERENCE"]) assert.ok(codes(value).includes(code));
});
test("finds broken relative links and orphan pages, accepts assets and redirects", () => {
  const value = input(); value.pages.push({ path: "/orphan", html: html("/orphan", '<a href="missing">Missing</a>') }); value.sitemap += `<loc>${origin}/orphan</loc>`;
  value.pages[0].html += '<a href="/file.pdf">PDF</a><a href="/old-page">Redirect</a><a href="mailto:a@example.com">Email</a>';
  value.resources = ["/file.pdf", "/old-page"];
  assert.equal(auditDiscovery(value).issues.filter((issue) => issue.code === "UNRESOLVED_INTERNAL_LINK").length, 1);
  assert.ok(codes(value).includes("UNREACHABLE_FROM_HOME"));
});
test("ignores script strings, detects duplicate tags and invalid schema", () => {
  const value = input(); value.pages[0].html += `<script>var content='<a href="/fake">';</script><link rel="canonical" href="${origin}/"><script type="application/ld+json">{broken}</script>`;
  assert.ok(codes(value).includes("MULTIPLE_CANONICALS")); assert.ok(codes(value).includes("INVALID_JSON_LD")); assert.ok(!codes(value).includes("UNRESOLVED_INTERNAL_LINK"));
});
test("dynamic HTML remains explicitly unverified", () => { const value = input(); value.unrenderedRoutes = ["/content-review/[slug]"]; assert.ok(codes(value).includes("UNVERIFIED_DYNAMIC_ROUTE")); });

test("noindex draft may omit canonical and inherit business/site schema with nested offers", () => {
  const value = input();
  const graph = { "@graph": [
    { "@type": ["Organization", "MedicalBusiness"], "@id": `${origin}/#organization`, name: "Gentle Care Nursing Services", hasOfferCatalog: { "@type": "OfferCatalog", itemListElement: [{ "@type": "Service", url: `${origin}/services` }] } },
    { "@type": "WebSite", "@id": `${origin}/#website`, url: origin },
  ] };
  value.pages.push({ path: "/content-review", html: html("/content-review", '<meta name="robots" content="noindex">', graph).replace(/<link rel="canonical"[^>]*>/, "") });
  assert.equal(auditDiscovery(value).passed, true);
});
test("inherited entity referencing draft URLs remains blocked", () => {
  const value = input();
  value.pages.push({ path: "/content-review", html: html("/content-review", '<meta name="robots" content="noindex">', { "@type": "Organization", "@id": `${origin}/#organization`, url: `${origin}/content-review` }) });
  assert.ok(codes(value).includes("DRAFT_SCHEMA_REFERENCE"));
});
test("noindex does not permit proposed page schema or invented branch IDs", () => {
  for (const schema of [
    { "@type": "WebPage", url: `${origin}/suburbs/proposed` },
    { "@type": "Service", url: `${origin}/services/proposed` },
    { "@type": "MedicalBusiness", "@id": `${origin}/#proposed-branch` },
  ]) {
    const value = input();
    value.pages.push({ path: "/content-review", html: html("/content-review", '<meta name="robots" content="noindex">', schema) });
    assert.ok(codes(value).includes("DRAFT_HAS_PAGE_SCHEMA"));
  }
});
test("optional canonical on noindex pages is still validated", () => {
  const value = input();
  value.pages.push({ path: "/review", html: html("/wrong", '<meta name="robots" content="noindex">') });
  assert.ok(codes(value).includes("CANONICAL_MISMATCH"));
});

test("optional nested author/about IDs are not business identity conflicts", () => {
  const value = input();
  value.pages[0].html += `<script type="application/ld+json">${JSON.stringify({ "@type": "WebPage", about: { "@type": "MedicalBusiness", name: "Gentle Care Nursing Services" } })}</script>`;
  assert.equal(auditDiscovery(value).passed, true);
});
test("optional schema absence is advisory rather than an indexing requirement", () => {
  const value = input(); value.pages[0].html = html("/").replace(/<script[\s\S]*?<\/script>/, "");
  const result = auditDiscovery(value);
  assert.equal(result.passed, true); assert.equal(result.warningCount, 1);
  assert.equal(result.issues[0].code, "MISSING_JSON_LD");
});
test("unverified runtime scope is explicit, separate from build defects", () => {
  const value = input(); value.runtimeFallbackRoutes = ["/areas/[region]"]; value.unrenderedRoutes = ["/content-review"];
  const result = auditDiscovery(value);
  assert.equal(result.passed, true); assert.equal(result.errorCount, 0); assert.equal(result.warningCount, 2);
  assert.equal(result.runtimeCoverageComplete, false);
});


test("robots shared user-agent groups and inline comments cannot hide a broad block", () => {
  const value = input();
  value.robots = `Sitemap: ${origin}/sitemap.xml\n  User-agent: * # all robots\nUser-agent: ExampleBot\nDisallow: / # temporary block`;
  assert.ok(codes(value).includes("ROBOTS_BLOCKS_SITE"));
});
test("robots bot-specific blocks do not bleed into a subsequent wildcard group", () => {
  const value = input();
  value.robots = `User-agent: ExampleBot\nDisallow: /\nUser-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml`;
  assert.ok(!codes(value).includes("ROBOTS_BLOCKS_SITE"));
});


test("duplicate breadcrumb graphs fail discovery auditing", () => {
  const value=input();
  value.pages[0].html=html("/", "", [{"@type":"BreadcrumbList",itemListElement:[]},{"@type":"BreadcrumbList",itemListElement:[]}]);
  assert.ok(codes(value).includes("MULTIPLE_BREADCRUMB_LISTS"));
});
test("duplicate breadcrumb detection covers graph wrappers and array types", () => {
  const value=input();
  value.pages[0].html=html("/", "", {"@graph":[{"@type":["BreadcrumbList"],itemListElement:[]},{"@type":"BreadcrumbList",itemListElement:[]}]});
  assert.ok(codes(value).includes("MULTIPLE_BREADCRUMB_LISTS"));
});
test("a single canonical breadcrumb graph remains valid", () => {
  const value=input();
  value.pages[0].html=html("/", "", {"@type":"BreadcrumbList",itemListElement:[]});
  assert.ok(!codes(value).includes("MULTIPLE_BREADCRUMB_LISTS"));
});
