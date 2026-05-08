import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { CtaSection } from "@/components/sections/CtaSection";
import { CTA_LINKS } from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";
import { INTEGRATIONS } from "@/config/integrations";
import {
  getBreadcrumbListSchema,
  getFaqSchema,
} from "@/lib/schema";
import { COMPARE_REGISTERED_VS_UNREGISTERED as PAGE } from "@/content/compare-registered-vs-unregistered";
import { ArrowRight, Scale, ShieldCheck, Users, BookOpen } from "lucide-react";

const canonical = `${INTEGRATIONS.siteUrl}${PAGE.canonicalPath}`;

export const metadata = createMetadata({
  title: PAGE.metaTitle,
  description: PAGE.metaDescription,
  canonical,
  openGraph: {
    images: [
      {
        url: "/images/og/default.png",
        width: 1200,
        height: 630,
        alt: PAGE.metaTitle,
      },
    ],
  },
});

/**
 * /compare/registered-ndis-provider-vs-non-registered
 *
 * Targets query 10 in docs/AI_VISIBILITY_LOG.md ("registered NDIS provider
 * vs non-registered NDIS provider"), which had zero Sydney providers in
 * the top 10 at baseline. Page is structured around the formats AI engines
 * extract:
 *
 *   1. H1 + 50-60 word self-contained snippet answer (featured-snippet shape)
 *   2. Real <table> for the side-by-side (extracts cleanly into AI summaries)
 *   3. Each H2 is a question, each lead paragraph is 40-60 words and
 *      self-contained (the AEO-citable shape)
 *   4. FAQPage JSON-LD (matches the visible FAQ block)
 *   5. BreadcrumbList JSON-LD (helps Google understand page hierarchy)
 *   6. Closing block is the only Gentle Care anchor — credibility comes
 *      from the comparison being genuinely useful, not from leading with
 *      a sales pitch.
 */

const breadcrumbItems = [
  { name: "Home", item: "/" },
  { name: "Compare", item: "/compare" },
  { name: "Registered vs Non-Registered NDIS Provider", item: PAGE.canonicalPath },
];

export default function CompareRegisteredVsUnregisteredPage() {
  const schemas = [
    getBreadcrumbListSchema(breadcrumbItems),
    getFaqSchema([...PAGE.faqs]),
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: PAGE.h1,
      description: PAGE.snippetAnswer,
      url: canonical,
      mainEntityOfPage: canonical,
      author: { "@id": `${INTEGRATIONS.siteUrl}/#organization` },
      publisher: { "@id": `${INTEGRATIONS.siteUrl}/#organization` },
      about: [
        { "@type": "Thing", name: "NDIS provider registration" },
        { "@type": "Thing", name: "NDIS Quality and Safeguards Commission" },
        { "@type": "Thing", name: "NDIS Practice Standards" },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      {/* Hero / opening */}
      <Section size="lg" variant="card">
        <Container size="md">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Registered vs Non-Registered NDIS Provider" },
            ]}
            className="mb-8"
          />

          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary/80">
            <Scale className="h-3 w-3" /> Comparison
          </span>

          <Heading
            level="h1"
            as="h1"
            className="font-[family-name:var(--font-serif)] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight"
          >
            {PAGE.h1}
          </Heading>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground">
            {PAGE.snippetAnswer}
          </p>

          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
            {PAGE.intro}
          </p>
        </Container>
      </Section>

      {/* Side-by-side table */}
      <Section size="md" variant="default">
        <Container size="md">
          <Heading
            level="h2"
            as="h2"
            className="mb-6 text-2xl sm:text-3xl font-bold tracking-tight font-[family-name:var(--font-serif)]"
          >
            Side-by-side: registered vs non-registered NDIS provider
          </Heading>
          <p className="mb-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
            The differences that actually matter day-to-day. Both sides can
            deliver excellent care — registration is one factor, not the only one.
          </p>

          <ComparisonTable
            leftHeader="Registered NDIS Provider"
            rightHeader="Non-Registered NDIS Provider"
            rows={PAGE.comparisonRows}
            caption="Comparison of registered and non-registered NDIS providers across audit, eligibility, scope, pricing, complaints, worker screening, continuity, and typical Sydney in-home nursing scope."
          />
        </Container>
      </Section>

      {/* Body sections */}
      <Section size="md" variant="muted">
        <Container size="md" className="space-y-14">
          {PAGE.sections.map((section, idx) => (
            <article key={section.id} id={section.id} className="scroll-mt-24">
              <div className="flex items-start gap-4">
                <div
                  className="mt-1 hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-primary ring-1 ring-primary/15 sm:flex"
                  aria-hidden
                >
                  {idx === 0 ? (
                    <ShieldCheck className="h-4 w-4" />
                  ) : idx === 1 ? (
                    <BookOpen className="h-4 w-4" />
                  ) : idx === 2 ? (
                    <Users className="h-4 w-4" />
                  ) : (
                    <Scale className="h-4 w-4" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <Heading
                    level="h2"
                    as="h2"
                    className="text-xl sm:text-2xl font-bold tracking-tight font-[family-name:var(--font-serif)]"
                  >
                    {section.heading}
                  </Heading>
                  <p className="mt-3 text-base leading-relaxed text-foreground">
                    {section.leadParagraph}
                  </p>
                  {section.body?.map((para, i) => (
                    <p
                      key={i}
                      className="mt-3 text-base leading-relaxed text-muted-foreground"
                    >
                      {para}
                    </p>
                  ))}
                  {section.bullets && (
                    <ul className="mt-4 space-y-2">
                      {section.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-3 text-base leading-relaxed text-muted-foreground"
                        >
                          <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                            aria-hidden
                          />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </article>
          ))}
        </Container>
      </Section>

      {/* FAQ — matches the FAQPage JSON-LD above */}
      <Section size="md" variant="default">
        <Container size="md">
          <Heading
            level="h2"
            as="h2"
            className="mb-2 text-2xl sm:text-3xl font-bold tracking-tight font-[family-name:var(--font-serif)]"
          >
            Frequently asked questions
          </Heading>
          <p className="mb-8 text-base text-muted-foreground">
            Plain-English answers to the questions most often asked about
            registered vs non-registered NDIS providers.
          </p>

          <FaqAccordion
            items={PAGE.faqs.map((f) => ({
              id: f.id,
              question: f.question,
              answer: f.answer,
            }))}
            allowMultiple={false}
          />
        </Container>
      </Section>

      {/* Closing — soft Gentle Care anchor with internal links */}
      <Section size="md" variant="muted">
        <Container size="md">
          <Heading
            level="h2"
            as="h2"
            className="text-2xl sm:text-3xl font-bold tracking-tight font-[family-name:var(--font-serif)]"
          >
            {PAGE.closing.heading}
          </Heading>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
            {PAGE.closing.body}
          </p>
          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {PAGE.closing.internalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
                >
                  {link.label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Final CTA — same shape as the rest of the site */}
      <CtaSection
        title="Need a registered NDIS provider in Sydney?"
        description="We work with NDIA-managed, plan-managed, and self-managed participants. Tell us what support you need and we'll get back to you within 24 hours."
        primaryCta={CTA_LINKS.requestCare}
        secondaryCta={CTA_LINKS.contact}
        variant="primary"
      />
    </>
  );
}
