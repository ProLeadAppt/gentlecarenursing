import test from "node:test";
import assert from "node:assert/strict";
import {
  buildAnalyticsPayload,
  dispatchAnalyticsEvent,
  getLinkAnalyticsEvent,
  type AnalyticsEventName,
} from "../src/lib/analytics";

test("buildAnalyticsPayload keeps only approved non-sensitive fields", () => {
  const payload = buildAnalyticsPayload(
    {
      form_type: "contact",
      service_type: "Clinical Nursing",
      cta_location: "homepage",
      submission_id: "8dd9d328-72ca-4a29-8022-735693bd84f7",
      page_path: "/ndis",
      email: "private@example.com",
      phone: "0400000000",
      name: "Private Person",
      message: "Sensitive health information",
      notes: "Sensitive referral information",
      client_name: "Participant Name",
    },
    "/fallback"
  );

  assert.deepEqual(payload, {
    form_type: "contact",
    service_type: "Clinical Nursing",
    cta_location: "homepage",
    submission_id: "8dd9d328-72ca-4a29-8022-735693bd84f7",
    page_path: "/ndis",
  });
});

test("buildAnalyticsPayload normalises invalid values and falls back to the current page", () => {
  const payload = buildAnalyticsPayload(
    {
      form_type: "contact",
      service_type: "x".repeat(200),
      cta_location: "",
      submission_id: "not a uuid",
      page_path: "https://malicious.example/path",
    },
    "/contact?source=header"
  );

  assert.deepEqual(payload, {
    form_type: "contact",
    page_path: "/contact",
  });
});

test("dispatchAnalyticsEvent sends one event through gtag when available", () => {
  const calls: unknown[][] = [];
  const runtime = {
    pathname: "/dva",
    gtag: (...args: unknown[]) => calls.push(args),
    dataLayer: [] as unknown[],
  };

  dispatchAnalyticsEvent(
    "generate_lead" satisfies AnalyticsEventName,
    { form_type: "contact", service_type: "DVA" },
    runtime
  );

  assert.deepEqual(calls, [
    [
      "event",
      "generate_lead",
      { form_type: "contact", service_type: "DVA", page_path: "/dva" },
    ],
  ]);
  assert.equal(runtime.dataLayer.length, 0);
});

test("dispatchAnalyticsEvent queues one event when gtag is not ready", () => {
  const runtime = {
    pathname: "/referral",
    dataLayer: [] as unknown[],
  };

  dispatchAnalyticsEvent(
    "referral_submit",
    { form_type: "referral", service_type: "ndis" },
    runtime
  );

  assert.deepEqual(runtime.dataLayer, [
    [
      "event",
      "referral_submit",
      { form_type: "referral", service_type: "ndis", page_path: "/referral" },
    ],
  ]);
});

test("dispatchAnalyticsEvent creates a data layer when gtag is unavailable", () => {
  const runtime: {
    pathname: string;
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  } = { pathname: "/contact" };

  dispatchAnalyticsEvent("phone_click", {}, runtime);

  assert.deepEqual(runtime.dataLayer, [
    ["event", "phone_click", { page_path: "/contact" }],
  ]);
});

test("getLinkAnalyticsEvent classifies phone, email and explicit care CTAs", () => {
  assert.deepEqual(getLinkAnalyticsEvent("tel:+611300004267", undefined), {
    eventName: "phone_click",
    parameters: {},
  });
  assert.deepEqual(getLinkAnalyticsEvent("mailto:info@example.com", undefined), {
    eventName: "email_click",
    parameters: {},
  });
  assert.deepEqual(getLinkAnalyticsEvent("/referral", "make_referral"), {
    eventName: "make_referral_click",
    parameters: {},
  });
  assert.deepEqual(getLinkAnalyticsEvent("/contact", "request_care"), {
    eventName: "request_care_click",
    parameters: {},
  });
  assert.equal(getLinkAnalyticsEvent("/services", undefined), null);
});
