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

export const metadata = createMetadata({
  title: "Request Care",
  description:
    "Request care, make a referral, or book a consultation with Gentle Care Nursing. Simple process, fast response.",
});

const REFERRAL_STEPS = [
  {
    number: 1,
    headline: "Submit your enquiry",
    description:
      "Fill out the form below with your details and care needs. The more information you provide, the faster we can help.",
  },
  {
    number: 2,
    headline: "We review and respond",
    description:
      "Our team reviews your enquiry and contacts you within 24–48 hours to discuss next steps.",
  },
  {
    number: 3,
    headline: "Care is arranged",
    description:
      "We conduct an assessment, create a tailored care plan, and arrange for care to begin as soon as possible.",
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
            Whether you&apos;re a family member, support coordinator, discharge
            planner, or healthcare professional — submit your enquiry below and
            we&apos;ll respond quickly.
          </p>
        </Container>
      </Section>

      <ProcessSteps
        title="How It Works"
        subtitle="Simple, fast, and transparent — from enquiry to care."
        steps={REFERRAL_STEPS}
      />

      {/* Form */}
      <Section variant="muted">
        <Container size="sm">
          <SectionHeader
            title="Submit Your Enquiry"
            subtitle="Fill out the form below and we'll be in touch within 24–48 hours."
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
                We Review Your Enquiry
              </Heading>
              <p className="mt-2 text-sm text-muted-foreground">
                Our team reads every enquiry carefully and prepares to contact
                you with the right information.
              </p>
            </div>
            <div className="text-center">
              <Heading level="h3" as="h3" className="text-lg">
                We Contact You
              </Heading>
              <p className="mt-2 text-sm text-muted-foreground">
                We&apos;ll reach out within 24–48 hours to discuss your needs,
                answer questions, and explain your options.
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
        description="Contact us directly by phone or email — we're here to help."
        primaryCta={CTA_LINKS.contact}
        secondaryCta={CTA_LINKS.callUs}
        variant="muted"
      />
    </>
  );
}
