"use client";

import { Hero } from "@/components/sections/Hero";
import { TrustMarquee } from "@/components/sections/TrustMarquee";
import { AboutUsSection } from "@/components/sections/AboutUsSection";
import { BentoServiceGrid } from "@/components/sections/BentoServiceGrid";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { WhyDifferent } from "@/components/sections/WhyDifferent";
import { ReferralSection } from "@/components/sections/ReferralSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { FaqPreview } from "@/components/sections/FaqPreview";
import { AreasWeServe } from "@/components/sections/AreasWeServe";
import { CtaSection } from "@/components/sections/CtaSection";
import { SectionDivider } from "@/components/sections/SectionDivider";
import { SectionReveal } from "@/components/animations/SectionReveal";
import { useFormModal } from "@/contexts/FormModalContext";
import { Button } from "@/components/ui/Button";
import { CTA_LINKS, HERO_REASSURANCE } from "@/lib/constants";
import { getHowToSchema } from "@/lib/schema";
import {
  HOMEPAGE_HERO,
  WHY_DIFFERENT,
  HOMEPAGE_SERVICES_IMAGE,
  PROCESS_STEPS,
  REFERRAL_PROFESSIONALS,
  HOMEPAGE_TESTIMONIALS,
  HOMEPAGE_FAQ,
  HOMEPAGE_AREAS,
  HOMEPAGE_INLINE_CTAS,
  HOMEPAGE_FINAL_CTA,
} from "@/content/homepage";
import { ABOUT_INTRO } from "@/content/about";

const howToSchema = getHowToSchema(
  "How to request care from Gentle Care Nursing",
  "Tell us what you need and get immediate confirmation. We acknowledge straight away and respond within 24 hours with clear next steps, then match you with the right support.",
  PROCESS_STEPS.steps,
  "/"
);

export default function HomePage() {
  const { openModal } = useFormModal();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      
      {/* 1. Hero (Immediate Clarity) */}
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

      {/* 2. Trust Marquee (Social Proof) */}
      <TrustMarquee />

      {/* 3. About Us (Personal/Quality) */}
      <SectionReveal>
        <AboutUsSection 
          title={ABOUT_INTRO.title}
          lead={ABOUT_INTRO.lead}
          statsLine={ABOUT_INTRO.statsLine}
        />
      </SectionReveal>

      {/* 4. Process Timeline (Clear Journey) */}
      <ProcessTimeline />

      {/* 5. Services (Action-oriented) */}
      <BentoServiceGrid />
      <SectionDivider variant="curve" color="#fcf9f9" bgColor="white" />

      {/* 5. Why Choose GCN (Differentiators) */}
      <SectionReveal>
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
              <Button
                onClick={() => openModal("care-finder")}
                variant="ghost"
                className="mt-3 text-primary hover:underline hover:bg-transparent h-auto p-0 font-medium"
              >
                Get in touch
              </Button>
            </div>
          </div>
        </div>
      </SectionReveal>

      <SectionDivider variant="wave" color="#fcf9f9" bgColor="white" flip />

      {/* 6. Referral Section (Professional Focus) */}
      <SectionReveal>
        <ReferralSection 
          headline={REFERRAL_PROFESSIONALS.headline}
          subtitle={REFERRAL_PROFESSIONALS.subtitle}
        />
      </SectionReveal>

      <SectionDivider variant="curve" color="#fcf9f9" bgColor="#fcf9f9" position="top" />

      {/* 7. Testimonials */}
      <SectionReveal>
        <Testimonials
          testimonials={HOMEPAGE_TESTIMONIALS}
          title="What Families & Partners Say"
          subtitle="Hear from those who've trusted us with their care, and why they feel confident we'll look after them."
          label="Stories from families and professionals"
          sectionVariant="teal"
        />
      </SectionReveal>

      <SectionDivider variant="slant" color="white" bgColor="#fcf9f9" />

      {/* 8. Service Areas (GEO relevance) */}
      <SectionReveal>
        <AreasWeServe
          areas={HOMEPAGE_AREAS}
          title="Areas We Serve"
          subtitle="We provide in-home nursing and care across Sydney and surrounds. Wherever you are in the region, we're here to help."
          sectionVariant="default"
        />
      </SectionReveal>

      <SectionDivider variant="curve" color="#fcf9f9" bgColor="white" />

      {/* 9. FAQ (Objection Handling) */}
      <SectionReveal>
        <FaqPreview
          items={HOMEPAGE_FAQ}
          title="Common Questions"
          subtitle="Quick answers to things people often ask. We're happy to explain more. Just get in touch."
          sectionVariant="teal"
        />
      </SectionReveal>

      {/* 10. Final CTA */}
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
