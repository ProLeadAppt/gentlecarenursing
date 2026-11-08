import test from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { BlogCategoryFilter } from "../src/components/sections/BlogCategoryFilter";
import { BLOG_CATEGORIES, type BlogCategory } from "../src/content/blog";

const categories: BlogCategory[] = ["ndis", "aged-care", "clinical", "family-carers"];

function renderFilter(activeCategory: BlogCategory | null, available = categories) {
  return renderToStaticMarkup(createElement(BlogCategoryFilter, {
    categories: available,
    activeCategory,
    onChange: () => {},
  }));
}

function buttons(html: string) {
  return [...html.matchAll(/<button\b([^>]*)>([^<]*)<\/button>/g)];
}

test("blog filters expose a named group of native buttons, not an incomplete tabs widget", () => {
  const html = renderFilter(null);
  assert.match(html, /role="group" aria-label="Filter blog posts by category"/);
  assert.doesNotMatch(html, /role="(?:tab|tablist)"|aria-selected=/);
  for (const button of buttons(html)) {
    assert.match(button[1], /type="button"/);
    assert.doesNotMatch(button[1], /role=|tabindex=|disabled/);
  }
});

test("All is the only pressed blog filter before a category is selected", () => {
  const rendered = buttons(renderFilter(null));
  assert.equal(rendered.length, categories.length + 1);
  assert.match(rendered[0][1], /aria-pressed="true"/);
  for (const button of rendered.slice(1)) assert.match(button[1], /aria-pressed="false"/);
});

test("each active category is the only pressed filter and labels retain their order", () => {
  const expectedLabels = ["All", ...categories.map(category => BLOG_CATEGORIES[category].label)];
  for (const activeCategory of categories) {
    const rendered = buttons(renderFilter(activeCategory));
    assert.deepEqual(rendered.map(button => button[2]), expectedLabels);
    for (const [index, button] of rendered.entries()) {
      const expected = index > 0 && categories[index - 1] === activeCategory;
      assert.ok(button[1].includes(`aria-pressed="${expected}"`));
    }
  }
});

test("an empty category list still offers the native All reset button", () => {
  const rendered = buttons(renderFilter(null, []));
  assert.equal(rendered.length, 1);
  assert.equal(rendered[0][2], "All");
  assert.match(rendered[0][1], /type="button"/);
});
