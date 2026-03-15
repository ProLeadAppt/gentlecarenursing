import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "./SectionHeader";
import { ServiceCard } from "./ServiceCard";
import { SERVICES } from "@/content/services";
import type { ServiceCard as ServiceCardType } from "@/types";

interface ServiceCardsProps {
  services?: ServiceCardType[];
  title?: string;
  subtitle?: string;
  /** Grid columns: 2, 3, or 4 */
  cols?: 2 | 3 | 4;
  /** Card variant */
  cardVariant?: "default" | "elevated" | "bordered" | "muted";
}

const defaultServices: ServiceCardType[] = SERVICES.map((s) => ({
  title: s.title,
  description: s.shortDescription,
  href: s.href,
}));

export function ServiceCards({
  services = defaultServices,
  title = "Our Services",
  subtitle = "In-home nursing and care across NDIS, DVA, aged care, and private.",
  cols = 2,
  cardVariant = "elevated",
}: ServiceCardsProps) {
  return (
    <Section variant="muted">
      <Container>
        <SectionHeader title={title} subtitle={subtitle} size="lg" />
        <Grid cols={cols} gap="lg" className="mt-12">
          {services.map((service) => (
            <ServiceCard
              key={service.href}
              title={service.title}
              description={service.description}
              href={service.href}
              variant={cardVariant}
            />
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
