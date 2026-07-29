import type { Metadata } from "next";
import NewsPage, { metadata as baseMetadata } from "../../news/page";
import { localizedAlternates } from "../../site-config";

export { dynamic } from "../../news/page";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = (await params).locale === "en" ? "en" : "zh";
  const isEnglish = locale === "en";
  return {
    ...baseMetadata,
    title: isEnglish ? "Reality Newsroom × Responsibility Museum" : baseMetadata.title,
    description: isEnglish
      ? "Independent reporting, responsibility audits, public accessions and a fourteen-axis editorial platform."
      : baseMetadata.description,
    alternates: localizedAlternates(locale, "/news"),
    openGraph: { ...(baseMetadata.openGraph ?? {}), url: `/${locale}/news` },
  };
}

export default NewsPage;
