"use client";

import { useEffect, useRef, useCallback } from "react";
import { X } from "lucide-react";
import { useFormModal } from "@/contexts/FormModalContext";
import { ContactForm } from "@/components/forms/ContactForm";
import { CareFinder } from "@/components/forms/CareFinder";
import { ReferralConcierge } from "@/components/forms/ReferralConcierge";

export function FormModal() {
  const { activeForm, closeModal } = useFormModal();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const triggerRef = useRef<Element | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (activeForm) {
      // Save the element that triggered the modal for focus return
      triggerRef.current = document.activeElement;
      dialog.showModal();
      document.body.style.overflow = "hidden";

      // Auto-focus first input inside the modal after render
      requestAnimationFrame(() => {
        const firstInput = contentRef.current?.querySelector<HTMLElement>(
          "input, select, textarea, button:not([aria-label='Close'])"
        );
        firstInput?.focus();
      });
    } else {
      dialog.close();
      document.body.style.overflow = "";

      // Return focus to the trigger element
      if (triggerRef.current instanceof HTMLElement) {
        triggerRef.current.focus();
      }
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

  const getHeaderContent = () => {
    switch (activeForm) {
      case "referral":
        return {
          title: "Referral Concierge",
          subtitle: "A simple, guided process for healthcare professionals and families.",
        };
      case "contact":
        return {
          title: "Get in Touch",
          subtitle: "Have a question? We're here to help you navigate your care journey.",
        };
      case "care-finder":
        return {
          title: "Care Finder Concierge",
          subtitle: "Tell us about your needs and we'll guide you through the next steps.",
        };
      default:
        return { title: "", subtitle: "" };
    }
  };

  const { title, subtitle } = getHeaderContent();

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-[100] m-0 h-full w-full max-w-none max-h-none bg-transparent p-0 backdrop:bg-black/60 backdrop:backdrop-blur-md open:flex open:items-center open:justify-center"
      onClick={handleBackdropClick}
      aria-labelledby="modal-title"
      aria-describedby="modal-subtitle"
    >
      <div
        ref={contentRef}
        className="relative mx-auto flex max-h-[95dvh] w-full max-w-2xl flex-col overflow-hidden rounded-[2.5rem] border border-border/60 bg-card shadow-2xl sm:m-6"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-border/40 bg-muted/20 px-8 py-8 sm:px-10">
          <div>
            <h2 id="modal-title" className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl font-bold text-foreground leading-tight">
              {title}
            </h2>
            <p id="modal-subtitle" className="mt-2 text-sm sm:text-base text-muted-foreground">{subtitle}</p>
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-all hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-8 py-8 sm:px-10">
          {activeForm === "referral" && <ReferralConcierge />}
          {activeForm === "contact" && <ContactForm />}
          {activeForm === "care-finder" && <CareFinder />}
        </div>
      </div>
    </dialog>
  );
}
