/**
 * Content for /compare/clinician-led-vs-agency-staff.
 *
 * Targets a niche but high-intent search corridor — families and
 * support coordinators specifically searching for provider-model
 * differences ("clinician-led nursing Sydney", "agency vs in-house
 * carers", "consistent carer NDIS Sydney"). This page is the
 * differentiator-anchored comparison from the AI SEO audit §4.8.
 *
 * Voice rules apply (per .agents/product-marketing-context.md):
 *   - "Clinician-led" is on the binding-allowed list inside clinical
 *     scope claims, but NOT for hero/eyebrow framing. This page is
 *     squarely inside clinical/care-model scope so it's appropriate
 *     to use here.
 *   - Balanced — agency-staff models exist for good reasons (scale,
 *     speed, geographic coverage). Don't oversell clinician-led.
 *   - No "boutique" / "premium" / "guarantee"
 *   - No specific years / duration claims
 *   - "We aim to respond within 24 hours" / "prompt response"
 *
 * Factual basis:
 *   - Clinician-led: care is overseen by a clinician (typically an
 *     AHPRA-registered nurse) with clinical decision authority,
 *     usually with a smaller team and direct accountability.
 *   - Agency-staff: care is delivered by workers placed by an
 *     agency that may rotate staff, with less direct clinical
 *     oversight at the household level.
 *   - Both can deliver quality care; the trade-offs are real and
 *     depend on what the family/coordinator values.
 */

import type { ComparePageContent } from "./compare-registered-vs-unregistered";

