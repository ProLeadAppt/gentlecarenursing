import { PremiumSupportCare } from "@/components/sections/PremiumSupportCare";
import "../premium-care.css";
import { INTEGRATIONS } from "@/config/integrations";
import { createMetadata } from "@/lib/metadata";

const canonical = `${INTEGRATIONS.siteUrl}/services/post-hospital-care`;

export const metadata = createMetadata({
  title: "Post-Hospital Nursing & Care at Home",
  description:
    "Post-hospital nursing and care at home in Sydney. Discuss your discharge plan, care needs and availability with Gentle Care Nursing Services.",
  canonical,
});

export default function PostHospitalCarePage() {
  return <PremiumSupportCare service="post-hospital-care" />;
}

