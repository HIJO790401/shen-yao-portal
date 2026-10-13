import type { Metadata } from "next";
import Image from "next/image";
import { SiteHeader } from "../../../components/SiteHeader";
import { SiteFooter } from "../../../components/SiteFooter";
import { LocalizedLink } from "../../../components/LanguageControl";
import { localizedAlternates, siteUrl } from "../../../site-config";
import styles from "./novel.module.css";

type PageProps = { params: Promise<{ locale: string }> };
type Locale = "zh" | "en";

const copy = {
  zh: {
    eyebrow: "文學作品 · 犯罪懸疑 · 世界運行敘事",
    title: "審訊室存在過的名字",
    tagline: "所有人都進過審訊室，只有一個名字留了下來。",
    author: "許文耀／沈耀888π 著",
    chapter: "第一章｜八點十七分",
    storyTitle: "未知發生時，誰能把真相逼出來？",
    story: "我不預寫結局，也不把自己關進固定劇情。案件、人物與城市依各自資訊行動；模型不能替我說話、選擇或判斷。未知到來時，由我決定如何追問，沿責任鏈找出依據、行動者與承擔者；人物與事件回應我的行動，但不取得替我定義方法或結論的權力。",
    methodLabel: "同一套方法論，另一種媒介",
    method: "我不是進入外部的固定框架，等世界替我裁判。我定義問題、作出選擇，並以責任鏈追問：誰定規、誰授權、誰驗證、誰能停、錯了誰修、誰簽名、誰承擔。我依線索與行動逼出真相，提出結論，也對自己的依據、決策與後果負責。外部若要反證，必須對準這些依據與可回放的因果路徑；外部的固定框架和世界行動不能取代我的主體。模型只運行我以外的人物與環境，不代我判斷。這與我在官網建立的主體、證據、邊界和責任結構是同一套方法。",
    stepLabels: ["未知發生", "主體追問", "責任鏈定位", "依據接受反證", "結論與承擔"],
    previewLabel: "故事提要",
    publicNote: "作品進行中 · 正文暫不公開",
    synopsis: "八點十七分，審訊室迎來一件看似尋常的案件。沈耀不急著讓標籤代替判斷，而是追問行動、規則、證據與責任各自落在誰身上。當另一條線索進入城市，原本簡單的問題開始改變形狀。每次追問都可能讓真相更近，也讓提出判斷的人必須承擔其後果。",
    publication: "我尚未決定由出版社出版或自行出版；作品仍由我持續完成。正式版本與發行資訊確定後，我會在此頁公布。",
    back: "返回文學與書籍",
    coverAlt: "《審訊室存在過的名字》原始預告海報，審訊室與作者肖像",
    sceneAlt: "空審訊室的寫實場景：桌椅、錄音器、單向玻璃與晨光",
  },
  en: {
    eyebrow: "LITERARY WORK · CRIME SUSPENSE · WORLD-RUN NARRATIVE",
    title: "The Name That Existed in the Interrogation Room",
    tagline: "Many entered the interrogation room. Only one name remained.",
    author: "By Wen-Yao Hsu / Shen-Yao 888π",
    chapter: "Chapter One | 8:17 A.M.",
    storyTitle: "When the unknown arrives, who can force the truth into view?",
    story: "I do not write the ending in advance or confine myself to a fixed plot. Cases, people and the city act on their own knowledge; the model cannot speak, choose or judge for me. When the unknown arrives, I decide what to ask and follow the chain of responsibility to identify the grounds, the actors and those who must answer for the outcome. People and events respond to my actions, but do not gain the authority to define my method or conclusion.",
    methodLabel: "ONE METHOD, ANOTHER MEDIUM",
    method: "I do not enter an external fixed framework and wait for the world to judge me. I define the question and choose my action. Through the chain of responsibility I ask who set the rule, authorized the action, verified it, could stop it, would repair failure, would sign, and would bear the consequence. I follow clues and actions to force the truth into view; I state a conclusion and take responsibility for its grounds, decisions and effects. An outside challenge must address those grounds and the replayable causal path. Its fixed frame and world actions cannot replace me as subject. The model runs the people and environment beyond me; it does not judge for me. This is the same method of subject, evidence, boundary and responsibility that I built into the studio site.",
    stepLabels: ["UNKNOWN ARISES", "SUBJECT INQUIRES", "RESPONSIBILITY TRACED", "GROUNDS OPEN TO CHALLENGE", "CONCLUSION & ACCOUNTABILITY"],
    previewLabel: "Story Overview",
    publicNote: "WORK IN PROGRESS · MANUSCRIPT NOT PUBLIC",
    synopsis: "At 8:17 a.m., an apparently ordinary case reaches the interrogation room. Shen-Yao refuses to let a label stand in for judgment. He asks who acted, which rule applied, what the evidence shows, and where responsibility falls. As another lead enters the city, a simple question changes shape. Each inquiry may bring the truth closer while making the person who judges answer for the consequences.",
    publication: "I have not yet chosen between a publisher's edition and an independent release, and I am still completing the work. I will publish confirmed edition and release information on this page when I make that decision.",
    back: "BACK TO LITERATURE & BOOKS",
    coverAlt: "Original promotional poster for The Name That Existed in the Interrogation Room, with the author's portrait",
    sceneAlt: "Photorealistic empty interrogation room with table, recorder, one-way glass and morning light",
  },
} as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale: Locale = (await params).locale === "en" ? "en" : "zh";
  const c = copy[locale];
  return {
    title: { absolute: `${c.title}｜SERENE SCHOOL STUDIO` },
    description: c.story,
    robots: { index: true, follow: true },
    alternates: localizedAlternates(locale, "/novel/interrogation-room"),
    openGraph: {
      type: "book",
      url: `/${locale}/novel/interrogation-room`,
      title: c.title,
      description: c.story,
      locale: locale === "en" ? "en_US" : "zh_TW",
      alternateLocale: locale === "en" ? "zh_TW" : "en_US",
      images: [{ url: "/media/novel/interrogation-room-poster.png", width: 1024, height: 1536, alt: c.coverAlt }],
    },
  };
}

