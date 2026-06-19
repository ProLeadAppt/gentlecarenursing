import { ServicePageLayout } from "@/components/sections/ServicePageLayout";
import { PALLIATIVE_CARE_PAGE } from "@/content/services";
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
  return <ServicePageLayout data={PALLIATIVE_CARE_PAGE} />;
}

