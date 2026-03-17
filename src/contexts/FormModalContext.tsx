"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type FormModalType = "referral" | "contact" | "care-finder" | null;

interface FormModalContextValue {
  activeForm: FormModalType;
  openModal: (type: "referral" | "contact" | "care-finder") => void;
  closeModal: () => void;
}

const FormModalContext = createContext<FormModalContextValue | null>(null);

export function FormModalProvider({ children }: { children: ReactNode }) {
  const [activeForm, setActiveForm] = useState<FormModalType>(null);

  const openModal = useCallback((type: "referral" | "contact" | "care-finder") => {
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
