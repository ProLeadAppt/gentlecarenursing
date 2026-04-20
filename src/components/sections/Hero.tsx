"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { HERO_VARIANTS } from "@/design-system/tokens";
import { HERO_REASSURANCE, SITE } from "@/lib/constants";
import { Magnetic } from "@/components/animations/Magnetic";
import { useFormModal } from "@/contexts/FormModalContext";

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
  reassurance?: string;
  imageSrc?: string;
  imageAlt?: string;
  credentials?: readonly { label: string; color: string }[];
}

const defaultCredentials = [
  { label: "NDIS Registered", color: "#6b9360" },
  { label: "DVA Approved", color: "#1b6b6d" },
  { label: "10+ Years", color: "#c4704b" },
] as const;

export function Hero({
  headlineSegments,
  headline,
  subheadline,
  eyebrow = "Clinician-Led · Boutique · Sydney",
  primaryCta,
  reassurance = HERO_REASSURANCE,
  imageSrc = "/images/carer-elderly.webp",
  imageAlt = "Nurse assisting a patient in a home environment",
  credentials = defaultCredentials,
}: HeroProps) {
  const { openModal } = useFormModal();
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ["0%", "0%"] : ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], prefersReducedMotion ? [1, 1] : [1, 0]);

  // Determine headline segments — support both new segmented and legacy single-string API
  const segments = headlineSegments ?? (headline ? [headline] : ["Compassionate", "In-Home Care", "& Disability Support"]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[40rem] lg:min-h-[90vh] overflow-hidden flex items-center bg-white"
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
          {/* Left column: staggered cinematic copy */}
          <motion.div
            className="order-1 flex flex-col justify-center py-20 sm:py-24 lg:py-32"
            variants={prefersReducedMotion ? undefined : HERO_VARIANTS.container}
            initial={prefersReducedMotion ? false : "hidden"}
            animate="visible"
          >
            <div className="max-w-2xl">
              {/* Eyebrow */}
              <motion.p
                variants={HERO_VARIANTS.word}
                className="mb-6 text-xs font-semibold tracking-[0.2em] text-pw-sage uppercase"
              >
                {eyebrow}
              </motion.p>

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

              {/* CTA: gradient button + inline call */}
              <motion.div
                variants={HERO_VARIANTS.word}
                className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
              >
                <Magnetic>
                  <Button
                    onClick={() => openModal("care-finder")}
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
                <a
                  href={SITE.phoneHref}
                  className="text-primary font-medium text-base hover:underline transition-colors"
                >
                  or call <span className="underline">{SITE.phone}</span>
                </a>
              </motion.div>

              {/* Reassurance */}
              <motion.p
                variants={HERO_VARIANTS.word}
                className="mt-8 text-sm leading-relaxed text-muted-foreground/80 max-w-md italic border-l-2 border-accent/30 pl-4 py-1"
              >
                {reassurance}
              </motion.p>

              {/* Trust credentials — dot-prefixed inline */}
              <motion.div
                className="mt-10 flex flex-wrap gap-x-5 gap-y-3"
                variants={HERO_VARIANTS.word}
              >
                {credentials.map((cred, i) => (
                  <motion.div
                    key={cred.label}
                    className="flex items-center gap-2"
                    variants={HERO_VARIANTS.credentials}
                    custom={i}
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: cred.color }}
                      aria-hidden
                    />
                    <span className="text-sm text-muted-foreground font-medium">
                      {cred.label}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Right column: hero image with floating badges */}
          <motion.div
            className="order-2 relative h-[32rem] min-h-[32rem] w-full lg:min-h-[42rem] lg:h-[80vh] lg:max-h-[50rem]"
            style={{ y, opacity }}
          >
            <div className="relative h-full w-full">
              {/* Decorative blurs */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent/20 rounded-full blur-2xl z-0" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl z-0" />

              <div className="relative h-full w-full overflow-hidden rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(132,40,51,0.2)] lg:rounded-[4.5rem] border border-white/20 image-brand-overlay">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="object-cover object-center"
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

                {/* Floating badge: 24h Response */}
                <motion.div
                  className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-5 py-3 rounded-xl shadow-lg border border-white/50 flex items-center gap-3"
                  variants={HERO_VARIANTS.badge}
                  initial={prefersReducedMotion ? false : "hidden"}
                  animate="visible"
                  transition={prefersReducedMotion ? undefined : { delay: 1.8 }}
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pw-sage opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-pw-sage" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      <span className="text-primary">24h</span> Response Guarantee
                    </p>
                  </div>
                </motion.div>

                {/* Floating badge: Star rating */}
                <motion.div
                  className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md border border-white/50"
                  variants={HERO_VARIANTS.badge}
                  initial={prefersReducedMotion ? false : "hidden"}
                  animate="visible"
                  transition={prefersReducedMotion ? undefined : { delay: 2.0 }}
                >
                  <span className="text-amber-400 text-sm" aria-hidden>★★★★★</span>
                  <span className="text-xs text-muted-foreground ml-1.5 font-medium">5.0 rated</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
