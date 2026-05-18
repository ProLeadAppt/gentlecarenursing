/**
 * Suburb-level location pages.
 *
 * Each /suburbs/[slug] page targets long-tail local search like
 * "in-home nursing Strathfield", "NDIS provider Manly", "DVA community
 * nursing Mosman" — search lanes where nobody in Sydney dominates and
 * where the previously-existing /areas/[region] coverage was too broad.
 *
 * Programmatic SEO done responsibly: each entry has real, suburb-specific
 * data (LGA, nearest hospitals, neighbouring suburbs, what makes nursing
 * care here distinct). The pages aren't thin doorways — they have
 * substantive local content, link to the relevant region page for breadth,
 * and emit per-suburb PostalAddress + Place schema so AI engines can bind
 * Gentle Care to the location entity cleanly.
 *
 * Voice rules respected:
 *   - DVA wording exact when named
 *   - No "guarantee" / "boutique"
 *   - "We aim to respond within 24 hours" phrasing
 *   - "Experienced nurses" / "skilled nurses" outside regulatory contexts
 *
 * Factual basis:
 *   - All suburbs are in our existing AREAS_SERVED list (no scope expansion)
 *   - Named hospitals are real Sydney hospitals serving each suburb
 *   - LGA names are current (post-amalgamation NSW Local Government Areas)
 *   - "Nearest hospital" reflects realistic proximity, not aspirational
 */

export interface SuburbEntry {
  /** URL slug (lowercase, hyphenated) */
  slug: string;
  /** Suburb display name */
  name: string;
  /** Postcode — listed as a fact, helps disambiguate (some Sydney suburb names repeat) */
  postcode: string;
  /** NSW Local Government Area the suburb sits in */
  lga: string;
  /** Region this suburb belongs to in our existing AREAS_SERVED list */
  region: string;
  /** URL of the matching /areas/[slug] page */
  regionHref: string;
  /** Major hospitals nearest to (or commonly used by) residents */
  nearestHospitals: readonly string[];
  /** 2-3 neighbouring suburbs commonly searched together */
  neighbouringSuburbs: readonly string[];
  /** Distinctive one-line characterisation of who lives here (avoid stereotypes — keep factual) */
  localContext: string;
}

