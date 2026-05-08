import { ServicePageLayout } from "@/components/sections/ServicePageLayout";
import { COMPLEX_CARE_PAGE } from "@/content/services";
import { INTEGRATIONS } from "@/config/integrations";
import { createMetadata } from "@/lib/metadata";

const canonical = `${INTEGRATIONS.siteUrl}/services/complex-care`;

export const metadata = createMetadata({
  title: "Complex Clinical Care at Home in Sydney",
  description:
    "Tracheostomy care, PEG feeding, catheter management, and complex wound care delivered in the home across Sydney by experienced nurses, alongside treating hospital teams.",
  canonical,
});

export default function ComplexCarePage() {
  return <ServicePageLayout data={COMPLEX_CARE_PAGE} />;
}

