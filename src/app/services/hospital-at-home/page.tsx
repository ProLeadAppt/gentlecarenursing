import { PremiumSupportCare } from "@/components/sections/PremiumSupportCare";
import "../premium-care.css";
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
  return <PremiumSupportCare service="hospital-at-home" />;
}

