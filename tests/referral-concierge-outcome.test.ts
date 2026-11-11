import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import { runInNewContext } from "node:vm";
import ts from "typescript";
import * as React from "react";
import { submitWebsiteForm, WebsiteSubmissionError } from "../src/lib/form-client";
import { fieldValidationMessage } from "../src/lib/form-validation";
import originals from "./fixtures/referral-concierge-original.json";
import baseline from "./fixtures/complete-baseline.json";

const conciergePath = "src/components/forms/ReferralConcierge.tsx";
const modalPath = "src/components/ui/FormModal.tsx";
const nativeRequire = createRequire(import.meta.url);
const receipt = "8dd9d328-72ca-4a29-8022-735693bd84f7";
const payload = {
  type: "referral" as const, referrerName: "Synthetic Referrer", referrerEmail: "synthetic@example.com",
  referrerPhone: "0400000000", referrerRole: "SC", organization: "Synthetic organisation",
  clientName: "Synthetic client", serviceType: "Nursing", notes: "Synthetic private notes",
};
type Props = Record<string, unknown>;
type Element = { type: unknown; props: Props; key?: string | null };
type Effect = { deps?: unknown[]; cleanup?: () => void };
function elements(value: unknown): Element[] {
  if (Array.isArray(value)) return value.flatMap(elements);
  if (!React.isValidElement(value)) return [];
  const element = value as Element;
  return [element, ...elements(element.props.children)];
}
const text = (value: unknown): string => Array.isArray(value) ? value.map(text).join("") : React.isValidElement(value) ? text((value as Element).props.children) : typeof value === "string" || typeof value === "number" ? String(value) : "";
const plain = (value: unknown) => JSON.parse(JSON.stringify(value));
function deferred<T>() {
  let resolve!: (value: T) => void, reject!: (error: unknown) => void;
  const promise = new Promise<T>((res, rej) => { resolve = res; reject = rej; });
  return { promise, resolve, reject };
}

// Executes the actual component with deterministic hook, host-ref and animation
// doubles. This is not React DOM, a screen-reader test or browser visual QA.
function harness(path: string, options: {
  imports?: Record<string, unknown>;
  globals?: Record<string, unknown>;
  node?: (element: Element) => unknown;
} = {}) {
  const slots: unknown[] = [], effects: Effect[] = [], pending: (() => void)[] = [];
  let cursor = 0, dirty = false, value: unknown, props: Props = {};
  const focuses: string[] = [];
  const hooks = {
    ...React,
    useState(initial: unknown) {
      const i = cursor++;
      if (!(i in slots)) slots[i] = typeof initial === "function" ? initial() : initial;
      return [slots[i], (next: unknown) => {
        const result = typeof next === "function" ? next(slots[i]) : next;
        if (!Object.is(slots[i], result)) { slots[i] = result; dirty = true; }
      }];
    },
    useRef(initial: unknown) { const i = cursor++; return slots[i] ??= { current: initial }; },
    useId() { return "synthetic-id"; },
    useCallback(callback: unknown) { return callback; },
    useEffect(effect: () => (() => void) | void, deps: unknown[]) {
      const i = cursor++, previous = effects[i];
      if (!previous || deps.some((item, index) => !Object.is(item, previous.deps?.[index]))) {
        pending.push(() => { previous?.cleanup?.(); effects[i] = { deps, cleanup: effect() || undefined }; });
      }
    },
  };
  const source = readFileSync(path, "utf8");
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 } }).outputText;
  const loadedModule = { exports: {} as Record<string, (props: Props) => unknown> };
  runInNewContext(compiled, { module: loadedModule, exports: loadedModule.exports, require: (request: string) => {
    if (request in (options.imports ?? {})) return options.imports![request];
    if (request === "react") return hooks;
    if (request === "framer-motion") return { motion: { div: "motion.div" }, AnimatePresence: "presence" };
    return nativeRequire(request.startsWith("@/") ? resolve("src", request.slice(2)) : request);
  }, ...options.globals });
  const component = loadedModule.exports[path === conciergePath ? "ReferralConcierge" : "FormModal"];
  const node = (element: Element) => ({
    focus: () => focuses.push(element.props["data-form-outcome"] !== undefined ? "outcome" : String(element.props.name ?? element.type)),
    querySelector: (selector: string) => {
      const panel = elements(value).find(e => selector === `[data-form-step="${e.props["data-form-step"]}"]`);
      return panel ? { querySelectorAll: () => elements(panel).filter(e => e.props.name).map(e => ({ name: e.props.name, focus: () => focuses.push(String(e.props.name)) })) } : null;
    },
  });
  function render() {
    do {
      dirty = false; cursor = 0; value = component(props);
      // React clears refs for host nodes that disappear.
      for (const slot of slots) if (slot && typeof slot === "object" && "current" in slot && (slot as { current: unknown }).current && typeof (slot as { current: unknown }).current === "object" && "focus" in ((slot as { current: object }).current)) (slot as { current: unknown }).current = null;
      for (const element of elements(value)) {
        const ref = element.props.ref;
        if (ref && typeof ref === "object") (ref as { current: unknown }).current = options.node?.(element) ?? node(element);
      }
      for (const effect of pending.splice(0)) effect();
    } while (dirty);
    return value;
  }
  return {
    render, tree: () => value, all: () => elements(value), focuses,
    mount(next: Props = {}) { props = next; return render(); },
    unmount() { for (const effect of effects) effect?.cleanup?.(); },
  };
}

