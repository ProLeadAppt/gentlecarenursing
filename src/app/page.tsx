import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { INTEGRATIONS } from "@/config/integrations";
import HomePageContent from "@/components/sections/HomePageContent";

// Copy updated 2026-06-10 per Gemma's brief — clear, simple, no fluff.
export const metadata: Metadata = createMetadata({
  title: "Gentle Care Nursing Services | In-Home Nursing Sydney",
  description:
    "Gentle Care Nursing Services provides personalised in-home nursing and support across Sydney. We support NDIS participants, DVA clients, Aged Care clients, and private clients with care that is respectful, reliable, and tailored to each person's needs.",
  canonical: `${INTEGRATIONS.siteUrl}/`,
  openGraph: {
    images: [{ url: "/images/og/home.png", width: 1200, height: 630, alt: "Gentle Care Nursing Services: personalised in-home nursing & care across Sydney" }],
  },
});

export default function HomePage() {
  return <HomePageContent />;
}
