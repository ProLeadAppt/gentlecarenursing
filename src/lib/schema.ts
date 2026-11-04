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
  ] as string[];

  const areaServed = [
    { "@type": "City" as const, name: "Sydney", containedInPlace: { "@type": "State", name: "New South Wales" } },
    ...AREAS_SERVED.map((area) => ({ "@type": "Place" as const, name: area.region })),
  ];

  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "MedicalBusiness"],
    "@id": `${INTEGRATIONS.siteUrl}/#organization`,
    name: SITE.name,
    legalName: SITE.name,
    description: ELEVATOR_PITCH,
    url: INTEGRATIONS.siteUrl,
    logo: `${INTEGRATIONS.siteUrl}/images/logo.png`,
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
  };
}

export function getServiceSchema(service: {
  name: string;
  description: string;
  url: string;
  dateModified?: string;
  reviewedBy?: { name: string; role?: string };
  areaServed?: unknown;
}) {
  const url = new URL(service.url, `${INTEGRATIONS.siteUrl}/`).href;
  return {
    "@context": "https://schema.org",
    "@type": "Service" as const,
    "@id": `${url}#service`,
    name: service.name,
    description: service.description,
    url,
    provider: { "@id": `${INTEGRATIONS.siteUrl}/#organization` },
    ...(service.areaServed ? { areaServed: service.areaServed } : {}),
    // Review and modification describe the page, not the service itself.
    mainEntityOfPage: {
      "@type": "WebPage" as const,
      "@id": `${url}#webpage`,
      url,
      name: service.name,
      description: service.description,
      mainEntity: { "@id": `${url}#service` },
      isPartOf: { "@id": `${INTEGRATIONS.siteUrl}/#website` },
      ...(service.dateModified ? { dateModified: service.dateModified } : {}),
      ...(service.reviewedBy
        ? {
            reviewedBy: {
              "@type": "Person",
              name: service.reviewedBy.name,
              ...(service.reviewedBy.role ? { jobTitle: service.reviewedBy.role } : {}),
              worksFor: { "@id": `${INTEGRATIONS.siteUrl}/#organization` },
            },
          }
        : {}),
    },
  };
}

/**
 * A procedure described by visible service-page content. MedicalProcedure does
 * not support provider; link it to the describing page using subjectOf instead.
 * Only include procedures actually described on that page.
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
    subjectOf: { "@type": "WebPage", "@id": `${INTEGRATIONS.siteUrl}${args.pageUrl}#webpage`, url: `${INTEGRATIONS.siteUrl}${args.pageUrl}` },
  };
}

export function getFaqSchema(
  items: { question: string; answer: string }[],
  options?: { dateModified?: string }
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(options?.dateModified ? { dateModified: options.dateModified } : {}),
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
    "@id": `${INTEGRATIONS.siteUrl}/#website`,
    name: SITE.name,
    url: INTEGRATIONS.siteUrl,
    publisher: { "@id": `${INTEGRATIONS.siteUrl}/#organization` },
  };
}

/**
 * Standalone organization projection for consumers that cannot use the richer
 * MedicalBusiness graph. Do not render this beside getLocalBusinessSchema(),
 * because both intentionally identify the same canonical organization node.
 */
export function getOrganizationSchema() {
  const sameAs = [
    ...Object.values(SITE.social).filter(Boolean),
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
    slogan: SITE.tagline,
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
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE.phone,
        email: SITE.email,
        contactType: "customer service",
        areaServed: { "@type": "City", name: "Sydney" },
        availableLanguage: ["English"],
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
 * Returns linked Service and WebPage nodes with a canonical provider reference.
 * Geographic coverage belongs on the Service, not on the WebPage.
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
  const service = {
    "@context": "https://schema.org",
    "@type": "Service" as const,
    "@id": `${url}#service`,
    mainEntityOfPage: { "@id": `${url}#webpage` },
    name: `${args.serviceName} in ${args.region}, Sydney`,
    description: args.serviceDescription,
    url,
    provider: { "@id": `${INTEGRATIONS.siteUrl}/#organization` },
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
      servicePhone: { "@type": "ContactPoint", telephone: SITE.phone },
      availableLanguage: { "@type": "Language", name: "English" },
    },
  };

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    mainEntity: { "@id": `${url}#service` },
    name: args.pageTitle,
    description: args.pageDescription,
    url,
    about: { "@id": `${INTEGRATIONS.siteUrl}/#organization` },
    isPartOf: {
      "@type": "WebSite",
      "@id": `${INTEGRATIONS.siteUrl}/#website`,
      url: INTEGRATIONS.siteUrl,
      name: SITE.name,
    },
  };

  return [service, webPage] as const;
}

/** WebPage describing a region; reuse the canonical business identity. */
export function getAreaPageSchema(region: string, path: string, description: string, dateModified?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${INTEGRATIONS.siteUrl}${path}#webpage`,
    isPartOf: { "@id": `${INTEGRATIONS.siteUrl}/#website` },
    name: `In-Home Nursing ${region} | ${SITE.name}`,
    description,
    url: `${INTEGRATIONS.siteUrl}${path}`,
    ...(dateModified ? { dateModified } : {}),
    about: { "@id": `${INTEGRATIONS.siteUrl}/#organization` },
    spatialCoverage: { "@type": "Place", name: region },
  };
}

// HowTo schema was removed on 2026-07-28. Google withdrew HowTo rich results
// for all surfaces in September 2023 and retired the Search Console reporting
// in 2025, so the markup produced nothing while still needing to be kept in
// lockstep with the visible steps. The visible step content is the asset now:
// keep it as a numbered list with a question-shaped heading, which is what
// featured snippets and AI answer engines actually extract.

export function getAggregateRatingSchema() {
  if (GOOGLE_REVIEWS.averageRating == null || GOOGLE_REVIEWS.reviewCount == null) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    itemReviewed: { "@id": `${INTEGRATIONS.siteUrl}/#organization` },
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
    author: post.author.name === SITE.name
      ? { "@id": `${INTEGRATIONS.siteUrl}/#organization` }
      : {
          "@type": "Person",
          name: post.author.name,
          ...(post.author.role ? { jobTitle: post.author.role } : {}),
        },
    publisher: { "@id": `${INTEGRATIONS.siteUrl}/#organization` },
    ...(post.featuredImageSrc
      ? { image: `${INTEGRATIONS.siteUrl}${post.featuredImageSrc}` }
      : {}),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": post.url,
    },
  };
}
