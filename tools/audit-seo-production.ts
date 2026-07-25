import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import {
  inspectSeoHtml,
  isCanonicalMatch,
  normaliseAustralianPhone,
  parseSitemapUrls,
  rebaseUrlForAudit,
} from "../src/lib/seo-audit";

interface PageAudit {
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

function argument(name: string): string | undefined {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

async function auditPage(requestUrl: string, expectedCanonicalUrl = requestUrl): Promise<PageAudit> {
  const response = await fetch(requestUrl, {
    redirect: "manual",
    headers: { "user-agent": "GentleCareSEOAudit/1.0" },
  });
  const html = await response.text();
  const inspection = inspectSeoHtml(html);
  const issues: string[] = [];

  if (response.status !== 200) issues.push(`HTTP_${response.status}`);
  if (!inspection.title) issues.push("MISSING_TITLE");
  if (!inspection.description) issues.push("MISSING_DESCRIPTION");
  if (!inspection.canonical) issues.push("MISSING_CANONICAL");
  if (inspection.canonical && !isCanonicalMatch(expectedCanonicalUrl, inspection.canonical)) {
    issues.push("CANONICAL_MISMATCH");
  }
  if (inspection.ogUrl && !isCanonicalMatch(expectedCanonicalUrl, inspection.ogUrl)) {
    issues.push("OG_URL_MISMATCH");
  }
  if (inspection.h1Count !== 1) issues.push(`H1_COUNT_${inspection.h1Count}`);
  if (inspection.schemaTypes.includes("INVALID_JSON_LD")) issues.push("INVALID_JSON_LD");
  if (inspection.unfinishedMarkers.length > 0) {
    issues.push(`UNFINISHED_${inspection.unfinishedMarkers.join("_").replace(/\s+/g, "-")}`);
  }

  const visiblePhones = inspection.visiblePhones.map(normaliseAustralianPhone);
  const telephoneLinks = inspection.telephoneLinks.map(normaliseAustralianPhone);
  if (
    visiblePhones.length > 0 &&
    !visiblePhones.every((phone) => telephoneLinks.includes(phone))
  ) {
    issues.push("PHONE_LINK_MISMATCH");
  }

  return {
    url: expectedCanonicalUrl,
    auditedUrl: requestUrl,
    status: response.status,
    location: response.headers.get("location"),
    title: inspection.title,
    description: inspection.description,
    canonical: inspection.canonical,
    ogUrl: inspection.ogUrl,
    h1Count: inspection.h1Count,
    schemaTypes: inspection.schemaTypes,
    issues,
  };
}

async function mapWithConcurrency<T, R>(
  values: T[],
  concurrency: number,
  operation: (value: T) => Promise<R>
): Promise<R[]> {
  const results = new Array<R>(values.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < values.length) {
      const index = nextIndex++;
      results[index] = await operation(values[index]);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, values.length) }, () => worker())
  );
  return results;
}

async function main() {
  const baseUrl = (argument("--base") ?? "https://gentlecarenursing.com.au").replace(/\/$/, "");
  const outputPath = resolve(
    argument("--output") ?? "docs/seo/technical-audit-latest.json"
  );

  const sitemapResponse = await fetch(`${baseUrl}/sitemap.xml`);
  if (!sitemapResponse.ok) {
    throw new Error(`Sitemap returned HTTP ${sitemapResponse.status}`);
  }
  const urls = parseSitemapUrls(await sitemapResponse.text());
  const baseOrigin = new URL(baseUrl).origin;
  const pages = await mapWithConcurrency(urls, 8, (url) => {
    const requestUrl = new URL(url).origin === baseOrigin ? url : rebaseUrlForAudit(url, baseUrl);
    return auditPage(requestUrl, url);
  });

  const missingUrl = `${baseUrl}/seo-audit-missing-${Date.now()}`;
  const missingResponse = await fetch(missingUrl, { redirect: "manual" });
  const resources = await Promise.all(
    ["/robots.txt", "/llms.txt", "/llms-full.txt", "/ai-index.json"].map(async (path) => {
      const response = await fetch(`${baseUrl}${path}`, { redirect: "manual" });
      return { path, status: response.status, contentType: response.headers.get("content-type") };
    })
  );

  const issueCount = pages.reduce((total, page) => total + page.issues.length, 0);
  const report = {
    generatedAt: new Date().toISOString(),
    baseUrl,
    sitemapUrlCount: urls.length,
    missingUrlStatus: missingResponse.status,
    resources,
    issueCount: issueCount + (missingResponse.status === 404 ? 0 : 1),
    pages,
  };

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");

  const summary = {
    outputPath,
    sitemapUrlCount: urls.length,
    missingUrlStatus: missingResponse.status,
    resourceStatuses: Object.fromEntries(resources.map((resource) => [resource.path, resource.status])),
    issueCount: report.issueCount,
    pagesWithIssues: pages
      .filter((page) => page.issues.length > 0)
      .map((page) => ({ url: page.url, issues: page.issues })),
  };
  console.log(JSON.stringify(summary, null, 2));

  if (report.issueCount > 0) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
