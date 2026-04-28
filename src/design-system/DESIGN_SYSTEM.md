# Gentle Care Nursing Services — Design System

Premium, calm, healthcare-appropriate, highly polished, conversion-focused.

---

## 1. Colour System

### Palette

| Token | HSL | Usage |
|-------|-----|-------|
| `primary` | 210 40% 25% | Primary CTAs, links, key actions |
| `primary-foreground` | white | Text on primary |
| `accent` | 180 35% 45% | Trust signals, secondary emphasis, badges |
| `accent-foreground` | white | Text on accent |
| `background` | 40 20% 98% | Page background (warm off-white) |
| `foreground` | 210 25% 15% | Body text |
| `muted` | 210 15% 45% | De-emphasised elements |
| `muted-foreground` | 210 10% 55% | Captions, labels, hints |
| `border` | 210 15% 90% | Borders, dividers |
| `card` | white | Card backgrounds, header/footer |
| `destructive` | 0 65% 50% | Errors, destructive actions |
| `destructive-foreground` | white | Text on destructive |

### Tailwind Usage

```tsx
// Backgrounds
bg-primary, bg-accent, bg-background, bg-card, bg-muted/50

// Text
text-foreground, text-muted-foreground, text-primary, text-accent

// Borders
border-border

// Opacity variants (e.g. for hover, focus rings)
bg-primary/10, ring-primary/20, hover:bg-primary/90
```

### Principles

- **Calm**: Soft blues and teals, no harsh contrasts
- **Trust**: Accent (teal) signals credibility and care
- **Conversion**: Primary (navy) for high-contrast CTAs
- **Readability**: Warm neutrals reduce eye strain

---

## 2. Typography Scale

### Font

- **Primary**: Source Sans 3 (Google Font)
- **Display**: Same — consistent, professional

### Scale

| Token | Classes | Use |
|-------|---------|-----|
| `h1` | `text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight` | Hero, page title |
| `h2` | `text-3xl sm:text-4xl font-bold tracking-tight` | Section titles |
| `h3` | `text-xl sm:text-2xl font-semibold` | Card titles, subsections |
| `h4` | `text-lg font-semibold` | Minor headings |
| `h5` | `text-base font-semibold` | Labels, small headings |
| `lead` | `text-lg sm:text-xl leading-relaxed text-muted-foreground` | Intro paragraphs |
| `body` | `text-base leading-relaxed` | Body copy |
| `body-sm` | `text-sm leading-relaxed text-muted-foreground` | Secondary copy |
| `caption` | `text-sm text-muted-foreground` | Labels, hints |
| `xs` | `text-xs text-muted-foreground` | Fine print |

### Line Height

- Headings: `leading-tight` (implicit)
- Body: `leading-relaxed` (1.625)
- Small text: `leading-relaxed`

---

## 3. Spacing Scale

| Token | Value | Tailwind | Use |
|-------|-------|----------|-----|
| `xs` | 4px | `1` | Tight gaps |
| `sm` | 8px | `2` | Icon-text gaps |
| `md` | 16px | `4` | Form field gaps |
| `lg` | 24px | `6` | Section internal |
| `xl` | 32px | `8` | Between blocks |
| `2xl` | 48px | `12` | Section spacing |
| `3xl` | 64px | `16` | Large section gaps |
| `4xl` | 80px | `20` | Hero spacing |
| `5xl` | 96px | `24` | Major section breaks |

### Section Padding

| Token | Classes | Use |
|-------|---------|-----|
| `pySm` | `py-12 sm:py-16` | Compact sections |
| `py` | `py-16 sm:py-20` | Standard sections |
| `pyLg` | `py-20 sm:py-24` | Hero, major CTAs |

---

## 4. Border Radius

| Token | Value | Tailwind | Use |
|-------|-------|----------|-----|
| `sm` | 0.5rem | `rounded-lg` | Inputs, buttons, badges |
| `md` | 0.75rem | `rounded-xl` | Cards |
| `lg` | 1rem | `rounded-2xl` | Large cards, modals |
| `full` | 9999px | `rounded-full` | Pills, avatars |

---

## 5. Shadows

| Token | Use |
|-------|-----|
| `shadow-sm` | Cards at rest |
| `shadow-md` | Cards hover, elevated elements |
| `shadow-lg` | Elevated cards hover, modals |
| `shadow-xl` | Overlays, dropdowns |

**Principle**: Soft, low-opacity shadows. No harsh drop shadows.

---

