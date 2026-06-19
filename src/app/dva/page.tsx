import { ServicePageLayout } from "@/components/sections/ServicePageLayout";
import { DVA_PAGE } from "@/content/services";
import { createMetadata } from "@/lib/metadata";
import { INTEGRATIONS } from "@/config/integrations";

export const metadata = createMetadata({
  title: "DVA Community Nursing Sydney | Home Care for Eligible Veterans",
  description:
    "DVA Contracted Community Nursing Provider in Sydney delivering clinically required home nursing, personal care, wound care, and post-hospital support for eligible veterans.",
  canonical: `${INTEGRATIONS.siteUrl}/dva`,
  openGraph: {
    images: [{ url: "/images/og/dva.png", width: 1200, height: 630, alt: "DVA & Community Nursing | Gentle Care Nursing Services" }],
  },
});

export default function DVAPage() {
  return <ServicePageLayout data={DVA_PAGE} />;
}
