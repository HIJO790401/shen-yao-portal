import type { Metadata } from "next";
import Image from "next/image";
import { LocalizedLink } from "../../../../components/LanguageControl";
import { SiteFooter } from "../../../../components/SiteFooter";
import { SiteHeader } from "../../../../components/SiteHeader";
import { judgmentOfCivilization } from "../../../../judgment-book-data";
import { localizedAlternates, siteUrl } from "../../../../site-config";
import styles from "../judgment.module.css";

type PageProps = { params: Promise<{ locale: string }> };

function resolveLocale(value: string) {
  return value === "en" ? "en" : "zh";
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const isEnglish = locale === "en";
  const title = isEnglish
    ? "Civilizational Case Archive | The Judgment of a False Civilization"
    : "文明案件檔案館｜虛偽文明的審判";
  const description = isEnglish
    ? "Seven website selections from an in-progress Chinese work that dismantles civilization’s falsehoods and audits unaccountable knowledge-use authority. They are not its fixed table of contents or completed English manuscript."
    : "《虛偽文明的審判》官網選錄：以七張圖卡、短判詞與摘要解構文明的虛偽；這不是全書固定目錄、完成章數或公開全文。";

  return {
    title: { absolute: title },
    description,
    keywords: isEnglish
      ? ["civilizational case archive", "responsibility proof chain", "sacrifice", "myth", "power", "AI governance", "Wen-Yao Hsu"]
      : ["文明案件檔案", "虛偽文明的審判", "責任證成鏈", "祭祀", "神話", "權力", "AI 治理", "許文耀"],
    alternates: localizedAlternates(locale, judgmentOfCivilization.casesRoute),
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      url: `/${locale}${judgmentOfCivilization.casesRoute}`,
      title,
      description,
      locale: isEnglish ? "en_US" : "zh_TW",
      alternateLocale: isEnglish ? "zh_TW" : "en_US",
      images: [{
        url: "/media/books/judgment-of-civilization/case-001.jpg",
        width: 864,
        height: 1536,
        alt: judgmentOfCivilization.cases[0].imageAlt[locale],
      }],
    },
  };
}

export default async function CivilizationCasesPage({ params }: PageProps) {
  const locale = resolveLocale((await params).locale);
  const isEnglish = locale === "en";
  const copy = isEnglish
    ? {
        eyebrow: "PUBLIC CASE ARCHIVE / SUMMARY-ONLY RELEASE",
        title: "I dismantle civilization’s falsehoods, case by case.",
        lede: "I release seven artwork-led dossiers here to show how I cut into civilization’s breaks in responsibility. They are not the book’s fixed order or completed chapter count. My current source document maps eight parts and 34 provisional cases; every formal chapter combines my complete text with RPC-00–15.",
        back: "BACK TO THE BOOK",
        main: "PRINCIPAL CASE",
        interlude: "INTERLUDE",
        verdict: "PUBLIC SHORT VERDICT",
        summary: "PUBLIC DOSSIER SUMMARY",
        boundary: "I publish this page as an English overview of my Chinese work. I do not present it as a completed English manuscript, a full-text preview, a published edition or a storefront listing.",
      }
    : {
        eyebrow: "公開案件檔案館／摘要限定釋出",
        title: "我把文明的虛偽逐案拆開。",
        lede: "我在官網公開七張圖卡，讓讀者看見我如何從案件切開文明的責任斷裂。這不是全書固定順序或完成章數；我的現行母檔仍以八部、34 個暫定案件導航，每一章都由我的完整正文與 RPC-00～15 責任證成鏈構成。",
        back: "返回書籍詳情",
        main: "主案",
        interlude: "番外",
        verdict: "公開短判詞",
        summary: "公開案件摘要",
        boundary: "我只在本頁公開選錄圖卡、短判詞與非連續摘要；我沒有公開完整章節、下載檔、ISBN，也不把它寫成完整試讀、固定目錄、出版成品、商店頁或尚未成立的出版狀態。",
      };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: isEnglish ? "Civilizational Case Archive" : "文明案件檔案館",
    url: siteUrl(`/${locale}${judgmentOfCivilization.casesRoute}`),
    inLanguage: isEnglish ? "en" : "zh-Hant",
    isPartOf: { "@id": siteUrl("/#website") },
    about: judgmentOfCivilization.title[locale],
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: judgmentOfCivilization.cases.length,
      itemListElement: judgmentOfCivilization.cases.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.title[locale],
        url: `${siteUrl(`/${locale}${judgmentOfCivilization.casesRoute}`)}#${item.id}`,
      })),
    },
  };

  return (
    <>
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <main className={styles.page}>
        <section className={styles.archiveHero}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h1>{copy.title}</h1>
          <p>{copy.lede}</p>
          <LocalizedLink className={styles.secondaryAction} href={judgmentOfCivilization.detailRoute}>{copy.back}<span aria-hidden="true">←</span></LocalizedLink>
        </section>

        <ol className={styles.caseList}>
          {judgmentOfCivilization.cases.map((item, index) => (
            <li key={item.id}>
              <article id={item.id} className={`${styles.caseCard} ${item.kind === "interlude" ? styles.interludeCard : ""}`}>
                <div className={styles.caseArtwork}>
                  <Image
                    src={item.image}
                    alt={item.imageAlt[locale]}
                    fill
                    unoptimized
                    sizes="(max-width: 760px) 100vw, 46vw"
                  />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className={styles.caseCopy}>
                  <div className={styles.caseMeta}>
                    <span>{item.code}</span>
                    <span>{item.kind === "interlude" ? copy.interlude : copy.main}</span>
                  </div>
                  <h2>{item.title[locale]}</h2>
                  <small>{copy.verdict}</small>
                  <blockquote>{item.shortVerdict[locale]}</blockquote>
                  <small>{copy.summary}</small>
                  <p>{item.summary[locale]}</p>
                  <span className={styles.releaseState}>{item.releaseState[locale]}</span>
                </div>
              </article>
            </li>
          ))}
        </ol>

        <aside className={styles.archiveBoundary}>
          <span>BOUNDARY / 2026-10-14</span>
          <p>{copy.boundary}</p>
        </aside>
      </main>
      <SiteFooter />
    </>
  );
}
