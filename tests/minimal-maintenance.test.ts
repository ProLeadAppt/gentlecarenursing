import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import nextConfig from "../next.config";

test("application adds only the four baseline non-CSP response policies", async () => {
  const rules = await nextConfig.headers!();
  assert.equal(rules.length, 1);
  assert.equal(rules[0].source, "/:path*");
  assert.deepEqual(Object.keys(rules[0]).sort(), ["headers", "source"]);
  assert.deepEqual(rules[0].headers.map(({ key }) => key).sort(), [
    "Permissions-Policy", "Referrer-Policy", "X-Content-Type-Options", "X-Frame-Options",
  ]);
  const existing = readFileSync("netlify.toml", "utf8").split("[[headers]]")[1];
  for (const { key, value } of rules[0].headers) {
    assert.equal(value, existing.match(new RegExp(`^\\s*${key} = "([^\\n]+)"`, "m"))?.[1]);
    assert.doesNotMatch(value, /[\r\n]/);
  }
});

test("minimal application header rule does not add script, transport, cache or MIME policy", async () => {
  const headers = (await nextConfig.headers!()).flatMap(rule => rule.headers);
  for (const { key } of headers) {
    assert.doesNotMatch(key, /^(?:Content-Security-Policy|Strict-Transport-Security|Content-Type|Cache-Control|Set-Cookie|Location|Access-Control-)/i);
  }
  assert.deepEqual(nextConfig.images?.formats, ["image/avif", "image/webp"]);
  assert.equal(nextConfig.experimental, undefined);
  assert.equal(nextConfig.typescript?.ignoreBuildErrors, undefined);
});
