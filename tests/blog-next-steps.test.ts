import test from "node:test";
import assert from "node:assert/strict";
import { getAllBlogPosts } from "../src/content/blog";
import { getBlogNextSteps } from "../src/content/blog-navigation";

test("all existing article next-step cards exclude the current article and have distinct destinations", () => {
  for (const post of getAllBlogPosts()) {
    const cards=getBlogNextSteps(post);
    assert.ok(cards.length >= 2 && cards.length <= 3);
    assert.ok(cards.every(card=>card.href!==`/blog/${post.slug}`));
    assert.equal(new Set(cards.map(card=>card.href)).size,cards.length);
  }
});
test("the three self-linking guides now expose two next steps", () => {
  const slugs=["what-families-should-know-about-aged-care","tips-for-family-carers-avoiding-burnout","choosing-the-right-home-care-provider"];
  const posts=getAllBlogPosts().filter(post=>slugs.includes(post.slug));
  assert.equal(posts.length,3);
  for(const post of posts) assert.equal(getBlogNextSteps(post).length,2);
});
