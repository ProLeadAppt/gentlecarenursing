import { PremiumFundingCare } from "@/components/sections/PremiumFundingCare";
import "../services/premium-care.css";
import "../premium-funding.css";
import { createMetadata } from "@/lib/metadata";
import { INTEGRATIONS } from "@/config/integrations";

export const metadata = createMetadata({
  title: { absolute: "Private In-Home Nursing Sydney | Gentle Care" },
  description:
    "Self-funded in-home nursing and personal care across Sydney for recovery, respite, or ongoing support. Call 1300 004 267 to discuss your needs.",
  canonical: `${INTEGRATIONS.siteUrl}/private-nursing`,
  openGraph: {
    images: [{ url: "/images/og/private-nursing.png", width: 1200, height: 630, alt: "Private Nursing & Personal Care | Gentle Care Nursing Services" }],
  },
});

export default function PrivateNursingPage() {
  return <PremiumFundingCare pathway="private-nursing" />;
}
