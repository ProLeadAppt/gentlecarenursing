import test from "node:test";
import assert from "node:assert/strict";
import { getAllBlogPosts } from "../src/content/blog";
import { getArticleSchema } from "../src/lib/schema";

test("existing organizational blog bylines are represented as Organizations", () => {
  const posts = getAllBlogPosts();
  assert.ok(posts.length > 0);
  for (const post of posts) {
    assert.equal(post.author.name, "Gentle Care Nursing Services");
    assert.equal(post.author.type, "Organization");
    const schema = getArticleSchema({...post, url:`https://gentlecarenursing.com.au/blog/${post.slug}`});
    assert.equal(schema.author["@type"], "Organization");
    assert.equal(schema.author.name, post.author.name);
    assert.ok(!("jobTitle" in schema.author));
    assert.equal(schema.datePublished, post.publishedAt);
    assert.equal(schema.dateModified, post.updatedAt ?? post.publishedAt);
  }
});
