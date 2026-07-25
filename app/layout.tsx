import type { Metadata } from "next";
import { Noto_Sans_TC, Space_Grotesk } from "next/font/google";
import { MotionExperience } from "./components/MotionExperience";
import "./globals.css";

const sans = Space_Grotesk({ variable: "--font-sans", subsets: ["latin"] });
const tc = Noto_Sans_TC({ variable: "--font-tc", subsets: ["latin"], weight: ["400", "500", "700", "900"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://silentschoolstudio.com"),
  title: { default: "沉靜流派工作室｜SERENE SCHOOL STUDIO｜許文耀／沈耀888π", template: "%s｜沉靜流派工作室" },
  description: "沉靜流派工作室創辦人沈耀888π／許文耀的官方網站。融合古文明符號、數學公式與系統架構，公開語意防火牆、SCBKR、AVRCK、動畫及音樂作品。",
  keywords: ["沉靜流派", "沈耀888π", "許文耀", "Shen Yao 888pi", "Wen-Yao Hsu", "古文明符號", "數學公式", "SCBKR", "AVRCK", "Semantic Firewall", "語意防火牆", "Artifacts of the Language God", "AI governance"],
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
    { "@type": "Person", "@id": "https://silentschoolstudio.com/#person", name: "Wen-Yao Hsu", alternateName: ["沈耀888π", "Shen-Yao 888π", "許文耀"], jobTitle: "Founder, Independent Systems Architect, Symbolic and Mathematical Creator", homeLocation: { "@type": "Place", name: "Taichung, Taiwan" }, email: "mailto:ken0963521@gmail.com", sameAs: ["https://github.com/HIJO790401", "https://www.youtube.com/@JM-qy7gv", "https://vocus.cc/salon/hijo19900401/room/hijo1990", "https://ai-arts.org/author/shen-yao/"] },
    { "@type": "Organization", "@id": "https://silentschoolstudio.com/#studio", name: "沉靜流派工作室", alternateName: "SERENE SCHOOL STUDIO", description: "An independent studio by Shen-Yao 888π / Wen-Yao Hsu combining ancient symbols, mathematical formulas, system architecture, animation and music.", founder: { "@id": "https://silentschoolstudio.com/#person" }, url: "https://silentschoolstudio.com" },
    { "@type": "WebSite", "@id": "https://silentschoolstudio.com/#website", name: "沉靜流派工作室｜SERENE SCHOOL STUDIO", alternateName: "SERENE SCHOOL STUDIO", url: "https://silentschoolstudio.com", inLanguage: ["zh-Hant", "en"], author: { "@id": "https://silentschoolstudio.com/#person" } },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hant"><body className={`${sans.variable} ${tc.variable}`}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><MotionExperience />{children}</body></html>;
}
