import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import sitemap from "../src/app/sitemap";
import { SITE } from "../src/lib/constants";

const files = ["llms.txt", "llms-full.txt", "ai-index.json"];
const read = (file: string) => readFileSync(`public/${file}`, "utf8");

test("public machine indexes link only to existing routes and resources", () => {
  const routes = new Set(sitemap().map((entry) => new URL(entry.url).pathname));
  for (const file of files) {
    const links = [...read(file).matchAll(/https:\/\/gentlecarenursing\.com\.au[^\s"<>]*/g)];
    assert.ok(links.length > 15);
    for (const [link] of links) {
      const path = new URL(link).pathname;
      assert.ok(routes.has(path) || existsSync(`public${path}`) || path === "/sitemap.xml" || path === "/robots.txt", `${file}: ${path}`);
    }
  }
});

test("public machine indexes retain contact facts without unsupported claims", () => {
  const index = JSON.parse(read("ai-index.json"));
  assert.equal(index.entity.name, SITE.name);
  assert.equal(index.entity.phone, SITE.phone);
  assert.equal(index.entity.email, SITE.email);
  assert.equal(index.entity.address, SITE.address);
  for (const file of files) {
    const text = read(file);
    assert.doesNotMatch(text, /within\s+24|24.hour|urgent referrals prioritised|MedicalService|AggregateRating|citation.ready|registered NDIS provider|DVA Contracted|dateChecked|lastUpdated|Last updated/i);
    assert.match(text, /Do not include detailed medical records, identity documents, payment details or NDIS plan numbers/);
    assert.match(text, /permission.*authority/);
    assert.match(text, /discuss availability and next steps/);
    assert.match(text, /call 000/);
    assert.match(text, /\/privacy/);
  }
});

test("offline fallback distinguishes medical emergencies from routine enquiries", () => {
  const html = read("offline.html");
  assert.match(html, /medical emergency.*tel="?000|medical emergency.*href="tel:000"/);
  assert.match(html, /Routine care enquiries: 1300 004 267/);
  assert.doesNotMatch(html, /urgent help.*call us/i);
});
