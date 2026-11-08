import test from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { EvidencePanel, type EvidenceItem } from "../src/components/sections/EvidencePanel";
import * as serviceData from "../src/content/services";
import type { ServicePageData } from "../src/components/sections/ServicePageLayout";

const note = "References provide general programme or service information, not provider-specific verification.";
const ndis = "https://www.ndiscommission.gov.au/";
const dva = "https://www.dva.gov.au/get-support/health-support/help-cover-healthcare-costs/manage-your-health-care/community-nursing";
const agedCare = "https://www.myagedcare.gov.au/";
const pages = Object.values(serviceData).filter((page): page is ServicePageData =>
  Boolean(page && typeof page === "object" && "href" in page && "evidence" in page));

function render(items: readonly EvidenceItem[]) {
  return renderToStaticMarkup(createElement(EvidencePanel, { items }));
}

test("evidence cards render every reference instead of retaining only the last source", () => {
  const html = render([{ label: "Synthetic scope", value: "Synthetic fact.", references: [
    { label: "First reference", url: "https://example.org/first" },
    { label: "Second reference", url: "https://example.org/second" },
  ] }]);
  assert.ok(html.includes('href="https://example.org/first"'));
  assert.ok(html.includes('href="https://example.org/second"'));
  assert.ok(html.indexOf("First reference") < html.indexOf("Second reference"));
  assert.match(html, /Reference information:/);
  assert.equal((html.match(/rel="noopener noreferrer" target="_blank"/g) ?? []).length, 2);
});

test("general references are explicitly distinguished from provider verification once per panel", () => {
  const html = render([
    { label: "First fact", value: "First value.", references: [{ label: "General information", url: ndis }] },
    { label: "Second fact", value: "Second value.", references: [{ label: "Other information", url: agedCare }] },
  ]);
  assert.equal(html.split(note).length - 1, 1);
  assert.doesNotMatch(html, /Checked \d{4}-\d{2}-\d{2}/);
});

test("plain reference labels are escaped and do not invent links", () => {
  const html = render([{ label: "Synthetic fact", value: "Unchanged text.", references: [{ label: "<reference> & details" }] }]);
  assert.ok(html.includes("&lt;reference&gt; &amp; details"));
  assert.doesNotMatch(html, /<a\b/);
});

test("cards without references retain facts and do not add reference notes", () => {
  const html = render([{ label: "Unchanged label", value: "Unchanged value.", icon: "scope" }]);
  assert.match(html, /<dt\b[^>]*>Unchanged label<\/dt>/);
  assert.match(html, /<dd\b[^>]*>Unchanged value\.<\/dd>/);
  assert.ok(!html.includes(note));
  assert.ok(!html.includes("Reference information:"));
});

test("existing limitations remain visible with and without references", () => {
  const html = render([
    { label: "First", value: "First value.", limitations: "Confirm individual eligibility." },
    { label: "Second", value: "Second value.", references: [{ label: "Programme information", url: dva }], limitations: "Discuss current availability." },
  ]);
  assert.ok(html.includes("Confirm individual eligibility."));
  assert.ok(html.includes("Discuss current availability."));
});

test("all seven formerly overwritten rows retain their exact reference sets", () => {
  const expected: Array<[ServicePageData, string, string[]]> = [
    [serviceData.AGED_CARE_PAGE, "Funding accepted", [dva, agedCare]],
    [serviceData.HOSPITAL_AT_HOME_PAGE, "Funding accepted", [ndis, dva, agedCare]],
    [serviceData.PALLIATIVE_CARE_PAGE, "Funding accepted", [ndis, dva, agedCare]],
    [serviceData.NURSING_CARE_PAGE, "Funding accepted", [ndis, dva, agedCare]],
    [serviceData.PERSONAL_CARE_PAGE, "Funding accepted", [ndis, dva, agedCare]],
    [serviceData.DAILY_LIVING_PAGE, "Funding accepted", [ndis, agedCare]],
    [serviceData.NURSING_CARE_PAGE, "Registration", [ndis, dva]],
  ];
  for (const [page, label, urls] of expected) {
    const item = page.evidence?.items.find(item => item.label === label);
    assert.ok(item, `${page.href}: ${label}`);
    assert.deepEqual(item.references?.map(reference => reference.url), urls, `${page.href}: ${label}`);
  }
});

test("service facts retain 49 reference-bearing rows and all 60 intended references without checked assertions", () => {
  const facts = pages.flatMap(page => page.evidence?.items ?? []);
  assert.equal(pages.length, 12);
  assert.equal(facts.length, 68);
  assert.equal(facts.filter(item => item.references?.length).length, 49);
  assert.equal(facts.flatMap(item => item.references ?? []).length, 60);
  for (const item of facts) {
    assert.equal("dateChecked" in item, false);
    assert.equal("source" in item, false);
    assert.equal("sourceUrl" in item, false);
    assert.doesNotMatch(render([item]), /Checked \d{4}-\d{2}-\d{2}/);
  }
});

test("area panels use four explicit reference lists and no hard-coded checked dates", () => {
  const source = readFileSync("src/app/areas/[region]/page.tsx", "utf8");
  assert.equal((source.match(/references: \[/g) ?? []).length, 4);
  assert.doesNotMatch(source, /dateChecked:|sourceUrl:/);
});

test("empty reference lists do not produce an empty citation line or verification note", () => {
  const html = render([{ label: "Empty", value: "Preserved.", references: [] }]);
  assert.ok(!html.includes("Reference information:"));
  assert.ok(!html.includes(note));
  assert.match(html, /Preserved\./);
});
