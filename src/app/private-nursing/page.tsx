import { ServicePageLayout } from "@/components/sections/ServicePageLayout";
import { PRIVATE_NURSING_PAGE } from "@/content/services";
import { createMetadata } from "@/lib/metadata";
import { INTEGRATIONS } from "@/config/integrations";

export const metadata = createMetadata({
  title: "Private Nursing Sydney | In-Home Nursing & Personal Care",
  description:
    "Private nursing and personal care in Sydney. Contact Gentle Care to discuss recovery, respite or daily care, costs and availability.",
  canonical: `${INTEGRATIONS.siteUrl}/private-nursing`,
  openGraph: {
    images: [{ url: "/images/og/private-nursing.png", width: 1200, height: 630, alt: "Private Nursing & Personal Care | Gentle Care Nursing Services" }],
  },
});

export default function PrivateNursingPage() {
  return <ServicePageLayout data={PRIVATE_NURSING_PAGE} />;
}
