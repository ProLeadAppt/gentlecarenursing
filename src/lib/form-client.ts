import type { FormPayload } from "@/lib/submission";

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isSubmissionConfirmation(value: unknown): value is { success: true; submissionId: string } {
  if (!value || typeof value !== "object") return false;
  const result = value as Record<string, unknown>;
  return result.success === true && typeof result.submissionId === "string" && UUID_PATTERN.test(result.submissionId);
}

export async function submitWebsiteForm(
  payload: FormPayload,
  fetcher: typeof fetch = fetch
): Promise<{ submissionId: string }> {
  const response = await fetcher("/api/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error("Submission failed");

  const result: unknown = await response.json();
  if (!isSubmissionConfirmation(result)) {
    throw new Error("Submission confirmation was invalid");
  }

  return { submissionId: result.submissionId };
}
