/**
 * Service definitions and full page content.
 * Single source of truth for all service pages.
 */

import type { ServicePageData } from "@/components/sections/ServicePageLayout";

export interface ServiceDefinition {
  slug: string;
  title: string;
  /** One-line, outcome-focused benefit statement for the service */
  benefitLine: string;
  /** Short descriptive line used as supporting copy where needed */
  shortDescription: string;
  href: string;
}

export const SERVICES: ServiceDefinition[] = [
  {
    slug: "personal-care",
    title: "Personal Care",
    benefitLine: "Support with daily living that protects dignity and choice.",
    shortDescription: "Assistance with bathing, dressing, grooming, and mobility.",
    href: "/services/personal-care",
  },
  {
    slug: "nursing-care",
    title: "Nursing Care",
    benefitLine: "Personalised in-home support focused on quality care, consistency and independence.",
    shortDescription: "Wound care, medication management, and clinical monitoring at home.",
    href: "/services/nursing-care",
  },
  {
    slug: "daily-living",
    title: "Assistance with Daily Living",
    benefitLine: "Practical help for a more independent life at home.",
    shortDescription: "Support with meal prep, household tasks, and daily routines.",
    href: "/services/assistance-with-daily-living",
  },
  {
    slug: "community-participation",
    title: "Community Participation",
    benefitLine: "Stay connected with your community and achieve your goals.",
    shortDescription: "Support for social activities, appointments, and social inclusion.",
    href: "/services/community-participation",
  },
  {
    slug: "complex-care",
    title: "Complex Care Support",
    benefitLine: "Specialised clinical care for higher-need participants.",
    shortDescription: "PEG feeding, tracheostomy care, and complex health management.",
    href: "/services/complex-care",
  },
  {
    slug: "overnight-support",
    title: "Overnight Support",
    benefitLine: "Peace of mind and safety while you sleep.",
    shortDescription: "Active overnight care or sleepover support for peace of mind.",
    href: "/services/overnight-support",
  },
  {
    slug: "post-hospital-care",
    title: "Post-Hospital Support",
    benefitLine: "Support recovery and regain independence after leaving hospital.",
    shortDescription: "Skilled nursing and personal care during your transition home.",
    href: "/services/post-hospital-care",
  },
];

// ---------------------------------------------------------------------------
// Full page content for each service
// ---------------------------------------------------------------------------

export const NDIS_PAGE: ServicePageData = {
  title: "NDIS Services",
  href: "/ndis",
  snippetAnswer:
    "NDIS in-home nursing is skilled nursing and personal care at home for NDIS participants, delivered by a registered NDIS provider like Gentle Care Nursing Services across Sydney.",
  intro:
    "As a registered NDIS provider, Gentle Care Nursing Services delivers personalised in-home nursing and support for NDIS participants. We work closely with participants, families, and support coordinators to provide high-quality care that helps people live more independently.",
  evidence: {
    heading: "Quick facts: NDIS in-home nursing with Gentle Care",
    intro: "Citable facts for NDIS participants, support coordinators, plan managers, and families looking at providers in Sydney.",
    items: [
      { label: "Registration", value: "Registered NDIS provider, compliant with the NDIS Quality and Safeguards Commission.", icon: "registration" },
      { label: "Service area", value: "Sydney and surrounds — Inner West, North Shore, Northern Beaches, Western Sydney, South Sydney, CBD and East.", icon: "area" },
      { label: "Response window", value: "We aim to respond to NDIS enquiries within 24 hours during business hours, with urgent referrals prioritised.", icon: "response" },
      { label: "Plan management", value: "We work with NDIA-managed, plan-managed, and self-managed participants.", icon: "funding" },
      { label: "Funding categories", value: "Core Supports (Assistance with Daily Life) and Capacity Building line items, where applicable.", icon: "funding" },
      { label: "Scope of support", value: "In-home nursing, personal care, complex care (PEG, tracheostomy, catheter), and community participation.", icon: "scope" },
    ],
  },

  whoItHelps: {
    title: "Who This Is For",
    description:
      "Our NDIS services are designed for participants and the people who support them.",
    audiences: [
      "NDIS participants needing in-home nursing or personal care",
      "Families managing care for a loved one with a disability",
      "Support coordinators looking for a reliable care provider",
      "Plan managers seeking quality service delivery",
      "Participants transitioning from hospital or facility care",
      "People with complex care needs requiring skilled nursing",
    ],
  },

  supportAvailable: {
    title: "What Support Is Available",
    description:
      "We provide a range of NDIS-funded supports tailored to individual participant goals and needs.",
    features: [
      {
        title: "In-Home Nursing",
        description:
          "Skilled nurses delivering clinical care in your home: medication management, wound care, health monitoring, and more.",
      },
      {
        title: "Personal Care",
        description:
          "Assistance with daily living activities including bathing, dressing, grooming, mobility support, and meal preparation.",
      },
      {
        title: "Community Access Support",
        description:
          "Help to participate in community activities, attend appointments, and build independence outside the home.",
      },
      {
        title: "Care Coordination",
        description:
          "Working with your support coordinator and other providers to ensure seamless, well-managed care delivery.",
      },
      {
        title: "Respite Care",
        description:
          "Short-term support to give regular carers a break while maintaining continuity and quality of care.",
      },
      {
        title: "Complex Care Support",
        description:
          "Specialised nursing for participants with complex health needs, including tracheostomy care, PEG feeding, and catheter management.",
      },
    ],
  },

  whyChoose: {
    title: "Why Choose Gentle Care for NDIS",
    description:
      "We do things differently, and it makes a real difference for participants and coordinators.",
    reasons: [
      {
        title: "Registered NDIS Provider",
        description:
          "Fully registered, compliant, and audited. Coordinators and plan managers can refer with confidence.",
      },
      {
        title: "Smaller Client Load",
        description:
          "We take on fewer clients so every participant gets more dedicated, attentive care, not a rushed service.",
      },
      {
        title: "Fast and simple care setup",
        description:
          "We focus on keeping things simple. We respond to your call or message quickly, usually within 24 to 48 hours, so you're not left waiting.",
      },
    ],
  },

  faqs: [
    {
      id: "ndis-registered",
      question: "Is Gentle Care Nursing Services a registered NDIS provider?",
      answer:
        "Yes. Gentle Care Nursing Services is a fully registered NDIS provider. We meet all quality and safety standards required by the NDIS Quality and Safeguards Commission.",
    },
    {
      id: "ndis-get-started",
      question: "How do I get started with NDIS services?",
      answer:
        "You or your support coordinator can reach out through our Request Care form. We'll listen to what you need and get back to you within 24 to 48 hours to talk about how we can help.",
    },
    {
      id: "ndis-funding",
      question: "What NDIS funding categories do you work with?",
      answer:
        "We work across Core Supports (Assistance with Daily Life) and Capacity Building categories. Your support coordinator can confirm which line items apply to your plan.",
    },
  ],

  cta: {
    title: "Ready to Get Started with NDIS Support?",
    description:
      "Submit your enquiry or referral and we'll get back to you quickly.",
  },
  relatedCompareSlugs: ["registered-ndis-provider-vs-non-registered"],
  caseStories: [
    {
      title: "Case example: Stabilising support for an NDIS participant at home",
      summary:
        "A participant in their 30s with complex physical needs was cycling through hospital admissions because daily care at home kept breaking down. Their support coordinator referred to Gentle Care for more consistent nursing. We worked with the participant, family, and therapy team to set up regular in-home nursing, safer manual handling routines, and clear escalation steps. Over the next few months, avoidable admissions dropped and the participant felt more in control of their week.",
    },
  ],
};

