import { PremiumSupportCare } from "@/components/sections/PremiumSupportCare";
import "../premium-care.css";
import { INTEGRATIONS } from "@/config/integrations";
import { createMetadata } from "@/lib/metadata";

const canonical = `${INTEGRATIONS.siteUrl}/services/palliative-care`;

export const metadata = createMetadata({
  title: { absolute: "Palliative Care at Home Sydney | Gentle Care" },
  description:
    "In-home palliative nursing across Sydney, with comfort, symptom support, and family support alongside specialist palliative teams.",
  canonical,
});

export default function PalliativeCarePage() {
  return <PremiumSupportCare service="palliative-care" />;
}

