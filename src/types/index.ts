/**
 * Shared types for Gentle Care Nursing.
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
  description: string;
  href: string;
}
