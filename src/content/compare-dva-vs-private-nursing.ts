/**
 * Content for /compare/dva-community-nursing-vs-private-nursing.
 *
 * Strategy: balanced, plain-English comparison targeting the intent
 * intersection of query 2 (DVA community nursing Sydney) and query 8
 * (private nursing Sydney cost) in docs/AI_VISIBILITY_LOG.md. Both queries
 * surface heavily for veterans, war widows/widowers, and families weighing
 * DVA-funded care against paying privately. No Sydney provider has a
 * clean page covering this comparison.
 *
 * Voice rules apply (per .agents/product-marketing-context.md):
 *   - DVA wording must be exactly "DVA Contracted Community Nursing Provider"
 *     or "Contracted to provide DVA Community Nursing services". Never
 *     "DVA Registered Provider" or "DVA Approved".
 *   - No "guarantee" / "guaranteed" — use "we aim to respond within 24 hours".
 *   - No specific years / duration claims.
 *   - "Care professional" / "experienced nurses" / "support worker" outside
 *     regulatory contexts; "AHPRA-registered nurse" inside clinical scope.
 *   - Balanced — both options have legitimate use cases. Don't oversell DVA
 *     or private. Comparison earns trust through fairness.
 *
 * Factual basis (anchored to DVA Treatment Principles and DVA provider
 * documentation; do not introduce claims outside this):
 *   - DVA Community Nursing is funded under the Treatment Principles and
 *     delivered by providers on the DVA Panel of Community Nursing
 *     Providers (current ACT/NSW PDF: April 2026).
 *   - Eligibility: Gold Card holders are generally eligible; White Card
 *     holders may be eligible for accepted conditions only. A GP or
 *     treating doctor referral is required.
 *   - Scope is set by the DVA Notes for Providers: nursing assessment,
 *     clinical nursing care, palliative care, and personal care delegated
 *     by a nurse.
 *   - Private nursing has no eligibility, no waitlists, no referral
 *     requirement; it's paid out-of-pocket or via private health insurance
 *     where applicable.
 *   - Veterans can and often do combine the two — DVA for clinical scope,
 *     private to top up where DVA scope doesn't cover the need.
 */

import type { ComparePageContent } from "./compare-registered-vs-unregistered";

