"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { SimpleContactForm } from "@/components/forms/SimpleContactForm";
import { Container } from "@/components/layout/Container";
import { CredentialsSection } from "@/components/sections/CredentialsSection";
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
 * Six sections, in order:
 *   1. Main message  — hero (image, not video) + CTAs
 *   2. Trust proof    — credentials and quick-response reassurance
 *   3. Who we support — NDIS, DVA, Aged Care, Private
 *   4. Our services   — six core services
 *   5. Why choose us  — five benefit statements
 *   6. Contact form   — name, phone, email, service type, message
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

      {/* Proof / trust block — real credentials before the conversion journey */}
      <CredentialsSection variant="default" />

      {/* Fast route-finder — helps people choose the right starting point */}
      <section className="py-14 sm:py-16 bg-muted/20 border-y border-border/40" aria-labelledby="start-here-title">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold tracking-[0.25em] text-primary uppercase mb-4">
              Start here
            </p>
            <h2 id="start-here-title" className="font-[family-name:var(--font-serif)] text-3xl sm:text-4xl font-bold text-foreground">
              Not sure which page fits your situation?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Pick the route that matches the care you need most, then we’ll take it from there.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "Need funded support?",
                href: "/ndis",
                body: "Use this if the person you’re supporting has an NDIS plan and needs in-home care, daily support, or complex nursing.",
              },
              {
                title: "Veteran care?",
                href: "/dva",
                body: "Use this if the person is an eligible veteran or war widow/widower and needs DVA community nursing at home.",
              },
              {
                title: "Aged care at home?",
                href: "/aged-care",
                body: "Use this if an older person needs personal care, nursing, respite, or post-hospital support at home.",
              },
              {
                title: "Private care?",
                href: "/private-nursing",
                body: "Use this if you want fee-for-service support without waiting for funding approvals or package admin.",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-[1.75rem] border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
              >
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground font-medium">{item.body}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary">
                  Open page <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

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
              <Link
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
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-14 bg-white border-b border-border/40">
        <Container>
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-border/60 bg-muted/20 p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-2">Need help choosing?</p>
                <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl font-bold text-foreground">Go straight to the page that fits best</h2>
                <p className="mt-2 text-sm sm:text-base text-muted-foreground">These are the most common next clicks when families want to compare options quickly.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/services" className="rounded-full border border-border/60 bg-white px-4 py-2 text-sm font-semibold text-foreground hover:border-primary/30 hover:text-primary transition-colors">Services hub</Link>
                <Link href="/referrers" className="rounded-full border border-border/60 bg-white px-4 py-2 text-sm font-semibold text-foreground hover:border-primary/30 hover:text-primary transition-colors">For referrers</Link>
                <Link href="/blog/choosing-the-right-home-care-provider" className="rounded-full border border-border/60 bg-white px-4 py-2 text-sm font-semibold text-foreground hover:border-primary/30 hover:text-primary transition-colors">How to choose a provider</Link>
              </div>
            </div>
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
              <Link
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
              </Link>
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
