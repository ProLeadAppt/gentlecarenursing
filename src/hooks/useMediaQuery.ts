import { useEffect, useState } from "react";

/**
 * SSR-safe `matchMedia` hook.
 *
 * Returns `false` on the first server render (and the matching client render
 * before hydration finishes). After mount, reflects the actual media-query
 * state and updates on change.
 *
 * Used to gate expensive client-only behaviour — scroll-driven parallax,
 * marquees, magnetic buttons — so mobile devices don't pay for visual
 * flourishes that aren't even visible at narrow widths.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);

  return matches;
}

/** Convenience: true on viewports ≥ 768px (tailwind `md`). */
export function useIsDesktop(): boolean {
  return useMediaQuery("(min-width: 768px)");
}

/**
 * Convenience: true when the primary input is a fine pointer (mouse).
 *
 * On touch-only devices, hover-driven flourishes (magnetic buttons, hover
 * gradients) just waste CPU and never trigger. Use this to gate them.
 */
export function useHasFinePointer(): boolean {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}
