import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync("src/components/ui/FloatingContact.tsx", "utf8");

// Source contracts for the persistent focus target. The separate React state
// harness exercises handlers with host-node mocks, not native browser focus.
test("floating contact keeps a ref on the persistent disclosure button", () => {
  assert.match(source, /const toggleRef = useRef<HTMLButtonElement>\(null\)/);
  assert.match(source, /<button\s+ref=\{toggleRef\}\s+type="button"/);
  assert.match(source, /aria-expanded=\{isExpanded\}/);
});

test("opening the contact form resolves a safe target at close without scrolling", () => {
  assert.match(source, /openModal\("contact", "floating_contact", \(\) => \{/);
  assert.match(source, /window.scrollY > 300/);
  assert.match(source, /window.matchMedia\("\(min-width: 64rem\)"\).matches/);
  assert.match(source, /toggle\?\.isConnected/);
  assert.match(source, /!toggle.closest\("\[inert\]"\)/);
  assert.match(source, /toggleAvailable \? toggle : document.getElementById\("main-content"\)/);
  assert.match(source, /target.focus\(\{ preventScroll: true \}\)/);
});

test("Escape restores the toggle only when focus was inside the disclosure", () => {
  assert.match(source, /if \(e.key !== "Escape"\) return/);
  assert.match(source, /const focusWasInside = containerRef.current\?\.contains\(document.activeElement\)/);
  assert.match(source, /setIsExpanded\(false\);\s*if \(focusWasInside\) toggleRef.current\?\.focus\(\)/);
});

test("outside clicks keep their own focus and disclosure listeners are cleaned up", () => {
  const pointerHandler = source.slice(source.indexOf("const onPointer ="), source.indexOf('window.addEventListener("keydown"'));
  assert.match(pointerHandler, /!containerRef.current\?\.contains\(e.target as Node\)/);
  assert.match(pointerHandler, /setIsExpanded\(false\)/);
  assert.doesNotMatch(pointerHandler, /\.focus\(/);
  assert.match(source, /window.removeEventListener\("keydown", onKey\)/);
  assert.match(source, /window.removeEventListener\("mousedown", onPointer\)/);
});

test("the existing visible labels, phone target and analytics location are unchanged", () => {
  for (const label of ["Call us", "Send a message", "Send us your enquiry", "Close contact menu", "Open contact menu"]) {
    assert.ok(source.includes(label));
  }
  assert.match(source, /href=\{SITE.phoneHref\}/);
  assert.match(source, /analyticsLocation="floating_contact"/);
  assert.doesNotMatch(source, /submitWebsiteForm|fetch\(/);
});

test("modal clears one-shot restoration callbacks and preserves ordinary element restoration", () => {
  const modal = readFileSync("src/components/ui/FormModal.tsx", "utf8");
  assert.match(modal, /const trigger = returnFocusRef.current;\s*returnFocusRef.current = null;\s*if \(typeof trigger === "function"\) \{\s*trigger\(\)/);
  assert.match(modal, /else if \(trigger\?\.isConnected && !trigger.closest\("\[inert\]"\)\) \{\s*trigger.focus\(\)/);
  const context = readFileSync("src/contexts/FormModalContext.tsx", "utf8");
  assert.match(context, /returnFocusRef.current = returnFocus \?\? \(document.activeElement instanceof HTMLElement \? document.activeElement : null\)/);
  const layout = readFileSync("src/app/layout.tsx", "utf8");
  assert.match(layout, /<main id="main-content" className="flex-1" tabIndex=\{-1\}/);
});
