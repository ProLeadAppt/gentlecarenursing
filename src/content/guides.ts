export type GuideId =
  | "in-home-care-after-hip-replacement"
  | "in-home-care-for-dementia"
  | "in-home-care-for-chronic-wounds";

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
  intent: "post-hospital" | "dementia" | "wounds";
  primaryServiceSlug: string;
  sections: GuideSection[];
  cta: {
    label: string;
    href: string;
  };
}

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
          "In-home dementia support can be funded through Home Care Packages, CHSP, NDIS (for younger-onset dementia), DVA, or private payment. Your assessment team or coordinator can help work out the right mix.",
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

export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function getAllGuideSlugs(): string[] {
  return GUIDES.map((g) => g.slug);
}

