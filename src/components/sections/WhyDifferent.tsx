import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "./SectionHeader";
import { Heading } from "@/components/ui/Heading";

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
          {differentiators.map((item) => (
            <div key={item.headline} className="space-y-2">
              <Heading level="h3" as="h3" className="text-lg">
                {item.headline}
              </Heading>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
