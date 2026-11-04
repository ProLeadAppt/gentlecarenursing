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
  lead: "At Gentle Care Nursing Services, we believe care should feel personal, consistent, and easy to understand. We work closely with clients, families, support coordinators, plan managers, case managers, and health professionals to provide safe and compassionate support at home.",
  /** Stats in prose for GEO / authority.
   *  Updated 2026-06-10 per Gemma's brief — dropped "over 10 years",
   *  replaced with the softer, team-led framing she requested. */
  statsLine:
    "Led by a care team with strong hands-on experience in community care, aged care, disability support, and nursing services.",
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
      "We discuss care needs, staff roles and service arrangements with families and referral partners before care begins.",
  },
  {
    title: "Responsiveness",
    description:
      "Our team will review your enquiry and discuss availability and next steps. Care start dates depend on assessment and availability.",
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
    "Care arrangements discussed before services begin",
    "Trusted by families, support coordinators, and healthcare professionals",
  ],
} as const;

/** Founder story — Gemma, Founder of Gentle Care */
export const FOUNDER_STORY = {
  name: "Gemma",
  title: "Founder",
  bio: "At Gentle Care Nursing Services, we believe care should feel personal, consistent, and easy to understand.\n\nWe work closely with clients, families, support coordinators, plan managers, case managers, and health professionals to provide safe and compassionate support at home.",
  quote:
    "My favourite part of this work is being able to make a meaningful difference in people’s lives while giving families peace of mind knowing their loved one is being cared for with compassion, dignity and respect.",
  imageSrc: "/images/gemma-profile.jpg",
  imageAlt: "Gemma, Founder of Gentle Care",
} as const;

/** Care approach summary.
 *  Updated 2026-06-10 per Gemma's brief — drop the "10+" stat. */
export const TRUST_STATS = [
  { value: "Led", label: "By an experienced care team" },
  { value: "Personal", label: "Quality-focused support" },
  { value: "Small", label: "Dedicated caseload" },
  { value: "Discuss", label: "Your care needs" },
] as const;
