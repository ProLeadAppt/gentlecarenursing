"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Quote, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Heading } from "@/components/ui/Heading";

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
  sectionVariant = "default",
}: TestimonialsProps) {
  return (
    <Section id="testimonials" variant={sectionVariant} size="xl" className="overflow-hidden">
      <Container>
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <span className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary/70">
              {label}
            </span>
            <Heading level="h2" className="text-4xl sm:text-5xl font-[family-name:var(--font-serif)]">
              {title}
            </Heading>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              {subtitle}
            </p>
          </div>
        </Reveal>

        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 150}>
              <div className="group relative flex h-full flex-col rounded-[2.5rem] border border-border/50 bg-card/40 p-10 shadow-sm backdrop-blur-sm transition-all duration-700 hover:border-primary/20 hover:bg-card/60 hover:shadow-xl">
                {/* Decorative Elements */}
                <div className="absolute top-8 right-10 opacity-[0.05] transition-opacity duration-700 group-hover:opacity-[0.1]">
                  <Quote className="h-16 w-16 text-primary rotate-12" />
                </div>

                {t.rating != null && t.rating >= 1 && (
                  <div
                    className="mb-8 flex gap-1"
                    role="img"
                    aria-label={`${t.rating} out of 5 stars`}
                  >
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={cn(
                          "h-4 w-4 transition-colors duration-500",
                          star <= (t.rating ?? 0) ? "text-accent fill-accent" : "text-muted/30"
                        )}
                        strokeWidth={1}
                        aria-hidden
                      />
                    ))}
                  </div>
                )}

                <blockquote className="relative z-10 flex-grow text-xl font-[family-name:var(--font-serif)] italic leading-relaxed text-foreground/90 sm:text-2xl">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div className="mt-10 flex items-center gap-4 border-t border-border/40 pt-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold tracking-tight text-foreground">
                      {t.name}
                    </p>
                    <p className="text-sm font-medium text-muted-foreground">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
