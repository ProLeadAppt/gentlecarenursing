/**
 * Content for /compare/registered-ndis-provider-vs-non-registered.
 *
 * Strategy: balanced, plain-English comparison page targeting query 10 in
 * docs/AI_VISIBILITY_LOG.md ("registered NDIS provider vs non-registered
 * NDIS provider"). The AI baseline run found zero Sydney-based providers
 * cited on that query, so the lane is wide open for whoever publishes the
 * most genuinely useful, unbiased side-by-side.
 *
 * Voice rules apply (per .agents/product-marketing-context.md):
 *   - Don't oversell registration. Non-registered has legitimate use cases.
 *   - "Care professional" / "support worker" outside regulatory contexts.
 *   - "Registered NDIS provider" / "DVA Contracted Community Nursing
 *     Provider" exact when naming Gentle Care's status.
 *
 * Factual basis (anchored to NDIS Quality and Safeguards Commission guidance
 * and the NDIS Act 2013):
 *   - Only NDIA-managed participants can use registered providers exclusively.
 *   - Self-managed and plan-managed participants can use either.
 *   - Specialist behaviour support, SDA, and high-intensity daily personal
 *     activities require registration to be claimed by NDIA-managed
 *     participants.
 *   - Registered providers must comply with the NDIS Practice Standards and
 *     are independently audited.
 */

export interface ComparisonRow {
  /** Short label for the criterion (left column of the table). */
  criterion: string;
  /** What it looks like for a registered provider. Plain text, one sentence. */
  registered: string;
  /** What it looks like for a non-registered provider. Plain text, one sentence. */
  nonRegistered: string;
  /** Optional caveat / "depends on" footnote shown under the row. */
  note?: string;
}

export interface ComparePageContent {
  /** Page title used as both <h1> and meta title (truncated for meta). */
  h1: string;
  metaTitle: string;
  metaDescription: string;
  canonicalPath: string;

  /**
   * Self-contained 50-60 word answer for the AI-Overview / featured-snippet
   * intent. Rendered immediately below the H1, also used as the JSON-LD
   * description.
   */
  snippetAnswer: string;

  /** Subhead under the H1, sets up the comparison framing. */
  intro: string;

  /** Side-by-side table — the citable unit AI engines extract first. */
  comparisonRows: readonly ComparisonRow[];

  /** Body sections, each with a question-style H2 and a 40-60 word answer. */
  sections: readonly {
    id: string;
    /** H2 heading, written as a question. */
    heading: string;
    /** Lead paragraph — 40-60 words, self-contained, citable. */
    leadParagraph: string;
    /** Optional supporting paragraphs. Plain text, one paragraph per element. */
    body?: readonly string[];
    /** Optional bullet list rendered after the body. */
    bullets?: readonly string[];
  }[];

  /** FAQ block at the bottom, also emitted as FAQPage JSON-LD. */
  faqs: readonly {
    id: string;
    question: string;
    answer: string;
  }[];

  /** Closing — the only "Gentle Care" mention on the page. Soft, factual. */
  closing: {
    heading: string;
    body: string;
    /** Internal links to surface in the closing block. */
    internalLinks: readonly { href: string; label: string }[];
  };
}

