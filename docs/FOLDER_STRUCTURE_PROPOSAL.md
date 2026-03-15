# Production-Ready Project Structure — Gentle Care Nursing

Clean folder architecture, scalable component organisation, App Router structure, and clear separation of layout, sections, forms, and UI primitives.

---

## Principles

| Principle | Implementation |
|-----------|----------------|
| **Clean folder architecture** | Flat, predictable paths; one purpose per folder |
| **Scalable components** | Layout → Sections → Forms → UI primitives hierarchy |
| **App Router structure** | Flat routes, no route groups; clear URL mapping |
| **Separation of concerns** | Layout (shell), Sections (page blocks), Forms (data capture), UI (atoms) |

---

## Folder Structure

```
src/
├── app/                              # Next.js App Router
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Home
│   ├── globals.css
│   ├── not-found.tsx                 # 404
│   │
│   ├── about/page.tsx
│   ├── services/page.tsx
│   ├── ndis/page.tsx
│   ├── dva/page.tsx
│   ├── aged-care/page.tsx
│   ├── private-nursing/page.tsx
│   ├── referral/page.tsx
│   ├── contact/page.tsx
│   ├── faq/page.tsx
│   ├── privacy/page.tsx
│   │
│   └── api/
│       └── submit/route.ts            # Form submission (GoHighLevel proxy)
│
├── components/
│   ├── layout/                       # Shell, structure, page framing
│   │   ├── Header.tsx
│   │   ├── Nav.tsx
│   │   ├── Footer.tsx
│   │   ├── FooterColumn.tsx
│   │   ├── Container.tsx
│   │   ├── Section.tsx
│   │   ├── Grid.tsx
│   │   └── index.ts
│   │
│   ├── sections/                     # Page sections (Hero, TrustBar, etc.)
│   │   ├── Hero.tsx
│   │   ├── TrustBar.tsx
│   │   ├── TrustBadge.tsx
│   │   ├── ServiceCard.tsx
│   │   ├── ServiceCards.tsx
│   │   ├── SectionHeader.tsx
│   │   ├── CtaSection.tsx
│   │   ├── FaqAccordion.tsx
│   │   └── index.ts
│   │
│   ├── forms/                        # Form components
│   │   ├── ContactForm.tsx
│   │   ├── ReferralForm.tsx
│   │   └── index.ts
│   │
│   ├── ui/                           # UI primitives (atoms)
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Input.tsx
│   │   ├── Label.tsx
│   │   ├── Select.tsx
│   │   ├── Textarea.tsx
│   │   ├── FormField.tsx
│   │   └── index.ts
│   │
│   └── embeds/                       # Third-party embeds
│       ├── GHLWidgets.tsx            # GoHighLevel AI chat + voice
│       └── index.ts
│
├── design-system/
│   ├── tokens.ts
│   └── DESIGN_SYSTEM.md
│
├── lib/
│   ├── utils.ts
│   ├── constants.ts
│   ├── metadata.ts                   # SEO metadata helpers
│   └── schema.ts                     # JSON-LD schema
│
├── content/                           # Content / data layer
│   ├── services.ts                   # Service definitions
│   ├── faq.ts                        # FAQ items
│   └── site.ts                       # Site-wide copy
│
├── config/
│   └── integrations.ts               # GoHighLevel IDs, env-driven
│
└── types/
    └── index.ts
```

---

## Component Hierarchy

```
Layout (shell)
  └── Header, Footer, Container, Section, Grid

Sections (page blocks)
  └── Hero, TrustBar, ServiceCards, CtaSection, FaqAccordion
      └── use: UI primitives, Layout primitives

Forms (data capture)
  └── ContactForm, ReferralForm
      └── use: UI primitives (Input, Label, Button, FormField)

UI (primitives)
  └── Button, Card, Badge, Input, Label, Select, Textarea, FormField
```

**Import rule**: Sections and Forms import from UI and Layout. UI and Layout do not import from Sections or Forms.

---

## App Router (URLs)

| Route | Purpose |
|-------|---------|
| `/` | Home |
| `/about` | About |
| `/services` | Services overview |
| `/ndis` | NDIS services |
| `/dva` | DVA & community nursing |
| `/aged-care` | Aged care / Support at Home |
| `/private-nursing` | Private nursing & personal care |
| `/referral` | Request care / referral form |
| `/contact` | Contact |
| `/faq` | FAQ |
| `/privacy` | Privacy policy |

---

## File Naming

- **Components**: PascalCase (`Hero.tsx`, `ServiceCard.tsx`)
- **Utilities / config**: camelCase (`metadata.ts`, `integrations.ts`)
- **Pages**: `page.tsx` (App Router convention)
