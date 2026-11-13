import test from "node:test";
import assert from "node:assert/strict";
import { GET } from "../src/app/editorial-review/riverside/route";
import { RIVERSIDE_REVIEW_HTML } from "../src/content/riverside-editorial-review";
test("riverside standalone review never opens outside deploy-preview", async () => {
 const original = process.env.CONTEXT;
 try {
  for (const context of ["production", "branch-deploy", ""]) {
   process.env.CONTEXT = context;
   const res = GET(); assert.equal(res.status,404); assert.ok(!(await res.text()).includes("Liberty Grove"));
  }
  process.env.CONTEXT = "deploy-preview";
  const res = GET(); assert.equal(res.status,200); assert.equal(await res.text(),RIVERSIDE_REVIEW_HTML);
  assert.match(res.headers.get("X-Robots-Tag")!, /noindex/);
  assert.match(res.headers.get("Content-Security-Policy")!, /default-src 'none'/);
 } finally { if(original===undefined) delete process.env.CONTEXT; else process.env.CONTEXT=original; }
});
test("five review anchors preserve evidence and non-transferable approval holds without active content", () => {
 for (const slug of ["liberty-grove","sydney-olympic-park","lidcombe","newington","wentworth-point"]) {
  assert.ok(RIVERSIDE_REVIEW_HTML.includes(`id="${slug}"`)); assert.ok(RIVERSIDE_REVIEW_HTML.includes(`href="#${slug}"`));
 }
 assert.match(RIVERSIDE_REVIEW_HTML,/Earlier approval does not transfer to this batch/);
 assert.match(RIVERSIDE_REVIEW_HTML,/evidence-refresh hold/);
 assert.doesNotMatch(RIVERSIDE_REVIEW_HTML, /<(script|form|iframe)\b|application\/ld\+json|on(?:click|load)=/i);
 assert.equal((RIVERSIDE_REVIEW_HTML.match(/<details open>/g)||[]).length,5);
});
