import { ServicePageLayout } from "@/components/sections/ServicePageLayout";
import { NDIS_PAGE } from "@/content/services";
import { createMetadata } from "@/lib/metadata";
import { INTEGRATIONS } from "@/config/integrations";

export const metadata = createMetadata({
  title: "NDIS Services Sydney",
  description:
    "Registered NDIS provider delivering personalised in-home nursing and support for NDIS participants in Sydney. Trusted by support coordinators and families.",
  canonical: `${INTEGRATIONS.siteUrl}/ndis`,
  openGraph: {
    images: [{ url: "/images/og/ndis.png", width: 1200, height: 630, alt: "NDIS Nursing & Care | Gentle Care Nursing Services" }],
  },
});

export default function NDISPage() {
  return <ServicePageLayout data={NDIS_PAGE} />;
}
