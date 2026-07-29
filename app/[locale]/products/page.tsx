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
      ? "Code-audited Semantic Firewall, SCBKR, WIF, TIRC and fixed-case demonstrations with explicit capability boundaries."
      : baseMetadata.description,
    alternates: localizedAlternates(locale, "/products"),
    openGraph: { ...(baseMetadata.openGraph ?? {}), url: `/${locale}/products` },
  };
}

export default ProductsPage;
