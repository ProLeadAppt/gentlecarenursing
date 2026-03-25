"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BlogCard } from "@/components/sections/BlogCard";
import { BlogCategoryFilter } from "@/components/sections/BlogCategoryFilter";
import {
  getAllBlogPosts,
  getAllBlogCategories,
  type BlogCategory,
} from "@/content/blog";

const allPosts = getAllBlogPosts();
const categories = getAllBlogCategories();

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | null>(
    null
  );

  const filteredPosts = activeCategory
    ? allPosts.filter((p) => p.category === activeCategory)
    : allPosts;

  return (
    <Section size="lg">
      <Container>
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Blog" }]}
          className="mb-6"
        />

        <div className="max-w-2xl">
          <Heading
            level="h1"
            as="h1"
            className="font-[family-name:var(--font-serif)] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
          >
            Blog
          </Heading>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Practical advice, clinical insights, and care tips for families,
            carers, and professionals.
          </p>
        </div>

        {/* Category filter */}
        <div className="mt-10">
          <BlogCategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onChange={setActiveCategory}
          />
        </div>

        {/* Posts grid */}
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <p className="mt-16 text-center text-muted-foreground">
            No posts found in this category yet.
          </p>
        )}
      </Container>
    </Section>
  );
}
