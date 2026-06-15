"use client";

import { Hero } from "@/components/sections/Hero";
import { SimpleContactForm } from "@/components/forms/SimpleContactForm";
import { Container } from "@/components/layout/Container";
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
 * Brand character (added after Gemma's review of the barebones v1):
 *   - Subtle sage + teal ambient orbs behind the hero
 *   - Serif headlines (Cormorant Garamond) with multi-tone brand colours
 *   - Gradient divider line under the headline
 *   - Burgundy primary CTA, sage ghost secondary
 *   - Cream + sage section background tints (alternating, not all white)
 *   - Brand-coloured credential dots — small single row in the hero
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

      {/* 2. Who we support — cream tint background, serif heading, brand-coloured hover */}
      <section
        className="relative py-20 sm:py-24 lg:py-28"
        style={{
          background:
            "linear-gradient(180deg, #fdf6ec 0%, #f8f4ef 60%, #fdf6ec 100%)",
        }}
        aria-labelledby="who-we-support"
      >
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-semibold tracking-[0.25em] text-primary uppercase mb-4">
              Who we support
            </p>
            <h2
              id="who-we-support"
              className="font-[family-name:var(--font-serif)] text-4xl sm:text-5xl font-bold text-foreground"
            >
              Care for the people you love
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              We work with families, participants, veterans, and health
              professionals across Sydney to deliver consistent, respectful
              in-home care.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WHO_WE_SUPPORT.items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group block rounded-2xl border border-pw-border bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_40px_-20px_rgba(132,40,51,0.25)]"
              >
                <h3 className="text-2xl font-bold text-foreground group-hover:text-primary">
                  {item.label}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more →
                </span>
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. Our services — white with subtle sage wash on the right, serif heading */}
      <section
        className="relative py-20 sm:py-24 lg:py-28 bg-white overflow-hidden"
        aria-labelledby="our-services"
      >
        {/* Decorative sage blob — soft, behind content */}
        <div
          aria-hidden
          className="absolute -right-32 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(107,147,96,0.10) 0%, transparent 70%)",
          }}
        />
        <Container>
          <div className="text-center max-w-2xl mx-auto relative">
            <p className="text-xs font-semibold tracking-[0.25em] text-primary uppercase mb-4">
              Our services
            </p>
            <h2
              id="our-services"
              className="font-[family-name:var(--font-serif)] text-4xl sm:text-5xl font-bold text-foreground"
            >
              What we do
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {OUR_SERVICES.subtitle}
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 relative">
            {OUR_SERVICES.items.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative block rounded-2xl border border-pw-border bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_20px_40px_-20px_rgba(132,40,51,0.20)]"
              >
                {/* Small accent numeral in the corner */}
                <span className="absolute top-4 right-5 font-[family-name:var(--font-serif)] text-2xl font-bold text-pw-sage/30 group-hover:text-pw-sage/60 transition-colors">
                  0{i + 1}
                </span>
                <h3 className="text-2xl font-bold text-foreground group-hover:text-primary pr-8">
                  {item.label}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Read more →
                </span>
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Why choose us — sage gradient background, white cards with sage accent dots */}
      <section
        className="relative py-20 sm:py-24 lg:py-28 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(107,147,96,0.10) 0%, rgba(253,246,236,0.6) 50%, rgba(213,180,184,0.18) 100%)",
        }}
        aria-labelledby="why-choose"
      >
        <Container size="md">
          <div className="text-center">
            <p className="text-xs font-semibold tracking-[0.25em] text-primary uppercase mb-4">
              Why Gentle Care
            </p>
            <h2
              id="why-choose"
              className="font-[family-name:var(--font-serif)] text-4xl sm:text-5xl font-bold text-foreground"
            >
              {WHY_CHOOSE.title}
            </h2>
          </div>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {WHY_CHOOSE.items.map((bullet, i) => (
              <li
                key={bullet}
                className="flex items-start gap-4 rounded-2xl border border-pw-border bg-white p-5 shadow-sm transition-shadow hover:shadow-[0_10px_30px_-10px_rgba(107,147,96,0.30)]"
              >
                <span
                  aria-hidden
                  className={`mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${
                    i % 3 === 0
                      ? "bg-pw-sage"
                      : i % 3 === 1
                        ? "bg-pw-teal"
                        : "bg-pw-terracotta"
                  }`}
                >
                  ✓
                </span>
                <span className="text-foreground leading-relaxed">
                  {bullet}
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 5. Contact / referral form — warm cream background, branded submit button */}
      <section
        id="get-in-touch"
        className="relative py-20 sm:py-24 lg:py-28 scroll-mt-20"
        style={{
          background: "linear-gradient(180deg, #fdf6ec 0%, #ffffff 100%)",
        }}
        aria-labelledby="get-in-touch-title"
      >
        <Container size="md">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-semibold tracking-[0.25em] text-primary uppercase mb-4">
              Get in touch
            </p>
            <h2
              id="get-in-touch-title"
              className="font-[family-name:var(--font-serif)] text-4xl sm:text-5xl font-bold text-foreground"
            >
              Let&apos;s talk about care
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Tell us a little about what you need. We&apos;ll respond within 24
              hours. No obligation.
            </p>
          </div>
          <div className="mt-12">
            <SimpleContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}
