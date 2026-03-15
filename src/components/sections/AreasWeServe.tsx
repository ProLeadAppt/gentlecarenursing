"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { MapPin } from "lucide-react";

export interface AreaGroup {
  readonly region: string;
  readonly suburbs: readonly string[];
}

interface AreasWeServeProps {
  title?: string;
  subtitle?: string;
  areas: readonly AreaGroup[];
}

export function AreasWeServe({
  title = "Areas We Serve",
  subtitle = "Providing in-home nursing and care across Sydney and surrounding regions.",
  areas,
}: AreasWeServeProps) {
  return (
    <Section id="areas-we-serve" variant="muted">
      <Container>
        <Reveal>
          <SectionHeader title={title} subtitle={subtitle} />
        </Reveal>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area, i) => (
            <Reveal key={area.region} delay={i * 80}>
              <div className="rounded-2xl border border-border bg-card p-6">
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
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
