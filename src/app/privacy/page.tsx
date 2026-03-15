import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { createMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/constants";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: `Privacy policy for ${SITE.name}. How we collect, use, and protect your personal information.`,
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
            {SITE.name} is committed to protecting the privacy of our clients,
            their families, and visitors to our website. This privacy policy
            explains how we collect, use, and safeguard your personal
            information.
          </p>

          <h2>Information We Collect</h2>
          <p>
            We may collect personal information including your name, contact
            details (phone number, email address), health information relevant
            to care provision, NDIS or DVA details, referral information, and
            any other information you provide through our website forms or
            direct communication.
          </p>

          <h2>How We Use Your Information</h2>
          <p>
            We use personal information to provide and coordinate care services,
            respond to enquiries and referrals, communicate with you about
            services, comply with legal and regulatory requirements, and improve
            our services. We do not sell or share your personal information with
            third parties for marketing purposes.
          </p>

          <h2>Information Security</h2>
          <p>
            We take reasonable steps to protect personal information from
            misuse, loss, unauthorised access, modification, or disclosure. This
            includes secure storage, access controls, and staff training on
            privacy obligations.
          </p>

          <h2>Third-Party Services</h2>
          <p>
            Our website may use third-party services including analytics,
            customer relationship management (CRM) platforms, and communication
            tools. These services may collect data in accordance with their own
            privacy policies. We use GoHighLevel as our CRM platform — form
            submissions and enquiries may be processed through this system.
          </p>

          <h2>Your Rights</h2>
          <p>
            You have the right to access the personal information we hold about
            you, request corrections to inaccurate information, and request
            deletion of your information where appropriate. To make a request,
            contact us using the details below.
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
