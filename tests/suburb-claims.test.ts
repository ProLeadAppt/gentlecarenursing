import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { SUBURBS, getAllSuburbSlugs } from "../src/content/suburbs";

const source = readFileSync("src/app/suburbs/[suburb]/page.tsx", "utf8");

test("suburb pages retain the existing fifteen routes and populated local fields", () => {
  assert.deepEqual(getAllSuburbSlugs(), [
    "strathfield", "concord", "burwood", "chatswood", "mosman", "manly",
    "dee-why", "bondi", "randwick", "sydney-cbd", "parramatta", "liverpool",
    "hurstville", "sutherland", "cronulla",
  ]);
  for (const suburb of SUBURBS) {
    assert.match(suburb.postcode, /^\d{4}$/);
    assert.ok(suburb.lga);
    assert.ok(suburb.nearestHospitals.length > 0);
    assert.ok(suburb.neighbouringSuburbs.length > 0);
    assert.match(suburb.regionHref, /^\/areas\//);
  }
  assert.ok(source.includes('canonical: `${INTEGRATIONS.siteUrl}/suburbs/${entry.slug}`'));
  assert.ok(source.includes("export const dynamicParams = false;"));
});

test("hospital reference lists do not imply a provider relationship", () => {
  assert.ok(source.includes('title="Hospitals in the wider area"'));
  assert.ok(source.includes("Listing a hospital does not imply an affiliation or referral arrangement."));
  assert.ok(source.includes("entry.nearestHospitals.map"));
  assert.doesNotMatch(source, /Hospitals coordinated with|We coordinate with|coordinate with discharge planners/i);
});

test("suburb narratives do not claim unverified hospital referral relationships", () => {
  for (const suburb of SUBURBS) {
    assert.doesNotMatch(
      suburb.localContext,
      /our local (?:referrals|clients) come direct|we work closely with .*discharge planners|frequent source of post-discharge referrals/i,
      suburb.slug,
    );
  }
});

test("metadata and service schema qualify care enquiries and funding", () => {
  assert.ok(source.includes("Enquire about care needs, funding and availability"));
  assert.ok(source.includes("Discuss clinical suitability, funding arrangements, availability and referral requirements"));
  assert.ok(source.includes("depend on individual needs, funding requirements, referral"));
  assert.doesNotMatch(source, /Funded by NDIS|same scope of care/);
  assert.ok(source.includes('"@type": "Service"'));
  assert.ok(source.includes('"@id": `${canonical}#place`'));
  assert.ok(source.includes('"@id": `${INTEGRATIONS.siteUrl}/#organization`'));
});

test("suburb enquiry CTA does not promise hospital-specific prioritisation", () => {
  assert.doesNotMatch(source, /Urgent referrals|are prioritised/);
  assert.ok(source.includes("Share your suburb, care needs and preferred timing"));
  assert.ok(source.includes("href={CTA_LINKS.requestCare.href}"));
  assert.ok(source.includes("href={CTA_LINKS.contact.href}"));
  assert.ok(source.includes("href={SITE.phoneHref}"));
});
