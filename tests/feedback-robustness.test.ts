import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { NextRequest } from "next/server";
import { Resend } from "resend";
import { POST } from "../src/app/api/feedback/route";
import { SITE } from "../src/lib/constants";

function request(body: unknown) {
  return new NextRequest("http://localhost/api/feedback", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

test("feedback rejects malformed shapes and field types before delivery", async (t) => {
  const previousKey = process.env.RESEND_API_KEY;
  delete process.env.RESEND_API_KEY;
  const delivery = t.mock.method(Resend.prototype, "post", async () => {
    throw new Error("Delivery must not be reached");
  });
  try {
    const malformed: unknown[] = [null, [], "text", 5, true, {}];
    for (const field of ["name", "contact", "service", "improvements"]) {
      for (const value of [null, 42, true, [], {}]) {
        malformed.push({ rating: 5, [field]: value });
      }
    }
    for (const value of [null, "true", 1, [], {}]) {
      malformed.push({ rating: 5, allowFollowup: value });
    }
    for (const body of malformed) {
      const response = await POST(request(body));
      assert.equal(response.status, 400, JSON.stringify(body));
      assert.equal((await response.json()).success, false);
    }
    const invalidJson = await POST(new NextRequest("http://localhost/api/feedback", {
      method: "POST", body: "{",
    }));
    assert.equal(invalidJson.status, 400);
    assert.equal(delivery.mock.callCount(), 0);
  } finally {
    if (previousKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = previousKey;
  }
});

test("stubbed delivery escapes service HTML and never logs or reflects provider details", async (t) => {
  const previousKey = process.env.RESEND_API_KEY;
  process.env.RESEND_API_KEY = "re_local_test_not_a_real_key";
  const sentinel = "PRIVATE_PROVIDER_SENTINEL";
  let mode: "success" | "provider-error" | "throw" = "success";
  const sent: Array<Record<string, unknown>> = [];
  // Stub before calling the route: no provider request or email can leave this test.
  t.mock.method(Resend.prototype, "post", async (_path: string, body: Record<string, unknown>) => {
    sent.push(body);
    if (mode === "throw") throw new Error(sentinel);
    if (mode === "provider-error") return { data: null, error: { message: sentinel } };
    return { data: { id: "d836e511-cd92-4872-bbd1-18ed349e30af" }, error: null };
  });
  const logs = t.mock.method(console, "error", () => {});
  t.mock.method(globalThis, "fetch", async () => {
    throw new Error("Network is forbidden in feedback tests");
  });
  try {
    for (const service of ['<img src=x onerror="alert(1)">', "__proto__", "clinical-nursing"]) {
      const response = await POST(request({ rating: 5, service, name: "<b>Private</b>" }));
      assert.equal(response.status, 200);
      assert.deepEqual(await response.json(), { success: true });
    }
    assert.match(String(sent[0].html), /&lt;img src=x onerror=&quot;alert\(1\)&quot;&gt;/);
    assert.doesNotMatch(String(sent[0].html), /<img src=x/);
    assert.match(String(sent[0].html), /&lt;b&gt;Private&lt;\/b&gt;/);
    assert.match(String(sent[1].html), /__proto__/);
    assert.match(String(sent[2].html), /Clinical Nursing/);
    assert.deepEqual(sent[0].to, [SITE.email]);
    for (const failure of ["provider-error", "throw"] as const) {
      mode = failure;
      const response = await POST(request({ rating: 1 }));
      assert.equal(response.status, failure === "provider-error" ? 502 : 500);
      const json = await response.json();
      assert.equal(json.success, false);
      assert.ok(json.error.includes(SITE.email));
      assert.ok(!JSON.stringify(json).includes(sentinel));
    }
    assert.ok(!JSON.stringify(logs.mock.calls).includes(sentinel));
  } finally {
    if (previousKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = previousKey;
  }
});

test("successful private feedback explicitly moves focus to its confirmation", () => {
  const source = readFileSync("src/components/review/ReviewFunnel.tsx", "utf8");
  assert.match(source, /if \(status === "sent"\) successHeadingRef\.current\?\.focus\(\)/);
  assert.match(source, /<h3 ref=\{successHeadingRef\} tabIndex=\{-1\}/);
});


test("private rating has roving focus and standard radio keyboard controls", () => {
  const source = readFileSync("src/components/review/StarRating.tsx", "utf8");
  assert.ok(source.includes("tabIndex={(selected ?? 1) === value ? 0 : -1}"));
  for (const key of ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"]) {
    assert.ok(source.includes(`case "${key}"`), `${key} must be handled`);
  }
  assert.ok(source.includes("event.preventDefault()"));
  assert.ok(source.includes("handleStarClick(next)"));
  assert.ok(source.includes("starRefs.current[next - 1]?.focus()"));
  assert.ok(source.includes("onClick={() => handleStarClick(value)}"));
});


test("feedback fails closed without a valid provider acceptance receipt", async (t) => {
  const previousKey = process.env.RESEND_API_KEY;
  process.env.RESEND_API_KEY = "dummy-local-only";
  let data: unknown = null;
  t.mock.method(Resend.prototype, "post", async () => ({ data, error: null }));
  t.mock.method(globalThis, "fetch", async () => { throw new Error("Network forbidden"); });
  t.mock.method(console, "error", () => {});
  try {
    for (data of [null, {}, { id: null }, { id: "" }, { id: "not-a-receipt" }]) {
      const response = await POST(request({ rating: 5 }));
      assert.equal(response.status, 502);
      assert.equal((await response.json()).success, false);
    }
    data = { id: "d836e511-cd92-4872-bbd1-18ed349e30af" };
    const response = await POST(request({ rating: 5 }));
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { success: true });
  } finally {
    if (previousKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = previousKey;
  }
});
