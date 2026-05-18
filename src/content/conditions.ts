/**
 * Condition-specific in-home care pages.
 *
 * Each entry targets a low-competition, decent-volume search lane in Sydney
 * for a specific clinical condition. These are individually low-volume but
 * cumulatively significant, and no Sydney provider has saturated them.
 *
 * Reuses ServicePageData / ServicePageLayout — these are functionally
 * "services for people with X condition", and the page shape is
 * identical to the existing /services/* pages. The only structural
 * difference is the route (/conditions/[slug]) and the breadcrumb parent
 * label ("Conditions" instead of "Services"), handled via the
 * breadcrumbParent override on ServicePageData.
 *
 * Voice rules apply (per .agents/product-marketing-context.md):
 *   - "Experienced nurses" / "skilled nurses" outside regulatory contexts
 *   - "AHPRA-registered nurse" only inside clinical scope claims
 *   - DVA wording exact when named
 *   - No "guarantee", no "boutique", no "premium"
 *   - "We aim to respond within 24 hours" / "prioritised"
 *   - No specific years/duration claims
 *
 * Factual-basis guardrails (every clinical claim has to anchor here):
 *   - Specialist services and clinics named are real Sydney services
 *   - Procedures listed match what GCN actually delivers (no scope expansion)
 *   - Funding statements stay general — "NDIS for participants under 65",
 *     "aged care for 65+", etc. No specific item numbers or rates.
 */

import type { ServicePageData } from "@/components/sections/ServicePageLayout";

export interface ConditionEntry {
  /** URL slug — /conditions/{slug} */
  slug: string;
  /** Page data, mirroring ServicePageData shape */
  data: ServicePageData;
}

const BREADCRUMB_PARENT = { label: "Conditions", href: "/conditions" };

