# AI Visibility Log — Gentle Care Nursing

Tracks who is being cited across AI-search-relevant queries for the priority intents defined in `docs/AI_SEO_AUDIT.md` §3. Re-run monthly to measure the impact of the AI SEO and SEO audit work.

> **What this measures.** Each row records who shows up as an authoritative source for the query — the providers AI engines (Google AI Overviews, ChatGPT with web, Perplexity, Gemini, Copilot) are most likely to cite. Web search results from the same query window are a strong proxy for AI source selection on healthcare queries (AI engines weight authority + recency + structure). Direct AI engine checks (manual, in-browser) are recommended monthly on top of this log.
>
> **What "cited" means.** Domain appears on page 1 of search results for the query AND/OR the AI summary returned by the same query mentions the domain by name. "—" = not cited.

---

## Baseline — 2026-05-07

Run against WebSearch (proxy for AI source selection). Manual AI-engine checks should be added as separate rows in subsequent passes.

| # | Query | Intent | GCN cited? | Top citations | Notes |
|---|---|---|:---:|---|---|
| 1 | best in-home nursing Sydney NDIS provider | local + funding | ❌ | mdhomecare.com.au, holisticfutures.com.au, vitalhomehealth.com.au, yourcareathome.org.au, carenhelp.com.au, lifetimecomfort.com.au, phomecare.com.au | "Top 10/Top 12/Top 20" listicles dominate. Pricing benchmark: $50–$90/hr. None of these listicles include GCN — getting onto one of these aggregator pages is a fast win. |
| 2 | DVA community nursing Sydney provider | regulator + service | ❌ | dva.gov.au (×4 official pages), vitalhomehealth.com.au, carexcell.com.au, metierhealth.com.au, alphanursing.com.au, holicare.com.au | DVA government pages dominate (4 of top 10). The DVA's `Panel of Community Nursing providers` PDF is *the* citable source — confirm GCN is on the current ACT/NSW PDF list. |
| 3 | registered NDIS provider in-home nursing Sydney | provider qualification | ❌ | ndis.gov.au (Provider Finder, ×3), ndiscommission.gov.au, yourcareathome.org.au, circleofhope.com.au, adcs.au, supportnetwork.com.au, athomecare.au, carenhelp.com.au | Government provider directories take 4 of top 10. **Verify GCN's NDIS Provider Finder listing is current and discoverable.** |
| 4 | hospital discharge home nursing Sydney post-hospital care | post-hospital intent | ❌ | supportnetwork.com.au, nightingalenursesathome.com.au, health.nsw.gov.au, livebetter.org.au, thecareside.com.au, homecareassistancesydneyeast.com.au, medibank.com.au, healthdirect.gov.au, helpathandsupport.com.au | Mix of providers + NSW Health government. Health.nsw.gov.au "Out of Hospital Care" page is heavily cited; healthdirect.gov.au discharge guide too. |
| 5 | complex care at home tracheostomy PEG feeding Sydney | clinical specificity | ❌ | helpathandsupport.com.au, mdhomecare.com.au, bestcareservices.com.au, intensivecareathome.com (×3), kuremara.com.au, homecaring.com.au | Strong opportunity: GCN's `/services/complex-care` page has the right clinical terms. Add `MedicalProcedure` schema for tracheostomy/PEG and a "Sydney" geographic anchor in copy. |
| 6 | palliative care at home Sydney in-home nursing | end-of-life | ❌ | careforfamily.com.au, daughterlycare.com.au, slhd.health.nsw.gov.au, health.nsw.gov.au, vitalhomehealth.com.au, vicna.com.au, palliativecarensw.org.au, svcs.org.au, homecareassistancesydneyeast.com.au | Sydney Local Health District + NSW Health dominate. PalliativeCareNSW is an underused industry citation; GCN being listed as a provider there is a fast win. |
| 7 | in-home care after hip replacement Sydney recovery | guide intent (post-op) | ❌ | orthoinfo.aaos.org, medlineplus.gov, sunnydaysinhomecare.com, billwalter.com.au, allinahealth.org, hopkinsmedicine.org | **No Sydney-specific in-home-care provider was cited at all.** Top results are US/global clinical content. Big opportunity: GCN's `/guides/in-home-care-after-hip-replacement` is exactly the right format — needs more Sydney-specific anchors and clinical detail to compete. |
| 8 | private nursing at home Sydney cost rates | private + price intent | ❌ | hammond.com.au, myagedcare.gov.au, daughterlycare.com.au, homewoodcare.com.au, sensiblecare.com.au, bupaagedcare.com.au, health.gov.au, haiseyhomecare.com.au, uniting.org, leahbettnursingservices.com.au | Pricing transparency is the entry ticket. Sydney rates cited: RN $100–$150/hr weekday, $170/hr night, $196.50/hr Sat, $262/hr Sun, EN $80–$140/hr, support workers $50–$70/hr, 24/7 live-in $600–$700/day. **GCN cannot compete on this query without publishing a from-rate or rate range.** Already deferred pending Gemma. |
| 9 | aged care at home Support at Home program Sydney provider | aged-care + program | ❌ | health.gov.au, myagedcare.gov.au, agedcareonline.com.au, careforfamily.com.au, agedcareguide.com.au, rightathome.com.au, youragedcare.org, holdsworth.org.au, focusconnect.org.au, respect.com.au | Government dominates (3 of top 10) + aggregator directories (agedcareonline, agedcareguide). **Confirm GCN's My Aged Care provider listing is current.** Important: Support at Home replaced HCP on 1 Nov 2025 — verify GCN's `/aged-care` page reflects the current program name. |
| 10 | registered NDIS provider vs non-registered NDIS provider | comparison | ❌ | ndiscommission.gov.au, shiftcare.com, ndsp.com.au, iinduct.com.au, mycarespace.com.au, raisingchildren.net.au, dreambigsupportservice.com.au, disabilitysupportguide.com.au | Comparison query is wide open — none of the top results are Sydney providers. **Building `/compare/registered-ndis-provider-vs-non-registered` is the highest-impact comparison page** per the AI SEO audit (§4.8). |

