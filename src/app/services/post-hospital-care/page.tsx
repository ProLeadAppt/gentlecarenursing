import { ServicePageLayout } from "@/components/sections/ServicePageLayout";
import { POST_HOSPITAL_PAGE } from "@/content/services";
import { INTEGRATIONS } from "@/config/integrations";
import { createMetadata } from "@/lib/metadata";

const canonical = `${INTEGRATIONS.siteUrl}/services/post-hospital-care`;

export const metadata = createMetadata({
  title: "Post-Hospital Nursing & Care at Home",
  description:
    "Post-hospital in-home nursing and personal care in Sydney. Gentle Care Nursing Services coordinates with hospital discharge teams and families so recovery continues safely at home.",
  keywords: [
    "post-hospital care",
    "post hospital nursing",
    "hospital discharge support",
    "in-home nursing after surgery",
    "transition care at home",
  ],
  canonical,
});

export default function PostHospitalCarePage() {
  return <ServicePageLayout data={POST_HOSPITAL_PAGE} />;
}

