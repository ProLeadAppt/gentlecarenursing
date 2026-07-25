import test from "node:test";
import assert from "node:assert/strict";
import {
  deliverSubmission,
  validateFormPayload,
  type FormPayload,
} from "../src/lib/submission";

const contactPayload: FormPayload = {
  type: "contact",
  name: "Test Person",
  email: "test@example.com",
  phone: "0400000000",
  serviceType: "Clinical Nursing",
  message: "Please call me.",
};

test("validateFormPayload accepts the homepage contact form shape", () => {
  assert.equal(validateFormPayload(contactPayload), true);
});

test("validateFormPayload rejects missing contact details", () => {
  assert.equal(
    validateFormPayload({ type: "contact", name: "", email: "bad", message: "" }),
    false
  );
});

test("deliverSubmission adds a reconciliation ID and returns it only after webhook success", async () => {
  const requests: Array<{ url: string; body: Record<string, unknown> }> = [];
  const result = await deliverSubmission(contactPayload, {
    webhookUrl: "https://services.leadconnectorhq.com/hooks/example",
    submissionId: "8dd9d328-72ca-4a29-8022-735693bd84f7",
    fetcher: async (url, init) => {
      requests.push({
        url: String(url),
        body: JSON.parse(String(init?.body)) as Record<string, unknown>,
      });
      return new Response(null, { status: 204 });
    },
  });

  assert.deepEqual(result, {
    success: true,
    submissionId: "8dd9d328-72ca-4a29-8022-735693bd84f7",
  });
  assert.deepEqual(requests, [
    {
      url: "https://services.leadconnectorhq.com/hooks/example",
      body: {
        ...contactPayload,
        websiteSubmissionId: "8dd9d328-72ca-4a29-8022-735693bd84f7",
        source: "website",
      },
    },
  ]);
});

test("deliverSubmission fails closed when the webhook is missing", async () => {
  await assert.rejects(
    deliverSubmission(contactPayload, {
      webhookUrl: "",
      submissionId: "8dd9d328-72ca-4a29-8022-735693bd84f7",
      fetcher: async () => new Response(null, { status: 204 }),
    }),
    /not configured/i
  );
});

test("deliverSubmission fails closed when GoHighLevel rejects the lead", async () => {
  await assert.rejects(
    deliverSubmission(contactPayload, {
      webhookUrl: "https://services.leadconnectorhq.com/hooks/example",
      submissionId: "8dd9d328-72ca-4a29-8022-735693bd84f7",
      fetcher: async () => new Response(null, { status: 503 }),
    }),
    /status 503/i
  );
});
