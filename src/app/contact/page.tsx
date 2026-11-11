import "../premium-enquiry.css";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { CtaSection } from "@/components/sections/CtaSection";
import { ContactForm } from "@/components/forms/ContactForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { CTA_LINKS, SITE } from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";
import { INTEGRATIONS } from "@/config/integrations";

export const metadata = createMetadata({
  title: "Contact Us | Call or Enquire",
  description:
    "Get in touch with Gentle Care Nursing Services. Phone, email, or submit an enquiry.",
  canonical: `${INTEGRATIONS.siteUrl}/contact`,
});

export default function ContactPage() {
  return (
    <div className="premium-enquiry premium-contact">
      <Section size="lg" variant="card" className="enquiry-hero">
        <Container size="md">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact Us" }]} className="mb-6 enquiry-breadcrumbs" />
          <Heading level="h1" as="h1" className="text-center">
            Contact Us
          </Heading>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Have a question, need information, or want to discuss care options?
            We&apos;re here to help.
          </p>
        </Container>
      </Section>

      <Section className="enquiry-body">
        <Container>
          <Grid cols={2} gap="lg" className="enquiry-contact-grid">
            {/* Contact Info */}
            <div className="enquiry-contact-details">
              <Heading level="h2" as="h2" className="text-2xl">
                Get in Touch
              </Heading>
              <p className="mt-4 text-muted-foreground">
                Whether you&apos;re a family member, support coordinator, or
                healthcare professional. We&apos;re happy to answer your
                questions and discuss how we can help.
              </p>

              <div className="mt-8 space-y-6 enquiry-contact-methods">
                <div>
                  <Heading level="h3" as="h3" className="text-base">
                    Phone
                  </Heading>
                  <p className="mt-1 text-muted-foreground">
                    {SITE.phone ? (
                      <a href={SITE.phoneHref} className="underline underline-offset-4 hover:text-primary">
                        {SITE.phone}
                      </a>
                    ) : "Contact number coming soon"}
                  </p>
                </div>
                <div>
                  <Heading level="h3" as="h3" className="text-base">
                    Email
                  </Heading>
                  <p className="mt-1 text-muted-foreground">
                    {SITE.email ? (
                      <a href={`mailto:${SITE.email}`} className="underline underline-offset-4 hover:text-primary">
                        {SITE.email}
                      </a>
                    ) : "Email address coming soon"}
                  </p>
                </div>
                <div>
                  <Heading level="h3" as="h3" className="text-base">
                    Enquiries
                  </Heading>
                  <p className="mt-1 text-muted-foreground">
                    Contact us to discuss your needs, availability and next steps. This enquiry service is not for emergencies. For a medical emergency, call 000.
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
            <Card variant="default" className="p-8 enquiry-form">
              <Heading level="h2" as="h2" className="mb-2 text-2xl">
                Send Us a Message
              </Heading>
              <p className="mb-6 text-muted-foreground">
                Tell us about your enquiry using the form below.
              </p>
              <ContactForm />
            </Card>
          </Grid>
        </Container>
      </Section>

      <CtaSection
        title="Ready to Request Care?"
        description="If you already know what you need, submit a referral so we can discuss suitability, availability and next steps."
        primaryCta={CTA_LINKS.requestCare}
        secondaryCta={CTA_LINKS.callUs}
        variant="muted"
        className="enquiry-cta"
      />
    </div>
  );
}
