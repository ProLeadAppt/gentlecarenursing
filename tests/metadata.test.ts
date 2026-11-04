import test from "node:test";
import assert from "node:assert/strict";
import { createMetadata } from "../src/lib/metadata";
import { SITE } from "../src/lib/constants";

test("page titles use the brand once and match social titles", () => {
  for (const title of ["Clinical Nursing at Home in Sydney", `Privacy Policy | ${SITE.name}`, `${SITE.name} | In-Home Nursing Sydney`]) {
    const metadata = createMetadata({ title, description: "Page description." });
    const expected = title.includes(SITE.name) ? title : `${title} | ${SITE.name}`;
    assert.deepEqual(metadata.title, { absolute: expected });
    assert.equal(metadata.openGraph?.title, expected);
    assert.equal(metadata.twitter?.title, expected);
    assert.equal(expected.split(SITE.name).length - 1, 1);
    assert.equal(metadata.openGraph?.description, "Page description.");
    assert.equal(metadata.twitter?.description, "Page description.");
  }
});

test("canonical metadata preserves language alternates and sets the social URL", () => {
  const canonical = "https://gentlecarenursing.com.au/contact";
  const metadata = createMetadata({ title: "Contact", canonical, alternates: { languages: { "en-AU": canonical } } });
  assert.equal(metadata.alternates?.canonical, canonical);
  assert.deepEqual(metadata.alternates?.languages, { "en-AU": canonical });
  assert.equal(metadata.openGraph?.url, canonical);
});

test("page-specific social images carry over to Twitter unless explicitly overridden", () => {
  const images = [{ url: "/images/og/home.png", width: 1200, height: 630, alt: "Home" }];
  assert.deepEqual(createMetadata({ openGraph: { images } }).twitter?.images, images);
  assert.deepEqual(createMetadata({ openGraph: { images }, twitter: { images: ["/custom.png"] } }).twitter?.images, ["/custom.png"]);
});

test("absolute and default title objects produce meaningful social metadata", () => {
  assert.deepEqual(createMetadata({ title: { absolute: "Custom title" } }).title, { absolute: "Custom title" });
  assert.deepEqual(createMetadata({ title: { default: "Care", template: "%s | Care" } }).title, { absolute: `Care | ${SITE.name}` });
  assert.equal(typeof createMetadata({}).openGraph?.title, "string");
  assert.notEqual(createMetadata({}).openGraph?.title, "[object Object]");
});
