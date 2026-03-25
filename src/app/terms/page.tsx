import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { createMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/constants";

export const metadata = createMetadata({
  title: "Terms of Service",
  description: `Terms of service for ${SITE.name}. Conditions governing use of our website and care services.`,
});

export default function TermsPage() {
  return (
    <Section size="lg">
      <Container size="md">
        <Heading level="h1" as="h1">
          Terms of Service
        </Heading>

        <div className="mt-8 space-y-8 text-muted-foreground [&_h2]:text-foreground [&_h2]:font-semibold [&_h2]:text-xl [&_h2]:mt-8 [&_h2]:mb-3">
          <p>
            These terms of service (&ldquo;Terms&rdquo;) govern your use of the{" "}
            {SITE.name} website and the care services we provide. By accessing
            our website or engaging our services, you agree to be bound by these
            Terms.
          </p>

          <h2>Service Agreement</h2>
          <p>
            {SITE.name} provides in-home nursing, personal care, and disability
            support services across Sydney and surrounding regions. All services
            are delivered by qualified, registered professionals in accordance
            with applicable Australian healthcare standards.
          </p>
          <p>
            A formal service agreement will be established before care begins,
            outlining the scope of services, schedule, and any applicable funding
            arrangements (NDIS, DVA, aged care packages, or private).
          </p>

          <h2>Eligibility and Referrals</h2>
          <p>
            Our services are available to individuals with an active NDIS plan,
            DVA entitlements, aged care home care packages, or private funding
            arrangements. Referrals may be submitted by support coordinators,
            families, hospital discharge planners, or the individuals themselves.
          </p>

          <h2>Enquiries and Response Times</h2>
          <p>
            We aim to respond to all enquiries within 24 hours on business days.
            Submitting an enquiry through our website does not constitute a
            binding agreement for services. A care plan will be developed and
            agreed upon before services commence.
          </p>

          <h2>Client Responsibilities</h2>
          <p>
            Clients and their representatives are expected to provide accurate
            information regarding care needs, health conditions, and funding
            arrangements. Please notify us promptly of any changes to your
            circumstances, care requirements, or contact details.
          </p>

          <h2>Cancellations and Changes</h2>
          <p>
            We understand that care needs can change. Please provide as much
            notice as possible if you need to cancel or reschedule a service
            visit. Cancellation policies specific to your funding arrangement
            will be outlined in your individual service agreement.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            {SITE.name} takes all reasonable steps to deliver safe, high-quality
            care. However, we are not liable for outcomes beyond our reasonable
            control. Our liability is limited to the extent permitted by
            Australian law, including the Australian Consumer Law.
          </p>

          <h2>Website Use</h2>
          <p>
            Information on this website is provided for general guidance only and
            does not constitute medical advice. Always consult a qualified
            healthcare professional for advice specific to your situation. We
            make reasonable efforts to ensure the accuracy of website content but
            do not guarantee it is complete or current at all times.
          </p>

          <h2>Intellectual Property</h2>
          <p>
            All content on this website, including text, images, logos, and
            design elements, is the property of {SITE.name} or its licensors
            and is protected by Australian intellectual property laws. You may
            not reproduce, distribute, or use any content without prior written
            permission.
          </p>

          <h2>Governing Law</h2>
          <p>
            These Terms are governed by the laws of New South Wales, Australia.
            Any disputes arising from these Terms or your use of our services
            will be subject to the jurisdiction of the courts of New South Wales.
          </p>

          <h2>Changes to These Terms</h2>
          <p>
            We may update these Terms from time to time. Changes will be posted
            on this page with the updated date. Continued use of our website or
            services after changes are posted constitutes acceptance of the
            revised Terms.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about these Terms, please contact us:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Email: {SITE.email || "Coming soon"}</li>
            <li>Phone: {SITE.phone || "Coming soon"}</li>
            <li>Address: {SITE.address}</li>
          </ul>
        </div>
      </Container>
    </Section>
  );
}
