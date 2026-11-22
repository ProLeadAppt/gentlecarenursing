/**
 * Existing location copy, arranged in the approved suburb layout.
 * Sentences stay as published. Nothing new is claimed.
 */
import { CTA_LINKS, SITE } from "@/lib/constants";
import type { LandingIcon, LandingTile, SuburbLandingPageData } from "@/content/suburb-landing-pages";
import type { SuburbEntry } from "@/content/suburbs";

const HANDS = {
  src: "/images/homepage-hands-chris-f-33525563.jpg",
  alt: "Two people holding hands.",
  width: 1000,
  height: 667,
} as const;

const BAND = {
  src: "/images/hero-hands.webp",
  alt: "A younger hand resting over an older person's hand.",
  width: 1024,
  height: 283,
} as const;

const ICONS: readonly LandingIcon[] = ["nursing", "personal", "community", "complex", "wound", "medication", "monitoring"];

function tiles(items: readonly { title: string; href: string; label: string }[]): LandingTile[] {
  return items.map((item, index) => ({
    icon: ICONS[index % ICONS.length],
    title: item.title,
    links: [{ href: item.href, label: item.label }],
  }));
}

export function suburbToLanding(entry: SuburbEntry): SuburbLandingPageData {
  return {
    slug: entry.slug,
    name: entry.name,
    postcode: entry.postcode,
    lga: entry.lga,
    region: entry.region,
    regionHref: entry.regionHref,
    seoTitle: `In-Home Nursing & Care in ${entry.name}`,
    metaDescription: `Explore in-home nursing and care options in ${entry.name} (${entry.postcode}, ${entry.lga}). Enquire about care needs, funding and availability in the wider ${entry.region}.`,
    h1: `In-Home Nursing & Care in ${entry.name}`,
    serviceName: `In-home nursing in ${entry.name}, Sydney`,
    serviceType: "In-home nursing",
    serviceDescription: `In-home nursing and personal care enquiries for ${entry.name} (${entry.postcode}, ${entry.lga}). Discuss clinical suitability, funding arrangements, availability and referral requirements with the team.`,
    intro: [
      `Gentle Care Nursing Services provides in-home nursing and personal care in ${entry.name} (${entry.postcode}) — a ${entry.lga} suburb in the ${entry.region}.`,
      "Contact the team to discuss NDIS, DVA Community Nursing, aged care or privately funded support.",
      "Care arrangements depend on individual needs, funding requirements, referral information and current availability.",
      entry.localContext,
    ],
    heroActions: [
      { href: SITE.phoneHref, label: `Call ${SITE.phone}` },
      { href: CTA_LINKS.requestCare.href, label: CTA_LINKS.requestCare.label },
    ],
    trust: [
      { title: "Local government area", text: `${entry.lga}. ${entry.name} ${entry.postcode}.` },
      { title: "Wider region", text: entry.region },
      { title: "Postcode", text: entry.postcode },
    ],
    image: HANDS,
    imageBand: { after: `What we cover in ${entry.name}`, ...BAND },
    sections: [
      {
        heading: `What we cover in ${entry.name}`,
        lead: `Whether you're an ${entry.name} resident, a family member organising care, a support coordinator, or a discharge planner, contact the team to discuss the care needed and any referral requirements.`,
        tiles: tiles([
          { href: "/ndis", title: "NDIS in-home nursing", label: "NDIS in-home nursing" },
          { href: "/dva", title: "DVA Community Nursing", label: "DVA Community Nursing" },
          { href: "/aged-care", title: "Aged care at home", label: "Aged care at home" },
          { href: "/private-nursing", title: "Private in-home nursing", label: "Private in-home nursing" },
          { href: "/services/nursing-care", title: "General nursing care", label: "General nursing care" },
          { href: "/services/complex-care", title: "Complex care", label: "Complex care" },
          { href: "/services/post-hospital-care", title: "Post-hospital care", label: "Post-hospital care" },
        ]),
      },
      {
        heading: "Hospitals in the wider area",
        lead: entry.nearestHospitals.join(", ") + ".",
        blocks: [
          {
            type: "p",
            text: "*For local reference. Listing a hospital does not imply an affiliation or referral arrangement.*",
          },
          {
            type: "p",
            text: `Neighbouring suburbs we also serve: ${entry.neighbouringSuburbs.join(", ")}. [See all of ${entry.region}](${entry.regionHref}).`,
          },
        ],
      },
      {
        heading: "How to get started",
        lead: "Submit an enquiry or call us.",
        process: {
          steps: [
            {
              title: "Send an enquiry",
              text: `Submit an enquiry or call us on ${SITE.phone}.`,
            },
            {
              title: "Share the details",
              text: "Share your suburb, care needs and preferred timing.",
            },
            {
              title: "We discuss whether we can assist",
              text: "The team can discuss whether it can assist.",
            },
          ],
          checklist: {
            title: "Helpful to have ready",
            items: [
              "The suburb where care is needed",
              "The type of support requested",
              "Preferred timing",
              "Any referral information you already have",
            ],
          },
          primary: { href: CTA_LINKS.requestCare.href, label: CTA_LINKS.requestCare.label },
          secondary: { href: SITE.phoneHref, label: SITE.phone },
        },
      },
      {
        heading: `Arrange in-home care in ${entry.name}`,
        blocks: [
          {
            type: "p",
            text: `Submit an enquiry or call us on [${SITE.phone}](${SITE.phoneHref}). Share your suburb, care needs and preferred timing so the team can discuss whether it can assist.`,
          },
        ],
      },
    ],
    closingActions: [
      { href: SITE.phoneHref, label: `Call ${SITE.phone}` },
      { href: CTA_LINKS.requestCare.href, label: CTA_LINKS.requestCare.label },
      { href: CTA_LINKS.contact.href, label: CTA_LINKS.contact.label },
    ],
  };
}
