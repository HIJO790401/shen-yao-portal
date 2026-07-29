import type { Metadata } from "next";
import WorksPage, { metadata as baseMetadata } from "../../works/page";
import { localizedAlternates } from "../../site-config";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = (await params).locale === "en" ? "en" : "zh";
  const isEnglish = locale === "en";
  return {
    ...baseMetadata,
    title: isEnglish ? "Works | Systems, Animation, Music and Writing" : baseMetadata.title,
    description: isEnglish
      ? "Public systems engineering, fixed-case demos, animation, music and writing by Wen-Yao Hsu / Shen-Yao 888π."
      : baseMetadata.description,
    alternates: localizedAlternates(locale, "/works"),
    openGraph: { ...(baseMetadata.openGraph ?? {}), url: `/${locale}/works` },
  };
}

export default WorksPage;
