import test, { type TestContext } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { Resend } from "resend";
import { POST } from "../src/app/api/feedback/route";
import { SITE } from "../src/lib/constants";
import { FEEDBACK_UNCONFIRMED_MESSAGE, FeedbackSubmissionError, submitPrivateFeedback } from "../src/lib/feedback-client";

const DEADLINE = 10_000;
const id = "d836e511-cd92-4872-bbd1-18ed349e30af";
const payload = { rating: 3 as const, name: "PRIVATE_NAME_SENTINEL", contact: "synthetic@example.com", service: "other", improvements: "PRIVATE_BODY_SENTINEL", allowFollowup: false };
const accepted = { data: { id }, error: null };
type ProviderReply = { data: { id: string } | null; error: { message: string } | null };
const flush = () => new Promise<void>(resolve => setImmediate(resolve));

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (error: Error) => void;
  const promise = new Promise<T>((res, rej) => { resolve = res; reject = rej; });
  return { promise, resolve, reject };
}

function isolated(t: TestContext) {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  const scheduled = t.mock.method(globalThis, "setTimeout");
  const cleared = t.mock.method(globalThis, "clearTimeout");
  const previous = process.env.RESEND_API_KEY;
  process.env.RESEND_API_KEY = "local_synthetic_key_not_real";
  t.after(() => {
    if (previous === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = previous;
  });
  const delivery = deferred<ProviderReply>();
  const provider = t.mock.method(Resend.prototype, "post", () => delivery.promise);
  const network = t.mock.method(globalThis, "fetch", async () => { throw new Error("Network forbidden"); });
  const errors = t.mock.method(console, "error", () => {});
  const info = t.mock.method(console, "info", () => {});
  return { scheduled, cleared, delivery, provider, network, errors, info };
}

function request(body: unknown = payload, headers: Record<string, string> = {}) {
  return new NextRequest("https://gentlecarenursing.com.au/api/feedback", {
    method: "POST", headers: { "Content-Type": "application/json", ...headers }, body: JSON.stringify(body),
  });
}

function assertTimersCleared(h: ReturnType<typeof isolated>, expected = 2) {
  assert.equal(h.scheduled.mock.callCount(), expected);
  assert.equal(h.cleared.mock.callCount(), expected);
  for (const call of h.scheduled.mock.calls) {
    assert.equal(call.arguments[1], DEADLINE);
    assert.equal(h.cleared.mock.calls.filter(clear => clear.arguments[0] === call.result).length, 1);
  }
}

function assertPrivate(h: ReturnType<typeof isolated>, value: unknown) {
  assert.doesNotMatch(JSON.stringify(value), /PRIVATE_|local_synthetic|synthetic@example|d836e511/);
  assert.equal(h.network.mock.callCount(), 0);
  assert.equal(h.info.mock.callCount(), 0);
  for (const log of h.errors.mock.calls) {
    assert.equal(log.arguments.length, 1);
    assert.match(String(log.arguments[0]), /^\[feedback\] /);
    assert.doesNotMatch(JSON.stringify(log.arguments), /PRIVATE_|local_synthetic|synthetic@example|d836e511/);
  }
}

for (const late of ["acceptance", "rejection"] as const) {
  test(`bounds a stalled feedback provider and safely observes late ${late}`, async (t) => {
    const h = isolated(t);
    let response: Response | undefined;
    const pending = POST(request()).then(value => { response = value; return value; });
    try {
      await flush();
      assert.equal(h.provider.mock.callCount(), 1);
      t.mock.timers.tick(DEADLINE - 1);
      await flush();
      assert.equal(Boolean(response), false);
      t.mock.timers.tick(1);
      await flush();
      assert.ok(response, "A stalled feedback provider must return at its deadline");
      assert.equal(response.status, 504);
      const result = await response.clone().json();
      assert.equal(result.success, false);
      assert.match(result.error, /couldn't confirm whether.*accepted for delivery/);
      assert.match(result.error, /before sending it again to avoid a duplicate/);
      assert.ok(result.error.includes(SITE.email));
      assert.doesNotMatch(result.error, /was not sent|couldn't send|try again/i);
      assertTimersCleared(h);
      assertPrivate(h, result);
      const logCount = h.errors.mock.callCount();
      if (late === "acceptance") h.delivery.resolve(accepted);
      else h.delivery.reject(new Error("PRIVATE_PROVIDER_SENTINEL"));
      await flush();
      t.mock.timers.tick(60_000);
      await flush();
      assert.equal((await pending).status, 504);
      assert.deepEqual(await response.clone().json(), result);
      assert.equal(h.provider.mock.callCount(), 1);
      assert.equal(h.errors.mock.callCount(), logCount);
      assertPrivate(h, result);
    } finally {
      // Let the unbounded baseline finish after the expected failed assertion.
      h.delivery.resolve(accepted);
      await pending;
    }
  });
}

test("provider acceptance just before its deadline clears timers and sends only once", async (t) => {
  const h = isolated(t);
  const pending = POST(request());
  await flush();
  t.mock.timers.tick(DEADLINE - 1);
  h.delivery.resolve(accepted);
  const response = await pending;
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true });
  assertTimersCleared(h);
  t.mock.timers.tick(60_000);
  await flush();
  assert.equal(h.provider.mock.callCount(), 1);
  assert.equal(h.errors.mock.callCount(), 0);
  assertPrivate(h, {});
});

for (const mode of ["error", "invalid-receipt", "rejection", "sync-throw"] as const) {
  test(`early provider ${mode} clears its deadline and remains ambiguous`, async (t) => {
    const h = isolated(t);
    h.provider.mock.mockImplementation(() => {
      if (mode === "sync-throw") throw new Error("PRIVATE_PROVIDER_SENTINEL");
      if (mode === "rejection") return Promise.reject(new Error("PRIVATE_PROVIDER_SENTINEL"));
      if (mode === "error") return Promise.resolve({ data: null, error: { message: "PRIVATE_PROVIDER_SENTINEL" } });
      return Promise.resolve({ data: { id: "PRIVATE_RECEIPT_SENTINEL" }, error: null });
    });
    const response = await POST(request());
    assert.equal(response.status, mode === "rejection" || mode === "sync-throw" ? 500 : 502);
    const result = await response.json();
    assert.match(result.error, /couldn't confirm whether/);
    assertTimersCleared(h);
    assertPrivate(h, result);
    const logs = h.errors.mock.callCount();
    t.mock.timers.tick(60_000);
    await flush();
    assert.equal(h.provider.mock.callCount(), 1);
    assert.equal(h.errors.mock.callCount(), logs);
  });
}

test("validation and missing configuration finish before scheduling a provider deadline", async (t) => {
  const h = isolated(t);
  const cases: Array<[NextRequest, number, number]> = [
    [request(payload, { origin: "https://other.invalid" }), 403, 0],
    [request(payload, { "content-type": "text/plain" }), 415, 0],
    [request({ rating: 0 }), 400, 1],
    [request({ ...payload, contact: "invalid" }), 400, 1],
    [request({ ...payload, improvements: "x".repeat(65536) }), 413, 1],
  ];
  let expected = 0;
  for (const [req, status, timers] of cases) {
    const response = await POST(req);
    expected += timers;
    assert.equal(response.status, status);
    assertTimersCleared(h, expected);
    assertPrivate(h, await response.json());
  }
  delete process.env.RESEND_API_KEY;
  assert.equal((await POST(request())).status, 503);
  assertTimersCleared(h, ++expected);
  assert.equal(h.provider.mock.callCount(), 0);
  assertPrivate(h, {});
});

test("body receiving and provider waiting have separate bounded phases", async (t) => {
  const h = isolated(t);
  let controller!: ReadableStreamDefaultController<Uint8Array>;
  const body = new ReadableStream<Uint8Array>({ start(value) { controller = value; } }, { highWaterMark: 0 });
  const req = new NextRequest("https://gentlecarenursing.com.au/api/feedback", {
    method: "POST", headers: { "content-type": "application/json" }, body, duplex: "half",
  } as ConstructorParameters<typeof NextRequest>[1]);
  let response: Response | undefined;
  const pending = POST(req).then(value => { response = value; return value; });
  t.mock.timers.tick(9_000);
  assert.equal(h.provider.mock.callCount(), 0);
  controller.enqueue(new TextEncoder().encode(JSON.stringify(payload)));
  controller.close();
  await flush();
  assert.equal(body.locked, false);
  assert.equal(h.provider.mock.callCount(), 1);
  assert.equal(h.cleared.mock.callCount(), 1);
  t.mock.timers.tick(DEADLINE - 1);
  await flush();
  assert.equal(response, undefined);
  t.mock.timers.tick(1);
  assert.equal((await pending).status, 504);
  assertTimersCleared(h);
  h.delivery.resolve(accepted);
  await flush();
  assert.equal(h.provider.mock.callCount(), 1);
  assertPrivate(h, await response!.json());
});

test("actual route provider timeout is unknown to the client and never retries", async (t) => {
  const h = isolated(t);
  let requests = 0, successes = 0;
  let signal: AbortSignal | undefined;
  const pending = submitPrivateFeedback(payload, async (_url, init) => {
    requests++;
    signal = init?.signal ?? undefined;
    return POST(request(JSON.parse(String(init?.body))));
  });
  const observed = pending.then(() => { successes++; }, () => {});
  const rejected = assert.rejects(pending, (error: unknown) => {
    assert.ok(error instanceof FeedbackSubmissionError);
    assert.equal(error.outcome, "unknown");
    assert.equal(error.message, FEEDBACK_UNCONFIRMED_MESSAGE);
    return true;
  });
  await flush();
  t.mock.timers.tick(DEADLINE);
  await rejected;
  assert.equal(signal?.aborted, false);
  h.delivery.resolve(accepted);
  await flush();
  t.mock.timers.tick(60_000);
  await observed;
  assert.equal(signal?.aborted, false);
  assert.equal(requests, 1);
  assert.equal(successes, 0);
  assert.equal(h.provider.mock.callCount(), 1);
  assert.equal(h.scheduled.mock.callCount(), 3);
  assert.equal(h.cleared.mock.callCount(), 3);
  assertPrivate(h, {});
});

test("overlapping feedback requests own independent provider deadlines", async (t) => {
  const h = isolated(t);
  const second = deferred<typeof accepted>();
  let calls = 0;
  h.provider.mock.mockImplementation(() => calls++ === 0 ? h.delivery.promise : second.promise);
  const firstRequest = POST(request());
  await flush();
  t.mock.timers.tick(5_000);
  let secondResponse: Response | undefined;
  const secondRequest = POST(request({ ...payload, rating: 5 })).then(value => { secondResponse = value; return value; });
  await flush();
  t.mock.timers.tick(5_000);
  assert.equal((await firstRequest).status, 504);
  assert.equal(secondResponse, undefined);
  second.resolve(accepted);
  assert.equal((await secondRequest).status, 200);
  h.delivery.reject(new Error("PRIVATE_PROVIDER_SENTINEL"));
  await flush();
  t.mock.timers.tick(60_000);
  assert.equal(h.provider.mock.callCount(), 2);
  assertTimersCleared(h, 4);
  assertPrivate(h, {});
});
