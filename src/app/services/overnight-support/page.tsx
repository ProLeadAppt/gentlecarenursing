import { PremiumSupportCare } from "@/components/sections/PremiumSupportCare";
import "../premium-care.css";
import { INTEGRATIONS } from "@/config/integrations";
import { createMetadata } from "@/lib/metadata";

const canonical = `${INTEGRATIONS.siteUrl}/services/overnight-support`;

export const metadata = createMetadata({
  title: "Overnight Support & Sleepover Care at Home | Sydney",
  description:
    "Peace of mind while you sleep. Professional active overnight and sleepover care for NDIS and aged care participants across Sydney.",
  canonical,
});

export default function OvernightSupportPage() {
  return <PremiumSupportCare service="overnight-support" />;
}
