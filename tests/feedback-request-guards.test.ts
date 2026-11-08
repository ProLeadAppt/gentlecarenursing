import test, { type TestContext } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { Resend } from "resend";
import { POST } from "../src/app/api/feedback/route";
import { SITE } from "../src/lib/constants";

const URL = "https://gentlecarenursing.com.au/api/feedback";
const LIMIT = 64 * 1024;
const valid = { rating: 5, name: "Synthetic feedback", contact: "test@example.com", service: "clinical-nursing", improvements: "Synthetic private feedback", allowFollowup: true };

function isolated(t: TestContext) {
  const previous = process.env.RESEND_API_KEY;
  process.env.RESEND_API_KEY = "re_local_guard_test_not_a_real_key";
  t.after(() => {
    if (previous === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = previous;
  });
  const sent: Array<Record<string, unknown>> = [];
  const provider = t.mock.method(Resend.prototype, "post", async (_path: string, body: Record<string, unknown>) => {
    sent.push(body);
    return { data: { id: "d836e511-cd92-4872-bbd1-18ed349e30af" }, error: null };
  });
  t.mock.method(globalThis, "fetch", async () => { throw new Error("Network forbidden in request-guard tests"); });
  const logs = t.mock.method(console, "error", () => {});
  return { provider, sent, logs };
}

function request(body: string, headers: Record<string, string> = {}) {
  return new NextRequest(URL, { method: "POST", headers: { "content-type": "application/json", ...headers }, body });
}

test("supplied cross-origin and opaque origins are rejected before reading or delivery", async (t) => {
  const h = isolated(t);
  for (const origin of ["https://other.example", "https://gentlecarenursing.com.au.evil.example", "null", "http://gentlecarenursing.com.au", ""]) {
    const req = request(JSON.stringify(valid), { origin });
    const response = await POST(req);
    assert.equal(response.status, 403, origin);
    assert.equal(req.bodyUsed, false);
    assert.equal((await response.json()).success, false);
  }
  assert.equal(h.provider.mock.callCount(), 0);
});

test("same-origin and absent-origin JSON retain all five ratings and existing recipient", async (t) => {
  const h = isolated(t);
  const origins: Array<Record<string, string>> = [{}, { origin: "https://gentlecarenursing.com.au" }];
  for (const rating of [1, 2, 3, 4, 5]) {
    for (const headers of origins) {
      const response = await POST(request(JSON.stringify({ ...valid, rating }), headers));
      assert.equal(response.status, 200);
      assert.deepEqual(await response.json(), { success: true });
    }
  }
  assert.equal(h.provider.mock.callCount(), 10);
  for (const email of h.sent) {
    assert.deepEqual(email.to, [SITE.email]);
    assert.equal(email.reply_to, valid.contact);
    assert.match(String(email.text), /Synthetic private feedback/);
  }
});

test("JSON media type is case-insensitive and allows parameters", async (t) => {
  const h = isolated(t);
  for (const type of ["application/json", "application/json; charset=utf-8", "APPLICATION/JSON; charset=UTF-8"]) {
    assert.equal((await POST(request(JSON.stringify(valid), { "content-type": type }))).status, 200);
  }
  assert.equal(h.provider.mock.callCount(), 3);
});

test("wrong or missing media types are rejected before body parsing or delivery", async (t) => {
  const h = isolated(t);
  for (const type of ["text/plain", "application/x-www-form-urlencoded", "application/jsonp", "application/json-invalid", "application/problem+json", ""]) {
    const req = request(JSON.stringify(valid), { "content-type": type });
    assert.equal((await POST(req)).status, 415, type);
    assert.equal(req.bodyUsed, false);
  }
  const missing = new NextRequest(URL, { method: "POST", body: new TextEncoder().encode(JSON.stringify(valid)) });
  assert.equal(missing.headers.get("content-type"), null);
  assert.equal((await POST(missing)).status, 415);
  assert.equal(h.provider.mock.callCount(), 0);
});

test("exact byte limit passes but one additional byte is rejected before delivery", async (t) => {
  const h = isolated(t);
  const json = JSON.stringify(valid);
  const exact = json + " ".repeat(LIMIT - Buffer.byteLength(json));
  assert.equal(Buffer.byteLength(exact), LIMIT);
  assert.equal((await POST(request(exact))).status, 200);
  assert.equal((await POST(request(exact + " "))).status, 413);
  assert.equal(h.provider.mock.callCount(), 1);
});

test("the request cap counts UTF-8 bytes rather than JavaScript characters", async (t) => {
  const h = isolated(t);
  for (const improvements of ["é".repeat(33000), "🔥".repeat(17000)]) {
    const body = JSON.stringify({ rating: 5, improvements });
    assert.ok(body.length < LIMIT);
    assert.ok(Buffer.byteLength(body) > LIMIT);
    assert.equal((await POST(request(body))).status, 413);
  }
  assert.equal(h.provider.mock.callCount(), 0);
});

test("valid UTF-8 characters split across stream chunks are preserved", async (t) => {
  const h = isolated(t);
  const improvements = "Synthetic multilingual feedback: é 日本語 🔥";
  const bytes = new TextEncoder().encode(JSON.stringify({ ...valid, improvements }));
  let position = 0;
  const body = new ReadableStream<Uint8Array>({
    pull(controller) {
      if (position === bytes.length) controller.close();
      else controller.enqueue(bytes.slice(position, ++position));
    },
  });
  const req = new NextRequest(URL, { method: "POST", headers: { "content-type": "application/json" }, body, duplex: "half" } as ConstructorParameters<typeof NextRequest>[1]);
  assert.equal((await POST(req)).status, 200);
  assert.equal(h.provider.mock.callCount(), 1);
  assert.ok(String(h.sent[0].text).includes(improvements));
  assert.equal(body.locked, false);
});

test("oversized chunked requests are cancelled without consuming later chunks", async (t) => {
  const h = isolated(t);
  const json = JSON.stringify({ rating: 5 });
  const chunks = [new TextEncoder().encode(json + " ".repeat(LIMIT - Buffer.byteLength(json))), new Uint8Array([32]), new Uint8Array([32])];
  let pulls = 0, cancelled = 0;
  const body = new ReadableStream<Uint8Array>({
    pull(controller) {
      const chunk = chunks[pulls++];
      if (chunk) controller.enqueue(chunk); else controller.close();
    },
    cancel() { cancelled++; },
  }, { highWaterMark: 0 });
  const req = new NextRequest(URL, { method: "POST", headers: { "content-type": "application/json" }, body, duplex: "half" } as ConstructorParameters<typeof NextRequest>[1]);
  assert.equal((await POST(req)).status, 413);
  assert.equal(cancelled, 1);
  assert.equal(pulls, 2);
  assert.equal(body.locked, false);
  assert.equal(h.provider.mock.callCount(), 0);
});

test("a failed stream cancellation preserves the size rejection and releases its lock", async (t) => {
  const h = isolated(t);
  const body = new ReadableStream<Uint8Array>({
    start(controller) { controller.enqueue(new Uint8Array(LIMIT + 1)); },
    cancel() { return Promise.reject(new Error("PRIVATE_CANCEL_SENTINEL")); },
  });
  const req = new NextRequest(URL, { method: "POST", headers: { "content-type": "application/json" }, body, duplex: "half" } as ConstructorParameters<typeof NextRequest>[1]);
  const response = await POST(req);
  assert.equal(response.status, 413);
  assert.equal(body.locked, false);
  assert.ok(!JSON.stringify(await response.json()).includes("PRIVATE_CANCEL_SENTINEL"));
  assert.equal(h.provider.mock.callCount(), 0);
});

test("a false Content-Length cannot bypass the actual streamed byte limit", async (t) => {
  const h = isolated(t);
  const body = JSON.stringify({ rating: 5 }) + " ".repeat(LIMIT);
  assert.equal((await POST(request(body, { "content-length": "1" }))).status, 413);
  assert.equal(h.provider.mock.callCount(), 0);
});

test("missing, empty, malformed and failed streams remain non-delivery errors", async (t) => {
  const h = isolated(t);
  const missing = new NextRequest(URL, { method: "POST", headers: { "content-type": "application/json" } });
  assert.equal((await POST(missing)).status, 400);
  for (const body of ["", "{", "null", "[]", "true", "5"]) assert.equal((await POST(request(body))).status, 400);
  const body = new ReadableStream<Uint8Array>({ start(controller) { controller.error(new Error("PRIVATE_STREAM_SENTINEL")); } });
  const broken = new NextRequest(URL, { method: "POST", headers: { "content-type": "application/json" }, body, duplex: "half" } as ConstructorParameters<typeof NextRequest>[1]);
  const response = await POST(broken);
  assert.equal(response.status, 400);
  assert.equal(body.locked, false);
  assert.ok(!JSON.stringify(await response.json()).includes("PRIVATE_STREAM_SENTINEL"));
  assert.ok(!JSON.stringify(h.logs.mock.calls).includes("PRIVATE_STREAM_SENTINEL"));
  assert.equal(h.provider.mock.callCount(), 0);
});

test("invalid requests do not expose submitted values or provider configuration", async (t) => {
  const h = isolated(t);
  const sentinel = "PRIVATE_SUBMITTED_SENTINEL";
  const response = await POST(request(JSON.stringify({ ...valid, improvements: sentinel }), { origin: "https://other.example" }));
  assert.equal(response.status, 403);
  const result = JSON.stringify(await response.json());
  assert.ok(!result.includes(sentinel));
  assert.ok(!result.includes("re_local_guard_test"));
  assert.equal(h.logs.mock.callCount(), 0);
  assert.equal(h.provider.mock.callCount(), 0);
});
