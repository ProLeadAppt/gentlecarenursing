import test from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { Resend } from "resend";
import { POST } from "../src/app/api/feedback/route";
import { SITE } from "../src/lib/constants";
import { FeedbackSubmissionError, submitPrivateFeedback } from "../src/lib/feedback-client";

const payload = { rating: 2 as const, name: "Synthetic person", contact: "synthetic@example.com", service: "other", improvements: "Synthetic feedback", allowFollowup: false };
function request(body = payload) {
  return new NextRequest("http://localhost/api/feedback", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
}

test("route provider failures and invalid receipts say unknown, not that sending failed", async (t) => {
  const previousKey = process.env.RESEND_API_KEY;
  process.env.RESEND_API_KEY = "synthetic_not_a_real_key";
  let mode: "invalid" | "error" | "throw" = "invalid";
  const provider = t.mock.method(Resend.prototype, "post", async () => {
    if (mode === "throw") throw new Error("PRIVATE_SENTINEL");
    return mode === "error" ? { data: null, error: { message: "PRIVATE_SENTINEL" } } : { data: { id: "invalid" }, error: null };
  });
  const logs = t.mock.method(console, "error", () => {});
  t.mock.method(globalThis, "fetch", async () => { throw new Error("Network forbidden"); });
  try {
    for (mode of ["invalid", "error", "throw"] as const) {
      const response = await POST(request());
      assert.equal(response.status, mode === "throw" ? 500 : 502);
      const body = await response.json();
      assert.equal(body.success, false);
      assert.match(body.error, /couldn't confirm whether.*accepted for delivery/);
      assert.match(body.error, /before sending it again to avoid a duplicate/);
      assert.ok(body.error.includes(SITE.email));
      assert.doesNotMatch(body.error, /couldn't send|PRIVATE_SENTINEL/);
    }
    assert.equal(provider.mock.callCount(), 3);
    assert.doesNotMatch(JSON.stringify(logs.mock.calls), /PRIVATE_SENTINEL/);
  } finally {
    if (previousKey === undefined) delete process.env.RESEND_API_KEY; else process.env.RESEND_API_KEY = previousKey;
  }
});

test("late provider acceptance after both deadlines cannot trigger client success or retry", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  const previousKey = process.env.RESEND_API_KEY;
  process.env.RESEND_API_KEY = "synthetic_not_a_real_key";
  let accept!: (value: { data: { id: string }; error: null }) => void;
  let providerEntered!: () => void;
  const entered = new Promise<void>(resolve => { providerEntered = resolve; });
  const provider = t.mock.method(Resend.prototype, "post", async () => {
    providerEntered();
    return new Promise(resolve => { accept = resolve; });
  });
  t.mock.method(globalThis, "fetch", async () => { throw new Error("Network forbidden"); });
  let routeResult: Promise<Response> | undefined;
  let calls = 0;
  let successes = 0;
  let signal: AbortSignal | undefined;
  try {
    const task = submitPrivateFeedback(payload, async (_url, init) => {
      calls++;
      signal = init?.signal ?? undefined;
      // Deliberately ignores client abort: servers/providers can continue after it.
      routeResult = POST(request(JSON.parse(String(init?.body))));
      return routeResult;
    });
    const observed = task.then(() => { successes++; }, () => {});
    const rejection = assert.rejects(task, (error: unknown) => error instanceof FeedbackSubmissionError && error.outcome === "unknown");
    await entered;
    t.mock.timers.tick(30_000);
    await rejection;
    assert.equal(signal?.aborted, true);
    accept({ data: { id: "d836e511-cd92-4872-bbd1-18ed349e30af" }, error: null });
    const result = await routeResult!;
    assert.equal(result.status, 504);
    await observed;
    await Promise.resolve(); await Promise.resolve();
    assert.equal(successes, 0);
    assert.equal(provider.mock.callCount(), 1);
    assert.equal(calls, 1);
  } finally {
    if (previousKey === undefined) delete process.env.RESEND_API_KEY; else process.env.RESEND_API_KEY = previousKey;
  }
});

test("representative route branches for known rejection statuses never reach the provider", async (t) => {
  const previousKey = process.env.RESEND_API_KEY;
  process.env.RESEND_API_KEY = "synthetic_not_a_real_key";
  const provider = t.mock.method(Resend.prototype, "post", async () => { throw new Error("Provider must not be reached"); });
  t.mock.method(globalThis, "fetch", async () => { throw new Error("Network forbidden"); });
  t.mock.method(console, "error", () => {});
  try {
    const cases: Array<[number, NextRequest]> = [
      [400, request({ ...payload, rating: 0 } as unknown as typeof payload)],
      [403, new NextRequest("http://localhost/api/feedback", { method: "POST", headers: { "Content-Type": "application/json", Origin: "https://other.invalid" }, body: JSON.stringify(payload) })],
      [413, request({ ...payload, improvements: "x".repeat(65536) })],
      [415, new NextRequest("http://localhost/api/feedback", { method: "POST", body: JSON.stringify(payload) })],
    ];
    for (const [status, input] of cases) {
      const response = await POST(input);
      assert.equal(response.status, status);
      const body = await response.json();
      assert.equal(body.success, false);
      assert.equal(typeof body.error, "string");
    }
    delete process.env.RESEND_API_KEY;
    const unavailable = await POST(request());
    assert.equal(unavailable.status, 503);
    const body = await unavailable.json();
    assert.equal(body.success, false);
    assert.equal(typeof body.error, "string");
    assert.equal(provider.mock.callCount(), 0);
  } finally {
    if (previousKey === undefined) delete process.env.RESEND_API_KEY; else process.env.RESEND_API_KEY = previousKey;
  }
});
