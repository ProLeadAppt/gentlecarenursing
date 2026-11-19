/**
 * Unique suburb landing pages for the 19 November 2026 local SEO drafts.
 *
 * These are not entries in SUBURBS. The existing fifteen suburb routes stay
 * on the shared template. North Strathfield and Concord West are individually
 * written pages at /suburbs/[slug].
 *
 * Compared with the 12 November locality-review drafts (PR 79,
 * /locality-review, noindex, deploy-preview only). Those drafts are cautious
 * intake notes and explicitly do not offer SIL. The 19 November drafts are
 * the stronger public version: local census detail, verified NDIS registration
 * groups, a SIL explanation tied to the public register, and a DVA-led
 * Concord West page. This file follows the 19 November copy.
 *
 * Every [CONFIRM WITH CLIENT] claim is omitted. Do not render the strings in
 * OMITTED_CLIENT_CONFIRMATIONS. Inline TODO(client-confirm) comments mark the
 * spot each item would return to after Gemma confirms it.
 */

import { SITE } from "@/lib/constants";

const phone = `[${SITE.phone}](${SITE.phoneHref})`;

export interface LandingBlock {
  type: "p" | "ul" | "ol";
  text?: string;
  items?: readonly string[];
}

export interface LandingSubsection {
  heading: string;
  blocks: readonly LandingBlock[];
}

export interface LandingDisclosure {
  summary: string;
  /** Full approved copy. Rendered inside a disclosure so it stays in the DOM. */
  text: string;
}

export interface LandingPoint {
  title: string;
  line: string;
  detailSummary?: string;
  detail?: string;
}

export type LandingIcon =
  | "nursing"
  | "complex"
  | "community"
  | "home"
  | "wound"
  | "medication"
  | "continence"
  | "monitoring"
  | "personal"
  | "palliative";

export interface LandingTile {
  icon: LandingIcon;
  title: string;
  line?: string;
  links?: readonly { href: string; label: string }[];
  detailSummary?: string;
  detail?: string;
}

export interface LandingStep {
  title: string;
  text: string;
  detailSummary?: string;
  detail?: string;
}

export interface LandingChecklist {
  title: string;
  items: readonly string[];
  detailSummary?: string;
  detail?: string;
}

export interface LandingProcess {
  steps: readonly LandingStep[];
  checklist?: LandingChecklist;
  primary: LandingAction;
  secondary: LandingAction;
  note?: string;
  /** Exact approved paragraphs, kept in a disclosure. */
  detail?: LandingDisclosure;
}

export interface LandingStat {
  value: string;
  label: string;
}

export interface LandingSection {
  heading: string;
  /** One short sentence shown under the heading. */
  lead?: string;
  blocks?: readonly LandingBlock[];
  subsections?: readonly LandingSubsection[];
  points?: readonly LandingPoint[];
  tiles?: readonly LandingTile[];
  process?: LandingProcess;
  stats?: readonly LandingStat[];
  statSource?: string;
  disclosures?: readonly LandingDisclosure[];
  faqs?: readonly { question: string; answer: string }[];
}

export interface LandingAction {
  href: string;
  label: string;
}

export interface LandingImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface LandingTrust {
  title: string;
  text: string;
}

