import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { StatsBar } from "@/components/sections/StatsBar";
import { ReassuranceSection } from "@/components/sections/ReassuranceSection";
import { WhoWeHelp } from "@/components/sections/WhoWeHelp";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { WhyDifferent } from "@/components/sections/WhyDifferent";
import { Testimonials } from "@/components/sections/Testimonials";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ReferralProfessionalsSection } from "@/components/sections/ReferralProfessionalsSection";
import { QuickResponseSection } from "@/components/sections/QuickResponseSection";
import { FaqPreview } from "@/components/sections/FaqPreview";
import { AreasWeServe } from "@/components/sections/AreasWeServe";
import { HomepageCtaSections } from "@/components/sections/HomepageCtaSections";
import { CtaSection } from "@/components/sections/CtaSection";
import { SectionDivider } from "@/components/sections/SectionDivider";
import Link from "next/link";
import { CTA_LINKS, HERO_REASSURANCE } from "@/lib/constants";
import { getHowToSchema } from "@/lib/schema";
import {
  HOMEPAGE_HERO,
  REASSURANCE_SECTION,
  WHO_WE_HELP,
  WHY_DIFFERENT,
  HOMEPAGE_SERVICES_IMAGE,
  PROCESS_STEPS,
  REFERRAL_PROFESSIONALS,
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
        reassurance={HERO_REASSURANCE}
        imageSrc={HOMEPAGE_HERO.heroImageSrc}
        imageAlt={HOMEPAGE_HERO.heroImageAlt}
      />

      <TrustBar variant="muted" />

      <StatsBar stats={HOMEPAGE_STATS} />

      <div className="h-12 shrink-0 sm:h-14" aria-hidden />

      <div>
        <ReassuranceSection
          headline={REASSURANCE_SECTION.headline}
          problems={REASSURANCE_SECTION.problems}
          transitionLine={REASSURANCE_SECTION.transitionLine}
          sectionVariant="teal"
        />
      </div>

      <SectionDivider variant="tealToWhite" />

      <div>
        <WhoWeHelp
          title={WHO_WE_HELP.title}
          subtitle={WHO_WE_HELP.subtitle}
          audiences={WHO_WE_HELP.audiences}
          sectionImage={WHO_WE_HELP.sectionImage}
          sectionImageAlt={WHO_WE_HELP.sectionImageAlt}
          sectionVariant="default"
        />
        <div className="border-t border-border/30 bg-muted/50 py-8">
          <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
            <p className="text-sm text-muted-foreground">{HOMEPAGE_INLINE_CTAS.afterWhoWeHelp}</p>
            <Link
              href={CTA_LINKS.requestCare.href}
              className="mt-3 inline-block min-h-[2.75rem] py-2 font-medium text-primary hover:underline"
            >
              Request care or contact us
            </Link>
          </div>
        </div>
      </div>

      <SectionDivider variant="whiteToTeal" />

      <div>
        <ServiceCards
          subtitle="Personalised in-home nursing and care for NDIS, DVA, aged care, and private clients. We're here to support you or someone you love."
          sectionImage={HOMEPAGE_SERVICES_IMAGE.sectionImage}
          sectionImageAlt={HOMEPAGE_SERVICES_IMAGE.sectionImageAlt}
          sectionVariant="teal"
        />
      </div>

      <SectionDivider variant="tealToWhite" />

      <div>
        <WhyDifferent
          title={WHY_DIFFERENT.title}
          subtitle={WHY_DIFFERENT.subtitle}
          differentiators={WHY_DIFFERENT.differentiators}
          imageSrc={WHY_DIFFERENT.imageSrc}
          imageAlt={WHY_DIFFERENT.imageAlt}
          sectionVariant="default"
        />
        <div className="border-t border-border/30 bg-muted/50 py-8">
          <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
            <p className="text-sm text-muted-foreground">{HOMEPAGE_INLINE_CTAS.afterWhyDifferent}</p>
            <Link
              href={CTA_LINKS.requestCare.href}
              className="mt-3 inline-block min-h-[2.75rem] py-2 font-medium text-primary hover:underline"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </div>

      <SectionDivider variant="whiteToTeal" />

      <div>
        <Testimonials
          testimonials={HOMEPAGE_TESTIMONIALS}
          title="What Families & Partners Say"
          subtitle="Hear from those who've trusted us with their care, and why they feel confident we'll look after them."
          label="Stories from families and professionals"
          sectionVariant="teal"
        />
      </div>

      <SectionDivider variant="tealToWhite" />

      <div>
        <ProcessSteps
          title={PROCESS_STEPS.title}
          subtitle={PROCESS_STEPS.subtitle}
          steps={PROCESS_STEPS.steps}
          cta={CTA_LINKS.requestCare}
          sectionVariant="default"
        />
      </div>

      <SectionDivider variant="whiteToTeal" />

      <div>
        <ReferralProfessionalsSection
          headline={REFERRAL_PROFESSIONALS.headline}
          subtitle={REFERRAL_PROFESSIONALS.subtitle}
          cta={CTA_LINKS.makeReferral}
          sectionVariant="teal"
        />
      </div>

      <SectionDivider variant="tealToWhite" />

      <div>
        <QuickResponseSection
          title={GET_IN_TOUCH.title}
          subtitle={GET_IN_TOUCH.subtitle}
          primaryCtaLabel={GET_IN_TOUCH.primaryCtaLabel}
          secondaryCtaLabel={GET_IN_TOUCH.secondaryCtaLabel}
          primaryCtaHref={CTA_LINKS.requestCare.href}
          secondaryCtaHref={CTA_LINKS.contact.href}
          benefits={GET_IN_TOUCH.benefits}
          voiceAssistantLine={GET_IN_TOUCH.voiceAssistantLine}
          sectionVariant="default"
        />
      </div>

      <div className="h-12 shrink-0 sm:h-14" aria-hidden />

      <div>
        <HomepageCtaSections />
      </div>

      <div className="h-12 shrink-0 sm:h-14" aria-hidden />

      <div>
        <FaqPreview
          items={HOMEPAGE_FAQ}
          title="Common Questions"
          subtitle="Quick answers to things people often ask. We're happy to explain more. Just get in touch."
          sectionVariant="default"
        />
      </div>

      <SectionDivider variant="whiteToTeal" />

      <div>
        <AreasWeServe
          areas={HOMEPAGE_AREAS}
          title="Areas We Serve"
          subtitle="We provide in-home nursing and care across Sydney and surrounds. Wherever you are in the region, we're here to help."
          sectionVariant="teal"
        />
      </div>

      <SectionDivider variant="tealToWhite" />

      <CtaSection
        title={HOMEPAGE_FINAL_CTA.title}
        primaryCta={CTA_LINKS.requestCare}
        secondaryCta={CTA_LINKS.makeReferral}
        reassurance={HOMEPAGE_FINAL_CTA.reassurance}
        variant="primary"
      />
    </>
  );
}
