import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { WHO_WE_SUPPORT } from "../src/content/homepage";
import { REFERRER_BLOCKS } from "../src/content/referrer-blocks";

const source = (path: string) => readFileSync(new URL(`../src/${path}`, import.meta.url), "utf8");

test("homepage private care and referral links preserve visitor intent", () => {
  assert.equal(WHO_WE_SUPPORT.items.find((item) => item.label === "Private clients")?.href, "/private-nursing");
  const homepage = source("components/sections/HomePageContent.tsx");
  assert.match(homepage, /const REFERRAL_CTA = \{ href: "\/referral"/);
  assert.match(homepage, /const REQUEST_CARE_CTA = \{ href: "#get-in-touch"/);
  assert.match(homepage, /id="get-in-touch"/);
});

test("shared credentials do not promise unpublished testimonials", () => {
  assert.doesNotMatch(source("components/sections/CredentialsSection.tsx"), /#testimonials|What families say/);
});

test("each referrer audience link has a unique, matching destination", () => {
  assert.equal(REFERRER_BLOCKS.length, 4);
  assert.equal(new Set(REFERRER_BLOCKS.map((block) => block.anchorId)).size, 4);
  for (const block of REFERRER_BLOCKS) {
    assert.equal(block.primaryCtaHref, `/referrers#${block.anchorId}`);
  }
  const component = source("components/sections/ReferrerBlocksSection.tsx");
  assert.match(component, /id=\{isReferrersPage \? block.anchorId : undefined\}/);
  assert.match(component, /href=\{isReferrersPage \? "\/referral" : block.primaryCtaHref\}/);
  assert.match(source("app/referrers/page.tsx"), /<ReferrerBlocksSection\s+isReferrersPage/);
});
