import type { Metadata } from "next";
import Image from "next/image";
import { Lang, LocalizedLink } from "../components/LanguageControl";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { localizedAlternates, siteUrl } from "../site-config";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "許文耀／沈耀888π｜沉靜流派工作室創辦人",
  description: "沉靜流派工作室與語意防火牆創辦人許文耀／沈耀888π。以古文明符號、數學公式與系統架構融合語意治理、AICC OS v0.2.CANDIDATE 候選架構、動畫及音樂創作。",
  keywords: ["許文耀", "沈耀888π", "語意防火牆創辦人", "古文明符號", "數學公式", "系統架構", "SCBKR", "R-Lock", "去偽存真 黑客松", "Agent for Truth Hackathon"],
  alternates: localizedAlternates("zh", "/about"),
  openGraph: { url: "/zh/about" },
};

const publicRecords = [
  {
    platform: "GITHUB · FIRST-PARTY",
    titleZh: "公開工程與原始碼",
    titleEn: "Public Engineering and Source",
    textZh: "語意防火牆、SCBKR 責任鏈與相關獨立系統的公開工程紀錄。",
    textEn: "First-party engineering records for the Semantic Firewall, SCBKR responsibility chains and related independent systems.",
    href: "https://github.com/HIJO790401",
  },
  {
    platform: "VOCUS · FIRST-PARTY",
    titleZh: "公開文章與思想紀錄",
    titleEn: "Public Writing and Ideas",
    textZh: "由許文耀／沈耀888π本人發布的語意治理、AI 主體與創作文章。",
    textEn: "Writing published by Wen-Yao Hsu / Shen-Yao 888π on semantic governance, human agency and creative practice.",
    href: "https://vocus.cc/salon/hijo19900401/room/hijo1990",
  },
  {
    platform: "NVIDIA DEVELOPER FORUMS · COMMUNITY",
    titleZh: "SCBKR 技術文章",
    titleEn: "SCBKR Technical Post",
    textZh: "發布於 NVIDIA 開發者社群的本地責任鏈工作台說明；屬社群文章，不代表 NVIDIA 背書。",
    textEn: "A community post on the local responsibility-chain workbench; its presence on the forum does not imply NVIDIA endorsement.",
    href: "https://forums.developer.nvidia.com/t/scbkr-a-local-responsibility-chain-workbench-for-llms-with-human-confirmed-generation-storage-replay-and-retrieval-gates/373910",
  },
  {
    platform: "AI-ARTS · OFFICIAL COMPETITION SUBMISSION · 2025.10.30",
    titleZh: "第四屆 AI-ARTS 競賽投稿",
    titleEn: "4TH AI-ARTS COMPETITION SUBMISSION",
    textZh: "官方投稿頁列出沈耀888π及其作品；確認投稿紀錄，不代表得獎或主辦方背書。",
    textEn: "The official submission page lists Shen-Yao 888π and the work; this confirms a submission record, not an award or organizer endorsement.",
    href: "https://ai-arts.org/4th-ai-arts-competition-submissions/",
  },
  {
    platform: "SECURITYBRIEF ASIA · 2025.11.18 · THIRD-PARTY PRESS",
    titleZh: "語意防火牆媒體報導",
    titleEn: "Semantic Firewall Coverage",
    textZh: "第三方科技媒體聚焦語意治理、AI 推論成本與對話安全；媒體報導不代表認證或背書。",
    textEn: "Third-party technology coverage of semantic governance, AI inference cost and conversational safety; coverage does not imply certification or endorsement.",
    href: "https://securitybrief.asia/story/semantic-firewall-promises-ai-cost-savings-safer-chat-models",
  },
];

const disciplines = [
  { index: "01", zh: "古文明符號與語之神器", en: "ANCIENT SYMBOLS & LANGUAGE ARTIFACTS", textZh: "從水滴、聖書體、幾何封印到神器視覺，把符號視為可讀、可回放的語言結構，並以動畫、音樂與光影讓規則顯形。", textEn: "Water, sacred scripts, geometric seals and artifacts are treated as readable, replayable language structures, made perceptible through motion, music and light." },
  { index: "02", zh: "數學公式與責任結構", en: "MATHEMATICAL FORMULAS & RESPONSIBILITY", textZh: "以 E%mc²、SCBKR 與 0／1／π 等公式壓縮主體、因果、邊界、依據與責任，讓抽象思想能被檢查與追問。", textEn: "Formulas including E%mc², SCBKR and 0/1/π compress subject, causality, boundary, grounds and responsibility into structures that can be inspected and challenged." },
  { index: "03", zh: "系統架構、候選與可執行工程", en: "SYSTEM ARCHITECTURE, CANDIDATES & EXECUTABLE ENGINEERING", textZh: "把公式落成已有公開工程紀錄的語意防火牆、責任閘門與 WORM 回放，也把 AICC OS v0.2.CANDIDATE 整理成候選架構與無輸入動畫；分別公開版本、來源狀態與能力邊界。", textEn: "The formulas become publicly evidenced engineering for the Semantic Firewall, responsibility gates and WORM replay, while AICC OS v0.2.CANDIDATE remains a candidate architecture with a no-input film; version, source status and capability boundaries are disclosed separately." },
];

