import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Breadcrumbs } from "../src/components/ui/Breadcrumbs";
import ReferrersPage from "../src/app/referrers/page";
import ReviewPage, { metadata as reviewMetadata } from "../src/app/review/page";

function schemas(html: string) {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map((match) => JSON.parse(match[1]));
}

const items = [{ label: "Home", href: "/" }, { label: "Contact" }];

test("breadcrumbs emit one schema by default and retain accessible navigation", () => {
  const html = renderToStaticMarkup(createElement(Breadcrumbs, { items }));
  assert.equal(schemas(html).filter((s) => s["@type"] === "BreadcrumbList").length, 1);
  assert.match(html, /aria-label="Breadcrumb"/);
  assert.match(html, /aria-current="page"/);
  assert.match(html, /href="\/"/);
});

test("disabling duplicate breadcrumb markup leaves visible navigation identical", () => {
  const normal = renderToStaticMarkup(createElement(Breadcrumbs, { items }));
  const delegated = renderToStaticMarkup(createElement(Breadcrumbs, { items, includeSchema: false }));
  assert.equal(schemas(delegated).length, 0);
  assert.equal(normal.replace(/<script[\s\S]*?<\/script>/g, ""), delegated);
});

test("referrers retains exactly its canonical breadcrumb and existing FAQ markup", () => {
  const html = renderToStaticMarkup(createElement(ReferrersPage));
  const data = schemas(html);
  const breadcrumbs = data.filter((s) => s["@type"] === "BreadcrumbList");
  assert.equal(breadcrumbs.length, 1);
  assert.deepEqual(breadcrumbs[0].itemListElement.map((i: { name: string; item: string }) => [i.name, i.item]), [
    ["Home", "https://gentlecarenursing.com.au/"],
    ["For Coordinators & Referrers", "https://gentlecarenursing.com.au/referrers"],
  ]);
  assert.equal(data.filter((s) => s["@type"] === "FAQPage").length, 1);
  assert.match(html, /aria-label="Breadcrumb"/);
  assert.match(html, /href="\/referral"/);
});

test("review uses the root main landmark without duplicating its ID", () => {
  const html = renderToStaticMarkup(createElement(ReviewPage));
  assert.doesNotMatch(html, /<main\b|id="main-content"/);
  assert.match(html, /^<div class="bg-background">/);
  assert.match(html, /Thank you for/);
  const layout = readFileSync("src/app/layout.tsx", "utf8");
  assert.equal((layout.match(/<main id="main-content"/g) ?? []).length, 1);
  assert.match(layout, /href="#main-content"/);
});

test("review stays noindex and keeps its canonical URL", () => {
  assert.deepEqual(reviewMetadata.robots, {
    index: false, follow: false, nocache: true,
    googleBot: { index: false, follow: false },
  });
  assert.equal(reviewMetadata.alternates?.canonical, "https://gentlecarenursing.com.au/review");
});
