import test from "node:test";
import assert from "node:assert/strict";
import { resolveGaId, resolveAnalyticsEnabled } from "../src/config/integrations";

test("analytics has no implicit measurement ID", () => {
  assert.equal(resolveGaId(""), "");
  assert.equal(resolveGaId("G-OVERRIDE123"), "G-OVERRIDE123");
  assert.equal(resolveGaId(" G-OVERRIDE123 "), "G-OVERRIDE123");
});

test("analytics needs both explicit opt-in and a valid configured ID", () => {
  for (const enabled of [undefined, "", "false", "1", "TRUE"]) {
    assert.equal(resolveAnalyticsEnabled(enabled, "G-VALID123"), false);
  }
  for (const id of ["", "UA-123", "G-x'alert(1)", "https://example.com"]) {
    assert.equal(resolveAnalyticsEnabled("true", id), false);
  }
  assert.equal(resolveAnalyticsEnabled("true", "G-VALID123"), true);
});
