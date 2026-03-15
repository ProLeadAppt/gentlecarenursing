import { ServicePageLayout } from "@/components/sections/ServicePageLayout";
import { AGED_CARE_PAGE } from "@/content/services";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Aged Care Sydney | Support at Home",
  description:
    "In-home nursing and personal care for older Australians. Home Care Packages, CHSP, and private aged care support.",
  keywords: [
    "aged care at home",
    "in-home aged care",
    "home care package",
    "CHSP",
    "elderly home care",
    "aged care nursing",
  ],
});

export default function AgedCarePage() {
  return <ServicePageLayout data={AGED_CARE_PAGE} />;
}
