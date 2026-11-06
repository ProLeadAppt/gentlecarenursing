import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { beginModalSession } from "../src/lib/modal-session";

function fixture(overflow = "auto", alreadyOpen = false) {
  let callback: FrameRequestCallback = () => {};
  let focused = 0;
  let shown = 0;
  const cancelled: number[] = [];
  const dialog = { open: alreadyOpen, isConnected: true, showModal() { shown++; this.open = true; } };
  const bodyStyle = { overflow };
  const cleanup = beginModalSession({ dialog, bodyStyle, focusFirst: () => { focused++; },
    requestFrame: (cb) => { callback = cb; return 7; }, cancelFrame: (id) => { cancelled.push(id); } });
  return { dialog, bodyStyle, cleanup, cancelled, frame: () => callback(0), focused: () => focused, shown: () => shown };
}

test("opening locks scrolling and focuses the connected open dialog", () => {
  const f = fixture(); f.frame();
  assert.equal(f.bodyStyle.overflow, "hidden"); assert.equal(f.shown(), 1); assert.equal(f.focused(), 1);
});
test("cleanup cancels stale autofocus and restores the existing scroll value", () => {
  for (const initial of ["", "auto", "scroll", "hidden"]) {
    const f = fixture(initial); f.cleanup(); f.frame(); f.cleanup();
    assert.equal(f.bodyStyle.overflow, initial); assert.equal(f.focused(), 0); assert.deepEqual(f.cancelled, [7]);
  }
});
test("closed or detached dialogs cannot receive delayed autofocus", () => {
  const f = fixture(); f.dialog.open = false; f.frame(); assert.equal(f.focused(), 0); f.cleanup();
  const g = fixture(); g.dialog.isConnected = false; g.frame(); assert.equal(g.focused(), 0); g.cleanup();
});
test("an already-open dialog is not opened again", () => {
  const f = fixture("auto", true); assert.equal(f.shown(), 0); f.cleanup();
});
test("strict-mode replay or form switching invalidates the earlier frame", () => {
  const first = fixture(); first.cleanup();
  const next = fixture(); first.frame(); next.frame();
  assert.equal(first.focused(), 0); assert.equal(next.focused(), 1); next.cleanup();
});
test("component returns session cleanup and preserves trigger restoration", () => {
  const source = readFileSync("src/components/ui/FormModal.tsx", "utf8");
  assert.match(source, /return beginModalSession\(/);
  assert.doesNotMatch(source, /document.body.style.overflow =/);
  assert.match(source, /trigger\?\.isConnected/);
  assert.match(source, /trigger.focus\(\)/);
});
test("same-node effect replay restores the original scroll value after both sessions", () => {
  const callbacks: FrameRequestCallback[] = [];
  const cancelled: number[] = [];
  let focused = 0, shown = 0;
  const dialog = { open: false, isConnected: true, showModal() { shown++; this.open = true; } };
  const bodyStyle = { overflow: "scroll" };
  const options = { dialog, bodyStyle, focusFirst: () => { focused++; },
    requestFrame: (cb: FrameRequestCallback) => { callbacks.push(cb); return callbacks.length; },
    cancelFrame: (id: number) => { cancelled.push(id); } };
  const firstCleanup = beginModalSession(options);
  firstCleanup();
  const secondCleanup = beginModalSession(options);
  callbacks[0](0); callbacks[1](0);
  assert.equal(focused, 1); assert.equal(shown, 1); assert.equal(bodyStyle.overflow, "hidden");
  secondCleanup(); assert.equal(bodyStyle.overflow, "scroll"); assert.deepEqual(cancelled, [1, 2]);
});
