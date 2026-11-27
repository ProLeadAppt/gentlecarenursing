import { PremiumFundingCare } from "@/components/sections/PremiumFundingCare";
import "../services/premium-care.css";
import "../premium-funding.css";
import { createMetadata } from "@/lib/metadata";
import { INTEGRATIONS } from "@/config/integrations";

export const metadata = createMetadata({
  title: { absolute: "Registered NDIS Provider Sydney | Gentle Care" },
  description:
    "Registered NDIS provider across Sydney for in-home nursing, daily personal care, community access, and high-intensity supports tailored to your plan.",
  canonical: `${INTEGRATIONS.siteUrl}/ndis`,
  openGraph: {
    images: [{ url: "/images/og/ndis.png", width: 1200, height: 630, alt: "NDIS Nursing & Care | Gentle Care Nursing Services" }],
  },
});

export default function NDISPage() {
  return <PremiumFundingCare pathway="ndis" />;
}
