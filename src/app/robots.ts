import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gentlecarenursing.com.au";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/review", "/review/*"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
