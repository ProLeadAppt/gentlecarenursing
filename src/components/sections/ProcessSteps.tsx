import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "./SectionHeader";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { ClipboardList, MailCheck, Users, HouseHeart } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface ProcessStep {
  number: number;
  headline: string;
  description: string;
}

interface ProcessStepsProps {
  title?: string;
  subtitle?: string;
  steps: readonly ProcessStep[];
  cta?: { href: string; label: string };
  /** Optional section background variant (used by homepage for alternation) */
  sectionVariant?: "default" | "muted" | "card" | "primary" | "accent" | "gradient" | "teal";
}

const STEP_ICONS: LucideIcon[] = [ClipboardList, MailCheck, Users, HouseHeart];

export function ProcessSteps({
  title = "How It Works",
  subtitle = "From your first enquiry to care at home: clear steps, quick response, and no one left waiting or wondering what happens next.",
  steps,
  cta,
  sectionVariant = "default",
}: ProcessStepsProps) {
  return (
    <Section size="xl" variant={sectionVariant}>
      <Container>
        <SectionHeader title={title} subtitle={subtitle} />

        {/* Connected four-step flow */}
        <div className="relative mt-14 space-y-8">
          {/* Desktop horizontal connector */}
          <div
            className="pointer-events-none absolute left-6 right-6 top-16 hidden h-px bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 lg:block"
            aria-hidden
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = STEP_ICONS[index % STEP_ICONS.length];
              const isLast = index === steps.length - 1;

              return (
                <div
                  key={step.number}
                  className="group relative flex h-full flex-col rounded-2xl border border-border/70 bg-card/80 p-6 shadow-sm transition-colors duration-200 hover:border-primary/40 hover:shadow-md"
                >
                  {/* Desktop connector dot */}
                  <div
                    className="pointer-events-none absolute right-[-10px] top-16 hidden h-5 w-5 rounded-full border border-primary/15 bg-background lg:inline-flex lg:items-center lg:justify-center"
                    aria-hidden
                  >
                    {!isLast && (
                      <span className="h-2 w-2 rounded-full bg-primary/30" />
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-sm font-semibold text-primary">
                      {step.number}
                    </div>
                    {Icon && (
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/8 text-primary">
                        <Icon className="h-5 w-5" strokeWidth={1.6} />
                      </div>
                    )}
                  </div>

                  <Heading level="h3" as="h3" className="mt-4 text-base sm:text-lg">
                    {step.headline}
                  </Heading>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

          {cta && (
            <div className="pt-4 text-center text-sm text-muted-foreground">
              <p>No pressure to decide on the spot. Reach out and we&apos;ll guide you through the next steps.</p>
              <div className="mt-5 flex justify-center">
                <Button href={cta.href} size="lg">
                  {cta.label}
                </Button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
