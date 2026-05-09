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
    { type: "MedicalCondition", name: "Hip osteoarthritis", alternateName: "Hip OA" },
    { type: "Thing", name: "In-home post-hospital nursing in Sydney" },
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
    title: "In-Home Care After Hip Replacement in Sydney",
    snippetAnswer:
      "In-home care after hip replacement is short-term nursing and personal care at home — across Sydney and surrounds — to support your recovery, reduce falls risk, and keep your pain and mobility on track after you leave hospital. Visits are typically more frequent in the first one to two weeks, then step down as confidence and mobility return.",
    intent: "post-hospital",
    primaryServiceSlug: "post-hospital-care",
    sections: [
      {
        id: "what-it-is",
        heading: "What does in-home care after hip replacement include?",
        body:
          "After a hip replacement, most people leave hospital before they feel completely steady on their feet. In-home care bridges the gap between hospital and full independence — clinical oversight, personal care, and the practical support that keeps recovery on track.",
        bullets: [
          "Nursing checks on your wound, pain, and medications",
          "Help with bathing, dressing, and getting in and out of bed or chairs",
          "Support with exercises prescribed by your physio (not replacing physiotherapy)",
          "Falls prevention — managing thresholds, rugs, bathroom transfers, and mobility aids",
          "Monitoring for signs of infection, deep vein thrombosis (DVT), or dislocation that need extra review from your surgeon or GP",
        ],
      },
      {
        id: "sydney-coverage",
        heading: "Where in Sydney do you provide post-hip-replacement care?",
        body:
          "Gentle Care Nursing Services delivers post-hip-replacement support across Greater Sydney, including the Inner West, North Shore, Northern Beaches, Western Sydney, South Sydney, and the CBD and Eastern Suburbs. We work alongside discharge planners and orthopaedic teams at the major Sydney hospitals where hip-replacement surgery is performed.",
        bullets: [
          "Royal Prince Alfred Hospital (RPA) and Concord Hospital — Inner West",
          "Royal North Shore Hospital (RNSH), the Mater Hospital, and North Shore Private — North Shore",
          "St Vincent's Hospital and Prince of Wales Hospital — CBD and Eastern Suburbs",
          "Westmead, Blacktown, Nepean, and Liverpool Hospital — Western Sydney",
          "St George Hospital (Kogarah) and Sutherland Hospital (Caringbah) — South Sydney",
          "Northern Beaches Hospital (Frenchs Forest) and Mona Vale Hospital — Northern Beaches",
        ],
      },
      {
        id: "who-its-for",
        heading: "Who is this type of support right for?",
        body:
          "In-home support after hip replacement is most helpful when you are safe to be at home, but still need another pair of hands and clinical oversight. It works for older Australians on Support at Home or DVA, NDIS participants recovering from a planned hip replacement, and private clients arranging their own post-surgical recovery.",
        bullets: [
          "Older adults who feel unsteady or anxious about falls after surgery",
          "People living alone who don't have family nearby to assist every day",
          "Families who can help but need guidance and occasional respite",
          "Veterans accessing DVA-funded community nursing after a hip replacement",
          "NDIS participants whose plan funds short-term post-hospital recovery support",
        ],
      },
      {
        id: "first-two-weeks",
        heading: "What does the first two weeks at home usually look like?",
        body:
          "The first one to two weeks at home are when most complications either appear or get caught early — wound infection, DVT, dislocation, or simply doing too much too soon. Visits are typically daily or near-daily during this period, focused on the wound, the medication regime, mobility, and falls prevention. Care steps down as confidence and mobility return.",
      },
      {
        id: "how-long",
        heading: "How long do people usually need help?",
        body:
          "The length of support depends on your age, other health conditions, and home environment. Many people need more intensive help in the first one to two weeks, then gradually step down visits as confidence and mobility return. By around the six-week mark, most people are managing more independently — though some choose to keep a smaller schedule of visits going for longer.",
      },
      {
        id: "funding",
        heading: "How is post-hip-replacement care at home funded in Sydney?",
        body:
          "Funding usually comes from one of four sources, and the right one depends on your situation. Most Sydney readers will be eligible for one of these — your discharge planner, GP, or aged-care assessor can confirm.",
        bullets: [
          "DVA Community Nursing — for eligible Veteran Card holders, by referral from your GP or treating doctor",
          "Support at Home or CHSP — for older Australians with an aged-care assessment outcome",
          "NDIS — for participants whose plan funds short-term post-hospital nursing or personal care",
          "Private fee-for-service — when no funded program applies, or to top up other supports",
        ],
      },
      {
        id: "what-to-watch-for",
        heading: "What should I watch for at home and when should I call someone?",
        body:
          "Most hip-replacement recoveries go well, but the early window is when complications matter most. Contact your treating team or 000 promptly if any of the following appear, and call us if you'd like a nursing review.",
        bullets: [
          "Increasing redness, swelling, warmth, or fluid leaking from the wound",
          "Calf pain, swelling, or sudden shortness of breath (possible DVT or pulmonary embolism)",
          "Sudden, severe pain in the hip, especially with a change in leg length or alignment (possible dislocation)",
          "A fever above 38°C in the first weeks after surgery",
          "Pain that isn't controlled by your prescribed medication regime",
        ],
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
    title: "In-Home Care for People Living With Dementia in Sydney",
    snippetAnswer:
      "In-home dementia care is gentle daily support and nursing oversight at home — across Sydney and surrounds — so a person living with dementia can stay safely in familiar surroundings for longer, while families get practical help, education, and respite. Support is tailored to the stage of dementia and works alongside Sydney memory clinics, the Cognitive Decline Partnership Centre pathways, and Dementia Australia resources.",
    intent: "dementia",
    primaryServiceSlug: "aged-care",
    sections: [
      {
        id: "what-support",
        heading: "What does in-home dementia care involve?",
        body:
          "Support is tailored to the person and their stage of dementia. The focus is on safety, familiarity, and keeping daily life as calm and predictable as possible — particularly important because people living with dementia generally do better in environments they recognise.",
        bullets: [
          "Help with bathing, dressing, meals, and gentle prompting",
          "Monitoring for changes in mood, behaviour, sleep, or physical health",
          "Support to keep routines, meaningful activities, and social connections going",
          "Nursing input for medications, wounds, continence care, and other health needs",
          "Falls prevention — managing rugs, lighting, thresholds, and bathroom transfers",
          "Guidance on responding to behavioural and psychological symptoms (BPSD) like agitation, sundowning, or wandering",
        ],
      },
      {
        id: "sydney-coverage",
        heading: "Where in Sydney do you provide in-home dementia care?",
        body:
          "Gentle Care Nursing Services provides in-home dementia support across Greater Sydney, including the Inner West, North Shore, Northern Beaches, Western Sydney, South Sydney, and the CBD and Eastern Suburbs. We work alongside Sydney memory clinics and specialist services where people living with dementia receive their diagnosis and ongoing review.",
        bullets: [
          "Royal Prince Alfred Hospital (RPA) memory and cognition clinics — Inner West",
          "Royal North Shore Hospital (RNSH) and Macquarie University memory clinics — North Shore",
          "Westmead and Concord Centre for Mental Health — Western Sydney",
          "Prince of Wales Hospital (POW) and St Vincent's — CBD and Eastern Suburbs",
          "St George Hospital and Sutherland Hospital — South Sydney",
          "Northern Beaches Hospital — Northern Beaches",
        ],
      },
      {
        id: "family-role",
        heading: "How does in-home care support families and carers?",
        body:
          "Family and unpaid carers often carry most of the load. In-home dementia care shares that responsibility rather than replacing it — which is one of the most reliable ways to keep someone living at home for longer and reduce the risk of carer burnout.",
        bullets: [
          "Regular breaks so family carers can rest, work, or attend to their own health",
          "Clear updates about what is changing and what to watch for",
          "Guidance on how to respond to common behavioural and psychological symptoms",
          "Connection to Dementia Australia resources and local Sydney support groups",
          "Practical advice on home safety adjustments as needs change",
        ],
      },
      {
        id: "who-its-for",
        heading: "Who is in-home dementia care suitable for?",
        body:
          "In-home dementia support is most helpful when someone has a confirmed diagnosis (or is being assessed) and the family wants to keep them at home as long as it is safe to do so. It works at every stage from mild cognitive impairment through to advanced dementia, with the support adjusting as needs change.",
        bullets: [
          "Older Australians recently diagnosed who are still mostly independent but need light support",
          "People in the moderate stage who need help with daily routines and supervision",
          "Advanced dementia clients who need more intensive personal and nursing care",
          "Younger people with younger-onset dementia, often funded under NDIS",
          "Families wanting respite while their loved one stays in familiar surroundings",
          "Veterans accessing DVA-funded community nursing for dementia-related needs",
        ],
      },
      {
        id: "what-to-watch-for",
        heading: "What changes should families watch for at home?",
        body:
          "Dementia changes over time, and certain signs warrant earlier review by your GP, geriatrician, or memory clinic team. Contact your treating team or 000 promptly if any of the following appear, and call us if you'd like a nursing review.",
        bullets: [
          "Sudden confusion or a step-change in cognition (possible delirium, infection, or new stroke)",
          "New falls, especially with possible head strikes",
          "Increasing agitation, distress, or wandering, particularly at dusk",
          "Weight loss, refusing meals, or difficulty swallowing",
          "Skin breakdown, pressure injuries, or untreated wounds",
          "Signs the family carer is struggling — exhaustion, low mood, or withdrawal",
        ],
      },
      {
        id: "funding",
        heading: "How is dementia care at home funded in Sydney?",
        body:
          "Funding usually comes from one of four sources, and the right one depends on age and circumstances. The My Aged Care or NDIS assessment team can confirm what applies.",
        bullets: [
          "Support at Home or CHSP — for older Australians (65+) with an aged-care assessment outcome",
          "NDIS — for people under 65 with younger-onset dementia",
          "DVA Community Nursing — for eligible Veteran Card holders, by referral from a GP or treating doctor",
          "Private fee-for-service — when no funded program applies, or to top up other supports",
        ],
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
    title: "In-Home Care for Chronic and Complex Wounds in Sydney",
    snippetAnswer:
      "In-home wound care is regular nursing visits at home — across Sydney and surrounds — to dress, monitor, and escalate chronic or complex wounds without constant trips back to hospital or specialist clinics. Visits follow your specialist or GP wound plan and keep your treating team updated.",
    intent: "wounds",
    primaryServiceSlug: "complex-care",
    sections: [
      {
        id: "when-helpful",
        heading: "When is in-home wound care helpful?",
        body:
          "Wounds that are slow to heal or need specialised dressings are hard to manage alone. In-home care is particularly useful when travel to a wound clinic is tiring, mobility is limited, or the wound regime is too complex for family to manage on their own.",
        bullets: [
          "Venous and arterial leg ulcers, often needing compression bandaging",
          "Pressure injuries (stages 1–4) on heels, sacrum, or other pressure points",
          "Surgical wounds that are slow to heal or have dehisced",
          "Diabetic foot ulcers needing close monitoring and offloading",
          "People with diabetes, vascular disease, or lymphoedema needing ongoing wound care",
          "Clients who already have other supports at home and want wound care coordinated with them",
        ],
      },
      {
        id: "sydney-coverage",
        heading: "Where in Sydney do you provide in-home wound care?",
        body:
          "Gentle Care Nursing Services provides in-home wound care across Greater Sydney, including the Inner West, North Shore, Northern Beaches, Western Sydney, South Sydney, and the CBD and Eastern Suburbs. We work from plans set by GPs, specialists, and the wound and vascular clinics at major Sydney hospitals.",
        bullets: [
          "Royal Prince Alfred Hospital (RPA) wound and vascular services — Inner West",
          "Royal North Shore Hospital (RNSH) and the Mater — North Shore",
          "Westmead Hospital and Blacktown Hospital — Western Sydney",
          "St Vincent's Hospital and Prince of Wales Hospital — CBD and Eastern Suburbs",
          "St George Hospital (Kogarah) and Sutherland Hospital (Caringbah) — South Sydney",
          "Northern Beaches Hospital (Frenchs Forest) — Northern Beaches",
        ],
      },
      {
        id: "what-nurses-do",
        heading: "What do nurses do during home wound visits?",
        body:
          "Nurses follow your specialist or GP wound plan and keep an eye on the bigger picture of your health and comfort. Wound care at home is delivered in line with Australian wound management standards (Wounds Australia) and the protocols set by your treating team.",
        bullets: [
          "Cleanse and redress wounds using the dressing products specified in your plan",
          "Apply compression bandaging for venous leg ulcers when prescribed and clinically appropriate",
          "Check for signs of infection, poor circulation, or deteriorating skin around the wound",
          "Monitor pain, mobility, and how the wound is affecting daily life",
          "Photograph and document the wound to track healing over time",
          "Update your treating GP, specialist, or wound clinic when things improve or change",
        ],
      },
      {
        id: "who-its-for",
        heading: "Who is in-home wound care suitable for?",
        body:
          "In-home wound care suits people who are clinically stable but need regular skilled wound management at home. It works for older Australians on Support at Home or DVA, NDIS participants with complex wounds, and private clients arranging their own care.",
        bullets: [
          "Older adults with leg ulcers, pressure injuries, or surgical wounds who find clinic travel difficult",
          "People with diabetes managing foot ulcers and needing close monitoring",
          "Veterans accessing DVA Community Nursing for wound care after surgery or injury",
          "NDIS participants with chronic or complex wounds funded under their plan",
          "Families wanting wound care coordinated with other in-home supports",
        ],
      },
      {
        id: "what-to-watch-for",
        heading: "What signs of wound deterioration should families watch for?",
        body:
          "Most wounds improve gradually with consistent care, but some signs warrant earlier escalation to your treating team. Contact your GP, wound clinic, or 000 promptly if any of the following appear, and call us if you'd like a nursing review.",
        bullets: [
          "Increasing redness, swelling, warmth, or pain around the wound (possible infection)",
          "Foul-smelling discharge, pus, or sudden increase in fluid leaking from the dressing",
          "A fever above 38°C or feeling generally unwell",
          "The wound getting bigger, deeper, or developing dark/black tissue",
          "New numbness, coldness, or colour change in the limb (possible circulation problem)",
          "Sudden severe pain in the wound or limb that isn't controlled by your usual medications",
        ],
      },
      {
        id: "funding",
        heading: "How is in-home wound care funded in Sydney?",
        body:
          "Funding usually comes from one of four sources, and the right one depends on your situation. Your GP, specialist, or aged-care assessor can confirm which applies.",
        bullets: [
          "DVA Community Nursing — for eligible Veteran Card holders, by referral from your GP or treating doctor",
          "Support at Home or CHSP — for older Australians with an aged-care assessment outcome",
          "NDIS — for participants whose plan funds complex wound care or community nursing",
          "Private fee-for-service — when no funded program applies, or to top up other supports",
        ],
      },
      {
        id: "safety",
        heading: "Is home wound care safe?",
        body:
          "Yes, when it is planned properly and delivered by experienced nurses. We only manage wounds at home that are clinically appropriate, follow the plan set by your treating team, and always escalate quickly if there are signs of concern. If a wound becomes unsafe to manage at home, we work with your GP or specialist to arrange the right level of care.",
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
    title: "In-Home Care After Stroke in Sydney",
    snippetAnswer:
      "In-home care after stroke is short-term to ongoing nursing, personal care, and family education at home — across Sydney and surrounds — so recovery and rehabilitation can continue safely after acute hospital and inpatient rehab. Visits often start more frequent in the first weeks home and step down as mobility, communication, and confidence return.",
    intent: "stroke",
    primaryServiceSlug: "post-hospital-care",
    sections: [
      {
        id: "why-home",
        heading: "Why is in-home care important after a stroke?",
        body:
          "Leaving hospital or inpatient rehab after a stroke can feel uncertain. In-home support helps continue rehabilitation while reducing the risk of falls, secondary stroke, complications, and carer burnout — and bridges the gap between the structured environment of a stroke unit and managing at home.",
        bullets: [
          "Monitoring for changes in mobility, speech, swallowing, or alertness that may signal a secondary stroke or new complication",
          "Support with safe transfers, toileting, bathing, and mobility around the home",
          "Help to follow therapy programs set by your rehab team (physio, occupational therapy, speech)",
          "Medication management, including blood thinners and blood-pressure medications",
          "Family education on stroke recognition (FAST signs) and when to call 000 or the stroke team",
        ],
      },
      {
        id: "sydney-coverage",
        heading: "Where in Sydney do you provide post-stroke care?",
        body:
          "Gentle Care Nursing Services delivers post-stroke support across Greater Sydney, including the Inner West, North Shore, Northern Beaches, Western Sydney, South Sydney, and the CBD and Eastern Suburbs. We work alongside discharge planners and stroke teams at the Sydney hospitals running acute stroke units and rehabilitation services, and complement programs like the NSW Stroke Reperfusion Program.",
        bullets: [
          "Royal Prince Alfred Hospital (RPA) acute stroke unit — Inner West",
          "Royal North Shore Hospital (RNSH) acute stroke unit — North Shore",
          "Westmead Hospital acute stroke unit and Liverpool Hospital — Western Sydney",
          "St Vincent's Hospital and Prince of Wales Hospital — CBD and Eastern Suburbs",
          "Royal Rehab (Ryde) and POW Rehabilitation — common inpatient rehab pathways before home",
          "St George Hospital (Kogarah) and Sutherland Hospital (Caringbah) — South Sydney",
          "Northern Beaches Hospital (Frenchs Forest) — Northern Beaches",
        ],
      },
      {
        id: "who-benefits",
        heading: "Who benefits most from stroke support at home?",
        body:
          "Post-stroke home support is most helpful when someone is medically stable but still has mobility, communication, swallowing, or thinking changes that make day-to-day life harder. It works for older Australians on Support at Home or DVA, NDIS participants under 65 whose plans fund stroke recovery support, and private clients arranging their own care.",
        bullets: [
          "People who feel unsteady, have weakness on one side, or need help getting around the home safely",
          "Families unsure how much to assist without doing everything for their loved one",
          "Clients managing multiple follow-up appointments — neurology, rehab, GP, allied health",
          "Veterans accessing DVA-funded community nursing after a stroke",
          "Younger NDIS participants whose plan funds short-term stroke recovery support",
        ],
      },
      {
        id: "what-to-watch-for",
        heading: "What should families watch for at home, and when should they call someone?",
        body:
          "The first weeks after a stroke are when the risk of a secondary stroke or new complication is highest. Use the FAST signs and contact your stroke team or 000 immediately if any of the following appear, and call us if you'd like a nursing review.",
        bullets: [
          "Face drooping, arm weakness, or speech difficulty (FAST signs) — call 000 immediately",
          "Sudden severe headache, confusion, or loss of vision",
          "Difficulty swallowing, coughing while eating, or pocketing food (aspiration risk)",
          "New falls, especially with a possible head strike",
          "Skin breakdown over the heels, sacrum, or other pressure points if mobility is reduced",
          "Signs of low mood, withdrawal, or post-stroke depression",
        ],
      },
      {
        id: "funding",
        heading: "How is stroke-related home support funded in Sydney?",
        body:
          "Funding usually comes from one of four sources, and the right one depends on your situation. Most Sydney readers will be eligible for one of these — your discharge planner, GP, or aged-care assessor can confirm.",
        bullets: [
          "DVA Community Nursing — for eligible Veteran Card holders, by referral from your GP or treating doctor",
          "Support at Home or CHSP — for older Australians with an aged-care assessment outcome",
          "NDIS — for participants under 65 whose plan funds stroke recovery, personal care, or community nursing",
          "Private fee-for-service — when no funded program applies, or to top up other supports",
        ],
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

