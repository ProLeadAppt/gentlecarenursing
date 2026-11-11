import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { submitWebsiteForm } from "../src/lib/form-client";

// Source contracts protect the React wiring. These are not browser, device or
// screen-reader tests; transport cases below use an injected synthetic fetcher.
for (const component of ["ContactForm", "SimpleContactForm"]) {
  const source = readFileSync(`src/components/forms/${component}.tsx`, "utf8");

  test(`${component} focuses persistent, named success and error regions`, () => {
    assert.match(source, /if \((?:active && )?status !== "idle"\) \{\s*outcomeRef.current\?\.focus\(\{ preventScroll: true \}\)/);
    assert.match(source, /ref=\{outcomeRef\}\s+data-form-outcome\s+tabIndex=\{-1\}\s+role="status"\s+aria-atomic="true"/);
    assert.match(source, /ref=\{outcomeRef\}\s+data-form-outcome\s+tabIndex=\{-1\}\s+role="alert"\s+aria-atomic="true"/);
    const labelledBy = source.match(/aria-labelledby=\{`([^`]+)`\}/)?.[1];
    assert.ok(labelledBy, "success region must have a unique accessible label");
    assert.ok(source.includes(`id={\`${labelledBy}\`}`));
    assert.doesNotMatch(source, /setTimeout|setInterval|window.alert|autoFocus/);
  });

  test(`${component} describes acceptance without claiming receipt, a booking or a reply`, () => {
    assert.match(source, /Enquiry accepted for delivery/);
    assert.match(source, /Your enquiry email has been accepted for delivery/);
    assert.match(source, /does not confirm inbox receipt, a booking or service availability/);
    assert.match(source, /For an urgent enquiry, call 1300 004 267/);
    assert.match(source, /contact us before submitting the same enquiry again/);
    assert.doesNotMatch(source, /we&apos;ve got your message|Our team will be in touch/);
  });

  test(`${component} keeps entered values on uncertain delivery and warns about duplicates`, () => {
    const failure = source.slice(source.indexOf("} catch (error) {"), source.indexOf("} finally {"));
    assert.match(source, /couldn’t confirm whether your enquiry was accepted for delivery/);
    assert.match(source, /Your details are still here/);
    assert.match(source, /This form is paused to avoid a duplicate enquiry/);
    assert.match(failure, /submissionLockedRef.current = !rejected/);
    assert.doesNotMatch(failure, /\.reset\(|setStatus\("idle"\)|submitWebsiteForm\(/);
    assert.equal((source.match(/form.reset\(\)/g) ?? []).length, 1);
    assert.match(source, /setStatus\("success"\);\s*form.reset\(\)/);
  });

  test(`${component} preserves validation, disabled controls and repeated-submit guards`, () => {
    assert.match(source, /if \((?:!active \|\| )?submissionLockedRef.current \|\| submittingRef.current\) return/);
    assert.match(source, /if \(!reportFormValidity\(form\)\) return/);
    assert.match(source, /onInput=\{clearFieldValidation\}/);
    assert.match(source, /aria-busy=\{status === "submitting"\}/);
    assert.match(source, /<fieldset disabled=\{status === "submitting" \|\| status === "uncertain"\}/);
    assert.match(source, /finally \{\s*submittingRef.current = false/);
    assert.equal((source.match(/await submitWebsiteForm\(payload\)/g) ?? []).length, 1);
  });

  test(`${component} starts a fresh form only by deliberate action and focuses its name field`, () => {
    const success = source.slice(source.indexOf('if (status === "success")'), source.indexOf('    <form'));
    assert.match(success, /submissionLockedRef.current = false/);
    assert.match(success, /restartFocusRef.current = true;\s*setStatus\("idle"\)/);
    assert.match(source, /else if \((?:active && )?status === "idle" && restartFocusRef.current\) \{\s*restartFocusRef.current = false;\s*firstFieldRef.current\?\.focus\(\)/);
    assert.match(source, /<Input\s+ref=\{firstFieldRef\}\s+id=\{`(?:contact|home)-name-\$\{idPrefix\}`\}\s+name="name"/);
  });
}

test("both contact payload variants accept a confirmed receipt and reject uncertainty without retries or mutation", async () => {
  const receipt = "8dd9d328-72ca-4a29-8022-735693bd84f7";
  for (const payload of [
    { type: "contact" as const, name: "Synthetic Contact", email: "test@example.com", phone: "", message: "Synthetic enquiry" },
    { type: "contact" as const, name: "Synthetic Contact", email: "test@example.com", phone: "Synthetic phone", serviceType: "Not sure yet", message: "Synthetic enquiry" },
  ]) {
    const original = { ...payload };
    assert.deepEqual(await submitWebsiteForm(payload, async () => Response.json({ success: true, submissionId: receipt })), { submissionId: receipt });
    for (const response of [
      async () => Response.json({ success: false }, { status: 502 }),
      async () => { throw new TypeError("Synthetic lost response"); },
      async () => Response.json({ success: true }),
      async () => new Response("not JSON", { status: 200 }),
    ]) {
      let attempts = 0;
      await assert.rejects(submitWebsiteForm(payload, async () => {
        attempts += 1;
        return response();
      }));
      assert.equal(attempts, 1);
      assert.deepEqual(payload, original);
    }
  }
});

for (const component of ["ContactForm", "SimpleContactForm"]) {
  test(`${component} scrolls outcomes below the fixed header without animation`, () => {
    const source = readFileSync(`src/components/forms/${component}.tsx`, "utf8");
    assert.match(source, /outcomeRef.current\?\.focus\(\{ preventScroll: true \}\)/);
    assert.match(source, /outcomeRef.current\?\.scrollIntoView\(\{ block: "start", behavior: "instant" \}\)/);
    assert.equal((source.match(/scroll-mt-24 /g) ?? []).length, 3);
  });
}
