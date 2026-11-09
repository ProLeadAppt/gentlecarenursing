import test, { type TestContext } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { POST } from "../src/app/api/submit/route";
import { validateFormPayload } from "../src/lib/submission";
import { fieldValidationMessage } from "../src/lib/form-validation";

const URL = "https://gentlecarenursing.com.au/api/submit";
const LIMIT = 64 * 1024;
const id = "d836e511-cd92-4872-bbd1-18ed349e30af";
const contact = { type: "contact", name: "Synthetic person", email: "synthetic@example.com", phone: "+61400000000", message: "Synthetic enquiry" };
const referral = { type: "referral", referrerName: "Synthetic referrer", referrerEmail: "synthetic@example.com", referrerPhone: "+61400000000", referrerRole: "ndis", clientName: "Synthetic person", serviceType: "ndis", notes: "Synthetic referral" };

function isolated(t: TestContext) {
  const previous = process.env.RESEND_API_KEY;
  process.env.RESEND_API_KEY = "local_synthetic_key_not_real";
  t.after(() => {
    if (previous === undefined) delete process.env.RESEND_API_KEY; else process.env.RESEND_API_KEY = previous;
  });
  const sent: Array<{ email: Record<string, unknown>; key: string | null }> = [];
  // This replaces all fetches. Nothing can reach the provider or another host.
  const provider = t.mock.method(globalThis, "fetch", async (url: string | URL | Request, init?: RequestInit) => {
    assert.equal(url, "https://api.resend.com/emails");
    sent.push({ email: JSON.parse(String(init?.body)), key: new Headers(init?.headers).get("Idempotency-Key") });
    return Response.json({ id });
  });
  const info = t.mock.method(console, "info", () => {});
  const errors = t.mock.method(console, "error", () => {});
  return { sent, provider, info, errors };
}
function request(body: string, headers: Record<string, string> = {}) {
  return new NextRequest(URL, { method: "POST", headers: { "content-type": "application/json", ...headers }, body });
}
function streamRequest(body: ReadableStream<Uint8Array>, headers: Record<string, string> = {}) {
  return new NextRequest(URL, { method: "POST", headers: { "content-type": "application/json", ...headers }, body, duplex: "half" } as ConstructorParameters<typeof NextRequest>[1]);
}

test("a long multilingual payload from existing referral fields fits schema and request cap", async (t) => {
  const h = isolated(t);
  const payload = { ...referral, referrerName: "測".repeat(254), clientName: "試".repeat(254), notes: "文".repeat(5000) };
  assert.equal(validateFormPayload(payload), true);
  for (const [field, value] of Object.entries(payload)) {
    assert.equal(fieldValidationMessage(value, { maxLength: field === "notes" ? 5000 : 254 }), "", field);
  }
  const json = JSON.stringify(payload);
  assert.ok(Buffer.byteLength(json) > 16384);
  assert.ok(Buffer.byteLength(json) < LIMIT);
  const response = await POST(request(json));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true, submissionId: id });
  assert.equal(h.provider.mock.callCount(), 1);
  assert.ok(String(h.sent[0].email.text).includes(payload.notes));
  assert.deepEqual(h.sent[0].email.to, ["info@gentlecarenursing.com.au"]);
  assert.equal(h.sent[0].email.reply_to, payload.referrerEmail);
});

test("worst JSON escaping of schema-bounded strings stays within the envelope without raising field limits", async (t) => {
  const h = isolated(t);
  for (const payload of [
    { ...contact, name: "\u0001".repeat(254), phone: "\u0002".repeat(254), serviceType: "\u0003".repeat(254), message: "\u0004".repeat(5000) },
    { ...referral, referrerName: "\u0001".repeat(254), referrerPhone: "\u0002".repeat(254), organization: "\u0003".repeat(254), clientName: "\u0004".repeat(254), notes: "\u0005".repeat(5000) },
  ]) {
    assert.equal(validateFormPayload(payload), true);
    const json = JSON.stringify(payload);
    assert.ok(Buffer.byteLength(json) > 16384);
    assert.ok(Buffer.byteLength(json) < LIMIT);
    assert.equal((await POST(request(json))).status, 200);
  }
  const invalid = [{ ...contact, message: "x".repeat(5001) }, { ...contact, name: "x".repeat(255) }, { ...referral, notes: "x".repeat(5001) }, { ...referral, organization: "x".repeat(255) }, { ...referral, unexpected: "value" }];
  for (const payload of invalid) {
    assert.equal(validateFormPayload(payload), false);
    assert.equal((await POST(request(JSON.stringify(payload)))).status, 400);
  }
  assert.equal(h.provider.mock.callCount(), 2);
});

