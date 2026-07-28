import type { MetadataRoute } from "next";
import { productFilms } from "./showcase-data";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://silentschoolstudio.com";
const updated = new Date("2026-07-28T00:00:00+08:00");

const reportSlugs = [
  "openai-tbpn-audit",
  "yan-rm-ai-replace-myth-audit",
  "abstract-math-audit",
  "giant-ai-deep-think-illusion-audit",
  "massage-talk-ai-safety-love",
  "platform-rebuild",
  "governance-before-action",
];

const museumSlugs = [
  "abstract-sanctuary",
  "glass-brain-chamber-ip-echo-state",
  "theology-outsourcing",
  "ya-rm-ep001-massage-talk",
  "yc-rm-c006-ai-deep-think-evaporation",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const primary = ["", "/products", "/works", "/news", "/about", "/resume"];
  const demos = productFilms.map(({ slug }) => `/demo/${slug}`);
  const reports = reportSlugs.map((slug) => `/news/${slug}`);
  const museum = museumSlugs.map((slug) => `/news/museum/${slug}`);
  const localized = ["zh", "en"].flatMap((locale) =>
    [...primary, ...demos, ...reports, ...museum].map((path) => `/${locale}${path}`),
  );
  const routes = ["/", ...primary.filter(Boolean), ...demos, ...reports, ...museum, ...localized];

  return [...new Set(routes)].map((path) => ({
    url: `${base}${path}`,
    lastModified: updated,
    changeFrequency: path.includes("/news") ? "weekly" : "monthly",
    priority: path === "/" || path === "/zh" || path === "/en" ? 1 : path.includes("/demo/") ? 0.72 : 0.82,
  }));
}
