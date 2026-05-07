import { ServicePageLayout } from "@/components/sections/ServicePageLayout";
import { PALLIATIVE_CARE_PAGE } from "@/content/services";
import { INTEGRATIONS } from "@/config/integrations";
import { createMetadata } from "@/lib/metadata";

const canonical = `${INTEGRATIONS.siteUrl}/services/palliative-care`;

export const metadata = createMetadata({
  title: "Palliative & End-of-Life Care at Home",
  description:
    "Palliative and end-of-life nursing support at home in Sydney, focused on comfort, dignity, and support for families.",
  canonical,
});

export default function PalliativeCarePage() {
  return <ServicePageLayout data={PALLIATIVE_CARE_PAGE} />;
}

