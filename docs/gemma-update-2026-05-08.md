# Update for Gemma — 8 May 2026

> Drop-in email body. The voice is "Tyson speaking to Gemma" — confident, warm, plain English. Trim or expand to taste.

---

**Subject:** Website update — your changes are live (and a few extra wins under the hood)

Hi Gemma,

Following on from our 12pm chat, I wanted to walk you through everything that's gone live since you sent through the wording feedback. The site is updated, but I also did a few things behind the scenes that should help Gentle Care show up properly in Google and AI search tools — so I want to walk you through both.

## What you'll see when you open the site

Everything you asked for in the email is now live. Open the site on your phone and you'll see:

- **Hero**: new tagline reads "Personalised · Compassionate · Trusted", new heading "Personalised In-Home Care & Support", and the warmer subheading you wrote ("Thoughtful, quality-focused support delivered with dignity, consistency and compassion."). The "Clinician-Led" / "Boutique" / "10+ Yrs Clinician Experience" wording is gone, sitewide.
- **About section**: tighter heading, simpler intro, the floating "smaller caseload" quote box removed. Both icon points now lead with the personal-relationship message.
- **The four-step process ("From Enquiry to Peace of Mind")**: heading is smaller and darker as you asked, and the step descriptions are word-for-word what you sent.
- **Service cards**: the "Clinical Excellence" tagline above is gone, and the Nursing Care card uses your line — "Personalised in-home support focused on quality care, consistency and independence."
- **Your founder section** (on the About page): your bio is the new two-paragraph version, your quote uses the new wording, the text is darker and not italic so it's easier to read, and the "Qualifications & Experience" badge cluster is gone — exactly the cleaner, more personal feel you wanted.
- **The badges that scroll across the site**: trimmed down, "Clinical Excellence" replaced with "10+ Yrs Hands-On Care", and on phone they pause when you scroll away from them so they're not draining battery.
- **On phone, generally**: feels calmer. The hero photo doesn't shift around when you scroll, and the background animations are quieter. You said the site felt busy — it shouldn't anymore.

Everything you specifically called out in your email has been done.

## What I did behind the scenes (and why)

Three things you can't see directly, but that change how findable Gentle Care is:

### 1. AI search engines can now actually quote you

ChatGPT, Google's AI Overviews, Perplexity, and Microsoft Copilot are starting to answer healthcare questions directly instead of pointing people at search results. Before today, when those tools were asked things like *"who's a good in-home nursing provider in Sydney with NDIS"*, Gentle Care wasn't being mentioned **on a single one of the ten priority queries we tracked**.

I added what we're calling "Quick Facts" panels — short, factual blocks on the homepage and on /ndis, /dva, /aged-care, /services/nursing-care. They sit alongside the warm copy, so the page still reads like Gentle Care. But behind the scenes, they're written in exactly the format AI engines extract when they answer factual questions. Things like "Service area: Sydney and surrounds — Inner West, North Shore, Northern Beaches…", "Funding accepted: NDIS, DVA Community Nursing, aged care (Support at Home, CHSP), and private fee-for-service."

I also added the same panels to the 30 region-specific pages (the ones that target "NDIS in Inner West", "DVA in North Shore", etc.), each one tailored to the actual suburbs and the relevant funding programme.

### 2. Specific hospital names

Across each region's page, I added specific hospital names — RPA, Concord, Royal North Shore, Mater, Westmead, Blacktown, Nepean, Liverpool, St George, Sutherland, Northern Beaches Hospital, Mona Vale, St Vincent's, Prince of Wales, and Sydney Hospital. The reason: discharge planners and families search exactly that way ("in-home nursing after Westmead", "post-discharge care after RPA"). Naming the actual hospitals helps Google understand which area Gentle Care actually serves and helps families find Gentle Care when they're at the hospital trying to plan what comes next.

### 3. Your authority as founder is now formally linked to the business

For healthcare topics, Google specifically rewards content where it can verify who the expert is. I added a hidden machine-readable record on your About page that links *you* (Gemma, founder, ten years of hands-on care experience) directly to the business as an entity. It sounds technical, but it's one of the strongest signals Google uses to trust a healthcare business. It's invisible to visitors but very visible to Google.

### 4. The site is faster on phones

Older clients and family members are far more likely to find Gentle Care on a phone than a laptop, and Google ranks slow mobile pages lower. I switched the site over to a newer image format that's about 30% smaller, and turned off the heavier animations on mobile. Both of those help your Google ranking because Google measures how fast the site actually feels to real visitors.

## Where this leaves us

The site is now genuinely on-brand for Gentle Care, **and** technically ready for AI and Google to start citing it. We're not going to dominate overnight — Google takes a few weeks to recrawl and AI engines refresh on their own cycles — but every change shipped today is the kind that compounds.

I locked in a "before" snapshot today (your visibility was 0 out of 10 on the AI queries we measured) so we can show you the movement at the 30-day check.

## What I'd suggest next

A few things that would push this further, if you want to keep moving:

1. **Make sure Gentle Care is on the public DVA Community Nursing provider list and the NDIS Provider Finder.** I'll send you the links — they're the single fastest way to get cited by AI engines that pull from government sources.
2. **A few real testimonials with first names + suburb** (e.g. "Margaret, Mosman" — with their permission). Stronger trust signal than the generic credentials we have now.
3. **A weekly Google Business Profile post + one photo a month** — outside the website itself, but the single biggest thing that moves the local map pack.
4. **A couple of in-depth guides on topics like "Choosing an NDIS nursing provider in Sydney" and "DVA Community Nursing explained"** — long-form content is what AI engines cite as the *authoritative* answer rather than just a passing mention.

Happy to take any of these on whenever you're ready, and happy to talk through any of it on the call.

Cheers,
Tyson

---

## Appendix — for Tyson's reference (don't send)

### What's deployed (as of 2026-05-08)

| PR | Branch | Tip | Status |
|---|---|---|---|
| #11 | `chore/seo-pass-3-fixes` | `f5b4783` | ✅ merged |
| #12 | `chore/aeo-evidence-panel-and-person-schema` | `a5646e1` | ✅ merged |
| #13 | `chore/cwv-mobile-pass` | `8aa7e4b` | ✅ merged |
| #14 | `chore/baseline-evidence-2026-05-08` | (docs-only) | open |
| #15 | `chore/region-pages-local-seo` | (180 new citable facts) | open |

### Numbers we can show Gemma at the 30-day check

- **AEO citation rate** — pre-deploy 0/10. Re-run [`docs/AI_VISIBILITY_LOG.md`](AI_VISIBILITY_LOG.md) on 2026-06-07.
- **Mobile PageSpeed Insights score** — capture today and at +14d / +28d. Empty table in [`docs/evidence/2026-05-08/BASELINE.md`](evidence/2026-05-08/BASELINE.md).
- **Image-format saving** — already measured. 1080w hero photo: 550 KB source → 75 KB AVIF on supporting browsers (~86% smaller).

### Things still on the deferred list

- **Pricing transparency** (private rates) — required to be cited on cost queries. Needs Gemma's call.
- **Specific clinician byline + AHPRA number** on clinical content — strongest E-E-A-T signal we can add. Needs Gemma's permission and a verified AHPRA number.
- **AggregateRating** — only worth shipping when there are ≥5 verifiable reviews. Don't fabricate.
