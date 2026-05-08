import { ServicePageLayout } from "@/components/sections/ServicePageLayout";
import { COMMUNITY_PARTICIPATION_PAGE } from "@/content/services";
import { INTEGRATIONS } from "@/config/integrations";
import { createMetadata } from "@/lib/metadata";

const canonical = `${INTEGRATIONS.siteUrl}/services/community-participation`;

export const metadata = createMetadata({
  title: "Community Participation | NDIS Social Support Sydney",
  description:
    "Stay connected and active. Support for social outings, appointments, and community engagement for NDIS and aged care participants in Sydney.",
  canonical,
});

export default function CommunityParticipationPage() {
  return <ServicePageLayout data={COMMUNITY_PARTICIPATION_PAGE} />;
}
