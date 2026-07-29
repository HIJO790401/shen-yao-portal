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
      ? "Founder of SERENE SCHOOL STUDIO and the Semantic Firewall, combining ancient symbols, mathematical formulas, system architecture, animation and music."
      : baseMetadata.description,
    alternates: localizedAlternates(locale, "/about"),
    openGraph: { ...(baseMetadata.openGraph ?? {}), url: `/${locale}/about` },
  };
}

export default AboutPage;
