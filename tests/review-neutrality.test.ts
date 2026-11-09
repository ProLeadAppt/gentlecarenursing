import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { NextRequest } from "next/server";
import { ReviewFunnel } from "../src/components/review/ReviewFunnel";
import { SITE } from "../src/lib/constants";
import { POST } from "../src/app/api/feedback/route";

test("everyone sees the same Google and private feedback choices before rating", () => {
  const html = renderToStaticMarkup(createElement(ReviewFunnel));
  assert.ok(html.includes(`href="${SITE.gbpReviewUrl.replaceAll('&', '&amp;')}"`));
  assert.match(html, /Leave a Google review/);
  assert.match(html, /Send private feedback/);
  assert.match(html, /aria-expanded="false"/);
  assert.doesNotMatch(html, /role="radio"/);
  const linkClass = html.match(/<a[^>]*class="([^"]+)"[^>]*>Leave a Google review/)?.[1];
  const buttonClass = html.match(/<button[^>]*class="([^"]+)"/)?.[1];
  assert.ok(linkClass);
  assert.equal(linkClass, buttonClass);
});

test("rating cannot trigger a Google redirect or hide the public choice", () => {
  const funnel = readFileSync("src/components/review/ReviewFunnel.tsx", "utf8");
  assert.doesNotMatch(funnel, /window\.location|rating\s*[<>]=?\s*[34]|value\s*[<>]=?\s*[34]/);
  assert.match(funnel, /<StarRating onContinue=\{setRating\}/);
  const stars = readFileSync("src/components/review/StarRating.tsx", "utf8");
  assert.doesNotMatch(stars, /sharing the good|not to the public|funnel to Google/);
});

test("all five ratings pass validation without sending a message when delivery is unconfigured", async () => {
  const previousKey = process.env.RESEND_API_KEY;
  delete process.env.RESEND_API_KEY;
  const messages: unknown[][] = [];
  const originalError = console.error;
  console.error = (...args: unknown[]) => { messages.push(args); };
  try {
    for (const rating of [1, 2, 3, 4, 5]) {
      const response = await POST(new NextRequest("http://localhost/api/feedback", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, name: "PRIVATE_TEST_SENTINEL" }),
      }));
      assert.equal(response.status, 503, `rating ${rating} must reach delivery guard`);
      assert.equal((await response.json()).success, false);
    }
    assert.ok(!JSON.stringify(messages).includes("PRIVATE_TEST_SENTINEL"));
    for (const rating of [0, 6, "5", null, 1.5]) {
      const response = await POST(new NextRequest("http://localhost/api/feedback", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ rating }),
      }));
      assert.equal(response.status, 400);
    }
  } finally {
    console.error = originalError;
    if (previousKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = previousKey;
  }
});

test("private flow retains keyboard focus hooks and announces selected rather than preview rating", () => {
  const funnel = readFileSync("src/components/review/ReviewFunnel.tsx", "utf8");
  assert.match(funnel, /feedbackButtonRef\.current\?\.focus\(\)/);
  assert.match(funnel, /onAnimationComplete=/);
  assert.match(funnel, /definition === "enter"/);
  assert.match(funnel, /role="status" aria-live="polite"/);
  assert.match(funnel, /<h2 tabIndex=\{-1\}/);
  const stars = readFileSync("src/components/review/StarRating.tsx", "utf8");
  assert.match(stars, /\{selected\} out of 5/);
  assert.match(stars, /onBlur=\{\(\) => setHovered\(null\)\}/);
});
