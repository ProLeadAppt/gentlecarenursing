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
    ...(SITE.gbpReviewUrl ? [SITE.gbpReviewUrl] : []),
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
    address: {
      "@type": "PostalAddress",
      streetAddress: "Level 1/5 George St",
      addressLocality: "North Strathfield",
      addressRegion: "NSW",
      postalCode: "2137",
      addressCountry: "AU",
    },
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
      itemListElement: GMB_SERVICES.map((service) => ({
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

/**
 * MedicalProcedure schema for clinical procedures a service page describes.
 *
 * Used to bind a service page (e.g. /services/complex-care) to specific
 * procedures Google's clinical-content classifier and AI engines can
 * recognise — tracheostomy care, PEG feeding, catheter management, etc.
 *
 * Each procedure links back to the page's MedicalService via `relevantSpecialty`
 * so the entity graph stays connected. Keep `description` short and factual —
 * AI engines extract these descriptions when answering procedure-specific
 * queries (e.g. "PEG feeding home care Sydney").
 *
 * Only populate this with procedures we genuinely deliver. Do not list
 * a procedure here unless the service page also references it in body
 * content; mismatches between schema and page content can hurt rather
 * than help on Google's quality systems.
 */
export function getMedicalProcedureSchema(args: {
  name: string;
  alternateName?: string;
  description?: string;
  /** URL of the service page that delivers this procedure. */
  pageUrl: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure" as const,
    name: args.name,
    ...(args.alternateName ? { alternateName: args.alternateName } : {}),
    ...(args.description ? { description: args.description } : {}),
    url: `${INTEGRATIONS.siteUrl}${args.pageUrl}`,
    provider: { "@id": `${INTEGRATIONS.siteUrl}/#organization` },
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
    ...(SITE.gbpReviewUrl ? [SITE.gbpReviewUrl] : []),
  ] as string[];

  // knowsAbout strengthens entity profile for AI engines on healthcare queries.
  // Keep terms aligned with services we actually deliver and language used on-site.
  const knowsAbout = [
    "In-home nursing",
    "Community nursing",
    "NDIS in-home support",
    "DVA Community Nursing",
    "Aged care at home",
    "Support at Home",
    "Commonwealth Home Support Programme",
    "Post-hospital care",
    "Hospital at Home",
    "Complex care at home",
    "Palliative care at home",
    "Wound care",
    "Medication management",
    "Tracheostomy care",
    "PEG feeding",
    "Catheter management",
    "Personal care",
    "Overnight nursing support",
  ];

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${INTEGRATIONS.siteUrl}/#organization`,
    name: SITE.name,
    legalName: SITE.name,
    description: ELEVATOR_PITCH,
    url: INTEGRATIONS.siteUrl,
    logo: `${INTEGRATIONS.siteUrl}/images/logo.png`,
    slogan: "Personalised, clinician-led in-home nursing and care",
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Level 1/5 George St",
      addressLocality: "North Strathfield",
      addressRegion: "NSW",
      postalCode: "2137",
      addressCountry: "AU",
    },
    areaServed: [
      { "@type": "City", name: "Sydney", containedInPlace: { "@type": "State", name: "New South Wales" } },
      { "@type": "State", name: "New South Wales" },
      { "@type": "Country", name: "Australia" },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE.phone,
        email: SITE.email,
        contactType: "customer service",
        areaServed: "AU",
        availableLanguage: ["English"],
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "17:00",
        },
      },
    ],
    knowsAbout,
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

/**
 * Person schema for the founder. Linked to Organization via `worksFor` so
 * Google and AI engines can resolve the founder ↔ business relationship.
 *
 * E-E-A-T: a Person node with role, jobTitle, and a worksFor reference is
 * one of the strongest signals AI engines use to attribute authority and
 * experience to the business in healthcare contexts. Only populate fields
 * we can verify — never fabricate credentials, AHPRA numbers, or awards.
 */
export function getPersonSchema(args: {
  name: string;
  jobTitle: string;
  description: string;
  imagePath?: string;
  /** Absolute URL for the page that profiles this person (usually /about). */
  profilePath?: string;
  /** Areas of expertise — short noun phrases. Mirrors knowsAbout style. */
  knowsAbout?: readonly string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${INTEGRATIONS.siteUrl}/#person-${args.name.toLowerCase().replace(/\s+/g, "-")}`,
    name: args.name,
    jobTitle: args.jobTitle,
    description: args.description,
    ...(args.imagePath ? { image: `${INTEGRATIONS.siteUrl}${args.imagePath}` } : {}),
    ...(args.profilePath ? { url: `${INTEGRATIONS.siteUrl}${args.profilePath}` } : {}),
    worksFor: { "@id": `${INTEGRATIONS.siteUrl}/#organization` },
    ...(args.knowsAbout && args.knowsAbout.length > 0 ? { knowsAbout: [...args.knowsAbout] } : {}),
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

/**
 * Service + region landing page schema bundle.
 * Returns an array combining MedicalService, WebPage with areaServed (GeoShape),
 * and a localised provider reference. Use alongside breadcrumb + FAQ schemas.
 */
export function getServiceRegionSchemas(args: {
  serviceName: string;
  serviceDescription: string;
  region: string;
  suburbs: readonly string[];
  path: string;
  pageTitle: string;
  pageDescription: string;
}) {
  const url = `${INTEGRATIONS.siteUrl}${args.path}`;
  const medicalService = {
    "@context": "https://schema.org",
    "@type": "MedicalService" as const,
    name: `${args.serviceName} in ${args.region}, Sydney`,
    description: args.serviceDescription,
    url,
    provider: {
      "@type": "MedicalBusiness",
      name: SITE.name,
      url: INTEGRATIONS.siteUrl,
      telephone: SITE.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE.address,
        addressLocality: "North Strathfield",
        addressRegion: "NSW",
        addressCountry: "AU",
      },
    },
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: `${args.region}, Sydney`,
        containedInPlace: {
          "@type": "City",
          name: "Sydney",
          containedInPlace: { "@type": "State", name: "New South Wales" },
        },
      },
      ...args.suburbs.map((suburb) => ({
        "@type": "Place" as const,
        name: `${suburb}, NSW`,
      })),
    ],
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: url,
      servicePhone: SITE.phone,
      availableLanguage: { "@type": "Language", name: "English" },
    },
  };

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: args.pageTitle,
    description: args.pageDescription,
    url,
    about: {
      "@type": "MedicalBusiness",
      name: SITE.name,
      areaServed: {
        "@type": "AdministrativeArea",
        name: `${args.region}, Sydney`,
      },
    },
    isPartOf: { "@type": "WebSite", url: INTEGRATIONS.siteUrl, name: SITE.name },
  };

  return [medicalService, webPage];
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
  if (GOOGLE_REVIEWS.averageRating == null || GOOGLE_REVIEWS.reviewCount == null) {
    return null;
  }

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
