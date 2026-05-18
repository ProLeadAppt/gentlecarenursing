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
import { COMPARE_CLINICIAN_LED_VS_AGENCY as PAGE } from "@/content/compare-clinician-led-vs-agency-staff";
import { ArrowRight, Scale, Stethoscope, Users, BookOpen } from "lucide-react";

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
 * /compare/clinician-led-vs-agency-staff
 *
 * Fourth and final comparison page from the AI SEO audit §4.8 plan.
 * Differentiator-anchored — targets niche but high-intent search for
 * families and support coordinators specifically searching on provider
 * model. "Clinician-led" appears on the binding-allowed phrase list
 * for clinical-scope contexts, which this page is squarely inside.
 */

const breadcrumbItems = [
  { name: "Home", item: "/" },
  { name: "Compare", item: "/compare" },
  { name: "Clinician-Led vs Agency-Staff Nursing", item: PAGE.canonicalPath },
];

export default function CompareClinicianLedVsAgencyPage() {
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
        { "@type": "Thing", name: "Clinician-led in-home nursing" },
        { "@type": "Thing", name: "Agency-staff in-home care models" },
        { "@type": "Thing", name: "NDIS Worker Screening Check" },
      ],
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
              { label: "Compare", href: "/compare" },
              { label: "Clinician-Led vs Agency-Staff" },
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

      <Section size="md" variant="default">
        <Container size="md">
          <Heading
            level="h2"
            as="h2"
            className="mb-6 text-2xl sm:text-3xl font-bold tracking-tight font-[family-name:var(--font-serif)]"
          >
            Side-by-side: clinician-led vs agency-staff nursing
          </Heading>
          <p className="mb-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
            The practical differences for Sydney families and support
            coordinators. Both models can deliver excellent care — the
            choice depends on what the household values most.
          </p>

          <ComparisonTable
            leftHeader="Clinician-Led"
            rightHeader="Agency-Staff"
            rows={PAGE.comparisonRows}
            caption="Comparison of clinician-led and agency-staff in-home nursing models across clinical oversight, staff continuity, scheduling, response to clinical changes, scope, geographic coverage, communication, and cost."
          />
        </Container>
      </Section>

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
                    <Users className="h-4 w-4" />
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
            Plain-English answers to the questions families and coordinators
            most often ask about clinician-led vs agency-staff models.
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

      <CtaSection
        title="Looking for clinician-led in-home nursing in Sydney?"
        description="Tell us about your situation and we'll talk through what consistent, clinically-overseen care could look like for the person you're supporting."
        primaryCta={CTA_LINKS.requestCare}
        secondaryCta={CTA_LINKS.contact}
        variant="primary"
      />
    </>
  );
}
