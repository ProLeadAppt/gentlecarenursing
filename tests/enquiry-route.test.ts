import test from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { POST } from "../src/app/api/submit/route";

const payload = { type: "contact", name: "Synthetic", email: "owner@example.com", message: "Synthetic private content" };
const id = "d836e511-cd92-4872-bbd1-18ed349e30af";
function request(body: string, headers: Record<string, string> = {}) {
  return new NextRequest("https://gentlecarenursing.com.au/api/submit", { method: "POST", headers: { "content-type": "application/json", ...headers }, body });
}

test("route confirms only provider acceptance and keeps logs free of payload/errors", async () => {
  const originalFetch = globalThis.fetch;
  const originalKey = process.env.RESEND_API_KEY;
  const originalInfo = console.info;
  const originalError = console.error;
  const logs: unknown[][] = [];
  console.info = (...args) => { logs.push(args); };
  console.error = (...args) => { logs.push(args); };
  try {
    delete process.env.RESEND_API_KEY;
    assert.equal((await POST(request(JSON.stringify(payload)))).status, 503);
    process.env.RESEND_API_KEY = "dummy";
    globalThis.fetch = async () => Response.json({ id });
    const accepted = await POST(request(JSON.stringify(payload), { origin: "https://gentlecarenursing.com.au" }));
    assert.equal(accepted.status, 200);
    assert.deepEqual(await accepted.json(), { success: true, submissionId: id });
    globalThis.fetch = async () => { throw new Error(payload.message); };
    const failed = await POST(request(JSON.stringify(payload)));
    assert.equal(failed.status, 502);
    assert.equal((await failed.json()).success, false);
    assert.equal(JSON.stringify(logs).includes(payload.message), false);
    assert.equal(JSON.stringify(logs).includes(payload.email), false);
    assert.equal(JSON.stringify(logs).includes("dummy"), false);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = originalKey;
    console.info = originalInfo;
    console.error = originalError;
  }
});

test("route rejects malformed JSON, wrong origin, format, invalid payload and oversized streams", async () => {
  assert.equal((await POST(request("{"))).status, 400);
  assert.equal((await POST(request(JSON.stringify(payload), { origin: "https://other.example" }))).status, 403);
  assert.equal((await POST(request(JSON.stringify(payload), { "content-type": "text/plain" }))).status, 415);
  assert.equal((await POST(request("{}"))).status, 400);
  assert.equal((await POST(request("x".repeat(16385)))).status, 413);
});
