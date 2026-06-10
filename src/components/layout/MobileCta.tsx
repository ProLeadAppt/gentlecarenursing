"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Phone } from "lucide-react";
import { SITE } from "@/lib/constants";
import { useFormModal } from "@/contexts/FormModalContext";
import { cn } from "@/lib/utils";

export function MobileCta() {
  const [visible, setVisible] = useState(false);
  const { openModal } = useFormModal();
  const lastScrollY = useRef(0);

  const updateVisibility = useCallback(() => {
    const currentY = window.scrollY;
    const scrollingUp = currentY < lastScrollY.current;
    const pastHero = currentY > 500;
    const nearBottom =
      window.innerHeight + currentY >= document.body.offsetHeight - 200;

    setVisible(pastHero && scrollingUp && !nearBottom);
    lastScrollY.current = currentY;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, [updateVisibility]);

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 border-t border-white/20 bg-white/80 backdrop-blur-md px-4 py-3 shadow-[0_-4px_20px_rgb(0_0_0/0.08)] transition-transform duration-300 lg:hidden",
        visible ? "translate-y-0" : "translate-y-full"
      )}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      inert={!visible}
    >
      <div className="flex items-center gap-3">
        {SITE.phone && (
          <a
            href={SITE.phoneHref}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors hover:bg-primary/20"
            aria-label={`Call ${SITE.phone}`}
          >
            <Phone className="h-5 w-5" />
          </a>
        )}
        <button
          type="button"
          onClick={() => openModal("contact")}
          className="flex h-12 flex-1 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[#6b2028] font-semibold text-white shadow-[0_4px_16px_rgba(132,40,51,0.25)] transition-all duration-200 hover:shadow-[0_8px_24px_rgba(132,40,51,0.3)] active:scale-[0.98]"
        >
          Request Care
        </button>
      </div>
    </div>
  );
}
