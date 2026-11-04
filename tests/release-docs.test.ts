import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = (path: string) => readFileSync(path, "utf8");

test("the environment example uses the search-verification variables read by metadata", () => {
  const example = source(".env.local.example");
  const verification = source("src/lib/seo-verification.ts");
  for (const name of ["NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION", "NEXT_PUBLIC_BING_SITE_VERIFICATION"]) {
    assert.match(example, new RegExp(`^${name}=`, "m"));
    assert.ok(verification.includes(`process.env.${name}`));
  }
  assert.match(example, /^NEXT_PUBLIC_ANALYTICS_ENABLED=false$/m);
  assert.doesNotMatch(example, /^NEXT_PUBLIC_.*(?:SECRET|API_KEY)=/m);
});
