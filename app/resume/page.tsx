import type { Metadata } from "next";
import Image from "next/image";
import { Lang, LocalizedLink } from "../components/LanguageControl";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { localizedAlternates, scbkrMicrosoftStore, siteUrl } from "../site-config";
import { PrintResumeButton } from "./PrintResumeButton";
import styles from "./resume.module.css";

export const metadata: Metadata = {
  title: "公開履歷｜許文耀／沈耀888π",
  description:
    "許文耀／沈耀888π的中英雙語公開履歷：沉靜流派工作室、語意防火牆、SCBKR、AICC OS v0.2.CANDIDATE 候選架構、公開工程、外部媒體紀錄、文章、動畫與音樂。",
  keywords: [
    "許文耀履歷",
    "沈耀888π",
    "Wen-Yao Hsu resume",
    "SERENE SCHOOL STUDIO",
    "Semantic Firewall",
    "SCBKR",
    "AICC OS",
    "AI Capability Compiler",
    "獨立系統架構師",
  ],
  alternates: localizedAlternates("zh", "/resume"),
  openGraph: {
    url: "/zh/resume",
    title: "許文耀／沈耀888π｜可查證公開履歷",
    description: "獨立系統架構、語意治理、動畫、音樂與公開作品紀錄。",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "SERENE SCHOOL STUDIO" }],
  },
};

const engineeringWorks = [
  {
    number: "01",
    title: "SCBKR",
    subtitleZh: "本地優先 AI 責任鏈執行系統",
    subtitleEn: "LOCAL-FIRST AI RESPONSIBILITY-CHAIN RUNTIME",
    status: "MICROSOFT STORE · FREE WINDOWS APPLICATION",
    summaryZh:
      "已於 Microsoft Store 免費上架的 Windows 本地責任鏈應用，把使用者簽署規則、四庫資料結構、規則包編譯、權限閘、事件回放與本地模型介面整合成可執行系統。",
    summaryEn:
      "A free Windows application published on Microsoft Store, integrating owner-signed rules, four-store data structures, rule-pack compilation, permission gates, event replay and local-model interfaces.",
    stack: "PYTHON · FASTAPI · SQLITE · REACT · TYPESCRIPT · TAURI",
    href: "https://github.com/HIJO790401/scbkr-local-responsibility-model",
    licenseZh: "Microsoft Store 免費提供；公開原始碼未標示 OSI 授權",
    licenseEn: "FREE ON MICROSOFT STORE; PUBLIC SOURCE WITH NO OSI LICENSE DECLARED",
  },
  {
    number: "02",
    title: "AICC OS",
    subtitleZh: "AI 能力編譯暨版本治理作業系統",
    subtitleEn: "AI CAPABILITY COMPILER & VERSION GOVERNANCE OS",
    status: "v0.2.CANDIDATE · ENGINEERING CANDIDATE",
    summaryZh:
      "把已確認的能力、模板與邊界編譯成可重用路徑：L1 固化執行、L2 最小差異、L3 邊界推理；超出現行版本時停在 VERSION GAP。",
    summaryEn:
      "Confirmed capabilities, templates and boundaries become reusable paths through L1 solidified execution, L2 minimum-delta updates and L3 bounded reasoning, with out-of-version requests stopping at VERSION GAP.",
    stack: "L1 · L2 · L3 · CAPABILITY REGISTRY · MODULE MANAGER · LOCAL GATEWAY",
    href: "/demo/aicc-os",
    internal: true,
    licenseZh: "工程候選；Public Runtime 尚未正式發布",
    licenseEn: "ENGINEERING CANDIDATE; PUBLIC RUNTIME NOT RELEASED",
  },
  {
    number: "03",
    title: "SERENE PORTAL",
    subtitleZh: "工作室官網、內容系統與站主編輯器",
    subtitleEn: "STUDIO PORTAL, CONTENT SYSTEM & OWNER CMS",
    status: "PUBLIC ENGINEERING · SOURCE COMPLETE / DEPLOYMENT PENDING",
    summaryZh:
      "中英獨立路由、產品與作品展示、實相新聞台、責任博物館、站主 CMS、D1 內容資料與 R2 圖片上傳的完整網站工程。",
    summaryEn:
      "A complete web project with separate Chinese and English routes, product and work showcases, newsroom, museum, owner CMS, D1 content data and R2 image uploads.",
    stack: "NEXT.JS · REACT · TYPESCRIPT · D1 · R2 · DRIZZLE",
    href: "https://github.com/HIJO790401/shen-yao-portal",
    licenseZh: "公開原始碼；正式網域部署待驗收",
    licenseEn: "PUBLIC SOURCE; PRODUCTION DOMAIN PENDING REVIEW",
  },
  {
    number: "04",
    title: "RESPONSIBILITY DEMOS",
    subtitleZh: "責任治理固定案例展示套件",
    subtitleEn: "FIXED-CASE RESPONSIBILITY-GOVERNANCE DEMO SUITE",
    status: "DEMO / POC · NOT A PRODUCTION DECISION SYSTEM",
    summaryZh:
      "以中英雙語、固定案例與確定性前端流程，展示反詐、著作權、付款責任、文件交付與決策資格審計。",
    summaryEn:
      "Bilingual fixed-case and deterministic front-end demonstrations spanning anti-scam, copyright, payment responsibility, document delivery and decision eligibility.",
    stack: "HTML · CSS · JAVASCRIPT · REACT · TYPESCRIPT",
    href: "https://github.com/HIJO790401/anti-scam-semantic-rlock",
    licenseZh: "展示／概念驗證；非即時 AI 服務",
    licenseEn: "DEMONSTRATION / POC; NOT A LIVE AI SERVICE",
  },
];

