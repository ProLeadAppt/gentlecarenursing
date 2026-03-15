import { ServicePageLayout } from "@/components/sections/ServicePageLayout";
import { PRIVATE_NURSING_PAGE } from "@/content/services";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Private Nursing & Personal Care",
  description:
    "Private in-home nursing and personal care — no waitlists, no complex applications. Quality care when you need it.",
  keywords: [
    "private nursing",
    "private home care",
    "in-home nursing",
    "personal care",
    "private nurse",
  ],
});

export default function PrivateNursingPage() {
  return <ServicePageLayout data={PRIVATE_NURSING_PAGE} />;
}
