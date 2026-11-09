import { PremiumSupportCare } from "@/components/sections/PremiumSupportCare";
import "../premium-care.css";
import { INTEGRATIONS } from "@/config/integrations";
import { createMetadata } from "@/lib/metadata";

const canonical = `${INTEGRATIONS.siteUrl}/services/assistance-with-daily-living`;

export const metadata = createMetadata({
  title: "Assistance with Daily Living | In-Home Support Sydney",
  description:
    "Practical help with household tasks, meal preparation, and daily routines. Support for NDIS and aged care participants to live more independently at home.",
  canonical,
});

export default function DailyLivingPage() {
  return <PremiumSupportCare service="assistance-with-daily-living" />;
}
