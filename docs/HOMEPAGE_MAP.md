# Homepage Map — Gentle Care Nursing

Detailed section-by-section blueprint before implementation.  
Sequence: Hero → Trust strip → Who we help → Services → Why different → 3-step process → AI assistant → Referral CTA → FAQ preview → Final CTA → Footer.

---

## 1. Hero

### Goal
- Capture attention in 3–5 seconds
- Communicate core value and who it’s for
- Drive first CTA (Request Care)
- Set a premium, calm, trustworthy tone

### Content Hierarchy
1. **Headline** (H1) — Primary promise, audience-aware  
   - Example: *"Personalised In-Home Nursing & Care"* or *"Quality Care, Right Where You Need It"*
2. **Subheadline** — Who we help + reassurance  
   - Example: *"For families, NDIS participants, and referral partners. Registered provider. Dedicated support."*
3. **Primary CTA** — Request Care (button)
4. **Secondary CTA** — Contact Us (outline/link)

### Recommended Layout
- **Desktop**: Centred content, max-width ~720px. Headline large (text-4xl–6xl), subheadline lead size. CTAs side-by-side, primary left.
- **Mobile**: Stacked, full-width. Headline text-4xl, subheadline text-lg. CTAs stacked, primary full-width.
- **Background**: Light, minimal. Optional soft gradient or subtle pattern. No busy imagery that competes with copy.

### CTA Logic
- **Primary**: Request Care → `/referral` — main conversion path
- **Secondary**: Contact Us → `/contact` — lower-commitment option
- No tertiary CTAs — keep focus

### Conversion Support
- Clear value proposition above the fold
- Single primary action
- Low friction: one click to referral form
- Trust hint in subheadline (e.g. “Registered provider”)

---

## 2. Trust Strip

### Goal
- Reinforce credibility immediately after hero
- Answer “Why should I trust you?”
- Support NDIS/DVA and referral audiences

### Content Hierarchy
1. **Trust badges** (horizontal strip)  
   - Registered NDIS Provider  
   - Registered DVA Provider  
   - In-Home Nursing & Care  
   - Personalised Support  

### Recommended Layout
- **Desktop**: Single row, centred, flex-wrap. Badges with `trust` or `solid` variant. Border-y, subtle bg (e.g. `bg-card/50` or `bg-muted/30`).
- **Mobile**: 2×2 or wrapped grid. Same badges, touch-friendly.
- **Spacing**: `py-6`, gap `gap-3 sm:gap-4`.

### CTA Logic
- No CTAs — trust strip only
- Badges are informational, not links (unless specific badges link to NDIS/DVA pages later)

### Conversion Support
- Reduces doubt before services section
- Credentials visible without scrolling
- Consistent with CRO: trust before ask

---

## 3. Who We Help

### Goal
- Help visitors self-identify
- Show relevance to families, coordinators, planners, referrers
- Reduce “Is this for me?” friction

### Content Hierarchy
1. **Section heading** (H2) — e.g. *"Who We Help"*
2. **Subtitle** — e.g. *"We support families, coordinators, and healthcare professionals."*
3. **Audience cards** (3–4) — each with:
   - Icon or simple visual
   - Audience label (e.g. Families, NDIS Coordinators, Discharge Planners, Referral Partners)
   - Short description (1–2 lines)

### Recommended Layout
- **Desktop**: 2×2 or 4-column grid. Cards with `variant="bordered"` or `variant="default"`. Section padding `py-16 sm:py-20`.
- **Mobile**: Single column, stacked cards.
- **Alignment**: Section header centred; cards left-aligned or centred.

### CTA Logic
- Optional: “Learn more” per card → `/services` or relevant service page
- Or no CTA — section is informational; CTA comes in Services

### Conversion Support
- Self-identification increases relevance
- Reduces bounce for “wrong audience”
- Builds confidence before services

---

## 4. Services Overview

### Goal
- Show all care categories
- Link to service pages
- Support SEO and internal linking

### Content Hierarchy
1. **Section heading** (H2) — e.g. *"Our Services"*
2. **Subtitle** — e.g. *"In-home nursing and care across NDIS, DVA, aged care, and private."*
3. **Service cards** (4) — from `SERVICES`:
   - NDIS Services
   - DVA & Community Nursing
   - Aged Care / Support at Home
   - Private Nursing & Personal Care
   - Each: title, short description, link to service page

