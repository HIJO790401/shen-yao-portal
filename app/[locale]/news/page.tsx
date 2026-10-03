import type { Metadata } from "next";
import NewsPage, { metadata as baseMetadata } from "../../news/page";
import { localizedAlternates } from "../../site-config";

export { dynamic } from "../../news/page";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = (await params).locale === "en" ? "en" : "zh";
  const isEnglish = locale === "en";
  const title = isEnglish ? "Reality Newsroom & Responsibility Museum | SERENE SCHOOL STUDIO" : baseMetadata.title;
  const description = isEnglish
    ? "Independent AI governance reporting, responsibility audits and museum accessions by Wen-Yao Hsu / Shen-Yao 888π, with published articles, videos and source records."
    : baseMetadata.description;
  return {
    ...baseMetadata,
    title: isEnglish ? { absolute: title as string } : title,
    description,
    alternates: localizedAlternates(locale, "/news"),
    openGraph: { ...(baseMetadata.openGraph ?? {}), url: `/${locale}/news`, title: title as string, description: description ?? undefined, locale: isEnglish ? "en_US" : "zh_TW" },
  };
}

export default NewsPage;
