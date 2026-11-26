import { PremiumFundingCare } from "@/components/sections/PremiumFundingCare";
import "../services/premium-care.css";
import "../premium-funding.css";
import { createMetadata } from "@/lib/metadata";
import { INTEGRATIONS } from "@/config/integrations";

export const metadata = createMetadata({
  title: { absolute: "Aged Care at Home Sydney | Gentle Care Nursing" },
  description:
    "In-home aged care across Sydney for personal care, nursing, companionship, and post-hospital recovery. Call 1300 004 267 to discuss your options.",
  canonical: `${INTEGRATIONS.siteUrl}/aged-care`,
  openGraph: {
    images: [{ url: "/images/og/aged-care.png", width: 1200, height: 630, alt: "Aged Care at Home | Gentle Care Nursing Services" }],
  },
});

export default function AgedCarePage() {
  return <PremiumFundingCare pathway="aged-care" />;
}