### Baseline summary

- **GCN citation rate: 0/10 queries (0%).** Expected for a small provider with no third-party presence yet — confirms the AI SEO audit's diagnosis.
- **Top patterns in competitor citations:**
  - Government domains (`ndis.gov.au`, `dva.gov.au`, `health.gov.au`, `myagedcare.gov.au`, `health.nsw.gov.au`) appear on 6 of 10 queries.
  - "Top N" listicle aggregator pages (`mdhomecare.com.au`, `agedcareonline.com.au`, `agedcareguide.com.au`) appear on 3 of 10.
  - Provider directories (`ndis.gov.au` Provider Finder, `dva.gov.au` Panel) appear on 3 of 10.
- **Most exploitable gaps right now (no extra clinical claim needed):**
  1. NDIS Provider Finder — verify GCN's listing surfaces for "in-home nursing Sydney" (query 3).
  2. DVA Panel of Community Nursing providers — confirm GCN is on the current ACT/NSW PDF (query 2).
  3. My Aged Care provider listing — verify (query 9).
  4. Get listed on existing "Top N" aggregator pages (query 1).
  5. Submit `/guides/in-home-care-after-hip-replacement` to PalliativeCareNSW / industry directories (query 7) — currently zero Sydney providers cited.
  6. **Build `/compare/registered-ndis-provider-vs-non-registered`** — query 10 has no Sydney provider in the top 10 at all.
- **Pricing is the single biggest blocker** for query 8 (private nursing Sydney cost). Without a published rate, GCN can't be cited. Already on the Gemma-deferred list.

### Next checkpoint

Re-run this log on **2026-06-07** (30 days). Compare:
- Has GCN appeared on any query?
- Has the top-10 changed in any query?
- Have the deferred items (clinician byline, AggregateRating, pricing) shipped? If yes, expect query 5 / 7 / 8 to move first.

Add a dedicated row for manual AI engine checks (ChatGPT-with-web, Perplexity, Google AI Overview) at the next checkpoint — a one-shot WebSearch baseline like this is a useful proxy but doesn't capture the actual AI summary text.

---

## Deploy event — 2026-05-08

Three branches merged and deployed today. Any movement in the next checkpoint should be attributable to this deploy.

| PR | Branch | Tip |
|---|---|---|
| #11 | `chore/seo-pass-3-fixes` | `f5b4783` — Gemma's voice refresh, em-dash sweep, meta tightening |
| #12 | `chore/aeo-evidence-panel-and-person-schema` | `a5646e1` — `EvidencePanel` on /, /ndis, /dva, /aged-care, /services/nursing-care; Person schema on /about |
| #13 | `chore/cwv-mobile-pass` | `8aa7e4b` — AVIF/WebP, mobile motion gating, hero parallax off below md |

