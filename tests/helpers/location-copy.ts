import { localContextChanges } from "./local-context-review";

/** Decode the entities React prints, without bringing back retired wording. */
export function decodeEntities(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

/** Baseline HTML still has the pre-review local context. Expect the reviewed wording. */
export function expectReviewedLocalContext(value: string): string {
  let next = value;
  for (const change of localContextChanges) next = next.replaceAll(change.before, change.after);
  return next;
}

/**
 * Grammar and label fixes the preview asked for. The published sentences stay;
 * these are the strings the frozen pages still have.
 */
export function applyReviewedWording(value: string): string {
  return value
    .replaceAll("ndis services", "NDIS services")
    .replaceAll("dva community nursing", "DVA Community Nursing")
    .replaceAll("make a Inner West", "make an Inner West")
    .replaceAll("Sydney. experienced,", "Sydney. Experienced,");
}

export function applyReviewedWordingDeep<T>(value: T): T {
  return JSON.parse(applyReviewedWording(JSON.stringify(value))) as T;
}

const RETIRED_REFERENCE_LABELS = new Set([
  "Gentle Care Nursing Services service-area information",
  "Gentle Care Nursing Services intake information",
  "Gentle Care Nursing Services referrer information",
]);

export function visibleText(html: string): string {
  return decodeEntities(html)
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Sentences from the frozen page, after the reviewed local-context correction. */
export function expectedSentences(html: string): string[] {
  const withoutScripts = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, " ");
  const nodes = [...withoutScripts.matchAll(/>([^<]+)</g)].map((match) =>
    applyReviewedWording(expectReviewedLocalContext(decodeEntities(match[1]).replace(/\s+/g, " ").trim())),
  );
  return nodes.flatMap((node) =>
    node
      .split(/(?<=[.!?])\s+/)
      .map((sentence) => sentence.trim())
      .filter((sentence) => sentence.length >= 24 && !RETIRED_REFERENCE_LABELS.has(sentence) && !sentence.startsWith("{") && !sentence.startsWith("[") && !sentence.includes("→") && !/^(?:Check Availability in|Speak to a Clinical Lead|Start Care Journey|Contact Clinical Lead|Free Initial Consultation|Request Care in )/.test(sentence)),
  );
}

/** Paragraphs a reader sees before opening a disclosure or question. */
export function openParagraphs(html: string): string[] {
  const withoutDetails = html.replace(/<details\b[^>]*>[\s\S]*?<\/details>/g, " ");
  return [...withoutDetails.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)]
    .map((match) => decodeEntities(match[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()))
    .filter(Boolean);
}