function concierge(fetcher: typeof fetch) {
  const requests: unknown[] = [], events: unknown[][] = [], retention: boolean[] = [];
  const onRetainSessionChange = (retain: boolean) => retention.push(retain);
  let valid = true;
  const h = harness(conciergePath, { imports: {
    "@/lib/form-client": { WebsiteSubmissionError, submitWebsiteForm: (data: typeof payload) => { requests.push(plain(data)); return submitWebsiteForm(data, fetcher); } },
    "@/lib/analytics": { dispatchAnalyticsEvent: (...args: unknown[]) => events.push(plain(args)) },
    "@/lib/form-validation": { fieldValidationMessage, reportFormValidity: () => valid, clearFieldValidation: () => {} },
  } });
  const button = (label: string) => h.all().find(e => e.props.type === "button" && text(e).trim() === label)!;
  const change = (name: keyof typeof payload, value: string) => {
    const input = h.all().find(e => e.props.name === name)!;
    (input.props.onChange as (e: unknown) => void)({ target: { name, value } }); h.render();
  };
  const transition = (label = "Next Step") => {
    (button(label).props.onClick as () => void)(); h.render();
    const panel = h.all().find(e => e.props["data-form-step"] !== undefined)!;
    (panel.props.onAnimationComplete as (value: string) => void)("center"); h.render();
  };
  const submit = () => {
    const form = h.all().find(e => e.type === "form");
    assert.ok(form);
    return (form.props.onSubmit as (e: unknown) => Promise<void>)({ preventDefault() {}, currentTarget: {} });
  };
  const fill = () => {
    for (const fields of [["referrerName", "referrerRole", "organization"], ["referrerEmail", "referrerPhone"], ["clientName", "serviceType"]] as const) {
      for (const name of fields) change(name, payload[name]);
      transition();
    }
    change("notes", payload.notes);
  };
  h.mount({ active: true, onRetainSessionChange });
  return { ...h, mount(next: Props = {}) { return h.mount({ ...next, onRetainSessionChange }); }, requests, events, retention, change, transition, submit, fill, valid(value: boolean) { valid = value; } };
}

for (const status of [400, 403, 408, 413, 415, 503]) {
  test(`only a structured pre-send ${status} rejection permits a deliberate retry`, async () => {
    const h = concierge(async () => Response.json({ success: false, error: "Synthetic route rejection" }, { status }));
    h.fill(); const before = h.focuses.length; await h.submit(); h.render();
    assert.match(text(h.tree()), /Your referral was not sent/);
    assert.equal(h.all().find(e => e.type === "fieldset")?.props.disabled, false);
    assert.equal(h.focuses.length, before + 1);
    assert.equal(h.focuses.at(-1), "outcome");
    assert.equal(h.all().find(e => e.props.role === "alert")?.props.tabIndex, -1);
    assert.equal(h.all().find(e => e.props.name === "notes")?.props.value, payload.notes);
    await h.submit(); h.render(); assert.equal(h.requests.length, 2);
    assert.deepEqual(h.requests, [payload, payload]);
    assert.ok(h.events.every(event => event[0] === "form_error")); h.unmount();
  });
}

