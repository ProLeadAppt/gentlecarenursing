import { ServicePageLayout } from "@/components/sections/ServicePageLayout";
import { DVA_PAGE } from "@/content/services";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "DVA & Community Nursing Sydney",
  description:
    "Registered DVA community nursing provider. In-home nursing and personal care for veterans, war widows, and their families.",
  keywords: [
    "DVA nursing",
    "DVA community nursing",
    "veteran home care",
    "DVA provider",
    "community nursing",
  ],
});

export default function DVAPage() {
  return <ServicePageLayout data={DVA_PAGE} />;
}
