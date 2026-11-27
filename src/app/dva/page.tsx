import { PremiumFundingCare } from "@/components/sections/PremiumFundingCare";
import "../services/premium-care.css";
import "../premium-funding.css";
import { createMetadata } from "@/lib/metadata";
import { INTEGRATIONS } from "@/config/integrations";

export const metadata = createMetadata({
  title: { absolute: "DVA Community Nursing Sydney | Gentle Care" },
  description:
    "DVA Contracted Community Nursing Provider in Sydney supporting eligible Veteran Card holders at home with nursing, wound care, and daily support.",
  canonical: `${INTEGRATIONS.siteUrl}/dva`,
  openGraph: {
    images: [{ url: "/images/og/dva.png", width: 1200, height: 630, alt: "DVA & Community Nursing | Gentle Care Nursing Services" }],
  },
});

export default function DVAPage() {
  return <PremiumFundingCare pathway="dva" />;
}