const publicEvidence = [
  {
    kind: "OFFICIAL DISTRIBUTION · MICROSOFT STORE",
    date: "2026.08.25",
    titleZh: "SCBKR Responsibility Chain Language Model 正式上架",
    titleEn: "SCBKR RESPONSIBILITY CHAIN LANGUAGE MODEL PUBLISHED",
    textZh:
      "Microsoft 官方商品頁列出由 shenyao888pi 發布、Wen-Yao Hsu／許文耀開發的免費 Windows 應用程式。",
    textEn:
      "The official Microsoft listing identifies a free Windows application published by shenyao888pi and developed by Wen-Yao Hsu / 許文耀.",
    noteZh: "應用已上架；是否能安裝仍由 Microsoft Store 依地區與裝置相容性判定。官網動畫另待提供。",
    noteEn: "THE APPLICATION IS LIVE; INSTALLATION STILL DEPENDS ON MICROSOFT STORE REGION AND DEVICE COMPATIBILITY. THE WEBSITE FILM REMAINS PENDING.",
    href: scbkrMicrosoftStore.url,
  },
  {
    kind: "THIRD-PARTY PRESS",
    date: "2025.11.18",
    titleZh: "SecurityBrief Asia 報導語意防火牆",
    titleEn: "SEMANTIC FIREWALL COVERED BY SECURITYBRIEF ASIA",
    textZh:
      "Sean Mitchell 的第三方科技報導討論確定性語意層、推論成本與對話安全。報導中的百分比均為媒體歸因於創辦人／系統方的主張，不是媒體獨立基準測試。",
    textEn:
      "Sean Mitchell's third-party technology report discusses a deterministic semantic layer, inference cost and conversational safety. Percentage figures are attributed to the founder/system side, not presented as independent benchmarks by this site.",
    noteZh: "報導使用歷史英文名稱 Silent School Studio；現行官方名稱為 SERENE SCHOOL STUDIO。",
    noteEn: "The report uses the historical English name Silent School Studio; the current official name is SERENE SCHOOL STUDIO.",
    href: "https://securitybrief.asia/story/semantic-firewall-promises-ai-cost-savings-safer-chat-models",
  },
  {
    kind: "PLATFORM RECORD · COMPETITION SUBMISSION",
    date: "2025.10.30",
    titleZh: "AI-ARTS 第四屆競賽投稿紀錄",
    titleEn: "AI-ARTS 4TH COMPETITION SUBMISSION RECORD",
    textZh:
      "《沈耀律法創世母核・舞蹈音動熔煉之核》保留在 AI-ARTS 官方投稿頁。這是正式投稿／收錄紀錄，不宣稱得獎。",
    textEn:
      "The Mother-Core Law of Shen-Yao: Dance × Sound × Motion is preserved on the official AI-ARTS submission page. It is a submission/publication record, not an award claim.",
    noteZh: "競賽投稿，不等同獎項或主辦方背書。",
    noteEn: "COMPETITION SUBMISSION; NOT AN AWARD OR ORGANIZER ENDORSEMENT.",
    href: "https://ai-arts.org/4th-ai-arts-competition-submissions/",
  },
  {
    kind: "COMMUNITY PUBLICATION",
    date: "2026.06.19",
    titleZh: "NVIDIA 開發者論壇 SCBKR 技術文章",
    titleEn: "SCBKR TECHNICAL POST ON NVIDIA DEVELOPER FORUMS",
    textZh:
      "由本人發布的本地責任鏈工作台技術說明，記錄生成、儲存、回放與檢索閘門的設計。",
    textEn:
      "A founder-authored technical post documenting generation, storage, replay and retrieval gates in a local responsibility-chain workbench.",
    noteZh: "開發者社群內容，不代表 NVIDIA 合作、採用或背書。",
    noteEn: "COMMUNITY CONTENT; NO NVIDIA PARTNERSHIP, ADOPTION OR ENDORSEMENT.",
    href: "https://forums.developer.nvidia.com/t/scbkr-a-local-responsibility-chain-workbench-for-llms-with-human-confirmed-generation-storage-replay-and-retrieval-gates/373910",
  },
  {
    kind: "OWNER-REPORTED PUBLIC ACTIVITY",
    date: "2026.03.26–27",
    titleZh: "去偽存真：全民偵查黑客松現場紀錄",
    titleEn: "AGENT FOR TRUTH HACKATHON — ON-SITE RECORD",
    textZh:
      "創辦人 Repo、現場照片、Instagram 與 YouTube 紀錄描述以 Gogolook 命題組 Team 11 參賽成員身分展示 SCBKR + R-Lock。",
    textEn:
      "The founder's repository, on-site photograph, Instagram and YouTube records describe participation as a Team 11 entrant in the Gogolook challenge track, demonstrating SCBKR + R-Lock.",
    noteZh: "官方頁可確認活動，但未公開個人名冊；身分與隊伍資訊屬本人公開紀錄，不宣稱得獎。",
    noteEn: "THE OFFICIAL PAGE CONFIRMS THE EVENT, NOT A PUBLIC PERSONAL ROSTER. NO AWARD CLAIM.",
    href: "https://www.ai-expo.tw/kiro_hackathon_2026/index.asp",
  },
];

