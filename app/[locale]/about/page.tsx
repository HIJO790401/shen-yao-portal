import type { Metadata } from "next";
import AboutPage, { metadata as baseMetadata } from "../../about/page";
import { localizedAlternates } from "../../site-config";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = (await params).locale === "en" ? "en" : "zh";
  const isEnglish = locale === "en";
  const title = isEnglish ? "Wen-Yao Hsu / Shen-Yao 888π | AI Governance & Founder" : baseMetadata.title;
  const description = isEnglish
    ? "Wen-Yao Hsu / Shen-Yao 888π founded SERENE SCHOOL STUDIO and the Semantic Firewall. His work spans AI safety and governance, SCBKR responsibility chains, systems architecture, animation and music."
    : "許文耀／沈耀888π創辦沉靜流派工作室與語意防火牆，以 SCBKR 責任鏈探索 AI 安全、AI 治理，並公開系統架構、動畫與音樂作品。";
  return {
    ...baseMetadata,
    title: isEnglish ? { absolute: title as string } : title,
    description,
    alternates: localizedAlternates(locale, "/about"),
    openGraph: { ...(baseMetadata.openGraph ?? {}), url: `/${locale}/about`, title: title as string, description, locale: isEnglish ? "en_US" : "zh_TW" },
  };
}

export default AboutPage;
