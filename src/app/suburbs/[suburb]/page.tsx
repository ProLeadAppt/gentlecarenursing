import { SuburbLandingPage } from "@/components/sections/SuburbLandingPage";
import { suburbToLanding } from "@/content/premium-location";
import { createMetadata } from "@/lib/metadata";
import { INTEGRATIONS } from "@/config/integrations";
import { getBreadcrumbListSchema } from "@/lib/schema";
import {
  getAllSuburbSlugs,
  getSuburbBySlug,
} from "@/content/suburbs";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ suburb: string }> };

export async function generateStaticParams() {
  return getAllSuburbSlugs().map((suburb) => ({ suburb }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { suburb } = await params;
  const entry = getSuburbBySlug(suburb);
  if (!entry) return {};

  return createMetadata({
    title: `In-Home Nursing & Care in ${entry.name}`,
    description: `Explore in-home nursing and care options in ${entry.name} (${entry.postcode}, ${entry.lga}). Enquire about care needs, funding and availability in the wider ${entry.region}.`,
    canonical: `${INTEGRATIONS.siteUrl}/suburbs/${entry.slug}`,
  });
}

/**
 * /suburbs/[suburb] — long-tail suburb-level location page.
 *
 * Each page targets a specific Sydney suburb's search lane (e.g.
 * "in-home nursing Strathfield", "NDIS provider Manly") with substantive
 * local content — LGA, nearest hospitals, neighbouring suburbs — rather
 * than thin keyword-targeting. Page emits per-suburb Place schema so AI
 * engines can bind Gentle Care to the location entity cleanly.
 *
 * Internally links to:
 *   - The relevant /areas/[region] page for regional context
 *   - The relevant service pages (NDIS, DVA, aged-care, private nursing)
 */

export default async function SuburbPage({ params }: Props) {
  const { suburb } = await params;
  const entry = getSuburbBySlug(suburb);
  if (!entry) notFound();

  const canonical = `${INTEGRATIONS.siteUrl}/suburbs/${entry.slug}`;

  const schemas = [
    getBreadcrumbListSchema([
      { name: "Home", item: "/" },
      { name: "Suburbs", item: "/suburbs" },
      { name: entry.name, item: `/suburbs/${entry.slug}` },
    ]),
    // Place schema binds the suburb to Gentle Care as an areaServed.
    // AI engines use this for "is X provider serving Y suburb" lookups.
    {
      "@context": "https://schema.org",
      "@type": "Place",
      "@id": `${canonical}#place`,
      name: entry.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: entry.name,
        addressRegion: "NSW",
        postalCode: entry.postcode,
        addressCountry: "AU",
      },
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: entry.lga,
      },
    },
    // Service scoped to this suburb — the actual citable claim that
    // GCN serves this specific suburb, with the provider linked back to the
    // Organization @id so the entity graph stays connected.
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `In-home nursing in ${entry.name}, Sydney`,
      description: `In-home nursing and personal care enquiries for ${entry.name} (${entry.postcode}, ${entry.lga}). Discuss clinical suitability, funding arrangements, availability and referral requirements with the team.`,
      url: canonical,
      areaServed: {
        "@id": `${canonical}#place`,
      },
      provider: {
        "@id": `${INTEGRATIONS.siteUrl}/#organization`,
      },
    },
  ];

  return <SuburbLandingPage page={suburbToLanding(entry)} documentSchemas={schemas} />;
}

// Only the explicitly generated content URLs are valid in this route family.
export const dynamicParams = false;
