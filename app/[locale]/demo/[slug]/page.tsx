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
    ? locale === "en" ? "What Is an AI Responsibility Chain? | SCBKR" : "AI 責任鏈是什麼？｜SCBKR 責任鏈語言模型"
    : locale === "en"
      ? `${film.nameEn} | ${architecture ? "Candidate architecture film" : film.status === "ready" ? "Fixed-case demo" : "Demo status"}`
      : `${film.name}｜${architecture ? "候選架構動畫" : film.status === "ready" ? "固定案例 DEMO" : "展示狀態"}`;
  const description = slug === "scbkr"
    ? locale === "en"
      ? "Explore Wen-Yao Hsu's SCBKR AI responsibility chain: input routing, model drafts, kernel validation, human signature and replay boundaries."
      : "許文耀／沈耀888π 的 SCBKR 責任鏈語言模型：了解 AI 責任鏈的硬路由、模型草擬、核心驗證、使用者簽名與回放邊界。"
    : locale === "en" ? film.introEn : film.introZh;
  const path = `/demo/${slug}`;

  return {
    title,
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
