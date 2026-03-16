"use client";

import { useState, useEffect } from "react";
import { Phone } from "lucide-react";
import { SITE, CTA_LINKS } from "@/lib/constants";
import { useFormModal } from "@/contexts/FormModalContext";
import { cn } from "@/lib/utils";

export function MobileCta() {
  const [visible, setVisible] = useState(false);
  const { openModal } = useFormModal();

  useEffect(() => {
    const hero = document.getElementById("hero-heading");
    const footer = document.getElementById("site-footer");
    if (!hero) return;

    let heroPast = false;
    let footerInView = false;

    const updateVisible = () => {
      setVisible(heroPast && !footerInView);
    };

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        heroPast = !entry.isIntersecting;
        updateVisible();
      },
      { threshold: 0 }
    );
    heroObserver.observe(hero);

    let footerObserver: IntersectionObserver | null = null;
    if (footer) {
      footerObserver = new IntersectionObserver(
        ([entry]) => {
          footerInView = entry.isIntersecting;
          updateVisible();
        },
        { threshold: 0 }
      );
      footerObserver.observe(footer);
    }

    return () => {
      heroObserver.disconnect();
      footerObserver?.disconnect();
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 border-t border-border/40 bg-white/95 px-4 py-3 shadow-[0_-4px_12px_rgb(0_0_0/0.08)] backdrop-blur transition-transform duration-300 lg:hidden",
        visible ? "translate-y-0" : "translate-y-full"
      )}
      aria-hidden={!visible}
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
          onClick={() => openModal("referral")}
          className="flex h-12 flex-1 items-center justify-center rounded-xl bg-accent font-semibold text-white shadow-md transition-all duration-150 hover:bg-accent/90 active:scale-[0.98]"
        >
          {CTA_LINKS.requestCare.label}
        </button>
      </div>
    </div>
  );
}
