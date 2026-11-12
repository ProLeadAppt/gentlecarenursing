import { restorePriorFooterCredit } from "./helpers/footer-credit";
import { restorePriorLocalContext } from "./helpers/local-context-review";
import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import { createElement, type ComponentType } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { CONDITIONS } from "../src/content/conditions";
import { SUBURBS } from "../src/content/suburbs";
import { getAllBlogCategories, getAllBlogPosts, BLOG_CATEGORIES } from "../src/content/blog";
import { BlogCategoryFilter } from "../src/components/sections/BlogCategoryFilter";
import baseline from "./fixtures/discovery-baseline.json";

// Actual route/component SSR with original content. Node skips CSS;
// browser interactions, computed styles and visual QA remain separate gates.
const nativeRequire = createRequire(import.meta.url);
nativeRequire.extensions[".css"] = () => undefined;
const css = readFileSync("src/app/premium-discovery.css", "utf8");
const digest = (value: string | Buffer) => createHash("sha256").update(restorePriorFooterCredit(value)).digest("hex");
const semanticDOM = (html: string) => {
  const stack: boolean[] = [];
  const result = html.replace(/<\/?div\b[^>]*>/g, tag => {
    if (tag.startsWith("</")) return stack.pop() ? "" : tag;
    const added = /class="premium-discovery premium-(?:conditions|suburbs|blog)"/.test(tag);
    stack.push(added);
    return added ? "" : tag;
  });
  assert.equal(stack.length, 0);
  return result.replace(/\s(?:class|style)="[^"]*"/g, "").replace(/_R_[a-zA-Z0-9]+_/g, "_REACT_ID_");
};
const links = (html: string) => [...html.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map(m => m[1]);
const renders: Record<string, string> = {};
for (const route of ["conditions", "suburbs", "blog"] as const) {
  const actual = nativeRequire(`../src/app/${route}/page.tsx`) as { default: ComponentType; metadata: unknown };
  const html = renderToStaticMarkup(createElement(actual.default));
  renders[route] = html;
  const original = baseline.routes[route];
  const source = readFileSync(`src/app/${route}/page.tsx`, "utf8");
  test(`${route}: full original semantic DOM, ordered copy, images, schema, links and attributes are preserved`, () => {
    assert.equal(semanticDOM(html), semanticDOM(original.html));
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
    assert.doesNotMatch(html, /<main\b|<iframe\b|<form\b|data-analytics-action=/);
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]);
    assert.equal(ids.length, new Set(ids).size);
    assert.equal((html.match(/<div\b/g) ?? []).length - (original.html.match(/<div\b/g) ?? []).length, 1);
    assert.deepEqual([...html.matchAll(/<h([1-6])\b/g)].map(m => m[1]), [...original.html.matchAll(/<h([1-6])\b/g)].map(m => m[1]));
  });
  test(`${route}: original metadata and routing remain exact without new client logic`, () => {
    assert.deepEqual(actual.metadata, original.metadata);
    assert.equal(source.slice(source.indexOf("export const metadata"), source.indexOf("export default")), original.metadataSource);
    assert.match(source, /import "\.\.\/premium-discovery\.css"/);
    assert.doesNotMatch(source, /"use client"|onSubmit=|onClick=|fetch\(|data-analytics|openModal\(|FormModalTrigger/);
  });
}

test("discovery: every prior production file outside three route wrappers remains byte-identical", () => {
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
    // Only these two files are delegated to full original-source and all-30-route
    // semantic/metadata/schema parity in premium-service-region.test.ts.
    if (["src/app/services/[service]/[region]/page.tsx", "src/components/sections/ServiceRegionPageLayout.tsx"].includes(path)) continue;
    // Remove only the Next smooth-scroll opt-in; retain the original layout hash.
    assert.equal(digest(path === "src/content/suburbs.ts" ? restorePriorLocalContext(readFileSync(path, "utf8")) : path === "src/app/layout.tsx" ? readFileSync(path, "utf8").replace('<html lang="en" data-scroll-behavior="smooth"', '<html lang="en"') : path === "src/app/globals.css" ? readFileSync(path, "utf8").replace('@import "tailwindcss" source("../");', '@import "tailwindcss";') : readFileSync(path)), hash, path);
  }
});
test("conditions: every condition, schema item and both original ordinary CTA links are retained", () => {
  assert.deepEqual(links(renders.conditions), ["/", ...CONDITIONS.map(c => `/conditions/${c.slug}`), "/referral", "/contact"]);
  assert.equal((renders.conditions.match(/discovery-condition-card /g) ?? []).length, CONDITIONS.length);
  const schemas = [...renders.conditions.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map(m => JSON.parse(m[1]));
  assert.equal(schemas[0][1].hasPart.length, CONDITIONS.length);
});
test("suburbs: original regional grouping, anchor IDs and every suburb destination remain exact", () => {
  const regions = ["Inner West", "North Shore", "Northern Beaches", "Sydney CBD & East", "Western Sydney", "South Sydney"];
  const ordered = regions.flatMap(region => SUBURBS.filter(s => s.region === region));
  assert.deepEqual(links(renders.suburbs), ["/", ...ordered.map(s => `/suburbs/${s.slug}`), "/referral", "/areas"]);
  assert.equal((renders.suburbs.match(/discovery-suburb-card /g) ?? []).length, SUBURBS.length);
  for (const region of regions) assert.ok(renders.suburbs.includes(`id="${region.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and")}"`));
});
test("blog: all posts, original category controls, pathway links and ordering remain intact", () => {
  const posts = getAllBlogPosts(); const categories = getAllBlogCategories();
  assert.deepEqual(links(renders.blog), ["/", "/ndis", "/dva", "/services", "/referrers", ...posts.map(p => `/blog/${p.slug}`)]);
  assert.equal((renders.blog.match(/<button\b/g) ?? []).length, categories.length + 1);
  assert.equal((renders.blog.match(/aria-pressed="true"/g) ?? []).length, 1);
  assert.match(renders.blog, /role="group" aria-label="Filter blog posts by category"/);
  assert.match(readFileSync("src/app/blog/page.tsx", "utf8"), /<BlogIndex posts=\{posts\} categories=\{categories\} \/>/);
  const source = readFileSync("src/components/sections/BlogIndex.tsx", "utf8");
  assert.match(source, /posts\.filter\(\(p\) => p\.category === activeCategory\)/);
  assert.match(source, /onChange=\{setActiveCategory\}/);
  assert.match(source, /filteredPosts\.length === 0/);
});
test("blog: each category and All retain their own pressed state and real button semantics", () => {
  const categories = getAllBlogCategories();
  for (const activeCategory of [null, ...categories]) {
    const html = renderToStaticMarkup(createElement(BlogCategoryFilter, { categories, activeCategory, onChange: () => undefined }));
    assert.equal((html.match(/<button type="button"/g) ?? []).length, categories.length + 1);
    assert.equal((html.match(/aria-pressed="true"/g) ?? []).length, 1);
    assert.equal(html.match(/<button\b[^>]*aria-pressed="true"[^>]*>(.*?)<\/button>/)?.[1], activeCategory === null ? "All" : BLOG_CATEGORIES[activeCategory].label);
    assert.doesNotMatch(html, /role="tab|aria-selected|tabindex/);
  }
});
test("discovery styles: selectors and imports are restricted to three index routes", () => {
  const selectors = [...css.replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/([^{}]+)\{/g)].map(m => m[1].trim());
  for (const selector of selectors.filter(s => !s.startsWith("@"))) {
    for (const branch of selector.split(/,(?![^()]*\))/)) assert.ok(branch.trim().startsWith(".premium-discovery"), branch);
  }
  const importers: string[] = [];
  function walk(dir: string) {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (/\.(?:tsx?|css)$/.test(p) && p !== "src/app/premium-discovery.css" && readFileSync(p, "utf8").includes("premium-discovery.css")) importers.push(p);
    }
  }
  walk("src"); assert.deepEqual(importers, ["src/app/blog/page.tsx", "src/app/conditions/page.tsx", "src/app/suburbs/page.tsx"]);
});
test("discovery styles: responsive reflow, wrapping, focus, pressed state and reduced motion are explicit", () => {
  assert.match(css, /grid-template-columns: minmax\(0, 1fr\)/);
  assert.match(css, /repeat\(2, minmax\(0, 1fr\)\)/);
  for (const rule of [/min-width: 0/, /white-space: normal/, /overflow-wrap: anywhere/, /flex-wrap: wrap/, /min-height: 2\.75rem/, /prefers-reduced-motion: reduce/]) assert.match(css, rule);
  assert.match(css, /\.premium-discovery button:focus-visible \{ outline: 3px solid var\(--discovery-berry\)/);
  assert.match(css, /\.discovery-cta a:focus-visible \{ outline-color: var\(--discovery-cream\)/);
  assert.match(css, /button\[aria-pressed="true"\]/);
  // Tailwind v4 uses individual transforms, not only the transform property.
  assert.match(css, /\.grid > a:hover \{ transform: none; translate: none;/);
  assert.match(css, /img \{ transition: none; transform: none; translate: none; scale: none; \}/);
  assert.doesNotMatch(css, /@import|@font-face|url\(|transition:\s*all|opacity:\s*0\b|position:\s*(?:fixed|sticky)|pointer-events:\s*none|display:\s*none|visibility:\s*hidden|:has\(/);
});
test("discovery palette: planned text and focus colors meet WCAG AA contrast thresholds", () => {
  const luminance = (hex: string) => hex.match(/\w\w/g)!.map(x => parseInt(x, 16) / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4).reduce((sum, value, i) => sum + value * [.2126, .7152, .0722][i], 0);
  const contrast = (a: string, b: string) => { const [low, high] = [luminance(a), luminance(b)].sort((x, y) => x - y); return (high + .05) / (low + .05); };
  for (const background of ["fdf6ec", "fffdf9", "e8eee3", "dce5d5"]) {
    for (const foreground of ["332e2a", "615b54", "842833", "486141"]) assert.ok(contrast(foreground, background) >= 4.5, `${foreground}/${background}`);
  }
  for (const [foreground, background] of [["ffffff", "842833"], ["fdf6ec", "3d0a11"], ["e9d8d0", "3d0a11"]]) assert.ok(contrast(foreground, background) >= 4.5);
});
