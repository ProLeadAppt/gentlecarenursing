"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { TYPOGRAPHY } from "@/design-system/tokens";
import { HERO_REASSURANCE } from "@/lib/constants";
import { Check } from "lucide-react";
import { Magnetic } from "@/components/animations/Magnetic";
import { Reveal } from "@/components/animations/Reveal";
import { useFormModal } from "@/contexts/FormModalContext";

export interface HeroCta {
  href: string;
  label: string;
}

interface HeroProps {
  headline: string;
  subheadline?: string;
  trustLine?: string;
  primaryCta: HeroCta;
  secondaryCta?: HeroCta;
  valuePills?: readonly string[];
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
  const { openModal } = useFormModal();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[40rem] lg:min-h-[90vh] overflow-hidden flex items-center bg-white"
      aria-labelledby="hero-heading"
    >
      {/* Premium Mesh Gradient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[35%] h-[35%] rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute top-[20%] right-[10%] w-[25%] h-[25%] rounded-full bg-accent/5 blur-[80px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 xl:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-16 xl:gap-24 lg:items-center">
          {/* Left column: copy + CTAs + reassurance + trust bullets */}
          <div className="order-1 flex flex-col justify-center py-20 sm:py-24 lg:py-32">
            <div className="max-w-2xl">
              {trustLine && (
                <Reveal delay={0.1}>
                  <p className="mb-6 text-sm font-semibold tracking-[0.2em] text-primary/80 uppercase sm:text-xs">
                    {trustLine}
                  </p>
                </Reveal>
              )}
              
              <Reveal delay={0.2} y={30}>
                <Heading
                  level="h1"
                  as="h1"
                  id="hero-heading"
                  className={TYPOGRAPHY.heading.h1 + " text-foreground text-4xl sm:text-6xl lg:text-[4.5rem] xl:text-[5.5rem] leading-[1.02] tracking-tight mb-8 font-bold"}
                >
                  {headline}
                </Heading>
              </Reveal>
              
              {subheadline && (
                <Reveal delay={0.3} y={20}>
                  <p className="text-xl sm:text-2xl leading-relaxed text-muted-foreground mt-4 font-medium max-w-xl">
                    {subheadline}
                  </p>
                </Reveal>
              )}

              <Reveal delay={0.4} y={15}>
                <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Magnetic>
                    <Button 
                      onClick={() => openModal("care-finder")}
                      size="xl" 
                      variant="primary"
                      className="px-10 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
                    >
                      {primaryCta.label}
                    </Button>
                  </Magnetic>
                  {secondaryCta && (
                    <Magnetic>
                      <Button 
                        href={secondaryCta.href} 
                        variant="outline" 
                        size="xl"
                        className="px-10"
                      >
                        {secondaryCta.label}
                      </Button>
                    </Magnetic>
                  )}
                </div>
              </Reveal>

              <Reveal delay={0.5}>
                <p className="mt-8 text-sm leading-relaxed text-muted-foreground/80 max-w-md italic border-l-2 border-accent/30 pl-4 py-1">
                  {reassurance}
                </p>
              </Reveal>

              {valuePills && valuePills.length > 0 && (
                <div className="mt-16 overflow-hidden">
                  <Reveal delay={0.6} staggerChildren={0.1}>
                    <ul className="flex flex-wrap gap-x-8 gap-y-6" role="list">
                      {valuePills.map((item) => (
                        <motion.li
                          key={item}
                          className="flex items-center gap-3 group"
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        >
                          <span
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/15 text-primary shadow-sm group-hover:bg-accent/25 transition-colors"
                            aria-hidden
                          >
                            <Check className="h-4 w-4" strokeWidth={3} />
                          </span>
                          <span className="text-base font-semibold text-foreground/90">
                            {item}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </Reveal>
                </div>
              )}
            </div>
          </div>

          {/* Right column: large hero image with parallax feel */}
          <motion.div 
            className="order-2 relative h-[32rem] min-h-[32rem] w-full lg:min-h-[42rem] lg:h-[80vh] lg:max-h-[50rem] perspective-1000"
            style={{ y, opacity }}
          >
            <Reveal delay={0.3} x={40} duration={1.2} fullHeight width="100%" className="h-full">
              <div className="relative h-full w-full">
                {/* Decorative Elements */}
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent/20 rounded-full blur-2xl z-0" />
                <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl z-0" />
                
                <div className="relative h-full w-full overflow-hidden rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(132,40,51,0.2)] lg:rounded-[4.5rem] border border-white/20">
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    className="object-cover object-center transition-transform duration-[12s] ease-linear hover:scale-105"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Floating Trust Badge on Image */}
                  <div className="absolute bottom-10 left-10 right-10 flex justify-center lg:justify-start">
                    <div className="bg-white/80 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-white/50 flex items-center gap-4">
                      <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Check className="h-5 w-5 text-primary" strokeWidth={3} />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-0.5">Response Time</p>
                        <p className="text-base font-bold text-foreground">Within 24 Hours</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
