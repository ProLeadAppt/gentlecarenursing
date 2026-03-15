import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { TYPOGRAPHY } from "@/design-system/tokens";
import { cn } from "@/lib/utils";

export interface HeroCta {
  href: string;
  label: string;
}

interface HeroProps {
  headline: string;
  subheadline?: string;
  primaryCta: HeroCta;
  secondaryCta?: HeroCta;
}

export function Hero({
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
}: HeroProps) {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-card to-background py-16 sm:py-20 lg:py-28"
      aria-labelledby="hero-heading"
    >
      <Container size="md">
        <div className="mx-auto max-w-3xl text-center">
          <Heading
            level="h1"
            as="h1"
            id="hero-heading"
            className="text-4xl sm:text-5xl lg:text-6xl"
          >
            {headline}
          </Heading>
          {subheadline && (
            <p className={cn("mt-6", TYPOGRAPHY.lead)}>{subheadline}</p>
          )}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href={primaryCta.href} size="lg">
              {primaryCta.label}
            </Button>
            {secondaryCta && (
              <Button href={secondaryCta.href} variant="outline" size="lg">
                {secondaryCta.label}
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
