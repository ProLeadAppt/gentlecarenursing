import { ServicePageLayout } from "@/components/sections/ServicePageLayout";
import { PALLIATIVE_CARE_PAGE } from "@/content/services";
import { INTEGRATIONS } from "@/config/integrations";
import { createMetadata } from "@/lib/metadata";

const canonical = `${INTEGRATIONS.siteUrl}/services/palliative-care`;

export const metadata = createMetadata({
  title: "Palliative Care at Home Sydney | Gentle Care Nursing",
  description:
    "In-home palliative and end-of-life nursing across Sydney — comfort, symptom management, and family support, in coordination with Sacred Heart, RPA, and SLHD palliative teams.",
  canonical,
});

export default function PalliativeCarePage() {
  return <ServicePageLayout data={PALLIATIVE_CARE_PAGE} />;
}

