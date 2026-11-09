import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { PremiumSupportCare } from "../src/components/sections/PremiumSupportCare";
import { ServicePageLayout } from "../src/components/sections/ServicePageLayout";
import { FormModalProvider } from "../src/contexts/FormModalContext";
import {
  PERSONAL_CARE_PAGE, POST_HOSPITAL_PAGE, DAILY_LIVING_PAGE,
  COMMUNITY_PARTICIPATION_PAGE, COMPLEX_CARE_PAGE, HOSPITAL_AT_HOME_PAGE,
  OVERNIGHT_SUPPORT_PAGE, PALLIATIVE_CARE_PAGE, SERVICES,
} from "../src/content/services";
import { getBlogPostBySlug } from "../src/content/blog";
import { CTA_REASSURANCE, SITE_LAST_UPDATED } from "../src/lib/constants";

const render = (child: React.ReactNode) => renderToStaticMarkup(createElement(FormModalProvider, null, child));
const decode = (value: string) => value.replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ");
const text = (html: string) => decode(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "").replace(/<[^>]*>/g, "")).replace(/\s+/g, " ").trim();
const schemas = (html: string) => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
const links = (html: string) => [...html.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map(match => decode(match[1]));
const source = readFileSync("src/components/sections/PremiumSupportCare.tsx", "utf8");
const pages = [
  { service: "personal-care", data: PERSONAL_CARE_PAGE },
  { service: "post-hospital-care", data: POST_HOSPITAL_PAGE },
  { service: "assistance-with-daily-living", data: DAILY_LIVING_PAGE },
  { service: "community-participation", data: COMMUNITY_PARTICIPATION_PAGE },
  { service: "complex-care", data: COMPLEX_CARE_PAGE },
  { service: "hospital-at-home", data: HOSPITAL_AT_HOME_PAGE },
  { service: "overnight-support", data: OVERNIGHT_SUPPORT_PAGE },
  { service: "palliative-care", data: PALLIATIVE_CARE_PAGE },
] as const;

for (const { service, data } of pages) {
  const html = render(createElement(PremiumSupportCare, { service }));
  const original = render(createElement(ServicePageLayout, { data }));
  const copy = text(html);

  test(`${service}: all original service, evidence, funding, process and FAQ copy is retained`, () => {
    const values = [data.title, data.snippetAnswer!, data.intro, data.whoItHelps.title, data.whoItHelps.description, ...data.whoItHelps.audiences, data.supportAvailable.title, data.supportAvailable.description, ...data.supportAvailable.features.flatMap(item => [item.title, item.description]), data.whyChoose.title, data.whyChoose.description, ...data.whyChoose.reasons.flatMap(item => [item.title, item.description]), ...data.faqs.flatMap(item => [item.question, item.answer]), data.cta.title, data.cta.description!, ...(data.evidence ? [data.evidence.heading ?? "", data.evidence.intro ?? "", ...data.evidence.items.flatMap(item => [item.label, item.value, item.limitations ?? "", ...(item.references ?? []).map(reference => reference.label)])] : []), ...data.relatedLinks!.flatMap(item => [item.title, item.description!]), CTA_REASSURANCE];
    for (const value of values) assert.ok(copy.includes(value), value);
    // Compare original rendered paragraphs as well as data so shared process,
    // review dates, reference qualifications and CTA reassurance cannot disappear.
    for (const match of original.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)) {
      const paragraph = text(match[1]).replace(/^[“”]|[“”]$/g, "");
      assert.ok(copy.includes(paragraph), `Missing original paragraph: ${paragraph}`);
    }
    assert.ok(copy.includes(`Last updated ${data.reviewedAt ?? SITE_LAST_UPDATED}`));
    if (data.evidence) assert.ok(copy.includes("References provide general programme or service information, not provider-specific verification."));
  });

  test(`${service}: original schema and every non-anchor destination are identical`, () => {
    assert.deepEqual(schemas(html), schemas(original));
    assert.deepEqual(links(html).filter(href => !href.startsWith("#")).sort(), links(original).sort());
    for (const href of links(html).filter(href => href.startsWith("/"))) {
      const staticRoute = existsSync(`src/app${href === "/" ? "" : href}/page.tsx`);
      const blogSlug = /^\/blog\/([^/]+)$/.exec(href)?.[1];
      const generatedBlogRoute = blogSlug && existsSync("src/app/blog/[slug]/page.tsx") && getBlogPostBySlug(blogSlug);
      assert.ok(staticRoute || generatedBlogRoute, href);
    }
    assert.equal(data.image, undefined, "Existing service images need explicit presentation and parity coverage if introduced later");
    assert.doesNotMatch(html, /AggregateRating|ReviewAction|<img\b|<video\b|<iframe\b/);
    assert.doesNotMatch(source, /testimonials|data-analytics-action|fetch\(|onClick=|onSubmit=|"use client"/);
  });

  test(`${service}: headings, landmarks and route-specific page guide are well formed`, () => {
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
    assert.doesNotMatch(html, /<main\b|opacity-0|line-clamp-/);
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(ids.length, new Set(ids).size);
    const headings = [...html.matchAll(/<h([1-6])\b/g)].map(match => Number(match[1]));
    for (let index = 1; index < headings.length; index++) assert.ok(headings[index] <= headings[index - 1] + 1);
    for (const section of html.matchAll(/<section\b([^>]*)>/g)) {
      // The existing shared final CTA is outside this isolated presentation change.
      if (section[1].includes("relative overflow-hidden")) continue;
      const label = section[1].match(/aria-labelledby="([^"]+)"/)?.[1];
      assert.ok(label && ids.includes(label), section[1]);
    }
    const nav = html.match(/<nav[^>]*aria-label="On this page"[^>]*>([\s\S]*?)<\/nav>/)?.[1];
    assert.ok(nav);
    assert.deepEqual(links(nav), ["support", "who", "steps", "questions"].map(section => `#${service}-${section}`));
    for (const href of links(nav)) assert.equal(ids.filter(id => id === href.slice(1)).length, 1);
    for (const link of html.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/g)) assert.ok(text(link[1]).length > 2);
    assert.match(html, /<ul role="list" class="care-audiences">/);
    assert.match(html, /<ol role="list" class="care-steps care-three-columns">/);
  });

  test(`${service}: existing contact buttons and guarded FAQ controls remain intact`, () => {
    const buttons = [...html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/g)];
    const actionButtons = buttons.filter(button => ["Request Care", "Contact Us"].includes(text(button[2])));
    assert.equal(actionButtons.length, 4);
    for (const button of actionButtons) assert.match(button[1], /type="button"/);
    assert.equal((source.match(/<FormModalTrigger formType="contact"/g) ?? []).length, 2);
    assert.match(source, /<ServiceCtaWithModal title=\{data\.cta\.title\}/);
    assert.doesNotMatch(source, /analyticsLocation=|openModal\(/);
    for (const faq of data.faqs) {
      assert.match(html, new RegExp(`aria-expanded="false" aria-controls="faq-answer-${faq.id}" id="faq-question-${faq.id}"`));
      assert.match(html, new RegExp(`id="faq-answer-${faq.id}" role="region" aria-labelledby="faq-question-${faq.id}" hidden=""`));
    }
    for (const other of pages.filter(page => page.service !== service)) {
      for (const faq of other.data.faqs) assert.ok(!html.includes(`id="faq-question-${faq.id}"`));
    }
  });
}

