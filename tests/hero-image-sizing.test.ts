import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { getImageProps } from "next/image";
import { HOMEPAGE_HERO } from "../src/content/homepage";

const source = readFileSync("src/components/sections/Hero.tsx", "utf8");
const sizes = HOMEPAGE_HERO.heroImageSizes;
const sourceWidth = 4961, sourceHeight = 3508;

// Only evaluate this attribute's syntax. These are deterministic geometry
// contracts, not a native browser download or Lighthouse benchmark.
function declaredWidth(viewport: number, initialFont = 16): number {
  for (const entry of sizes.split(",").map(part => part.trim())) {
    const condition = entry.match(/^\(min-width: ([\d.]+)rem\) /);
    if (condition && viewport < Number(condition[1]) * initialFont) continue;
    const value = condition ? entry.slice(condition[0].length) : entry;
    const fixed = value.match(/^([\d.]+)rem$/);
    if (fixed) return Number(fixed[1]) * initialFont;
    const calc = value.match(/^calc\(([\d.]+)vw - ([\d.]+)rem\)$/);
    assert.ok(calc, `Unrecognized sizes entry: ${entry}`);
    return viewport * Number(calc[1]) / 100 - Number(calc[2]) * initialFont;
  }
  throw new Error("No fallback image size");
}

function coverWidth(viewport: number, initialFont = 16): number {
  const desktop = viewport >= 64 * initialFont;
  const capped = viewport >= 80 * initialFont;
  const padding = (capped ? 6 : desktop ? 5 : viewport >= 40 * initialFont ? 4 : 3) * initialFont;
  const gap = (capped ? 6 : 4) * initialFont;
  const content = Math.min(viewport, 80 * initialFont) - padding;
  const boxWidth = desktop ? (content - gap) / 2 : content;
  const boxHeight = Math.min(boxWidth / (desktop ? 5 / 4 : 4 / 3), 36 * initialFont);
  return Math.max(boxWidth, boxHeight * sourceWidth / sourceHeight);
}

test("homepage sizing accounts for its source ratio and object-cover bitmap width", () => {
  assert.equal(HOMEPAGE_HERO.heroImageSrc, "/images/age-cymru-bSXk1lOp8T0-unsplash.webp");
  const image = readFileSync(`public${HOMEPAGE_HERO.heroImageSrc}`);
  // Guard the current VP8 frame dimensions. Re-evaluate the ratio and sizing
  // if this asset is replaced, including replacement with another encoding.
  assert.equal(image.subarray(0, 4).toString(), "RIFF");
  assert.equal(image.subarray(8, 16).toString(), "WEBPVP8 ");
  assert.equal(image.subarray(23, 26).toString("hex"), "9d012a");
  assert.equal(image.readUInt16LE(26) & 0x3fff, sourceWidth);
  assert.equal(image.readUInt16LE(28) & 0x3fff, sourceHeight);
  for (const token of ["max-w-7xl", "px-6", "sm:px-8", "lg:px-10", "xl:px-12", "lg:grid-cols-2", "lg:gap-16", "xl:gap-24", "aspect-[4/3]", "lg:aspect-[5/4]", "max-h-[36rem]", "object-cover"]) {
    assert.ok(source.includes(token), `Recheck sizes when layout changes: ${token}`);
  }
  for (let viewport = 280; viewport <= 3840; viewport++) {
    assert.ok(declaredWidth(viewport) + 0.00001 >= coverWidth(viewport), `${viewport}px viewport under-resolves cover`);
  }
});

test("sizes remain conservative when the browser default font size changes", () => {
  // Media-query rem units use the initial font, not an author override of
  // html font-size. The current site does not set such an override.
  for (const initialFont of [12, 16, 20, 24]) {
    for (const units of [20, 24.375, 25.875, 39.99, 40, 48, 63.99, 64, 73.75, 79.99, 80, 100, 160]) {
      const viewport = units * initialFont;
      assert.ok(declaredWidth(viewport, initialFont) + 0.00001 >= coverWidth(viewport, initialFont));
    }
  }
});

test("only the homepage opts in; other hero images and videos keep existing behavior", () => {
  assert.match(source, /imageSizes = "\(max-width: 1024px\) 100vw, 50vw"/);
  assert.match(source, /sizes=\{imageSizes\}/);
  assert.match(readFileSync("src/components/sections/HomePageContent.tsx", "utf8"), /imageSizes=\{HOMEPAGE_HERO.heroImageSizes\}/);
  assert.match(source, /priority\s+fetchPriority="high"/);
  assert.match(source, /poster=\{videoPoster \?\? imageSrc\}/);
});

test("Next preserves high-priority source candidates with no undersized nominal selection", () => {
  const { props } = getImageProps({src: HOMEPAGE_HERO.heroImageSrc, alt: "Synthetic test hero", fill: true, priority: true, fetchPriority: "high", sizes});
  assert.equal(props.sizes, sizes);
  assert.equal(props.fetchPriority, "high");
  assert.notEqual(props.loading, "lazy");
  const widths = [...props.srcSet!.matchAll(/ (\d+)w/g)].map(match => Number(match[1]));
  const select = (width: number) => widths.find(candidate => candidate >= width) ?? widths.at(-1)!;
  // Nominal uncached selection only; browsers may use cache/network policy.
  for (const [viewport, dpr] of [[390, 3], [414, 3], [430, 3], [768, 2], [1024, 2], [1180, 1], [1440, 2], [2560, 1]]) {
    assert.ok(select(declaredWidth(viewport) * dpr) >= coverWidth(viewport) * dpr);
  }
  assert.equal(select(declaredWidth(414) * 3), 1200);
  assert.equal(select(414 * 3), 1920);
  assert.equal(select(declaredWidth(1024) * 2), 1080);
  assert.equal(select(1024 * 2), 2048);
  assert.equal(select(declaredWidth(2560)), 640);
  assert.equal(select(2560 / 2), 1920);
});
