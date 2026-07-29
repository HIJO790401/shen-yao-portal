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

  const title = locale === "en"
    ? `${film.nameEn} | ${film.status === "ready" ? "Fixed-case demo" : "Demo status"}`
    : `${film.name}｜${film.status === "ready" ? "固定案例 DEMO" : "展示狀態"}`;
  const description = locale === "en" ? film.introEn : film.introZh;
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
