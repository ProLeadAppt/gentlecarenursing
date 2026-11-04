import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { inspectSeoScriptOwnership } from "../src/lib/seo-script-audit";
import { dispatchAnalyticsEvent } from "../src/lib/analytics";
import { INTEGRATIONS } from "../src/config/integrations";
import { buildPageViewParameters } from "../src/lib/analytics-pageviews";

const layout = readFileSync("src/app/layout.tsx", "utf8");

test("native schema owns root output with no legacy rewrite or replay loader", () => {
  assert.match(layout, /getLocalBusinessSchema\(\)/);
  assert.match(layout, /getWebsiteSchema\(\)/);
  assert.doesNotMatch(layout, /sa-dynamic-optimization|dynamic_optimization|data:text\/javascript|clarity\.ms|data-uuid/);
  assert.match(layout, /INTEGRATIONS\.analytics\.enabled \? INTEGRATIONS\.analytics\.gaId : ""/);
  assert.match(layout, /\{gaId \? <AnalyticsPageViews gaId=\{gaId\} \/> : null\}/);
});

test("retired CRM embeds and synthetic webhook script cannot be accidentally reenabled", () => {
  assert.equal(existsSync("src/components/embeds/GHLWidgets.tsx"), false);
  assert.equal(existsSync("test-webhooks.mjs"), false);
  assert.doesNotMatch(readFileSync("src/config/integrations.ts", "utf8"), /GHL_|ghl:/);
  assert.doesNotMatch(readFileSync("src/components/sections/QuickResponseSection.tsx", "utf8"), /GHLWidgets|voiceAssistantLine|quick-help/);
});

test("pageviews contain only allowlisted public paths without URL or title personal data", () => {
  assert.deepEqual(buildPageViewParameters("/contact?email=private@example.com#private"), {
    page_path: "/contact",
    page_location: "https://gentlecarenursing.com.au/contact",
    page_title: "Gentle Care Nursing Services",
    page_referrer: "",
  });
  assert.equal(buildPageViewParameters("/patient/private-name").page_path, "/unmatched");
  assert.equal(buildPageViewParameters("/review").page_path, "/unmatched");
});

test("manual pageviews do not opt into automatic pageviews or advertising signals", () => {
  const source = readFileSync("src/components/analytics/AnalyticsPageViews.tsx", "utf8");
  assert.match(source, /send_page_view: false/);
  assert.match(source, /allow_google_signals: false/);
  assert.match(source, /allow_ad_personalization_signals: false/);
  assert.doesNotMatch(source, /document\.title|location\.href/);
  assert.match(source, /buildPageViewParameters\(pathname, referrer\)/);
  assert.match(source, /ignore_referrer: page\.page_referrer === ""/);
});


test("HTML audit catches both direct and serialized legacy rewrite loaders", () => {
  for (const html of [
    '<script id="sa-dynamic-optimization" src="data:text/javascript;base64,encoded"></script>',
    '<script src="https://dashboard.searchatlas.com/scripts/dynamic_optimization.js"></script>',
    '<script>self.__next_f.push([1, "sa-dynamic-optimization"])</script>',
  ]) assert.deepEqual(inspectSeoScriptOwnership(html), ["LEGACY_SEO_REWRITE_LOADER"]);
  assert.deepEqual(inspectSeoScriptOwnership('<meta data-otto-pixel="dynamic-seo">'), ["REMOTE_SEO_MUTATION_MARKER"]);
  assert.deepEqual(inspectSeoScriptOwnership('<script type="application/ld+json">{}</script>'), []);
});

test("disabled analytics does not create a browser queue or send events", () => {
  const original = Object.getOwnPropertyDescriptor(globalThis, "window");
  const enabled = INTEGRATIONS.analytics.enabled;
  const browser = { location: { pathname: "/contact" } };
  try {
    Object.defineProperty(INTEGRATIONS.analytics, "enabled", { value: false, configurable: true });
    Object.defineProperty(globalThis, "window", { value: browser, configurable: true });
    dispatchAnalyticsEvent("generate_lead", { form_type: "contact" });
    assert.equal("dataLayer" in browser, false);
  } finally {
    Object.defineProperty(INTEGRATIONS.analytics, "enabled", { value: enabled, configurable: true });
    if (original) Object.defineProperty(globalThis, "window", original);
    else Reflect.deleteProperty(globalThis, "window");
  }
});
