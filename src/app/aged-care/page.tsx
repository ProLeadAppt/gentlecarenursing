import { PremiumFundingCare } from "@/components/sections/PremiumFundingCare";
import "../services/premium-care.css";
import "../premium-funding.css";
import { createMetadata } from "@/lib/metadata";
import { INTEGRATIONS } from "@/config/integrations";

export const metadata = createMetadata({
  title: "Aged Care Sydney | In-Home Support at Home",
  description:
    "In-home aged care in Sydney with nursing, personal care, companionship and post-hospital support. Discuss suitability, funding arrangements and availability.",
  canonical: `${INTEGRATIONS.siteUrl}/aged-care`,
  openGraph: {
    images: [{ url: "/images/og/aged-care.png", width: 1200, height: 630, alt: "Aged Care at Home | Gentle Care Nursing Services" }],
  },
});

export default function AgedCarePage() {
  return <PremiumFundingCare pathway="aged-care" />;
}
