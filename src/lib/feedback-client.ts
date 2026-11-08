import { SITE } from "@/lib/constants";

export interface PrivateFeedbackPayload {
  rating: 1 | 2 | 3 | 4 | 5;
  name: string;
  contact: string;
  service: string;
  improvements: string;
  allowFollowup: boolean;
}

export const FEEDBACK_UNCONFIRMED_MESSAGE =
  "We couldn't confirm whether your feedback was accepted for delivery. It may already have reached our team. Please contact us at " +
  SITE.email + " before sending it again to avoid a duplicate.";

export class FeedbackSubmissionError extends Error {
  constructor(message: string, readonly outcome: "rejected" | "unknown") {
    super(message);
    this.name = "FeedbackSubmissionError";
  }
}

export async function submitPrivateFeedback(
  payload: PrivateFeedbackPayload,
  fetcher: typeof fetch = fetch
): Promise<void> {
  const controller = new AbortController();
  let timeout: ReturnType<typeof setTimeout> | undefined;
  try {
    await Promise.race([
      requestFeedbackConfirmation(payload, fetcher, controller.signal),
      new Promise<never>((_resolve, reject) => {
        timeout = setTimeout(() => {
          // Aborting the browser's wait cannot undo server/provider acceptance.
          reject(new FeedbackSubmissionError(FEEDBACK_UNCONFIRMED_MESSAGE, "unknown"));
          controller.abort();
        }, 30_000);
      }),
    ]);
  } catch (error) {
    if (error instanceof FeedbackSubmissionError) throw error;
    throw new FeedbackSubmissionError(FEEDBACK_UNCONFIRMED_MESSAGE, "unknown");
  } finally {
    if (timeout !== undefined) clearTimeout(timeout);
  }
}

async function requestFeedbackConfirmation(
  payload: PrivateFeedbackPayload,
  fetcher: typeof fetch,
  signal: AbortSignal
): Promise<void> {
  const response = await fetcher("/api/feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal,
  });
  const result: unknown = await response.json();
  if (result !== null && typeof result === "object" && !Array.isArray(result)) {
    const confirmation = result as { success?: unknown; error?: unknown };
    if (response.ok && confirmation.success === true) return;

    // These statuses are returned by this route before any provider send.
    // Provider errors (500/502) or an invalid response remain ambiguous.
    if ([400, 403, 413, 415, 503].includes(response.status) &&
      confirmation.success === false && typeof confirmation.error === "string" &&
      confirmation.error.trim()) {
      throw new FeedbackSubmissionError(confirmation.error, "rejected");
    }
  }
  throw new FeedbackSubmissionError(FEEDBACK_UNCONFIRMED_MESSAGE, "unknown");
}
