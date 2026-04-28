import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { CtaSection } from "@/components/sections/CtaSection";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Heading } from "@/components/ui/Heading";
import { CTA_LINKS } from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";
import { INTEGRATIONS } from "@/config/integrations";
import { FAQ_CATEGORIES, ALL_FAQ_ITEMS } from "@/content/faq";
import { getFaqSchema } from "@/lib/schema";

export const metadata = createMetadata({
  title: "Frequently Asked Questions",
  description:
    "Common questions about Gentle Care Nursing Services services, referrals, funding, and how to get started.",
  canonical: `${INTEGRATIONS.siteUrl}/faq`,
});

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getFaqSchema(ALL_FAQ_ITEMS)),
        }}
      />
      <Section size="lg" variant="card">
        <Container size="md">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "FAQs" }]} className="mb-6" />
          <Heading level="h1" as="h1" className="text-center">
            Frequently Asked Questions
          </Heading>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-muted-foreground">
            Find answers to common questions about our services, funding options,
            referral process, and what to expect.
          </p>
        </Container>
      </Section>

      <Section>
        <Container size="md">
          {FAQ_CATEGORIES.map((category) => (
            <div key={category.title} className="mb-12 last:mb-0">
              <Heading level="h2" as="h2" className="mb-6 text-2xl">
                {category.title}
              </Heading>
              <FaqAccordion
                items={category.items}
                allowMultiple
              />
            </div>
          ))}
        </Container>
      </Section>

      <CtaSection
        title="Still Have Questions?"
        description="Get in touch. We're happy to help you understand your options."
        primaryCta={CTA_LINKS.contact}
        secondaryCta={CTA_LINKS.requestCare}
        variant="muted"
      />
    </>
  );
}
