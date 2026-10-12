import type { Metadata } from "next";
import { stillnessIsALanguage } from "../../../../books-data";
import { LocalizedLink } from "../../../../components/LanguageControl";
import { SiteFooter } from "../../../../components/SiteFooter";
import { SiteHeader } from "../../../../components/SiteHeader";
import { localizedAlternates, siteUrl } from "../../../../site-config";
import { stillnessEnglishPreview } from "../../../../stillness-preview-data";
import styles from "../../books.module.css";

type PageProps = { params: Promise<{ locale: string }> };

function resolveLocale(value: string) {
  return value === "en" ? "en" : "zh";
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const isEnglish = locale === "en";
  const title = isEnglish
    ? "Read Part One | Stillness Is a Language"
    : "第一部正式試讀｜沉靜是一種語言";
  const description = isEnglish
    ? "Read the complete public Part One sample of Stillness Is a Language by Wen-Yao Hsu. The sample ends after all five essays in Hearing Silence."
    : "閱讀《沉靜是一種語言》正式排版第 1–17 頁，範圍至第一部〈聽見沉默〉第五篇結束，共占全書 22.4%。";

  return {
    title: { absolute: `${title}｜SERENE SCHOOL STUDIO` },
    description,
    alternates: localizedAlternates(locale, stillnessIsALanguage.previewRoute),
    robots: { index: true, follow: true },
    openGraph: {
      type: "article",
      url: `/${locale}${stillnessIsALanguage.previewRoute}`,
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

export default async function StillnessPreviewPage({ params }: PageProps) {
  const locale = resolveLocale((await params).locale);
  const isEnglish = locale === "en";
  const preview = stillnessIsALanguage.preview[locale];
  const copy = isEnglish
    ? {
        eyebrow: "PART ONE · PUBLIC PREVIEW",
        title: "Hearing Silence",
        intro:
          "Author’s Preface, A Note on Reading, and all five essays in Part One. This is the complete authorized English sample, not the complete book.",
        boundary:
          "Public sample: 2,305 of 14,004 words, or approximately 16.46% of the complete English manuscript. Parts Two through Five are not published here.",
        return: "RETURN TO BOOK",
      }
    : {
        eyebrow: "第一部 · 正式公開試讀",
        title: "聽見沉默",
        intro:
          "正式排版第 1–17 頁，包含書名、版權、目錄、作者序、導讀與第一部五篇文章。第 18 頁進入第二部，不在本次公開範圍。",
        boundary: "公開範圍：17／76 頁，佔全書 22.4%。本頁不是完整版 PDF 或 EPUB 的免費下載。",
        return: "返回書籍頁",
        openPdf: "開啟原始 PDF",
      };

  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: isEnglish ? "Stillness Is a Language — Part One Preview" : "《沉靜是一種語言》第一部試讀",
    url: siteUrl(`/${locale}${stillnessIsALanguage.previewRoute}`),
    inLanguage: isEnglish ? "en" : "zh-Hant",
    author: { "@id": siteUrl("/#person") },
    isPartOf: { "@id": siteUrl(`/${locale}${stillnessIsALanguage.detailRoute}#book`) },
    isAccessibleForFree: true,
  };

  return (
    <>
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main className={styles.page}>
        <section className={styles.readerHero}>
          <div>
            <p className={styles.eyebrow}>{copy.eyebrow}</p>
            <h1>{copy.title}</h1>
            <p>{copy.intro}</p>
          </div>
          <aside>{copy.boundary}</aside>
        </section>

        <section className={styles.readerShell}>
          <div className={styles.readerToolbar}>
            <p>{preview.proportion}<br />{preview.scope}</p>
            <div className={styles.actions}>
              <LocalizedLink className={styles.secondaryAction} href={stillnessIsALanguage.detailRoute}>
                ← {copy.return}
              </LocalizedLink>
              {!isEnglish && (
                <a
                  className={styles.primaryAction}
                  href={stillnessIsALanguage.preview.zh.publicUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {copy.openPdf} ↗
                </a>
              )}
            </div>
          </div>

          {isEnglish ? (
            <article className={styles.textReader}>
              <header>
                <small>PART ONE PREVIEW · ALL RIGHTS RESERVED</small>
                <h2>{stillnessEnglishPreview.title}</h2>
                <p>{stillnessEnglishPreview.subtitle}</p>
              </header>

              {stillnessEnglishPreview.openingSections.map((section) => (
                <section className={styles.textSection} id={section.id} key={section.id}>
                  <h2>{section.title}</h2>
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </section>
              ))}

              <section className={styles.textSection}>
                <h2>{stillnessEnglishPreview.part.title}</h2>
                {stillnessEnglishPreview.part.essays.map((essay, index) => (
                  <div id={essay.id} key={essay.id}>
                    {index > 0 && <hr />}
                    <h3>{essay.title}</h3>
                    {essay.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                ))}
              </section>
            </article>
          ) : (
            <iframe
              className={styles.pdfFrame}
              src={`${stillnessIsALanguage.preview.zh.publicUrl}#view=FitH`}
              title="《沉靜是一種語言》第一部正式試讀 PDF"
            />
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