export const CONDITIONS: readonly ConditionEntry[] = [
  // -------------------------------------------------------------------------
  // Multiple Sclerosis (MS)
  // -------------------------------------------------------------------------
  {
    slug: "multiple-sclerosis",
    data: {
      title: "In-Home Nursing & Care for Multiple Sclerosis (MS) in Sydney",
      href: "/conditions/multiple-sclerosis",
      breadcrumbParent: BREADCRUMB_PARENT,
      snippetAnswer:
        "In-home nursing for multiple sclerosis (MS) across Sydney provides specialist nursing and personal care for people living with MS — medication support, mobility and fatigue management, continence and catheter care, and help navigating relapses safely at home — coordinated with Sydney MS clinics and neurology teams at RPA, RNSH, and Concord.",
      intro:
        "MS is a long, changing condition. Our in-home nursing and personal care across Sydney is designed to support people living with MS through both the steady periods and the harder ones — working alongside specialist MS clinics and neurology teams at RPA, Royal North Shore, and Concord, and tailoring care as needs change rather than following a fixed plan.",
      evidence: {
        heading: "Quick facts: in-home MS care with Gentle Care",
        intro: "Citable facts for people living with MS, families, MS Australia coordinators, and Sydney neurologists arranging in-home support.",
        items: [
          { label: "Service area", value: "Sydney and surrounds — Inner West, North Shore, Northern Beaches, Western Sydney, South Sydney, CBD and East.", icon: "area" },
          { label: "Specialist coordination", value: "We work alongside Sydney MS clinics and neurology teams at RPA, Royal North Shore, Concord, and other tertiary services.", icon: "credential" },
          { label: "Response window", value: "Enquiries acknowledged within 24 hours during business hours, with relapse-period referrals prioritised.", icon: "response" },
          { label: "Funding accepted", value: "NDIS (participants under 65 at first plan), aged care (Support at Home, CHSP for 65+), DVA Community Nursing, and private fee-for-service.", icon: "funding" },
          { label: "Scope of support", value: "Medication management (including disease-modifying therapies), continence and catheter care, fatigue and mobility support, pressure care, and family education.", icon: "scope" },
          { label: "Caseload model", value: "Small caseload so the same experienced nurses get to know each person's MS pattern — what's a bad day versus what warrants escalation.", icon: "credential" },
        ],
      },
      whoItHelps: {
        title: "Who In-Home MS Care Is For",
        description:
          "In-home MS support suits people at every stage of MS who want to manage at home with the right clinical backup.",
        audiences: [
          "Adults newly diagnosed with MS needing help to set up routines at home",
          "People living with relapsing-remitting MS navigating relapses safely",
          "People with progressive MS needing more daily personal and clinical support",
          "NDIS participants whose plan funds MS-related support and complex care",
          "Older Australians on aged care packages whose MS sits alongside other conditions",
          "Families wanting respite and education on safely supporting a partner or parent",
        ],
      },
      supportAvailable: {
        title: "Types of MS Support We Provide",
        description:
          "We tailor MS care to where you are right now — the right level of support, working alongside your MS team and GP.",
        features: [
          {
            title: "Medication and Symptom Management",
            description:
              "Support with disease-modifying therapies, symptom medications, and the practical side of staying on a complex regime — without making medical decisions outside your treating team.",
          },
          {
            title: "Continence and Catheter Care",
            description:
              "Catheter management (indwelling or intermittent), continence support, and bladder/bowel routines that work for your day, with escalation pathways to your specialist.",
          },
          {
            title: "Mobility, Fatigue and Falls Prevention",
            description:
              "Practical support around transfers, mobility aids, energy management, and home safety — particularly important during relapse recovery and progression.",
          },
          {
            title: "Pressure Care and Skin Integrity",
            description:
              "Regular monitoring of pressure points, repositioning support, and early escalation of skin changes — vital when mobility is reduced.",
          },
          {
            title: "Family Education and Respite",
            description:
              "Guidance for partners and family on safe transfers, when symptom changes warrant a GP/neurology review, and respite so primary carers can rest.",
          },
        ],
      },
      whyChoose: {
        title: "Why Choose Gentle Care for MS",
        description:
          "MS doesn't follow a template, and neither does good MS care.",
        reasons: [
          {
            title: "Consistent Nurses Across Relapses",
            description:
              "Our deliberately small caseload means the same nurses see you through good and harder periods — they learn your baseline so they notice when something's changed.",
          },
          {
            title: "Coordinated With Your Treating Team",
            description:
              "We work from neurologist and GP plans, communicate with your MS clinic team, and document changes that matter so everyone is in the loop.",
          },
          {
            title: "Prompt Response",
            description:
              "We aim to respond within 24 hours during business hours, with relapse-period referrals prioritised.",
          },
        ],
      },
      faqs: [
        {
          id: "ms-funding",
          question: "How is in-home MS care funded in Sydney?",
          answer:
            "Funding usually comes from NDIS (for participants who entered the scheme under 65), aged care packages such as Support at Home or CHSP (for people 65+), DVA Community Nursing (for eligible Veteran Card holders), or private fee-for-service. Your support coordinator, aged care assessor, or GP can confirm which applies.",
        },
        {
          id: "ms-relapse",
          question: "Can you support someone during an MS relapse at home?",
          answer:
            "Yes, where it's clinically safe. Our nurses work alongside your neurology team to support symptom management, mobility, and personal care during relapses — and escalate quickly to your specialist or GP if anything warrants in-person review. We do not replace acute care; we complement it.",
        },
        {
          id: "ms-pediatric",
          question: "Do you support younger people and families navigating MS?",
          answer:
            "Yes. MS often presents in younger adults, and our team works with NDIS participants from their late teens onwards. We coordinate with NDIS plan managers and support coordinators to make sure care fits the participant's goals, not just clinical tasks.",
        },
      ],
      cta: {
        title: "Discuss in-home MS support",
        description:
          "Tell us where you're at — newly diagnosed, navigating a relapse, or supporting progressive MS — and we'll talk through practical options for care at home.",
      },
      relatedGuideSlugs: ["support-for-family-carers-and-burnout"],
    },
  },

  // -------------------------------------------------------------------------
  // Motor Neurone Disease (MND)
  // -------------------------------------------------------------------------
  {
    slug: "motor-neurone-disease",
    data: {
      title: "In-Home Nursing & Care for Motor Neurone Disease (MND) in Sydney",
      href: "/conditions/motor-neurone-disease",
      breadcrumbParent: BREADCRUMB_PARENT,
      snippetAnswer:
        "In-home nursing for motor neurone disease (MND) across Sydney provides specialist nursing and progressive care planning — PEG feeding, tracheostomy and suctioning support, non-invasive ventilation management, symptom relief, and family education — coordinated with Sydney MND clinics, neurology teams, and specialist palliative care services.",
      intro:
        "MND moves quickly, and the care plan needs to keep up. Our in-home nursing across Sydney supports people living with MND and their families through every stage — coordinating with Sydney MND specialist services, neurology teams at RPA and other tertiary hospitals, and specialist palliative care providers, with a small consistent team that learns the household and adapts as needs change.",
      evidence: {
        heading: "Quick facts: in-home MND care with Gentle Care",
        intro: "Citable facts for people living with MND, families, MND NSW coordinators, neurologists, and palliative care teams arranging in-home support.",
        items: [
          { label: "Service area", value: "Sydney and surrounds — Inner West, North Shore, Northern Beaches, Western Sydney, South Sydney, CBD and East.", icon: "area" },
          { label: "Specialist coordination", value: "We work alongside Sydney MND specialist clinics, hospital neurology teams (RPA, RNSH, Westmead), and specialist palliative care services.", icon: "credential" },
          { label: "Response window", value: "MND referrals prioritised, with visits often starting within 24 to 48 hours of referral given the pace of progression.", icon: "response" },
          { label: "Funding accepted", value: "NDIS (under 65 at first plan), aged care (65+, Support at Home / CHSP), DVA Community Nursing, and private fee-for-service.", icon: "funding" },
          { label: "Scope of support", value: "PEG feeding, tracheostomy and suctioning support, non-invasive ventilation (BiPAP) management, symptom relief, personal care with dignity, and family education.", icon: "scope" },
          { label: "Care model", value: "Small, consistent team across the disease course — including the final stages when family support matters most.", icon: "credential" },
        ],
      },
      whoItHelps: {
        title: "Who In-Home MND Care Is For",
        description:
          "In-home MND care is for people at every stage of the disease who want to remain at home for as long as it's safe, and the families and care teams supporting them.",
        audiences: [
          "Adults recently diagnosed with MND needing help to plan home support",
          "People in mid-stage MND needing PEG feeding, suctioning, or BiPAP support at home",
          "People in advanced MND wanting to remain at home with specialist palliative coordination",
          "NDIS participants whose plan includes MND-related complex care",
          "Families needing respite, guidance, and confidence to support a loved one at home",
          "Veterans accessing DVA-funded community nursing for MND-related needs",
        ],
      },
      supportAvailable: {
        title: "Types of MND Support We Provide",
        description:
          "We tailor MND care to the stage of disease and what matters most to the person and family at that point.",
        features: [
          {
            title: "PEG Feeding and Enteral Nutrition Support",
            description:
              "PEG site care, enteral feeding regimes, flushing, and tolerance monitoring delivered in line with dietitian and medical team instructions.",
          },
          {
            title: "Tracheostomy Care and Suctioning Support",
            description:
              "Airway care, suctioning support, stoma site monitoring, and tube changes as directed by the treating team — delivered in the home by experienced nurses.",
          },
          {
            title: "Non-Invasive Ventilation (BiPAP) Support",
            description:
              "Practical support for BiPAP use at home — mask fit, settings checks following the respiratory team's plan, and family education on safe use.",
          },
          {
            title: "Symptom Management and Comfort",
            description:
              "Regular monitoring and support for symptom management — pain, secretions, anxiety, sleep — in coordination with your MND specialist and palliative care team.",
          },
          {
            title: "Family Education and Respite",
            description:
              "Practical guidance for family on transfers, suctioning if appropriate, what to watch for, and structured respite so primary carers can sleep and rest.",
          },
        ],
      },
      whyChoose: {
        title: "Why Choose Gentle Care for MND",
        description:
          "MND care requires clinical skill, calm presence, and the ability to plan ahead as the disease progresses.",
        reasons: [
          {
            title: "Experienced Clinical Team",
            description:
              "Our nurses have hands-on experience with PEG, tracheostomy, BiPAP, and progressive neurological conditions in the community — so we're not learning your equipment as we go.",
          },
          {
            title: "Calm, Consistent Presence",
            description:
              "Small caseload means the same nurses see you and your family through changes — important for trust and confidence at this stage of life.",
          },
          {
            title: "Coordinated With Your MND Team",
            description:
              "We work from MND clinic and specialist plans, liaise with palliative care services, and communicate changes that matter — so the plan stays current.",
          },
        ],
      },
      faqs: [
        {
          id: "mnd-funding",
          question: "How is in-home MND care funded in Sydney?",
          answer:
            "Funding can come from NDIS (for participants under 65 at first plan), aged care packages (Support at Home or CHSP for 65+), DVA Community Nursing for eligible Veteran Card holders, or private fee-for-service. MND often requires intensive funding, and your MND clinic team or support coordinator can help argue for appropriate plan levels.",
        },
        {
          id: "mnd-end-of-life",
          question: "Can you support end-of-life care at home for MND?",
          answer:
            "Yes, where it's clinically safe and the family wishes it. We coordinate with specialist palliative care services across Sydney for symptom management, comfort care, and family support in the final stages. We don't replace specialist palliative care — we complement it with consistent in-home nursing presence.",
        },
        {
          id: "mnd-equipment",
          question: "Are your nurses experienced with PEG, BiPAP, and tracheostomy at home?",
          answer:
            "Yes. Our nurses have hands-on experience with PEG feeding, tracheostomy care including suctioning, and supporting non-invasive ventilation (BiPAP) use at home. We work from the treating team's plans and don't make autonomous clinical decisions outside that scope.",
        },
      ],
      cta: {
        title: "Discuss in-home MND support",
        description:
          "Tell us about your situation and we'll talk through what safe, consistent in-home care could look like — at the stage you're at now and as needs change.",
      },
      relatedGuideSlugs: ["support-for-family-carers-and-burnout"],
    },
  },

  // -------------------------------------------------------------------------
  // Parkinson's Disease
  // -------------------------------------------------------------------------
  {
    slug: "parkinsons-disease",
    data: {
      title: "In-Home Nursing & Care for Parkinson's Disease in Sydney",
      href: "/conditions/parkinsons-disease",
      breadcrumbParent: BREADCRUMB_PARENT,
      snippetAnswer:
        "In-home nursing for Parkinson's disease across Sydney provides personalised support for people living with Parkinson's — careful medication timing (which matters more in Parkinson's than almost any other condition), falls prevention, swallowing safety, and help managing both motor and non-motor symptoms — coordinated with Sydney movement disorder clinics at RPA, RNSH, and other tertiary services.",
      intro:
        "Parkinson's is more than the tremor it's often associated with — it's a complex condition where medication timing, falls risk, swallowing, sleep, and mood all matter together. Our in-home nursing and personal care across Sydney supports people living with Parkinson's and their families, working alongside movement disorder specialists at RPA, Royal North Shore, and other Sydney teams.",
      evidence: {
        heading: "Quick facts: in-home Parkinson's care with Gentle Care",
        intro: "Citable facts for people living with Parkinson's, families, aged care assessors, neurologists, and Parkinson's NSW coordinators arranging in-home support.",
        items: [
          { label: "Service area", value: "Sydney and surrounds — Inner West, North Shore, Northern Beaches, Western Sydney, South Sydney, CBD and East.", icon: "area" },
          { label: "Specialist coordination", value: "We work alongside Sydney movement disorder clinics at RPA, Royal North Shore, St Vincent's, and other tertiary neurology services.", icon: "credential" },
          { label: "Response window", value: "Enquiries acknowledged within 24 hours during business hours, with post-fall and post-hospital referrals prioritised.", icon: "response" },
          { label: "Funding accepted", value: "Aged care (Support at Home / CHSP for most people 65+), DVA Community Nursing, NDIS (for people under 65 with significant disability), and private fee-for-service.", icon: "funding" },
          { label: "Scope of support", value: "Precise medication timing, falls prevention, swallowing safety, mobility and transfer support, personal care, and non-motor symptom monitoring (sleep, mood, cognition).", icon: "scope" },
          { label: "Caseload model", value: "Small caseload so the same nurses learn each person's 'on' and 'off' patterns — vital for safe care planning around medication windows.", icon: "credential" },
        ],
      },
      whoItHelps: {
        title: "Who In-Home Parkinson's Care Is For",
        description:
          "Parkinson's home care helps anyone who's finding daily routines harder, and the families supporting them.",
        audiences: [
          "Older adults recently diagnosed with Parkinson's wanting to stay safe at home",
          "People with mid-stage Parkinson's needing help with medication timing and mobility",
          "People with advanced Parkinson's needing personal care, swallowing safety, and falls support",
          "Veterans accessing DVA-funded community nursing for Parkinson's-related needs",
          "Families needing guidance on 'on' and 'off' periods and when to escalate",
          "Younger-onset Parkinson's NDIS participants needing personalised in-home support",
        ],
      },
      supportAvailable: {
        title: "Types of Parkinson's Support We Provide",
        description:
          "We tailor care to where Parkinson's sits in someone's life — early independence support, mid-stage daily help, or advanced complex care.",
        features: [
          {
            title: "Medication Timing and Management",
            description:
              "Support with the exacting Parkinson's medication schedule — getting doses on time matters because being late can trigger 'off' periods, falls, and swallowing risk. We work from the neurologist's plan and don't adjust without consultation.",
          },
          {
            title: "Falls Prevention and Mobility Support",
            description:
              "Practical home assessments for thresholds, rugs, bathroom transfers, and mobility aids — falls are the leading cause of injury and hospital admission in Parkinson's.",
          },
          {
            title: "Swallowing Safety and Mealtime Support",
            description:
              "Support at mealtimes for safe swallowing, modified diet implementation per speech pathologist's plan, and monitoring for aspiration signs.",
          },
          {
            title: "Personal Care With Dignity",
            description:
              "Gentle assistance with bathing, dressing, grooming, and toileting — timed around the person's 'on' periods wherever possible so they can do as much as they're able.",
          },
          {
            title: "Non-Motor Symptom Monitoring",
            description:
              "Watching for changes in sleep, mood, cognition, blood pressure, and continence — non-motor symptoms can affect quality of life as much as motor symptoms and often warrant specialist review.",
          },
        ],
      },
      whyChoose: {
        title: "Why Choose Gentle Care for Parkinson's",
        description:
          "Good Parkinson's care depends on consistency — the same nurses recognising someone's patterns over time.",
        reasons: [
          {
            title: "Consistency Across Visits",
            description:
              "Small caseload means the same experienced nurses get to know each person's medication response, 'on' and 'off' windows, and what's a bad day versus a real change.",
          },
          {
            title: "Coordinated With Movement Disorder Teams",
            description:
              "We work from neurologist and movement disorder clinic plans, document changes that matter, and communicate with treating teams so reviews are well-informed.",
          },
          {
            title: "Falls and Safety Focus",
            description:
              "Falls prevention runs through everything we do — from bathroom transfers to mobility aids to home environment changes.",
          },
        ],
      },
      faqs: [
        {
          id: "parkinsons-funding",
          question: "How is in-home Parkinson's care funded in Sydney?",
          answer:
            "For most people living with Parkinson's (usually 65+), funding comes through aged care packages such as Support at Home or CHSP. Veterans access DVA Community Nursing. Younger-onset Parkinson's (under 65 at first NDIS plan) is often funded under NDIS. Private fee-for-service is also an option, including as a top-up to funded care.",
        },
        {
          id: "parkinsons-medication",
          question: "Can your nurses manage Parkinson's medication timing?",
          answer:
            "Yes. We work from the prescribing neurologist's medication plan and support people to take medications on schedule — which matters more in Parkinson's than almost any other condition because being late can trigger 'off' periods, falls, and swallowing risk. We don't adjust doses without the treating team.",
        },
        {
          id: "parkinsons-falls",
          question: "How do you help with falls prevention?",
          answer:
            "Falls prevention runs through every visit — we look at the home environment (rugs, lighting, thresholds), support safe transfers and mobility, escort to higher-risk activities like bathing, and watch for signs that medication timing or 'off' periods are contributing to instability so the GP or neurologist can review.",
        },
      ],
      cta: {
        title: "Discuss in-home Parkinson's support",
        description:
          "Tell us about your situation — newly diagnosed, managing mid-stage Parkinson's, or supporting someone with advanced Parkinson's — and we'll talk through practical home care options.",
      },
    },
  },

  // -------------------------------------------------------------------------
  // Spinal Cord Injury
  // -------------------------------------------------------------------------
  {
    slug: "spinal-cord-injury",
    data: {
      title: "In-Home Nursing & Care for Spinal Cord Injury in Sydney",
      href: "/conditions/spinal-cord-injury",
      breadcrumbParent: BREADCRUMB_PARENT,
      snippetAnswer:
        "In-home nursing for spinal cord injury (SCI) across Sydney provides skilled support for daily routines, bowel and bladder management, pressure injury prevention, autonomic dysreflexia awareness, and respiratory support — coordinated with Royal Rehab (Ryde) and the Prince of Wales Hospital Spinal Cord Injury Service.",
      intro:
        "After spinal cord injury, getting home is often the goal — but doing it safely needs the right clinical backup. Our in-home nursing across Sydney supports people living with SCI, working alongside Royal Rehab (Ryde) and the Prince of Wales Hospital Spinal Cord Injury Service — the two main Sydney inpatient SCI rehab pathways — and continuing the disciplined routines that protect skin, bowel, bladder, and respiratory health long-term.",
      evidence: {
        heading: "Quick facts: in-home SCI care with Gentle Care",
        intro: "Citable facts for people living with SCI, families, NDIS support coordinators, SCI specialists, and discharge planners arranging in-home support.",
        items: [
          { label: "Service area", value: "Sydney and surrounds — Inner West, North Shore, Northern Beaches, Western Sydney, South Sydney, CBD and East.", icon: "area" },
          { label: "Specialist coordination", value: "We work alongside Royal Rehab (Ryde), the POW Spinal Cord Injury Service, and community SCI teams across Sydney.", icon: "credential" },
          { label: "Response window", value: "Discharge-from-rehab referrals prioritised, with structured visit schedules confirmed before discharge wherever possible.", icon: "response" },
          { label: "Funding accepted", value: "NDIS (most SCI participants), DVA Community Nursing, aged care (for older participants), private fee-for-service, and ILC funding where applicable.", icon: "funding" },
          { label: "Scope of support", value: "Bowel and bladder management, indwelling and intermittent catheter care, pressure injury monitoring and prevention, autonomic dysreflexia awareness, respiratory support including suctioning where indicated, and personal care.", icon: "scope" },
          { label: "Care model", value: "Routines protect long-term SCI health — the same nurses, doing the same checks, on schedule. Small caseload makes that possible.", icon: "credential" },
        ],
      },
      whoItHelps: {
        title: "Who In-Home SCI Care Is For",
        description:
          "Our SCI in-home support is designed for people at every stage after spinal cord injury — recent discharge, established home routines, or new complications.",
        audiences: [
          "Adults recently discharged from Royal Rehab or POW SCI Service setting up home routines",
          "NDIS participants with established SCI needing daily personal and clinical support",
          "People with tetraplegia needing more intensive personal and respiratory support",
          "People with paraplegia needing support with bowel, bladder, pressure care, and transfers",
          "Veterans with SCI accessing DVA Community Nursing alongside other funded care",
          "Families wanting structured education and respite around SCI routines",
        ],
      },
      supportAvailable: {
        title: "Types of SCI Support We Provide",
        description:
          "We tailor SCI care to the person's level of injury and goals, working from the rehab and specialist plans set up at Royal Rehab or POW.",
        features: [
          {
            title: "Bowel and Bladder Management",
            description:
              "Catheter care (indwelling or intermittent), bladder routines, bowel program support, and early escalation of changes that could indicate infection or autonomic dysreflexia.",
          },
          {
            title: "Pressure Injury Prevention",
            description:
              "Regular pressure point monitoring, repositioning support, transfer technique, and skin care — the core of long-term SCI health and the highest-priority preventive routine.",
          },
          {
            title: "Autonomic Dysreflexia Awareness",
            description:
              "For people with injury at T6 or above, our nurses watch for signs of autonomic dysreflexia, document triggers, and escalate immediately to the GP, SCI service, or emergency services when indicated.",
          },
          {
            title: "Respiratory Support",
            description:
              "For people with higher-level injuries, suctioning support, secretion management, and monitoring of breathing — coordinated with the SCI respiratory team.",
          },
          {
            title: "Personal Care and Transfers",
            description:
              "Skilled help with bathing, dressing, hoisting and transfers, and daily routines — preserving dignity and protecting carer (and client) backs.",
          },
        ],
      },
      whyChoose: {
        title: "Why Choose Gentle Care for SCI",
        description:
          "SCI care depends on consistent, disciplined routines and the same nurses noticing small changes early.",
        reasons: [
          {
            title: "Same Nurses Across Routines",
            description:
              "Pressure care, bowel programs, and catheter management all benefit from continuity — the same nurses notice subtle changes (a darker patch of skin, a different bowel pattern) that a rotating roster wouldn't catch.",
          },
          {
            title: "Worked Alongside Sydney SCI Services",
            description:
              "We coordinate with Royal Rehab and the POW SCI Service so home care continues what rehab set up rather than reinventing it.",
          },
          {
            title: "Education for Families and Carers",
            description:
              "We teach safe transfer technique, pressure care, and early warning signs — so family and other supports work with us, not against us.",
          },
        ],
      },
      faqs: [
        {
          id: "sci-funding",
          question: "How is in-home SCI care funded in Sydney?",
          answer:
            "For most adults with SCI in Sydney, funding comes through NDIS (under 65 at first plan). Older participants may use aged care packages (Support at Home or CHSP). Veterans access DVA Community Nursing where eligible, and ILC funding may also apply. We can work with NDIS support coordinators and plan managers to scope plans appropriately.",
        },
        {
          id: "sci-rehab",
          question: "Do you work with Royal Rehab and POW Spinal Cord Injury Service?",
          answer:
            "Yes. We routinely coordinate with discharge planners and SCI clinical teams at Royal Rehab (Ryde) and the Prince of Wales Hospital Spinal Cord Injury Service — the two main inpatient SCI rehab pathways in Sydney. Care plans continue the rehab approach rather than restart it.",
        },
        {
          id: "sci-dysreflexia",
          question: "Are your nurses trained to recognise autonomic dysreflexia?",
          answer:
            "Yes. For people with injury at T6 or above, our nurses are trained to recognise signs of autonomic dysreflexia (sudden high blood pressure, headache, sweating, skin changes), check known triggers (bladder distension, bowel impaction, skin issues), and escalate immediately to the GP, SCI service, or emergency services when indicated.",
        },
      ],
      cta: {
        title: "Discuss in-home SCI support",
        description:
          "Tell us where you are — leaving rehab, established at home, or facing new complications — and we'll talk through what safe, consistent in-home care could look like.",
      },
      relatedGuideSlugs: ["in-home-care-for-chronic-wounds"],
    },
  },

  // -------------------------------------------------------------------------
  // Acquired Brain Injury (ABI)
  // -------------------------------------------------------------------------
  {
    slug: "acquired-brain-injury",
    data: {
      title: "In-Home Nursing & Care for Acquired Brain Injury (ABI) in Sydney",
      href: "/conditions/acquired-brain-injury",
      breadcrumbParent: BREADCRUMB_PARENT,
      snippetAnswer:
        "In-home nursing for acquired brain injury (ABI) across Sydney provides specialist support for people recovering from stroke, traumatic brain injury, or other brain injury — medication management, falls prevention, swallowing safety, behavioural-support coordination, and family education — working alongside Royal Rehab (Ryde), the POW Brain Injury Rehabilitation Service, and Westmead rehabilitation.",
      intro:
        "ABI recovery is rarely linear, and the support that works at six weeks isn't the same as what works at six months. Our in-home nursing across Sydney supports people recovering from stroke, traumatic brain injury, hypoxic injury, and other ABI — working alongside Royal Rehab (Ryde), the POW Brain Injury Rehabilitation Service, Westmead rehabilitation, and community ABI teams.",
      evidence: {
        heading: "Quick facts: in-home ABI care with Gentle Care",
        intro: "Citable facts for people living with ABI, families, NDIS coordinators, rehab teams, and discharge planners arranging in-home support.",
        items: [
          { label: "Service area", value: "Sydney and surrounds — Inner West, North Shore, Northern Beaches, Western Sydney, South Sydney, CBD and East.", icon: "area" },
          { label: "Specialist coordination", value: "We work alongside Royal Rehab (Ryde), the POW Brain Injury Rehabilitation Service, Westmead rehabilitation, and community ABI teams.", icon: "credential" },
          { label: "Response window", value: "Discharge-from-rehab referrals prioritised, with visits often starting within 24 to 48 hours.", icon: "response" },
          { label: "Funding accepted", value: "NDIS (most ABI participants under 65), aged care (for older participants), DVA Community Nursing, icare Lifetime Care (for catastrophic motor injuries), and private fee-for-service.", icon: "funding" },
          { label: "Scope of support", value: "Medication management, falls prevention, swallowing safety, fatigue management, behavioural-support coordination with treating teams, and family education on safe support strategies.", icon: "scope" },
          { label: "Care model", value: "Small caseload — the same nurses recognise gradual recovery patterns and watch for the secondary changes (mood, fatigue, behaviour) families often spot last.", icon: "credential" },
        ],
      },
      whoItHelps: {
        title: "Who In-Home ABI Care Is For",
        description:
          "Our ABI support is for people at every stage of brain injury recovery and the families navigating it with them.",
        audiences: [
          "Adults recently discharged from inpatient ABI rehabilitation",
          "People with established ABI managing ongoing daily living and clinical needs",
          "Stroke survivors needing continued support after rehab discharge",
          "Younger NDIS participants with traumatic brain injury",
          "People supported under icare Lifetime Care after catastrophic motor injury",
          "Families needing structured education on safe support and respite",
        ],
      },
      supportAvailable: {
        title: "Types of ABI Support We Provide",
        description:
          "We tailor ABI care to the stage of recovery, working from rehab and community team plans.",
        features: [
          {
            title: "Medication Management",
            description:
              "Support with anti-epileptic medications, blood pressure management, blood thinners (particularly post-stroke), and other prescribed regimes — without making decisions outside the treating team.",
          },
          {
            title: "Falls Prevention and Mobility Support",
            description:
              "Practical falls prevention — home environment, transfers, mobility aids, and supervision during higher-risk activities. Falls are a leading cause of secondary injury after ABI.",
          },
          {
            title: "Swallowing Safety and Mealtime Support",
            description:
              "Support at mealtimes with modified diet implementation per speech pathologist's plan and monitoring for aspiration signs — particularly important after stroke and in ABI with bulbar involvement.",
          },
          {
            title: "Behavioural Support Coordination",
            description:
              "We work alongside specialist behaviour support practitioners and treating teams, implementing strategies that have been planned by qualified clinicians — we don't develop independent behaviour plans.",
          },
          {
            title: "Family Education and Respite",
            description:
              "Guidance on what's typical ABI behaviour and what warrants escalation, communication strategies, fatigue patterns, and structured respite so primary carers can rest.",
          },
        ],
      },
      whyChoose: {
        title: "Why Choose Gentle Care for ABI",
        description:
          "ABI recovery happens in small steps over months and years — and the right support recognises and supports those steps.",
        reasons: [
          {
            title: "Consistent Nurses Across Recovery",
            description:
              "The same nurses watch the recovery trajectory, notice subtle gains and losses, and document changes that matter to your treating team.",
          },
          {
            title: "Worked Alongside Sydney ABI Services",
            description:
              "We coordinate with Royal Rehab, POW Brain Injury Rehab, and Westmead rehab teams so home care continues rehab's approach.",
          },
          {
            title: "Whole-Household Approach",
            description:
              "ABI affects the whole family. We support the person living with ABI and offer education and respite for partners, parents, and children also navigating the change.",
          },
        ],
      },
      faqs: [
        {
          id: "abi-funding",
          question: "How is in-home ABI care funded in Sydney?",
          answer:
            "For most adults with ABI in Sydney, funding comes through NDIS (under 65 at first plan). Older participants may use aged care packages (Support at Home or CHSP). Veterans access DVA Community Nursing. People with catastrophic motor injuries may be supported under icare Lifetime Care. Private fee-for-service is also an option, including as a top-up.",
        },
        {
          id: "abi-stroke",
          question: "Do you support stroke survivors after rehab?",
          answer:
            "Yes. Stroke is one of the most common causes of acquired brain injury, and our team supports stroke survivors after both inpatient rehab and direct hospital discharge. See our [in-home care after stroke guide](/guides/in-home-care-after-stroke) for the specific Sydney pathways and what we cover.",
        },
        {
          id: "abi-behaviour",
          question: "Can you support someone with behavioural changes after ABI?",
          answer:
            "We work alongside specialist behaviour support practitioners and treating teams to implement plans they've developed. We don't independently develop behaviour plans — that's specialist work — but our nurses are experienced with the behavioural changes that can follow ABI and implement strategies consistently and calmly.",
        },
      ],
      cta: {
        title: "Discuss in-home ABI support",
        description:
          "Tell us about your situation — leaving rehab, established at home, or facing new challenges — and we'll talk through what consistent in-home care could look like.",
      },
      relatedGuideSlugs: ["in-home-care-after-stroke"],
    },
  },

  // -------------------------------------------------------------------------
  // Cerebral Palsy
  // -------------------------------------------------------------------------
  {
    slug: "cerebral-palsy",
    data: {
      title: "In-Home Nursing & Care for Cerebral Palsy in Sydney",
      href: "/conditions/cerebral-palsy",
      breadcrumbParent: BREADCRUMB_PARENT,
      snippetAnswer:
        "In-home nursing for cerebral palsy across Sydney provides personalised NDIS-funded support at every life stage — from school-age routines and complex clinical care (PEG feeding, catheter management, pressure care) to adult independent living and transition planning — working alongside the Sydney Children's Hospitals Network, Royal Rehab, and Cerebral Palsy Alliance.",
      intro:
        "Cerebral palsy is a lifelong condition, and the right support changes through every stage of life. Our in-home nursing across Sydney supports NDIS participants with cerebral palsy and their families — coordinating with the Sydney Children's Hospitals Network (Westmead and Randwick), Royal Rehab transition clinics, and Cerebral Palsy Alliance — with a small consistent team that learns each person's communication, routines, and clinical needs.",
      evidence: {
        heading: "Quick facts: in-home cerebral palsy care with Gentle Care",
        intro: "Citable facts for NDIS participants with cerebral palsy, families, support coordinators, paediatric specialists, and Cerebral Palsy Alliance coordinators arranging in-home support.",
        items: [
          { label: "Service area", value: "Sydney and surrounds — Inner West, North Shore, Northern Beaches, Western Sydney, South Sydney, CBD and East.", icon: "area" },
          { label: "Specialist coordination", value: "We work alongside the Sydney Children's Hospitals Network (Westmead, Randwick), Royal Rehab transition clinics, and Cerebral Palsy Alliance.", icon: "credential" },
          { label: "Response window", value: "Enquiries acknowledged within 24 hours during business hours, with hospital-discharge and transition referrals prioritised.", icon: "response" },
          { label: "Funding accepted", value: "NDIS (primary funding for most CP participants), DVA Community Nursing where eligible, aged care (for older participants), and private fee-for-service.", icon: "funding" },
          { label: "Scope of support", value: "Personal care and daily routines, complex care (PEG feeding, catheter management, bowel program, pressure care), seizure-aware support where relevant, school and community participation, and family education.", icon: "scope" },
          { label: "Care model", value: "Small caseload so the same nurses learn each person's communication style, routines, and clinical baseline — continuity matters more here than almost anywhere.", icon: "credential" },
        ],
      },
      whoItHelps: {
        title: "Who In-Home CP Care Is For",
        description:
          "Our CP support is for participants at every life stage — school-age, transition, and adult — and the families and care teams supporting them.",
        audiences: [
          "School-age NDIS participants with CP needing personal and clinical support at home",
          "Adolescents transitioning from paediatric to adult NDIS pathways",
          "Adults with CP living independently who need clinical and personal care backup",
          "People with CP needing complex care (PEG feeding, catheter management, pressure care)",
          "Families needing structured education on safe support and meaningful respite",
          "Support coordinators looking for a consistent, clinically-capable provider",
        ],
      },
      supportAvailable: {
        title: "Types of CP Support We Provide",
        description:
          "We tailor CP care to the participant's communication, mobility, and clinical needs, working from existing specialist plans.",
        features: [
          {
            title: "Personal Care and Daily Routines",
            description:
              "Skilled help with bathing, dressing, grooming, toileting, transfers, and mealtimes — delivered at the participant's pace and according to the routines that work for them.",
          },
          {
            title: "PEG Feeding and Enteral Nutrition",
            description:
              "PEG site care, enteral feeding regimes, flushing, and tolerance monitoring delivered in line with dietitian and medical team instructions, including for participants needing overnight feeds.",
          },
          {
            title: "Bowel Program and Continence Care",
            description:
              "Bowel program support, catheter management where used, and continence routines — supporting dignity and reducing complications.",
          },
          {
            title: "Pressure Care and Skin Integrity",
            description:
              "Regular monitoring of pressure points, repositioning support, and early escalation of skin changes — particularly important for participants with limited mobility.",
          },
          {
            title: "Seizure-Aware Support",
            description:
              "For participants with co-occurring epilepsy, our nurses are trained to recognise seizure activity, document accurately, and follow individual seizure management plans.",
          },
        ],
      },
      whyChoose: {
        title: "Why Choose Gentle Care for Cerebral Palsy",
        description:
          "CP care benefits enormously from continuity — the same people learning communication, routines, and clinical baseline.",
        reasons: [
          {
            title: "Same Nurses Across Years",
            description:
              "Small caseload means the same nurses learn each participant's communication, preferences, and clinical baseline. This is especially important for participants who can't easily re-explain routines to a new face.",
          },
          {
            title: "Family Partnership",
            description:
              "We work with families, not just for them — partnering on routines, sharing knowledge, and offering meaningful respite that doesn't disrupt the household.",
          },
          {
            title: "Transition-Aware Support",
            description:
              "We support adolescents and adults through transition from paediatric to adult NDIS pathways — a stage when continuity often breaks and families feel left to navigate alone.",
          },
        ],
      },
      faqs: [
        {
          id: "cp-funding",
          question: "How is in-home cerebral palsy care funded in Sydney?",
          answer:
            "NDIS is the primary funding source for most people with cerebral palsy in Sydney. Older participants may use aged care packages alongside. Veterans access DVA Community Nursing where eligible, and private fee-for-service is also an option. We work with support coordinators and plan managers to scope plans appropriately.",
        },
        {
          id: "cp-paediatric",
          question: "Do you support school-age participants with CP?",
          answer:
            "Yes. Our team supports school-age NDIS participants with CP — typically focused on home routines (morning, after-school, evening, weekend) and clinical needs like PEG feeding, catheter management, or seizure-aware support. We coordinate with paediatric teams at the Sydney Children's Hospitals Network where relevant.",
        },
        {
          id: "cp-transition",
          question: "Can you support transition from paediatric to adult NDIS pathways?",
          answer:
            "Yes. Transition is one of the moments when continuity often breaks for people with CP and their families. We can support before, during, and after transition — keeping the same nurses and routines while the broader plan changes around them.",
        },
      ],
      cta: {
        title: "Discuss in-home cerebral palsy support",
        description:
          "Tell us about the participant and what stage of life they're at — school-age, transition, or adult — and we'll talk through what consistent in-home care could look like.",
      },
    },
  },
] as const;

export function getConditionBySlug(slug: string): ConditionEntry | undefined {
  return CONDITIONS.find((c) => c.slug === slug);
}

export function getAllConditionSlugs(): string[] {
  return CONDITIONS.map((c) => c.slug);
}
