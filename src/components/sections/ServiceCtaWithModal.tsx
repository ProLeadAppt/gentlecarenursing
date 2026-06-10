"use client";

import { CtaSection } from "./CtaSection";
import { useFormModal } from "@/contexts/FormModalContext";
import { CTA_LINKS, CTA_REASSURANCE } from "@/lib/constants";

interface ServiceCtaWithModalProps {
  title: string;
  description?: string;
}

export function ServiceCtaWithModal({ title, description }: ServiceCtaWithModalProps) {
  const { openModal } = useFormModal();

  return (
    <CtaSection
      title={title}
      description={description}
      primaryCta={CTA_LINKS.requestCare}
      secondaryCta={CTA_LINKS.contact}
      onPrimaryClick={() => openModal("contact")}
      onSecondaryClick={() => openModal("contact")}
      reassurance={CTA_REASSURANCE}
      variant="primary"
    />
  );
}
