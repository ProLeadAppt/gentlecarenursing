/**
 * Homepage content. Single source of truth.
 * Tone: warm, compassionate, reassuring; communicates care, safety, and responsiveness.
 */

export const HOMEPAGE_HERO = {
  eyebrow: "Clinician-Led · Personalised · Sydney",
  /** Segmented headline for staggered cinematic reveal */
  headlineSegments: [
    "Compassionate",
    "In-Home Care",
    "& Disability Support",
  ] as const,
  subheadline:
    "Quality over volume. Your loved ones deserve a team that actually cares.",
  /** Hero image (right column). Default: carer-elderly. */
  heroImageSrc: "/images/vitaly-gariev-Wk6f1CkGlEo-unsplash.webp",
  heroImageAlt: "Professional nurse providing compassionate in-home care",
} as const;

/** Emotional challenges section (after StatsBar): acknowledges what families face */
export const REASSURANCE_SECTION = {
  headline: "Finding the Right Care Should Feel Reassuring, Not Overwhelming.",
  problems: [
    "Reliable carers can be difficult to find.",
    "Families want reassurance their loved ones are safe.",
    "Coordinating support services can feel complicated.",
  ] as const,
  transitionLine: "That's exactly why Gentle Care Nursing Services exists.",
} as const;

/** One-line local proof (e.g. near first CTA or after TrustBar) */
export const HOMEPAGE_LOCAL_PROOF = {
  line: "Serving Sydney and surrounds. In-home nursing and care when you need it.",
  linkLabel: "View areas we serve",
  linkHref: "#areas-we-serve",
} as const;

export const WHO_WE_HELP = {
  title: "Who We Help",
  subtitle:
    "Whoever you are: a family looking for peace of mind, a coordinator needing a provider you can rely on, or a professional making a referral. We focus on quality support for a smaller number of people so we can give you the time and attention you deserve.",
  sectionImage: "/images/age-cymru-2obyM4zYt3Y-unsplash.webp",
  sectionImageAlt: "Older person and carer in a calm, supportive moment at home",
  audiences: [
    {
      label: "Support Coordinators",
      description:
        "You need a provider that's responsive and reliable. We work closely with NDIS participants and coordinators to deliver quality in-home care without the high client volume.",
    },
    {
      label: "Families",
      description:
        "Caring for a loved one can be overwhelming. We provide skilled nursing and personal care so you can feel confident they're supported with dignity and respect.",
    },
    {
      label: "Hospitals & Planners",
      description:
        "Safe transition from hospital to home matters. We coordinate with discharge teams to provide nursing and support that helps with recovery and avoids having to go back to hospital.",
    },
    {
      label: "Plan Managers",
      description:
        "We make the process straightforward and follow up quickly. You can trust our registration and compliance for all NDIS and DVA participants.",
    },
  ],
} as const;

export const WHY_DIFFERENT = {
  title: "Why Choose Gentle Care",
  subtitle:
    "We believe everyone deserves care that feels personal, professional, and reliable. Here's why families and coordinators trust us.",
  imageSrc: "/images/age-cymru-bSXk1lOp8T0-unsplash.webp",
  imageAlt: "Carer and client in a warm, personal moment of support at home",
  differentiators: [
    {
      headline: "Person-centred care",
      description:
        "Your health needs and home life are unique. We listen carefully and create a care plan around you, ensuring your voice is heard in every decision.",
    },
    {
      headline: "Experienced staff",
      description:
        "Our team brings years of clinical experience into the home with the compassion and professionalism that helps you feel safe and supported.",
    },
    {
      headline: "Quality over volume",
      description:
        "We focus on providing personalised care to a smaller number of participants. This ensures we can maintain quality and never rush our support.",
    },
    {
      headline: "Working together",
      description:
        "We work closely with support coordinators, families, and health professionals to make sure everything runs smoothly and you feel well looked after.",
    },
  ],
} as const;

/** Optional section image for Our Services (homepage). */
export const HOMEPAGE_SERVICES_IMAGE = {
  sectionImage: "/images/vitaly-gariev-Wk6f1CkGlEo-unsplash.webp",
  sectionImageAlt: "Calm, professional in-home care moment",
} as const;

export const PROCESS_STEPS = {
  title: "How It Works",
  subtitle:
    "From your first call to care at home: simple steps, quick response, and no one left waiting or wondering what happens next.",
  steps: [
    {
      number: 1,
      headline: "Submit an enquiry or referral",
      description:
        "Use our simple online form to tell us about your situation, or reach out if you're a coordinator or health professional. It only takes a few minutes.",
    },
    {
      number: 2,
      headline: "Immediate acknowledgement",
      description:
        "As soon as you submit the form, our team is notified straight away and you receive confirmation we've received it. You're not sending your request into a void.",
    },
    {
      number: 3,
      headline: "Understanding your needs",
      description:
        "A real person follows up within 24 hours to listen and understand what's important to you. Together, we'll talk about what support will help most.",
    },
    {
      number: 4,
      headline: "Care begins",
      description:
        "We match you or your loved one with the right nurse or carer and confirm when visits will start. From day one, you'll know who is coming, what they will do, and how to reach us if anything changes.",
    },
  ],
} as const;

