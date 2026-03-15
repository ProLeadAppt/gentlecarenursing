import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { StatsBar } from "@/components/sections/StatsBar";
import { WhoWeHelp } from "@/components/sections/WhoWeHelp";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { WhyDifferent } from "@/components/sections/WhyDifferent";
import { Testimonials } from "@/components/sections/Testimonials";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { AiAssistantSection } from "@/components/sections/AiAssistantSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { FaqPreview } from "@/components/sections/FaqPreview";
import { AreasWeServe } from "@/components/sections/AreasWeServe";
import Link from "next/link";
import { CTA_LINKS, CTA_REASSURANCE } from "@/lib/constants";
import { getHowToSchema } from "@/lib/schema";
import {
  HOMEPAGE_HERO,
  WHO_WE_HELP,
  WHY_DIFFERENT,
  PROCESS_STEPS,
  AI_ASSISTANT,
  HOMEPAGE_STATS,
  HOMEPAGE_TESTIMONIALS,
  HOMEPAGE_AREAS,
  HOMEPAGE_FAQ,
  HOMEPAGE_LOCAL_PROOF,
} from "@/content/homepage";

const howToSchema = getHowToSchema(
  "How to request care from Gentle Care Nursing",
  "From enquiry to care — we make it straightforward. Submit your enquiry, we respond within 24–48 hours, then care begins.",
  PROCESS_STEPS.steps,
  "/"
);

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <Hero
        headline={HOMEPAGE_HERO.headline}
        subheadline={HOMEPAGE_HERO.subheadline}
        locationLine={HOMEPAGE_HERO.locationLine}
        primaryCta={CTA_LINKS.requestCare}
        secondaryCta={CTA_LINKS.contact}
        reassurance={CTA_REASSURANCE}
      />

      <TrustBar variant="muted" responseTimeLine="We respond within 24–48 hours." />

      <StatsBar stats={HOMEPAGE_STATS} />

      <div className="border-y border-border/60 bg-background py-4">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="text-sm text-muted-foreground">
            {HOMEPAGE_LOCAL_PROOF.line}{" "}
            <Link
              href={HOMEPAGE_LOCAL_PROOF.linkHref}
              className="font-medium text-primary hover:underline"
            >
              {HOMEPAGE_LOCAL_PROOF.linkLabel}
            </Link>
          </p>
        </div>
      </div>

      <WhoWeHelp
        title={WHO_WE_HELP.title}
        subtitle={WHO_WE_HELP.subtitle}
        audiences={WHO_WE_HELP.audiences}
      />

      <ServiceCards />

      <WhyDifferent
        title={WHY_DIFFERENT.title}
        subtitle={WHY_DIFFERENT.subtitle}
        differentiators={WHY_DIFFERENT.differentiators}
      />

      <Testimonials testimonials={HOMEPAGE_TESTIMONIALS} />

      <ProcessSteps
        title={PROCESS_STEPS.title}
        subtitle={PROCESS_STEPS.subtitle}
        steps={PROCESS_STEPS.steps}
        cta={CTA_LINKS.requestCare}
      />

      <AiAssistantSection
        title={AI_ASSISTANT.title}
        subtitle={AI_ASSISTANT.subtitle}
        primaryCtaLabel={AI_ASSISTANT.primaryCtaLabel}
        secondaryCtaLabel={AI_ASSISTANT.secondaryCtaLabel}
      />

      <CtaSection
        title="Ready to Get Started?"
        description="Submit your enquiry and we'll respond quickly."
        primaryCta={CTA_LINKS.requestCare}
        secondaryCta={CTA_LINKS.contact}
        reassurance={CTA_REASSURANCE}
        variant="primary"
      />

      <FaqPreview items={HOMEPAGE_FAQ} />

      <AreasWeServe areas={HOMEPAGE_AREAS} />

      <CtaSection
        title="Need Care? We're Here to Help."
        description="Submit your enquiry or contact us — we respond quickly."
        primaryCta={CTA_LINKS.requestCare}
        secondaryCta={CTA_LINKS.contact}
        reassurance={CTA_REASSURANCE}
        variant="muted"
      />
    </>
  );
}
