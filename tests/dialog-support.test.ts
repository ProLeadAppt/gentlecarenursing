import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { supportsModalDialog } from "../src/lib/dialog-support";

test("dialog support requires both opening and dismissal functions", () => {
  const method = () => {};
  assert.equal(supportsModalDialog({}), false);
  assert.equal(supportsModalDialog({ close: method }), false);
  assert.equal(supportsModalDialog({ showModal: method }), false);
  assert.equal(supportsModalDialog({ close: method, showModal: method }), true);
});

test("truthy non-function dialog properties are not native API support", () => {
  assert.equal(supportsModalDialog({ close: true, showModal: () => {} }), false);
  assert.equal(supportsModalDialog({ close: () => {}, showModal: "available" }), false);
});

test("inherited native dialog methods qualify without calling them", () => {
  const dialog = Object.create({
    close() { assert.fail("support detection must not call close"); },
    showModal() { assert.fail("support detection must not call showModal"); },
  });
  assert.equal(supportsModalDialog(dialog), true);
});

test("inactive modal hiding is inline and lifecycle checks both APIs", () => {
  const source = readFileSync("src/components/ui/FormModal.tsx", "utf8");
  assert.match(source, /style=\{\{ display: activeForm \? undefined : "none" \}\}/);
  assert.match(source, /if \(!dialog \|\| !supportsModalDialog\(dialog\)\) return;/);
  assert.ok(source.indexOf("!supportsModalDialog(dialog)") < source.indexOf("return beginModalSession("));
  assert.ok(source.indexOf("!supportsModalDialog(dialog)") < source.indexOf("dialog.close()"));
});

test("fallback stays inside the explicit modal request and uses existing form pages", () => {
  const source = readFileSync("src/contexts/FormModalContext.tsx", "utf8");
  const request = source.slice(source.indexOf("const openModal = useCallback("), source.indexOf("const closeModal = useCallback("));
  assert.match(request, /!supportsModalDialog\(document.createElement\("dialog"\)\)/);
  assert.match(request, /window.location.assign\(type === "referral" \? "\/referral" : "\/contact"\);\s*return;/);
  assert.equal((source.match(/window.location.assign/g) ?? []).length, 1);
  assert.match(readFileSync("src/app/contact/page.tsx", "utf8"), /<ContactForm \/>/);
  assert.match(readFileSync("src/app/referral/page.tsx", "utf8"), /<ReferralForm \/>/);
});

test("Gemma's homepage CTAs keep their same-page form targets", () => {
  const homepage = readFileSync("src/components/sections/HomePageContent.tsx", "utf8");
  assert.match(homepage, /const REQUEST_CARE_CTA = \{ href: "#get-in-touch"/);
  assert.match(homepage, /const REFERRAL_CTA = \{ href: "#get-in-touch"/);
  assert.match(homepage, /id="get-in-touch"/);
  assert.doesNotMatch(homepage, /openModal/);
});
