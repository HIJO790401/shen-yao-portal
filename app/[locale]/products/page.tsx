import type { Metadata } from "next";
import ProductsPage, { metadata as baseMetadata } from "../../products/page";
import { localizedAlternates } from "../../site-config";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = (await params).locale === "en" ? "en" : "zh";
  const isEnglish = locale === "en";
  return {
    ...baseMetadata,
    title: isEnglish ? "Products and Engineering Works" : baseMetadata.title,
    description: isEnglish
      ? "Products and engineering works from SERENE SCHOOL STUDIO: SCBKR is available free on Microsoft Store, alongside the AICC OS v0.2.CANDIDATE architecture, Semantic Firewall, WIF, TIRC and bounded fixed-case demonstrations."
      : baseMetadata.description,
    alternates: localizedAlternates(locale, "/products"),
    openGraph: { ...(baseMetadata.openGraph ?? {}), url: `/${locale}/products` },
  };
}

export default ProductsPage;
