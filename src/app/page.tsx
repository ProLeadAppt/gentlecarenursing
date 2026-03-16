import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { StatsBar } from "@/components/sections/StatsBar";
import { WhoWeHelp } from "@/components/sections/WhoWeHelp";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { WhyDifferent } from "@/components/sections/WhyDifferent";
import { Testimonials } from "@/components/sections/Testimonials";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { QuickResponseSection } from "@/components/sections/QuickResponseSection";
import { FaqPreview } from "@/components/sections/FaqPreview";
import { AreasWeServe } from "@/components/sections/AreasWeServe";
import { HomepageCtaSections } from "@/components/sections/HomepageCtaSections";
import { CtaSection } from "@/components/sections/CtaSection";
import Link from "next/link";
import { CTA_LINKS } from "@/lib/constants";
import { getHowToSchema } from "@/lib/schema";
import {
  HOMEPAGE_HERO,
  WHO_WE_HELP,
  WHY_DIFFERENT,
  PROCESS_STEPS,
  HOMEPAGE_STATS,
  HOMEPAGE_TESTIMONIALS,
  HOMEPAGE_FAQ,
  GET_IN_TOUCH,
  HOMEPAGE_AREAS,
  HOMEPAGE_INLINE_CTAS,
  HOMEPAGE_FINAL_CTA,
} from "@/content/homepage";

const howToSchema = getHowToSchema(
  "How to request care from Gentle Care Nursing",
  "Tell us what you need and get immediate confirmation. We acknowledge straight away and respond within 24 hours with clear next steps, then match you with the right support.",
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
        trustLine={HOMEPAGE_HERO.trustLine}
        valuePills={HOMEPAGE_HERO.valuePills}
        primaryCta={CTA_LINKS.requestCare}
        secondaryCta={CTA_LINKS.contact}
      />

      <TrustBar variant="muted" />

      <StatsBar stats={HOMEPAGE_STATS} />

      <div className="border-t border-border/50">
        <WhoWeHelp
          title={WHO_WE_HELP.title}
          subtitle={WHO_WE_HELP.subtitle}
          audiences={WHO_WE_HELP.audiences}
        />
        <div className="border-t border-border/50 bg-muted/50 py-6">
          <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
            <p className="text-sm text-muted-foreground">{HOMEPAGE_INLINE_CTAS.afterWhoWeHelp}</p>
            <Link
              href={CTA_LINKS.requestCare.href}
              className="mt-2 inline-block font-medium text-primary hover:underline"
            >
              Request care or contact us
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-border/50">
        <ServiceCards
          subtitle="Personalised in-home nursing and care for NDIS, DVA, aged care, and private clients. We're here to support you or someone you love."
        />
      </div>

      <div className="border-t border-border/50">
        <WhyDifferent
          title={WHY_DIFFERENT.title}
          subtitle={WHY_DIFFERENT.subtitle}
          differentiators={WHY_DIFFERENT.differentiators}
        />
        <div className="border-t border-border/50 bg-muted/50 py-6">
          <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
            <p className="text-sm text-muted-foreground">{HOMEPAGE_INLINE_CTAS.afterWhyDifferent}</p>
            <Link
              href={CTA_LINKS.requestCare.href}
              className="mt-2 inline-block font-medium text-primary hover:underline"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-border/50">
        <Testimonials
          testimonials={HOMEPAGE_TESTIMONIALS}
          title="What Families & Partners Say"
          subtitle="Hear from those who've trusted us with their care, and why they feel confident we'll look after them."
          label="Stories from families and professionals"
        />
      </div>

      <div className="border-t border-border/50">
        <ProcessSteps
          title={PROCESS_STEPS.title}
          subtitle={PROCESS_STEPS.subtitle}
          steps={PROCESS_STEPS.steps}
          cta={CTA_LINKS.requestCare}
        />
      </div>

      <div className="border-t border-border/50">
        <QuickResponseSection
          title={GET_IN_TOUCH.title}
          subtitle={GET_IN_TOUCH.subtitle}
          primaryCtaLabel={GET_IN_TOUCH.primaryCtaLabel}
          secondaryCtaLabel={GET_IN_TOUCH.secondaryCtaLabel}
          primaryCtaHref={CTA_LINKS.requestCare.href}
          secondaryCtaHref={CTA_LINKS.contact.href}
          benefits={GET_IN_TOUCH.benefits}
          voiceAssistantLine={GET_IN_TOUCH.voiceAssistantLine}
        />
      </div>

      <div className="border-t border-border/50">
        <HomepageCtaSections />
      </div>

      <div className="border-t border-border/50">
        <FaqPreview
          items={HOMEPAGE_FAQ}
          title="Common Questions"
          subtitle="Quick answers to things people often ask. We're happy to explain more. Just get in touch."
        />
      </div>

      <div className="border-t border-border/50">
        <AreasWeServe
          areas={HOMEPAGE_AREAS}
          title="Areas We Serve"
          subtitle="We provide in-home nursing and care across Sydney and surrounds. Wherever you are in the region, we're here to help."
        />
      </div>

      <CtaSection
        title={HOMEPAGE_FINAL_CTA.title}
        description={HOMEPAGE_FINAL_CTA.description}
        primaryCta={CTA_LINKS.requestCare}
        secondaryCta={CTA_LINKS.contact}
        variant="muted"
      />
    </>
  );
}
