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
    "Personalised in-home nursing and care services. Registered NDIS and DVA provider. Trusted by families, support coordinators, and healthcare professionals.",
  keywords: [
    "NDIS nursing",
    "in-home care",
    "community nursing",
    "aged care",
    "DVA care",
    "personal care",
  ],
  authors: [{ name: SITE.name }],
  openGraph: {
    type: "website",
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
  },
  verification: getVerification(),
};

/**
 * Helper to merge page metadata with defaults.
 * Ensures openGraph and twitter get title, description, images, and canonical per page.
 */
export function createMetadata(overrides: Metadata & { canonical?: string }): Metadata {
  const title = typeof overrides.title === "string" ? overrides.title : (overrides.title as { default?: string })?.default ?? defaultMetadata.title;
  const description = overrides.description ?? defaultMetadata.description;
  const titleStr = typeof title === "object" && title && "default" in title ? (title as { default: string }).default : String(title);
  const { canonical, ...rest } = overrides;

  return {
    ...defaultMetadata,
    ...rest,
    ...(canonical !== undefined && { alternates: { canonical } }),
    openGraph: {
      ...defaultMetadata.openGraph,
      ...rest.openGraph,
      title: rest.openGraph?.title ?? titleStr,
      description: rest.openGraph?.description ?? (typeof description === "string" ? description : undefined),
      images: rest.openGraph?.images ?? defaultMetadata.openGraph?.images,
    },
    twitter: {
      ...defaultMetadata.twitter,
      ...rest.twitter,
      title: rest.twitter?.title ?? titleStr,
      description: rest.twitter?.description ?? (typeof description === "string" ? description : undefined),
    },
  };
}
