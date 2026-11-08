import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { deliverSubmission, type ReferralPayload } from "../src/lib/submission";

const primaryForm = readFileSync("src/components/forms/ReferralForm.tsx", "utf8");
const concierge = readFileSync("src/components/forms/ReferralConcierge.tsx", "utf8");
const receipt = "d836e511-cd92-4872-bbd1-18ed349e30af";
const payload: ReferralPayload = {
  type: "referral",
  referrerName: "Synthetic Referral",
  referrerPhone: "0400000000",
  referrerEmail: "synthetic@example.com",
};

type LabelField = "referrerRole" | "serviceType";
const corrections: ReadonlyArray<[LabelField, string, string, string]> = [
  ["referrerRole", "healthcare", "Healthcare professional", "Healthcare Professional"],
  ["referrerRole", "self", "Self-referral", "Self-referral"],
  ["referrerRole", "other", "Other", "Other"],
  ["serviceType", "dva", "DVA / Community Nursing", "DVA / Community Nursing"],
  ["serviceType", "private", "Private", "Private"],
  ["serviceType", "unsure", "Not sure yet", "Not sure yet"],
];

async function captureEmail(body: ReferralPayload) {
  let request: Record<string, unknown> | undefined;
  let idempotencyKey = "";
  let calls = 0;
  const result = await deliverSubmission(body, {
    apiKey: "dummy-local-test-key",
    fromEmail: "noreply@gentlecarenursing.com.au",
    fetcher: async (url, init) => {
      calls++;
      assert.equal(url, "https://api.resend.com/emails");
      assert.equal(init?.method, "POST");
      request = JSON.parse(String(init?.body));
      idempotencyKey = new Headers(init?.headers).get("Idempotency-Key") ?? "";
      return Response.json({ id: receipt });
    },
  });
  assert.equal(calls, 1);
  assert.deepEqual(result, { success: true, submissionId: receipt });
  assert.ok(request);
  assert.deepEqual(request.to, ["info@gentlecarenursing.com.au"]);
  assert.equal(request.reply_to, payload.referrerEmail);
  assert.equal(request.subject, "Website referral — Gentle Care Nursing");
  assert.equal(request.html, undefined);
  assert.match(idempotencyKey, /^website-enquiry\/[a-f0-9]{64}$/);
  return { email: request, idempotencyKey };
}

function labelledValue(email: Record<string, unknown>, field: LabelField): string | undefined {
  return String(email.text).split("\n\n").find(line => line.startsWith(`${field}: `));
}

for (const [field, value, visibleLabel, emailLabel] of corrections) {
  test(`referral email preserves the primary form's ${value} selection`, async () => {
    assert.ok(primaryForm.includes(`<option value="${value}">${visibleLabel}</option>`));
    const { email } = await captureEmail({ ...payload, [field]: value });
    assert.equal(labelledValue(email, field), `${field}: ${emailLabel}`);
  });
}

test("legacy concierge role and service labels remain unchanged without activating it", async () => {
  const legacy: ReadonlyArray<[LabelField, string, string]> = [
    ["referrerRole", "SC", "Support Coordinator"],
    ["referrerRole", "DP", "Discharge Planner"],
    ["referrerRole", "GP", "General Practitioner"],
    ["referrerRole", "OT", "Occupational Therapist"],
    ["referrerRole", "Family", "Family Member"],
    ["referrerRole", "Other", "Other Professional"],
    ["serviceType", "Nursing", "General Nursing"],
    ["serviceType", "Complex", "Complex Clinical Care"],
    ["serviceType", "Post-Op", "Post-Op Recovery"],
    ["serviceType", "NDIS", "NDIS Support"],
    ["serviceType", "AgedCare", "Aged Care Support"],
    ["serviceType", "Other", "Other Inquiry"],
  ];
  for (const [field, value, label] of legacy) {
    assert.ok(concierge.includes(`<option value="${value}">${label}</option>`));
    const { email } = await captureEmail({ ...payload, [field]: value });
    assert.equal(labelledValue(email, field), `${field}: ${label}`);
  }
});

test("identical corrected referrals keep stable keys within this version and distinct selections stay distinct", async () => {
  const groups: ReadonlyArray<[LabelField, readonly string[]]> = [
    ["serviceType", ["dva", "private", "unsure"]],
    ["referrerRole", ["healthcare", "self", "other"]],
  ];
  for (const [field, values] of groups) {
    const keys: string[] = [];
    for (const value of values) {
      const body = { ...payload, [field]: value };
      const first = await captureEmail(body);
      const repeated = await captureEmail(body);
      assert.equal(repeated.idempotencyKey, first.idempotencyKey);
      keys.push(first.idempotencyKey);
    }
    assert.equal(new Set(keys).size, keys.length, field);
  }
});
