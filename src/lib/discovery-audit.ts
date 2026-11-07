import { inspectSeoHtml, parseSitemapUrls } from "./seo-audit";

export interface DiscoveryInput {
  origin: string;
  pages: { path: string; html: string }[];
  sitemap: string;
  robots: string;
  /** Known static files, route handlers and redirected paths. */
  resources?: string[];
  unrenderedRoutes?: string[];
  runtimeFallbackRoutes?: string[];
  draftPrefixes?: string[];
}
export interface DiscoveryIssue { code: string; path: string; severity: "error" | "warning"; detail?: string }

const decode = (value: string) => value.replace(/&amp;/gi, "&").replace(/&quot;/gi, '"').replace(/&#39;/g, "'");
const normalize = (path: string) => path.replace(/\/+$/, "") || "/";
function attributes(tag: string): Record<string, string> {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)]
    .map((match) => [match[1].toLowerCase(), decode(match[2] ?? match[3] ?? match[4])]));
}
function objects(value: unknown): Record<string, unknown>[] {
  if (Array.isArray(value)) return value.flatMap(objects);
  if (!value || typeof value !== "object") return [];
  return [value as Record<string, unknown>, ...Object.values(value).flatMap(objects)];
}
/** Only inspect graph roots here: inherited business offer catalogs legitimately nest Services. */
function schemaRoots(value: unknown): Record<string, unknown>[] {
  if (Array.isArray(value)) return value.flatMap(schemaRoots);
  if (!value || typeof value !== "object") return [];
  const node = value as Record<string, unknown>;
  if (node["@graph"] && !node["@type"]) return schemaRoots(node["@graph"]);
  return [node];
}
function localPath(value: string, base: string, origin: string): string | null {
  try { const url = new URL(value, base); return url.origin === origin ? normalize(decodeURIComponent(url.pathname)) : null; }
  catch { return null; }
}

