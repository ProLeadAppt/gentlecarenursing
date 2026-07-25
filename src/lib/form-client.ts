import type { FormPayload } from "@/lib/submission";

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

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

  const result = (await response.json()) as {
    success?: unknown;
    submissionId?: unknown;
  };

  if (
    result.success !== true ||
    typeof result.submissionId !== "string" ||
    !UUID_PATTERN.test(result.submissionId)
  ) {
    throw new Error("Submission confirmation was invalid");
  }

  return { submissionId: result.submissionId };
}