## 6. Container Widths

| Token | Max Width | Tailwind | Use |
|-------|-----------|----------|-----|
| `sm` | 48rem | `max-w-3xl` | Forms, narrow content |
| `md` | 64rem | `max-w-5xl` | Standard content |
| `lg` | 72rem | `max-w-6xl` | Wide content |
| `full` | 72rem | `max-w-[72rem]` | Full site width |

**Padding**: `px-4 sm:px-6 lg:px-8`

---

## 7. Button Variants

| Variant | Use |
|---------|-----|
| `primary` | Main CTAs (Request Care, Submit) |
| `secondary` | Secondary actions (accent colour) |
| `outline` | Tertiary, low-commitment actions |
| `ghost` | Minimal emphasis (nav, inline) |
| `inverted` | On primary/dark backgrounds |
| `invertedOutline` | Secondary on primary backgrounds |

### Sizes

| Size | Height | Use |
|------|--------|-----|
| `sm` | 36px | Compact UI |
| `md` | 44px | Default |
| `lg` | 48px | Hero, CTA sections |

### Styling

- `font-semibold`
- `transition-colors`, `active:scale-[0.98]` for feedback
- `focus-visible:ring-2 focus-visible:ring-offset-2`
- `disabled:opacity-50 disabled:pointer-events-none`

---

## 8. Card Variants

| Variant | Use |
|---------|-----|
| `default` | Service cards, content blocks — `shadow-sm`, `hover:shadow-md` |
| `elevated` | Featured cards — `shadow-md`, `hover:shadow-lg hover:-translate-y-0.5` |
| `bordered` | Low-emphasis, form containers — `border-2`, `hover:border-primary/30` |
| `muted` | Background cards — `bg-muted/30`, `hover:bg-muted/50` |

### Styling

- `rounded-xl`, `p-6`
- `transition-all duration-200` for smooth hover

---

## 9. Form Styles

### Input / Select / Textarea Base

```
rounded-lg
border border-border
bg-card
px-4 py-3
text-foreground
placeholder:text-muted-foreground
focus:border-primary
focus:outline-none
focus:ring-2 focus:ring-primary/20
disabled:cursor-not-allowed disabled:opacity-50
```

### FormField

- Label: `text-sm font-medium text-foreground`
- Required indicator: `text-primary` asterisk
- Hint: `text-sm text-muted-foreground`
- Error: `text-sm text-destructive` (or `text-red-600`)

### Layout

- Field gap: `space-y-2`
- Form gap: `space-y-4` or `space-y-6`

### Principles

- Large tap targets (min 44px height)
- Clear focus states
- Minimal visual noise
- Error states visible and accessible

---

## 10. CTA Section Patterns

| Variant | Background | Use |
|---------|------------|-----|
| `primary` | `bg-primary text-primary-foreground` | End-of-page conversion, hero |
| `muted` | `bg-muted/50` | Mid-page soft CTA |
| `outline` | `border-y border-border bg-card` | Subtle, between sections |
| `accent` | `bg-accent/10` | Trust-building CTA |

### Layout

- Padding: `py-16 sm:py-20`
- Content: `max-w-2xl mx-auto text-center`
- Buttons: `flex flex-col sm:flex-row gap-4 justify-center`

### Button Treatment on Primary

- Primary CTA: `bg-primary-foreground text-primary` (inverted)
- Secondary: `border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10`

---

## 11. Trust Badge Styles

| Variant | Use |
|---------|-----|
| `default` | `bg-primary/10 text-primary` — general badges |
| `trust` | `bg-accent/10 text-accent` — NDIS, DVA, credentials |
| `outline` | `border border-border text-muted-foreground` — low emphasis |
| `solid` | `bg-accent text-accent-foreground` — strong trust signal |

### Base

- `rounded-full px-3 py-1 text-sm font-medium`
- `inline-flex items-center`

### TrustBar

- Background: `bg-card/50` or `bg-muted/30`
- Border: `border-y border-border`
- Padding: `py-6`
- Gap: `gap-3 sm:gap-4`
- Layout: `flex flex-wrap justify-center items-center`

---

## Usage Principles

1. **Consistency**: Use tokens; avoid arbitrary values.
2. **Composition**: Build from primitives (UI → Forms/Sections → Layout).
3. **Accessibility**: Semantic HTML, focus states, contrast.
4. **Conversion**: Clear hierarchy, obvious CTAs, low friction.
5. **Calm**: Soft colours, generous spacing, readable typography.
