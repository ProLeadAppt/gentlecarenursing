import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { SectionHeader } from "./SectionHeader";
import { TrustBar } from "./TrustBar";
import { FaqPreview } from "./FaqPreview";
import { CtaSection } from "./CtaSection";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CTA_LINKS } from "@/lib/constants";
import { getServiceSchema, getFaqSchema } from "@/lib/schema";
import type { FaqItem } from "./FaqAccordion";

export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ServicePageData {
  title: string;
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas),
        }}
      />

      {/* Dark gradient hero — matches homepage hero treatment */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(210,50%,18%)] via-primary to-primary-light py-16 sm:py-20 lg:py-24">
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
          <Heading level="h1" as="h1" className="text-center text-white">
            {data.title}
          </Heading>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-white/80 sm:text-xl">
            {data.intro}
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button href={CTA_LINKS.requestCare.href} size="lg" variant="inverted">
              {CTA_LINKS.requestCare.label}
            </Button>
            <Button href={CTA_LINKS.contact.href} variant="invertedOutline" size="lg">
              {CTA_LINKS.contact.label}
            </Button>
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

      {/* FAQ Preview */}
      {faqItems.length > 0 && (
        <FaqPreview
          title="Common Questions"
          items={data.faqs}
          viewAllHref="/faq"
          viewAllLabel="View all FAQs"
        />
      )}

      {/* CTA */}
      <CtaSection
        title={data.cta.title}
        description={data.cta.description}
        primaryCta={CTA_LINKS.requestCare}
        secondaryCta={CTA_LINKS.contact}
        variant="primary"
      />
    </>
  );
}
