import Image from "next/image";
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
  /** Optional section background variant (used by homepage for alternation) */
  sectionVariant?: "default" | "muted" | "card" | "primary" | "accent" | "gradient" | "teal";
  /** Optional section-level image (e.g. services in action) */
  sectionImage?: string;
  sectionImageAlt?: string;
}

const defaultServices: ServiceCardType[] = SERVICES.map((s) => ({
  title: s.title,
  benefit: s.benefitLine,
  description: s.shortDescription,
  href: s.href,
}));

export function ServiceCards({
  services = defaultServices,
  title = "Our Services",
  subtitle = "In-home nursing and care across NDIS, DVA, aged care, and private.",
  cols = 2,
  cardVariant = "elevated",
  sectionVariant = "muted",
  sectionImage,
  sectionImageAlt,
}: ServiceCardsProps) {
  return (
    <Section variant={sectionVariant} size="lg">
      <Container>
        {sectionImage && (
          <div className="relative mx-auto mb-10 max-w-2xl overflow-hidden rounded-2xl">
            <Image
              src={sectionImage}
              alt={sectionImageAlt ?? "In-home care"}
              width={800}
              height={450}
              className="h-auto w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 800px"
            />
          </div>
        )}
        <SectionHeader title={title} subtitle={subtitle} size="lg" />
        <Grid cols={cols} gap="lg" className="mt-12">
          {services.map((service) => (
            <ServiceCard
              key={service.href}
              title={service.title}
              benefit={service.benefit}
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
