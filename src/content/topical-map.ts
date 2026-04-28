/**
 * Topical map for SEO (Caleb Ulku MVC + silos).
 * Pillars and clusters; use for breadcrumbs, related links, and internal linking.
 * Only link related content: avoid "connect everything to everything".
 */

import { AREAS_SERVED } from "./areas-served";

function regionSlug(region: string): string {
  return region
    .toLowerCase()
    .replace(/\s*&\s*/g, " ")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

const REGION_SLUGS = AREAS_SERVED.map((a) => regionSlug(a.region));

/**
 * Service × region cluster paths. Generated from AREAS_SERVED so the map
 * stays in sync with the GMB-aligned region list. Each entry is a leaf page
 * at /services/[service]/[region] backed by content/service-regions.ts.
 */
const SERVICE_REGION_CLUSTERS: Record<
  | "ndis-services"
  | "dva-community-nursing"
  | "in-home-nursing-care"
  | "personal-care-daily-living"
  | "complex-care-support",
  readonly string[]
> = {
  "ndis-services": REGION_SLUGS.map((r) => `/services/ndis-services/${r}`),
  "dva-community-nursing": REGION_SLUGS.map((r) => `/services/dva-community-nursing/${r}`),
  "in-home-nursing-care": REGION_SLUGS.map((r) => `/services/in-home-nursing-care/${r}`),
  "personal-care-daily-living": REGION_SLUGS.map((r) => `/services/personal-care-daily-living/${r}`),
  "complex-care-support": REGION_SLUGS.map((r) => `/services/complex-care-support/${r}`),
};

export type PillarId =
  | "home"
  | "services"
  | "ndis"
  | "dva"
  | "aged-care"
  | "private-nursing"
  | "in-home-nursing"
  | "personal-care"
  | "complex-care"
  | "about"
  | "contact"
  | "referral"
  | "referrers"
  | "faq"
  | "areas";

export interface Pillar {
  id: PillarId;
  title: string;
  path: string;
  /** Cluster pages (supporting content) under this pillar */
  clusterPaths: readonly string[];
  /** Related pillars for cross-linking (same silo or logical intent) */
  relatedPillarIds: readonly PillarId[];
}

export const TOPICAL_MAP: readonly Pillar[] = [
  {
    id: "home",
    title: "Home",
    path: "/",
    clusterPaths: [],
    relatedPillarIds: ["services", "referral", "areas"],
  },
  {
    id: "services",
    title: "Our Services",
    path: "/services",
    clusterPaths: [
      "/ndis",
      "/dva",
      "/aged-care",
      "/private-nursing",
      "/services/nursing-care",
      "/services/personal-care",
      "/services/post-hospital-care",
      "/services/complex-care",
      "/services/hospital-at-home",
      "/services/palliative-care",
    ],
    relatedPillarIds: [
      "ndis",
      "dva",
      "aged-care",
      "private-nursing",
      "in-home-nursing",
      "personal-care",
      "complex-care",
      "referral",
    ],
  },
  {
    id: "ndis",
    title: "NDIS Services",
    path: "/ndis",
    clusterPaths: SERVICE_REGION_CLUSTERS["ndis-services"],
    relatedPillarIds: ["services", "referral", "areas", "in-home-nursing", "complex-care"],
  },
  {
    id: "dva",
    title: "DVA & Community Nursing",
    path: "/dva",
    clusterPaths: SERVICE_REGION_CLUSTERS["dva-community-nursing"],
    relatedPillarIds: ["services", "referral", "areas", "in-home-nursing", "complex-care"],
  },
  {
    id: "in-home-nursing",
    title: "In-Home Nursing Care",
    path: "/services/nursing-care",
    clusterPaths: SERVICE_REGION_CLUSTERS["in-home-nursing-care"],
    relatedPillarIds: ["services", "ndis", "dva", "complex-care", "referral", "areas"],
  },
  {
    id: "personal-care",
    title: "Personal Care & Daily Living Assistance",
    path: "/services/personal-care",
    clusterPaths: SERVICE_REGION_CLUSTERS["personal-care-daily-living"],
    relatedPillarIds: ["services", "ndis", "in-home-nursing", "referral", "areas"],
  },
  {
    id: "complex-care",
    title: "Complex Care Support",
    path: "/services/complex-care",
    clusterPaths: SERVICE_REGION_CLUSTERS["complex-care-support"],
    relatedPillarIds: ["services", "ndis", "dva", "in-home-nursing", "referral", "areas"],
  },
  {
    id: "aged-care",
    title: "Aged Care",
    path: "/aged-care",
    clusterPaths: [],
    relatedPillarIds: ["services", "referral", "areas"],
  },
  {
    id: "private-nursing",
    title: "Private Nursing",
    path: "/private-nursing",
    clusterPaths: [],
    relatedPillarIds: ["services", "referral", "areas"],
  },
  {
    id: "about",
    title: "About Us",
    path: "/about",
    clusterPaths: [],
    relatedPillarIds: ["contact", "faq"],
  },
  {
    id: "contact",
    title: "Contact",
    path: "/contact",
    clusterPaths: [],
    relatedPillarIds: ["referral", "about"],
  },
  {
    id: "referral",
    title: "Request Care / Referral",
    path: "/referral",
    clusterPaths: [],
    relatedPillarIds: ["services", "contact", "areas", "referrers"],
  },
  {
    id: "referrers",
    title: "For Coordinators & Referrers",
    path: "/referrers",
    clusterPaths: [],
    relatedPillarIds: ["referral", "services", "contact"],
  },
  {
    id: "faq",
    title: "FAQ",
    path: "/faq",
    clusterPaths: [],
    relatedPillarIds: ["about", "services", "referral"],
  },
  {
    id: "areas",
    title: "Areas We Serve",
    path: "/areas",
    clusterPaths: [], // filled by AREAS_SERVED regions, e.g. /areas/inner-west
    relatedPillarIds: ["services", "referral", "home"],
  },
] as const;

/** Get pillar by path (e.g. /ndis -> ndis pillar) */
export function getPillarByPath(path: string): Pillar | undefined {
  return TOPICAL_MAP.find((p) => p.path === path || p.clusterPaths.includes(path));
}

/** Get related pillars for a given pillar id (for related links) */
export function getRelatedPillars(pillarId: PillarId): readonly Pillar[] {
  const pillar = TOPICAL_MAP.find((p) => p.id === pillarId);
  if (!pillar) return [];
  return pillar.relatedPillarIds
    .map((id) => TOPICAL_MAP.find((p) => p.id === id))
    .filter((p): p is Pillar => p != null);
}

/** Breadcrumb items for a page (e.g. Home > Services > NDIS). Pass currentLabel for the last segment (e.g. area name). */
export function getBreadcrumbPaths(
  path: string,
  currentLabel?: string
): { label: string; path: string }[] {
  const items: { label: string; path: string }[] = [{ label: "Home", path: "/" }];
  if (path === "/") return items;
  if (path.startsWith("/areas/")) {
    items.push({ label: "Areas We Serve", path: "/areas" });
    items.push({
      label: currentLabel ?? path.replace(/^\/areas\//, "").replace(/-/g, " "),
      path,
    });
    return items;
  }
  const pillar = TOPICAL_MAP.find((p) => p.path === path);
  if (pillar && pillar.path !== "/") {
    items.push({ label: pillar.title, path: pillar.path });
    return items;
  }
  const parent = TOPICAL_MAP.find((p) => p.clusterPaths.includes(path));
  if (parent) {
    items.push({ label: parent.title, path: parent.path });
    items.push({ label: currentLabel ?? "Page", path });
  }
  return items;
}
