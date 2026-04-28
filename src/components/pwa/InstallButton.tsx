"use client";

import { useEffect, useState } from "react";
import { Download, Share, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

/**
 * Footer install button.
 * - On Chromium-based browsers (Chrome/Edge/Android): shows when the browser
 *   fires `beforeinstallprompt`; click triggers the native install dialog.
 * - On iOS Safari (no beforeinstallprompt support): always shows on iPhone/iPad,
 *   click reveals a small tooltip explaining the Share → Add to Home Screen flow.
 * - When the app is already installed (running in standalone mode): renders nothing.
 */
export function InstallButton({ className = "" }: { className?: string }) {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showIOSHelp, setShowIOSHelp] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const standalone =
      window.matchMedia?.("(display-mode: standalone)").matches ||
      // iOS Safari sets navigator.standalone when launched from home screen
      (navigator as Navigator & { standalone?: boolean }).standalone === true;
    setIsStandalone(standalone);

    const ua = navigator.userAgent;
    const ios =
      /iPad|iPhone|iPod/.test(ua) &&
      !/CriOS|FxiOS|EdgiOS/.test(ua); // exclude in-app browsers
    setIsIOS(ios);

    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const onInstalled = () => {
      setDeferredPrompt(null);
      setIsStandalone(true);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (isStandalone) return null;

  const canInstall = !!deferredPrompt;
  const showButton = canInstall || isIOS;
  if (!showButton) return null;

  const handleClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") setDeferredPrompt(null);
      return;
    }
    if (isIOS) {
      setShowIOSHelp((v) => !v);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={handleClick}
        aria-expanded={isIOS ? showIOSHelp : undefined}
        className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-white/80 transition-all hover:border-white/30 hover:bg-white/10 hover:text-white"
      >
        <Download className="h-4 w-4" aria-hidden />
        Install app
      </button>

      {isIOS && showIOSHelp && (
        <div
          role="dialog"
          aria-label="How to install on iOS"
          className="absolute bottom-full left-0 mb-3 w-72 rounded-xl border border-white/15 bg-[#2a060c] p-4 text-left shadow-2xl"
        >
          <button
            type="button"
            onClick={() => setShowIOSHelp(false)}
            aria-label="Close install instructions"
            className="absolute right-2 top-2 rounded-md p-1 text-white/60 hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
          <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">
            Add to Home Screen
          </p>
          <ol className="space-y-2 text-sm text-white/85">
            <li className="flex items-start gap-2">
              <span className="text-white/50">1.</span>
              <span className="flex items-center gap-1.5">
                Tap the <Share className="inline h-4 w-4" aria-hidden /> Share
                button in Safari
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-white/50">2.</span>
              <span>Scroll and tap "Add to Home Screen"</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-white/50">3.</span>
              <span>Tap "Add" — the app appears on your home screen</span>
            </li>
          </ol>
        </div>
      )}
    </div>
  );
}