const unknowns: Array<[string, typeof fetch]> = [
  ["network rejection", async () => { throw new TypeError("Synthetic lost response"); }],
  ["provider 502", async () => Response.json({ success: false, error: "Synthetic failure" }, { status: 502 })],
  ["server 500", async () => Response.json({ success: false, error: "Synthetic failure" }, { status: 500 })],
  ["gateway 504", async () => Response.json({ success: false, error: "Synthetic failure" }, { status: 504 })],
  ["unverified 503", async () => Response.json({ error: "Synthetic proxy" }, { status: 503 })],
  ["malformed 400", async () => new Response("not json", { status: 400 })],
  ["empty rejection", async () => Response.json({ success: false, error: " " }, { status: 400 })],
  ["conflicting 403", async () => Response.json({ success: true, submissionId: receipt }, { status: 403 })],
  ["ambiguous 2xx", async () => Response.json({ success: true })],
  ["invalid receipt", async () => Response.json({ success: true, submissionId: "not a receipt" })],
  ["malformed 2xx", async () => new Response("not json", { status: 200 })],
  ["null 2xx", async () => Response.json(null)],
];
for (const [label, fetcher] of unknowns) {
  test(`${label} retains data, focuses an alert and never unlocks or retries`, async () => {
    const h = concierge(fetcher); h.fill(); await h.submit(); h.render();
    assert.match(text(h.tree()), /contact us before submitting again to avoid a duplicate referral/);
    assert.doesNotMatch(text(h.tree()), /Your referral was not sent|Referral accepted for delivery/);
    assert.equal(h.all().find(e => e.type === "fieldset")?.props.disabled, true);
    assert.equal(h.all().find(e => e.props.name === "notes")?.props.value, payload.notes);
    assert.equal(h.focuses.at(-1), "outcome");
    const count = h.focuses.length;
    h.mount({ active: false }); await h.submit(); h.mount({ active: true }); await h.submit(); h.render();
    assert.equal(h.focuses.length, count + 1);
    assert.match(text(h.tree()), /entered details have been cleared/);
    assert.equal(h.all().find(e => e.props.name === "notes")?.props.value, "");
    assert.equal(h.requests.length, 1); assert.deepEqual(h.requests[0], payload);
    assert.deepEqual(h.events, [["form_error", { form_type: "referral", cta_location: "referral_concierge", error_type: "delivery" }]]);
    h.unmount();
  });
}

test("timeout, pending repeated clicks and late acceptance remain one unknown attempt", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  const response = deferred<Response>(); let signal: AbortSignal | undefined;
  const h = concierge(async (_url, init) => { signal = init?.signal ?? undefined; return response.promise; });
  h.fill(); const first = h.submit(); await h.submit(); h.render();
  assert.equal(h.requests.length, 1); assert.equal(h.all().find(e => e.type === "fieldset")?.props.disabled, true);
  assert.match(text(h.tree()), /Closing this window clears the entered details but does not cancel/);
  assert.equal(h.all().find(e => e.props.role === "status")?.props.tabIndex, -1);
  h.mount({ active: false }); const count = h.focuses.length;
  t.mock.timers.tick(30_000); await first; h.render();
  assert.equal(signal?.aborted, true); assert.equal(h.focuses.length, count);
  response.resolve(Response.json({ success: true, submissionId: receipt }));
  await Promise.resolve(); await Promise.resolve(); h.render();
  h.mount({ active: true }); await h.submit(); h.render();
  assert.equal(h.focuses.length, count + 1); assert.equal(h.requests.length, 1);
  assert.match(text(h.tree()), /couldn’t confirm/); assert.equal(h.events[0][0], "form_error"); h.unmount();
});

