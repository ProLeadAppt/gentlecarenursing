/**
 * Muted teal/sage, warm off-whites, breathable spacing, soft borders and shadows.
 * Premium elevation: Framer Motion variants and layered shadows.
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

/** Section vertical rhythm — generous and breathable (10x elevated spacing) */
export const SPACING_SECTION = {
  py: "py-28 sm:py-32",
  pySm: "py-20 sm:py-24",
  pyLg: "py-32 sm:py-40",
  pyXl: "py-36 sm:py-44",
} as const;

export const TYPOGRAPHY = {
  heading: {
    h1: "font-[family-name:var(--font-serif)] text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl",
    h2: "font-[family-name:var(--font-serif)] text-3xl font-bold tracking-tight sm:text-4xl",
    h3: "font-[family-name:var(--font-dm-sans)] text-xl font-semibold sm:text-2xl",
    h4: "font-[family-name:var(--font-dm-sans)] text-lg font-semibold",
    h5: "font-[family-name:var(--font-dm-sans)] text-base font-semibold",
  },
  body: {
    lg: "text-lg leading-relaxed text-muted-foreground",
    base: "text-base leading-relaxed tracking-wide",
    sm: "text-sm leading-relaxed text-muted-foreground",
    xs: "text-xs text-muted-foreground",
  },
  lead: "text-lg sm:text-xl leading-relaxed text-muted-foreground font-medium",
  caption: "text-sm text-muted-foreground",
} as const;

/** High-end multi-stop shadows for natural depth */
export const SHADOWS_LAYERED = {
  sm: "0 1px 2px rgba(45, 42, 38, 0.02), 0 2px 4px rgba(45, 42, 38, 0.02)",
  md: "0 4px 6px -1px rgba(45, 42, 38, 0.03), 0 10px 15px -3px rgba(45, 42, 38, 0.03)",
  lg: "0 10px 25px -5px rgba(45, 42, 38, 0.04), 0 20px 48px -12px rgba(45, 42, 38, 0.04)",
  glass: "0 8px 32px 0 rgba(132, 40, 51, 0.05)",
} as const;

/** Orchestrated entrance animations */
export const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  },
} as const;

/** Hero cinematic entrance — staggered word-by-word reveal */
export const HERO_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.18, delayChildren: 0.3 },
    },
  },
  word: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  },
  image: {
    hidden: { opacity: 0, x: 30, rotateY: 3 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 1.4 },
    },
  },
  badge: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 18 },
    },
  },
  credentials: {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  },
} as const;

/** Testimonial staggered card reveal */
export const TESTIMONIAL_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  },
  card: {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  },
} as const;

export const RADIUS = {
  sm: "rounded-lg",
  md: "rounded-[0.9375rem]",
  lg: "rounded-[1.25rem]",
  xl: "rounded-[1.625rem]",
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
    "bg-gradient-to-br from-primary to-[#6b2028] text-primary-foreground shadow-[0_4px_16px_rgba(132,40,51,0.25)] hover:shadow-[0_8px_24px_rgba(132,40,51,0.3)] hover:-translate-y-px focus-visible:ring-primary active:scale-[0.98] active:shadow-sm transition-all duration-200 rounded-xl",
  secondary:
    "bg-accent text-accent-foreground shadow-sm hover:bg-accent/90 focus-visible:ring-accent active:scale-[0.99] transition-all duration-200 rounded-xl",
  outline:
    "border-2 border-border text-foreground hover:bg-muted/60 hover:border-primary/20 focus-visible:ring-primary active:scale-[0.99] transition-all duration-200 rounded-xl",
  ghost:
    "text-foreground hover:bg-muted/50 focus-visible:ring-muted-foreground active:scale-[0.99] transition-all duration-200 rounded-xl",
  inverted:
    "bg-white text-primary shadow-sm hover:bg-white/95 focus-visible:ring-white active:scale-[0.99] transition-all duration-200 rounded-xl",
  invertedOutline:
    "border-2 border-white/50 text-white hover:bg-white/10 focus-visible:ring-white active:scale-[0.99] transition-all duration-200 rounded-xl",
} as const;

export const BUTTON_SIZES = {
  sm: "h-10 px-5 text-sm rounded-lg",
  md: "h-12 px-6 text-base rounded-xl",
  lg: "h-12 px-8 text-lg rounded-xl",
  xl: "h-14 px-10 text-lg rounded-xl",
} as const;

export const CARD_VARIANTS = {
  default:
    "rounded-[1.25rem] border border-border/80 bg-card p-8 shadow-sm transition-all duration-200 hover:shadow-md hover:border-border",
  elevated:
    "rounded-[1.25rem] border border-border/80 bg-card p-8 shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-border",
  bordered:
    "rounded-[1.25rem] border-2 border-border bg-card p-8 transition-all duration-200 hover:border-accent/25 hover:bg-accent/[0.03] hover:shadow-sm",
  muted:
    "rounded-[1.25rem] border border-border/80 bg-muted p-8 transition-all duration-200 hover:shadow-md",
  accent:
    "rounded-[1.25rem] border border-accent/15 bg-accent/[0.06] p-8 transition-all duration-200 hover:border-accent/25 hover:shadow-sm",
} as const;

export const FORM_INPUT_BASE =
  "block w-full rounded-xl border border-border bg-card px-4 py-3.5 text-foreground placeholder:text-muted-foreground transition-all duration-200 focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/15 disabled:cursor-not-allowed disabled:opacity-50" as const;

export const FORM_FIELD_GAP = "space-y-2" as const;

export const CTA_SECTION_VARIANTS = {
  primary: "bg-gradient-to-br from-primary via-primary to-primary-light text-primary-foreground",
  muted: "bg-muted text-foreground",
  outline: "border-y border-border bg-card text-foreground",
  accent: "bg-accent/[0.06] text-foreground",
} as const;

export const CTA_SECTION_PADDING = "py-20 sm:py-28" as const;
export const CTA_SECTION_CONTENT_MAX = "max-w-2xl" as const;

export const TRUST_BADGE_VARIANTS = {
  default: "bg-muted/80 text-foreground border border-border/80",
  trust: "bg-card text-primary border border-primary/30",
  outline: "border border-border/80 text-muted-foreground bg-card/50",
  solid: "bg-accent text-accent-foreground shadow-sm",
} as const;

export const TRUST_BADGE_BASE =
  "inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium" as const;
