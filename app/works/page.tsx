import type { Metadata } from "next";
import Image from "next/image";
import { Lang, LocalizedLink } from "../components/LanguageControl";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { VideoEmbed } from "../components/VideoEmbed";
import { productFilms } from "../showcase-data";
import { localizedAlternates, siteUrl } from "../site-config";
import styles from "../demo-system.module.css";

export const metadata: Metadata = {
  title: "作品總覽｜系統・動畫・音樂・文章",
  description: "許文耀／沈耀888π的系統工程、固定案例 Demo、動畫音樂公開入口與文章紀錄。",
  keywords: ["語之神神器展覽篇", "Artifacts of the Language God", "沈耀888π", "許文耀", "AI 音樂動畫", "語意防火牆"],
  alternates: localizedAlternates("zh", "/works"),
  openGraph: {
    url: "/zh/works",
    title: "語之神神器展覽篇｜沉靜流派工作室作品",
    description: "古文明符號、音樂、動畫、數學公式與系統工程的公開作品總覽。",
    images: [{ url: "/media/works/language-god-exhibition-16x9.png", width: 1672, height: 941, alt: "語之神神器展覽篇" }],
  },
};

const creativeWorkSchema = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: "語之神神器展覽篇",
  alternateName: "Artifacts of the Language God",
  creator: { "@id": siteUrl("/#person") },
  image: siteUrl("/media/works/language-god-exhibition-16x9.png"),
  url: "https://vt.tiktok.com/ZS9rDg3ATyPX4-sKjkh/",
  inLanguage: ["zh-Hant", "en"],
  genre: ["Music animation", "Symbolic art", "AI-assisted art"],
  isPartOf: { "@id": siteUrl("/#website") },
};

const mediaWorks = [
  { meta: "YOUTUBE · EXTERNAL STREAM", titleZh: "動畫與音樂公開頻道", titleEn: "Animation & Music Channel", textZh: "影音由 YouTube 串流；本站不重複上傳影片，也不把頻道頁冒充作品資料庫。", textEn: "Media streams from YouTube; this site neither duplicates uploads nor presents the channel as a structured work database.", href: "https://www.youtube.com/@JM-qy7gv" },
  { meta: "AI-ARTS · AUTHOR PROFILE", titleZh: "跨域創作作者頁", titleEn: "Cross-Disciplinary Author Profile", textZh: "外部作者頁保存動畫、音樂、詩學與符號設計的公開紀錄。", textEn: "An external author profile preserving public records across animation, music, poetics and symbolic design.", href: "https://ai-arts.org/author/shen-yao/" },
  { meta: "2D CANVAS · SOURCE WORK", titleZh: "沈靜流派創作宇宙", titleEn: "SERENE SCHOOL CREATIVE UNIVERSE", textZh: "目前核實為 2D Canvas 冰火核心、星空與視差；新 3D 版本另案施工，不改寫原作。", textEn: "Verified today as a 2D Canvas work with ice/fire cores, stars and parallax; a future 3D build remains separate.", href: "/demo/shen-universe", internal: true },
  { meta: "NEWSROOM · VIDEO REPORTS", titleZh: "實相新聞台影音報導", titleEn: "Reality Newsroom Video Reports", textZh: "可核實的 YouTube 報導集中在新聞台 × 責任博物館播放。", textEn: "Verified YouTube reports play inside the combined Newsroom × Responsibility Museum.", href: "/news", internal: true },
];

