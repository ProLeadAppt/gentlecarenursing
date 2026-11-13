import { RIVERSIDE_REVIEW_HTML } from "@/content/riverside-editorial-review";
import { isLocalityReviewEnabled } from "@/content/locality-review";
export const dynamic = "force-static";
export const revalidate = false;
export function GET() {
  const headers = {
    "Content-Type": "text/html; charset=utf-8",
    "X-Robots-Tag": "noindex, nofollow, noarchive",
    "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
  };
  if (!isLocalityReviewEnabled()) return new Response("Not found", { status: 404, headers });
  return new Response(RIVERSIDE_REVIEW_HTML, { headers });
}
