import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { INTEGRATIONS } from "@/config/integrations";
import BlogIndex from "@/components/sections/BlogIndex";
import { getAllBlogPosts, getAllBlogCategories } from "@/content/blog";

export const metadata: Metadata = createMetadata({
  title: "Blog",
  description:
    "Practical guides and reflections on in-home nursing, NDIS, DVA, aged care, and supporting loved ones at home.",
  canonical: `${INTEGRATIONS.siteUrl}/blog`,
});

export default function BlogPage() {
  const posts = getAllBlogPosts();
  const categories = getAllBlogCategories();
  return <BlogIndex posts={posts} categories={categories} />;
}
