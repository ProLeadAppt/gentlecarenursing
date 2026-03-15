import type { Metadata } from "next";
import { SITE } from "./constants";

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
  },
};

/**
 * Helper to merge page metadata with defaults.
 */
export function createMetadata(overrides: Metadata): Metadata {
  return {
    ...defaultMetadata,
    ...overrides,
  };
}
