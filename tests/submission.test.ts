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

const referralPayload: FormPayload = {
  type: "referral",
  referrerName: "Sarah Jennings",
  referrerEmail: "sarah@example.com",
  referrerPhone: "0491 570 006",
  referrerRole: "SC",
  organization: "Example Care",
  clientName: "A.B.",
  serviceType: "Nursing",
  notes: "Requires an initial clinical assessment.",
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

test("validateFormPayload accepts the primary referral form's minimal required shape", () => {
  assert.equal(
    validateFormPayload({
      type: "referral",
      referrerName: "Sarah Jennings",
      referrerPhone: "0491 570 006",
    }),
    true
  );
});

test("validateFormPayload rejects referrals without the primary form's required fields", () => {
  assert.equal(
    validateFormPayload({
      type: "referral",
      referrerName: "",
      referrerPhone: "",
    }),
    false
  );
});

test("validateFormPayload rejects referral picklist values outside the website contract", () => {
  assert.equal(validateFormPayload({ ...referralPayload, referrerRole: "Unknown" }), false);
  assert.equal(validateFormPayload({ ...referralPayload, serviceType: "Unknown" }), false);
  assert.equal(validateFormPayload({ ...referralPayload, referrerEmail: "not-an-email" }), false);
});

test("deliverSubmission normalizes referral contact fields and picklist labels for GoHighLevel", async () => {
  const requests: Array<Record<string, unknown>> = [];
  await deliverSubmission(referralPayload, {
    webhookUrl: "https://services.leadconnectorhq.com/hooks/example",
    submissionId: "d836e511-cd92-4872-bbd1-18ed349e30af",
    fetcher: async (_url, init) => {
      requests.push(JSON.parse(String(init?.body)) as Record<string, unknown>);
      return new Response(null, { status: 204 });
    },
  });

  assert.deepEqual(requests, [
    {
      ...referralPayload,
      name: "Sarah Jennings",
      email: "sarah@example.com",
      phone: "0491 570 006",
      referrerRole: "Support Coordinator",
      serviceType: "General Nursing",
      websiteSubmissionId: "d836e511-cd92-4872-bbd1-18ed349e30af",
      source: "website",
    },
  ]);
});

test("deliverSubmission supports the primary referral form's minimal payload", async () => {
  let body: Record<string, unknown> | undefined;
  await deliverSubmission(
    {
      type: "referral",
      referrerName: "Sarah Jennings",
      referrerPhone: "0491 570 006",
    },
    {
      webhookUrl: "https://services.leadconnectorhq.com/hooks/example",
      submissionId: "minimal-referral-1",
      fetcher: async (_url, init) => {
        body = JSON.parse(String(init?.body)) as Record<string, unknown>;
        return new Response(null, { status: 204 });
      },
    }
  );

  assert.deepEqual(body, {
    type: "referral",
    referrerName: "Sarah Jennings",
    referrerPhone: "0491 570 006",
    name: "Sarah Jennings",
    phone: "0491 570 006",
    websiteSubmissionId: "minimal-referral-1",
    source: "website",
  });
});

test("deliverSubmission maps every referral dropdown value to the exact GoHighLevel picklist label", async () => {
  const roleCases = {
    SC: "Support Coordinator",
    DP: "Discharge Planner",
    GP: "General Practitioner",
    OT: "Occupational Therapist",
    Family: "Family Member",
    Other: "Other Professional",
    family: "Family Member",
    ndis: "Support Coordinator",
    hospital: "Discharge Planner",
    healthcare: "Other Professional",
    self: "Other Professional",
    other: "Other Professional",
  } as const;
  const serviceCases = {
    Nursing: "General Nursing",
    Complex: "Complex Clinical Care",
    "Post-Op": "Post-Op Recovery",
    NDIS: "NDIS Support",
    AgedCare: "Aged Care Support",
    Other: "Other Inquiry",
    ndis: "NDIS Support",
    dva: "General Nursing",
    "aged-care": "Aged Care Support",
    private: "Other Inquiry",
    unsure: "Other Inquiry",
  } as const;

  for (const [referrerRole, expected] of Object.entries(roleCases)) {
    let body: Record<string, unknown> | undefined;
    await deliverSubmission({ ...referralPayload, referrerRole }, {
      webhookUrl: "https://services.leadconnectorhq.com/hooks/example",
      submissionId: `role-${referrerRole}`,
      fetcher: async (_url, init) => {
        body = JSON.parse(String(init?.body)) as Record<string, unknown>;
        return new Response(null, { status: 204 });
      },
    });
    assert.equal(body?.referrerRole, expected);
  }

  for (const [serviceType, expected] of Object.entries(serviceCases)) {
    let body: Record<string, unknown> | undefined;
    await deliverSubmission({ ...referralPayload, serviceType }, {
      webhookUrl: "https://services.leadconnectorhq.com/hooks/example",
      submissionId: `service-${serviceType}`,
      fetcher: async (_url, init) => {
        body = JSON.parse(String(init?.body)) as Record<string, unknown>;
        return new Response(null, { status: 204 });
      },
    });
    assert.equal(body?.serviceType, expected);
  }
});

test("deliverSubmission rejects unsupported referral codes before calling GoHighLevel", async () => {
  let calls = 0;
  const options = {
    webhookUrl: "https://services.leadconnectorhq.com/hooks/example",
    submissionId: "invalid-referral-code",
    fetcher: async () => {
      calls += 1;
      return new Response(null, { status: 204 });
    },
  };

  await assert.rejects(
    deliverSubmission({ ...referralPayload, referrerRole: "Unknown" }, options),
    /invalid form payload/i
  );
  await assert.rejects(
    deliverSubmission({ ...referralPayload, serviceType: "Unknown" }, options),
    /invalid form payload/i
  );
  assert.equal(calls, 0);
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
