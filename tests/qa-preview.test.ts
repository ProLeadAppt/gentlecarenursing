import test from "node:test";
import assert from "node:assert/strict";
import { setQaCase, qaTransport } from "../src/lib/qa-transport";
import { submitWebsiteForm } from "../src/lib/form-client";
import { POST as submit } from "../src/app/api/submit/route";
import { POST as feedback } from "../src/app/api/feedback/route";

test("QA default transport returns all scenarios without global network calls", async () => {
  const oldFetch = globalThis.fetch;
  globalThis.fetch = async () => { throw new Error("Unexpected real fetch"); };
  const payload = { type: "referral" as const, referrerName: "QA Person", referrerPhone: "0400000000" };
  try {
    setQaCase("success");
    assert.deepEqual(await submitWebsiteForm(payload), { submissionId: "00000000-0000-4000-8000-000000000001" });
    setQaCase("rejected");
    await assert.rejects(submitWebsiteForm(payload), /Submission failed/);
    setQaCase("uncertain");
    await assert.rejects(submitWebsiteForm(payload), /QA simulated lost response/);
    setQaCase("rejected");
    const pending = qaTransport("/api/submit");
    setQaCase("success");
    assert.equal((await pending).status, 502);
  } finally { globalThis.fetch = oldFetch; setQaCase("success"); }
});

test("QA API handlers return 503 without reading the supplied request", async () => {
  const request = new Proxy({} as Request, { get() { throw new Error("Request was read"); } });
  assert.equal((await submit(request)).status, 503);
  assert.equal((await feedback(request)).status, 503);
});
