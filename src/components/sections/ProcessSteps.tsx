import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "./SectionHeader";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { cn } from "@/lib/utils";

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
}

export function ProcessSteps({
  title = "How It Works",
  subtitle = "From enquiry to care — we make it straightforward.",
  steps,
  cta,
}: ProcessStepsProps) {
  return (
    <Section>
      <Container>
        <SectionHeader title={title} subtitle={subtitle} />
        <div className="relative mt-12 grid gap-8 sm:grid-cols-3">
          {/* Connector line — desktop only */}
          <div
            className="absolute left-[15%] right-[15%] top-6 hidden border-t border-dashed border-border sm:block"
            aria-hidden
          />
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative flex flex-col items-center text-center sm:items-start sm:text-left"
            >
              <div
                className={cn(
                  "flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary",
                  "ring-4 ring-background"
                )}
                aria-hidden
              >
                {step.number}
              </div>
              <Heading level="h3" as="h3" className="mt-4 text-lg">
                {step.headline}
              </Heading>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
        {cta && (
          <div className="mt-12 flex justify-center">
            <Button href={cta.href} size="lg">
              {cta.label}
            </Button>
          </div>
        )}
      </Container>
    </Section>
  );
}
