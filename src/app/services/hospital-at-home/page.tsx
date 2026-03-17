import { ServicePageLayout } from "@/components/sections/ServicePageLayout";
import { HOSPITAL_AT_HOME_PAGE } from "@/content/services";
import { INTEGRATIONS } from "@/config/integrations";
import { createMetadata } from "@/lib/metadata";

const canonical = `${INTEGRATIONS.siteUrl}/services/hospital-at-home`;

export const metadata = createMetadata({
  title: "Hospital-at-Home & Step-Down Care",
  description:
    "Hospital-at-home and step-down nursing care in Sydney so you can leave hospital sooner and continue recovery safely at home.",
  keywords: [
    "hospital at home",
    "hospital in the home",
    "step-down care at home",
    "early supported discharge",
    "post acute care at home",
  ],
  canonical,
});

export default function HospitalAtHomePage() {
  return <ServicePageLayout data={HOSPITAL_AT_HOME_PAGE} />;
}