export const DVA_PAGE: ServicePageData = {
  title: "DVA & Community Nursing",
  href: "/dva",
  snippetAnswer:
    "DVA Community Nursing is in-home nursing and care for eligible Veteran Card holders, funded by the Department of Veterans' Affairs and delivered by contracted providers like Gentle Care Nursing Services in Sydney.",
  intro:
    "Gentle Care Nursing Services is a DVA Contracted Community Nursing Provider, supporting eligible Veteran Card holders with clinically required nursing and personal care services at home.",
  evidence: {
    heading: "Quick facts: DVA Community Nursing with Gentle Care",
    intro: "Citable facts for veterans, war widows and widowers, families, GPs, and hospital discharge planners arranging DVA-funded nursing at home.",
    items: [
      { label: "Contract status", value: "DVA Contracted Community Nursing Provider, delivering services under the DVA Community Nursing programme.", icon: "registration" },
      { label: "Eligibility", value: "Eligible Veteran Card holders (Gold Card; White Card in some cases) with a referral from a GP or treating doctor.", icon: "credential" },
      { label: "Out-of-pocket cost", value: "No out-of-pocket cost for clinically required, DVA-approved care — claims submitted directly to DVA.", icon: "funding" },
      { label: "Service area", value: "Sydney and surrounds — visits coordinated around real driving distances and household preferences.", icon: "area" },
      { label: "Response window", value: "Referrals acknowledged within 24 hours during business hours, with post-hospital referrals prioritised.", icon: "response" },
      { label: "Scope of support", value: "Wound care, medication management, continence and catheter care, chronic disease monitoring, and personal care where part of approved care.", icon: "scope" },
    ],
  },

  whoItHelps: {
    title: "Who This Is For",
    description:
      "Our DVA and community nursing services support veterans and their families across multiple care needs.",
    audiences: [
      "Veterans with a DVA Gold or White Card",
      "War widows and widowers eligible for DVA-funded care",
      "Families supporting a veteran at home",
      "Healthcare professionals referring DVA clients",
      "Veterans transitioning from hospital to home care",
      "Clients needing ongoing community nursing support",
    ],
  },

  supportAvailable: {
    title: "What Support Is Available",
    description:
      "We provide DVA-funded and community nursing services tailored to individual health needs.",
    features: [
      {
        title: "Community Nursing",
        description:
          "Experienced nurses providing clinical care at home: wound management, medication administration, health assessments, and chronic disease monitoring.",
      },
      {
        title: "Personal Care",
        description:
          "Help with daily living: bathing, dressing, grooming, toileting, mobility assistance, and meal support.",
      },
      {
        title: "Post-Hospital Care",
        description:
          "Nursing support after hospital discharge to help veterans recover safely at home with continuity of care.",
      },
      {
        title: "Chronic Disease Management",
        description:
          "Ongoing nursing support for veterans managing conditions like diabetes, COPD, heart disease, and other chronic illnesses.",
      },
      {
        title: "Wound Care",
        description:
          "Specialist wound assessment and management by experienced nurses in the comfort of your home.",
      },
      {
        title: "Medication Management",
        description:
          "Assistance with medication administration, compliance monitoring, and liaison with treating doctors and pharmacists.",
      },
    ],
  },

  whyChoose: {
    title: "Why Choose Gentle Care for DVA",
    description:
      "Veterans deserve dedicated, high-quality care, and that's exactly what we provide.",
    reasons: [
      {
        title: "DVA Contracted Community Nursing Provider",
        description:
          "We are a DVA Contracted Community Nursing provider, supporting eligible Veteran Card holders with clinically required nursing and personal care at home. Claims are handled directly with no out-of-pocket costs for eligible veterans.",
      },
      {
        title: "Personalised, Respectful Care",
        description:
          "We take time to understand each veteran's needs and preferences. Smaller client load means more dedicated support.",
      },
      {
        title: "Quick Response Times",
        description:
          "We respond to referrals and enquiries quickly so veterans and families get the support they need without delay.",
      },
    ],
  },

  faqs: [
    {
      id: "dva-eligibility",
      question: "Who is eligible for DVA-funded care?",
      answer:
        "Veterans with a DVA Gold Card or White Card may be eligible for community nursing and personal care services. Eligibility depends on your card type and assessed care needs. Contact DVA or speak with us to discuss your situation.",
    },
    {
      id: "dva-cost",
      question: "Is there a cost for DVA services?",
      answer:
        "For eligible veterans, DVA-funded services are provided at no out-of-pocket cost. We handle all claims directly with DVA on your behalf.",
    },
    {
      id: "dva-referral",
      question: "How do I refer a veteran for care?",
      answer:
        "Submit an enquiry through our Request Care form, or contact us directly. We'll work with the veteran, their family, and their treating team to arrange appropriate care.",
    },
  ],

  cta: {
    title: "Request DVA or Community Nursing Support",
    description:
      "Get in touch and we'll arrange the right care for you or your loved one.",
  },
  relatedCompareSlugs: ["dva-community-nursing-vs-private-nursing"],
  caseStories: [
    {
      title: "Case example: Supporting a veteran to remain at home",
      summary:
        "A veteran with chronic heart and lung disease wanted to avoid moving into residential care. Through DVA community nursing, Gentle Care provided regular visits for medication management, wound care, and monitoring of breathlessness and fluid changes. We kept their GP informed and helped the family understand when to seek extra review. With this support, they were able to stay at home comfortably for much longer than they expected.",
    },
  ],
};

export const AGED_CARE_PAGE: ServicePageData = {
  title: "Aged Care at Home / Support at Home",
  href: "/aged-care",
  snippetAnswer:
    "We support older Australians through Support at Home, DVA, and private care arrangements. We can also work with clients, families and care partners to deliver approved in-home nursing and personal care services.",
  intro:
    "Gentle Care Nursing Services helps older Australians stay safe, comfortable, and independent at home. We support older Australians through Support at Home, DVA, and private care arrangements, working with clients, families and care partners to deliver approved in-home nursing and personal care services.",
  evidence: {
    heading: "Quick facts: in-home aged care with Gentle Care",
    intro: "Citable facts for older Australians, families, hospital discharge planners, and GPs arranging in-home aged care across Sydney.",
    items: [
      { label: "Funding accepted", value: "Support at Home, Commonwealth Home Support Programme (CHSP), DVA Community Nursing, and private fee-for-service.", icon: "funding" },
      { label: "Service area", value: "Sydney and surrounds, including the Inner West, North Shore, Northern Beaches, Western Sydney, and CBD and East.", icon: "area" },
      { label: "Response window", value: "Enquiries acknowledged within 24 hours during business hours, with hospital-discharge referrals prioritised.", icon: "response" },
      { label: "Assessment pathway", value: "We can work with My Aged Care assessment outcomes (ACAT/ACAS) and existing aged care packages.", icon: "credential" },
      { label: "Scope of support", value: "In-home nursing, personal care, medication support, post-hospital recovery, and wellness checks.", icon: "scope" },
      { label: "Caseload model", value: "Deliberately small caseload for consistent staff matching and stronger continuity of care.", icon: "credential" },
    ],
  },

  whoItHelps: {
    title: "Who This Is For",
    description:
      "Our aged care services support older Australians and the families and professionals who care for them.",
    audiences: [
      "Older Australians wanting to stay at home",
      "Families looking for in-home care for a parent or relative",
      "Support at Home recipients",
      "CHSP (Commonwealth Home Support Programme) clients",
      "Hospital discharge planners arranging post-acute home care",
      "GPs and specialists referring patients for nursing at home",
    ],
  },

  supportAvailable: {
    title: "Support Options",
    description:
      "We provide a range of in-home services to support older Australians with their health and daily living needs.",
    features: [
      {
        title: "In-Home Nursing",
        description:
          "Experienced nurses providing clinical care at home: medication management, wound care, health monitoring, and chronic disease support.",
      },
      {
        title: "Personal Care Assistance",
        description:
          "Help with bathing, dressing, grooming, mobility, toileting, and other daily activities to maintain comfort and dignity.",
      },
      {
        title: "Medication Support",
        description:
          "Assistance with medication administration, compliance checks, and coordination with doctors and pharmacists.",
      },
      {
        title: "Post-Hospital Recovery",
        description:
          "Short-term or ongoing nursing support after a hospital stay to help older adults recover safely at home.",
      },
      {
        title: "Wellness Checks",
        description:
          "Regular health assessments and monitoring to identify changes early and keep treating teams informed.",
      },
      {
        title: "Companion and Daily Living Support",
        description:
          "Assistance with meal preparation, light housekeeping, social engagement, and getting to appointments.",
      },
    ],
  },

  whyChoose: {
    title: "Why Choose Gentle Care for Aged Care",
    description:
      "We believe every older Australian deserves care that feels personal, not institutional.",
    reasons: [
      {
        title: "Ageing in Place",
        description:
          "We help older Australians stay at home longer by providing the right level of support, from light assistance to complex nursing.",
      },
      {
        title: "Dedicated, Consistent Carers",
        description:
          "Smaller client load means familiar faces, stronger relationships, and more attentive care for your loved one.",
      },
      {
        title: "Family Peace of Mind",
        description:
          "We communicate regularly with families so you always know how your loved one is going. No surprises.",
      },
    ],
  },

  faqs: [
    {
      id: "aged-care-funding",
      question: "What funding options are available for aged care?",
      answer:
        "We work with Support at Home, the Commonwealth Home Support Programme (CHSP), DVA, and private funding. Your aged care assessment team (ACAT or ACAS) can help you understand if you are eligible for government-funded support.",
    },
    {
      id: "aged-care-start",
      question: "How do I arrange care for my parent or loved one?",
      answer:
        "Submit an enquiry through our Request Care form or contact us directly. We'll discuss your loved one's needs and help you understand the best care options available.",
    },
    {
      id: "aged-care-differ",
      question: "What makes Gentle Care different from other aged care providers?",
      answer:
        "We take on fewer clients so each person gets more dedicated, personalised care. Our focus is on quality over volume, and families tell us they notice the difference.",
    },
  ],

  cta: {
    title: "Arrange In-Home Aged Care Support",
    description:
      "Get in touch to discuss care options for your loved one.",
  },
  relatedGuideSlugs: ["in-home-care-for-dementia", "support-for-family-carers-and-burnout"],
  relatedCompareSlugs: ["in-home-nursing-vs-residential-aged-care"],
  caseStories: [
    {
      title: "Case example: Helping an older person come home safely",
      summary:
        "An older woman living alone was discharged from hospital after a fall. Her family lived interstate and were worried she would fall again. Gentle Care set up daily personal care, regular nursing checks, and simple home safety adjustments. Over time, visits stepped down as her strength and confidence improved, and her family were able to visit as family, not full-time carers.",
    },
  ],
};

