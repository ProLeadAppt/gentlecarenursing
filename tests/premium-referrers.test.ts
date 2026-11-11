import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { PremiumReferrers } from "../src/components/sections/PremiumReferrers";
import { REFERRER_BLOCKS } from "../src/content/referrer-blocks";
import baseline from "./fixtures/referrers-baseline.json";

// Captured from the original PR76 route. Copy parity is not clinical verification.
const html = renderToStaticMarkup(createElement(PremiumReferrers));
const source = readFileSync("src/components/sections/PremiumReferrers.tsx", "utf8");
const css = readFileSync("src/app/referrers/premium-referrers.css", "utf8");
const decode = (value: string) => value.replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ");
const text = (html: string) => decode(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "").replace(/<[^>]*>/g, "")).replace(/\s+/g, " ").trim();
const elements = (tag: string) => [...html.matchAll(new RegExp(`<${tag}\\b([^>]*)>([\\s\\S]*?)<\\/${tag}>`, "g"))];
const attr = (attributes: string, name: string) => decode(attributes.match(new RegExp(`(?:^|\\s)${name}="([^"]*)"`))?.[1] ?? "");
const anchors = elements("a").map(m => ({href: attr(m[1], "href"), text: text(m[2])}));
const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]);
const digest = (value: string | Buffer) => createHash("sha256").update(value).digest("hex");

test("referrers: every original paragraph, qualification and heading remains in exact order", () => {
  assert.deepEqual(elements("p").map(m => text(m[2])), baseline.paragraphs);
  assert.deepEqual([...html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/g)].map(m => ({level: Number(m[1]), text: text(m[2])})), baseline.headings);
  for (const item of baseline.listItems) assert.ok(elements("li").some(m => text(m[2]) === item), item);
  assert.ok(text(html).includes("Timeframes depend on location, funding, and the type of care required."));
  assert.ok(text(html).includes("With the client’s consent"));
  assert.ok(text(html).includes("With consent, we keep you informed at key points"));
});

test("referrers: schema JSON and every original destination and link label stay unchanged", () => {
  assert.deepEqual(elements("script").filter(m => attr(m[1], "type") === "application/ld+json").map(m => JSON.parse(m[2])), baseline.schemas);
  assert.deepEqual(anchors.filter(a => !a.href.startsWith("#")), baseline.links);
  for (const link of baseline.links) assert.ok(existsSync(`src/app${link.href === "/" ? "" : link.href}/page.tsx`), link.href);
  assert.doesNotMatch(html, /HowTo|AggregateRating|<form\b|<button\b|<iframe\b/);
});

test("referrers: one H1, logical heading order and all unique guide targets remain accessible", () => {
  assert.equal(elements("h1").length, 1);
  assert.equal(ids.length, new Set(ids).size);
  const levels = [...html.matchAll(/<h([1-6])\b/g)].map(m => Number(m[1]));
  for (let i = 1; i < levels.length; i++) assert.ok(levels[i] <= levels[i-1] + 1);
  assert.equal(elements("nav").filter(m => attr(m[1], "aria-label") === "On this page").length, 1);
  assert.deepEqual(anchors.filter(a => a.href.startsWith("#")).map(a => a.href), ["#how-to-refer", "#referrer-professionals", "#referrer-expectations", "#referrer-fit", "#referrer-questions"]);
  for (const a of anchors) { assert.ok(a.text.length > 2); if (a.href.startsWith("#")) assert.ok(ids.includes(a.href.slice(1))); }
  for (const m of html.matchAll(/aria-labelledby="([^"]+)"/g)) for (const id of m[1].split(/\s+/)) assert.ok(ids.includes(id));
  assert.match(html, /<ol role="list" class="care-steps care-three-columns">/);
  assert.match(html, /<ul role="list" class="referrer-fit-list">/);
  assert.doesNotMatch(html, /<main\b|line-clamp-/);
});

test("referrers: all four professional blocks and existing deep links remain intact", () => {
  const types = ["ndis-support-coordinator", "plan-manager", "hospital-discharge-planner", "gp-primary-care"];
  for (const block of REFERRER_BLOCKS.filter(b => types.includes(b.referrerType))) {
    assert.equal(ids.filter(id => id === block.anchorId).length, 1);
    for (const value of [block.title, block.blurb, ...block.bullets]) assert.ok(text(html).includes(value), value);
  }
  assert.match(source, /<ReferrerBlocksSection/);
  assert.match(source, /<CtaSection/);
  assert.doesNotMatch(source, /FormModalTrigger|openModal\(|fetch\(|onClick=|onSubmit=|"use client"|data-analytics-action/);
});

test("referrers: metadata and all shared form, privacy, recipient, analytics and content files are unchanged", () => {
  const route = readFileSync("src/app/referrers/page.tsx", "utf8");
  assert.equal(digest(route.slice(route.indexOf("const canonical"), route.indexOf("export default"))), baseline.metadataHash);
  assert.match(route, /return <PremiumReferrers \/>/);
  for (const [path, hash] of Object.entries(baseline.unchangedFiles)) {
    // Hidden-navigation fallback: exact source reconstruction in hidden-navigation.test.ts.
    if (["src/components/layout/Nav.tsx", "src/components/layout/MobileCta.tsx"].includes(path)) continue;
    // Exact enquiry-session delta: authentication and preservation in enquiry-session-guard.test.ts.
    if (["src/components/forms/ContactForm.tsx", "src/components/forms/SimpleContactForm.tsx", "src/components/forms/ReferralForm.tsx", "src/components/ui/FormModal.tsx"].includes(path)) continue;
    // Referral outcome/lifecycle changes are independently covered in referral-concierge-outcome.test.ts.
    if (["src/components/forms/ReferralConcierge.tsx", "src/components/ui/FormModal.tsx", "src/lib/form-client.ts"].includes(path)) continue;
    // Legal text and full source/DOM/metadata parity: premium-complete.test.ts.
    if (path === "src/app/privacy/page.tsx") continue;
    // These two route-only presentation changes are covered by complete DOM,
    // metadata, form and shared-source parity in premium-enquiry-forms.test.ts.
    if (["src/app/contact/page.tsx", "src/app/referral/page.tsx"].includes(path)) continue;
    assert.equal(digest(path === "src/app/globals.css" ? readFileSync(path, "utf8").replace('@import "tailwindcss" source("../");', '@import "tailwindcss";') : readFileSync(path)), hash, path);
  }
});

test("referrers: CSS is isolated, reflows and keeps visible CTA links with contrast-aware focus", () => {
  const selectors = [...css.replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/([^{}]+)\{/g)].map(m => m[1].trim());
  for (const selector of selectors.filter(s => !s.startsWith("@"))) for (const branch of selector.split(",")) assert.ok(branch.trim().startsWith(".premium-care.premium-referrers"), branch);
  assert.match(css, /\.care-existing-cta a:focus-visible \{ outline-color: var\(--care-cream\); \}/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /white-space: normal/);
  assert.doesNotMatch(css, /@import|@font-face|transition:\s*all|opacity:\s*0\b|position:\s*(?:fixed|sticky)/);
  const importers: string[] = [];
  function walk(dir: string) { for (const e of readdirSync(dir,{withFileTypes:true})) { const p=join(dir,e.name); if(e.isDirectory()) walk(p); else if(/\.(?:tsx?|css)$/.test(p) && p!=="src/app/referrers/premium-referrers.css" && readFileSync(p,"utf8").includes("premium-referrers.css")) importers.push(p); } }
  walk("src"); assert.deepEqual(importers,["src/app/referrers/page.tsx"]);
});
