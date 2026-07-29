import type { MetadataRoute } from "next";
import { siteOrigin } from "./site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/studio", "/api/studio/"] },
      { userAgent: ["OAI-SearchBot", "GPTBot", "ClaudeBot", "PerplexityBot"], allow: "/", disallow: ["/studio", "/api/studio/"] },
    ],
    sitemap: `${siteOrigin}/sitemap.xml`,
    host: siteOrigin,
  };
}
