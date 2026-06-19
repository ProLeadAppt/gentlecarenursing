/**
 * Homepage content — Gemma's simplified brief, 2026-06-10.
 * Kept lean: just the 5 sections the homepage actually renders.
 * Removed 2026-06-10: REASSURANCE_SECTION, HOMEPAGE_LOCAL_PROOF, WHO_WE_HELP,
 *   WHY_DIFFERENT, HOMEPAGE_SERVICES_IMAGE, PROCESS_STEPS, REFERRAL_PROFESSIONALS,
 *   GET_IN_TOUCH, HOMEPAGE_EVIDENCE, HOMEPAGE_INLINE_CTAS, HOMEPAGE_FINAL_CTA,
 *   HOMEPAGE_FAQ, HOMEPAGE_AREAS, HOMEPAGE_STATS — all dead from the
 *   pre-brief 9-section homepage.
 */

export const HOMEPAGE_HERO = {
  // Simplified per Gemma's brief 2026-06-10 — drop eyebrow, single statement.
  eyebrow: undefined,
  /** Segmented headline for staggered cinematic reveal. */
  headlineSegments: [
    "Personalised in-home nursing",
    " and support across Sydney",
  ] as const,
  subheadline:
    "NDIS Registered · DVA Contracted · Aged Care Support",
  /** Hero image (right column). Warm, professional in-home care moment. */
  heroImageSrc: "/images/age-cymru-bSXk1lOp8T0-unsplash.webp",
  heroImageAlt:
    "A care worker supporting an older woman at a kitchen table — warm, professional, in-home nursing care in Sydney",
} as const;

/** Section 2 — Who we support (4-tile, Gemma's exact list) */
export const WHO_WE_SUPPORT = {
  title: "Who we support",
  items: [
    {
      label: "NDIS participants",
      href: "/ndis",
      description:
        "Registered NDIS provider for in-home care, daily personal activities, community access, and high intensity supports.",
    },
    {
      label: "DVA clients",
      href: "/dva",
      description:
        "Community nursing and in-home support for eligible veterans and their families, subject to DVA eligibility and clinical assessment.",
    },
    {
      label: "Aged Care clients",
      href: "/aged-care",
      description:
        "Support to remain safe and comfortable at home — personal care, nursing, companionship, transport, respite, and post-hospital recovery.",
    },
    {
      label: "Private clients",
      href: "/services",
      description:
        "Self-funded, personalised in-home nursing and care tailored to your needs and circumstances.",
    },
  ] as const,
} as const;

/** Section 3 — Our services (Gemma's exact 6) */
export const OUR_SERVICES = {
  title: "Our services",
  subtitle:
    "Practical, personalised in-home care delivered with skill and warmth.",
  items: [
    {
      label: "Clinical Nursing",
      href: "/services/nursing-care",
      description:
        "Skilled nursing care at home, delivered with calm communication and attention to detail.",
    },
    {
      label: "Personal care",
      href: "/services/personal-care",
      description: "Daily living support with dignity and respect.",
    },
    {
      label: "Complex care",
      href: "/services/complex-care",
      description: "High-intensity and ongoing support for complex needs.",
    },
    {
      label: "Overnight support",
      href: "/services/overnight-support",
      description: "Active or passive overnight care so families can rest.",
    },
    {
      label: "Post-hospital support",
      href: "/services/post-hospital-care",
      description: "Safe recovery at home after a hospital stay.",
    },
    {
      label: "Community participation",
      href: "/services/community-participation",
      description: "Support to get out, connect, and take part in your community.",
    },
  ] as const,
} as const;

/** Section 4 — Why choose Gentle Care (Gemma's exact bullets) */
export const WHY_CHOOSE = {
  title: "Why families and coordinators choose Gentle Care",
  items: [
    "Personalised care based on each client's needs",
    "Hands-on care coordination and regular communication",
    "Reliable support workers and nursing staff",
    "Support for NDIS, DVA, aged care, and private clients",
    "A warm and respectful approach to care",
    "Clear communication with families and representatives",
  ] as const,
} as const;
