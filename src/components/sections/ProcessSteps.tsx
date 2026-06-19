"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import Link from "next/link";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/animations/Reveal";
import { Magnetic } from "@/components/animations/Magnetic";
import { useFormModal } from "@/contexts/FormModalContext";
import { ClipboardList, MailCheck, Users, HouseHeart, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CTA_LINKS } from "@/lib/constants";

export interface ProcessStep {
  number: number;
  headline: string;
  description: string;
}

interface ProcessStepsProps {
  title?: string;
  subtitle?: string;
  steps: readonly ProcessStep[];
  cta?: { href: string; label: string };
  onCtaClick?: () => void;
  sectionVariant?: "default" | "muted" | "card" | "primary" | "accent" | "gradient" | "teal";
}

const STEP_ICONS: LucideIcon[] = [ClipboardList, MailCheck, Users, HouseHeart];

export function ProcessSteps({
  title = "How It Works",
  subtitle = "From your first enquiry to care at home: clear steps, quick response, and no one left waiting.",
  steps,
  cta,
  onCtaClick,
  sectionVariant = "default",
}: ProcessStepsProps) {
  const { openModal } = useFormModal();

  const handleCtaClick = (e: React.MouseEvent) => {
    if (onCtaClick) {
      e.preventDefault();
      onCtaClick();
    } else if (cta?.href === CTA_LINKS.requestCare.href) {
      e.preventDefault();
      openModal("contact");
    }
  };

  return (
    <Section size="xl" variant={sectionVariant} className="relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-primary/[0.02] rounded-full blur-[120px] pointer-events-none" />
      
      <Container>
        <div className="text-center mb-20 lg:mb-28">
          <Reveal delay={0.1}>
            <span className="mb-6 inline-block text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60">
              The Journey
            </span>
          </Reveal>
          <Reveal delay={0.2}>
            <Heading level="h2" className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground font-[family-name:var(--font-serif)]">
              {title}
            </Heading>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-8 mx-auto max-w-2xl text-xl leading-relaxed text-foreground/90 font-medium">
              {subtitle}
            </p>
          </Reveal>
        </div>

        <div className="relative mt-14">
          {/* Enhanced Desktop horizontal connector */}
          <div
            className="pointer-events-none absolute left-12 right-12 top-20 hidden h-[2px] bg-gradient-to-r from-transparent via-primary/20 to-transparent lg:block"
            aria-hidden
          />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = STEP_ICONS[index % STEP_ICONS.length];
              const isLast = index === steps.length - 1;

              return (
                <Reveal key={step.number} delay={index * 0.15}>
                  <div className="group relative flex h-full flex-col items-center lg:items-start text-center lg:text-left">
                    {/* Desktop connector connector dot */}
                    {!isLast && (
                       <div className="absolute right-0 top-20 hidden lg:block translate-x-1/2 z-20">
                          <div className="h-2 w-2 rounded-full bg-primary/20 ring-4 ring-white shadow-sm" />
                       </div>
                    )}

                    <div className="relative mb-10">
                      <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-[2.5rem] bg-white text-primary ring-1 ring-primary/10 shadow-xl shadow-primary/5 transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-primary group-hover:text-white group-hover:shadow-primary/20">
                        <Icon className="h-10 w-10" strokeWidth={1.2} />
                      </div>
                      
                      {/* Step Number Badge - Ultra High End */}
                      <div className="absolute -right-4 -top-2 z-20 flex h-9 w-9 items-center justify-center rounded-2xl bg-white text-[11px] font-black text-primary shadow-xl ring-1 ring-primary/20 transition-all duration-500 group-hover:-translate-y-1 group-hover:scale-110">
                        {step.number.toString().padStart(2, '0')}
                      </div>
                    </div>

                    <div className="space-y-4 px-4 lg:px-0">
                      <Heading level="h3" className="text-3xl sm:text-[2rem] lg:text-[2.25rem] leading-[1.15] font-bold font-[family-name:var(--font-serif)] text-foreground group-hover:text-primary transition-colors duration-500">
                        {step.headline}
                      </Heading>
                      <p className="text-lg leading-relaxed text-foreground/85 font-medium">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {cta && (
            <Reveal delay={0.6}>
              <div className="mt-24 pt-16 border-t border-border/40 text-center">
                <p className="max-w-2xl mx-auto text-lg text-foreground/85 font-medium mb-12 italic">
                  &ldquo;No pressure to decide on the spot. Reach out and we&apos;ll guide you through the next steps with zero obligation.&rdquo;
                </p>
                <div className="flex justify-center">
                  <Magnetic>
                    <Link
                      href={cta.href}
                      onClick={handleCtaClick}
                      className="inline-flex h-16 items-center justify-center rounded-2xl bg-primary px-12 text-lg font-bold text-white shadow-2xl shadow-primary/20 transition-all hover:-translate-y-1 group"
                    >
                      {cta.label}
                      <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-500 group-hover:translate-x-2" />
                    </Link>
                  </Magnetic>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </Container>
    </Section>
  );
}
