/** DISPOSABLE QA HARNESS ONLY. Never merge or publish to production. */
export type QaCase = "success" | "rejected" | "uncertain";
let selectedCase: QaCase = "success";
export function setQaCase(value: QaCase) { selectedCase = value; }
export function getQaCase(): QaCase { return selectedCase; }

// No request, payload retention, storage, logging, analytics or real delivery.
export const qaTransport: typeof fetch = async () => {
  const scenario = selectedCase;
  await new Promise((resolve) => setTimeout(resolve, 1200));
  if (scenario === "rejected") {
    return Response.json({ success: false }, { status: 502 });
  }
  if (scenario === "uncertain") {
    throw new TypeError("QA simulated lost response; nothing was transmitted");
  }
  return Response.json({
    success: true,
    submissionId: "00000000-0000-4000-8000-000000000001",
  });
};

// Non-referral feedback is blocked in memory too, rather than sent to the host.
export const qaDisabledTransport: typeof fetch = async () =>
  Response.json({ success: false, error: "QA preview: delivery disabled" }, { status: 503 });
