import { ServicePageLayout } from "@/components/sections/ServicePageLayout";
import { DAILY_LIVING_PAGE } from "@/content/services";
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
  return <ServicePageLayout data={DAILY_LIVING_PAGE} />;
}
