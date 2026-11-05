export type ReferrerType =
  | "ndis-support-coordinator"
  | "plan-manager"
  | "hospital-discharge-planner"
  | "gp-primary-care";

export interface ReferrerBlock {
  id: string;
  referrerType: ReferrerType;
  title: string;
  label: string;
  blurb: string;
  bullets: string[];
  anchorId: string;
}

export const REFERRER_BLOCKS: readonly ReferrerBlock[] = [
  {
    id: "ndis-support-coordinator-main",
    referrerType: "ndis-support-coordinator",
    title: "For NDIS Support Coordinators",
    label: "NDIS support coordinators",
    blurb:
      "We know your reputation depends on the providers you recommend. Our smaller client load and clear communication mean you can refer with confidence.",
    bullets: [
      "Referral review and realistic start dates",
      "Clear documentation and updates at agreed points",
      "Experience with participants who have complex clinical needs",
    ],
    anchorId: "ndis-support-coordinators",
  },
  {
    id: "plan-manager-main",
    referrerType: "plan-manager",
    title: "For NDIS Plan Managers",
    label: "NDIS plan managers",
    blurb:
      "We make billing predictable and transparent so you can focus on outcomes, not chasing paperwork.",
    bullets: [
      "Invoices aligned with plan budgets and line items",
      "Responses to queries about services delivered",
      "Registered provider with clear service descriptions",
    ],
    anchorId: "plan-managers",
  },
  {
    id: "hospital-discharge-planner-main",
    referrerType: "hospital-discharge-planner",
    title: "For Hospital Discharge Planners",
    label: "Hospital discharge planners",
    blurb:
      "Safe hospital-to-home transitions matter. We act on referrals so patients can leave hospital sooner, with clear plans for care at home.",
    bullets: [
      "Triage of new referrals and clear communication back to your team",
      "Experience with post-surgical, complex medical, and step-down care",
      "Coordination with GPs and community teams once the patient is home",
    ],
    anchorId: "hospital-discharge-planners",
  },
  {
    id: "gp-primary-care-main",
    referrerType: "gp-primary-care",
    title: "For GPs and Primary Care",
    label: "GPs and primary care teams",
    blurb:
      "We extend the reach of your practice into the home, closing the loop with clear feedback about what we see and do.",
    bullets: [
      "Nursing support for wound care, chronic disease, and post-hospital care",
      "Updates when there are changes in function, safety, or symptoms",
      "Respect for your ongoing relationship with the patient and family",
    ],
    anchorId: "gps-and-primary-care",
  },
] as const;

