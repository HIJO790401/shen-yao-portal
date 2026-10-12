import type { Metadata } from "next";
import Image from "next/image";
import { stillnessIsALanguage } from "../../../books-data";
import { LocalizedLink } from "../../../components/LanguageControl";
import { SiteFooter } from "../../../components/SiteFooter";
import { SiteHeader } from "../../../components/SiteHeader";
import { localizedAlternates, siteUrl } from "../../../site-config";
import styles from "../books.module.css";

type PageProps = { params: Promise<{ locale: string }> };

function resolveLocale(value: string) {
  return value === "en" ? "en" : "zh";
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const isEnglish = locale === "en";
  const edition = stillnessIsALanguage.edition[locale];
  const title = `${edition.title}｜${edition.subtitle}`;
  const description = isEnglish
    ? "Stillness Is a Language by Wen-Yao Hsu: literary essays on understanding, silence, choice and responsibility. Read the complete Part One public sample."
    : "許文耀／嗨啾／沈耀888PI《沉靜是一種語言》：從理解、沉默、選擇到責任的散文作品，提供第一部正式試讀與繁中電子書購買入口。";

  return {
    title: { absolute: `${title}｜SERENE SCHOOL STUDIO` },
    description,
    keywords: isEnglish
      ? ["Stillness Is a Language", "Before Words Are Found", "Wen-Yao Hsu", "HI-JIU", "SHEN YAO888PI", "literary essays", "responsibility"]
      : ["沉靜是一種語言", "在找不到語言之前", "許文耀", "嗨啾", "沈耀888PI", "散文", "責任"],
    alternates: localizedAlternates(locale, stillnessIsALanguage.detailRoute),
    robots: { index: true, follow: true },
    openGraph: {
      type: "book",
      url: `/${locale}${stillnessIsALanguage.detailRoute}`,
      title,
      description,
      locale: isEnglish ? "en_US" : "zh_TW",
      alternateLocale: isEnglish ? "zh_TW" : "en_US",
      images: [{
        url: stillnessIsALanguage.coverSrc[locale],
        width: 1600,
        height: 2560,
        alt: stillnessIsALanguage.coverAlt[locale],
      }],
    },
  };
}

