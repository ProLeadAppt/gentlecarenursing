import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first so modern browsers get the smaller format; WebP fallback
    // covers everything else. Hero photos drop ~25–35% in size with AVIF,
    // which is the biggest single LCP win available on mobile.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
