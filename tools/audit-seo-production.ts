import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { auditSeoSite } from "./lib/seo-audit-runner";

function argument(name: string): string | undefined {
  const index = process.argv.indexOf(name);
  if (index < 0) return undefined;
  const value = process.argv[index + 1];
  if (!value || value.startsWith("--")) throw new Error(`Missing value for ${name}`);
  return value;
}

async function main() {
  const outputPath = resolve(argument("--output") ?? "docs/seo/technical-audit-latest.json");
  const report = await auditSeoSite({
    baseUrl: argument("--base") ?? "https://gentlecarenursing.com.au",
    timeoutMs: Number(argument("--timeout-ms") ?? 15000),
  });
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  console.log(JSON.stringify({
    outputPath,
    sitemapUrlCount: report.sitemapUrlCount,
    missingUrlStatus: report.missingUrlStatus,
    resourceStatuses: Object.fromEntries(report.resources.map((resource) => [resource.path, resource.status])),
    issueCount: report.issueCount,
    siteIssues: report.siteIssues,
    resourcesWithIssues: report.resources.filter((resource) => resource.issues.length > 0),
    pagesWithIssues: report.pages.filter((page) => page.issues.length > 0).map((page) => ({ url: page.url, issues: page.issues })),
  }, null, 2));
  if (report.issueCount > 0) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
