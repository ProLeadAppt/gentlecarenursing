/** Review drafts only. Never import into SUBURBS, sitemap or production service schema. */
export type ReviewSection = readonly [string, readonly string[]];
export type ReviewFaq = readonly [string, string];
export interface LocalityReview {
  slug: string; name: string; eyebrow: string; focus: string; intro: string; local: string;
  sections: readonly ReviewSection[]; checklist: readonly string[]; faqs: readonly ReviewFaq[];
  sourceIds: readonly string[]; reviewQuestions: readonly string[];
}
export const LOCALITY_REVIEW_DRAFTS: readonly LocalityReview[] = [
  {
    "slug": "north-strathfield",
    "name": "North Strathfield",
    "eyebrow": "The right address. A clearer first conversation.",
    "focus": "Separate the care address from the office address and describe the support you need.",
    "intro": "If you are arranging nursing or everyday assistance in North Strathfield, start with the place where care is needed and what you would like help with. The team can discuss the proposed tasks, funding and timing before any visit is agreed.",
    "local": "City of Canada Bay Council identifies Concord Road and the Bakehouse Quarter as North Strathfield precincts. A familiar landmark can help explain the location, but the actual suburb and care address matter when arranging a visit.",
    "sections": [
      [
        "Care at home and the North Strathfield office",
        [
          "Gentle Care Nursing Services lists its office at Level 1/5 George Street, North Strathfield. The office address and the address where care is needed may be different. Use North Strathfield when that is the care location, rather than shortening it to Strathfield.",
          "Ask the team how an initial conversation or assessment would be arranged before travelling to the office. An office address does not establish a walk-in nursing clinic or an available appointment."
        ]
      ],
      [
        "Explain each kind of support",
        [
          "A request for help at home may involve nursing, personal assistance or support with a daily routine. Describe each need separately, including what you prefer to keep doing yourself.",
          "If another clinician or provider is already involved, explain their role and ask what information is needed. The proposed tasks and the people responsible for them need to be clear before a start date is agreed."
        ]
      ],
      [
        "Make the first visit practical",
        [
          "Discuss essential visit times, who may help coordinate the enquiry and any entrance or privacy needs at the home. These are questions about the individual property, not assumptions about North Strathfield homes.",
          "Ask the team to confirm the services it can consider, any assessment needed, costs and what happens if plans change. Being close to the office does not guarantee an immediate start."
        ]
      ]
    ],
    "checklist": [
      "North Strathfield as the care location, separate from office or billing details.",
      "The nursing or everyday tasks you would like help with.",
      "Essential timing, preferred start date and existing provider involvement."
    ],
    "faqs": [
      [
        "Is the office in Strathfield or North Strathfield?",
        "The business lists Level 1/5 George Street, North Strathfield. Give the actual suburb where care is needed, even if it differs from the office location."
      ],
      [
        "Can I attend the office for nursing care?",
        "Ask the team before travelling. This page does not offer a walk-in clinic or confirm that an assessment can take place at the office."
      ],
      [
        "Does living near the office mean care can start straight away?",
        "No start date is confirmed by location alone. The team needs to discuss the requested tasks, suitability and availability."
      ],
      [
        "Can I ask about nursing and daily assistance together?",
        "Describe each request separately so the team can discuss its scope, the arrangements needed and how each service would be paid for."
      ]
    ],
    "sourceIds": [
      "canadabay-main-streets",
      "business-address"
    ],
    "reviewQuestions": [
      "Confirm the office address and whether any appointments are offered there.",
      "Confirm the actual intake, assessment, secure-information and cancellation processes.",
      "Add a useful, substantiated North Strathfield operating detail if one exists; do not invent local staffing."
    ]
  },
  {
    "slug": "homebush",
    "name": "Homebush",
    "eyebrow": "Start with the home. Then the support.",
    "focus": "Identify Homebush clearly and prepare for access, privacy and existing support arrangements.",
    "intro": "When enquiring about care at home in Homebush, describe both the support you want and what would make a visit easier to organise. A clear first conversation helps the team consider the requested tasks and practical arrangements.",
    "local": "Strathfield Council lists Homebush and Homebush West as separate town centres. Use the actual care location when making an enquiry rather than relying on the broader Homebush name.",
    "sections": [
      [
        "Be clear about which Homebush address you mean",
        [
          "Give the suburb for the home where support is needed, even if a family member or referrer lives elsewhere. Homebush, Homebush West and a nearby landmark should not be treated as interchangeable address details.",
          "If you are unsure how the address is recorded, check it before agreeing a visit. Ask the team how the exact address and any necessary access instructions should be shared."
        ]
      ],
      [
        "If a journey uses Homebush Station",
        [
          "Transport for NSW identifies different accessibility arrangements across Homebush Station platforms. If a planned journey requires step-free access, check the platform for the actual service and current lift or service disruptions rather than relying on the station name alone.",
          "A journey to an appointment and a care visit at home are separate arrangements. Explain any assistance you want considered, and confirm who will provide it before relying on a travel plan. This page does not offer transport or accompaniment."
        ]
      ],
      [
        "Think through access and privacy",
        [
          "If the home has a shared entrance, stairs, a lift or an intercom, explain what a visitor needs to know. Discuss a suitable private space for the proposed care and who may be present.",
          "These details depend on the home. They are not assumptions about the type of housing, access or needs of Homebush residents. Keep entry codes and health records out of a general website message."
        ]
      ],
      [
        "Fit the discussion around existing support",
        [
          "Tell the team if family members, support workers or other providers already help at home. Explain which tasks you are asking Gentle Care to consider and which arrangements you want to keep.",
          "Before relying on a first visit, discuss the proposed service, who is responsible for it, funding or private payment, timing and costs. A general enquiry does not reserve a visit."
        ]
      ]
    ],
    "checklist": [
      "Homebush as the care suburb and the address ready for the agreed intake channel.",
      "The requested tasks and the daily routine you want to protect.",
      "Relevant access or privacy needs, without sending entry codes."
    ],
    "faqs": [
      [
        "Should I use Homebush or Homebush West in my enquiry?",
        "Use the suburb recorded for the address where care is needed. If the address is unclear, check it rather than assuming the names refer to the same locality."
      ],
      [
        "Can I enquire about care in an apartment or shared home?",
        "Explain the requested support and the access arrangements for that property. The team will need to consider the actual tasks and setting before agreeing to visits."
      ],
      [
        "Should I include a door code in the first message?",
        "No. Give the suburb and a brief support request, then ask how necessary access instructions can be shared securely."
      ],
      [
        "What if another provider already visits the home?",
        "Explain who is involved and the proposed tasks. Agree responsibilities and what information may be shared with your permission."
      ]
    ],
    "sourceIds": [
      "strathfield-town-centres",
      "homebush-boundary-status",
      "tfnsw-homebush-station"
    ],
    "reviewQuestions": [
      "Confirm the actual Homebush intake and service scope.",
      "Review the added Homebush Station journey-planning detail; it does not change the approved clinical/service wording or promise transport.",
      "Boundary consultation was discontinued in May 2026; do not reuse old proposed-boundary claims."
    ]
  },
  {
    "slug": "concord-west",
    "name": "Concord West",
    "eyebrow": "Plan the return home, one question at a time.",
    "focus": "Distinguish the care location from the hospital and prepare a clear handover discussion.",
    "intro": "If you are arranging support in Concord West after a hospital stay, start with where the person will be staying and what help has been recommended. The treating team and the proposed home-care provider may need to answer different questions before arrangements are agreed.",
    "local": "City of Canada Bay Council describes Concord West’s local centre around Victoria Avenue and Queen Street near the station. Concord Hospital is on Hospital Road. A hospital reference here is local context, not evidence of a Gentle Care partnership or referral arrangement.",
    "sections": [
      [
        "Confirm where recovery will take place",
        [
          "The address after discharge may be the person’s own home or a relative’s home. Use the actual suburb and explain if the location will change after the first few days.",
          "A hospital name or station landmark does not identify the home entrance or access arrangements. Discuss those details separately and ask how to share the exact address securely."
        ]
      ],
      [
        "Ask the treating team before leaving hospital",
        [
          "Healthdirect recommends discussing the discharge summary, medicines, follow-up appointments and support needed at home with the treating team. Ask who to contact if you have questions after discharge.",
          "For a care enquiry, explain the general support requested and who holds the discharge information. Agree which documents are needed and how they can be shared securely. A proposed discharge date does not confirm that a home-care visit is available."
        ]
      ],
      [
        "Make responsibilities clear",
        [
          "Discuss which tasks require a nursing assessment, which support is already arranged and who may help coordinate the first conversation. Ask what must be in place before a first visit can be agreed.",
          "Confirm timing, funding or payment, access and any required referral information. Do not assume that naming Concord Hospital creates priority access or a direct handover arrangement with Gentle Care."
        ]
      ]
    ],
    "checklist": [
      "Concord West as the actual place of care after discharge.",
      "The general support recommended and who holds the discharge information.",
      "The proposed date, existing support and the person authorised to coordinate."
    ],
    "faqs": [
      [
        "Does Gentle Care have a partnership with Concord Hospital?",
        "No partnership is established by this page. The hospital is mentioned for local context; ask the team what referral information it needs for the care you are seeking."
      ],
      [
        "Can a visit be arranged for the day of discharge?",
        "Give the expected date and explain the support requested. The team must confirm suitability and availability before you rely on a visit."
      ],
      [
        "What if I will stay with family after leaving hospital?",
        "Give the actual care suburb and explain whether that address is temporary. Discuss any later move before visit arrangements are agreed."
      ],
      [
        "Should I send a discharge summary with my first enquiry?",
        "Start with a brief description of the support requested. Ask which documents are needed and how to share them securely with the appropriate permission."
      ]
    ],
    "sourceIds": [
      "canadabay-main-streets",
      "concord-hospital",
      "healthdirect-discharge"
    ],
    "reviewQuestions": [
      "Gemma to review the discharge-planning wording and actual referral process.",
      "Confirm which post-hospital tasks can be considered and how suitability and start dates are assessed.",
      "No hospital partnership, referral priority or guaranteed discharge-day visit is asserted."
    ]
  },
  {
    "slug": "homebush-west",
    "name": "Homebush West",
    "eyebrow": "A familiar name. The precise care location.",
    "focus": "Clarify Homebush West and Flemington references, then discuss the actual home and requested tasks.",
    "intro": "For care at home in Homebush West, a useful enquiry starts with the correct suburb and the help you want considered. Explain any practical access or communication needs so they can be discussed alongside the proposed support.",
    "local": "Strathfield Council describes Homebush West’s town centre south of Flemington Station. You may use the station as a landmark, but include the actual suburb and address where care will take place.",
    "sections": [
      [
        "Use the care address as the reference point",
        [
          "Homebush West and Homebush have separate town-centre listings. If a family member describes the location as Flemington, confirm the suburb recorded for the actual home rather than assuming the landmark is enough.",
          "Distinguish the care address from a referrer’s office or a billing address. Ask how the exact address and arrival contact should be supplied before a visit is agreed."
        ]
      ],
      [
        "Describe access at your own property",
        [
          "Tell the team about any relevant stairs, lift, shared entrance or space needed for the proposed care. Do not assume a visitor can use an alternative entrance or move equipment without discussing it.",
          "A general description of the town centre cannot establish access at a particular home. Keep the conversation specific to the property and leave entry codes out of the initial website message."
        ]
      ],
      [
        "Explain communication and existing support",
        [
          "Say how you prefer to communicate and whether someone may help with the enquiry. If a particular language or communication aid is important, ask what arrangements can be considered; no worker match is promised here.",
          "Describe the requested nursing or everyday tasks separately from support already provided by family or another provider. Check responsibilities, timing, costs and suitability before depending on a first visit."
        ]
      ]
    ],
    "checklist": [
      "The recorded Homebush West care address, not only the Flemington landmark.",
      "The requested tasks and any relevant property-access considerations.",
      "Communication preferences, authorised contacts and existing support."
    ],
    "faqs": [
      [
        "Should I write Flemington or Homebush West?",
        "Give the suburb recorded for the care address. You can add Flemington Station as a landmark if helpful, but it does not replace the actual address."
      ],
      [
        "Does every Homebush West apartment have stairs?",
        "This page makes no assumption about individual buildings. Explain the access arrangements at the home where care is requested."
      ],
      [
        "Can I request support in my preferred language?",
        "Tell the team what would help you communicate and ask which arrangements may be available. This page does not promise a language-matched worker."
      ],
      [
        "Can an existing support worker remain involved?",
        "Discuss the roles, timing and information that may be shared with your permission. Do not assume another provider’s attendance or responsibilities."
      ]
    ],
    "sourceIds": [
      "strathfield-homebush-west",
      "strathfield-town-centres"
    ],
    "reviewQuestions": [
      "Confirm the Homebush West enquiry, access and communication arrangements.",
      "Do not imply dedicated suburb staff, a transport service or a language guarantee.",
      "Add first-hand local service detail only if it is substantiated and useful."
    ]
  },
  {
    "slug": "rhodes",
    "name": "Rhodes",
    "eyebrow": "Care that is planned around your home.",
    "focus": "Think through building access and separate nursing at home from community-support requests.",
    "intro": "When enquiring about care in Rhodes, describe the support you need and how a visitor would reach the home. If you also want assistance outside the home, raise that as a separate request so each part can be discussed clearly.",
    "local": "City of Canada Bay Council identifies Rhodes as a peninsula on the Parramatta River. That local context does not describe the access arrangements at your home or establish which care services can be provided there.",
    "sections": [
      [
        "Plan the route from entrance to care space",
        [
          "If the home has an intercom, shared entrance or lift, explain the access arrangements that could affect a visit. Ask what should happen if the usual entrance or lift is unavailable.",
          "Where equipment is involved, discuss access and the space needed for the proposed care. These are questions about the individual property, not assumptions that all Rhodes residents live in apartments or have the same needs."
        ]
      ],
      [
        "Separate home-care and community goals",
        [
          "Nursing at home and assistance with an outing can involve different tasks and arrangements. Describe each request separately rather than assuming a nursing visit includes transport or accompaniment.",
          "Ask what support the team can consider, who would provide it and how the costs or funding would be handled. A local venue or community destination does not establish a provider partnership."
        ]
      ],
      [
        "Name the destination, not only the Rhodes landmark",
        [
          "The Connection has different venue spaces, and Council publishes visitor information for the precinct beside Bennelong Bridge and the Homebush Bay Corso. If an outing is part of your enquiry, name the particular space or activity and the meeting entrance, not only the precinct.",
          "Check the venue’s current access information and the route appropriate to your needs. Keep the destination and timing separate from the help you are asking Gentle Care to consider. A community venue listing is not a provider partnership or an agreed outing."
        ]
      ],
      [
        "Agree who is responsible for each task",
        [
          "If family members, support workers or clinicians are already involved, explain their roles and your preferences about contact and information sharing. Ask who needs to be present for a proposed handover.",
          "Before relying on a first visit, confirm the requested tasks, any assessment or referral information, suitable timing and access. An existing plan, another provider’s involvement or a nearby location does not confirm availability."
        ]
      ]
    ],
    "checklist": [
      "Rhodes as the care location and any relevant building-access needs.",
      "Nursing, everyday assistance and community requests described separately.",
      "Existing providers, authorised contacts and essential timing."
    ],
    "faqs": [
      [
        "Can I enquire if I live in a Rhodes apartment?",
        "Explain the requested support and the access arrangements for your home. The team needs to consider the actual setting and tasks before agreeing to visits."
      ],
      [
        "What if the lift or usual entrance cannot be used?",
        "Tell the team as soon as a proposed visit may be affected and ask how it should be handled. Do not assume another route will be suitable."
      ],
      [
        "Can a nursing visit include a trip out?",
        "Ask separately about the assistance you want. Nursing, transport and community support may require different arrangements; this page promises none of those additions."
      ],
      [
        "Can my existing support worker join the discussion?",
        "Discuss that with your permission and agree what information may be shared. Each provider’s role and attendance need to be confirmed."
      ]
    ],
    "sourceIds": [
      "canadabay-main-streets",
      "canadabay-connection-visitor"
    ],
    "reviewQuestions": [
      "Confirm the practical process when building access or equipment access changes.",
      "Confirm which home-care and community-support requests can be considered; do not imply transport or accompaniment.",
      "Review the added destination-specific Rhodes detail; no venue partnership, transport or accompaniment is promised."
    ]
  }
];
export const LOCALITY_REVIEW_SOURCES = [
  {
    "id": "canadabay-main-streets",
    "label": "City of Canada Bay: main streets and local centres",
    "url": "https://www.canadabay.nsw.gov.au/lifestyle/our-area/main-streets",
    "supports": "North Strathfield precinct names, Concord West local-centre context and Rhodes peninsula identity.",
    "limits": "Geography only; not care coverage, staffing, medical demand or partnerships.",
    "checked": "2026-11-12"
  },
  {
    "id": "business-address",
    "label": "Business address in the current site source",
    "url": null,
    "supports": "SITE.address lists Level 1/5 George St, North Strathfield NSW 2137.",
    "limits": "Business-supplied source, not an independent GBP or walk-in-clinic verification.",
    "checked": "2026-11-12"
  },
  {
    "id": "strathfield-town-centres",
    "label": "Strathfield Council: town and local centres",
    "url": "https://www.strathfield.nsw.gov.au/Council/About-Strathfield/Town-and-Local-Centres",
    "supports": "Separate Homebush and Homebush West centre identities.",
    "limits": "Official indexed excerpts support the naming distinction; direct index access returned 403 during the bounded check. No precise boundary, patient-demand, property-access or coverage claim.",
    "checked": "2026-11-12"
  },
  {
    "id": "strathfield-homebush-west",
    "label": "Strathfield Council: Homebush West Town Centre",
    "url": "https://www.strathfield.nsw.gov.au/Council/About-Strathfield/Town-and-Local-Centres/Homebush-West-Town-Centre",
    "supports": "Town centre south of Flemington Station.",
    "limits": "No inference about an individual home, resident or worker language.",
    "checked": "2026-11-12"
  },
  {
    "id": "homebush-boundary-status",
    "label": "Strathfield Council: discontinued Homebush consultation",
    "url": "https://haveyoursay.strathfield.nsw.gov.au/april-2026-proposed-homebush-south-railway-boundary-change",
    "supports": "Consultation discontinued on 26 May 2026; no plans to progress. Review context only.",
    "limits": "Do not describe the old proposed boundary as enacted or still pending.",
    "checked": "2026-11-12"
  },
  {
    "id": "concord-hospital",
    "label": "Concord Hospital: emergency contact details",
    "url": "https://www.slhd.nsw.gov.au/concord/department-emergency-contact.html",
    "supports": "Concord Hospital is on Hospital Road.",
    "limits": "No provider partnership, priority referral or admission/care advice.",
    "checked": "2026-11-12"
  },
  {
    "id": "healthdirect-discharge",
    "label": "Healthdirect: going home from hospital",
    "url": "https://www.healthdirect.gov.au/healthcare-and-services/general-health/going-home-from-hospital",
    "supports": "Questions for the treating team about discharge summary, medicines, follow-up and support at home.",
    "limits": "General education only; not individual clinical advice or Gentle Care availability.",
    "checked": "2026-11-12"
  },
  {
    "id": "dva-home-nursing",
    "label": "DVA: nursing help at home",
    "url": "https://www.dva.gov.au/what-we-help-with/care-at-home-and-aged-care-services/living-independently/nursing-help-at-home",
    "supports": "Clinical need, eligibility and referral assessment apply.",
    "limits": "Does not independently establish Gentle Care contracting or current capacity.",
    "checked": "2026-11-12"
  },
  {
    "id": "ndis-sil",
    "label": "NDIS: supported independent living",
    "url": "https://www.ndis.gov.au/participants/home-and-living/types-home-and-living-supports/what-supported-independent-living-sil",
    "supports": "SIL is support-worker funding, not housing.",
    "limits": "Does not establish Gentle Care SIL provision or registration scope. No SIL service offer added.",
    "checked": "2026-11-12"
  },
  {
    "id": "tfnsw-homebush-station",
    "label": "Transport for NSW: Homebush Station accessibility",
    "url": "https://transportnsw.info/stop?q=214010",
    "supports": "Accessibility differs by platform; confirms why a station landmark is not an accessible-journey plan.",
    "limits": "Check current service platform and disruptions. No Gentle Care transport, accompaniment or clinical need inferred.",
    "checked": "2026-11-12"
  },
  {
    "id": "canadabay-connection-visitor",
    "label": "City of Canada Bay: The Connection visitor information",
    "url": "https://www.canadabay.nsw.gov.au/community/facilities-and-venues/the-connection/visitor-information",
    "supports": "Separate venue spaces and visitor access context beside Bennelong Bridge and the Homebush Bay Corso.",
    "limits": "No venue partnership, care availability, universal accessible route or transport provision established.",
    "checked": "2026-11-12"
  }
] as const;

export function isLocalityReviewEnabled(env: { CONTEXT?: string; NODE_ENV?: string } = process.env): boolean {
  return env.CONTEXT === "deploy-preview" || env.NODE_ENV === "development";
}
export function getLocalityReview(slug: string): LocalityReview | undefined {
  return LOCALITY_REVIEW_DRAFTS.find((draft) => draft.slug === slug);
}
