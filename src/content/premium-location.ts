/**
 * Existing location copy, arranged in the approved suburb layout.
 * Sentences stay as published. Nothing new is claimed.
 */
import { INTEGRATIONS } from "@/config/integrations";
import { CTA_LINKS, SITE } from "@/lib/constants";
import type { AreaContent } from "@/content/areas-content";
import { SERVICE_REGION_PAGES } from "@/content/service-regions";
import { SUBURB_LANDING_PAGES, type LandingIcon, type LandingTile, type SuburbLandingPageData } from "@/content/suburb-landing-pages";
import { SUBURBS, type SuburbEntry } from "@/content/suburbs";

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

const CONVERSATION = {
  src: "/images/homepage-care-conversation-v4.webp",
  alt: "A woman in burgundy scrubs and an older woman talking together on a sofa.",
  width: 1536,
  height: 1024,
} as const;

const PAGE_BY_NAME = new Map<string, string>([
  ...SUBURBS.map((entry) => [entry.name, `/suburbs/${entry.slug}`] as const),
  ...SUBURB_LANDING_PAGES.map((entry) => [entry.name, `/suburbs/${entry.slug}`] as const),
]);

export function areaToLanding(area: AreaContent): SuburbLandingPageData {
  const names = [...area.suburbs];
  if (area.slug === "inner-west") {
    for (const page of SUBURB_LANDING_PAGES) {
      if (!names.includes(page.name)) names.push(page.name);
    }
  }
  const communities = names.map((name) => {
    const href = PAGE_BY_NAME.get(name);
    return href ? `[${name}](${href})` : name;
  }).join(" · ");
  const listed = area.suburbs.slice(0, 5).join(", ");
  const guides = SERVICE_REGION_PAGES.filter((page) => page.regionSlug === area.slug);
  return {
    slug: area.slug,
    name: area.region,
    postcode: "",
    lga: area.region,
    region: "Sydney",
    regionHref: "/areas",
    seoTitle: `In-Home Nursing ${area.region} | Sydney`,
    metaDescription: area.description,
    h1: `In-Home Nursing & Care in ${area.region}`,
    serviceName: `In-home nursing in ${area.region}`,
    serviceType: "In-home nursing",
    serviceDescription: area.description,
    intro: [area.headline],
    heroActions: [
      { href: CTA_LINKS.requestCare.href, label: CTA_LINKS.requestCare.label },
      { href: SITE.phoneHref, label: `Call ${SITE.phone}` },
    ],
    trust: [
      { title: "Region covered", text: `In-home nursing and personal care across ${area.region}.` },
      { title: "Funding types", text: "NDIS, DVA Community Nursing, aged care funding, or private." },
      { title: "Enquiries", text: "Contact us to discuss your enquiry or referral." },
    ],
    image: CONVERSATION,
    imageBand: { after: `How we help families in ${area.region}`, ...BAND },
    sections: [
      {
        heading: `In-home nursing facts for ${area.region}`,
        lead: `Citable local details for families, NDIS support coordinators, DVA referrers, GPs, and discharge planners arranging care in ${area.region}.`,
        blocks: [
          {
            type: "p",
            text: `Reference information: [Gentle Care Nursing Services service-area information](${INTEGRATIONS.siteUrl}/areas/${area.slug}) · [Gentle Care Nursing Services intake information](${INTEGRATIONS.siteUrl}/contact) · [Gentle Care Nursing Services intake information](${INTEGRATIONS.siteUrl}/referral) · [Gentle Care Nursing Services referrer information](${INTEGRATIONS.siteUrl}/referrers). References provide general programme or service information, not provider-specific verification.`,
          },
        ],
        points: [
          {
            title: "Region covered",
            line: `Gentle Care Nursing Services provides in-home nursing and personal care across ${area.region}, including ${listed}${area.suburbs.length > 5 ? " and nearby suburbs" : ""}.`,
          },
          {
            title: "Funding types",
            line: "Care may be arranged through NDIS, DVA Community Nursing, aged care funding, or private fee-for-service depending on eligibility and needs.",
          },
          {
            title: "Enquiries",
            line: "Contact us to discuss your enquiry or referral. Urgent referrals are prioritised.",
          },
          {
            title: "Referrer support",
            line: "Gentle Care works with support coordinators, hospital discharge planners, GPs, families, and representatives across Sydney.",
          },
        ],
      },
      {
        heading: "Clinical Care Delivered Your Way",
        blocks: [{ type: "p", text: area.body }],
      },
      {
        heading: `How we help families in ${area.region}`,
        tiles: (area.examples ?? []).map((example, index) => ({
          icon: ICONS[index % ICONS.length],
          title: example,
        })),
      },
      {
        heading: `Communities We Serve in ${area.region}`,
        lead: "We work with support coordinators, discharge planners, and families across Sydney. Submit an enquiry to discuss your care needs.",
        blocks: [{ type: "p", text: communities }],
      },
      {
        heading: `Service guides for ${area.region}`,
        tiles: guides.map((page, index) => ({
          icon: ICONS[index % ICONS.length],
          title: page.service.shortTitle,
          links: [{ href: page.path, label: page.service.shortTitle }],
        })),
      },
      {
        heading: "How to get started",
        lead: "Contact us to discuss your needs and next steps.",
        process: {
          steps: [
            { title: "Send an enquiry", text: `Tell us you are arranging care in ${area.region}.` },
            { title: "Share the details", text: "Include the suburb, the care needed and any referral information." },
            { title: "We discuss next steps", text: "Urgent referrals are prioritised." },
          ],
          checklist: {
            title: "Helpful to have ready",
            items: [
              "The suburb where care is needed",
              "The type of support requested",
              "Who else is involved, if anyone",
              "Any referral or funding information you already have",
            ],
          },
          primary: { href: CTA_LINKS.requestCare.href, label: CTA_LINKS.requestCare.label },
          secondary: { href: SITE.phoneHref, label: SITE.phone },
        },
      },
      {
        heading: `Ready to discuss care in ${area.region}?`,
        blocks: [
          {
            type: "p",
            text: "Our clinical lead, Gemma, is available to discuss your specific requirements and ensure a seamless start to personalised support.",
          },
        ],
      },
    ],
    closingActions: [
      { href: CTA_LINKS.requestCare.href, label: CTA_LINKS.requestCare.label },
      { href: SITE.phoneHref, label: `Call ${SITE.phone}` },
      { href: CTA_LINKS.contact.href, label: "Contact Clinical Lead" },
    ],
  };
}
