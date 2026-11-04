import test from "node:test";
import assert from "node:assert/strict";
import { metadata } from "../src/app/about/page";
import { SITE } from "../src/lib/constants";

test("About metadata renders one business-name suffix without root-template duplication", () => {
  const expected = `About Us | Sydney In-Home Care | ${SITE.name}`;
  // Next.js absolute titles bypass the parent layout's %s brand template.
  assert.deepEqual(metadata.title, { absolute: expected });
  assert.equal(expected.split(SITE.name).length - 1, 1);
  assert.equal(metadata.openGraph?.title, expected);
  assert.equal(metadata.twitter?.title, expected);
});
