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
    expectReviewedLocalContext(decodeEntities(match[1]).replace(/\s+/g, " ").trim()),
  );
  return nodes.flatMap((node) =>
    node
      .split(/(?<=[.!?])\s+/)
      .map((sentence) => sentence.trim())
      .filter((sentence) => sentence.length >= 24 && !sentence.startsWith("{") && !sentence.startsWith("[") && !sentence.includes("→") && !/^(?:Check Availability in|Speak to a Clinical Lead|Start Care Journey|Contact Clinical Lead|Free Initial Consultation|Request Care in )/.test(sentence)),
  );
}
