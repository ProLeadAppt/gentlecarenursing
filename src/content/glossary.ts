/**
 * Glossary of NDIS / DVA / aged care / Sydney in-home nursing terminology.
 *
 * Built for AEO/GEO: AI engines (Google AI Overviews, ChatGPT, Perplexity,
 * Claude, Gemini) extract definitions verbatim when answering "what is X"
 * queries. A definition page with DefinedTermSet schema is one of the
 * highest-yield AI-citation surfaces for jargon-heavy domains like
 * disability funding, veterans' care, and aged care — most providers don't
 * publish glossaries, and the ones that do tend to be government-only.
 *
 * Voice rules:
 *   - DVA wording exact: "DVA Community Nursing" / "DVA Contracted
 *     Community Nursing Provider"
 *   - Definitions are factual and balanced; no marketing language inside
 *     the definitions themselves
 *   - "Experienced nurses" / "AHPRA-registered nurse" used appropriately
 *
 * Factual basis (every definition is anchored to a citable source):
 *   - NDIS terms — NDIS Act 2013, NDIS Quality and Safeguards Commission
 *   - DVA terms — Treatment Principles, DVA Notes for Community Nursing
 *     Providers
 *   - Aged care — Aged Care Act 2024, Support at Home program
 *   - Clinical — standard Australian healthcare terminology
 */

export interface GlossaryTerm {
  /** Slug for the in-page anchor and DefinedTerm @id */
  slug: string;
  /** The term itself (rendered as the <dt>) */
  term: string;
  /** Common alternate names / acronyms — surfaced as alternateName in schema */
  alternateNames?: string[];
  /** Category for grouping in the page UI */
  category: "NDIS" | "DVA" | "Aged Care" | "Clinical" | "Funding" | "Sydney";
  /** The definition itself — kept 40-80 words, factual, citable */
  definition: string;
  /** Optional internal link to the page on our site that goes deeper */
  relatedHref?: string;
  /** Label for the relatedHref link */
  relatedLabel?: string;
}

