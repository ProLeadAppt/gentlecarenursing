import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { CtaSection } from "@/components/sections/CtaSection";
import { ContactForm } from "@/components/forms/ContactForm";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { CTA_LINKS, SITE } from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Contact Us",
  description:
    "Get in touch with Gentle Care Nursing. Phone, email, or submit an enquiry. We respond within 24–48 hours.",
});

export default function ContactPage() {
  return (
    <>
      <Section size="lg" variant="card">
        <Container size="md">
          <Heading level="h1" as="h1" className="text-center">
            Contact Us
          </Heading>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Have a question, need information, or want to discuss care options?
            We&apos;re here to help — reach out and we&apos;ll respond quickly.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <Grid cols={2} gap="lg">
            {/* Contact Info */}
            <div>
              <Heading level="h2" as="h2" className="text-2xl">
                Get in Touch
              </Heading>
              <p className="mt-4 text-muted-foreground">
                Whether you&apos;re a family member, support coordinator, or
                healthcare professional — we&apos;re happy to answer your
                questions and discuss how we can help.
              </p>

              <div className="mt-8 space-y-6">
                <div>
                  <Heading level="h3" as="h3" className="text-base">
                    Phone
                  </Heading>
                  <p className="mt-1 text-muted-foreground">
                    {SITE.phone || "Contact number coming soon"}
                  </p>
                </div>
                <div>
                  <Heading level="h3" as="h3" className="text-base">
                    Email
                  </Heading>
                  <p className="mt-1 text-muted-foreground">
                    {SITE.email || "Email address coming soon"}
                  </p>
                </div>
                <div>
                  <Heading level="h3" as="h3" className="text-base">
                    Response Time
                  </Heading>
                  <p className="mt-1 text-muted-foreground">
                    We respond to all enquiries within 24–48 hours.
                  </p>
                </div>
                <div>
                  <Heading level="h3" as="h3" className="text-base">
                    Service Areas
                  </Heading>
                  <p className="mt-1 text-muted-foreground">
                    Contact us to confirm coverage in your area.
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <Card variant="default" className="p-8">
              <Heading level="h2" as="h2" className="mb-6 text-2xl">
                Send Us a Message
              </Heading>
              <ContactForm />
            </Card>
          </Grid>
        </Container>
      </Section>

      <CtaSection
        title="Ready to Request Care?"
        description="If you already know what you need, submit a referral and we'll get started."
        primaryCta={CTA_LINKS.requestCare}
        variant="muted"
      />
    </>
  );
}
