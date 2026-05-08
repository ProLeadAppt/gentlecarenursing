import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "@/components/animations/Reveal";
import { Heading } from "@/components/ui/Heading";
import { UserCheck, Sparkles, ShieldCheck, Heart, Award } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const DIFF_ICONS: LucideIcon[] = [UserCheck, Heart, Award, ShieldCheck, Sparkles];

export interface DifferentiatorItem {
  headline: string;
  description: string;
}

interface WhyDifferentProps {
  title?: string;
  subtitle?: string;
  differentiators: readonly DifferentiatorItem[];
  /** Optional image to show alongside differentiators */
  imageSrc?: string;
  imageAlt?: string;
  /** Optional section background variant (used by homepage for alternation) */
  sectionVariant?: "default" | "muted" | "card" | "primary" | "accent" | "gradient" | "teal";
}

export function WhyDifferent({
  title = "Why Gentle Care Is Different",
  subtitle = "We focus on quality over volume.",
  differentiators,
  imageSrc = "/images/vitaly-gariev-Wk6f1CkGlEo-unsplash.webp",
  imageAlt = "Personalised in-home care delivered with warmth",
  sectionVariant = "default",
}: WhyDifferentProps) {
  return (
    <Section variant={sectionVariant} size="lg" className="overflow-hidden">
      <Container>
        <Reveal>
          <div className="text-center mb-16">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary/80 mb-4">The Personalised Difference</p>
            <Heading level="h2" as="h2" className="text-4xl sm:text-5xl font-bold tracking-tight">
              {title}
            </Heading>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>
        </Reveal>

        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Layered Image Composition */}
          <div className="relative order-2 lg:order-1">
            <Reveal delay={0.2} x={-30}>
              <div className="relative z-10 mx-auto w-full max-w-md overflow-hidden rounded-[2.5rem] border-[8px] border-white shadow-2xl lg:max-w-none transform -rotate-2">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  width={600}
                  height={700}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </Reveal>

            {/* Background Decorative Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent/5 rounded-full blur-[80px] -z-10" />
          </div>

          {/* Differentiators */}
          <div className="space-y-10 order-1 lg:order-2">
            {differentiators.map((item, i) => {
              const Icon = DIFF_ICONS[i % DIFF_ICONS.length];
              return (
                <Reveal key={item.headline} delay={0.3 + i * 0.1} y={20}>
                  <div className="flex gap-6 group">
                    <div className="mt-1 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white shadow-md border border-border/50 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                      <Icon className="h-6 w-6 text-primary group-hover:text-white transition-colors duration-500" strokeWidth={2} />
                    </div>
                    <div>
                      <Heading level="h3" as="h3" className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {item.headline}
                      </Heading>
                      <p className="text-base leading-relaxed text-muted-foreground max-w-md">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
