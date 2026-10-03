import type { Metadata } from "next";
import { findFilm } from "@/app/showcase-data";
import { localizedAlternates } from "@/app/site-config";

export { default, generateStaticParams } from "../../../demo/[slug]/page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale === "en" ? "en" : "zh";
  const film = findFilm(slug);
  if (!film) {
    return {
      title: locale === "en" ? "Demo not found" : "展示不存在",
      robots: { index: false, follow: false },
    };
  }

  const architecture = film.presentation === "architecture";
  const title = slug === "scbkr"
    ? locale === "en" ? "SCBKR 2.3.1 | AI Safety & Responsibility Governance" : "SCBKR 2.3.1｜AI 安全與責任鏈治理"
    : locale === "en"
      ? `${film.nameEn} | ${architecture ? "Candidate architecture film" : film.status === "ready" ? "Fixed-case demo" : "Demo status"}`
      : `${film.name}｜${architecture ? "候選架構動畫" : film.status === "ready" ? "固定案例 DEMO" : "展示狀態"}`;
  const description = slug === "scbkr"
    ? locale === "en"
      ? "Wen-Yao Hsu's SCBKR 2.3.1 for AI safety and governance: a local responsibility-chain app with human-signed rules, deterministic applicability and evidence rechecks before storage."
      : "許文耀／沈耀888π 的 SCBKR 責任鏈語言模型 2.3.1：以使用者簽名規則、明確適用條件與證據重查支援本地 AI 安全與治理。"
    : locale === "en" ? film.introEn : film.introZh;
  const path = `/demo/${slug}`;

  return {
    title: locale === "en" ? { absolute: `${title} | SERENE SCHOOL STUDIO` } : title,
    description,
    alternates: localizedAlternates(locale, path),
    openGraph: {
      url: `/${locale}${path}`,
      title,
      description,
      locale: locale === "en" ? "en_US" : "zh_TW",
      alternateLocale: locale === "en" ? "zh_TW" : "en_US",
    },
  };
}
