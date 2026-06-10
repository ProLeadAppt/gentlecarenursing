"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { HERO_VARIANTS } from "@/design-system/tokens";
import { SITE } from "@/lib/constants";
import { Magnetic } from "@/components/animations/Magnetic";
import { useFormModal } from "@/contexts/FormModalContext";
import { useIsDesktop } from "@/hooks/useMediaQuery";

export interface HeroCta {
  href: string;
  label: string;
}

interface HeroProps {
  /** Pass an array of headline segments for the staggered reveal: ["Compassionate", "In-Home Care", "& Disability Support"] */
  headlineSegments?: readonly string[];
  /** Fallback single headline string */
  headline?: string;
  subheadline?: string;
  eyebrow?: string;
  primaryCta: HeroCta;
  secondaryCta?: HeroCta;
  imageSrc?: string;
  imageAlt?: string;
  /** Optional looping background video. Single string for one source, or
      an array of `{ src, type }` to provide multiple formats (e.g. WebM + MP4)
      so the browser can pick the smallest one it supports. */
  videoSrc?: string | readonly { src: string; type: string }[];
  /** Optional poster shown while the video loads — usually the same as imageSrc. */
  videoPoster?: string;
  /** Brand-coloured credential dots — small row, not a full strip. */
  credentials?: readonly { label: string; color: string }[];
}

