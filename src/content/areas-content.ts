/**
 * Content for area/region landing pages (Local SEO — neighborhood-style).
 * One entry per region; used by /areas and /areas/[region].
 * Answer-first copy for featured snippets and AEO.
 */

import { AREAS_SERVED } from "./areas-served";

export interface AreaContent {
  /** Region name (matches AREAS_SERVED.region) */
  region: string;
  /** URL slug (e.g. inner-west) */
  slug: string;
  /** Direct answer for "in-home nursing [region]" — first 1–2 sentences */
  headline: string;
  /** Snippet-style description (meta + above fold) */
  description: string;
  /** Short paragraph: who we serve, how to get care, reassurance */
  body: string;
  /** Suburbs in this region (from AREAS_SERVED) */
  suburbs: readonly string[];
}

const AREA_BODY_TEMPLATE =
  "We provide in-home nursing and personal care across {suburbs}. Whether you or your loved one is on NDIS, DVA, a Home Care Package, or private funding, we work with coordinators and discharge planners to arrange care quickly. You'll get a personal response within 24 hours and clear next steps.";

export function slugifyRegion(region: string): string {
  return region
    .toLowerCase()
    .replace(/\s*&\s*/g, " ")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export const AREAS_CONTENT: AreaContent[] = AREAS_SERVED.map((area) => {
  const slug = slugifyRegion(area.region);
  const suburbList = area.suburbs.slice(0, 4).join(", ") + (area.suburbs.length > 4 ? " and more" : "");
  return {
    region: area.region,
    slug,
    headline: `In-home nursing and care in ${area.region} — NDIS, DVA, aged care, and private.`,
    description: `Gentle Care Nursing provides in-home nursing and personal care across ${area.region} (${area.suburbs.join(", ")}). Registered NDIS and DVA provider. Personal response within 24 hours.`,
    body: AREA_BODY_TEMPLATE.replace("{suburbs}", suburbList),
    suburbs: area.suburbs,
  };
});

export function getAreaContentBySlug(slug: string): AreaContent | undefined {
  return AREAS_CONTENT.find((a) => a.slug === slug);
}

export function getAllAreaSlugs(): string[] {
  return AREAS_CONTENT.map((a) => a.slug);
}
