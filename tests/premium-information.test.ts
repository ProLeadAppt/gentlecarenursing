import { restorePriorLocalContext } from "./helpers/local-context-review";
import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import { createElement, type ComponentType } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { FAQ_CATEGORIES, ALL_FAQ_ITEMS } from "../src/content/faq";
import { AREAS_CONTENT } from "../src/content/areas-content";
import baseline from "./fixtures/information-baseline.json";

// Render the actual route modules and unchanged shared components. Node SSR
// does not load the stylesheet; real-browser CSS/runtime checks remain separate.
const nativeRequire = createRequire(import.meta.url);
nativeRequire.extensions[".css"] = () => undefined;
const css = readFileSync("src/app/premium-information.css", "utf8");
const digest = (value: string | Buffer) => createHash("sha256").update(value).digest("hex");
const normalizeIds = (value: string) => value.replace(/_R_[a-zA-Z0-9]+_/g, "_REACT_ID_");
const unwrapPresentationDivs = (html: string) => {
  const wrappers: boolean[] = [];
  const result = html.replace(/<\/?div\b[^>]*>/g, tag => {
    if (tag.startsWith("</")) return wrappers.pop() ? "" : tag;
    const added = /class="(?:premium-information premium-(?:about|faq|areas)|information-founder|information-credentials)"/.test(tag);
    wrappers.push(added);
    return added ? "" : tag;
  });
  assert.equal(wrappers.length, 0);
  return result;
};
const semanticDOM = (html: string) => normalizeIds(unwrapPresentationDivs(html).replace(/\s(?:class|style)="[^"]*"/g, ""));
const renders: Record<string, string> = {};

for (const route of ["about", "faq", "areas"] as const) {
  const actual = nativeRequire(`../src/app/${route}/page.tsx`) as { default: ComponentType; metadata: unknown };
  const html = renderToStaticMarkup(createElement(actual.default));
  renders[route] = html;
  const original = baseline.routes[route];
  const source = readFileSync(`src/app/${route}/page.tsx`, "utf8");

  test(`${route}: complete original semantic DOM, copy order, schema, images and links are preserved`, () => {
    assert.equal(semanticDOM(html), semanticDOM(original.html));
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
    assert.doesNotMatch(html, /<main\b|<iframe\b|<form\b|data-analytics-action=/);
    const levels = [...html.matchAll(/<h([1-6])\b/g)].map(m => Number(m[1]));
    for (let i = 1; i < levels.length; i++) assert.ok(levels[i] <= levels[i - 1] + 1);
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]);
    assert.equal(ids.length, new Set(ids).size);
    for (const m of html.matchAll(/(?:aria-controls|aria-labelledby)="([^"]+)"/g)) {
      for (const id of m[1].split(/\s+/)) assert.ok(ids.includes(id), id);
    }
    const wrappers = route === "about" ? 3 : 1;
    assert.equal((html.match(/<div\b/g) ?? []).length - (original.html.match(/<div\b/g) ?? []).length, wrappers);
  });

  test(`${route}: original metadata and routing remain exact, with no new client behaviour or tracking`, () => {
    assert.deepEqual(actual.metadata, original.metadata);
    assert.equal(source.slice(source.indexOf("export const metadata"), source.indexOf("export default")), original.metadataSource);
    assert.doesNotMatch(source, /"use client"|onSubmit=|onClick=|fetch\(|data-analytics|openModal\(|FormModalTrigger/);
    assert.match(source, /import "\.\.\/premium-information\.css"/);
  });
}

test("information pages: shared production is unchanged, with later discovery routes separately covered", () => {
  for (const [path, hash] of Object.entries(baseline.unchangedFiles)) {
    // Hidden-navigation fallback: exact source reconstruction in hidden-navigation.test.ts.
    if (["src/components/layout/Nav.tsx", "src/components/layout/MobileCta.tsx"].includes(path)) continue;
    // Exact enquiry-session delta: authentication and preservation in enquiry-session-guard.test.ts.
    if (["src/components/forms/ContactForm.tsx", "src/components/forms/SimpleContactForm.tsx", "src/components/forms/ReferralForm.tsx", "src/components/ui/FormModal.tsx"].includes(path)) continue;
    // Referral outcome/lifecycle changes are independently covered in referral-concierge-outcome.test.ts.
    if (["src/components/forms/ReferralConcierge.tsx", "src/components/ui/FormModal.tsx", "src/lib/form-client.ts"].includes(path)) continue;
    // Only review motion/focus changes: preservation and behavior in review-reduced-motion.test.ts.
    if (["src/components/review/ReviewFunnel.tsx", "src/components/review/StarRating.tsx"].includes(path)) continue;
    // Seven remaining templates: exact source and all-35-URL parity in premium-complete.test.ts.
    if (["src/app/areas/[region]/page.tsx", "src/app/suburbs/[suburb]/page.tsx", "src/app/conditions/[condition]/page.tsx", "src/app/blog/[slug]/page.tsx", "src/app/privacy/page.tsx", "src/app/terms/page.tsx", "src/app/review/page.tsx"].includes(path)) continue;
    // Full original-source and all-30-route parity: premium-service-region.test.ts.
    if (["src/app/services/[service]/[region]/page.tsx", "src/components/sections/ServiceRegionPageLayout.tsx"].includes(path)) continue;
    // These route wrappers have complete original semantic DOM and metadata
    // coverage in premium-discovery.test.ts; all shared production stays exact.
    if (["src/app/conditions/page.tsx", "src/app/suburbs/page.tsx", "src/app/blog/page.tsx"].includes(path)) continue;
    // Remove only the Next smooth-scroll opt-in; retain the original layout hash.
    assert.equal(digest(path === "src/content/suburbs.ts" ? restorePriorLocalContext(readFileSync(path, "utf8")) : path === "src/app/layout.tsx" ? readFileSync(path, "utf8").replace('<html lang="en" data-scroll-behavior="smooth"', '<html lang="en"') : path === "src/app/globals.css" ? readFileSync(path, "utf8").replace('@import "tailwindcss" source("../");', '@import "tailwindcss";') : readFileSync(path)), hash, path);
  }
});

test("about: original founder, care claims, credentials, image and CTA component calls remain intact", () => {
  const source = readFileSync("src/app/about/page.tsx", "utf8");
  assert.match(source, /<FounderStory\s+name=\{FOUNDER_STORY.name\}\s+title=\{FOUNDER_STORY.title\}\s+bio=\{FOUNDER_STORY.bio\}\s+quote=\{FOUNDER_STORY.quote\}\s+imageSrc=\{FOUNDER_STORY.imageSrc\}\s+imageAlt=\{FOUNDER_STORY.imageAlt\}\s*\/>/);
  assert.match(source, /<CredentialsSection variant="default" \/>/);
  assert.match(source, /primaryCta=\{CTA_LINKS.requestCare\}/);
  assert.match(source, /secondaryCta=\{CTA_LINKS.contact\}/);
  assert.equal((renders.about.match(/<img\b/g) ?? []).length, 1);
  assert.equal((renders.about.match(/<blockquote\b/g) ?? []).length, 1);
});

test("faq: every original category, answer relationship, collapsed state and multi-open control is preserved", () => {
  const html = renders.faq;
  assert.equal((html.match(/information-faq-category/g) ?? []).length, FAQ_CATEGORIES.length);
  assert.equal((html.match(/aria-expanded="false"/g) ?? []).length, ALL_FAQ_ITEMS.length);
  assert.equal((html.match(/role="region"/g) ?? []).length, ALL_FAQ_ITEMS.length);
  for (const item of ALL_FAQ_ITEMS) {
    assert.ok(html.includes(`aria-controls="faq-answer-${item.id}" id="faq-question-${item.id}"`));
    assert.ok(html.includes(`id="faq-answer-${item.id}" role="region" aria-labelledby="faq-question-${item.id}" hidden=""`));
  }
  assert.match(readFileSync("src/app/faq/page.tsx", "utf8"), /<FaqAccordion\s+items=\{category.items\}\s+allowMultiple\s+className="information-accordion"\s*\/>/);
  assert.doesNotMatch(css, /\[hidden\]|display:\s*(?:none|block)|visibility:\s*hidden/);
});

test("areas: only the index is styled, with every regional destination and original request-care action retained", () => {
  const links = [...renders.areas.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map(m => m[1]);
  assert.deepEqual(links, ["/", ...AREAS_CONTENT.map(area => `/areas/${area.slug}`), "/referral"]);
  assert.equal((renders.areas.match(/class="information-region-card /g) ?? []).length, AREAS_CONTENT.length);
  for (const path of ["src/app/areas/[region]/page.tsx", "src/app/services/[service]/[region]/page.tsx", "src/app/suburbs/[suburb]/page.tsx", "src/app/blog/[slug]/page.tsx"]) {
    // These changed dynamic templates have exact source/all-URL parity in premium-complete.test.ts.
    if (["src/app/areas/[region]/page.tsx", "src/app/suburbs/[suburb]/page.tsx", "src/app/conditions/[condition]/page.tsx", "src/app/blog/[slug]/page.tsx"].includes(path)) continue;
    // The service-region route now has its own full original-source and 30-route parity.
    if (path === "src/app/services/[service]/[region]/page.tsx") continue;
    assert.equal(digest(path === "src/app/globals.css" ? readFileSync(path, "utf8").replace('@import "tailwindcss" source("../");', '@import "tailwindcss";') : readFileSync(path)), baseline.unchangedFiles[path as keyof typeof baseline.unchangedFiles]);
  }
});

test("information styles: opt-in isolation, keyboard focus, readable reflow and reduced motion are explicit", () => {
  const selectors = [...css.replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/([^{}]+)\{/g)].map(m => m[1].trim());
  for (const selector of selectors.filter(s => !s.startsWith("@"))) {
    for (const branch of selector.split(/,(?![^()]*\))/)) assert.ok(branch.trim().startsWith(".premium-information"), branch);
  }
  assert.match(css, /grid-template-columns: minmax\(0, 1fr\)/);
  assert.match(css, /min-width: 0/);
  assert.match(css, /white-space: normal/);
  assert.match(css, /overflow-wrap: anywhere/);
  assert.match(css, /\.premium-information button:focus-visible \{ outline: 3px solid var\(--information-berry\)/);
  assert.match(css, /\.information-cta a:focus-visible \{ outline-color: var\(--information-cream\)/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.doesNotMatch(css, /@import|@font-face|transition:\s*all|opacity:\s*0\b|position:\s*(?:fixed|sticky)|pointer-events:\s*none/);
  const importers: string[] = [];
  function walk(dir: string) { for (const e of readdirSync(dir, { withFileTypes: true })) { const p = join(dir, e.name); if (e.isDirectory()) walk(p); else if (/\.(?:tsx?|css)$/.test(p) && p !== "src/app/premium-information.css" && readFileSync(p, "utf8").includes("premium-information.css")) importers.push(p); } }
  walk("src"); assert.deepEqual(importers, ["src/app/about/page.tsx", "src/app/areas/page.tsx", "src/app/faq/page.tsx"]);
});

test("information palette: planned text and focus pairs meet WCAG contrast thresholds", () => {
  const luminance = (hex: string) => hex.match(/\w\w/g)!.map(x => parseInt(x, 16) / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4).reduce((sum, value, i) => sum + value * [.2126, .7152, .0722][i], 0);
  const contrast = (a: string, b: string) => { const [low, high] = [luminance(a), luminance(b)].sort((x, y) => x - y); return (high + .05) / (low + .05); };
  for (const background of ["fdf6ec", "fffdf9", "e8eee3"]) {
    for (const foreground of ["332e2a", "615b54", "842833", "486141"]) assert.ok(contrast(foreground, background) >= 4.5, `${foreground}/${background}`);
  }
  for (const [foreground, background] of [["ffffff", "842833"], ["fdf6ec", "3d0a11"], ["e9d8d0", "3d0a11"]]) assert.ok(contrast(foreground, background) >= 4.5);
});
