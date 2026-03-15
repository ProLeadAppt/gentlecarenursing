/**
 * Site-wide constants for Gentle Care Nursing.
 * Update these to reflect final content and GoHighLevel integration.
 */

export const SITE: {
  readonly name: string;
  readonly tagline: string;
  readonly phone: string;
  readonly email: string;
  readonly address: string;
} = {
  name: "Gentle Care Nursing",
  tagline: "Personalised in-home nursing and care",
  phone: "",
  email: "",
  address: "",
};

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
} as const;
