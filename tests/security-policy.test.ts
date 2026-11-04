import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import nextConfig from "../next.config";

test("application responses receive the same six policies as Netlify static files", async () => {
  const rules = await nextConfig.headers!();
  assert.equal(rules.length, 1);
  assert.deepEqual(Object.keys(rules[0]).sort(), ["headers", "source"]);
  assert.equal(rules[0].source, "/:path*");
  const headers = rules[0].headers;
  const expectedKeys = [
    "Content-Security-Policy", "Permissions-Policy", "Referrer-Policy",
    "Strict-Transport-Security", "X-Content-Type-Options", "X-Frame-Options",
  ];
  assert.deepEqual(headers.map(({ key }) => key).sort(), expectedKeys);
  const staticRules = readFileSync("netlify.toml", "utf8").split("[[headers]]")[1];
  assert.match(staticRules, /for = "\/\*"/);
  for (const { key, value } of headers) {
    const staticValue = staticRules.match(new RegExp(`^\\s*${key} = "([^\\n]+)"`, "m"))?.[1];
    assert.equal(value, staticValue, `${key} must not drift between HTML and static assets`);
    assert.doesNotMatch(value, /[\r\n]/);
  }
});

test("security headers do not replace route-specific content, cache or transport behavior", async () => {
  const rules = await nextConfig.headers!();
  const reserved = /^(?:content-type|content-length|cache-control|location|set-cookie|access-control-)/i;
  for (const rule of rules) {
    assert.equal(rule.has, undefined);
    assert.equal(rule.missing, undefined);
    for (const { key } of rule.headers) assert.doesNotMatch(key, reserved);
  }
  // Includes root, nested pages and unknown paths; Next's compiled route matcher
  // and real HTTP checks establish framework behavior beyond this config test.
  assert.equal(rules[0].source, "/:path*");
});

test("approved CSP cleanup removes only retired script and connection allowances", () => {
  const config = readFileSync("netlify.toml", "utf8");
  const policy = config.match(/Content-Security-Policy = "([^\n]+)"/)?.[1];
  assert.ok(policy);
  const directives = Object.fromEntries(policy.split(";").map((value) => value.trim()).filter(Boolean).map((value) => {
    const [name, ...sources] = value.split(/\s+/);
    return [name, sources];
  }));
  assert.doesNotMatch(policy, /searchatlas|clarity\.ms/);
  assert.ok(!directives["script-src"].includes("data:"));
  for (const value of ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://www.googletagmanager.com", "https://www.google-analytics.com"]) assert.ok(directives["script-src"].includes(value));
  assert.ok(directives["connect-src"].includes("https://region1.google-analytics.com"));
  assert.ok(directives["img-src"].includes("data:"));
  assert.match(config, /X-Frame-Options = "DENY"/);
  assert.match(config, /Strict-Transport-Security/);
});
