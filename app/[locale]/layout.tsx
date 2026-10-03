import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LocaleProvider, type Locale } from "../components/LanguageControl";

export function generateStaticParams() {
  return [{ locale: "zh" }, { locale: "en" }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEnglish = locale === "en";
  const title = isEnglish
    ? "SERENE SCHOOL STUDIO | Wen-Yao Hsu / Shen-Yao 888π | AI Safety & Governance"
    : "沉靜流派工作室｜許文耀／沈耀888π｜AI 安全與治理";
  const description = isEnglish
    ? "Wen-Yao Hsu / Shen-Yao 888π's independent studio for AI safety and governance: the SCBKR Windows application on Microsoft Store, Semantic Firewall, AICC OS candidate architecture, animation and music."
    : "許文耀／沈耀888π的沉靜流派工作室：以 SCBKR 責任鏈語言模型、語意防火牆與 AICC OS 候選架構探索 AI 安全、AI 治理，並公開動畫與音樂作品。";
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: isEnglish ? "/en" : "/zh", languages: { "zh-Hant": "/zh", en: "/en" } },
    openGraph: { title, description, url: isEnglish ? "/en" : "/zh", locale: isEnglish ? "en_US" : "zh_TW", alternateLocale: isEnglish ? "zh_TW" : "en_US" },
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "zh" && locale !== "en") notFound();
  return <LocaleProvider locale={locale as Locale}><div lang={locale === "en" ? "en" : "zh-Hant"} data-locale={locale}>{children}</div></LocaleProvider>;
}
