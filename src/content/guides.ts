export type GuideId =
  | "in-home-care-after-hip-replacement"
  | "in-home-care-for-dementia"
  | "in-home-care-for-chronic-wounds"
  | "in-home-care-after-stroke"
  | "support-for-family-carers-and-burnout";

export interface GuideSection {
  id: string;
  heading: string;
  body: string;
  bullets?: string[];
}

export interface Guide {
  id: GuideId;
  slug: string;
  title: string;
  /** Answer-first snippet for AEO / hero intro */
  snippetAnswer: string;
  intent: "post-hospital" | "dementia" | "wounds" | "stroke" | "carer-support";
  primaryServiceSlug: string;
  sections: GuideSection[];
  cta: {
    label: string;
    href: string;
  };
  /** ISO date (YYYY-MM-DD) the guide was first published. Optional — populate when known. */
  publishedAt?: string;
  /**
   * ISO date (YYYY-MM-DD) the guide was last clinically reviewed.
   * Surfaced visibly on-page and in schema for AI freshness signals.
   * Populate together with `reviewer` when a clinician has signed off.
   */
  reviewedAt?: string;
  /** Named clinician who reviewed the guide. Populate only with consent and AHPRA confirmation. */
  reviewer?: { name: string; role?: string };
}

/**
 * Topical entities each guide is about — used for schema.org `about`
 * (MedicalCondition / MedicalProcedure). Helps AI engines bind the guide
 * to the right clinical query intent.
 */
export const GUIDE_ABOUT_ENTITIES: Record<GuideId, ReadonlyArray<{
  type: "MedicalCondition" | "MedicalProcedure" | "Thing";
  name: string;
  alternateName?: string;
}>> = {
  "in-home-care-after-hip-replacement": [
    { type: "MedicalProcedure", name: "Hip replacement", alternateName: "Total hip arthroplasty" },
    { type: "Thing", name: "Post-operative recovery at home" },
  ],
  "in-home-care-for-dementia": [
    { type: "MedicalCondition", name: "Dementia" },
    { type: "Thing", name: "In-home dementia care" },
  ],
  "in-home-care-for-chronic-wounds": [
    { type: "MedicalCondition", name: "Chronic wound" },
    { type: "MedicalProcedure", name: "Wound care" },
  ],
  "in-home-care-after-stroke": [
    { type: "MedicalCondition", name: "Stroke", alternateName: "Cerebrovascular accident" },
    { type: "Thing", name: "Stroke recovery at home" },
  ],
  "support-for-family-carers-and-burnout": [
    { type: "Thing", name: "Family carer support" },
    { type: "MedicalCondition", name: "Caregiver burnout" },
  ],
};

export const GUIDES: readonly Guide[] = [
  {
    id: "in-home-care-after-hip-replacement",
    slug: "in-home-care-after-hip-replacement",
    title: "In-Home Care After Hip Replacement",
    snippetAnswer:
      "In-home care after hip replacement is short-term nursing and personal care at home to support your recovery, reduce falls risk, and keep your pain and mobility on track after you leave hospital.",
    intent: "post-hospital",
    primaryServiceSlug: "post-hospital-care",
    sections: [
      {
        id: "what-it-is",
        heading: "What does in-home care after hip replacement include?",
        body:
          "After a hip replacement, most people leave hospital before they feel completely steady on their feet. In-home care bridges the gap between hospital and full independence.",
        bullets: [
          "Nursing checks on your wound, pain, and medications",
          "Help with bathing, dressing, and getting in and out of bed or chairs",
          "Support with exercises prescribed by your physio (not replacing physiotherapy)",
          "Monitoring for signs that you need extra review from your surgeon or GP",
        ],
      },
      {
        id: "who-its-for",
        heading: "Who is this type of support right for?",
        body:
          "In-home support after hip replacement is most helpful when you are safe to be at home, but still need another pair of hands and clinical oversight.",
        bullets: [
          "Older adults who feel unsteady or anxious about falls after surgery",
          "People living alone who don’t have family nearby to assist every day",
          "Families who can help but need guidance and occasional respite",
        ],
      },
      {
        id: "how-long",
        heading: "How long do people usually need help?",
        body:
          "The length of support depends on your age, other health conditions, and home environment. Many people need more intensive help in the first 1–2 weeks, then gradually step down visits as confidence and mobility return.",
      },
    ],
    cta: {
      label: "Arrange post-hospital care at home",
      href: "/services/post-hospital-care",
    },
  },
  {
    id: "in-home-care-for-dementia",
    slug: "in-home-care-for-dementia",
    title: "In-Home Care for People Living With Dementia",
    snippetAnswer:
      "In-home dementia care combines gentle daily support and nursing oversight so a person living with dementia can stay safely at home for longer, while families get practical help and guidance.",
    intent: "dementia",
    primaryServiceSlug: "aged-care",
    sections: [
      {
        id: "what-support",
        heading: "What does in-home dementia care involve?",
        body:
          "Support is tailored to the person and their stage of dementia. The focus is on safety, familiarity, and keeping daily life as calm and predictable as possible.",
        bullets: [
          "Help with bathing, dressing, meals, and gentle prompting",
          "Monitoring for changes in mood, behaviour, or physical health",
          "Support to keep routines and meaningful activities going",
          "Nursing input for medications, wounds, and other health needs",
        ],
      },
      {
        id: "family-role",
        heading: "How does in-home care support families and carers?",
        body:
          "Family and unpaid carers often carry most of the load. In-home dementia care is there to share that responsibility rather than replace it.",
        bullets: [
          "Regular breaks so family carers can rest or work",
          "Clear updates about what is changing and what to watch for",
          "Guidance on how to respond to common dementia-related behaviours",
        ],
      },
      {
        id: "funding",
        heading: "How is dementia care at home usually funded?",
        body:
          "In-home dementia support can be funded through Support at Home, CHSP, NDIS (for younger-onset dementia), DVA, or private payment. Your assessment team or coordinator can help work out the right mix.",
      },
    ],
    cta: {
      label: "Explore aged care support at home",
      href: "/aged-care",
    },
  },
  {
    id: "in-home-care-for-chronic-wounds",
    slug: "in-home-care-for-chronic-wounds",
    title: "In-Home Care for Chronic and Complex Wounds",
    snippetAnswer:
      "In-home wound care brings experienced nurses to you so chronic or complex wounds can be dressed, monitored, and escalated early without constant trips back to hospital or clinics.",
    intent: "wounds",
    primaryServiceSlug: "complex-care",
    sections: [
      {
        id: "when-helpful",
        heading: "When is in-home wound care helpful?",
        body:
          "Wounds that are slow to heal or need specialised dressings are hard to manage alone. In-home care is particularly useful when travel is tiring or mobility is limited.",
        bullets: [
          "Leg ulcers, pressure injuries, or surgical wounds that are slow to heal",
          "People with diabetes or vascular disease needing close monitoring",
          "Clients who already have other supports at home and want care coordinated",
        ],
      },
      {
        id: "what-nurses-do",
        heading: "What do nurses do during home wound visits?",
        body:
          "Nurses follow your specialist or GP’s wound plan, while keeping an eye on the bigger picture of your health and comfort.",
        bullets: [
          "Clean and redress wounds using appropriate products",
          "Check for signs of infection or poor circulation",
          "Monitor pain, mobility, and how the wound affects daily life",
          "Update your treating team when things improve or change",
        ],
      },
      {
        id: "safety",
        heading: "Is home wound care safe?",
        body:
          "Yes, when it is planned properly and delivered by experienced nurses. We only manage wounds at home that are clinically appropriate and always escalate quickly if there are signs of concern.",
      },
    ],
    cta: {
      label: "Discuss complex care at home",
      href: "/services/complex-care",
    },
  },
] as const;