test("compact JSON of the bounded referral schema has a conservative envelope below 64 KiB", () => {
  const empty = { type: "referral", referrerName: "", referrerEmail: "", referrerPhone: "", referrerRole: "", organization: "", clientName: "", serviceType: "", notes: "" };
  // JSON escapes at most six ASCII bytes per UTF-16 unit (controls/surrogates).
  // Seven short fields plus notes; type is fixed and already in the envelope.
  const upperBound = Buffer.byteLength(JSON.stringify(empty)) + 6 * (7 * 254 + 5000);
  assert.equal(upperBound, 40823);
  assert.ok(upperBound < LIMIT);
});

test("JSON media type matching is exact, case-insensitive and parameter tolerant", async (t) => {
  const h = isolated(t);
  for (const value of ["application/json", "application/json; charset=utf-8", "APPLICATION/JSON; charset=UTF-8", "application/json ;charset=utf-8"]) {
    assert.equal((await POST(request(JSON.stringify(contact), { "content-type": value }))).status, 200, value);
  }
  for (const value of ["application/jsonp", "application/json-invalid", "application/problem+json", "text/plain", "application/x-www-form-urlencoded", ""]) {
    const req = request(JSON.stringify(contact), { "content-type": value });
    assert.equal((await POST(req)).status, 415, value);
    assert.equal(req.bodyUsed, false);
  }
  const missing = new NextRequest(URL, { method: "POST", body: new TextEncoder().encode(JSON.stringify(contact)) });
  assert.equal(missing.headers.get("content-type"), null);
  assert.equal((await POST(missing)).status, 415);
  assert.equal(h.provider.mock.callCount(), 4);
});

test("supplied mismatched, opaque and empty origins are rejected before reads or sending", async (t) => {
  const h = isolated(t);
  for (const origin of ["https://other.invalid", "http://gentlecarenursing.com.au", "https://gentlecarenursing.com.au.evil.invalid", "null", ""]) {
    const req = request(JSON.stringify(contact), { origin });
    assert.equal((await POST(req)).status, 403, origin);
    assert.equal(req.bodyUsed, false);
  }
  assert.equal(h.provider.mock.callCount(), 0);
});

test("same and absent origins preserve contact/referral acceptance, receipts and stable provider keys", async (t) => {
  const h = isolated(t);
  const origins: Array<Record<string, string>> = [{}, { origin: "https://gentlecarenursing.com.au" }];
  for (const payload of [contact, referral]) {
    for (const headers of origins) {
      const response = await POST(request(JSON.stringify(payload), headers));
      assert.equal(response.status, 200);
      assert.deepEqual(await response.json(), { success: true, submissionId: id });
    }
  }
  assert.equal(h.provider.mock.callCount(), 4);
  assert.deepEqual(h.sent[0], h.sent[1]);
  assert.deepEqual(h.sent[2], h.sent[3]);
  assert.match(h.sent[0].key ?? "", /^website-enquiry\/[0-9a-f]{64}$/);
  for (const item of h.sent) assert.deepEqual(item.email.to, ["info@gentlecarenursing.com.au"]);
});

