"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Quote, Star } from "lucide-react";

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  /** Optional star rating 1–5 for trust indicator */
  rating?: number;
}

interface TestimonialsProps {
  title?: string;
  subtitle?: string;
  /** Label above the grid (e.g. "Trusted by families and professionals") */
  label?: string;
  testimonials: readonly Testimonial[];
  /** Optional section background variant (used by homepage for alternation) */
  sectionVariant?: "default" | "muted" | "card" | "primary" | "accent" | "gradient" | "teal";
}

export function Testimonials({
  title = "What Families & Partners Say",
  subtitle = "Trusted by families, support coordinators, and healthcare professionals.",
  label = "Trusted by families and professionals",
  testimonials,
  sectionVariant = "gradient",
}: TestimonialsProps) {
  return (
    <Section variant={sectionVariant} size="lg">
      <Container>
        <Reveal>
          <SectionHeader title={title} subtitle={subtitle} />
          {label && (
            <p className="mt-2 text-center text-sm font-medium text-muted-foreground">
              {label}
            </p>
          )}
        </Reveal>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <div className="relative rounded-2xl border border-border/60 bg-card/90 p-8 shadow-sm">
                {t.rating != null && t.rating >= 1 && t.rating <= 5 && (
                  <div
                    className="mb-4 flex gap-0.5"
                    role="img"
                    aria-label={`${t.rating} out of 5 stars`}
                  >
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-4 w-4 text-accent/70"
                        fill={star <= (t.rating ?? 0) ? "currentColor" : "none"}
                        strokeWidth={1.5}
                        aria-hidden
                      />
                    ))}
                  </div>
                )}
                <Quote className="mb-3 h-7 w-7 text-accent/20" aria-hidden />
                <blockquote className="text-base leading-relaxed text-foreground/90">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-6 border-t border-border/50 pt-4">
                  <p className="font-[family-name:var(--font-dm-sans)] font-semibold text-foreground">
                    {t.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
