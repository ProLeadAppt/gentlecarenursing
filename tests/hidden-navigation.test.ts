import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import originals from "./fixtures/hidden-navigation-original.json";
const paths = ["src/components/layout/Nav.tsx", "src/components/layout/MobileCta.tsx"] as const;
const hashes: Record<string, string> = {
  "src/components/layout/Nav.tsx": "29ef98bd60d93ce3312646e33bb9ad1228891edeb94ea39512072746ae9f9feb",
  "src/components/layout/MobileCta.tsx": "82c08204cfbac6757383c4953822d8c36a4d6bac16bfd532fdf9006d35851023"
};
for (const path of paths) test(`${path}: original source fixture is authentic`, () => {
  assert.equal(createHash("sha256").update(originals[path]).digest("hex"), hashes[path]);
});
test("navigation source reconstructs exactly by removing three hidden fallbacks and the breakpoint correction", () => {
  let source = readFileSync(paths[0], "utf8");
  for (const name of ["open", "mobileOpen", "mobileServicesOpen"]) {
    const indent = name === "mobileServicesOpen" ? "                    " : "        ";
    const added = `${indent}hidden={!${name}}\n${indent}style={{ display: ${name} ? undefined : "none" }}\n`;
    assert.equal(source.split(added).length, 2, name);
    source = source.replace(added, "");
  }
  assert.equal(source.split('(min-width: 80rem)').length, 2);
  source = source.replace('(min-width: 80rem)', '(min-width: 1280px)');
  assert.equal(source, originals[paths[0]]);
});
test("mobile care source reconstructs exactly by removing only native/unlayered hiding", () => {
  let source = readFileSync(paths[1], "utf8");
  const added = '      hidden={!visible}\n      style={{ display: visible ? undefined : "none", paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}';
  assert.equal(source.split(added).length, 2);
  source = source.replace(added, '      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}');
  assert.equal(source, originals[paths[1]]);
});
test("navigation media query matches the installed Tailwind xl breakpoint", () => {
  const source = readFileSync(paths[0], "utf8");
  assert.match(source, /window.matchMedia\("\(min-width: 80rem\)"\)/);
  assert.match(readFileSync("node_modules/tailwindcss/theme.css", "utf8"), /--breakpoint-xl:\s*80rem/);
  assert.doesNotMatch(readFileSync("src/app/globals.css", "utf8"), /--breakpoint-xl\s*:/);
  assert.doesNotMatch(source, /min-width: 1280px/);
});
test("closed navigation is independent of native inert or framework CSS", () => {
  const source = readFileSync(paths[0], "utf8");
  for (const name of ["open", "mobileOpen", "mobileServicesOpen"]) {
    assert.ok(source.includes(`hidden={!${name}}`));
    assert.ok(source.includes(`style={{ display: ${name} ? undefined : "none" }}`));
    assert.ok(source.includes(`inert={!${name}}`));
  }
});
test("mobile care hiding retains safe-area spacing, destinations and visibility thresholds", () => {
  const source = readFileSync(paths[1], "utf8");
  assert.match(source, /hidden=\{!visible\}/);
  assert.match(source, /display: visible \? undefined : "none"/);
  assert.match(source, /paddingBottom: "max\(0.75rem, env\(safe-area-inset-bottom\)\)"/);
  assert.match(source, /currentY > 500/); assert.match(source, /document.body.offsetHeight - 200/);
  assert.match(source, /setVisible\(pastHero && scrollingUp && !nearBottom\)/);
  assert.match(source, /openModal\("contact", "mobile_sticky_cta"\)/);
  assert.match(source, /href=\{SITE.phoneHref\}/);
});
