import { PremiumSupportCare } from "@/components/sections/PremiumSupportCare";
import "../premium-care.css";
import { INTEGRATIONS } from "@/config/integrations";
import { createMetadata } from "@/lib/metadata";

const canonical = `${INTEGRATIONS.siteUrl}/services/palliative-care`;

export const metadata = createMetadata({
  title: "Palliative Care at Home Sydney | Comfort & Symptom Support",
  description:
    "In-home palliative and end-of-life nursing across Sydney with comfort, symptom management, and family support in coordination with specialist palliative teams.",
  canonical,
});

export default function PalliativeCarePage() {
  return <PremiumSupportCare service="palliative-care" />;
}

