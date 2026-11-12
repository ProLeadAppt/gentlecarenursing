import { restorePriorLocalContext } from "./helpers/local-context-review";
import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import { createElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { FormModalProvider } from "../src/contexts/FormModalContext";
import { getAllServiceRegionParams, getServiceRegionPage } from "../src/content/service-regions";
import baseline from "./fixtures/service-region-baseline.json";

// These immutable captures are copied, not regenerated, from the assessed
// pre-dynamic tree. Only classes/styles and four named presentation divs may
// differ. Every original element, text node and meaningful attribute stays exact.
const nativeRequire = createRequire(import.meta.url);
nativeRequire.extensions[".css"] = () => undefined;
const routePath = "src/app/services/[service]/[region]/page.tsx";
const layoutPath = "src/components/sections/ServiceRegionPageLayout.tsx";
type Params = { service: string; region: string };
const route = nativeRequire(`../${routePath}`) as {
  default: (props: { params: Promise<Params> }) => Promise<ReactNode>;
  generateMetadata: (props: { params: Promise<Params> }) => Promise<unknown>;
  generateStaticParams: () => Promise<Params[]>;
  dynamicParams: boolean;
};
const css = readFileSync("src/app/premium-service-region.css", "utf8");
const digest = (value: string | Buffer) => createHash("sha256").update(value).digest("hex");
const normalizeIds = (value: string) => value.replace(/_R_[a-zA-Z0-9]+_/g, "_REACT_ID_");
function semanticDOM(html: string) {
  const stack: boolean[] = [];
  const unwrapped = html.replace(/<\/?div\b[^>]*>/g, tag => {
    if (tag.startsWith("</")) return stack.pop() ? "" : tag;
    const added = /^<div class="(?:premium-service-region|region-evidence|region-faq|region-cta)">$/.test(tag);
    stack.push(added);
    return added ? "" : tag;
  });
  assert.equal(stack.length, 0);
  return normalizeIds(unwrapped.replace(/\s(?:class|style)="[^"]*"/g, ""));
}
const schemas = (html: string) => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
const links = (html: string) => [...html.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map(m => m[1]);
const paths = Object.keys(baseline.routes).sort();
const walk = (dir: string): string[] => readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]);

for (const [path, original] of Object.entries(baseline.routes)) {
  test(`${path}: complete original semantic DOM, ordered copy, claims and controls remain exact`, async () => {
    const element = await route.default({ params: Promise.resolve(original.params) });
    const html = renderToStaticMarkup(createElement(FormModalProvider, null, element));
    assert.equal(semanticDOM(html), semanticDOM(original.html));
    assert.deepEqual(links(html), links(original.html));
    assert.equal((html.match(/<div\b/g) ?? []).length - (original.html.match(/<div\b/g) ?? []).length, 4);
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
    assert.doesNotMatch(html, /<main\b|<form\b|<iframe\b/);
    const levels = [...html.matchAll(/<h([1-6])\b/g)].map(m => Number(m[1]));
    assert.deepEqual(levels, original.headingLevels);
    for (let i = 1; i < levels.length; i++) assert.ok(levels[i] <= levels[i - 1] + 1);
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]);
    assert.equal(ids.length, new Set(ids).size);
    for (const m of html.matchAll(/(?:aria-controls|aria-labelledby)="([^"]+)"/g)) {
      for (const id of m[1].split(/\s+/)) assert.ok(ids.includes(id), id);
    }
    const page = getServiceRegionPage(original.params.service, original.params.region)!;
    assert.equal((html.match(/aria-expanded="false"/g) ?? []).length, page.faqs.length);
    for (const faq of page.faqs) {
      assert.ok(html.includes(`id="faq-answer-${faq.id}" role="region" aria-labelledby="faq-question-${faq.id}" hidden=""`));
    }
  });
  test(`${path}: metadata, canonical, regional OG image and complete JSON-LD remain exact`, async () => {
    const props = { params: Promise.resolve(original.params) };
    const metadata = await route.generateMetadata(props) as typeof original.metadata;
    assert.deepEqual(metadata, original.metadata);
    assert.equal(new URL(String(metadata.alternates.canonical)).pathname, path);
    assert.equal(new URL(metadata.openGraph.url).pathname, path);
    assert.equal(new URL(metadata.openGraph.images[0].url).pathname, `${path}/opengraph-image`);
    const html = renderToStaticMarkup(createElement(FormModalProvider, null, await route.default(props)));
    assert.deepEqual(schemas(html), original.schemas);
    const nodes = schemas(html).flat();
    assert.equal(nodes.filter(n => n["@type"] === "BreadcrumbList").length, 1);
    assert.deepEqual(nodes.map(n => n["@type"]), original.schemaTypes);
  });
}

