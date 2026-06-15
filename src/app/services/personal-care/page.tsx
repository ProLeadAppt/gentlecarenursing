import { ServicePageLayout } from "@/components/sections/ServicePageLayout";
import { PERSONAL_CARE_PAGE } from "@/content/services";
import { INTEGRATIONS } from "@/config/integrations";
import { createMetadata } from "@/lib/metadata";

const canonical = `${INTEGRATIONS.siteUrl}/services/personal-care`;

export const metadata = createMetadata({
  title: "Personal Care & Daily Support | Respectful In-Home Help",
  description:
    "Gentle and respectful assistance with daily living, including bathing, dressing, and grooming. Professional personal care that prioritises your dignity and independence.",
  canonical,
});

export default function PersonalCarePage() {
  return <ServicePageLayout data={PERSONAL_CARE_PAGE} />;
}
