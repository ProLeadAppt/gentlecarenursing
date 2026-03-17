"use client";

import { useFormModal } from "@/contexts/FormModalContext";
import { cn } from "@/lib/utils";
import { BUTTON_VARIANTS, BUTTON_SIZES } from "@/design-system/tokens";

type ButtonVariant = keyof typeof BUTTON_VARIANTS;
type ButtonSize = keyof typeof BUTTON_SIZES;

interface FormModalTriggerProps {
  formType: "referral" | "contact" | "care-finder";
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
}

export function FormModalTrigger({
  formType,
  variant = "primary",
  size = "md",
  children,
  className,
}: FormModalTriggerProps) {
  const { openModal } = useFormModal();

  const base =
    "inline-flex items-center justify-center font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer";

  return (
    <button
      type="button"
      onClick={() => openModal(formType)}
      className={cn(base, BUTTON_VARIANTS[variant], BUTTON_SIZES[size], className)}
    >
      {children}
    </button>
  );
}
