/**
 * FAQ items. Full list for the FAQ page and service page snippets.
 *
 * Answer style (AEO/AI-citable): each answer is written as a self-contained
 * 40–60 word passage. It restates enough of the question to stand alone,
 * names "Gentle Care Nursing Services" explicitly, and includes at least one
 * verifiable specific (regulator, suburb region, funding category, registered
 * status). Voice rules in `.agents/product-marketing-context.md` are binding:
 * no "boutique", no "guarantee", DVA wording exact, response phrased as
 * "we aim to respond within 24 hours".
 */

export interface FaqCategory {
  title: string;
  items: { id: string; question: string; answer: string }[];
}

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    title: "General",
    items: [
      {
        id: "registered-provider",
        question: "Are you a registered NDIS and DVA provider?",
        answer:
          "Yes. Gentle Care Nursing Services is a fully registered NDIS provider and a DVA Contracted Community Nursing Provider, supporting eligible Veteran Card holders with clinically required nursing and personal care at home in Sydney. We meet the quality and safety standards set by the NDIS Quality and Safeguards Commission and the Department of Veterans’ Affairs.",
      },
      {
        id: "what-services",
        question: "What services does Gentle Care Nursing Services provide?",
        answer:
          "Gentle Care Nursing Services provides in-home nursing and personal care across Sydney, including community nursing, post-hospital care, complex care, palliative care, wound care, medication management, personal care, and overnight support. Care is funded through NDIS, DVA Community Nursing, aged care (Support at Home and CHSP), and private payment, and is delivered by AHPRA-registered nurses and experienced care professionals.",
      },
      {
        id: "service-areas",
        question: "What areas in Sydney do you service?",
        answer:
          "Gentle Care Nursing Services delivers in-home nursing and care across Sydney and surrounds, including the Inner West, North Shore, Western Sydney, Northern Beaches, South Sydney, and Sydney CBD and East. If your suburb is near these regions, contact us to confirm coverage; we can usually arrange care across Greater Sydney depending on referral type and staff availability.",
      },
      {
        id: "who-provides",
        question: "Who actually delivers the care?",
        answer:
          "Care from Gentle Care Nursing Services is delivered by AHPRA-registered nurses and experienced care professionals, supervised by our clinical lead. Clinical tasks such as wound care, medication administration, and complex care are performed by registered nurses. Clients are matched with consistent carers based on care needs, preferences, and clinical complexity, so the same small team supports each person.",
      },
    ],
  },
  {
    title: "Getting Started",
    items: [
      {
        id: "how-start",
        question: "How do I get started with Gentle Care Nursing Services?",
        answer:
          "To start with Gentle Care Nursing Services, submit an enquiry through our Request Care form, or contact us by phone or email. You will receive an immediate confirmation that your enquiry has been received, and we aim to respond within 24 hours during business hours with clear next steps. Urgent referrals from hospitals and coordinators are prioritised.",
      },
      {
        id: "response-time",
        question: "How quickly do you respond to enquiries?",
        answer:
          "Gentle Care Nursing Services aims to respond to every enquiry within 24 hours during business hours. After you submit an enquiry, our team is notified straight away and a real person follows up. Urgent referrals — for example, from hospital discharge planners or NDIS support coordinators with same-day needs — are prioritised so families and clients are not left waiting.",
      },
      {
        id: "assessment",
        question: "Is there an assessment before care starts?",
        answer:
          "Yes. Before care begins, Gentle Care Nursing Services completes an initial assessment to understand the person’s clinical needs, daily routines, home environment, and goals. The assessment informs a tailored care plan, identifies the right registered nurse or carer for the match, and confirms how the care will be funded through NDIS, DVA, aged care, or private payment.",
      },
      {
        id: "immediate-help",
        question: "Can I get help right away?",
        answer:
          "If you need help quickly, call Gentle Care Nursing Services during business hours and our team can talk through urgent options. For non-urgent enquiries, the Request Care form sends an immediate acknowledgement, and we aim to respond within 24 hours. Urgent post-hospital and community nursing referrals are prioritised, with start dates depending on care needs and staff availability.",
      },
    ],
  },
  {
    title: "Funding & Costs",
    items: [
      {
        id: "funding-types",
        question: "What funding types do you accept?",
        answer:
          "Gentle Care Nursing Services accepts NDIS funding for participants, DVA Community Nursing for eligible Veteran Card holders, aged care funding through Support at Home and the Commonwealth Home Support Programme (CHSP), and private fee-for-service payment. Our team can help families and coordinators work out which funding option applies to a particular situation before care starts.",
      },
      {
        id: "private-cost",
        question: "How much does private nursing care cost?",
        answer:
          "The cost of private in-home nursing through Gentle Care Nursing Services depends on the type of care (registered nurse vs. personal care), shift length, time of day, and travel. We are upfront about pricing and provide a written quote before care starts, with no hidden fees. Contact us for a personalised quote based on your specific care needs.",
      },
      {
        id: "dva-cost",
        question: "Is DVA Community Nursing free for eligible veterans?",
        answer:
          "For eligible Veteran Card holders, DVA Community Nursing through Gentle Care Nursing Services is provided at no out-of-pocket cost when the care is clinically required and approved under the DVA Community Nursing programme. Gentle Care is a DVA Contracted Community Nursing Provider, so we handle all claims and clinical reporting directly with the Department of Veterans’ Affairs.",
      },
    ],
  },
  {
    title: "Referrals",
    items: [
      {
        id: "how-refer",
        question: "How do I make a referral to Gentle Care Nursing Services?",
        answer:
          "To refer a client to Gentle Care Nursing Services, submit our Request Care form with the client’s details, care needs, and funding type, or contact us directly by phone or email. Support coordinators, hospital discharge planners, GPs, and allied health professionals can also send referrals. We aim to acknowledge referrals within 24 hours during business hours, with urgent referrals prioritised.",
      },
      {
        id: "who-can-refer",
        question: "Who can make a referral?",
        answer:
          "Anyone can make a referral to Gentle Care Nursing Services. This includes families and carers, NDIS support coordinators and plan managers, hospital discharge planners and case managers, GPs and specialists, allied health professionals, and DVA contacts. Self-referrals from participants, veterans, and older Australians seeking in-home nursing or personal care are also welcome.",
      },
      {
        id: "referral-info",
        question: "What information do I need to make a referral?",
        answer:
          "When referring a client to Gentle Care Nursing Services, ideally include the client’s name and contact details, funding type (NDIS, DVA, aged care, or private), a short description of clinical and personal care needs, the suburb, and any relevant medical information. We can work with partial information and follow up to confirm the rest before care begins.",
      },
    ],
  },
  {
    title: "About Our Care",
    items: [
      {
        id: "ndis-registered",
        question: "Is Gentle Care Nursing Services a registered NDIS provider?",
        answer:
          "Yes. Gentle Care Nursing Services is a fully registered NDIS provider supporting participants across Sydney with in-home nursing, personal care, complex care, and community participation. We meet all quality and safety standards required by the NDIS Quality and Safeguards Commission, so support coordinators and plan managers can refer with confidence and bill against the relevant Core Supports and Capacity Building line items.",
      },
      {
        id: "dva-contracted",
        question: "Are you a DVA Contracted Community Nursing Provider?",
        answer:
          "Yes. Gentle Care Nursing Services is contracted to provide DVA Community Nursing services for eligible Veteran Card holders. We deliver clinically required nursing and personal care at home — including wound care, medication management, chronic disease monitoring, and post-hospital support — and submit claims and clinical reporting directly to the Department of Veterans’ Affairs.",
      },
      {
        id: "different",
        question: "What makes Gentle Care Nursing Services different?",
        answer:
          "Gentle Care Nursing Services deliberately keeps a small caseload so each client gets dedicated, clinician-led care from a consistent team. We are led by a care professional with over 10 years of hands-on experience in disability, aged care and in-home support. We aim to respond to enquiries within 24 hours during business hours, with urgent referrals prioritised.",
      },
    ],
  },
];

/** Flat list of all FAQ items for schema and search */
export const ALL_FAQ_ITEMS = FAQ_CATEGORIES.flatMap((cat) => cat.items);