const articleWorks = [
  { meta: "VOCUS · 2026", titleZh: "第 0 定理", titleEn: "The Zeroth Theorem", textZh: "任何答案被採用前，先確認主體、邊界、責任與回放。", textEn: "Confirm subject, boundary, responsibility and replay before accepting an answer.", href: "https://vocus.cc/article/6a49f63dfd897800010e5197" },
  { meta: "VOCUS · E%mc²", titleZh: "AI 時代的人類判斷幻覺", titleEn: "THE HUMAN JUDGMENT ILLUSION IN THE AI AGE", textZh: "以 E%mc² 描述人類主體如何被模型敘事滲透，並把解法收回語意防火牆與 SCBKR 責任閘門。", textEn: "E%mc² models how human judgment is infiltrated by model narrative, returning the remedy to the Semantic Firewall and SCBKR responsibility gates.", href: "https://vocus.cc/article/69f8eb5afd89780001a785b9" },
  { meta: "VOCUS · SCBKR", titleZh: "本地責任鏈模型", titleEn: "Local Responsibility Chain", textZh: "從本地工作台到證據重用的公開系統說明。", textEn: "A public account of the local workbench and evidence reuse system.", href: "https://vocus.cc/article/6a3c8bdbfd897800013dbd47" },
  { meta: "NVIDIA DEVELOPER FORUMS · COMMUNITY", titleZh: "SCBKR 技術文章", titleEn: "SCBKR Technical Post", textZh: "本人發布於 NVIDIA 開發者社群；屬社群內容，不代表 NVIDIA 背書。", textEn: "Published by the founder in the NVIDIA developer community; it is community content, not NVIDIA endorsement.", href: "https://forums.developer.nvidia.com/t/scbkr-a-local-responsibility-chain-workbench-for-llms-with-human-confirmed-generation-storage-replay-and-retrieval-gates/373910" },
  { meta: "NVIDIA DEVELOPER FORUMS · COMMUNITY", titleZh: "AVRCK 3.0 技術文章", titleEn: "AVRCK 3.0 Technical Post", textZh: "本地／雲端因果缺口路由架構的開發者社群文章。", textEn: "A developer-community article on local/cloud causal-gap routing.", href: "https://forums.developer.nvidia.com/t/avrck-3-0-reducing-inference-cost-by-routing-causal-gaps-across-local-and-cloud-models/376839" },
  { meta: "SECURITYBRIEF ASIA · 2025.11.18 · THIRD-PARTY PRESS", titleZh: "語意防火牆：成本、對話安全與部署架構", titleEn: "Semantic Firewall: Cost, Conversational Safety & Deployment", textZh: "Sean Mitchell 的外部報導將系統描述為模型前的確定性語意層；文中效能數字保留為受訪者／系統方主張，不冒充第三方實測。", textEn: "Sean Mitchell's external report describes a deterministic semantic layer before the model. Performance figures remain attributed claims, not independent benchmarks.", href: "https://securitybrief.asia/story/semantic-firewall-promises-ai-cost-savings-safer-chat-models" },
];

function ExternalCard({ item }: { item: typeof articleWorks[number] }) {
  return <a className={styles.workCard} href={item.href} target="_blank" rel="noreferrer">
    <div><small>{item.meta}</small><h3><Lang zh={item.titleZh} en={item.titleEn} /></h3><p><Lang zh={item.textZh} en={item.textEn} /></p></div>
    <span><Lang zh="開啟外部來源" en="OPEN EXTERNAL SOURCE" /> ↗</span>
  </a>;
}

