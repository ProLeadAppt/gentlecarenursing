import { SITE } from "./constants";
import { INTEGRATIONS } from "@/config/integrations";
import { ELEVATOR_PITCH } from "@/content/about";
import { AREAS_SERVED } from "@/content/areas-served";
import { GMB_SERVICES } from "@/content/gmb-services";
import { GOOGLE_REVIEWS } from "@/content/reviews";

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
    publisher: { "@id": `${INTEGRATIONS.siteUrl}/#organization` },
  };
}

/** Organization schema for entity clarity (GEO/AEO). Use @id so WebSite can reference publisher. */
export function getOrganizationSchema() {
  const sameAs = [
    ...Object.values(SITE.social).filter(Boolean),
    ...(SITE.gbpUrl ? [SITE.gbpUrl] : []),
  ] as string[];
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${INTEGRATIONS.siteUrl}/#organization`,
    name: SITE.name,
    url: INTEGRATIONS.siteUrl,
    logo: `${INTEGRATIONS.siteUrl}/images/logo.png`,
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

/** BreadcrumbList schema for current page. Items: { name, item (url) } */
export function getBreadcrumbListSchema(items: { name: string; item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item.startsWith("http") ? item.item : `${INTEGRATIONS.siteUrl}${item.item}`,
    })),
  };
}

/** WebPage + areaServed for area/region landing pages (local SEO + GEO). */
export function getAreaPageSchema(region: string, path: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `In-Home Nursing ${region} | ${SITE.name}`,
    description,
    url: `${INTEGRATIONS.siteUrl}${path}`,
    about: {
      "@type": "MedicalBusiness",
      name: SITE.name,
      areaServed: { "@type": "Place", name: region },
    },
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

export function getAggregateRatingSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    itemReviewed: {
      "@type": "MedicalBusiness",
      name: SITE.name,
    },
    ratingValue: GOOGLE_REVIEWS.averageRating.toString(),
    bestRating: "5",
    worstRating: "1",
    ratingCount: GOOGLE_REVIEWS.reviewCount.toString(),
  };
}

export function getArticleSchema(post: {
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  author: { name: string; role?: string };
  featuredImageSrc?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      ...(post.author.role ? { jobTitle: post.author.role } : {}),
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: INTEGRATIONS.siteUrl,
    },
    ...(post.featuredImageSrc
      ? { image: `${INTEGRATIONS.siteUrl}${post.featuredImageSrc}` }
      : {}),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": post.url,
    },
  };
}
