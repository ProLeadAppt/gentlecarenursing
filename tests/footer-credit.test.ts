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
