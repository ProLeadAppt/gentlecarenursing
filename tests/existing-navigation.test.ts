import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { CredentialsSection } from "../src/components/sections/CredentialsSection";
import { ReferrerBlocksSection } from "../src/components/sections/ReferrerBlocksSection";
import { REFERRER_BLOCKS, type ReferrerType } from "../src/content/referrer-blocks";

const allTypes = REFERRER_BLOCKS.map((block) => block.referrerType);

test("credentials links point to existing pages, not an absent testimonials section", () => {
  const html = renderToStaticMarkup(createElement(CredentialsSection));
  assert.doesNotMatch(html, /testimonials|What families say/);
  assert.match(html, /href="\/areas"/);
  assert.match(html, /href="\/faq"/);
  assert.ok(readFileSync("src/app/areas/page.tsx", "utf8"));
  assert.ok(readFileSync("src/app/faq/page.tsx", "utf8"));
});

test("credentials can still omit the optional links", () => {
  const html = renderToStaticMarkup(createElement(CredentialsSection, { showLinks: false }));
  assert.doesNotMatch(html, /<a\b/);
});

test("all four historical referrer fragments resolve to the matching existing card", () => {
  const expected = ["ndis-support-coordinators", "plan-managers", "hospital-discharge-planners", "gps-and-primary-care"];
  assert.deepEqual(REFERRER_BLOCKS.map((block) => block.anchorId), expected);
  assert.equal(new Set(expected).size, expected.length);
  const html = renderToStaticMarkup(createElement(ReferrerBlocksSection, { referrerTypes: allTypes }));
  for (const block of REFERRER_BLOCKS) {
    assert.equal((html.match(new RegExp(`id="${block.anchorId}"`, "g")) ?? []).length, 1);
    assert.match(html, new RegExp(`<article[^>]+id="${block.anchorId}"[^>]+aria-label="${block.title}"`));
  }
  assert.match(html, /scroll-mt-28/);
  assert.doesNotMatch(html, /<a\b/);
});

test("referrer filtering retains unique anchors and no self-referential action links", () => {
  const selected: ReferrerType[] = ["plan-manager", "gp-primary-care"];
  const html = renderToStaticMarkup(createElement(ReferrerBlocksSection, { referrerTypes: selected }));
  assert.equal((html.match(/<article\b/g) ?? []).length, 2);
  assert.match(html, /id="plan-managers"/);
  assert.match(html, /id="gps-and-primary-care"/);
  assert.doesNotMatch(html, /id="ndis-support-coordinators"|id="hospital-discharge-planners"|<a\b/);
});

test("empty referrer selection renders nothing", () => {
  assert.equal(renderToStaticMarkup(createElement(ReferrerBlocksSection, { referrerTypes: [] })), "");
});

test("existing referral and contact actions remain on the referrers page", () => {
  const route = readFileSync("src/app/referrers/page.tsx", "utf8");
  assert.match(route, /return <PremiumReferrers \/>/);
  const page = readFileSync("src/components/sections/PremiumReferrers.tsx", "utf8");
  assert.match(page, /Use the Request Care Form/);
  assert.match(page, /href=\{CTA_LINKS\.requestCare\.href\}/);
  assert.match(page, /CtaSection/);
});
