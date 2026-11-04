/** Signals in fetched HTML only; absence does not prove the browser DOM stays unchanged. */
export function inspectSeoScriptOwnership(html: string): string[] {
  const issues: string[] = [];
  // Next.js may serialize an afterInteractive script in hydration data rather
  // than emit a script tag in initial HTML, so inspect both representations.
  if (/sa-dynamic-optimization|dashboard\.searchatlas\.com\/scripts\/dynamic_optimization\.js/i.test(html)) {
    issues.push("LEGACY_SEO_REWRITE_LOADER");
  }
  if (/data-otto-pixel/i.test(html)) issues.push("REMOTE_SEO_MUTATION_MARKER");
  return issues;
}