test("post-hospital availability, assessment and funding caveats remain explicit", () => {
  const html = render(createElement(PremiumSupportCare, { service: "post-hospital-care" }));
  const copy = text(html);
  for (const caveat of [
    "Confirm suitable support and availability before discharge.",
    "Visit frequency and support need to be agreed after assessment, based on the treating team's plan and confirmed availability.",
    "Suitability, visit frequency and a start date need to be confirmed with the team before care is arranged.",
    "Confirm the applicable funding and any out-of-pocket costs with your funding body or care partner before arranging support.",
  ]) assert.ok(copy.includes(caveat), caveat);
});

test("all existing standalone service routes opt into premium presentation without changing funding or regional routes", () => {
  for (const { service } of pages) {
    const route = readFileSync(`src/app/services/${service}/page.tsx`, "utf8");
    assert.ok(route.includes(`return <PremiumSupportCare service="${service}" />`));
    assert.match(route, /import "\.\.\/premium-care\.css"/);
  }
  const standaloneRoutes = readdirSync("src/app/services", { withFileTypes: true })
    .filter(entry => entry.isDirectory() && !entry.name.startsWith("["))
    .filter(entry => existsSync(`src/app/services/${entry.name}/page.tsx`))
    .map(entry => entry.name).sort();
  assert.deepEqual(standaloneRoutes, [...pages.map(page => page.service), "nursing-care"].sort());
  assert.equal(standaloneRoutes.length, 9);
  for (const core of SERVICES) assert.ok(standaloneRoutes.includes(core.slug), core.slug);
  for (const route of ["ndis", "dva", "aged-care", "private-nursing"]) {
    const routeSource = readFileSync(`src/app/${route}/page.tsx`, "utf8");
    assert.match(routeSource, /ServicePageLayout/);
    assert.doesNotMatch(routeSource, /premium-care|PremiumSupportCare/);
  }
  assert.match(readFileSync("src/app/services/[service]/[region]/page.tsx", "utf8"), /ServiceRegionPageLayout/);
  assert.match(readFileSync("src/app/services/page.tsx", "utf8"), /PremiumServicesHub/);
  assert.match(readFileSync("src/app/services/nursing-care/page.tsx", "utf8"), /PremiumNursingCare/);
  assert.doesNotMatch(readFileSync("src/app/page.tsx", "utf8"), /PremiumSupportCare|premium-care/);
  assert.ok(!existsSync("src/app/services/respite-care/page.tsx"));
});


