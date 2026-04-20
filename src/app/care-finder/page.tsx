import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { CareFinder } from "@/components/forms/CareFinder";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/animations/Reveal";
import { createMetadata } from "@/lib/metadata";
import { INTEGRATIONS } from "@/config/integrations";

export const metadata = createMetadata({
  title: "Care Finder | Gentle Care Nursing",
  description: "Find the right in-home nursing and care support for your specific situation with our guided tool.",
  canonical: `${INTEGRATIONS.siteUrl}/care-finder`,
});

export default function CareFinderPage() {
  return (
    <Section size="lg" className="bg-white min-h-[80vh]">
      <Container size="md">
        <Reveal>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Care Finder" }]} className="mb-8" />
          <div className="mb-12 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary/80 mb-4">Guided Support</p>
            <Heading level="h1" as="h1" className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Let&apos;s Find Your Care Match
            </Heading>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Answer a few simple questions so we can understand your needs and match you with the 
              ideal clinical support. It only takes a minute.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mx-auto max-w-2xl rounded-[2.5rem] border border-border/60 bg-white p-8 sm:p-12 shadow-[0_40px_80px_-20px_rgba(132,40,51,0.08)]">
            <CareFinder />
          </div>
        </Reveal>
        
        <Reveal delay={0.4}>
          <div className="mt-16 text-center">
            <p className="text-sm text-muted-foreground italic">
              "We acknowledge every enquiry. Expect a personal response from our clinical lead within 24 hours."
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
