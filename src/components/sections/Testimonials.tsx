"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Quote } from "lucide-react";

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

interface TestimonialsProps {
  title?: string;
  subtitle?: string;
  testimonials: readonly Testimonial[];
}

export function Testimonials({
  title = "What Families & Partners Say",
  subtitle = "Trusted by families, support coordinators, and healthcare professionals.",
  testimonials,
}: TestimonialsProps) {
  return (
    <Section variant="gradient">
      <Container>
        <Reveal>
          <SectionHeader title={title} subtitle={subtitle} />
        </Reveal>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <div className="relative rounded-2xl border border-border bg-card p-8 shadow-sm">
                <Quote className="mb-4 h-8 w-8 text-accent/30" />
                <blockquote className="text-base leading-relaxed text-foreground/80">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-6 border-t border-border pt-4">
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
