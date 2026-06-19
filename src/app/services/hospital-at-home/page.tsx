import { ServicePageLayout } from "@/components/sections/ServicePageLayout";
import { HOSPITAL_AT_HOME_PAGE } from "@/content/services";
import { INTEGRATIONS } from "@/config/integrations";
import { createMetadata } from "@/lib/metadata";

const canonical = `${INTEGRATIONS.siteUrl}/services/hospital-at-home`;

export const metadata = createMetadata({
  title: "Hospital-at-Home Sydney | Step-Down Nursing Care",
  description:
    "Hospital-at-home and step-down nursing in Sydney so people can leave hospital sooner and recover safely at home with skilled support.",
  canonical,
});

export default function HospitalAtHomePage() {
  return <ServicePageLayout data={HOSPITAL_AT_HOME_PAGE} />;
}

