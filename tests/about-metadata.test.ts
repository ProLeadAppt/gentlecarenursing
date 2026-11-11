import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

// Node's metadata runner ignores the route's presentation-only CSS import.
const nativeRequire = createRequire(import.meta.url);
nativeRequire.extensions[".css"] = () => undefined;
const { metadata } = nativeRequire("../src/app/about/page.tsx") as typeof import("../src/app/about/page");

test("About metadata leaves the business-name suffix to the root layout", () => {
  assert.equal(metadata.title, "About Us | Sydney In-Home Care");
  assert.equal(metadata.openGraph?.title, "About Us | Sydney In-Home Care");
  assert.equal(metadata.twitter?.title, "About Us | Sydney In-Home Care");
});