export default async function StillnessBookPage({ params }: PageProps) {
  const locale = resolveLocale((await params).locale);
  const isEnglish = locale === "en";
  const edition = stillnessIsALanguage.edition[locale];
  const identity = stillnessIsALanguage.authorIdentity[locale];
  const preview = stillnessIsALanguage.preview[locale];
  const store = stillnessIsALanguage.stores[locale];
  const description = stillnessIsALanguage.description[locale];
  const copy = isEnglish
    ? {
        eyebrow: "INDEPENDENTLY PUBLISHED · LITERARY ESSAYS",
        format: "FORMAT",
        formatValue: "Digital book",
        language: "LANGUAGE",
        author: "AUTHOR",
        original: "ORIGINAL WRITING",
        revised: "REVISED EDITION",
        price: "LIST PRICE",
        introduction: "The language before it had a name",
        origin: "Two dates, one continuous subject",
        originalTitle: "2025 · THE WRITING BEGINS",
        originalText: "The essays began as spoken pieces about understanding, silence, choice and responsibility. Their early judgments remain in the author’s own voice.",
        revisedTitle: "2026 · RESPONSIBILITY BECOMES A SYSTEM",
        revisedText: "SCBKR was built later. The revised edition connects that later responsibility practice without rewriting it back into 2025.",
        identity: "One author across three creative periods",
        publication: "Publication and public-release boundary",
        publicationText: `The public sample ends with all five essays in Part One. The complete English manuscript, EPUB and print files are not public website downloads. The English edition is listed at ${store.price}, but no storefront link is shown until platform review produces a verified public product page.`,
        qr: "The QR code printed on the cover leads to the studio homepage, not to a purchase checkout.",
        back: "ALL BOOKS",
      }
    : {
        eyebrow: "個人自行出版 · 散文／人文思考",
        format: "形式",
        formatValue: "電子書",
        language: "語言",
        author: "作者署名",
        original: "原作",
        revised: "書面修訂",
        price: "電子書定價",
        introduction: "在語言還沒有名字以前",
        origin: "兩個時間點，同一個持續負責的主體",
        originalTitle: "2025 · 文字開始出生",
        originalText: "作品從理解、沉默、選擇與責任的口播文字開始。當年已經寫下的判斷，保留原本的主語與力道。",
        revisedTitle: "2026 · 責任成為可檢查的系統",
        revisedText: "SCBKR 是後來才建立的責任鏈路徑。修訂版讓兩段歷程可以被對照，但不把 2026 年的系統倒寫成 2025 年已經存在。",
        identity: "同一位作者，三個創作時期的名字",
        publication: "出版狀態與公開邊界",
        publicationText: `繁中電子書定價 ${store.price}，已在 Pubu 公開販售。官網只公開正式排版第 1–17 頁、至第一部第五篇結束；完整版 PDF、EPUB 與印刷檔不作為免費下載。`,
        qr: "封面上的 QR Code 連到沉靜流派工作室首頁，不是商店付款頁。",
        back: "返回書籍總覽",
      };

  const bookSchema = {
    "@context": "https://schema.org",
    "@type": "Book",
    "@id": siteUrl(`/${locale}${stillnessIsALanguage.detailRoute}#book`),
    name: edition.title,
    alternateName: edition.subtitle,
    description: description.join(" "),
    url: siteUrl(`/${locale}${stillnessIsALanguage.detailRoute}`),
    image: siteUrl(stillnessIsALanguage.coverSrc[locale]),
    inLanguage: edition.languageTag,
    genre: edition.genre,
    bookFormat: "https://schema.org/EBook",
    author: {
      "@type": "Person",
      "@id": siteUrl("/#person"),
      name: "Wen-Yao Hsu",
      alternateName: ["許文耀", "嗨啾", "HI-JIU", "沈耀888PI", "SHEN YAO888PI"],
    },
    publisher: {
      "@type": "Person",
      name: "許文耀",
    },
    copyrightHolder: { "@id": siteUrl("/#person") },
    dateCreated: "2025-06-17",
    dateModified: "2026-10-07",
    isPartOf: { "@id": siteUrl("/#website") },
    ...(locale === "zh"
      ? {
          offers: {
            "@type": "Offer",
            url: store.url,
            price: "199",
            priceCurrency: "TWD",
            availability: "https://schema.org/InStock",
          },
          sameAs: [store.url],
        }
      : {}),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isEnglish ? "Home" : "首頁", item: siteUrl(`/${locale}`) },
      { "@type": "ListItem", position: 2, name: isEnglish ? "Books" : "書籍", item: siteUrl(`/${locale}/books`) },
      { "@type": "ListItem", position: 3, name: edition.title, item: siteUrl(`/${locale}${stillnessIsALanguage.detailRoute}`) },
    ],
  };

  return (
    <>
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bookSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className={styles.page}>
        <section className={styles.detailHero}>
          <div className={styles.detailCoverStage}>
            <div className={styles.detailCover}>
              <Image
                src={stillnessIsALanguage.coverSrc[locale]}
                alt={stillnessIsALanguage.coverAlt[locale]}
                fill
                priority
                unoptimized
                sizes="(max-width: 760px) 72vw, 29vw"
              />
            </div>
          </div>
          <div className={styles.detailCopy}>
            <p className={styles.eyebrow}>{copy.eyebrow}</p>
            <h1>{edition.title}<span className={styles.subtitle}>{edition.subtitle}</span></h1>
            <p>{description[0]}</p>
            <dl className={styles.detailFacts}>
              <div><dt>{copy.author}</dt><dd>{identity.displayLine}</dd></div>
              <div><dt>{copy.language}</dt><dd>{edition.language}</dd></div>
              <div><dt>{copy.original}</dt><dd>{edition.originalWriting}</dd></div>
              <div><dt>{copy.revised}</dt><dd>{edition.revisedEdition}</dd></div>
              <div><dt>{copy.format}</dt><dd>{copy.formatValue}</dd></div>
              <div><dt>{copy.price}</dt><dd>{edition.listPrice}</dd></div>
            </dl>
            <div className={styles.actions}>
              <LocalizedLink className={styles.primaryAction} href={stillnessIsALanguage.previewRoute}>
                {preview.label} <span aria-hidden="true">→</span>
              </LocalizedLink>
              {locale === "zh" && store.url ? (
                <a className={styles.secondaryAction} href={store.url} target="_blank" rel="noreferrer">
                  {store.label} <span aria-hidden="true">↗</span>
                </a>
              ) : (
                <span className={styles.storeStatus}>{store.label} · {store.price}</span>
              )}
            </div>
          </div>
        </section>

        <section className={styles.bookBody}>
          <aside className={styles.bodyIndex}>
            <span>{preview.proportion}</span>
            <span>{preview.scope}</span>
            <LocalizedLink href="/books">← {copy.back}</LocalizedLink>
          </aside>
          <div className={styles.bodyCopy}>
            <section>
              <h2>{copy.introduction}</h2>
              {description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </section>

            <section>
              <h2>{copy.origin}</h2>
              <div className={styles.originTimeline}>
                <article><small>2025</small><h3>{copy.originalTitle}</h3><p>{copy.originalText}</p></article>
                <article><small>2026</small><h3>{copy.revisedTitle}</h3><p>{copy.revisedText}</p></article>
              </div>
            </section>

            <section>
              <h2>{copy.identity}</h2>
              <blockquote>{identity.displayLine}</blockquote>
              <p>{identity.explanation}</p>
              <p>{stillnessIsALanguage.biography[locale]}</p>
            </section>

            <section>
              <h2>{copy.publication}</h2>
              <p>{copy.publicationText}</p>
              <p>{copy.qr}</p>
            </section>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
