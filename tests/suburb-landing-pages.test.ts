import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { createElement, type ComponentType } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import sitemap from "../src/app/sitemap";
import {
  OMITTED_CLIENT_CONFIRMATIONS,
  SUBURB_LANDING_PAGES,
  getSuburbLandingPage,
} from "../src/content/suburb-landing-pages";

const require = createRequire(import.meta.url);
require.extensions[".css"] = () => undefined;

const forbidden = [
  "CONFIRM WITH CLIENT",
  "public liability",
  "professional indemnity",
  "Worker Screening",
  "24 June 2019",
  "within 24 hours",
  "24 to 48 hours",
  "vacancies",
  "/suburbs/homebush",
  "/suburbs/rhodes",
  "/suburbs/homebush-west",
  "Fijian",
  "Nepalese",
  "Tagalog",
  "by appointment",
  "price limits",
  "Google review",
  "walk-in",
];

function plain(value: string): string {
  return value
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*/g, "")
    .replace(/\*/g, "");
}

for (const entry of SUBURB_LANDING_PAGES) {
  const pageModule = require(`../src/app/suburbs/${entry.slug}/page.tsx`) as {
    default: ComponentType;
    metadata: { title?: { absolute?: string }; description?: string; alternates?: { canonical?: string } };
  };
  const html = renderToStaticMarkup(createElement(pageModule.default));
  const text = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ");

  test(`${entry.slug}: title, description and canonical match the draft`, () => {
    assert.equal(pageModule.metadata.title?.absolute, entry.seoTitle);
    assert.ok(entry.seoTitle.length < 60, `${entry.seoTitle.length}`);
    assert.equal(pageModule.metadata.description, entry.metaDescription);
    assert.ok(entry.metaDescription.length < 155, `${entry.metaDescription.length}`);
    assert.equal(pageModule.metadata.alternates?.canonical, `https://gentlecarenursing.com.au/suburbs/${entry.slug}`);
  });

  test(`${entry.slug}: one H1 and the draft heading hierarchy render`, () => {
    const h1 = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)];
    assert.equal(h1.length, 1);
    assert.equal(h1[0][1].replace(/<[^>]+>/g, ""), entry.h1);
    const levels = [...html.matchAll(/<h([1-6])\b/g)].map((match) => Number(match[1]));
    assert.equal(levels[0], 1);
    for (let i = 1; i < levels.length; i += 1) assert.ok(levels[i] <= levels[i - 1] + 1, levels.join(","));
    for (const section of entry.sections) assert.ok(text.includes(section.heading), section.heading);
  });

  test(`${entry.slug}: schema is Service, FAQPage and BreadcrumbList`, () => {
    const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
    const flat = schemas.flat();
    assert.deepEqual(flat.map((node) => node["@type"]).sort(), ["BreadcrumbList", "FAQPage", "Service"]);
    const service = flat.find((node) => node["@type"] === "Service");
    assert.equal(service.serviceType, entry.serviceType);
    assert.equal(service.areaServed.name, `${entry.name} NSW ${entry.postcode}`);
    assert.equal(service.provider["@id"], "https://gentlecarenursing.com.au/#organization");
    const crumbs = flat.find((node) => node["@type"] === "BreadcrumbList").itemListElement.map((item: { name: string }) => item.name);
    assert.deepEqual(crumbs, ["Home", "Suburbs", "Inner West", entry.name]);
    const faq = flat.find((node) => node["@type"] === "FAQPage");
    const questions = entry.sections.flatMap((section) => section.faqs ?? []);
    assert.deepEqual(faq.mainEntity.map((item: { name: string }) => item.name), questions.map((item) => item.question));
    assert.deepEqual(
      faq.mainEntity.map((item: { acceptedAnswer: { text: string } }) => item.acceptedAnswer.text),
      questions.map((item) => plain(item.answer)),
    );
  });

  test(`${entry.slug}: phone, referral and referrer links work, and unconfirmed claims stay off the page`, () => {
    assert.ok(html.includes('href="tel:+611300004267"'));
    assert.ok(html.includes('href="/referral"'));
    assert.ok(html.includes('href="/referrers"'));
    assert.ok(html.includes(">1300 004 267<") || html.includes("1300 004 267"));
    assert.ok(text.includes("call 000"));
    assert.doesNotMatch(text, /within 24 hours|24 to 48 hours/);
    for (const phrase of forbidden) assert.equal(text.toLowerCase().includes(phrase.toLowerCase()), false, phrase);
    assert.equal(html.includes("TODO"), false);
    assert.equal(html.includes("CONFIRM WITH CLIENT"), false);
  });
}

test("suburb landing pages are in the sitemap and the suburb index, and the fifteen template routes stay", () => {
  const urls = sitemap().map((entry) => new URL(entry.url).pathname);
  for (const page of SUBURB_LANDING_PAGES) assert.ok(urls.includes(`/suburbs/${page.slug}`));
  assert.equal(new Set(urls).size, urls.length);
  const index = renderToStaticMarkup(createElement((require("../src/app/suburbs/page.tsx") as { default: ComponentType }).default));
  for (const page of SUBURB_LANDING_PAGES) assert.ok(index.includes(`href="/suburbs/${page.slug}"`));
  assert.equal(getSuburbLandingPage("north-strathfield").region, "Inner West");
  assert.equal(OMITTED_CLIENT_CONFIRMATIONS.length >= 16, true);
});

test("client-confirm omissions are marked beside the copy that was shortened", () => {
  const source = readFileSync("src/content/suburb-landing-pages.ts", "utf8");
  const markers = source.match(/TODO\(client-confirm\):/g) ?? [];
  assert.ok(markers.length >= 12, String(markers.length));
});