const pressCoverageUrl = "https://securitybrief.asia/story/semantic-firewall-promises-ai-cost-savings-safer-chat-models";

const pressCoverageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": siteUrl("/zh/about#profile"),
  mainEntity: {
    "@type": "Person",
    "@id": siteUrl("/#person"),
    subjectOf: {
      "@type": "NewsArticle",
      "@id": pressCoverageUrl,
      headline: "Semantic Firewall promises AI cost savings & safer chat models",
      datePublished: "2025-11-18",
      url: pressCoverageUrl,
      author: { "@type": "Person", name: "Sean Mitchell" },
      publisher: { "@type": "Organization", name: "SecurityBrief Asia" },
      about: [
        { "@id": siteUrl("/#person") },
        { "@type": "Thing", name: "Semantic Firewall" },
      ],
    },
  },
};

export default function AboutPage() {
  return (
    <div className={styles.shell}>
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pressCoverageSchema) }} />
      <main className={styles.page}>
        <section className={styles.hero} aria-labelledby="founder-title">
          <div className={styles.visual}>
            <div className={styles.waterHalo} aria-hidden="true" />
            <div className={styles.portrait}>
              <Image
                src="/media/founder-v2.jpg"
                alt="沉靜流派工作室創辦人許文耀／沈耀888π"
                fill
                sizes="(max-width: 820px) 92vw, 43vw"
                priority
                unoptimized
              />
            </div>
            <div className={styles.brandSeal}>
              <span><Image src="/media/chenjingliupai-symbol.svg" alt="" fill sizes="68px" /></span>
              <p><Lang zh="沉靜流派工作室" en="SERENE SCHOOL STUDIO" /><small>TAICHUNG · TAIWAN</small></p>
            </div>
            <p className={styles.photoCaption}><Lang zh="創辦人・獨立系統架構師" en="FOUNDER · INDEPENDENT SYSTEMS ARCHITECT" /></p>
          </div>

          <div className={styles.copy}>
            <p className={styles.eyebrow}><span>FOUNDER PROFILE</span><Lang zh="獨立工作室／台灣台中" en="INDEPENDENT STUDIO / TAICHUNG, TAIWAN" /></p>
            <h1 id="founder-title"><Lang zh="許文耀／沈耀888π" en="WEN-YAO HSU / SHEN-YAO 888π" /></h1>
            <p className={styles.studioName}><Lang zh="沉靜流派工作室・語意防火牆創辦人" en="FOUNDER OF SERENE SCHOOL STUDIO & THE SEMANTIC FIREWALL" /></p>
            <div className={styles.roles} aria-label="專業角色">
              <span><Lang zh="獨立系統架構師" en="INDEPENDENT SYSTEMS ARCHITECT" /></span>
              <span><Lang zh="動畫創作者" en="ANIMATION CREATOR" /></span>
              <span><Lang zh="音樂創作者" en="MUSIC CREATOR" /></span>
            </div>
            <p className={styles.introduction}>
              <Lang
                zh="我是古文明符號、數學公式與系統架構的混合型創作者，也是一人工作室的獨立架構師。我把符號做成語言，把公式做成責任結構，再把責任結構落成可執行、可回放的系統；動畫、音樂、程式碼、文章與公開工程是同一套方法的不同輸出。"
                en="I work at the intersection of ancient symbols, mathematical formulas and system architecture as an independent one-person studio. Symbols become language, formulas become responsibility structures, and those structures become executable, replayable systems; animation, music, code, writing and public engineering are different outputs of the same method."
              />
            </p>

            <figure className={styles.quote}>
              <blockquote><Lang zh="沉靜不是終止，而是讓一切回到本質。" en="Stillness is not an ending. It lets everything return to its essence." /></blockquote>
              <figcaption><span aria-hidden="true">—</span> <Lang zh="許文耀／沈耀888π" en="WEN-YAO HSU / SHEN-YAO 888π" /></figcaption>
            </figure>

            <div className={styles.actions}>
              <LocalizedLink href="/resume"><Lang zh="查看履歷" en="VIEW RESUME" /><span aria-hidden="true">↗</span></LocalizedLink>
              <LocalizedLink href="/products"><Lang zh="查看系統作品" en="EXPLORE SYSTEMS" /><span aria-hidden="true">→</span></LocalizedLink>
              <a href="mailto:ken0963521@gmail.com?subject=%E6%B2%89%E9%9D%9C%E6%B5%81%E6%B4%BE%E5%B7%A5%E4%BD%9C%E5%AE%A4%E5%90%88%E4%BD%9C%E6%8F%90%E6%A1%88"><Lang zh="合作聯絡" en="CONTACT" /></a>
            </div>
          </div>
        </section>

        <section className={styles.profileFacts} aria-label="創辦人資料摘要">
          <div><span>01</span><small><Lang zh="工作室" en="STUDIO" /></small><b><Lang zh="沉靜流派工作室" en="SERENE SCHOOL STUDIO" /></b></div>
          <div><span>02</span><small><Lang zh="架構方式" en="STRUCTURE" /></small><b><Lang zh="獨立／一人研發" en="INDEPENDENT / ONE-PERSON" /></b></div>
          <div><span>03</span><small><Lang zh="所在地" en="BASE" /></small><b><Lang zh="台灣・台中" en="TAICHUNG, TAIWAN" /></b></div>
          <div><span>04</span><small><Lang zh="核心組成" en="CORE SYNTHESIS" /></small><b><Lang zh="符號・公式・系統" en="SYMBOLS · FORMULAS · SYSTEMS" /></b></div>
        </section>

        <section className={styles.practice} aria-labelledby="practice-title">
          <div className={styles.sectionIntro}>
            <p><Lang zh="工作方法" en="FOUNDER PRACTICE" /></p>
            <h2 id="practice-title"><Lang zh="符號、公式、系統，是同一套創作方法。" en="SYMBOLS, FORMULAS AND SYSTEMS — ONE CREATIVE METHOD." /></h2>
            <p><Lang zh="三條主線彼此相連，並各自回到實際作品、公式定義、程式碼或公開發布紀錄。" en="The three lines remain connected, with each returning to actual works, defined formulas, source code or a public publication record." /></p>
          </div>
          <div className={styles.disciplineGrid}>
            {disciplines.map((discipline) => (
              <article key={discipline.index}>
                <span>{discipline.index}</span>
                <h3><Lang zh={discipline.zh} en={discipline.en} /></h3>
                <p><Lang zh={discipline.textZh} en={discipline.textEn} /></p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.publicActivity} id="public-activity" aria-labelledby="public-activity-title">
          <div className={styles.activityHeading}>
            <p>OWNER-REPORTED HACKATHON RECORD · 2026.03 · TAIWAN</p>
            <h2 id="public-activity-title"><Lang zh="從責任公式，走到本人紀錄的公開現場。" en="FROM RESPONSIBILITY FORMULAS TO AN OWNER-DOCUMENTED ON-SITE DEMONSTRATION." /></h2>
            <p><Lang
              zh="這段行動軌跡來自創辦人原始 Repo、現場照片、Instagram 與 YouTube 紀錄。官方活動頁只用來核對賽事日期、Gogolook 命題與活動內容；目前未見主辦方公開個人名冊可交叉驗證 Team 11、個人身分或展示內容。"
              en="This activity trail comes from the founder's repository, on-site photograph, Instagram and YouTube records. The official event page is used only to verify the event dates, Gogolook challenge and event format; no public organizer roster was found that independently verifies Team 11, the individual's identity or the demonstrated system."
            /></p>
          </div>

          <div className={styles.activityFeature}>
            <figure className={styles.activityPhoto}>
              <Image
                src="/media/public-activity/agent-for-truth-hackathon.jpg"
                alt="創辦人提供的去偽存真：全民偵查黑客松現場照片"
                fill
                unoptimized
                sizes="(max-width: 900px) 100vw, 58vw"
              />
              <figcaption><Lang zh="創辦人提供的現場照片・取自原始 Repo" en="FOUNDER-PROVIDED ON-SITE PHOTO · ORIGINAL REPOSITORY" /></figcaption>
            </figure>

            <article className={styles.activityCopy}>
              <span>OWNER-REPORTED · AGENT FOR TRUTH HACKATHON</span>
              <h3><Lang zh="去偽存真：全民偵查黑客松" en="AGENT FOR TRUTH HACKATHON" /></h3>
              <p><Lang
                zh="依創辦人 Repo 與現場照片，許文耀表示其於 2026 年 3 月參與 Gogolook 命題，並展示自行設計的 SCBKR + R-Lock 反詐治理介面。Team 11 與個人參賽身分屬創辦人第一方紀錄。"
                en="According to the founder's repository and on-site photograph, Wen-Yao Hsu reports participating in the Gogolook challenge in March 2026 and demonstrating his SCBKR + R-Lock anti-scam governance interface. Team 11 and the individual's entrant status remain first-party founder records."
              /></p>
              <p><Lang
                zh="核心問題不是訊息『像不像詐騙』，而是它是否具備足夠可檢查的責任結構，是否有資格進入人的決策流程。這是本人紀錄的現場展示，不是主辦方技術認證、成效驗證或得獎聲明。"
                en="The core question was not merely whether a message looked fraudulent, but whether it carried enough inspectable responsibility structure to qualify for human decision-making. This is an owner-documented on-site demonstration, not organizer certification, performance validation or an award claim."
              /></p>
              <dl>
                <div><dt><Lang zh="身分來源" en="ROLE SOURCE" /></dt><dd><Lang zh="本人紀錄：Gogolook 命題組 Team 11" en="OWNER-REPORTED: TEAM 11 · GOGOLOOK CHALLENGE" /></dd></div>
                <div><dt><Lang zh="展示系統" en="SYSTEM" /></dt><dd>SCBKR + R-LOCK</dd></div>
                <div><dt><Lang zh="方法" en="METHOD" /></dt><dd><Lang zh="決策前責任審計" en="PRE-DECISION RESPONSIBILITY AUDIT" /></dd></div>
              </dl>
              <div className={styles.activityLinks}>
                <a href="https://www.ai-expo.tw/kiro_hackathon_2026/index.asp" target="_blank" rel="noreferrer"><Lang zh="官方活動頁" en="OFFICIAL EVENT PAGE" /> ↗</a>
                <a href="https://www.instagram.com/p/DW9Jwi5kTZO/" target="_blank" rel="noreferrer"><Lang zh="本人 Instagram 紀錄" en="FOUNDER INSTAGRAM RECORD" /> ↗</a>
                <a href="https://www.youtube.com/watch?v=MLZiapRm2_o" target="_blank" rel="noreferrer"><Lang zh="本人 YouTube 紀錄" en="FOUNDER YOUTUBE RECORD" /> ↗</a>
              </div>
            </article>
          </div>
        </section>

        <section className={styles.pressCoverage} id="press-coverage" aria-labelledby="press-coverage-title">
          <div className={styles.pressHeading}>
            <p>THIRD-PARTY PRESS · SECURITYBRIEF ASIA</p>
            <div>
              <h2 id="press-coverage-title"><Lang zh="語意防火牆，進入亞洲資安媒體視野。" en="THE SEMANTIC FIREWALL, COVERED BY ASIAN CYBERSECURITY MEDIA." /></h2>
              <p><Lang
                zh="這是一筆第三方產業媒體報導，不是工作室自寫新聞。以下保留發布者、作者、日期、原始標題與技術聲明邊界，讓訪客可以直接回到原文核對。"
                en="This is third-party industry coverage, not a studio-authored news item. Publisher, author, date, original headline and claim boundaries remain visible so readers can verify the source directly."
              /></p>
            </div>
          </div>

          <div className={styles.pressFeature}>
            <div className={styles.pressDiagram} role="img" aria-label="語言先經確定性語意層整理、路由與治理，再進入大型語言模型或 RAG 系統的概念圖">
              <div className={styles.pressOrb} aria-hidden="true">
                <span><Image src="/media/chenjingliupai-symbol.svg" alt="" fill sizes="92px" /></span>
              </div>
              <p>DETERMINISTIC SEMANTIC LAYER</p>
              <div className={styles.pressPipeline} aria-hidden="true">
                <span>USER LANGUAGE</span>
                <i>→</i>
                <strong>SEMANTIC<br />FIREWALL</strong>
                <i>→</i>
                <span>LLM / RAG</span>
              </div>
              <div className={styles.pressSignals} aria-hidden="true">
                <span>CLEAN</span><span>ROUTE</span><span>CONTROL</span><span>AUDIT</span>
              </div>
              <small>STUDIO-CREATED EXPLANATORY DIAGRAM · SERENE SCHOOL STUDIO</small>
            </div>

            <article className={styles.pressCopy}>
              <div className={styles.pressMeta}><span>SECURITYBRIEF ASIA</span><span>2025.11.18</span><span>SEAN MITCHELL</span></div>
              <h3><Lang
                zh="Semantic Firewall promises AI cost savings & safer chat models"
                en="Semantic Firewall promises AI cost savings & safer chat models"
              /></h3>
              <p><Lang
                zh="報導把語意防火牆描述為置於使用者與大型語言模型之間的確定性語意層：語言資料在進入 GPU 前先被整理、路由與控制。內容同時討論推論成本、情緒安全，以及微服務、政策治理層與稽核日誌等部署方式。"
                en="The report describes the Semantic Firewall as a deterministic semantic layer between users and large language models, cleaning, routing and controlling language data before it reaches GPUs. It also covers inference cost, emotional safety and deployment as a microservice, policy layer or audit log."
              /></p>
              <dl>
                <div><dt><Lang zh="媒體定位" en="OUTLET" /></dt><dd><Lang zh="亞洲資安與技術決策媒體" en="ASIAN CYBERSECURITY & TECHNOLOGY MEDIA" /></dd></div>
                <div><dt><Lang zh="報導焦點" en="FOCUS" /></dt><dd><Lang zh="語意治理／推論成本／對話安全" en="SEMANTIC GOVERNANCE / INFERENCE COST / CONVERSATIONAL SAFETY" /></dd></div>
                <div><dt><Lang zh="相容架構" en="COMPATIBILITY" /></dt><dd><Lang zh="既有模型與 RAG 技術堆疊" en="EXISTING MODEL AND RAG STACKS" /></dd></div>
              </dl>
              <aside><Lang
                zh="聲明邊界：報導提及的 70–88%、25–40%、30% 與 10–20% 均為文中歸因於創辦人／系統方的主張；本站不把這些數字改寫成第三方獨立基準測試。"
                en="Claim boundary: the reported 70–88%, 25–40%, 30% and 10–20% figures are attributed in the article to the founder or system side; this site does not recast them as independently benchmarked results."
              /></aside>
              <aside><Lang
                zh="名稱註記：原文以 Silent School Studio 稱呼受訪者所屬工作室；本站現行官方英文名稱為 SERENE SCHOOL STUDIO。"
                en="Name note: the article refers to the founder's studio as Silent School Studio; the current official English brand is SERENE SCHOOL STUDIO."
              /></aside>
              <a href={pressCoverageUrl} target="_blank" rel="noreferrer"><Lang zh="閱讀 SecurityBrief Asia 原文" en="READ THE ORIGINAL REPORT" /> ↗</a>
            </article>
          </div>
        </section>

        <section className={styles.publicRecord} id="public-record" aria-labelledby="public-record-title">
          <div className={styles.sectionIntro}>
            <p><Lang zh="外部來源" en="PUBLIC SOURCES" /></p>
            <h2 id="public-record-title"><Lang zh="身份與工作，附上可追溯的公開來源。" en="IDENTITY AND WORK, TRACEABLE THROUGH PUBLIC SOURCES." /></h2>
            <p><Lang zh="第一方發布、開發者社群文章、外部作者頁與媒體報導分開標示，避免把平台出現誤寫成平台背書。" en="First-party publishing, developer-community posts, external author pages and media coverage are labelled separately—presence on a platform is not presented as endorsement." /></p>
          </div>
          <div className={styles.recordGrid}>
            {publicRecords.map((record, index) => (
              <a href={record.href} target="_blank" rel="noreferrer" key={record.href}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <small>{record.platform}</small>
                <h3><Lang zh={record.titleZh} en={record.titleEn} /></h3>
                <p><Lang zh={record.textZh} en={record.textEn} /></p>
                <b aria-hidden="true">↗</b>
              </a>
            ))}
          </div>
        </section>

        <section className={styles.contactBand}>
          <div>
            <p><Lang zh="合作與研究聯絡" en="COLLABORATION & RESEARCH" /></p>
            <h2><Lang zh="從可查證的作品開始對話。" en="START WITH WORK THAT CAN BE VERIFIED." /></h2>
          </div>
          <div>
            <a href="mailto:ken0963521@gmail.com?subject=%E6%B2%89%E9%9D%9C%E6%B5%81%E6%B4%BE%E5%B7%A5%E4%BD%9C%E5%AE%A4%E5%90%88%E4%BD%9C%E6%8F%90%E6%A1%88"><Lang zh="寄送合作郵件" en="SEND AN EMAIL" /><span aria-hidden="true">→</span></a>
            <LocalizedLink href="/works"><Lang zh="瀏覽創作" en="VIEW CREATIVE WORK" /><span aria-hidden="true">↗</span></LocalizedLink>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
