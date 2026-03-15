import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "./SectionHeader";
import { Heading } from "@/components/ui/Heading";
import { UserCheck, Sparkles, Zap, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const DIFF_ICONS: LucideIcon[] = [UserCheck, Sparkles, Zap, ShieldCheck];

export interface DifferentiatorItem {
  headline: string;
  description: string;
}

interface WhyDifferentProps {
  title?: string;
  subtitle?: string;
  differentiators: readonly DifferentiatorItem[];
}

export function WhyDifferent({
  title = "Why Gentle Care Is Different",
  subtitle = "We focus on quality over volume.",
  differentiators,
}: WhyDifferentProps) {
  return (
    <Section variant="muted">
      <Container>
        <SectionHeader title={title} subtitle={subtitle} />
        <Grid cols={4} gap="lg" className="mt-12">
          {differentiators.map((item, i) => {
            const Icon = DIFF_ICONS[i % DIFF_ICONS.length];
            return (
              <div key={item.headline} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                  <Icon className="h-6 w-6 text-accent" strokeWidth={1.5} />
                </div>
                <Heading level="h3" as="h3" className="text-lg">
                  {item.headline}
                </Heading>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            );
          })}
        </Grid>
      </Container>
    </Section>
  );
}
