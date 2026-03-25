"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { TESTIMONIAL_VARIANTS } from "@/design-system/tokens";

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  rating?: number;
  /** Optional location for GEO trust signals */
  location?: string;
}

interface TestimonialsProps {
  title?: string;
  subtitle?: string;
  label?: string;
  testimonials: readonly Testimonial[];
  sectionVariant?:
    | "default"
    | "muted"
    | "card"
    | "primary"
    | "accent"
    | "gradient"
    | "teal";
}

/** Colour theme per card position — signals audience diversity */
const CARD_ACCENTS = [
  {
    gradient: "from-pw-sage to-pw-teal",
    avatarBg: "from-pw-sage to-[#5a8050]",
    borderHover: "hover:border-pw-sage/30",
    quoteColor: "rgba(107,147,96,0.08)",
  },
  {
    gradient: "from-pw-teal to-pw-sage",
    avatarBg: "from-pw-teal to-[#155a5c]",
    borderHover: "hover:border-pw-teal/30",
    quoteColor: "rgba(27,107,109,0.08)",
  },
  {
    gradient: "from-primary to-pw-terracotta",
    avatarBg: "from-primary to-[#6b2028]",
    borderHover: "hover:border-primary/20",
    quoteColor: "rgba(132,40,51,0.06)",
  },
] as const;

export function Testimonials({
  title = "Words That Mean Everything",
  subtitle = "Trusted by families, support coordinators, and healthcare professionals.",
  label = "Trusted by Families & Professionals",
  testimonials,
  sectionVariant = "default",
}: TestimonialsProps) {
  return (
    <Section
      id="testimonials"
      variant={sectionVariant}
      size="xl"
      className="overflow-hidden"
    >
      <Container>
        {/* Header with stagger */}
        <motion.div
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-pw-sage">
            {label}
          </span>
          <h2 className="font-[family-name:var(--font-serif)] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            {title}
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            {subtitle}
          </p>
        </motion.div>

        {/* Cards with staggered spring reveal */}
        <motion.div
          className="mt-20 grid gap-8 lg:grid-cols-3"
          variants={TESTIMONIAL_VARIANTS.container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {testimonials.map((t, i) => {
            const accent = CARD_ACCENTS[i % CARD_ACCENTS.length];
            const isMiddle = i === 1;

            return (
              <motion.div
                key={t.name}
                variants={TESTIMONIAL_VARIANTS.card}
                className={cn(
                  "group relative flex h-full flex-col rounded-2xl border border-border/50 bg-white p-8 sm:p-9 shadow-sm transition-all duration-500",
                  accent.borderHover,
                  "hover:shadow-card-hover hover:-translate-y-0.5",
                  isMiddle && "lg:-translate-y-1"
                )}
                style={
                  isMiddle
                    ? { boxShadow: "0 12px 32px rgba(27,107,109,0.1)" }
                    : undefined
                }
              >
                {/* Top accent bar */}
                <div
                  className={cn(
                    "absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-gradient-to-r",
                    accent.gradient
                  )}
                />

                {/* Large decorative quote mark */}
                <div
                  className="absolute top-6 right-8 font-[family-name:var(--font-serif)] text-[56px] leading-none pointer-events-none select-none"
                  style={{ color: accent.quoteColor }}
                  aria-hidden
                >
                  &ldquo;
                </div>

                {/* Quote */}
                <blockquote className="relative z-10 flex-grow mt-4 font-[family-name:var(--font-serif)] text-lg sm:text-xl italic leading-relaxed text-foreground/90">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Attribution */}
                <div className="mt-8 flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-white font-semibold text-sm",
                      accent.avatarBg
                    )}
                  >
                    {t.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-foreground truncate">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {t.role}
                      {t.location && ` · ${t.location}`}
                    </p>
                  </div>
                  {/* Stars */}
                  {t.rating != null && t.rating >= 1 && (
                    <div
                      className="flex gap-0.5 shrink-0"
                      role="img"
                      aria-label={`${t.rating} out of 5 stars`}
                    >
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={cn(
                            "h-3.5 w-3.5",
                            star <= (t.rating ?? 0)
                              ? "text-amber-400 fill-amber-400"
                              : "text-muted/30"
                          )}
                          strokeWidth={1}
                          aria-hidden
                        />
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </Section>
  );
}
