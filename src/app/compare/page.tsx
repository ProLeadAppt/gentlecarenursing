import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CTA_LINKS } from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";
import { INTEGRATIONS } from "@/config/integrations";
import { getBreadcrumbListSchema } from "@/lib/schema";
import { ALL_COMPARES } from "@/content/compares";
import { ArrowRight, Scale } from "lucide-react";

const canonical = `${INTEGRATIONS.siteUrl}/compare`;

export const metadata = createMetadata({
  title: "Compare Care Options",
  description:
    "Plain-English side-by-side comparisons of the funding and provider choices Sydney families weigh up — NDIS registration, DVA Community Nursing vs private, and more.",
  canonical,
});

/**
 * /compare — index of comparison pages.
 *
 * Fixes two SEO issues identified in the pass-4 audit:
 *
 *   1. Each /compare/* page's BreadcrumbList schema referenced /compare as
 *      a parent path that didn't exist. Without this index page, Google's
 *      breadcrumb display in SERPs would degrade or get suppressed.
 *
 *   2. Both /compare/* pages were fully orphaned — not linked from any
 *      header, footer, service page, or other route. This index page,
 *      plus the new "Compare options" entry in the Services dropdown
 *      (NAV_LINKS in src/lib/constants.ts), plus the relatedCompareSlugs
 *      blocks on NDIS_PAGE / DVA_PAGE / PRIVATE_NURSING_PAGE, restore
 *      proper internal navigation and PageRank flow into them.
 *
 * Content is intentionally minimal — the index exists to navigate, not to
 * compete for organic traffic on its own keywords. Page weight signals
 * (title, description, breadcrumb schema) are correct but not aggressive.
 */

const breadcrumbItems = [
  { name: "Home", item: "/" },
  { name: "Compare", item: "/compare" },
];

export default function CompareIndexPage() {
  const schemas = [
    getBreadcrumbListSchema(breadcrumbItems),
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Compare Care Options",
      url: canonical,
      description:
        "Plain-English comparisons of the care funding and provider choices Sydney families weigh up.",
      isPartOf: { "@type": "WebSite", url: INTEGRATIONS.siteUrl },
      hasPart: ALL_COMPARES.map((c) => ({
        "@type": "Article",
        headline: c.title,
        url: `${INTEGRATIONS.siteUrl}${c.href}`,
        description: c.summary,
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      <Section size="lg" variant="card">
        <Container size="md">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Compare" },
            ]}
            className="mb-8"
          />

          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary/80">
            <Scale className="h-3 w-3" /> Compare
          </span>

          <Heading
            level="h1"
            as="h1"
            className="font-[family-name:var(--font-serif)] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight"
          >
            Compare care options
          </Heading>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground">
            Plain-English, balanced comparisons of the funding and provider
            choices that come up most often for Sydney families weighing up
            in-home care. Each comparison sets out who can use each option,
            what it covers, and the trade-offs that actually matter.
          </p>
        </Container>
      </Section>

      <Section size="md" variant="default">
        <Container size="md">
          <div className="grid gap-6 md:grid-cols-2">
            {ALL_COMPARES.map((compare) => (
              <Link
                key={compare.slug}
                href={compare.href}
                className="group flex h-full flex-col rounded-2xl border border-border/60 bg-card/40 p-7 transition-all duration-500 hover:border-primary/40 hover:bg-card/70 hover:shadow-lg"
              >
                <Heading
                  level="h2"
                  as="h2"
                  className="text-xl font-bold font-[family-name:var(--font-serif)] group-hover:text-primary transition-colors"
                >
                  {compare.title}
                </Heading>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {compare.summary}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary group-hover:gap-3 transition-all">
                  Read the comparison <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section size="md" variant="muted">
        <Container size="md" className="text-center">
          <Heading
            level="h2"
            as="h2"
            className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-serif)]"
          >
            Still not sure which fits your situation?
          </Heading>
          <p className="mt-4 mx-auto max-w-2xl text-base text-muted-foreground">
            Tell us a little about who needs support and what's been happening,
            and we'll talk through the options that apply to your situation.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={CTA_LINKS.requestCare.href}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
            >
              {CTA_LINKS.requestCare.label}
            </Link>
            <Link
              href={CTA_LINKS.contact.href}
              className="inline-flex h-11 items-center justify-center rounded-xl border border-border px-6 text-sm font-medium text-foreground transition hover:bg-muted/50"
            >
              {CTA_LINKS.contact.label}
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
