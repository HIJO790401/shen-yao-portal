import type { Metadata } from "next";
import ResumePage from "../../resume/page";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEnglish = locale === "en";
  return {
    title: { absolute: isEnglish ? "Public Resume | Wen-Yao Hsu / Shen-Yao 888π | SERENE SCHOOL STUDIO" : "公開履歷｜許文耀／沈耀888π｜沉靜流派工作室" },
    description: isEnglish
      ? "A source-labelled public resume covering Wen-Yao Hsu's independent systems architecture, Semantic Firewall, SCBKR, TIRC, public records, writing, animation and music."
      : "許文耀／沈耀888π的可查證公開履歷：獨立系統架構、語意防火牆、SCBKR、TIRC、公開紀錄、文章、動畫與音樂。",
    alternates: {
      canonical: isEnglish ? "/en/resume" : "/zh/resume",
      languages: { "zh-Hant": "/zh/resume", en: "/en/resume", "x-default": "/zh/resume" },
    },
    openGraph: {
      url: isEnglish ? "/en/resume" : "/zh/resume",
      title: isEnglish ? "Public Resume | Wen-Yao Hsu / Shen-Yao 888π" : "公開履歷｜許文耀／沈耀888π",
      description: isEnglish
        ? "A source-labelled profile of independent systems architecture, public engineering, writing, animation and music."
        : "附來源標籤的獨立系統架構、公開工程、文章、動畫與音樂履歷。",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "SERENE SCHOOL STUDIO" }],
    },
  };
}

export default async function LocalizedResumePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <ResumePage locale={locale === "en" ? "en" : "zh"} />;
}
