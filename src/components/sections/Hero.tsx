"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { TYPOGRAPHY, ANIMATION_VARIANTS } from "@/design-system/tokens";
import { HERO_REASSURANCE } from "@/lib/constants";
import { Check } from "lucide-react";
import { Magnetic } from "@/components/animations/Magnetic";

export interface HeroCta {
  href: string;
  label: string;
}

interface HeroProps {
  headline: string;
  subheadline?: string;
  /** Optional soft trust line above headline (e.g. "Registered NDIS & DVA provider") */
  trustLine?: string;
  primaryCta: HeroCta;
  secondaryCta?: HeroCta;
  /** Trust bullets shown below reassurance (with Check icons) */
  valuePills?: readonly string[];
  /** Reassurance line under CTAs (default: HERO_REASSURANCE, team notified) */
  reassurance?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export function Hero({
  headline,
  subheadline,
  trustLine,
  primaryCta,
  secondaryCta,
  valuePills,
  reassurance = HERO_REASSURANCE,
  imageSrc = "/images/carer-elderly.webp",
  imageAlt = "Nurse assisting a patient in a home environment",
}: HeroProps) {
  return (
    <section
      className="relative min-h-[28rem] lg:min-h-[85vh] overflow-hidden flex items-center"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 xl:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 xl:gap-16 lg:items-center">
          {/* Left column: copy + CTAs + reassurance + trust bullets */}
          <motion.div 
            className="order-1 flex flex-col justify-center py-16 sm:py-20 lg:py-24"
            initial="hidden"
            animate="visible"
            variants={ANIMATION_VARIANTS.container}
          >
            <div className="max-w-xl">
              {trustLine && (
                <motion.p 
                  variants={ANIMATION_VARIANTS.item}
                  className="mb-5 text-sm font-medium tracking-wide text-muted-foreground sm:text-base"
                >
                  {trustLine}
                </motion.p>
              )}
              <motion.div variants={ANIMATION_VARIANTS.item}>
                <Heading
                  level="h1"
                  as="h1"
                  id="hero-heading"
                  className={TYPOGRAPHY.heading.h1 + " text-foreground text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] leading-[1.1] mb-6"}
                >
                  {headline}
                </Heading>
              </motion.div>
              
              {subheadline && (
                <motion.p 
                  variants={ANIMATION_VARIANTS.item}
                  className="text-lg sm:text-xl leading-relaxed text-muted-foreground mt-2"
                >
                  {subheadline}
                </motion.p>
              )}

              <motion.div 
                variants={ANIMATION_VARIANTS.item}
                className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
              >
                <Magnetic>
                  <Button href={primaryCta.href} size="xl" variant="primary">
                    {primaryCta.label}
                  </Button>
                </Magnetic>
                {secondaryCta && (
                  <Magnetic>
                    <Button href={secondaryCta.href} variant="outline" size="xl">
                      {secondaryCta.label}
                    </Button>
                  </Magnetic>
                )}
              </motion.div>

              <motion.p 
                variants={ANIMATION_VARIANTS.item}
                className="mt-6 text-sm leading-relaxed text-muted-foreground max-w-md italic"
              >
                {reassurance}
              </motion.p>

              {valuePills && valuePills.length > 0 && (
                <motion.ul 
                  className="mt-12 flex flex-col gap-4" 
                  role="list"
                  variants={ANIMATION_VARIANTS.container}
                >
                  {valuePills.map((item) => (
                    <motion.li
                      key={item}
                      variants={ANIMATION_VARIANTS.item}
                      className="flex items-center gap-3"
                    >
                      <span
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent shadow-sm"
                        aria-hidden
                      >
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                      <span className="text-sm font-medium text-foreground sm:text-base">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </div>
          </motion.div>

          {/* Right column: large hero image with parallax feel */}
          <motion.div 
            className="order-2 relative h-[28rem] min-h-[28rem] w-full lg:min-h-[36rem] lg:h-[75vh] lg:max-h-[42rem]"
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <div className="absolute inset-0 overflow-hidden rounded-[2rem] shadow-2xl lg:rounded-[2.5rem]">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover object-center transition-transform duration-[10s] hover:scale-105"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
