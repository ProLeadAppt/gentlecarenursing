/**
 * Site-wide constants for Gentle Care Nursing.
 * Update these to reflect final content and GoHighLevel integration.
 */

export const SITE = {
  name: "Gentle Care Nursing",
  tagline: "Personalised in-home nursing and care",
  phone: "",
  email: "",
  address: "",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/ndis", label: "NDIS" },
  { href: "/dva", label: "DVA & Community" },
  { href: "/aged-care", label: "Aged Care" },
  { href: "/private-nursing", label: "Private Care" },
  { href: "/referral", label: "Request Care" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
] as const;

export const CTA_LINKS = {
  requestCare: { href: "/referral", label: "Request Care" },
  makeReferral: { href: "/referral", label: "Make a Referral" },
  contact: { href: "/contact", label: "Contact Us" },
  bookConsultation: { href: "/referral", label: "Book a Consultation" },
} as const;
