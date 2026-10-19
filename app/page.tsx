import Image from "next/image";
import {
  Boxes,
  Fingerprint,
  Home as HomeIcon,
  Images,
  Landmark,
  LibraryBig,
  Microscope,
  RadioTower,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { IntroGate } from "./components/IntroGate";
import { Lang, LocalizedLink } from "./components/LanguageControl";
import { SereneWaterHero } from "./components/SereneWaterHero";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { ContactComposer } from "./components/ContactComposer";
import { products } from "./site-data";
import { studioManifesto } from "./manifesto-data";
import { introVideoSource, scbkrMicrosoftStore } from "./site-config";
import styles from "./serene-home.module.css";

const quickLinks: Array<{ href: string; icon: LucideIcon; zh: string; en: string }> = [
  { href: "/", icon: HomeIcon, zh: "首頁", en: "HOME" },
  { href: "/products", icon: Boxes, zh: "產品", en: "PRODUCTS" },
  { href: "/#works", icon: Images, zh: "作品", en: "WORKS" },
  { href: "/research", icon: Microscope, zh: "研究", en: "RESEARCH" },
  { href: "/news", icon: LibraryBig, zh: "新聞台 × 博物館", en: "NEWS × MUSEUM" },
  { href: "/#founder", icon: Fingerprint, zh: "自介", en: "ABOUT" },
];

const featuredWorks = [
  {
    titleZh: "語之神神器展覽篇",
    titleEn: "Artifacts of the Language God",
    labelZh: "音樂動畫作品",
    labelEn: "MUSIC-ANIMATION WORK",
    image: "/media/works/language-god-exhibition-16x9.png",
    href: "/works#music-animation",
  },
  {
    titleZh: "實相上線",
    titleEn: "Reality Goes Live",
    labelZh: "新聞台 × 責任博物館啟動前導",
    labelEn: "NEWSROOM × MUSEUM LAUNCH PRELUDE",
    image: "/media/works/reality-goes-live-16x9.png",
    href: "/news#reality-goes-live",
  },
  {
    titleZh: "去偽存真：全民偵查黑客松",
    titleEn: "Agent for Truth Hackathon",
    labelZh: "本人紀錄的 SCBKR + R-Lock 現場展示",
    labelEn: "OWNER-REPORTED SCBKR + R-LOCK DEMONSTRATION",
    image: "/media/public-activity/agent-for-truth-hackathon.jpg",
    href: "/about#public-activity",
  },
];

type PublicRecord = {
  label: string;
  zh: string;
  en: string;
  href: string;
  textZh?: string;
  textEn?: string;
  image?: string;
  featured?: boolean;
  internal?: boolean;
};

const publicRecords: PublicRecord[] = [
  {
    label: "HF2007 · PUBLIC VERIFICATION CHECKPOINT · FORMALLY ACCEPTED",
    zh: "T0 路徑合法性公開驗證紀錄",
    en: "T0 PATH LEGITIMACY PUBLIC VERIFICATION RECORD",
    textZh:
      "系統不是從論文開始；HF2007 是我從既有系統開發節點抽出的最小可驗證公開證據。T0 准入閘門與固定 51-transition 實驗已完成外部審查、重現核對與正式錄取。",
    textEn:
      "The system did not begin with the paper. HF2007 is the minimum verifiable public evidence extracted from an existing development checkpoint. The T0 gate and fixed 51-transition experiment completed external review, reproducibility checks and formal acceptance.",
    href: "/research/hf2007-t0-path-legitimacy",
    image: "/media/icaisg/HF2007-ICAISG-2026-Acceptance-Notification-page-1.png",
    featured: true,
    internal: true,
  },
  { label: "MICROSOFT STORE · OFFICIAL DISTRIBUTION · 2026.08.25", zh: "SCBKR Windows 應用免費取得", en: "GET THE SCBKR WINDOWS APPLICATION FREE", href: scbkrMicrosoftStore.url },
  { label: "GITHUB", zh: "官方工程作品總入口", en: "Official Engineering Archive", href: "https://github.com/HIJO790401" },
  { label: "VOCUS", zh: "沈耀公開文章與研究", en: "Public Writing and Research", href: "https://vocus.cc/salon/hijo19900401/room/hijo1990" },
  { label: "NVIDIA COMMUNITY", zh: "SCBKR 技術文章", en: "SCBKR Technical Post", href: "https://forums.developer.nvidia.com/t/scbkr-a-local-responsibility-chain-workbench-for-llms-with-human-confirmed-generation-storage-replay-and-retrieval-gates/373910" },
  { label: "AI-ARTS", zh: "動畫、音樂與跨域創作", en: "Animation, Music and Cross-disciplinary Work", href: "https://ai-arts.org/author/shen-yao/" },
  {
    label: "SECURITYBRIEF ASIA · THIRD-PARTY PRESS · 2025.11.18",
    zh: "語意防火牆獲第三方科技媒體報導",
    en: "SEMANTIC FIREWALL IN THIRD-PARTY TECH COVERAGE",
    textZh: "報導聚焦語意治理、AI 推論成本與對話安全；文中效能數據為歸因主張，不是媒體獨立驗證。",
    textEn: "Coverage focuses on semantic governance, AI inference cost and conversational safety. Performance figures remain attributed claims, not independent findings.",
    href: "https://securitybrief.asia/story/semantic-firewall-promises-ai-cost-savings-safer-chat-models",
  },
];

export default function Home() {
  return (
    <div className={styles.site}>
      <IntroGate src={introVideoSource} />
      <SiteHeader />
      <main>
        <SereneWaterHero />

        <nav className={styles.quickNav} aria-label="首頁快速導覽">
          {quickLinks.map((item) => (
            <LocalizedLink href={item.href} key={item.href + item.en}>
              <span aria-hidden="true"><item.icon strokeWidth={1.55} /></span>
              <b><Lang zh={item.zh} en={item.en} /></b>
            </LocalizedLink>
          ))}
        </nav>

        <section className={styles.manifestoPreview} id="manifesto" aria-labelledby="manifesto-preview-title" data-serene-reveal="rise">
          <div className={styles.manifestoIndex}>
            <p className={styles.sectionKicker}><i aria-hidden="true" /> <Lang zh="工作室核心宣言" en="THE STUDIO MANIFESTO" /></p>
            <span><Lang zh="許文耀／沈耀888π・創辦人" en="WEN-YAO HSU / SHEN-YAO 888π · FOUNDER" /></span>
          </div>
          <div className={styles.manifestoPreviewBody}>
            <h2 id="manifesto-preview-title"><Lang zh={studioManifesto.zh.lead} en={studioManifesto.en.lead} /></h2>
            <p><Lang zh={studioManifesto.zh.reason} en={studioManifesto.en.reason} /></p>
            <p><Lang zh={studioManifesto.zh.method} en={studioManifesto.en.method} /></p>
            <LocalizedLink href="/about#manifesto"><Lang zh="閱讀完整宣言" en="READ THE FULL MANIFESTO" /> <span aria-hidden="true">↗</span></LocalizedLink>
          </div>
        </section>

        <section className={styles.overview} id="about">
          <div className={styles.aboutPanel} data-serene-reveal="rise">
            <p className={styles.sectionKicker}><i aria-hidden="true" /> <Lang zh="關於沉靜流派" en="ABOUT THE STUDIO" /></p>
            <h2><Lang zh="古文明符號 × 數學公式 × 系統架構。" en="ANCIENT SYMBOLS × FORMULAS × SYSTEMS." /></h2>
            <p><Lang zh="我在沉靜流派把符號做成語言、把公式做成責任結構，再把 AI 安全、AI 治理的判斷路徑落成 SCBKR、語意防火牆與 AICC 架構；固定案例 Demo、動畫、音樂與書寫，都是我用不同媒介承擔同一套判斷的方法。" en="At SERENE SCHOOL, I turn symbols into language and formulas into responsibility structures, then make judgment paths for AI safety and AI governance concrete through SCBKR, the Semantic Firewall and AICC architecture. Fixed-case demos, animation, music and writing are different media through which I take responsibility for the same method." /></p>
            <p><Lang zh="這些不是只停在概念的提案：SCBKR 2.3.1 已在 Microsoft Store 免費上架，系統原始碼與固定案例已公開，論文、文章、音樂動畫與書籍試讀也各自保留可核對的入口。" en="These are not proposals left at the level of concepts: SCBKR 2.3.1 is available free on Microsoft Store, system source and fixed cases are public, and the paper, essays, music-animation work and book previews each retain a traceable entry point." /></p>
            <LocalizedLink href="/#founder"><Lang zh="了解更多" en="DISCOVER MORE" /> <span aria-hidden="true">›</span></LocalizedLink>
          </div>

          <div className={styles.productPreview} data-serene-reveal="rise">
            <div className={styles.panelHeading}>
              <p className={styles.sectionKicker}><i aria-hidden="true" /> <Lang zh="核心產品" en="CORE PRODUCTS" /></p>
              <LocalizedLink href="/products"><Lang zh="查看全部" en="VIEW ALL" /> <span aria-hidden="true">›</span></LocalizedLink>
            </div>
            <div className={styles.miniProductGrid}>
              {products.map((product, index) => {
                const card = <>
                  <span className={styles.productGlyph}>{["S", "AI", "Rπ", "W", "AICC"][index]}</span>
                  <h3><Lang zh={product.title} en={product.en} /></h3>
                  <p>
                    <Lang
                      zh={product.href ? (product.kindZh ?? product.kind) : "合法產品空位"}
                      en={product.href ? product.kind : "LEGAL PRODUCT SLOT"}
                    />
                  </p>
                  <b className={!product.href ? styles.productStatus : undefined}>
                    <Lang
                      zh={product.href ? "了解更多" : (product.statusZh ?? "開發中")}
                      en={product.href ? "DETAILS" : (product.statusEn ?? "IN DEVELOPMENT")}
                    />
                    <span aria-hidden="true">{product.href ? "→" : "—"}</span>
                  </b>
                </>;

                return product.href ? (
                  <LocalizedLink className={styles.miniProductCard} href={product.href} key={product.slug}>
                    {card}
                  </LocalizedLink>
                ) : (
                  <article className={`${styles.miniProductCard} ${styles.productPending}`} key={product.slug}>
                    {card}
                  </article>
                );
              })}
            </div>
          </div>

          <div className={styles.worksPreview} id="works" data-serene-reveal="rise">
            <div className={styles.panelHeading}>
              <p className={styles.sectionKicker}><i aria-hidden="true" /> <Lang zh="精選作品" en="FEATURED WORKS" /></p>
              <LocalizedLink href="/works"><Lang zh="瀏覽更多作品" en="VIEW MORE" /> <span aria-hidden="true">›</span></LocalizedLink>
            </div>
            <div className={styles.workGrid}>
              {featuredWorks.map((work) => (
                <LocalizedLink href={work.href} key={work.titleEn}>
                  <span className={styles.workImage}>
                    <Image src={work.image} alt="" fill unoptimized sizes="(max-width: 760px) 44vw, 18vw" />
                  </span>
                  <h3><Lang zh={work.titleZh} en={work.titleEn} /></h3>
                  <p><Lang zh={work.labelZh} en={work.labelEn} /></p>
                </LocalizedLink>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.literatureBand} aria-labelledby="latest-book-title" data-serene-reveal="rise">
          <div className={styles.literatureCover}>
            <Lang
              zh={<Image src="/media/books/stillness-is-a-language/cover-zh.jpg" alt="《沉靜是一種語言》繁中版封面" fill unoptimized sizes="(max-width: 760px) 58vw, 19vw" />}
              en={<Image src="/media/books/stillness-is-a-language/cover-en.jpg" alt="Stillness Is a Language English cover" fill unoptimized sizes="(max-width: 760px) 58vw, 19vw" />}
            />
          </div>
          <div className={styles.literatureBandCopy}>
            <p className={styles.sectionKicker}><i aria-hidden="true" /> <Lang zh="最新書籍" en="LATEST BOOK" /></p>
            <span className={styles.literatureMeta}>2025 ORIGINAL · 2026 REVISED EDITION</span>
            <h2 id="latest-book-title"><Lang zh="沉靜是一種語言" en="STILLNESS IS A LANGUAGE" /></h2>
            <h3><Lang zh="在找不到語言之前" en="BEFORE WORDS ARE FOUND" /></h3>
            <p><Lang zh="我從理解、沉默與選擇寫到責任；這本書保存我在語言尚未命名以前的起點，也是我後來把責任做成系統的前身。繁中與英文試讀分開呈現。" en="I wrote from understanding, silence and choice toward responsibility. This book preserves my starting point before the language had a name, and the origin from which I later made responsibility concrete as systems. The Chinese and English previews remain separate." /></p>
            <div className={styles.literatureActions}>
              <LocalizedLink href="/books/stillness-is-a-language"><Lang zh="進入書籍頁" en="ENTER THE BOOK" /> <span aria-hidden="true">→</span></LocalizedLink>
              <LocalizedLink href="/books"><Lang zh="瀏覽全部書籍" en="VIEW ALL BOOKS" /> <span aria-hidden="true">↗</span></LocalizedLink>
            </div>
          </div>
        </section>

        <section className={styles.newsMuseum} aria-labelledby="news-museum-title" data-serene-reveal="focus">
          <div className={styles.newsIntro}>
            <p className={styles.sectionKicker}><i aria-hidden="true" /> ARCHIVE / NEWSROOM</p>
            <h2 id="news-museum-title"><Lang zh="實相新聞台 × 責任博物館" en="REALITY NEWSROOM × RESPONSIBILITY MUSEUM" /></h2>
            <p><Lang zh="我建立實相新聞台記錄正在發生的事，也建立責任博物館保存事件留下的責任軌跡；報導、影像、來源與責任證據在同一座公開架構中接受核對。" en="I built the Reality Newsroom to record events in motion and the Responsibility Museum to preserve the trails of responsibility they leave behind. Reporting, moving image, sources and responsibility evidence remain together in one public architecture for verification." /></p>
            <LocalizedLink href="/news"><Lang zh="探索更多內容" en="EXPLORE THE ARCHIVE" /> <span aria-hidden="true">→</span></LocalizedLink>
          </div>
          <div className={styles.newsPillars}>
            <LocalizedLink href="/news">
              <span aria-hidden="true"><RadioTower strokeWidth={1.45} /></span>
              <div><h3><Lang zh="實相新聞台" en="REALITY NEWSROOM" /></h3><p><Lang zh="我把公開報導、影音與來源整理成可回查的事件紀錄。" en="I organize public reporting, video and sources into event records that can be checked again." /></p></div>
            </LocalizedLink>
            <LocalizedLink href="/news#museum">
              <span aria-hidden="true"><Landmark strokeWidth={1.45} /></span>
              <div><h3><Lang zh="責任博物館" en="RESPONSIBILITY MUSEUM" /></h3><p><Lang zh="我保存事件中的主體、決策、後果與承擔，不讓責任在敘事裡消失。" en="I preserve the subjects, decisions, consequences and accountability within events so responsibility does not disappear inside narrative." /></p></div>
            </LocalizedLink>
            <LocalizedLink href="/news">
              <span aria-hidden="true"><ShieldCheck strokeWidth={1.45} /></span>
              <div><h3><Lang zh="讓責任留下來" en="KEEP RESPONSIBILITY VISIBLE" /></h3><p><Lang zh="我公開依據與邊界，讓每一項判斷都能被追問、核對與回放。" en="I publish grounds and boundaries so every judgment can be questioned, verified and replayed." /></p></div>
            </LocalizedLink>
          </div>
        </section>

        <section className={styles.publicRecord} id="public-record" data-serene-reveal="rise">
          <div>
            <p className={styles.sectionKicker}><i aria-hidden="true" /> <Lang zh="公開紀錄" en="PUBLIC RECORD" /></p>
            <h2><Lang zh="我把作品、工程與公開證據收回同一條可查、可讀、可回放的路徑。" en="I BRING MY WORK, ENGINEERING AND PUBLIC EVIDENCE INTO ONE SEARCHABLE, READABLE, REPLAYABLE PATH." /></h2>
          </div>
          <div className={styles.recordGrid}>
            {publicRecords.map((record) => {
              const content = <>
                <span>{record.label}</span>
                <h3><Lang zh={record.zh} en={record.en} /></h3>
                {record.textZh && <p><Lang zh={record.textZh} en={record.textEn ?? ""} /></p>}
                {record.image && (
                  <figure className={styles.recordDocumentPreview}>
                    <Image
                      src={record.image}
                      alt="ICAISG 2026 HF2007 official acceptance notification"
                      fill
                      unoptimized
                      sizes="(max-width: 760px) 86vw, 31vw"
                    />
                  </figure>
                )}
                <b aria-hidden="true">↗</b>
              </>;

              return record.internal ? (
                <LocalizedLink className={record.featured ? styles.recordFeatured : undefined} href={record.href} key={record.href}>
                  {content}
                </LocalizedLink>
              ) : (
                <a className={record.featured ? styles.recordFeatured : undefined} href={record.href} key={record.href} target="_blank" rel="noreferrer">
                  {content}
                </a>
              );
            })}
          </div>
        </section>

        <section className={styles.contactBand} id="contact" aria-labelledby="contact-title" data-serene-reveal="rise">
          <div>
            <p className={styles.sectionKicker}><i aria-hidden="true" /> <Lang zh="合作聯絡" en="COLLABORATION" /></p>
            <h2 id="contact-title"><Lang zh="讓合作先有清楚的主體、範圍與責任。" en="BEGIN WITH A CLEAR SUBJECT, SCOPE AND RESPONSIBILITY." /></h2>
          </div>
          <ContactComposer />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