test("accepted receipt, hidden completion and reopening preserve accurate focused success", async () => {
  const response = deferred<Response>(); const h = concierge(async () => response.promise);
  h.fill(); const first = h.submit(); const staleSubmit = h.submit; await staleSubmit(); h.render();
  h.mount({ active: false }); const count = h.focuses.length;
  response.resolve(Response.json({ success: true, submissionId: receipt })); await first; h.render();
  assert.equal(h.focuses.length, count);
  assert.match(text(h.tree()), /Referral accepted for delivery/);
  assert.match(text(h.tree()), /does not confirm inbox receipt, clinical acceptance, a booking or service availability/);
  assert.doesNotMatch(text(h.tree()), /nursing leads will review/);
  h.mount({ active: true }); assert.equal(h.focuses.length, count + 1);
  assert.equal(h.all().find(e => e.props.role === "status")?.props.tabIndex, -1);
  assert.equal(h.requests.length, 1);
  assert.deepEqual(h.events, [["referral_submit", { form_type: "referral", service_type: "Nursing", cta_location: "referral_concierge", submission_id: receipt }]]);
  h.unmount();
});

test("validation and Previous navigation retain all fields without delivery", async () => {
  const h = concierge(async () => assert.fail("No delivery while validating"));
  h.change("referrerName", "   "); h.change("referrerRole", "SC"); h.valid(false);
  await h.submit(); h.render(); assert.equal(h.requests.length, 0);
  h.valid(true); h.change("referrerName", payload.referrerName); h.change("organization", payload.organization); h.transition();
  h.change("referrerEmail", payload.referrerEmail); h.change("referrerPhone", payload.referrerPhone); h.transition();
  h.change("clientName", payload.clientName); h.change("serviceType", payload.serviceType); h.transition(); h.change("notes", payload.notes);
  assert.equal(h.all().find(e => e.props.name === "notes")?.props.value, payload.notes);
  for (const fields of [["clientName", "serviceType"], ["referrerEmail", "referrerPhone"], ["referrerName", "referrerRole", "organization"]] as const) {
    h.transition("Previous");
    for (const name of fields) assert.equal(h.all().find(e => e.props.name === name)?.props.value, payload[name]);
  }
  assert.equal(h.requests.length, 0); h.unmount();
});

test("rejection after close and reopen reports cleared details, validates again and permits a deliberate retry", async () => {
  const response = deferred<Response>(); const h = concierge(async () => response.promise);
  h.fill(); const first = h.submit(); h.render();
  h.mount({ active: false }); h.mount({ active: true });
  response.resolve(Response.json({ success: false, error: "Synthetic pre-send failure" }, { status: 503 }));
  await first; h.render();
  assert.match(text(h.tree()), /Your referral was not sent/);
  assert.match(text(h.tree()), /entered details have been cleared/);
  assert.doesNotMatch(text(h.tree()), /Your details are still here/);
  assert.equal(h.all().find(e => e.type === "fieldset")?.props.disabled, false);
  await h.submit(); h.render();
  assert.equal(h.requests.length, 1);
  const panel = h.all().find(e => e.props["data-form-step"] === 1)!;
  assert.ok(panel);
  (panel.props.onAnimationComplete as (value: string) => void)("center"); h.render();
  assert.equal(h.all().find(e => e.props.name === "referrerName")?.props.value, "");
  h.fill(); await h.submit(); h.render();
  assert.equal(h.requests.length, 2); assert.deepEqual(h.requests, [payload, payload]);
  assert.match(text(h.tree()), /Your details are still here/);
  assert.doesNotMatch(text(h.tree()), /entered details have been cleared/); h.unmount();
});

