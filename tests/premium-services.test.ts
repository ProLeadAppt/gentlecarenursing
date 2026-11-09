import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { PremiumServicesHub } from "../src/components/sections/PremiumServicesHub";
import { PremiumNursingCare } from "../src/components/sections/PremiumNursingCare";
import { ServicePageLayout } from "../src/components/sections/ServicePageLayout";
import { FormModalProvider } from "../src/contexts/FormModalContext";
import { NURSING_CARE_PAGE, SERVICES } from "../src/content/services";
import { GMB_SERVICES } from "../src/content/gmb-services";

const render = (child: React.ReactNode) => renderToStaticMarkup(createElement(FormModalProvider, null, child));
const hub = render(createElement(PremiumServicesHub));
const nursing = render(createElement(PremiumNursingCare));
const original = render(createElement(ServicePageLayout, { data: NURSING_CARE_PAGE }));
const css = readFileSync("src/app/services/premium-care.css", "utf8");
const decode = (value: string) => value.replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ");
const text = (html: string) => decode(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "").replace(/<[^>]*>/g, "")).replace(/\s+/g, " ");
const schemas = (html: string) => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
const links = (html: string) => [...html.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map(match => decode(match[1]));

for (const [name, html] of [["services hub", hub], ["clinical nursing", nursing]]) {
  test(`${name} has one H1, named sections, unique IDs and a logical heading order`, () => {
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
    assert.doesNotMatch(html, /<main\b/);
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(ids.length, new Set(ids).size);
    for (const section of html.matchAll(/<section\b([^>]*)>/g)) {
      if (name === "clinical nursing" && section[1].includes("relative overflow-hidden")) continue;
      assert.match(section[1], /aria-label(?:ledby)?=/);
      const label = section[1].match(/aria-labelledby="([^"]+)"/)?.[1];
      if (label) assert.ok(ids.includes(label));
    }
    const headings = [...html.matchAll(/<h([1-6])\b/g)].map(match => Number(match[1]));
    for (let index = 1; index < headings.length; index++) assert.ok(headings[index] <= headings[index - 1] + 1);
  });
  test(`${name} page-guide links resolve once and have persistent, descriptive link text`, () => {
    const nav = html.match(/<nav[^>]*aria-label="On this page"[^>]*>([\s\S]*?)<\/nav>/)?.[1];
    assert.ok(nav);
    for (const href of links(nav)) {
      assert.ok(href.startsWith("#"));
      assert.equal((html.match(new RegExp(`id="${href.slice(1)}"`, "g")) ?? []).length, 1);
    }
    for (const link of html.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/g)) assert.ok(text(link[1]).trim().length > 2);
    assert.doesNotMatch(html, /opacity-0|line-clamp-/);
  });
  test(`${name} internal page destinations exist, no new media or remote embeds are added`, () => {
    for (const href of links(html).filter(href => href.startsWith("/"))) assert.ok(existsSync(`src/app${href === "/" ? "" : href}/page.tsx`), href);
    assert.doesNotMatch(html, /<img\b|<video\b|<iframe\b/);
    assert.doesNotMatch(html, /AggregateRating|ReviewAction|data-analytics-action=/);
  });
}

test("hub keeps every core service and complete service-directory content with original destinations", () => {
  const copy = text(hub);
  for (const service of SERVICES) {
    assert.ok(copy.includes(service.title));
    assert.ok(copy.includes(service.benefitLine));
    assert.ok(links(hub).includes(service.href));
  }
  for (const service of GMB_SERVICES) {
    assert.ok(copy.includes(service.name));
    if (service.description) assert.ok(copy.includes(service.description));
    if (service.href) assert.ok(links(hub).includes(service.href));
  }
  assert.equal((hub.match(/care-directory-item/g) ?? []).length, GMB_SERVICES.length);
  assert.equal((hub.match(/class="care-pathway"/g) ?? []).length, 4);
  for (const href of ["/ndis", "/dva", "/aged-care", "/private-nursing", "/referral", "/contact"]) assert.ok(links(hub).includes(href));
  assert.ok(copy.includes("For eligible veterans and families who need clinically necessary care at home, directly claimed through DVA."));
  assert.ok(copy.includes("For people arranging fee-for-service care. Contact the team to confirm suitable support, costs and availability."));
  assert.doesNotMatch(hub, /<button\b|<form\b/);
});