export function Hero({
  headlineSegments,
  headline,
  subheadline,
  eyebrow,
  primaryCta,
  secondaryCta,
  imageSrc = "/images/vitaly-gariev-Wk6f1CkGlEo-unsplash.webp",
  imageAlt = "Personalised in-home care delivered with warmth",
  videoSrc,
  videoPoster,
  credentials = [],
}: HeroProps) {
  const { openModal } = useFormModal();
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useIsDesktop();
  // Parallax stays off below `md` and when the user prefers reduced motion.
  // Hooks must be called unconditionally; we gate the *output* via this flag
  // so the scroll-driven transforms become inert (`y: 0%`, `opacity: 1`) on
  // mobile, eliminating per-frame layout reads on the LCP element.
  const enableParallax = isDesktop && !prefersReducedMotion;
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], enableParallax ? ["0%", "20%"] : ["0%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], enableParallax ? [1, 0] : [1, 1]);

  // Determine headline segments — support both new segmented and legacy single-string API
  const segments = headlineSegments ?? (headline ? [headline] : ["Personalised", "In-Home Care & Support"]);

  return (
    <section
      ref={containerRef}
      // Reduced from 90vh → auto height. 90vh + flex items-center produced
      // huge empty space above the content because the image column is
      // ~50rem tall and the content column is much shorter. Clean, simple
      // hero now: content sits at the top of the left column, image fills
      // its natural aspect ratio.
      className="relative overflow-hidden bg-white"
      aria-labelledby="hero-heading"
    >
      {/* Ambient gradient orbs — GPU-composited */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="ambient-orb ambient-orb-sage absolute -top-24 -right-24 w-[400px] h-[400px] lg:w-[500px] lg:h-[500px]" />
        <div className="ambient-orb ambient-orb-teal absolute -bottom-16 left-[15%] w-[320px] h-[320px] lg:w-[400px] lg:h-[400px]" />
        <div className="absolute top-[20%] right-[10%] w-[25%] h-[25%] rounded-full bg-accent/5 blur-[80px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 xl:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-16 xl:gap-24 lg:items-center">
          {/* Left column: headline + subheadline + CTAs, top-aligned. */}
          <motion.div
            className="order-1 flex flex-col justify-start py-16 sm:py-20 lg:py-24"
            variants={prefersReducedMotion ? undefined : HERO_VARIANTS.container}
            initial={prefersReducedMotion ? false : "hidden"}
            animate="visible"
          >
            <div className="max-w-2xl">
              {/* Eyebrow — only render if explicitly provided */}
              {eyebrow && (
                <motion.p
                  variants={HERO_VARIANTS.word}
                  className="mb-6 text-xs font-semibold tracking-[0.2em] text-pw-sage uppercase"
                >
                  {eyebrow}
                </motion.p>
              )}

              {/* Staggered headline */}
              <h1 id="hero-heading" className="mb-2">
                {segments.map((segment, i) => (
                  <motion.span
                    key={i}
                    variants={HERO_VARIANTS.word}
                    className={
                      i === 0
                        ? "block font-[family-name:var(--font-serif)] text-4xl sm:text-6xl lg:text-[4.5rem] xl:text-[5.5rem] leading-[1.02] tracking-tight font-bold text-foreground"
                        : i === 1
                          ? "block font-[family-name:var(--font-serif)] text-4xl sm:text-6xl lg:text-[4.5rem] xl:text-[5.5rem] leading-[1.02] tracking-tight font-bold text-primary"
                          : "block font-[family-name:var(--font-serif)] text-2xl sm:text-3xl lg:text-4xl leading-[1.2] text-muted-foreground italic mt-2"
                    }
                  >
                    {segment}
                  </motion.span>
                ))}
              </h1>

              {/* Gradient divider line */}
              <motion.div
                variants={HERO_VARIANTS.word}
                className="gradient-divider mt-6 mb-6"
                style={{ width: 40 }}
              />

              {/* Subheadline */}
              {subheadline && (
                <motion.p
                  variants={HERO_VARIANTS.word}
                  className="text-lg sm:text-xl leading-relaxed text-muted-foreground max-w-xl"
                >
                  {subheadline}
                </motion.p>
              )}

              {/* CTA: primary button + (secondary CTA OR inline call).
                  If primaryCta.href is provided we render a real <a> so the
                  link works without JS (and so #anchors scroll natively).
                  Otherwise the button triggers the care-finder modal. */}
              <motion.div
                variants={HERO_VARIANTS.word}
                className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
              >
                {primaryCta.href ? (
                  <Magnetic>
                    <a
                      href={primaryCta.href}
                      className="group inline-flex items-center justify-center rounded-full bg-primary px-10 py-4 text-base font-semibold text-primary-foreground shadow-sm transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                    >
                      {primaryCta.label}
                      <span
                        className="inline-block ml-2 transition-transform duration-200 group-hover:translate-x-1"
                        aria-hidden
                      >
                        →
                      </span>
                    </a>
                  </Magnetic>
                ) : (
                  <Magnetic>
                    <Button
                      onClick={() => openModal("contact")}
                      size="xl"
                      variant="primary"
                      className="group px-10"
                    >
                      {primaryCta.label}
                      <span
                        className="inline-block ml-2 transition-transform duration-200 group-hover:translate-x-1"
                        aria-hidden
                      >
                        →
                      </span>
                    </Button>
                  </Magnetic>
                )}
                {secondaryCta ? (
                  <a
                    href={secondaryCta.href}
                    className="text-primary font-medium text-base hover:underline transition-colors"
                  >
                    {secondaryCta.label} →
                  </a>
                ) : (
                  <a
                    href={SITE.phoneHref}
                    className="text-primary font-medium text-base hover:underline transition-colors"
                  >
                    or call <span className="underline">{SITE.phone}</span>
                  </a>
                )}
              </motion.div>

              {/* Brand-coloured credential dots removed — they were
                  duplicating the subheadline text
                  ("NDIS Registered · DVA Contracted · Aged Care Support"),
                  which is Gemma's verbatim copy from her brief. The
                  character is already in the headline, divider, orbs,
                  and burgundy CTA. */}
            </div>
          </motion.div>

          {/* Right column: hero media (image OR square looping video) with floating badges.
              When `videoSrc` is set, the container locks to a 1:1 ratio so the
              square source (e.g. 960×960) fills edge-to-edge with no cropping
              of any in-frame copy. Image mode keeps the original tall layout. */}
          <motion.div
            className={
              videoSrc
                ? "order-2 relative w-full max-w-[40rem] mx-auto aspect-square lg:max-w-none lg:aspect-square lg:h-auto"
                // Trimmed down from h-[80vh] / min-h-[42rem]: the hero no
                // longer stretches to fill the viewport. Image is now a
                // comfortable 4:3 portrait on desktop.
                : "order-2 relative aspect-[4/3] w-full lg:aspect-[5/4] max-h-[36rem] mx-auto"
            }
            style={{ y, opacity }}
          >
            <div className="relative h-full w-full">
              {/* Decorative blurs */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent/20 rounded-full blur-2xl z-0" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl z-0" />

              <div
                className={
                  videoSrc
                    ? "relative h-full w-full overflow-hidden rounded-[3rem] lg:rounded-[4.5rem] shadow-[0_32px_64px_-16px_rgba(132,40,51,0.2)] ring-1 ring-black/5 bg-warm-cream"
                    : "relative h-full w-full overflow-hidden rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(132,40,51,0.2)] lg:rounded-[4.5rem] border border-white/20 image-brand-overlay"
                }
              >
                {videoSrc ? (
                  <video
                    className="absolute inset-0 h-full w-full object-cover object-center"
                    {...(typeof videoSrc === "string" ? { src: videoSrc } : {})}
                    poster={videoPoster ?? imageSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    aria-label={imageAlt}
                  >
                    {Array.isArray(videoSrc) &&
                      videoSrc.map((s) => <source key={s.src} src={s.src} type={s.type} />)}
                  </video>
                ) : (
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    className="object-cover object-center"
                    priority
                    fetchPriority="high"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                )}
                {/* Subtle bottom vignette — only when no video, so we never dim copy baked into the frame */}
                {!videoSrc && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                )}
                {/* Badge overlays removed per Gemma's brief 2026-06-10
                    (no repeated badges or reassurance strips on the hero image). */}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
