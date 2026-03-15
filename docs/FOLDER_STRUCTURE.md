# Gentle Care Nursing — Folder Structure

Production-ready structure for a category-leading healthcare website.

```
src/
├── app/
│   ├── layout.tsx              # Root layout (Header, Footer, metadata)
│   ├── page.tsx                # Home
│   ├── globals.css             # Global styles, design tokens
│   ├── about/
│   │   └── page.tsx
│   ├── services/
│   │   └── page.tsx
│   ├── ndis/
│   │   └── page.tsx
│   ├── dva/
│   │   └── page.tsx
│   ├── aged-care/
│   │   └── page.tsx
│   ├── private-nursing/
│   │   └── page.tsx
│   ├── referral/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── faq/
│   │   └── page.tsx
│   └── privacy/
│       └── page.tsx
├── components/
│   ├── ui/                     # Base primitives
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   └── index.ts
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Container.tsx
│   │   └── index.ts
│   ├── sections/               # Feature sections
│   │   ├── Hero.tsx
│   │   ├── TrustBar.tsx
│   │   ├── ServiceCards.tsx
│   │   ├── CtaSection.tsx
│   │   └── index.ts
│   └── forms/
│       ├── ContactForm.tsx
│       ├── ReferralForm.tsx
│       └── index.ts
├── lib/
│   ├── constants.ts            # Site config, nav, CTAs
│   └── utils.ts                # cn(), etc.
└── types/
    └── index.ts
```

## Principles

- **Direct imports** — Import from component files, avoid barrel files for tree-shaking
- **Colocation** — Page-specific components can live next to routes
- **Scalable** — Add new sections/forms without restructuring
