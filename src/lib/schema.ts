import { SITE } from "./constants";
import { INTEGRATIONS } from "@/config/integrations";

/**
 * JSON-LD schema generators for SEO.
 */

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: SITE.name,
    description: SITE.tagline,
    url: INTEGRATIONS.siteUrl,
    telephone: SITE.phone || undefined,
    email: SITE.email || undefined,
    address: SITE.address
      ? {
          "@type": "PostalAddress",
          streetAddress: SITE.address,
          addressCountry: "AU",
        }
      : undefined,
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
