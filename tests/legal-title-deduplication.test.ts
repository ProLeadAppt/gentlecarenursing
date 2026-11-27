import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import type { Metadata } from "next";
const nativeRequire = createRequire(import.meta.url);
nativeRequire.extensions[".css"] = () => undefined;

test("legal metadata uses absolute titles, without repeating the root brand suffix", () => {
  for (const [path, title] of [
    ["privacy", "Privacy Policy | Gentle Care Nursing Services"],
    ["terms", "Terms of Service | Gentle Care Nursing Services"],
  ] as const) {
    const { metadata } = nativeRequire(`../src/app/${path}/page.tsx`) as { metadata: Metadata };
    assert.deepEqual(metadata.title, { absolute: title });
    assert.equal(metadata.openGraph?.title, title);
    assert.equal(metadata.twitter?.title, title);
  }
});
