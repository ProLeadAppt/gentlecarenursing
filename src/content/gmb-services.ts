/**
 * Single source of truth for services offered — must match GMB (Google Business Profile) exactly.
 * Used by schema (hasOfferCatalog) and the Services page "All services we offer" section.
 */

export interface GmbService {
  name: string;
  description?: string;
  /** Optional link to main service page (e.g. /ndis, /dva) */
  href?: string;
}

export const GMB_SERVICES: readonly GmbService[] = [
  { name: "In-home nursing", description: "Skilled nursing care in your home", href: "/ndis" },
  { name: "Personal care", description: "Assistance with daily living activities", href: "/ndis" },
  { name: "NDIS support", description: "Registered NDIS provider services", href: "/ndis" },
  { name: "DVA community nursing", description: "DVA-funded community nursing for veterans", href: "/dva" },
  { name: "Aged care support", description: "In-home support for older Australians", href: "/aged-care" },
  { name: "Private nursing", description: "Private in-home nursing and care", href: "/private-nursing" },
  { name: "Wound care", description: "Wound assessment and management at home" },
  { name: "Medication management", description: "Medication administration and compliance support" },
  { name: "Post-hospital care", description: "Nursing support after hospital discharge", href: "/dva" },
  { name: "Respite care", description: "Short-term support to give carers a break", href: "/ndis" },
  { name: "Complex care support", description: "Specialised nursing for complex health needs", href: "/ndis" },
  { name: "Care coordination", description: "Working with coordinators and providers for seamless care", href: "/ndis" },
  { name: "Community access support", description: "Support to participate in community activities", href: "/ndis" },
  { name: "Chronic disease management", description: "Ongoing nursing for chronic conditions", href: "/dva" },
  { name: "Personal care assistance", description: "Bathing, dressing, grooming, mobility support", href: "/aged-care" },
  { name: "Medication support", description: "Medication administration and coordination", href: "/aged-care" },
  { name: "Post-surgery recovery", description: "Nursing care during recovery at home", href: "/private-nursing" },
  { name: "Wellness checks", description: "Regular health assessments and monitoring", href: "/aged-care" },
  { name: "Companion care", description: "Social engagement and companionship", href: "/aged-care" },
  { name: "Daily living support", description: "Meal preparation, light housekeeping, appointments", href: "/aged-care" },
  { name: "Flexible scheduling care", description: "Care when you need it — one-off or regular", href: "/private-nursing" },
  { name: "Health monitoring", description: "Regular wellness and health monitoring at home", href: "/private-nursing" },
  { name: "Disability support", description: "In-home support for people with disability", href: "/ndis" },
  { name: "Transition care", description: "Support transitioning from hospital or facility to home" },
  { name: "Home Care Package support", description: "Aged care Home Care Package services", href: "/aged-care" },
  { name: "CHSP support", description: "Commonwealth Home Support Programme services", href: "/aged-care" },
  { name: "Palliative care support", description: "Compassionate care and symptom management at home" },
  { name: "Tracheostomy care", description: "Specialised tracheostomy care at home", href: "/ndis" },
  { name: "PEG feeding support", description: "PEG feeding and nutrition support at home", href: "/ndis" },
  { name: "Catheter management", description: "Catheter care and management at home", href: "/ndis" },
  { name: "Veteran care", description: "DVA-funded care for veterans and war widows", href: "/dva" },
  { name: "Plan management support", description: "Working with NDIS plan managers for quality delivery", href: "/ndis" },
] as const;
