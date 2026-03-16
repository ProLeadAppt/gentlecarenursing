# Copy style guide — Gentle Care Nursing

Follow this guide for all customer-facing copy (website content, CTAs, forms, meta descriptions, and any new or updated text). It keeps our voice consistent and avoids telltale AI patterns.

---

## 1. No long dashes (em dashes)

**Do not use em dashes (—)** in customer-facing copy. They read as formulaic and AI-generated.

**Exception:** En dashes (–) in number or date ranges are fine (e.g. "24–48 hours", "Levels 1–4"). Only the em dash (—) is banned in copy.

**Instead use:**
- A comma: *"In-home nursing across Sydney, for you or someone you love."*
- A full stop and new sentence: *"We're here from the first conversation. We respond quickly because we know that matters."*
- "and" or "and we": *"You're not a number. You're someone we're committed to supporting well."*
- A colon only when listing: *"What you get: clear next steps, no runaround."*

**Examples:**

| Avoid | Prefer |
|-------|--------|
| Care that feels calm — and personal. | Care that feels calm and personal. |
| We're here when you need us — and we respond quickly. | We're here when you need us, and we respond quickly. |
| No obligation — just a conversation. | No obligation. Just a conversation. |

---

## 2. Australian English

Use **Australian English** spelling and conventions in all user-facing copy.

**Spelling:**
- **-ise** not -ize: prioritise, personalise, organise, recognise, apologise
- **-our** not -or: colour, favour, behaviour, honour (except where the word is a brand or legal term, e.g. "Registered NDIS provider")
- **-re** not -er: centre (when used as a noun, e.g. "contact centre")
- **-ence** not -ense: licence (noun), licence (verb in Aus); defence
- **enquiry** for a question/request: "submit an enquiry", "enquiries"
- **program** in computing/technical contexts is fine; **programme** for TV/broadcast if ever needed

**Conventions:**
- Single quotes for direct speech or emphasis in body copy if needed; otherwise minimal punctuation for emphasis.
- Date format: prefer "15 March 2025" or "15/03/2025" in copy; avoid US month-first where it could confuse.
- Numbers: "24 hours" not "24hrs" in prose (short form like "24hr" in labels/UI is acceptable).

**Examples:**

| American | Australian |
|----------|------------|
| prioritize | prioritise |
| personalized | personalised |
| organization | organisation |
| behavior | behaviour |
| center (noun) | centre |
| inquiry | enquiry |

---

## 3. Tone (reminder)

- Warm, calm, and professional. Reassuring without being salesy.
- Human and specific. Avoid corporate or generic healthcare jargon.
- Short sentences and clear next steps. No filler.

---

## 4. Where this applies

- **Content files:** `src/content/*.ts` (homepage, FAQ, about, services, areas, etc.)
- **Constants:** `src/lib/constants.ts` (e.g. CTA_REASSURANCE)
- **Copy in components:** Any user-visible strings in `src/components/` and `src/app/` (buttons, form messages, section titles, meta descriptions)
- **Docs that contain sample or final copy:** e.g. COPY_BRIEF, SITEMAP (where they quote site text)

Code comments and design-system notes can keep current style; this guide is for **customer-facing copy** and any docs that define or quote it.

---

*Last updated: March 2025*
