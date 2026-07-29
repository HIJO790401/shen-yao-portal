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
      <div><small>SELECTED WORKS · SYSTEMS / MOTION / MUSIC / WRITING</small><h1><Lang zh={<>作品<br/>不是清單。</>} en={<>WORKS<br/>ARE NOT A LIST.</>} /></h1><p><Lang zh="每件作品依真實媒介分流：能運算的系統進固定案例 Demo，動畫與音樂回到公開影音，文章回到原始發布頁。" en="Each work stays in its real medium: executable systems become fixed-case demos, animation and music return to public media, and writing links to its original publication." /></p></div>
      <aside><span>SYSTEMS<br/>{readyDemos.length} FIXED DEMOS</span><span>ANIMATION<br/>EXTERNAL MEDIA</span><span>MUSIC<br/>EXTERNAL MEDIA</span><span>WRITING<br/>PRIMARY LINKS</span></aside>
    </section>

    <section className={styles.worksSection}>
      <header><span>01</span><div><h2><Lang zh="系統與固定案例" en="SYSTEMS & FIXED CASES" /></h2><p><Lang zh="以下十三套展示不收訪客輸入；畫面只重播 Repo 內建案例、原公式或策展資料。SCBKR 本地責任鏈模型依指示暫緩動畫。" en="These thirteen displays accept no visitor input; they replay only repository fixtures, source formulas or curated case data. Motion for the SCBKR Local Responsibility Model remains deferred by the owner." /></p></div></header>
      <div className={styles.worksGrid}>{readyDemos.map((film) => <LocalizedLink className={styles.workCard} href={`/demo/${film.slug}`} key={film.slug}>
        <div><small>{film.index} · {film.label}</small><h3><Lang zh={film.name} en={film.nameEn} /></h3><p><Lang zh={film.introZh} en={film.introEn} /></p></div>
        <span><Lang zh="播放固定案例" en="PLAY FIXED CASE" /> →</span>
      </LocalizedLink>)}</div>
    </section>

    <section className={styles.worksSection} id="music-animation" aria-labelledby="music-animation-title">
      <header><span>02</span><div><h2 id="music-animation-title"><Lang zh="音樂與動畫" en="MUSIC & ANIMATION" /></h2><p><Lang zh="直接觀看目前已公開的音樂動畫；網站保留作品脈絡與入口，影音仍由原始平台傳輸。新 3D 建模與十秒開場影片完成後，才會列為新作品版本。" en="Watch the currently published music-animation works here. This site preserves their context and entry points while the original platforms deliver the media. New 3D work and the ten-second intro will be listed only after they exist as new versions." /></p></div></header>

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
              title="公開音樂動畫作品 / Public Music-Animation Work"
            />
          </div>
          <div className={styles.mediaFeatureCopy}>
            <small>YOUTUBE · ORIGINAL STREAM · PUBLIC WORK</small>
            <h3><Lang zh="公開音樂動畫作品" en="PUBLIC MUSIC-ANIMATION WORK" /></h3>
            <p><Lang
              zh="本站直接嵌入原始 YouTube 影音，不另行上傳，也不在未核對前替作品杜撰正式片名；正式標題與發布資訊以原始影片頁為準。"
              en="This site embeds the original YouTube stream without duplicating the upload or inventing a formal title before it is verified. The original video page remains authoritative for its published title and details."
            /></p>
            <a href="https://youtu.be/2UFVuPkDkTc?si=x63L1sVECKuIgzT4" target="_blank" rel="noreferrer"><Lang zh="前往 YouTube" en="OPEN ON YOUTUBE" /> ↗</a>
          </div>
        </article>
      </div>

      <div className={styles.mediaIndexLabel}><Lang zh="更多影音與跨域作品入口" en="MORE MEDIA & CROSS-DISCIPLINARY ROUTES" /></div>
      <div className={styles.worksGrid}>{mediaWorks.map((item) => item.internal ? <LocalizedLink className={styles.workCard} href={item.href} key={item.href}><div><small>{item.meta}</small><h3><Lang zh={item.titleZh} en={item.titleEn} /></h3><p><Lang zh={item.textZh} en={item.textEn} /></p></div><span><Lang zh="在官網開啟" en="OPEN ON SITE" /> →</span></LocalizedLink> : <ExternalCard item={item} key={item.href}/>)}</div>
    </section>

    <section className={styles.worksSection}>
      <header><span>03</span><div><h2><Lang zh="公開文章與外部紀錄" en="PUBLIC WRITING & EXTERNAL RECORDS" /></h2><p><Lang zh="連結直接回原始發布位置；NVIDIA 項目清楚標示為開發者社群文章，不冒充官方合作或背書。" en="Links return to original publication locations. NVIDIA items are explicitly developer-community posts, never presented as official collaboration or endorsement." /></p></div></header>
      <div className={styles.worksGrid}>{articleWorks.map((item) => <ExternalCard item={item} key={item.href}/>)}</div>
    </section>

    <div className={styles.worksNotice}><Lang zh="邊界：本頁只整理目前可核實的公開作品入口。尚未完成的 3D、音樂專輯、開場影片或商用 API 不會先用視覺包裝成已存在。" en="Boundary: this page organizes only verifiable public work. Unfinished 3D, music releases, intro film or commercial APIs are not visually packaged as if they already exist." /></div>
  </main><SiteFooter/></>;
}
