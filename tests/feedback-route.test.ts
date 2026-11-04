import test from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { POST } from "../src/app/api/feedback/route";
import { SITE } from "../src/lib/constants";

const payload = { rating: 3, name: "Synthetic", contact: "owner@example.com", service: "other", improvements: "Synthetic private content <script>alert(1)</script>", allowFollowup: true };
const id = "d836e511-cd92-4872-bbd1-18ed349e30af";
function request(body: string, headers: Record<string, string> = {}) {
  return new NextRequest("https://gentlecarenursing.com.au/api/feedback", { method: "POST", headers: { "content-type": "application/json", ...headers }, body });
}

test("feedback accepts every rating, uses plain text, keeps recipient and deduplicates retries", async () => {
  const originalFetch = globalThis.fetch;
  const originalKey = process.env.RESEND_API_KEY;
  const sends: { body: Record<string, unknown>; headers: Headers }[] = [];
  try {
    process.env.RESEND_API_KEY = "dummy";
    globalThis.fetch = async (_url, init) => {
      sends.push({ body: JSON.parse(init!.body as string), headers: new Headers(init!.headers) });
      return Response.json({ id });
    };
    for (const rating of [1, 2, 3, 4, 5]) {
      const result = await POST(request(JSON.stringify({ ...payload, rating }), { origin: "https://gentlecarenursing.com.au" }));
      assert.equal(result.status, 200);
      assert.deepEqual(await result.json(), { success: true, submissionId: id });
    }
    for (const send of sends) {
      assert.deepEqual(send.body.to, [SITE.email]);
      assert.equal(send.body.html, undefined);
      assert.match(send.body.text as string, /Synthetic private content <script>/);
      assert.equal(send.body.reply_to, payload.contact);
      assert.equal((send.body.subject as string).includes(payload.name), false);
    }
    await POST(request(JSON.stringify({ ...payload, rating: 5 })));
    assert.equal(sends[4].headers.get("Idempotency-Key"), sends[5].headers.get("Idempotency-Key"));
    await POST(request(JSON.stringify({ ...payload, allowFollowup: false })));
    assert.equal(sends[6].body.reply_to, undefined);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = originalKey;
  }
});

test("feedback rejects malformed types, unbounded bodies and invalid service/contact fields", async () => {
  for (const body of [null, [], {}, { ...payload, rating: "5" }, { ...payload, rating: 6 }, { ...payload, name: 1 }, { ...payload, contact: {} }, { ...payload, improvements: [] }, { ...payload, allowFollowup: "true" }, { ...payload, service: "<img src=x>" }, { ...payload, service: "toString" }, { ...payload, contact: "------" }, { ...payload, contact: "bad@example.com\nBcc: other@example.com" }, { ...payload, contact: "", allowFollowup: true }, { ...payload, name: "x".repeat(255) }, { ...payload, improvements: "x".repeat(5001) }, { ...payload, unexpected: "field" }]) {
    assert.equal((await POST(request(JSON.stringify(body)))).status, 400, JSON.stringify(body).slice(0, 100));
  }
  assert.equal((await POST(request("{"))).status, 400);
  assert.equal((await POST(request(JSON.stringify(payload), { origin: "https://other.example" }))).status, 403);
  assert.equal((await POST(request(JSON.stringify(payload), { "content-type": "text/plain" }))).status, 415);
  assert.equal((await POST(request(JSON.stringify(payload), { "content-type": "application/json-evil" }))).status, 415);
  assert.equal((await POST(request("x".repeat(16385)))).status, 413);
});

test("feedback fails closed without a valid provider receipt and never logs private data", async () => {
  const originalFetch = globalThis.fetch;
  const originalKey = process.env.RESEND_API_KEY;
  const originalError = console.error;
  const logs: unknown[][] = [];
  console.error = (...args) => { logs.push(args); };
  try {
    delete process.env.RESEND_API_KEY;
    assert.equal((await POST(request(JSON.stringify(payload)))).status, 503);
    process.env.RESEND_API_KEY = "dummy";
    for (const receipt of [{}, null, { id: "not-a-receipt" }, { id: payload.improvements }, { error: payload.improvements }]) {
      globalThis.fetch = async () => Response.json(receipt);
      assert.equal((await POST(request(JSON.stringify(payload)))).status, 502);
    }
    globalThis.fetch = async () => Response.json({ message: payload.improvements }, { status: 429 });
    assert.equal((await POST(request(JSON.stringify(payload)))).status, 502);
    globalThis.fetch = async () => { throw new Error(payload.improvements); };
    assert.equal((await POST(request(JSON.stringify(payload)))).status, 502);
    for (const secret of [payload.name, payload.contact, payload.improvements, "dummy"]) assert.equal(JSON.stringify(logs).includes(secret), false);
  } finally {
    globalThis.fetch = originalFetch;
    console.error = originalError;
    if (originalKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = originalKey;
  }
});
