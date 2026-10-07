import test from "node:test";
import assert from "node:assert/strict";
import {
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
