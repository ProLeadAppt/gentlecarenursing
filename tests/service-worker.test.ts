import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";

type Event = { waitUntil?: (value: Promise<unknown>) => void; request?: { method: string; mode: string }; respondWith?: (value: Promise<Response>) => void };
function worker(offline: Response | null = new Response("offline")) {
  const handlers: Record<string, (event: Event) => void> = {};
  const deleted: string[] = [];
  const stored: string[] = [];
  const cache = { addAll: async (urls: string[]) => { stored.push(...urls); }, match: async () => offline };
  runInNewContext(readFileSync("public/sw.js", "utf8"), {
    self: { addEventListener: (name: string, handler: (event: Event) => void) => { handlers[name] = handler; }, skipWaiting: async () => {}, clients: { claim: async () => {} } },
    caches: { open: async () => cache, keys: async () => ["gcn-shell-v1", "gcn-shell-v2", "unrelated-cache"], delete: async (key: string) => { deleted.push(key); } },
    fetch: async () => { throw new Error("Offline"); }, Response,
  });
  return { handlers, deleted, stored };
}

test("service worker caches only public fallback assets and removes only its own old cache", async () => {
  const w = worker();
  let pending: Promise<unknown> | undefined;
  const event = { waitUntil: (value: Promise<unknown>) => { pending = value; } };
  w.handlers.install(event);
  await pending;
  assert.deepEqual(w.stored, ["/offline.html", "/icons/icon-192.png"]);
  w.handlers.activate(event);
  await pending;
  assert.deepEqual(w.deleted, ["gcn-shell-v1"]);
});

test("service worker ignores submissions and non-navigation requests", () => {
  const w = worker();
  for (const request of [{ method: "POST", mode: "navigate" }, { method: "GET", mode: "cors" }]) {
    w.handlers.fetch({ request, respondWith: () => assert.fail("Must not intercept") });
  }
});

test("offline navigation returns fallback even if the cache has been evicted", async () => {
  for (const available of [true, false]) {
    const w = worker(available ? new Response("cached fallback") : null);
    let pending: Promise<Response> | undefined;
    w.handlers.fetch({ request: { method: "GET", mode: "navigate" }, respondWith: (value) => { pending = value; } });
    const response = await pending;
    assert.ok(response);
    assert.equal(response.status, available ? 200 : 503);
    assert.equal(await response.text(), available ? "cached fallback" : "You are offline. For a medical emergency in Australia, call 000.");
    if (!available) assert.equal(response.headers.get("Cache-Control"), "no-store");
  }
});

test("service worker registration supports already-loaded documents", () => {
  const source = readFileSync("src/components/pwa/ServiceWorkerRegister.tsx", "utf8");
  assert.match(source, /document.readyState === "complete"/);
  assert.match(source, /addEventListener\("load", onLoad, \{ once: true \}\)/);
});
