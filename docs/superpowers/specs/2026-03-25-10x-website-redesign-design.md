# Gentle Care Nursing — 10x Website Redesign

**Date:** 2026-03-25
**Status:** Approved
**Approach:** Hybrid — Precision Polish + 3 Signature Moments

## Context

The Gentle Care Nursing website is a professionally-built Next.js 16 + Tailwind 4 site scoring ~7-8/10 in design quality. Gemma is a valued client and this redesign aims to elevate every aspect — visual design, UX flow, animation, accessibility, and performance — to create a site that feels genuinely premium and boutique, matching the quality of care GCN delivers.

**Colour Mapping:**
- "sage" = `pw-sage` / `#6b9360`
- "teal" = `pw-teal` / `#1b6b6d`
- "terracotta" = `pw-terracotta` / `#c4704b`
- "amber" = `pw-amber` / `#d4a03c`
- "berry" = `--color-primary` / `#842833` (no `pw-berry` token — uses primary)
- "Cormorant" = `Cormorant_Garamond` (Google Fonts name)

**Constraints:**
- Keep existing brand palette (sage, teal, terracotta, amber, berry) — elevate execution, not change direction
- Working with Instagram + stock photography (no professional shoot)
- Target 95+ Lighthouse scores across all metrics on all devices
- 2-3 signature animation moments, progressive enhancement for mobile
- Maintain all existing URLs and SEO equity

---

## Design Overview

### Approach: Hybrid (Polish + Signature Moments)

Keep the proven page structure and component architecture. Inject 3 unforgettable animated moments at key emotional touchpoints. Polish every remaining detail — typography, spacing, imagery, interactions, performance — until the entire experience feels hand-crafted.

---

## Signature Moment #1 — Hero Cinematic Entrance

**File:** `src/components/sections/Hero.tsx`

