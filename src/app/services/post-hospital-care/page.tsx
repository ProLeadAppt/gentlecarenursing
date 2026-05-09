import { ServicePageLayout } from "@/components/sections/ServicePageLayout";
import { POST_HOSPITAL_PAGE } from "@/content/services";
import { INTEGRATIONS } from "@/config/integrations";
import { createMetadata } from "@/lib/metadata";

const canonical = `${INTEGRATIONS.siteUrl}/services/post-hospital-care`;

export const metadata = createMetadata({
  title: "Post-Hospital Nursing & Care at Home",
  description:
    "Post-hospital in-home nursing across Sydney — coordinated with discharge planners at RPA, Westmead, RNSH, and St Vincent's, aligned with NSW Health Out of Hospital Care pathways.",
  canonical,
});

export default function PostHospitalCarePage() {
  return <ServicePageLayout data={POST_HOSPITAL_PAGE} />;
}

