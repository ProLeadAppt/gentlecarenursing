import type { MetadataRoute } from "next";
import { getAllAreaSlugs } from "@/content/areas-content";
import { getAllGuideSlugs } from "@/content/guides";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gentlecarenursing.com.au";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/ndis", priority: 0.9, changeFrequency: "monthly" },
    { path: "/dva", priority: 0.9, changeFrequency: "monthly" },
    { path: "/aged-care", priority: 0.9, changeFrequency: "monthly" },
    { path: "/private-nursing", priority: 0.9, changeFrequency: "monthly" },
    { path: "/referral", priority: 0.9, changeFrequency: "monthly" },
    { path: "/referrers", priority: 0.85, changeFrequency: "monthly" },
    { path: "/services/post-hospital-care", priority: 0.8, changeFrequency: "monthly" },
    { path: "/services/complex-care", priority: 0.8, changeFrequency: "monthly" },
    { path: "/services/hospital-at-home", priority: 0.8, changeFrequency: "monthly" },
    { path: "/services/palliative-care", priority: 0.8, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/areas", priority: 0.85, changeFrequency: "monthly" },
  ];

  const areaSlugs = getAllAreaSlugs();
  for (const slug of areaSlugs) {
    routes.push({ path: `/areas/${slug}`, priority: 0.8, changeFrequency: "monthly" });
  }

  const guideSlugs = getAllGuideSlugs();
  for (const slug of guideSlugs) {
    routes.push({ path: `/guides/${slug}`, priority: 0.7, changeFrequency: "monthly" });
  }

  return routes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
