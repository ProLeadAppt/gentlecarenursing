import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const funnel = readFileSync("src/components/review/ReviewFunnel.tsx", "utf8");
const rating = readFileSync("src/components/review/StarRating.tsx", "utf8");

test("review offers equally prominent public and private choices before any rating", () => {
  assert.match(funnel, /Leave a Google review/);
  assert.match(funnel, /Share private feedback/);
  assert.ok(funnel.indexOf("Leave a Google review") < funnel.indexOf("{showPrivate &&"));
  assert.ok(funnel.indexOf("Share private feedback") < funnel.indexOf("{showPrivate &&"));
  assert.doesNotMatch(funnel + rating, /window\.location|rating\s*[<>]=?\s*[34]|policy-safe|sharing the good/);
  assert.match(funnel, /onContinue={setRating}/);
  assert.match(rating, /type="radio"/);
  assert.match(rating, /\[1, 2, 3, 4, 5\]/);
});

test("feedback masks private data, bounds fields, guards duplicate submission and describes acceptance accurately", () => {
  assert.match(funnel, /data-clarity-mask="true"/);
  assert.match(funnel, /if \(submitting.current\) return/);
  assert.match(funnel, /submitting.current = true/);
  assert.match(funnel, /finally \{\s*submitting.current = false/);
  assert.match(funnel, /maxLength=\{5000\}/);
  assert.match(funnel, /maxLength=\{254\}/);
  assert.match(funnel, /href="\/privacy"/);
  assert.match(funnel, /do not include medical records/);
  assert.match(funnel, /accepted your private feedback for delivery/);
  assert.match(funnel, /!isSubmissionConfirmation\(json\)/);
  assert.doesNotMatch(readFileSync("src/app/review/page.tsx", "utf8"), /<main|id="main-content"/);
});
