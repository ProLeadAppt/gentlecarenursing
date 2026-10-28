import test from "node:test";
import assert from "node:assert/strict";
import { metadata } from "../src/app/about/page";

test("About metadata leaves the business-name suffix to the root layout", () => {
  assert.equal(metadata.title, "About Us | Sydney In-Home Care");
  assert.equal(metadata.openGraph?.title, "About Us | Sydney In-Home Care");
  assert.equal(metadata.twitter?.title, "About Us | Sydney In-Home Care");
});
