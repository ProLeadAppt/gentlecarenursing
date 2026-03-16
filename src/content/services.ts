/**
 * Service definitions and full page content.
 * Single source of truth for all service pages.
 */

import type { ServicePageData } from "@/components/sections/ServicePageLayout";

export interface ServiceDefinition {
  slug: string;
  title: string;
  shortDescription: string;
  href: string;
}

export const SERVICES: ServiceDefinition[] = [
  {
    slug: "ndis",
    title: "NDIS Services",
    shortDescription:
      "Registered NDIS provider. Personalised support for NDIS participants.",
    href: "/ndis",
  },
  {
    slug: "dva",
    title: "DVA & Community Nursing",
    shortDescription:
      "Community nursing and DVA-funded care for veterans.",
    href: "/dva",
  },
  {
    slug: "aged-care",
    title: "Aged Care / Support at Home",
    shortDescription: "In-home support for older Australians.",
    href: "/aged-care",
  },
  {
    slug: "private-nursing",
    title: "Private Nursing & Personal Care",
    shortDescription: "Private in-home nursing and personal care.",
    href: "/private-nursing",
  },
];

// ---------------------------------------------------------------------------
// Full page content for each service
// ---------------------------------------------------------------------------

export const NDIS_PAGE: ServicePageData = {
  title: "NDIS Services",
  href: "/ndis",
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
};

export const DVA_PAGE: ServicePageData = {
  title: "DVA & Community Nursing",
  href: "/dva",
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
};

export const AGED_CARE_PAGE: ServicePageData = {
  title: "Aged Care / Support at Home",
  href: "/aged-care",
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
};

export const PRIVATE_NURSING_PAGE: ServicePageData = {
  title: "Private Nursing & Personal Care",
  href: "/private-nursing",
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
};
