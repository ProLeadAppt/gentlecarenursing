import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import { runInNewContext } from "node:vm";
import ts from "typescript";
import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { StarRating } from "../src/components/review/StarRating";
import originals from "./fixtures/review-motion-baseline.json";
import complete from "./fixtures/complete-baseline.json";

const starsPath = "src/components/review/StarRating.tsx";
const funnelPath = "src/components/review/ReviewFunnel.tsx";
const nativeRequire = createRequire(import.meta.url);
type Props = Record<string, unknown>;
type Element = { type: unknown; props: Props };
type Effect = { deps?: unknown[]; cleanup?: () => void };
const elements = (value: unknown): Element[] => {
  if (Array.isArray(value)) return value.flatMap(elements);
  if (!React.isValidElement(value)) return [];
  const element = value as Element;
  return [element, ...elements(element.props.children)];
};
const text = (value: unknown): string => Array.isArray(value) ? value.map(text).join("") : React.isValidElement(value) ? text((value as Element).props.children) : typeof value === "string" || typeof value === "number" ? String(value) : "";
const plain = (value: unknown) => JSON.parse(JSON.stringify(value));

// Executes actual component and media-hook functions with deterministic hook,
// media-query and host-ref doubles. It does not test React DOM or animation frames.
function harness(path: typeof starsPath | typeof funnelPath, noPreference = false, original = false) {
  const slots: unknown[] = [], effects: Effect[] = [], pending: (() => void)[] = [];
  const listeners = new Set<() => void>();
  let cursor = 0, dirty = false, value: unknown, props: Props = {}, focusCount = 0;
  const media = { matches: noPreference, addEventListener: (_event: string, fn: () => void) => listeners.add(fn), removeEventListener: (_event: string, fn: () => void) => listeners.delete(fn) };
  const hooks = {
    ...React,
    useState(initial: unknown) {
      const i = cursor++;
      if (!(i in slots)) slots[i] = initial;
      return [slots[i], (next: unknown) => { if (!Object.is(slots[i], next)) { slots[i] = next; dirty = true; } }];
    },
    useRef(initial: unknown) {
      const i = cursor++;
      return slots[i] ??= { current: initial };
    },
    useEffect(effect: () => (() => void) | void, deps: unknown[]) {
      const i = cursor++, previous = effects[i];
      if (!previous || deps.some((item, index) => !Object.is(item, previous.deps?.[index]))) {
        pending.push(() => { previous?.cleanup?.(); effects[i] = { deps, cleanup: effect() || undefined }; });
      }
    },
  };
  const cache = new Map<string, Props>();
  function load(file: string): Props {
    if (cache.has(file)) return cache.get(file)!;
    const source = original && file in originals ? originals[file as keyof typeof originals] : readFileSync(file, "utf8");
    const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 } }).outputText;
    const loadedModule = { exports: {} as Props };
    cache.set(file, loadedModule.exports);
    runInNewContext(compiled, { module: loadedModule, exports: loadedModule.exports, require: (request: string) => {
      if (request === "react") return hooks;
      if (request === "framer-motion") return { motion: { button: "motion.button", div: "motion.div", p: "motion.p" }, AnimatePresence: "presence" };
      if (request === "@/hooks/useMediaQuery") return load("src/hooks/useMediaQuery.ts");
      if (request === "./StarRating") return load(starsPath);
      return nativeRequire(request.startsWith("@/") ? resolve("src", request.slice(2)) : request);
    }, window: { matchMedia: (query: string) => { assert.equal(query, "(prefers-reduced-motion: no-preference)"); return media; }, setTimeout: () => { throw new Error("No delayed essential feedback"); } } });
    return loadedModule.exports;
  }
  const component = load(path)[path === starsPath ? "StarRating" : "ReviewFunnel"] as (props: Props) => unknown;
  function render(flush = true) {
    do {
      dirty = false; cursor = 0; value = component(props);
      for (const element of elements(value)) {
        const ref = element.props.ref;
        const node = { focus: () => { focusCount++; }, querySelector: () => ({ focus: () => { focusCount++; } }) };
        if (typeof ref === "function") ref(node);
        else if (ref && typeof ref === "object") (ref as {current: unknown}).current = node;
      }
      if (flush) for (const effect of pending.splice(0)) effect();
    } while (flush && dirty);
    return value;
  }
  return {
    hydrate() { for (const effect of pending.splice(0)) effect(); return render(); },
    render, tree: () => value, all: () => elements(value), focusCount: () => focusCount,
    mount(next: Props = {}, flush = true) { props = next; return render(flush); },
    preference(next: boolean) { media.matches = next; for (const listener of listeners) listener(); return render(); },
    listeners: () => listeners.size,
    unmount() { for (const effect of effects) effect?.cleanup?.(); },
  };
}
const radios = (h: ReturnType<typeof harness>) => h.all().filter(e => e.props.role === "radio");
const click = (element: Element) => (element.props.onClick as () => void)();
const button = (h: ReturnType<typeof harness>, label: string) => h.all().find(e => e.props.type === "button" && text(e) === label)!;

