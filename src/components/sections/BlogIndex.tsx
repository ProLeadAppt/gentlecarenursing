"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BlogCard } from "@/components/sections/BlogCard";
import { BlogCategoryFilter } from "@/components/sections/BlogCategoryFilter";
import type { BlogCategory, BlogPost } from "@/content/blog";

interface Props {
  posts: BlogPost[];
  categories: BlogCategory[];
}

export default function BlogIndex({ posts, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | null>(
    null
  );

  const filteredPosts = activeCategory
    ? posts.filter((p) => p.category === activeCategory)
    : posts;

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

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "NDIS Services", href: "/ndis", body: "Best starting point for participants, families, and coordinators." },
            { label: "DVA Community Nursing", href: "/dva", body: "For veterans and families looking for eligible home nursing." },
            { label: "Our Services", href: "/services", body: "Browse the full service directory and choose by need or funding." },
            { label: "For Referrers", href: "/referrers", body: "Fast referral pathways for coordinators, discharge planners, and GPs." },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="group rounded-[1.5rem] border border-border/60 bg-muted/20 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-white hover:shadow-lg">
              <h3 className="text-base font-bold text-foreground group-hover:text-primary">{item.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </Link>
          ))}
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
