import type { Metadata } from "next";
import AboutPage, { metadata as baseMetadata } from "../../about/page";
import { localizedAlternates } from "../../site-config";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = (await params).locale === "en" ? "en" : "zh";
  const isEnglish = locale === "en";
  return {
    ...baseMetadata,
    title: isEnglish ? "Wen-Yao Hsu / Shen-Yao 888π | Founder" : baseMetadata.title,
    description: isEnglish
      ? "Wen-Yao Hsu's founding manifesto defines the path of judgment before applying computational power across the Semantic Firewall, systems architecture, animation and music."
      : "許文耀／沈耀888π的沉靜流派工作室創辦人介紹與核心宣言：先定義判斷路徑，再讓算力依此執行；並公開語意防火牆、系統架構、動畫與音樂作品。",
    alternates: localizedAlternates(locale, "/about"),
    openGraph: { ...(baseMetadata.openGraph ?? {}), url: `/${locale}/about` },
  };
}

export default AboutPage;
