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
 *   Phone:   1300 004 267
 *
 * Display rules:
 *   - SITE.name           -> exact business name shown on GBP
 *   - SITE.address        -> single-line postal form for body text and schema
 *   - SITE.phone          -> human-readable display, local format for site copy
 *   - SITE.phoneHref      -> tel: link in E.164 (international), so all
 *                            carriers route correctly (no spaces in tel:)
 */
export const SITE = {
  name: "Gentle Care Nursing Services",
  tagline: "Personalised in-home nursing and care",
  phone: "1300 004 267",
  phoneHref: "tel:+611300004267",
  email: "info@gentlecarenursing.com.au",
  address: "Level 1/5 George St, North Strathfield NSW 2137, Australia",
  /** Google Business Profile URL — used in the review-funnel redirect
   *  (4–5 star path) AND the compliance line on the feedback page.
   *  Single source of truth so all three spots stay in sync. */
  gbpReviewUrl:
    "https://g.page/r/CcNAVnNOtwBgEBI/review",
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61571940991169",
    instagram: "https://www.instagram.com/gentle_care",
  },
} as const;

import type { NavItem } from "@/types";

/**
 * Primary site navigation — locked per Gemma's brief (2026-06-10).
 * Six top-level items, with Services as a dropdown of the six core services.
 * Removed from menu (but pages still live, see sitemap): About, Areas, Blog,
 * Conditions, Compare, Guides, Glossary, FAQ, Care Finder, Private Nursing.
 */
export const NAV_LINKS: readonly NavItem[] = [
  { href: "/", label: "Home" },
  {
    href: "/services",
    label: "Services",
    children: [
      { href: "/services/nursing-care", label: "Clinical Nursing" },
      { href: "/services/personal-care", label: "Personal Care" },
      { href: "/services/complex-care", label: "Complex Care" },
      { href: "/services/overnight-support", label: "Overnight Support" },
      { href: "/services/post-hospital-care", label: "Post-Hospital Support" },
      { href: "/services/community-participation", label: "Community Participation" },
    ],
  },
  { href: "/ndis", label: "NDIS" },
  { href: "/dva", label: "DVA" },
  { href: "/aged-care", label: "Aged Care" },
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

/**
 * Last meaningful copy/structure update across the site (ISO date).
 * Used as the sitemap `lastModified` for static pages that don't have
 * their own date field. Bump this when you ship a copy refresh, voice
 * sweep, or page-structure change so crawlers see a fresh `lastmod`.
 * Don't bump for purely cosmetic CSS or component changes.
 */
export const SITE_LAST_UPDATED = "2026-05-07";
