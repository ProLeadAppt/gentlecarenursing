// Exact reviewed copy changes. Historical presentation fixtures stay frozen;
// only these paragraphs are restored for their preservation comparisons.
export const localContextChanges = [
  {
    "slug": "strathfield",
    "before": "Strathfield is the suburb our office sits in (Level 1/5 George Street, North Strathfield). The area has a strong multicultural community \u2014 particularly Korean, Chinese, and Indian \u2014 and a mix of established residential, units, and family homes around the Strathfield Council LGA.",
    "after": "Gentle Care Nursing Services' office is at Level 1/5 George Street in North Strathfield, not in Strathfield. If you are arranging care in Strathfield, share the suburb where care is needed, the type of support requested and your preferred timing so the team can discuss whether it can assist."
  },
  {
    "slug": "concord",
    "before": "Concord sits on the Parramatta River, with Concord Hospital \u2014 a tertiary teaching hospital with strong geriatric, palliative, and respiratory services \u2014 at its centre.",
    "after": "If you are arranging in-home care in Concord after a hospital stay, ask the treating team what follow-up care and referral information may be needed. Concord Hospital is on Hospital Road. Mentioning the hospital here provides local context and does not imply a partnership or referral arrangement with Gentle Care Nursing Services."
  },
  {
    "slug": "burwood",
    "before": "Burwood is a transport-hub suburb with a major rail interchange and dense mixed housing. Many older residents access Concord Hospital for clinical care and prefer in-home nursing to maintain independence in familiar surroundings.",
    "after": "When enquiring about in-home care in Burwood, include the suburb where care is needed and the type of support requested. For a unit or apartment, practical access details such as stairs or lift access may help the team plan a discussion. The team will need to confirm whether the requested care and timing can be accommodated."
  },
  {
    "slug": "parramatta",
    "before": "Parramatta is Sydney's second CBD, with one of the most multicultural older populations in Australia. Westmead Hospital is the major tertiary teaching hospital for Western Sydney.",
    "after": "If you are arranging care at home in Parramatta after a stay at Westmead Hospital, ask the treating team about any follow-up care and referral information required. Westmead Hospital is in Westmead, on Hawkesbury Road. A hospital reference does not imply a partnership or priority referral arrangement with Gentle Care Nursing Services."
  }
] as const;
export function restorePriorLocalContext(value: string): string {
  for (const {before,after} of localContextChanges) value = value.replace(after,before);
  return value;
}
export function restorePriorLocalContextHtml(value: string): string {
  const escape = (text: string) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
  for (const {before,after} of localContextChanges) value = value.replace(escape(after),escape(before));
  return value;
}
