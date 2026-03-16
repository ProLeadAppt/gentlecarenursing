import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { HelpCircle } from "lucide-react";

export interface ReassuranceSectionProps {
  headline: string;
  problems: readonly string[];
  transitionLine: string;
  /** Optional section background variant (used by homepage for alternation) */
  sectionVariant?: "default" | "muted" | "card" | "primary" | "accent" | "gradient" | "teal";
}

export function ReassuranceSection({
  headline,
  problems,
  transitionLine,
  sectionVariant = "teal",
}: ReassuranceSectionProps) {
  return (
    <Section variant={sectionVariant} size="lg">
      <Container>
        <h2 className="font-[family-name:var(--font-dm-sans)] text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {headline}
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {problems.map((text) => (
            <div
              key={text}
              className="flex flex-col items-center rounded-2xl border border-border/80 bg-card/80 p-6 text-center shadow-sm"
            >
              <span
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent"
                aria-hidden
              >
                <HelpCircle className="h-6 w-6" strokeWidth={1.5} />
              </span>
              <p className="text-base font-medium text-foreground">{text}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-lg font-medium text-foreground">
          {transitionLine}
        </p>
      </Container>
    </Section>
  );
}