### Visual Changes
- Break headline into 3 visual weights:
  - "Compassionate" — large, dark (#2d2926), Cormorant serif
  - "In-Home Care" — large, berry (#842833), Cormorant serif
  - "& Disability Support" — medium, italic, muted (#736e62)
- Add gradient divider line (sage→teal, 40px width) between headline and body
- Ambient gradient orbs (sage, teal) drifting slowly behind content (GPU-composited)
- Simplify CTAs: one gradient button ("Request Care →") + inline text "or call [number]"
- Floating proof badges on hero image:
  - "24h Response Guarantee" with pulsing green dot (bottom-left)
  - "★★★★★ 5.0 rated" (top-right)
- Trust credentials as dot-prefixed inline items (NDIS, DVA, 10+ Years) with colour-coded dots

### Animation Choreography (2.5s)
| Time | Element | Animation |
|------|---------|-----------|
| 0.0s | Background gradient | opacity 0→1 |
| 0.3s | Eyebrow text | slideUp(20px) + fadeIn |
| 0.5s | "Compassionate" | slideUp(20px) + fadeIn |
| 0.7s | "In-Home Care" | slideUp(20px) + fadeIn, scale 1.02→1.0 |
| 0.9s | "& Disability Support" | fadeIn |
| 1.0s | Gradient divider | drawLeft→Right (width 0→40px) |
| 1.2s | Body text + CTA | fadeUp together |
| 1.4s | Hero image | slideIn(x:30→0) + rotateY(3°→0°) |
| 1.8s | 24h badge | popIn (scale 0.8→1.0, spring bounce) |
| 2.0s | Star rating badge | slideIn from right |
| 2.3s | Trust credentials | cascade left→right (0.1s stagger) |
| 2.5s | Ambient orbs | begin continuous slow drift |

### Technical Implementation
- Framer Motion `variants` with `staggerChildren` orchestration
- Spring physics: `stiffness: 120, damping: 18`
- Custom easing: `[0.16, 1, 0.3, 1]`
- Ambient orbs: CSS `@keyframes` with `will-change: transform` (GPU layer)
- Mobile: simplified to single fadeUp sequence (no staggered words, no 3D perspective)

---

## Signature Moment #2 — Scroll-Driven Process Timeline

**File:** `src/components/sections/ProcessTimeline.tsx`

### Visual Changes
- Switch from horizontal cards to vertical timeline layout
- Each step has a colour-coded circle (sage→teal→terracotta→berry)
- Connecting line draws itself downward as user scrolls
- Steps start muted (greyscale, low opacity) and activate progressively
- Icons transition from greyscale→full colour with unique micro-animations
- Active step: coloured border, shadow, full opacity
- Inactive steps: muted border, no shadow, reduced opacity
- Section header: eyebrow "Your Journey" + serif title "From Enquiry to Peace of Mind"
- Inline CTA at bottom after all steps activate: "Ready to start? → Request Care"

### Scroll Animation Behaviour
| Scroll % | Action |
|----------|--------|
| 0% (enters viewport) | Header fades in. All steps muted. |
| 15% | Step 1 activates: circle fills sage gradient, icon colours, card border turns green, line starts drawing |
| 35% | Step 2 activates: line reaches step 2, circle fills teal, "24 Hours" gets pulse highlight |
| 55% | Step 3 activates: circle fills terracotta, handshake icon "shake" animation |
| 75% | Step 4 activates: circle fills berry, heart icon pulses, "Care Begins" shifts to serif |
| 100% | All steps active. Inline CTA appears. |

### Technical Implementation
- Framer Motion `useScroll` + `useTransform` for scroll-linked progress
- `scrollYProgress` mapped to step activation thresholds
- Line: SVG `stroke-dasharray` + `stroke-dashoffset` driven by scroll progress
- Mobile: intersection observer triggers (per-step `whileInView`) instead of scroll-linked
- `viewport={{ once: true, margin: "-50px" }}`

---

## Signature Moment #3 — Testimonial Card Reveal

**File:** `src/components/sections/Testimonials.tsx`

### Visual Changes
- Colour-coded accent bar at top of each card:
  - Family testimonial: sage→teal gradient
  - Coordinator testimonial: teal→sage gradient
  - Hospital professional: berry→terracotta gradient
- Centre card elevated 4px higher with deeper shadow (draws eye to coordinator — primary audience)
- Larger, richer quotes in Cormorant serif italic
- Add location context to attributions ("Sydney", "Inner West", "RPA")
- Avatar initials circles use gradient backgrounds matching accent colour
- Stars relocated to right side of attribution row
- Large decorative quote mark (40px, 6-8% opacity) in top-right corner of each card

### Animation Choreography
| Time | Element | Animation |
|------|---------|-----------|
| Enter viewport | Section header | eyebrow→title fadeUp (0.2s stagger) |
| +0.3s | Card 1 | y:40→0 + opacity 0→1, spring(100, 20). Top bar slides from left. |
| +0.5s | Card 2 | Same spring. Final position translateY(-4px). |
| +0.7s | Card 3 | Same spring. Hover states enabled on all 3 cards. |
| +1.0s | Stars (all cards) | Gold fill cascade left→right (0.05s per star) |

### Technical Implementation
- Framer Motion `variants` with parent orchestration
- Spring easing: `{ type: "spring", stiffness: 100, damping: 20 }`
- Hover state: `whileHover={{ y: -2, boxShadow: "0 12px 32px rgba(0,0,0,0.1)" }}`
- Mobile: standard `whileInView` fade-in, testimonials become horizontal swipeable carousel
- `drag="x"` with `dragConstraints` for mobile swipe

---

## Precision Polish — Global Improvements

### Typography Refinement

**Files:** `tailwind.config.ts`, `src/app/globals.css`, `src/design-system/tokens.ts`

- Increase display size contrast by ~30% (hero display sizes)
- Break long headlines into 2-3 word visual rhythm lines
- Use colour accent on key phrases in section headings
- Tighten letter-spacing on large type: `-0.03em → -0.04em`
- Add italic serif (Cormorant) for secondary/subtitle lines
- Body line-height: ensure 1.6-1.7 for optimal readability

### Image Treatment System

**New utility or component**

- CSS gradient overlay system for all care images:
  - `mix-blend-mode: multiply` or `::after` pseudo-element
  - Sage-to-cream gradient at 12-18% opacity
  - Unifies mixed-quality Instagram/stock photos into cohesive visual language
- Increase border-radius on images: 16px→20px
- Consistent shadow depth on all image containers
- Add subtle 1px border at `rgba(107,147,96,0.08)` for definition

### Button & Interaction Polish

**File:** `src/components/ui/Button.tsx`

- Primary CTA: gradient background (berry→darker berry) + shadow
- Hover: shadow expands + translateY(-1px) lift
- Magnetic pull on desktop (reuse existing `Magnetic.tsx` component)
- Arrow slides right 4px on hover (transform with spring)
- Active: scale(0.98) + shadow reduces (tactile press)
- Secondary actions: text links with subtle underline, not full buttons
- Focus-visible: 2px ring with 2px offset

### Section Transitions

**File:** `src/components/layout/Section.tsx`

- Replace hard colour breaks with 80px gradient blends between sections
- Sections flow into each other via CSS gradients
- Alternating warm cream / white backgrounds with soft transitions

### Spacing System

- Section padding: `py-24` → `py-28 sm:py-32` (more breathing room)
- Heading to content gap: `mb-6` → `mb-8 sm:mb-10`
- Card internal padding: `p-6` → `p-7 sm:p-8`
- Grid gaps: `gap-6` → `gap-7 sm:gap-8`
- Philosophy: premium = generous whitespace

### Bento Services Grid Polish

**File:** `src/components/sections/BentoServiceGrid.tsx`

- Card hover: lift 4px + shadow deepen + icon rotate 5° (spring)
- Accent border-bottom reveals on hover (width 0→100%, left→right)
- Arrow icon slides right 6px
- Featured card: ambient glow on hover (box-shadow with brand colour)
- Content reflow on featured card hover (description text appears)

---

## Mobile-Specific Enhancements

### Bottom CTA Bar Redesign

**File:** `src/components/layout/MobileCta.tsx`

- Frosted glass background (`backdrop-blur-md`)
- Two buttons: "Request Care" + "Call Now" (phone icon)
- Appears after 3s of scrolling (not immediately)
- Hides on scroll down, reappears on scroll up (smooth transition)
- `padding-bottom: env(safe-area-inset-bottom)` for notched phones

### Touch Optimisation
- All tap targets minimum 44×44px
- Signature animations → simpler intersection-observer triggers
- Testimonials → horizontal swipeable carousel with `drag="x"`
- Respect `prefers-reduced-motion` everywhere

---

## Performance & Lighthouse Optimisation

### Performance (Target: 95+)
- **Images:** Convert all to AVIF with WebP fallback. Responsive srcset (640, 768, 1024, 1280). Explicit width/height on all images to prevent CLS.
- **Fonts:** Subset Cormorant + DM Sans to Latin-only glyphs. Keep `font-display: swap`. Preload critical font files via `<link rel="preload">`.
- **JS:** Dynamic import Framer Motion (client-only). Code-split per route. Import Lucide icons individually (not barrel import).
- **CSS:** Tailwind purge already active. Inline critical above-fold CSS. Defer below-fold.
- **LCP:** Preload hero image. Use `priority` on Next/Image. Optimise hero to <100KB.

### Accessibility (Target: 100)
- **Focus management:** Trap focus in FormModal. Auto-focus first field on open. Return focus on close.
- **Skip link:** Fix to use `sr-only` + `focus:not-sr-only` pattern.
- **ARIA:** `aria-describedby` on modals. Keyboard escape for nav dropdowns. `role="status"` live regions for form submissions.
- **Contrast:** Audit all text/background combinations. 4.5:1 minimum body text, 3:1 large text.
- **Motion:** Audit all components respect `prefers-reduced-motion`.

### SEO (Target: 100)
- Already strong (JSON-LD, metadata, breadcrumbs, OG tags)
- Add: image alt text audit, FAQ schema on service pages
- Ensure all 26 routes in sitemap.xml with `lastmod` dates

### Best Practices (Target: 100)
- Add security headers via `netlify.toml`: CSP, X-Content-Type-Options, Referrer-Policy
- Audit and fix console warnings/errors
- Ensure scroll/touch handlers use `passive: true`

---

## Files to Modify

### Core Changes
| File | Change |
|------|--------|
| `src/components/sections/Hero.tsx` | Signature Moment #1 — cinematic entrance |
| `src/components/sections/ProcessTimeline.tsx` | Signature Moment #2 — scroll-driven activation |
| `src/components/sections/Testimonials.tsx` | Signature Moment #3 — staggered reveal |
| `src/components/ui/Button.tsx` | Gradient CTA, hover/active states |
| `src/components/layout/Section.tsx` | Background transitions between sections |
| `src/components/layout/MobileCta.tsx` | Frosted glass, scroll-aware behaviour |
| `src/components/sections/BentoServiceGrid.tsx` | Hover interaction polish |
| `tailwind.config.ts` | Spacing refinements, new animation keyframes |
| `src/app/globals.css` | Typography scale updates, ambient orb keyframes |
| `src/design-system/tokens.ts` | Updated spacing/typography tokens |

### New Files (if needed)
| File | Purpose |
|------|---------|
| `src/components/ui/ImageOverlay.tsx` | Reusable brand gradient overlay for images |
| `netlify.toml` (or update existing) | Security headers |

### Reuse Existing
| Component | Reuse For |
|-----------|-----------|
| `src/components/animations/Magnetic.tsx` | CTA magnetic pull effect |
| `src/components/animations/Reveal.tsx` | Non-signature section reveals |
| `src/components/animations/SectionReveal.tsx` | Orchestrated section entrances |
| `src/contexts/FormModalContext.tsx` | Modal state (add focus trap) |

---

## Verification Plan

1. **Visual QA:**
   - Compare each signature moment before/after in browser
   - Test on Chrome, Firefox, Safari, Edge
   - Test responsive: 375px (iPhone SE), 768px (iPad), 1024px (laptop), 1440px (desktop)

2. **Animation QA:**
   - Verify 60fps on each signature moment (Chrome DevTools Performance panel)
   - Test `prefers-reduced-motion: reduce` — all animations should be disabled
   - Verify mobile degradation (simpler triggers, no scroll-linked on mobile)

3. **Lighthouse Audit:**
   - Run Lighthouse on homepage, 2 service pages, about, contact
   - Target: Performance 95+, Accessibility 100, Best Practices 100, SEO 100
   - Test mobile AND desktop profiles

4. **Accessibility Audit:**
   - Tab through entire homepage — verify all interactive elements reachable
   - Screen reader test on hero, forms, navigation
   - Verify FormModal focus trap and return focus

5. **Cross-Device Testing:**
   - iOS Safari (iPhone 14+)
   - Android Chrome (Pixel)
   - iPad Safari
   - Desktop: Chrome, Firefox, Safari, Edge
