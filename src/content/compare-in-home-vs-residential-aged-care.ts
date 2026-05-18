/**
 * Content for /compare/in-home-nursing-vs-residential-aged-care.
 *
 * Targets one of the highest-volume family decision-moments in Sydney
 * aged care — the choice between staying at home with in-home nursing
 * versus moving into residential aged care. Per the AI SEO audit §4.8,
 * comparison pages capture ~33% of AI citation share, and this is the
 * most-searched family-decision query of the four planned.
 *
 * Voice rules apply (per .agents/product-marketing-context.md):
 *   - Balanced — residential aged care has legitimate use cases; many
 *     families need it. Comparison earns trust through fairness.
 *   - No "boutique" / "premium"
 *   - No "guarantee"
 *   - "We aim to respond within 24 hours" phrasing
 *   - No specific years / duration claims
 *
 * Factual basis (every claim is anchored to citable national sources):
 *   - Aged Care Act 2024 (Support at Home replaced HCP from 1 Nov 2025)
 *   - My Aged Care assessment pathway (ACAT/ACAS)
 *   - Residential aged care funding through AN-ACC means-test contribution
 *   - In-home care funding through Support at Home / CHSP package levels
 *   - DVA Community Nursing for veterans regardless of setting
 */

import type { ComparePageContent } from "./compare-registered-vs-unregistered";

