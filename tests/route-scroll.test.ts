import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { disableSmoothScrollDuringRouteTransition } = require(
  "next/dist/shared/lib/router/utils/disable-smooth-scroll"
) as {
  disableSmoothScrollDuringRouteTransition: (
    callback: () => void,
    options?: { onlyHashChange?: boolean; dontForceLayout?: boolean }
  ) => void;
};

const layout = readFileSync("src/app/layout.tsx", "utf8");
const css = readFileSync("src/app/globals.css", "utf8");
const htmlTag = layout.match(/<html\b[^>]*>/)?.[0] ?? "";
const scrollBehavior = htmlTag.match(/data-scroll-behavior="([^"]+)"/)?.[1];

test("smooth document scrolling declares the Next route-transition opt-in on html", () => {
  assert.match(css, /html\s*\{\s*scroll-behavior:\s*smooth;/);
  assert.equal(scrollBehavior, "smooth");
});

test("Next makes route geometry checks immediate and restores the existing inline style", () => {
  for (const previousStyle of ["", "smooth", "auto"]) {
    const html = { dataset: { scrollBehavior }, style: { scrollBehavior: previousStyle } };
    const descriptor = Object.getOwnPropertyDescriptor(globalThis, "document");
    try {
      Object.defineProperty(globalThis, "document", {
        configurable: true,
        value: { documentElement: html },
      });
      let calls = 0;
      disableSmoothScrollDuringRouteTransition(() => {
        calls += 1;
        assert.equal(html.style.scrollBehavior, "auto");
      }, { dontForceLayout: true });
      assert.equal(calls, 1);
      assert.equal(html.style.scrollBehavior, previousStyle);
    } finally {
      if (descriptor) Object.defineProperty(globalThis, "document", descriptor);
      else Reflect.deleteProperty(globalThis, "document");
    }
  }
});

test("hash-only scrolling stays unchanged and does not force an instant scroll", () => {
  const html = { dataset: { scrollBehavior }, style: { scrollBehavior: "" } };
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, "document");
  try {
    Object.defineProperty(globalThis, "document", {
      configurable: true,
      value: { documentElement: html },
    });
    let calls = 0;
    disableSmoothScrollDuringRouteTransition(() => {
      calls += 1;
      assert.equal(html.style.scrollBehavior, "");
    }, { onlyHashChange: true });
    assert.equal(calls, 1);
    assert.equal(html.style.scrollBehavior, "");
  } finally {
    if (descriptor) Object.defineProperty(globalThis, "document", descriptor);
    else Reflect.deleteProperty(globalThis, "document");
  }
});

test("reduced-motion scrolling remains governed by the existing CSS override", () => {
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)\s*\{\s*html\s*\{\s*scroll-behavior:\s*auto;/);
  assert.doesNotMatch(htmlTag, /style=/);
});
