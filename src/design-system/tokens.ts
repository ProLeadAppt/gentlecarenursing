/**
 * Gentle Care Nursing — Design System Tokens
 * Premium, calm, healthcare-appropriate, conversion-focused.
 */

export const SPACING = {
  xs: "0.25rem",
  sm: "0.5rem",
  mdSm: "0.75rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  xl2: "2.5rem",
  "2xl": "3rem",
  "3xl": "4rem",
  "4xl": "5rem",
  "5xl": "6rem",
} as const;

export const SPACING_SECTION = {
  py: "py-16 sm:py-20",
  pySm: "py-12 sm:py-16",
  pyLg: "py-20 sm:py-28",
} as const;

export const TYPOGRAPHY = {
  heading: {
    h1: "font-[family-name:var(--font-dm-sans)] text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl",
    h2: "font-[family-name:var(--font-dm-sans)] text-3xl font-bold tracking-tight sm:text-4xl",
    h3: "font-[family-name:var(--font-dm-sans)] text-xl font-semibold sm:text-2xl",
    h4: "font-[family-name:var(--font-dm-sans)] text-lg font-semibold",
    h5: "font-[family-name:var(--font-dm-sans)] text-base font-semibold",
  },
  body: {
    lg: "text-lg leading-relaxed text-muted-foreground",
    base: "text-base leading-relaxed",
    sm: "text-sm leading-relaxed text-muted-foreground",
    xs: "text-xs text-muted-foreground",
  },
  lead: "text-lg sm:text-xl leading-relaxed text-muted-foreground",
  caption: "text-sm text-muted-foreground",
} as const;

export const RADIUS = {
  sm: "rounded-lg",
  md: "rounded-xl",
  lg: "rounded-2xl",
  full: "rounded-full",
} as const;

export const CONTAINER = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  full: "max-w-[72rem]",
} as const;

export const CONTAINER_PADDING = "px-4 sm:px-6 lg:px-8" as const;

export const BUTTON_VARIANTS = {
  primary:
    "bg-primary text-primary-foreground shadow-md hover:bg-primary/90 focus-visible:ring-primary active:scale-[0.98] transition-all duration-150",
  secondary:
    "bg-accent text-accent-foreground shadow-md hover:bg-accent/90 focus-visible:ring-accent active:scale-[0.98] transition-all duration-150",
  outline:
    "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground focus-visible:ring-primary active:scale-[0.98] transition-all duration-150",
  ghost:
    "text-foreground hover:bg-muted/50 focus-visible:ring-muted-foreground active:scale-[0.98] transition-all duration-150",
  inverted:
    "bg-white text-primary shadow-md hover:bg-white/90 focus-visible:ring-white active:scale-[0.98] transition-all duration-150",
  invertedOutline:
    "border-2 border-white/60 text-white hover:bg-white/10 focus-visible:ring-white active:scale-[0.98] transition-all duration-150",
} as const;

export const BUTTON_SIZES = {
  sm: "h-9 px-4 text-sm rounded-lg",
  md: "h-11 px-6 text-base rounded-lg",
  lg: "h-13 px-8 text-lg rounded-xl",
} as const;

export const CARD_VARIANTS = {
  default:
    "rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-200 hover:shadow-lg",
  elevated:
    "rounded-2xl border border-border bg-card p-7 shadow-md transition-all duration-200 hover:shadow-xl hover:-translate-y-1",
  bordered:
    "rounded-2xl border-2 border-border bg-card p-7 transition-all duration-200 hover:border-primary/40 hover:shadow-md",
  muted:
    "rounded-2xl border border-border bg-muted p-7 transition-all duration-200 hover:shadow-md",
  accent:
    "rounded-2xl border border-accent/20 bg-accent/5 p-7 transition-all duration-200 hover:shadow-md hover:border-accent/40",
} as const;

export const FORM_INPUT_BASE =
  "block w-full rounded-xl border border-border bg-card px-4 py-3.5 text-foreground placeholder:text-muted-foreground transition-all duration-150 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50" as const;

export const FORM_FIELD_GAP = "space-y-2" as const;

export const CTA_SECTION_VARIANTS = {
  primary: "bg-gradient-to-br from-primary via-primary to-primary-light text-primary-foreground",
  muted: "bg-muted text-foreground",
  outline: "border-y border-border bg-card text-foreground",
  accent: "bg-accent/10 text-foreground",
} as const;

export const CTA_SECTION_PADDING = "py-16 sm:py-20" as const;
export const CTA_SECTION_CONTENT_MAX = "max-w-2xl" as const;

export const TRUST_BADGE_VARIANTS = {
  default: "bg-primary/8 text-primary border border-primary/10",
  trust: "bg-accent/8 text-accent border border-accent/15",
  outline: "border border-border text-muted-foreground",
  solid: "bg-accent text-accent-foreground shadow-sm",
} as const;

export const TRUST_BADGE_BASE =
  "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium" as const;
