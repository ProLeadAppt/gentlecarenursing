import { ServicePageLayout } from "@/components/sections/ServicePageLayout";
import { AGED_CARE_PAGE } from "@/content/services";
import { createMetadata } from "@/lib/metadata";
import { INTEGRATIONS } from "@/config/integrations";

export const metadata = createMetadata({
  title: "Aged Care Sydney | In-Home Support at Home",
  description:
    "In-home aged care in Sydney with nursing, personal care, companionship, post-hospital recovery, and Support at Home / CHSP options for older Australians.",
  canonical: `${INTEGRATIONS.siteUrl}/aged-care`,
  openGraph: {
    images: [{ url: "/images/og/aged-care.png", width: 1200, height: 630, alt: "Aged Care at Home | Gentle Care Nursing Services" }],
  },
});

export default function AgedCarePage() {
  return <ServicePageLayout data={AGED_CARE_PAGE} />;
}
