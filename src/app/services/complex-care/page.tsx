import { ServicePageLayout } from "@/components/sections/ServicePageLayout";
import { COMPLEX_CARE_PAGE } from "@/content/services";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Complex Clinical Care at Home",
  description:
    "Specialised in-home nursing for people with complex health needs in Sydney, including tracheostomy care, PEG feeding, catheter management, and complex wound care.",
  keywords: [
    "complex care at home",
    "tracheostomy care at home",
    "PEG feeding support",
    "catheter management at home",
    "complex wound care at home",
  ],
  canonical: "/services/complex-care",
});

export default function ComplexCarePage() {
  return <ServicePageLayout data={COMPLEX_CARE_PAGE} />;
}