test("service-region: only the original five services × six regions are generated", async () => {
  assert.equal(route.dynamicParams, false);
  const params = await route.generateStaticParams();
  assert.deepEqual(params, getAllServiceRegionParams());
  assert.equal(params.length, 30);
  assert.equal(new Set(params.map(p => p.service)).size, 5);
  assert.equal(new Set(params.map(p => p.region)).size, 6);
  assert.deepEqual(params.map(p => `/services/${p.service}/${p.region}`).sort(), paths);
  assert.equal(new Set(paths).size, 30);
});
test("service-region: unknown, mixed-validity, case-changed and empty params retain 404 and empty metadata", async () => {
  const params = await route.generateStaticParams();
  const invalid = [
    { service: "__unknown__", region: "__unknown__" },
    ...[...new Set(params.map(p => p.service))].flatMap(service => [{ service, region: "__unknown__" }, { service, region: "" }]),
    ...[...new Set(params.map(p => p.region))].flatMap(region => [{ service: "__unknown__", region }, { service: "", region }]),
    { service: params[0].service.toUpperCase(), region: params[0].region },
    { service: params[0].service, region: params[0].region.toUpperCase() },
  ];
  for (const value of invalid) {
    const props = { params: Promise.resolve(value) };
    await assert.rejects(() => route.default(props), (error: unknown) => (error as { digest?: string }).digest === "NEXT_HTTP_ERROR_FALLBACK;404");
    assert.deepEqual(await route.generateMetadata(props), {});
  }
});
test("service-region: route and layout differ only by CSS import, four named wrappers and class hooks", () => {
  const source = readFileSync(routePath, "utf8")
    .replace('import "../../../premium-service-region.css";\n', "")
    .replace('      <div className="premium-service-region">\n        <ServiceRegionPageLayout data={page} />\n      </div>', '      <ServiceRegionPageLayout data={page} />');
  assert.equal(source, baseline.routeSource);
  const layout = readFileSync(layoutPath, "utf8")
    .replace(/      <div className="region-(?:evidence|faq|cta)">\n([\s\S]*?)\n      <\/div>/g, (_, block: string) => block.split("\n").map(line => line.slice(2)).join("\n"))
    .replace(/className="region-[\w-]+ /g, 'className="');
  assert.equal(layout, baseline.layoutSource);
  // This includes every evidence/funding map, modal formType/analytics prop,
  // FAQ mode, region/service link, schema helper call and finite parameter guard.
});
test("service-region: every other source, asset, configuration and dependency file stays byte-identical", () => {
  // Only seven changed route files transfer to exact source and all-35-URL parity.
  const laterRoutes = ["src/app/areas/[region]/page.tsx", "src/app/suburbs/[suburb]/page.tsx", "src/app/conditions/[condition]/page.tsx", "src/app/blog/[slug]/page.tsx", "src/app/privacy/page.tsx", "src/app/terms/page.tsx", "src/app/review/page.tsx"];
  for (const [path, hash] of Object.entries(baseline.unchangedFiles)) {
    // Hidden-navigation fallback: exact source reconstruction in hidden-navigation.test.ts.
    if (["src/components/layout/Nav.tsx", "src/components/layout/MobileCta.tsx"].includes(path)) continue;
    // Exact enquiry-session delta: authentication and preservation in enquiry-session-guard.test.ts.
    if (["src/components/forms/ContactForm.tsx", "src/components/forms/SimpleContactForm.tsx", "src/components/forms/ReferralForm.tsx", "src/components/ui/FormModal.tsx"].includes(path)) continue;
    // Referral outcome/lifecycle changes are independently covered in referral-concierge-outcome.test.ts.
    if (["src/components/forms/ReferralConcierge.tsx", "src/components/ui/FormModal.tsx", "src/lib/form-client.ts"].includes(path)) continue;
    // Only review motion/focus changes: preservation and behavior in review-reduced-motion.test.ts.
    if (["src/components/review/ReviewFunnel.tsx", "src/components/review/StarRating.tsx"].includes(path)) continue;
    if (laterRoutes.includes(path)) continue;
    // Remove only the Next smooth-scroll opt-in; retain the original layout hash.
    assert.equal(digest(path === "src/content/suburbs.ts" ? restorePriorLocalContext(readFileSync(path, "utf8")) : path === "src/app/layout.tsx" ? readFileSync(path, "utf8").replace('<html lang="en" data-scroll-behavior="smooth"', '<html lang="en"') : path === "src/app/globals.css" ? readFileSync(path, "utf8").replace('@import "tailwindcss" source("../");', '@import "tailwindcss";') : readFileSync(path)), hash, path);
  }
  const expected = [...Object.keys(baseline.unchangedFiles).filter(p => p.startsWith("src/") || p.startsWith("public/")), routePath, layoutPath, "src/app/premium-service-region.css", "src/app/premium-editorial.css", "src/app/premium-locality.css", "src/app/premium-utility.css"].sort();
  assert.deepEqual([...walk("src"), ...walk("public")].sort(), expected);
});
test("service-region: CSS is opt-in and imported only by the existing service-region route", () => {
  const selectors = [...css.replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/([^{}]+)\{/g)].map(m => m[1].trim());
  for (const selector of selectors.filter(s => !s.startsWith("@"))) {
    for (const branch of selector.split(/,(?![^()]*\))/)) assert.ok(branch.trim().startsWith(".premium-service-region"), branch);
  }
  const importers = walk("src").filter(p => /\.(?:tsx?|css)$/.test(p) && p !== "src/app/premium-service-region.css" && readFileSync(p, "utf8").includes("premium-service-region.css"));
  assert.deepEqual(importers, [routePath]);
  const optIns = walk("src").filter(p => /\.tsx$/.test(p) && readFileSync(p, "utf8").includes('className="premium-service-region"'));
  assert.deepEqual(optIns, [routePath]);
});
test("service-region: reflow, no sticky sidebar, visible pre-hydration content and reduced motion are explicit", () => {
  for (const pattern of [/grid-template-columns: minmax\(0, 1fr\)/, /repeat\(2, minmax\(0, 1fr\)\)/, /min-width: 0/, /white-space: normal/, /overflow-wrap: anywhere/, /flex-wrap: wrap/, /min-height: 2\.75rem/, /height: auto/, /prefers-reduced-motion: reduce/]) assert.match(css, pattern);
  assert.match(css, /\.region-suburbs \{ position: static; \}/);
  assert.match(css, /\[style\*="opacity"\] \{ opacity: 1 !important; transform: none !important;/);
  assert.match(css, /\.reveal \{ opacity: 1; transform: none; transition: none;/);
  assert.match(css, /\.region-related-links a:hover \{[^}]*transform: none; translate: none;/);
  assert.match(css, /\.region-actions > div \{[^}]*transform: none !important;/);
  assert.match(css, /\.premium-service-region button:focus-visible \{ outline: 3px solid var\(--region-berry\)/);
  assert.match(css, /\.region-cta button:focus-visible \{ outline-color: var\(--region-cream\)/);
  assert.doesNotMatch(css, /@import|@font-face|url\(|transition:\s*all|opacity:\s*0\b|position:\s*(?:fixed|sticky)|pointer-events:\s*none|display:\s*none|visibility:\s*hidden|\[hidden\]|:has\(/);
});
test("service-region: planned text and focus palette meets WCAG AA contrast ratios", () => {
  const luminance = (hex: string) => hex.match(/\w\w/g)!.map(x => parseInt(x, 16) / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4).reduce((sum, value, i) => sum + value * [.2126, .7152, .0722][i], 0);
  const contrast = (a: string, b: string) => { const [low, high] = [luminance(a), luminance(b)].sort((x, y) => x - y); return (high + .05) / (low + .05); };
  for (const background of ["fdf6ec", "fffdf9", "e8eee3", "dce5d5"]) {
    for (const foreground of ["332e2a", "615b54", "842833", "486141"]) assert.ok(contrast(foreground, background) >= 4.5, `${foreground}/${background}`);
  }
  for (const [foreground, background] of [["ffffff", "842833"], ["ffffff", "3d0a11"], ["fdf6ec", "3d0a11"], ["e9d8d0", "3d0a11"], ["3d0a11", "e8eee3"]]) assert.ok(contrast(foreground, background) >= 4.5);
});