export const PRIVATE_NURSING_PAGE: ServicePageData = {
  title: "Private Nursing & Personal Care",
  href: "/private-nursing",
  snippetAnswer:
    "Private in-home nursing is nursing and personal care you pay for yourself (not NDIS, DVA, or aged care funded), with no waitlists and flexible scheduling across Sydney.",
  intro:
    "When you need nursing or personal care outside of funded programs, Gentle Care Nursing Services provides private in-home services tailored to your needs. No waitlists, no complex applications. Just quality care when you need it.",

  whoItHelps: {
    title: "Who This Is For",
    description:
      "Our private services are available to anyone who needs professional in-home nursing or personal care.",
    audiences: [
      "Individuals recovering from surgery or illness",
      "Families seeking extra support for a loved one",
      "People not yet eligible for funded care programs",
      "Clients wanting to top up existing funded services",
      "Professionals needing temporary nursing support",
      "Anyone wanting high-quality care without waitlists",
    ],
  },

  supportAvailable: {
    title: "What We Provide",
    description:
      "Our private services cover the same high standard of care as our funded programs, available on a fee-for-service basis.",
    features: [
      {
        title: "Private Nursing",
        description:
          "Experienced nurses providing clinical care at home: wound care, injections, health assessments, medication management, and post-surgical support.",
      },
      {
        title: "Personal Care",
        description:
          "Assistance with bathing, dressing, grooming, mobility, and daily living activities to support comfort and independence.",
      },
      {
        title: "Post-Surgery Recovery",
        description:
          "Skilled nursing care during recovery: wound monitoring, medication management, and coordination with your treating team.",
      },
      {
        title: "Respite for Families",
        description:
          "Give regular carers a break while ensuring your loved one receives professional, compassionate care at home.",
      },
      {
        title: "Flexible Scheduling",
        description:
          "Care when you need it: one-off visits, regular weekly support, or short-term intensive care during recovery.",
      },
      {
        title: "Health Monitoring",
        description:
          "Regular wellness checks and health monitoring for individuals managing chronic conditions or recovering at home.",
      },
    ],
  },

  whyChoose: {
    title: "Why Choose Gentle Care for Private Services",
    description:
      "When you're paying for care directly, you deserve the same quality-focused, relationship-based support we provide to every client.",
    reasons: [
      {
        title: "No Waitlists",
        description:
          "Private services mean we can start care quickly, often within days of your enquiry.",
      },
      {
        title: "Your Schedule, Your Terms",
        description:
          "Flexible care arrangements that fit your life. One-off, regular, or intensive. You choose.",
      },
      {
        title: "Same High Standard",
        description:
          "All care is delivered by qualified nurses and carers to the same professional standard as our funded services.",
      },
    ],
  },

  faqs: [
    {
      id: "private-cost",
      question: "How much does private nursing cost?",
      answer:
        "Costs depend on the type of care, duration, and frequency. Contact us for a personalised quote. We'll be transparent about pricing with no hidden fees.",
    },
    {
      id: "private-start",
      question: "How quickly can care start?",
      answer:
        "Private services can often begin within a few days of your enquiry. We'll work with your schedule to arrange care as soon as possible.",
    },
    {
      id: "private-combine",
      question: "Can I combine private care with funded services?",
      answer:
        "Yes. Many clients use private care to supplement their NDIS, DVA, or aged care funded services. We can help you understand how to get the most from both.",
    },
  ],

  cta: {
    title: "Arrange Private In-Home Care",
    description:
      "Contact us for a personalised quote and get care started quickly.",
  },
  relatedCompareSlugs: ["dva-community-nursing-vs-private-nursing"],
  caseStories: [
    {
      title: "Case example: Short-term private support after surgery",
      summary:
        "A professional in their 50s arranged private nursing after day surgery so they could recover at home without relying solely on family. Gentle Care provided daily visits for wound checks, medication support, and help with showering in the first week. By the end of the fortnight, they were back to managing independently and returning to work.",
    },
  ],
};

