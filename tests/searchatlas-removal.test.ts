import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = (path: string) => readFileSync(join(root, path), "utf8");
const layout = read("src/app/layout.tsx");
const netlify = read("netlify.toml");
const csp = netlify.match(/Content-Security-Policy = "([^"]+)"/)?.[1];
assert.ok(csp, "Expected the existing static-response CSP");
const directives = Object.fromEntries(
  csp.split(";").filter((part) => part.trim()).map((part) => {
    const [name, ...values] = part.trim().split(/\s+/);
    return [name, values];
  })
);

function codeFiles(directory: string): string[] {
  return readdirSync(join(root, directory), { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? codeFiles(path) : /\.(?:tsx?|jsx?|html)$/.test(path) ? [path] : [];
  });
}

test("application and public code contain no SearchAtlas installation or injected markers", () => {
  // Scan raw source, not just script elements: Next can serialize a Script loader.
  for (const path of [...codeFiles("src"), ...codeFiles("public")]) {
    assert.doesNotMatch(read(path), /searchatlas\.com|sa-dynamic-optimization|1ca3ea08-0eb4-40c3-9058-7ee1a1f845d9|data-otto-pixel/i, path);
  }
});

test("remaining application code does not load a data-URI JavaScript bootstrap", () => {
  for (const path of [...codeFiles("src"), ...codeFiles("public")]) {
    assert.doesNotMatch(read(path), /data:(?:text|application)\/(?:javascript|ecmascript)/i, path);
  }
});

test("existing Google loader and initialization remain in the root layout", () => {
  assert.match(layout, /import Script from "next\/script"/);
  assert.ok(layout.includes("https://www.googletagmanager.com/gtag/js?id=${gaId}"));
  assert.ok(layout.includes('id="google-analytics" strategy="afterInteractive"'));
  assert.ok(layout.includes("window.dataLayer = window.dataLayer || [];"));
  assert.ok(layout.includes("function gtag(){dataLayer.push(arguments);}"));
  assert.ok(layout.includes("gtag('config', '${gaId}');"));
});

test("application and public code do not load Clarity after its approved removal", () => {
  for (const path of [...codeFiles("src"), ...codeFiles("public")]) {
    assert.doesNotMatch(read(path), /clarity\.ms\/tag|wmn8hytn79|window\.clarity/i, path);
  }
});

test("native metadata and root JSON-LD retain their owners", () => {
  assert.match(layout, /export const metadata: Metadata/);
  assert.match(layout, /type="application\/ld\+json"/);
  assert.ok(layout.includes("getLocalBusinessSchema(),"));
  assert.ok(layout.includes("getWebsiteSchema(),"));
  for (const path of ["src/lib/metadata.ts", "src/lib/schema.ts", "src/app/sitemap.ts", "src/app/robots.ts", "src/lib/seo-verification.ts"]) {
    assert.ok(read(path).length > 0, path);
  }
});

test("static-response CSP removes only the obsolete SearchAtlas script/connect permissions", () => {
  assert.deepEqual(directives, {
    "default-src": ["'self'"],
    "script-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://www.googletagmanager.com", "https://www.google-analytics.com", "https://www.clarity.ms"],
    "img-src": ["'self'", "data:", "https:"],
    "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
    "font-src": ["'self'", "https://fonts.gstatic.com"],
    "connect-src": ["'self'", "https://www.google-analytics.com", "https://region1.google-analytics.com", "https://www.clarity.ms", "https://*.clarity.ms"],
  });
  assert.doesNotMatch(netlify, /searchatlas/i);
});
