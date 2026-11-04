import type { Metadata } from "next";
import { SITE } from "./constants";
import { getVerification } from "./seo-verification";

const defaultOgImage = { url: "/images/og/default.png", width: 1200, height: 630, alt: `${SITE.name}. In-home nursing and care` };

/**
 * Default metadata for the site.
 * Pages can override via generateMetadata.
 */
export const defaultMetadata: Metadata = {
  title: {
    default: `${SITE.name} | In-Home Nursing & Care Services`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Personalised in-home nursing and care across Sydney for NDIS participants, DVA clients, older Australians and private clients.",
  authors: [{ name: SITE.name }],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_AU",
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    images: [defaultOgImage],
  },
  verification: getVerification(),
};

/**
 * Helper to merge page metadata with defaults.
 * Ensures openGraph and twitter get title, description, images, and canonical per page.
 */
export function createMetadata(overrides: Metadata & { canonical?: string }): Metadata {
  const fallbackTitle = `${SITE.name} | In-Home Nursing & Care Services`;
  const suppliedTitle = overrides.title;
  const rawTitle = typeof suppliedTitle === "string"
    ? suppliedTitle
    : suppliedTitle && "absolute" in suppliedTitle
      ? suppliedTitle.absolute
      : suppliedTitle && "default" in suppliedTitle
        ? suppliedTitle.default
        : fallbackTitle;
  // Resolve the brand once here and bypass the root layout's title template.
  const titleStr = suppliedTitle && typeof suppliedTitle === "object" && "absolute" in suppliedTitle
    ? rawTitle
    : rawTitle.includes(SITE.name) ? rawTitle : `${rawTitle} | ${SITE.name}`;
  const description = overrides.description ?? defaultMetadata.description;
  const { canonical, ...rest } = overrides;

  return {
    ...defaultMetadata,
    ...rest,
    title: { absolute: titleStr },
    ...(canonical !== undefined && { alternates: { ...rest.alternates, canonical } }),
    openGraph: {
      ...defaultMetadata.openGraph,
      ...rest.openGraph,
      title: rest.openGraph?.title ?? titleStr,
      ...(canonical !== undefined && { url: rest.openGraph?.url ?? canonical }),
      description: rest.openGraph?.description ?? (typeof description === "string" ? description : undefined),
      images: rest.openGraph?.images ?? defaultMetadata.openGraph?.images,
    },
    twitter: {
      ...defaultMetadata.twitter,
      ...rest.twitter,
      title: rest.twitter?.title ?? titleStr,
      images: rest.twitter?.images ?? rest.openGraph?.images ?? defaultMetadata.twitter?.images,
      description: rest.twitter?.description ?? (typeof description === "string" ? description : undefined),
    },
  };
}
