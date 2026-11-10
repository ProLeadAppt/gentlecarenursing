import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import postcss from "postcss";
import tailwind from "@tailwindcss/postcss";

test("Tailwind scans application sources, not escaped test HTML", async () => {
  const source = readFileSync("src/app/globals.css", "utf8");
  assert.ok(source.startsWith('@import "tailwindcss" source("../");'));
  const result = await postcss([tailwind()]).process(source, { from: "src/app/globals.css" });
  const urls = [...result.css.matchAll(/url\(([^)]*)\)/g)].map(match => match[1]);
  assert.ok(urls.some(url => url.includes("data:image/svg+xml")), "real Select SVG utility must remain");
  assert.ok(urls.every(url => !url.includes("&#") && !url.includes("&quot;")), "escaped fixture classes must not generate asset references");
  assert.ok(result.css.includes(".flex"));
  assert.ok(result.css.includes(".sr-only"));
});
