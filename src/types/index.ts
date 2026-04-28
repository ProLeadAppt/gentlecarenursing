/**
 * Shared types for Gentle Care Nursing Services.
 */

export interface NavLink {
  href: string;
  label: string;
}

export interface NavItem {
  href: string;
  label: string;
  children?: readonly NavLink[];
}

export interface ServiceCard {
  title: string;
  /** One-line benefit statement shown prominently on the card */
  benefit: string;
  /** Optional supporting description for additional context */
  description?: string;
  href: string;
}
