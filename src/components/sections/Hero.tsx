"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { HERO_VARIANTS } from "@/design-system/tokens";
import { HERO_REASSURANCE, SITE } from "@/lib/constants";
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
  reassurance?: string;
  imageSrc?: string;
  imageAlt?: string;
  /** Optional looping background video. Single string for one source, or
      an array of `{ src, type }` to provide multiple formats (e.g. WebM + MP4)
      so the browser can pick the smallest one it supports. */
  videoSrc?: string | readonly { src: string; type: string }[];
  /** Optional poster shown while the video loads — usually the same as imageSrc. */
  videoPoster?: string;
  credentials?: readonly { label: string; color: string }[];
}

const defaultCredentials = [
  { label: "NDIS Registered", color: "#6b9360" },
  { label: "DVA Contracted", color: "#1b6b6d" },
  { label: "Aged Care Support", color: "#c4704b" },
] as const;

export function Hero({
  headlineSegments,
  headline,
  subheadline,
  eyebrow = "Personalised · Compassionate · Trusted",
  primaryCta,
  reassurance = HERO_REASSURANCE,
  imageSrc = "/images/vitaly-gariev-Wk6f1CkGlEo-unsplash.webp",
  imageAlt = "Personalised in-home care delivered with warmth",
  videoSrc,
  videoPoster,
  credentials = defaultCredentials,
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
                className="mt-8 text-sm leading-relaxed text-foreground/70 max-w-md italic border-l-2 border-accent/30 pl-4 py-1"
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

          {/* Right column: hero media (image OR square looping video) with floating badges.
              When `videoSrc` is set, the container locks to a 1:1 ratio so the
              square source (e.g. 960×960) fills edge-to-edge with no cropping
              of any in-frame copy. Image mode keeps the original tall layout. */}
          <motion.div
            className={
              videoSrc
                ? "order-2 relative w-full max-w-[40rem] mx-auto aspect-square lg:max-w-none lg:aspect-square lg:h-auto"
                : "order-2 relative h-[32rem] min-h-[32rem] w-full lg:min-h-[42rem] lg:h-[80vh] lg:max-h-[50rem]"
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

                {/* In image mode the badge sits inside the media (over the photo).
                    In video mode it lives OUTSIDE this overflow-hidden wrapper
                    (rendered below) so it can hover off the rounded corner without
                    being clipped, and never covers in-frame copy. */}
                {!videoSrc && (
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
                        <span className="text-primary">~24hr</span> Response Window
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>

              {videoSrc && (
                <motion.div
                  className="absolute -bottom-5 left-4 sm:left-6 bg-white px-5 py-3 rounded-2xl shadow-xl ring-1 ring-black/5 flex items-center gap-3 z-30"
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
                      <span className="text-primary">~24hr</span> Response Window
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
