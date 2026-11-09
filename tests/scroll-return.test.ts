import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ScrollToTop } from "../src/components/layout/ScrollToTop";

const source = readFileSync("src/components/layout/ScrollToTop.tsx", "utf8");
const css = readFileSync("src/app/globals.css", "utf8");

test("scroll-return initial markup is hidden on server and first browser-like render", () => {
  const prior = Object.getOwnPropertyDescriptor(globalThis, "window");
  try {
    Reflect.deleteProperty(globalThis, "window");
    assert.equal(renderToStaticMarkup(createElement(ScrollToTop)), "");
    Object.defineProperty(globalThis, "window", { configurable: true, value: {
      scrollY: 500,
      matchMedia: () => ({ matches: true }),
    } });
    assert.equal(renderToStaticMarkup(createElement(ScrollToTop)), "");
  } finally {
    if (prior) Object.defineProperty(globalThis, "window", prior);
    else Reflect.deleteProperty(globalThis, "window");
  }
});

test("scroll-return desktop query matches installed Tailwind lg breakpoint", () => {
  assert.match(source, /const DESKTOP_MEDIA = "\(min-width: 64rem\)"/);
  assert.match(readFileSync("node_modules/tailwindcss/theme.css", "utf8"), /--breakpoint-lg:\s*64rem/);
});

test("reduced-motion document scrolling overrides the earlier smooth declaration", () => {
  const smooth = css.indexOf("scroll-behavior: smooth;");
  const reduced = css.indexOf("@media (prefers-reduced-motion: reduce)");
  assert.ok(smooth >= 0 && reduced > smooth);
  assert.match(css.slice(reduced), /^@media \(prefers-reduced-motion: reduce\)\s*\{\s*html\s*\{\s*scroll-behavior:\s*auto;\s*\}/);
  assert.match(source, /window\.matchMedia\("\(prefers-reduced-motion: reduce\)"\)\.matches/);
  assert.match(source, /behavior: reducedMotion \? "auto" : "smooth"/);
});

test("return focus uses the existing persistent main without introducing a new landmark", () => {
  const layout = readFileSync("src/app/layout.tsx", "utf8");
  assert.equal((layout.match(/<main id="main-content"/g) ?? []).length, 1);
  assert.match(layout, /<main id="main-content"[^>]*tabIndex=\{-1\}/);
  assert.match(layout, /<ScrollToTop\s*\/>/);
  assert.match(source, /main\?\.isConnected && !main\.closest\("\[inert\]"\)/);
  const handler = source.slice(source.indexOf("const scrollToTop = () =>"));
  const focusIndex = handler.indexOf("main.focus({ preventScroll: true })");
  const scrollIndex = handler.indexOf("window.scrollTo(");
  assert.ok(focusIndex >= 0 && scrollIndex >= 0);
  assert.ok(focusIndex < scrollIndex);
  assert.equal((source.match(/\.focus\(/g) ?? []).length, 1);
});

test("scroll-return preserves its accessible control and passive listener cleanup", () => {
  assert.match(source, /type="button"/);
  assert.match(source, /aria-label="Scroll to top"/);
  assert.match(source, /onClick=\{scrollToTop\}/);
  assert.match(source, /window.addEventListener\("scroll", handleScroll, \{ passive: true \}\)/);
  assert.match(source, /window.removeEventListener\("scroll", handleScroll\)/);
  assert.match(source, /mql.removeEventListener\("change", handleMediaChange\)/);
  assert.match(source, /observer.disconnect\(\)/);
});
