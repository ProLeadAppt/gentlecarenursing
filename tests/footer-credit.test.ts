import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { restorePriorFooterCredit } from "./helpers/footer-credit";
const source = readFileSync("src/components/layout/Footer.tsx", "utf8");
test("footer keeps family-run wording and adds one confirmed Munyal credit", () => {
  assert.equal(source.split("Built by Munyal · Personally crafted by Tyson Kaye").length, 2);
  assert.match(source, /href="https:\/\/munyal\.com\.au" target="_blank" rel="noopener noreferrer"/);
  assert.match(source, /A family-run service/);
  assert.notEqual(restorePriorFooterCredit(source), source);
  assert.equal(restorePriorFooterCredit("unrelated content"), "unrelated content");
});

test("desktop footer credit clears the fixed contact button without changing mobile padding", () => {
  assert.match(source, /pt-20 pb-10 lg:pb-24 overflow-hidden/);
  const contact = readFileSync("src/components/ui/FloatingContact.tsx", "utf8");
  assert.match(contact, /fixed bottom-6 right-6 z-50 hidden lg:flex/);
  assert.match(contact, /h-14 w-14/);
  // 6rem footer padding exceeds the button's 1.5rem offset plus 3.5rem height.
  assert.ok(24 > 6 + 14);
  const restored = restorePriorFooterCredit(source).toString();
  assert.match(restored, /pt-20 pb-10 overflow-hidden/);
  assert.doesNotMatch(restored, /lg:pb-24/);
  assert.equal(restorePriorFooterCredit('className="unrelated lg:pb-24"'), 'className="unrelated lg:pb-24"');
});
