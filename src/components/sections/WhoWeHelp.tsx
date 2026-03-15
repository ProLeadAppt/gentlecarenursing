import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "./SectionHeader";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";

export interface AudienceItem {
  label: string;
  description: string;
}

interface WhoWeHelpProps {
  title?: string;
  subtitle?: string;
  audiences: readonly AudienceItem[];
}

export function WhoWeHelp({
  title = "Who We Help",
  subtitle = "We support families, coordinators, and healthcare professionals.",
  audiences,
}: WhoWeHelpProps) {
  return (
    <Section>
      <Container>
        <SectionHeader title={title} subtitle={subtitle} />
        <Grid cols={4} gap="lg" className="mt-12">
          {audiences.map((audience) => (
            <Card key={audience.label} variant="bordered">
              <Heading level="h3" as="h3" className="text-lg">
                {audience.label}
              </Heading>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {audience.description}
              </p>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
