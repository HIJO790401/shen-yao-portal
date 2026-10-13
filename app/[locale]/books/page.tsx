import type { Metadata } from "next";
import Image from "next/image";
import { booksHubEntries } from "../../books-data";
import { LocalizedLink } from "../../components/LanguageControl";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { localizedAlternates, siteUrl } from "../../site-config";
import styles from "./books.module.css";

type PageProps = { params: Promise<{ locale: string }> };

function resolveLocale(value: string) {
  return value === "en" ? "en" : "zh";
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const isEnglish = locale === "en";
  const title = isEnglish
    ? "Literature & Books | SERENE SCHOOL STUDIO"
    : "文學與書籍｜沉靜流派工作室";
  const description = isEnglish
    ? "Books by Wen-Yao Hsu / Shen-Yao 888π: Stillness Is a Language, The Name That Existed in the Interrogation Room, and The Judgment of a False Civilization, which dismantles civilization’s falsehoods through responsibility-chain audit."
    : "許文耀／沈耀888PI的文學與書籍專區，收錄《沉靜是一種語言》、《審訊室存在過的名字》與逐案解構文明虛偽的《虛偽文明的審判》，並清楚標示公開邊界。";

  return {
    title: { absolute: title },
    description,
    keywords: isEnglish
      ? ["Wen-Yao Hsu books", "Shen-Yao 888PI", "Stillness Is a Language", "The Judgment of a False Civilization", "civilization falsehoods", "responsibility proof chain", "knowledge-use authority", "AI governance writing"]
      : ["許文耀 書籍", "沈耀888PI", "沉靜是一種語言", "散文", "責任鏈", "審訊室存在過的名字", "虛偽文明的審判", "解構文明的虛偽", "知識使用權", "文明審判"],
    alternates: localizedAlternates(locale, "/books"),
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      url: `/${locale}/books`,
      title,
      description,
      locale: isEnglish ? "en_US" : "zh_TW",
      alternateLocale: isEnglish ? "zh_TW" : "en_US",
      images: [{
        url: isEnglish
          ? "/media/books/stillness-is-a-language/cover-en.jpg"
          : "/media/books/stillness-is-a-language/cover-zh.jpg",
        width: 1600,
        height: 2560,
        alt: isEnglish ? "Stillness Is a Language" : "沉靜是一種語言",
      }],
    },
  };
}

