import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { getImageProps } from "next/image";
import HomePageContent from "../src/components/sections/HomePageContent";
import { HOMEPAGE_HERO, WHO_WE_SUPPORT, OUR_SERVICES } from "../src/content/homepage";

const html = renderToStaticMarkup(createElement(HomePageContent));
const source = readFileSync("src/components/sections/HomePageContent.tsx", "utf8");
const css = readFileSync("src/app/homepage.css", "utf8");
const textOnly = (value: string) => value.replace(/<[^>]*>/g, "");
const hash = (path: string) => createHash("sha256").update(readFileSync(path)).digest("hex");

test("premium homepage has one h1, named sections and no nested main landmark", () => {
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.doesNotMatch(html, /<main\b/);
  assert.equal((html.match(/<section\b/g) ?? []).length, 6);
  for (const match of html.matchAll(/<section[^>]*aria-labelledby="([^"]+)"/g)) {
    assert.equal((html.match(new RegExp(`id="${match[1]}"`, "g")) ?? []).length, 1);
  }
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]);
  assert.equal(ids.length, new Set(ids).size);
  const headings = [...html.matchAll(/<h([1-6])\b/g)].map(m => Number(m[1]));
  for (let i = 1; i < headings.length; i++) assert.ok(headings[i] <= headings[i - 1] + 1);
});

test("both hero actions preserve inline enquiry destination and analytics hooks", () => {
  const hero = html.slice(html.indexOf('<section'), html.indexOf('</section>'));
  const links = [...hero.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)];
  assert.equal(links.length, 2);
  for (const [i, match] of links.entries()) {
    assert.match(match[1], /href="#get-in-touch"/);
    assert.match(match[1], /data-analytics-location="hero"/);
    assert.ok(match[1].includes(`data-analytics-action="${i ? 'make_referral' : 'request_care'}"`));
    assert.equal(textOnly(match[2]), i ? "Make a Referral" : "Request Care");
  }
  assert.match(html, /id="get-in-touch"[^>]*aria-labelledby="get-in-touch-title"/);
  assert.match(css, /scroll-margin-top: 8rem/);
});

test("one audience gateway retains full caveats and existing private-care route", () => {
  assert.equal((html.match(/id="who-we-support"/g) ?? []).length, 1);
  assert.doesNotMatch(html, /id="start-here-title"|Need help choosing\?/);
  for (const item of WHO_WE_SUPPORT.items) {
    assert.ok(textOnly(html).includes(item.description));
    assert.equal((html.match(new RegExp(`href="${item.href}"`, "g")) ?? []).length, 1);
    assert.ok(existsSync(`src/app${item.href}/page.tsx`));
  }
  assert.match(html, /subject to DVA eligibility and clinical assessment/);
  assert.equal(WHO_WE_SUPPORT.items[3].href, "/private-nursing");
  assert.match(readFileSync("src/content/services.ts", "utf8"), /Private in-home nursing is nursing and personal care you pay for yourself/);
  for (const item of OUR_SERVICES.items) assert.ok(html.includes(`href="${item.href}"`));
  for (const href of ["/services", "/areas", "/faq", "/referrers", "/blog/choosing-the-right-home-care-provider"]) assert.ok(html.includes(`href="${href}"`));
});

test("the actual existing enquiry form renders once with its five labelled required fields", () => {
  assert.equal((html.match(/<form\b/g) ?? []).length, 1);
  for (const name of ["name", "phone", "email", "serviceType", "message"]) {
    const control = [...html.matchAll(/<(?:input|select|textarea)\b[^>]*>/g)].find(m => m[0].includes(`name="${name}"`))?.[0];
    assert.ok(control, name);
    assert.match(control, /\srequired(?:="")?/);
    const id = control.match(/\sid="([^"]+)"/)?.[1];
    assert.ok(id);
    assert.ok(html.includes(`for="${id}"`));
  }
  assert.match(html, /Not sure yet/);
  assert.match(html, /aria-busy="false"/);
  assert.match(html, /<button[^>]*type="submit"/);
  assert.match(source, /<SimpleContactForm \/>/);
  assert.doesNotMatch(source, /fetch\(|onSubmit|submitWebsiteForm|setTimeout|"use client"/);
});

