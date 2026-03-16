"use client";

import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
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
  title = "Areas We Serve",
  subtitle = "Providing in-home nursing and care across Sydney and surrounding regions.",
  areas,
  sectionVariant = "muted",
}: AreasWeServeProps) {
  return (
    <Section id="areas-we-serve" variant={sectionVariant} size="lg">
      <Container>
        <Reveal>
          <SectionHeader title={title} subtitle={subtitle} />
        </Reveal>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area, i) => {
            const slug = slugifyRegion(area.region);
            return (
              <Reveal key={area.region} delay={i * 80}>
                <Link
                  href={`/areas/${slug}`}
                  className="block rounded-2xl border border-border bg-card p-6 transition hover:border-primary/30 hover:shadow-md"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-accent" />
                    <h3 className="font-[family-name:var(--font-dm-sans)] font-semibold text-foreground">
                      {area.region}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {area.suburbs.map((suburb) => (
                      <span
                        key={suburb}
                        className="rounded-full bg-primary/5 px-3 py-1 text-xs font-medium text-primary/80"
                      >
                        {suburb}
                      </span>
                    ))}
                  </div>
                  <span className="mt-3 inline-block text-sm font-medium text-primary">
                    In-home nursing in {area.region} →
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
        <p className="mt-8 text-center">
          <Link href="/areas" className="font-medium text-primary hover:underline">
            View all areas we serve
          </Link>
        </p>
      </Container>
    </Section>
  );
}
