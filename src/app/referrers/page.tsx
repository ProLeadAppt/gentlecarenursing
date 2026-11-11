import { PremiumReferrers } from "@/components/sections/PremiumReferrers";
import { INTEGRATIONS } from "@/config/integrations";
import { createMetadata } from "@/lib/metadata";
import "../services/premium-care.css";
import "./premium-referrers.css";

const canonical = `${INTEGRATIONS.siteUrl}/referrers`;

export const metadata = createMetadata({
  title: "Referrers | Coordinators & Discharge Teams",
  description:
    "Information for NDIS support coordinators, plan managers, hospital discharge planners, and healthcare professionals who want to refer to Gentle Care Nursing Services.",
  canonical,
  openGraph: {
    images: [{ url: "/images/og/referrers.png", width: 1200, height: 630, alt: "For Referrers — Gentle Care Nursing Services" }],
  },
});

export default function ReferrersPage() {
  return <PremiumReferrers />;
}
