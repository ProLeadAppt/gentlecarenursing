"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

const SCROLL_THRESHOLD = 200;
const DESKTOP_MEDIA = "(min-width: 1024px)";

export function ScrollToTop() {
  const [showDesktop, setShowDesktop] = useState(false);
  const [showMobile, setShowMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  /** When true, button is over footer (dark bg) — use light button variant */
  const [isOverDarkBackground, setIsOverDarkBackground] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_MEDIA);
    const handleMediaChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    setIsDesktop(mql.matches);
    mql.addEventListener("change", handleMediaChange);
    return () => mql.removeEventListener("change", handleMediaChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowDesktop(window.scrollY > SCROLL_THRESHOLD);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        setShowMobile(inView);
        setIsOverDarkBackground(inView);
      },
      { threshold: 0 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const visible = (isDesktop && showDesktop) || (!isDesktop && showMobile);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  const isLightVariant = isOverDarkBackground;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={
        isLightVariant
          ? "fixed bottom-24 right-4 z-30 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-primary shadow-lg transition hover:bg-white/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:bottom-6 lg:right-6"
          : "fixed bottom-24 right-4 z-30 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:bottom-6 lg:right-6"
      }
    >
      <ChevronUp className="h-6 w-6" strokeWidth={2.5} aria-hidden />
    </button>
  );
}
