/**
 * Site-wide constants for Gentle Care Nursing Services.
 * Update these to reflect final content and GoHighLevel integration.
 */

/**
 * Canonical NAP (Name / Address / Phone) — must match the verified
 * Google Business Profile exactly. Any drift breaks local-SEO trust.
 *
 * GBP source of truth (last confirmed 2026-04-28):
 *   Name:    Gentle Care Nursing Services
 *   Address: Level 1/5 George St, North Strathfield NSW 2137, Australia
 *   Phone:   +61 1300 004 267
 *
 * Display rules:
 *   - SITE.name           -> exact business name shown on GBP
 *   - SITE.address        -> single-line postal form for body text and schema
 *   - SITE.phone          -> human-readable display, matches GBP exactly
 *   - SITE.phoneHref      -> tel: link in E.164 (international), so all
 *                            carriers route correctly (no spaces in tel:)
 */
export const SITE = {
  name: "Gentle Care Nursing Services",
  tagline: "Personalised in-home nursing and care",
  phone: "+61 1300 004 267",
  phoneHref: "tel:+611300004267",
  email: "info@gentlecarenursing.com.au",
  address: "Level 1/5 George St, North Strathfield NSW 2137, Australia",
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
      { href: "/dva", label: "DVA Community Nursing" },
      { href: "/services/nursing-care", label: "In-Home Nursing Care" },
      { href: "/services/personal-care", label: "Personal Care & Daily Living" },
      { href: "/services/complex-care", label: "Complex Care Support" },
      { href: "/aged-care", label: "Aged Care at Home" },
      { href: "/private-nursing", label: "Private Nursing" },
    ],
  },
  { href: "/areas", label: "Areas" },
  { href: "/referral", label: "Referrals" },
  { href: "/blog", label: "Blog" },
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
