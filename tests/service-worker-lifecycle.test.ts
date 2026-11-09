import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";

const workerSource = readFileSync("public/sw.js", "utf8");

type WorkerEvent = {
  waitUntil?: (promise: Promise<unknown>) => void;
  respondWith?: (promise: Promise<Response | undefined>) => void;
  request?: { mode: string; method?: string };
};

function harness(options: {
  keys?: string[];
  deleteCache?: (name: string) => Promise<boolean>;
  fetcher?: (request: unknown) => Promise<Response>;
  cacheOpenFailure?: Error;
  cachedResponse?: Response;
} = {}) {
  const handlers = new Map<string, (event: WorkerEvent) => void>();
  const deleted: string[] = [], opened: string[] = [], added: string[][] = [];
  const matches: string[] = [], calls: string[] = [], fetched: unknown[] = [];
  const onlineResponse = new Response("Synthetic online response", { status: 200 });
  const cache = {
    addAll: async (urls: string[]) => { added.push(Array.from(urls)); calls.push("addAll"); },
    match: async (url: string) => { matches.push(url); return options.cachedResponse; },
  };
  runInNewContext(workerSource, {
    self: {
      addEventListener: (name: string, handler: (event: WorkerEvent) => void) => handlers.set(name, handler),
      skipWaiting: async () => { calls.push("skipWaiting"); },
      clients: { claim: async () => { calls.push("claim"); } },
    },
    caches: {
      keys: async () => options.keys ?? [],
      delete: async (name: string) => { deleted.push(name); return options.deleteCache ? options.deleteCache(name) : true; },
      open: async (name: string) => {
        opened.push(name);
        if (options.cacheOpenFailure) throw options.cacheOpenFailure;
        return cache;
      },
    },
    fetch: async (request: unknown) => {
      fetched.push(request);
      return options.fetcher ? options.fetcher(request) : onlineResponse;
    },
  });
  async function lifecycle(name: string) {
    let pending: Promise<unknown> | undefined;
    handlers.get(name)!({ waitUntil: promise => { pending = promise; } });
    assert.ok(pending, `${name} must wait for its work`);
    await pending;
  }
  function request(mode: string, method = "GET") {
    let response: Promise<Response | undefined> | undefined;
    const request = { mode, method };
    handlers.get("fetch")!({ request, respondWith: promise => { response = promise; } });
    return { response, request };
  }
  return { lifecycle, request, deleted, opened, added, matches, calls, fetched, onlineResponse, handlers };
}

test("activation removes only old Gentle Care shell caches", async () => {
  const h = harness({ keys: ["gcn-shell-v1", "gcn-shell-v0", "gcn-shell-old", "other-app-cache", "next-static", "gcn-shell", "not-gcn-shell-v0"] });
  await h.lifecycle("activate");
  assert.deepEqual(h.deleted, ["gcn-shell-v0", "gcn-shell-old"]);
  assert.deepEqual(h.calls, ["claim"]);
});

test("activation leaves the current shell and unrelated-only inventories untouched", async () => {
  for (const keys of [[], ["gcn-shell-v1"], ["unrelated-cache"]]) {
    const h = harness({ keys }); await h.lifecycle("activate");
    assert.deepEqual(h.deleted, []); assert.deepEqual(h.calls, ["claim"]);
  }
});

test("activation waits for owned-cache cleanup before claiming clients", async () => {
  let finish: (value: boolean) => void = () => {};
  const h = harness({ keys: ["gcn-shell-v0"], deleteCache: () => new Promise(resolve => { finish = resolve; }) });
  const pending = h.lifecycle("activate");
  await new Promise(resolve => setImmediate(resolve));
  assert.deepEqual(h.calls, []);
  finish(true); await pending; assert.deepEqual(h.calls, ["claim"]);
});

test("failed owned-cache cleanup still rejects activation instead of claiming early", async () => {
  const h = harness({ keys: ["gcn-shell-v0"], deleteCache: async () => { throw new Error("Synthetic cleanup failure"); } });
  await assert.rejects(h.lifecycle("activate"), /Synthetic cleanup failure/);
  assert.deepEqual(h.calls, []);
});

test("install still caches only the offline page and icon before skipping waiting", async () => {
  const h = harness(); await h.lifecycle("install");
  assert.deepEqual(h.opened, ["gcn-shell-v1"]);
  assert.deepEqual(h.added, [["/offline.html", "/icons/icon-192.png"]]);
  assert.deepEqual(h.calls, ["addAll", "skipWaiting"]);
});

test("failed shell installation does not skip waiting", async () => {
  const h = harness({ cacheOpenFailure: new Error("Synthetic cache failure") });
  await assert.rejects(h.lifecycle("install"), /Synthetic cache failure/);
  assert.deepEqual(h.calls, []);
});

test("online navigation is still network passthrough with no page caching", async () => {
  const h = harness(); const { response, request } = h.request("navigate");
  assert.equal(await response, h.onlineResponse);
  assert.equal(h.fetched[0], request);
  assert.deepEqual(h.opened, []); assert.deepEqual(h.added, []);
});

test("offline navigation still returns the existing cached offline page", async () => {
  const offline = new Response("Synthetic offline page");
  const h = harness({ cachedResponse: offline, fetcher: async () => { throw new TypeError("Synthetic offline network"); } });
  assert.equal(await h.request("navigate").response, offline);
  assert.deepEqual(h.opened, ["gcn-shell-v1"]); assert.deepEqual(h.matches, ["/offline.html"]);
  assert.deepEqual(h.added, []);
});

test("non-navigation requests including enquiry POSTs are not intercepted or cached", () => {
  const h = harness();
  for (const [mode, method] of [["cors", "POST"], ["same-origin", "POST"], ["no-cors", "GET"]]) {
    assert.equal(h.request(mode, method).response, undefined);
  }
  assert.deepEqual(h.fetched, []); assert.deepEqual(h.opened, []);
});

test("HTTP error responses are preserved instead of replaced with the offline page", async () => {
  const error = new Response("Synthetic server error", { status: 503 });
  const h = harness({ fetcher: async () => error });
  assert.equal(await h.request("navigate").response, error);
  assert.deepEqual(h.opened, []);
});

test("registration handles an already-loaded page and uses a one-shot load listener otherwise", () => {
  const source = readFileSync("src/components/pwa/ServiceWorkerRegister.tsx", "utf8");
  assert.match(source, /if \(document.readyState === "complete"\) \{\s*onLoad\(\);\s*return;/);
  assert.match(source, /window.addEventListener\("load", onLoad, \{ once: true \}\)/);
  assert.match(source, /window.removeEventListener\("load", onLoad\)/);
});

test("registration retains production/support gates, script scope and silent rejection", () => {
  const source = readFileSync("src/components/pwa/ServiceWorkerRegister.tsx", "utf8");
  assert.match(source, /if \(!\("serviceWorker" in navigator\)\) return/);
  assert.match(source, /if \(process.env.NODE_ENV !== "production"\) return/);
  assert.match(source, /\.register\("\/sw.js", \{ scope: "\/" \}\)/);
  assert.match(source, /\.catch\(\(\) => \{/);
});