### Recommended Layout
- **Desktop**: 2×2 grid. Cards `variant="default"` or `variant="elevated"`. Hover lift.
- **Mobile**: Single column or 2 columns on small tablets.
- **Section**: `SectionHeader` centred, `Grid cols={2}` or `cols={4}`.

### CTA Logic
- Each card links to its service page (e.g. `/ndis`, `/dva`, etc.)
- Section CTA: “Request Care” or “View all services” → `/referral` or `/services`

### Conversion Support
- Clear paths to deeper content
- Service cards act as mini-CTAs
- Supports search intent for service keywords

---

## 5. Why Gentle Care Is Different

### Goal
- Differentiate from generic providers
- Highlight smaller client load, personalised care, responsiveness
- Strengthen trust and preference

### Content Hierarchy
1. **Section heading** (H2) — e.g. *"Why Gentle Care Is Different"*
2. **Subtitle** — e.g. *"We focus on quality over volume."*
3. **Differentiators** (3–4) — each with:
   - Short headline (e.g. Smaller client load, Personalised support, Fast response)
   - 1–2 sentence explanation

### Recommended Layout
- **Desktop**: 3-column or 2×2 grid. Cards or simple blocks. Optional icons.
- **Mobile**: Single column.
- **Variant**: `variant="muted"` for contrast with surrounding sections.

### CTA Logic
- Optional “Request Care” at bottom of section
- Or rely on next section (3-step process) for CTA

### Conversion Support
- Reduces “commodity provider” perception
- Supports premium positioning
- Builds preference before process/CTA

---

## 6. Simple 3-Step Process

### Goal
- Remove friction by showing how easy it is
- Reduce “What happens next?” anxiety
- Move visitors toward referral

### Content Hierarchy
1. **Section heading** (H2) — e.g. *"How It Works"* or *"Simple 3-Step Process"*
2. **Subtitle** — e.g. *"From enquiry to care — we make it straightforward."*
3. **Steps** (3) — each:
   - Step number (1, 2, 3)
   - Headline (e.g. Submit enquiry, We respond quickly, Care begins)
   - Brief description

### Recommended Layout
- **Desktop**: Horizontal 3-column. Steps with numbers, connecting line or arrows optional.
- **Mobile**: Vertical stack. Numbers prominent.
- **Visual**: Minimal — numbers, text, optional icons. No clutter.

### CTA Logic
- **Primary CTA**: “Request Care” or “Start your enquiry” → `/referral`
- Placed after step 3 or as a full-width button

### Conversion Support
- Friction removal (Hormozi)
- Clear next step
- Reduces perceived effort

---

## 7. AI Assistant Section

### Goal
- Introduce AI chat and voice assistant
- Offer low-friction alternative to form
- Support GoHighLevel embed placement

### Content Hierarchy
1. **Section heading** (H2) — e.g. *"Questions? Our AI Assistant Can Help"*
2. **Subtitle** — e.g. *"Get instant answers about our services, eligibility, or how to get started."*
3. **CTA** — e.g. *"Speak With Our AI Assistant"* or *"Chat Now"*
4. **Embed slot** — GoHighLevel AI chat + voice widget (when available)

### Recommended Layout
- **Desktop**: Centred block. Heading, subtitle, CTA button. Embed below or in a card.
- **Mobile**: Same structure. CTA full-width. Embed responsive.
- **Variant**: `variant="accent"` or `variant="muted"` for visual distinction.

### CTA Logic
- **Primary**: “Speak With Our AI Assistant” — opens chat or triggers voice (embed-dependent)
- **Secondary**: “Request Care” → `/referral` — for those who prefer form

### Conversion Support
- Low-friction entry point
- Captures visitors who aren’t ready to fill a form
- Supports qualification via chat before referral

---

## 8. Referral CTA Section

### Goal
- Strong conversion moment
- Direct path to referral form
- Clear value and next step

### Content Hierarchy
1. **Headline** (H2) — e.g. *"Ready to Get Started?"* or *"Request Care Today"*
2. **Subtitle** — e.g. *"Submit your enquiry and we’ll respond quickly."*
3. **Primary CTA** — Request Care
4. **Secondary CTA** — Contact Us (optional)

### Recommended Layout
- **Desktop**: Full-width section. `variant="primary"`. Centred content, max-width ~640px. Inverted buttons.
- **Mobile**: Same. CTAs stacked, primary full-width.
- **Padding**: `py-16 sm:py-20`.

### CTA Logic
- **Primary**: Request Care → `/referral`
- **Secondary**: Contact Us → `/contact`
- Use `CtaSection` with `variant="primary"`, inverted buttons

