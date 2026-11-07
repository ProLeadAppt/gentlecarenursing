import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, join, relative, resolve, sep } from "node:path";
import { auditDiscovery } from "../src/lib/discovery-audit";

function argument(name: string) {
  const index = process.argv.indexOf(name);
  if (index === -1) return undefined;
  const value = process.argv[index + 1];
  if (!value || value.startsWith("--")) throw new Error(`Missing value for ${name}`);
  return value;
}
/** Symlinks are deliberately not followed; this only inspects local build artifacts. */
async function files(root: string): Promise<string[]> {
  const entries = await readdir(root, { withFileTypes: true });
  return (await Promise.all(entries.map(async (entry) => entry.isDirectory() ? files(join(root, entry.name)) : entry.isFile() ? [join(root, entry.name)] : []))).flat();
}
async function optionalFile(path: string) {
  try { return await readFile(path, "utf8"); }
  catch (error) { if ((error as NodeJS.ErrnoException).code === "ENOENT") return ""; throw error; }
}
async function main() {
  const build = resolve(argument("--build") ?? ".next");
  const app = join(build, "server/app");
  const output = resolve(argument("--output") ?? ".tmp/discovery-audit.json");
  const origin = argument("--origin") ?? "https://gentlecarenursing.com.au";
  const all = await files(app);
  const route = (file: string, suffix: string) => {
    const path = relative(app, file).split(sep).join("/").slice(0, -suffix.length);
    return path === "index" ? "/" : `/${path}`;
  };
  const pageFiles = all.filter((file) => file.endsWith(".html") && !relative(app, file).startsWith("_"));
  if (!pageFiles.length) throw new Error("No built HTML found. Run npm run build before auditing.");
  const pages = await Promise.all(pageFiles.map(async (file) => ({ path: route(file, ".html"), html: await readFile(file, "utf8") })));
  const resources = all.filter((file) => file.endsWith(".body")).map((file) => route(file, ".body"));
  const publicRoot = resolve(argument("--public") ?? "public");
  try { resources.push(...(await files(publicRoot)).map((file) => `/${relative(publicRoot, file).split(sep).join("/")}`)); }
  catch (error) { if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error; }
  const routeManifest = JSON.parse(await optionalFile(join(build, "routes-manifest.json")) || "{}");
  for (const redirect of routeManifest.redirects ?? []) if (typeof redirect.source === "string" && !/[:*()]/.test(redirect.source)) resources.push(redirect.source);
  const appPaths: Record<string, string> = JSON.parse(await optionalFile(join(build, "server/app-paths-manifest.json")) || "{}");
  // API/metadata handlers are not HTML pages; recognize them as link destinations.
  for (const path of Object.keys(appPaths)) if (path.endsWith("/route")) resources.push(path.slice(0, -6));
  const prerender = JSON.parse(await optionalFile(join(build, "prerender-manifest.json")) || "{}");
  const rendered = new Set(pages.map((page) => page.path));
  const renderedTemplates = new Set(Object.values(prerender.routes ?? {}).map((entry) => (entry as { srcRoute?: string }).srcRoute));
  const runtimeFallbackRoutes = Object.keys(prerender.dynamicRoutes ?? {}).filter((path) => renderedTemplates.has(path) && prerender.dynamicRoutes[path].fallback !== false);
  const unrenderedRoutes = Object.keys(appPaths).filter((path) => path.endsWith("/page") && !path.startsWith("/_"))
    .map((path) => path.slice(0, -5).replace(/\/\([^/]+\)/g, "") || "/")
    .filter((path) => !rendered.has(path) && !renderedTemplates.has(path));
  const report = {
    generatedAt: new Date().toISOString(), buildDirectory: build,
    ...auditDiscovery({ origin, pages, resources, unrenderedRoutes, runtimeFallbackRoutes,
      sitemap: await optionalFile(join(app, "sitemap.xml.body")),
      robots: await optionalFile(join(app, "robots.txt.body")),
      ...(argument("--draft-prefixes") ? { draftPrefixes: argument("--draft-prefixes")!.split(",") } : {}),
    }),
  };
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify({ output, passed: report.passed, pageCount: report.pageCount, sitemapCount: report.sitemapCount, issueCount: report.issueCount, errorCount: report.errorCount, warningCount: report.warningCount, runtimeCoverageComplete: report.runtimeCoverageComplete, issues: report.issues }, null, 2));
  if (!report.passed) process.exitCode = 1;
}
main().catch((error: unknown) => { console.error(error instanceof Error ? error.message : String(error)); process.exitCode = 1; });
