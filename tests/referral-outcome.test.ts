import test from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { ReferralOutcome } from "../src/components/forms/ReferralOutcome";

test("confirmed provider acceptance has a focusable status and no booking promise", () => {
  const html = renderToStaticMarkup(createElement(ReferralOutcome, { success: true }));
  assert.match(html, /role="status"/); assert.match(html, /tabindex="-1"/);
  assert.match(html, /does not confirm a booking or the start of care/);
  assert.match(html, /href="tel:1300004267"/);
});
test("uncertain delivery has persistent accessible guidance, not a blind retry instruction", () => {
  const html = renderToStaticMarkup(createElement(ReferralOutcome, { success: false }));
  assert.match(html, /role="alert"/); assert.match(html, /tabindex="-1"/);
  assert.match(html, /Delivery may have occurred/); assert.match(html, /contact us before sending the same referral again/);
  assert.match(html, /href="tel:1300004267"/);
});
test("wizard keeps values on failure, focuses outcome and clears error for deliberate retry", () => {
  const source = readFileSync("src/components/forms/ReferralConcierge.tsx", "utf8");
  const caught = source.split("} catch {")[1].split("} finally")[0];
  assert.match(caught, /setHasSubmissionError\(true\)/);
  assert.doesNotMatch(caught, /alert\(|console\.|setFormData|setStep/);
  assert.match(source, /setIsSubmitting\(true\);\s*setHasSubmissionError\(false\)/);
  assert.match(source, /hasSubmissionError && !isSubmitting/);
  assert.match(source, /outcomeRef.current\?\.focus\(\)/);
  assert.match(source, /hasSubmissionError && <ReferralOutcome success=\{false\}/);
  assert.match(source, /submittingRef.current \|\| transitioningRef.current/);
});

// Exercise the production client contract with an injected in-memory transport.
// These tests cannot send enquiries or contact the email provider.
import { submitWebsiteForm } from "../src/lib/form-client";
const referral = {
  type: "referral" as const,
  referrerName: "Synthetic Referrer",
  referrerPhone: "Synthetic phone",
  referrerEmail: "synthetic@example.test",
  clientName: "Synthetic Client",
};

test("referral client accepts only a confirmed receipt and preserves its input", async () => {
  const before = structuredClone(referral);
  const submissionId = "8dd9d328-72ca-4a29-8022-735693bd84f7";
  const result = await submitWebsiteForm(referral, async (url, init) => {
    assert.equal(url, "/api/submit");
    assert.equal(init?.method, "POST");
    assert.deepEqual(JSON.parse(String(init?.body)), before);
    return Response.json({ success: true, submissionId });
  });
  assert.deepEqual(result, { submissionId });
  assert.deepEqual(referral, before);
});

test("referral failure and ambiguous confirmation reject without changing input", async () => {
  const before = structuredClone(referral);
  const transports: Array<typeof fetch> = [
    async () => Response.json({ success: false }, { status: 502 }),
    async () => Response.json({ success: false }, { status: 503 }),
    async () => Response.json({ success: true }),
    async () => Response.json({ success: true, submissionId: "not-a-receipt" }),
    async () => new Response("not JSON", { status: 200 }),
    async () => { throw new TypeError("Synthetic connection interrupted"); },
  ];
  for (const transport of transports) {
    await assert.rejects(submitWebsiteForm(referral, transport));
    assert.deepEqual(referral, before);
  }
});
