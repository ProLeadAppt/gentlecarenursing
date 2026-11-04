/** Mocked commands only. No Google script is fetched or real analytics event sent. */
import test from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
const dom = new JSDOM("<!doctype html><html><body></body></html>", { url: "https://gentlecarenursing.com.au/", referrer: "https://www.google.com/search?q=private-health-details" });
for (const key of ["window", "self", "document", "HTMLElement", "Element", "Node", "Event"]) {
  Object.defineProperty(globalThis, key, { configurable: true, value: (dom.window as unknown as Record<string, unknown>)[key] });
}
Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });

test("initial page, SPA navigation and Back have one sanitized pageview; repeats have none", async () => {
  const { createElement: h, act } = await import("react");
  const { createRoot } = await import("react-dom/client");
  const { PathnameContext } = await import("next/dist/shared/lib/hooks-client-context.shared-runtime");
  const { AnalyticsPageViews } = await import("../src/components/analytics/AnalyticsPageViews");
  const calls: unknown[][] = [];
  window.gtag = (...args) => { calls.push(args); };
  const container = document.createElement("div"); document.body.append(container);
  const root = createRoot(container);
  async function render(path: string) {
    await act(async () => root.render(h(PathnameContext.Provider, { value: path }, h(AnalyticsPageViews, { gaId: "G-SYNTHETIC123" }))));
  }
  try {
    await render("/contact"); await render("/contact"); await render("/services/nursing-care"); await render("/contact");
    const events = calls.filter((call) => call[0] === "event");
    assert.equal(events.length, 3);
    assert.deepEqual(events.map((call) => (call[2] as Record<string, unknown>).page_referrer), [
      "https://www.google.com/", "https://gentlecarenursing.com.au/contact", "https://gentlecarenursing.com.au/services/nursing-care",
    ]);
    assert.ok(events.every((call) => call[1] === "page_view"));
    assert.doesNotMatch(JSON.stringify(calls), /private-health-details|search\?q=/);
    const configs = calls.filter((call) => call[0] === "config");
    assert.equal(configs.length, 3);
    for (const config of configs) {
      assert.equal((config[2] as Record<string, unknown>).ignore_referrer, false);
      assert.equal((config[2] as Record<string, unknown>).send_page_view, false);
    }
  } finally {
    await act(async () => root.unmount()); container.remove(); dom.window.close();
  }
});
