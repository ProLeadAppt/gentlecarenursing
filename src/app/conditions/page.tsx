import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CTA_LINKS } from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";
import { INTEGRATIONS } from "@/config/integrations";
import { getBreadcrumbListSchema } from "@/lib/schema";
import { CONDITIONS } from "@/content/conditions";
import { ArrowRight, HeartPulse } from "lucide-react";

const canonical = `${INTEGRATIONS.siteUrl}/conditions`;

export const metadata = createMetadata({
  title: "In-Home Nursing by Condition",
  description:
    "Condition-specific in-home nursing and care across Sydney — MS, MND, Parkinson's, spinal cord injury, ABI, and cerebral palsy. Each page covers Sydney specialist coordination, funding, and what we deliver.",
  canonical,
});

/**
 * /conditions — index of condition-specific in-home care pages.
 *
 * Each /conditions/[slug] page reuses ServicePageLayout but is routed
 * under /conditions for entity / hierarchy clarity. This index page
 * serves three purposes:
 *
 *   1. Resolves the breadcrumb path each child page emits
 *      (Home → Conditions → [condition])
 *   2. Surfaces the full list to humans navigating the site
 *   3. Emits CollectionPage schema with each condition as a hasPart
 *      Article node — strong AI entity-graph signal binding the
 *      conditions together.
 */

const breadcrumbItems = [
  { name: "Home", item: "/" },
  { name: "Conditions", item: "/conditions" },
];

export default function ConditionsIndexPage() {
  const schemas = [
    getBreadcrumbListSchema(breadcrumbItems),
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "In-Home Nursing by Condition",
      url: canonical,
      description:
        "Condition-specific in-home nursing and care across Sydney for specific clinical conditions.",
      isPartOf: { "@type": "WebSite", url: INTEGRATIONS.siteUrl },
      hasPart: CONDITIONS.map((c) => ({
        "@type": "Article",
        headline: c.data.title,
        url: `${INTEGRATIONS.siteUrl}/conditions/${c.slug}`,
        description: c.data.snippetAnswer,
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
              { label: "Conditions" },
            ]}
            className="mb-8"
          />

          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary/80">
            <HeartPulse className="h-3 w-3" /> Conditions
          </span>

          <Heading
            level="h1"
            as="h1"
            className="font-[family-name:var(--font-serif)] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight"
          >
            In-home nursing by condition
          </Heading>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground">
            We provide condition-specific in-home nursing and personal care
            across Sydney for people living with specific clinical conditions.
            Each page sets out what care looks like, who it's for, the Sydney
            specialist services we coordinate with, and how funding usually
            works.
          </p>
        </Container>
      </Section>

      <Section size="md" variant="default">
        <Container size="md">
          <div className="grid gap-6 md:grid-cols-2">
            {CONDITIONS.map((c) => (
              <Link
                key={c.slug}
                href={`/conditions/${c.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-border/60 bg-card/40 p-7 transition-all duration-500 hover:border-primary/40 hover:bg-card/70 hover:shadow-lg"
              >
                <Heading
                  level="h2"
                  as="h2"
                  className="text-xl font-bold font-[family-name:var(--font-serif)] group-hover:text-primary transition-colors"
                >
                  {c.data.title}
                </Heading>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {c.data.snippetAnswer}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary group-hover:gap-3 transition-all">
                  Read more <ArrowRight className="h-4 w-4" />
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
            Not sure if we cover your situation?
          </Heading>
          <p className="mt-4 mx-auto max-w-2xl text-base text-muted-foreground">
            We support people with a wide range of clinical conditions at home,
            not only the ones listed here. Tell us about your situation and
            we'll let you know how we can help.
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
