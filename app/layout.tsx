import type { Metadata } from "next";
import { Noto_Sans_TC, Space_Grotesk } from "next/font/google";
import { MotionExperience } from "./components/MotionExperience";
import "./globals.css";

const sans = Space_Grotesk({ variable: "--font-sans", subsets: ["latin"] });
const tc = Noto_Sans_TC({ variable: "--font-tc", subsets: ["latin"], weight: ["400", "500", "700", "900"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://silentschoolstudio.com"),
  title: { default: "沉靜流派工作室｜沈耀888π／許文耀", template: "%s｜沉靜流派工作室" },
  description: "沉靜流派工作室創辦人沈耀888π／許文耀的官方網站。語意防火牆、SCBKR、AVRCK 系統架構，以及動畫與音樂創作。",
  keywords: ["沉靜流派", "沈耀888π", "許文耀", "Shen Yao 888pi", "Wen-Yao Hsu", "SCBKR", "AVRCK", "Semantic Firewall", "語意防火牆", "AI governance"],
  authors: [{ name: "沈耀888π／許文耀" }],
  creator: "沈耀888π／許文耀",
  openGraph: { type: "website", locale: "zh_TW", alternateLocale: "en_US", title: "沉靜流派工作室｜沈耀888π／許文耀", description: "Semantic governance, animation and music by independent systems architect Wen-Yao Hsu.", images: ["/media/chenjingliupai-logo.jpg"] },
  twitter: { card: "summary_large_image", title: "沉靜流派工作室｜沈耀888π", description: "Semantic governance, animation and music by independent architect Wen-Yao Hsu.", images: ["/media/chenjingliupai-logo.jpg"] },
  icons: { icon: "/favicon.svg" },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Person", "@id": "https://silentschoolstudio.com/#person", name: "Wen-Yao Hsu", alternateName: ["沈耀888π", "Shen-Yao 888π", "許文耀"], jobTitle: "Founder, Independent Systems Architect, Animation and Music Creator", email: "mailto:ken0963521@gmail.com", sameAs: ["https://github.com/HIJO790401", "https://www.linkedin.com/in/yao-shen-150ab93b2", "https://www.youtube.com/@JM-qy7gv", "https://vocus.cc/salon/hijo19900401/room/hijo1990"] },
    { "@type": "Organization", "@id": "https://silentschoolstudio.com/#studio", name: "沉靜流派工作室", alternateName: "Silent School Studio", founder: { "@id": "https://silentschoolstudio.com/#person" }, url: "https://silentschoolstudio.com" },
    { "@type": "WebSite", "@id": "https://silentschoolstudio.com/#website", name: "沉靜流派工作室｜沈耀888π Official", url: "https://silentschoolstudio.com", inLanguage: ["zh-Hant", "en"], author: { "@id": "https://silentschoolstudio.com/#person" } },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hant"><body className={`${sans.variable} ${tc.variable}`}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><MotionExperience />{children}</body></html>;
}
