import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { createMetadata } from "@/lib/metadata";
import { INTEGRATIONS } from "@/config/integrations";
import { SITE } from "@/lib/constants";

export const metadata = createMetadata({
  title: "Privacy Policy | Gentle Care Nursing Services",
  description: `Privacy policy for ${SITE.name}. How website enquiries, referrals and private feedback are handled.`,
  canonical: `${INTEGRATIONS.siteUrl}/privacy`,
});

export default function PrivacyPage() {
  return (
    <Section size="lg">
      <Container size="md">
        <Heading level="h1" as="h1">
          Privacy Policy
        </Heading>

        <div className="mt-8 space-y-8 text-muted-foreground [&_h2]:text-foreground [&_h2]:font-semibold [&_h2]:text-xl [&_h2]:mt-8 [&_h2]:mb-3">
          <p>
            This notice explains how information submitted through the
            {" "}{SITE.name} website is used. Contact us before sharing sensitive
            information if you have questions about how it will be handled.
          </p>

          <h2>Website Enquiries and Referrals</h2>
          <p>
            Our forms collect contact details and the information you choose to
            provide about your enquiry, requested support or referral. Private
            feedback includes your rating and any optional details you provide.
            We use this information to review your request, respond and discuss
            appropriate next steps, or to review feedback about our services.
          </p>
          <p>
            Please provide only the information needed for an initial conversation.
            Do not include detailed medical records, identity documents, payment
            details or NDIS plan numbers in website forms. If referring someone
            else, make sure you have their permission or the authority to do so.
            Contact our team to arrange an appropriate way to share any documents
            needed for care assessment.
          </p>

          <h2>Email Delivery and Service Providers</h2>
          <p>
            Website enquiry, referral and private-feedback submissions are sent
            through Resend, our email delivery provider, to our team at {SITE.email}.
            The submitted details are included in the email. Resend and the
            receiving email service process the message as part of delivery.
            A success message means the delivery provider accepted the submission;
            it does not confirm inbox receipt or book a care service.
          </p>
          <p>
            <a href="https://resend.com/security/gdpr" className="underline underline-offset-4">Resend</a>
            {" "}states that message content and delivery logs are stored in the
            United States. The receiving email service also processes and stores
            the email. Contact us before submitting if you need more information
            about overseas handling or retention.
          </p>
          <p>
            Private feedback submitted through this website is not automatically
            published. If you choose to leave a public Google review instead,
            Google processes that review under its own terms and privacy policy.
          </p>

          <h2>Website Analytics</h2>
          <p>
            When analytics is enabled, this website uses Google Analytics to
            measure page visits and actions
            such as contact-link clicks and accepted form submissions. Google may
            process device, browser and usage information, including information
            associated with cookies or similar technologies. Our custom analytics
            events do not include the text you enter in enquiry or feedback forms.
          </p>

          <h2>Questions About Your Information</h2>
          <p>
            Contact us to ask about information we hold about you, request access
            or correction, raise a privacy concern, or ask about deletion. You can
            also ask about service providers, storage locations, overseas handling,
            access and retention before submitting information. Website forms are
            for initial enquiries and are not an emergency or clinical-document
            service. In an emergency, call 000.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. Changes will be
            posted on this page. We encourage you to review this policy
            periodically.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this privacy policy or how we handle
            your personal information, please contact us:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Email: {SITE.email || "Coming soon"}</li>
            <li>Phone: {SITE.phone || "Coming soon"}</li>
          </ul>
        </div>
      </Container>
    </Section>
  );
}