test("exact raw-byte limit passes and next byte fails regardless of Content-Length", async (t) => {
  const h = isolated(t);
  const json = JSON.stringify(contact);
  const exact = json + " ".repeat(LIMIT - Buffer.byteLength(json));
  assert.equal(Buffer.byteLength(exact), LIMIT);
  const within = request(exact);
  assert.equal((await POST(within)).status, 200);
  assert.equal(within.body?.locked, false);
  const claimedLengths: Array<Record<string, string>> = [{}, { "content-length": "1" }];
  for (const headers of claimedLengths) {
    const req = request(exact + " ", headers);
    assert.equal((await POST(req)).status, 413);
    assert.equal(req.body?.locked, false);
  }
  assert.equal(h.provider.mock.callCount(), 1);
});

test("cap counts UTF-8 bytes, not JavaScript characters", async (t) => {
  const h = isolated(t);
  const body = JSON.stringify({ ...contact, message: "測".repeat(22000) });
  assert.ok(body.length < LIMIT);
  assert.ok(Buffer.byteLength(body) > LIMIT);
  assert.equal((await POST(request(body))).status, 413);
  assert.equal(h.provider.mock.callCount(), 0);
});

test("split multibyte stream chunks preserve payload and release the reader", async (t) => {
  const h = isolated(t);
  const message = "Synthetic text: é 日本語 🔥";
  const bytes = new TextEncoder().encode(JSON.stringify({ ...contact, message }));
  let position = 0;
  const stream = new ReadableStream<Uint8Array>({ pull(controller) {
    if (position === bytes.length) controller.close(); else controller.enqueue(bytes.slice(position, ++position));
  } });
  assert.equal((await POST(streamRequest(stream))).status, 200);
  assert.equal(stream.locked, false);
  assert.ok(String(h.sent[0].email.text).includes(message));
  assert.equal(h.provider.mock.callCount(), 1);
});

test("oversized streams cancel once, stop before later chunks and release the lock", async (t) => {
  const h = isolated(t);
  const chunks = [new Uint8Array(LIMIT), new Uint8Array(1), new Uint8Array(1)];
  let pulls = 0, cancels = 0;
  const stream = new ReadableStream<Uint8Array>({
    pull(controller) { const chunk = chunks[pulls++]; if (chunk) controller.enqueue(chunk); else controller.close(); },
    cancel() { cancels++; },
  }, { highWaterMark: 0 });
  assert.equal((await POST(streamRequest(stream))).status, 413);
  assert.equal(pulls, 2);
  assert.equal(cancels, 1);
  assert.equal(stream.locked, false);
  assert.equal(h.provider.mock.callCount(), 0);
});

test("failed cancellation preserves 413 and does not expose errors", async (t) => {
  const h = isolated(t);
  const sentinel = "PRIVATE_CANCEL_ERROR";
  const stream = new ReadableStream<Uint8Array>({ start(controller) { controller.enqueue(new Uint8Array(LIMIT + 1)); }, cancel() { return Promise.reject(new Error(sentinel)); } });
  const response = await POST(streamRequest(stream));
  assert.equal(response.status, 413);
  assert.equal(stream.locked, false);
  assert.ok(!JSON.stringify(await response.json()).includes(sentinel));
  assert.equal(h.provider.mock.callCount(), 0);
});

test("missing, malformed and failing bodies reject without provider activity or leaked content", async (t) => {
  const h = isolated(t);
  const missing = new NextRequest(URL, { method: "POST", headers: { "content-type": "application/json" } });
  assert.equal((await POST(missing)).status, 400);
  for (const body of ["", "{", "null", "[]", "true", "5", "{}"] ) {
    const req = request(body);
    assert.equal((await POST(req)).status, 400);
    assert.equal(req.body?.locked, false);
  }
  const sentinel = "PRIVATE_STREAM_ERROR";
  const stream = new ReadableStream<Uint8Array>({ start(controller) { controller.error(new Error(sentinel)); } });
  const response = await POST(streamRequest(stream));
  assert.equal(response.status, 400);
  assert.equal(stream.locked, false);
  assert.ok(!JSON.stringify(await response.json()).includes(sentinel));
  assert.equal(h.provider.mock.callCount(), 0);
  assert.equal(h.errors.mock.callCount(), 0);
  assert.equal(h.info.mock.callCount(), 0);
});