Live-site verification snapshot: [`docs/evidence/2026-05-08/BASELINE.md`](evidence/2026-05-08/BASELINE.md). Static HTML snapshots saved alongside for `diff`-based regression checking at the next checkpoint.

**External-listing audit completed 2026-05-08:**

- ✅ **DVA Panel of Community Nursing Providers** — Gentle Care Nursing Services Pty Ltd verified on the current April 2026 ACT/NSW PDF, listed in 63 LGA/suburb sections including every Sydney region we target. Phone (1300 004 267) and legal name match site + GBP. Source: https://www.dva.gov.au/sites/default/files/2026-04/cnactnsw.pdf — re-verify each quarter.
- ⏳ **NDIS Provider Finder** — Gemma to verify listing surfaces correctly, registration groups match website claims. See [`docs/external-listings-checklist.md`](external-listings-checklist.md).
- ⏳ **My Aged Care directory** — Gemma to verify listing exists and Support at Home / CHSP categories are current. See [`docs/external-listings-checklist.md`](external-listings-checklist.md).

**Predicted movement by 2026-06-07** (informed guesses, to be measured against actuals):

| Query | Pre-deploy reason for 0 citation | Post-deploy expected change |
|---|---|---|
| 2 — DVA community nursing | DVA panel PDF + competitor pages dominate | **Likely** (upgraded 2026-05-08 after audit): GCN is verified on the April 2026 DVA panel PDF in 63 NSW LGA sections. Combined with `/dva` evidence panel citing the DVA programme name exactly, AI engines that pull from dva.gov.au should begin attributing citations correctly. |
| 3 — registered NDIS provider in-home nursing | NDIS Provider Finder + competitor pages dominate | Possible: `/ndis` evidence panel is one of the few that names NDIA-managed/Plan-managed/Self-managed explicitly with a registered-provider claim. |
| 5 — complex care tracheostomy/PEG Sydney | Competitors have stronger clinical-procedure copy | Unlikely to move — needs `MedicalProcedure` schema (deferred). |
| 7 — in-home care after hip replacement | Top results are US/global clinical content | Possible: `/guides/in-home-care-after-hip-replacement` already exists; deploy didn't change it. Should still be the strongest Sydney-anchored option. |
| 9 — aged care at home Support at Home | My Aged Care + government pages dominate | Possible: `/aged-care` evidence panel now names "Support at Home" + CHSP + DVA explicitly — the citable factual format AI engines extract. |

The other queries (1, 4, 6, 8, 10) were not directly addressed by today's deploy and shouldn't move much without the next-wave work (region pages, comparison page, pricing page).

---

## Sources (baseline run)

Per query, the URLs used to populate the table above. Kept here so future runs can compare authoritative-source movements over time.

