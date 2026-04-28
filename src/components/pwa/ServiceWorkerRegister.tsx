"use client";

import { useEffect } from "react";

/**
 * Registers /sw.js on mount in production. Silent on register failure.
 * Renders nothing.
 */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;
    if (process.env.NODE_ENV !== "production") return;

    const onLoad = () => {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .catch(() => {
          // Silent: PWA install will still work without SW in some browsers,
          // and we don't want to alarm users on transient errors.
        });
    };

    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return null;
}