export const COMPARE_DVA_VS_PRIVATE_NURSING: ComparePageContent = {
  h1: "DVA Community Nursing vs Private In-Home Nursing: A Plain-English Comparison",
  metaTitle:
    "DVA Community Nursing vs Private Nursing — Sydney Comparison",
  metaDescription:
    "Side-by-side comparison of DVA Community Nursing and private in-home nursing for Sydney veterans and families. Who can use each, what they cover, costs, and how to combine them.",
  canonicalPath: "/compare/dva-community-nursing-vs-private-nursing",
  snippetAnswer:
    "DVA Community Nursing is in-home nursing for eligible Veteran Card holders, funded by the Department of Veterans' Affairs and delivered at no out-of-pocket cost by providers on the DVA panel. Private in-home nursing is paid out-of-pocket, has no eligibility requirements or waitlists, and offers more flexibility on scope and scheduling. Many veterans use both — DVA for clinical scope, private for top-up support.",
  intro:
    "For veterans, war widows and widowers, and families supporting a Veteran Card holder, the choice between DVA Community Nursing and private in-home nursing isn't always either/or. This page lays out what each one is, who can use it, what it covers, and how the two can work together — focused on Sydney and written in plain English.",

  comparisonRows: [
    {
      criterion: "Who can use it",
      registered:
        "Eligible Veteran Card holders — Gold Card holders generally, White Card holders for accepted conditions only.",
      nonRegistered:
        "Anyone — no eligibility check, no card required, open to families, non-veterans, and veterans choosing to pay privately.",
    },
    {
      criterion: "Out-of-pocket cost",
      registered:
        "No out-of-pocket cost for clinically required, DVA-approved care. The provider claims directly from DVA.",
      nonRegistered:
        "Paid out-of-pocket at the provider's published rate. Private health insurance may cover part of it depending on the policy.",
    },
    {
      criterion: "Referral required",
      registered:
        "Yes — a referral from a GP or treating doctor, plus a nursing assessment by the provider.",
      nonRegistered:
        "No referral required. You can engage a provider directly.",
    },
    {
      criterion: "Wait time to start",
      registered:
        "Depends on referral processing, DVA approval, and provider capacity. Hospital-discharge referrals are typically prioritised.",
      nonRegistered:
        "Usually faster — many private providers can start within days of an enquiry, subject to capacity.",
    },
    {
      criterion: "Scope of supports",
      registered:
        "Nursing assessment, clinical nursing care, palliative care, and personal care delegated by a nurse, per the DVA Notes for Providers.",
      nonRegistered:
        "Flexible — clinical nursing, personal care, post-surgical recovery, respite, companion care, and bundled services that DVA may not cover.",
    },
    {
      criterion: "Visit frequency and scheduling",
      registered:
        "Determined by clinical need and DVA approval; the provider documents and justifies frequency in the care plan.",
      nonRegistered:
        "Flexible — daily, weekly, one-off, or intensive short-term blocks, set by the client and provider.",
    },
    {
      criterion: "Provider choice",
      registered:
        "Limited to providers on the DVA Panel of Community Nursing Providers, listed by region in DVA's published PDF.",
      nonRegistered:
        "Open — any in-home nursing provider in Sydney, registered or not.",
    },
    {
      criterion: "Combining the two",
      registered:
        "Can be combined with private top-up care — DVA covers clinically required nursing; private covers what falls outside DVA scope.",
      nonRegistered:
        "Same as left — private care is often used to top up DVA where DVA scope doesn't cover a need.",
      note:
        "Veterans don't have to choose one or the other. Many use DVA Community Nursing for clinical nursing and private for personal care, respite, or extended hours.",
    },
  ],

  sections: [
    {
      id: "what-is-dva-community-nursing",
      heading: "What is DVA Community Nursing?",
      leadParagraph:
        "DVA Community Nursing is in-home nursing and personal care for eligible Veteran Card holders, funded by the Department of Veterans' Affairs and delivered by providers contracted to the DVA Panel of Community Nursing Providers. There is no out-of-pocket cost for clinically required, DVA-approved care — the provider claims directly from DVA.",
      body: [
        "DVA Community Nursing is governed by the Treatment Principles under the Veterans' Entitlements Act and the Notes for Community Nursing Providers. Scope is set there and is not open-ended — it covers nursing assessment, clinical nursing care, palliative care, and personal care delegated by a nurse.",
        "Eligibility generally extends to Gold Card holders; White Card holders may be eligible for accepted conditions only. A GP or treating doctor referral is required, and the provider conducts a nursing assessment before care begins.",
      ],
    },
    {
      id: "what-is-private-in-home-nursing",
      heading: "What is private in-home nursing?",
      leadParagraph:
        "Private in-home nursing is nursing and personal care that you arrange and pay for directly, outside any government-funded program. There are no eligibility requirements, no referrals, no waitlists beyond the provider's own capacity, and the scope is set by what the client needs and the provider delivers — not by a government scheme.",
      body: [
        "Private nursing is paid out-of-pocket at the provider's published rate. Some private health insurance policies offer partial cover for in-home nursing under specific clauses — worth checking with your insurer, but not assumed.",
        "Private nursing is often the right fit when scheduling, scope, or speed matter more than cost — for example, post-surgical recovery, short-term respite, or hours of care that fall outside what a funded program will approve.",
      ],
    },
    {
      id: "who-can-use-each",
      heading: "Who can use DVA Community Nursing vs private nursing?",
      leadParagraph:
        "DVA Community Nursing is restricted to eligible Veteran Card holders with a GP referral and an assessed clinical need. Private in-home nursing is open to anyone — veterans choosing to pay privately, non-veteran family members, and people who prefer to bypass the referral and assessment process. Many Sydney veterans qualify for DVA and could also engage a private provider, depending on which fits the need.",
      bullets: [
        "Gold Card holders — generally eligible for DVA Community Nursing.",
        "White Card holders — eligible for accepted conditions only.",
        "Veterans without a DVA card, or with needs outside DVA scope — private only.",
        "Family members of a veteran needing nursing themselves — private only.",
      ],
    },
    {
      id: "when-dva-makes-most-sense",
      heading: "When does DVA Community Nursing make the most sense?",
      leadParagraph:
        "DVA Community Nursing is the right starting point whenever an eligible veteran has a clinical nursing need that falls inside the DVA scope. The combination of no out-of-pocket cost and structured oversight — referral, nursing assessment, documented care plan — makes it the default option for most veterans needing ongoing or post-hospital nursing in Sydney.",
      body: [
        "It also makes sense when the need is ongoing rather than short-term — DVA-funded care can continue as long as the clinical need is documented and reviewed.",
      ],
      bullets: [
        "Ongoing wound care, medication management, or chronic disease monitoring",
        "Post-hospital nursing after a Sydney hospital discharge (RPA, RNSH, Westmead, St Vincent's, Concord, POW)",
        "Palliative care nursing at home for eligible veterans",
        "Personal care delegated by a nurse as part of an approved care plan",
      ],
    },
    {
      id: "when-private-makes-most-sense",
      heading: "When does private in-home nursing make the most sense?",
      leadParagraph:
        "Private nursing makes the most sense when you need flexibility, scope, or speed that the DVA scheme isn't designed for. That includes shorter waits, bundled non-clinical support, hours of care beyond what DVA approves, and care for non-eligible household members. It also makes sense as a top-up alongside DVA, when DVA-approved hours don't fully meet the household's needs.",
      bullets: [
        "Short-term post-surgical recovery where speed-to-start matters",
        "Extended hours or overnight support beyond what DVA approves",
        "Respite for family carers, when not funded under another scheme",
        "Care needs outside DVA scope — companion care, household assistance, transport",
        "Care for a non-veteran spouse or family member in the same home",
      ],
    },
    {
      id: "can-i-use-both",
      heading: "Can a veteran use DVA Community Nursing and private nursing together?",
      leadParagraph:
        "Yes. Many Sydney veterans use DVA Community Nursing for clinical nursing inside the DVA scope, and engage a private provider for the things DVA doesn't cover — extended hours, companion care, respite, or support for a spouse. The two run in parallel and don't affect each other's eligibility or funding, provided the private hours aren't billed to DVA.",
      body: [
        "Where possible, using the same provider for both makes coordination easier — your nurse already knows the household, the routines, and the clinical history, so there's no duplication of assessment or handover.",
      ],
    },
    {
      id: "in-home-nursing-sydney",
      heading: "What does this look like in Sydney specifically?",
      leadParagraph:
        "Across Sydney — Inner West, North Shore, Northern Beaches, Western Sydney, South Sydney, and the CBD and Eastern Suburbs — both DVA and private in-home nursing are available, though the DVA panel of contracted providers for ACT/NSW is a more limited list. The current DVA Panel of Community Nursing Providers PDF (April 2026) names the providers eligible to deliver DVA Community Nursing in your LGA.",
      body: [
        "If you're a veteran in Sydney needing in-home nursing, the practical sequence is usually: talk to your GP about a DVA Community Nursing referral, check the DVA panel for providers covering your LGA, and ask the provider whether they can also offer private top-up if DVA-approved hours don't meet your full need.",
      ],
    },
  ],

  faqs: [
    {
      id: "faq-dva-cost",
      question: "Does DVA Community Nursing cost the veteran anything?",
      answer:
        "No — for clinically required, DVA-approved care, there is no out-of-pocket cost. The provider claims directly from DVA. Costs only apply if a veteran chooses to engage private nursing on top of, or instead of, DVA-funded care.",
    },
    {
      id: "faq-private-cost",
      question: "How much does private in-home nursing cost in Sydney?",
      answer:
        "Private rates vary by provider, shift type (weekday, weekend, overnight), and the qualifications required (RN, EN, support worker). For exact pricing at Gentle Care Nursing Services, contact us directly — we provide transparent quotes based on the care needed. Many veterans use DVA for clinical scope and only pay privately for hours outside DVA approval.",
    },
    {
      id: "faq-switch",
      question: "Can a veteran switch from private to DVA Community Nursing?",
      answer:
        "Yes. If a veteran has a Veteran Card and a clinical need that falls inside DVA Community Nursing scope, they can ask their GP for a referral at any time. Once the referral is in, the DVA-contracted provider will conduct a nursing assessment and start DVA-funded care if clinically appropriate. Existing private arrangements can continue alongside, with the private hours billed separately.",
    },
    {
      id: "faq-eligibility-white-card",
      question: "Is a White Card holder eligible for DVA Community Nursing?",
      answer:
        "White Card holders are eligible for DVA Community Nursing only for accepted conditions — that is, conditions DVA has linked to their service. Gold Card holders are generally eligible regardless of condition, subject to clinical assessment. If you're unsure, your GP or DVA can confirm eligibility for your specific situation.",
    },
    {
      id: "faq-find-dva-provider",
      question: "How do I find a DVA Contracted Community Nursing Provider in Sydney?",
      answer:
        "The DVA Panel of Community Nursing Providers — ACT and NSW PDF, published on dva.gov.au — lists providers by LGA. Gentle Care Nursing Services is on the current April 2026 panel, listed in 63 LGA/suburb sections across Sydney. Your GP, hospital discharge planner, or DVA itself can also recommend a provider for your area.",
    },
    {
      id: "faq-scope-mismatch",
      question: "What happens if my care needs go beyond what DVA covers?",
      answer:
        "DVA Community Nursing has a defined scope — nursing assessment, clinical nursing, palliative care, and nurse-delegated personal care. If your needs extend beyond that (extended hours, companion care, respite, household help, or care for a non-veteran in the same home), you can arrange private care to fill the gap. The two run in parallel and don't affect each other.",
    },
  ],

  closing: {
    heading: "Looking for a DVA Contracted Community Nursing Provider in Sydney?",
    body: "Gentle Care Nursing Services is a DVA Contracted Community Nursing Provider listed on the current April 2026 ACT/NSW DVA panel and a registered NDIS provider. We deliver in-home nursing and care across Sydney — Inner West, North Shore, Northern Beaches, Western Sydney, South Sydney, and the CBD and East — for eligible veterans under DVA Community Nursing and for private clients alongside, where DVA scope doesn't cover the full need.",
    internalLinks: [
      { href: "/dva", label: "DVA Community Nursing with Gentle Care" },
      { href: "/private-nursing", label: "Private in-home nursing options" },
      { href: "/services/nursing-care", label: "In-home nursing care" },
      { href: "/areas", label: "Sydney regions we serve" },
    ],
  },
} as const;
