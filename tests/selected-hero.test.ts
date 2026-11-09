import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import HomePageContent from "../src/components/sections/HomePageContent";
import { HOMEPAGE_HERO } from "../src/content/homepage";

const html = renderToStaticMarkup(createElement(HomePageContent));
const figure = html.match(/<figure class="premium-hero-visual">([\s\S]*?)<\/figure>/)?.[1];
const css = readFileSync("src/app/homepage.css", "utf8");
const image = readFileSync(`public${HOMEPAGE_HERO.heroImageSrc}`);
const provenance = readFileSync("docs/SELECTED_HOMEPAGE_HERO.md", "utf8");

test("the homepage uses the exact selected v4 lossless asset", () => {
  assert.equal(HOMEPAGE_HERO.heroImageSrc, "/images/homepage-care-conversation-v4.webp");
  assert.equal(createHash("sha256").update(image).digest("hex"), "165a71b4e741d09dfcff8997e05927eacd1e8ef298fd0005aa59878e3fb1a81f");
  assert.equal(image.length, 1687730);
  assert.match(provenance, /a85dfb70ec89cea8bd3fbc6e3f9b662850ed733f6abd9e9ed494ae0f047c9988/);
  assert.match(provenance, /165a71b4e741d09dfcff8997e05927eacd1e8ef298fd0005aa59878e3fb1a81f/);
});

test("lossless WebP dimensions and rendered intrinsics retain the complete 3:2 image", () => {
  assert.equal(image.subarray(0, 4).toString(), "RIFF");
  assert.equal(image.subarray(8, 16).toString(), "WEBPVP8L");
  assert.equal(image[20], 0x2f);
  const dimensions = image.readUInt32LE(21);
  assert.equal((dimensions & 0x3fff) + 1, 1536);
  assert.equal(((dimensions >>> 14) & 0x3fff) + 1, 1024);
  assert.ok(figure);
  assert.match(figure, /width="1536" height="1024"/);
  const style = css.match(/\.premium-home \.premium-hero-image\s*\{([^}]*)\}/)?.[1];
  assert.ok(style);
  assert.match(style, /width: 100%/);
  assert.match(style, /height: auto/);
  assert.doesNotMatch(style, /object-fit|object-position|filter:|transform:|clip-path|aspect-ratio|max-height/);
});

test("the selected hero is eager, high priority and responsive through Next Image", () => {
  assert.ok(figure);
  const hero = figure.match(/<img\b[^>]*>/)?.[0];
  assert.ok(hero);
  assert.match(hero, /fetchPriority="high"/);
  assert.doesNotMatch(hero, /loading="lazy"/);
  assert.match(hero, /srcSet="[^\"]+640w[^\"]+1080w[^\"]+1920w/);
  assert.ok(hero.includes(`sizes="${HOMEPAGE_HERO.heroImageSizes}"`));
  assert.match(hero, /\/_next\/image\?url=%2Fimages%2Fhomepage-care-conversation-v4.webp/);
});

test("alt text describes the visible conversation without claiming real staff or client identity", () => {
  assert.equal(HOMEPAGE_HERO.heroImageAlt, "A woman in burgundy scrubs and an older woman talking together on a sofa.");
  assert.ok(figure?.includes(`alt="${HOMEPAGE_HERO.heroImageAlt}"`));
  assert.doesNotMatch(HOMEPAGE_HERO.heroImageAlt, /our|Sydney|registered|patient|client|staff|nurse/i);
});

test("the hero uses the requested generic caption without a public provenance label or unused disclosure styles", () => {
  assert.ok(figure);
  assert.match(figure, /<figcaption>Care for the people you love<\/figcaption>/);
  assert.doesNotMatch(figure, /AI-generated|actual (?:clients|staff|premises)|premium-image-disclosure/i);
  assert.doesNotMatch(css, /premium-image-disclosure/);
  assert.ok(!("heroImageDisclosure" in HOMEPAGE_HERO));
});

test("selected-image provenance records selection and pixel-preserving transformation only", () => {
  for (const expected of ["okay use that", "lossless", "1536 × 1024", "2,717,831", "1,687,730", "e61caedcd410f4abbd0c8efca4e794488c5e7cb89a67739068c1f0dcfbf932b3"]) {
    assert.ok(provenance.includes(expected), expected);
  }
  assert.match(provenance, /No crop, retouch, resize, filter or new image generation/);
  assert.match(provenance, /not evidence of a live performance improvement/);
  assert.match(provenance, /fictional AI imagery, not actual Gentle Care staff, clients or premises/);
});
