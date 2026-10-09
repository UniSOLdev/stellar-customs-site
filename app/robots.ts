import type { MetadataRoute } from "next";
import { SITE_CANONICAL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const base = SITE_CANONICAL.replace(/\/$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/login"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
