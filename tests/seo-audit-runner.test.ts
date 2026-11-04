import test from "node:test";
import assert from "node:assert/strict";
import { auditSeoSite } from "../tools/lib/seo-audit-runner";

const canonical = "https://gentlecarenursing.com.au/";
const baseUrl = "http://127.0.0.1:3100";
const page = `<html><head><title>Gentle Care</title><meta name="description" content="Care at home"><link rel="canonical" href="${canonical}"><meta property="og:url" content="${canonical}"></head><body><h1>Care at home</h1></body></html>`;
const sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${canonical}</loc></url></urlset>`;
type Fixture = Response | Error;
function fixtureFetch(overrides: Record<string, Fixture> = {}, calls: string[] = []): typeof fetch {
  return (async (input: string | URL | Request, options?: RequestInit) => {
    const url = new URL(String(input));
    calls.push(url.toString());
    assert.equal(url.origin, baseUrl, "Every request must stay on the supplied local origin");
    assert.equal(options?.redirect, "manual");
    assert.ok(options?.signal);
    const override = overrides[url.pathname];
    if (override instanceof Error) throw override;
    if (override) return override.clone();
    if (url.pathname === "/sitemap.xml") return new Response(sitemap, { headers: { "content-type": "application/xml" } });
    if (url.pathname === "/") return new Response(page, { headers: { "content-type": "text/html" } });
    if (url.pathname.startsWith("/seo-audit-missing-")) return new Response("Not found", { status: 404 });
    if (url.pathname === "/ai-index.json") return new Response("{}", { headers: { "content-type": "application/json" } });
    return new Response("Public resource", { headers: { "content-type": "text/plain" } });
  }) as typeof fetch;
}

test("complete local fixture passes and never fetches production origins", async () => {
  const calls: string[] = [];
  const report = await auditSeoSite({ baseUrl, fetchImpl: fixtureFetch({}, calls) });
  assert.equal(report.issueCount, 0);
  assert.equal(report.sitemapUrlCount, 1);
  assert.equal(calls.length, 7);
  assert.equal(report.pages[0].auditedUrl, `${baseUrl}/`);
});

test("empty, malformed, index and invalid-location sitemaps cannot produce a clean audit", async () => {
  for (const [xml, issue] of [
    ["<urlset/>", "SITEMAP_EMPTY"],
    ["<urlset><url></urlset>", "SITEMAP_INVALID_XML"],
    ["<sitemapindex><sitemap><loc>https://example.com/sitemap.xml</loc></sitemap></sitemapindex>", "SITEMAP_EXPECTED_URLSET"],
    ["<urlset><url><loc>javascript:alert(1)</loc></url></urlset>", "SITEMAP_INVALID_URL"],
    ["<urlset><url><loc>https://example.com/#fragment</loc></url></urlset>", "SITEMAP_INVALID_URL"],
  ]) {
    const report = await auditSeoSite({ baseUrl, fetchImpl: fixtureFetch({ "/sitemap.xml": new Response(xml) }) });
    assert.ok(report.issueCount > 0);
    assert.ok(report.siteIssues.includes(issue));
    assert.equal(report.pages.length, 0);
  }
});

test("redirected sitemap is not followed or audited as success", async () => {
  const report = await auditSeoSite({ baseUrl, fetchImpl: fixtureFetch({ "/sitemap.xml": new Response(sitemap, { status: 302, headers: { location: "https://example.com/" } }) }) });
  assert.ok(report.siteIssues.includes("SITEMAP_HTTP_302"));
  assert.equal(report.pages.length, 0);
});

test("required-resource failures count even when every page passes", async () => {
  const report = await auditSeoSite({ baseUrl, fetchImpl: fixtureFetch({ "/llms.txt": new Response("Missing", { status: 404 }) }) });
  assert.deepEqual(report.pages[0].issues, []);
  assert.equal(report.issueCount, 1);
  assert.deepEqual(report.resources.find((resource) => resource.path === "/llms.txt")?.issues, ["HTTP_404"]);
});

test("empty resource, wrong type and invalid JSON all fail the audit", async () => {
  const report = await auditSeoSite({ baseUrl, fetchImpl: fixtureFetch({
    "/llms.txt": new Response(""),
    "/ai-index.json": new Response("<html>Not JSON</html>", { headers: { "content-type": "text/html" } }),
  }) });
  assert.ok(report.resources.find((resource) => resource.path === "/llms.txt")?.issues.includes("EMPTY_RESOURCE"));
  assert.deepEqual(report.resources.find((resource) => resource.path === "/ai-index.json")?.issues, ["NOT_JSON", "INVALID_JSON"]);
  assert.ok(report.issueCount >= 3);
});

test("generic, additional Googlebot and HTTP noindex directives are release failures", async () => {
  for (const [html, robotsHeader] of [
    [page.replace("</head>", '<meta name="robots" content="noindex,follow"></head>'), ""],
    [page.replace("</head>", '<meta name="robots" content="index,follow"><meta name="googlebot" content="none"></head>'), ""],
    [page, "googlebot: noindex, follow"],
  ]) {
    const report = await auditSeoSite({ baseUrl, fetchImpl: fixtureFetch({ "/": new Response(html, { headers: { "content-type": "text/html", "x-robots-tag": robotsHeader } }) }) });
    assert.deepEqual(report.pages[0].issues, ["SITEMAP_PAGE_NOINDEX"]);
  }
});

test("malformed canonical is reported instead of aborting remaining checks", async () => {
  const html = page.replace(`href="${canonical}"`, 'href="not a URL"');
  const report = await auditSeoSite({ baseUrl, fetchImpl: fixtureFetch({ "/": new Response(html, { headers: { "content-type": "text/html" } }) }) });
  assert.deepEqual(report.pages[0].issues, ["CANONICAL_MISMATCH"]);
  assert.equal(report.resources.length, 4);
});

test("HTTP and request failures remain in a complete nonpassing report", async () => {
  const report = await auditSeoSite({ baseUrl, fetchImpl: fixtureFetch({
    "/": new Error("fixture network failure"),
    "/llms.txt": new DOMException("fixture timeout", "TimeoutError"),
  }) });
  assert.deepEqual(report.pages[0].issues, ["REQUEST_FAILED", "HTTP_0"]);
  assert.deepEqual(report.resources.find((resource) => resource.path === "/llms.txt")?.issues, ["REQUEST_TIMEOUT", "HTTP_0"]);
  assert.equal(report.resources.length, 4);
});

test("duplicate sitemap locations fail without fetching a page twice", async () => {
  const duplicate = sitemap.replace("</urlset>", `<url><loc>${canonical}</loc></url></urlset>`);
  const report = await auditSeoSite({ baseUrl, fetchImpl: fixtureFetch({ "/sitemap.xml": new Response(duplicate) }) });
  assert.deepEqual(report.siteIssues, ["SITEMAP_DUPLICATE_URL"]);
  assert.equal(report.pages.length, 1);
});

test("invalid audit origin and timeout fail before network access", async () => {
  const neverFetch = (async () => { throw new Error("Must not fetch"); }) as typeof fetch;
  for (const invalid of ["file:///tmp", "https://user:password@example.com", "https://example.com/path", "https://example.com/?secret=value"]) {
    await assert.rejects(auditSeoSite({ baseUrl: invalid, fetchImpl: neverFetch }), /Audit base/);
  }
  await assert.rejects(auditSeoSite({ baseUrl, timeoutMs: NaN, fetchImpl: neverFetch }), /timeout/);
});

test("double-slash sitemap paths cannot escape the selected audit origin", async () => {
  const location = "https://gentlecarenursing.com.au//outside.example/path";
  const calls: string[] = [];
  const report = await auditSeoSite({ baseUrl, fetchImpl: fixtureFetch({
    "/sitemap.xml": new Response(sitemap.replace(canonical, location)),
    "//outside.example/path": new Response(page.replaceAll(canonical, location), { headers: { "content-type": "text/html" } }),
  }, calls) });
  assert.equal(report.issueCount, 0);
  assert.equal(report.pages[0].auditedUrl, `${baseUrl}//outside.example/path`);
  assert.ok(calls.includes(`${baseUrl}//outside.example/path`));
});
