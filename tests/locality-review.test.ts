import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { LOCALITY_REVIEW_DRAFTS, LOCALITY_REVIEW_SOURCES, isLocalityReviewEnabled } from "../src/content/locality-review";
import { getAllSuburbSlugs } from "../src/content/suburbs";
import { LOCALITY_REVIEW_FILES } from "./helpers/locality-review-files";

const nativeRequire = createRequire(import.meta.url);
nativeRequire.extensions[".css"] = () => undefined;
const route = nativeRequire("../src/app/locality-review/[[...suburb]]/page.tsx");
const index = nativeRequire("../src/app/locality-review/ReviewIndex.tsx");
const layout = nativeRequire("../src/app/locality-review/layout.tsx");
const slugs = ["north-strathfield", "homebush", "concord-west", "homebush-west", "rhodes"];

async function inEnvironment(context: string | undefined, nodeEnv: string, run: () => unknown | Promise<unknown>) {
  const originalContext = process.env.CONTEXT;
  const originalNodeEnv = process.env.NODE_ENV;
  if (context === undefined) delete process.env.CONTEXT;
  else process.env.CONTEXT = context;
  Object.assign(process.env, { NODE_ENV: nodeEnv });
  try { return await run(); }
  finally {
    if (originalContext === undefined) delete process.env.CONTEXT; else process.env.CONTEXT = originalContext;
    if (originalNodeEnv === undefined) Reflect.deleteProperty(process.env, "NODE_ENV"); else Object.assign(process.env, { NODE_ENV: originalNodeEnv });
  }
}

test("review gate permits only deploy-preview or local development", () => {
  for (const CONTEXT of [undefined, "production", "branch-deploy", "preview", "Deploy-preview"]) {
    assert.equal(isLocalityReviewEnabled({ CONTEXT, NODE_ENV: "production" }), false);
  }
  assert.equal(isLocalityReviewEnabled({ CONTEXT: "deploy-preview", NODE_ENV: "production" }), true);
  assert.equal(isLocalityReviewEnabled({ NODE_ENV: "development" }), true);
});

test("production closes hub, layout and every draft after preview params were generated", async () => {
  await inEnvironment("deploy-preview", "production", () => assert.equal(route.generateStaticParams().length, 6));
  for (const context of [undefined, "production", "branch-deploy"]) await inEnvironment(context, "production", async () => {
    assert.deepEqual(route.generateStaticParams(), []);
    await assert.rejects(route.default({ params: Promise.resolve({ suburb: [] }) }), /NEXT_HTTP_ERROR_FALLBACK;404/);
    assert.throws(() => index.default(), /NEXT_HTTP_ERROR_FALLBACK;404/);
    assert.throws(() => layout.default({ children: null }), /NEXT_HTTP_ERROR_FALLBACK;404/);
    for (const suburb of slugs) {
      await assert.rejects(route.default({ params: Promise.resolve({ suburb: [suburb] }) }), /NEXT_HTTP_ERROR_FALLBACK;404/);
      assert.deepEqual(await route.generateMetadata({ params: Promise.resolve({ suburb: [suburb] }) }), {});
    }
  });
});

test("review routes have a fixed allowlist, static gate and no fallback", async () => {
  assert.equal(route.dynamic, "force-static");
  assert.equal(route.dynamicParams, false);
  assert.equal(route.revalidate, false);
  
  await inEnvironment("deploy-preview", "production", async () => {
    assert.deepEqual(route.generateStaticParams(), [{ suburb: [] }, ...slugs.map(suburb => ({ suburb: [suburb] }))]);
    await assert.rejects(route.default({ params: Promise.resolve({ suburb: ["not-approved"] }) }), /NEXT_HTTP_ERROR_FALLBACK;404/);
    await assert.rejects(route.default({ params: Promise.resolve({ suburb: ["homebush", "unexpected"] }) }), /NEXT_HTTP_ERROR_FALLBACK;404/);
  });
});

