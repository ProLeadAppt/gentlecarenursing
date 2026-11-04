import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static Netlify rules do not cover function-rendered HTML. These four
  // baseline policies do not restrict the site's script or connection sources.
  // CSP and HSTS changes require separate integration/subdomain review.
  async headers() {
    return [{
      source: "/:path*",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      ],
    }];
  },
  images: {
    // AVIF first so modern browsers get the smaller format; WebP fallback
    // covers everything else. Hero photos drop ~25–35% in size with AVIF,
    // which is the biggest single LCP win available on mobile.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