test("acceptance while active focuses the receipt and ignores a stale repeated submit", async () => {
  const response = deferred<Response>(); const h = concierge(async () => response.promise);
  h.fill();
  const handler = h.all().find(e => e.type === "form")!.props.onSubmit as (e: unknown) => Promise<void>;
  const first = h.submit(); h.render(); const count = h.focuses.length;
  response.resolve(Response.json({ success: true, submissionId: receipt })); await first; h.render();
  assert.equal(h.focuses.length, count + 1); assert.equal(h.focuses.at(-1), "outcome");
  assert.match(text(h.tree()), /Referral accepted for delivery/);
  assert.equal(h.all().filter(e => e.props.name).length, 0);
  await handler({ preventDefault() {}, currentTarget: {} });
  assert.equal(h.requests.length, 1); assert.deepEqual(h.retention, [true]); h.unmount();
});

test("a rejection completing while closed releases retention without focus or retry", async () => {
  const response = deferred<Response>(); const h = concierge(async () => response.promise);
  h.fill(); const first = h.submit(); h.render(); h.mount({ active: false }); const count = h.focuses.length;
  assert.deepEqual(h.retention, [true]);
  response.resolve(Response.json({ success: false, error: "Synthetic pre-send failure" }, { status: 400 }));
  await first; h.render();
  assert.deepEqual(h.retention, [true, false]);
  assert.equal(h.focuses.length, count); assert.equal(h.requests.length, 1);
  assert.match(text(h.tree()), /entered details have been cleared/);
  assert.equal(h.all().find(e => e.props.name === "notes")?.props.value, ""); h.unmount();
});

test("unmount during submission does not focus a removed form or send again", async () => {
  const response = deferred<Response>(); const h = concierge(async () => response.promise);
  h.fill(); const first = h.submit(); h.render(); h.unmount(); const count = h.focuses.length;
  response.resolve(Response.json({ success: true, submissionId: receipt })); await first;
  assert.equal(h.focuses.length, count); assert.equal(h.requests.length, 1);
});

test("actual modal retains one referral component through close/contact/reopen and scopes autofocus", () => {
  let activeForm: string | null = "referral", closeRequests = 0;
  const callbacks: Array<() => void> = [], selections: string[] = [], focus: string[] = [], listeners = new Map<string, (event: { preventDefault(): void }) => void>();
  const trigger = { isConnected: true, closest: () => null, focus: () => focus.push("trigger") };
  const returnFocusRef = { current: trigger as typeof trigger | null };
  const dialog = { open: false, isConnected: true, close() { this.open = false; }, showModal() { this.open = true; }, addEventListener: (event: string, fn: (e: { preventDefault(): void }) => void) => listeners.set(event, fn), removeEventListener: (event: string) => listeners.delete(event) };
  const context = { closeModal: () => { closeRequests++; }, returnFocusRef };
  const h = harness(modalPath, { imports: { "@/contexts/FormModalContext": { useFormModal: () => ({ ...context, activeForm }) } }, globals: {
    document: { body: { style: { overflow: "auto" } } }, requestAnimationFrame: (fn: () => void) => { callbacks.push(fn); return callbacks.length; }, cancelAnimationFrame() {},
  }, node: e => e.type === "dialog" ? dialog : ({ contains: () => false, querySelector: (selector: string) => {
    selections.push(selector); return { querySelector: (target: string) => { assert.equal(target, "[data-form-outcome]"); return { focus: () => focus.push(selector) }; } };
  } }) });
  const referral = () => h.all().find(e => typeof e.type === "function" && (e.type as { name: string }).name === "ReferralConcierge")!;
  h.mount(); const original = referral(); callbacks.at(-1)!();
  assert.equal(original.props.active, true); assert.equal(selections.at(-1), '[data-modal-form="referral"]');
  // An untouched draft is discarded on close, as before. After starting an
  // attempt the parent retains the same child position/type until a safe reset.
  activeForm = null; h.render(); assert.equal(referral(), undefined);
  activeForm = "referral"; h.render();
  (referral().props.onRetainSessionChange as (retain: boolean) => void)(true); h.render();
  const closeButton = h.all().find(e => e.props["aria-label"] === "Close")!;
  (closeButton.props.onClick as () => void)(); assert.equal(closeRequests, 1);
  activeForm = null; h.render(); assert.equal(referral().type, original.type); assert.equal(referral().key, original.key);
  assert.equal(referral().props.active, false); assert.equal(h.all().find(e => e.props["data-modal-form"] === "referral")?.props.hidden, true);
  assert.equal(focus.at(-1), "trigger"); callbacks[0](); assert.equal(focus.at(-1), "trigger");
  activeForm = "contact"; h.render(); callbacks.at(-1)!();
  assert.equal(selections.at(-1), '[data-modal-form="contact"]'); assert.equal(referral().props.active, false);
  activeForm = "referral"; h.render(); callbacks.at(-1)!(); assert.equal(referral().type, original.type); assert.equal(referral().props.active, true);
  let prevented = false; listeners.get("cancel")!({ preventDefault() { prevented = true; } });
  assert.ok(prevented); assert.equal(closeRequests, 2);
  (h.all().find(e => e.type === "dialog")!.props.onClick as (e: unknown) => void)({ target: {} }); assert.equal(closeRequests, 3);
  (referral().props.onRetainSessionChange as (retain: boolean) => void)(false); h.render();
  activeForm = null; h.render(); assert.equal(referral(), undefined);
  h.unmount(); assert.equal(listeners.size, 0);
});

