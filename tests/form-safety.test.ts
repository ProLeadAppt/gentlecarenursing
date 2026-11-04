import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ContactForm } from "../src/components/forms/ContactForm";
import { SimpleContactForm } from "../src/components/forms/SimpleContactForm";
import { ReferralForm } from "../src/components/forms/ReferralForm";
import { ReferralConcierge } from "../src/components/forms/ReferralConcierge";

for (const Form of [ContactForm, SimpleContactForm, ReferralForm, ReferralConcierge]) {
  test(`${Form.name} renders native validation, explicit masking and nearby enquiry guidance`, () => {
    const html = renderToStaticMarkup(createElement(Form));
    assert.match(html, /<form[^>]*data-clarity-mask="true"/);
    assert.doesNotMatch(html, /novalidate/i);
    assert.match(html, /href="\/privacy"/);
    assert.match(html, /do not include medical records/i);
    assert.match(html, /href="tel:000"/);
    assert.match(html, /required=""/);
    assert.match(html, /maxLength="120"/i);
  });

  test(`${Form.name} locks duplicate submissions and releases the lock after resolution`, () => {
    const source = readFileSync(`src/components/forms/${Form.name}.tsx`, "utf8");
    assert.match(source, /submittingRef\.current \|\|/);
    assert.match(source, /submittingRef\.current = true/);
    assert.match(source, /finally\s*\{\s*submittingRef\.current = false/);
    assert.doesNotMatch(source, /console\.(?:log|error|info)\(/);
    assert.doesNotMatch(source, /within minutes|within 24 hours/);
    assert.match(source, /accepted for delivery/);
  });
}

test("referral form asks for initials, keeps them optional, and avoids detailed medical notes", () => {
  const html = renderToStaticMarkup(createElement(ReferralForm));
  assert.match(html, /initials \(optional\)/);
  const field = html.match(/<input[^>]*name="clientName"[^>]*>/)?.[0];
  assert.ok(field);
  assert.doesNotMatch(field, /required/);
  assert.match(html, /permission or authority/);
  assert.match(html, /leave out detailed medical information/);
});

test("concierge uses submit to validate each step and prevents an early Enter from sending", () => {
  const source = readFileSync("src/components/forms/ReferralConcierge.tsx", "utf8");
  assert.match(source, /if \(step < 4\) \{\s*nextStep\(\);\s*return;/);
  assert.match(source, /formRef\.current\?\.reportValidity\(\)/);
  assert.match(source, /prev === step \? Math\.min/);
  assert.doesNotMatch(source, /alert\(/);
  assert.match(source, /role="alert"/);
  assert.match(source, /id="ref-client-initials"/);
});
