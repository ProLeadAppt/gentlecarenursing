"use client";

import {
  createContext,
  useContext,
  useState,
  useRef,
  type RefObject,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { dispatchAnalyticsEvent, getLinkAnalyticsEvent } from "@/lib/analytics";

export type FormModalType = "referral" | "contact" | null;

interface FormModalContextValue {
  activeForm: FormModalType;
  openModal: (type: "referral" | "contact", ctaLocation?: string, returnFocus?: HTMLElement | null) => void;
  returnFocusRef: RefObject<HTMLElement | null>;
  closeModal: () => void;
}

const FormModalContext = createContext<FormModalContextValue | null>(null);

export function FormModalProvider({ children }: { children: ReactNode }) {
  const [activeForm, setActiveForm] = useState<FormModalType>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

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

  const openModal = useCallback((type: "referral" | "contact", ctaLocation?: string, returnFocus?: HTMLElement | null) => {
    // Capture before a trigger is hidden or removed by the same React update.
    returnFocusRef.current = returnFocus ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
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
    <FormModalContext.Provider value={{ activeForm, openModal, closeModal, returnFocusRef }}>
      {children}
    </FormModalContext.Provider>
  );
}

export function useFormModal() {
  const ctx = useContext(FormModalContext);
  if (!ctx) throw new Error("useFormModal must be used inside FormModalProvider");
  return ctx;
}
