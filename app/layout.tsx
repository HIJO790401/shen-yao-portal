import type { Metadata } from "next";
import { Noto_Sans_TC, Noto_Serif_TC, Space_Grotesk } from "next/font/google";
import { MotionExperience } from "./components/MotionExperience";
import { scbkrMicrosoftStore, siteOrigin, siteUrl } from "./site-config";
import "./globals.css";

const sans = Space_Grotesk({ variable: "--font-sans", subsets: ["latin"] });
const tc = Noto_Sans_TC({ variable: "--font-tc", subsets: ["latin"], weight: ["400", "500", "700", "900"] });
const serif = Noto_Serif_TC({ variable: "--font-serif", subsets: ["latin"], weight: ["600", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: { default: "沉靜流派工作室｜SERENE SCHOOL STUDIO｜許文耀／沈耀888π", template: "%s｜沉靜流派工作室" },
  description: "沉靜流派工作室創辦人沈耀888π／許文耀的官方網站。公開已於 Microsoft Store 上架的 SCBKR、語意防火牆、AICC OS v0.2.CANDIDATE 候選架構、動畫及音樂作品。",
  keywords: ["沉靜流派", "沈耀888π", "許文耀", "Shen Yao 888pi", "Wen-Yao Hsu", "古文明符號", "數學公式", "SCBKR", "AICC OS", "AI Capability Compiler", "Semantic Firewall", "語意防火牆", "Artifacts of the Language God", "AI governance"],
  authors: [{ name: "沈耀888π／許文耀" }],
  creator: "沈耀888π／許文耀",
  alternates: { canonical: "/zh", languages: { "zh-Hant": "/zh", en: "/en" } },
  openGraph: { type: "website", locale: "zh_TW", alternateLocale: "en_US", title: "沉靜流派工作室｜SERENE SCHOOL STUDIO", description: "Semantic governance, animation and music by independent systems architect Wen-Yao Hsu.", images: [{ url: "/og.png", width: 1200, height: 630, alt: "SERENE SCHOOL STUDIO water-drop identity" }] },
  twitter: { card: "summary_large_image", title: "沉靜流派工作室｜SERENE SCHOOL STUDIO", description: "Semantic governance, animation and music by independent architect Wen-Yao Hsu.", images: ["/og.png"] },
  icons: { icon: "/favicon.svg" },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Person", "@id": siteUrl("/#person"), name: "Wen-Yao Hsu", alternateName: ["沈耀888π", "Shen-Yao 888π", "許文耀"], jobTitle: "Founder, Independent Systems Architect, Cross-media Creator", homeLocation: { "@type": "Place", name: "Taichung, Taiwan" }, email: "mailto:ken0963521@gmail.com", sameAs: ["https://github.com/HIJO790401", "https://www.youtube.com/@JM-qy7gv", "https://www.tiktok.com/@shenyao888pi", "https://vocus.cc/salon/hijo19900401/room/hijo1990", "https://ai-arts.org/author/shen-yao/"] },
    { "@type": "Organization", "@id": siteUrl("/#studio"), name: "沉靜流派工作室", alternateName: "SERENE SCHOOL STUDIO", description: "An independent studio by Shen-Yao 888π / Wen-Yao Hsu combining ancient symbols, mathematical formulas, system architecture, animation and music.", founder: { "@id": siteUrl("/#person") }, url: siteOrigin },
    { "@type": "WebSite", "@id": siteUrl("/#website"), name: "沉靜流派工作室｜SERENE SCHOOL STUDIO", alternateName: "SERENE SCHOOL STUDIO", url: siteOrigin, inLanguage: ["zh-Hant", "en"], author: { "@id": siteUrl("/#person") } },
    { "@type": "SoftwareApplication", "@id": siteUrl("/zh/demo/scbkr#software"), name: scbkrMicrosoftStore.title, applicationCategory: "ProductivityApplication", operatingSystem: "Windows", datePublished: scbkrMicrosoftStore.datePublished, url: siteUrl("/zh/demo/scbkr"), downloadUrl: scbkrMicrosoftStore.url, sameAs: [scbkrMicrosoftStore.url, "https://github.com/HIJO790401/scbkr-local-responsibility-model"], author: { "@id": siteUrl("/#person") }, offers: { "@type": "Offer", price: "0", priceCurrency: "TWD", url: scbkrMicrosoftStore.url } },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hant" suppressHydrationWarning><body className={`${sans.variable} ${tc.variable} ${serif.variable}`}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><MotionExperience />{children}</body></html>;
}
