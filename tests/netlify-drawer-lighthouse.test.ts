import test from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import { readFileSync } from "node:fs";

const layout = readFileSync("src/app/layout.tsx", "utf8");
const script = layout
  .split("\n")
  .find((line) => line.includes("ntl-drawer-initial-state"))
  ?.match(/"(.+)"/)?.[1];

function hideDrawer(hostname: string, search: string) {
  assert.ok(script, "layout should set the Netlify drawer session key");
  const store = new Map<string, string>();
  const context = vm.createContext({
    location: { hostname, search },
    sessionStorage: {
      setItem(key: string, value: string) {
        store.set(key, value);
      },
    },
  });
  vm.runInContext(script, context);
  return store.get("ntl-drawer-initial-state");
}

test("preview pages tell Netlify's drawer to stay closed", () => {
  assert.equal(
    hideDrawer("deploy-preview-84--gentlecarenursing.netlify.app", ""),
    "hidden"
  );
  assert.equal(
    hideDrawer("6b082f86a79f5a65f0010a24--gentlecarenursing.netlify.app", ""),
    "hidden"
  );
  assert.equal(hideDrawer("localhost", ""), "hidden");
});

test("the live site and an explicit opt-in do not set the drawer key", () => {
  assert.equal(hideDrawer("gentlecarenursing.com.au", ""), undefined);
  assert.equal(hideDrawer("www.gentlecarenursing.com.au", ""), undefined);
  assert.equal(
    hideDrawer(
      "deploy-preview-84--gentlecarenursing.netlify.app",
      "?ntl-drawer-state=visible"
    ),
    undefined
  );
});