export const GLOSSARY: readonly GlossaryTerm[] = [
  // -------------------------------------------------------------------------
  // NDIS terms
  // -------------------------------------------------------------------------
  {
    slug: "ndis",
    term: "NDIS",
    alternateNames: ["National Disability Insurance Scheme"],
    category: "NDIS",
    definition:
      "The National Disability Insurance Scheme — the Australian Government scheme that funds reasonable and necessary supports for people under 65 with a permanent and significant disability. The NDIS replaced state-based disability schemes from 2013 onwards and is administered by the National Disability Insurance Agency (NDIA).",
    relatedHref: "/ndis",
    relatedLabel: "Our NDIS services",
  },
  {
    slug: "registered-ndis-provider",
    term: "Registered NDIS Provider",
    category: "NDIS",
    definition:
      "A service that has been independently audited against the NDIS Practice Standards and approved by the NDIS Quality and Safeguards Commission. Registered providers can be used by all NDIS participants regardless of how their plan is managed, and can deliver supports that are restricted to registered providers (such as specialist behaviour support and SDA).",
    relatedHref: "/compare/registered-ndis-provider-vs-non-registered",
    relatedLabel: "Registered vs non-registered comparison",
  },
  {
    slug: "non-registered-ndis-provider",
    term: "Non-Registered NDIS Provider",
    category: "NDIS",
    definition:
      "An NDIS service that hasn't gone through the formal Commission audit process. Still bound by the NDIS Code of Conduct and worker screening, and can be used by plan-managed and self-managed participants. NDIA-managed participants can only use registered providers.",
    relatedHref: "/compare/registered-ndis-provider-vs-non-registered",
    relatedLabel: "Registered vs non-registered comparison",
  },
  {
    slug: "ndia-managed",
    term: "NDIA-Managed",
    alternateNames: ["Agency-managed"],
    category: "NDIS",
    definition:
      "A plan-management option where the NDIA pays providers directly on the participant's behalf. NDIA-managed participants can only use registered NDIS providers. Sometimes called Agency-managed.",
  },
  {
    slug: "plan-managed",
    term: "Plan-Managed",
    category: "NDIS",
    definition:
      "A plan-management option where a third-party plan manager handles invoices and claims on the participant's behalf. Plan-managed participants can use both registered and non-registered NDIS providers.",
  },
  {
    slug: "self-managed",
    term: "Self-Managed",
    category: "NDIS",
    definition:
      "A plan-management option where the participant (or their nominee) directly manages NDIS funding — paying providers, keeping records, and claiming reimbursement from the NDIA. Self-managed participants can use any provider including non-registered.",
  },
  {
    slug: "support-coordinator",
    term: "Support Coordinator",
    category: "NDIS",
    definition:
      "An NDIS-funded role that helps participants understand their plan, connect with providers, and build skills to manage their own supports. Support coordinators typically work for an independent organisation and are not employed by the providers they recommend.",
    relatedHref: "/referrers",
    relatedLabel: "For support coordinators",
  },
  {
    slug: "ndis-worker-screening-check",
    term: "NDIS Worker Screening Check",
    alternateNames: ["NDISWC"],
    category: "NDIS",
    definition:
      "A national check that workers in risk-assessed NDIS roles must hold. It assesses whether a worker poses an unacceptable risk to people with disability. All registered NDIS provider workers in risk-assessed roles must hold a current check.",
  },

  // -------------------------------------------------------------------------
  // DVA terms
  // -------------------------------------------------------------------------
  {
    slug: "dva-community-nursing",
    term: "DVA Community Nursing",
    category: "DVA",
    definition:
      "An in-home nursing program funded by the Department of Veterans' Affairs for eligible Veteran Card holders, governed by the Treatment Principles and the Notes for Community Nursing Providers. Scope includes nursing assessment, clinical nursing care, palliative care, and personal care delegated by a nurse. Delivered at no out-of-pocket cost for clinically required care.",
    relatedHref: "/dva",
    relatedLabel: "Our DVA Community Nursing services",
  },
  {
    slug: "dva-contracted-community-nursing-provider",
    term: "DVA Contracted Community Nursing Provider",
    category: "DVA",
    definition:
      "A provider on the DVA Panel of Community Nursing Providers, contracted to deliver DVA Community Nursing services to eligible Veteran Card holders. The DVA publishes the ACT/NSW panel as a PDF, listing providers by LGA. Gentle Care Nursing Services is on the current April 2026 panel.",
  },
  {
    slug: "gold-card",
    term: "DVA Gold Card",
    category: "DVA",
    definition:
      "A DVA-issued health card that covers eligible veterans for all clinically required healthcare, including in-home nursing under DVA Community Nursing. Gold Card holders are generally eligible for DVA Community Nursing subject to clinical assessment.",
  },
  {
    slug: "white-card",
    term: "DVA White Card",
    category: "DVA",
    definition:
      "A DVA-issued health card that covers eligible veterans for treatment of specific accepted conditions linked to their service. White Card holders may be eligible for DVA Community Nursing for accepted conditions only.",
  },

  // -------------------------------------------------------------------------
  // Aged Care
  // -------------------------------------------------------------------------
  {
    slug: "support-at-home",
    term: "Support at Home",
    category: "Aged Care",
    definition:
      "The Australian Government's in-home aged care program, which replaced Home Care Packages from 1 November 2025. Support at Home funds in-home nursing, personal care, allied health, and other services for older Australians assessed as needing them. Funding is allocated by level and means-tested.",
    relatedHref: "/aged-care",
    relatedLabel: "Our aged care services",
  },
  {
    slug: "chsp",
    term: "CHSP",
    alternateNames: ["Commonwealth Home Support Programme"],
    category: "Aged Care",
    definition:
      "The Commonwealth Home Support Programme — an entry-level in-home aged care program for older Australians with lower-needs requirements. CHSP is government-subsidised and has small client contributions, and runs alongside Support at Home for more complex needs.",
  },
  {
    slug: "acat",
    term: "ACAT",
    alternateNames: ["ACAS", "Aged Care Assessment Team"],
    category: "Aged Care",
    definition:
      "The Aged Care Assessment Team (or ACAS in Victoria) — government-funded teams that assess older Australians to determine eligibility for government-funded aged care services, including Support at Home, CHSP, residential aged care, and respite. Referrals are made through My Aged Care.",
  },
  {
    slug: "my-aged-care",
    term: "My Aged Care",
    category: "Aged Care",
    definition:
      "The Australian Government's central entry point for aged care services. Older Australians (or their family) contact My Aged Care to be assessed, find services, and understand funding options. The My Aged Care website also lists every approved provider and current fees.",
  },
  {
    slug: "an-acc",
    term: "AN-ACC",
    alternateNames: ["Australian National Aged Care Classification"],
    category: "Aged Care",
    definition:
      "The funding model for residential aged care in Australia. Each resident has a clinical funding classification assessed and reviewed regularly, which determines the per-resident funding the aged care home receives from the government. Replaced the older ACFI model in 2022.",
  },

  // -------------------------------------------------------------------------
  // Clinical
  // -------------------------------------------------------------------------
  {
    slug: "ahpra",
    term: "AHPRA",
    alternateNames: ["Australian Health Practitioner Regulation Agency"],
    category: "Clinical",
    definition:
      "The national agency that registers and regulates health practitioners in Australia — including nurses, doctors, physiotherapists, and other registered professions. An AHPRA-registered nurse holds current registration with the Nursing and Midwifery Board of Australia under AHPRA.",
  },
  {
    slug: "peg-feeding",
    term: "PEG Feeding",
    alternateNames: ["Percutaneous endoscopic gastrostomy feeding"],
    category: "Clinical",
    definition:
      "Enteral nutrition delivered through a PEG (percutaneous endoscopic gastrostomy) tube — a feeding tube inserted directly into the stomach through the abdominal wall. PEG feeding is used when oral intake is unsafe or insufficient. Home PEG feeding requires regular site care, feeding regime support, and monitoring.",
    relatedHref: "/services/complex-care",
    relatedLabel: "Complex care including PEG support",
  },
  {
    slug: "tracheostomy",
    term: "Tracheostomy",
    alternateNames: ["Tracheostomy management"],
    category: "Clinical",
    definition:
      "A surgically-created opening in the front of the neck into the trachea (windpipe), with a tube placed to maintain the airway. Home tracheostomy management includes airway care, tube changes as directed by the treating team, stoma site monitoring, and suctioning support.",
    relatedHref: "/services/complex-care",
    relatedLabel: "Complex care including tracheostomy",
  },
  {
    slug: "catheter-management",
    term: "Catheter Management",
    alternateNames: ["Indwelling urinary catheter care"],
    category: "Clinical",
    definition:
      "Care of urinary catheters in the home — indwelling (long-term in place) or intermittent (inserted and removed for each emptying). Includes monitoring for infection, troubleshooting blockages, and changes per the urology team's plan.",
    relatedHref: "/services/complex-care",
    relatedLabel: "Complex care including catheter management",
  },
  {
    slug: "complex-care",
    term: "Complex Care",
    category: "Clinical",
    definition:
      "Specialist in-home nursing for people with higher-than-routine clinical needs — typically including PEG feeding, tracheostomy management, catheter care, complex wound care, or coordinated management of multiple chronic conditions. Delivered by experienced nurses with clinical oversight.",
    relatedHref: "/services/complex-care",
    relatedLabel: "Our complex care service",
  },
  {
    slug: "palliative-care",
    term: "Palliative Care",
    category: "Clinical",
    definition:
      "Care focused on comfort, symptom management, and family support for people with serious or life-limiting illness — at any stage of disease, not only the final weeks. In-home palliative care works alongside specialist palliative teams (such as Sacred Heart Health Service at St Vincent's in Sydney) to support people remaining at home.",
    relatedHref: "/services/palliative-care",
    relatedLabel: "Our palliative care service",
  },

  // -------------------------------------------------------------------------
  // Funding
  // -------------------------------------------------------------------------
  {
    slug: "core-supports",
    term: "Core Supports",
    category: "Funding",
    definition:
      "One of the NDIS funding categories. Core Supports includes Assistance with Daily Life — which can fund in-home personal care, household tasks, and community participation. Core Supports is flexible across the four sub-categories.",
  },
  {
    slug: "capacity-building",
    term: "Capacity Building",
    category: "Funding",
    definition:
      "An NDIS funding category that funds supports aimed at building a participant's independence and skills — such as support coordination, therapy, employment supports, and capacity-building daily activities. Capacity Building funds can only be used within their specific sub-category.",
  },

  // -------------------------------------------------------------------------
  // Sydney
  // -------------------------------------------------------------------------
  {
    slug: "out-of-hospital-care",
    term: "Out of Hospital Care",
    alternateNames: ["OHC"],
    category: "Sydney",
    definition:
      "NSW Health's framework for delivering hospital-level support to patients at home, either as a substitute for inpatient admission or as part of safe earlier discharge. Out of Hospital Care includes Hospital in the Home (HITH) and rehabilitation programs delivered across NSW Local Health Districts.",
    relatedHref: "/services/post-hospital-care",
    relatedLabel: "Post-hospital care at home",
  },
  {
    slug: "hospital-in-the-home",
    term: "Hospital in the Home",
    alternateNames: ["HITH"],
    category: "Sydney",
    definition:
      "A NSW Health program where hospital-level care is delivered at home for patients who would otherwise be admitted or extended in hospital. HITH is hospital-led and hospital-funded, run through Local Health Districts. Private providers like Gentle Care complement HITH with step-down support, not replace it.",
    relatedHref: "/services/hospital-at-home",
    relatedLabel: "Hospital-at-home & step-down care",
  },
] as const;

/** Groups terms by category for the page UI */
export function getGroupedGlossary(): readonly { category: string; terms: readonly GlossaryTerm[] }[] {
  const categories: GlossaryTerm["category"][] = [
    "NDIS",
    "DVA",
    "Aged Care",
    "Clinical",
    "Funding",
    "Sydney",
  ];
  return categories.map((category) => ({
    category,
    terms: GLOSSARY.filter((t) => t.category === category),
  }));
}
