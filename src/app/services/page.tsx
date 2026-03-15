import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { TrustBar } from "@/components/sections/TrustBar";
import { CtaSection } from "@/components/sections/CtaSection";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Heading } from "@/components/ui/Heading";
import { CTA_LINKS } from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";
import { SERVICES } from "@/content/services";

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
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Our Services" }]} className="mb-6" />
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

      {/* Services at a glance — table for GEO / citation-friendly parsing */}
      <Section>
        <Container size="md">
          <Heading level="h2" as="h2" className="mb-6 text-center">
            Services at a glance
          </Heading>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[320px] text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-3 font-semibold text-foreground">Service</th>
                  <th className="px-4 py-3 font-semibold text-foreground">Description</th>
                  <th className="px-4 py-3 font-semibold text-foreground">Link</th>
                </tr>
              </thead>
              <tbody>
                {SERVICES.map((s) => (
                  <tr key={s.href} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-medium text-foreground">{s.title}</td>
                    <td className="px-4 py-3 text-muted-foreground">{s.shortDescription}</td>
                    <td className="px-4 py-3">
                      <Link href={s.href} className="font-medium text-primary hover:underline">
                        Learn more
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

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
