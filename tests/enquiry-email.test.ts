import test from "node:test";
import assert from "node:assert/strict";
import { deliverSubmission, validateFormPayload, type FormPayload } from "../src/lib/submission";

const payload = { type: "contact" as const, name: "Synthetic", email: "owner@example.com", message: "Test only" };
const id = "d836e511-cd92-4872-bbd1-18ed349e30af";

test("enquiries go directly to Gemma; receipt requires provider acceptance", async () => {
  let request: Record<string, unknown> = {};
  const result = await deliverSubmission(payload, {
    apiKey: "dummy", fromEmail: "noreply@gentlecarenursing.com.au",
    fetcher: async (url, init) => {
      assert.equal(url, "https://api.resend.com/emails");
      request = JSON.parse(String(init?.body));
      return Response.json({ id });
    },
  });
  assert.deepEqual(request.to, ["gemma@gentlecarenursing.com.au"]);
  assert.equal(request.reply_to, payload.email);
  assert.deepEqual(result, { success: true, submissionId: id });
});

test("HTTP success without a provider receipt fails closed", async () => {
  await assert.rejects(deliverSubmission(payload, {
    apiKey: "dummy", fromEmail: "noreply@gentlecarenursing.com.au",
    fetcher: async () => Response.json({}),
  }));
});

test("contact/homepage and both referral shapes email Gemma with readable labels", async () => {
  const cases: FormPayload[] = [
    payload, { ...payload, phone: "", serviceType: "Clinical Nursing" },
    { type: "referral", referrerName: "Synthetic", referrerPhone: "verified-number" },
    { type: "referral", referrerName: "Synthetic", referrerPhone: "verified-number", referrerEmail: "owner@example.com", referrerRole: "ndis", serviceType: "ndis", notes: "Test only", clientName: "<script>example</script>" },
  ];
  for (const body of cases) {
    await deliverSubmission(body, { apiKey: "dummy", fromEmail: "noreply@gentlecarenursing.com.au", fetcher: async (_url, init) => {
      const email = JSON.parse(String(init?.body));
      assert.deepEqual(email.to, ["gemma@gentlecarenursing.com.au"]);
      assert.equal(email.html, undefined);
      assert.equal(email.subject.includes("Synthetic"), false);
      if (body.type === "referral" && body.referrerRole) assert.match(email.text, /Support Coordinator/);
      if (body.type === "referral" && body.serviceType) assert.match(email.text, /NDIS Support/);
      return Response.json({ id });
    }});
  }
});

test("identical retries share opaque provider idempotency key across instances", async () => {
  const keys: string[] = [];
  const bodies: string[] = [];
  const fetcher: typeof fetch = async (_url, init) => {
    keys.push(new Headers(init?.headers).get("Idempotency-Key")!);
    bodies.push(String(init?.body));
    assert.ok(init?.signal);
    return Response.json({ id });
  };
  const options = { apiKey: "dummy", fromEmail: "noreply@gentlecarenursing.com.au", fetcher };
  await deliverSubmission(payload, options);
  await deliverSubmission({ message: payload.message, email: payload.email, type: payload.type, name: payload.name }, options);
  await deliverSubmission({ ...payload, message: "Different enquiry" }, options);
  assert.equal(keys[0], keys[1]);
  assert.equal(bodies[0], bodies[1]);
  assert.notEqual(keys[0], keys[2]);
  assert.match(keys[0], /^website-enquiry\/[a-f0-9]{64}$/);
});

test("missing config, rejection, timeout and malformed receipts never confirm", async () => {
  let calls = 0;
  await assert.rejects(deliverSubmission(payload, { apiKey: "", fromEmail: "noreply@gentlecarenursing.com.au", fetcher: async () => { calls++; return Response.json({ id }); } }));
  assert.equal(calls, 0);
  for (const fetcher of [
    async () => Response.json({ message: "redacted" }, { status: 403 }),
    async () => Response.json({ id: "not-a-uuid" }),
    async () => { throw new Error("timeout"); },
    async () => new Response("bad json"),
  ]) await assert.rejects(deliverSubmission(payload, { apiKey: "dummy", fromEmail: "noreply@gentlecarenursing.com.au", fetcher }));
});

test("bounded validation rejects header injection, unexpected fields and optional object values", () => {
  for (const body of [
    { ...payload, email: "a@example.com\r\nBcc: other@example.com" },
    { ...payload, message: "x".repeat(5001) },
    { ...payload, phone: {} }, { ...payload, recipient: "other@example.com" },
  ]) assert.equal(validateFormPayload(body), false);
});
