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
        description="Share your situation with us and you'll get a personal response within 24 hours, with clear next steps. No pressure, no obligation. Just supportive guidance when you need it."
        primaryCta={CTA_LINKS.requestCare}
        secondaryCta={CTA_LINKS.contact}
        onPrimaryClick={() => openModal("referral")}
        onSecondaryClick={() => openModal("contact")}
        reassurance={CTA_REASSURANCE}
        variant="primary"
      />
    </>
  );
}