export const POST_HOSPITAL_PAGE: ServicePageData = {
  title: "Post-Hospital Nursing & Care at Home",
  href: "/services/post-hospital-care",
  snippetAnswer:
    "Post-hospital in-home nursing is support from qualified nurses and carers after someone leaves hospital, so recovery continues safely at home. Gentle Care Nursing Services coordinates with discharge planners at Sydney hospitals — including RPA, Westmead, Royal North Shore, and St Vincent's — and supports recovery pathways aligned with NSW Health's Out of Hospital Care framework.",
  intro:
    "Leaving hospital can feel overwhelming. Our post-hospital nursing and care at home service helps you or your loved one recover safely and comfortably, with skilled support and clear communication from day one. We work with discharge planners across major Sydney hospitals (RPA, Westmead, Royal North Shore, St Vincent's, Concord, Prince of Wales) and align with NSW Health's Out of Hospital Care pathways so the transition home is structured, not rushed.",
  evidence: {
    heading: "Quick facts: post-hospital care at home with Gentle Care",
    intro: "Citable facts for hospital discharge planners, GPs, families, and NDIS or DVA referrers arranging in-home recovery support across Sydney.",
    items: [
      { label: "Service area", value: "Sydney and surrounds — Inner West, North Shore, Northern Beaches, Western Sydney, South Sydney, CBD and East.", icon: "area" },
      { label: "Hospitals coordinated with", value: "Discharge planners at RPA, Westmead, Royal North Shore, St Vincent's, Concord, and Prince of Wales — among other Sydney metropolitan hospitals.", icon: "credential" },
      { label: "Response window", value: "Hospital-discharge referrals prioritised, with visits often starting within 24 to 48 hours of referral, depending on location.", icon: "response" },
      { label: "Funding accepted", value: "NDIS, DVA Community Nursing, aged care (Support at Home, CHSP), and private fee-for-service.", icon: "funding" },
      { label: "Scope of support", value: "Wound care, medication management, observations, personal care, mobility and transfer support, and family education.", icon: "scope" },
      { label: "Care model", value: "Aligned with NSW Health Out of Hospital Care pathways — structured step-down visits that can start more frequent and reduce as recovery progresses.", icon: "credential" },
    ],
  },

  whoItHelps: {
    title: "Who This Is For",
    description:
      "Post-hospital support is designed for people who are well enough to go home, but need extra help to recover safely.",
    audiences: [
      "People coming home after surgery or a hospital stay",
      "Older adults who have become weaker or less confident after time in hospital",
      "NDIS participants needing support to stabilise at home after admission",
      "Veterans and war widows returning home under DVA community nursing",
      "Families who want extra help in the first few weeks after discharge",
      "Anyone needing short-term nursing and personal care at home during recovery",
    ],
  },

  supportAvailable: {
    title: "What Post-Hospital Support Includes",
    description:
      "We tailor your post-hospital care to your discharge plan, health needs, and home situation.",
    features: [
      {
        title: "Clinical Nursing at Home",
        description:
          "Experienced nurses provide wound care, medication management, observations, and chronic disease monitoring so your recovery stays on track.",
      },
      {
        title: "Personal Care and Daily Support",
        description:
          "Help with bathing, dressing, mobility, toileting, and meals to reduce falls risk and make day-to-day life easier while you regain strength.",
      },
      {
        title: "Short-Term Intensive Support",
        description:
          "More frequent visits in the first one or two weeks after you come home, slowly reducing as you feel more confident and independent.",
      },
      {
        title: "Coordination With Your Treating Team",
        description:
          "We review discharge information, liaise with your GP and specialists where appropriate, and keep everyone informed about progress and concerns.",
      },
      {
        title: "Support for Families and Carers",
        description:
          "We show families what to watch for, how to support recovery safely, and when to contact us or the treating team for extra help.",
      },
    ],
  },

  whyChoose: {
    title: "Why Choose Gentle Care After Hospital",
    description:
      "We combine clinical skill with calm, compassionate support so recovery at home feels safe, not stressful.",
    reasons: [
      {
        title: "Experience With Hospital-to-Home Transitions",
        description:
          "We regularly support people returning home after surgery, acute illness, or complex admissions. Our team understands the pressures on families at this time.",
      },
      {
        title: "Fast, Clear Communication",
        description:
          "We respond quickly to new referrals, confirm start dates, and explain what to expect so you are never left wondering what happens next.",
      },
      {
        title: "Aligned With Your Funding",
        description:
          "We can deliver post-hospital care under NDIS, DVA, aged care packages, or private funding, and help you understand which option applies to you.",
      },
    ],
  },

  faqs: [
    {
      id: "post-hospital-start",
      question: "How quickly can post-hospital care start?",
      answer:
        "In many cases, we can begin visits within 24 to 48 hours of hearing from you, depending on your location and what care you need. We'll confirm start dates and how often we'll visit before you leave hospital whenever we can.",
    },
    {
      id: "post-hospital-referral",
      question: "Do I need a referral from the hospital or my doctor?",
      answer:
        "A referral or discharge summary is very helpful, especially for DVA and complex nursing. However, families and participants can also contact us directly. We'll work with your hospital team or GP to ensure we have the right information.",
    },
    {
      id: "post-hospital-funding",
      question: "Is post-hospital care funded by NDIS, DVA, or aged care packages?",
      answer:
        "Yes, in many cases. Post-hospital support may be funded through NDIS, DVA community nursing, Support at Home, CHSP, or paid privately. We can talk through your situation and help you understand which funding streams may apply.",
    },
  ],

  cta: {
    title: "Arrange Post-Hospital Nursing & Care",
    description:
      "Tell us about your upcoming or recent hospital stay and we'll help you plan safe, supportive care at home.",
  },
  testimonials: [],
  relatedGuideSlugs: ["in-home-care-after-hip-replacement", "in-home-care-after-stroke"],
  caseStories: [
    {
      title: "Case example: From hospital to home after hip surgery",
      summary:
        "After a hip replacement, an older gentleman felt anxious about going home because his partner could not safely help with lifting. The hospital discharge planner referred to Gentle Care for post-hospital support. We provided daily visits at first for wound care, pain management, and transfers, then gradually reduced the schedule as he grew stronger. He avoided re-admission and felt confident walking short distances with his frame.",
    },
  ],
};

export const COMPLEX_CARE_PAGE: ServicePageData = {
  title: "Complex Clinical Care at Home",
  href: "/services/complex-care",
  snippetAnswer:
    "Complex clinical care at home is specialised nursing for people with higher health needs — including tracheostomy care, PEG feeding, catheter management, and complex wound care — delivered safely in the home across Sydney by experienced nurses, in coordination with treating teams at hospitals like RPA, Westmead, RNSH, and St Vincent's.",
  intro:
    "Many people with higher health needs can live safely at home with the right support. Our complex clinical care service brings experienced nurses to you across Sydney and surrounds, so advanced care can continue in a familiar, comfortable environment — whether you're transitioning from a Sydney hospital, managing a long-term condition, or coordinating care with your treating team.",
  procedures: [
    {
      name: "Tracheostomy care",
      alternateName: "Tracheostomy management",
      description:
        "Airway care, tube changes as directed by the treating team, stoma site monitoring, and suctioning support, delivered in the home by experienced nurses across Sydney.",
    },
    {
      name: "PEG feeding",
      alternateName: "Percutaneous endoscopic gastrostomy feeding",
      description:
        "PEG site care, enteral feeding regimes, flushing, and tolerance monitoring delivered in the home, in line with dietitian and medical instructions.",
    },
    {
      name: "Catheter management",
      alternateName: "Indwelling urinary catheter care",
      description:
        "Indwelling and intermittent catheter care, monitoring, and troubleshooting in the home, with escalation to GPs and specialists when needed.",
    },
    {
      name: "Complex wound care",
      alternateName: "Chronic and complex wound management",
      description:
        "Assessment and management of complex or chronic wounds — leg ulcers, pressure injuries, surgical wounds — following specialist plans and reporting back to treating teams.",
    },
  ],

  whoItHelps: {
    title: "Who Complex Care Is For",
    description:
      "Complex care at home is suitable for people who need more than basic personal care or simple nursing tasks.",
    audiences: [
      "People living with tracheostomies, PEG tubes, or long-term catheters",
      "NDIS participants with higher clinical support needs",
      "Veterans and older adults managing multiple or complex conditions",
      "Families caring for someone who needs regular skilled nursing at home",
      "People transitioning from high-care facilities back to the community",
      "Anyone who has been told they need complex nursing or clinical oversight at home",
    ],
  },

  supportAvailable: {
    title: "Types of Complex Care We Provide",
    description:
      "We tailor complex care plans to your specific health needs, working alongside your treating team.",
    features: [
      {
        title: "Tracheostomy Care",
        description:
          "Airway care, tube changes as directed, monitoring, and support to keep tracheostomy sites clean, safe, and functioning well.",
      },
      {
        title: "PEG Feeding and Nutrition Support",
        description:
          "PEG site care, feeding regimes, flushing, and monitoring tolerance, delivered in line with your dietitian and medical instructions.",
      },
      {
        title: "Catheter Management",
        description:
          "Catheter care, monitoring, and troubleshooting to reduce discomfort and complications, with escalation to your treating team when needed.",
      },
      {
        title: "Complex Wound Care",
        description:
          "Assessment and management of complex or chronic wounds, following specialist plans and keeping everyone informed about healing.",
      },
      {
        title: "Monitoring and Early Escalation",
        description:
          "Regular observations, symptom monitoring, and early escalation to your GP or specialist if there are concerning changes.",
      },
    ],
  },

  whyChoose: {
    title: "Why Choose Gentle Care for Complex Care",
    description:
      "Complex care requires clinical skill and calm, confident support. We bring both to every visit.",
    reasons: [
      {
        title: "Experienced Clinical Team",
        description:
          "Our nurses have hands-on experience with complex care in both hospital and community settings, so you are not a \"first\" for us.",
      },
      {
        title: "Home-Focused Approach",
        description:
          "We plan care around your home environment, routines, and support network, not just a checklist of tasks.",
      },
      {
        title: "Aligned With Your Plans and Providers",
        description:
          "We work from specialist and GP plans, communicate with your treating team, and document progress so everyone is on the same page.",
      },
    ],
  },

  faqs: [
    {
      id: "complex-care-home-safe",
      question: "Is complex care at home safe?",
      answer:
        "Yes, when it is planned properly and delivered by experienced nurses. We only provide complex care that is appropriate for the home setting and always follow your treating team's instructions.",
    },
    {
      id: "complex-care-funding",
      question: "Can complex care be funded by NDIS, DVA, or aged care packages?",
      answer:
        "Complex care can often be funded under NDIS, DVA community nursing, or Support at Home, depending on your situation and assessments. We can work with your coordinator or case manager to clarify funding options.",
    },
    {
      id: "complex-care-start",
      question: "How do I get started with complex care at home?",
      answer:
        "Start by submitting an enquiry or referral. We’ll talk through your current care plan, any specialist instructions, and what support you need at home, then propose a safe, practical plan.",
    },
  ],

  cta: {
    title: "Discuss Complex Care at Home",
    description:
      "Share your current situation and we’ll let you know how we can safely support complex care at home.",
  },
  testimonials: [],
  relatedGuideSlugs: ["in-home-care-for-chronic-wounds"],
  caseStories: [
    {
      title: "Case example: Complex care at home for a younger adult",
      summary:
        "A younger adult with a tracheostomy and PEG feeding wanted to live at home with their family instead of in a facility. Gentle Care put a small team of experienced nurses in place to manage airway care, feeding regimes, and complex wound dressings. We coordinated closely with their specialist team. Over time, the family reported feeling more confident and grateful that home was a safe option.",
    },
  ],
};

