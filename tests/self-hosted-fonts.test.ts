import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

test("self-hosted fonts preserve the three families and avoid build-time downloads", () => {
  const layout = fs.readFileSync("src/app/layout.tsx", "utf8");
  const css = fs.readFileSync("src/app/fonts.css", "utf8");
  assert.doesNotMatch(layout, /next\/font\/google/);
  assert.match(layout, /import "\.\/fonts.css"/);
  for (const variable of ["source-sans", "dm-sans", "cormorant"]) {
    assert.ok(css.includes("--font-" + variable));
    assert.ok(layout.includes("font-" + variable));
  }
  assert.doesNotMatch(css, /https?:\/\//);
  const urls = [...css.matchAll(/url\((\/fonts\/[^)]+)\)/g)].map(m => m[1]);
  assert.equal(new Set(urls).size, 14);
  for (const url of urls) {
    const bytes = fs.readFileSync(path.join("public", url));
    assert.equal(bytes.subarray(0, 4).toString(), "wOF2");
  }
  const preloads = [...layout.matchAll(/rel="preload" href="(\/fonts\/[^"]+)"/g)].map(m => m[1]);
  assert.equal(preloads.length, 3);
  assert.deepEqual(preloads.sort(), [...new Set(urls)].filter(u => u.includes(".p.")).sort());
  assert.equal((css.match(/size-adjust:/g) || []).length, 3);
  for (const name of ["sourcesans3", "dmsans", "cormorantgaramond"]) {
    assert.match(fs.readFileSync("public/fonts/" + name + "-OFL.txt", "utf8"), /SIL OPEN FONT LICENSE/);
  }
});
