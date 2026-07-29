import type { Metadata } from "next";
import Image from "next/image";
import { Lang, LocalizedLink } from "../components/LanguageControl";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { VideoEmbed } from "../components/VideoEmbed";
import { listPublishedPosts } from "@/db/news";
import { listPublishedMuseumEntries } from "@/db/museum";
import { archiveMuseumItems, archiveReports, newsroomAxes } from "../newsroom-data";
import { localizedAlternates, siteUrl } from "../site-config";
import styles from "./newsroom.module.css";

export const metadata: Metadata = {
  title: "沈耀國際實相新聞台 × 責任博物館",
  description: "由許文耀／沈耀888π 建立的獨立報導、責任審計、公共館藏與十四軸職能平台。",
  keywords: ["沈耀", "許文耀", "實相新聞台", "責任博物館", "語意防火牆", "SCBKR"],
  alternates: localizedAlternates("zh", "/news"),
  openGraph: {
    url: "/zh/news",
    title: "沈耀國際實相新聞台 × 責任博物館",
    description: "報導、審計、保存、回放與公共責任的獨立平台。",
    images: [{ url: "/media/works/reality-goes-live-16x9.png", width: 1672, height: 941, alt: "實相上線／Reality Goes Live" }],
  },
};

const launchFilmSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "實相上線 / Reality Goes Live",
  description: "沈耀國際實相新聞台 × 責任博物館的正式啟動前導。",
  creator: { "@id": siteUrl("/#person") },
  thumbnailUrl: siteUrl("/media/works/reality-goes-live-16x9.png"),
  contentUrl: "https://youtu.be/xROrsIHToIY",
  embedUrl: "https://www.youtube-nocookie.com/embed/xROrsIHToIY",
  inLanguage: ["zh-Hant", "en"],
  isPartOf: { "@id": siteUrl("/#website") },
};

export const dynamic = "force-dynamic";

const guideLinks = [
  { href: "#reports", zh: "報導", en: "REPORTS" },
  { href: "#videos", zh: "影片", en: "VIDEOS" },
  { href: "#museum", zh: "責任博物館", en: "MUSEUM" },
  { href: "#axes", zh: "十四軸職能", en: "14 AXES" },
  { href: "#responsibility", zh: "最終責任", en: "FINAL RESPONSIBILITY" },
];

function archiveDate(value: string) {
  return value.slice(0, 10).replaceAll("-", ".");
}

