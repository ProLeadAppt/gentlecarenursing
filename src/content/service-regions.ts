/**
 * Service × Region landing pages.
 *
 * Source of truth for the 30 combined pages at /services/[service]/[region].
 * Service slugs and region slugs are derived from gmb-services.ts and
 * areas-served.ts so URLs and schema stay aligned with the Google Business
 * Profile. Voice rules from CLAUDE.md and Gemma's pre-launch wording audit
 * are baked in here — do not introduce "boutique", "guarantee", or
 * "since [year]" language.
 */

import { AREAS_SERVED } from "./areas-served";

export type ServiceSlug =
  | "ndis-services"
  | "dva-community-nursing"
  | "in-home-nursing-care"
  | "personal-care-daily-living"
  | "complex-care-support";

export interface ServiceRegionFaq {
  id: string;
  question: string;
  answer: string;
}

export interface ServiceDefinition {
  slug: ServiceSlug;
  /** Display title used in H1 prefixes, breadcrumbs, schema. */
  title: string;
  /** Short label used in nav-style chips and related links. */
  shortTitle: string;
  /** One-line snippet answer for AEO. Plain text, no quotes. */
  snippetAnswer: string;
  /** Single sentence used in MedicalService schema description. */
  schemaDescription: string;
  /** Service overview paragraph (300-400 words). Region token: {region}. */
  serviceOverview: string;
  /** Funding & access paragraph (~200 words). */
  fundingAndAccess: string;
  /** What's included — short bullets. */
  included: readonly string[];
  /** Service-level FAQ entries. Region token: {region}. */
  faqs: readonly ServiceRegionFaq[];
  /** Existing parent page on the site to link to (for internal linking). */
  parentHref: string;
  /** Up to two related sibling service slugs to cross-link. */
  related: readonly ServiceSlug[];
}

export interface RegionDefinition {
  slug: string;
  /** Region label used in copy and schema (matches AREAS_SERVED.region). */
  region: string;
  /** Suburbs covered (mirrors AREAS_SERVED). */
  suburbs: readonly string[];
  /** One-line position used in meta descriptions. */
  positionLine: string;
  /** Regional context paragraph (~250 words). Service token: {service}. */
  regionalContext: string;
}

export interface ServiceRegionPageData {
  serviceSlug: ServiceSlug;
  regionSlug: string;
  service: ServiceDefinition;
  region: RegionDefinition;
  /** Path beginning with /services/ */
  path: string;
  /** Full meta title. */
  metaTitle: string;
  /** Full meta description (≤ 158 chars where possible). */
  metaDescription: string;
  /** H1. */
  h1: string;
  /** Hero paragraph (150-200 words). */
  hero: string;
  /** Service overview body (rendered with region tokens replaced). */
  serviceOverview: string;
  /** Regional context body (tokens replaced). */
  regionalContext: string;
  /** Funding paragraph (tokens replaced). */
  fundingAndAccess: string;
  /** Bullets of what is included. */
  included: readonly string[];
  /** 8 FAQs (service-specific, region-tokens replaced). */
  faqs: readonly ServiceRegionFaq[];
  /** CTA heading. */
  ctaTitle: string;
  /** CTA supporting line. */
  ctaDescription: string;
}

// ---------------------------------------------------------------------------
// Region definitions
// ---------------------------------------------------------------------------