/** Offline build inspection, not a claim about live responses or search engine indexing. */
export function auditDiscovery(input: DiscoveryInput) {
  const origin = new URL(input.origin).origin;
  const draftPrefixes = input.draftPrefixes ?? ["/content-review", "/api/content-review"];
  const draft = (path: string) => draftPrefixes.some((prefix) => path === normalize(prefix) || path.startsWith(`${normalize(prefix)}/`));
  const issues: DiscoveryIssue[] = [];
  const add = (code: string, path: string, detail?: string, severity: "error" | "warning" = "error") => issues.push({ code, path, severity, ...(detail ? { detail } : {}) });
  const sitemapUrls = parseSitemapUrls(input.sitemap);
  const sitemapPaths = new Set<string>();
  if (!sitemapUrls.length) add("EMPTY_SITEMAP", "/sitemap.xml");
  for (const url of sitemapUrls) {
    const path = localPath(url, origin, origin);
    if (!/^https?:\/\//.test(url) || !path) { add("INVALID_SITEMAP_URL", "/sitemap.xml", url); continue; }
    if (draft(path)) add("DRAFT_IN_SITEMAP", path);
    if (sitemapPaths.has(path)) add("DUPLICATE_SITEMAP_PATH", path);
    sitemapPaths.add(path);
  }
  const known = new Set([...input.pages.map((page) => normalize(page.path)), ...(input.resources ?? []).map(normalize)]);
  const businessIds = new Map<string, Set<string>>();
  const pages = input.pages.map(({ path: rawPath, html }) => {
    const path = normalize(rawPath);
    const expected = new URL(path, origin).href;
    // Strip comments and executable scripts to avoid counting embedded framework payloads as markup.
    const markup = html.replace(/<!--[\s\S]*?-->/g, "").replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
    const inspection = inspectSeoHtml(html);
    const metas = (markup.match(/<meta\b[^>]*>/gi) ?? []).map(attributes);
    const robots = metas.filter((tag) => ["robots", "googlebot", "bingbot"].includes(tag.name?.toLowerCase())).map((tag) => tag.content ?? "").join(",");
    const noindex = /(?:^|[,\s])(?:noindex|none)(?:$|[,\s])/i.test(robots);
    const canonicalTags = (markup.match(/<link\b[^>]*>/gi) ?? []).map(attributes).filter((tag) => tag.rel?.toLowerCase().split(/\s+/).includes("canonical"));
    const internal = [...new Set((markup.match(/<a\b[^>]*>/gi) ?? []).map(attributes).filter((tag) => tag.href && !tag.href.startsWith("#")).map((tag) => localPath(tag.href, expected, origin)).filter((value): value is string => value !== null))];
    if (!inspection.title.trim()) add("MISSING_TITLE", path);
    if (!inspection.description.trim()) add("MISSING_DESCRIPTION", path);
    if (metas.filter((tag) => tag.name?.toLowerCase() === "description").length > 1) add("MULTIPLE_DESCRIPTIONS", path);
    if ((markup.match(/<title\b/gi) ?? []).length > 1) add("MULTIPLE_TITLES", path);
    if (!canonicalTags.length && !noindex) add("MISSING_CANONICAL", path);
    if (canonicalTags.length > 1) add("MULTIPLE_CANONICALS", path);
    if (canonicalTags.length) {
      try {
        const canonical = new URL(canonicalTags[0].href);
        if (canonical.origin !== origin || normalize(canonical.pathname) !== path || canonical.search || canonical.hash) add("CANONICAL_MISMATCH", path, canonical.href);
      } catch { add("INVALID_CANONICAL", path, canonicalTags[0].href); }
    }
    if (draft(path) && !noindex) add("DRAFT_INDEXABLE", path);
    if (!draft(path) && noindex && sitemapPaths.has(path)) add("NOINDEX_IN_SITEMAP", path);
    if (!draft(path) && !noindex && !sitemapPaths.has(path)) add("INDEXABLE_NOT_IN_SITEMAP", path);
    const schemas: unknown[] = [];
    for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
      if (attributes(match[1]).type?.toLowerCase() !== "application/ld+json") continue;
      try { schemas.push(JSON.parse(match[2])); } catch { add("INVALID_JSON_LD", path); }
    }
    const breadcrumbCount = schemas.flatMap(objects).filter((node) => {
      const type = node["@type"];
      return type === "BreadcrumbList" || (Array.isArray(type) && type.includes("BreadcrumbList"));
    }).length;
    if (breadcrumbCount > 1) add("MULTIPLE_BREADCRUMB_LISTS", path, `${breadcrumbCount} breadcrumb graphs; retain one canonical page hierarchy.`);
    if (!draft(path) && !noindex && !schemas.length) add("MISSING_JSON_LD", path, "Structured data is recommended where applicable, not required for crawling or indexing.", "warning");
    if (draft(path)) {
      for (const node of schemas.flatMap(schemaRoots)) {
        const types = Array.isArray(node["@type"]) ? node["@type"] : [node["@type"]];
        const inheritedTypes = ["Organization", "MedicalBusiness", "WebSite"];
        // Root layout entity/site graphs are not publication of the editorial page.
        // A standalone WebPage, Service, FAQ or local branch remains a draft leak.
        const inheritedId = node["@id"] === `${origin}/#organization` || node["@id"] === `${origin}/#website`;
        if (!noindex || !inheritedId || !types.length || !types.every((type) => inheritedTypes.includes(String(type)))) {
          add("DRAFT_HAS_PAGE_SCHEMA", path);
        }
      }
    }
    for (const node of schemas.flatMap(objects)) {
      const types = Array.isArray(node["@type"]) ? node["@type"] : [node["@type"]];
      if (types.some((type) => ["Organization", "MedicalBusiness", "LocalBusiness"].includes(String(type))) && typeof node.name === "string" && /^Gentle Care Nursing(?: Services)?$/i.test(node.name)) {
        const id = String(node["@id"] ?? "");
        // @id is optional, particularly on nested author/about fragments.
        if (id) { const paths = businessIds.get(id) ?? new Set<string>(); paths.add(path); businessIds.set(id, paths); }
      }
      for (const [key, value] of Object.entries(node)) {
        if (typeof value !== "string" || !["@id", "url", "item", "mainEntityOfPage"].includes(key)) continue;
        const referenced = localPath(value, expected, origin);
        if (referenced && draft(referenced)) add("DRAFT_SCHEMA_REFERENCE", path, value);
        if (key === "@id" && /#(?:organization|business|localbusiness)$/i.test(value) && value !== `${origin}/#organization`) add("CONFLICTING_BUSINESS_REFERENCE", path, value);
      }
    }
    for (const target of internal) {
      if (!known.has(target)) add("UNRESOLVED_INTERNAL_LINK", path, target);
      if (!draft(path) && draft(target)) add("PUBLIC_LINK_TO_DRAFT", path, target);
    }
    return { path, title: inspection.title, description: inspection.description, canonical: canonicalTags[0]?.href ?? "", robots, noindex, draft: draft(path), schemaTypes: inspection.schemaTypes, internalLinks: internal };
  });
  for (const path of sitemapPaths) if (!known.has(path)) add("SITEMAP_ROUTE_NOT_BUILT", path);
  if (businessIds.size > 1) add("CONFLICTING_BUSINESS_IDS", "/", [...businessIds.keys()].join(", "));
  if (!input.robots.trim()) add("MISSING_ROBOTS", "/robots.txt");
  if (!input.robots.includes(`${origin}/sitemap.xml`)) add("ROBOTS_SITEMAP_MISMATCH", "/robots.txt");
  // A broad robots block makes production pages undiscoverable. Specific bot blocks need live review.
  // Consecutive user-agent lines share rules. Comments do not end a group.
  const groups: { agents: string[]; disallows: string[] }[] = [];
  let group = { agents: [] as string[], disallows: [] as string[] };
  let hasRules = false;
  for (const rawLine of input.robots.split(/\r?\n/)) {
    const line = rawLine.replace(/#.*$/, "").trim();
    const match = /^([\w-]+)\s*:\s*(.*)$/.exec(line);
    if (!match) continue;
    const [, field, rawValue] = match;
    const value = rawValue.trim();
    if (field.toLowerCase() === "user-agent") {
      if (hasRules) { groups.push(group); group = { agents: [], disallows: [] }; hasRules = false; }
      group.agents.push(value.toLowerCase());
    } else if (group.agents.length && ["allow", "disallow"].includes(field.toLowerCase())) {
      hasRules = true;
      if (field.toLowerCase() === "disallow") group.disallows.push(value);
    }
  }
  groups.push(group);
  if (groups.some((entry) => entry.agents.includes("*") && entry.disallows.includes("/"))) add("ROBOTS_BLOCKS_SITE", "/robots.txt");
  const reached = new Set<string>();
  const queue = ["/"];
  const byPath = new Map(pages.map((page) => [page.path, page]));
  while (queue.length) { const path = queue.shift()!; if (reached.has(path)) continue; reached.add(path); queue.push(...(byPath.get(path)?.internalLinks ?? []).filter((target) => byPath.has(target) && !reached.has(target))); }
  for (const page of pages) if (!page.draft && !page.noindex && !reached.has(page.path)) add("UNREACHABLE_FROM_HOME", page.path);
  for (const path of input.unrenderedRoutes ?? []) add("UNVERIFIED_DYNAMIC_ROUTE", path, "No prerendered HTML; requires an authorized runtime audit.", "warning");
  for (const path of input.runtimeFallbackRoutes ?? []) add("UNVERIFIED_RUNTIME_FALLBACK", path, "Known prerendered instances were audited. Unknown parameter values and runtime fallback responses require an authorized runtime audit.", "warning");
  const uniqueIssues = [...new Map(issues.map((issue) => [JSON.stringify(issue), issue])).values()];
  const errorCount = uniqueIssues.filter((issue) => issue.severity === "error").length;
  const warningCount = uniqueIssues.length - errorCount;
  return { origin, mode: "offline-build" as const, passed: errorCount === 0, errorCount, warningCount, runtimeCoverageComplete: !(input.unrenderedRoutes?.length || input.runtimeFallbackRoutes?.length), pageCount: pages.length, sitemapCount: sitemapUrls.length, reachablePageCount: pages.filter((page) => reached.has(page.path)).length, issueCount: uniqueIssues.length, issues: uniqueIssues, businessIds: [...businessIds.keys()], pages, limitations: ["Does not verify HTTP status, response headers, authentication, deployment configuration, JavaScript-only navigation, or actual indexing.", "Review routes must remain access-controlled outside this audit; noindex and robots.txt are not privacy controls."] };
}