test("five drafts render useful questions, visible review limits and no forms or locality schema", async () => {
  await inEnvironment("deploy-preview", "production", async () => {
    for (const draft of LOCALITY_REVIEW_DRAFTS) {
      const html = renderToStaticMarkup(await route.default({ params: Promise.resolve({ suburb: [draft.slug] }) }));
      assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
      assert.ok(html.includes(draft.name));
      assert.ok(html.includes("For Gemma"));
      assert.ok(html.includes("editorial intent hypothesis"));
      assert.ok(html.includes("Clinical and operational content must be reviewed before publication"));
      assert.doesNotMatch(html, /<form\b|application\/ld\+json|href="\/(?:referral|contact)"|onSubmit|participant_id/);
      for (const id of ["prepare-enquiry", "review-notes"]) assert.ok(html.includes(`id="${id}"`));
      assert.equal((html.match(/<summary>/g) ?? []).length, draft.faqs.length + 1);
      const metadata = await route.generateMetadata({ params: Promise.resolve({ suburb: [draft.slug] }) });
      assert.equal(metadata.robots.index, false);
      assert.equal(metadata.robots.follow, false);
      assert.equal(metadata.alternates, undefined, "No proposed production canonical is emitted");
    }
    const hub = renderToStaticMarkup(createElement(index.default));
    assert.equal((hub.match(/class="review-index-card"/g) ?? []).length, 5);
    assert.ok(hub.includes("editorial intent hypotheses"));
    assert.ok(hub.includes("No form submissions") || hub.includes("no form submissions"));
    const shell = renderToStaticMarkup(createElement(layout.default, null, null));
    assert.ok(shell.includes("Draft for Gemma"));
    assert.equal(layout.metadata.robots.index, false);
  });
});

test("public suburb inventory, sitemap and coverage schema do not ingest review data", () => {
  assert.equal(getAllSuburbSlugs().length, 15);
  for (const slug of slugs) assert.ok(!getAllSuburbSlugs().includes(slug));
  const sitemap = nativeRequire("../src/app/sitemap.ts").default() as { url: string }[];
  assert.equal(sitemap.length, 88);
  assert.ok(sitemap.every(({ url }) => !url.includes("locality-review") && !slugs.some(slug => url.endsWith(`/suburbs/${slug}`))));
  for (const file of ["src/content/suburbs.ts", "src/app/sitemap.ts", "src/lib/schema.ts", "src/app/suburbs/page.tsx"]) {
    assert.ok(!readFileSync(file, "utf8").includes("locality-review"), file);
  }
});

test("draft evidence stays bounded and North Strathfield keeps the real office distinction", () => {
  assert.deepEqual(LOCALITY_REVIEW_DRAFTS.map(draft => draft.slug), slugs);
  assert.equal(new Set(LOCALITY_REVIEW_SOURCES.map(source => source.id)).size, LOCALITY_REVIEW_SOURCES.length);
  for (const draft of LOCALITY_REVIEW_DRAFTS) {
    assert.ok(draft.sections.length >= 3 && draft.faqs.length >= 4);
    for (const id of draft.sourceIds) assert.ok(LOCALITY_REVIEW_SOURCES.some(source => source.id === id), id);
    assert.ok(draft.reviewQuestions.length > 0);
    const text = JSON.stringify(draft);
    assert.doesNotMatch(text, /owner-confirmed coverage|coverage register identifies|within 24 hours|no waitlist|we partner with|we guarantee/i);
  }
  const north = LOCALITY_REVIEW_DRAFTS[0];
  assert.match(JSON.stringify(north), /Level 1\/5 George Street, North Strathfield/);
  assert.ok(!north.faqs.some(([q]) => q.includes("Does this page identify an office")));
});

test("historical inventory guards permit only the five exact review source files", () => {
  assert.deepEqual(LOCALITY_REVIEW_FILES, ["src/app/locality-review/[[...suburb]]/page.tsx", "src/app/locality-review/layout.tsx", "src/app/locality-review/ReviewIndex.tsx", "src/app/locality-review/review.css", "src/content/locality-review.ts"]);
  for (const file of LOCALITY_REVIEW_FILES) assert.ok(readFileSync(file, "utf8").length > 0);
});
