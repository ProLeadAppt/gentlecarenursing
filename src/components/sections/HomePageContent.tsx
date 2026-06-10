"use client";

import { Hero } from "@/components/sections/Hero";
import { SimpleContactForm } from "@/components/forms/SimpleContactForm";
import {
  HOMEPAGE_HERO,
  WHO_WE_SUPPORT,
  OUR_SERVICES,
  WHY_CHOOSE,
} from "@/content/homepage";

// Per Gemma's brief, the homepage CTAs both scroll to the simple form on
// the same page — that's the whole point of having it on the homepage.
const REQUEST_CARE_CTA = { href: "#get-in-touch", label: "Request Care" } as const;
const REFERRAL_CTA = { href: "#get-in-touch", label: "Make a Referral" } as const;

/**
 * Simplified homepage — Gemma's brief, 2026-06-10.
 *
 * Five sections, in order:
 *   1. Main message  — hero (image, not video) + CTAs
 *   2. Who we support — NDIS, DVA, Aged Care, Private
 *   3. Our services   — six core services
 *   4. Why choose us  — five benefit statements
 *   5. Contact form   — name, phone, email, service type, message
 *
 * Removed (kept live in repo for SEO: suburbs/conditions/compare/guides/blog/FAQ):
 *   - Hero video, PhilosophyJourney, WhyDifferent, ReferralSection,
 *     CompactAreasLine, EvidencePanel, NewsletterSignup, BentoServiceGrid,
 *     mega-badges, AEO/FAQ JSON-LD blocks, repeated stats.
 */

export default function HomePageContent() {
  return (
    <>
      {/* 1. Main message — image-only hero, warm and professional */}
      <Hero
        headlineSegments={HOMEPAGE_HERO.headlineSegments}
        subheadline={HOMEPAGE_HERO.subheadline}
        eyebrow={HOMEPAGE_HERO.eyebrow}
        primaryCta={REQUEST_CARE_CTA}
        secondaryCta={REFERRAL_CTA}
        imageSrc={HOMEPAGE_HERO.heroImageSrc}
        imageAlt={HOMEPAGE_HERO.heroImageAlt}
      />

      {/* 2. Who we support */}
      <section className="bg-white py-16 sm:py-20" aria-labelledby="who-we-support">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
          <h2
            id="who-we-support"
            className="text-3xl sm:text-4xl font-semibold text-foreground text-center"
          >
            {WHO_WE_SUPPORT.title}
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WHO_WE_SUPPORT.items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group block rounded-2xl border border-border/60 bg-white p-6 transition-colors hover:border-primary/40 hover:bg-primary/[0.02]"
              >
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary">
                  {item.label}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Our services */}
      <section className="bg-muted/30 py-16 sm:py-20" aria-labelledby="our-services">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
          <div className="text-center">
            <h2
              id="our-services"
              className="text-3xl sm:text-4xl font-semibold text-foreground"
            >
              {OUR_SERVICES.title}
            </h2>
            {OUR_SERVICES.subtitle && (
              <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
                {OUR_SERVICES.subtitle}
              </p>
            )}
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {OUR_SERVICES.items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group block rounded-2xl border border-border/60 bg-white p-6 transition-colors hover:border-primary/40 hover:bg-primary/[0.02]"
              >
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary">
                  {item.label}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why choose us */}
      <section className="bg-white py-16 sm:py-20" aria-labelledby="why-choose">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-10">
          <h2
            id="why-choose"
            className="text-3xl sm:text-4xl font-semibold text-foreground text-center"
          >
            {WHY_CHOOSE.title}
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {WHY_CHOOSE.items.map((bullet) => (
              <li
                key={bullet}
                className="flex items-start gap-3 rounded-xl border border-border/40 bg-white p-5"
              >
                <span
                  aria-hidden
                  className="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-primary"
                />
                <span className="text-foreground">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Contact / referral form */}
      <section
        className="bg-muted/30 py-16 sm:py-20"
        aria-labelledby="get-in-touch"
      >
        <div className="mx-auto max-w-2xl px-6 sm:px-8 lg:px-10">
          <div className="text-center">
            <h2
              id="get-in-touch"
              className="text-3xl sm:text-4xl font-semibold text-foreground"
            >
              Get in touch
            </h2>
            <p className="mt-3 text-muted-foreground">
              Tell us a little about what you need. We&apos;ll respond within 24
              hours.
            </p>
          </div>
          <div className="mt-10">
            <SimpleContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
