"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { dispatchAnalyticsEvent, getLinkAnalyticsEvent } from "@/lib/analytics";

export type FormModalType = "referral" | "contact" | null;

interface FormModalContextValue {
  activeForm: FormModalType;
  openModal: (type: "referral" | "contact", ctaLocation?: string) => void;
  closeModal: () => void;
}

const FormModalContext = createContext<FormModalContextValue | null>(null);

export function FormModalProvider({ children }: { children: ReactNode }) {
  const [activeForm, setActiveForm] = useState<FormModalType>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const interactive = target.closest<HTMLElement>(
        "a[href], [data-analytics-action]"
      );
      if (!interactive) return;

      const href =
        interactive instanceof HTMLAnchorElement ? interactive.href : "";
      const analyticsEvent = getLinkAnalyticsEvent(
        href,
        interactive.dataset.analyticsAction
      );
      if (!analyticsEvent) return;

      dispatchAnalyticsEvent(analyticsEvent.eventName, {
        ...analyticsEvent.parameters,
        cta_location: interactive.dataset.analyticsLocation,
      });
    };

    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, []);

  const openModal = useCallback((type: "referral" | "contact", ctaLocation?: string) => {
    dispatchAnalyticsEvent("form_open", {
      form_type: type,
      cta_location: ctaLocation,
    });
    setActiveForm(type);
  }, []);

  const closeModal = useCallback(() => {
    setActiveForm(null);
  }, []);

  return (
    <FormModalContext.Provider value={{ activeForm, openModal, closeModal }}>
      {children}
    </FormModalContext.Provider>
  );
}

export function useFormModal() {
  const ctx = useContext(FormModalContext);
  if (!ctx) throw new Error("useFormModal must be used inside FormModalProvider");
  return ctx;
}
