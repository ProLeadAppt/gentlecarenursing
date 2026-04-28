/**
 * About page content.
 */

/** One-sentence entity definition for GEO / schema and on-page use */
export const ELEVATOR_PITCH =
  "Gentle Care Nursing is a Sydney-based, registered NDIS provider and DVA Contracted Community Nursing Provider, delivering in-home nursing and personal care to families, NDIS participants, and referral partners.";

export const ABOUT_INTRO = {
  title: "About Gentle Care Nursing",
  lead: "We are a personalised nursing and care provider focused on providing high-quality support to a smaller number of people. This ensures every individual receives the time and attention they need to maintain their independence and dignity.",
  /** Stats in prose for GEO / authority */
  statsLine: "Led by a care professional with over 10 years of hands-on experience in disability, aged care and in-home support. We aim to respond to every enquiry within 24 hours.",
} as const;

export const MISSION = {
  title: "Our Mission",
  description:
    "To provide personalised, high-quality in-home nursing and care services that help people live safely, comfortably, and independently at home, while making it easy for families and professionals to access the support they need.",
} as const;

export const VALUES = [
  {
    title: "Quality Over Volume",
    description:
      "We take on fewer clients so every person receives more dedicated, attentive care. We don't rush, and we don't cut corners.",
  },
  {
    title: "Trust and Transparency",
    description:
      "We communicate openly with families and referral partners. You'll always know what's happening with care, and we'll always be upfront.",
  },
  {
    title: "Personalised Care",
    description:
      "Every care plan is tailored to the individual. We take time to understand each person's needs, preferences, and goals.",
  },
  {
    title: "Professionalism",
    description:
      "We're registered, compliant, and experienced. Registered NDIS provider and DVA Contracted Community Nursing Provider. Families and coordinators can refer with confidence.",
  },
  {
    title: "Responsiveness",
    description:
      "We respond to enquiries quickly, usually within 24 to 48 hours. When families and coordinators need help, we move fast.",
  },
  {
    title: "Compassion",
    description:
      "Behind every service is genuine care. We treat every client like family, because that's the standard we hold ourselves to.",
  },
] as const;

export const WHY_PERSONALISED = {
  title: "Why Personalised Care Matters",
  description:
    "Many providers operate at scale: large client loads, rotating staff, and limited time per person. We chose a different model. By keeping our client load smaller, we can offer more consistent, more attentive, and more meaningful care. Families notice the difference. Coordinators trust the results.",
} as const;

export const PROFESSIONAL_TRUST = {
  title: "Professional, Registered, Trusted",
  items: [
    "Registered NDIS provider",
    "DVA Contracted Community Nursing Provider",
    "Qualified registered nurses and care professionals",
    "Compliant with all relevant industry standards",
    "Trusted by families, support coordinators, and healthcare professionals",
  ],
} as const;

/** Founder story — Gemma, Founder & Clinical Director */
export const FOUNDER_STORY = {
  name: "Gemma",
  title: "Founder & Clinical Director",
  bio: "Gentle Care Nursing Services began because I wanted to provide care that is genuinely compassionate, personal, and consistent. Through my 13 years of experience across dementia care, palliative care, disability support, and mental health challenges, I saw how important it is for individuals and families to feel supported by a team that values dignity, trust, and continuity of care.",
  qualifications: [
    "Registered Nurse (10+ Years Experience)",
    "Aged Care Certifications",
    "Disability Support Certifications",
    "Clinical Leadership and Care Planning",
  ],
  quote:
    "My favourite part of this work is being able to make a meaningful difference in people’s lives while giving families peace of mind that their loved one is being cared for with compassion, dignity, and respect.",
  imageSrc: "/images/gemma-profile.jpg",
  imageAlt: "Gemma, Founder and Clinical Director of Gentle Care Nursing",
} as const;

/** Team members — placeholder data until Gemma provides real team info */
export const TEAM_MEMBERS = [
  {
    name: "Gemma",
    role: "Founder & Clinical Director",
    bio: "Registered Nurse with over a decade of hands-on experience in clinical care. Leads all care planning and quality oversight.",
  },
  {
    name: "Sandra",
    role: "Care Coordinator",
    bio: "Ensures every client is matched with the right carer and manages scheduling across all regions.",
  },
  {
    name: "Nursing Team",
    role: "Registered Nurses & Carers",
    bio: "Our small clinical team is selected for their clinical skills and commitment to personalised, person-centred care.",
  },
] as const;

/** Key milestones — From founding to registered provider status */
export const MILESTONES = [
  {
    year: "2018",
    title: "Gentle Care Nursing Founded",
    description:
      "Born from a belief that in-home care should be personal, responsive, and clinician-led.",
  },
  {
    year: "2019",
    title: "NDIS Registered Provider",
    description:
      "Registered as an NDIS provider to support participants with in-home nursing and disability support.",
  },
  {
    year: "2020",
    title: "DVA Contracted Community Nursing Provider",
    description:
      "Contracted to deliver DVA Community Nursing services for eligible Veteran Card holders.",
  },
  {
    year: "2022",
    title: "Expanded Across Sydney",
    description:
      "Extended coverage across Greater Sydney, supporting families from the Inner West to the North Shore and beyond.",
  },
  {
    year: "2025",
    title: "Personalised Model, Proven Results",
    description:
      "Continuing to grow with intention. Smaller client loads, a dedicated clinical team, and a clear response window.",
  },
] as const;

/** Trust statistics bar — Verified, conservative figures */
export const TRUST_STATS = [
  { value: "10+", label: "Yrs Clinician Experience" },
  { value: "Quality", label: "Over Volume" },
  { value: "Small", label: "Clinical Team" },
  { value: "~24hr", label: "Response Window" },
] as const;

/** Case studies — Placeholder for future detailed cases */
export const CASE_STUDIES = {
  title: "Coming Soon: Case Studies",
  description: "We are currently preparing anonymised case studies to show how we support families through complex situations.",
  topics: [
    "Complex Home Care",
    "Disability Support (NDIS)",
    "Hospital-to-Home Transitions",
    "Palliative and End of Life Care",
  ],
} as const;
