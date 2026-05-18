import type { MetadataRoute } from "next";
import { getAllAreaSlugs } from "@/content/areas-content";
import { ALL_GUIDES } from "@/content/guides";
import { getAllBlogPosts } from "@/content/blog";
import { SERVICE_REGION_PAGES } from "@/content/service-regions";
import { SITE_LAST_UPDATED } from "@/lib/constants";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gentlecarenursing.com.au";

/**
 * Returns a Date for the static-page lastmod. Falls back to "now" if the
 * SITE_LAST_UPDATED constant is malformed (defensive — should never happen).
 */
function staticPageLastModified(): Date {
  const d = new Date(SITE_LAST_UPDATED);
  return Number.isNaN(d.getTime()) ? new Date() : d;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticLastMod = staticPageLastModified();

  const staticRoutes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
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
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
    { path: "/guides", priority: 0.7, changeFrequency: "monthly" },
    { path: "/areas", priority: 0.85, changeFrequency: "monthly" },
    {
      path: "/compare",
      priority: 0.7,
      changeFrequency: "monthly",
    },
    {
      path: "/compare/registered-ndis-provider-vs-non-registered",
      priority: 0.75,
      changeFrequency: "monthly",
    },
    {
      path: "/compare/dva-community-nursing-vs-private-nursing",
      priority: 0.75,
      changeFrequency: "monthly",
    },
    {
      path: "/compare/in-home-nursing-vs-residential-aged-care",
      priority: 0.75,
      changeFrequency: "monthly",
    },
    {
      path: "/compare/clinician-led-vs-agency-staff",
      priority: 0.75,
      changeFrequency: "monthly",
    },
  ];

  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: staticLastMod,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  for (const slug of getAllAreaSlugs()) {
    entries.push({
      url: `${BASE_URL}/areas/${slug}`,
      lastModified: staticLastMod,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  for (const page of SERVICE_REGION_PAGES) {
    entries.push({
      url: `${BASE_URL}${page.path}`,
      lastModified: staticLastMod,
      changeFrequency: "monthly",
      priority: 0.85,
    });
  }

  for (const guide of ALL_GUIDES) {
    const dateString = guide.reviewedAt ?? guide.publishedAt;
    const lastMod = dateString ? new Date(dateString) : staticLastMod;
    entries.push({
      url: `${BASE_URL}/guides/${guide.slug}`,
      lastModified: Number.isNaN(lastMod.getTime()) ? staticLastMod : lastMod,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  entries.push({
    url: `${BASE_URL}/blog`,
    lastModified: staticLastMod,
    changeFrequency: "weekly",
    priority: 0.8,
  });

  for (const post of getAllBlogPosts()) {
    const dateString = post.updatedAt ?? post.publishedAt;
    const lastMod = new Date(dateString);
    entries.push({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: Number.isNaN(lastMod.getTime()) ? staticLastMod : lastMod,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return entries;
}
