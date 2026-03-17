import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { SectionHeader } from "./SectionHeader";
import { TrustBar } from "./TrustBar";
import { FaqPreview } from "./FaqPreview";
import { ServiceCtaWithModal } from "./ServiceCtaWithModal";
import { Testimonials } from "./Testimonials";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { FormModalTrigger } from "@/components/ui/FormModalTrigger";
import { CTA_LINKS } from "@/lib/constants";
import { getServiceSchema, getFaqSchema } from "@/lib/schema";
import { SERVICES } from "@/content/services";
import { ALL_GUIDES } from "@/content/guides";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import type { FaqItem } from "./FaqAccordion";
import Link from "next/link";

export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ServicePageData {
  title: string;
  /** Optional: one-sentence direct answer for featured snippet / AEO (shown first in hero) */
  snippetAnswer?: string;
  intro: string;
  href?: string;
  whoItHelps: {
    title: string;
    description: string;
    audiences: string[];
  };
  supportAvailable: {
    title: string;
    description: string;
    features: ServiceFeature[];
  };
  whyChoose: {
    title: string;
    description: string;
    reasons: ServiceFeature[];
  };
  faqs: { id: string; question: string; answer: string }[];
  cta: {
    title: string;
    description?: string;
  };
  /** Optional anonymised case stories to illustrate real-world outcomes */
  caseStories?: {
    title: string;
    summary: string;
  }[];
  /** Optional service or region-specific testimonials to surface on the page */
  testimonials?: {
    quote: string;
    name: string;
    role: string;
    rating?: number;
  }[];
  /** Optional guide slugs that are especially relevant to this service */
  relatedGuideSlugs?: string[];
}

interface ServicePageLayoutProps {
  data: ServicePageData;
}

