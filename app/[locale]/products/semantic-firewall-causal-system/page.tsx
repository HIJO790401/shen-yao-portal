import type { Metadata } from "next";
import { metadata as baseMetadata, SemanticFirewallCausalSystemContent } from "../../../products/semantic-firewall-causal-system/page";
import { localizedAlternates } from "../../../site-config";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = (await params).locale === "en" ? "en" : "zh";
  const isEnglish = locale === "en";
  const title = isEnglish
    ? "Semantic Firewall Causal Security System | SERENE SCHOOL STUDIO"
    : "語意防火牆資安因果系統｜沉靜流派工作室";
  const description = isEnglish
    ? "Defined by Wen-Yao Hsu / Shen-Yao 888π: keep existing sign-in, establish operation-specific relationships, bound compute to candidate generation, review the exact candidate, then return approved effects for controlled execution and replay."
    : baseMetadata.description;
  return {
    ...baseMetadata,
    title: { absolute: title },
    description,
    keywords: isEnglish
      ? ["Semantic Firewall", "causal security system", "AI safety", "AI governance", "causal responsibility", "subject rules", "action eligibility", "bounded compute", "same-candidate review", "controlled execution", "audit replay", "Wen-Yao Hsu", "Shen-Yao 888π"]
      : baseMetadata.keywords,
    alternates: localizedAlternates(locale, "/products/semantic-firewall-causal-system"),
    robots: { index: true, follow: true },
    openGraph: {
      ...(baseMetadata.openGraph ?? {}),
      url: `/${locale}/products/semantic-firewall-causal-system`,
      title,
      description: description ?? undefined,
      locale: isEnglish ? "en_US" : "zh_TW",
      alternateLocale: isEnglish ? "zh_TW" : "en_US",
    },
  };
}

export default async function LocalizedSemanticFirewallCausalSystemPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale === "en" ? "en" : "zh";
  return <SemanticFirewallCausalSystemContent locale={locale} />;
}