for (const noPreference of [false, true]) {
  test(`rating keeps immediate selection, confirmation and Continue (motion allowed: ${noPreference})`, () => {
    const h = harness(starsPath, noPreference), calls: number[] = [];
    h.mount({ onContinue: (rating: number) => calls.push(rating) });
    assert.equal(radios(h).length, 5);
    assert.match(text(h.tree()), /Tap a star to begin/);
    for (let rating = 1; rating <= 5; rating++) {
      click(radios(h)[rating - 1]); h.render();
      assert.deepEqual(radios(h).map(e => e.props["aria-checked"]), [1, 2, 3, 4, 5].map(n => n === rating));
      assert.match(text(h.tree()), new RegExp(`${rating} out of 5`));
      assert.equal(h.all().filter(e => e.type === "presence" || e.type === "motion.div" || e.type === "motion.p").length, 0);
      click(button(h, "Continue→"));
    }
    assert.deepEqual(calls, [1, 2, 3, 4, 5]); h.unmount();
  });
  test(`instant selection has no animation delay or stale callback (motion allowed: ${noPreference})`, () => {
    const h = harness(starsPath, noPreference), calls: number[] = [];
    h.mount({ instantRedirect: true, onContinue: (rating: number) => calls.push(rating) });
    for (const rating of [2, 5, 1]) { click(radios(h)[rating - 1]); h.render(); }
    assert.deepEqual(calls, [2, 5, 1]); assert.equal(button(h, "Continue→"), undefined); h.unmount();
  });
}

