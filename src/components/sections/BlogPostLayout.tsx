import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CtaSection } from "@/components/sections/CtaSection";
import { BlogCard } from "@/components/sections/BlogCard";
import Link from "next/link";
import { CTA_LINKS } from "@/lib/constants";
import { Clock, Calendar, User } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/content/blog";
import { BLOG_CATEGORIES, getRelatedPosts } from "@/content/blog";

const RELATED_SERVICE_LINKS: Record<BlogPost["category"], { title: string; href: string; description: string }[]> = {
  ndis: [
    { title: "NDIS Services", href: "/ndis", description: "Explore our core NDIS support page and how we work with participants and coordinators." },
    { title: "Complex Care Support", href: "/services/complex-care", description: "Clinical support for PEG feeding, tracheostomy care, and higher-acuity home care." },
    { title: "Personal Care & Daily Support", href: "/services/personal-care", description: "Help with the daily routines that make independent living easier." },
  ],
  "aged-care": [
    { title: "Aged Care at Home", href: "/aged-care", description: "See how we help older Australians stay safe and comfortable at home." },
    { title: "Post-Hospital Nursing & Care", href: "/services/post-hospital-care", description: "Recovery support after discharge or a change in health status." },
    { title: "What Families Should Know About Aged Care", href: "/blog/what-families-should-know-about-aged-care", description: "A practical guide for families comparing home care options." },
  ],
  clinical: [
    { title: "Clinical Nursing at Home", href: "/services/nursing-care", description: "Home nursing, wound care, medication support, and clinical oversight." },
    { title: "Post-Hospital Nursing & Care", href: "/services/post-hospital-care", description: "The safest way to bridge discharge and recovery at home." },
    { title: "Palliative & End-of-Life Support", href: "/services/palliative-care", description: "Comfort-focused support for families and specialist teams." },
  ],
  "family-carers": [
    { title: "Support for Family Carers", href: "/blog/tips-for-family-carers-avoiding-burnout", description: "Practical strategies for carers carrying a lot at home." },
    { title: "Choosing the Right Home Care Provider", href: "/blog/choosing-the-right-home-care-provider", description: "How to compare providers without getting lost in jargon." },
    { title: "Referral Portal", href: "/referrers", description: "Fast, clear referral pathways for coordinators and professionals." },
  ],
};

interface BlogPostLayoutProps {
  post: BlogPost;
}

export function BlogPostLayout({ post }: BlogPostLayoutProps) {
  const cat = BLOG_CATEGORIES[post.category];
  const related = getRelatedPosts(post.slug, 3);

  return (
    <>
      <Section size="lg">
        <Container size="md">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: post.title },
            ]}
            className="mb-8"
          />

          {/* Category badge */}
          <span
            className={cn(
              "inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest mb-4",
              cat.color
            )}
          >
            {cat.label}
          </span>

          {/* Title */}
          <h1 className="font-[family-name:var(--font-serif)] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
            {post.title}
          </h1>

          {/* Meta bar */}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-b border-border/40 pb-6">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {post.author.name}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {new Date(post.publishedAt).toLocaleDateString("en-AU", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readingTimeMinutes} min read
            </span>
          </div>

          {/* Prose content */}
          <div
            className="mt-10 prose prose-lg max-w-none
              [&_h2]:font-[family-name:var(--font-serif)] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-4
              [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-5
              [&_ul]:text-muted-foreground [&_ul]:space-y-2 [&_ul]:mb-5 [&_ul]:pl-6 [&_ul]:list-disc
              [&_ol]:text-muted-foreground [&_ol]:space-y-2 [&_ol]:mb-5 [&_ol]:pl-6 [&_ol]:list-decimal
              [&_li]:leading-relaxed
              [&_strong]:text-foreground [&_strong]:font-semibold"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2 border-t border-border/40 pt-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </Container>
      </Section>

      {/* Related posts */}
      {related.length > 0 && (
        <Section variant="muted" size="lg">
          <Container>
            <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl font-bold text-foreground text-center mb-12">
              You Might Also Like
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Section className="bg-white border-t border-border/40" size="lg">
        <Container>
          <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl font-bold text-foreground text-center mb-4">
            Related services and next steps
          </h2>
          <p className="text-center text-muted-foreground font-medium max-w-2xl mx-auto mb-10">
            If you’re reading for guidance, these are the most useful service pages to open next.
          </p>
          <div className="grid gap-5 md:grid-cols-3">
            {RELATED_SERVICE_LINKS[post.category].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-[2rem] border border-border/60 bg-muted/20 p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/25 hover:bg-white hover:shadow-xl"
              >
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground font-medium">
                  {item.description}
                </p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary">
                  Open page
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <CtaSection
        title="Need Support?"
        description="Our clinical team is here to help. Get in touch to discuss your care needs."
        primaryCta={CTA_LINKS.requestCare}
        secondaryCta={CTA_LINKS.contact}
        variant="primary"
      />
    </>
  );
}