export const HOSPITAL_AT_HOME_PAGE: ServicePageData = {
  title: "Hospital-at-Home & Step-Down Care",
  href: "/services/hospital-at-home",
  snippetAnswer:
    "Hospital-at-home and step-down care means receiving hospital-level nursing and personal care at home after an admission, so you can leave hospital sooner while your recovery continues safely with skilled support. Gentle Care Nursing Services delivers step-down support across Sydney that complements NSW Health Hospital in the Home (HITH) and Out of Hospital Care pathways, in coordination with discharge teams at major Sydney hospitals.",
  intro:
    "Some people are ready to leave hospital but still need more support than a standard discharge offers. Our hospital-at-home and step-down care service brings experienced nurses and carers to you across Sydney and surrounds, working alongside discharge planners at major Sydney hospitals (RPA, Westmead, Royal North Shore, St Vincent's, Concord) and complementing NSW Health Hospital in the Home (HITH) and Out of Hospital Care frameworks, so you can keep recovering in the comfort of your own home.",
  evidence: {
    heading: "Quick facts: hospital-at-home & step-down care with Gentle Care",
    intro: "Citable facts for hospital discharge planners, GPs, families, and case managers arranging step-down care across Sydney.",
    items: [
      { label: "Service area", value: "Sydney and surrounds — Inner West, North Shore, Northern Beaches, Western Sydney, South Sydney, CBD and East.", icon: "area" },
      { label: "Hospitals coordinated with", value: "Discharge planners at RPA, Westmead, Royal North Shore, St Vincent's, and Concord — among other Sydney metropolitan hospitals.", icon: "credential" },
      { label: "Care framework", value: "Step-down support that complements NSW Health Hospital in the Home (HITH) and Out of Hospital Care pathways, not a replacement for hospital-led HITH services.", icon: "credential" },
      { label: "Response window", value: "Discharge referrals prioritised, with structured visit schedules confirmed before discharge wherever possible.", icon: "response" },
      { label: "Funding accepted", value: "NDIS, DVA Community Nursing, aged care (Support at Home, CHSP), and private fee-for-service.", icon: "funding" },
      { label: "Scope of support", value: "Observations, medication management, wound care, mobility and transfer support, personal care, and family education — with clear escalation pathways.", icon: "scope" },
    ],
  },

  whoItHelps: {
    title: "Who Hospital-at-Home Is For",
    description:
      "This service is designed for people who are clinically stable enough to be at home, but still need close nursing oversight.",
    audiences: [
      "People who could be at home if nursing and personal care were available",
      "Patients waiting for hospital discharge who want to go home sooner",
      "NDIS participants and older adults needing step-down support after acute care",
      "Veterans and DVA clients who can safely recover at home",
      "Families who want to reduce hospital time but keep care safe and structured",
    ],
  },

  supportAvailable: {
    title: "What Hospital-at-Home Support Includes",
    description:
      "We coordinate closely with hospital teams so your at-home care plan matches your clinical needs and goals.",
    features: [
      {
        title: "Hospital-Level Nursing at Home",
        description:
          "Experienced nurses provide observations, medication management, wound care, and other nursing tasks according to your discharge plan.",
      },
      {
        title: "Structured Step-Down Care",
        description:
          "A planned schedule of visits that can start more intensive and reduce gradually as your condition stabilises and confidence grows.",
      },
      {
        title: "Personal Care and Mobility Support",
        description:
          "Help with bathing, dressing, transfers, and mobility so you can safely move around your home and avoid falls.",
      },
      {
        title: "Coordination With Hospital and GPs",
        description:
          "We work from your discharge summary, liaise with hospital teams and your GP where needed, and escalate any concerns quickly.",
      },
      {
        title: "Family Education and Support",
        description:
          "We show families how to support recovery safely at home and what signs mean it’s time to call us or the treating team.",
      },
    ],
  },

  whyChoose: {
    title: "Why Choose Hospital-at-Home With Gentle Care",
    description:
      "Our goal is to make leaving hospital feel safe and supported, not rushed or overwhelming.",
    reasons: [
      {
        title: "Experience With Step-Down Programs",
        description:
          "We regularly partner with hospitals and discharge planners to deliver structured hospital-at-home and step-down care programs.",
      },
      {
        title: "Safe Transitions, Not Shortcuts",
        description:
          "We only provide hospital-at-home support when it is clinically appropriate and safe to do so, with clear escalation pathways.",
      },
      {
        title: "Flexible Across Funding Types",
        description:
          "Support can be delivered under NDIS, DVA, aged care packages, or privately, depending on your circumstances.",
      },
    ],
  },

  faqs: [
    {
      id: "hospital-at-home-safe",
      question: "Is hospital-at-home care as safe as staying in hospital?",
      answer:
        "For the right people, yes. We work with your hospital team to make sure you are clinically suitable for hospital-at-home care, and we follow clear plans and escalation procedures if your condition changes.",
    },
    {
      id: "hospital-at-home-start",
      question: "How do I organise hospital-at-home or step-down care?",
      answer:
        "You can ask your hospital team or discharge planner to contact us, or you can submit a Request Care enquiry yourself. We’ll review your situation and coordinate with the hospital to plan safe support.",
    },
    {
      id: "hospital-at-home-funding",
      question: "Can hospital-at-home support be funded by NDIS, DVA, or aged care packages?",
      answer:
        "In many cases, yes. Hospital-at-home and step-down care can be delivered under NDIS, DVA community nursing, aged care packages, or private funding. We’ll help you understand which options apply.",
    },
  ],

  cta: {
    title: "Plan Hospital-at-Home or Step-Down Care",
    description:
      "Tell us about your hospital stay and discharge plans so we can help you arrange safe, supported recovery at home.",
  },
};

