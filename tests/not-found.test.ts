import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { JSDOM } from "jsdom";
import NotFound from "../src/app/not-found";
import sitemap from "../src/app/sitemap";

const retiredPaths = [
  "/compare/dva-community-nursing-vs-private-nursing",
  "/compare/in-home-nursing-vs-residential-aged-care",
];

test("404 recovery offers clearly labelled current home-care information without claiming a replacement", () => {
  const dom = new JSDOM(renderToStaticMarkup(createElement(NotFound)));
  try {
    const document = dom.window.document;
    assert.equal(document.querySelectorAll("h1").length, 1);
    assert.match(document.querySelector("h1")!.textContent!, /couldn't find this page/);
    const nav = document.querySelector('nav[aria-labelledby="not-found-care-heading"]')!;
    assert.ok(document.getElementById(nav.getAttribute("aria-labelledby")!));
    assert.match(nav.textContent!, /home-based services/);
    assert.deepEqual([...nav.querySelectorAll("a")].map((link) => [link.getAttribute("href"), link.textContent?.trim()]), [
      ["/dva", "DVA community nursing"],
      ["/private-nursing", "Private nursing and personal care"],
      ["/services/nursing-care", "Nursing care at home"],
      ["/aged-care", "In-home aged care"],
    ]);
    for (const href of ["/", "/services", "/contact", "/faq"]) assert.ok(document.querySelector(`a[href="${href}"]`));
    for (const icon of nav.querySelectorAll("svg")) assert.equal(icon.getAttribute("aria-hidden"), "true");
    assert.equal(document.querySelector("form, meta[http-equiv='refresh']"), null);
    assert.doesNotMatch(nav.textContent!, /residential care provider|replacement comparison|automatically redirect/i);
    const ids = [...document.querySelectorAll("[id]")].map((element) => element.id);
    assert.equal(new Set(ids).size, ids.length);
  } finally {
    dom.window.close();
  }
});

test("retired comparison paths stay absent from routes, sitemap and redirect configuration", () => {
  assert.equal(existsSync("src/app/compare"), false);
  const urls = sitemap().map((entry) => new URL(entry.url).pathname);
  const configs = ["next.config.ts", "netlify.toml", "public/_redirects"].filter(existsSync).map((path) => readFileSync(path, "utf8")).join("\n");
  assert.doesNotMatch(configs, /["'`]\/compare(?:\/|["'`])/);
  for (const path of retiredPaths) {
    assert.equal(urls.includes(path), false);
    assert.equal(configs.includes(path), false);
  }
  for (const path of ["dva", "private-nursing", "services/nursing-care", "aged-care"]) {
    assert.ok(existsSync(`src/app/${path}/page.tsx`));
    assert.ok(urls.includes(`/${path}`));
  }
});
