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
    slug: "ndis",
    title: "NDIS Services",
    benefitLine: "Make NDIS care feel simpler, safer, and better coordinated.",
    shortDescription:
      "Registered NDIS provider. Personalised support for NDIS participants.",
    href: "/ndis",
  },
  {
    slug: "dva",
    title: "DVA & Community Nursing",
    benefitLine: "Support veterans and their families with respectful, timely nursing at home.",
    shortDescription:
      "Community nursing and DVA-funded care for veterans.",
    href: "/dva",
  },
  {
    slug: "aged-care",
    title: "Aged Care / Support at Home",
    benefitLine: "Help older Australians stay safe, comfortable, and independent at home.",
    shortDescription: "In-home support for older Australians.",
    href: "/aged-care",
  },
  {
    slug: "private-nursing",
    title: "Private Nursing & Personal Care",
    benefitLine: "Access flexible, high-quality private nursing when you need it.",
    shortDescription: "Private in-home nursing and personal care.",
    href: "/private-nursing",
  },
  {
    slug: "post-hospital-care",
    title: "Post-Hospital Nursing & Care",
    benefitLine: "Support recovery at home after a hospital stay, with skilled nursing and personal care.",
    shortDescription:
      "Short-term and ongoing in-home nursing and care after hospital discharge.",
    href: "/services/post-hospital-care",
  },
  {
    slug: "complex-care",
    title: "Complex Clinical Care at Home",
    benefitLine: "Specialised in-home nursing for people with complex health needs.",
    shortDescription:
      "Tracheostomy care, PEG feeding, catheter management, wound care, and other complex nursing at home.",
    href: "/services/complex-care",
  },
  {
    slug: "hospital-at-home",
    title: "Hospital-at-Home & Step-Down Care",
    benefitLine: "Bridge the gap between hospital and home with coordinated, hospital-level nursing support at home.",
    shortDescription:
      "Hospital-at-home and step-down care so you can safely leave hospital sooner and continue recovery at home.",
    href: "/services/hospital-at-home",
  },
  {
    slug: "palliative-care",
    title: "Palliative & End-of-Life Support at Home",
    benefitLine: "Compassionate palliative and end-of-life support so more of your time can be spent together at home.",
    shortDescription:
      "Palliative and end-of-life nursing support at home, focused on comfort, dignity, and support for families.",
    href: "/services/palliative-care",
  },
];

// ---------------------------------------------------------------------------
// Full page content for each service
// ---------------------------------------------------------------------------

