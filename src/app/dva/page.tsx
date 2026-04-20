import { ServicePageLayout } from "@/components/sections/ServicePageLayout";
import { DVA_PAGE } from "@/content/services";
import { createMetadata } from "@/lib/metadata";
import { INTEGRATIONS } from "@/config/integrations";

export const metadata = createMetadata({
  title: "DVA & Community Nursing Sydney",
  description:
    "Registered DVA community nursing provider. In-home nursing and personal care for veterans, war widows, and their families.",
  keywords: [
    "DVA nursing",
    "DVA community nursing",
    "veteran home care",
    "DVA provider",
    "community nursing",
  ],
  canonical: `${INTEGRATIONS.siteUrl}/dva`,
  openGraph: {
    images: [{ url: "/images/og/dva.png", width: 1200, height: 630, alt: "DVA & Community Nursing — Gentle Care Nursing" }],
  },
});

export default function DVAPage() {
  return <ServicePageLayout data={DVA_PAGE} />;
}
