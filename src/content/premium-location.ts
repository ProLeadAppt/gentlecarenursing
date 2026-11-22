/**
 * Existing location copy, arranged in the approved suburb layout.
 * Sentences stay as published. Nothing new is claimed.
 */
import { INTEGRATIONS } from "@/config/integrations";
import { CTA_LINKS, SITE } from "@/lib/constants";
import type { AreaContent } from "@/content/areas-content";
import { SERVICES, SERVICE_REGION_PAGES, servicePhrase, type ServiceRegionPageData, type ServiceSlug } from "@/content/service-regions";
import { SUBURB_LANDING_PAGES, type LandingDisclosure, type LandingIcon, type LandingTile, type SuburbLandingPageData } from "@/content/suburb-landing-pages";
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

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Keep the first sentence visible. Every later sentence stays in the DOM,
 * inside the styled disclosure. Wording is not rewritten.
 */
function foldCopy(text: string, summary: string): { lead: string; disclosure?: LandingDisclosure } {
  const sentences = text.split(/(?<=[.!?])\s+/).map((sentence) => sentence.trim()).filter(Boolean);
  if (sentences.length < 2 || wordCount(text) <= 50) return { lead: text };
  const rest = sentences.slice(1).join(" ");
  return rest ? { lead: sentences[0], disclosure: { summary, text: rest } } : { lead: text };
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
  const listed = area.suburbs.slice(0, 5).join(", ");
  const guides = SERVICE_REGION_PAGES.filter((page) => page.regionSlug === area.slug);
  const clinical = foldCopy(area.body, "How care is arranged");
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
        sources: [
          { href: `${INTEGRATIONS.siteUrl}/areas/${area.slug}`, label: "Service-area information" },
          { href: `${INTEGRATIONS.siteUrl}/contact`, label: "Intake information" },
          { href: `${INTEGRATIONS.siteUrl}/referral`, label: "Referral information" },
          { href: `${INTEGRATIONS.siteUrl}/referrers`, label: "Referrer information" },
        ],
        sourceNote: "References provide general programme or service information, not provider-specific verification.",
      },
      {
        heading: "Clinical Care Delivered Your Way",
        blocks: [{ type: "p", text: clinical.lead }],
        disclosures: clinical.disclosure ? [clinical.disclosure] : undefined,
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
        places: names.map((name) => {
          const href = PAGE_BY_NAME.get(name);
          return href ? { name, href } : { name };
        }),
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

const REGISTRATION: Record<ServiceSlug, string> = {
  "ndis-services": "Registered NDIS provider, compliant with the NDIS Quality and Safeguards Commission.",
  "dva-community-nursing": "DVA Contracted Community Nursing Provider, delivering services under the DVA Community Nursing programme.",
  "in-home-nursing-care": "Clinical care delivered or supervised by AHPRA-registered nurses; registered NDIS provider and DVA Contracted Community Nursing Provider.",
  "personal-care-daily-living": "Registered NDIS provider; personal care delivered by experienced support workers.",
  "complex-care-support": "Complex care delivered or supervised by AHPRA-registered nurses; registered NDIS provider.",
};

const FUNDING: Record<ServiceSlug, string> = {
  "ndis-services": "Self-Managed, Plan-Managed and NDIA-Managed NDIS participants. Core Supports and Capacity Building line items where applicable.",
  "dva-community-nursing": "DVA Community Nursing programme — claims submitted directly to the Department of Veterans' Affairs; no out-of-pocket cost for clinically required, approved care.",
  "in-home-nursing-care": "NDIS, DVA Community Nursing, aged care (Support at Home, CHSP), and private fee-for-service.",
  "personal-care-daily-living": "NDIS Core Supports (Assistance with Daily Life), aged care packages, DVA where part of approved care, and private fee-for-service.",
  "complex-care-support": "NDIS (including high-intensity supports where applicable), DVA Community Nursing, aged care packages, and private fee-for-service.",
};

const SCOPE: Record<ServiceSlug, string> = {
  "ndis-services": "In-home nursing, personal care, complex care (PEG, tracheostomy, catheter), and community participation tailored to NDIS goals.",
  "dva-community-nursing": "Wound care, medication management, continence and catheter care, chronic disease monitoring, and personal care where part of approved care.",
  "in-home-nursing-care": "Wound care, medication management, chronic disease monitoring, complex care (PEG, tracheostomy, catheter), post-surgical and palliative support.",
  "personal-care-daily-living": "Showering, dressing, grooming, mobility support, meal preparation, and assistance with everyday routines.",
  "complex-care-support": "PEG feeding, tracheostomy care, catheter management, complex wound care, and high-intensity nursing supports at home.",
};

export function serviceRegionToLanding(data: ServiceRegionPageData): SuburbLandingPageData {
  const { service, region } = data;
  const phrase = servicePhrase(service.title);
  const related = service.related
    .map((slug) => SERVICES.find((item) => item.slug === slug))
    .filter((item): item is (typeof SERVICES)[number] => item != null);
  const hero = foldCopy(data.hero, "More about this service");
  const overview = foldCopy(data.serviceOverview, "Service overview");
  const local = foldCopy(data.regionalContext, "Local context");
  const funding = foldCopy(data.fundingAndAccess, "Funding and access");
  return {
    slug: `${data.serviceSlug}-${data.regionSlug}`,
    name: region.region,
    postcode: "",
    lga: region.region,
    region: `${region.region} · Sydney`,
    regionHref: service.parentHref,
    seoTitle: data.metaTitle,
    metaDescription: data.metaDescription,
    h1: data.h1,
    serviceName: service.title,
    serviceType: service.title,
    serviceDescription: data.metaDescription,
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: service.title, href: service.parentHref },
      { label: region.region },
    ],
    intro: hero.disclosure ? [`“${service.snippetAnswer}”`, hero.lead] : [`“${service.snippetAnswer}”`, data.hero],
    introDetail: hero.disclosure,
    heroActions: [
      { href: CTA_LINKS.requestCare.href, label: `Request Care in ${region.region}` },
      { href: SITE.phoneHref, label: `Call ${SITE.phone}` },
    ],
    trust: [
      { title: "Registration", text: REGISTRATION[service.slug] },
      { title: "Service area", text: `${region.region}, Sydney — including ${region.suburbs.join(", ")}.` },
      { title: "Enquiries", text: "Our team reviews enquiries during business hours, with urgent referrals prioritised." },
    ],
    image: HANDS,
    imageBand: { after: "What's included", ...BAND },
    sections: [
      {
        heading: `Quick facts: ${service.title} in ${region.region}`,
        lead: `Citable facts for families, ${service.slug === "ndis-services" ? "support coordinators, plan managers" : service.slug === "dva-community-nursing" ? "GPs and DVA contacts" : "GPs and discharge planners"} considering ${phrase} across ${region.region}.`,
        blocks: [{ type: "p", text: `What ${service.title} Looks Like in ${region.region}. ${overview.lead}` }],
        disclosures: overview.disclosure ? [overview.disclosure] : undefined,
      },
      {
        heading: "What's included",
        tiles: data.included.map((item, index) => ({
          icon: ICONS[index % ICONS.length],
          title: item,
        })),
      },
      {
        heading: `${region.region} Suburbs We Serve`,
        lead: region.positionLine,
        places: region.suburbs.map((name) => ({ name })),
        blocks: [
          { type: "p", text: "Registered NDIS provider and DVA Contracted Community Nursing Provider." },
          { type: "p", text: "Enquiries reviewed during business hours, with urgent referrals prioritised." },
        ],
      },
      {
        heading: `Why families and coordinators in ${region.region} choose us`,
        blocks: [{ type: "p", text: local.lead }],
        disclosures: local.disclosure ? [local.disclosure] : undefined,
      },
      {
        heading: `How to access ${phrase} in ${region.region}`,
        lead: "Funding & Access",
        blocks: [{ type: "p", text: funding.lead }],
        disclosures: funding.disclosure ? [funding.disclosure] : undefined,
        points: [
          { title: "Funding accepted", line: FUNDING[service.slug] },
          { title: "Scope of care", line: SCOPE[service.slug] },
          { title: "Office", line: "Based in North Strathfield — visit-routing planned around real travel distances and household preferences." },
        ],
      },
      {
        heading: "How to get started",
        lead: "The first conversation is free.",
        process: {
          steps: [
            { title: "Make contact", text: `Request care in ${region.region}, or call ${SITE.phone}.` },
            { title: "Tell us the situation", text: data.ctaDescription },
            { title: "We review the enquiry", text: "Our team reviews enquiries during business hours, with urgent referrals prioritised." },
          ],
          checklist: {
            title: "Helpful to have ready",
            items: [
              `The suburb in ${region.region}`,
              "What support is needed",
              "Who is already involved, if anyone",
              "Any referral or funding information you already have",
            ],
          },
          primary: { href: "/referral", label: "Free Initial Consultation" },
          secondary: { href: SITE.phoneHref, label: SITE.phone },
        },
      },
      {
        heading: `Common questions about ${phrase} in ${region.region}`,
        faqs: data.faqs.map((faq) => ({ question: faq.question, answer: faq.answer })),
      },
      {
        heading: "Related services and pages",
        lead: `Explore the rest of our care across ${region.region} and Sydney.`,
        blocks: [
          {
            type: "p",
            text: [
              `[${service.title} (overview)](${service.parentHref})`,
              `[In-home nursing in ${region.region}](/areas/${region.slug})`,
              ...related.map((item) => `[${item.shortTitle} in ${region.region}](/services/${item.slug}/${region.slug})`),
              "[About Gentle Care Nursing](/about)",
              "[Contact us](/contact)",
              "[View all FAQs](/faq)",
            ].join(" · "),
          },
        ],
      },
      {
        heading: data.ctaTitle,
        blocks: [
          { type: "p", text: data.ctaDescription },
          { type: "p", text: "No obligation. We'll review your message and get back to you. We're here to listen and help." },
        ],
      },
    ],
    closingActions: [
      { href: CTA_LINKS.requestCare.href, label: CTA_LINKS.requestCare.label },
      { href: SITE.phoneHref, label: `Call ${SITE.phone}` },
      { href: CTA_LINKS.contact.href, label: CTA_LINKS.contact.label },
    ],
  };
}