// Additional high-intent guides
export const EXTRA_GUIDES: readonly Guide[] = [
  {
    id: "in-home-care-after-stroke",
    slug: "in-home-care-after-stroke",
    title: "In-Home Care After Stroke",
    snippetAnswer:
      "In-home care after stroke combines nursing, personal care, and family education so recovery and rehabilitation can continue safely at home, not only in hospital or rehab.",
    intent: "stroke",
    primaryServiceSlug: "post-hospital-care",
    sections: [
      {
        id: "why-home",
        heading: "Why is in-home care important after a stroke?",
        body:
          "Leaving hospital after a stroke can feel uncertain. In-home support helps you continue rehabilitation while reducing the risk of falls, complications, or carer burnout.",
        bullets: [
          "Monitoring for changes in mobility, speech, or alertness",
          "Support with safe transfers, toileting, and bathing",
          "Help to follow therapy programs set by your rehab team",
        ],
      },
      {
        id: "who-benefits",
        heading: "Who benefits most from stroke support at home?",
        body:
          "This type of support is most helpful when someone is medically stable but still has mobility, communication, or thinking changes that make day-to-day life harder.",
        bullets: [
          "People who feel unsteady or need help getting around their home",
          "Families unsure how much to assist without doing everything for their loved one",
          "Clients juggling multiple follow-up appointments and community supports",
        ],
      },
      {
        id: "funding",
        heading: "How is stroke-related home support usually funded?",
        body:
          "Depending on your age and situation, support might be funded through NDIS, aged care packages, DVA, state programs, or private payment. We can talk through options with you and your coordinator.",
      },
    ],
    cta: {
      label: "Arrange post-hospital stroke support at home",
      href: "/services/post-hospital-care",
    },
  },
  {
    id: "support-for-family-carers-and-burnout",
    slug: "support-for-family-carers-and-burnout",
    title: "Support for Family Carers and Avoiding Burnout",
    snippetAnswer:
      "Family carer support at home means sharing the load of day-to-day care, spotting early signs of burnout, and giving you practical ways to rest without feeling like you are letting anyone down.",
    intent: "carer-support",
    primaryServiceSlug: "aged-care",
    sections: [
      {
        id: "signs-burnout",
        heading: "What are the early signs of carer burnout?",
        body:
          "Burnout rarely appears overnight. It usually builds as tiredness, stress, and worry turn into exhaustion and feeling stuck.",
        bullets: [
          "Feeling constantly tired or on edge, even when your loved one is resting",
          "Finding it harder to be patient or to make decisions",
          "Pulling away from friends, work, or activities you used to enjoy",
        ],
      },
      {
        id: "how-care-helps",
        heading: "How can in-home support help family carers?",
        body:
          "Bringing in skilled help is not a sign of failure. It is often the reason families can keep caring at home for longer.",
        bullets: [
          "Regular visits so you can rest, work, or spend time with other family members",
          "Guidance on safer ways to help with transfers, bathing, and mobility",
          "A calm third party to notice changes and talk through next steps",
        ],
      },
      {
        id: "getting-started",
        heading: "How do we start getting support as carers?",
        body:
          "A simple enquiry starts the conversation. We will ask about your loved one’s needs and your situation as a carer, then suggest practical options that respect your role and limits.",
      },
    ],
    cta: {
      label: "Talk about support for your caring role",
      href: "/aged-care",
    },
  },
];

export const ALL_GUIDES: readonly Guide[] = [...GUIDES, ...EXTRA_GUIDES];

export function getGuideBySlug(slug: string): Guide | undefined {
  return ALL_GUIDES.find((g) => g.slug === slug);
}

export function getAllGuideSlugs(): string[] {
  return ALL_GUIDES.map((g) => g.slug);
}

