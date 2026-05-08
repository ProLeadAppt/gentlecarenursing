import { ServicePageLayout } from "@/components/sections/ServicePageLayout";
import { COMPLEX_CARE_PAGE } from "@/content/services";
import { INTEGRATIONS } from "@/config/integrations";
import { createMetadata } from "@/lib/metadata";

const canonical = `${INTEGRATIONS.siteUrl}/services/complex-care`;

export const metadata = createMetadata({
  title: "Complex Clinical Care at Home",
  description:
    "Specialised in-home nursing for people with complex health needs in Sydney, including tracheostomy care, PEG feeding, catheter management, and complex wound care.",
  canonical,
});

export default function ComplexCarePage() {
  return <ServicePageLayout data={COMPLEX_CARE_PAGE} />;
}

