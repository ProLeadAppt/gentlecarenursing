import { JSDOM } from "jsdom";
import { inspectSeoScriptOwnership } from "../../src/lib/seo-script-audit";
import {
  inspectSeoHtml,
  isCanonicalMatch,
  normaliseAustralianPhone,
  rebaseUrlForAudit,
} from "../../src/lib/seo-audit";

export interface PageAudit {
  url: string;
  auditedUrl: string;
  status: number;
  location: string | null;
  title: string;
  description: string;
  canonical: string;
  ogUrl: string;
  h1Count: number;
  schemaTypes: string[];
  issues: string[];
}

interface FetchedText {
  status: number;
  headers: Headers;
  body: string;
  issues: string[];
}

export interface AuditOptions {
  baseUrl: string;
  fetchImpl?: typeof fetch;
  timeoutMs?: number;
}

async function mapWithConcurrency<T, R>(values: T[], operation: (value: T) => Promise<R>): Promise<R[]> {
  const results = new Array<R>(values.length);
  let nextIndex = 0;
  async function worker() {
    while (nextIndex < values.length) {
      const index = nextIndex++;
      results[index] = await operation(values[index]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(8, values.length) }, () => worker()));
  return results;
}

function sitemapEntries(xml: string): { urls: string[]; issues: string[] } {
  const issues: string[] = [];
  const urls: string[] = [];
  let dom: JSDOM | undefined;
  try {
    dom = new JSDOM(xml, { contentType: "text/xml" });
    const document = dom.window.document;
    if (document.documentElement.localName !== "urlset") {
      issues.push("SITEMAP_EXPECTED_URLSET");
    } else {
      for (const element of Array.from(document.documentElement.children)) {
        if (element.localName !== "url") continue;
        const locations = Array.from(element.children).filter((child) => child.localName === "loc");
        const text = locations[0]?.textContent?.trim() ?? "";
        try {
          const url = new URL(text);
          if (locations.length !== 1 || !["http:", "https:"].includes(url.protocol) || url.username || url.password || url.hash) {
            throw new Error("Invalid sitemap location");
          }
          if (urls.includes(text)) issues.push("SITEMAP_DUPLICATE_URL");
          else urls.push(text);
        } catch {
          issues.push("SITEMAP_INVALID_URL");
        }
      }
    }
  } catch {
    issues.push("SITEMAP_INVALID_XML");
  } finally {
    dom?.window.close();
  }
  if (urls.length === 0) issues.push("SITEMAP_EMPTY");
  return { urls, issues: [...new Set(issues)] };
}

function noindexDirective(value: string): boolean {
  return /(?:^|[\s,:])(?:noindex|none)(?=$|[\s,;])/i.test(value);
}

function pageIssues(body: string, headers: Headers, expectedCanonical: string): string[] {
  const inspection = inspectSeoHtml(body);
  const issues = inspectSeoScriptOwnership(body);
  if (!/^text\/html\b/i.test(headers.get("content-type") ?? "")) issues.push("NOT_HTML");
  if (!inspection.title) issues.push("MISSING_TITLE");
  if (!inspection.description) issues.push("MISSING_DESCRIPTION");
  if (!inspection.canonical) issues.push("MISSING_CANONICAL");
  else if (!isCanonicalMatch(expectedCanonical, inspection.canonical)) issues.push("CANONICAL_MISMATCH");
  if (!inspection.ogUrl) issues.push("MISSING_OG_URL");
  else if (!isCanonicalMatch(expectedCanonical, inspection.ogUrl)) issues.push("OG_URL_MISMATCH");
  if (inspection.h1Count !== 1) issues.push(`H1_COUNT_${inspection.h1Count}`);
  if (inspection.schemaTypes.includes("INVALID_JSON_LD")) issues.push("INVALID_JSON_LD");
  if (inspection.unfinishedMarkers.length > 0) {
    issues.push(`UNFINISHED_${inspection.unfinishedMarkers.join("_").replace(/\s+/g, "-")}`);
  }
  // Inspect every generic/Googlebot directive, not just the first robots tag.
  const head = body.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? body;
  const dom = new JSDOM(head);
  try {
    const blocked = Array.from(dom.window.document.querySelectorAll("meta[name]")).some((meta) =>
      /^(robots|googlebot)$/i.test(meta.getAttribute("name") ?? "") && noindexDirective(meta.getAttribute("content") ?? "")
    );
    if (blocked || noindexDirective(headers.get("x-robots-tag") ?? "")) issues.push("SITEMAP_PAGE_NOINDEX");
  } finally {
    dom.window.close();
  }
  const phones = inspection.visiblePhones.map(normaliseAustralianPhone);
  const links = inspection.telephoneLinks.map(normaliseAustralianPhone);
  if (phones.length && !phones.every((phone) => links.includes(phone))) issues.push("PHONE_LINK_MISMATCH");
  return issues;
}