export interface LandingImageBand {
  /** Insert the photograph after the section with this heading. */
  after: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface SuburbLandingPageData {
  slug: string;
  name: string;
  postcode: string;
  lga: string;
  region: string;
  regionHref: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  serviceName: string;
  serviceType: string;
  serviceDescription: string;
  intro: readonly string[];
  /** Longer hero copy, collapsed. The full approved paragraph stays in the DOM. */
  introDetail?: LandingDisclosure;
  heroActions: readonly LandingAction[];
  /** Scannable recognition strip. Wording is already in the page copy. */
  trust: readonly LandingTrust[];
  /** Existing site photograph. No new or stock imagery. */
  image: LandingImage;
  /** A second existing site photograph, used as a full-width band. */
  imageBand?: LandingImageBand;
  sections: readonly LandingSection[];
  closingActions: readonly LandingAction[];
}

/**
 * Claims left out of the rendered pages. Listed for the preview pull request
 * so they can be added after Gemma confirms them.
 */
export const OMITTED_CLIENT_CONFIRMATIONS = [
  "Whether clients or families can visit Level 1/5 George St, North Strathfield by appointment, and any access or parking details.",
  "The clinical lead's name and AHPRA registration. The pages keep the wording already published on the site: clinical care is delivered or supervised by AHPRA-registered nurses.",
  "Approximate team size or current capacity for new North Strathfield participants. The smaller-caseload sentence already used on the site is kept, without a number.",
  "Public liability and professional indemnity insurance, including insurer and cover level.",
  "That all workers hold a current NDIS Worker Screening Check.",
  "Years operating. The ABN has been active since 24 June 2019, and that date is not published as a service start date.",
  "Which languages staff speak, including the MyCareSpace list (Fijian, Nepalese, Tagalog and Thai) and locally relevant languages named in the draft.",
  "Whether Gentle Care currently delivers SIL, in which kinds of homes, whether it can take new SIL participants near North Strathfield, and whether it works from a participant's existing SDA home. No vacancies or addresses are published. The verified registration group and the public explanation of SIL are kept.",
  "Whether Gentle Care charges at the NDIS price limits or below them. The pages say rates are explained before services start.",
  "Homebush and Rhodes as active service areas. They are not named as places we support and are not linked, because those suburb pages do not exist. Rhodes remains only as the next station after Concord West.",
  "Confirmation that Concord West (2138) is an active service area. It is not added to the shared Inner West suburb list that also feeds the homepage and service-region pages. The dedicated page is the preview.",
  "The preferred secure channel for clinical referrals (secure email, fax or portal).",
  "Staffing mix of registered nurses, enrolled nurses and personal care workers on the Concord West page.",
  "Google review rating or review count.",
  "Gentle Care's Support at Home status (registered provider, or delivering through other providers). The page links to the existing aged care page without a new status claim.",
  "Whether Gentle Care covers Rhodes. The Concord West FAQ names Concord, North Strathfield and the wider Inner West only.",
] as const;

export const SUBURB_LANDING_PAGES: readonly SuburbLandingPageData[] = [
  {
    slug: "north-strathfield",
    name: "North Strathfield",
    postcode: "2137",
    lga: "City of Canada Bay",
    region: "Inner West",
    regionHref: "/areas/inner-west",
    seoTitle: "NDIS Nursing & SIL Support North Strathfield | Gentle Care",
    metaDescription:
      "Registered NDIS provider based in North Strathfield. In-home nursing, personal care and SIL support. Call 1300 004 267 to talk through your plan.",
    h1: "NDIS Nursing, SIL and In-Home Support in North Strathfield",
    serviceName: "NDIS nursing, SIL and in-home support in North Strathfield",
    serviceType: "NDIS nursing and Supported Independent Living",
    serviceDescription:
      "Registered NDIS provider based in North Strathfield. In-home nursing, personal care and SIL support for participants, families and support coordinators.",
    intro: [
      "Gentle Care is a registered NDIS provider with an office at Level 1/5 George St, North Strathfield.",
      // TODO(client-confirm): office visits by appointment, access and parking at Level 1/5 George St. Omitted. No walk-in claim.
      "Because our office is here, North Strathfield isn't a suburb we travel out to. It's where our team is based. There's no obligation.",
    ],
    introDetail: {
      summary: "Supports from this office",
      text: `Gentle Care Nursing Services is a registered NDIS provider with an office at Level 1/5 George St, North Strathfield, in the Bakehouse Quarter precinct. We support NDIS participants, families and support coordinators with in-home nursing, high-intensity personal care, community participation and Supported Independent Living (SIL), along with DVA Community Nursing for eligible veterans.\n\nCall ${phone} or [Request Care](/referral) to talk through the participant's plan, goals and preferred times. There's no obligation.`,
    },
    heroActions: [
      { href: SITE.phoneHref, label: `Call ${SITE.phone}` },
      { href: "/referral", label: "Request Care" },
    ],
    trust: [
      { title: "Registered NDIS provider", text: "Approved registration, with a North Strathfield head office." },
      { title: "DVA-contracted", text: "Listed on the NSW Panel of Community Nursing providers." },
      { title: "Nursing-led", text: "Clinical care is delivered or supervised by AHPRA-registered nurses." },
    ],
    image: {
      src: "/images/homepage-hands-chris-f-33525563.jpg",
      alt: "Two people holding hands.",
      width: 1000,
      height: 667,
    },
    imageBand: {
      after: "Planning care around North Strathfield",
      src: "/images/hero-hands.webp",
      alt: "A younger hand resting over an older person's hand.",
      width: 1024,
      height: 283,
    },
    sections: [
      {
        heading: "Why North Strathfield families and coordinators contact Gentle Care",
        lead: "A local team for NDIS participants, and for veterans in the same household.",
        // TODO(client-confirm): clinical lead name and AHPRA registration. Nursing-led keeps the wording already published on the site.
        // TODO(client-confirm): team size or current capacity for new North Strathfield participants. No number is published.
        // TODO(client-confirm): public liability and professional indemnity insurance, and NDIS Worker Screening Checks. Whole point omitted.
        // TODO(client-confirm): years operating. ABN active from 24 June 2019 is not published as a start date. Whole point omitted.
        points: [
          {
            title: "Registered NDIS provider",
            line: "Head office in North Strathfield, on the public register.",
            detailSummary: "NDIS register",
            detail:
              "Gentle Care Nursing Services Pty Ltd appears on the NDIS Quality and Safeguards Commission provider register with an approved registration and a North Strathfield head office. You can check it on the [NDIS Commission provider register](https://www.ndiscommission.gov.au/provider-registration/gentle-care-nursing-services-pty-ltd).",
          },
          {
            title: "Registered for higher-needs supports",
            line: "Nursing, high-intensity care, SIL and community access.",
            detailSummary: "Registration groups",
            detail:
              "Our approved registration groups include Community Nursing Care, Assist Personal Activities High, Supported Independent Living, Daily Tasks/Shared Living, Participate Community and Development-Life Skills.",
          },
          {
            title: "Nursing-led",
            line: "Registered nurses lead the clinical care.",
          },
          {
            title: "Also DVA-contracted",
            line: "One team for a participant and a veteran.",
            detailSummary: "DVA panel",
            detail:
              "Gentle Care is listed on the Department of Veterans' Affairs Panel of Community Nursing providers for NSW, so households with both an NDIS participant and a veteran can deal with one team.",
          },
          {
            title: "Local and small by design",
            line: "Smaller caseloads, so people see consistent faces.",
          },
        ],
      },
      {
        heading: "NDIS supports we can discuss for North Strathfield participants",
        lead: "Nursing, personal care, community access and SIL.",
        // TODO(client-confirm): whether Gentle Care currently delivers SIL, in which homes, new participants near North Strathfield, or support in an existing SDA home. No vacancies or addresses.
        tiles: [
          {
            icon: "nursing",
            title: "In-home community nursing",
            line: "Skilled nursing at home, where the plan funds it.",
            detailSummary: "Nursing at home",
            detail:
              "Skilled nursing at home, such as medication management, wound care, continence and catheter care, and health monitoring, delivered under the participant's plan where nursing is funded. If you're not sure your plan covers nursing, your support coordinator or plan manager can check which line items apply.",
          },
          {
            icon: "complex",
            title: "High-intensity daily personal activities",
            line: "Nurse-led support where personal care is complex.",
            links: [{ href: "/services/complex-care", label: "Complex Care Support" }],
            detailSummary: "Complex care",
            detail:
              "Support with personal care where a participant has complex needs, for example PEG feeding, catheter management or tracheostomy care, delivered or supervised by nurses. See [Complex Care Support](/services/complex-care).",
          },
          {
            icon: "community",
            title: "Personal care, daily living and community participation",
            line: "Help at home, and support to get out locally.",
            links: [
              { href: "/services/personal-care", label: "Personal Care" },
              { href: "/services/community-participation", label: "Community Participation" },
            ],
            detailSummary: "Around the suburb",
            detail:
              "Help with showering, dressing, meals and routines at home, plus support to get out and about locally. That might be a walk along Powells Creek, a coffee in the Bakehouse Quarter or a trip on the train from North Strathfield station. See [Personal Care](/services/personal-care) and [Community Participation](/services/community-participation).",
          },
          {
            icon: "home",
            title: "Supported Independent Living (SIL)",
            line: "Round-the-clock support in a shared home, not the rent.",
            detailSummary: "SIL and registration",
            detail:
              "SIL is NDIS funding for a support worker to help or supervise a participant 24 hours a day, 7 days a week, usually in a shared home. It covers the support itself, not rent or groceries. SIL is different from Specialist Disability Accommodation (SDA): SDA is the housing, and SIL is the support inside it.\n\nFrom 1 October 2026, SIL can only be delivered by providers that are registered with the NDIS Commission or applied to register before that date ([NDIS: mandatory registration for SIL providers](https://www.ndis.gov.au/news/11561-mandatory-registration-supported-independent-living-sil-and-ndis-digital-platform-providers)). Gentle Care's registration includes the Supported Independent Living group.\n\nContact us to discuss whether we can support a particular participant or home.",
          },
        ],
      },
      {
        heading: "Planning care around North Strathfield",
        // TODO(client-confirm): staff languages. Census figures are ABS data, not a list of languages the team speaks.
        blocks: [
          {
            type: "p",
            text: "A younger, multicultural suburb. Many participants live with parents, siblings or extended family.",
          },
          {
            type: "p",
            text: "*We mention hospitals for local context only. This doesn't mean Gentle Care has a partnership or referral arrangement with them.*",
          },
        ],
        stats: [
          { value: "4,618", label: "residents" },
          { value: "34", label: "median age" },
          { value: "65.7%", label: "both parents born overseas" },
        ],
        statSource: "[ABS QuickStats, North Strathfield](https://abs.gov.au/census/find-census-data/quickstats/2021/SAL13019)",
        disclosures: [
          {
            summary: "Census and hospitals",
            text: "North Strathfield is a younger, multicultural suburb. At the 2021 Census it had 4,618 residents with a median age of 34. About two in three residents (65.7%) had both parents born overseas, and the most common languages at home other than English were Mandarin (9.7%), Korean (7.0%), Cantonese (6.2%) and Nepali (3.1%) ([ABS QuickStats, North Strathfield](https://abs.gov.au/census/find-census-data/quickstats/2021/SAL13019)).\n\nIn practice, that means many of the NDIS participants we meet locally are younger adults living with parents, siblings or extended family. Care planning often involves several family members, and sometimes a preferred language.\n\nFor families visiting or travelling to appointments, North Strathfield station is on the T9 Northern Line, one stop from Strathfield and one from Concord West. Concord Hospital is a short drive away in Concord West, and Royal Prince Alfred Hospital is further east.\n\n*We mention hospitals for local context only. This doesn't mean Gentle Care has a partnership or referral arrangement with them.*",
          },
        ],
      },
      {
        heading: "How to get started",
        lead: "From the first call to support at home.",
        process: {
          steps: [
            {
              title: "Send an enquiry or referral",
              text: "Tell us the suburb, the support needed, how the plan is managed, and whether it's urgent.",
              detailSummary: "Plan management",
              detail: `Tell us the participant's suburb, the support needed, how their plan is managed (NDIA-managed, plan-managed or self-managed) and whether it's urgent. [Request Care](/referral) or call ${phone}.`,
            },
            {
              title: "Clinical review and care match",
              text: "We review the request, confirm the fit, and suggest a model, frequency and team.",
              detailSummary: "Full wording",
              detail: "Our team reviews the request, confirms whether we're the right fit and suggests a support model, frequency and team.",
            },
            {
              title: "Care starts at home",
              text: "We agree the plan, communication preferences and start date, then begin support with a clear routine.",
            },
          ],
          checklist: {
            title: "Helpful to have ready",
            items: [
              "The participant's NDIS plan, or the relevant goals and budgets",
              "Support coordinator and plan manager details",
              "Current supports",
              "Clinical information, such as a discharge summary or medication list",
              "For SIL, details of the home and current living arrangements",
            ],
            detailSummary: "Read the full note",
            detail:
              "Helpful to have ready: the participant's NDIS plan or the relevant goals and budgets, support coordinator and plan manager details, current supports and any clinical information (discharge summary, medication list). For SIL, also have details of the home and current living arrangements.",
          },
          primary: { href: "/referral", label: "Request Care" },
          secondary: { href: SITE.phoneHref, label: SITE.phone },
          note: "Support coordinators can go straight to [Referrals for coordinators and discharge planners](/referrers).",
        },
      },
      {
        heading: "Neighbouring suburbs we also support",
        blocks: [
          // TODO(client-confirm): Homebush and Rhodes as active service areas. Not named or linked. Concord West is linked because that page is part of this preview.
          {
            type: "p",
            text: "[Concord](/suburbs/concord) · [Concord West](/suburbs/concord-west) · [Strathfield](/suburbs/strathfield) · [Burwood](/suburbs/burwood) · [All Inner West suburbs](/areas/inner-west)",
          },
        ],
      },
      {
        heading: "Frequently asked questions",
        faqs: [
          {
            question: "Is Gentle Care a registered SIL provider?",
            answer:
              "Gentle Care Nursing Services Pty Ltd is a registered NDIS provider, and its approved registration groups on the NDIS Commission register include Supported Independent Living. Contact us to discuss whether we can support a particular participant or home.",
          },
          {
            question: "Do you work with plan-managed and self-managed participants?",
            answer:
              "Yes. We work with NDIA-managed, plan-managed and self-managed participants. Your support coordinator or plan manager can confirm which parts of your plan apply.",
          },
          {
            question: "What will NDIS supports cost?",
            // TODO(client-confirm): whether Gentle Care charges at the NDIS price limits or below them.
            answer:
              "For NDIA-managed and plan-managed participants, providers can't charge more than the maximum prices in the current NDIS pricing schedule. We'll explain the support items and rates before services start.",
          },
          {
            question: "Can you start quickly after a hospital discharge?",
            answer: `Urgent referrals are prioritised, but start dates depend on the care needed, staffing and the referral information we receive. Call ${phone} to discuss the situation.`,
          },
          {
            question: "Do you also support veterans in North Strathfield?",
            answer:
              "Yes. Gentle Care is a DVA-contracted Community Nursing provider. Eligible Veteran Card holders need a written referral from a GP, hospital or nurse practitioner. See [DVA Community Nursing](/dva).",
          },
        ],
      },
      {
        heading: "Talk to our North Strathfield team",
        blocks: [
          {
            type: "p",
            text: "Whether you're a participant, a family member or a support coordinator, a short conversation is the easiest way to work out what's possible.",
          },
        ],
      },
    ],
    closingActions: [
      { href: SITE.phoneHref, label: `Call ${SITE.phone}` },
      { href: "/referral", label: "Request Care" },
      { href: "/referrers", label: "Make a referral" },
    ],
  },
  {
    slug: "concord-west",
    name: "Concord West",
    postcode: "2138",
    lga: "City of Canada Bay",
    region: "Inner West",
    regionHref: "/areas/inner-west",
    seoTitle: "DVA Community Nursing Concord West | Gentle Care",
    metaDescription:
      "DVA-contracted community nursing in Concord West, near Concord Hospital. Wound care, medication help and personal care at home. Call 1300 004 267.",
    h1: "DVA Community Nursing in Concord West",
    serviceName: "DVA Community Nursing in Concord West",
    serviceType: "DVA Community Nursing",
    serviceDescription:
      "DVA-contracted community nursing in Concord West for eligible veterans, war widows and widowers. Wound care, medication help and personal care at home.",
    intro: [
      "DVA-funded nursing and personal care at home for eligible veterans, war widows and widowers.",
      // TODO(client-confirm): Concord West (2138) as a confirmed active service area. The page is the preview; it is not added to the shared Inner West suburb list.
      "For eligible clients, DVA-funded care has no out-of-pocket cost.",
    ],
    introDetail: {
      summary: "Panel listing and office",
      text: `Gentle Care Nursing Services provides DVA-funded community nursing and personal care at home for eligible veterans, war widows and widowers in Concord West. We're listed on the Department of Veterans' Affairs Panel of Community Nursing providers for NSW, and our office is a few minutes away in North Strathfield.\n\nCall ${phone} or [send a referral](/referral). For eligible clients, DVA-funded care has no out-of-pocket cost.`,
    },
    heroActions: [
      { href: SITE.phoneHref, label: `Call ${SITE.phone}` },
      { href: "/referral", label: "Send a referral" },
    ],
    trust: [
      { title: "DVA-contracted", text: "Listed on the NSW Panel of Community Nursing providers." },
      { title: "No out-of-pocket cost", text: "Eligible clients have no out-of-pocket cost for approved care." },
      { title: "Nursing-led", text: "Clinical care is delivered or supervised by AHPRA-registered nurses." },
    ],
    image: {
      src: "/images/homepage-care-conversation-v4.webp",
      alt: "A woman in burgundy scrubs and an older woman talking together on a sofa.",
      width: 1536,
      height: 1024,
    },
    imageBand: {
      after: "How a referral works",
      src: "/images/hero-hands.webp",
      alt: "A younger hand resting over an older person's hand.",
      width: 1024,
      height: 283,
    },
    sections: [
      {
        heading: "A suburb with deep ties to Australia's veterans",
        blocks: [
          {
            type: "p",
            text: "Concord West's link with veterans goes back more than 80 years.",
          },
          {
            type: "p",
            text: "Concord Hospital opened in November 1940 and now houses the National Centre for Veterans' Healthcare.",
          },
          {
            type: "p",
            text: "When it's time to come home, DVA Community Nursing can bridge that gap.",
          },
          {
            type: "p",
            text: "*We mention Concord Hospital and the National Centre for Veterans' Healthcare for local context only. Gentle Care has no partnership or referral arrangement with either.*",
          },
        ],
        disclosures: [
          {
            summary: "Hospital and Kokoda walkway",
            text: "Concord West's link with veterans goes back more than 80 years. Concord Hospital opened in November 1940 as the 113th Australian General Hospital and joined the NSW health system in 1990. Since 2022, the hospital's Rusty Priest Building has housed Australia's first National Centre for Veterans' Healthcare, which provides multidisciplinary outpatient care for current and ex-serving ADF members ([Sydney Local Health District](https://slhd.health.nsw.gov.au/ncvh/about)).\n\nAcross Hospital Road, the Kokoda Track Memorial Walkway runs about 800 metres along Brays Bay between the hospital and Rhodes station, with 22 information stations and a memorial rose garden ([NSW Government](https://www.nsw.gov.au/visiting-and-exploring-nsw/locations-and-attractions/kokoda-track-memorial-walkway)).\n\nFor many local veterans and their families, care starts or continues at Concord. When it's time to come home, DVA Community Nursing can help bridge the gap between hospital and everyday life.",
          },
        ],
      },
      {
        heading: "Who can receive DVA Community Nursing",
        lead: "An assessed clinical need, and one of these cards.",
        points: [
          {
            title: "Veteran Card – All Conditions (Gold Card)",
            line: "For an assessed clinical need for nursing and/or personal care.",
          },
          {
            title: "Veteran Card – Specific Conditions (White Card)",
            line: "The care must be for an accepted service-related condition, a DVA-accepted mental health condition, or treatment covered under Non-Liability Health Care or Provisional Access to Medical Treatment.",
          },
        ],
        blocks: [
          {
            type: "p",
            text: "For a White Card, we confirm eligibility with DVA before services start.",
          },
        ],
        disclosures: [
          {
            summary: "DVA eligibility",
            text: "According to DVA, you may be able to receive community nursing at home if you have an assessed clinical need for nursing and/or personal care and you hold one of these cards. For White Card holders, the provider must confirm eligibility with DVA before services start. We handle that step. ([DVA: Community Nursing](https://www.dva.gov.au/what-we-help-with/care-at-home-and-aged-care-services/living-independently/dva-in-home-programs/community-nursing))",
          },
        ],
      },
      {
        heading: "How a referral works",
        lead: "A written referral, sent directly to Gentle Care.",
        // TODO(client-confirm): preferred secure referral channel (secure email, fax or portal). Not named.
        process: {
          steps: [
            {
              title: "Send a written referral",
              text: "A GP, hospital doctor, discharge planner or nurse practitioner can send it.",
            },
            {
              title: "Check how long it lasts",
              text: "GP referrals last 12 months. Hospital referrals last 6 weeks.",
            },
            {
              title: "Know when to renew",
              text: "Needed again after 28 days out of care, or to change provider.",
            },
          ],
          checklist: {
            title: "Helpful to have ready",
            items: [
              "DVA's D9389 Community Nursing Referral form",
              "A letter on the referrer's own letterhead",
              "Or our referral form",
            ],
          },
          primary: { href: "/referral", label: "Request Care" },
          secondary: { href: SITE.phoneHref, label: SITE.phone },
          note: "Discharge planners and GPs can use our [referral page](/referral) or see [information for referrers](/referrers).",
          detail: {
            summary: "Referral rules",
            text: "DVA Community Nursing needs a written referral, sent directly to a DVA-contracted provider such as Gentle Care. Referrals can come from your GP, a treating doctor in hospital, a hospital discharge planner, or a nurse practitioner.\n\nHow long a referral lasts: GP referrals are valid for 12 months. Referrals from hospitals and nurse practitioners are valid for 6 weeks, after which a GP referral is needed. You'll also need a new referral if you've been out of care for more than 28 days or want to change providers. Referrers can use DVA's D9389 Community Nursing Referral form, their own letterhead, or our referral form.\n\nDischarge planners and GPs: use our [referral page](/referral) or see [information for referrers](/referrers).",
          },
        },
      },
      {
        heading: "What care at home can include",
        lead: "Only what the assessed clinical need covers.",
        tiles: [
          {
            icon: "wound",
            title: "Wound care",
            line: "Assessment and ongoing dressings.",
          },
          {
            icon: "medication",
            title: "Medication help",
            line: "Administration, and liaison with the treating GP and pharmacist.",
          },
          {
            icon: "continence",
            title: "Continence and catheter care",
          },
          {
            icon: "monitoring",
            title: "Monitoring of chronic conditions",
            line: "Such as diabetes, COPD and heart disease.",
          },
          {
            icon: "personal",
            title: "Personal care",
            line: "Showering, dressing and grooming, where it's part of the approved care.",
          },
          {
            icon: "palliative",
            title: "Palliative care support",
            line: "At home, alongside the treating team.",
            links: [{ href: "/services/palliative-care", label: "Palliative Care" }],
          },
        ],
        blocks: [
          {
            type: "p",
            text: "Coming home from Concord Hospital or another hospital? See [post-hospital care at home](/services/post-hospital-care).",
          },
        ],
      },
      {
        heading: "Concord West at a glance",
        // TODO(client-confirm): staff languages, particularly Italian, Mandarin, Cantonese, Korean or Greek. Census figures are ABS data.
        stats: [
          { value: "6,178", label: "residents" },
          { value: "42", label: "median age" },
          { value: "18.7%", label: "aged 65 or over" },
        ],
        statSource: "[ABS QuickStats, Concord West](https://www.abs.gov.au/census/find-census-data/quickstats/2021/SAL11000)",
        blocks: [
          {
            type: "p",
            text: "Many local families are arranging care for a parent.",
          },
        ],
        disclosures: [
          {
            summary: "Census detail",
            text: "At the 2021 Census, Concord West had 6,178 residents with a median age of 42. Nearly one in five residents (18.7%) were aged 65 or over, compared with 17.7% across NSW. After English, the most common languages at home were Italian (6.6%), Mandarin (6.5%), Cantonese (4.1%), Korean (3.2%) and Greek (2.6%) ([ABS QuickStats, Concord West](https://www.abs.gov.au/census/find-census-data/quickstats/2021/SAL11000)).\n\nWith a larger-than-average share of older residents, many local families are arranging care for a parent. We plan visits around the household's routine and keep family members up to date.\n\nConcord West station is on the T9 Northern Line, between North Strathfield and Rhodes, which makes it easy for family to visit.",
          },
        ],
      },
      {
        heading: "Why veterans and families choose Gentle Care",
        lead: "Contracted with DVA, based a few minutes away.",
        // TODO(client-confirm): staffing mix of registered nurses, enrolled nurses and personal care workers. Kept the AHPRA wording already published on the site.
        // TODO(client-confirm): insurance held, years operating, and Google review rating or count. Whole point omitted.
        points: [
          {
            title: "DVA-contracted Community Nursing provider",
            line: "On the NSW community nursing panel.",
            detailSummary: "Service areas",
            detail:
              "Gentle Care is listed on DVA's Panel of Community Nursing providers for NSW, which covers the Canada Bay and Strathfield service delivery areas among others ([DVA panel list](https://www.dva.gov.au/providers/community-nursing-services-and-providers/panel-of-community-nursing-providers)).",
          },
          {
            title: "Claims handled directly with DVA",
            line: "We claim directly from DVA.",
          },
          {
            title: "AHPRA-registered nurses",
            line: "Registered nurses lead the clinical care.",
          },
          {
            title: "Local base in North Strathfield",
            line: "A few minutes from Concord West.",
          },
          {
            title: "Smaller caseloads",
            line: "Familiar faces, and clear updates for families.",
          },
        ],
      },
      {
        heading: "Not eligible for DVA-funded care?",
        lead: "No Veteran Card, or the care isn't covered? Other options may still apply.",
        // TODO(client-confirm): Support at Home provider status. Link only; no new claim that Gentle Care is a registered Support at Home provider.
        points: [
          {
            title: "Support at Home",
            line: "Government-funded aged care at home. See [Aged care at home](/aged-care).",
          },
          {
            title: "NDIS",
            line: "For eligible people under 65 when they apply. See [NDIS services](/ndis).",
          },
          {
            title: "Private nursing",
            line: "See [Private nursing at home](/private-nursing).",
          },
        ],
      },
      {
        heading: "Frequently asked questions",
        faqs: [
          {
            question: "Do I need a Gold Card for DVA Community Nursing?",
            answer:
              "Not always. Gold Card (Veteran Card – All Conditions) holders may be eligible for clinically required care. White Card (Veteran Card – Specific Conditions) holders may be eligible for care related to accepted conditions or covered treatment. We confirm eligibility with DVA before services start.",
          },
          {
            question: "Is there a cost?",
            answer:
              "If you're eligible, there's no out-of-pocket cost for DVA-approved community nursing delivered by a DVA-contracted provider. We claim directly from DVA.",
          },
          {
            question: "Can a Concord Hospital discharge planner refer directly to Gentle Care?",
            answer:
              "Any hospital treating doctor or discharge planner can send a written referral to a DVA-contracted provider of the patient's choice. Hospital referrals are valid for 6 weeks, after which a GP referral is needed.",
          },
          {
            question: "Do you cover Concord and North Strathfield too?",
            // TODO(client-confirm): Rhodes coverage. Rhodes is not named as a service area in this answer.
            answer: `We support Concord and North Strathfield, and the wider Inner West. Call ${phone} to check your street.`,
          },
          {
            question: "What if care needs change?",
            answer:
              "Tell us or your GP. The referral and care plan can be reviewed, and DVA-funded care is based on assessed clinical need.",
          },
        ],
      },
      {
        heading: "Arrange DVA Community Nursing in Concord West",
      },
    ],
    closingActions: [
      { href: SITE.phoneHref, label: `Call ${SITE.phone}` },
      { href: "/referral", label: "Send a referral" },
      { href: "/referrers", label: "Information for referrers" },
    ],
  },
];

export function getSuburbLandingPage(slug: string): SuburbLandingPageData {
  const page = SUBURB_LANDING_PAGES.find((entry) => entry.slug === slug);
  if (!page) {
    throw new Error(`Missing suburb landing page: ${slug}`);
  }
  return page;
}
