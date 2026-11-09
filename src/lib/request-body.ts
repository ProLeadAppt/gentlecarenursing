// Total time allowed to receive at most 64 KiB in the form routes. This body
// budget is independent of provider and network timing.
const BODY_READ_TIMEOUT_MS = 10_000;

/** Read only the request body; never parse, validate or send its contents. */
export async function readBoundedRequestBody(
  body: ReadableStream<Uint8Array> | null,
  maxBytes: number
): Promise<{ kind: "complete"; bytes: Uint8Array } | { kind: "too-large" } | { kind: "timed-out" }> {
  const reader = body?.getReader();
  if (!reader) throw new Error("Missing request body");
  const chunks: Uint8Array[] = [];
  const expired = Symbol("body read deadline");
  let size = 0;
  let timedOut = false;
  let shouldCancel = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const deadline = new Promise<typeof expired>(resolve => {
    timer = setTimeout(() => {
      timedOut = true;
      resolve(expired);
    }, BODY_READ_TIMEOUT_MS);
  });

  try {
    while (true) {
      const next = await Promise.race([reader.read(), deadline]);
      // A queued read may resolve in the same turn as expiry. Do not let that
      // race turn cancellation/EOF into a completed body or a provider send.
      if (timedOut || next === expired) {
        shouldCancel = true;
        return { kind: "timed-out" };
      }
      if (next.done) break;
      size += next.value.byteLength;
      if (size > maxBytes) {
        shouldCancel = true;
        return { kind: "too-large" };
      }
      chunks.push(next.value);
    }
    return { kind: "complete", bytes: Buffer.concat(chunks) };
  } finally {
    if (timer !== undefined) clearTimeout(timer);
    if (shouldCancel) {
      // Cancellation is best-effort. Its promise can stay pending or reject
      // without holding the response/lock or exposing submitted content.
      try { void reader.cancel().catch(() => {}); } catch { /* Preserve rejection. */ }
    }
    // Promise.race observes the outstanding read even if release rejects it.
    reader.releaseLock();
  }
}
