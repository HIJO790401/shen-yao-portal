import type { Metadata } from "next";
import Image from "next/image";
import { LocalizedLink } from "../../../components/LanguageControl";
import { SiteFooter } from "../../../components/SiteFooter";
import { SiteHeader } from "../../../components/SiteHeader";
import { judgmentOfCivilization } from "../../../judgment-book-data";
import { localizedAlternates, siteUrl } from "../../../site-config";
import styles from "./judgment.module.css";

type PageProps = { params: Promise<{ locale: string }> };

function resolveLocale(value: string) {
  return value === "en" ? "en" : "zh";
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const isEnglish = locale === "en";
  const title = isEnglish
    ? "The Judgment of a False Civilization | Civilizational Case Dossier"
    : "虛偽文明的審判｜文明案件檔案";
  const description = isEnglish
    ? "Wen-Yao Hsu / Shen-Yao 888PI dismantles civilization’s falsehoods by auditing how knowledge without a responsibility chain acquired authority to act. The English page is an overview of a Chinese BOOK_DRAFT."
    : "許文耀／沈耀888PI逐案解構文明的虛偽：審查沒有責任鏈的知識使用權如何取得合法性。全書仍是 BOOK_DRAFT，官網只公開選錄摘要。";

  return {
    title: { absolute: title },
    description,
    keywords: isEnglish
      ? ["The Judgment of a False Civilization", "Wen-Yao Hsu", "Shen-Yao 888PI", "civilizational judgment", "responsibility proof chain", "AI governance", "accountability"]
      : ["虛偽文明的審判", "許文耀", "沈耀888PI", "文明審判", "責任證成鏈", "責任鏈", "AI 治理", "主體責任"],
    alternates: localizedAlternates(locale, judgmentOfCivilization.detailRoute),
    robots: { index: true, follow: true },
    openGraph: {
      type: "book",
      url: `/${locale}${judgmentOfCivilization.detailRoute}`,
      title,
      description,
      locale: isEnglish ? "en_US" : "zh_TW",
      alternateLocale: isEnglish ? "zh_TW" : "en_US",
      images: [{
        url: judgmentOfCivilization.coverSrc,
        width: 1024,
        height: 1536,
        alt: judgmentOfCivilization.coverAlt[locale],
      }],
    },
  };
}

