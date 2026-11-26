import { PremiumSupportCare } from "@/components/sections/PremiumSupportCare";
import "../premium-care.css";
import { INTEGRATIONS } from "@/config/integrations";
import { createMetadata } from "@/lib/metadata";

const canonical = `${INTEGRATIONS.siteUrl}/services/complex-care`;

export const metadata = createMetadata({
  title: { absolute: "Complex Care at Home Sydney | Gentle Care" },
  description:
    "Tracheostomy care, PEG feeding, catheter care, and complex wound care at home across Sydney, alongside treating hospital teams.",
  canonical,
});

export default function ComplexCarePage() {
  return <PremiumSupportCare service="complex-care" />;
}

