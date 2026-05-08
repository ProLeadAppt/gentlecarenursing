"use client";

import { Hero } from "@/components/sections/Hero";
import { BentoServiceGrid } from "@/components/sections/BentoServiceGrid";
import { PhilosophyJourney } from "@/components/sections/PhilosophyJourney";
import { WhyDifferent } from "@/components/sections/WhyDifferent";
import { ReferralSection } from "@/components/sections/ReferralSection";
import { CompactAreasLine } from "@/components/sections/CompactAreasLine";
import { EvidencePanel } from "@/components/sections/EvidencePanel";
import { CtaSection } from "@/components/sections/CtaSection";
import { SectionDivider } from "@/components/sections/SectionDivider";
import { SectionReveal } from "@/components/animations/SectionReveal";
import { NewsletterSignup } from "@/components/forms/NewsletterSignup";
import { useFormModal } from "@/contexts/FormModalContext";
import { Button } from "@/components/ui/Button";
import { CTA_LINKS, HERO_REASSURANCE } from "@/lib/constants";
import { getFaqSchema, getHowToSchema } from "@/lib/schema";
import {
  HOMEPAGE_HERO,
  WHY_DIFFERENT,
  HOMEPAGE_EVIDENCE,
  PROCESS_STEPS,
  REFERRAL_PROFESSIONALS,
  HOMEPAGE_FAQ,
  HOMEPAGE_AREAS,
  HOMEPAGE_INLINE_CTAS,
  HOMEPAGE_FINAL_CTA,
} from "@/content/homepage";
import { ABOUT_INTRO } from "@/content/about";

/**
 * Homepage flow (compaction pass — 2026-05-08):
 *
 *   1. Hero
 *   2. Personalised Care & Support (services, compact bento grid)
 *   3. Our Care Philosophy + Your Journey (two-column on desktop, stacks on mobile)
 *   4. Why Choose Gentle Care (no floating credential badges on the photo)
 *   5. Referral section (for partners/coordinators)
 *   6. Compact Areas line (one row, six region names + link to /areas)
 *   7. Evidence Panel (AEO/GEO citable facts — moved to the bottom, compact treatment)
 *   8. Newsletter
 *   9. Final CTA
 *
 * Removed from the homepage (still live on the rest of the site):
 *   - TrustMarquee carousel
 *   - Standalone AboutUsSection + standalone ProcessTimeline (replaced by
 *     PhilosophyJourney; the standalone components remain available for
 *     other pages)
 *   - Full AreasWeServe card grid (replaced by CompactAreasLine; full grid
 *     still on /areas)
 *   - Visible FaqPreview (the same FAQ items continue to be emitted as
 *     FAQPage JSON-LD via getFaqSchema below, so AI engines and Google
 *     still see them in static HTML; users go to /faq for the visible UI)
 */

const howToSchema = getHowToSchema(
  "How to request care from Gentle Care Nursing Services",
  "Tell us what you need and get immediate confirmation. We acknowledge straight away and respond within 24 hours with clear next steps, then match you with the right support.",
  PROCESS_STEPS.steps,
  "/"
);

// FAQ schema is still emitted in the static HTML even though the visible
// FAQ section was removed from the homepage. This keeps the AEO signal —
// AI engines extract from JSON-LD, not from the rendered DOM. Users who
// want the full FAQ click through to /faq, where the visible UI lives.
const faqSchema = getFaqSchema([...HOMEPAGE_FAQ]);

export default function HomePageContent() {
  const { openModal } = useFormModal();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 1. Hero (Immediate Clarity) */}
      <Hero
        headlineSegments={HOMEPAGE_HERO.headlineSegments}
        subheadline={HOMEPAGE_HERO.subheadline}
        eyebrow={HOMEPAGE_HERO.eyebrow}
        primaryCta={CTA_LINKS.requestCare}
        reassurance={HERO_REASSURANCE}
        imageSrc={HOMEPAGE_HERO.heroImageSrc}
        imageAlt={HOMEPAGE_HERO.heroImageAlt}
        videoSrc={[
          { src: "/video/hero-loop.webm", type: "video/webm" },
          { src: "/video/hero-loop.mp4", type: "video/mp4" },
        ]}
        videoPoster={HOMEPAGE_HERO.heroImageSrc}
      />

      {/* 2. Services — sit directly under the hero per Gemma's brief */}
      <BentoServiceGrid />

      {/* 3. Our Care Philosophy + Your Journey (combined two-column section) */}
      <SectionReveal>
        <PhilosophyJourney
          title={ABOUT_INTRO.title}
          lead={ABOUT_INTRO.lead}
          statsLine={ABOUT_INTRO.statsLine}
        />
      </SectionReveal>

      <SectionDivider variant="curve" color="#fcf9f9" bgColor="white" />

      {/* 4. Why Choose Gentle Care */}
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
          <div className="border-t border-border/30 bg-muted/50 py-6">
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

      {/* 5. Referral section (Professional Focus) */}
      <SectionReveal>
        <ReferralSection
          headline={REFERRAL_PROFESSIONALS.headline}
          subtitle={REFERRAL_PROFESSIONALS.subtitle}
        />
      </SectionReveal>

      {/* 6. Compact Areas We Serve line (local-SEO anchor without the card grid) */}
      <CompactAreasLine areas={HOMEPAGE_AREAS} />

      {/* 7. Evidence Panel (AEO/GEO) — moved to bottom, compact treatment */}
      <EvidencePanel
        heading={HOMEPAGE_EVIDENCE.heading}
        intro={HOMEPAGE_EVIDENCE.intro}
        items={HOMEPAGE_EVIDENCE.items}
        density="compact"
      />

      {/* 8. Newsletter */}
      <SectionReveal>
        <section className="py-16 sm:py-20">
          <NewsletterSignup variant="section" />
        </section>
      </SectionReveal>

      {/* 9. Final CTA */}
      <CtaSection
        title={HOMEPAGE_FINAL_CTA.title}
        primaryCta={CTA_LINKS.requestCare}
        secondaryCta={CTA_LINKS.makeReferral}
        onPrimaryClick={() => openModal("care-finder")}
        onSecondaryClick={() => openModal("referral")}
        reassurance={HOMEPAGE_FINAL_CTA.reassurance}
        variant="primary"
      />
    </>
  );
}
