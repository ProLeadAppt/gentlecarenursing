import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { WhoWeHelp } from "@/components/sections/WhoWeHelp";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { WhyDifferent } from "@/components/sections/WhyDifferent";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { AiAssistantSection } from "@/components/sections/AiAssistantSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { FaqPreview } from "@/components/sections/FaqPreview";
import { CTA_LINKS } from "@/lib/constants";
import {
  HOMEPAGE_HERO,
  WHO_WE_HELP,
  WHY_DIFFERENT,
  PROCESS_STEPS,
  AI_ASSISTANT,
  HOMEPAGE_FAQ,
} from "@/content/homepage";

export default function HomePage() {
  return (
    <>
      <Hero
        headline={HOMEPAGE_HERO.headline}
        subheadline={HOMEPAGE_HERO.subheadline}
        primaryCta={CTA_LINKS.requestCare}
        secondaryCta={CTA_LINKS.contact}
      />

      <TrustBar variant="muted" />

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
        variant="primary"
      />

      <FaqPreview items={HOMEPAGE_FAQ} />

      <CtaSection
        title="Need Care? We're Here to Help."
        description="Submit your enquiry or contact us — we respond quickly."
        primaryCta={CTA_LINKS.requestCare}
        secondaryCta={CTA_LINKS.contact}
        variant="muted"
      />
    </>
  );
}
