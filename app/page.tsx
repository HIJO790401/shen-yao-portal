import Image from "next/image";
import { IntroGate } from "./components/IntroGate";
import { Lang, LocalizedLink } from "./components/LanguageControl";
import { SereneWaterHero } from "./components/SereneWaterHero";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { products } from "./site-data";
import styles from "./serene-home.module.css";

const quickLinks = [
  { href: "/", glyph: "⌂", zh: "首頁", en: "HOME" },
  { href: "/products", glyph: "◌", zh: "產品", en: "PRODUCTS" },
  { href: "/#works", glyph: "✦", zh: "作品", en: "WORKS" },
  { href: "/news", glyph: "▥", zh: "新聞台 × 博物館", en: "NEWS × MUSEUM" },
  { href: "/#founder", glyph: "●", zh: "自介", en: "ABOUT" },
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
    labelZh: "SCBKR + R-Lock 公開展示",
    labelEn: "PUBLIC SCBKR + R-LOCK DEMONSTRATION",
    image: "/media/public-activity/agent-for-truth-hackathon.jpg",
    href: "/about#public-activity",
  },
];

const publicRecords = [
  { label: "GITHUB", zh: "官方工程作品總入口", en: "Official Engineering Archive", href: "https://github.com/HIJO790401" },
  { label: "VOCS", zh: "沈耀公開文章與研究", en: "Public Writing and Research", href: "https://vocus.cc/salon/hijo19900401/room/hijo1990" },
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
      <IntroGate />
      <SiteHeader />
      <main>
        <SereneWaterHero />

        <nav className={styles.quickNav} aria-label="首頁快速導覽">
          {quickLinks.map((item) => (
            <LocalizedLink href={item.href} key={item.href + item.en}>
              <span aria-hidden="true">{item.glyph}</span>
              <b><Lang zh={item.zh} en={item.en} /></b>
            </LocalizedLink>
          ))}
        </nav>

        <section className={styles.overview} id="about">
          <div className={styles.aboutPanel}>
            <p className={styles.sectionKicker}><i aria-hidden="true" /> <Lang zh="關於沉靜流派" en="ABOUT THE STUDIO" /></p>
            <h2><Lang zh="古文明符號 × 數學公式 × 系統架構。" en="ANCIENT SYMBOLS × FORMULAS × SYSTEMS." /></h2>
            <p><Lang zh="沉靜流派把符號做成語言、把公式做成責任結構，再把責任結構落成語意防火牆、固定案例 Demo、動畫與音樂作品。" en="SERENE SCHOOL turns symbols into language, formulas into responsibility structures, and those structures into the Semantic Firewall, fixed-case demos, animation and music." /></p>
            <LocalizedLink href="/#founder"><Lang zh="了解更多" en="DISCOVER MORE" /> <span aria-hidden="true">›</span></LocalizedLink>
          </div>

          <div className={styles.productPreview}>
            <div className={styles.panelHeading}>
              <p className={styles.sectionKicker}><i aria-hidden="true" /> <Lang zh="核心產品" en="CORE PRODUCTS" /></p>
              <LocalizedLink href="/products"><Lang zh="查看全部" en="VIEW ALL" /> <span aria-hidden="true">›</span></LocalizedLink>
            </div>
            <div className={styles.miniProductGrid}>
              {products.map((product, index) => {
                const card = <>
                  <span className={styles.productGlyph}>{["S", "AI", "Rπ", "W", "0/1"][index]}</span>
                  <h3><Lang zh={product.title} en={product.en} /></h3>
                  <p>
                    <Lang
                      zh={product.href ? (product.kind === "LIVE DEMO" ? "安全防護操作" : product.kind) : "合法產品空位"}
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

          <div className={styles.worksPreview} id="works">
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

        <section className={styles.newsMuseum} aria-labelledby="news-museum-title">
          <div className={styles.newsIntro}>
            <p className={styles.sectionKicker}><i aria-hidden="true" /> ARCHIVE / NEWSROOM</p>
            <h2 id="news-museum-title"><Lang zh="實相新聞台 × 責任博物館" en="REALITY NEWSROOM × RESPONSIBILITY MUSEUM" /></h2>
            <p><Lang zh="記錄真實世界的脈動，保存人類責任的軌跡；讓報導、影像與責任證據在同一座公開架構中被看見。" en="Reporting, moving image and responsibility evidence live in one public architecture—recording the world while preserving the trail of human responsibility." /></p>
            <LocalizedLink href="/news"><Lang zh="探索更多內容" en="EXPLORE THE ARCHIVE" /> <span aria-hidden="true">→</span></LocalizedLink>
          </div>
          <div className={styles.newsPillars}>
            <LocalizedLink href="/news">
              <span aria-hidden="true">◎</span>
              <div><h3><Lang zh="實相新聞台" en="REALITY NEWSROOM" /></h3><p><Lang zh="即時、真實、深度報導世界正在發生的事。" en="Timely, grounded reporting on the world in motion." /></p></div>
            </LocalizedLink>
            <LocalizedLink href="/news#museum">
              <span aria-hidden="true">▥</span>
              <div><h3><Lang zh="責任博物館" en="RESPONSIBILITY MUSEUM" /></h3><p><Lang zh="保存記憶、啟動反思，讓責任成為未來的指南針。" en="Preserve memory and turn responsibility into a compass." /></p></div>
            </LocalizedLink>
            <LocalizedLink href="/news">
              <span aria-hidden="true">♥</span>
              <div><h3><Lang zh="共同守護未來" en="GUARDING THE FUTURE" /></h3><p><Lang zh="每一次閱讀、每一段參與，都是改變。" en="Every reading and every act of participation matters." /></p></div>
            </LocalizedLink>
          </div>
        </section>

        <section className={styles.publicRecord} id="public-record">
          <div>
            <p className={styles.sectionKicker}><i aria-hidden="true" /> <Lang zh="公開紀錄" en="PUBLIC RECORD" /></p>
            <h2><Lang zh="讓外部世界能查到、讀懂、回放。" en="SEARCHABLE. READABLE. REPLAYABLE." /></h2>
          </div>
          <div className={styles.recordGrid}>
            {publicRecords.map((record) => (
              <a href={record.href} key={record.href} target="_blank" rel="noreferrer">
                <span>{record.label}</span>
                <h3><Lang zh={record.zh} en={record.en} /></h3>
                {"textZh" in record && <p><Lang zh={record.textZh ?? ""} en={record.textEn ?? ""} /></p>}
                <b aria-hidden="true">↗</b>
              </a>
            ))}
          </div>
        </section>

        <section className={styles.contactBand} id="contact" aria-labelledby="contact-title">
          <div>
            <p className={styles.sectionKicker}><i aria-hidden="true" /> <Lang zh="合作聯絡" en="COLLABORATION" /></p>
            <h2 id="contact-title"><Lang zh="讓合作先有清楚的主體、範圍與責任。" en="BEGIN WITH A CLEAR SUBJECT, SCOPE AND RESPONSIBILITY." /></h2>
          </div>
          <div>
            <p><Lang zh="技術合作、公開研究、動畫與音樂企劃，可先以電子郵件說明目的與預期成果。" en="For technical collaboration, public research, animation or music projects, begin with the purpose and expected outcome by email." /></p>
            <a href="mailto:ken0963521@gmail.com"><Lang zh="寄送合作提案" en="SEND A PROPOSAL" /> <span aria-hidden="true">→</span></a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
