/**
 * Single source of truth for services offered. Must match GMB (Google Business Profile) exactly.
 * Used by schema (hasOfferCatalog) and the Services page "All services we offer" section.
 */

export interface GmbService {
  name: string;
  description?: string;
  /** Optional link to main service page (e.g. /ndis, /dva) */
  href?: string;
}

export const GMB_SERVICES: readonly GmbService[] = [
  {
    name: "Personal Care",
    description: "Assistance with bathing, dressing, grooming, and mobility, protecting dignity and choice.",
    href: "/personal-care",
  },
  {
    name: "Nursing Care",
    description: "Professional, clinical support from experienced registered nurses including wound care and medication management.",
    href: "/nursing-care",
  },
  {
    name: "Assistance with Daily Living",
    description: "Practical help with meal prep, household tasks, and daily routines for independence at home.",
    href: "/assistance-with-daily-living",
  },
  {
    name: "Community Participation",
    description: "Support for social activities, appointments, and social inclusion to achieve your goals.",
    href: "/community-participation",
  },
  {
    name: "Complex Care Support",
    description: "Specialised clinical care for higher-need participants including PEG feeding and tracheostomy care.",
    href: "/services/complex-care",
  },
  {
    name: "Overnight Support",
    description: "Active overnight care or sleepover support for peace of mind and safety while you sleep.",
    href: "/overnight-support",
  },
  {
    name: "Post-Hospital Support",
    description: "Skilled nursing and personal care during your transition home to support recovery and independence.",
    href: "/services/post-hospital-care",
  },
  {
    name: "NDIS Registered Provider",
    description: "Compassionate disability support services tailored to your NDIS plan and goals.",
    href: "/ndis",
  },
  {
    name: "DVA Approved Provider",
    description: "Dedicated community nursing and personal care for Sydney's veteran community.",
    href: "/dva",
  },
] as const;
