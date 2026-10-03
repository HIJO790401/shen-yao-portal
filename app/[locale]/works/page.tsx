import type { Metadata } from "next";
import WorksPage, { metadata as baseMetadata } from "../../works/page";
import { localizedAlternates } from "../../site-config";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = (await params).locale === "en" ? "en" : "zh";
  const isEnglish = locale === "en";
  const title = isEnglish ? "AI Animation, Music & Systems | SERENE SCHOOL STUDIO" : baseMetadata.title;
  const description = isEnglish
    ? "AI-assisted animation and music, systems engineering, fixed-case demos and writing by Wen-Yao Hsu / Shen-Yao 888π. Original work and external source records are linked separately."
    : baseMetadata.description;
  return {
    ...baseMetadata,
    title: isEnglish ? { absolute: title as string } : title,
    description,
    alternates: localizedAlternates(locale, "/works"),
    openGraph: { ...(baseMetadata.openGraph ?? {}), url: `/${locale}/works`, title: title as string, description: description ?? undefined, locale: isEnglish ? "en_US" : "zh_TW" },
  };
}

export default WorksPage;