export default async function BooksHubPage({ params }: PageProps) {
  const locale = resolveLocale((await params).locale);
  const isEnglish = locale === "en";
  const copy = isEnglish
    ? {
        eyebrow: "LITERATURE / BOOKS / AUTHORIAL WORK",
        title: "I write each book as a world I am willing to answer for.",
        intro:
          "I keep my literary work separate from products and news. Each title retains the world, language, publication state and public-release boundary I defined for it.",
        original: "ORIGINAL WRITING",
        originalValue: "2025 → PRESENT",
        languages: "LANGUAGES",
        languagesValue: "ZH-HANT / EN",
        heading: "I built three different worlds across three works.",
        headingNote:
          "I give luminous water, a sealed interrogation room and an obsidian civilizational dossier distinct visual worlds while keeping them inside one publishing architecture.",
        boundary: "PUBLICATION BOUNDARY",
        boundaryText:
          "I choose every public excerpt deliberately. Complete manuscripts, full PDFs, EPUB files and print assets remain outside the public website unless I explicitly release them.",
        waterLabel: "STILLNESS IS NOT AN ENDING",
      }
    : {
        eyebrow: "文學／書籍／作者主體",
        title: "我把每本書寫成我願意承擔的世界。",
        intro:
          "我把自己的文學作品從產品與新聞中獨立出來。每一本書保有我為它建立的世界、語言、出版狀態與公開邊界，不被混成一般作品清單。",
        original: "原作時間",
        originalValue: "2025 → 持續創作",
        languages: "語言版本",
        languagesValue: "繁中／英文",
        heading: "我在三部作品裡，建立三套不同的世界。",
        headingNote:
          "我讓《沉靜》保留水與光，讓《審訊室》保留封閉冷硬的場域，並以黑曜石、青銅與責任紅線建立《虛偽文明的審判》的案件檔案。三者只共享出版架構，不互相污染。",
        boundary: "公開邊界",
        boundaryText:
          "每一份試讀都由我明確決定公開範圍。完整書稿、完整版 PDF、EPUB 與印刷檔不會進入公開網站，除非我另行決定公開。",
        waterLabel: "沉靜不是終止",
      };

  const itemList = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: isEnglish ? "Literature & Books" : "文學與書籍",
    url: siteUrl(`/${locale}/books`),
    inLanguage: isEnglish ? "en" : "zh-Hant",
    isPartOf: { "@id": siteUrl("/#website") },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: booksHubEntries.map((book, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: book.title[locale],
        url: siteUrl(`/${locale}${book.route}`),
      })),
    },
  };

  return (
    <>
      <SiteHeader />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
      <main className={styles.page}>
        <section className={styles.hubHero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{copy.eyebrow}</p>
            <h1>{copy.title}</h1>
            <p>{copy.intro}</p>
            <div className={styles.heroIndex}>
              <span>{copy.original}<b>{copy.originalValue}</b></span>
              <span>{copy.languages}<b>{copy.languagesValue}</b></span>
            </div>
          </div>
          <div className={styles.waterArtifact} aria-hidden="true">
            <div className={styles.waterOrb}><span>{copy.waterLabel}</span></div>
            <i className={styles.ripple} />
          </div>
        </section>

        <section className={styles.catalog} aria-labelledby="books-catalog-title">
          <header className={styles.sectionHeading}>
            <h2 id="books-catalog-title">{copy.heading}</h2>
            <p>{copy.headingNote}</p>
          </header>

          {booksHubEntries.map((book) => {
            const isInterrogation = book.theme === "interrogation";
            const isJudgment = book.theme === "judgment";
            const themeClass = isInterrogation
              ? styles.interrogationCard
              : isJudgment
                ? styles.judgmentCard
                : "";
            return (
              <LocalizedLink
                className={`${styles.bookCard} ${themeClass}`}
                href={book.route}
                key={book.id}
              >
                <div className={styles.bookVisual}>
                  {isInterrogation ? (
                    <span className={styles.interrogationSeal}>{isEnglish ? "THE NAME\nTHAT REMAINED" : "留下來的名字"}</span>
                  ) : isJudgment ? (
                    <span className={styles.judgmentCover}>
                      <Image
                        src="/media/books/judgment-of-civilization/case-004.jpg"
                        alt={book.coverAlt[locale]}
                        fill
                        unoptimized
                        sizes="(max-width: 760px) 84vw, 34vw"
                      />
                      <span className={styles.judgmentCoverTitle}>
                        <small>{isEnglish ? "CIVILIZATIONAL CASE DOSSIER" : "文明案件檔案"}</small>
                        <b>{book.title[locale]}</b>
                      </span>
                    </span>
                  ) : (
                    <span className={styles.cover}>
                      <Image
                        src={book.coverSrc[locale]}
                        alt={book.coverAlt[locale]}
                        fill
                        unoptimized
                        sizes="(max-width: 760px) 72vw, 25vw"
                      />
                    </span>
                  )}
                </div>
                <div className={styles.bookCopy}>
                  <span className={styles.bookMeta}>{book.eyebrow[locale]} · {book.status[locale]}</span>
                  <h3>{book.title[locale]}</h3>
                  <p>{book.summary[locale]}</p>
                  <span className={styles.bookAction}>{book.cta[locale]} <b aria-hidden="true">↗</b></span>
                </div>
              </LocalizedLink>
            );
          })}
        </section>

        <aside className={styles.boundaryNote}>
          <strong>{copy.boundary}</strong>
          <p>{copy.boundaryText}</p>
        </aside>
      </main>
      <SiteFooter />
    </>
  );
}
