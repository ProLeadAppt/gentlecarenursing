import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { INTEGRATIONS } from "@/config/integrations";
import HomePageContent from "@/components/sections/HomePageContent";

// Copy updated 2026-06-10 per Gemma's brief — clear, simple, no fluff.
export const metadata: Metadata = createMetadata({
  title: "Gentle Care Nursing Services | In-Home Nursing Sydney",
  description:
    "Personalised in-home nursing and support across Sydney for NDIS participants, DVA clients, older Australians and private clients. Enquire about care.",
  canonical: `${INTEGRATIONS.siteUrl}/`,
  openGraph: {
    images: [{ url: "/images/og/home.png", width: 1200, height: 630, alt: "Gentle Care Nursing Services: personalised in-home nursing & care across Sydney" }],
  },
});

export default function HomePage() {
  return <HomePageContent />;
}
