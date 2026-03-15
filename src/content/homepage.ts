/**
 * Homepage content — single source of truth.
 */

export const HOMEPAGE_HERO = {
  headline: "Personalised In-Home Nursing & Care",
  subheadline:
    "For families, NDIS participants, and referral partners. Registered provider. Dedicated support.",
} as const;

export const WHO_WE_HELP = {
  title: "Who We Help",
  subtitle: "We support families, coordinators, and healthcare professionals.",
  audiences: [
    {
      label: "Families",
      description:
        "Caring for a loved one at home? We provide skilled nursing and personal care to support your family.",
    },
    {
      label: "NDIS Coordinators",
      description:
        "Support coordinators and plan managers — we work with NDIS participants for quality in-home care.",
    },
    {
      label: "Discharge Planners",
      description:
        "Hospital and aged care discharge teams — we help transition clients safely home with ongoing support.",
    },
    {
      label: "Referral Partners",
      description:
        "GPs, specialists, and healthcare professionals — we make referrals simple and follow up quickly.",
    },
  ],
} as const;

export const WHY_DIFFERENT = {
  title: "Why Gentle Care Is Different",
  subtitle: "We focus on quality over volume.",
  differentiators: [
    {
      headline: "Smaller client load",
      description:
        "We take on fewer clients so each person receives more dedicated, attentive care.",
    },
    {
      headline: "Personalised support",
      description:
        "Care plans tailored to individual needs — not one-size-fits-all.",
    },
    {
      headline: "Fast response",
      description:
        "We respond to enquiries quickly so families and referrers get answers when they need them.",
    },
    {
      headline: "Registered provider",
      description:
        "NDIS and DVA registered. Professional, compliant, and trusted by coordinators and planners.",
    },
  ],
} as const;

export const PROCESS_STEPS = {
  title: "How It Works",
  subtitle: "From enquiry to care — we make it straightforward.",
  steps: [
    {
      number: 1,
      headline: "Submit your enquiry",
      description: "Tell us about your needs via our simple form or by contacting us directly.",
    },
    {
      number: 2,
      headline: "We respond quickly",
      description: "Our team reviews your enquiry and gets back to you within 24–48 hours.",
    },
    {
      number: 3,
      headline: "Care begins",
      description: "We match you with the right support and arrange care to start as soon as possible.",
    },
  ],
} as const;

export const AI_ASSISTANT = {
  title: "Questions? Our AI Assistant Can Help",
  subtitle:
    "Get instant answers about our services, eligibility, or how to get started.",
  primaryCtaLabel: "Speak With Our AI Assistant",
  secondaryCtaLabel: "Request Care",
} as const;

export const HOMEPAGE_FAQ = [
  {
    id: "who-can-access",
    question: "Who can access your services?",
    answer:
      "We support NDIS participants, DVA clients, aged care recipients, and private clients. If you or someone you care for needs in-home nursing or personal care, we can help. Contact us or use our AI assistant to discuss eligibility.",
  },
  {
    id: "response-time",
    question: "How quickly do you respond?",
    answer:
      "We aim to respond to all enquiries within 24–48 hours. For urgent referrals, we prioritise and will get back to you as soon as possible.",
  },
  {
    id: "funding",
    question: "What funding do you accept?",
    answer:
      "We accept NDIS, DVA, aged care (Home Care Packages, CHSP), and private funding. Our team can help you understand your options and what may apply to your situation.",
  },
  {
    id: "make-referral",
    question: "How do I make a referral?",
    answer:
      "Use our Request Care form to submit an enquiry. Include the client's details, care needs, and funding type. We'll review and respond quickly. Support coordinators and discharge planners can also contact us directly.",
  },
] as const;
