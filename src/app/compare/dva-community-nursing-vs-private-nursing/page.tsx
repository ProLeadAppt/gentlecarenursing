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
import { COMPARE_DVA_VS_PRIVATE_NURSING as PAGE } from "@/content/compare-dva-vs-private-nursing";
import { ArrowRight, Scale, Stethoscope, Wallet, BookOpen } from "lucide-react";

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
 * /compare/dva-community-nursing-vs-private-nursing
 *
 * Targets the intent intersection of query 2 (DVA community nursing
 * Sydney) and query 8 (private nursing Sydney cost) in
 * docs/AI_VISIBILITY_LOG.md. Veterans, war widows/widowers, and families
 * regularly ask "should I use DVA or pay privately" and no Sydney
 * provider has a clean, balanced page on it. Same structural template
 * as the registered-vs-non-registered comparison so the AEO patterns
 * stay consistent across all /compare/* pages:
 *
 *   1. H1 + 50-60 word self-contained snippet answer
 *   2. Real <table> for the side-by-side (extractable by AI)
 *   3. Each H2 is a question, lead paragraphs 40-60 words, self-contained
 *   4. FAQPage JSON-LD matching the visible FAQ block
 *   5. BreadcrumbList JSON-LD
 *   6. Closing block is the only direct Gentle Care anchor — credibility
 *      from the comparison being genuinely useful, not from leading with
 *      a sales pitch.
 */

const breadcrumbItems = [
  { name: "Home", item: "/" },
  { name: "Compare", item: "/compare" },
  { name: "DVA Community Nursing vs Private Nursing", item: PAGE.canonicalPath },
];

export default function CompareDvaVsPrivateNursingPage() {
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
        { "@type": "Thing", name: "DVA Community Nursing" },
        { "@type": "Thing", name: "Private in-home nursing" },
        { "@type": "Thing", name: "Veteran in-home nursing in Sydney" },
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
              { label: "DVA vs Private Nursing" },
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
            Side-by-side: DVA Community Nursing vs private in-home nursing
          </Heading>
          <p className="mb-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
            The practical differences for Sydney veterans and families. Both
            options can deliver excellent care — the right one depends on
            eligibility, scope, and the trade-off between speed and cost.
          </p>

          <ComparisonTable
            leftHeader="DVA Community Nursing"
            rightHeader="Private In-Home Nursing"
            rows={PAGE.comparisonRows}
            caption="Comparison of DVA Community Nursing and private in-home nursing across eligibility, cost, referral, scope, scheduling, provider choice, and the option to combine the two."
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
                    <Stethoscope className="h-4 w-4" />
                  ) : idx === 1 ? (
                    <Wallet className="h-4 w-4" />
                  ) : idx === 2 ? (
                    <BookOpen className="h-4 w-4" />
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
            Plain-English answers to the questions most often asked about DVA
            Community Nursing and private in-home nursing in Sydney.
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
        title="Need a DVA Contracted Community Nursing Provider in Sydney?"
        description="We work with eligible Veteran Card holders under DVA Community Nursing and with private clients alongside. Tell us your situation and we'll get back to you within 24 hours."
        primaryCta={CTA_LINKS.requestCare}
        secondaryCta={CTA_LINKS.contact}
        variant="primary"
      />
    </>
  );
}