export const NDIS_PAGE: ServicePageData = {
  title: "NDIS Services",
  href: "/ndis",
  snippetAnswer:
    "NDIS in-home nursing is skilled nursing and personal care at home for NDIS participants, delivered by a registered NDIS provider like Gentle Care Nursing across Sydney.",
  intro:
    "As a registered NDIS provider, Gentle Care Nursing delivers personalised in-home nursing and support for NDIS participants. We work closely with participants, families, and support coordinators to provide high-quality care that helps people live more independently.",

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
          "Skilled registered nurses delivering clinical care in your home: medication management, wound care, health monitoring, and more.",
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
        title: "Fast, Easy Referrals",
        description:
          "Simple referral process with quick turnaround. We respond to enquiries within 24–48 hours.",
      },
    ],
  },

  faqs: [
    {
      id: "ndis-registered",
      question: "Is Gentle Care Nursing a registered NDIS provider?",
      answer:
        "Yes. Gentle Care Nursing is a fully registered NDIS provider. We meet all quality and safety standards required by the NDIS Quality and Safeguards Commission.",
    },
    {
      id: "ndis-get-started",
      question: "How do I get started with NDIS services?",
      answer:
        "You or your support coordinator can submit an enquiry through our Request Care form. We'll review your needs and respond within 24–48 hours to discuss how we can help.",
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
    "DVA community nursing is in-home nursing and care for veterans and war widows, funded by the Department of Veterans' Affairs and delivered by registered providers like Gentle Care Nursing in Sydney.",
  intro:
    "Gentle Care Nursing is a registered DVA community nursing provider. We deliver in-home nursing and personal care for veterans, war widows, and their families, helping them stay comfortable, independent, and well-supported at home.",

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
          "Registered nurses providing clinical care at home: wound management, medication administration, health assessments, and chronic disease monitoring.",
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
          "Specialist wound assessment and management by experienced registered nurses in the comfort of your home.",
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
        title: "Registered DVA Provider",
        description:
          "We are a registered DVA community nursing provider. Claims are handled directly. No out-of-pocket costs for eligible veterans.",
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
  caseStories: [
    {
      title: "Case example: Supporting a veteran to remain at home",
      summary:
        "A veteran with chronic heart and lung disease wanted to avoid moving into residential care. Through DVA community nursing, Gentle Care provided regular visits for medication management, wound care, and monitoring of breathlessness and fluid changes. We kept their GP informed and helped the family understand when to seek extra review. With this support, they were able to stay at home comfortably for much longer than they expected.",
    },
  ],
};

export const AGED_CARE_PAGE: ServicePageData = {
  title: "Aged Care / Support at Home",
  href: "/aged-care",
  snippetAnswer:
    "Aged care at home includes in-home nursing and personal care for older Australians, including Home Care Package and CHSP support, so you or your loved one can age safely and comfortably at home.",
  intro:
    "Gentle Care Nursing helps older Australians stay safe, comfortable, and independent at home. We provide in-home nursing and personal care that supports ageing in place, so families can feel confident their loved ones are well looked after.",

  whoItHelps: {
    title: "Who This Is For",
    description:
      "Our aged care services support older Australians and the families and professionals who care for them.",
    audiences: [
      "Older Australians wanting to stay at home",
      "Families looking for in-home care for a parent or relative",
      "Home Care Package recipients",
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
          "Registered nurses providing clinical care at home: medication management, wound care, health monitoring, and chronic disease support.",
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
        "We work with Home Care Packages (Levels 1–4), the Commonwealth Home Support Programme (CHSP), and private funding. Your aged care assessment team (ACAT/ACAS) can help determine your eligibility for government-funded support.",
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
    "When you need nursing or personal care outside of funded programs, Gentle Care Nursing provides private in-home services tailored to your needs. No waitlists, no complex applications. Just quality care when you need it.",

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
          "Registered nurses providing clinical care at home: wound care, injections, health assessments, medication management, and post-surgical support.",
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
      "Private care should feel premium, because you're choosing it and you deserve the best.",
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
    "Post-hospital in-home nursing is support from qualified nurses and carers after someone leaves hospital, so recovery continues safely at home. Gentle Care Nursing coordinates with hospital discharge teams and families to start visits quickly across Sydney.",
  intro:
    "Leaving hospital can feel overwhelming. Our post-hospital nursing and care at home service helps you or your loved one recover safely and comfortably, with skilled support and clear communication from day one.",

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
          "Registered nurses provide wound care, medication management, observations, and chronic disease monitoring so your recovery stays on track.",
      },
      {
        title: "Personal Care and Daily Support",
        description:
          "Help with bathing, dressing, mobility, toileting, and meals to reduce falls risk and make day-to-day life easier while you regain strength.",
      },
      {
        title: "Short-Term Intensive Support",
        description:
          "More frequent visits in the first 1–2 weeks after discharge, tapering as you become more confident and independent at home.",
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
        "In many cases we can begin visits within 24–48 hours of receiving your referral or enquiry, depending on your location and care needs. We confirm start dates and visit frequency with you before you leave hospital where possible.",
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
        "Yes, in many cases. Post-hospital support may be funded through NDIS, DVA community nursing, Home Care Packages, CHSP, or paid privately. We can talk through your situation and help you understand which funding streams may apply.",
    },
  ],

  cta: {
    title: "Arrange Post-Hospital Nursing & Care",
    description:
      "Tell us about your upcoming or recent hospital stay and we'll help you plan safe, supportive care at home.",
  },
  testimonials: [
    {
      quote:
        "Gentle Care made coming home from hospital so much less stressful. The nurses were calm, organised, and helped us understand exactly what to do between visits.",
      name: "Linda R.",
      role: "Daughter of post-surgical client, Inner West",
      rating: 5,
    },
  ],
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
    "Complex clinical care at home means specialised nursing for people with higher health needs, such as tracheostomy care, PEG feeding, catheter management, and complex wound care, delivered safely in their own home.",
  intro:
    "Many people with higher health needs can live safely at home with the right support. Our complex clinical care service brings experienced nurses to you, so advanced care can continue in a familiar, comfortable environment.",

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
        "Complex care can often be funded under NDIS, DVA community nursing, or Home Care Packages, depending on your situation and assessments. We can work with your coordinator or case manager to clarify funding options.",
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
  testimonials: [
    {
      quote:
        "Our son’s tracheostomy care at home felt daunting until Gentle Care became involved. Their clinical skill and steady presence made everyday life feel possible again.",
      name: "Marc & Elise T.",
      role: "Parents of NDIS participant, North Shore",
      rating: 5,
    },
  ],
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
    "Hospital-at-home and step-down care means receiving hospital-level nursing and personal care at home after an admission, so you can leave hospital sooner while your recovery continues safely with skilled support.",
  intro:
    "Some people are ready to leave hospital but still need more support than a standard discharge offers. Our hospital-at-home and step-down care service brings experienced nurses and carers to you, so you can keep recovering in the comfort of your own home.",

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
          "Registered nurses provide observations, medication management, wound care, and other nursing tasks according to your discharge plan.",
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
    "Palliative and end-of-life care at home focuses on comfort, symptom management, and emotional support so you and your family can spend more time together in a familiar environment.",
  intro:
    "Facing a serious illness or the end of life is never easy. Our palliative and end-of-life support at home focuses on comfort, dignity, and calm, working alongside your treating team so more of your energy can go into being together.",

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

