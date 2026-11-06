"use client";

import { useEffect, useState } from "react";
import { setQaCase, type QaCase } from "@/lib/qa-transport";

/** Disposable preview controls, deliberately outside the production components. */
export function QaControls() {
  const [scenario, setScenario] = useState<QaCase>("success");
  useEffect(() => {
    // Keep synthetic QA clicks from opening email, phone or external sites.
    const stopExternal = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest("a") : null;
      if (!target) return;
      const url = new URL(target.href, window.location.href);
      if (url.origin !== window.location.origin || !["http:", "https:"].includes(url.protocol)) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    };
    document.addEventListener("click", stopExternal, true);
    return () => document.removeEventListener("click", stopExternal, true);
  }, []);
  return (
    <aside aria-label="QA-only preview controls" style={{ position: "fixed", bottom: 8, left: 8, zIndex: 10000, maxWidth: "calc(100vw - 16px)", background: "#fff4b8", color: "#111", border: "2px solid #111", borderRadius: 8, padding: "8px 12px", font: "13px system-ui", boxShadow: "0 2px 8px #0004" }}>
      <strong>QA ONLY · Synthetic data only · Nothing is sent</strong>
      <div><label htmlFor="qa-scenario">Next submission: </label>
        <select id="qa-scenario" value={scenario} onChange={(event) => {
          const next = event.target.value as QaCase;
          setQaCase(next);
          setScenario(next);
        }} style={{ background: "white", border: "1px solid #111", padding: 4 }}>
          <option value="success">Success (simulated receipt)</option>
          <option value="rejected">Rejected (HTTP 502)</option>
          <option value="uncertain">Uncertain (lost response)</option>
        </select>
      </div>
      <small>1.2s delay. Pick before opening the modal. Reload resets to success.</small>
    </aside>
  );
}