export default async function InterrogationRoomNovelPage({ params }: PageProps) {
  const locale: Locale = (await params).locale === "en" ? "en" : "zh";
  const c = copy[locale];
  const bookSchema = {
    "@context": "https://schema.org",
    "@type": "Book",
    "@id": siteUrl(`/${locale}/novel/interrogation-room#book`),
    name: c.title,
    description: c.synopsis,
    url: siteUrl(`/${locale}/novel/interrogation-room`),
    image: siteUrl("/media/novel/interrogation-room-poster.png"),
    inLanguage: locale === "en" ? "en" : "zh-Hant",
    genre: ["Crime suspense", "World-run narrative"],
    author: { "@id": siteUrl("/#person") },
    isPartOf: { "@id": siteUrl("/#website") },
  };
  return <><SiteHeader /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bookSchema) }} /><main className={styles.novel} lang={locale === "en" ? "en" : "zh-Hant"}>
    <section className={styles.hero} aria-labelledby="novel-title">
      <Image src="/media/novel/interrogation-room-scene.png" alt={c.sceneAlt} fill priority unoptimized sizes="100vw" />
      <div className={styles.heroVeil} />
      <div className={styles.heroCopy}>
        <p className={styles.eyebrow}>{c.eyebrow}</p>
        <p className={styles.recordCode}>CASE FILE · 08:17 / CHAPTER 01</p>
        <h1 id="novel-title">{c.title}</h1>
        <p className={styles.tagline}>{c.tagline}</p>
        <p className={styles.author}>{c.author}</p>
        <a className={styles.heroLink} href="#novel-method">{c.storyTitle} <span aria-hidden="true">↓</span></a>
      </div>
      <div className={styles.heroMarker} aria-hidden="true"><span>01</span><span>08:17</span></div>
    </section>

    <section className={styles.method} id="novel-method" aria-labelledby="novel-method-title">
      <div className={styles.methodIntro}>
        <p className={styles.eyebrow}>{c.methodLabel}</p>
        <h2 id="novel-method-title">{c.storyTitle}</h2>
        <p>{c.story}</p>
      </div>
      <figure className={styles.poster}>
        <Image src="/media/novel/interrogation-room-poster.png" alt={c.coverAlt} fill unoptimized sizes="(max-width: 760px) 90vw, 30vw" />
      </figure>
      <div className={styles.methodFoot}>
        <p>{c.method}</p>
        <ol>{c.stepLabels.map((step, i) => <li key={step}><span>{String(i + 1).padStart(2, "0")}</span>{step}</li>)}</ol>
      </div>
    </section>

    <section className={styles.reader} aria-labelledby="novel-preview-title">
      <div className={styles.readerHeader}>
        <div><p className={styles.eyebrow}>{c.publicNote}</p><h2 id="novel-preview-title">{c.previewLabel}</h2><p>{c.chapter}</p></div>
        <span className={styles.readerMark} aria-hidden="true">08:17</span>
      </div>
      <div className={styles.releaseHold}><p>{c.synopsis}</p><p>{c.publication}</p></div>
      <LocalizedLink href="/books" className={styles.backLink}>{c.back} <span aria-hidden="true">↗</span></LocalizedLink>
    </section>
  </main><SiteFooter /></>;
}
