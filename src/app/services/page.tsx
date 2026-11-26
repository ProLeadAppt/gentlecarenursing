import { PremiumServicesHub } from "@/components/sections/PremiumServicesHub";
import { createMetadata } from "@/lib/metadata";
import { INTEGRATIONS } from "@/config/integrations";
import "./premium-care.css";

export const metadata = createMetadata({
  title: { absolute: "In-Home Services Sydney | Gentle Care" },
  description:
    "In-home nursing, personal care, DVA community nursing, aged care, and private care across Sydney with Gentle Care Nursing Services.",
  canonical: `${INTEGRATIONS.siteUrl}/services`,
  openGraph: {
    images: [{ url: "/images/og/services.png", width: 1200, height: 630, alt: "In-Home Services | Gentle Care Nursing Services" }],
  },
});

export default function ServicesPage() {
  return <PremiumServicesHub />;
}
