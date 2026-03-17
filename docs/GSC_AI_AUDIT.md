# GSC + AI 5-Minute Audit (Caleb Ulku style)

Use this process to spot quick wins for titles, CTR, and content opportunities.

## Steps

1. **Export from Google Search Console**
   - Performance → Search results: export "Queries" or "Pages" (or both) as CSV.
   - Include columns: Query, Page, Clicks, Impressions, CTR, Position.

2. **Run with AI (Claude or ChatGPT)**
   - Upload or paste the CSV (or a sample of rows).
   - Use a prompt like:
     - "Analyze this GSC data. For each row with position 4–15 and CTR below 5%, suggest a better title tag and one content tweak to improve CTR. Focus on user intent and featured-snippet style answers."
   - Or use Caleb Ulku's free prompt from his site: [GSC 5-Minute CTR Analysis Prompt](https://calebulku.com/wp-content/uploads/2025/05/GSC-5-Minute-Analysis-Prompt-1.txt).

3. **Cluster queries into intent buckets**
   - Ask AI to group rows into high-level intents and map them to a \"primary\" page, for example:
     - \"post-hospital\" → `/services/post-hospital-care`
     - \"complex care\" → `/services/complex-care`
     - \"hospital at home\" / \"step-down\" → `/services/hospital-at-home`
     - \"palliative\" / \"end of life\" → `/services/palliative-care`
     - \"NDIS\" → `/ndis`
     - \"DVA\" → `/dva`
     - location-specific queries → `/areas/*` or `/`

4. **Apply changes**
   - For each important URL/intent bucket:
     - Update `title` and `description` in the page's `createMetadata()` or `metadata` (see `src/lib/metadata.ts` and each `src/app/**/page.tsx`).
     - Optionally add or refine a `snippetAnswer` or first-paragraph answer on the page for featured snippets and answer engines.

5. **Maintain a simple testing backlog**
   - For each high-impression / low-CTR URL, keep 2–3 alternative title/description options in a small backlog (even just a bullet list under that URL in your notes).
   - When you deploy a new version, note the date and what changed so you can compare CTR in the next audit.

6. **Repeat**
   - Run monthly or after big content launches to keep titles, snippets, and content aligned with what people actually search for.

## Key URLs to audit

- `/` (home)
- `/ndis`, `/dva`, `/aged-care`, `/private-nursing`
- `/services`, `/referral`, `/referrers`, `/contact`, `/faq`, `/about`
- `/areas`, `/areas/inner-west`, `/areas/north-shore`, etc.
- `/services/post-hospital-care`, `/services/complex-care`

## Focus queries (examples)

- "NDIS nursing Sydney", "in-home care Sydney", "DVA community nursing"
- "aged care at home", "private nursing Sydney"
- "NDIS provider [suburb]" / "in-home nursing [region]"
 - "refer to Gentle Care Nursing", "NDIS provider for coordinators Sydney"
 - "post hospital nursing Sydney", "post-hospital care at home", "complex care at home NDIS"
