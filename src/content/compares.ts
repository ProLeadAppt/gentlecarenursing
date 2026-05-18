/**
 * Registry of /compare/* pages.
 *
 * Mirrors the ALL_GUIDES pattern in src/content/guides.ts so that service
 * pages can declare relatedCompareSlugs and have the layout render a
 * contextual "Related comparisons" section, AND so that the new /compare
 * index page in src/app/compare/page.tsx can list every comparison from
 * a single source.
 *
 * Each entry mirrors the metadata already in the compare-*.ts content
 * files — kept here as a small registry to avoid importing whole page
 * content files for what is just a list-of-links surface.
 */

export interface CompareEntry {
  slug: string;
  href: string;
  title: string;
  /** Short one-line summary, matches the spirit of the page's snippetAnswer. */
  summary: string;
}

export const ALL_COMPARES: readonly CompareEntry[] = [
  {
    slug: "registered-ndis-provider-vs-non-registered",
    href: "/compare/registered-ndis-provider-vs-non-registered",
    title: "Registered NDIS Provider vs Non-Registered",
    summary:
      "Side-by-side comparison of registered and non-registered NDIS providers — who can use each, what they can deliver, pricing, and how to choose.",
  },
  {
    slug: "dva-community-nursing-vs-private-nursing",
    href: "/compare/dva-community-nursing-vs-private-nursing",
    title: "DVA Community Nursing vs Private In-Home Nursing",
    summary:
      "How DVA Community Nursing compares to private in-home nursing for Sydney veterans and families — eligibility, cost, scope, and how to combine them.",
  },
] as const;

export function getCompareBySlug(slug: string): CompareEntry | undefined {
  return ALL_COMPARES.find((c) => c.slug === slug);
}
