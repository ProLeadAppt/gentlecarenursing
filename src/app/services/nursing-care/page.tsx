import { ServicePageLayout } from "@/components/sections/ServicePageLayout";
import { NURSING_CARE_PAGE } from "@/content/services";
import { INTEGRATIONS } from "@/config/integrations";
import { createMetadata } from "@/lib/metadata";

const canonical = `${INTEGRATIONS.siteUrl}/services/nursing-care`;

export const metadata = createMetadata({
  title: "Nursing Care at Home | Expert Clinical Support in Sydney",
  description:
    "Professional in-home nursing care by Registered Nurses. Wound care, medication management, and health monitoring delivered with dignity and expertise across Sydney.",
  keywords: [
    "home nursing Sydney",
    "registered nurse at home",
    "in-home clinical care",
    "wound management at home",
    "medication management nursing",
    "NDIS nursing Sydney",
  ],
  canonical,
});

export default function NursingCarePage() {
  return <ServicePageLayout data={NURSING_CARE_PAGE} />;
}