/** Section encouraging healthcare professionals and coordinators to make referrals */
export const REFERRAL_PROFESSIONALS = {
  headline: "We Welcome Referrals from Partners in Care",
  subtitle:
    "Gentle Care works closely with Support Coordinators, Plan Managers, Hospitals, Allied Health Professionals, and Families. We make the transition easy and keep you informed.",
} as const;

/** Get in touch / quick-response section: immediate acknowledgement, clear next steps, optional voice assistant */
export const GET_IN_TOUCH = {
  title: "Get Help Quickly. You're Not Left Waiting.",
  subtitle:
    "When you reach out, our team is notified straight away. You'll get a personal response within 24 hours to talk through next steps. No being passed around.",
  primaryCtaLabel: "Request Care",
  secondaryCtaLabel: "Contact Us",
  benefits: [
    "You'll hear from us within 24 hours",
    "We confirm your message as soon as you send it",
    "Clear next steps. No waiting in the dark.",
  ] as const,
  voiceAssistantLine: "Need guidance right now? Use our voice assistant below for immediate help.",
} as const;

export const HOMEPAGE_STATS = [
  { value: "10+", label: "Yrs Clinician Experience" },
  { value: "Quality", label: "Over Volume" },
  { value: "Small", label: "Clinical Team" },
  { value: "~24hr", label: "Response Window" },
] as const;

/** Re-export single source for areas (GMB-aligned). Use AREAS_SERVED from areas-served.ts elsewhere. */
export { AREAS_SERVED as HOMEPAGE_AREAS } from "./areas-served";

/** Inline CTA bands between sections: warm, low-pressure, quick response */
export const HOMEPAGE_INLINE_CTAS = {
  afterWhoWeHelp: "Not sure where to start? We're happy to talk it through, and we'll get back to you quickly.",
  afterWhyDifferent: "Ready to take the next step? Reach out and you'll hear from us within 24 hours.",
} as const;

/** Final CTA section: two clear actions, reassurance below */
export const HOMEPAGE_FINAL_CTA = {
  title: "Need Care or Want to Make a Referral?",
  reassurance:
    "Once you submit your enquiry, our team is notified immediately so your request can be reviewed quickly.",
} as const;

export const HOMEPAGE_FAQ = [
  {
    id: "are-you-registered",
    question: "Are you registered with NDIS and DVA?",
    answer:
      "Yes. Gentle Care Nursing Services is a registered NDIS provider and a DVA Contracted Community Nursing Provider, supporting eligible Veteran Card holders with clinically required nursing and personal care services at home. We meet the quality and safety standards required by both schemes, so coordinators and referrers can refer with confidence.",
  },
  {
    id: "who-can-access",
    question: "Who can access your services?",
    answer:
      "We support NDIS participants, DVA clients, aged care recipients, and private clients. If you or someone you care for needs in-home nursing or personal care, we can help. Get in touch and we'll talk through what might work for you.",
  },
  {
    id: "response-time",
    question: "How quickly do you respond?",
    answer:
      "You'll get an immediate confirmation when you submit an enquiry. Our team is notified straight away and a real person will get back to you within 24 hours (often same day for urgent referrals). We don't leave people waiting.",
  },
  {
    id: "funding",
    question: "What funding do you accept?",
    answer:
      "We accept NDIS, DVA, aged care (Support at Home and CHSP), and private funding. Our team will help you understand your options in plain language.",
  },
  {
    id: "make-referral",
    question: "How do I make a referral?",
    answer:
      "Use our Request Care form with the client's details, care needs, and funding type. You'll receive confirmation that we've got it, and we'll respond with clear next steps within 24 hours. Support coordinators and discharge planners can also contact us directly.",
  },
  {
    id: "continuity-of-care",
    question: "Will I have the same nurse or carer each visit?",
    answer:
      "Yes. Continuity of care is one of our core values. We match you with a consistent team so you can build trust and familiarity. We don't believe in rotating strangers through your home.",
  },
  {
    id: "costs-and-funding",
    question: "How much does it cost and how much time can I access?",
    answer:
      "Costs depend on the level of care required and your funding type (NDIS, DVA, or aged care). We provide a clear breakdown of fees and help you understand how many hours of support your budget allows. There are no hidden charges.",
  },
  {
    id: "complex-care",
    question: "Do you support complex care needs at home?",
    answer:
      "Absolutely. Our nursing team is experienced in complex clinical care, including post-hospital recovery, dementia care, and disability support. We work closely with your healthcare team to ensure a safe, professional environment at home.",
  },
  {
    id: "respite-and-overnight",
    question: "Do you offer respite or overnight care?",
    answer:
      "Yes. We provide respite care to give family members a break. We can provide overnight support and extended hours depending on care needs, funding and staff availability.",
  },
  {
    id: "immediate-help",
    question: "Can I get help right away?",
    answer:
      "Yes. You can call us anytime during business hours, or use the voice assistant on this site for immediate guidance. For non-urgent enquiries, the Request Care form gets you a personal response within 24 hours.",
  },
] as const;