const writing = [
  {
    date: "2026.07.05",
    titleZh: "第 0 定理：責任先於運算",
    titleEn: "THE ZEROTH THEOREM: RESPONSIBILITY PRECEDES COMPUTATION",
    textZh: "本人定義的 AI 治理原則與思想文章；不是學術界既有定理或同儕審查論文。",
    textEn: "A founder-defined AI-governance principle and essay, not an established academic theorem or peer-reviewed paper.",
    href: "https://vocus.cc/article/6a49f63dfd897800010e5197",
  },
  {
    date: "2026.05.04",
    titleZh: "E%mc²：AI 時代的人類判斷幻覺",
    titleEn: "E%mc²: THE ILLUSION OF HUMAN JUDGMENT IN THE AI ERA",
    textZh: "以符號公式整理 AI 效率、成本、責任與人類判斷的概念文章；不是物理學定理。",
    textEn: "A conceptual essay using symbolic formulas to examine AI efficiency, cost, responsibility and human judgment; not a physics theorem.",
    href: "https://vocus.cc/article/69f8eb5afd89780001a785b9",
  },
  {
    date: "2026.04.30",
    titleZh: "AI 音樂產業風險報告",
    titleEn: "AI MUSIC-INDUSTRY RISK REPORT",
    textZh: "從創作者、平台與責任鏈角度整理 AI 音樂產業風險的第一方長文。",
    textEn: "A first-party long-form analysis of AI music-industry risk through creator, platform and responsibility-chain perspectives.",
    href: "https://vocus.cc/article/69f3977cfd89780001b846a6",
  },
];