export const COMPARE_REGISTERED_VS_UNREGISTERED: ComparePageContent = {
  h1: "Registered NDIS Provider vs Non-Registered: A Plain-English Comparison",
  metaTitle:
    "Registered vs Non-Registered NDIS Provider — Plain-English Guide",
  metaDescription:
    "Side-by-side comparison of registered and non-registered NDIS providers. What each can deliver, who can use them, and how to choose. Sydney-focused, plain English.",
  canonicalPath: "/compare/registered-ndis-provider-vs-non-registered",
  snippetAnswer:
    "A registered NDIS provider is audited against the NDIS Practice Standards and can deliver the full range of supports — including specialist behaviour support, SDA, and high-intensity supports for NDIA-managed participants. A non-registered provider has more flexibility on pricing and scope, but cannot be claimed by NDIA-managed participants and cannot deliver certain regulated supports. Self-managed and plan-managed participants can use either.",
  intro:
    "Both registered and non-registered NDIS providers can deliver excellent care. Which one is right for you depends on how your NDIS plan is managed, what supports you need, and what trade-offs you're comfortable with on price, accountability, and choice. This page lays out the key differences side-by-side, in plain English.",

  comparisonRows: [
    {
      criterion: "Audited by the NDIS Commission",
      registered:
        "Yes — assessed against the NDIS Practice Standards by an approved quality auditor on a recurring cycle.",
      nonRegistered:
        "No — but still bound by the NDIS Code of Conduct and worker screening requirements.",
    },
    {
      criterion: "Who can use them",
      registered:
        "All NDIS participants — self-managed, plan-managed, and NDIA-managed.",
      nonRegistered:
        "Self-managed and plan-managed participants only. NDIA-managed participants cannot use non-registered providers.",
    },
    {
      criterion: "Specialist supports they can deliver",
      registered:
        "Includes specialist behaviour support, Specialist Disability Accommodation (SDA), high-intensity daily personal activities, and other regulated supports.",
      nonRegistered:
        "Cannot deliver supports that are restricted to registered providers under the NDIS rules.",
      note: "The full list of registration-only supports is published by the NDIS Quality and Safeguards Commission and changes over time.",
    },
    {
      criterion: "Pricing flexibility",
      registered:
        "Bound by the NDIS Pricing Arrangements and Price Limits — cannot charge above the published cap.",
      nonRegistered:
        "Same price caps apply when claiming under NDIS funding, but more flexibility on bundled or non-NDIS services.",
    },
    {
      criterion: "Complaints pathway",
      registered:
        "Complaints can be made directly to the NDIS Commission, which investigates and can apply sanctions.",
      nonRegistered:
        "Complaints can still be made to the NDIS Commission for any registered worker conduct, but provider-level enforcement is more limited.",
    },
    {
      criterion: "Worker screening",
      registered:
        "All workers must hold an NDIS Worker Screening Check.",
      nonRegistered:
        "Workers should hold an NDIS Worker Screening Check; participants and plan managers should confirm before engaging.",
    },
    {
      criterion: "Continuity if registration changes",
      registered:
        "Registration is renewed every 3 years; participants are unaffected day-to-day.",
      nonRegistered:
        "No registration to lose; participants choose to continue or change provider directly.",
    },
    {
      criterion: "Typical scope (in-home nursing, Sydney)",
      registered:
        "In-home nursing, complex care (PEG, tracheostomy, catheter), personal care, community participation, NDIS plan management coordination.",
      nonRegistered:
        "Personal care, community participation, household tasks, and basic support — clinical nursing scope is rarer outside registered providers.",
    },
  ],

  sections: [
    {
      id: "what-is-a-registered-ndis-provider",
      heading: "What is a registered NDIS provider?",
      leadParagraph:
        "A registered NDIS provider is a service that has been independently audited against the NDIS Practice Standards and approved by the NDIS Quality and Safeguards Commission. Registration covers specific support categories (called registration groups), and the provider must be re-audited every three years to stay registered.",
      body: [
        "Registration is the mechanism the NDIS uses to enforce quality and safeguards on providers that deliver higher-risk or specialist supports. The Practice Standards cover governance, risk management, incident management, complaints handling, and the specific clinical or behavioural standards relevant to each registration group.",
        "Registered providers are listed in the NDIS Provider Finder and can be claimed by participants regardless of how their plan is managed.",
      ],
    },
    {
      id: "what-is-a-non-registered-ndis-provider",
      heading: "What is a non-registered NDIS provider?",
      leadParagraph:
        "A non-registered NDIS provider is a service that delivers NDIS-funded supports without going through the formal NDIS Commission audit process. They are still bound by the NDIS Code of Conduct, and their workers must still meet worker screening requirements. They simply haven't pursued the additional independent audit that registration requires.",
      body: [
        "Non-registered providers are common for less regulated supports — assistance with daily living, community participation, household tasks, gardening, transport. Many independent support workers operate as non-registered providers, often through plan management platforms.",
        "Non-registered providers can offer more flexibility on scope, scheduling, and bundled services, but cannot deliver supports that the NDIS reserves for registered providers (specialist behaviour support, SDA, high-intensity daily personal activities).",
      ],
    },
    {
      id: "who-can-use-each",
      heading: "Who can use a registered vs non-registered provider?",
      leadParagraph:
        "If your NDIS plan is NDIA-managed, you can only use registered NDIS providers. If your plan is self-managed or plan-managed, you can use either registered or non-registered providers, and many participants use a mix. Your support coordinator or plan manager can confirm what your plan allows.",
      bullets: [
        "NDIA-managed (sometimes called Agency-managed) — registered providers only.",
        "Plan-managed — registered or non-registered.",
        "Self-managed — registered or non-registered.",
      ],
    },
    {
      id: "when-registration-matters",
      heading: "When does registration actually matter for the participant?",
      leadParagraph:
        "Registration matters most when the support you need is regulated — for example, complex clinical nursing, specialist behaviour support, or accommodation under SDA. For everyday personal care, community participation, or household assistance, both registered and non-registered providers can deliver excellent service, and choice should hinge on the team's experience and fit.",
      body: [
        "It also matters if your plan is NDIA-managed (in which case registration is mandatory), or if you want the additional layer of complaints recourse the NDIS Commission's audit process provides.",
      ],
    },
    {
      id: "how-to-choose",
      heading: "How should I choose between a registered and non-registered provider?",
      leadParagraph:
        "Start with three questions: What kind of support do you actually need? How is your plan managed? And how comfortable are you with the trade-off between provider flexibility and the additional audit oversight registration brings? The answers usually point clearly to one option or the other.",
      bullets: [
        "If your plan is NDIA-managed: registered only.",
        "If you need clinical nursing, behaviour support, or SDA: registered.",
        "If you need flexible everyday support and your plan is plan- or self-managed: either, choose on team fit.",
        "If continuity, complaints recourse, or audit-backed quality is important to you: registered.",
        "If price flexibility on non-NDIS bundled services matters: non-registered may suit better.",
      ],
    },
    {
      id: "in-home-nursing-sydney",
      heading: "What about in-home nursing in Sydney specifically?",
      leadParagraph:
        "For in-home nursing in Sydney — wound care, medication management, complex care, post-hospital recovery — registered providers are the practical default. Most non-registered providers in this category are individual support workers without nursing scope, and the participants most likely to need in-home nursing (NDIA-managed, complex needs, hospital discharge) are also the participants restricted to registered providers.",
      body: [
        "If you're searching for in-home nursing across Sydney suburbs — Inner West, North Shore, Northern Beaches, Western Sydney, South Sydney, or the Eastern Suburbs — focus your shortlist on registered NDIS providers with AHPRA-registered nurses on the team and a clear local presence in your area.",
      ],
    },
  ],

  faqs: [
    {
      id: "faq-can-i-mix",
      question: "Can I use both registered and non-registered providers under one NDIS plan?",
      answer:
        "Yes, if your plan is plan-managed or self-managed. Many participants use a registered provider for clinical nursing or complex care and non-registered providers for community participation, transport, or household assistance. NDIA-managed participants can only use registered providers across all supports.",
    },
    {
      id: "faq-cheaper",
      question: "Are non-registered NDIS providers cheaper?",
      answer:
        "Not necessarily. Both registered and non-registered providers must charge within the NDIS Pricing Arrangements and Price Limits when claiming under NDIS funding. Non-registered providers may offer more flexibility on bundled or non-NDIS services, but for the same NDIS-funded support the maximum price is the same.",
    },
    {
      id: "faq-quality-difference",
      question: "Are registered NDIS providers higher quality?",
      answer:
        "Not automatically. Registration is an audit-backed compliance status, not a quality ranking. Many excellent support workers operate as non-registered providers; some registered providers deliver poor service. Registration guarantees an audit baseline, not personal fit. Always assess quality by the team, the experience, and how well they match your needs.",
    },
    {
      id: "faq-switch",
      question: "Can I switch from a non-registered to a registered provider mid-plan?",
      answer:
        "Yes. As long as your new provider can deliver the supports you need under your existing plan and budget, you can switch at any time. Give your current provider reasonable notice in line with your service agreement. Your support coordinator or plan manager can help with the handover.",
    },
    {
      id: "faq-find-registered",
      question: "Where do I find registered NDIS providers in Sydney?",
      answer:
        "The official NDIS Provider Finder at ndis.gov.au lists every registered provider, filterable by location and service type. You can also ask your support coordinator for shortlists. Registered providers like Gentle Care Nursing Services, based in North Strathfield, deliver in-home nursing across Sydney and surrounds.",
    },
  ],

  closing: {
    heading: "Looking for a registered NDIS provider in Sydney?",
    body: "Gentle Care Nursing Services is a registered NDIS provider and DVA Contracted Community Nursing Provider based in North Strathfield, delivering personalised in-home nursing and care across Sydney — Inner West, North Shore, Northern Beaches, Western Sydney, South Sydney, and the CBD and East. We work with NDIA-managed, plan-managed, and self-managed participants, and we work alongside support coordinators and plan managers across the city.",
    internalLinks: [
      { href: "/ndis", label: "How we deliver NDIS supports" },
      { href: "/services/nursing-care", label: "In-home nursing care" },
      { href: "/services/complex-care", label: "Complex care support" },
      { href: "/areas", label: "Sydney regions we serve" },
    ],
  },
} as const;
