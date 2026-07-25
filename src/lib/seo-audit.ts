export interface SeoHtmlInspection {
  title: string;
  description: string;
  canonical: string;
  ogUrl: string;
  robots: string;
  h1Count: number;
  schemaTypes: string[];
  unfinishedMarkers: string[];
  visiblePhones: string[];
  telephoneLinks: string[];
}

function decodeHtml(value: string): string {
  return value
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
}

function unique(values: string[]): string[] {
  return [...new Set(values)];
}

export function normaliseAustralianPhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (/^61(?:1300|1800)/.test(digits)) return digits.slice(2);
  if (/^614/.test(digits)) return `0${digits.slice(2)}`;
  return digits;
}

export function isCanonicalMatch(requestedUrl: string, canonicalUrl: string): boolean {
  if (requestedUrl === canonicalUrl) return true;
  const requested = new URL(requestedUrl);
  const canonical = new URL(canonicalUrl);
  return (
    requested.origin === canonical.origin &&
    requested.pathname === "/" &&
    canonical.pathname === "/" &&
    requested.search === canonical.search
  );
}

export function rebaseUrlForAudit(url: string, baseUrl: string): string {
  const source = new URL(url);
  const base = new URL(baseUrl);
  return new URL(`${source.pathname}${source.search}`, base).toString();
}

function matchTagContent(html: string, tag: string): string {
  const match = html.match(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? decodeHtml(match[1].replace(/<[^>]+>/g, "").trim()) : "";
}

function matchAttributeTag(
  html: string,
  tag: string,
  identifyingAttribute: RegExp,
  valueAttribute: string
): string {
  const tags = html.match(new RegExp(`<${tag}\\b[^>]*>`, "gi")) ?? [];
  const matchingTag = tags.find((candidate) => identifyingAttribute.test(candidate));
  if (!matchingTag) return "";
  const value = matchingTag.match(new RegExp(`${valueAttribute}=["']([^"']*)["']`, "i"));
  return value ? decodeHtml(value[1]) : "";
}

function collectSchemaTypes(value: unknown, output: string[]): void {
  if (Array.isArray(value)) {
    for (const item of value) collectSchemaTypes(item, output);
    return;
  }
  if (!value || typeof value !== "object") return;

  const record = value as Record<string, unknown>;
  const type = record["@type"];
  if (typeof type === "string") output.push(type);
  if (Array.isArray(type)) {
    for (const item of type) if (typeof item === "string") output.push(item);
  }

  for (const child of Object.values(record)) collectSchemaTypes(child, output);
}

export function parseSitemapUrls(xml: string): string[] {
  const urls = [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)].map((match) =>
    decodeHtml(match[1].trim())
  );
  return unique(urls);
}

export function inspectSeoHtml(html: string): SeoHtmlInspection {
  const schemaTypes: string[] = [];
  for (const match of html.matchAll(
    /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
  )) {
    try {
      collectSchemaTypes(JSON.parse(match[1]), schemaTypes);
    } catch {
      schemaTypes.push("INVALID_JSON_LD");
    }
  }

  const body = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? html;
  const visibleText = decodeHtml(
    body
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
  );

  const markerDefinitions = ["placeholder", "TBD", "TODO", "to be added", "real quote", "composite review"];
  const unfinishedMarkers = markerDefinitions.filter((marker) =>
    visibleText.toLowerCase().includes(marker.toLowerCase())
  );

  const visiblePhones = unique(
    [...visibleText.matchAll(/\b(?:1300|1800)\s+\d{3}\s+\d{3}\b/g)].map((match) => match[0])
  );
  const telephoneLinks = unique(
    [...html.matchAll(/href=["']tel:([^"']+)["']/gi)].map((match) => decodeHtml(match[1]))
  );

  return {
    title: matchTagContent(html, "title"),
    description: matchAttributeTag(html, "meta", /\bname=["']description["']/i, "content"),
    canonical: matchAttributeTag(html, "link", /\brel=["']canonical["']/i, "href"),
    ogUrl: matchAttributeTag(html, "meta", /\bproperty=["']og:url["']/i, "content"),
    robots: matchAttributeTag(html, "meta", /\bname=["']robots["']/i, "content"),
    h1Count: (html.match(/<h1\b/gi) ?? []).length,
    schemaTypes: unique(schemaTypes).sort(),
    unfinishedMarkers,
    visiblePhones,
    telephoneLinks,
  };
}