test("frozen source authenticates all fields, validation, payload, analytics, transport and dialog boundaries", () => {
  const digest = (source: string) => createHash("sha256").update(source).digest("hex");
  for (const [path, source] of Object.entries(originals)) assert.equal(digest(source), baseline.unchangedFiles[path as keyof typeof baseline.unchangedFiles]);
  const current = readFileSync(conciergePath, "utf8"), original = originals[conciergePath];
  const printer = ts.createPrinter({ removeComments: true });
  function contracts(source: string) {
    const ast = ts.createSourceFile("component.tsx", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX), result: string[] = [];
    function visit(node: ts.Node) {
      if ((ts.isJsxElement(node) && ["FormField", "Select", "option"].includes(node.openingElement.tagName.getText(ast))) || (ts.isJsxSelfClosingElement(node) && ["Input", "Textarea"].includes(node.tagName.getText(ast))) || (ts.isCallExpression(node) && ["dispatchAnalyticsEvent", "submitWebsiteForm"].includes(node.expression.getText(ast)))) result.push(printer.printNode(ts.EmitHint.Unspecified, node, ast));
      else ts.forEachChild(node, visit);
    }
    visit(ast); return result;
  }
  assert.deepEqual(contracts(current), contracts(original));
  const validation = (s: string) => s.slice(s.indexOf("  const validationFields:"), s.indexOf("  function focusCurrentStep"));
  assert.equal(validation(current), validation(original));
  assert.doesNotMatch(current, /\balert\(|console\.|localStorage|sessionStorage|setTimeout|setInterval/);
  const transport = readFileSync("src/lib/form-client.ts", "utf8");
  const fetchCall = (s: string) => s.slice(s.indexOf('  const response = await fetcher("/api/submit"'), s.indexOf("  if (!response.ok)"));
  assert.equal(fetchCall(transport), fetchCall(originals["src/lib/form-client.ts"]));
  const publicTransport = (s: string) => s.slice(s.indexOf("export async function submitWebsiteForm"), s.indexOf("async function requestSubmissionConfirmation"));
  assert.equal(publicTransport(transport), publicTransport(originals["src/lib/form-client.ts"]));
  assert.equal(transport.slice(transport.indexOf("  const result = (await response.json())")), originals["src/lib/form-client.ts"].slice(originals["src/lib/form-client.ts"].indexOf("  const result = (await response.json())")));
  const modal = readFileSync(modalPath, "utf8");
  const dialogHandlers = (s: string) => s.slice(s.indexOf("  const handleBackdropClick"), s.indexOf("  const getHeaderContent"));
  assert.equal(dialogHandlers(modal), dialogHandlers(originals[modalPath]));
  assert.match(modal, /<div data-modal-form="referral" hidden=\{activeForm !== "referral"\}>/);
  assert.match(modal, /activeForm === "referral" \|\| retainReferralSession/);
  assert.match(modal, /onRetainSessionChange=\{setRetainReferralSession\}/);
  assert.match(current, /setFormData\(EMPTY_FORM_DATA\);\s*setOutcome\("success"\)/);
});
