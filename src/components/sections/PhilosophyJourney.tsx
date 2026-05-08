"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/animations/Reveal";
import { Heart, Sparkles, MessageSquare, PhoneCall, UserPlus, HandHeart } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Combined Philosophy + Journey section.
 *
 * Replaces the standalone AboutUsSection + ProcessTimeline pair on the
 * homepage. Renders both as a single section with two columns on desktop
 * (≥ lg) and stacks on mobile, so the user sees both Gentle Care's
 * positioning and the four-step enquiry journey without scrolling between
 * separate full-bleed sections.
 *
 * Each column keeps its own H2 ("Our Care Philosophy" / "From Enquiry to
 * Peace of Mind") so the heading hierarchy and AEO/SEO signal of the
 * original sections are preserved — this is purely a layout compaction,
 * not a content reduction.
 *
 * Standalone AboutUsSection and ProcessTimeline still exist and are used
 * elsewhere (e.g. detail pages); only the homepage embed changes.
 */

const JOURNEY_STEPS: readonly {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}[] = [
  {
    title: "Make an Enquiry",
    description: "Tell us a little about the support you're looking for.",
    icon: MessageSquare,
    color: "#6b9360",
  },
  {
    title: "We Aim to Respond Within 24 Hours",
    description: "Our team personally reviews your needs and contacts you.",
    icon: PhoneCall,
    color: "#1b6b6d",
  },
  {
    title: "We Match You With Your Carer",
    description: "We carefully match you with the right support team.",
    icon: UserPlus,
    color: "#c4704b",
  },
  {
    title: "Care Begins",
    description: "Ongoing support with a team that truly knows you.",
    icon: HandHeart,
    color: "#842833",
  },
];

interface PhilosophyJourneyProps {
  title: string;
  lead: string;
  statsLine: string;
}

export function PhilosophyJourney({ title, lead, statsLine }: PhilosophyJourneyProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();
  const animate = inView || !!prefersReducedMotion;

  return (
    <section
      ref={sectionRef}
      className="py-20 sm:py-24 bg-white overflow-hidden"
      aria-labelledby="philosophy-heading"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left column — Care Philosophy */}
          <div className="lg:pr-4">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary/80 mb-4">
                Our Care Philosophy
              </p>
              <Heading
                level="h2"
                as="h2"
                id="philosophy-heading"
                className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-[1.2] mb-6"
              >
                {title}
              </Heading>
              <p className="text-base leading-relaxed text-muted-foreground font-medium mb-8 max-w-xl">
                {lead}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="space-y-5">
                <div className="flex items-start gap-4 group">
                  <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-white transition-colors duration-500">
                    <Heart className="h-5 w-5 text-accent group-hover:text-white transition-colors duration-500" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold mb-1">Over 10 Years of Hands-On Care Experience</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{statsLine}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                    <Sparkles className="h-5 w-5 text-primary group-hover:text-white transition-colors duration-500" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold mb-1">Personalised Care Management</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Every client receives personalised coordination and consistent support.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right column — From Enquiry to Peace of Mind */}
          <div className="lg:pl-4 lg:border-l lg:border-border/40">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-pw-sage mb-4">
                Your Journey
              </p>
              <Heading
                level="h2"
                as="h2"
                className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-8"
              >
                From Enquiry to Peace of Mind
              </Heading>
            </Reveal>

            <ol className="space-y-4">
              {JOURNEY_STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.li
                    key={step.title}
                    initial={prefersReducedMotion ? false : { opacity: 0, x: 12 }}
                    animate={animate ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.1 + i * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="flex items-start gap-4 rounded-xl border border-border/60 bg-white p-4 shadow-[0_2px_8px_rgba(132,40,51,0.04)]"
                  >
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${step.color}1a`, color: step.color }}
                    >
                      <Icon className="h-4 w-4" strokeWidth={2} />
                    </div>
                    <div className="min-w-0">
                      <p
                        className="text-[10px] font-bold uppercase tracking-[0.18em] mb-0.5"
                        style={{ color: step.color }}
                      >
                        Step {i + 1}
                      </p>
                      <h3 className="text-sm font-bold text-foreground leading-snug">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
