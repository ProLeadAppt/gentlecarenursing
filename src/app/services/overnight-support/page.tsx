import { ServicePageLayout } from "@/components/sections/ServicePageLayout";
import { OVERNIGHT_SUPPORT_PAGE } from "@/content/services";
import { INTEGRATIONS } from "@/config/integrations";
import { createMetadata } from "@/lib/metadata";

const canonical = `${INTEGRATIONS.siteUrl}/services/overnight-support`;

export const metadata = createMetadata({
  title: "Overnight Support & Sleepover Care | Safety Throughout the Night",
  description:
    "Peace of mind while you sleep. Professional active overnight and sleepover care for NDIS and aged care participants across Sydney.",
  keywords: [
    "overnight care Sydney",
    "sleepover support NDIS",
    "active overnight nursing",
    "night-time home care",
    "falls prevention overnight",
  ],
  canonical,
});

export default function OvernightSupportPage() {
  return <ServicePageLayout data={OVERNIGHT_SUPPORT_PAGE} />;
}
