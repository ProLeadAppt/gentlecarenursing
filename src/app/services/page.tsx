import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { TrustBar } from "@/components/sections/TrustBar";
import { CtaSection } from "@/components/sections/CtaSection";
import { Heading } from "@/components/ui/Heading";
import { CTA_LINKS } from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Our Services",
  description:
    "In-home nursing and care services across NDIS, DVA, aged care, and private. Personalised support for you or your loved ones.",
  keywords: [
    "in-home nursing",
    "NDIS services",
    "DVA nursing",
    "aged care services",
    "private nursing",
    "personal care",
  ],
});

export default function ServicesPage() {
  return (
    <>
      {/* Intro */}
      <Section size="lg" variant="card">
        <Container size="md">
          <Heading level="h1" as="h1" className="text-center">
            Our Services
          </Heading>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Gentle Care Nursing provides personalised in-home nursing and care across multiple
            funding streams. Whether you&apos;re an NDIS participant, a veteran, an older
            Australian, or someone needing private care — we have you covered.
          </p>
        </Container>
      </Section>

      <TrustBar variant="muted" />

      <ServiceCards
        title="Our Care Categories"
        subtitle="Select a service to learn more about how we can help."
        cols={2}
        cardVariant="elevated"
      />

      {/* Who We Work With */}
      <Section variant="muted">
        <Container size="md">
          <Heading level="h2" as="h2" className="text-center">
            Who We Work With
          </Heading>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted-foreground">
            We support families, NDIS participants and coordinators, DVA clients, hospital
            discharge planners, GPs, and healthcare professionals. If you&apos;re looking for a
            care provider you can trust — we&apos;re here.
          </p>
        </Container>
      </Section>

      <CtaSection
        title="Not Sure Which Service Fits?"
        description="Contact us or submit an enquiry — we'll help you find the right support."
        primaryCta={CTA_LINKS.requestCare}
        secondaryCta={CTA_LINKS.contact}
        variant="primary"
      />
    </>
  );
}