export default async function JudgmentOfCivilizationPage({ params }: PageProps) {
  const locale = resolveLocale((await params).locale);
  const isEnglish = locale === "en";
  const copy = isEnglish
    ? {
        eyebrow: "CIVILIZATIONAL JUDGMENT DOSSIER / WORK IN PROGRESS",
        workingTitle: "WORKING ENGLISH TITLE",
        cases: "PROVISIONAL CASE MAP",
        casesValue: "34",
        interludes: "WEBSITE SELECTION",
        interludesValue: "07",
        release: "PUBLIC RELEASE",
        releaseValue: "SUMMARY-ONLY",
        enter: "ENTER THE CASE ARCHIVE",
        allBooks: "BACK TO ALL BOOKS",
        authorLabel: "AUTHOR / RESPONSIBLE SUBJECT",
        authorHeading: "I do not enter civilization’s framework. I dismantle its falsehoods.",
        authorBody:
          "I wrote this book because civilization has long converted knowing, capability and effectiveness into an assumed right to act. I am not dismantling phenomena or knowledge. I am dismantling the unaccountable right to use them upon the world. In every case, I return that expansion to causality, boundary, authorization, consequence and the subject who must answer for it.",
        methodLabel: "FORMAL CHAPTER STRUCTURE / RPC",
        methodHeading: "My text remains first. I require responsibility proof before a verdict can close.",
        methodLayerA: "PART A / OWNER TEXT",
        methodLayerABody: "My complete text, causal dissection and judgment remain the source. The framework serves my writing; my writing does not serve a template.",
        methodLayerB: "PART B / RPC-00—15",
        methodLayerBBody: "Hard fact, license claim, expansion, responsibility map and gap, causal derivation, my dissection, verdict, signature, traceability and archive.",
        overviewLabel: "CORE RESPONSIBILITY-CHAIN OVERVIEW — NOT A REPLACEMENT FOR RPC-00—15",
        archiveLabel: "WEBSITE SELECTION / NOT THE FIXED TABLE OF CONTENTS",
        archiveHeading: "I release seven selections from a larger BOOK_DRAFT.",
        archiveBody:
          "My source document currently maps eight parts and 34 provisional cases. I release seven artworks, short verdicts and bounded summaries on this page; I do not present them as a fixed order, a completed chapter count or a public full-text edition.",
        boundary: "PUBLICATION BOUNDARY",
        state: "CURRENT CREATION STATE",
      }
    : {
        eyebrow: "文明案件檔案／持續創作中",
        workingTitle: "英文為官網工作譯名",
        cases: "母檔暫定案件",
        casesValue: "34",
        interludes: "官網選錄",
        interludesValue: "07",
        release: "官網公開",
        releaseValue: "摘要限定",
        enter: "進入文明案件檔案館",
        allBooks: "返回全部書籍",
        authorLabel: "作者／主責主體",
        authorHeading: "我不是進入文明的框架；我是把文明的虛偽拆開。",
        authorBody:
          "我寫這本書，是因為文明長期把『知道』『做得到』『有效』偷換成理所當然的作用資格。我拆的不是現象，也不是知識；我要拆掉的是沒有完成責任鏈，卻被拿來施加於世界的知識使用權。每一案，我都把它拆回因果、邊界、授權、後果與最後必須承擔的主體。",
        methodLabel: "正式章節結構／RPC",
        methodHeading: "我先保留完整正文，再讓判詞通過責任證成。",
        methodLayerA: "PART A／OWNER TEXT",
        methodLayerABody: "我的完整正文、因果拆解與判詞是來源。框架服務我的文字；我的文字不服務模板。",
        methodLayerB: "PART B／RPC-00—15",
        methodLayerBBody: "硬事實、使用權主張、擴張、責任地圖與缺口、因果推導、我的解剖、判詞、責任簽名、保存與回放。",
        overviewLabel: "核心責任鏈概覽／不能取代 RPC-00～15",
        archiveLabel: "官網選錄／不是全書固定目錄",
        archiveHeading: "我從仍在創作的完整文明審判中，公開七張選錄。",
        archiveBody:
          "我的母檔目前保留八部、34 個暫定案件的寫作導航。我只在本頁公開七張圖卡、短判詞與有邊界的摘要；我沒有把它們寫成固定排序、完成章數或公開全文。",
        boundary: "公開與出版邊界",
        state: "目前創作狀態",
      };

  const bookId = siteUrl("/zh/books/judgment-of-civilization#book");
  const bookSchema = {
    "@context": "https://schema.org",
    "@type": "Book",
    "@id": bookId,
    name: judgmentOfCivilization.title.zh,
    url: siteUrl("/zh/books/judgment-of-civilization"),
    inLanguage: "zh-Hant",
    description: judgmentOfCivilization.introduction.zh,
    image: siteUrl(judgmentOfCivilization.coverSrc),
    author: { "@id": siteUrl("/#person") },
    isPartOf: { "@id": siteUrl("/#website") },
    creativeWorkStatus: "BOOK_DRAFT",
  };

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": siteUrl(`/${locale}${judgmentOfCivilization.detailRoute}#webpage`),
    url: siteUrl(`/${locale}${judgmentOfCivilization.detailRoute}`),
    name: judgmentOfCivilization.title[locale],
    inLanguage: isEnglish ? "en" : "zh-Hant",
    description: judgmentOfCivilization.introduction[locale],
    mainEntity: { "@id": bookId },
    isPartOf: { "@id": siteUrl("/#website") },
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isEnglish ? "Literature & Books" : "文學與書籍",
        item: siteUrl(`/${locale}/books`),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: judgmentOfCivilization.title[locale],
        item: siteUrl(`/${locale}${judgmentOfCivilization.detailRoute}`),
      },
    ],
  };

  return (
    <>
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bookSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>{copy.eyebrow}</p>
              <h1>{judgmentOfCivilization.title[locale]}</h1>
              <p className={styles.subtitle}>{judgmentOfCivilization.subtitle[locale]}</p>
              <p className={styles.lede}>{judgmentOfCivilization.introduction[locale]}</p>
              <p className={styles.titleState}><span>{copy.workingTitle}</span>{judgmentOfCivilization.titleState[locale]}</p>
              <div className={styles.actions}>
                <LocalizedLink className={styles.primaryAction} href={judgmentOfCivilization.casesRoute}>{copy.enter}<span aria-hidden="true">→</span></LocalizedLink>
                <LocalizedLink className={styles.secondaryAction} href="/books">{copy.allBooks}</LocalizedLink>
              </div>
            </div>

            <div className={styles.coverStage}>
              <span className={styles.orbit} aria-hidden="true" />
              <div className={styles.coverFrame}>
                <Image
                  src={judgmentOfCivilization.coverSrc}
                  alt={judgmentOfCivilization.coverAlt[locale]}
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 760px) 86vw, 38vw"
                />
                <div className={styles.coverCorrection}>
                  <small>SERENE SCHOOL STUDIO · WEB DOSSIER</small>
                  <b>{judgmentOfCivilization.author[locale]}</b>
                </div>
              </div>
              <span className={styles.draftStamp}>{isEnglish ? "DRAFT-SOURCE ARTWORK" : "創作期封面視覺"}</span>
            </div>
          </div>

          <div className={styles.metrics}>
            <span><small>{copy.cases}</small><b>{copy.casesValue}</b></span>
            <span><small>{copy.interludes}</small><b>{copy.interludesValue}</b></span>
            <span><small>{copy.release}</small><b>{copy.releaseValue}</b></span>
          </div>
        </section>

        <section className={styles.authorSection}>
          <div className={styles.authorPortrait}>
            <Image
              src={judgmentOfCivilization.authorImage}
              alt={judgmentOfCivilization.authorImageAlt[locale]}
              fill
              unoptimized
              sizes="(max-width: 760px) 100vw, 42vw"
            />
          </div>
          <div className={styles.authorCopy}>
            <p className={styles.eyebrow}>{copy.authorLabel}</p>
            <h2>{copy.authorHeading}</h2>
            <p>{copy.authorBody}</p>
            <blockquote>{judgmentOfCivilization.method[locale]}</blockquote>
            <span>{judgmentOfCivilization.author[locale]}</span>
          </div>
        </section>

        <section className={styles.methodSection}>
          <header>
            <p className={styles.eyebrow}>{copy.methodLabel}</p>
            <h2>{copy.methodHeading}</h2>
          </header>
          <div className={styles.methodLayers}>
            <article><small>01</small><h3>{copy.methodLayerA}</h3><p>{copy.methodLayerABody}</p></article>
            <article><small>02</small><h3>{copy.methodLayerB}</h3><p>{copy.methodLayerBBody}</p></article>
          </div>
          <p className={styles.overviewLabel}>{copy.overviewLabel}</p>
          <div className={styles.methodChain} aria-label={isEnglish ? "Core responsibility-chain overview" : "核心責任鏈概覽"}>
            {(isEnglish
              ? ["PHENOMENON", "DESCRIPTION", "KNOWLEDGE", "BOUNDARY", "AUTHORIZATION", "ACTION", "CONSEQUENCE", "RESPONSIBILITY"]
              : ["現象", "描述", "知識", "邊界", "授權", "行為", "後果", "責任"]
            ).map((step, index) => <span key={step}><small>{String(index + 1).padStart(2, "0")}</small><b>{step}</b></span>)}
          </div>
        </section>

        <section className={styles.archivePreview}>
          <header>
            <div>
              <p className={styles.eyebrow}>{copy.archiveLabel}</p>
              <h2>{copy.archiveHeading}</h2>
            </div>
            <p>{copy.archiveBody}</p>
          </header>
          <ol className={styles.caseIndex}>
            {judgmentOfCivilization.cases.map((item, index) => (
              <li key={item.id}>
                <small>{item.code}</small>
                <b>{item.title[locale]}</b>
                <span>{String(index + 1).padStart(2, "0")}</span>
              </li>
            ))}
          </ol>
          <LocalizedLink className={styles.archiveAction} href={judgmentOfCivilization.casesRoute}>{copy.enter}<span aria-hidden="true">→</span></LocalizedLink>
        </section>

        <aside className={styles.boundaryPanel}>
          <div><small>{copy.state}</small><b>{judgmentOfCivilization.status[locale]}</b></div>
          <div><small>{copy.boundary}</small><p>{judgmentOfCivilization.publicRelease[locale]}</p></div>
        </aside>
      </main>
      <SiteFooter />
    </>
  );
}
