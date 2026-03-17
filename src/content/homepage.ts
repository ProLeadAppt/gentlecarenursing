/**
 * Homepage content. Single source of truth.
 * Tone: warm, compassionate, reassuring; communicates care, safety, and responsiveness.
 */

export const HOMEPAGE_HERO = {
  /** Optional soft line above headline (trust without sounding corporate) */
  trustLine: "Registered NDIS & DVA provider",
  headline: "Care That Feels Calm, Safe, and Personal",
  subheadline:
    "In-home nursing and support across Sydney, for you or someone you love. We're here from the first conversation to ongoing care, and we respond quickly because we know that matters.",
  /** Value pills: soft, trust-focused, not badge-y */
  valuePills: ["We reply within 24 hours", "Registered & trusted", "Care tailored to you", "Here for Sydney"] as const,
  /** Hero image (right column). Default: carer-elderly. */
  heroImageSrc: "/images/carer-elderly.webp",
  heroImageAlt: "Nurse assisting a patient in a home environment",
} as const;

/** Emotional challenges section (after StatsBar): acknowledges what families face */
export const REASSURANCE_SECTION = {
  headline: "Finding the Right Care Should Feel Reassuring, Not Overwhelming.",
  problems: [
    "Reliable carers can be difficult to find.",
    "Families want reassurance their loved ones are safe.",
    "Coordinating support services can feel complicated.",
  ] as const,
  transitionLine: "That's exactly why Gentle Care Nursing exists.",
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
    "Whoever you are: a family looking for peace of mind, a coordinator needing a provider you can rely on, or a professional making a referral. We're here to help. No runaround, no long waits.",
  sectionImage: "/images/age-cymru-2obyM4zYt3Y-unsplash.webp",
  sectionImageAlt: "Older person and carer in a calm, supportive moment at home",
  audiences: [
    {
      label: "Families",
      description:
        "Caring for a loved one at home can be overwhelming. We provide skilled nursing and personal care so you can feel confident they're in good hands.",
    },
    {
      label: "NDIS Coordinators",
      description:
        "You need a provider that's responsive and reliable. We work closely with NDIS participants and their coordinators to deliver quality in-home care.",
    },
    {
      label: "Discharge Planners",
      description:
        "Safe transition from hospital to home matters. We coordinate with your team and provide ongoing nursing and support so clients stay safe and supported.",
    },
    {
      label: "Referral Partners",
      description:
        "We make referrals straightforward and follow up quickly. You can refer with confidence knowing we'll respond and keep you in the loop.",
    },
  ],
} as const;

export const WHY_DIFFERENT = {
  title: "Why Gentle Care Is Different",
  subtitle:
    "We believe everyone deserves care that feels personal, professional, and reliable. Here's how we show up for you.",
  imageSrc: "/images/age-cymru-bSXk1lOp8T0-unsplash.webp",
  imageAlt: "Carer and client in a warm, personal moment of support at home",
  differentiators: [
    {
      headline: "Personalised care plans",
      description:
        "Your situation, health needs, and home life are unique. We listen carefully and create a care plan around you or your loved one, rather than forcing you into a one-size-fits-all service.",
    },
    {
      headline: "Experienced nursing team",
      description:
        "Gentle Care nurses bring years of clinical experience into the home, with the calm, professional support that helps people feel safe. Families and coordinators know there is a capable team standing behind every visit.",
    },
    {
      headline: "Compassionate, dignified care",
      description:
        "Good care is about more than tasks. We take time to build trust, protect dignity, and support the emotional load families carry when someone they love needs extra help.",
    },
    {
      headline: "Responsive communication",
      description:
        "We know waiting for a reply can be stressful. Enquiries submitted through this website are received straight away by our team so a real person can respond quickly with clear next steps and ongoing updates.",
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
    "From your first enquiry to care at home: clear steps, quick response, and no one left waiting or wondering what happens next.",
  steps: [
    {
      number: 1,
      headline: "Submit an enquiry or referral",
      description:
        "Use our simple online form to tell us about your situation, or submit a referral if you're a coordinator or health professional. It only takes a few minutes.",
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
        "A real person follows up within 24 hours to listen, ask questions, and understand your goals, funding, and preferences. Together, we agree on what support will help most.",
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
  headline: "Simple Referrals for Healthcare Professionals.",
  subtitle:
    "Gentle Care works closely with support coordinators, discharge planners, and healthcare providers. We make referrals straightforward and respond quickly so you and your clients know what happens next.",
} as const;

/** Get in touch / quick-response section: immediate acknowledgement, clear next steps, optional voice assistant */
export const GET_IN_TOUCH = {
  title: "Get Help Quickly. You're Not Left Waiting.",
  subtitle:
    "When you reach out, our team is notified straight away. You'll get a personal response within 24 hours, with clear next steps and supportive guidance. No runaround.",
  primaryCtaLabel: "Request Care",
  secondaryCtaLabel: "Contact Us",
  benefits: [
    "You'll hear from us within 24 hours",
    "Immediate confirmation when you enquire",
    "Clear next steps. No waiting in the dark.",
  ] as const,
  voiceAssistantLine: "Need guidance right now? Use our voice assistant below for immediate help.",
} as const;

export const HOMEPAGE_STATS = [
  { value: "10+", label: "Years of Experience" },
  { value: "1,300+", label: "Families & Clients Supported" },
  { value: "24hr", label: "Personal Response Time" },
  { value: "100%", label: "NDIS & DVA Registered" },
] as const;

/** Testimonials for homepage. Replace with real, legally cleared quotes when available. */
export const HOMEPAGE_TESTIMONIALS = [
  {
    quote:
      "Gentle Care Nursing made finding care for my mother so much easier. They responded quickly, matched us with an excellent nurse, and the quality of care has been outstanding. I finally feel confident she's in good hands.",
    name: "Sarah M.",
    role: "Family Member, Sydney",
    rating: 5,
    serviceTag: "aged-care",
    regionTag: "inner-west",
  },
  {
    quote:
      "As a support coordinator, I need providers I can trust. Gentle Care is responsive, professional, and genuinely cares about participant outcomes. They've become my go-to for in-home nursing referrals.",
    name: "James L.",
    role: "NDIS Support Coordinator",
    rating: 5,
    serviceTag: "ndis",
    regionTag: "sydney-wide",
  },
  {
    quote:
      "The discharge planning team at our hospital has referred several patients to Gentle Care. Their turnaround time is impressive and the continuity of care from hospital to home is exactly what our patients need.",
    name: "Dr. Priya K.",
    role: "Hospital Discharge Planner",
    rating: 5,
    serviceTag: "post-hospital-care",
    regionTag: "north-shore",
  },
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
      "Yes. Gentle Care Nursing is a registered NDIS provider and a registered DVA community nursing provider. We meet the quality and safety standards required by both schemes, so coordinators and referrers can refer with confidence.",
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
      "We accept NDIS, DVA, aged care (Home Care Packages, CHSP), and private funding. Our team will help you understand your options in plain language.",
  },
  {
    id: "make-referral",
    question: "How do I make a referral?",
    answer:
      "Use our Request Care form with the client's details, care needs, and funding type. You'll receive confirmation that we've got it, and we'll respond with clear next steps within 24 hours. Support coordinators and discharge planners can also contact us directly.",
  },
  {
    id: "immediate-help",
    question: "Can I get help right away?",
    answer:
      "Yes. You can call us anytime during business hours, or use the voice assistant on this site for immediate guidance. For non-urgent enquiries, the Request Care form gets you a personal response within 24 hours.",
  },
] as const;
