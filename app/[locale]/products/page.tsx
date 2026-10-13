import type { Metadata } from "next";
import ProductsPage, { metadata as baseMetadata } from "../../products/page";
import { localizedAlternates } from "../../site-config";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = (await params).locale === "en" ? "en" : "zh";
  const isEnglish = locale === "en";
  const title = isEnglish ? "AI Safety & Governance Products | SERENE SCHOOL STUDIO" : baseMetadata.title;
  const description = isEnglish
    ? "AI safety and governance products from SERENE SCHOOL STUDIO: the Semantic Firewall Causal Security System, AICC OS v0.2.CANDIDATE, WIF, TIRC and bounded fixed-case demos. SCBKR is available free on Microsoft Store."
    : baseMetadata.description;
  return {
    ...baseMetadata,
    title: isEnglish ? { absolute: title as string } : title,
    description,
    alternates: localizedAlternates(locale, "/products"),
    openGraph: { ...(baseMetadata.openGraph ?? {}), url: `/${locale}/products`, title: title as string, description: description ?? undefined, locale: isEnglish ? "en_US" : "zh_TW" },
  };
}

export default ProductsPage;