/** Read-only HTTP audit. It never submits forms, runs page scripts or proves browser/indexing behavior. */
export async function auditSeoSite({ baseUrl, fetchImpl = fetch, timeoutMs = 15000 }: AuditOptions) {
  const base = new URL(baseUrl);
  if (!["http:", "https:"].includes(base.protocol) || base.username || base.password || base.search || base.hash || base.pathname !== "/") {
    throw new Error("Audit base must be an HTTP(S) origin without credentials, path, query or fragment");
  }
  if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) throw new Error("Audit timeout must be positive");
  baseUrl = base.origin;
  async function request(url: string): Promise<FetchedText> {
    try {
      const response = await fetchImpl(url, {
        redirect: "manual",
        signal: AbortSignal.timeout(timeoutMs),
        headers: { "user-agent": "GentleCareSEOAudit/1.1" },
      });
      const body = await response.text();
      return { status: response.status, headers: response.headers, body, issues: [] };
    } catch (error) {
      const aborted = error instanceof Error && ["AbortError", "TimeoutError"].includes(error.name);
      return { status: 0, headers: new Headers(), body: "", issues: [aborted ? "REQUEST_TIMEOUT" : "REQUEST_FAILED"] };
    }
  }
  const sitemap = await request(`${baseUrl}/sitemap.xml`);
  const parsed = sitemapEntries(sitemap.body);
  const siteIssues = [...sitemap.issues.map((issue) => `SITEMAP_${issue}`), ...parsed.issues];
  if (sitemap.status !== 200) siteIssues.push(`SITEMAP_HTTP_${sitemap.status}`);
  const urls = sitemap.status === 200 ? parsed.urls : [];
  const pages = await mapWithConcurrency(urls, async (url): Promise<PageAudit> => {
    // Rebase all paths so local/preview audits cannot accidentally fetch production pages.
    const auditedUrl = rebaseUrlForAudit(url, baseUrl);
    const response = await request(auditedUrl);
    const inspection = inspectSeoHtml(response.body);
    const issues = [...response.issues];
    if (response.status !== 200) issues.push(`HTTP_${response.status}`);
    if (response.status === 200) issues.push(...pageIssues(response.body, response.headers, url));
    return {
      url, auditedUrl, status: response.status, location: response.headers.get("location"),
      title: inspection.title, description: inspection.description, canonical: inspection.canonical,
      ogUrl: inspection.ogUrl, h1Count: inspection.h1Count, schemaTypes: inspection.schemaTypes, issues,
    };
  });
  const missing = await request(`${baseUrl}/seo-audit-missing-${Date.now()}`);
  siteIssues.push(...missing.issues.map((issue) => `MISSING_ROUTE_${issue}`));
  if (missing.status !== 404) siteIssues.push(`MISSING_ROUTE_HTTP_${missing.status}`);
  const resources = await mapWithConcurrency(["/robots.txt", "/llms.txt", "/llms-full.txt", "/ai-index.json"], async (path) => {
    const response = await request(`${baseUrl}${path}`);
    const issues = [...response.issues];
    if (response.status !== 200) issues.push(`HTTP_${response.status}`);
    if (response.status === 200) {
      if (!response.body.trim()) issues.push("EMPTY_RESOURCE");
      if (path.endsWith(".json")) {
        if (!/^application\/json\b/i.test(response.headers.get("content-type") ?? "")) issues.push("NOT_JSON");
        try { JSON.parse(response.body); } catch { issues.push("INVALID_JSON"); }
      } else if (!/^text\/plain\b/i.test(response.headers.get("content-type") ?? "")) issues.push("NOT_PLAIN_TEXT");
    }
    return { path, status: response.status, contentType: response.headers.get("content-type"), issues };
  });
  return {
    generatedAt: new Date().toISOString(),
    inspectionScope: "fetched HTML and required-resource checks only; browser-rendered DOM, robots rule semantics, search indexing and analytics collection require separate verification",
    baseUrl, sitemapUrlCount: urls.length, missingUrlStatus: missing.status, siteIssues, resources,
    issueCount: siteIssues.length + pages.reduce((sum, page) => sum + page.issues.length, 0) + resources.reduce((sum, resource) => sum + resource.issues.length, 0),
    pages,
  };
}
