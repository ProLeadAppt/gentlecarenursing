import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Button } from "@/components/ui/Button";

export interface ReferralProfessionalsSectionProps {
  headline: string;
  subtitle: string;
  cta: { href: string; label: string };
  /** Optional section background variant (used by homepage for alternation) */
  sectionVariant?: "default" | "muted" | "card" | "primary" | "accent" | "gradient" | "teal";
}

export function ReferralProfessionalsSection({
  headline,
  subtitle,
  cta,
  sectionVariant = "teal",
}: ReferralProfessionalsSectionProps) {
  return (
    <Section variant={sectionVariant} size="lg">
      <Container>
        <div className="mx-auto max-w-2xl">
          <SectionHeader title={headline} subtitle={subtitle} align="center" size="md" />
          <div className="mt-10 flex justify-center">
            <Button href={cta.href} size="lg" className="min-h-[3rem] min-w-[10rem] sm:min-w-0">
              {cta.label}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
