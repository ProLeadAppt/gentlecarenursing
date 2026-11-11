import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import ts from "typescript";
import originals from "./fixtures/enquiry-session-original.json";

// Exact authenticated inputs to this isolated improvement, not regenerated
// snapshots of the edited forms. Initial DOM parity stays in the existing tests.
const hashes: Record<string, string> = {
  "src/components/forms/ContactForm.tsx": "a89219d98a57689b9313f941278e606c8e515025832d7f2ffce07b8789798c9c",
  "src/components/forms/SimpleContactForm.tsx": "55d941ae505f9c7e08b85429def0fd02d93d052c0bc968e8be5015e60cf54643",
  "src/components/forms/ReferralForm.tsx": "0ac2b36f2ed334454025ebc0772df7123dc6e9c80831b23e1a55a5b100241dee",
  "src/components/ui/FormModal.tsx": "01e7ab202abab9160054cc69c8fdf3dad33f1cd9488321a7255baf7df6241d0d"
};
const digest = (source: string) => createHash("sha256").update(source).digest("hex");
const printer = ts.createPrinter({ removeComments: true });
function contracts(source: string) {
  const ast = ts.createSourceFile("component.tsx", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const result: string[] = [];
  function visit(node: ts.Node) {
    if ((ts.isJsxElement(node) && ["FormField", "Select", "option"].includes(node.openingElement.tagName.getText(ast))) ||
      (ts.isJsxSelfClosingElement(node) && ["Input", "Textarea"].includes(node.tagName.getText(ast))) ||
      (ts.isVariableDeclaration(node) && node.name.getText(ast) === "payload") ||
      (ts.isCallExpression(node) && ["submitWebsiteForm", "dispatchAnalyticsEvent"].includes(node.expression.getText(ast)))) {
      result.push(printer.printNode(ts.EmitHint.Unspecified, node, ast));
    } else ts.forEachChild(node, visit);
  }
  visit(ast); return result;
}
for (const [path, original] of Object.entries(originals)) {
  test(`${path}: frozen input is authentic and narrow contracts are preserved`, () => {
    assert.equal(digest(original), hashes[path], path);
    const source = readFileSync(path, "utf8");
    assert.deepEqual(contracts(source), contracts(original));
    assert.doesNotMatch(source, /localStorage|sessionStorage|console\.|window\.alert|setTimeout|setInterval/);
  });
}
for (const component of ["ContactForm", "SimpleContactForm", "ReferralForm"]) {
  test(`${component}: locked outcomes cannot retry and only verified rejection unlocks`, () => {
    const source = readFileSync(`src/components/forms/${component}.tsx`, "utf8");
    assert.match(source, /submissionLockedRef.current \|\| submittingRef.current/);
    assert.match(source, /if \(!reportFormValidity\(form\)\) return/);
    assert.match(source, /submittingRef.current = true;\s*submissionLockedRef.current = true/);
    assert.match(source, /error instanceof WebsiteSubmissionError && error.outcome === "rejected"/);
    assert.match(source, /submissionLockedRef.current = !rejected/);
    assert.match(source, /setStatus\(rejected \? "rejected" : "uncertain"\)/);
    assert.match(source, /<fieldset disabled=\{status === "submitting" \|\| status === "uncertain"\}/);
    assert.equal((source.match(/submissionLockedRef.current = false/g) ?? []).length, 1);
    const success = source.slice(source.indexOf('if (status === "success")'), source.indexOf('    <form'));
    assert.match(success, /submissionLockedRef.current = false/);
    assert.match(source, /mountedRef.current = false/);
    assert.match(source, /if \(mountedRef.current\) \{\s*setStatus\("success"\)/);
  });
}
test("contact modal keeps the same contact slot, clears hidden details and scopes focus", () => {
  const source = readFileSync("src/components/forms/ContactForm.tsx", "utf8");
  const modal = readFileSync("src/components/ui/FormModal.tsx", "utf8");
  assert.match(source, /if \(!active\) \{[\s\S]*?formRef.current\?\.reset\(\)/);
  assert.match(source, /if \(active && status !== "idle"\)/);
  assert.match(source, /onRetainSessionChange\?\.\(true\);\s*setDetailsCleared\(false\);\s*setStatus\("submitting"\)/);
  assert.match(source, /onRetainSessionChange\?\.\(!rejected\)/);
  assert.match(modal, /<div data-modal-form="contact" hidden=\{activeForm !== "contact"\}>/);
  assert.match(modal, /activeForm === "contact" \|\| retainContactSession/);
  assert.match(modal, /<ContactForm active=\{activeForm === "contact"\} onRetainSessionChange=\{setRetainContactSession\} \/>/);
  const original = originals["src/components/ui/FormModal.tsx"];
  const handlers = (s: string) => s.slice(s.indexOf("  const handleBackdropClick"), s.indexOf("  const getHeaderContent"));
  assert.equal(handlers(modal), handlers(original));
  const referral = (s: string) => s.slice(s.indexOf('          <div data-modal-form="referral"'), s.indexOf('          </div>', s.indexOf('          <div data-modal-form="referral"')) + '          </div>'.length);
  assert.equal(referral(modal), referral(original));
});
