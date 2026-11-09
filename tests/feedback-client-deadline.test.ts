import test from "node:test";
import assert from "node:assert/strict";
import { FeedbackSubmissionError, FEEDBACK_UNCONFIRMED_MESSAGE, submitPrivateFeedback } from "../src/lib/feedback-client";

const payload = {
  rating: 3 as const, name: "Synthetic Person", contact: "synthetic@example.com",
  service: "personal-care", improvements: "Synthetic private feedback", allowFollowup: false,
};
function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason: unknown) => void;
  const promise = new Promise<T>((res, rej) => { resolve = res; reject = rej; });
  return { promise, resolve, reject };
}
function unknown(error: unknown) {
  assert.ok(error instanceof FeedbackSubmissionError);
  assert.equal(error.outcome, "unknown");
  assert.equal(error.message, FEEDBACK_UNCONFIRMED_MESSAGE);
  return true;
}

test("feedback stalled fetch is bounded, aborts and never retries or mutates values", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  let signal: AbortSignal | undefined;
  let calls = 0;
  const original = structuredClone(payload);
  const task = submitPrivateFeedback(payload, async (url, init) => {
    calls++;
    assert.equal(url, "/api/feedback");
    assert.equal(init?.method, "POST");
    assert.deepEqual(init?.headers, { "Content-Type": "application/json" });
    assert.deepEqual(JSON.parse(String(init?.body)), original);
    signal = init?.signal ?? undefined;
    return new Promise(() => {});
  });
  const rejection = assert.rejects(task, unknown);
  t.mock.timers.tick(29_999);
  assert.equal(signal?.aborted, false);
  t.mock.timers.tick(1);
  await rejection;
  assert.equal(signal?.aborted, true);
  t.mock.timers.tick(60_000);
  assert.equal(calls, 1);
  assert.deepEqual(payload, original);
});

test("feedback deadline covers stalled JSON too", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  let signal: AbortSignal | undefined;
  let reads = 0;
  const task = submitPrivateFeedback(payload, async (_url, init) => {
    signal = init?.signal ?? undefined;
    return { ok: true, json: () => { reads++; return new Promise(() => {}); } } as unknown as Response;
  });
  await Promise.resolve();
  assert.equal(reads, 1);
  const rejection = assert.rejects(task, unknown);
  t.mock.timers.tick(30_000);
  await rejection;
  assert.equal(signal?.aborted, true);
});

for (const phase of ["fetch", "json"] as const) {
  test(`late ${phase} acceptance cannot replace an expired outcome`, async (t) => {
    t.mock.timers.enable({ apis: ["setTimeout"] });
    const response = deferred<Response>();
    const body = deferred<unknown>();
    let successes = 0;
    const task = submitPrivateFeedback(payload, async () => phase === "fetch" ? response.promise :
      { ok: true, json: () => body.promise } as unknown as Response);
    const observed = task.then(() => { successes++; }, () => {});
    const rejection = assert.rejects(task, unknown);
    await Promise.resolve();
    t.mock.timers.tick(30_000);
    await rejection;
    response.resolve(Response.json({ success: true }));
    body.resolve({ success: true });
    await observed;
    await Promise.resolve(); await Promise.resolve();
    assert.equal(successes, 0);
  });
}

test("success means strict true and HTTP success; invalid confirmations stay unknown", async () => {
  for (const value of [null, [], "yes", 1, {}, { success: 1 }, { success: "true" }, { success: false }]) {
    await assert.rejects(submitPrivateFeedback(payload, async () => Response.json(value)), unknown);
  }
  for (const status of [400, 500, 502, 503]) {
    await assert.rejects(submitPrivateFeedback(payload, async () => Response.json({ success: true }, { status })), unknown);
  }
  assert.equal(await submitPrivateFeedback(payload, async () => Response.json({ success: true })), undefined);
});

test("known pre-provider rejections retain actionable server validation", async () => {
  for (const status of [400, 403, 413, 415, 503]) {
    await assert.rejects(submitPrivateFeedback(payload, async () =>
      Response.json({ success: false, error: "Synthetic validation" }, { status })), (error: unknown) => {
      assert.ok(error instanceof FeedbackSubmissionError);
      assert.equal(error.outcome, "rejected");
      assert.equal(error.message, "Synthetic validation");
      return true;
    });
  }
});

test("provider errors, malformed bodies and raw network errors never assert definite rejection or leak details", async () => {
  const sentinel = "PRIVATE_RAW_ERROR";
  for (const status of [200, 429, 500, 502, 504]) {
    await assert.rejects(submitPrivateFeedback(payload, async () =>
      Response.json({ success: false, error: sentinel }, { status })), unknown);
  }
  for (const body of [{ success: false }, { success: false, error: null }, { success: false, error: "  " }]) {
    await assert.rejects(submitPrivateFeedback(payload, async () => Response.json(body, { status: 400 })), unknown);
  }
  await assert.rejects(submitPrivateFeedback(payload, async () => new Response("invalid JSON")), unknown);
  await assert.rejects(submitPrivateFeedback(payload, async () => { throw new Error(sentinel); }), unknown);
});

test("success and early rejection clear deadlines without later abort or retries", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  for (const mode of ["success", "validation", "provider", "network", "json"] as const) {
    let signal: AbortSignal | undefined;
    let calls = 0;
    const task = submitPrivateFeedback(payload, async (_url, init) => {
      calls++;
      signal = init?.signal ?? undefined;
      if (mode === "network") throw new Error("Synthetic failure");
      if (mode === "json") return new Response("invalid JSON");
      if (mode === "success") return Response.json({ success: true });
      return Response.json({ success: false, error: "Synthetic failure" }, { status: mode === "validation" ? 400 : 502 });
    });
    if (mode === "success") await task;
    else await assert.rejects(task, FeedbackSubmissionError);
    t.mock.timers.tick(60_000);
    assert.equal(signal?.aborted, false, mode);
    assert.equal(calls, 1);
  }
});

test("abort-aware rejection cannot override the uncertain deadline message", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  const task = submitPrivateFeedback(payload, async (_url, init) => new Promise((_resolve, reject) => {
    init?.signal?.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")), { once: true });
  }));
  const rejection = assert.rejects(task, unknown);
  t.mock.timers.tick(30_000);
  await rejection;
});

test("independent feedback requests own independent deadlines", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  const signals: Array<AbortSignal | null | undefined> = [];
  const responses = [deferred<Response>(), deferred<Response>()];
  let calls = 0;
  const fetcher: typeof fetch = async (_url, init) => { signals.push(init?.signal); return responses[calls++].promise; };
  const first = submitPrivateFeedback(payload, fetcher);
  const rejection = assert.rejects(first, unknown);
  t.mock.timers.tick(10_000);
  const second = submitPrivateFeedback({ ...payload, rating: 5 }, fetcher);
  t.mock.timers.tick(20_000);
  await rejection;
  assert.equal(signals[0]?.aborted, true);
  assert.equal(signals[1]?.aborted, false);
  responses[1].resolve(Response.json({ success: true }));
  await second;
  t.mock.timers.tick(60_000);
  assert.equal(signals[1]?.aborted, false);
  assert.equal(calls, 2);
});
