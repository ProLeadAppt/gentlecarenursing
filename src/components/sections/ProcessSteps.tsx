import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "./SectionHeader";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";

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
  subtitle = "From enquiry to care, we make it straightforward.",
  steps,
  cta,
}: ProcessStepsProps) {
  return (
    <Section size="lg">
      <Container>
        <SectionHeader title={title} subtitle={subtitle} />
        <div className="relative mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {/* Connector line */}
          <div
            className="absolute left-[16%] right-[16%] top-8 hidden border-t-2 border-dashed border-primary/15 sm:block"
            aria-hidden
          />
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative flex flex-col items-center text-center"
            >
              <div
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-light text-xl font-bold text-white shadow-md ring-4 ring-background"
                aria-hidden
              >
                {step.number}
              </div>
              <Heading level="h3" as="h3" className="mt-5 text-lg">
                {step.headline}
              </Heading>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
        {cta && (
          <div className="mt-14 flex justify-center">
            <Button href={cta.href} size="lg">
              {cta.label}
            </Button>
          </div>
        )}
      </Container>
    </Section>
  );
}
