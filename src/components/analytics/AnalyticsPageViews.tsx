"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { buildPageViewParameters } from "@/lib/analytics-pageviews";

/** Enabled only after external Enhanced Measurement and privacy settings are reviewed. */
export function AnalyticsPageViews({ gaId }: { gaId: string }) {
  const pathname = usePathname();
  const previousPath = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || previousPath.current === pathname) return;
    try {
      window.dataLayer ??= [];
      if (!window.gtag) {
        window.gtag = function () {
          // Google's command queue uses the arguments object, not a visitor payload.
          // eslint-disable-next-line prefer-rest-params
          window.dataLayer?.push(arguments);
        };
        window.gtag("js", new Date());
      }
      const referrer = previousPath.current
        ? buildPageViewParameters(previousPath.current).page_location
        : document.referrer;
      const page = buildPageViewParameters(pathname, referrer);
      window.gtag("config", gaId, {
        ...page,
        send_page_view: false,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
        ignore_referrer: page.page_referrer === "",
      });
      window.gtag("event", "page_view", page);
      previousPath.current = pathname;
    } catch {
      // Optional tracking must never interrupt navigation or care enquiry forms.
    }
  }, [gaId, pathname]);

  return <Script id="google-analytics-library" src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />;
}