function slugifyRegion(region: string): string {
  return region
    .toLowerCase()
    .replace(/\s*&\s*/g, " ")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

const REGION_OVERRIDES: Record<
  string,
  { positionLine: string; regionalContext: string }
> = {
  "Inner West": {
    positionLine:
      "Established Inner West communities including Strathfield, Burwood, Ashfield, Concord, Homebush and Croydon.",
    regionalContext:
      "The Inner West is one of Sydney's most established communities, with multigenerational families, a large multicultural population and growing demand for in-home support. Around Strathfield, Burwood, Ashfield, Concord, Homebush and Croydon, we work with older Australians ageing at home, NDIS participants of all ages, and families balancing work, school and caring responsibilities. Many households here look for a smaller provider that takes time to understand cultural preferences, language needs and family routines, rather than a rotating roster of agency staff. Our office is based locally in North Strathfield, which means our nursing and support team can travel quickly across the area, attend short-notice visits, and stay closely connected with local GPs, community health teams and discharge planners across hospitals serving the Inner West. Choosing {service} in the Inner West with Gentle Care means a familiar, relationship-based team that knows the streets, the buildings, the parking, and the cadence of family life across this part of Sydney.",
  },
  "Sydney CBD & East": {
    positionLine:
      "Sydney CBD and Eastern Suburbs including Surry Hills, Bondi, Randwick, Paddington and Woollahra.",
    regionalContext:
      "Sydney CBD and the Eastern Suburbs cover a busy, diverse stretch of the city, from apartments in Surry Hills and the CBD to family homes in Bondi, Randwick, Paddington and Woollahra. People here often juggle demanding work or business commitments alongside caring responsibilities, and value providers who are professional, discreet and easy to coordinate with. We support older residents wanting to remain in long-held apartments and homes, NDIS participants navigating busy inner-city environments, veterans accessing DVA Community Nursing, and families arranging post-hospital care after stays at major eastern Sydney hospitals. Our team is comfortable working in apartment buildings, complying with concierge access requirements, and coordinating with strata, building managers and family members who may live interstate or overseas. Choosing {service} in the CBD and Eastern Suburbs with Gentle Care means experienced care from a small team that respects privacy, communicates clearly with busy families, and understands the practicalities of delivering in-home support across this part of Sydney.",
  },
  "North Shore": {
    positionLine:
      "Lower and Upper North Shore including Chatswood, North Sydney, Lane Cove, Willoughby, Mosman and Neutral Bay.",
    regionalContext:
      "The North Shore is home to long-established families, professionals and a sizeable older population, many of whom plan to age in place in the homes and gardens they have lived in for decades. From Chatswood and North Sydney through Lane Cove, Willoughby, Mosman and Neutral Bay, families here typically expect a quality-focused, relationship-based provider, not a rotating roster of staff. We support older Australians on Support at Home and DVA, NDIS participants needing personalised clinical care, and families coordinating with private specialists across the North Shore's strong network of hospitals and clinics. Our team understands the practical realities of working in this part of Sydney, including parking constraints, multi-storey homes, and quietly liaising with cleaners, gardeners or other in-home professionals already involved with a household. Choosing {service} on the North Shore with Gentle Care means a small, consistent care team that takes the time to understand each person and quietly fits into the rhythm of life at home.",
  },
  "Western Sydney": {
    positionLine:
      "Western Sydney including Parramatta, Blacktown, Penrith, Liverpool, Bankstown and Auburn.",
    regionalContext:
      "Western Sydney is one of Australia's most diverse and fastest-growing regions, covering Parramatta, Blacktown, Penrith, Liverpool, Bankstown, Auburn and the surrounding suburbs. Families here come from many cultural and language backgrounds, and demand for in-home nursing, NDIS support and aged care continues to grow as the population ages. We support participants and patients with culturally sensitive care, work alongside multicultural support coordinators, and coordinate with the major hospitals across Western Sydney for discharge planning and complex care at home. Many of the families we hear from in this region tell us they have struggled to find a provider that genuinely listens, takes time to understand cultural and faith preferences, and follows through reliably on visits and communication. Choosing {service} in Western Sydney with Gentle Care means an experienced team that values relationships over volume, prioritises consistent staff matching where possible, and is committed to genuine cultural respect rather than a checklist approach.",
  },
  "South Sydney": {
    positionLine:
      "South Sydney including Hurstville, Kogarah, Sutherland, Cronulla, Rockdale and Mascot.",
    regionalContext:
      "South Sydney stretches from Mascot and Rockdale down through Hurstville and Kogarah to the Sutherland Shire and Cronulla, taking in established suburbs, coastal communities and growing apartment precincts. Families across this area include long-term residents ageing at home, NDIS participants needing reliable in-home support, veterans accessing DVA Community Nursing, and people returning from stays at major South Sydney hospitals. We work with local GPs, community health teams, hospital discharge planners and family members to set up clear, well-communicated care plans. Our nursing and support team is used to working across both apartment-style living closer to the city and free-standing homes further south, and is mindful of the travel and parking practicalities involved. Choosing {service} in South Sydney with Gentle Care means a small, relationship-based team that understands the area, follows through on commitments and treats each household with care and respect.",
  },
  "Northern Beaches": {
    positionLine:
      "Northern Beaches including Manly, Dee Why, Brookvale, Mona Vale, Narrabeen and Avalon.",
    regionalContext:
      "The Northern Beaches has a strong sense of community, with families that have lived in the area for generations alongside newer households drawn to the coastal lifestyle. From Manly and Dee Why through Brookvale, Mona Vale, Narrabeen and Avalon, we support older Australians choosing to age in place by the coast, NDIS participants of all ages, veterans accessing DVA Community Nursing, and families arranging post-hospital care after stays at Northern Beaches hospitals. Travel between suburbs takes planning, and many families value a provider who builds visit schedules around real-world driving times and personal preferences rather than a rigid roster. Choosing {service} on the Northern Beaches with Gentle Care means an experienced, relationship-based team that understands the lifestyle and pace of this part of Sydney, and that takes the time to fit care around family routines, weather and the shape of each household's week.",
  },
};

export const REGIONS: readonly RegionDefinition[] = AREAS_SERVED.map((area) => {
  const override = REGION_OVERRIDES[area.region];
  return {
    slug: slugifyRegion(area.region),
    region: area.region,
    suburbs: area.suburbs,
    positionLine: override?.positionLine ?? `Communities across ${area.region}.`,
    regionalContext:
      override?.regionalContext ??
      `We support {service} clients across ${area.region}, including ${area.suburbs.join(
        ", "
      )}.`,
  };
});

// ---------------------------------------------------------------------------
// Service definitions
// ---------------------------------------------------------------------------

const NDIS_SERVICE: ServiceDefinition = {
  slug: "ndis-services",
  title: "NDIS Services",
  shortTitle: "NDIS",
  snippetAnswer:
    "NDIS in-home nursing and support is clinical and personal care delivered at home for NDIS participants by a registered NDIS provider, including nursing, personal care, complex care and community participation.",
  schemaDescription:
    "Registered NDIS provider delivering in-home nursing, personal care and complex care for NDIS participants in {region}, Sydney.",
  serviceOverview:
    "Gentle Care Nursing is a registered NDIS provider delivering personalised in-home nursing and support to NDIS participants across {region}. We work with participants, families, plan managers and support coordinators to deliver care that is relationship-based, person-centred and experienced. Because we keep our caseload small, we can match participants with a consistent care team who learn routines, communication preferences and clinical needs over time, rather than rotating new staff into a household every visit. Our NDIS supports include in-home nursing from registered nurses (wound care, medication management, continence and catheter care, health monitoring), personal care for daily living tasks like showering, dressing and meals, complex care for participants with higher clinical needs, and community participation support to help people stay connected with their community and goals. Care is planned around each participant's NDIS plan, goals and stated preferences, and is delivered with respect for cultural background, family involvement and choice. We communicate clearly with support coordinators and plan managers about scheduling, progress and any clinical concerns, so plans run smoothly and reviews are well-supported. The result is quality-focused, consistent NDIS care in {region} that families and coordinators can rely on.",
  fundingAndAccess:
    "NDIS supports from Gentle Care can be accessed by Self-Managed, Plan-Managed and NDIA-Managed participants. You can refer yourself, or a support coordinator, plan manager, family member or healthcare professional can contact us on your behalf. Once we receive an enquiry, we aim to respond within 24 hours during business hours, with urgent referrals prioritised. The first conversation is free and focuses on understanding what you need, what your plan looks like and how we might help, with no pressure to commit. Where helpful, we can review your NDIS plan with you, discuss the line items that might apply and put a service agreement in place. We support participants in {region} across Core Supports (Assistance with Daily Life) and Capacity Building line items where appropriate. If you are in the middle of a plan review or new to the scheme, we can talk through how we typically work with coordinators so you know what to expect.",
  included: [
    "In-home nursing from registered nurses",
    "Personal care and assistance with daily living",
    "Complex care, including PEG feeding and tracheostomy support",
    "Community participation and social support",
    "Coordination with support coordinators and plan managers",
    "Family communication and clear visit notes",
  ],
  faqs: [
    {
      id: "ndis-services-{slug}",
      question: "What NDIS services does Gentle Care provide in {region}?",
      answer:
        "We provide in-home nursing from registered nurses, personal care and assistance with daily living, complex care for participants with higher clinical needs, and community participation support across {region}. Care is delivered by a small experienced team and tailored to each participant's NDIS plan and goals.",
    },
    {
      id: "ndis-funding-{slug}",
      question: "How do I access NDIS funding for nursing care?",
      answer:
        "If you are an existing NDIS participant, your plan's Core Supports or Capacity Building budget may include relevant line items. Your support coordinator or plan manager can confirm this. If you are new to the NDIS or applying, we can talk you through how providers like us typically work and what to discuss with the NDIA or your Local Area Coordinator.",
    },
    {
      id: "ndis-same-worker-{slug}",
      question: "Can I request the same support worker each visit in {region}?",
      answer:
        "Wherever possible, yes. Our small caseload model is designed around consistency, so we match participants with a regular care team who get to know your routines, preferences and clinical needs. Where leave or rostering means a change is required, we work to introduce someone you have met before.",
    },
    {
      id: "ndis-response-{slug}",
      question: "How quickly does Gentle Care respond to {region} NDIS enquiries?",
      answer:
        "We aim to respond to all NDIS enquiries within 24 hours during business hours. Urgent referrals (for example, a participant being discharged from hospital or a coordinator needing to set up support quickly) are prioritised, and we will be honest if we cannot start within your timeframe so you can keep moving.",
    },
    {
      id: "ndis-coordinators-{slug}",
      question: "Do you work with plan managers and support coordinators?",
      answer:
        "Yes. We work closely with support coordinators and plan managers across {region} and the wider Sydney area. We are happy to attend planning meetings where appropriate, share clear visit notes, and communicate proactively about scheduling, progress or clinical concerns so plans run smoothly between reviews.",
    },
    {
      id: "ndis-not-approved-{slug}",
      question: "What if I'm not approved for NDIS yet?",
      answer:
        "If you are still applying for the NDIS or waiting on a plan, we can talk through how we usually work and what services may be helpful once funding is in place. In the meantime, you can also access in-home nursing or personal care privately or through other funding streams such as DVA or Support at Home if you are eligible.",
    },
    {
      id: "ndis-complex-{slug}",
      question: "Can Gentle Care help with complex care needs in {region}?",
      answer:
        "Yes. Our nurses are experienced in complex care including PEG feeding, tracheostomy care, catheter management and complex wound care, delivered safely at home. We work alongside specialists, GPs and hospital teams to follow established care plans and escalate appropriately if anything changes.",
    },
    {
      id: "ndis-difference-{slug}",
      question: "What's the difference between Gentle Care and larger NDIS agencies?",
      answer:
        "Larger agencies often run high caseloads with rotating staff. We deliberately keep our caseload smaller so participants get more consistent, relationship-based care from an experienced team. Coordinators and families tell us this means stronger continuity, clearer communication and a calmer experience for the participant.",
    },
  ],
  parentHref: "/ndis",
  related: ["complex-care-support", "personal-care-daily-living"],
};

const DVA_SERVICE: ServiceDefinition = {
  slug: "dva-community-nursing",
  title: "DVA Community Nursing",
  shortTitle: "DVA Community Nursing",
  snippetAnswer:
    "DVA Community Nursing is in-home nursing and personal care for eligible Veteran Card holders, delivered by a DVA Contracted Community Nursing Provider and arranged through a referral from your GP or treating doctor.",
  schemaDescription:
    "DVA Contracted Community Nursing Provider delivering in-home nursing and personal care to eligible Veteran Card holders in {region}, Sydney.",
  serviceOverview:
    "Gentle Care Nursing is a DVA Contracted Community Nursing Provider, supporting eligible Veteran Card holders across {region} with clinically required nursing and personal care services at home. Our DVA Community Nursing service is delivered by registered nurses and experienced support staff, working from a referral by your GP or treating doctor and following the assessed care plan. Typical supports include wound care, medication management, continence and catheter care, ongoing health monitoring for chronic conditions, and personal care such as showering, dressing and grooming where this is part of approved care. We take time to understand each veteran's history, preferences and routines, and we work to keep the same small team involved in care wherever possible so visits feel familiar and respectful rather than transactional. Communication with families, GPs and hospital teams is a core part of how we work: we share clear notes, raise concerns early, and make sure everyone involved in a veteran's care is on the same page. Across {region}, we support veterans living independently at home, those returning from a hospital stay, and partners caring for a loved one who needs more clinical support than they can comfortably provide on their own.",
  fundingAndAccess:
    "DVA Community Nursing is accessed through a referral from a GP or treating doctor on the appropriate DVA referral form. For eligible Veteran Card holders, services are funded directly by the Department of Veterans' Affairs, and we manage claims with DVA on your behalf so there are no out-of-pocket costs for approved care. If you are not yet sure whether you or a loved one is eligible, contact us and we can talk through the typical pathway, or you can speak to DVA or your GP. Once a referral is received we aim to respond within 24 hours during business hours, with urgent post-hospital referrals prioritised. The first conversation is free and focuses on understanding the veteran's situation, the referral details and how care can be set up safely. We can also work alongside RSL welfare officers, advocates and family members where this helps the veteran feel more supported.",
  included: [
    "Wound care and complex wound management",
    "Medication management and clinical monitoring",
    "Continence and catheter care",
    "Personal care where part of approved care",
    "Coordination with GPs, hospitals and DVA",
    "Respectful, relationship-based care for veterans and families",
  ],
  faqs: [
    {
      id: "dva-eligibility-{slug}",
      question: "Am I eligible for DVA Community Nursing in {region}?",
      answer:
        "Eligible Veteran Card holders (Gold or, in some cases, White Card) may access DVA Community Nursing where care is clinically required and approved through a referral from your GP or treating doctor. If you are unsure, contact us or DVA and we can help you understand the typical pathway.",
    },
    {
      id: "dva-entitlements-{slug}",
      question: "How do I use my DVA entitlements for nursing care?",
      answer:
        "Your GP or treating doctor completes the relevant DVA Community Nursing referral, which sets out the care required. As a DVA Contracted Community Nursing Provider, Gentle Care can then arrange visits, deliver the assessed care and manage claiming directly with DVA so there is nothing for you to invoice or chase.",
    },
    {
      id: "dva-covered-{slug}",
      question: "What's covered under my DVA support?",
      answer:
        "DVA Community Nursing typically covers clinically required nursing care such as wound management, medication support, monitoring of chronic conditions, and personal care where it is part of approved care. The exact scope depends on your individual referral and assessment by DVA.",
    },
    {
      id: "dva-approval-{slug}",
      question: "Do I need approval from DVA first?",
      answer:
        "Yes. DVA Community Nursing requires a referral from your GP or treating doctor, and DVA needs to approve the care for funding to apply. We can support you to understand the steps and start preparing once the referral is in place.",
    },
    {
      id: "dva-rsl-{slug}",
      question: "Can Gentle Care help coordinate with the RSL or family?",
      answer:
        "Yes. We're happy to work alongside RSL welfare officers, advocates, family members and other services that already support a veteran in {region}. Clear, respectful communication is part of how we deliver DVA Community Nursing.",
    },
    {
      id: "dva-gap-{slug}",
      question: "Is there a gap between my DVA entitlement and costs?",
      answer:
        "For eligible Veteran Card holders, community nursing approved under your DVA referral is fully funded by DVA, with no out-of-pocket cost for the approved care. If additional services beyond the DVA referral are wanted, we can talk through private options separately so it's transparent.",
    },
    {
      id: "dva-start-{slug}",
      question: "How quickly can I start DVA-funded care in {region}?",
      answer:
        "Once we have your referral and DVA approval, we aim to respond within 24 hours during business hours and start care as soon as our roster allows. Urgent post-hospital referrals are prioritised. We will always be honest about timing so you can plan accordingly.",
    },
    {
      id: "dva-applying-{slug}",
      question: "What if I'm applying for DVA status?",
      answer:
        "If a veteran is in the process of applying for DVA recognition, we can talk through how DVA Community Nursing typically works once eligibility is confirmed. In the meantime, in-home nursing and personal care can sometimes be arranged privately or through other funding streams while the application is being assessed.",
    },
  ],
  parentHref: "/dva",
  related: ["in-home-nursing-care", "complex-care-support"],
};

const NURSING_SERVICE: ServiceDefinition = {
  slug: "in-home-nursing-care",
  title: "In-Home Nursing Care",
  shortTitle: "In-Home Nursing",
  snippetAnswer:
    "In-home nursing care is professional clinical care delivered by AHPRA-registered nurses in your own home, including wound care, medication management, health monitoring and chronic disease support.",
  schemaDescription:
    "AHPRA-registered nursing care delivered in the home in {region}, Sydney, including wound care, medication management and chronic disease support.",
  serviceOverview:
    "In-home nursing care from Gentle Care brings clinical expertise into the home for individuals and families across {region}. Our nurses are AHPRA-registered, with hands-on experience across hospital and community settings, and they deliver tailored nursing and support at home rather than rushed, transactional visits. Typical clinical care includes wound assessment and dressing, medication management (including injections where appropriate), catheter and continence care, ongoing health monitoring of blood pressure, blood sugar and other observations, and support for chronic conditions such as diabetes, heart failure and chronic respiratory disease. We also coordinate closely with GPs, specialists and hospital discharge teams so you don't have to chase information: we share clear visit notes, flag changes early and follow specialist plans carefully. The way we work is deliberately relationship-based: we keep the caseload small so a consistent nurse or small team can build trust with the person at the centre of care. That continuity matters clinically (subtle changes are noticed sooner) and it matters personally (people don't have to retell their story to a new face every visit). Across {region}, we support older Australians ageing at home, NDIS participants needing skilled nursing, veterans accessing DVA Community Nursing, and private clients who want professional nursing without entering a facility.",
  fundingAndAccess:
    "In-home nursing care can be funded through NDIS, DVA Community Nursing, Support at Home (and other aged care arrangements), private health insurance in some cases, or paid privately. You don't always need a GP referral to start a conversation: contact us and we can talk through what care you are looking for and which funding stream might apply. Where DVA is involved we'll need a referral from your GP or treating doctor. Where NDIS or Support at Home is involved we'll work with your support coordinator or care partner to put a service agreement in place. Initial consultations are free and focused on listening rather than selling. We aim to respond within 24 hours during business hours, with prompt response and urgent referrals prioritised, particularly for clients being discharged from hospital in {region}.",
  included: [
    "Wound care and complex wound management",
    "Medication management and administration",
    "Catheter and continence care",
    "Health monitoring and chronic disease support",
    "Coordination with GPs, specialists and hospitals",
    "Calm, unrushed visits from registered nurses",
  ],
  faqs: [
    {
      id: "nursing-tasks-{slug}",
      question: "What nursing tasks can be done at home in {region}?",
      answer:
        "Most non-emergency nursing care can be safely delivered at home, including wound care, medication management, catheter care, injections, post-surgical monitoring, and ongoing care for chronic conditions. We tailor what we provide to each person's clinical needs, treating team's instructions and home environment.",
    },
    {
      id: "nursing-referral-{slug}",
      question: "Do I need a GP referral for nursing care?",
      answer:
        "For DVA Community Nursing you do need a referral from your GP or treating doctor. For private, NDIS or Support at Home nursing you can contact us directly to start a conversation. A discharge summary or GP letter is always helpful as it gives our nurses important clinical background.",
    },
    {
      id: "nursing-frequency-{slug}",
      question: "How often can a nurse visit in {region}?",
      answer:
        "Visit frequency is set around clinical need and what your funding allows, from a single one-off visit through to several visits per week, or daily care during recovery. We talk this through with you, your family and your treating team before starting and adjust as needs change.",
    },
    {
      id: "nursing-vs-personal-{slug}",
      question: "What's the difference between nursing care and personal care?",
      answer:
        "Nursing care is clinical work that legally must be done or supervised by a registered nurse: wound care, medication management, complex care. Personal care is help with daily living tasks like showering, dressing and meals, delivered by trained support workers. Many of our clients receive a combination of both, coordinated by our clinical team.",
    },
    {
      id: "nursing-post-hospital-{slug}",
      question: "Can nursing care help me recover after hospital?",
      answer:
        "Yes. Post-hospital nursing is one of the most common reasons people contact us. We coordinate with hospital discharge planners and your GP, set up more frequent visits in the early days, and step care down as you recover. This often reduces the risk of avoidable readmission.",
    },
    {
      id: "nursing-complex-{slug}",
      question: "Do you manage complex conditions at home?",
      answer:
        "Yes. Our nurses have experience with PEG feeding, tracheostomy care, complex wound care, palliative needs and other higher-acuity care. We only take on complex care that is clinically appropriate to deliver at home, and we always work from established specialist or GP plans with clear escalation steps.",
    },
    {
      id: "nursing-qualifications-{slug}",
      question: "What are your nurses' qualifications?",
      answer:
        "All clinical nursing care is delivered or supervised by AHPRA-registered nurses with substantial experience in Australian healthcare settings. Our team is led by a care professional with over 10 years of hands-on experience in disability, aged care and in-home support.",
    },
    {
      id: "nursing-insurance-{slug}",
      question: "Is nursing care covered by insurance or funding?",
      answer:
        "In-home nursing in {region} can be funded through NDIS, DVA Community Nursing, Support at Home and other aged care arrangements, or paid privately. Some private health insurance policies may also contribute, depending on the policy. We can talk through the typical options once we understand your situation.",
    },
  ],
  parentHref: "/services/nursing-care",
  related: ["complex-care-support", "dva-community-nursing"],
};

const PERSONAL_SERVICE: ServiceDefinition = {
  slug: "personal-care-daily-living",
  title: "Personal Care & Daily Living Assistance",
  shortTitle: "Personal Care",
  snippetAnswer:
    "Personal care and daily living assistance is respectful in-home support with bathing, dressing, grooming, toileting, meal preparation and mobility, helping people stay safely and comfortably at home.",
  schemaDescription:
    "Respectful in-home personal care and daily living assistance in {region}, Sydney, including bathing, dressing, grooming, meals and mobility support.",
  serviceOverview:
    "Personal care and daily living assistance from Gentle Care is about making everyday life at home in {region} feel safer, calmer and more dignified. We provide consistent, person-centred support with the daily tasks that matter most: showering and bathing, dressing and grooming, toileting and continence support, meal preparation and assistance, medication reminders, and gentle mobility support around the home. The way we work is deliberately relationship-based. People being supported with personal care should not be expected to retell their story to a new face every week, so we keep the caseload small and match each person with a small, regular care team that gets to know routines, preferences and the small details that protect dignity. Carers are trained to follow each person's lead: if someone likes their morning routine done a certain way, that is exactly how it is done. Family carers across {region} also tell us how much it helps to have a reliable, professional team who turn up on time, communicate clearly and treat their loved one as a whole person, not a list of tasks. Where personal care sits alongside clinical needs, our registered nurses oversee the support plan to make sure care is safe, joined-up and responsive to changes.",
  fundingAndAccess:
    "Personal care and daily living assistance can be funded through NDIS Core Supports, DVA where part of approved care, Support at Home and other aged care arrangements, or paid privately. To get started, contact us and we'll arrange a free initial conversation to understand what you or your family member is looking for. We aim to respond within 24 hours during business hours, with urgent referrals (such as someone returning home from hospital in {region}) prioritised. From there we can put a simple service agreement in place, agree a starting schedule, and introduce the carers who will be supporting you. We can also work with support coordinators, care partners, or social workers who are already involved with a household, so the people who already know your situation stay in the loop.",
  included: [
    "Showering, bathing and personal hygiene",
    "Dressing, grooming and skincare",
    "Toileting and continence support",
    "Meal preparation and assistance with eating",
    "Medication reminders and prompting",
    "Mobility support and safe transfers around the home",
  ],
  faqs: [
    {
      id: "personal-services-{slug}",
      question: "What personal care services do you offer in {region}?",
      answer:
        "We support clients in {region} with showering, bathing, dressing, grooming, toileting, continence care, meal preparation, medication reminders and gentle mobility support around the home. Care is tailored to each person's preferences, cultural background and clinical needs.",
    },
    {
      id: "personal-same-carer-{slug}",
      question: "Will I have the same carer each visit?",
      answer:
        "Wherever possible, yes. Our small caseload model is built around consistency, so people are matched with a regular carer or small care team. Where leave or rostering means someone different is needed, we work to introduce a familiar face from the team.",
    },
    {
      id: "personal-dignity-{slug}",
      question: "How do you approach dignity and privacy?",
      answer:
        "Personal care touches on the most private parts of someone's day, and we take that seriously. Carers are trained to be unhurried, to talk through what they are about to do, to follow each person's lead, and to protect privacy at every step. We see dignity as a baseline, not an extra.",
    },
    {
      id: "personal-meals-{slug}",
      question: "Can you help with meal preparation?",
      answer:
        "Yes. We can help with planning, shopping, preparation and serving of meals, taking into account dietary requirements, cultural preferences and what someone actually enjoys eating. For people with swallowing difficulties or specific clinical needs, our nurses can advise.",
    },
    {
      id: "personal-mobility-{slug}",
      question: "What if I have mobility challenges?",
      answer:
        "We're experienced supporting people with reduced mobility safely at home in {region}. This includes help with transfers, the use of mobility aids, and gentle support to move around the home in a way that reduces falls risk. Where complex manual handling is involved, our nurses can assess and plan with you.",
    },
    {
      id: "personal-grooming-{slug}",
      question: "Do you assist with grooming and hygiene?",
      answer:
        "Yes. Our team helps with showering, bathing, hair washing, shaving, dressing, oral care and skin care, all delivered with discretion and respect. For some clients, just feeling fresh and dressed for the day is the difference between an ordinary day and a good one.",
    },
    {
      id: "personal-independence-{slug}",
      question: "Can personal care help me stay independent at home?",
      answer:
        "Yes, that is one of the main reasons people choose personal care. Having reliable, respectful support with daily tasks helps many people in {region} stay at home longer, instead of moving into residential care, while still feeling safe and looked after.",
    },
    {
      id: "personal-notice-{slug}",
      question: "How much notice do I need to book a carer?",
      answer:
        "It depends on what you need and our current roster. We try to set up regular care quickly, and we aim to respond within 24 hours during business hours. We will always be honest if we can't start when you'd like, rather than overpromising.",
    },
  ],
  parentHref: "/services/personal-care",
  related: ["in-home-nursing-care", "ndis-services"],
};

const COMPLEX_SERVICE: ServiceDefinition = {
  slug: "complex-care-support",
  title: "Complex Care Support",
  shortTitle: "Complex Care",
  snippetAnswer:
    "Complex care at home is specialised nursing for people with higher health needs (such as tracheostomy care, PEG feeding, catheter management and complex wound care), delivered safely in their own home.",
  schemaDescription:
    "Specialised in-home complex clinical nursing in {region}, Sydney, including PEG feeding, tracheostomy care, catheter management and complex wound care.",
  serviceOverview:
    "Complex care support from Gentle Care brings specialised clinical nursing into the home for people in {region} who need more than basic personal care or simple nursing tasks. Our nurses are experienced with PEG feeding, tracheostomy care, catheter management, complex wound care and ongoing monitoring of multiple conditions. We work alongside hospitals, specialists and GPs to follow established care plans, document changes carefully and escalate appropriately if anything looks different. Many of the people we support with complex care are NDIS participants with higher clinical support needs, veterans accessing DVA Community Nursing, and older Australians transitioning home from hospital after a complex admission. Family members are often deeply involved in this kind of care, and we build that into how we work: we explain what we're doing and why, support carers to understand what to look for, and never make families feel like they're guessing. We only take on complex care that is clinically appropriate to deliver at home, with clear escalation pathways back to hospital or specialist services if needed. The aim is to give people the option of staying safely at home, surrounded by what they know, rather than spending more time than necessary in hospital or residential settings.",
  fundingAndAccess:
    "Complex care can be funded through NDIS (where line items support skilled nursing and complex care), DVA Community Nursing, Support at Home and other aged care arrangements, or paid privately. The first step is usually a conversation: we want to understand the diagnosis, current care plan, who is already involved, and what is being asked of family carers in {region}. We aim to respond within 24 hours during business hours, with urgent referrals (particularly for people about to be discharged from hospital) prioritised. From there we'll review the care plan with the relevant clinical team, decide whether home delivery is safe and appropriate, and put a structured plan and service agreement in place. The first conversation is free and there is no pressure to commit before everyone is comfortable with the plan.",
  included: [
    "PEG feeding and nutrition support",
    "Tracheostomy care",
    "Catheter management",
    "Complex wound assessment and management",
    "Coordination with hospitals, specialists and GPs",
    "Family education and clear escalation steps",
  ],
  faqs: [
    {
      id: "complex-what-{slug}",
      question: "What counts as complex care in {region}?",
      answer:
        "Complex care covers higher-acuity nursing such as PEG feeding, tracheostomy care, catheter management, complex wound care and managing multiple conditions at once. It usually involves a specialist or hospital plan that needs to be followed carefully at home.",
    },
    {
      id: "complex-post-hospital-{slug}",
      question: "Do you have experience with post-hospital complex needs?",
      answer:
        "Yes. We regularly support people in {region} returning home after complex admissions. We coordinate with hospital discharge planners and treating teams, set up more frequent visits in the early days, and adjust care as someone stabilises.",
    },
    {
      id: "complex-trach-{slug}",
      question: "Can you manage tracheostomy care at home?",
      answer:
        "Yes. Our nurses are experienced with tracheostomy care, including airway care, monitoring and tube changes where this is part of the established plan, working alongside specialist services for ongoing oversight.",
    },
    {
      id: "complex-overnight-{slug}",
      question: "What if my condition requires overnight support?",
      answer:
        "We can provide overnight support and extended hours depending on care needs, funding and staff availability. We'll talk through what is realistic for your situation in {region} and be honest if a particular pattern of care isn't something we can sustain reliably.",
    },
    {
      id: "complex-coordination-{slug}",
      question: "Do you coordinate with hospitals and GPs?",
      answer:
        "Yes. Coordination with hospitals, specialists and GPs is a core part of complex care. We share clear visit notes, flag changes early, and follow established plans carefully so the wider treating team is never out of the loop.",
    },
    {
      id: "complex-palliative-{slug}",
      question: "Can you handle palliative care at home?",
      answer:
        "Yes. We support palliative care at home, working alongside specialist palliative care services where they are involved. Care focuses on comfort, symptom management, dignity and supporting families through what can be a very difficult time.",
    },
    {
      id: "complex-ventilator-{slug}",
      question: "What's your experience with ventilator-dependent clients?",
      answer:
        "Ventilator-dependent care is highly specialised and we'll always assess on a case-by-case basis whether home delivery is safe and appropriate, working closely with the relevant specialist and hospital teams. Where it isn't a good fit, we'll be honest and suggest alternatives.",
    },
    {
      id: "complex-emergency-{slug}",
      question: "How quickly can you respond to complex care needs?",
      answer:
        "For genuine emergencies, please call 000. For new complex care referrals in {region}, we aim to respond within 24 hours during business hours, with urgent referrals (such as imminent hospital discharge) prioritised so care can be set up in time.",
    },
  ],
  parentHref: "/services/complex-care",
  related: ["in-home-nursing-care", "dva-community-nursing"],
};

export const SERVICES: readonly ServiceDefinition[] = [
  NDIS_SERVICE,
  DVA_SERVICE,
  NURSING_SERVICE,
  PERSONAL_SERVICE,
  COMPLEX_SERVICE,
];

// ---------------------------------------------------------------------------
// Page generation
// ---------------------------------------------------------------------------

const HERO_TEMPLATES: Record<ServiceSlug, (region: string) => string> = {
  "ndis-services": (region) =>
    `Gentle Care Nursing is a registered NDIS provider supporting participants across ${region} with personalised in-home nursing, personal care and complex care. Our small, experienced team works closely with participants, families, plan managers and support coordinators to deliver consistent, person-centred support that fits each plan and each household. We deliberately keep our caseload small so participants get more dedicated care from familiar faces, not a rotating roster of agency staff. Across ${region}, families and coordinators choose Gentle Care for the same reasons: clear communication, reliable visits, and care that respects choice, culture and routine. Whether you're new to the NDIS, in the middle of a plan or coordinating support after a hospital stay, we're happy to have a calm, no-pressure conversation about how we might help.`,
  "dva-community-nursing": (region) =>
    `Gentle Care Nursing is a DVA Contracted Community Nursing Provider, supporting eligible Veteran Card holders across ${region} with clinically required nursing and personal care services at home. Our team works from a referral by a GP or treating doctor and follows the assessed care plan with respect for each veteran's history, preferences and routine. We keep care relationship-based: a small, consistent team rather than a rotating roster, so visits feel familiar and trusted. Across ${region}, we support veterans living independently, those returning home from hospital, and partners caring for a loved one who needs more clinical support than they can comfortably provide on their own. We manage claiming directly with DVA so eligible veterans have nothing to invoice or chase.`,
  "in-home-nursing-care": (region) =>
    `Gentle Care Nursing brings clinical expertise into the home for individuals and families across ${region}. Our AHPRA-registered nurses provide tailored nursing and support at home (wound care, medication management, catheter and continence care, health monitoring and chronic disease support), delivered calmly and without rushing. We work alongside GPs, specialists and hospital discharge teams so care is well-coordinated, and we keep our caseload small so a consistent nurse or small team can build trust with the person at the centre of care. Across ${region}, we support older Australians ageing at home, NDIS participants needing skilled nursing, veterans accessing DVA Community Nursing, and private clients who want professional nursing without entering a facility.`,
  "personal-care-daily-living": (region) =>
    `Gentle Care Nursing provides consistent, person-centred personal care and daily living assistance across ${region}. Our carers help with the daily tasks that matter most (showering, dressing, grooming, toileting, meal preparation and gentle mobility support), in a way that is unhurried, respectful and quietly protective of dignity. We keep our caseload small so each person is matched with a small, regular care team that learns routines, preferences and the little details that make support feel calm rather than clinical. Across ${region}, we work with older Australians ageing at home, NDIS participants, veterans accessing DVA, and families who want reliable, respectful support for a loved one. Where personal care sits alongside clinical needs, our registered nurses oversee the plan to keep everything joined-up.`,
  "complex-care-support": (region) =>
    `Gentle Care Nursing brings specialised clinical care into the home for people in ${region} who need more than basic personal care or simple nursing tasks. Our nurses are experienced with PEG feeding, tracheostomy care, catheter management and complex wound care, working alongside hospitals, specialists and GPs to follow established care plans safely. We only take on complex care that is clinically appropriate to deliver at home, with clear escalation pathways and careful documentation. Across ${region}, we support NDIS participants with higher clinical needs, veterans accessing DVA Community Nursing, and older Australians transitioning home from hospital after a complex admission, so people have the option of staying safely at home, surrounded by what they know.`,
};

function injectRegion(text: string, region: string): string {
  return text.replace(/\{region\}/g, region);
}
function injectService(text: string, service: string): string {
  return text.replace(/\{service\}/g, service);
}
function injectFaq(faq: ServiceRegionFaq, region: string, slug: string): ServiceRegionFaq {
  return {
    id: faq.id.replace(/\{slug\}/g, slug),
    question: injectRegion(faq.question, region),
    answer: injectRegion(faq.answer, region),
  };
}

function buildPage(
  service: ServiceDefinition,
  region: RegionDefinition
): ServiceRegionPageData {
  const path = `/services/${service.slug}/${region.slug}`;
  // Title template kept ≤62 chars across all 30 service×region combos so it
  // doesn't truncate in Google SERPs. Uses `shortTitle` (e.g. "Personal Care"
  // not "Personal Care & Daily Living") and avoids double-Sydney for regions
  // whose names already contain "Sydney" (e.g. "Sydney CBD & East").
  const regionPhrase = /sydney/i.test(region.region)
    ? region.region
    : `${region.region} Sydney`;
  const metaTitle = `${service.shortTitle} in ${regionPhrase} | Gentle Care`;
  // Keep meta description ≤160 chars for SERP display.
  const metaDescription =
    `${service.title} in ${region.region}, Sydney. experienced, relationship-based care. We aim to respond within 24 hours.`;
  return {
    serviceSlug: service.slug,
    regionSlug: region.slug,
    service,
    region,
    path,
    metaTitle,
    metaDescription,
    h1: `${service.title} Across ${region.region} Sydney`,
    hero: HERO_TEMPLATES[service.slug](region.region),
    serviceOverview: injectRegion(service.serviceOverview, region.region),
    regionalContext: injectService(region.regionalContext, service.shortTitle),
    fundingAndAccess: injectRegion(service.fundingAndAccess, region.region),
    included: service.included,
    faqs: service.faqs.map((faq) => injectFaq(faq, region.region, region.slug)),
    ctaTitle: `Ready to arrange ${service.title.toLowerCase()} in ${region.region}?`,
    ctaDescription: `Tell us a little about your situation and we'll respond within 24 hours during business hours, with urgent referrals in ${region.region} prioritised.`,
  };
}

export const SERVICE_REGION_PAGES: readonly ServiceRegionPageData[] = SERVICES.flatMap(
  (service) => REGIONS.map((region) => buildPage(service, region))
);

export function getServiceRegionPage(
  serviceSlug: string,
  regionSlug: string
): ServiceRegionPageData | undefined {
  return SERVICE_REGION_PAGES.find(
    (p) => p.serviceSlug === serviceSlug && p.regionSlug === regionSlug
  );
}

export function getAllServiceRegionParams(): { service: string; region: string }[] {
  return SERVICE_REGION_PAGES.map((p) => ({
    service: p.serviceSlug,
    region: p.regionSlug,
  }));
}

export function getServiceBySlug(slug: string): ServiceDefinition | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getRegionBySlug(slug: string): RegionDefinition | undefined {
  return REGIONS.find((r) => r.slug === slug);
}
