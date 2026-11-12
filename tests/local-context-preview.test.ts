import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { getSuburbBySlug } from "../src/content/suburbs";
import { localContextChanges as changes } from "./helpers/local-context-review";

test("four local paragraphs match the reviewed copy exactly", () => {
  for (const {slug,after} of changes) assert.equal(getSuburbBySlug(slug)?.localContext,after);
});
test("only the four reviewed paragraphs change in suburb data", () => {
  let source = readFileSync("src/content/suburbs.ts", "utf8");
  for (const {before,after} of changes) {
    assert.equal(source.split(after).length - 1, 1);
    source = source.replace(after,before);
  }
  assert.equal(createHash("sha256").update(source).digest("hex"), "962aa7059f98f0c66d9824dc11f8b6dea7db6caaa48253e4786c76f4fae007c1");
});
test("local context avoids provider partnerships and guaranteed access", () => {
  for (const {after} of changes) assert.doesNotMatch(after, /we partner|priority referral service|guaranteed|within 24 hours|no waitlist/i);
  assert.match(getSuburbBySlug("strathfield")!.localContext, /in North Strathfield, not in Strathfield/);
  assert.match(getSuburbBySlug("concord")!.localContext, /does not imply a partnership/);
  assert.match(getSuburbBySlug("parramatta")!.localContext, /does not imply a partnership/);
});