export const COMPARE_IN_HOME_VS_RESIDENTIAL: ComparePageContent = {
  h1: "In-Home Nursing vs Residential Aged Care: A Plain-English Comparison",
  metaTitle: "In-Home Nursing vs Residential Aged Care Sydney",
  metaDescription:
    "In-home nursing vs residential aged care for Sydney families. Funding, clinical scope, social/family factors, and how to decide when it's time to consider a move. Plain English.",
  canonicalPath: "/compare/in-home-nursing-vs-residential-aged-care",
  snippetAnswer:
    "In-home nursing keeps an older person in their own home with nursing visits, personal care, and family support, funded through Support at Home, CHSP, DVA, or privately. Residential aged care is 24/7 care delivered in an aged care home, funded through means-tested AN-ACC contributions. Each suits different stages and household situations — many families use in-home care for as long as it's safe, then move when clinical needs or safety risks exceed what home support can handle.",
  intro:
    "For most Sydney families, deciding between in-home nursing and residential aged care is one of the harder calls — there's no universally right answer and the choice usually changes over time as needs change. This page sets out what each option actually is, who it suits, how funding works, and the signs that often shape the decision either way. Written in plain English, no marketing spin.",

  comparisonRows: [
    {
      criterion: "Where care is delivered",
      registered:
        "In the person's own home — house, unit, granny flat, or living with family. They keep their familiar surroundings, routines, neighbourhood, and connections.",
      nonRegistered:
        "In a residential aged care home (sometimes called a nursing home). 24/7 staffing on-site, shared common areas, and dedicated room or suite.",
    },
    {
      criterion: "Hours of care available",
      registered:
        "Scheduled visits — typically anywhere from a few hours per week to multiple daily visits, plus optional overnight support. Care is intermittent rather than continuous.",
      nonRegistered:
        "24-hour staffing on-site, with care delivered as needed throughout the day and night. Continuous supervision available.",
    },
    {
      criterion: "Clinical care available",
      registered:
        "Nursing visits for medication management, wound care, complex care (PEG, tracheostomy, catheter), and chronic disease monitoring. Specialist input by referral.",
      nonRegistered:
        "On-site registered nurse coverage required by Aged Care Quality Standards, plus visiting GPs and allied health. Suited to higher and more variable clinical needs.",
    },
    {
      criterion: "Funding source",
      registered:
        "Support at Home (replaced Home Care Packages from 1 November 2025), CHSP, DVA Community Nursing, private fee-for-service, or a mix.",
      nonRegistered:
        "Means-tested AN-ACC contribution + basic daily fee + accommodation payment (either daily, lump-sum RAD, or combination). DVA may cover veteran-specific costs.",
      note:
        "Both options require an aged care assessment (ACAT/ACAS) through My Aged Care to access government funding.",
    },
    {
      criterion: "Out-of-pocket cost — at-home",
      registered:
        "Varies by package level. Support at Home contributions are means-tested; CHSP has small co-contributions. Private care is paid in full.",
      nonRegistered:
        "Out-of-pocket cost depends entirely on the chosen home, accommodation payment structure, and means-test outcome. Can range significantly.",
    },
    {
      criterion: "Social environment",
      registered:
        "Familiar — own home, neighbours, local community, family visits without restrictions. Social isolation can be a real risk if the person doesn't get out.",
      nonRegistered:
        "Built-in social environment — shared meals, activities programs, other residents. Some people thrive on this; others find it harder to adjust.",
    },
    {
      criterion: "Family involvement",
      registered:
        "Family can visit, stay overnight, share meals, and remain closely involved day-to-day. Family also often shares some of the practical load.",
      nonRegistered:
        "Family visits during open hours; involvement is supportive rather than hands-on. Lifts the day-to-day load off family but changes the relationship dynamic.",
    },
    {
      criterion: "When it usually stops being safe",
      registered:
        "Increasing falls overnight without supervision, wandering, severe dementia behaviours, or clinical needs requiring 24/7 oversight (advanced palliative care being the exception where home is often preferred).",
      nonRegistered:
        "Rarely stops being clinically appropriate — but can stop being a good fit if the person becomes deeply distressed by the environment, or if family wishes to bring them home for end-of-life.",
    },
  ],

  sections: [
    {
      id: "what-is-in-home-nursing",
      heading: "What is in-home nursing for older Australians?",
      leadParagraph:
        "In-home nursing is scheduled nursing and personal care delivered in the person's own home — anything from a few hours of personal care per week to multiple daily visits plus overnight support. It's designed to keep older Australians safely at home for as long as possible, with clinical oversight, familiar surroundings, and ongoing family involvement.",
      body: [
        "Most in-home nursing for older Australians is funded through Support at Home (the replacement for Home Care Packages from 1 November 2025), the Commonwealth Home Support Programme (CHSP) for lower-needs participants, DVA Community Nursing for eligible veterans, or paid privately. Many older Australians use a combination — for example a CHSP entry-level package topped up with private hours.",
        "The scope can include wound care, medication management, chronic disease monitoring, post-hospital recovery, palliative support, complex care (PEG, tracheostomy, catheter), and personal care delivered with dignity. What it can't easily provide is continuous overnight supervision unless overnight support is specifically arranged.",
      ],
    },
    {
      id: "what-is-residential-aged-care",
      heading: "What is residential aged care?",
      leadParagraph:
        "Residential aged care is 24-hour care delivered in an aged care home (sometimes still called a nursing home), with on-site staffing, dedicated room or suite, meals, allied health, and supervised social activities. The Aged Care Quality Standards require registered-nurse coverage on-site, and the AN-ACC funding model means each resident has a regularly-reviewed clinical funding classification.",
      body: [
        "Residential aged care suits people whose clinical needs, safety risks, or 24-hour supervision needs exceed what in-home care can practically deliver. It also suits people who do better with the structured social environment of an aged care home — although adjustment varies, and not every person thrives.",
        "Funding is means-tested. Most residents pay a basic daily fee plus means-tested care contribution plus an accommodation payment — the accommodation can be paid as a daily fee, a refundable accommodation deposit (RAD) lump sum, or a combination. Costs vary significantly between homes.",
      ],
    },
    {
      id: "who-suits-each",
      heading: "Who is each option best suited to?",
      leadParagraph:
        "There's no universally right answer — but there are patterns. In-home nursing usually fits when the person is medically stable, wants to stay at home, has family or community support nearby, and the household environment is safe with the right adjustments. Residential aged care usually fits when 24-hour supervision is needed, when family cannot sustain the support needed at home, or when the person's safety at home cannot be managed even with maximum in-home care.",
      bullets: [
        "In-home nursing usually suits — stable clinical needs, family or community nearby, person prefers home, safe home environment",
        "Residential aged care usually suits — 24-hour supervision needs, severe dementia with wandering or distress, complex clinical needs requiring constant nursing presence, family unable to sustain home support, person's own preference",
        "Many families use in-home care for as long as it's safe — then move to residential care when in-home support reaches its practical limit",
      ],
    },
    {
      id: "when-to-consider-move",
      heading: "What are the signs it might be time to consider residential aged care?",
      leadParagraph:
        "The decision to move from home to residential aged care is rarely about one single factor — it's usually a cluster of signs over time. The clearest indicators are increasing falls (especially overnight), wandering in dementia, the primary carer's exhaustion, or clinical needs that have outgrown what in-home care can safely deliver.",
      bullets: [
        "Multiple falls at home, especially overnight or unwitnessed",
        "Wandering or significant safety risk from dementia or cognitive decline",
        "Primary carer at breaking point — physical exhaustion, mental health impact, or own health declining",
        "Hospital admissions becoming more frequent because home support isn't keeping the person safe",
        "Skin breakdown, weight loss, or medication errors despite in-home support",
        "The person themselves asking for more support than home can sustain",
      ],
    },
    {
      id: "how-funding-works",
      heading: "How does funding work for each option in Sydney?",
      leadParagraph:
        "Both options require an aged care assessment (ACAT/ACAS) through My Aged Care to access government funding, and both are means-tested. The structures are different but the principle is the same — the government contributes based on assessed need and the person contributes based on their financial situation.",
      body: [
        "For in-home care, Support at Home (since 1 November 2025) allocates a funding level based on assessed need. CHSP is the entry-level option for lower-needs participants. Veterans access DVA Community Nursing at no out-of-pocket cost for clinically required care. Private fee-for-service is also available, often as a top-up.",
        "For residential aged care, AN-ACC determines the funding the home receives per resident, and the resident pays a basic daily fee, a means-tested care contribution, and an accommodation payment (as a daily fee, refundable lump sum, or combination). Costs vary significantly between homes — the My Aged Care website lists current fees for each.",
      ],
    },
    {
      id: "can-i-combine",
      heading: "Can a family combine in-home care and residential care over time?",
      leadParagraph:
        "Yes — and most families do, in sequence. The common pattern is years of in-home care first, often increasing in intensity over time, then a move to residential care when needs exceed what home support can deliver. Less commonly, families also use respite stays in residential aged care to give the primary in-home carer a break while keeping the long-term plan at home.",
      body: [
        "Some families also use a mix at the end of life — for example, returning home from residential care for the final weeks with specialist palliative in-home support. There's no rule that says the decision is once-and-final.",
      ],
    },
    {
      id: "in-sydney-specifically",
      heading: "How does this play out in Sydney specifically?",
      leadParagraph:
        "Sydney has both well-developed in-home nursing options and a wide range of residential aged care homes across every region. The practical question is usually less 'which is available' and more 'what fits this person and family right now' — and many families find the conversation easier once they've seen both options in action through assessment visits and short trial stays.",
      body: [
        "For in-home nursing, an ACAT assessment through My Aged Care opens the door to Support at Home and CHSP funding. For residential care, the same assessment, plus the aged care home's own admission process, applies. Across Sydney LGAs, both options are available — the question is matching the specific person and household, not finding availability.",
      ],
    },
  ],

  faqs: [
    {
      id: "faq-cost-difference",
      question: "Is in-home nursing cheaper than residential aged care?",
      answer:
        "Often yes, especially at lower needs levels — CHSP and entry-level Support at Home packages can keep someone at home for relatively low out-of-pocket cost. At higher needs (24-hour supervision, multiple daily visits, overnight support), the picture is less clear and residential care can become more cost-effective per hour of care. The right comparison depends on the specific package level and the specific aged care home.",
    },
    {
      id: "faq-needs-assessment",
      question: "Do I need an aged care assessment for both options?",
      answer:
        "Yes, for any government-funded option. An ACAT (or ACAS in Victoria) assessment through My Aged Care is required to access Support at Home, CHSP, or residential aged care funding. Veterans accessing DVA Community Nursing also need a GP referral. Private in-home care doesn't require an assessment — it's paid directly out-of-pocket.",
    },
    {
      id: "faq-dementia",
      question: "Which option is better for someone with dementia?",
      answer:
        "Early to mid-stage dementia can usually be supported at home with the right in-home care, family involvement, and home safety adjustments — and the familiarity of home often helps reduce distress. Severe dementia with wandering, significant distress, or 24-hour supervision needs often reaches a point where residential aged care (and specifically dementia-specific units in some homes) becomes the safer option. Many families make this transition reluctantly and gradually.",
    },
    {
      id: "faq-veteran",
      question: "What about veterans — does DVA cover both options?",
      answer:
        "DVA Community Nursing covers eligible veterans for clinically required in-home nursing at no out-of-pocket cost, regardless of whether they're at home or in residential aged care. DVA also has specific provisions for veterans in residential aged care, including for nursing services that complement the aged care home's own staffing. A veteran's DVA entitlements continue through both options.",
    },
    {
      id: "faq-trial",
      question: "Can we try both before deciding?",
      answer:
        "Yes. Most families start in-home care first and use it for as long as it's safe — there's no commitment to either option. Many aged care homes offer respite stays (typically up to 63 days per year of subsidised respite) which let a family see how the person settles in residential care before any permanent decision. This often makes the eventual choice clearer for everyone.",
    },
  ],

  closing: {
    heading: "Considering in-home nursing for an older parent or partner in Sydney?",
    body: "Gentle Care Nursing Services delivers in-home nursing and personal care across Sydney for older Australians under Support at Home, CHSP, DVA Community Nursing, and private arrangements. We work with families, support coordinators, and aged care assessors across Sydney's regions — Inner West, North Shore, Northern Beaches, Western Sydney, South Sydney, and the CBD and East — and we're upfront if we think in-home care isn't the right fit for a particular situation.",
    internalLinks: [
      { href: "/aged-care", label: "In-home aged care with Gentle Care" },
      { href: "/services/nursing-care", label: "In-home nursing care" },
      { href: "/services/post-hospital-care", label: "Post-hospital care at home" },
      { href: "/guides/in-home-care-for-dementia", label: "In-home care for dementia (guide)" },
    ],
  },
} as const;
