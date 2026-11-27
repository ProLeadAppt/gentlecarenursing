import { PremiumNursingCare } from "@/components/sections/PremiumNursingCare";
import "../premium-care.css";
import { INTEGRATIONS } from "@/config/integrations";
import { createMetadata } from "@/lib/metadata";

const canonical = `${INTEGRATIONS.siteUrl}/services/nursing-care`;

export const metadata = createMetadata({
  title: { absolute: "Clinical Nursing at Home Sydney | Gentle Care" },
  description:
    "In-home clinical nursing across Sydney for wound care, medication support, and health monitoring, delivered with dignity and clear communication.",
  canonical,
});

export default function NursingCarePage() {
  return <PremiumNursingCare />;
}