### Query 1 — best in-home nursing Sydney NDIS provider
- [10 Best In-Home Nursing Care Providers in Sydney](https://mdhomecare.com.au/services/nursing-care-services/sydney)
- [Top 20 NDIS Providers Sydney](https://mdhomecare.com.au/blog/top-ndis-providers-in-sydney)
- [Top 12 NDIS In-Home Disability Care Providers in Australia](https://holisticfutures.com.au/in-home-disability-care-australia/)
- [7 Tips for Choosing the Best Home Care Providers in Sydney](https://vitalhomehealth.com.au/considerations-when-looking-for-the-best-home-health-care-in-sydney/)
- [Your Care at Home](https://www.yourcareathome.org.au/)
- [10 NDIS Community Nursing Providers in Sydney | Referral Guide](https://mdhomecare.com.au/for-coordinators/community-nursing/sydney)

### Query 2 — DVA community nursing Sydney provider
- [Community nursing services and providers | DVA](https://www.dva.gov.au/providers/community-nursing-services-and-providers)
- [Panel of Community Nursing providers | DVA](https://www.dva.gov.au/providers/community-nursing-services-and-providers/panel-of-community-nursing-providers)
- [DVA Community Nursing Providers - ACT and NSW (PDF)](https://www.dva.gov.au/sites/default/files/2022-08/cnactnsw.pdf)
- [Vital Home Health Services — DVA](https://vitalhomehealth.com.au/services/dva/)
- [Carexcell — DVA Community Nursing](https://www.carexcell.com.au/service/dva-community-nursing/)

### Query 3 — registered NDIS provider in-home nursing Sydney
- [NDIS Provider Finder](https://www.ndis.gov.au/participants/working-providers/find-registered-provider/provider-finder)
- [NDIS Commission — Find a registered provider](https://www.ndiscommission.gov.au/provider-registration/find-registered-provider)
- [Your Care at Home](https://www.yourcareathome.org.au/)
- [Care N Help](https://www.carenhelp.com.au/)

### Query 4 — hospital discharge home nursing Sydney
- [NSW Health — Out of Hospital Care Program](https://www.health.nsw.gov.au/ohc/Pages/default.aspx)
- [healthdirect — Going home from hospital](https://www.healthdirect.gov.au/going-home-from-hospital)
- [Nightingale Nurses at Home — Post-Hospital Care](https://www.nightingalenursesathome.com.au/home-care-services/post-hospitalisation-care/what-to-expect-in-post-hospital-care-at-home/)

### Query 5 — complex care at home tracheostomy PEG feeding Sydney
- [Help at Hand Support — Complex Care Sydney](https://helpathandsupport.com.au/complex-care-sydney/)
- [MD Home Care — Complex Care Sydney](https://mdhomecare.com.au/services/complex-care/sydney)
- [Best Care Services — NDIS Enteral Feeding & PEG Tube Support](https://bestcareservices.com.au/ndis-high-intensity-support/enteral-feeding-tube-management-support/)

### Query 6 — palliative care at home Sydney in-home nursing
- [Sydney Local Health District — Palliative Care](https://slhd.health.nsw.gov.au/sydney-virtual/services/palliative-care)
- [NSW Health — Palliative care home support services](https://www.health.nsw.gov.au/palliativecare/Pages/last-days-of-life-home-support-services.aspx)
- [Palliative Care NSW](https://palliativecarensw.org.au/)
- [Care For Family — In-Home Palliative Care Sydney](https://www.careforfamily.com.au/services/in-home-palliative-care-sydney/)

### Query 7 — in-home care after hip replacement Sydney
- [OrthoInfo — Activities After Total Hip Replacement](https://orthoinfo.aaos.org/en/recovery/activities-after-hip-replacement/)
- [MedlinePlus — Getting your home ready for knee or hip surgery](https://medlineplus.gov/ency/patientinstructions/000167.htm)
- [Bill Walter — After Hip Replacement Surgery (North Sydney)](https://billwalter.com.au/your-surgery/after-your-hip-surgery/after-hip-replacement-surgery/)

### Query 8 — private nursing at home Sydney cost
- [HammondCare — Home Care Costs](https://www.hammond.com.au/care/home-care-costs)
- [Daughterly Care — What does private in Home Care cost](https://daughterlycare.com.au/what-does-private-in-home-care-cost)
- [Sensible Care — How much does home nursing care cost](https://www.sensiblecare.com.au/blog/home-nursing-care-cost)
- [Uniting — Private home care price guide (W. Sydney NSW/ACT)](https://www.uniting.org/content/dam/uniting/documents/aged-care/home-care-costs/private-home-care-pricing-guide-13-mar20-wsydney-nsw-act.pdf)

### Query 9 — aged care at home Support at Home Sydney provider
- [Australian Government — Support at Home program](https://www.health.gov.au/our-work/support-at-home?language=en)
- [My Aged Care — Support at Home program](https://www.myagedcare.gov.au/aged-care-programs/support-at-home-program)
- [Aged Care Online — Support at Home Sydney](https://agedcareonline.com.au/support-at-home/new-south-wales/sydney)
- [Aged Care Guide — In Home Care Assistance Sydney](https://www.agedcareguide.com.au/home-care/sydney-nsw)

### Query 10 — registered NDIS provider vs non-registered
- [NDIS Commission — About registration](https://www.ndiscommission.gov.au/provider-registration/about-registration)
- [ShiftCare — Registered vs Unregistered NDIS Providers](https://shiftcare.com/blog/registered-vs-unregistered-ndis-providers)
- [NDSP Plan Managers — Registered vs Unregistered NDIS Providers](https://ndsp.com.au/blog/ndis-news/registered-vs-unregistered-ndis-providers-a-participants-guide/)
- [MyCareSpace — Registered vs Unregistered NDIS Providers](https://mycarespace.com.au/resources/registered-ndis-providers-vs-unregistered-providers)
