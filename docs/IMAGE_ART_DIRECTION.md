# Image Art Direction — Gentle Care Nursing

Reference for all imagery on the homepage and key pages. Use this to brief photographers, select stock, or evaluate existing assets.

---

## Global principles

### Feel
Imagery must feel:
- **Authentic** — real moments, not staged or generic
- **Warm** — inviting, human, emotionally open
- **Gentle** — soft, unhurried, caring
- **Human** — people first; care as relationship, not transaction
- **Compassionate** — empathy and kindness visible
- **Professional** — capable, trustworthy, reassuring

### Suitable for
- In-home care
- Nurses and carers supporting patients
- Natural lighting (window light, soft daylight)
- Real home environments (living room, bedroom, kitchen — not hospitals)
- Calm and reassuring moments (conversation, gentle support, quiet activity)

### Avoid
- Cheesy stock photos
- Over-clinical hospital scenes (beds, IVs, scrubs, sterile walls)
- Fake handshake photos
- Generic smiling doctor images
- Cold corporate healthcare photography
- Overly posed or “grinning at camera” shots
- Stethoscopes and medical props as focal points

---

## Homepage sections

### 1. Hero

| Field | Spec |
|-------|------|
| **Image type** | Single hero photograph or background image. Sets the whole-site tone. Must leave space (or soft area) for headline and CTAs. |
| **Subject doing** | A moment of care in a home setting: carer gently supporting an elderly person (e.g. hands held, seated together, or quiet activity like reading or a walk). Focus on connection, not procedure. |
| **Emotional tone** | Calm, reassuring, “in good hands”. Trust and safety without being sentimental. |
| **Avoid** | Hospital beds, scrubs, stethoscopes, posed handshakes, people grinning at camera. No busy backgrounds that compete with headline text. |
| **Crop / orientation** | Landscape (16:9 or wider). Panoramic works well. Ensure at least one area (e.g. left, centre, or soft bokeh) is suitable for text overlay. |

---

### 2. Trust strip

**No imagery.** This section uses trust badges (text/UI) only. No photograph required.

---

### 3. Who we help

| Field | Spec |
|-------|------|
| **Image type** | Optional: one section image, or small visuals per audience card (Families, NDIS Coordinators, Discharge Planners, Referral Partners). If one image: a single inclusive “who we support” moment. |
| **Subject doing** | Either one shot showing diversity of people we help (e.g. family with older relative, or carer with client in a home), or subtle illustrations/icons per card. If photographic: a genuine moment of support or conversation in a home. |
| **Emotional tone** | Inclusive, supportive, “you’re in the right place”. Warm and professional. |
| **Avoid** | Literal “coordinator at desk” or “doctor in white coat”. No corporate handshakes or stock-office scenes. |
| **Crop / orientation** | If one section image: landscape or portrait, max-width ~720px. If per-card: square or portrait, small so cards stay scannable. |

---

### 4. Services overview

| Field | Spec |
|-------|------|
| **Image type** | Optional. Either no imagery (rely on cards and copy) or one “services in action” image that suggests in-home care across our offer. |
| **Subject doing** | If used: carer and client in a calm, everyday moment at home (e.g. seated conversation, gentle assistance, or quiet activity). Should feel representative of our services, not one specific program. |
| **Emotional tone** | Capable, calm, “we’re here for you”. Professional and reassuring. |
| **Avoid** | Clinical equipment, hospital settings, or anything that looks like one funding stream only (e.g. avoid only “aged” or only “disability” coding). |
| **Crop / orientation** | Landscape or portrait; if used, keep secondary to the service cards. |

---

### 5. Why Gentle Care is different

| Field | Spec |
|-------|------|
| **Image type** | One strong “human difference” image. Often the most impactful photo on the page — carer and client in a clearly personal, unhurried moment. |
| **Subject doing** | A moment that says “personalised, dedicated care”: e.g. carer and elderly person in a warm, natural interaction (conversation, gentle touch, shared activity). Should feel one-to-one, not institutional. |
| **Emotional tone** | Personal, warm, trusted. “This is what different looks like.” |
| **Avoid** | Generic group shots, clinical environments, or anything that could be any provider. No stiff poses or stock expressions. |
| **Crop / orientation** | Portrait or 4:5 works well for “two people, connection”. Landscape acceptable if composition is strong. Allow space so layout doesn’t feel cramped. |

---

### 6. Simple 3-step process

**No imagery.** This section uses step numbers and copy only. No photograph required.

---

### 7. AI assistant section

**No imagery.** This section uses copy and CTA/embed. No photograph required.

---

### 8. Referral CTA section

**No imagery.** This section is conversion-focused copy and buttons. No photograph required.

---

### 9. FAQ preview

**No imagery.** This section uses accordion and copy. No photograph required.

---

### 10. Final CTA

**No imagery.** This section is copy and CTAs. No photograph required.

---

### 11. Footer

**No imagery.** Footer uses logo, links, and contact details. No photograph required.

---

## Key sections beyond homepage

### About page
- **Image count**: One or two.
- **Suggestions**: (1) “Who we are” — team or a representative care moment that feels genuine; (2) “Where we work” — a real home environment (e.g. living room, gentle light) without showing identifiable people if preferred.
- **Tone and avoid**: Same as global principles. No hospital scenes, no corporate handshakes, no cold or cheesy stock.

### Service pages (NDIS, DVA, Aged Care, Private Nursing)
- **Image count**: Optional hero or lead image per page.
- **Principles**: Same feel and avoid list. Imagery can gently reflect the audience (e.g. older person at home for Aged Care, veteran or family for DVA) without being literal or clinical.
- **Subject doing**: In-home care moment that fits the service; no need for props or labels. Focus on calm, support, and dignity.

---

## Use in production

- Use the **Next.js `Image` component** for all images.
- Serve images as **WebP** for performance (see [.cursor/rules/image-handling.mdc](.cursor/rules/image-handling.mdc) for conversion and optimisation).
- Provide **descriptive `alt` text** for accessibility (describe the scene and mood, not “image of”).
- Prefer **priority loading** for above-the-fold images (e.g. hero, header logo).
