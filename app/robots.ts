import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://silentschoolstudio.com";
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/studio", "/api/studio/"] },
      { userAgent: ["OAI-SearchBot", "GPTBot", "ClaudeBot", "PerplexityBot"], allow: "/", disallow: ["/studio", "/api/studio/"] },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
