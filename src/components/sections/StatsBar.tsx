"use client";

import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";

export interface Stat {
  value: string;
  label: string;
}

interface StatsBarProps {
  stats: readonly Stat[];
}

export function StatsBar({ stats }: StatsBarProps) {
  return (
    <section className="bg-gradient-to-r from-primary via-primary to-primary-light py-10 sm:py-12">
      <Container>
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80}>
              <div className="rounded-xl border border-white/20 bg-white/5 px-6 py-6 text-center">
                <p className="font-[family-name:var(--font-dm-sans)] text-3xl font-bold text-white sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm font-medium text-white/70">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
