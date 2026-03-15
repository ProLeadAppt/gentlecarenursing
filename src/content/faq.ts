/**
 * FAQ items — full list for the FAQ page and service page snippets.
 */

export interface FaqCategory {
  title: string;
  items: { id: string; question: string; answer: string }[];
}

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    title: "General",
    items: [
      {
        id: "registered-provider",
        question: "Are you a registered NDIS and DVA provider?",
        answer:
          "Yes. Gentle Care Nursing is fully registered with the NDIS and is a registered DVA community nursing provider. We meet all required quality and safety standards.",
      },
      {
        id: "what-services",
        question: "What services does Gentle Care Nursing provide?",
        answer:
          "We provide in-home nursing and personal care services across NDIS, DVA, aged care (Home Care Packages and CHSP), and private funding. Our services include clinical nursing, personal care, medication management, wound care, post-hospital recovery, respite, and more.",
      },
      {
        id: "service-areas",
        question: "What areas do you service?",
        answer:
          "We provide in-home nursing and care across Sydney and surrounds, including Inner West, North Shore, Western Sydney, Northern Beaches, South Sydney, and Sydney CBD and East. Contact us to confirm coverage for your suburb.",
      },
      {
        id: "who-provides",
        question: "Who provides the care?",
        answer:
          "All care is delivered by qualified registered nurses and experienced care professionals. We carefully match clients with carers based on needs, preferences, and compatibility.",
      },
    ],
  },
  {
    title: "Getting Started",
    items: [
      {
        id: "how-start",
        question: "How do I get started?",
        answer:
          "Submit an enquiry through our Request Care form, or contact us directly by phone or email. We'll discuss your needs, explain your options, and arrange care as quickly as possible.",
      },
      {
        id: "response-time",
        question: "How quickly do you respond to enquiries?",
        answer:
          "We aim to respond to all enquiries within 24–48 hours. For urgent referrals, we prioritise and will get back to you as soon as possible.",
      },
      {
        id: "assessment",
        question: "Is there an assessment before care starts?",
        answer:
          "Yes. We conduct an initial assessment to understand the client's needs, preferences, and goals. This helps us create a tailored care plan and match the right carer to each client.",
      },
    ],
  },
  {
    title: "Funding & Costs",
    items: [
      {
        id: "funding-types",
        question: "What funding do you accept?",
        answer:
          "We accept NDIS, DVA, aged care (Home Care Packages Levels 1–4, CHSP), and private funding. Our team can help you understand which options may apply to your situation.",
      },
      {
        id: "private-cost",
        question: "How much does private care cost?",
        answer:
          "Costs for private care depend on the type of service, duration, and frequency. Contact us for a personalised quote — we're transparent about pricing with no hidden fees.",
      },
      {
        id: "dva-cost",
        question: "Is DVA care free for veterans?",
        answer:
          "For eligible veterans with a DVA Gold or White Card, services are provided at no out-of-pocket cost. We handle all claims directly with DVA on your behalf.",
      },
    ],
  },
  {
    title: "Referrals",
    items: [
      {
        id: "how-refer",
        question: "How do I make a referral?",
        answer:
          "Use our Request Care form to submit a referral. Include the client's details, care needs, and funding type. We'll review and respond quickly. Support coordinators, discharge planners, and healthcare professionals can also contact us directly.",
      },
      {
        id: "who-can-refer",
        question: "Who can make a referral?",
        answer:
          "Anyone can make a referral — families, NDIS support coordinators, hospital discharge planners, GPs, specialists, and other healthcare professionals. Self-referrals are also welcome.",
      },
      {
        id: "referral-info",
        question: "What information do I need to make a referral?",
        answer:
          "The more detail, the better — but we can work with what you have. Ideally: client name, contact details, funding type (NDIS, DVA, aged care, private), a brief description of care needs, and any relevant medical information.",
      },
    ],
  },
  {
    title: "About Our Care",
    items: [
      {
        id: "ndis-registered",
        question: "Is Gentle Care Nursing a registered NDIS provider?",
        answer:
          "Yes. We are a fully registered NDIS provider, meeting all quality and safety standards required by the NDIS Quality and Safeguards Commission.",
      },
      {
        id: "dva-registered",
        question: "Are you a registered DVA provider?",
        answer:
          "Yes. Gentle Care Nursing is a registered DVA community nursing provider. We provide care to eligible veterans and handle DVA claims directly.",
      },
      {
        id: "different",
        question: "What makes Gentle Care different?",
        answer:
          "We take on fewer clients so each person receives more dedicated, attentive care. We focus on quality over volume — personalised care plans, consistent carers, fast response times, and genuine support for families and referral partners.",
      },
    ],
  },
];

/** Flat list of all FAQ items for schema and search */
export const ALL_FAQ_ITEMS = FAQ_CATEGORIES.flatMap((cat) => cat.items);