export const PALLIATIVE_CARE_PAGE: ServicePageData = {
  title: "Palliative & End-of-Life Support at Home",
  href: "/services/palliative-care",
  snippetAnswer:
    "Palliative and end-of-life care at home is in-home nursing focused on comfort, symptom management, and family support, delivered across Sydney by experienced nurses in coordination with specialist palliative teams at services like Sacred Heart Health Service (St Vincent's), RPA, and Sydney Local Health District community palliative care.",
  intro:
    "Facing a serious illness or the end of life is never easy. Our palliative and end-of-life support at home focuses on comfort, dignity, and calm, delivered across Sydney and surrounds in coordination with specialist palliative care teams — including Sacred Heart Palliative Care at St Vincent's, RPA Palliative Care, and Sydney Local Health District community palliative services — so more of your energy can go into being together.",
  evidence: {
    heading: "Quick facts: palliative care at home with Gentle Care",
    intro: "Citable facts for families, GPs, specialist palliative care teams, and hospital discharge planners arranging in-home palliative support across Sydney.",
    items: [
      { label: "Service area", value: "Sydney and surrounds — Inner West, North Shore, Northern Beaches, Western Sydney, South Sydney, CBD and East.", icon: "area" },
      { label: "Coordination", value: "We work alongside specialist palliative care teams (e.g. Sacred Heart at St Vincent's, RPA, SLHD community palliative care) and treating GPs.", icon: "credential" },
      { label: "Response window", value: "Referrals from palliative care teams and hospital discharge planners acknowledged within 24 hours during business hours, and prioritised.", icon: "response" },
      { label: "Funding accepted", value: "Aged care (Support at Home, CHSP), DVA, NDIS where palliative needs are funded under the plan, and private fee-for-service.", icon: "funding" },
      { label: "Scope of support", value: "Symptom monitoring, comfort measures, personal care with dignity, repositioning and continence support, and family education.", icon: "scope" },
      { label: "Caseload model", value: "Deliberately small caseload so the same nurses and carers are present through changing needs in the final weeks and days.", icon: "credential" },
    ],
  },

  whoItHelps: {
    title: "Who Palliative Home Support Is For",
    description:
      "This service is for people with life-limiting illness who wish to remain at home, and for the families supporting them.",
    audiences: [
      "People with serious or life-limiting illnesses choosing to remain at home",
      "Families wanting more support to care for a loved one at the end of life",
      "Older adults whose focus has shifted from cure to comfort",
      "NDIS, DVA, or aged care clients needing palliative-focused support",
      "Carers who need guidance and respite while still being closely involved",
    ],
  },

  supportAvailable: {
    title: "What Palliative & End-of-Life Support Includes",
    description:
      "We tailor palliative support to your clinical needs, preferences, culture, and faith, working with your palliative care team where involved.",
    features: [
      {
        title: "Symptom Monitoring and Comfort Measures",
        description:
          "Regular visits to monitor symptoms, support comfort measures, and help implement the plans of your palliative care and medical teams.",
      },
      {
        title: "Personal Care With Dignity",
        description:
          "Gentle assistance with bathing, dressing, repositioning, and continence care to maximise comfort and preserve dignity.",
      },
      {
        title: "Support for Families and Carers",
        description:
          "Practical guidance, reassurance, and education for families about what to expect and how to provide day-to-day support.",
      },
      {
        title: "Coordination With Palliative Care Teams",
        description:
          "We communicate with specialist palliative care teams, GPs, and other providers so everyone is aligned and informed.",
      },
      {
        title: "Flexible Visit Patterns",
        description:
          "Visits can increase as needs change, including more frequent contact in the final stages if clinically appropriate and available.",
      },
    ],
  },

  whyChoose: {
    title: "Why Choose Gentle Care for Palliative Support",
    description:
      "Palliative care is as much about people and presence as it is about clinical skill. We bring both into your home.",
    reasons: [
      {
        title: "Calm, Compassionate Team",
        description:
          "Our nurses and carers are chosen for their calm presence and sensitivity, as well as their clinical experience.",
      },
      {
        title: "Home-Focused Approach",
        description:
          "We support the rhythms, culture, and preferences of your household, not just a roster of tasks.",
      },
      {
        title: "Respect for Choices",
        description:
          "We respect your goals of care, faith, and preferences, and we work in partnership with your wider support network.",
      },
    ],
  },

  faqs: [
    {
      id: "palliative-when-start",
      question: "When is the right time to start palliative care at home?",
      answer:
        "Palliative care can begin alongside treatment, not only at the very end of life. If comfort, quality of life, or support for family is becoming a priority, it may be the right time to talk with us and your treating team.",
    },
    {
      id: "palliative-funding",
      question: "How is palliative home care funded?",
      answer:
        "Funding for palliative support may come from aged care packages, DVA, NDIS, state-funded palliative services, or private payment. We can help you understand options based on your situation.",
    },
    {
      id: "palliative-what-expect",
      question: "What can we expect from palliative visits?",
      answer:
        "Visits focus on comfort, reassurance, and practical support. We’ll monitor symptoms, support personal care, answer questions, and liaise with your palliative care and medical teams as needed.",
    },
  ],

  cta: {
    title: "Talk About Palliative Support at Home",
    description:
      "If you’re considering palliative or end-of-life care at home, contact us so we can explore what support is possible for you and your family.",
  },
};


