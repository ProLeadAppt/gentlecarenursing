import { ServicePageLayout } from "@/components/sections/ServicePageLayout";
import { DVA_PAGE } from "@/content/services";
import { createMetadata } from "@/lib/metadata";
import { INTEGRATIONS } from "@/config/integrations";

export const metadata = createMetadata({
  title: "DVA & Community Nursing Sydney",
  description:
    "DVA Contracted Community Nursing Provider supporting eligible Veteran Card holders with clinically required nursing and personal care services at home.",
  canonical: `${INTEGRATIONS.siteUrl}/dva`,
  openGraph: {
    images: [{ url: "/images/og/dva.png", width: 1200, height: 630, alt: "DVA & Community Nursing | Gentle Care Nursing Services" }],
  },
});

export default function DVAPage() {
  return <ServicePageLayout data={DVA_PAGE} />;
}
