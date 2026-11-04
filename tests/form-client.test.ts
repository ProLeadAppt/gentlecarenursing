import test from "node:test";
import assert from "node:assert/strict";
import { submitWebsiteForm } from "../src/lib/form-client";

test("submitWebsiteForm returns the confirmed reconciliation ID", async () => {
  const result = await submitWebsiteForm(
    {
      type: "contact",
      name: "Test Person",
      email: "test@example.com",
      message: "Please call me.",
    },
    async () =>
      Response.json({
        success: true,
        submissionId: "8dd9d328-72ca-4a29-8022-735693bd84f7",
      })
  );

  assert.deepEqual(result, {
    submissionId: "8dd9d328-72ca-4a29-8022-735693bd84f7",
  });
});

test("submitWebsiteForm rejects an HTTP failure", async () => {
  await assert.rejects(
    submitWebsiteForm(
      {
        type: "contact",
        name: "Test Person",
        email: "test@example.com",
        message: "Please call me.",
      },
      async () => Response.json({ success: false }, { status: 502 })
    ),
    /submission failed/i
  );
});

test("submitWebsiteForm rejects success responses without a valid reconciliation ID", async () => {
  await assert.rejects(
    submitWebsiteForm(
      {
        type: "referral",
        referrerName: "Test Referrer",
        referrerPhone: "Synthetic test value",
      },
      async () => Response.json({ success: true })
    ),
    /confirmation/i
  );
});

test("both form paths share strict confirmation validation", async () => {
  const { isSubmissionConfirmation } = await import("../src/lib/form-client");
  for (const value of [null, undefined, true, "success", {}, { success: true, submissionId: "" }, { success: true, submissionId: "not-a-uuid" }, { success: false, submissionId: "8dd9d328-72ca-4a29-8022-735693bd84f7" }]) {
    assert.equal(isSubmissionConfirmation(value), false);
  }
  assert.equal(isSubmissionConfirmation({ success: true, submissionId: "8dd9d328-72ca-4a29-8022-735693bd84f7" }), true);
});
