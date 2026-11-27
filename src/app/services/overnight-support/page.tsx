import { PremiumSupportCare } from "@/components/sections/PremiumSupportCare";
import "../premium-care.css";
import { INTEGRATIONS } from "@/config/integrations";
import { createMetadata } from "@/lib/metadata";

const canonical = `${INTEGRATIONS.siteUrl}/services/overnight-support`;

export const metadata = createMetadata({
  title: { absolute: "Overnight Support at Home Sydney | Gentle Care" },
  description:
    "Active overnight and sleepover care at home across Sydney for NDIS and aged care clients. Call 1300 004 267 to discuss support options.",
  canonical,
});

export default function OvernightSupportPage() {
  return <PremiumSupportCare service="overnight-support" />;
}
