import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { submitWebsiteForm } from "../src/lib/form-client";

const source = readFileSync("src/components/forms/ReferralForm.tsx", "utf8");

test("public referral outcomes are persistent focusable status and alert regions", () => {
  assert.match(source, /if \(status === "success" \|\| status === "error"\) \{\s*outcomeRef.current\?\.focus\(\)/);
  assert.match(source, /ref=\{outcomeRef\}\s+tabIndex=\{-1\}\s+role="status"\s+aria-atomic="true"/);
  assert.match(source, /ref=\{outcomeRef\}\s+tabIndex=\{-1\}\s+role="alert"\s+aria-atomic="true"/);
  assert.doesNotMatch(source, /setTimeout|window.alert/);
});

test("success describes provider acceptance without promising receipt or a booking", () => {
  assert.match(source, /Referral accepted for delivery/);
  assert.match(source, /does not confirm inbox receipt, a booking or service availability/);
  assert.doesNotMatch(source, /We&apos;ve received your enquiry|Our team will contact you/);
});

test("uncertain delivery keeps values and cautions against duplicate submission", () => {
  const failure = source.slice(source.indexOf("} catch {"), source.indexOf("} finally {"));
  assert.match(failure, /couldn’t confirm whether your referral was accepted for delivery/);
  assert.match(failure, /Your details are still here/);
  assert.match(failure, /contact us before submitting again to avoid a duplicate referral/);
  assert.doesNotMatch(failure, /\.reset\(|setExpanded/);
  assert.equal((source.match(/form.reset\(\)/g) ?? []).length, 1);
  assert.match(source, /setStatus\("success"\);\s*form.reset\(\)/);
});

test("validation, repeated-submit guard and intentional fresh referral focus remain", () => {
  assert.match(source, /if \(submittingRef.current\) return/);
  assert.match(source, /if \(!reportFormValidity\(form\)\) return/);
  assert.match(source, /<fieldset disabled=\{status === "submitting"\}/);
  assert.match(source, /finally \{\s*submittingRef.current = false/);
  assert.match(source, /restartFocusRef.current = true;\s*setStatus\("idle"\)/);
  assert.match(source, /status === "idle" && restartFocusRef.current/);
  assert.match(source, /firstFieldRef.current\?\.focus\(\)/);
});

test("referral transport accepts only confirmed success and rejects uncertain outcomes without changing input", async () => {
  const payload = { type: "referral" as const, referrerName: "Synthetic Referrer", referrerPhone: "Synthetic phone", notes: "Synthetic notes" };
  const original = { ...payload };
  const receipt = "8dd9d328-72ca-4a29-8022-735693bd84f7";
  const result = await submitWebsiteForm(payload, async () => Response.json({ success: true, submissionId: receipt }));
  assert.equal(result.submissionId, receipt);
  for (const fetcher of [
    async () => Response.json({ success: false }, { status: 502 }),
    async () => { throw new TypeError("Synthetic lost response"); },
    async () => Response.json({ success: true }),
    async () => new Response("not JSON", { status: 200 }),
  ]) {
    await assert.rejects(submitWebsiteForm(payload, fetcher));
    assert.deepEqual(payload, original);
  }
});
