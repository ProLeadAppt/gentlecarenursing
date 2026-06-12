/**
 * About page content.
 */

/**
 * One-sentence entity definition. Used as schema description on
 * MedicalBusiness/Organization and on the about page. Keeps the full
 * entity name and the "in-home nursing" keyword pair — these are the
 * canonical anchors for GEO/AEO entity recognition and Google ranking
 * for "[NDIS|DVA] in-home nursing Sydney" intents.
 */
export const ELEVATOR_PITCH =
  "Gentle Care Nursing Services is a Sydney-based, registered NDIS provider and DVA Contracted Community Nursing Provider, delivering personalised in-home nursing and care to families, NDIS participants, and referral partners.";

export const ABOUT_INTRO = {
  // H1 keeps the full entity name. Visible nav can still use the short
  // "About" label.
  title: "About Gentle Care Nursing Services",
  lead: "We are a personalised in-home nursing and care team focused on delivering high-quality support, consistency, and genuine relationships.",
  /** Stats in prose for GEO / authority.
   *  Updated 2026-06-10 per Gemma's brief — dropped "over 10 years",
   *  replaced with the softer, team-led framing she requested. */
  statsLine:
    "Led by a care team with hands-on experience across community care, aged care, disability support, and nursing services. We aim to respond to every enquiry within 24 hours.",
} as const;

export const MISSION = {
  title: "Our Mission",
  description:
    "To provide personalised, high-quality in-home nursing and care services that help people live safely, comfortably, and independently at home, while making it easy for families and professionals to access the support they need.",
} as const;

export const VALUES = [
  {
    title: "Quality-Focused Support",
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
      "We're registered, compliant, and experienced. Registered NDIS provider and DVA Contracted provider. Families and coordinators can refer with confidence.",
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
    "DVA Contracted provider",
    "Experienced care professionals and support workers",
    "Compliant with all relevant industry standards",
    "Trusted by families, support coordinators, and healthcare professionals",
  ],
} as const;

/** Founder story — Gemma, Founder of Gentle Care */
export const FOUNDER_STORY = {
  name: "Gemma",
  title: "Founder",
  bio: "Gentle Care was created to provide families with dependable, compassionate support that feels personal, respectful and consistent.\n\nThrough hands-on work across dementia care, palliative care, disability support and mental health, I saw how important it is for individuals and families to feel supported by a team that values dignity, trust and continuity of care.",
  quote:
    "My favourite part of this work is being able to make a meaningful difference in people’s lives while giving families peace of mind knowing their loved one is being cared for with compassion, dignity and respect.",
  imageSrc: "/images/gemma-profile.jpg",
  imageAlt: "Gemma, Founder of Gentle Care",
} as const;

/** Team members — placeholder data until Gemma provides real team info */
export const TEAM_MEMBERS = [
  {
    name: "Gemma",
    role: "Founder",
    bio: "Care professional with hands-on experience across community, disability, and in-home support. Leads all care planning and quality oversight.",
  },
  {
    name: "Sandra",
    role: "Care Coordinator",
    bio: "Ensures every client is matched with the right carer and manages scheduling across all regions.",
  },
  {
    name: "Care Team",
    role: "Care Professionals & Support Workers",
    bio: "Our small team is selected for their experience, reliability, and commitment to personalised, person-centred care.",
  },
] as const;

/** Trust statistics bar — Verified, conservative figures.
 *  Updated 2026-06-10 per Gemma's brief — drop the "10+" stat. */
export const TRUST_STATS = [
  { value: "Led", label: "By an experienced care team" },
  { value: "Personal", label: "Quality-focused support" },
  { value: "Small", label: "Dedicated caseload" },
  { value: "~24hr", label: "Response window" },
] as const;
