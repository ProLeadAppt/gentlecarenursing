"use client";

import { useEffect, useRef, useCallback } from "react";
import { X } from "lucide-react";
import { useFormModal } from "@/contexts/FormModalContext";
import { ContactForm } from "@/components/forms/ContactForm";
import { ReferralForm } from "@/components/forms/ReferralForm";

export function FormModal() {
  const { activeForm, closeModal } = useFormModal();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (activeForm) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.close();
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [activeForm]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e: Event) => {
      e.preventDefault();
      closeModal();
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [closeModal]);

  const title = activeForm === "referral" ? "Request Care" : "Contact Us";
  const subtitle =
    activeForm === "referral"
      ? "Tell us about your needs. We'll respond within minutes."
      : "Send us a message. We'll get back to you fast.";

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-[100] m-0 h-full w-full max-w-none max-h-none bg-transparent p-0 backdrop:bg-black/50 backdrop:backdrop-blur-sm open:flex open:items-center open:justify-center"
      onClick={handleBackdropClick}
    >
      <div
        ref={contentRef}
        className="relative mx-auto flex max-h-[90dvh] w-full max-w-lg flex-col overflow-hidden rounded-none bg-card shadow-2xl sm:rounded-2xl sm:m-4"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div>
            <h2 className="font-[family-name:var(--font-dm-sans)] text-xl font-bold text-foreground">
              {title}
            </h2>
            <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {activeForm === "referral" && <ReferralForm compact />}
          {activeForm === "contact" && <ContactForm />}
        </div>
      </div>
    </dialog>
  );
}
