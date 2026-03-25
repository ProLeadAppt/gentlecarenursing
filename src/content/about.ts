/**
 * About page content.
 */

/** One-sentence entity definition for GEO / schema and on-page use */
export const ELEVATOR_PITCH =
  "Gentle Care Nursing is a Sydney-based, registered NDIS and DVA provider delivering in-home nursing and personal care to families, NDIS participants, and referral partners.";

export const ABOUT_INTRO = {
  title: "About Gentle Care Nursing",
  lead: "We are a boutique nursing and care provider focused on providing personalised, high-quality support to a smaller number of people. This ensures every individual receives the time and attention they need to maintain their independence and dignity.",
  /** Stats in prose for GEO / authority */
  statsLine: "With 10+ years of experience and a deep focus on compassionate clinical care, we respond to every enquiry within 24 hours.",
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
      "We're registered, compliant, and experienced. NDIS and DVA registered. Families and coordinators can refer with confidence.",
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
    "Registered DVA community nursing provider",
    "Qualified registered nurses and care professionals",
    "Compliant with all relevant industry standards",
    "Trusted by families, support coordinators, and healthcare professionals",
  ],
} as const;

/** Founder story — placeholder content until Gemma provides her details */
export const FOUNDER_STORY = {
  name: "Gemma",
  title: "Founder & Clinical Director",
  bio: "After more than a decade in clinical nursing, I saw firsthand how large providers struggled to give people the individual attention they deserved. Families were frustrated. Coordinators were let down. I started Gentle Care Nursing because I believed there was a better way — a boutique model where quality comes before volume, and every person is treated like family.",
  quote:
    "I started this because I wanted to build the kind of service I'd trust with my own family.",
  imageSrc: "/images/national-cancer-institute-BxXgTQEw1M4-unsplash.webp",
  imageAlt: "Gemma, Founder and Clinical Director of Gentle Care Nursing",
} as const;

/** Team members — placeholder data until Gemma provides real team info */
export const TEAM_MEMBERS = [
  {
    name: "Gemma",
    role: "Founder & Clinical Director",
    bio: "Registered Nurse with 10+ years in clinical care. Leads all care planning and quality oversight.",
  },
  {
    name: "Sandra",
    role: "Care Coordinator",
    bio: "Ensures every client is matched with the right carer and manages scheduling across all regions.",
  },
  {
    name: "Nursing Team",
    role: "Registered Nurses & Carers",
    bio: "Qualified professionals selected for clinical skills, compassion, and commitment to boutique care.",
  },
] as const;

/** Key milestones — placeholder dates for timeline */
export const MILESTONES = [
  {
    year: "2014",
    title: "Gentle Care Nursing Founded",
    description:
      "Born from a belief that in-home care should be personal, responsive, and clinician-led.",
  },
  {
    year: "2016",
    title: "NDIS Registered Provider",
    description:
      "Registered as an NDIS provider to support participants with in-home nursing and disability support.",
  },
  {
    year: "2018",
    title: "DVA Approved Provider",
    description:
      "Approved to deliver community nursing services for veterans and their families.",
  },
  {
    year: "2022",
    title: "Expanded Across Sydney",
    description:
      "Extended coverage across Greater Sydney, supporting families from the Inner West to the North Shore and beyond.",
  },
  {
    year: "2025",
    title: "Boutique Model, Proven Results",
    description:
      "Continuing to grow with intention. Smaller client loads, dedicated nurses, and a 24-hour response guarantee.",
  },
] as const;

/** Trust statistics bar — placeholder numbers */
export const TRUST_STATS = [
  { value: "10+", label: "Years of Experience" },
  { value: "150+", label: "Families Supported" },
  { value: "24hr", label: "Response Guarantee" },
  { value: "100%", label: "NDIS & DVA Registered" },
] as const;
