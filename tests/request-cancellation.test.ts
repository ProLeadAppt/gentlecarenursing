import test, { type TestContext } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { Resend } from "resend";
import { POST as submit } from "../src/app/api/submit/route";
import { POST as feedback } from "../src/app/api/feedback/route";

function isolated(t: TestContext) {
  const previous = process.env.RESEND_API_KEY;
  process.env.RESEND_API_KEY = "local_synthetic_test_key_not_real";
  t.after(() => {
    if (previous === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = previous;
  });
  const network = t.mock.method(globalThis, "fetch", async () => { throw new Error("Network forbidden in cancellation tests"); });
  const provider = t.mock.method(Resend.prototype, "post", async () => { throw new Error("Delivery forbidden in cancellation tests"); });
  const logs = t.mock.method(console, "error", () => {});
  return { network, provider, logs };
}

const handlers = [{ name: "enquiry", path: "submit", post: submit }, { name: "feedback", path: "feedback", post: feedback }];
for (const { name, path, post } of handlers) {
  for (const laterFailure of [false, true]) {
    test(`${name} rejects oversized data while cancellation is pending${laterFailure ? ", including a later cancellation failure" : ""}`, async (t) => {
      const h = isolated(t);
      let cancelStarted!: () => void;
      const started = new Promise<void>(resolve => { cancelStarted = resolve; });
      let finishCancel!: () => void, failCancel!: (error: Error) => void;
      const cancellation = new Promise<void>((resolve, reject) => { finishCancel = resolve; failCancel = reject; });
      let cancels = 0, pulls = 0;
      const stream = new ReadableStream<Uint8Array>({
        pull(controller) { pulls++; controller.enqueue(new Uint8Array(64 * 1024 + 1)); },
        cancel() { cancels++; cancelStarted(); return cancellation; },
      }, { highWaterMark: 0 });
      const request = new NextRequest(`https://gentlecarenursing.com.au/api/${path}`, {
        method: "POST", headers: { "content-type": "application/json" }, body: stream, duplex: "half",
      } as ConstructorParameters<typeof NextRequest>[1]);
      let response: Response | undefined;
      const pending = post(request).then(value => { response = value; return value; });
      await started;
      try {
        // Drain queued work without resolving cancellation or waiting on a
        // real-time request deadline. The size decision is already final.
        await new Promise(resolve => setImmediate(resolve));
        assert.ok(response, "The size response must not await transport cancellation");
        assert.equal(response.status, 413);
        assert.equal((await response.json()).success, false);
        assert.equal(stream.locked, false);
        assert.equal(cancels, 1);
        assert.equal(pulls, 1);
        assert.equal(h.network.mock.callCount(), 0);
        assert.equal(h.provider.mock.callCount(), 0);
      } finally {
        if (laterFailure) failCancel(new Error("PRIVATE_LATE_CANCEL_SENTINEL"));
        else finishCancel();
        await pending;
        await new Promise(resolve => setImmediate(resolve));
      }
      assert.equal(h.logs.mock.callCount(), 0);
    });
  }
}
