import test, { type TestContext } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { POST } from "../src/app/api/submit/route";
import { submitWebsiteForm } from "../src/lib/form-client";

const submissionId = "8dd9d328-72ca-4a29-8022-735693bd84f7";
const payload = {
  type: "referral" as const,
  referrerName: "Synthetic Referrer",
  referrerEmail: "synthetic@example.com",
  referrerPhone: "0400000000",
  referrerRole: "self",
  serviceType: "dva",
  notes: "Synthetic private details",
};

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((res) => { resolve = res; });
  return { promise, resolve };
}

function inProcessRoute(t: TestContext, provider: () => Promise<Response>) {
  const previousKey = process.env.RESEND_API_KEY;
  const previousSender = process.env.REVIEW_FEEDBACK_FROM_EMAIL;
  process.env.RESEND_API_KEY = "dummy-local-integration-test-key";
  process.env.REVIEW_FEEDBACK_FROM_EMAIL = "noreply@gentlecarenursing.com.au";
  t.after(() => {
    if (previousKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = previousKey;
    if (previousSender === undefined) delete process.env.REVIEW_FEEDBACK_FROM_EMAIL;
    else process.env.REVIEW_FEEDBACK_FROM_EMAIL = previousSender;
  });

  const emails: Record<string, unknown>[] = [];
  const logs: unknown[][] = [];
  const routes: Promise<Response>[] = [];
  const signals: Array<AbortSignal | null | undefined> = [];
  t.mock.method(console, "info", (...args: unknown[]) => { logs.push(args); });
  t.mock.method(console, "error", (...args: unknown[]) => { logs.push(args); });
  t.mock.method(globalThis, "fetch", async (url: string | URL | Request, init?: RequestInit) => {
    assert.equal(url, "https://api.resend.com/emails");
    assert.equal(init?.method, "POST");
    emails.push(JSON.parse(String(init?.body)));
    return provider();
  });

  // Calls the real route function in this process. No HTTP request is sent.
  const bridge: typeof fetch = async (url, init) => {
    assert.equal(url, "/api/submit");
    const headers = new Headers(init?.headers);
    headers.set("origin", "https://gentlecarenursing.com.au");
    signals.push(init?.signal);
    const route = POST(new NextRequest("https://gentlecarenursing.com.au/api/submit", {
      method: init?.method,
      headers,
      body: init?.body,
      signal: init?.signal ?? undefined,
    }));
    routes.push(route);
    return route;
  };
  return { bridge, emails, logs, routes, signals };
}

test("combined client, route and delivery preserve selected labels and a valid acceptance receipt", async (t) => {
  const fixture = inProcessRoute(t, async () => Response.json({ id: submissionId }));
  assert.deepEqual(await submitWebsiteForm(payload, fixture.bridge), { submissionId });
  assert.equal(fixture.emails.length, 1);
  const email = fixture.emails[0];
  assert.deepEqual(email.to, ["info@gentlecarenursing.com.au"]);
  assert.equal(email.reply_to, payload.referrerEmail);
  assert.equal(email.subject, "Website referral — Gentle Care Nursing");
  assert.match(String(email.text), /referrerRole: Self-referral/);
  assert.match(String(email.text), /serviceType: DVA \/ Community Nursing/);
  assert.equal(email.html, undefined);
  assert.ok(fixture.signals[0]);
  assert.equal(fixture.signals[0].aborted, false);
  for (const privateValue of [payload.referrerName, payload.referrerEmail, payload.notes]) {
    assert.equal(JSON.stringify(fixture.logs).includes(privateValue), false);
  }
});

test("provider rejection stays a failed confirmation across the combined client and route without retry", async (t) => {
  const fixture = inProcessRoute(t, async () => Response.json({ error: "Synthetic rejection" }, { status: 429 }));
  await assert.rejects(submitWebsiteForm(payload, fixture.bridge), /Submission failed/);
  assert.equal(fixture.emails.length, 1);
  assert.equal(fixture.routes.length, 1);
  assert.equal((await fixture.routes[0]).status, 502);
});

test("late server acceptance after a client timeout remains ambiguous and never causes a retry", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  const started = deferred<void>();
  const delivery = deferred<Response>();
  const fixture = inProcessRoute(t, () => {
    started.resolve(undefined);
    return delivery.promise;
  });
  const result = submitWebsiteForm(payload, fixture.bridge);
  const outcome = result.then(() => "accepted", () => "timed-out");
  const rejection = assert.rejects(result, /Submission confirmation timed out/);
  await started.promise;
  t.mock.timers.tick(30_000);
  await rejection;
  assert.ok(fixture.signals[0]);
  assert.equal(fixture.signals[0].aborted, true);

  // An intentionally controlled provider promise models a late outcome.
  // This does not emulate real network timing or cancel server-side work.
  delivery.resolve(Response.json({ id: submissionId }));
  const routeResult = await fixture.routes[0];
  assert.equal(routeResult.status, 200);
  assert.deepEqual(await routeResult.json(), { success: true, submissionId });
  assert.equal(await outcome, "timed-out");
  assert.equal(fixture.emails.length, 1);
  assert.equal(fixture.routes.length, 1);
});