export function ServicePageLayout({ data }: ServicePageLayoutProps) {
  const faqItems: FaqItem[] = data.faqs.map((f) => ({
    id: f.id,
    question: f.question,
    answer: f.answer,
  }));

  const schemas = [
    getServiceSchema({
      name: data.title,
      description: data.intro,
      url: data.href ?? "",
    }),
    ...(faqItems.length > 0 ? [getFaqSchema(data.faqs)] : []),
  ];

  const relatedGuides =
    data.relatedGuideSlugs?.map((slug) => ALL_GUIDES.find((g) => g.slug === slug)).filter(
      (g): g is (typeof ALL_GUIDES)[number] => g != null
    ) ?? [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas),
        }}
      />

      {/* Dark gradient hero — matches homepage hero treatment */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary-light py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden>
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="service-dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#service-dots)" />
          </svg>
        </div>
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full bg-white/[0.03] blur-3xl" aria-hidden />

        <Container size="md" className="relative">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: data.title },
            ]}
            className="mb-6 justify-center [&_a]:text-white/80 [&_a:hover]:text-white [&_span]:text-white/90"
          />
          <Heading level="h1" as="h1" className="text-center text-white">
            {data.title}
          </Heading>
          <p className="mt-3 text-center text-base font-medium text-white/70 sm:text-lg">
            In-home nursing and care across Sydney and surrounds
          </p>
          {data.snippetAnswer && (
            <p className="mx-auto mt-5 max-w-2xl text-center text-lg font-medium leading-relaxed text-white sm:text-xl" role="doc-abstract">
              {data.snippetAnswer}
            </p>
          )}
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-white/80 sm:text-xl">
            {data.intro}
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <FormModalTrigger formType="referral" size="lg" variant="inverted">
              {CTA_LINKS.requestCare.label}
            </FormModalTrigger>
            <FormModalTrigger formType="contact" variant="invertedOutline" size="lg">
              {CTA_LINKS.contact.label}
            </FormModalTrigger>
          </div>
        </Container>
      </section>

      <TrustBar variant="muted" />

      {/* Who It Helps */}
      <Section>
        <Container>
          <SectionHeader
            title={data.whoItHelps.title}
            subtitle={data.whoItHelps.description}
          />
          <Grid cols={2} gap="md" className="mx-auto mt-10 max-w-3xl">
            {data.whoItHelps.audiences.map((audience) => (
              <div
                key={audience}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-sm"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-sm font-medium text-foreground">{audience}</span>
              </div>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Support Available */}
      <Section variant="muted">
        <Container>
          <SectionHeader
            title={data.supportAvailable.title}
            subtitle={data.supportAvailable.description}
          />
          <Grid cols={2} gap="lg" className="mt-12">
            {data.supportAvailable.features.map((feature) => (
              <Card key={feature.title} variant="default">
                <Heading level="h3" as="h3" className="text-lg">
                  {feature.title}
                </Heading>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Why Choose Gentle Care */}
      <Section>
        <Container>
          <SectionHeader
            title={data.whyChoose.title}
            subtitle={data.whyChoose.description}
          />
          <Grid cols={3} gap="lg" className="mt-12">
            {data.whyChoose.reasons.map((reason) => (
              <div key={reason.title} className="text-center">
                <Heading level="h3" as="h3" className="text-lg">
                  {reason.title}
                </Heading>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {reason.description}
                </p>
              </div>
            ))}
          </Grid>
        </Container>
      </Section>

      {data.caseStories && data.caseStories.length > 0 && (
        <Section variant="muted">
          <Container>
            <SectionHeader
              title="Real Examples of How This Helps"
              subtitle="Names and details are changed for privacy, but the situations are drawn from the kinds of referrals we regularly support."
            />
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {data.caseStories.map((story) => (
                <article
                  key={story.title}
                  className="h-full rounded-2xl border border-border bg-card p-5 text-left shadow-sm"
                >
                  <Heading level="h3" as="h3" className="text-base font-semibold">
                    {story.title}
                  </Heading>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {story.summary}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* FAQ Preview */}
      {faqItems.length > 0 && (
        <FaqPreview
          title="Common Questions"
          items={data.faqs}
          viewAllHref="/faq"
          viewAllLabel="View all FAQs"
        />
      )}

      {/* Related services — internal linking */}
      <Section variant="muted">
        <Container>
          <SectionHeader
            title="Related Services"
            subtitle="Explore our other in-home nursing and care options."
          />
          <ul className="mt-8 flex flex-wrap justify-center gap-4">
            {SERVICES.filter((s) => s.href !== data.href)
              .slice(0, 3)
              .map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="rounded-lg border border-border bg-card px-5 py-3 text-sm font-medium text-foreground shadow-sm transition hover:border-primary/30 hover:bg-primary/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
          </ul>
        </Container>
      </Section>

      {relatedGuides.length > 0 && (
        <Section>
          <Container>
            <SectionHeader
              title="Short Guides for Common Situations"
              subtitle="These guides explain typical scenarios we support and how care at home can work in practice."
            />
            <ul className="mt-8 grid gap-4 md:grid-cols-2">
              {relatedGuides.map((guide) => (
                <li key={guide.slug}>
                  <Link
                    href={`/guides/${guide.slug}`}
                    className="block h-full rounded-xl border border-border bg-card p-5 text-left shadow-sm transition hover:border-primary/40 hover:bg-primary/[0.02]"
                  >
                    <Heading level="h3" as="h3" className="text-base font-semibold">
                      {guide.title}
                    </Heading>
                    <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                      {guide.snippetAnswer}
                    </p>
                    <span className="mt-3 inline-flex text-sm font-medium text-primary">
                      Read guide
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      {data.testimonials && data.testimonials.length > 0 && (
        <Testimonials
          title="What Our Clients Say About This Type of Care"
          subtitle="Real experiences from families, coordinators, and health professionals."
          label={undefined}
          testimonials={data.testimonials}
          sectionVariant="default"
        />
      )}

      {/* CTA */}
      <ServiceCtaWithModal
        title={data.cta.title}
        description={data.cta.description}
      />
    </>
  );
}
