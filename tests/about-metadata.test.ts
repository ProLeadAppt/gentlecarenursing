import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

// Node's metadata runner ignores the route's presentation-only CSS import.
const nativeRequire = createRequire(import.meta.url);
nativeRequire.extensions[".css"] = () => undefined;
const { metadata } = nativeRequire("../src/app/about/page.tsx") as typeof import("../src/app/about/page");

test("About metadata uses one absolute title under 60 characters", () => {
  assert.deepEqual(metadata.title, { absolute: "About Gentle Care Nursing | Sydney" });
  assert.equal(metadata.openGraph?.title, "About Gentle Care Nursing | Sydney");
  assert.equal(metadata.twitter?.title, "About Gentle Care Nursing | Sydney");
  const title = "About Gentle Care Nursing | Sydney";
  assert.ok(title.length <= 60);
  assert.ok((metadata.description ?? "").length <= 155);
});
