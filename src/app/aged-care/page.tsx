import { ServicePageLayout } from "@/components/sections/ServicePageLayout";
import { AGED_CARE_PAGE } from "@/content/services";
import { createMetadata } from "@/lib/metadata";
import { INTEGRATIONS } from "@/config/integrations";

export const metadata = createMetadata({
  title: "Aged Care Sydney | Support at Home",
  description:
    "In-home nursing and personal care for older Australians. We support clients through Support at Home, DVA, and private care arrangements.",
  keywords: [
    "aged care at home",
    "in-home aged care",
    "support at home",
    "elderly home care",
    "aged care nursing",
  ],
  canonical: `${INTEGRATIONS.siteUrl}/aged-care`,
  openGraph: {
    images: [{ url: "/images/og/aged-care.png", width: 1200, height: 630, alt: "Aged Care at Home — Gentle Care Nursing" }],
  },
});

export default function AgedCarePage() {
  return <ServicePageLayout data={AGED_CARE_PAGE} />;
}
