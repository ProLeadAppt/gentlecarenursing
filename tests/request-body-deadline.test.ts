import test, { type TestContext } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { Resend } from "resend";
import { POST as submit } from "../src/app/api/submit/route";
import { POST as feedback } from "../src/app/api/feedback/route";
import { FeedbackSubmissionError, submitPrivateFeedback } from "../src/lib/feedback-client";

const DEADLINE = 10_000;
const id = "d836e511-cd92-4872-bbd1-18ed349e30af";
const feedbackPayload = { rating: 3 as const, name: "Synthetic person", contact: "synthetic@example.com", service: "other", improvements: "PRIVATE_BODY_SENTINEL", allowFollowup: false };
const handlers = [
  { name: "enquiry", path: "submit", post: submit, payload: { type: "contact", name: "Synthetic person", email: "synthetic@example.com", message: "PRIVATE_BODY_SENTINEL" } },
  { name: "feedback", path: "feedback", post: feedback, payload: feedbackPayload },
];
const flush = () => new Promise<void>(resolve => setImmediate(resolve));
const encode = (value: unknown) => new TextEncoder().encode(JSON.stringify(value));

function isolated(t: TestContext) {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  const scheduled = t.mock.method(globalThis, "setTimeout");
  const cleared = t.mock.method(globalThis, "clearTimeout");
  const previous = process.env.RESEND_API_KEY;
  process.env.RESEND_API_KEY = "local_synthetic_test_key_not_real";
  t.after(() => {
    if (previous === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = previous;
  });
  // All provider/network paths terminate in local stubs, never the network.
  const network = t.mock.method(globalThis, "fetch", async () => Response.json({ id }));
  const provider = t.mock.method(Resend.prototype, "post", async () => ({ data: { id }, error: null }));
  const errors = t.mock.method(console, "error", () => {});
  const info = t.mock.method(console, "info", () => {});
  return { network, provider, errors, info, scheduled, cleared };
}
function request(path: string, stream: ReadableStream<Uint8Array>) {
  return new NextRequest(`https://gentlecarenursing.com.au/api/${path}`, {
    method: "POST", headers: { "content-type": "application/json" }, body: stream, duplex: "half",
  } as ConstructorParameters<typeof NextRequest>[1]);
}
function assertNotSent(h: ReturnType<typeof isolated>) {
  assert.equal(h.network.mock.callCount(), 0);
  assert.equal(h.provider.mock.callCount(), 0);
  assert.equal(h.errors.mock.callCount(), 0);
  assert.equal(h.info.mock.callCount(), 0);
}
function assertTimerCleared(h: ReturnType<typeof isolated>, scheduled = 1, cleared = scheduled) {
  assert.equal(h.scheduled.mock.callCount(), scheduled);
  assert.equal(h.scheduled.mock.calls[0].arguments[1], DEADLINE);
  assert.equal(h.cleared.mock.callCount(), cleared);
  assert.equal(h.cleared.mock.calls[0].arguments[0], h.scheduled.mock.calls[0].result);
}

for (const { name, path, post, payload } of handlers) {
  for (const rejectCancellation of [false, true]) {
    test(`${name} bounds a stalled body read while cancellation remains pending${rejectCancellation ? " and later rejects" : ""}`, async (t) => {
      const h = isolated(t);
      let controller!: ReadableStreamDefaultController<Uint8Array>;
      let completeCancel!: () => void;
      let failCancel!: (error: Error) => void;
      const cancellation = new Promise<void>((resolve, reject) => { completeCancel = resolve; failCancel = reject; });
      let pulls = 0, cancels = 0;
      const stream = new ReadableStream<Uint8Array>({
        start(value) { controller = value; },
        pull() { pulls++; return new Promise<void>(() => {}); },
        cancel() { cancels++; return cancellation; },
      }, { highWaterMark: 0 });
      let response: Response | undefined;
      const pending = post(request(path, stream)).then(value => { response = value; return value; });
      try {
        await flush();
        t.mock.timers.tick(DEADLINE - 1);
        await flush();
        assert.equal(Boolean(response), false);
        assert.equal(cancels, 0);
        t.mock.timers.tick(1);
        await flush();
        assert.ok(response, "A stalled body read must return at its deadline without awaiting cancellation");
        assert.equal(response.status, 408);
        const result = await response.json();
        assert.equal(result.success, false);
        assert.match(result.error, /timed out/i);
        assert.doesNotMatch(JSON.stringify(result), /PRIVATE_|local_synthetic/);
        assert.equal(stream.locked, false);
        assert.equal(pulls, 1);
        assert.equal(cancels, 1);
        assertNotSent(h);
        assertTimerCleared(h);
      } finally {
        // Also unstick the deliberately failing baseline so the test can exit.
        if (!response) controller.error(new Error("PRIVATE_READ_CLEANUP_SENTINEL"));
        if (rejectCancellation) failCancel(new Error("PRIVATE_CANCEL_SENTINEL"));
        else completeCancel();
        // The baseline never starts cancellation, so handle the test-only promise.
        await cancellation.catch(() => {});
        await pending;
        await flush();
      }
      assertNotSent(h);
    });
  }

  test(`${name} total read deadline is not reset by chunks or a complete JSON payload without EOF`, async (t) => {
    const h = isolated(t);
    let controller!: ReadableStreamDefaultController<Uint8Array>;
    let cancels = 0;
    const stream = new ReadableStream<Uint8Array>({ start(value) { controller = value; }, cancel() { cancels++; } }, { highWaterMark: 0 });
    let response: Response | undefined;
    const pending = post(request(path, stream)).then(value => { response = value; return value; });
    t.mock.timers.tick(DEADLINE - 1);
    controller.enqueue(encode(payload));
    await flush();
    assert.equal(Boolean(response), false);
    assertNotSent(h);
    t.mock.timers.tick(1);
    await flush();
    assert.ok(response);
    assert.equal(response.status, 408);
    await pending;
    assert.equal(cancels, 1);
    assert.equal(stream.locked, false);
    assertNotSent(h);
    assertTimerCleared(h);
  });

  test(`${name} completion just before deadline sends once and clears the read timer`, async (t) => {
    const h = isolated(t);
    let controller!: ReadableStreamDefaultController<Uint8Array>;
    let cancels = 0;
    const stream = new ReadableStream<Uint8Array>({ start(value) { controller = value; }, cancel() { cancels++; } }, { highWaterMark: 0 });
    const pending = post(request(path, stream));
    t.mock.timers.tick(DEADLINE - 1);
    controller.enqueue(encode(payload));
    controller.close();
    const response = await pending;
    assert.equal(response.status, 200);
    assert.equal(h.network.mock.callCount() + h.provider.mock.callCount(), 1);
    assert.equal(stream.locked, false);
    assertTimerCleared(h, name === "feedback" ? 2 : 1);
    t.mock.timers.tick(DEADLINE * 2);
    await flush();
    assert.equal(cancels, 0);
    assert.equal(h.network.mock.callCount() + h.provider.mock.callCount(), 1);
  });

  test(`${name} deadline wins when body completion is queued but not yet consumed`, async (t) => {
    const h = isolated(t);
    let controller!: ReadableStreamDefaultController<Uint8Array>;
    const stream = new ReadableStream<Uint8Array>({ start(value) { controller = value; } }, { highWaterMark: 0 });
    const pending = post(request(path, stream));
    controller.enqueue(encode(payload));
    controller.close();
    // Run expiry before the continuation of the resolved read gets CPU time.
    t.mock.timers.tick(DEADLINE);
    const response = await pending;
    assert.equal(response.status, 408);
    assert.equal(stream.locked, false);
    assertNotSent(h);
    assertTimerCleared(h);
  });

  test(`${name} body read errors clear the timer and never expose stream details`, async (t) => {
    const h = isolated(t);
    let controller!: ReadableStreamDefaultController<Uint8Array>;
    let cancels = 0;
    const stream = new ReadableStream<Uint8Array>({ start(value) { controller = value; }, cancel() { cancels++; } }, { highWaterMark: 0 });
    const pending = post(request(path, stream));
    controller.error(new Error("PRIVATE_READ_SENTINEL"));
    const response = await pending;
    assert.equal(response.status, 400);
    assert.doesNotMatch(JSON.stringify(await response.json()), /PRIVATE_READ_SENTINEL/);
    assert.equal(stream.locked, false);
    assertTimerCleared(h);
    t.mock.timers.tick(DEADLINE * 2);
    await flush();
    assert.equal(cancels, 0);
    assertNotSent(h);
  });

  test(`${name} synchronous cancellation failure cannot hold the timeout or leak a read rejection`, async (t) => {
    const h = isolated(t);
    let controller!: ReadableStreamDefaultController<Uint8Array>;
    const stream = new ReadableStream<Uint8Array>({ start(value) { controller = value; } }, { highWaterMark: 0 });
    const cancel = t.mock.method(ReadableStreamDefaultReader.prototype, "cancel", () => { throw new Error("PRIVATE_CANCEL_SENTINEL"); });
    const pending = post(request(path, stream));
    t.mock.timers.tick(DEADLINE);
    const response = await pending;
    assert.equal(response.status, 408);
    assert.equal(stream.locked, false);
    assert.equal(cancel.mock.callCount(), 1);
    // releaseLock rejects the outstanding read, which must remain observed.
    await flush();
    controller.close();
    assertNotSent(h);
    assertTimerCleared(h);
  });

  test(`${name} read deadline is cleared before waiting for the provider`, async (t) => {
    const h = isolated(t);
    let finish!: () => void;
    const delivery = new Promise<void>(resolve => { finish = resolve; });
    h.network.mock.mockImplementation(async () => { await delivery; return Response.json({ id }); });
    h.provider.mock.mockImplementation(async () => { await delivery; return { data: { id }, error: null }; });
    const stream = new ReadableStream<Uint8Array>({ start(controller) { controller.enqueue(encode(payload)); controller.close(); } });
    let response: Response | undefined;
    const pending = post(request(path, stream)).then(value => { response = value; return value; });
    await flush();
    assert.equal(h.network.mock.callCount() + h.provider.mock.callCount(), 1);
    assert.equal(stream.locked, false);
    assertTimerCleared(h, name === "feedback" ? 2 : 1, 1);
    t.mock.timers.tick(DEADLINE - 1);
    await flush();
    assert.equal(Boolean(response), false);
    finish();
    assert.equal((await pending).status, 200);
    assert.equal(h.network.mock.callCount() + h.provider.mock.callCount(), 1);
  });

  test(`${name} an oversized body still wins before deadline and cleans up its timer`, async (t) => {
    const h = isolated(t);
    let cancels = 0;
    const stream = new ReadableStream<Uint8Array>({
      start(controller) { controller.enqueue(new Uint8Array(64 * 1024 + 1)); },
      cancel() { cancels++; return Promise.reject(new Error("PRIVATE_CANCEL_SENTINEL")); },
    }, { highWaterMark: 0 });
    const response = await post(request(path, stream));
    assert.equal(response.status, 413);
    assert.equal(stream.locked, false);
    assert.equal(cancels, 1);
    assertTimerCleared(h);
    t.mock.timers.tick(DEADLINE * 2);
    await flush();
    assert.equal(cancels, 1);
    assertNotSent(h);
  });
}

test("feedback client recognizes a route body timeout as rejected without retry", async (t) => {
  const h = isolated(t);
  let calls = 0;
  const stream = new ReadableStream<Uint8Array>({ pull() { return new Promise<void>(() => {}); } }, { highWaterMark: 0 });
  const pending = submitPrivateFeedback(feedbackPayload, async () => {
    calls++;
    return feedback(request("feedback", stream));
  });
  const rejected = assert.rejects(pending, (error: unknown) => error instanceof FeedbackSubmissionError && error.outcome === "rejected" && /timed out/i.test(error.message));
  t.mock.timers.tick(DEADLINE);
  await rejected;
  t.mock.timers.tick(30_000);
  await flush();
  assert.equal(calls, 1);
  assertNotSent(h);
});
