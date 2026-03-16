/**
 * Site-wide constants for Gentle Care Nursing.
 * Update these to reflect final content and GoHighLevel integration.
 */

export const SITE = {
  name: "Gentle Care Nursing Services",
  tagline: "Personalised in-home nursing and care",
  phone: "1300 004 267",
  phoneHref: "tel:1300004267",
  email: "info@gentlecarenursing.com.au",
  address: "Level 1/5 George St, North Strathfield, NSW 2137",
  /** Optional: Google Business Profile URL for entity linking and footer */
  gbpUrl: "",
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61571940991169",
    instagram: "https://www.instagram.com/gentle_care",
  },
} as const;

import type { NavItem } from "@/types";

export const NAV_LINKS: readonly NavItem[] = [
  { href: "/about", label: "About" },
  {
    href: "/services",
    label: "Services",
    children: [
      { href: "/services", label: "All Services" },
      { href: "/ndis", label: "NDIS Services" },
      { href: "/dva", label: "DVA & Community Nursing" },
      { href: "/aged-care", label: "Aged Care" },
      { href: "/private-nursing", label: "Private Nursing" },
    ],
  },
  { href: "/referral", label: "Referrals" },
  { href: "/contact", label: "Contact" },
] as const;

export const CTA_LINKS = {
  requestCare: { href: "/referral", label: "Request Care" },
  makeReferral: { href: "/referral", label: "Make a Referral" },
  contact: { href: "/contact", label: "Contact Us" },
  bookConsultation: { href: "/referral", label: "Book a Consultation" },
  callUs: { href: SITE.phoneHref, label: "Call us" },
} as const;

/** Reassurance line below hero CTAs: calm, no pressure, quick response. */
export const CTA_REASSURANCE =
  "No obligation. We'll acknowledge your message quickly and get back to you within 24 hours. We're here to listen and help.";

/** Hero-specific reassurance under CTAs (team notified). */
export const HERO_REASSURANCE =
  "Submit an enquiry and our team is notified immediately so your request can be reviewed quickly.";
