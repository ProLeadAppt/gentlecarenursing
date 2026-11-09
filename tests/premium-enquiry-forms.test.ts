import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import { createElement, type ComponentType } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { FormModalProvider } from "../src/contexts/FormModalContext";
import baseline from "./fixtures/contact-referral-baseline.json";

// Node's SSR runner does not load stylesheets. No source transformation or
// component substitute is used: both actual route modules and forms render.
const nativeRequire = createRequire(import.meta.url);
nativeRequire.extensions[".css"] = () => undefined;
const css = readFileSync("src/app/premium-enquiry.css", "utf8");
const digest = (value: string | Buffer) => createHash("sha256").update(value).digest("hex");
const normalizeIds = (value: string) => value.replace(/_R_[a-zA-Z0-9]+_/g, "_FORM_ID_");
const form = (html: string) => normalizeIds(html.match(/<form\b[\s\S]*?<\/form>/)?.[0] ?? "");
// Remove only the two explicitly added presentation wrappers, retaining every
// original div, its position and all non-presentation attributes.
const unwrapPresentationDivs = (html: string) => {
  const wrappers: boolean[] = [];
  const result = html.replace(/<\/?div\b[^>]*>/g, tag => {
    if (tag.startsWith("</")) return wrappers.pop() ? "" : tag;
    const added = /class="(?:premium-enquiry premium-(?:contact|referral)|enquiry-process)"/.test(tag);
    wrappers.push(added);
    return added ? "" : tag;
  });
  assert.equal(wrappers.length, 0);
  return result;
};
const semanticDOM = (html: string) => normalizeIds(unwrapPresentationDivs(html).replace(/\s(?:class|style)="[^"]*"/g, ""));
const decode = (s: string) => s.replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
const plain = (s: string) => decode(s.replace(/<[^>]*>/g, "")).replace(/\s+/g, " ").trim();

for (const route of ["contact", "referral"] as const) {
  const actual = nativeRequire(`../src/app/${route}/page.tsx`) as { default: ComponentType; metadata: unknown };
  const html = renderToStaticMarkup(createElement(FormModalProvider, null, createElement(actual.default)));
  const original = baseline.routes[route];
  const source = readFileSync(`src/app/${route}/page.tsx`, "utf8");

  test(`${route}: full rendered semantic DOM, all copy, schema and original link destinations are unchanged`, () => {
    assert.equal(semanticDOM(html), semanticDOM(original.html));
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
    assert.doesNotMatch(html, /<main\b|<iframe\b|<img\b|data-analytics-action=/);
    const levels = [...html.matchAll(/<h([1-6])\b/g)].map(m => Number(m[1]));
    for (let i = 1; i < levels.length; i++) assert.ok(levels[i] <= levels[i - 1] + 1);
  });

  test(`${route}: exact original form DOM preserves labels, names, types, order, options, hints and requiredness`, () => {
    assert.equal((html.match(/<form\b/g) ?? []).length, 1);
    assert.equal(form(html), form(original.html));
    assert.match(form(html), /aria-busy="false"/);
    assert.doesNotMatch(form(html), /disabled=""/);
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]);
    assert.equal(ids.length, new Set(ids).size);
    for (const m of html.matchAll(/(?:for|aria-describedby|aria-labelledby)="([^"]+)"/g)) {
      for (const id of m[1].split(/\s+/)) assert.ok(ids.includes(id), id);
    }
    const controls = [...form(html).matchAll(/<(input|textarea|select)\b([^>]*)>/g)].map(m => ({name: m[2].match(/name="([^"]+)"/)?.[1], required: /required=""/.test(m[2])}));
    assert.deepEqual(controls, route === "contact" ? [
      { name: "name", required: true }, { name: "email", required: true }, { name: "phone", required: false }, { name: "message", required: true },
    ] : [
      { name: "referrerName", required: true }, { name: "referrerPhone", required: true }, { name: "serviceType", required: false }, { name: "referrerEmail", required: false }, { name: "referrerRole", required: false }, { name: "clientName", required: false }, { name: "notes", required: false },
    ]);
    const labels = [...form(html).matchAll(/<label\b[^>]*>([\s\S]*?)<\/label>/g)].map(m => plain(m[1]));
    assert.deepEqual(labels, route === "contact" ? ["Name*", "Email*", "Phone", "Message*"] : ["Your name*", "Your phone*", "Service type", "Your email", "Your role", "Client / participant name", "Notes"]);
  });

  test(`${route}: route metadata, original form invocation and all CTA component props remain intact`, () => {
    assert.deepEqual(actual.metadata, original.metadata);
    assert.equal(source.slice(source.indexOf("export const metadata"), source.indexOf("export default")), original.metadataSource);
    assert.match(source, route === "contact" ? /<ContactForm \/>/ : /<ReferralForm \/>/);
    assert.match(source, /<CtaSection/);
    assert.doesNotMatch(source, /"use client"|onSubmit=|onClick=|compact=|fetch\(|data-analytics|openModal\(/);
    if (route === "referral") assert.match(source, /<ProcessSteps\s+title="How It Works"\s+subtitle="From enquiry to care\."\s+steps=\{REFERRAL_STEPS\}\s*\/>/);
  });
}

test("enquiry pages: every existing production file outside the two route wrappers is byte-identical", () => {
  for (const [path, hash] of Object.entries(baseline.unchangedFiles)) assert.equal(digest(readFileSync(path)), hash, path);
});

test("enquiry pages: disabled, pending, success, uncertain outcome, focus and no-retry contracts remain exact", () => {
  for (const component of ["ContactForm", "ReferralForm"]) {
    const path = `src/components/forms/${component}.tsx`;
    const source = readFileSync(path, "utf8");
    assert.equal(digest(source), baseline.unchangedFiles[path as keyof typeof baseline.unchangedFiles]);
    assert.match(source, /<fieldset disabled=\{status === "submitting"\}/);
    assert.match(source, /aria-busy=\{status === "submitting"\}/);
    assert.match(source, /if \(submittingRef.current\) return/);
    assert.match(source, /if \(!reportFormValidity\(form\)\) return/);
    assert.match(source, /onInput=\{clearFieldValidation\}/);
    assert.equal((source.match(/await submitWebsiteForm\(payload\)/g) ?? []).length, 1);
    assert.match(source, /role="status"/); assert.match(source, /role="alert"/);
    assert.match(source, /does not confirm inbox receipt, a booking or service availability/);
    assert.match(source, /outcomeRef.current\?\.focus/);
    assert.match(source, /firstFieldRef.current\?\.focus/);
    assert.doesNotMatch(source, /setTimeout|setInterval/);
    const failure = source.slice(source.indexOf("} catch {"), source.indexOf("} finally {"));
    assert.match(failure, /Your details are still here/);
    assert.doesNotMatch(failure, /form.reset|submitWebsiteForm\(/);
  }
});

test("enquiry pages: styles are route-scoped and preserve control visibility, contrast-aware focus and reflow", () => {
  const selectors = [...css.replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/([^{}]+)\{/g)].map(m => m[1].trim());
  for (const selector of selectors.filter(s => !s.startsWith("@"))) {
    for (const branch of selector.split(/,(?![^()]*\))/)) assert.ok(branch.trim().startsWith(".premium-enquiry"), branch);
  }
  assert.match(css, /grid-template-columns: minmax\(0, 1fr\)/);
  assert.match(css, /\.enquiry-form :is\(input, select, textarea\):focus \{[^}]*outline: 3px solid/);
  assert.match(css, /\.enquiry-cta a:focus-visible \{ outline-color: var\(--enquiry-cream\)/);
  assert.match(css, /\[role="status"\], \[role="alert"\]\):focus/);
  assert.match(css, /white-space: normal/);
  assert.match(css, /font-size: 1rem/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.doesNotMatch(css, /@import|@font-face|transition:\s*all|opacity:\s*0\b|position:\s*(?:fixed|sticky)|pointer-events:\s*none/);
  const hidden = [...css.matchAll(/([^{}]+)\{[^{}]*display:\s*none[^{}]*\}/g)].map(m => m[1].trim());
  assert.deepEqual(hidden, [".premium-enquiry .enquiry-process .group > .absolute"]); // decorative connectors only
  const importers: string[] = [];
  function walk(dir: string) { for (const e of readdirSync(dir, {withFileTypes:true})) { const p=join(dir,e.name); if(e.isDirectory()) walk(p); else if(/\.(?:tsx?|css)$/.test(p) && p!=="src/app/premium-enquiry.css" && readFileSync(p,"utf8").includes("premium-enquiry.css")) importers.push(p); } }
  walk("src"); assert.deepEqual(importers, ["src/app/contact/page.tsx", "src/app/referral/page.tsx"]);
});
