import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { FaqAccordion } from "../src/components/sections/FaqAccordion";

const items = [
  { id: "synthetic-one", question: "First synthetic question?", answer: "First synthetic answer." },
  { id: "synthetic-two", question: "Second synthetic question?", answer: "Second synthetic answer." },
];

test("collapsed FAQ regions use native hidden semantics instead of visual clipping alone", () => {
  const html = renderToStaticMarkup(createElement(FaqAccordion, { items }));
  const panels = [...html.matchAll(/<div\b([^>]*\brole="region"[^>]*)>/g)];
  assert.equal(panels.length, items.length);
  for (const panel of panels) assert.match(panel[1], /\bhidden=""/);
  assert.equal((html.match(/aria-expanded="false"/g) ?? []).length, items.length);
});

test("FAQ questions retain native buttons and their matching labelled answer regions", () => {
  const html = renderToStaticMarkup(createElement(FaqAccordion, { items }));
  for (const item of items) {
    assert.ok(html.includes(`aria-controls="faq-answer-${item.id}"`));
    assert.ok(html.includes(`id="faq-question-${item.id}"`));
    assert.ok(html.includes(`id="faq-answer-${item.id}"`));
    assert.ok(html.includes(`aria-labelledby="faq-question-${item.id}"`));
    assert.ok(html.includes(item.question));
    assert.ok(html.includes(item.answer));
  }
  assert.equal((html.match(/<button type="button"/g) ?? []).length, items.length);
});

test("long FAQ answers remain complete and text remains escaped", () => {
  const answer = `${"Long synthetic answer. ".repeat(100)}<not-markup> & plain text`;
  const html = renderToStaticMarkup(createElement(FaqAccordion, {
    items: [{ id: "long-answer", question: "Synthetic question?", answer }],
  }));
  assert.ok(html.includes(`${"Long synthetic answer. ".repeat(100)}&lt;not-markup&gt; &amp; plain text`));
  assert.doesNotMatch(html, /<not-markup>/);
});

test("expanded answers are not restricted by the previous fixed height cap", () => {
  const source = readFileSync("src/components/sections/FaqAccordion.tsx", "utf8");
  assert.doesNotMatch(source, /\bmax-h-(?!none\b)[^\s"'}]+/);
  assert.match(source, /hidden=\{!isOpen\}/);
});
