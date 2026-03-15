import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "./SectionHeader";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Heart, Users, Building2, Handshake } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const AUDIENCE_ICONS: Record<string, LucideIcon> = {
  Families: Heart,
  "NDIS Coordinators": Users,
  "Discharge Planners": Building2,
  "Referral Partners": Handshake,
};

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
    <Section variant="default" size="lg">
      <Container>
        <SectionHeader title={title} subtitle={subtitle} size="lg" />
        <Grid cols={4} gap="lg" className="mt-12">
          {audiences.map((audience) => {
            const Icon = AUDIENCE_ICONS[audience.label];
            return (
              <Card key={audience.label} variant="bordered" className="text-center">
                {Icon && (
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/8">
                    <Icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
                  </div>
                )}
                <Heading level="h3" as="h3" className="text-lg">
                  {audience.label}
                </Heading>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {audience.description}
                </p>
              </Card>
            );
          })}
        </Grid>
      </Container>
    </Section>
  );
}
