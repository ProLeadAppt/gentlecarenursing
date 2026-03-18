"use client";

import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Heading } from "@/components/ui/Heading";
import { MapPin } from "lucide-react";
import { slugifyRegion } from "@/content/areas-content";

export interface AreaGroup {
  readonly region: string;
  readonly suburbs: readonly string[];
}

interface AreasWeServeProps {
  title?: string;
  subtitle?: string;
  areas: readonly AreaGroup[];
  /** Optional section background variant (used by homepage for alternation) */
  sectionVariant?: "default" | "muted" | "card" | "primary" | "accent" | "gradient" | "teal";
}

export function AreasWeServe({
  title = "Where We Provide Care",
  subtitle = "Expert clinical nursing and dedicated disability support delivered in the comfort of your own home, across Sydney.",
  areas,
  sectionVariant = "muted",
}: AreasWeServeProps) {
  return (
    <Section id="areas-we-serve" variant={sectionVariant} size="xl">
      <Container>
        <Reveal>
          <div className="flex flex-col items-center text-center mb-16">
            <span className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary/70">
              Our Reach
            </span>
            <Heading level="h2" className="text-4xl sm:text-5xl font-[family-name:var(--font-serif)]">
              {title}
            </Heading>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              {subtitle}
            </p>
          </div>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {areas.map((area, i) => {
            const slug = slugifyRegion(area.region);
            return (
              <Reveal key={area.region} delay={i * 80}>
                <Link
                  href={`/areas/${slug}`}
                  className="group relative block overflow-hidden rounded-[2.5rem] border border-border/60 bg-white p-8 transition-all duration-700 hover:border-primary/30 hover:shadow-xl"
                >
                  <div className="relative z-10">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/5 text-primary ring-1 ring-primary/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                      <MapPin className="h-6 w-6" strokeWidth={1.5} />
                    </div>
                    
                    <h3 className="text-2xl font-bold tracking-tight text-foreground font-[family-name:var(--font-serif)] mb-4">
                      {area.region}
                    </h3>
                    
                    <div className="mb-6 flex flex-wrap gap-2">
                      {area.suburbs.slice(0, 6).map((suburb) => (
                        <span
                          key={suburb}
                          className="rounded-full bg-muted/50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80 ring-1 ring-border/50"
                        >
                          {suburb}
                        </span>
                      ))}
                      {area.suburbs.length > 6 && (
                        <span className="text-[11px] font-bold text-primary/60 self-center ml-1">
                          +{area.suburbs.length - 6} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-sm font-bold text-primary opacity-80 group-hover:opacity-100 transition-opacity">
                      Explore {area.region} Services
                      <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                    </div>
                  </div>

                  {/* High-End Background Accent */}
                  <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-primary/[0.03] transition-all duration-1000 group-hover:scale-150 group-hover:bg-primary/[0.06]" />
                </Link>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <Reveal delay={0.4}>
            <Link 
              href="/areas" 
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-8 py-4 text-sm font-bold text-primary transition-all hover:bg-primary hover:text-white"
            >
              View All 150+ Service Locations
              <MapPin className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