export default function WorksPage() {
  const readyDemos = productFilms.filter((film) => film.status === "ready");
  return <><SiteHeader/><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }} /><main className={styles.worksPage}>
    <section className={styles.worksHero}>
      <div><small>SELECTED WORKS · SYSTEMS / MOTION / MUSIC / WRITING</small><h1><Lang zh={<>作品<br/>不是清單。</>} en={<>WORKS<br/>ARE NOT A LIST.</>} /></h1><p><Lang zh="我讓每件作品留在它真正成立的媒介：能運算的系統進固定案例 Demo，候選架構只呈現已定義的路徑，動畫與音樂回到公開影音，文章回到我的原始發布頁。" en="I keep each work in the medium where it actually exists: executable systems become fixed-case demos, candidate architectures show only defined paths, animation and music return to public media, and writing links to my original publication." /></p></div>
      <aside><span>SYSTEMS<br/>{readyDemos.length} AUTO DEMOS</span><span>ANIMATION<br/>EXTERNAL MEDIA</span><span>MUSIC<br/>EXTERNAL MEDIA</span><span>WRITING<br/>PRIMARY LINKS</span></aside>
    </section>

    <section className={styles.worksSection}>
      <header><span>01</span><div><h2><Lang zh="系統、架構與固定案例" en="SYSTEMS, ARCHITECTURE & FIXED CASES" /></h2><p><Lang zh="我把十五套系統作品接成各自的固定案例或架構時間軸，不收訪客輸入，也不讓畫面替產品虛構能力；每一段只重播我已定義的母規格、Repo 內建案例、原公式或策展資料。SCBKR 責任鏈語言模型由我決定暫緩動畫。" en="I connect fifteen system works to their own fixed-case or architecture timelines. They accept no visitor input, and the visuals do not invent product capability; every sequence replays only my defined owner specification, repository fixtures, source formulas or curated case data. I have kept motion for the SCBKR Responsibility Chain Language Model deferred." /></p></div></header>
      <div className={styles.worksGrid}>{readyDemos.map((film) => <LocalizedLink className={styles.workCard} href={`/demo/${film.slug}`} key={film.slug}>
        <div><small>{film.index} · {film.label}</small><h3><Lang zh={film.name} en={film.nameEn} /></h3><p><Lang zh={film.introZh} en={film.introEn} /></p></div>
        <span><Lang zh="播放展示" en="PLAY DEMO" /> →</span>
      </LocalizedLink>)}</div>
    </section>

    <section className={styles.worksSection} id="music-animation" aria-labelledby="music-animation-title">
      <header><span>02</span><div><h2 id="music-animation-title"><Lang zh="音樂與動畫" en="MUSIC & ANIMATION" /></h2><p><Lang zh="我把已公開的音樂動畫放回原始平台播放，官網保存作品名稱、脈絡與入口，不重新上傳或替作品改名。新 3D 建模完成後，我才會把它列為新的作品版本。" en="I keep my published music-animation works playing from their original platforms while the site preserves each title, context and entry point without re-uploading or renaming it. I will list new 3D work only after that version has been completed." /></p></div></header>

      <div className={styles.mediaShowcase}>
        <article className={styles.mediaFeature}>
          <a
            className={styles.mediaArtwork}
            href="https://vt.tiktok.com/ZS9rDg3ATyPX4-sKjkh/"
            target="_blank"
            rel="noreferrer"
            aria-label="語之神神器展覽篇 / Artifacts of the Language God"
          >
            <Image
              src="/media/works/language-god-exhibition-16x9.png"
              alt="語之神神器展覽篇音樂動畫作品視覺"
              fill
              unoptimized
              sizes="(max-width: 760px) 100vw, 50vw"
            />
            <span><Lang zh="前往 TikTok 觀看" en="WATCH ON TIKTOK" /> ↗</span>
          </a>
          <div className={styles.mediaFeatureCopy}>
            <small>TIKTOK · MUSIC ANIMATION · PUBLIC WORK</small>
            <h3><Lang zh="語之神神器展覽篇" en="ARTIFACTS OF THE LANGUAGE GOD" /></h3>
            <p><Lang
              zh="由沈耀888π／許文耀公開的音樂動畫作品。聲音、符號、神器視覺與動態敘事在同一支作品中展開；點擊主視覺即可回到原始發布頁觀看。"
              en="A public music-animation work by Shen-Yao 888π / Wen-Yao Hsu, bringing sound, symbolic artifacts and motion storytelling into one piece. Select the artwork to watch it at its original publication page."
            /></p>
            <a href="https://vt.tiktok.com/ZS9rDg3ATyPX4-sKjkh/" target="_blank" rel="noreferrer"><Lang zh="開啟原始作品" en="OPEN ORIGINAL WORK" /> ↗</a>
          </div>
        </article>

        <article className={`${styles.mediaFeature} ${styles.mediaFeatureVideo}`}>
          <div className={styles.mediaVideo}>
            <VideoEmbed
              url="https://youtu.be/2UFVuPkDkTc?si=x63L1sVECKuIgzT4"
              title="主體未眠 / The Subject Never Sleeps"
            />
          </div>
          <div className={styles.mediaFeatureCopy}>
            <small>YOUTUBE · ORIGINAL STREAM · PUBLIC WORK</small>
            <h3><Lang zh="主體未眠" en="THE SUBJECT NEVER SLEEPS" /></h3>
            <p><Lang
              zh="我以五個聲部守住辨認、邊界、情緒、照見與責任；官網直接嵌入我的原始 YouTube 作品，不另行上傳。"
              en="I use five voices to guard identity, boundaries, emotion, reflection and responsibility. The site embeds my original YouTube work without duplicating the upload."
            /></p>
            <a href="https://youtu.be/2UFVuPkDkTc?si=x63L1sVECKuIgzT4" target="_blank" rel="noreferrer"><Lang zh="前往 YouTube" en="OPEN ON YOUTUBE" /> ↗</a>
          </div>
        </article>
      </div>

      <div className={styles.mediaIndexLabel}><Lang zh="更多影音與跨域作品入口" en="MORE MEDIA & CROSS-DISCIPLINARY ROUTES" /></div>
      <div className={styles.worksGrid}>{mediaWorks.map((item) => item.internal ? <LocalizedLink className={styles.workCard} href={item.href} key={item.href}><div><small>{item.meta}</small><h3><Lang zh={item.titleZh} en={item.titleEn} /></h3><p><Lang zh={item.textZh} en={item.textEn} /></p></div><span><Lang zh="在官網開啟" en="OPEN ON SITE" /> →</span></LocalizedLink> : <ExternalCard item={item} key={item.href}/>)}</div>
    </section>

    <section className={styles.worksSection} id="literature" aria-labelledby="literature-work-title">
      <header><span>03</span><div><h2 id="literature-work-title"><Lang zh="文學與書籍" en="LITERATURE & BOOKS" /></h2><p><Lang zh="我讓三部作品保有各自的世界與公開邊界：《沉靜是一種語言》公開正式第一部試讀與繁中購買入口；《審訊室存在過的名字》保留獨立審訊室世界；《虛偽文明的審判》由我逐案拆解文明的虛偽，官網只公開我選定的圖卡、短判詞與摘要。" en="I keep three works in their own worlds and release boundaries: Stillness Is a Language has a formal Part One preview and verified Traditional Chinese storefront; The Name That Existed in the Interrogation Room keeps its sealed world; and in The Judgment of a False Civilization I dismantle civilization’s falsehoods case by case, releasing only the artwork, short verdicts and summaries I have selected." /></p></div></header>
      <div className={styles.literatureGrid}>
        <LocalizedLink className={`${styles.literatureCard} ${styles.stillnessWork}`} href="/books/stillness-is-a-language">
          <div className={styles.literatureVisual}>
            <Lang
              zh={<Image src="/media/books/stillness-is-a-language/cover-zh.jpg" alt="《沉靜是一種語言》繁中版封面" fill unoptimized sizes="(max-width: 760px) 66vw, 22vw" />}
              en={<Image src="/media/books/stillness-is-a-language/cover-en.jpg" alt="Stillness Is a Language English cover" fill unoptimized sizes="(max-width: 760px) 66vw, 22vw" />}
            />
          </div>
          <div className={styles.literatureCopy}><small>2025 ORIGINAL · 2026 REVISED EDITION</small><h3><Lang zh="沉靜是一種語言" en="STILLNESS IS A LANGUAGE" /></h3><p><Lang zh="從尚未命名的語言，到把責任落地的起點。繁中第一部 17 頁與英文同內容邊界試讀，分開呈現。" en="From a language that had not yet been named to the beginning of responsibility made concrete. Part One is presented separately in Traditional Chinese and English." /></p><span><Lang zh="進入書籍頁" en="ENTER THE BOOK" /> ↗</span></div>
        </LocalizedLink>

        <LocalizedLink className={`${styles.literatureCard} ${styles.interrogationWork}`} href="/novel/interrogation-room">
          <div className={styles.literatureScene}><Image src="/media/novel/interrogation-room-scene.png" alt="空審訊室、桌椅、單向玻璃與晨光" fill unoptimized sizes="(max-width: 760px) 100vw, 42vw" /></div>
          <div className={styles.literatureCopy}><small>08:17 · FICTION · WORK IN PROGRESS</small><h3><Lang zh="審訊室存在過的名字" en="THE NAME THAT EXISTED IN THE INTERROGATION ROOM" /></h3><p><Lang zh="所有人都進過審訊室，只有一個名字留了下來。公開頁先呈現故事提要；作品持續更新中。" en="Many entered the interrogation room. Only one name remained. The public page first presents a synopsis while the work continues to evolve." /></p><span><Lang zh="進入作品頁" en="ENTER THE WORK" /> ↗</span></div>
        </LocalizedLink>

        <LocalizedLink className={`${styles.literatureCard} ${styles.judgmentWork}`} href="/books/judgment-of-civilization">
          <div className={`${styles.literatureScene} ${styles.judgmentScene}`}>
            <Image src="/media/books/judgment-of-civilization/case-004.jpg" alt="《虛偽文明的審判》第四案圖卡" fill unoptimized sizes="(max-width: 760px) 100vw, 42vw" />
            <span className={styles.judgmentDossierMark}>CASE DOSSIER · 001—005</span>
          </div>
          <div className={styles.literatureCopy}><small>8 PARTS · 34 PROVISIONAL CASES · 7 WEB SELECTIONS</small><h3><Lang zh="虛偽文明的審判" en="THE JUDGMENT OF A FALSE CIVILIZATION" /></h3><p><Lang zh="我在這套作品裡逐案解構文明如何讓沒有責任鏈的知識使用權取得合法性；我審判的不是現象與知識本身。我只在官網公開選定圖卡、短判詞與摘要，完整書稿不公開。" en="In this work, I dismantle case by case how knowledge-use authority without a responsibility chain became legitimate; phenomena and knowledge themselves are not the accused. I release only selected artwork, short verdicts and summaries on the site, not the full manuscript." /></p><span><Lang zh="進入文明案件檔案" en="ENTER THE CIVILIZATIONAL DOSSIER" /> ↗</span></div>
        </LocalizedLink>
      </div>
      <LocalizedLink className={styles.booksHubLink} href="/books"><Lang zh="瀏覽文學與書籍專區" en="EXPLORE LITERATURE & BOOKS" /> <span aria-hidden="true">→</span></LocalizedLink>
    </section>

    <section className={styles.worksSection}>
      <header><span>04</span><div><h2><Lang zh="公開文章與外部紀錄" en="PUBLIC WRITING & EXTERNAL RECORDS" /></h2><p><Lang zh="我讓每個連結直接回到原始發布位置，也把本人發布、開發者社群文章與第三方媒體報導分開標示；我的判斷由我署名承擔，平台出現不被改寫成平台背書。" en="I link every record back to its original publication and distinguish my own releases, developer-community posts and third-party media coverage. I sign and answer for my judgments; appearing on a platform is not recast as platform endorsement." /></p></div></header>
      <div className={styles.worksGrid}>{articleWorks.map((item) => <ExternalCard item={item} key={item.href}/>)}</div>
    </section>

    <div className={styles.worksNotice}><Lang zh="我的公開邊界：本頁只放我已公開、可核對的作品入口；尚未完成的版本不會被我先包裝成已經存在。" en="My public boundary: this page contains only work I have released and made verifiable. I do not package unfinished versions as if they already existed." /></div>
  </main><SiteFooter/></>;
}
