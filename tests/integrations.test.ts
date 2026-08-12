import test from "node:test";
import assert from "node:assert/strict";
import {
  REGISTERED_GA_ID,
  resolveGaId,
} from "../src/config/integrations.ts";

test("analytics uses the registered Gentle Care GA4 measurement ID by default", () => {
  assert.equal(REGISTERED_GA_ID, "G-SZ2588QL1J");
  assert.equal(resolveGaId(undefined), REGISTERED_GA_ID);
});

test("analytics honours an explicit GA4 measurement ID override", () => {
  assert.equal(resolveGaId("G-OVERRIDE123"), "G-OVERRIDE123");
});
