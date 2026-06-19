import { ServicePageLayout } from "@/components/sections/ServicePageLayout";
import { NDIS_PAGE } from "@/content/services";
import { createMetadata } from "@/lib/metadata";
import { INTEGRATIONS } from "@/config/integrations";

export const metadata = createMetadata({
  title: "NDIS Registered Provider Sydney | In-Home Nursing & Support",
  description:
    "Registered NDIS provider in Sydney delivering in-home nursing, personal care, community access, and complex support with fast responses and person-centred care.",
  canonical: `${INTEGRATIONS.siteUrl}/ndis`,
  openGraph: {
    images: [{ url: "/images/og/ndis.png", width: 1200, height: 630, alt: "NDIS Nursing & Care | Gentle Care Nursing Services" }],
  },
});

export default function NDISPage() {
  return <ServicePageLayout data={NDIS_PAGE} />;
}