### Conversion Support
- High-contrast, conversion-focused block
- Clear single action
- Placed after value and trust are established

---

## 9. FAQ Preview

### Goal
- Address common objections and questions
- Support SEO (FAQ schema)
- Link to full FAQ page

### Content Hierarchy
1. **Section heading** (H2) — e.g. *"Common Questions"*
2. **FAQ items** (3–4) — accordion or expandable:
   - Who can access your services?
   - How quickly do you respond?
   - What funding do you accept?
   - How do I make a referral?
3. **Link** — “View all FAQs” → `/faq`

### Recommended Layout
- **Desktop**: Single column, max-width ~720px. `FaqAccordion` with 3–4 items.
- **Mobile**: Same. Accordion touch-friendly.
- **Section**: `variant="default"` or `variant="muted"`.

### CTA Logic
- **Primary**: “View all FAQs” → `/faq`
- **Secondary**: “Request Care” (optional, below accordion)

### Conversion Support
- Reduces last-minute objections
- FAQ snippet supports search
- “View all” drives deeper engagement

---

## 10. Final CTA

### Goal
- Last conversion opportunity before footer
- Reinforce primary action
- Simple, uncluttered

### Content Hierarchy
1. **Headline** — e.g. *"Need Care? We’re Here to Help."*
2. **Subtitle** — e.g. *"Submit your enquiry or contact us — we respond quickly."*
3. **Primary CTA** — Request Care
4. **Secondary CTA** — Contact Us

### Recommended Layout
- **Desktop**: Centred, `variant="muted"` or `variant="outline"`. Buttons side-by-side.
- **Mobile**: Stacked CTAs.
- **Padding**: `py-16 sm:py-20`.

### CTA Logic
- **Primary**: Request Care → `/referral`
- **Secondary**: Contact Us → `/contact`
- Use `CtaSection` with `variant="muted"` or `variant="outline"`

### Conversion Support
- Final nudge before footer
- Consistent CTAs across page
- Supports scroll-to-bottom converters

---

## 11. Footer

### Goal
- Site navigation and legal links
- Contact paths
- Reinforce brand

### Content Hierarchy
1. **Brand** — Logo/name, tagline
2. **Services** — Links to NDIS, DVA, Aged Care, Private
3. **Information** — About, Services, FAQ, Contact, Privacy
4. **Get in touch** — Request Care, Contact Us
5. **Copyright** — © Year Gentle Care Nursing

### Recommended Layout
- **Desktop**: 4-column grid. Brand | Services | Information | Get in touch. Copyright full-width below.
- **Mobile**: Stacked or 2-column. Same content order.
- Uses existing `Footer` component.

### CTA Logic
- Links only — no primary button
- Request Care and Contact Us as text links in “Get in touch”

### Conversion Support
- Persistent navigation
- Multiple paths to conversion
- Trust and professionalism

---

## Section Summary Table

| # | Section           | Goal                          | Primary CTA      | Variant   |
|---|-------------------|-------------------------------|------------------|-----------|
| 1 | Hero              | Capture, value, first CTA     | Request Care     | —         |
| 2 | Trust Strip       | Credibility                   | —                | muted     |
| 3 | Who We Help       | Self-identify                 | Optional         | default   |
| 4 | Services Overview | Show services, link deeper    | Card links       | default   |
| 5 | Why Different     | Differentiate                 | Optional         | muted     |
| 6 | 3-Step Process    | Remove friction               | Request Care     | default   |
| 7 | AI Assistant      | Low-friction entry            | AI / Request Care| accent    |
| 8 | Referral CTA      | Strong conversion             | Request Care     | primary   |
| 9 | FAQ Preview      | Objection handling            | View FAQs        | default   |
|10 | Final CTA        | Last chance                   | Request Care     | muted     |
|11 | Footer           | Nav, links, brand             | Links            | —         |

---

## Conversion Flow Summary

1. **Awareness** (Hero, Trust Strip) — Value + credibility
2. **Relevance** (Who We Help, Services) — “This is for me”
3. **Preference** (Why Different, 3-Step) — “I choose Gentle Care”
4. **Action** (AI, Referral CTA, Final CTA) — “I’ll enquire now”
5. **Reassurance** (FAQ Preview) — “My questions are answered”

CTAs are consistent: **Request Care** as primary, **Contact Us** as secondary.  
Every section supports the next step toward conversion.