export const NURSING_CARE_PAGE: ServicePageData = {
  title: "Nursing Care at Home",
  href: "/services/nursing-care",
  snippetAnswer:
    "In-home nursing care is professional clinical support delivered by experienced nurses in your own home, covering wound care, medication management, and health monitoring across Sydney.",
  intro:
    "General nursing care shouldn't feel clinical or rushed. Our experienced nurses take the time to understand your health goals, providing expert support that honours your independence and privacy.",
  evidence: {
    heading: "Quick facts: in-home nursing care with Gentle Care",
    intro: "Citable facts for families, GPs, support coordinators, and discharge planners considering in-home nursing in Sydney.",
    items: [
      { label: "Clinical staffing", value: "Clinical care delivered or supervised by AHPRA-registered nurses with significant Australian healthcare experience.", icon: "credential" },
      { label: "Registration", value: "Registered NDIS provider and DVA Contracted Community Nursing Provider.", icon: "registration" },
      { label: "Service area", value: "Sydney and surrounds, with visits scheduled around real travel distances and household routines.", icon: "area" },
      { label: "Response window", value: "We aim to respond to nursing enquiries within 24 hours during business hours, with urgent referrals prioritised.", icon: "response" },
      { label: "Funding accepted", value: "NDIS, DVA Community Nursing, aged care (Support at Home, CHSP), and private fee-for-service.", icon: "funding" },
      { label: "Scope of nursing", value: "Wound care, medication management, chronic disease monitoring, complex care (PEG, tracheostomy, catheter), post-surgical and palliative support.", icon: "scope" },
    ],
  },

  whoItHelps: {
    title: "Who Nursing Care Is For",
    description:
      "Our nursing services are for anyone requiring professional clinical oversight or technical medical support at home.",
    audiences: [
      "People managing chronic health conditions like diabetes or heart disease",
      "Patients needing professional wound care and dressing changes",
      "Individuals requiring help with medication administration or injections",
      "Families seeking experienced nurse oversight for a loved one's health",
      "NDIS, DVA, and Aged Care participants with clinical needs",
      "Anyone wanting to avoid hospital visits for routine clinical tasks",
    ],
  },

  supportAvailable: {
    title: "Clinical Support Available",
    description:
      "We provide a broad range of clinical nursing services, delivered by experts who prioritise your comfort.",
    features: [
      {
        title: "Wound Management",
        description:
          "Professional assessment and dressing of acute, chronic, or surgical wounds to promote healing and prevent infection.",
      },
      {
        title: "Medication Management",
        description:
          "Administration of medications, including injections and sub-cut infusions, ensuring safety and compliance with your doctor's orders.",
      },
      {
        title: "Health & Vital Monitoring",
        description:
          "Regular checks of blood pressure, blood sugar, oxygen levels, and general wellness to catch health changes early.",
      },
      {
        title: "Continence & Catheter Care",
        description:
          "Professional support for catheter changes and continence management, delivered with absolute discretion and dignity.",
      },
      {
        title: "Chronic Disease Support",
        description:
          "Ongoing clinical management and education for long-term conditions to help you stay well and out of hospital.",
      },
      {
        title: "Clinical Liaison",
        description:
          "We speak the language of your doctors and specialists, ensuring your entire health team is coordinated and informed.",
      },
    ],
  },

  whyChoose: {
    title: "Why Choose Gentle Care for Nursing",
    description:
      "We bring hospital-level expertise into the home with a personalised, person-centred approach.",
    reasons: [
      {
        title: "Expertise You Can Trust",
        description:
          "Led by a care team with strong hands-on experience in community care, aged care, disability support, and nursing services.",
      },
      {
        title: "Calm & Unrushed",
        description:
          "We schedule longer visits so our nurses have time to truly care for you, answer your questions, and coordinate your health.",
      },
      {
        title: "Seamless Coordination",
        description:
          "We work directly with your GP and specialists, taking the stress of health communication off your shoulders.",
      },
    ],
  },

  faqs: [
    {
      id: "nurse-qualification",
      question: "Are your nurses Registered Nurses (RNs)?",
      answer:
        "Yes, all our clinical care is delivered or supervised by AHPRA Registered Nurses with significant experience in Australian healthcare settings.",
    },
    {
      id: "nurse-referral",
      question: "Do I need a doctor's referral for home nursing?",
      answer:
        "While a referral is helpful for coordinating care, you can contact us directly. For some funding streams (like DVA), a specific referral form from your GP may be required.",
    },
    {
      id: "nurse-cost",
      question: "Is home nursing covered by my funding?",
      answer:
        "Yes, nursing care is often covered by NDIS (Disability), DVA Community Nursing (Veterans), and Support at Home (Aged Care). We also offer private-pay options.",
    },
  ],

  cta: {
    title: "Arrange a Clinical Consultation",
    description:
      "Speak with our clinical lead about how our nursing team can support your health at home.",
  },
  relatedCompareSlugs: ["clinician-led-vs-agency-staff"],
  testimonials: [],
};

export const PERSONAL_CARE_PAGE: ServicePageData = {
  title: "Personal Care & Daily Support",
  href: "/services/personal-care",
  snippetAnswer:
    "Personal care is help with the private tasks of daily living, such as bathing, dressing, and grooming, delivered with respect, dignity, and a focus on your choice.",
  intro:
    "Independence starts with feeling good in yourself. Our personal care services provide gentle, respectful assistance with daily routines, ensuring you feel comfortable, confident, and in control of your day.",

  whoItHelps: {
    title: "Who Personal Care Is For",
    description:
      "We support people of all ages who need a helping hand with their daily self-care routines.",
    audiences: [
      "NDIS participants needing support with daily living tasks",
      "Older Australians wanting to maintain independence at home",
      "Veterans requiring assistance through DVA programs",
      "People recovering from surgery or temporary illness",
      "Individuals with mobility challenges or physical disabilities",
      "Families seeking a reliable, respectful carer for a loved one",
    ],
  },

  supportAvailable: {
    title: "How We Can Help",
    description:
      "Our personal care is completely tailored to your preferences, routines, and comfort.",
    features: [
      {
        title: "Showering & Bathing",
        description:
          "Help with showering, sponge baths, or hair washing, always prioritizing your safety and privacy.",
      },
      {
        title: "Dressing & Grooming",
        description:
          "Assistance with choosing outfits, dressing, shaving, and skincare to help you look and feel your best.",
      },
      {
        title: "Mobility & Transfers",
        description:
          "Safe and gentle support moving around your home, getting in and out of bed, or using mobility aids.",
      },
      {
        title: "Oral & Personal Hygiene",
        description:
          "Help with teeth cleaning, continence support, and other private hygiene tasks handled with absolute discretion.",
      },
      {
        title: "Meal Assistance",
        description:
          "Support with set-up, serving, and eating if needed, ensuring you get the nutrition you need comfortably.",
      },
      {
        title: "Skin Integrity Checks",
        description:
          "Our carers are trained to subtly monitor for skin changes, ensuring small issues don't become bigger health problems.",
      },
    ],
  },

  whyChoose: {
    title: "Dignity is Our Priority",
    description:
      "We believe personal care should never feel like a 'transaction'. It should feel like support from someone you trust.",
    reasons: [
      {
        title: "Continuity of Care",
        description:
          "We match you with a consistent carer so you don't have to explain your routines to a new person every week.",
      },
      {
        title: "Respectful & Discreet",
        description:
          "We understand these are private tasks. Our team is trained to provide support with the utmost respect and minimal intrusion.",
      },
      {
        title: "Your Routine, Not Ours",
        description:
          "We follow your lead. If you like things done a certain way or at a certain time, that is exactly how we do it.",
      },
    ],
  },

  faqs: [
    {
      id: "personal-care-choice",
      question: "Can I choose my own carer?",
      answer:
        "Yes. We understand that personal care is intimate. We introduce you to potential carers and ensure they are a good match for your personality and needs.",
    },
    {
      id: "personal-care-duration",
      question: "How long are the visits?",
      answer:
        "Visits are scheduled based on your needs, ranging from a quick 45-minute morning routine to longer sessions of several hours.",
    },
  ],

  cta: {
    title: "Request a Personal Care Plan",
    description:
      "Contact us to discuss how we can help you or your loved one stay independent and well-supported at home.",
  },
};

export const DAILY_LIVING_PAGE: ServicePageData = {
  title: "Assistance with Daily Living",
  href: "/services/assistance-with-daily-living",
  snippetAnswer:
    "Assistance with daily living provides practical help with household tasks, meal preparation, and routines, helping NDIS and aged care participants live more independently at home.",
  intro:
    "A well-supported home is the foundation of independence. We provide practical, reliable help with the domestic tasks that keep your life running smoothly, delivered by a team that respects your home and your preferences.",

  whoItHelps: {
    title: "Who This Support Is For",
    description:
      "Daily living support is ideal for anyone who finds household management challenging or time-consuming.",
    audiences: [
      "NDIS participants with core support funding",
      "Older Australians needing help to maintain their home",
      "People recovering from major surgery or injury",
      "Individuals with physical or cognitive challenges",
      "Busy families needing extra support for a loved one",
      "Anyone wanting to focus on their goals rather than housework",
    ],
  },

  supportAvailable: {
    title: "Practical Support at Home",
    description:
      "We help with the 'little things' that make a big difference to your quality of life.",
    features: [
      {
        title: "Meal Preparation",
        description:
          "Help with planning, cooking, and serving nutritious meals that you enjoy, following your dietary requirements.",
      },
      {
        title: "Light Housekeeping",
        description:
          "Keeping your living areas clean and tidy, including vacuuming, dusting, and general home organization.",
      },
      {
        title: "Laundry & Linen Care",
        description:
          "Washing, drying, and ironing of clothes and bed linens to keep you comfortable and fresh.",
      },
      {
        title: "Grocery Shopping",
        description:
          "Help with creating shopping lists and either accompanying you to the shops or doing the shopping for you.",
      },
      {
        title: "Household Admin",
        description:
          "Assistance with simple tasks like sorting mail, following up on appointments, or organizing your week.",
      },
      {
        title: "Daily Routine Support",
        description:
          "Giving you the structure and help needed to start and end your day successfully.",
      },
    ],
  },

  whyChoose: {
    title: "More Than Just 'Help'",
    description:
      "We view daily living support as a way to empower you, not just to tick off a to-do list.",
    reasons: [
      {
        title: "Respect for Your Space",
        description:
          "We understand we are guests in your home. Our team works with care, discretion, and deep respect for your environment.",
      },
      {
        title: "Building Independence",
        description:
          "We don't just 'do for you'. We work 'with you' to help you maintain or improve your own domestic skills where possible.",
      },
      {
        title: "Reliability you can count on",
        description:
          "We know how important routine is. Our team is always on time, consistent, and ready to help.",
      },
    ],
  },

  faqs: [
    {
      id: "daily-living-ndis",
      question: "Can I use my NDIS Core Supports for this?",
      answer:
        "Yes, Assistance with Daily Life is a standard part of Core Supports in most NDIS plans. We can work with you and your coordinator to set this up.",
    },
    {
      id: "daily-living-frequency",
      question: "How often can I have someone visit?",
      answer:
        "It's completely up to you. Some clients have an hour or two once a week, while others have daily support for several hours.",
    },
  ],

  cta: {
    title: "Simplify Your Daily Life",
    description:
      "Contact us to see how our team can help take the stress out of managing your home.",
  },
};