const creativeWorks = [
  {
    type: "MUSIC × ANIMATION",
    titleZh: "主體未眠",
    titleEn: "THE SUBJECT NEVER SLEEPS",
    textZh: "以五個聲部守住辨認、邊界、情緒、照見與責任的原創音樂動畫。",
    textEn: "An original music-animation in which five voices guard identity, boundaries, emotion, reflection and responsibility.",
    href: "https://www.youtube.com/watch?v=2UFVuPkDkTc",
  },
  {
    type: "NEWSROOM PRELUDE",
    titleZh: "實相上線",
    titleEn: "REALITY GOES LIVE",
    textZh: "實相新聞台 × 責任博物館的啟動前導音樂影像。",
    textEn: "The music-video prelude to the Reality Newsroom × Responsibility Museum.",
    href: "https://www.youtube.com/watch?v=xROrsIHToIY",
  },
  {
    type: "TIKTOK SERIES",
    titleZh: "語之神神器展覽篇",
    titleEn: "ARTIFACTS OF THE LANGUAGE GOD",
    textZh: "結合古文明符號、數學公式、神器建模、動畫與音樂的系列作品。",
    textEn: "A series combining ancient symbols, mathematical formulas, artifact modeling, animation and music.",
    href: "https://www.tiktok.com/@shenyao888pi/playlist/%E8%AA%9E%E4%B9%8B%E7%A5%9E%E7%A5%9E%E5%99%A8%E5%B1%95%E8%A6%BD%E7%AF%87-7536992511126932244",
  },
];

function getProfileSchema(locale: "zh" | "en") {
  const language = locale === "en" ? "en" : "zh-Hant";
  const url = siteUrl(`/${locale}/resume`);
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${url}#profile`,
    url,
    inLanguage: language,
    dateModified: "2026-08-26",
    mainEntity: {
      "@type": "Person",
      "@id": siteUrl("/#person"),
      name: "Wen-Yao Hsu",
      alternateName: ["許文耀", "沈耀888π", "Shen-Yao 888π"],
      jobTitle: "Founder and Independent Systems Architect",
      email: "mailto:ken0963521@gmail.com",
      homeLocation: { "@type": "Place", name: "Taichung, Taiwan" },
      knowsAbout: [
        "Semantic governance",
        "Responsibility-chain systems",
        "Local-first software architecture",
        "Animation",
        "Music",
        "Symbolic design",
      ],
      sameAs: [
        "https://github.com/HIJO790401",
        "https://vocus.cc/salon/hijo19900401/room/hijo1990",
        "https://ai-arts.org/author/shen-yao/",
        "https://www.youtube.com/@JM-qy7gv",
        "https://www.tiktok.com/@shenyao888pi",
        scbkrMicrosoftStore.url,
      ],
      subjectOf: {
        "@type": "NewsArticle",
        headline: "Semantic Firewall promises AI cost savings & safer chat models",
        url: "https://securitybrief.asia/story/semantic-firewall-promises-ai-cost-savings-safer-chat-models",
        datePublished: "2025-11-18",
        author: { "@type": "Person", name: "Sean Mitchell" },
        publisher: { "@type": "Organization", name: "SecurityBrief Asia" },
      },
    },
  };
}

