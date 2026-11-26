import { PremiumSupportCare } from "@/components/sections/PremiumSupportCare";
import "../premium-care.css";
import { INTEGRATIONS } from "@/config/integrations";
import { createMetadata } from "@/lib/metadata";

const canonical = `${INTEGRATIONS.siteUrl}/services/personal-care`;

export const metadata = createMetadata({
  title: { absolute: "Personal Care at Home Sydney | Gentle Care" },
  description:
    "Help with bathing, dressing, and grooming at home across Sydney. Personal care that prioritises dignity and independence.",
  canonical,
});

export default function PersonalCarePage() {
  return <PremiumSupportCare service="personal-care" />;
}
