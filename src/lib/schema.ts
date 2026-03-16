import { SITE } from "./constants";
import { INTEGRATIONS } from "@/config/integrations";
import { ELEVATOR_PITCH } from "@/content/about";
import { AREAS_SERVED } from "@/content/areas-served";
import { GMB_SERVICES } from "@/content/gmb-services";

/**
 * JSON-LD schema generators for SEO.
 */

export function getLocalBusinessSchema() {
  const sameAs = [
    ...Object.values(SITE.social).filter(Boolean),
    ...(SITE.gbpUrl ? [SITE.gbpUrl] : []),
  ] as string[];

  const areaServed = [
    { "@type": "City" as const, name: "Sydney", containedInPlace: { "@type": "State", name: "New South Wales" } },
    ...AREAS_SERVED.map((area) => ({ "@type": "Place" as const, name: area.region })),
    { "@type": "State" as const, name: "New South Wales" },
    { "@type": "Country" as const, name: "Australia" },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: SITE.name,
    description: ELEVATOR_PITCH,
    url: INTEGRATIONS.siteUrl,
    telephone: SITE.phone || undefined,
    email: SITE.email || undefined,
    address: SITE.address
      ? {
          "@type": "PostalAddress",
          streetAddress: SITE.address,
          addressLocality: "North Strathfield",
          addressRegion: "NSW",
          addressCountry: "AU",
        }
      : undefined,
    geo: {
      "@type": "GeoCoordinates",
      latitude: -33.864,
      longitude: 151.093,
      addressLocality: "North Strathfield",
      addressRegion: "NSW",
    },
    areaServed,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services offered",
      itemListElement: GMB_SERVICES.map((service, index) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description ?? undefined,
          ...(service.href ? { url: `${INTEGRATIONS.siteUrl}${service.href}` } : {}),
        },
      })),
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  };
}

export function getServiceSchema(service: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalService" as const,
    name: service.name,
    description: service.description,
    url: `${INTEGRATIONS.siteUrl}${service.url}`,
    provider: {
      "@type": "MedicalBusiness",
      name: SITE.name,
    },
  };
}

export function getFaqSchema(
  items: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: INTEGRATIONS.siteUrl,
  };
}

export interface HowToStep {
  number: number;
  headline: string;
  description: string;
}

/**
 * HowTo schema for "How to request care". Supports AEO / featured snippets.
 */
export function getHowToSchema(
  name: string,
  description: string,
  steps: readonly HowToStep[],
  url: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    url: `${INTEGRATIONS.siteUrl}${url}`,
    step: steps.map((s) => ({
      "@type": "HowToStep",
      position: s.number,
      name: s.headline,
      text: s.description,
    })),
  };
}