test("clinical page retains all data wording, audience entries, features, reasons and FAQs", () => {
  const copy = text(nursing);
  const data = NURSING_CARE_PAGE;
  const preserved = [data.title, data.intro, data.snippetAnswer!, data.whoItHelps.title, data.whoItHelps.description, ...data.whoItHelps.audiences, data.supportAvailable.title, data.supportAvailable.description, ...data.supportAvailable.features.flatMap(item => [item.title, item.description]), data.whyChoose.title, data.whyChoose.description, ...data.whyChoose.reasons.flatMap(item => [item.title, item.description]), ...data.faqs.flatMap(item => [item.question, item.answer]), data.cta.title, data.cta.description!, ...data.relatedLinks!.flatMap(item => [item.title, item.description!])];
  for (const value of preserved) assert.ok(copy.includes(value), value);
  assert.ok(copy.includes(`Last updated ${data.reviewedAt}`));
  assert.ok(copy.includes("For some funding streams (like DVA), a specific referral form from your GP may be required."));
  assert.ok(copy.includes("No obligation. We'll review your message and get back to you. We're here to listen and help."));
});

test("clinical evidence values, reference destinations, limitation and schema are unchanged", () => {
  assert.deepEqual(schemas(nursing), schemas(original));
  for (const item of NURSING_CARE_PAGE.evidence!.items) {
    assert.ok(text(nursing).includes(item.label));
    assert.ok(text(nursing).includes(item.value));
    for (const reference of item.references ?? []) {
      assert.ok(text(nursing).includes(reference.label));
      if (reference.url) assert.ok(links(nursing).includes(reference.url));
    }
    if (item.limitations) assert.ok(text(nursing).includes(item.limitations));
  }
  assert.ok(text(nursing).includes("References provide general programme or service information, not provider-specific verification."));
  assert.deepEqual(links(nursing).filter(href => !href.startsWith("#")).sort(), links(original).sort());
});

test("clinical page keeps shared modal triggers, CTA analytics handlers and guarded FAQ disclosure", () => {
  const source = readFileSync("src/components/sections/PremiumNursingCare.tsx", "utf8");
  assert.equal((source.match(/<FormModalTrigger formType="contact"/g) ?? []).length, 2);
  assert.match(source, /<ServiceCtaWithModal title=\{data\.cta\.title\}/);
  assert.match(nursing, /<ul role="list" class="care-audiences">/);
  assert.match(nursing, /<ol role="list" class="care-steps care-three-columns">/);
  assert.doesNotMatch(source, /analyticsLocation=|openModal\(|fetch\(|onSubmit|onClick|"use client"/);
  const buttons = [...nursing.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/g)];
  assert.equal(buttons.filter(button => ["Request Care", "Contact Us"].includes(text(button[2]))).length, 4);
  for (const faq of NURSING_CARE_PAGE.faqs) {
    assert.match(nursing, new RegExp(`aria-expanded="false" aria-controls="faq-answer-${faq.id}" id="faq-question-${faq.id}"`));
    assert.match(nursing, new RegExp(`id="faq-answer-${faq.id}" role="region" aria-labelledby="faq-question-${faq.id}" hidden=""`));
  }
});

test("presentation uses only scoped selectors, existing palette and safe intrinsic layouts", () => {
  const selectors = [...css.replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/([^{}]+)\{/g)].map(match => match[1].trim());
  for (const selector of selectors.filter(value => !value.startsWith("@"))) {
    assert.ok(selector.startsWith(".premium-care"), selector);
    assert.doesNotMatch(selector, /(?:^|,)\s*(?:html|body|:root|\.premium-home)\b/);
  }
  for (const color of ["#842833", "#332e2a", "#615b54", "#fdf6ec", "#fffdf9", "#e8eee3", "#486141", "#d7cfc3", "#3d0a11"]) assert.ok(css.includes(color));
  assert.doesNotMatch(css, /@font-face|transition:\s*all|opacity:\s*0\b|overflow:\s*hidden|position:\s*(?:fixed|sticky)/);
  for (const value of ["a:focus-visible", "button:focus-visible", "outline-color: var(--care-cream)", "scroll-margin-top: 8rem", "prefers-reduced-motion", "minmax(0, 1fr)", ".care-existing-cta .reveal { opacity: 1", "font-family: var(--font-serif)"]) assert.ok(css.includes(value));
});

test("services hub and nursing retain their components; funding and regional layouts stay separate", () => {
  assert.match(readFileSync("src/app/services/page.tsx", "utf8"), /return <PremiumServicesHub \/>/);
  assert.match(readFileSync("src/app/services/nursing-care/page.tsx", "utf8"), /return <PremiumNursingCare \/>/);
  for (const route of ["ndis", "dva", "aged-care", "private-nursing"]) assert.match(readFileSync(`src/app/${route}/page.tsx`, "utf8"), /ServicePageLayout/);
  assert.match(readFileSync("src/app/services/[service]/[region]/page.tsx", "utf8"), /ServiceRegionPageLayout/);
  assert.doesNotMatch(readFileSync("src/app/page.tsx", "utf8"), /premium-care|PremiumServicesHub|PremiumNursingCare/);
});
