"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { beginModalSession } from "@/lib/modal-session";
import { supportsModalDialog } from "@/lib/dialog-support";
import { X } from "lucide-react";
import { useFormModal } from "@/contexts/FormModalContext";
import { ContactForm } from "@/components/forms/ContactForm";
import { ReferralConcierge } from "@/components/forms/ReferralConcierge";

export function FormModal() {
  const { activeForm, closeModal, returnFocusRef } = useFormModal();
  const [retainReferralSession, setRetainReferralSession] = useState(false);
  const [retainContactSession, setRetainContactSession] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !supportsModalDialog(dialog)) return;

    if (activeForm) {
      return beginModalSession({
        dialog,
        bodyStyle: document.body.style,
        focusFirst: () => {
          const activePanel = contentRef.current?.querySelector<HTMLElement>(`[data-modal-form="${activeForm}"]`);
          const firstInput = activePanel?.querySelector<HTMLElement>("[data-form-outcome]") ?? activePanel?.querySelector<HTMLElement>(
            "input:not([type='hidden']):not(:disabled), select:not(:disabled), textarea:not(:disabled), button:not(:disabled):not([aria-label='Close'])"
          );
          firstInput?.focus();
        },
        requestFrame: requestAnimationFrame,
        cancelFrame: cancelAnimationFrame,
      });
    } else {
      dialog.close();

      // Return focus to the trigger element
      const trigger = returnFocusRef.current;
      returnFocusRef.current = null;
      if (typeof trigger === "function") {
        trigger();
      } else if (trigger?.isConnected && !trigger.closest("[inert]")) {
        trigger.focus();
      }
    }

  }, [activeForm, returnFocusRef]);

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
      default:
        return { title: "", subtitle: "" };
    }
  };

  const { title, subtitle } = getHeaderContent();

  return (
    <dialog
      ref={dialogRef}
      // Unknown dialog elements must stay hidden even without modern CSS.
      style={{ display: activeForm ? undefined : "none" }}
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
          {/* Keep pending/uncertain referral state in this page session, not storage. */}
          <div data-modal-form="referral" hidden={activeForm !== "referral"}>
            {(activeForm === "referral" || retainReferralSession) && (
              <ReferralConcierge active={activeForm === "referral"} onRetainSessionChange={setRetainReferralSession} />
            )}
          </div>
          <div data-modal-form="contact" hidden={activeForm !== "contact"}>
            {(activeForm === "contact" || retainContactSession) && (
              <ContactForm active={activeForm === "contact"} onRetainSessionChange={setRetainContactSession} />
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
}
