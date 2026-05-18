"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneCall, MessageCircle, X } from "lucide-react";
import { useFormModal } from "@/contexts/FormModalContext";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * FloatingContact — desktop "get in touch" widget anchored bottom-right.
 *
 * Mobile is intentionally not served here: MobileCta already provides a
 * full-width bottom bar with call + Request Care on small screens, and
 * stacking another floating action on top would crowd that bar. Container
 * is `hidden lg:flex`.
 *
 * Background-aware: detects when the widget is positioned over the dark
 * footer (`#site-footer`) via IntersectionObserver and flips to a
 * white-fill / primary-text variant so the control stays readable. Same
 * pattern used by ScrollToTop.
 *
 * Expanded state reveals two explicit actions — Call (tel:) and Send
 * message (modal) — so the affordance isn't just an opaque chat icon.
 * People calling a nursing service overwhelmingly want a phone, so it's
 * the first chip in the stack.
 */
export function FloatingContact() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverDarkBackground, setIsOverDarkBackground] = useState(false);
  const { openModal } = useFormModal();
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Show only after the user has scrolled past the hero band.
  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Detect when the widget overlaps the dark footer.
  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;
    const obs = new IntersectionObserver(
      ([entry]) => setIsOverDarkBackground(entry.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(footer);
    return () => obs.disconnect();
  }, []);

  // Close expanded state on Escape and on outside click.
  useEffect(() => {
    if (!isExpanded) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsExpanded(false);
    };
    const onPointer = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onPointer);
    };
  }, [isExpanded]);

  const handleMessageClick = () => {
    setIsExpanded(false);
    openModal("contact");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 24, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.92 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-50 hidden lg:flex flex-col items-end gap-3"
        >
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="flex flex-col items-end gap-2"
              >
                <ActionChip
                  variant={isOverDarkBackground ? "dark" : "light"}
                  href={SITE.phoneHref}
                  onClick={() => setIsExpanded(false)}
                  icon={<PhoneCall className="h-4 w-4" aria-hidden />}
                  label="Call us"
                  sublabel={SITE.phone}
                  ariaLabel={`Call ${SITE.phone}`}
                  delay={0}
                />
                <ActionChip
                  variant={isOverDarkBackground ? "dark" : "light"}
                  onClick={handleMessageClick}
                  icon={<MessageCircle className="h-4 w-4" aria-hidden />}
                  label="Send a message"
                  sublabel="We reply within 24 hrs"
                  ariaLabel="Open contact form to send a message"
                  delay={0.05}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => setIsExpanded((v) => !v)}
            aria-label={isExpanded ? "Close contact menu" : "Open contact menu"}
            aria-expanded={isExpanded}
            className={cn(
              "group relative flex h-14 w-14 items-center justify-center rounded-full shadow-pw-lg ring-2 transition-all duration-300",
              "hover:scale-105 hover:shadow-pw-xl focus:outline-none focus:ring-2 focus:ring-offset-2",
              isOverDarkBackground
                ? "bg-white text-primary ring-white/70 hover:bg-white/95 focus:ring-white"
                : "bg-primary text-white ring-white/40 hover:bg-primary/90 focus:ring-primary"
            )}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isExpanded ? "close" : "open"}
                initial={{ rotate: -45, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 45, opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.18 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {isExpanded ? (
                  <X className="h-6 w-6" strokeWidth={2.5} aria-hidden />
                ) : (
                  <MessageCircle className="h-6 w-6" aria-hidden />
                )}
              </motion.span>
            </AnimatePresence>

            {!isExpanded && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3" aria-hidden>
                <span
                  className={cn(
                    "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                    isOverDarkBackground ? "bg-primary" : "bg-white"
                  )}
                />
                <span
                  className={cn(
                    "relative inline-flex rounded-full h-3 w-3",
                    isOverDarkBackground ? "bg-primary" : "bg-white"
                  )}
                />
              </span>
            )}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface ActionChipProps {
  variant: "light" | "dark";
  href?: string;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  ariaLabel: string;
  delay?: number;
}

function ActionChip({ variant, href, onClick, icon, label, sublabel, ariaLabel, delay = 0 }: ActionChipProps) {
  const className = cn(
    "flex items-center gap-3 rounded-full px-4 py-2.5 shadow-pw-lg ring-2 transition-all duration-200",
    "hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2",
    variant === "dark"
      ? "bg-white text-primary ring-white/70 hover:bg-white/95 focus:ring-white"
      : "bg-primary text-white ring-white/40 hover:bg-primary/90 focus:ring-primary"
  );

  const iconWrapClass = cn(
    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
    variant === "dark" ? "bg-primary/10 text-primary" : "bg-white/15 text-white"
  );

  const sublabelClass = cn(
    "text-[11px] leading-tight",
    variant === "dark" ? "text-primary/70" : "text-white/80"
  );

  const body = (
    <>
      <span className={iconWrapClass}>{icon}</span>
      <span className="flex flex-col items-start text-left leading-tight">
        <span className="text-sm font-semibold">{label}</span>
        {sublabel && <span className={sublabelClass}>{sublabel}</span>}
      </span>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        onClick={onClick}
        aria-label={ariaLabel}
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 16 }}
        transition={{ duration: 0.2, delay, ease: "easeOut" }}
        className={className}
      >
        {body}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 16 }}
      transition={{ duration: 0.2, delay, ease: "easeOut" }}
      className={className}
    >
      {body}
    </motion.button>
  );
}
