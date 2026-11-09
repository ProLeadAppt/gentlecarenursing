import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { PremiumFundingCare } from "../src/components/sections/PremiumFundingCare";
import { ServicePageLayout } from "../src/components/sections/ServicePageLayout";
import { FormModalProvider } from "../src/contexts/FormModalContext";
import { NDIS_PAGE, DVA_PAGE, AGED_CARE_PAGE, PRIVATE_NURSING_PAGE } from "../src/content/services";
import { getBlogPostBySlug } from "../src/content/blog";

// Source parity is deliberately not a claim of clinical accuracy or provider verification.
const render = (child: React.ReactNode) => renderToStaticMarkup(createElement(FormModalProvider, null, child));
const decode = (value: string) => value.replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ");
const text = (html: string) => decode(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "").replace(/<[^>]*>/g, "")).replace(/\s+/g, " ").trim();
const elements = (html: string, tag: string) => [...html.matchAll(new RegExp(`<${tag}\\b([^>]*)>([\\s\\S]*?)<\\/${tag}>`, "g"))];
const attr = (attributes: string, name: string) => decode(attributes.match(new RegExp(`(?:^|\\s)${name}="([^"]*)"`))?.[1] ?? "");
const links = (html: string) => elements(html, "a").map(match => attr(match[1], "href"));
const schemas = (html: string) => elements(html, "script").filter(match => attr(match[1], "type") === "application/ld+json").map(match => JSON.parse(match[2]));
const source = readFileSync("src/components/sections/PremiumFundingCare.tsx", "utf8");
const css = readFileSync("src/app/premium-funding.css", "utf8");
const pages = [{ pathway: "ndis", data: NDIS_PAGE }, { pathway: "dva", data: DVA_PAGE }, { pathway: "aged-care", data: AGED_CARE_PAGE }, { pathway: "private-nursing", data: PRIVATE_NURSING_PAGE }] as const;
const digest = (value: string | Buffer) => createHash("sha256").update(value).digest("hex");

// Immutable pre-funding baseline hashes, stored here so tests are portable.
const unchangedFiles: Record<string, string> = {
  "src/content/services.ts": "89829e044a911bf0f8b538bd5238d686ad923dad9caa2227ef0d43226b3f4349",
  "src/lib/schema.ts": "cce1b6aa737107e836ca23c623a6e2e3e584c87a96d0fbad555140566c5f0e33",
  "src/lib/metadata.ts": "2bda40733fc97f460d2c16491dbc5819297f1a595e877de05fa7bdfdedfad47c",
  "src/lib/constants.ts": "f756543ddb3395af3de35f2b7a8bf336135773b556db8a3c21e4f96267d94a0c",
  "src/app/services/premium-care.css": "f22f1581e2afa7a066192400c353f7b54044d7b969ef1165a89fcd359ed5cfa0",
  "src/components/sections/ServicePageLayout.tsx": "76242bd93331cb18c6e52bb25895b8d95b657b64969079bc79946545df6cf1d5",
  "src/components/sections/EvidencePanel.tsx": "5c24d4e7f4ced28965efb8deea1031a23b3abd7e4085e7870abf22c0cdc66ee2",
  "src/components/sections/ServiceCtaWithModal.tsx": "80c624eb395842d9d35d1df811739f5c8065f741580185603ef5443ad88817a0",
  "src/components/sections/CtaSection.tsx": "6a04a99df2bc6046348e8baf10c2bad6dad7968521d12aab9557d305c5e7ac2f",
  "src/components/sections/FaqAccordion.tsx": "15e289021ac7e48f78a30a2e1be2e10f0573504f1e3e058c17314f54fef9ba16",
  "src/components/ui/FormModalTrigger.tsx": "83f2801cb11ea37795aff294a7c3711c4505b27f528be9d3529a44ba83baf85a",
  "src/contexts/FormModalContext.tsx": "f0b702cb6f88dfc6cad3ceafc58b432b11843d428bd7276e9381e9e03b5fd541",
  "src/app/services/[service]/[region]/page.tsx": "54fc58f2fcdced37944cd87dd138945d490a29b4ebbe5182ad4bb787d2293c2d"
};
const metadataHashes: Record<string, string> = {
  "private-nursing": "46d9e3a31cb7a307707f3606d9e4adbd49d3801fba80fbedb9b69ab8334b4443",
  "ndis": "c18801fd4d35394644cbc933c8b06fbbcfd8b17c17fd3f0ba7a72b6aedd672dd",
  "dva": "f7a10d0766d25ff5aea6b74d2839a6cea0fdf1d6b2a042aa6b1a88df9c5d681c",
  "aged-care": "50c054892f79de5b9c15c57c946d2acfe08646fed3bce9619555d193e8c86865"
};

test("funding presentation leaves shared data, schemas, analytics, modal/FAQ code and base CSS unchanged", () => {
  for (const [path, hash] of Object.entries(unchangedFiles)) assert.equal(digest(readFileSync(path)), hash, path);
});

