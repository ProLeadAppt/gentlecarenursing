import { PremiumSupportCare } from "@/components/sections/PremiumSupportCare";
import "../premium-care.css";
import { INTEGRATIONS } from "@/config/integrations";
import { createMetadata } from "@/lib/metadata";

const canonical = `${INTEGRATIONS.siteUrl}/services/community-participation`;

export const metadata = createMetadata({
  title: { absolute: "Community Participation Sydney | Gentle Care" },
  description:
    "Stay connected and active. Support for social outings, appointments, and community engagement for NDIS and aged care participants in Sydney.",
  canonical,
});

export default function CommunityParticipationPage() {
  return <PremiumSupportCare service="community-participation" />;
}