export const SUBURBS: readonly SuburbEntry[] = [
  // -------------------------------------------------------------------------
  // Inner West — where GCN office is based, so deepest coverage
  // -------------------------------------------------------------------------
  {
    slug: "strathfield",
    name: "Strathfield",
    postcode: "2135",
    lga: "Strathfield Council",
    region: "Inner West",
    regionHref: "/areas/inner-west",
    nearestHospitals: ["Concord Hospital", "Royal Prince Alfred Hospital (RPA)", "Sydney Adventist Hospital"],
    neighbouringSuburbs: ["Homebush", "Burwood", "North Strathfield"],
    localContext:
      "Strathfield is the suburb our office sits in (Level 1/5 George Street, North Strathfield). The area has a strong multicultural community — particularly Korean, Chinese, and Indian — and a mix of established residential, units, and family homes around the Strathfield Council LGA.",
  },
  {
    slug: "concord",
    name: "Concord",
    postcode: "2137",
    lga: "City of Canada Bay",
    region: "Inner West",
    regionHref: "/areas/inner-west",
    nearestHospitals: ["Concord Hospital", "Royal Prince Alfred Hospital (RPA)"],
    neighbouringSuburbs: ["North Strathfield", "Burwood", "Strathfield"],
    localContext:
      "Concord sits on the Parramatta River, with Concord Hospital — a tertiary teaching hospital with strong geriatric, palliative, and respiratory services — at its centre. Many of our local referrals come direct from Concord Hospital's discharge teams.",
  },
  {
    slug: "burwood",
    name: "Burwood",
    postcode: "2134",
    lga: "Burwood Council",
    region: "Inner West",
    regionHref: "/areas/inner-west",
    nearestHospitals: ["Concord Hospital", "Royal Prince Alfred Hospital (RPA)"],
    neighbouringSuburbs: ["Strathfield", "Croydon", "Ashfield"],
    localContext:
      "Burwood is a transport-hub suburb with a major rail interchange and dense mixed housing. Many older residents access Concord Hospital for clinical care and prefer in-home nursing to maintain independence in familiar surroundings.",
  },

  // -------------------------------------------------------------------------
  // North Shore
  // -------------------------------------------------------------------------
  {
    slug: "chatswood",
    name: "Chatswood",
    postcode: "2067",
    lga: "Willoughby City Council",
    region: "North Shore",
    regionHref: "/areas/north-shore",
    nearestHospitals: ["Royal North Shore Hospital (RNSH)", "Macquarie University Hospital", "North Shore Private Hospital"],
    neighbouringSuburbs: ["Willoughby", "Lane Cove", "North Sydney"],
    localContext:
      "Chatswood is a major North Shore commercial and residential centre with a strong multicultural population, particularly Chinese and Korean. Residents typically access RNSH for major surgery and Macquarie University Hospital for specialist services.",
  },
  {
    slug: "mosman",
    name: "Mosman",
    postcode: "2088",
    lga: "Mosman Council",
    region: "North Shore",
    regionHref: "/areas/north-shore",
    nearestHospitals: ["Royal North Shore Hospital (RNSH)", "North Shore Private Hospital", "Mater Hospital"],
    neighbouringSuburbs: ["Neutral Bay", "Cremorne", "North Sydney"],
    localContext:
      "Mosman has one of the highest proportions of older residents in Sydney, with established family homes and quieter streets that suit aged-in-place support. Many residents access private hospitals (Mater, North Shore Private) alongside public services at RNSH.",
  },

  // -------------------------------------------------------------------------
  // Northern Beaches
  // -------------------------------------------------------------------------
  {
    slug: "manly",
    name: "Manly",
    postcode: "2095",
    lga: "Northern Beaches Council",
    region: "Northern Beaches",
    regionHref: "/areas/northern-beaches",
    nearestHospitals: ["Northern Beaches Hospital (Frenchs Forest)", "Royal North Shore Hospital (RNSH)"],
    neighbouringSuburbs: ["Balgowlah", "Fairlight", "North Curl Curl"],
    localContext:
      "Manly is one of Sydney's most well-known beachside suburbs, with a mix of older residents and younger families. Northern Beaches Hospital at Frenchs Forest is the primary local public hospital; RNSH handles complex cases requiring tertiary services.",
  },
  {
    slug: "dee-why",
    name: "Dee Why",
    postcode: "2099",
    lga: "Northern Beaches Council",
    region: "Northern Beaches",
    regionHref: "/areas/northern-beaches",
    nearestHospitals: ["Northern Beaches Hospital (Frenchs Forest)"],
    neighbouringSuburbs: ["Brookvale", "Collaroy", "Narraweena"],
    localContext:
      "Dee Why is a major Northern Beaches residential centre with a large older population in established units and family homes. Northern Beaches Hospital is the primary local public hospital, with a strong rehabilitation service used by post-hospital clients.",
  },

  // -------------------------------------------------------------------------
  // Sydney CBD & East
  // -------------------------------------------------------------------------
  {
    slug: "bondi",
    name: "Bondi",
    postcode: "2026",
    lga: "Waverley Council",
    region: "Sydney CBD & East",
    regionHref: "/areas/sydney-cbd-east",
    nearestHospitals: ["St Vincent's Hospital", "Prince of Wales Hospital (POW)"],
    neighbouringSuburbs: ["Bondi Junction", "Bronte", "Tamarama"],
    localContext:
      "Bondi has a mix of long-term residents and a high proportion of older Australians in established homes near the beach. St Vincent's Hospital in Darlinghurst is the closest tertiary referral centre, particularly for palliative and cardiology services.",
  },
  {
    slug: "randwick",
    name: "Randwick",
    postcode: "2031",
    lga: "Randwick City Council",
    region: "Sydney CBD & East",
    regionHref: "/areas/sydney-cbd-east",
    nearestHospitals: ["Prince of Wales Hospital (POW)", "Sydney Children's Hospital (Randwick)", "Royal Hospital for Women", "St Vincent's Hospital"],
    neighbouringSuburbs: ["Kingsford", "Coogee", "Kensington"],
    localContext:
      "Randwick is the centre of the Randwick health precinct — the Prince of Wales Hospital, Sydney Children's Hospital, and Royal Hospital for Women all sit within a few hundred metres. Many of our local clients come direct from POW discharge planners.",
  },
  {
    slug: "sydney-cbd",
    name: "Sydney CBD",
    postcode: "2000",
    lga: "City of Sydney",
    region: "Sydney CBD & East",
    regionHref: "/areas/sydney-cbd-east",
    nearestHospitals: ["St Vincent's Hospital", "Royal Prince Alfred Hospital (RPA)"],
    neighbouringSuburbs: ["Surry Hills", "Pyrmont", "Darlinghurst"],
    localContext:
      "Sydney CBD has a growing number of older residents in apartments — particularly in areas like Pyrmont, Darling Harbour, and the eastern fringe. St Vincent's Hospital is the closest major hospital for residents east of Pitt Street; RPA serves areas west of Central.",
  },

  // -------------------------------------------------------------------------
  // Western Sydney
  // -------------------------------------------------------------------------
  {
    slug: "parramatta",
    name: "Parramatta",
    postcode: "2150",
    lga: "City of Parramatta",
    region: "Western Sydney",
    regionHref: "/areas/western-sydney",
    nearestHospitals: ["Westmead Hospital", "Westmead Private Hospital", "Cumberland Hospital"],
    neighbouringSuburbs: ["Westmead", "Harris Park", "North Parramatta"],
    localContext:
      "Parramatta is Sydney's second CBD, with one of the most multicultural older populations in Australia. Westmead Hospital is the major tertiary teaching hospital for Western Sydney; we work closely with Westmead discharge planners across all our service lines.",
  },
  {
    slug: "liverpool",
    name: "Liverpool",
    postcode: "2170",
    lga: "Liverpool City Council",
    region: "Western Sydney",
    regionHref: "/areas/western-sydney",
    nearestHospitals: ["Liverpool Hospital", "Bankstown-Lidcombe Hospital", "Fairfield Hospital"],
    neighbouringSuburbs: ["Casula", "Lurnea", "Moorebank"],
    localContext:
      "Liverpool is a major south-west Sydney centre with a tertiary hospital (Liverpool Hospital) covering trauma, oncology, and complex care. The area has a very multicultural population and high demand for in-home nursing across NDIS, DVA, and aged care.",
  },

  // -------------------------------------------------------------------------
  // South Sydney
  // -------------------------------------------------------------------------
  {
    slug: "hurstville",
    name: "Hurstville",
    postcode: "2220",
    lga: "Georges River Council",
    region: "South Sydney",
    regionHref: "/areas/south-sydney",
    nearestHospitals: ["St George Hospital (Kogarah)", "Sutherland Hospital (Caringbah)"],
    neighbouringSuburbs: ["Kogarah", "Penshurst", "Allawah"],
    localContext:
      "Hurstville is a major South Sydney transport and commercial hub with a strong Chinese-Australian community and dense mixed housing. St George Hospital in Kogarah is the primary local public hospital and a frequent source of post-discharge referrals.",
  },
  {
    slug: "sutherland",
    name: "Sutherland",
    postcode: "2232",
    lga: "Sutherland Shire Council",
    region: "South Sydney",
    regionHref: "/areas/south-sydney",
    nearestHospitals: ["Sutherland Hospital (Caringbah)", "St George Hospital (Kogarah)"],
    neighbouringSuburbs: ["Miranda", "Jannali", "Kirrawee"],
    localContext:
      "Sutherland sits at the gateway to the Shire, with Sutherland Hospital in nearby Caringbah serving as the local public hospital. The Shire has a large established population and strong demand for in-home aged care under Support at Home and CHSP.",
  },
  {
    slug: "cronulla",
    name: "Cronulla",
    postcode: "2230",
    lga: "Sutherland Shire Council",
    region: "South Sydney",
    regionHref: "/areas/south-sydney",
    nearestHospitals: ["Sutherland Hospital (Caringbah)", "St George Hospital (Kogarah)"],
    neighbouringSuburbs: ["Caringbah", "Woolooware", "Burraneer"],
    localContext:
      "Cronulla is a beachside Shire suburb with one of the older populations in southern Sydney. Sutherland Hospital is a short drive away, and many residents prefer to remain at home with in-home nursing rather than relocate for aged care.",
  },
] as const;

export function getSuburbBySlug(slug: string): SuburbEntry | undefined {
  return SUBURBS.find((s) => s.slug === slug);
}

export function getAllSuburbSlugs(): string[] {
  return SUBURBS.map((s) => s.slug);
}
