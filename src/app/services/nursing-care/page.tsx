import { ServicePageLayout } from "@/components/sections/ServicePageLayout";
import { NURSING_CARE_PAGE } from "@/content/services";
import { INTEGRATIONS } from "@/config/integrations";
import { createMetadata } from "@/lib/metadata";

const canonical = `${INTEGRATIONS.siteUrl}/services/nursing-care`;

export const metadata = createMetadata({
  title: "Nursing Care at Home | Personalised Support in Sydney",
  description:
    "Professional in-home nursing care delivered by experienced nurses. Wound care, medication management, and health monitoring with dignity and consistency across Sydney.",
  canonical,
});

export default function NursingCarePage() {
  return <ServicePageLayout data={NURSING_CARE_PAGE} />;
}
