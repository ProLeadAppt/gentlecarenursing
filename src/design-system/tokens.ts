/**
 * Gentle Care Nursing — Design System Tokens
 * Premium, calm, healthcare-appropriate, conversion-focused.
 * Use with Tailwind: e.g. bg-primary, text-muted-foreground
 */

// ---------------------------------------------------------------------------
// Spacing scale (Tailwind: space-*, gap-*, p-*, m-*, etc.)
// ---------------------------------------------------------------------------
export const SPACING = {
  /** 0.25rem (4px) */
  xs: "0.25rem",
  /** 0.5rem (8px) */
  sm: "0.5rem",
  /** 0.75rem (12px) */
  mdSm: "0.75rem",
  /** 1rem (16px) */
  md: "1rem",
  /** 1.5rem (24px) */
  lg: "1.5rem",
  /** 2rem (32px) */
  xl: "2rem",
  /** 2.5rem (40px) */
  xl2: "2.5rem",
  /** 3rem (48px) */
  "2xl": "3rem",
  /** 4rem (64px) */
  "3xl": "4rem",
  /** 5rem (80px) */
  "4xl": "5rem",
  /** 6rem (96px) */
  "5xl": "6rem",
} as const;

/** Section vertical padding — use for <Section> or section blocks */
export const SPACING_SECTION = {
  py: "py-16 sm:py-20",
  pySm: "py-12 sm:py-16",
  pyLg: "py-20 sm:py-24",
} as const;

// ---------------------------------------------------------------------------
// Typography scale
// ---------------------------------------------------------------------------
export const TYPOGRAPHY = {
  heading: {
    h1: "text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl",
    h2: "text-3xl font-bold tracking-tight sm:text-4xl",
    h3: "text-xl font-semibold sm:text-2xl",
    h4: "text-lg font-semibold",
    h5: "text-base font-semibold",
  },
  body: {
    lg: "text-lg leading-relaxed text-muted-foreground",
    base: "text-base leading-relaxed",
    sm: "text-sm leading-relaxed text-muted-foreground",
    xs: "text-xs text-muted-foreground",
  },
  /** Lead / intro paragraph */
  lead: "text-lg sm:text-xl leading-relaxed text-muted-foreground",
  /** Small labels, captions */
  caption: "text-sm text-muted-foreground",
} as const;

// ---------------------------------------------------------------------------
// Border radius
// ---------------------------------------------------------------------------
export const RADIUS = {
  sm: "rounded-lg",   // 0.5rem — inputs, buttons, badges
  md: "rounded-xl",   // 0.75rem — cards
  lg: "rounded-2xl",  // 1rem — large cards, modals
  full: "rounded-full", // pills, avatars
} as const;

// ---------------------------------------------------------------------------
// Container widths (max-width)
// ---------------------------------------------------------------------------
export const CONTAINER = {
  sm: "max-w-3xl",   // 48rem — narrow content, forms
  md: "max-w-5xl",   // 64rem — standard content
  lg: "max-w-6xl",   // 72rem — wide content
  full: "max-w-[72rem]", // 1152px — full site width
} as const;

/** Container horizontal padding */
export const CONTAINER_PADDING = "px-4 sm:px-6 lg:px-8" as const;

// ---------------------------------------------------------------------------
// Button variants (Tailwind class strings for reference)
// ---------------------------------------------------------------------------
export const BUTTON_VARIANTS = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary active:scale-[0.98]",
  secondary:
    "bg-accent text-accent-foreground hover:bg-accent/90 focus-visible:ring-accent active:scale-[0.98]",
  outline:
    "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground focus-visible:ring-primary active:scale-[0.98]",
  ghost:
    "text-foreground hover:bg-muted/50 focus-visible:ring-muted-foreground active:scale-[0.98]",
  /** Inverted for use on primary/dark backgrounds */
  inverted:
    "bg-primary-foreground text-primary hover:bg-primary-foreground/90 focus-visible:ring-primary-foreground",
  /** Outline for use on primary/dark backgrounds */
  invertedOutline:
    "border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 focus-visible:ring-primary-foreground",
} as const;

export const BUTTON_SIZES = {
  sm: "h-9 px-4 text-sm rounded-lg",
  md: "h-11 px-6 text-base rounded-lg",
  lg: "h-12 px-8 text-lg rounded-lg",
} as const;

// ---------------------------------------------------------------------------
// Card variants
// ---------------------------------------------------------------------------
export const CARD_VARIANTS = {
  default:
    "rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:shadow-md",
  elevated:
    "rounded-xl border border-border bg-card p-6 shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5",
  bordered:
    "rounded-xl border-2 border-border bg-card p-6 transition-all duration-200 hover:border-primary/30",
  /** Muted, low-emphasis card */
  muted:
    "rounded-xl border border-border bg-muted/30 p-6 transition-colors hover:bg-muted/50",
} as const;

// ---------------------------------------------------------------------------
// Form styles (base classes for Input, Select, Textarea)
// ---------------------------------------------------------------------------
export const FORM_INPUT_BASE =
  "block w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50" as const;

export const FORM_FIELD_GAP = "space-y-2" as const;

// ---------------------------------------------------------------------------
// CTA section patterns
// ---------------------------------------------------------------------------
export const CTA_SECTION_VARIANTS = {
  primary: "bg-primary text-primary-foreground",
  muted: "bg-muted/50 text-foreground",
  outline: "border-y border-border bg-card text-foreground",
  /** Soft accent background */
  accent: "bg-accent/10 text-foreground",
} as const;

export const CTA_SECTION_PADDING = "py-16 sm:py-20" as const;

export const CTA_SECTION_CONTENT_MAX = "max-w-2xl" as const;

// ---------------------------------------------------------------------------
// Trust badge styles
// ---------------------------------------------------------------------------
export const TRUST_BADGE_VARIANTS = {
  default: "bg-primary/10 text-primary",
  trust: "bg-accent/10 text-accent",
  outline: "border border-border text-muted-foreground",
  /** Strong trust signal — solid accent */
  solid: "bg-accent text-accent-foreground",
} as const;

export const TRUST_BADGE_BASE =
  "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium" as const;
