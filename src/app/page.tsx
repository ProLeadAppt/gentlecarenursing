import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { INTEGRATIONS } from "@/config/integrations";
import HomePageContent from "@/components/sections/HomePageContent";

export const metadata: Metadata = createMetadata({
  title: "Gentle Care Nursing Services | In-Home Nursing & Care Services",
  description:
    "Personalised in-home nursing and care services. Registered NDIS and DVA provider. Trusted by families, support coordinators, and healthcare professionals.",
  canonical: `${INTEGRATIONS.siteUrl}/`,
  openGraph: {
    images: [{ url: "/images/og/home.png", width: 1200, height: 630, alt: "Gentle Care Nursing Services — personalised in-home nursing & care across Sydney" }],
  },
});

export default function HomePage() {
  return <HomePageContent />;
}
