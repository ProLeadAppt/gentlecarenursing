// Preserve the original immutable content captures while validating the updated
// external reference separately. Do not normalize other content or links.
export function restorePriorDvaReference(path: string, value: string | Buffer): string | Buffer {
  if (!["src/content/services.ts", "public/ai-index.json", "public/llms-full.txt"].includes(path)) return value;
  return value.toString().replace(
    "https://www.dva.gov.au/what-we-help-with/care-at-home-and-aged-care-services/living-independently/dva-in-home-programs/community-nursing",
    "https://www.dva.gov.au/get-support/health-support/help-cover-healthcare-costs/manage-your-health-care/community-nursing",
  );
}
