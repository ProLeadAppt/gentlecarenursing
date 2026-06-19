/**
 * Integration config — GoHighLevel, analytics, external services.
 * All values are sourced from environment variables.
 */

export const INTEGRATIONS = {
  ghl: {
    webhookUrl: process.env.GHL_WEBHOOK_URL ?? "",
    formId: process.env.NEXT_PUBLIC_GHL_FORM_ID ?? "",
    chatEmbedId: process.env.NEXT_PUBLIC_GHL_EMBED_CHAT_ID ?? "",
    voiceEmbedId: process.env.NEXT_PUBLIC_GHL_EMBED_VOICE_ID ?? "",
  },
  analytics: {
    gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
    gscVerification:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ??
      process.env.NEXT_PUBLIC_GSC_VERIFICATION ??
      "",
  },
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://gentlecarenursing.com.au",
} as const;
