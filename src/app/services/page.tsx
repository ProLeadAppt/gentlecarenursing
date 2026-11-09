import { PremiumServicesHub } from "@/components/sections/PremiumServicesHub";
import { createMetadata } from "@/lib/metadata";
import { INTEGRATIONS } from "@/config/integrations";
import "./premium-care.css";

export const metadata = createMetadata({
  title: "Our Services Sydney | NDIS, DVA & Private Home Care",
  description:
    "Explore in-home nursing, personal care, disability support, DVA community nursing, aged care, and private care across Sydney with Gentle Care Nursing Services.",
  canonical: `${INTEGRATIONS.siteUrl}/services`,
  openGraph: {
    images: [{ url: "/images/og/services.png", width: 1200, height: 630, alt: "In-Home Services | Gentle Care Nursing Services" }],
  },
});

export default function ServicesPage() {
  return <PremiumServicesHub />;
}
