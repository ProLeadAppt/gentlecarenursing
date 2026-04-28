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
    href: "/services/personal-care",
  },
  {
    name: "Nursing Care",
    description: "Professional, clinical support from experienced registered nurses including wound care and medication management.",
    href: "/services/nursing-care",
  },
  {
    name: "Assistance with Daily Living",
    description: "Practical help with meals, simple household tasks, and daily routines to keep things running smoothly at home.",
    href: "/services/assistance-with-daily-living",
  },
  {
    name: "Community Participation",
    description: "Support for getting out and about, joining in social activities, or attending appointments with confidence.",
    href: "/services/community-participation",
  },
  {
    name: "Complex Care Support",
    description: "Experienced nursing care for more complex needs: including PEG feeding, tracheostomy care, and dedicated clinical support.",
    href: "/services/complex-care",
  },
  {
    name: "Overnight Support",
    description: "A calm and capable presence through the night: offering either active support or sleepover care so you can rest easily.",
    href: "/services/overnight-support",
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
    name: "DVA Contracted Community Nursing Provider",
    description: "Dedicated community nursing and personal care for Sydney's veteran community.",
    href: "/dva",
  },
] as const;