export const COMMUNITY_PARTICIPATION_PAGE: ServicePageData = {
  title: "Community Participation",
  href: "/services/community-participation",
  snippetAnswer:
    "Community participation support helps individuals with disability or age-related needs engage in social activities, attend appointments, and build connections within their local community.",
  intro:
    "Life happens outside the home. We support you to stay connected with your community, achieve your social goals, and enjoy the activities you love, with a capable and enthusiastic support team by your side.",

  whoItHelps: {
    title: "Who This Support Is For",
    description:
      "Our community support is for anyone wanting to build social confidence or stay active in Sydney.",
    audiences: [
      "NDIS participants wanting to achieve social or recreational goals",
      "Older Australians wishing to stay involved in community groups",
      "Individuals wanting to build confidence in public spaces",
      "People needing transport and support for appointments",
      "Anyone wanting to explore new hobbies or social circles",
      "Families wanting their loved ones to have meaningful community engagement",
    ],
  },

  supportAvailable: {
    title: "Connection & Inclusion",
    description:
      "What does 'participation' look like for you? We help you make it happen.",
    features: [
      {
        title: "Social & Recreational Outings",
        description:
          "Going to the cinema, visiting a park, attending a club, or meeting friends for coffee: your choice, our support.",
      },
      {
        title: "Appointment Support",
        description:
          "Reliable transport and companion support for medical, therapeutic, or personal appointments.",
      },
      {
        title: "Skills & Hobby Building",
        description:
          "Support to attend classes, learn new skills, or pursue hobbies like art, swimming, or gardening.",
      },
      {
        title: "Transport Assistance",
        description:
          "Safe and reliable transport to and from your activities, including help with navigating public transport if that is your goal.",
      },
      {
        title: "Volunteer & Work Support",
        description:
          "Help with getting to and participating in volunteer roles or supported employment opportunities.",
      },
      {
        title: "Building Social Confidence",
        description:
          "Gentle encouragement and practical support to help you feel comfortable in a variety of social settings.",
      },
    ],
  },

  whyChoose: {
    title: "Your Goals, Our Support",
    description:
      "We don't just provide a 'driver'. We provide a support partner who is invested in your social success.",
    reasons: [
      {
        title: "Enthusiastic Support Team",
        description:
          "Our team members are active, engaged, and love helping you achieve your community goals.",
      },
      {
        title: "Flexible & Spontaneous",
        description:
          "While we love a plan, we also understand that social opportunities can be spontaneous. we work to be as flexible as possible.",
      },
      {
        title: "Safety & Confidence",
        description:
          "Our team is fully insured and trained in providing safe community support, allowing you to focus on the fun parts.",
      },
    ],
  },

  faqs: [
    {
      id: "community-transport",
      question: "Do you provide your own transport?",
      answer:
        "Yes, our support workers can use their own insured vehicles to transport you, or we can use your vehicle or public transport: whatever suits you best.",
    },
    {
      id: "community-goals",
      question: "Can you help me achieve my specific NDIS social goals?",
      answer:
        "Absolutely. We work directly with your NDIS plan and your support coordinator to ensure our visits are aligned with your documented goals.",
    },
  ],
  cta: {
    title: "Connect With Your Community",
    description:
      "Tell us what you want to achieve outside the home, and we'll help you find the right support to make it happen.",
  },
};

export const OVERNIGHT_SUPPORT_PAGE: ServicePageData = {
  title: "Overnight Support",
  href: "/services/overnight-support",
  snippetAnswer:
    "Overnight support provides safety and care throughout the night, with options for active overnight nursing or sleepover support to ensure NDIS and aged care participants are well-monitored while they sleep.",
  intro:
    "Peace of mind shouldn't stop when the sun goes down. Our overnight support ensures you or your loved one are safe, monitored, and comfortable throughout the night, delivered by a team trained in nocturnal care and clinical safety.",

  whoItHelps: {
    title: "Who Overnight Support Is For",
    description:
      "This support is designed for families and individuals who need the security of professional care during the night.",
    audiences: [
      "People at risk of falls or wandering during the night",
      "Individuals needing repositioning or regular medication overnight",
      "NDIS participants requiring clinical monitoring while they sleep",
      "Older Australians who feel vulnerable or unsafe living alone at night",
      "Families providing full-time care who need a restful night's sleep",
      "Patients transitioning home from hospital needing short-term night support",
    ],
  },

  supportAvailable: {
    title: "Safety Throughout the Night",
    description:
      "We offer two main models of overnight support, tailored to your specific care needs.",
    features: [
      {
        title: "Active Overnight Care",
        description:
          "The support worker or nurse remains awake throughout the shift to provide continuous monitoring and immediate clinical assistance.",
      },
      {
        title: "Sleepover Support",
        description:
          "The support worker sleeps in your home but is available to provide assistance up to two times during the night as needed.",
      },
      {
        title: "Medication & Hydration",
        description:
          "Ensuring overnight medications are administered on time and hydration is maintained through the night.",
      },
      {
        title: "Toileting & Personal Care",
        description:
          "Gentle assistance with using the bathroom or managing continence, minimizing falls risk in the dark.",
      },
      {
        title: "Safety & Comfort Checks",
        description:
          "Regular, non-intrusive checks to ensure you are comfortable, breathing well, and safe in your environment.",
      },
      {
        title: "Morning & Evening Routines",
        description:
          "Seamless transition from your evening routine to bed, and assistance with your morning routine when you wake.",
      },
    ],
  },

  whyChoose: {
    title: "Sleep With Confidence",
    description:
      "We prioritise your safety and the quality of your sleep, providing a calm and capable presence.",
    reasons: [
      {
        title: "Clinical Oversight",
        description:
          "Even for non-clinical sleepovers, our overnight team has access to our on-call clinical leads if health questions arise.",
      },
      {
        title: "Reliable & Familiar",
        description:
          "We match you with consistent overnight carers so you can feel comfortable and safe having them in your home.",
      },
      {
        title: "Calm & Professional",
        description:
          "Our team is trained to provide overnight support that is discreet and minimally disruptive to your rest.",
      },
    ],
  },

  faqs: [
    {
      id: "overnight-active-vs-sleepover",
      question: "What is the difference between active overnight and sleepover?",
      answer:
        "Active overnight means the staff member is awake and working. Sleepover means they have a bed and sleep, but can be woken for limited assistance.",
    },
    {
      id: "overnight-funding",
      question: "Is overnight support funded by NDIS?",
      answer:
        "Yes, NDIS plans often include funding for overnight support under Core Supports, specifically for 'assistance with daily life'.",
    },
  ],

  cta: {
    title: "Secure Your Overnight Care",
    description:
      "Contact us to discuss which model of overnight support is right for you or your loved one.",
  },
};
