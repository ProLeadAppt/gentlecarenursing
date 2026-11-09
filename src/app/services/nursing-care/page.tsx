import { PremiumNursingCare } from "@/components/sections/PremiumNursingCare";
import "../premium-care.css";
import { INTEGRATIONS } from "@/config/integrations";
import { createMetadata } from "@/lib/metadata";

const canonical = `${INTEGRATIONS.siteUrl}/services/nursing-care`;

export const metadata = createMetadata({
  title: "Clinical Nursing at Home in Sydney",
  description:
    "Professional in-home nursing care delivered by experienced nurses. Wound care, medication management, and health monitoring with dignity and consistency across Sydney.",
  canonical,
});

export default function NursingCarePage() {
  return <PremiumNursingCare />;
}