for (const { pathway, data } of pages) {
  const html = render(createElement(PremiumFundingCare, { pathway }));
  const original = render(createElement(ServicePageLayout, { data }));
  const copy = text(html);

  test(`${pathway}: every original paragraph, qualification and review line survives in original order`, () => {
    let cursor = 0;
    for (const match of elements(original, "p")) {
      const paragraph = text(match[2]).replace(/^[“”]|[“”]$/g, "");
      const offset = copy.indexOf(paragraph, cursor);
      assert.ok(offset >= 0, `Missing or reordered paragraph: ${paragraph}`);
      cursor = offset + paragraph.length;
    }
    for (const value of [data.title, ...data.whoItHelps.audiences, ...data.supportAvailable.features.flatMap(item => [item.title, item.description]), ...data.whyChoose.reasons.flatMap(item => [item.title, item.description]), ...data.faqs.flatMap(item => [item.question, item.answer])]) assert.ok(copy.includes(value), value);
    for (const paragraph of elements(html, "p")) {
      assert.ok(text(original).includes(text(paragraph[2])), `Unexpected new paragraph: ${text(paragraph[2])}`);
    }
    assert.deepEqual(elements(html, "h3").map(match => text(match[2])), elements(original, "h3").map(match => text(match[2])));
    assert.ok(copy.indexOf(data.snippetAnswer!) < copy.indexOf(data.intro));
    assert.ok(copy.includes("References provide general programme or service information, not provider-specific verification."));
    assert.deepEqual(elements(html, "h2").map(match => text(match[2])), elements(original, "h2").map(match => text(match[2])), "Hero, evidence, process, who, support, related, why, FAQ, final CTA order");
    assert.equal((html.match(/<section\b/g) ?? []).length, 9);
  });

  test(`${pathway}: complete evidence terms, values, source provenance and limitations remain paired`, () => {
    assert.deepEqual(elements(html, "dt").map(match => text(match[2])), data.evidence!.items.map(item => item.label));
    assert.deepEqual(elements(html, "dd").map(match => text(match[2])), data.evidence!.items.map(item => item.value));
    for (const item of data.evidence!.items) {
      if (item.limitations) assert.ok(copy.includes(item.limitations));
      for (const reference of item.references ?? []) {
        assert.ok(copy.includes(reference.label));
        if (reference.url) {
          const references = elements(html, "a").filter(match => attr(match[1], "href") === reference.url && text(match[2]) === reference.label);
          assert.ok(references.length);
          for (const reference of references) {
            assert.equal(attr(reference[1], "target"), "_blank");
            assert.deepEqual(attr(reference[1], "rel").split(/\s+/).sort(), ["noopener", "noreferrer"]);
          }
        }
      }
    }
  });

  test(`${pathway}: schemas and all original destination counts are unchanged`, () => {
    assert.deepEqual(schemas(html), schemas(original));
    assert.deepEqual(links(html).filter(href => !href.startsWith("#")).sort(), links(original).sort());
    for (const href of links(html).filter(href => href.startsWith("/"))) {
      const slug = /^\/blog\/([^/]+)$/.exec(href)?.[1];
      assert.ok(existsSync(`src/app${href === "/" ? "" : href}/page.tsx`) || (slug && existsSync("src/app/blog/[slug]/page.tsx") && getBlogPostBySlug(slug)), href);
    }
    assert.doesNotMatch(html, /AggregateRating|ReviewAction|<video\b|<iframe\b/);
  });

  test(`${pathway}: original image, alt, caption, lazy fill and intrinsic ratio are retained`, () => {
    const images = [...html.matchAll(/<img\b([^>]*)>/g)];
    const originals = [...original.matchAll(/<img\b([^>]*)>/g)];
    assert.equal(images.length, 1);
    assert.equal(images.length, originals.length);
    for (const name of ["src", "alt", "loading", "data-nimg"]) assert.equal(attr(images[0][1], name), attr(originals[0][1], name), name);
    assert.equal(attr(images[0][1], "alt"), data.image!.alt);
    assert.equal(attr(images[0][1], "loading"), "lazy");
    assert.equal(attr(images[0][1], "data-nimg"), "fill");
    assert.ok(copy.includes(data.image!.caption!));
    assert.ok(existsSync(`public${data.image!.src}`));
    assert.match(source, /import Image from "next\/image"/);
    assert.match(css + source, /aspect-ratio:\s*16\s*\/\s*9|aspect-\[16\/9\]/);
    assert.doesNotMatch(source, /priority[=\s/>]|loading="eager"|preload[=\s/>]/);
  });

  test(`${pathway}: accessible structure, unique IDs and route-local guide targets remain explicit`, () => {
    assert.match(html, /class="premium-care premium-funding"/);
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
    assert.doesNotMatch(html, /<main\b|opacity-0|line-clamp-/);
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(ids.length, new Set(ids).size);
    const levels = [...html.matchAll(/<h([1-6])\b/g)].map(match => Number(match[1]));
    for (let i = 1; i < levels.length; i++) assert.ok(levels[i] <= levels[i - 1] + 1);
    for (const section of html.matchAll(/<section\b([^>]*)>/g)) {
      if (section[1].includes("relative overflow-hidden")) continue; // Unchanged shared CTA.
      const label = attr(section[1], "aria-labelledby");
      assert.ok(label && label.split(/\s+/).every(id => ids.includes(id)), section[1]);
    }
    const guides = elements(html, "nav").filter(match => attr(match[1], "aria-label") === "On this page");
    assert.equal(guides.length, 1);
    const expected = ["facts", "steps", "who", "support", "questions"].map(id => `#${pathway}-${id}`);
    assert.deepEqual(links(guides[0][2]), expected);
    assert.deepEqual(links(html).filter(href => href.startsWith("#")), expected);
    for (const href of expected) assert.equal(ids.filter(id => id === href.slice(1)).length, 1);
    for (const anchor of elements(html, "a")) assert.ok(text(anchor[2]).length > 2);
    assert.match(html, /<ol\b[^>]*role="list"/);
    assert.match(html, /<ul\b[^>]*role="list"/);
    for (const other of pages.filter(page => page.pathway !== pathway)) {
      assert.ok(!ids.includes(`${other.pathway}-facts`));
      for (const faq of other.data.faqs) assert.ok(!ids.includes(`faq-question-${faq.id}`));
    }
  });

  test(`${pathway}: CTA labels, counts, contact form type, analytics defaults and FAQ controls stay intact`, () => {
    const buttons = elements(html, "button");
    const originalButtons = elements(original, "button");
    assert.deepEqual(buttons.map(match => text(match[2])), originalButtons.map(match => text(match[2])));
    const actions = buttons.filter(match => ["Request Care", "Contact Us"].includes(text(match[2])));
    assert.equal(actions.length, 4);
    for (const button of actions) assert.equal(attr(button[1], "type"), "button");
    assert.equal((source.match(/<FormModalTrigger\s+formType="contact"/g) ?? []).length, 2);
    assert.match(source, /<ServiceCtaWithModal\s+title=\{data\.cta\.title\}/);
    assert.match(source, /<FaqAccordion\s/);
    assert.doesNotMatch(source, /analyticsLocation=|openModal\(|fetch\(|onClick=|onSubmit=|"use client"|data-analytics-action/);
    for (const faq of data.faqs) {
      const button = buttons.find(match => attr(match[1], "id") === `faq-question-${faq.id}`);
      assert.ok(button);
      assert.equal(attr(button[1], "aria-expanded"), "false");
      assert.equal(attr(button[1], "aria-controls"), `faq-answer-${faq.id}`);
      const panel = [...html.matchAll(/<div\b([^>]*)>/g)].find(match => attr(match[1], "id") === `faq-answer-${faq.id}`);
      assert.ok(panel);
      assert.equal(attr(panel[1], "role"), "region");
      assert.equal(attr(panel[1], "aria-labelledby"), `faq-question-${faq.id}`);
      assert.match(panel[1], /\shidden=""/);
    }
  });

  test(`${pathway}: route opts in without changing metadata`, () => {
    const route = readFileSync(`src/app/${pathway}/page.tsx`, "utf8");
    assert.ok(route.includes(`return <PremiumFundingCare pathway="${pathway}" />`));
    assert.match(route, /import "\.\.\/services\/premium-care\.css"/);
    assert.match(route, /import "\.\.\/premium-funding\.css"/);
    const metadata = route.match(/export const metadata = createMetadata\([\s\S]*?\n\}\);/)?.[0];
    assert.ok(metadata);
    assert.equal(digest(metadata), metadataHashes[pathway]);
  });
}

test("funding stylesheet is wholly scoped and imported only by four explicit care pathways", () => {
  const selectors = [...css.replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/([^{}]+)\{/g)].map(match => match[1].trim());
  for (const selector of selectors.filter(value => !value.startsWith("@"))) {
    for (const branch of selector.split(",")) assert.ok(branch.trim().startsWith(".premium-care.premium-funding"), branch);
  }
  assert.doesNotMatch(css, /@import|@font-face|transition:\s*all|opacity:\s*0\b|position:\s*(?:fixed|sticky)/);
  const importers: string[] = [];
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) walk(path);
      else if (/\.(?:tsx?|css)$/.test(path) && path !== "src/app/premium-funding.css" && readFileSync(path, "utf8").includes("premium-funding.css")) importers.push(path);
    }
  };
  walk("src");
  assert.deepEqual(importers.sort(), pages.map(page => `src/app/${page.pathway}/page.tsx`).sort());
});
