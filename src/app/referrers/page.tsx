import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { CtaSection } from "@/components/sections/CtaSection";
import { ReferrerBlocksSection } from "@/components/sections/ReferrerBlocksSection";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { CTA_LINKS } from "@/lib/constants";
import { INTEGRATIONS } from "@/config/integrations";
import { createMetadata } from "@/lib/metadata";
import { getBreadcrumbListSchema, getFaqSchema } from "@/lib/schema";

const REFERRER_FAQS = [
  {
    question: "How do I refer a client to Gentle Care Nursing Services?",
    answer:
      "You can use our Request Care form with the client’s details, care needs, and funding type, or contact us directly by phone or email. We’ll acknowledge your referral straight away and respond personally within 24 hours.",
  },
  {
    question: "What information should I include in a referral?",
    answer:
      "Include the client’s contact details, primary diagnosis or needs, funding source (NDIS, DVA, aged care, private), urgency, and any relevant reports or discharge summaries. If something is missing, we’ll work with you to complete the picture.",
  },
  {
    question: "How quickly can services start after I refer?",
    answer:
      "Timeframes depend on location, funding, and the type of care required, but we always respond within 24 hours. For urgent referrals, we prioritise assessment and will let you know realistic start dates up front.",
  },
  {
    question: "Will I receive updates after care begins?",
    answer:
      "Yes. With the client’s consent, we provide clear updates at key points—after assessment, when care begins, and if there are significant changes. We’re happy to join case meetings or case conferences when needed.",
  },
] as const;

const canonical = `${INTEGRATIONS.siteUrl}/referrers`;

export const metadata = createMetadata({
  title: "For Coordinators & Referrers",
  description:
    "Information for NDIS support coordinators, plan managers, hospital discharge planners, and healthcare professionals who want to refer to Gentle Care Nursing Services.",
  canonical,
  openGraph: {
    images: [{ url: "/images/og/referrers.png", width: 1200, height: 630, alt: "For Referrers — Gentle Care Nursing Services" }],
  },
});

export default function ReferrersPage() {
  const faqSchema = getFaqSchema(
    REFERRER_FAQS.map((f) => ({ question: f.question, answer: f.answer }))
  );
  const breadcrumbSchema = getBreadcrumbListSchema([
    { name: "Home", item: "/" },
    { name: "For Coordinators & Referrers", item: "/referrers" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Intro */}
      <Section size="lg" variant="card">
        <Container size="md">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "For Coordinators & Referrers" },
            ]}
            className="mb-6"
          />
          <Heading level="h1" as="h1" className="text-center">
            For Coordinators & Referrers
          </Heading>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Whether you’re an NDIS support coordinator, plan manager, hospital
            discharge planner, GP, or other health professional, we make it easy
            to refer to Gentle Care Nursing Services and stay informed about your client’s care.
          </p>
        </Container>
      </Section>

      {/* How to refer */}
      <Section id="how-to-refer">
        <Container size="md">
          <SectionHeader
            title="How to Refer"
            subtitle="Three simple steps to get your client safely connected with in-home nursing and care."
          />
          <Grid cols={3} gap="lg" className="mt-10">
            <Card variant="default">
              <Heading level="h3" as="h3" className="text-lg">
                1. Share the Client’s Details
              </Heading>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Submit our Request Care form or contact us directly with the client’s
                details, funding type, key needs, and any relevant reports or discharge
                summaries. You’ll receive immediate confirmation that we’ve received it.
              </p>
            </Card>
            <Card variant="default">
              <Heading level="h3" as="h3" className="text-lg">
                2. We Acknowledge and Assess
              </Heading>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Our team is notified straight away. Within 24 hours, a real person will
                respond to you or the client with supportive guidance, next steps, and
                proposed timeframes for assessment and care commencement.
              </p>
            </Card>
            <Card variant="default">
              <Heading level="h3" as="h3" className="text-lg">
                3. Care Begins and You Stay Informed
              </Heading>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Once a care plan is agreed, we match the client with the right nurse or
                carer and begin visits. With consent, we keep you informed at key points
                so you always know how things are progressing.
              </p>
            </Card>
          </Grid>
          <div className="mt-10 text-center">
            <a
              href={CTA_LINKS.requestCare.href}
              className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-8 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
            >
              Use the Request Care Form
            </a>
          </div>
        </Container>
      </Section>

      {/* Referrer-specific information */}
      <ReferrerBlocksSection
        referrerTypes={[
          "ndis-support-coordinator",
          "plan-manager",
          "hospital-discharge-planner",
          "gp-primary-care",
        ]}
      />

      {/* What you can expect */}
      <Section variant="muted">
        <Container size="md">
          <SectionHeader
            title="What You Can Expect When You Refer"
            subtitle="Clear communication, reliable follow-through, and clinically sound care for your clients."
          />
          <Grid cols={3} gap="lg" className="mt-10">
            <Card variant="default">
              <Heading level="h3" as="h3" className="text-lg">
                Clear, Timely Communication
              </Heading>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                We acknowledge referrals quickly, outline realistic timeframes, and provide
                updates at agreed points so you never have to chase us for information.
              </p>
            </Card>
            <Card variant="default">
              <Heading level="h3" as="h3" className="text-lg">
                Funding-Aware Support
              </Heading>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                We work within NDIS, DVA, aged care packages, and private funding. If there’s
                uncertainty, we help families understand what’s possible without jargon.
              </p>
            </Card>
            <Card variant="default">
              <Heading level="h3" as="h3" className="text-lg">
                Clinical Quality and Safety
              </Heading>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Our nurses and carers follow clear care plans, document what they do, and
                escalate appropriately to treating teams when things change.
              </p>
            </Card>
          </Grid>
        </Container>
      </Section>

      {/* When we're a good fit */}
      <Section>
        <Container size="md">
          <SectionHeader
            title="When Gentle Care Is a Good Fit"
            subtitle="A few examples of the kinds of referrals we regularly support."
          />
          <ul className="mx-auto mt-8 max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground">
            <li>
              • NDIS participants needing stable, attentive in-home nursing or personal care,
              including complex support needs.
            </li>
            <li>
              • Veterans and war widows who require community nursing or post-hospital support
              under DVA.
            </li>
            <li>
              • Older Australians on Support at Home or CHSP who need extra nursing or daily
              living support to stay safely at home.
            </li>
            <li>
              • People coming home from hospital who will benefit from short-term, intensive
              nursing and personal care at home.
            </li>
            <li>
              • Clients with tracheostomies, PEG feeds, catheters, or complex wounds who can
              safely receive care at home with skilled clinical oversight.
            </li>
          </ul>
        </Container>
      </Section>

      {/* FAQs for referrers */}
      <Section variant="card">
        <Container size="md">
          <SectionHeader
            title="Common Questions from Coordinators and Referrers"
            subtitle="If you’re unsure about anything, we’d rather you ask. Here are some quick answers."
          />
          <div className="mx-auto mt-8 max-w-3xl space-y-6">
            {REFERRER_FAQS.map((faq) => (
              <div key={faq.question}>
                <Heading level="h3" as="h3" className="text-base font-semibold">
                  {faq.question}
                </Heading>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Final CTA to request care or contact */}
      <CtaSection
        title="Ready to Refer or Talk Through a Case?"
        description="Submit the Request Care form or contact us directly. We’ll help you work out the safest, most practical next step for your client."
        primaryCta={CTA_LINKS.requestCare}
        secondaryCta={CTA_LINKS.contact}
        variant="primary"
      />
    </>
  );
}

