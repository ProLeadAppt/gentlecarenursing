/**
 * Single source of truth for areas served — must match GMB (Google Business Profile) exactly.
 * Used by schema (areaServed), AreasWeServe section, and any area-related copy.
 */

export interface AreaGroup {
  readonly region: string;
  readonly suburbs: readonly string[];
}

export const AREAS_SERVED: readonly AreaGroup[] = [
  {
    region: "Inner West",
    suburbs: ["Strathfield", "Burwood", "Ashfield", "Concord", "Homebush", "Croydon"],
  },
  {
    region: "Sydney CBD & East",
    suburbs: ["Sydney CBD", "Surry Hills", "Bondi", "Randwick", "Paddington", "Woollahra"],
  },
  {
    region: "North Shore",
    suburbs: ["Chatswood", "North Sydney", "Lane Cove", "Willoughby", "Mosman", "Neutral Bay"],
  },
  {
    region: "Western Sydney",
    suburbs: ["Parramatta", "Blacktown", "Penrith", "Liverpool", "Bankstown", "Auburn"],
  },
  {
    region: "South Sydney",
    suburbs: ["Hurstville", "Kogarah", "Sutherland", "Cronulla", "Rockdale", "Mascot"],
  },
  {
    region: "Northern Beaches",
    suburbs: ["Manly", "Dee Why", "Brookvale", "Mona Vale", "Narrabeen", "Avalon"],
  },
] as const;
