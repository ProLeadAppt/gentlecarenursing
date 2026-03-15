import { ServicePageLayout } from "@/components/sections/ServicePageLayout";
import { NDIS_PAGE } from "@/content/services";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "NDIS Services",
  description:
    "Registered NDIS provider delivering personalised in-home nursing and support for NDIS participants. Trusted by support coordinators and families.",
  keywords: [
    "NDIS provider",
    "NDIS nursing",
    "NDIS personal care",
    "NDIS in-home support",
    "registered NDIS provider",
  ],
});

export default function NDISPage() {
  return <ServicePageLayout data={NDIS_PAGE} />;
}