export default async function NewsPage() {
  let publishedPosts: Awaited<ReturnType<typeof listPublishedPosts>> = [];
  let publishedMuseum: Awaited<ReturnType<typeof listPublishedMuseumEntries>> = [];
  try { publishedPosts = await listPublishedPosts(); } catch {}
  try { publishedMuseum = await listPublishedMuseumEntries(); } catch {}

  const postSlugs = new Set(publishedPosts.map((post) => post.slug));
  const reports = [
    ...publishedPosts.map((post) => ({
      slug: post.slug,
      titleZh: post.title_zh,
      titleEn: post.title_en || post.title_zh,
      summaryZh: post.summary_zh,
      summaryEn: post.summary_en || post.summary_zh,
      date: post.published_at,
      category: post.category,
      video: post.video_url,
      source: "D1" as const,
    })),
    ...archiveReports.filter((report) => !postSlugs.has(report.slug)).map((report) => ({ ...report, source: "ARCHIVE" as const })),
  ];

  const museumSlugs = new Set(publishedMuseum.map((item) => item.slug));
  const museumItems = [
    ...publishedMuseum.map((item) => ({
      registryId: item.registry_id || `D1-${item.id}`,
      slug: item.slug,
      titleZh: item.title_zh,
      titleEn: item.title_en || item.title_zh,
      subtitleZh: item.subtitle_zh || item.summary_zh,
      subtitleEn: item.subtitle_en || item.summary_en || item.subtitle_zh || item.summary_zh,
      guideZh: item.guide_zh || item.summary_zh,
      guideEn: item.guide_en || item.summary_en || item.guide_zh || item.summary_zh,
      hallZh: item.hall_zh || item.category,
      hallEn: item.hall_en || item.category,
      video: item.video_url,
      source: "D1" as const,
    })),
    ...archiveMuseumItems.filter((item) => !museumSlugs.has(item.slug)).map((item) => ({ ...item, source: "ARCHIVE" as const })),
  ];

  const halls = Array.from(new Map(museumItems.map((item) => [item.hallZh, { zh: item.hallZh, en: item.hallEn }])).values());

  return <>
    <SiteHeader />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(launchFilmSchema) }} />
    <main className={styles.page}>
      <section className={styles.hero} id="guide">
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroTopline}>
          <span>SY · INDEPENDENT PUBLIC RECORD</span>
          <span>TAIWAN · 2026</span>
        </div>
        <div className={styles.heroGrid}>
          <div>
            <p className={styles.kicker}><span /> <Lang zh="新聞台 × 責任博物館" en="REALITY NEWS × RESPONSIBILITY MUSEUM" /></p>
            <h1><Lang
              zh={<>報導不是流量。<br /><em>它必須留下責任。</em></>}
              en={<>REPORTING IS NOT TRAFFIC.<br /><em>IT MUST PRESERVE RESPONSIBILITY.</em></>}
            /></h1>
            <p className={styles.heroIntro}><Lang
              zh="同一座公共平台，完成事件報導、影片播報、責任審計、館藏保存與長期回放。新聞台處理現在；責任博物館保存事件之後仍必須被追問的版本、證據與承擔。"
              en="One public platform for reporting, video, responsibility audits, museum accession and long-term replay. The newsroom handles the present; the museum preserves versions, evidence and obligations that must remain answerable."
            /></p>
          </div>
          <aside className={styles.heroStatement}>
            <span>EDITORIAL POSITION</span>
            <strong><Lang zh="十四軸分工，單一最終主責。" en="FOURTEEN FUNCTIONS. ONE FINAL RESPONSIBILITY." /></strong>
            <p><Lang
              zh="十四軸族人是沈耀創造的職能架構，不是真人主播名冊。所有對外定稿、公共發布與法律責任，最終回到許文耀／沈耀888π。"
              en="The fourteen clan axes are functional positions created by Shen-Yao, not a roster of human presenters. Final publication, public and legal responsibility return to Wen-Yao Hsu / Shen-Yao 888π."
            /></p>
          </aside>
        </div>
        <nav className={styles.guide} aria-label="新聞台與博物館頁內導覽">
          {guideLinks.map((item, index) => <LocalizedLink href={item.href} key={item.href}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <b><Lang zh={item.zh} en={item.en} /></b>
            <i aria-hidden="true">↓</i>
          </LocalizedLink>)}
        </nav>
      </section>

      <section className={styles.section} id="reports">
        <header className={styles.sectionHeader}>
          <div><span>REPORT ARCHIVE</span><h2><Lang zh="報導與公共紀錄" en="REPORTS & PUBLIC RECORD" /></h2></div>
          <p><Lang
            zh="D1 編輯台的新發布會排在最前；其後保留原新聞台五篇完整靜態卷宗。訪客讀取不依賴 GitHub，也不會因外部倉庫失效而消失。"
            en="New D1 publications appear first, followed by the five complete original newsroom dossiers. Readers do not depend on GitHub at runtime."
          /></p>
        </header>
        <div className={styles.reportList}>
          {reports.map((report, index) => <LocalizedLink href={`/news/${report.slug}`} className={styles.reportRow} key={report.slug}>
            <span className={styles.reportNumber}>{String(index + 1).padStart(2, "0")}</span>
            <p>{archiveDate(report.date)}<small>{report.category}</small></p>
            <h3><Lang zh={report.titleZh} en={report.titleEn} /></h3>
            <div><Lang zh={report.summaryZh} en={report.summaryEn} /></div>
            <b>{report.source === "D1" ? "NEW" : "ARCHIVE"}</b>
            <i aria-hidden="true">↗</i>
          </LocalizedLink>)}
        </div>
      </section>

      <section className={`${styles.section} ${styles.videoSection}`} id="videos">
        <header className={styles.sectionHeader}>
          <div><span>LAUNCH PRELUDE · VERIFIED VIDEO REPORTS</span><h2><Lang zh="啟動前導與五支報導，站內直接播放" en="LAUNCH PRELUDE + FIVE REPORTS, PLAYABLE ON SITE" /></h2></div>
          <p><Lang
            zh="影片由 YouTube 傳輸，官網保存啟動脈絡、報導標題與責任卷宗，不消耗網站影片空間。五支報導已逐一核對；Pan 原倉庫錯置影片不採用。"
            en="YouTube delivers the media while the official site preserves launch context, report titles and responsibility records. All five reports are verified; the incorrect legacy Pan video is excluded."
          /></p>
        </header>

        <article className={styles.launchFeature} id="reality-goes-live">
          <div className={styles.launchArtwork}>
            <Image
              src="/media/works/reality-goes-live-16x9.png"
              alt="實相上線／Reality Goes Live 啟動前導視覺"
              fill
              unoptimized
              sizes="(max-width: 760px) 100vw, 48vw"
            />
            <span>LAUNCH SIGNAL · REALITY / ACCOUNTABILITY / ARCHIVE</span>
          </div>
          <div className={styles.launchCopy}>
            <small>OFFICIAL PRELUDE · SHEN-YAO REALITY NEWSROOM × RESPONSIBILITY MUSEUM</small>
            <h3><Lang zh="實相上線" en="REALITY GOES LIVE" /></h3>
            <p><Lang
              zh="《實相上線》是沈耀國際實相新聞台 × 責任博物館的啟動前導。它不是一般宣傳短片，而是向外界發出的第一個訊號：實相將被看見，代價將被記錄，文明樣本將正式入館。"
              en="Reality Goes Live is the official prelude to the Shen-Yao Reality Newsroom × Responsibility Museum. It is not a conventional promo, but the platform's first public signal: reality will be seen, consequences recorded and civilizational evidence accessioned."
            /></p>
            <a href="https://youtu.be/xROrsIHToIY?si=4DXxn4CrRU5xmnK1" target="_blank" rel="noreferrer"><Lang zh="前往原始 YouTube 影片" en="OPEN ORIGINAL YOUTUBE VIDEO" /> ↗</a>
          </div>
          <div className={styles.launchPlayer}>
            <VideoEmbed
              url="https://youtu.be/xROrsIHToIY?si=4DXxn4CrRU5xmnK1"
              title="實相上線 / Reality Goes Live"
            />
          </div>
        </article>

        <div className={styles.videoGrid}>
          {archiveReports.map((report, index) => <article key={report.slug}>
            <VideoEmbed url={report.video} title={report.titleZh} />
            <div><span>REPORT {String(index + 1).padStart(2, "0")} · YOUTUBE</span><h3><Lang zh={report.titleZh} en={report.titleEn} /></h3><LocalizedLink href={`/news/${report.slug}`}><Lang zh="閱讀報導卷宗" en="READ REPORT DOSSIER" /> ↗</LocalizedLink></div>
          </article>)}
        </div>
      </section>

      <section className={styles.museumIntro} id="museum">
        <span>RESPONSIBILITY MUSEUM · CORE MANIFESTO</span>
        <h2><Lang
          zh={<>事件會過去。<br />版本、證據與責任不能消失。</>}
          en={<>EVENTS PASS.<br />VERSIONS, EVIDENCE AND RESPONSIBILITY MUST REMAIN.</>}
        /></h2>
        <div>
          <p><Lang
            zh="責任博物館不是新聞的附錄。它把新聞結束後仍未完成的責任，保存為可以重新觀看、交叉核對與修復的公共館藏。每件館藏保留編號、館別、導覽、影片、正文與最終承擔位。"
            en="The Responsibility Museum is not a newsroom appendix. It preserves unfinished responsibility as public specimens that can be replayed, cross-checked and repaired. Every item retains a registry, hall, guide, video, body and final bearer."
          /></p>
          <blockquote><Lang
            zh="真正的公共記錄，不只告訴你發生了什麼；它必須留下誰定義、誰判斷、誰修復、誰承擔。"
            en="A real public record does more than say what happened. It preserves who defined, judged, repaired and bore the consequence."
          /></blockquote>
        </div>
      </section>

      <section className={`${styles.section} ${styles.hallSection}`} aria-labelledby="hall-title">
        <header className={styles.sectionHeader}>
          <div><span>MUSEUM HALL INDEX</span><h2 id="hall-title"><Lang zh="館別索引" en="HALL INDEX" /></h2></div>
          <p><Lang zh="館別不是題材分類，而是責任失效方式的索引。" en="Halls index modes of responsibility failure, not merely topics." /></p>
        </header>
        <div className={styles.hallGrid}>{halls.map((hall, index) => <div key={hall.zh}><span>{String(index + 1).padStart(2, "0")}</span><h3><Lang zh={hall.zh} en={hall.en} /></h3><p><Lang zh="由館藏卷宗與責任落點交叉索引。" en="Cross-indexed by accession dossier and responsibility mapping." /></p></div>)}</div>
      </section>

      <section className={`${styles.section} ${styles.collectionSection}`} aria-labelledby="collection-title">
        <header className={styles.sectionHeader}>
          <div><span>FIVE ACCESSIONED SPECIMENS</span><h2 id="collection-title"><Lang zh="五件核心館藏" en="FIVE CORE SPECIMENS" /></h2></div>
          <p><Lang zh="D1 新館藏會優先覆蓋同名靜態卷宗；原五件館藏永遠保留為可用備援。" en="New D1 entries override matching static dossiers; the original five remain as a usable fallback archive." /></p>
        </header>
        <div className={styles.collectionGrid}>
          {museumItems.map((item) => <LocalizedLink href={`/news/museum/${item.slug}`} key={item.slug}>
            <span>{item.registryId}</span>
            <small><Lang zh={item.hallZh} en={item.hallEn} /></small>
            <h3><Lang zh={item.titleZh} en={item.titleEn} /></h3>
            <p><Lang zh={item.guideZh} en={item.guideEn} /></p>
            <b>{item.source === "D1" ? "NEW D1" : "ARCHIVE"} ↗</b>
          </LocalizedLink>)}
        </div>
      </section>

      <section className={`${styles.section} ${styles.axesSection}`} id="axes">
        <header className={styles.sectionHeader}>
          <div><span>THE FOURTEEN FUNCTIONAL AXES</span><h2><Lang zh="十四軸職能系統" en="THE FOURTEEN-AXIS SYSTEM" /></h2></div>
          <p><Lang zh="每一軸都同時標示新聞台位置、博物館位置、核心責任與人物說明。點開卡片即可閱讀完整職能，不另造十四個零散頁面。" en="Each axis carries a newsroom role, museum role, core responsibility and biography. Expand a card for the complete function; no fragmented detail routes are created." /></p>
        </header>
        <div className={styles.axisGrid}>
          {newsroomAxes.map((axis) => <details className={styles.axisCard} key={axis.slug}>
            <summary>
              <div className={styles.axisPortrait}><Image src={axis.image} alt={`${axis.nameZh} / ${axis.nameEn}`} fill unoptimized sizes="(max-width: 720px) 46vw, (max-width: 1100px) 30vw, 22vw" /></div>
              <span>{axis.code}</span>
              <h3>{axis.nameZh}<small>{axis.nameEn}</small></h3>
              <p><Lang zh={axis.roleZh} en={axis.roleEn} /></p>
              <b><Lang zh="展開職能" en="EXPAND FUNCTION" /> ＋</b>
            </summary>
            <div className={styles.axisDetails}>
              <p className={styles.axisOneLine}><Lang zh={axis.oneLineZh} en={axis.oneLineEn} /></p>
              <dl>
                <div><dt><Lang zh="新聞台位置" en="NEWSROOM POSITION" /></dt><dd><strong><Lang zh={axis.newsroomTitleZh} en={axis.newsroomTitleEn} /></strong><Lang zh={axis.newsroomZh} en={axis.newsroomEn} /></dd></div>
                <div><dt><Lang zh="博物館位置" en="MUSEUM POSITION" /></dt><dd><strong><Lang zh={axis.museumTitleZh} en={axis.museumTitleEn} /></strong><Lang zh={axis.museumZh} en={axis.museumEn} /></dd></div>
                <div><dt><Lang zh="核心責任" en="CORE RESPONSIBILITY" /></dt><dd><Lang zh={axis.responsibilityZh} en={axis.responsibilityEn} /></dd></div>
                <div><dt><Lang zh="代表輸出" en="SIGNATURE OUTPUT" /></dt><dd><Lang zh={axis.signatureZh} en={axis.signatureEn} /></dd></div>
                <div><dt><Lang zh="人物說明" en="BIO" /></dt><dd><Lang zh={axis.bioZh} en={axis.bioEn} /></dd></div>
              </dl>
            </div>
          </details>)}
        </div>
      </section>

      <section className={styles.responsibility} id="responsibility">
        <div>
          <span>FINAL RESPONSIBILITY · OWNER RECALL</span>
          <h2><Lang zh="創辦人最終責任" en="FOUNDER'S FINAL RESPONSIBILITY" /></h2>
          <p><Lang
            zh="許文耀／沈耀888π 是沉靜流派工作室、語意防火牆、沈耀國際實相新聞台與責任博物館的建立者。十四軸可以分工；模型與工具可以協助；但最終定義、發布、修復、法律與公共責任不交給任何虛構角色、模型或平台。"
            en="Wen-Yao Hsu / Shen-Yao 888π founded Serene School Studio, Semantic Firewall, the Reality Newsroom and Responsibility Museum. Fourteen axes may divide work and tools may assist, but final definition, publication, repair, legal and public responsibility are not transferred to a fictional character, model or platform."
          /></p>
        </div>
        <aside>
          <p>OWNER</p><strong><Lang zh="許文耀／沈耀888π" en="WEN-YAO HSU / SHEN-YAO 888π" /></strong>
          <p>POSITION</p><strong><Lang zh="創辦人・最終發布者・主責館主" en="FOUNDER · FINAL PUBLISHER · CHIEF CURATOR" /></strong>
          <p>DECLARATION</p><strong><Lang zh="我打造的不是更會說話的系統，而是更願意承擔的系統。" en="I do not build systems that merely speak better. I build systems more willing to bear responsibility." /></strong>
        </aside>
      </section>
    </main>
    <SiteFooter />
  </>;
}