test("scoped presentation does not add global selectors, forced crops, motion or hidden action cues", () => {
  // Parse the top-level style selector groups (at-rules contain nested groups).
  const selectors = [...css.replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/([^{}]+)\{/g)].map(m => m[1].trim());
  for (const selector of selectors.filter(s => !s.startsWith("@"))) {
    // A comma inside :is() is not a selector boundary. Every rule starts scoped.
    assert.ok(selector.startsWith(".premium-home"), selector);
    assert.doesNotMatch(selector, /(?:^|,)\s*(?:html|body|:root)\b/);
  }
  assert.doesNotMatch(css, /object-fit:\s*cover|overflow:\s*hidden|transition:\s*all|opacity:\s*0\b|@font-face/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /a:focus-visible/);
  assert.match(css, /outline-color: var\(--premium-cream\)/);
  assert.match(css, /minmax\(0, 1fr\)/);
  assert.doesNotMatch(source, /opacity-0|<video|<iframe|<script|AggregateRating|testimonial|Tell us what you need|Your enquiry is reviewed|Discuss the next step/);
});

function declaredHeroWidth(viewport: number, font = 16) {
  for (const entry of HOMEPAGE_HERO.heroImageSizes.split(",").map(s => s.trim())) {
    const condition = entry.match(/^\(min-width: ([\d.]+)rem\) /);
    if (condition && viewport < Number(condition[1]) * font) continue;
    const value = condition ? entry.slice(condition[0].length) : entry;
    const fixed = value.match(/^([\d.]+)rem$/);
    if (fixed) return Number(fixed[1]) * font;
    const calc = value.match(/^calc\(([\d.]+)vw - ([\d.]+)rem\)$/);
    assert.ok(calc);
    return viewport * Number(calc[1]) / 100 - Number(calc[2]) * font;
  }
  throw new Error("No image sizes fallback");
}
function actualHeroWidth(viewport: number, font = 16) {
  const units = viewport / font;
  const inset = units >= 62.5 ? 7 : units >= 47.5 ? 4 : units >= 22.5 ? 2.5 : 2.25;
  const wrap = Math.min(viewport - inset * font, 83 * font);
  return units >= 47.5 ? (wrap - (units >= 62.5 ? 3.5 : 2) * font) / 2 : wrap;
}

test("premium hero sizes match natural-image CSS geometry at every viewport and changed default fonts", () => {
  for (const font of [12, 16, 20, 24]) {
    for (let viewport = 280; viewport <= 3840; viewport++) {
      assert.ok(Math.abs(declaredHeroWidth(viewport, font) - actualHeroWidth(viewport, font)) < .00001, `${viewport}px/${font}px`);
    }
  }
  for (const token of ["max-width: 83rem", "width: calc(100% - 7rem)", "gap: 3.5rem", "min-width: 47.5rem", "min-width: 62.5rem", "height: auto"]) assert.ok(css.includes(token));
  assert.match(html, /width="1536" height="1024"/);
  assert.doesNotMatch(HOMEPAGE_HERO.heroImageAlt, /Sydney|our |nurse|client/i);
  const props = getImageProps({ src: HOMEPAGE_HERO.heroImageSrc, alt: HOMEPAGE_HERO.heroImageAlt, width: 1536, height: 1024, sizes: HOMEPAGE_HERO.heroImageSizes, priority: true, fetchPriority: "high" }).props;
  assert.equal(props.fetchPriority, "high");
  assert.notEqual(props.loading, "lazy");
  const widths = [...props.srcSet!.matchAll(/ (\d+)w/g)].map(m => Number(m[1]));
  for (const [viewport, dpr] of [[320, 3], [390, 3], [768, 2], [1440, 2]]) {
    const selected = widths.find(w => w >= declaredHeroWidth(viewport) * dpr) ?? widths.at(-1)!;
    assert.ok(selected >= actualHeroWidth(viewport) * dpr);
  }
});

test("the additional hands illustration is unchanged, described literally and lazy loaded", () => {
  assert.equal(hash("public/images/homepage-hands-chris-f-33525563.jpg"), "8998f9c89c5ed15e86ce683ad76ec6d889b381b9b5d9f44345de7f6f37e50014");
  const image = [...html.matchAll(/<img\b[^>]*>/g)].find(m => m[0].includes('alt="Two people holding hands."'))?.[0];
  assert.ok(image);
  assert.match(image, /width="1000" height="667"/);
  assert.match(image, /loading="lazy"/);
  assert.doesNotMatch(html, /2374901125|29372724/);
});
