import { SuburbLandingPage } from "@/components/sections/SuburbLandingPage";
import { serviceRegionToLanding } from "@/content/premium-location";
import type { ServiceRegionPageData } from "@/content/service-regions";

/** Service × region pages use the same layout as the approved suburb pages. Schema stays on the route. */
export function ServiceRegionPageLayout({ data }: { data: ServiceRegionPageData }) {
  return <SuburbLandingPage page={serviceRegionToLanding(data)} documentSchemas={null} />;
}
