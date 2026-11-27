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
function metadataTitleText(title: Metadata["title"]): string {
  if (typeof title === "string") return title;
  if (title && typeof title === "object") {
    if ("absolute" in title && typeof title.absolute === "string") return title.absolute;
    if ("default" in title && typeof title.default === "string") return title.default;
  }
  return "";
}

export function createMetadata(overrides: Metadata & { canonical?: string }): Metadata {
  const title = overrides.title === undefined ? defaultMetadata.title : overrides.title;
  const description = overrides.description ?? defaultMetadata.description;
  const titleStr = metadataTitleText(title);
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