export const COMPARE_CLINICIAN_LED_VS_AGENCY: ComparePageContent = {
  h1: "Clinician-Led vs Agency-Staff In-Home Nursing: A Plain-English Comparison",
  metaTitle: "Clinician-Led vs Agency-Staff Nursing Sydney",
  metaDescription:
    "Clinician-led vs agency-staff in-home nursing in Sydney — clinical oversight, staff continuity, response times, scope, and how to choose. Plain English for families and coordinators.",
  canonicalPath: "/compare/clinician-led-vs-agency-staff",
  snippetAnswer:
    "Clinician-led in-home nursing means care is overseen by a clinician (typically an AHPRA-registered nurse) with direct clinical authority over the household's care plan, usually with a small consistent team. Agency-staff models deliver care through workers placed by a broker or agency, with rotating staff and less direct clinical oversight at the household level. Both can deliver quality care; the right fit depends on what families and coordinators value most — continuity and clinical oversight, or breadth and speed of coverage.",
  intro:
    "When families and support coordinators in Sydney are choosing an in-home nursing provider, the model behind the service often matters as much as the brand. This page sets out the practical differences between clinician-led and agency-staff models, who each suits, and the trade-offs that actually affect day-to-day care quality.",

  comparisonRows: [
    {
      criterion: "Clinical oversight",
      registered:
        "A clinician (typically an AHPRA-registered nurse) leads the care plan, reviews each household's clinical needs, and is directly accountable for the care delivered.",
      nonRegistered:
        "Clinical oversight varies — typically delivered through a remote clinical governance team rather than someone close to the household's day-to-day care.",
    },
    {
      criterion: "Staff continuity",
      registered:
        "Small consistent team — the same carers and nurses visit each household, learning routines, preferences, and clinical baseline over time.",
      nonRegistered:
        "Rotating staff — agencies typically draw from a wider worker pool, which means a household may see different faces from week to week.",
    },
    {
      criterion: "Scheduling flexibility",
      registered:
        "Care is planned around the household's needs and the small team's availability. Last-minute changes may take longer to accommodate.",
      nonRegistered:
        "Can usually fill last-minute shifts faster because the worker pool is larger, but with less guarantee the same person you've met will arrive.",
    },
    {
      criterion: "Response to changes in condition",
      registered:
        "The clinician overseeing the care knows the household — changes in condition tend to be noticed sooner and escalated earlier.",
      nonRegistered:
        "Changes are typically reported through agency systems and escalated through a clinical governance layer — depending on system maturity, this can be fast or slow.",
    },
    {
      criterion: "Scope of clinical care",
      registered:
        "Can deliver complex clinical nursing (PEG, tracheostomy, catheter, complex wound care) because the team is built around clinical capability.",
      nonRegistered:
        "Depends on the agency's staff mix. Larger agencies can deliver complex care; smaller broker-style agencies typically focus on personal care and support work.",
    },
    {
      criterion: "Geographic coverage",
      registered:
        "Coverage depends on the specific team's reach — usually focused, with deeper expertise in the regions they serve.",
      nonRegistered:
        "Often wider geographic coverage because of the larger worker pool — useful for participants in less-served suburbs.",
    },
    {
      criterion: "Communication with treating teams",
      registered:
        "Direct clinician-to-clinician communication with GPs, specialists, and hospital teams — important for hospital discharge and complex care coordination.",
      nonRegistered:
        "Communication usually routed through the agency's clinical governance team. Quality depends on how well the agency invests in this layer.",
    },
    {
      criterion: "Cost",
      registered:
        "Often comparable to or slightly higher than agency-staff models, reflecting the clinical-oversight investment and smaller-team logistics.",
      nonRegistered:
        "Often slightly lower at the per-hour level for personal care, with complex care priced higher to reflect specialist staff.",
      note:
        "NDIS and aged care funding caps apply to both models when funded under those schemes. The cost difference matters most for private fee-for-service.",
    },
  ],

  sections: [
    {
      id: "what-is-clinician-led",
      heading: "What does clinician-led in-home nursing actually mean?",
      leadParagraph:
        "Clinician-led means an experienced clinician — typically an AHPRA-registered nurse — leads the service, reviews each household's clinical needs, and holds direct accountability for the care plan. The clinician isn't just a name on a quality-governance org chart; they're close to the day-to-day decisions about what care is delivered, by whom, and when it needs to change.",
      body: [
        "In practice, clinician-led usually means a smaller overall caseload (because the clinician is meaningfully involved in each household), a smaller and more consistent care team, and a tighter feedback loop between what carers see in the home and how the care plan is adjusted.",
        "It doesn't mean a clinician is personally delivering every visit. It means a clinician owns the clinical decisions and knows the households well enough to do that responsibly.",
      ],
    },
    {
      id: "what-is-agency-staff",
      heading: "What is an agency-staff model?",
      leadParagraph:
        "Agency-staff models — sometimes called broker models, marketplace models, or platform-based care — deliver care through workers placed by an agency that may draw from a wider worker pool. The agency typically has its own clinical governance team for compliance and risk oversight, but the relationship between that team and each household is usually more distant than in a clinician-led model.",
      body: [
        "Agency models exist for good reasons. They can fill shifts fast, cover wider geographic areas, and scale more readily. For some participants — particularly those with predominantly personal-care needs in less-served suburbs — they're often the practical choice.",
        "The trade-offs are usually around continuity of staff and how quickly subtle clinical changes get noticed and escalated.",
      ],
    },
    {
      id: "who-suits-each",
      heading: "Who does each model suit?",
      leadParagraph:
        "Clinician-led usually suits households with complex or changing clinical needs, where continuity of staff and clinical oversight matter for safety. Agency-staff usually suits households with stable, predominantly personal-care needs, in areas where geographic coverage matters more than continuity. Many participants and families do well in either model — the choice depends on what they value most.",
      bullets: [
        "Clinician-led usually suits — complex care, post-hospital recovery, palliative care, NDIS participants with high clinical support needs, families who value the same nurses across time",
        "Agency-staff usually suits — predominantly personal-care needs, stable health, less-served suburbs, situations where last-minute shift coverage matters more than continuity",
        "Either can work for — established NDIS support, lower-needs aged care, DVA Community Nursing where the panel includes both model types",
      ],
    },
    {
      id: "what-to-ask",
      heading: "What should families and coordinators ask either provider?",
      leadParagraph:
        "Regardless of model, there are concrete questions that distinguish providers who run their model well from providers who don't. These work for both clinician-led and agency-staff providers — the answers tell you how serious they are about quality.",
      bullets: [
        "Who is the clinical lead, and what is their AHPRA registration and clinical background?",
        "Will the same carers and nurses be matched with this household, or rotated?",
        "What's the typical response time when we report a change in condition?",
        "How do you communicate with the GP and treating team about changes?",
        "What's your worker-screening process — NDIS Worker Screening Check, training, supervision?",
        "How quickly can care start, and how do you handle the first few visits?",
      ],
    },
    {
      id: "in-sydney-specifically",
      heading: "Does the model matter more in Sydney specifically?",
      leadParagraph:
        "Sydney has a mix of both models across NDIS, DVA, aged care, and private nursing — and the right fit usually depends more on the household's clinical situation than on the geographic area. For complex care, post-hospital recovery, and palliative care across Sydney, the clinician-led model's strengths (continuity, clinical oversight) tend to be most visible. For stable personal-care needs in outer suburbs, agency-staff models often deliver good coverage at scale.",
      body: [
        "Veterans accessing DVA Community Nursing will find both model types on the current DVA panel — the choice is yours, and your GP, DVA caseworker, or hospital discharge planner can help shortlist providers that fit your situation.",
      ],
    },
  ],

  faqs: [
    {
      id: "faq-quality-difference",
      question: "Is clinician-led nursing higher quality than agency-staff?",
      answer:
        "Not automatically. Both models can deliver excellent or poor care depending on how they're run. Clinician-led models tend to have advantages in continuity and clinical oversight; agency-staff models tend to have advantages in coverage and shift-filling speed. Quality comes down to the specific provider's investment in training, supervision, and communication — not the model label alone.",
    },
    {
      id: "faq-cost",
      question: "Is one model cheaper than the other?",
      answer:
        "When billing against NDIS, DVA, or aged care funding, both models are bound by the same funding caps — so the per-hour cost is generally comparable. For private fee-for-service, agency-staff models are sometimes slightly cheaper at the personal-care level, while clinician-led models tend to price more consistently across personal care and complex nursing. Cost shouldn't be the only factor.",
    },
    {
      id: "faq-switch",
      question: "Can I switch between models if my needs change?",
      answer:
        "Yes. If your needs become more complex (post-hospital, palliative, complex care) and you're with an agency-staff provider, you can engage a clinician-led provider for the clinical scope and keep the agency for personal-care hours. The reverse also works — many families start with a clinician-led provider for a complex period (recovery, post-discharge) and shift to agency-staff support once they're stable.",
    },
    {
      id: "faq-staff-rotation",
      question: "Why does staff continuity matter for nursing?",
      answer:
        "For routine personal care, staff continuity matters mostly for comfort, dignity, and trust. For nursing, it matters clinically — subtle changes in skin colour, mood, gait, appetite, or behaviour are easier to spot when the same person sees the household across time. Continuity also reduces hand-over errors in medication and care routines. The clinical value of continuity grows with complexity.",
    },
    {
      id: "faq-which-is-gentle-care",
      question: "Which model is Gentle Care Nursing Services?",
      answer:
        "Gentle Care operates as a clinician-led service. Care is overseen by a clinician with direct accountability for each household's plan, with a deliberately small caseload so the same nurses and carers see each person across time. This works for households where continuity and clinical oversight matter; we're upfront if we think a participant would be better served by an agency-staff provider that can fill more shifts in a particular suburb.",
    },
  ],

  closing: {
    heading: "Looking for clinician-led in-home nursing in Sydney?",
    body: "Gentle Care Nursing Services is a clinician-led, registered NDIS provider and DVA Contracted Community Nursing Provider, delivering in-home nursing and personal care across Sydney with a small consistent team. We work across the Inner West, North Shore, Northern Beaches, Western Sydney, South Sydney, and the CBD and Eastern Suburbs — and we're upfront when an agency-staff provider would be a better fit for a household's situation.",
    internalLinks: [
      { href: "/services/nursing-care", label: "In-home nursing care" },
      { href: "/services/complex-care", label: "Complex care support" },
      { href: "/about", label: "About Gentle Care Nursing Services" },
      { href: "/referrers", label: "For support coordinators and discharge planners" },
    ],
  },
} as const;