test("SSR and the first hydration render are static and keep instructions visible", () => {
  const html = renderToStaticMarkup(React.createElement(StarRating, { onContinue: () => {} }));
  assert.match(html, /Tap a star to begin/); assert.doesNotMatch(html, /opacity:0|translateY|scale\(0/);
  const h = harness(starsPath, true); h.mount({ onContinue: () => {} }, false);
  for (const radio of radios(h)) { assert.deepEqual(plain(radio.props.animate), {scale: 1, y: 0}); assert.deepEqual(plain(radio.props.transition), {duration: 0}); }
  h.hydrate(); assert.equal(h.listeners(), 1); h.unmount(); assert.equal(h.listeners(), 0);
});

test("live preference changes clear active hover/tap transforms without losing the selected rating", () => {
  const h = harness(starsPath, true); h.mount({ onContinue: () => {} });
  click(radios(h)[2]); h.render();
  (radios(h)[3].props.onMouseEnter as () => void)(); h.render();
  assert.deepEqual(plain(radios(h)[3].props.animate), {scale: 1.12, y: -4});
  assert.deepEqual(plain(radios(h)[3].props.whileTap), {scale: 0.92});
  h.preference(false);
  for (const radio of radios(h)) {
    assert.deepEqual(plain(radio.props.animate), {scale: 1, y: 0});
    assert.deepEqual(plain(radio.props.whileTap), {scale: 1});
    assert.deepEqual(plain(radio.props.transition), {duration: 0});
    assert.match(String(radio.props.className), /transition-none/);
    assert.match(String(elements(radio.props.children)[0].props.className), /transition-none/);
  }
  assert.match(text(h.tree()), /3 out of 5/); assert.equal(radios(h)[2].props["aria-checked"], true);
  h.preference(true); assert.deepEqual(plain(radios(h)[3].props.animate), {scale: 1.12, y: -4});
  (radios(h)[3].props.onBlur as () => void)(); h.render();
  assert.deepEqual(plain(radios(h)[2].props.animate), {scale: 1.12, y: -4}); h.unmount(); assert.equal(h.listeners(), 0);
});

test("keyboard navigation, wraparound, focus and selected-versus-preview rating remain intact", () => {
  const h = harness(starsPath); h.mount({ onContinue: () => {} });
  for (const [from, key, to] of [[1,"ArrowLeft",5],[5,"ArrowRight",1],[1,"End",5],[5,"Home",1],[1,"ArrowDown",2],[2,"ArrowUp",1]] as const) {
    let prevented = false;
    (radios(h)[from - 1].props.onKeyDown as (event: unknown) => void)({key, preventDefault: () => { prevented = true; }}); h.render();
    assert.ok(prevented); assert.equal(radios(h)[to - 1].props["aria-checked"], true); assert.equal(radios(h)[to - 1].props.tabIndex, 0);
  }
  assert.equal(h.focusCount(), 6);
  (radios(h)[4].props.onFocus as () => void)(); h.render();
  assert.match(text(h.tree()), /1 out of 5/); h.unmount();
});

test("panel entry, transition and cancellation focus do not depend on animation callbacks", () => {
  const h = harness(funnelPath); h.mount(); assert.equal(h.focusCount(), 0);
  for (const rating of [1,2,3,4,5]) {
    click(button(h, "Send private feedback")); h.render();
    assert.ok(h.all().some(e => e.type === "h2"));
    const star = h.all().find(e => typeof e.type === "function" && (e.type as {name:string}).name === "StarRating")!;
    (star.props.onContinue as (value: number) => void)(rating); h.render();
    const form = h.all().find(e => typeof e.type === "function" && (e.type as {name:string}).name === "FeedbackFormInline")!;
    assert.equal(form.props.rating, rating);
    (form.props.onReset as () => void)(); h.render();
    assert.equal(h.all().find(e => e.props["aria-controls"] === "private-feedback-panel")!.props["aria-expanded"], false);
    assert.equal(h.focusCount(), rating * 3);
  }
  click(button(h, "Send private feedback")); h.render();
  click(button(h, "Cancel")); h.render(); assert.equal(h.focusCount(), 17);
  assert.equal(h.all().filter(e => typeof e.type === "string" && (e.type.startsWith("motion.") || e.type === "presence")).length, 0);
  h.unmount();
});

test("frozen originals are genuine; complete feedback form, delivery, statuses and copy remain byte-identical", () => {
  for (const [path, source] of Object.entries(originals)) assert.equal(createHash("sha256").update(source).digest("hex"), complete.unchangedFiles[path as keyof typeof complete.unchangedFiles], path);
  const original = originals[funnelPath], current = readFileSync(funnelPath, "utf8");
  const marker = "/* Private feedback accepts every rating.";
  assert.equal(current.slice(current.indexOf(marker)), original.slice(original.indexOf(marker)));
  // All string/JSX text values other than removed animation tokens and transition
  // classes remain exact; keyboard/hover/focus handlers are also unchanged.
  const stars = readFileSync(starsPath, "utf8");
  const keyboard = (s: string) => s.slice(s.indexOf("onKeyDown="), s.indexOf("aria-checked="));
  assert.equal(keyboard(stars), keyboard(originals[starsPath]));
  for (const source of [current, stars]) assert.doesNotMatch(source, /AnimatePresence|onAnimationComplete|setTimeout/);
  assert.equal(current.match(/import .*feedback-client.*$/m)?.[0], original.match(/import .*feedback-client.*$/m)?.[0]);
});


test("review and rating keep exact visible copy and non-animation JSX contracts", () => {
  const printer = ts.createPrinter({ removeComments: true });
  const ignored = new Set(["className", "key", "mode", "initial", "animate", "exit", "transition", "variants", "whileTap", "onAnimationComplete"]);
  const contracts = (source: string) => {
    const file = ts.createSourceFile("component.tsx", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const copy: string[] = [], attributes: string[] = [];
    function visit(node: ts.Node) {
      if (ts.isJsxText(node)) { const content = node.text.replace(/\s+/g, " ").trim(); if (content) copy.push(content); }
      if (ts.isJsxAttribute(node) && !ignored.has(node.name.getText(file))) attributes.push(printer.printNode(ts.EmitHint.Unspecified, node, file));
      ts.forEachChild(node, visit);
    }
    visit(file); return { copy, attributes };
  };
  for (const [path, original] of Object.entries(originals)) assert.deepEqual(contracts(readFileSync(path, "utf8")), contracts(original), path);
});
