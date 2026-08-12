import test from "node:test";
import assert from "node:assert/strict";

test("analytics uses the registered Gentle Care GA4 measurement ID by default", async () => {
  const previousGaId = process.env.NEXT_PUBLIC_GA_ID;
  delete process.env.NEXT_PUBLIC_GA_ID;

  try {
    const { INTEGRATIONS } = await import(
      `../src/config/integrations.ts?default-ga-id=${Date.now()}`
    );

    assert.equal(INTEGRATIONS.analytics.gaId, "G-SZ2588QL1J");
  } finally {
    if (previousGaId === undefined) {
      delete process.env.NEXT_PUBLIC_GA_ID;
    } else {
      process.env.NEXT_PUBLIC_GA_ID = previousGaId;
    }
  }
});
