import type { FormPayload } from "@/lib/submission";

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/** Only a verified pre-send response can establish that nothing was sent. */
export class WebsiteSubmissionError extends Error {
  constructor(message: string, readonly outcome: "rejected" | "unknown") {
    super(message);
    this.name = "WebsiteSubmissionError";
  }
}

export async function submitWebsiteForm(
  payload: FormPayload,
  fetcher: typeof fetch = fetch
): Promise<{ submissionId: string }> {
  const controller = new AbortController();
  let timeout: ReturnType<typeof setTimeout> | undefined;

  try {
    return await Promise.race([
      requestSubmissionConfirmation(payload, fetcher, controller.signal),
      new Promise<never>((_resolve, reject) => {
        timeout = setTimeout(() => {
          // A timeout cannot establish whether delivery was accepted. Let the
          // form keep its details and existing contact-before-retry guidance.
          reject(new Error("Submission confirmation timed out"));
          controller.abort();
        }, 30_000);
      }),
    ]);
  } finally {
    if (timeout !== undefined) clearTimeout(timeout);
  }
}

async function requestSubmissionConfirmation(
  payload: FormPayload,
  fetcher: typeof fetch,
  signal: AbortSignal
): Promise<{ submissionId: string }> {
  const response = await fetcher("/api/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal,
  });

  if (!response.ok) {
    // Match the existing feedback client: these route statuses occur before
    // provider delivery. A proxy, malformed body or provider failure is unknown.
    if ([400, 403, 408, 413, 415, 503].includes(response.status)) {
      const result: unknown = await response.json();
      if (result !== null && typeof result === "object" && !Array.isArray(result)) {
        const rejection = result as { success?: unknown; error?: unknown };
        if (rejection.success === false && typeof rejection.error === "string" && rejection.error.trim()) {
          throw new WebsiteSubmissionError("Submission failed before delivery", "rejected");
        }
      }
    }
    throw new WebsiteSubmissionError("Submission failed", "unknown");
  }

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
