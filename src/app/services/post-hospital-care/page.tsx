import { PremiumSupportCare } from "@/components/sections/PremiumSupportCare";
import "../premium-care.css";
import { INTEGRATIONS } from "@/config/integrations";
import { createMetadata } from "@/lib/metadata";

const canonical = `${INTEGRATIONS.siteUrl}/services/post-hospital-care`;

export const metadata = createMetadata({
  title: { absolute: "Post-Hospital Care at Home Sydney | Gentle Care" },
  description:
    "Post-hospital nursing and personal care at home in Sydney. We work with your discharge plan to support a steady recovery. Call 1300 004 267.",
  canonical,
});

export default function PostHospitalCarePage() {
  return <PremiumSupportCare service="post-hospital-care" />;
}