export default function ResumePage({ locale = "zh" }: { locale?: "zh" | "en" }) {
  const profileSchema = getProfileSchema(locale);
  return (
    <div className={styles.shell}>
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }} />
      <main className={styles.page}>
        <section className={styles.hero} aria-labelledby="resume-title">
          <div className={styles.heroAmbient} aria-hidden="true">
            <i /><i /><i />
          </div>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>
              <span>VERIFIED PUBLIC PROFILE</span>
              <Lang zh="可查證公開履歷・2026.07" en="SOURCE-LABELLED RESUME · 2026.07" />
            </p>
            <h1 id="resume-title">
              <Lang zh="許文耀" en="WEN-YAO HSU" />
              <span><Lang zh="沈耀888π" en="SHEN-YAO 888π" /></span>
            </h1>
            <p className={styles.heroRole}>
              <Lang
                zh="沉靜流派工作室創辦人／語意防火牆創辦人／獨立系統架構師／跨媒體創作者"
                en="FOUNDER OF SERENE SCHOOL STUDIO & THE SEMANTIC FIREWALL / INDEPENDENT SYSTEMS ARCHITECT / CROSS-MEDIA CREATOR"
              />
            </p>
            <p className={styles.heroSummary}>
              <Lang
                zh="於台灣台中獨立研發語意治理、AI 責任鏈與本地模型工作流，公開建立 Semantic Firewall、SCBKR，並提出 AICC OS 模組化能力編譯與版本治理架構；創作延伸至動畫、音樂、符號設計與雙語長文。所有系統、作品與公開發布由本人獨立策劃、設計、開發並承擔最終責任。"
                en="Based in Taichung, Taiwan, I independently develop semantic-governance, AI responsibility-chain and local-model workflows, including the Semantic Firewall and SCBKR, and I define the AICC OS architecture for modular capability compilation and version governance. My practice also spans animation, music, symbolic design and bilingual long-form writing. I independently plan, design, develop and take final responsibility for the studio's systems, works and publications."
              />
            </p>
            <div className={styles.heroTags}>
              <span>TAICHUNG · TAIWAN</span>
              <span><Lang zh="一人工作室" en="ONE-PERSON STUDIO" /></span>
              <span>中文 / ENGLISH</span>
            </div>
            <div className={styles.heroActions}>
              <a href="mailto:ken0963521@gmail.com?subject=SERENE%20SCHOOL%20STUDIO%20%E5%90%88%E4%BD%9C%E6%8F%90%E6%A1%88">
                <Lang zh="合作聯絡" en="CONTACT" /><span aria-hidden="true">↗</span>
              </a>
              <PrintResumeButton className={styles.printButton} />
              <LocalizedLink href="/about">
                <Lang zh="完整自介" en="FULL PROFILE" /><span aria-hidden="true">→</span>
              </LocalizedLink>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.portraitFrame}>
              <Image
                src="/media/founder-v2.jpg"
                alt={locale === "en" ? "Wen-Yao Hsu / Shen-Yao 888π, founder of SERENE SCHOOL STUDIO" : "沉靜流派工作室創辦人許文耀／沈耀888π"}
                fill
                priority
                unoptimized
                sizes="(max-width: 860px) 92vw, 38vw"
              />
              <div className={styles.portraitWater} aria-hidden="true" />
            </div>
            <div className={styles.founderSeal}>
              <span><Image src="/media/chenjingliupai-symbol.svg" alt="" fill sizes="60px" /></span>
              <p><b>SERENE SCHOOL STUDIO</b><small>FOUNDER · INDEPENDENT ARCHITECT</small></p>
            </div>
            <blockquote>
              <Lang zh="沉靜不是終止，而是讓一切回到本質。" en="Stillness is not an ending. It lets everything return to its essence." />
            </blockquote>
          </div>
        </section>

        <section className={styles.proofLegend} aria-labelledby="proof-title">
          <div>
            <p>READING THE EVIDENCE</p>
            <h2 id="proof-title"><Lang zh="每一筆經歷，先說明它是什麼證據。" en="EVERY RECORD STATES WHAT KIND OF EVIDENCE IT IS." /></h2>
          </div>
          <div className={styles.legendGrid}>
            <span><i />THIRD-PARTY PRESS<small><Lang zh="獨立媒體報導" en="INDEPENDENT MEDIA COVERAGE" /></small></span>
            <span><i />PLATFORM RECORD<small><Lang zh="外部平台公開紀錄" en="EXTERNAL PLATFORM RECORD" /></small></span>
            <span><i />PUBLIC ENGINEERING<small><Lang zh="可檢視 Repo 與程式碼" en="INSPECTABLE REPOSITORY & CODE" /></small></span>
            <span><i />FIRST-PARTY PUBLICATION<small><Lang zh="本人公開發布" en="FOUNDER-PUBLISHED" /></small></span>
            <span><i />OWNER-REPORTED<small><Lang zh="本人紀錄，另標驗證邊界" en="FOUNDER RECORD WITH BOUNDARY" /></small></span>
          </div>
        </section>

        <section className={styles.engineering} aria-labelledby="engineering-title">
          <header className={styles.sectionHeader}>
            <div><span>01</span><p>SELECTED ENGINEERING</p></div>
            <div>
              <h2 id="engineering-title"><Lang zh="把責任公式，做成能檢查的系統。" en="TURNING RESPONSIBILITY FORMULAS INTO INSPECTABLE SYSTEMS." /></h2>
              <p><Lang
                zh="以下只列出公開 Repo 能直接支撐的技術、功能與狀態；公開可讀不等於全部採用開源授權，也不等於已進入正式商業部署。"
                en="The following descriptions are limited to technology, functions and states directly supported by public repositories. Publicly readable source does not automatically mean open-source licensing or production adoption."
              /></p>
            </div>
          </header>
          <div className={styles.engineeringGrid}>
            {engineeringWorks.map((work) => (
              <article key={work.number}>
                <div className={styles.cardTop}><span>{work.number}</span><small>{work.status}</small></div>
                <h3>{work.title}<small><Lang zh={work.subtitleZh} en={work.subtitleEn} /></small></h3>
                <p><Lang zh={work.summaryZh} en={work.summaryEn} /></p>
                <dl>
                  <div><dt>STACK</dt><dd>{work.stack}</dd></div>
                  <div><dt><Lang zh="狀態邊界" en="BOUNDARY" /></dt><dd><Lang zh={work.licenseZh} en={work.licenseEn} /></dd></div>
                </dl>
                {work.internal ? <LocalizedLink href={work.href}>
                  <Lang zh="觀看候選架構" en="VIEW CANDIDATE ARCHITECTURE" /><span aria-hidden="true">→</span>
                </LocalizedLink> : <a href={work.href} target="_blank" rel="noreferrer">
                  <Lang zh="檢視工程證據" en="INSPECT ENGINEERING EVIDENCE" /><span aria-hidden="true">↗</span>
                </a>}
              </article>
            ))}
          </div>
        </section>

        <section className={styles.evidence} aria-labelledby="evidence-title">
          <header className={styles.sectionHeader}>
            <div><span>02</span><p>PUBLIC EVIDENCE</p></div>
            <div>
              <h2 id="evidence-title"><Lang zh="外部紀錄分層，不把出現寫成背書。" en="PUBLIC RECORDS, WITHOUT TURNING PRESENCE INTO ENDORSEMENT." /></h2>
              <p><Lang
                zh="媒體、競賽平台、開發者社群與本人現場紀錄各自保留來源性質；讀者可直接回原始頁面核對。"
                en="Media coverage, competition platforms, developer communities and founder-recorded public activity retain their distinct source types, with direct links for verification."
              /></p>
            </div>
          </header>
          <div className={styles.evidenceList}>
            {publicEvidence.map((record, index) => (
              <article key={record.href}>
                <div className={styles.evidenceIndex}><span>{String(index + 1).padStart(2, "0")}</span><b>{record.date}</b></div>
                <div className={styles.evidenceCopy}>
                  <small>{record.kind}</small>
                  <h3><Lang zh={record.titleZh} en={record.titleEn} /></h3>
                  <p><Lang zh={record.textZh} en={record.textEn} /></p>
                  <aside><Lang zh={record.noteZh} en={record.noteEn} /></aside>
                </div>
                <a href={record.href} target="_blank" rel="noreferrer" aria-label={`${record.kind} source`}>↗</a>
              </article>
            ))}
          </div>
          <div className={styles.activitySources}>
            <p><Lang zh="黑客松本人公開紀錄" en="FOUNDER-PUBLISHED HACKATHON RECORDS" /></p>
            <a href="https://www.instagram.com/p/DW9Jwi5kTZO/" target="_blank" rel="noreferrer">INSTAGRAM ↗</a>
            <a href="https://www.youtube.com/watch?v=MLZiapRm2_o" target="_blank" rel="noreferrer">YOUTUBE ↗</a>
          </div>
        </section>

        <section className={styles.publications} aria-labelledby="writing-title">
          <header className={styles.sectionHeader}>
            <div><span>03</span><p>WRITING & CREATIVE WORK</p></div>
            <div>
              <h2 id="writing-title"><Lang zh="工程之外，持續用文章、動畫與音樂建構同一套世界。" en="BEYOND ENGINEERING, THE SAME WORLD IS BUILT THROUGH WRITING, ANIMATION AND MUSIC." /></h2>
            </div>
          </header>

          <div className={styles.publicationColumns}>
            <div>
              <h3><Lang zh="精選文章" en="SELECTED WRITING" /></h3>
              {writing.map((item) => (
                <a href={item.href} target="_blank" rel="noreferrer" key={item.href}>
                  <span>{item.date}</span>
                  <h4><Lang zh={item.titleZh} en={item.titleEn} /></h4>
                  <p><Lang zh={item.textZh} en={item.textEn} /></p>
                  <b aria-hidden="true">↗</b>
                </a>
              ))}
            </div>
            <div>
              <h3><Lang zh="精選音樂動畫" en="SELECTED MUSIC & ANIMATION" /></h3>
              {creativeWorks.map((item) => (
                <a href={item.href} target="_blank" rel="noreferrer" key={item.href}>
                  <span>{item.type}</span>
                  <h4><Lang zh={item.titleZh} en={item.titleEn} /></h4>
                  <p><Lang zh={item.textZh} en={item.textEn} /></p>
                  <b aria-hidden="true">↗</b>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.boundary} aria-labelledby="boundary-title">
          <div className={styles.boundaryMark} aria-hidden="true">
            <Image src="/media/chenjingliupai-symbol.svg" alt="" fill sizes="110px" />
          </div>
          <div>
            <p>SOURCE & CLAIM BOUNDARY</p>
            <h2 id="boundary-title"><Lang zh="這份履歷不靠虛構頭銜增加份量。" en="THIS RESUME DOES NOT RELY ON INVENTED CREDENTIALS." /></h2>
            <p><Lang
              zh="本站不虛構公司登記、團隊規模、學位、專利、獎項、客戶、採用或合作關係。GitHub Repo 用來證明公開工程；第一方文章用來證明本人主張；第三方媒體與平台紀錄則保留它們原本能證明的範圍。DeepSeek、OpenAI、LinkedIn、NVIDIA 等平台上的留言或社群文章，不會被改寫成官方合作。"
              en="This site does not invent company registration, team size, degrees, patents, awards, clients, adoption or partnerships. GitHub repositories evidence public engineering; first-party writing evidences the founder's own positions; media and platform records retain only what their sources can support. Comments or community posts on platforms such as DeepSeek, OpenAI, LinkedIn or NVIDIA are never recast as official collaboration."
            /></p>
            <p className={styles.updated}><Lang zh="公開資料校準日期：2026 年 7 月 28 日" en="PUBLIC-SOURCE REVIEWED: 28 JULY 2026" /></p>
          </div>
        </section>

        <section className={styles.contact}>
          <div>
            <p>COLLABORATION · RESEARCH · CREATIVE PRODUCTION</p>
            <h2><Lang zh="從可查證的工作開始合作。" en="START A COLLABORATION FROM WORK THAT CAN BE VERIFIED." /></h2>
          </div>
          <div>
            <a href="mailto:ken0963521@gmail.com?subject=SERENE%20SCHOOL%20STUDIO%20%E5%90%88%E4%BD%9C%E6%8F%90%E6%A1%88">
              <Lang zh="寄送合作郵件" en="SEND AN EMAIL" /><span aria-hidden="true">→</span>
            </a>
            <LocalizedLink href="/products"><Lang zh="查看系統作品" en="EXPLORE SYSTEMS" /><span aria-hidden="true">↗</span></LocalizedLink>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
