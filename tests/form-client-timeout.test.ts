import test from "node:test";
import assert from "node:assert/strict";
import { submitWebsiteForm } from "../src/lib/form-client";

const payload = {
  type: "contact" as const,
  name: "Synthetic Person",
  email: "synthetic@example.com",
  message: "Synthetic private message",
};
const submissionId = "8dd9d328-72ca-4a29-8022-735693bd84f7";
const accepted = () => Response.json({ success: true, submissionId });

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason: unknown) => void;
  const promise = new Promise<T>((res, rej) => { resolve = res; reject = rej; });
  return { promise, resolve, reject };
}

test("a stalled request aborts after the deadline without retrying or changing private values", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  let signal: AbortSignal | undefined;
  let calls = 0;
  const original = structuredClone(payload);
  const result = submitWebsiteForm(payload, async (url, init) => {
    calls++;
    assert.equal(url, "/api/submit");
    assert.equal(init?.method, "POST");
    assert.deepEqual(JSON.parse(String(init?.body)), original);
    signal = init?.signal ?? undefined;
    return new Promise<Response>(() => {});
  });
  assert.ok(signal);
  assert.equal(signal.aborted, false);
  const rejection = assert.rejects(result, /Submission confirmation timed out/);
  t.mock.timers.tick(30_000);
  assert.equal(signal.aborted, true);
  await rejection;
  t.mock.timers.tick(60_000);
  assert.equal(calls, 1);
  assert.deepEqual(payload, original);
});

test("a valid confirmation before the deadline succeeds and clears its timer", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  let signal: AbortSignal | undefined;
  const response = deferred<Response>();
  const result = submitWebsiteForm(payload, async (_url, init) => {
    signal = init?.signal ?? undefined;
    return response.promise;
  });
  assert.ok(signal);
  t.mock.timers.tick(29_999);
  assert.equal(signal.aborted, false);
  response.resolve(accepted());
  assert.deepEqual(await result, { submissionId });
  t.mock.timers.tick(60_000);
  assert.equal(signal.aborted, false);
});

test("the deadline also covers a response whose JSON confirmation never completes", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  let signal: AbortSignal | undefined;
  let reads = 0;
  const result = submitWebsiteForm(payload, async (_url, init) => {
    signal = init?.signal ?? undefined;
    return { ok: true, json: async () => { reads++; return new Promise(() => {}); } } as unknown as Response;
  });
  assert.ok(signal);
  await Promise.resolve();
  assert.equal(reads, 1);
  const rejection = assert.rejects(result, /timed out/);
  t.mock.timers.tick(30_000);
  assert.equal(signal.aborted, true);
  await rejection;
});

test("a late acceptance cannot turn an expired operation into success", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  let signal: AbortSignal | undefined;
  const response = deferred<Response>();
  let successes = 0;
  const result = submitWebsiteForm(payload, async (_url, init) => {
    signal = init?.signal ?? undefined;
    return response.promise;
  });
  const observed = result.then(() => { successes++; }, () => {});
  assert.ok(signal);
  const rejection = assert.rejects(result, /timed out/);
  t.mock.timers.tick(30_000);
  await rejection;
  response.resolve(accepted());
  await observed;
  await Promise.resolve();
  assert.equal(successes, 0);
  assert.equal(signal.aborted, true);
});

for (const failure of ["http", "invalid-confirmation", "network"] as const) {
  test(`${failure} failure clears its timer and never reports success`, async (t) => {
    t.mock.timers.enable({ apis: ["setTimeout"] });
    let signal: AbortSignal | undefined;
    let calls = 0;
    const result = submitWebsiteForm(payload, async (_url, init) => {
      calls++;
      signal = init?.signal ?? undefined;
      if (failure === "network") throw new Error("Synthetic network failure");
      if (failure === "http") return Response.json({ success: false }, { status: 502 });
      return Response.json({ success: true, submissionId: "invalid" });
    });
    await assert.rejects(result);
    assert.ok(signal);
    t.mock.timers.tick(60_000);
    assert.equal(signal.aborted, false);
    assert.equal(calls, 1);
  });
}

test("separate submissions own independent deadlines", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  const signals: Array<AbortSignal | undefined> = [];
  const responses = [deferred<Response>(), deferred<Response>()];
  let calls = 0;
  const fetcher: typeof fetch = async (_url, init) => {
    signals.push(init?.signal ?? undefined);
    return responses[calls++].promise;
  };
  const first = submitWebsiteForm(payload, fetcher);
  const firstRejection = assert.rejects(first, /timed out/);
  t.mock.timers.tick(10_000);
  const second = submitWebsiteForm({ ...payload, message: "Second synthetic message" }, fetcher);
  assert.ok(signals[0]);
  assert.ok(signals[1]);
  t.mock.timers.tick(20_000);
  await firstRejection;
  assert.equal(signals[0].aborted, true);
  assert.equal(signals[1].aborted, false);
  responses[1].resolve(accepted());
  assert.deepEqual(await second, { submissionId });
  t.mock.timers.tick(60_000);
  assert.equal(signals[1].aborted, false);
  assert.equal(calls, 2);
});

test("an abort-aware fetcher cannot replace the timeout with a different outcome", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  let signal: AbortSignal | undefined;
  const result = submitWebsiteForm(payload, async (_url, init) => {
    signal = init?.signal ?? undefined;
    return new Promise<Response>((_resolve, reject) => {
      signal?.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")), { once: true });
    });
  });
  assert.ok(signal);
  const rejection = assert.rejects(result, /Submission confirmation timed out/);
  t.mock.timers.tick(30_000);
  await rejection;
  assert.equal(signal.aborted, true);
});

test("malformed JSON clears its timer without confirming acceptance", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  let signal: AbortSignal | undefined;
  const result = submitWebsiteForm(payload, async (_url, init) => {
    signal = init?.signal ?? undefined;
    return new Response("not json", { status: 200 });
  });
  await assert.rejects(result, SyntaxError);
  assert.ok(signal);
  t.mock.timers.tick(60_000);
  assert.equal(signal.aborted, false);
});

test("late JSON acceptance cannot replace an already reported timeout", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  let signal: AbortSignal | undefined;
  let successes = 0;
  const body = deferred<{ success: boolean; submissionId: string }>();
  const result = submitWebsiteForm(payload, async (_url, init) => {
    signal = init?.signal ?? undefined;
    return { ok: true, json: () => body.promise } as unknown as Response;
  });
  const observed = result.then(() => { successes++; }, () => {});
  assert.ok(signal);
  await Promise.resolve();
  const rejection = assert.rejects(result, /timed out/);
  t.mock.timers.tick(30_000);
  await rejection;
  body.resolve({ success: true, submissionId });
  await observed;
  await Promise.resolve();
  await Promise.resolve();
  assert.equal(successes, 0);
  assert.equal(signal.aborted, true);
});
