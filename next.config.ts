import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Netlify's static header rules do not cover function-rendered responses.
  // Keep these policies identical to netlify.toml so pages, errors and assets
  // receive the same baseline. Policy parity is checked by regression tests.
  async headers() {
    return [{
      source: "/:path*",
      headers: [
        { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com;" },
      ],
    }];
  },
  // Opt-in for the sequential build command on memory-constrained runners.
  ...(process.env.NEXT_BUILD_LOW_MEMORY === "1" ? {
    experimental: {
      cpus: 1,
      webpackMemoryOptimizations: true,
      // Keep compiler isolation enabled so each compiler can release its memory.
      parallelServerCompiles: false,
      parallelServerBuildTraces: false,
    },
  } : {}),
  images: {
    // AVIF first so modern browsers get the smaller format; WebP fallback
    // covers everything else. Hero photos drop ~25–35% in size with AVIF,
    // which is the biggest single LCP win available on mobile.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
