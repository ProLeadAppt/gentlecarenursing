"use client";

import { CtaSection } from "./CtaSection";
import { useFormModal } from "@/contexts/FormModalContext";
import { CTA_LINKS, CTA_REASSURANCE } from "@/lib/constants";

export function HomepageCtaSections() {
  const { openModal } = useFormModal();

  return (
    <>
      <CtaSection
        title="Take the Next Step. We're Ready When You Are."
        description="Our team will review your enquiry and discuss availability and next steps. No pressure, no obligation. Just supportive guidance when you need it."
        primaryCta={CTA_LINKS.requestCare}
        secondaryCta={CTA_LINKS.contact}
        onPrimaryClick={() => openModal("contact", "homepage_cta_primary")}
        onSecondaryClick={() => openModal("contact", "homepage_cta_secondary")}
        reassurance={CTA_REASSURANCE}
        variant="primary"
      />
    </>
  );
}
