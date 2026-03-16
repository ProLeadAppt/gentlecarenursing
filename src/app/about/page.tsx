import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { TrustBar } from "@/components/sections/TrustBar";
import { CtaSection } from "@/components/sections/CtaSection";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { CTA_LINKS } from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";
import {
  ABOUT_INTRO,
  ELEVATOR_PITCH,
  MISSION,
  VALUES,
  WHY_PERSONALISED,
  PROFESSIONAL_TRUST,
} from "@/content/about";

export const metadata = createMetadata({
  title: "About Us",
  description:
    "Learn about Gentle Care Nursing: our mission, values, and commitment to personalised, high-quality in-home care. Registered NDIS and DVA provider.",
});

export default function AboutPage() {
  return (
    <>
      {/* Intro */}
      <Section size="lg" variant="card">
        <Container size="md">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About Us" }]} className="mb-6" />
          <Heading level="h1" as="h1" className="text-center">
            {ABOUT_INTRO.title}
          </Heading>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {ELEVATOR_PITCH}
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-muted-foreground">
            {ABOUT_INTRO.lead}
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm font-medium text-foreground/90">
            {ABOUT_INTRO.statsLine}
          </p>
        </Container>
      </Section>

      <TrustBar variant="muted" />

      {/* Mission */}
      <Section>
        <Container size="md">
          <SectionHeader title={MISSION.title} />
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-muted-foreground">
            {MISSION.description}
          </p>
        </Container>
      </Section>

      {/* Values */}
      <Section variant="muted">
        <Container>
          <SectionHeader
            title="Our Values"
            subtitle="The principles that guide everything we do."
          />
          <Grid cols={3} gap="lg" className="mt-12">
            {VALUES.map((value) => (
              <Card key={value.title} variant="default">
                <Heading level="h3" as="h3" className="text-lg">
                  {value.title}
                </Heading>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Why Personalised Care */}
      <Section>
        <Container size="md">
          <SectionHeader title={WHY_PERSONALISED.title} />
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-muted-foreground">
            {WHY_PERSONALISED.description}
          </p>
        </Container>
      </Section>

      {/* Professional Trust */}
      <Section variant="card">
        <Container size="md">
          <SectionHeader title={PROFESSIONAL_TRUST.title} />
          <ul className="mx-auto mt-8 max-w-xl space-y-4">
            {PROFESSIONAL_TRUST.items.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* CTA */}
      <CtaSection
        title="Ready to Learn More?"
        description="Get in touch to discuss how we can help you or your loved one."
        primaryCta={CTA_LINKS.requestCare}
        secondaryCta={CTA_LINKS.contact}
        variant="primary"
      />
    </>
  );
}
