import type { MetadataRoute } from "next";
import { SITE_CANONICAL } from "@/lib/site";
import { allMarketingSlugs } from "@/lib/business/route-slugs";

const STATIC = ["", "/services", "/quote", "/gallery", "/reviews", "/shop", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_CANONICAL.replace(/\/$/, "");
  const now = new Date();

  const entries: MetadataRoute.Sitemap = STATIC.map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/quote" ? 0.95 : 0.7,
  }));

  for (const slug of allMarketingSlugs()) {
    entries.push({
      url: `${base}/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    });
  }

  return entries;
}
