import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LocaleProvider, type Locale } from "../components/LanguageControl";

export function generateStaticParams() {
  return [{ locale: "zh" }, { locale: "en" }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEnglish = locale === "en";
  return {
    title: isEnglish ? "SERENE SCHOOL STUDIO | Wen-Yao Hsu / Shen-Yao 888π" : "沉靜流派工作室｜許文耀／沈耀888π",
    description: isEnglish
      ? "The official studio of independent systems architect Wen-Yao Hsu / Shen-Yao 888π: the SCBKR Windows application on Microsoft Store, Semantic Firewall, the AICC OS candidate architecture, animation and music."
      : "沉靜流派工作室官方網站：許文耀／沈耀888π已於 Microsoft Store 上架的 SCBKR、語意防火牆、AICC OS 候選架構、系統設計、動畫與音樂創作。",
    alternates: { canonical: isEnglish ? "/en" : "/zh", languages: { "zh-Hant": "/zh", en: "/en" } },
    openGraph: { locale: isEnglish ? "en_US" : "zh_TW", alternateLocale: isEnglish ? "zh_TW" : "en_US" },
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "zh" && locale !== "en") notFound();
  return <LocaleProvider locale={locale as Locale}><div lang={locale === "en" ? "en" : "zh-Hant"} data-locale={locale}>{children}</div></LocaleProvider>;
}
