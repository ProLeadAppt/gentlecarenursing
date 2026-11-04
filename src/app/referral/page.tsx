import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { CtaSection } from "@/components/sections/CtaSection";
import { ReferralForm } from "@/components/forms/ReferralForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { CTA_LINKS } from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";
import { INTEGRATIONS } from "@/config/integrations";

export const metadata = createMetadata({
  title: "Request Care | Start an NDIS, DVA or Private Referral",
  description:
    "Request care or make a referral. Share your details and care needs with Gentle Care Nursing Services.",
  canonical: `${INTEGRATIONS.siteUrl}/referral`,
});

const REFERRAL_STEPS = [
  {
    number: 1,
    headline: "Submit your enquiry",
    description:
      "Fill out the form below with your details and care needs.",
  },
  {
    number: 2,
    headline: "We acknowledge and respond",
    description:
      "A member of our team will contact you to discuss your enquiry and next steps.",
  },
  {
    number: 3,
    headline: "Care is arranged",
    description:
      "We conduct an assessment, create a tailored care plan, and arrange for care to begin. You'll always know what happens next.",
  },
] as const;

export default function ReferralPage() {
  return (
    <>
      <Section size="lg" variant="card">
        <Container size="md">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Request Care" }]} className="mb-6" />
          <Heading level="h1" as="h1" className="text-center">
            Request Care
          </Heading>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {/* Based on Gemma's referral brief, 2026-06-10. */}
            If you are a support coordinator, case manager, health professional,
            family member, or representative, you can make a referral to Gentle
            Care Nursing Services. We will review the client&apos;s needs and
            discuss the next steps.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
            Support coordinators and discharge planners can also visit our{" "}
            <a href="/referrers" className="font-medium text-primary underline-offset-2 hover:underline">
              For Coordinators &amp; Referrers
            </a>{" "}
            page to see how we work with referrers.
          </p>
        </Container>
      </Section>

      <ProcessSteps
        title="How It Works"
        subtitle="From enquiry to care."
        steps={REFERRAL_STEPS}
      />

      {/* Form */}
      <Section variant="muted">
        <Container size="sm">
          <SectionHeader
            title="Submit Your Enquiry"
            subtitle="Share your details and care needs using the form below."
          />
          <div className="mt-10">
            <Card variant="default" className="p-8">
              <ReferralForm />
            </Card>
          </div>
        </Container>
      </Section>

      {/* What Happens Next */}
      <Section>
        <Container size="md">
          <SectionHeader title="What Happens Next" />
          <Grid cols={3} gap="lg" className="mt-10">
            <div className="text-center">
              <Heading level="h3" as="h3" className="text-lg">
                Enquiry Review
              </Heading>
              <p className="mt-2 text-sm text-muted-foreground">
                Our team reviews your enquiry and care needs.
              </p>
            </div>
            <div className="text-center">
              <Heading level="h3" as="h3" className="text-lg">
                Personal Response
              </Heading>
              <p className="mt-2 text-sm text-muted-foreground">
                A real person will contact you with supportive guidance, clear
                next steps, and answers to your questions.
              </p>
            </div>
            <div className="text-center">
              <Heading level="h3" as="h3" className="text-lg">
                Care Begins
              </Heading>
              <p className="mt-2 text-sm text-muted-foreground">
                Once a care plan is agreed, we match you with the right carer
                and start support as soon as possible.
              </p>
            </div>
          </Grid>
        </Container>
      </Section>

      <CtaSection
        title="Prefer to Speak With Someone?"
        description="Contact us directly by phone or email. We're here to help."
        primaryCta={CTA_LINKS.contact}
        secondaryCta={CTA_LINKS.callUs}
        variant="muted"
      />
    </>
  );
}