test("complex care preserves all four procedure schemas and treating-team qualifications", () => {
  const html = render(createElement(PremiumSupportCare, { service: "complex-care" }));
  const graph = schemas(html).flat();
  const procedures = graph.filter(item => item["@type"] === "MedicalProcedure");
  assert.equal(procedures.length, 4);
  assert.deepEqual(procedures.map(item => item.name), COMPLEX_CARE_PAGE.procedures!.map(item => item.name));
  for (const procedure of procedures) {
    assert.equal(procedure.url, "https://gentlecarenursing.com.au/services/complex-care");
    assert.equal(procedure.provider["@id"], "https://gentlecarenursing.com.au/#organization");
  }
  assert.ok(text(html).includes("We only provide complex care that is appropriate for the home setting and always follow your treating team's instructions."));
  assert.ok(text(html).includes("depending on your situation and assessments"));
  assert.doesNotMatch(html, /class="care-evidence"/);
});

test("specialist support preserves existing care-model and funding distinctions", () => {
  const hospital = text(render(createElement(PremiumSupportCare, { service: "hospital-at-home" })));
  assert.ok(hospital.includes("not a replacement for hospital-led HITH services"));
  assert.ok(hospital.includes("clinically stable enough to be at home"));
  const palliative = text(render(createElement(PremiumSupportCare, { service: "palliative-care" })));
  assert.ok(palliative.includes("NDIS where palliative needs are funded under the plan"));
  assert.ok(palliative.includes("in coordination with specialist palliative care teams"));
  const overnight = text(render(createElement(PremiumSupportCare, { service: "overnight-support" })));
  assert.ok(overnight.includes("Active overnight means the staff member is awake and working. Sleepover means they have a bed and sleep, but can be woken for limited assistance."));
});
