import type { Metadata } from "next";
import { LocalizedLink } from "../../components/LanguageControl";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { hf2007Research, hf2007ResearchRoute } from "../../research-data";
import { localizedAlternates, siteUrl } from "../../site-config";
import styles from "./research.module.css";

type PageProps = { params: Promise<{ locale: string }> };

function resolveLocale(value: string) {
  return value === "en" ? "en" : "zh";
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const isEnglish = locale === "en";
  const title = isEnglish
    ? "Public Research & Verification Records | SERENE SCHOOL STUDIO"
    : "公開研究與驗證紀錄｜沉靜流派工作室";
  const description = isEnglish
    ? "Public verification checkpoints released by Wen-Yao Hsu / Shen-Yao 888π, beginning with the formally accepted HF2007 T0 path-legitimacy paper and reproducible 51-transition experiment."
    : "許文耀／沈耀888π的公開研究與驗證紀錄：保存由既有系統開發節點抽出的最小可驗證公開版本，首篇為正式錄取的 HF2007 T0 路徑合法性論文與 51-transition 可重現實驗。";

  return {
    title: { absolute: title },
    description,
    keywords: isEnglish
      ? ["Wen-Yao Hsu research", "Shen-Yao 888π", "HF2007", "T0 admission gating", "path legitimacy", "AI safety", "AI governance", "reasoning transition security", "reproducible experiment"]
      : ["許文耀 研究", "沈耀888π", "HF2007", "T0 准入閘門", "路徑合法性", "AI 安全", "AI 治理", "推理轉移", "可重現實驗"],
    alternates: localizedAlternates(locale, "/research"),
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      url: `/${locale}/research`,
      title,
      description,
      locale: isEnglish ? "en_US" : "zh_TW",
      alternateLocale: isEnglish ? "zh_TW" : "en_US",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "SERENE SCHOOL STUDIO — Public Research & Verification Records" }],
    },
  };
}

export default async function ResearchHubPage({ params }: PageProps) {
  const locale = resolveLocale((await params).locale);
  const isEnglish = locale === "en";
  const copy = isEnglish
    ? {
        eyebrow: "PUBLIC RESEARCH / VERIFICATION / VERSION RECORD",
        title: "The system did not begin with a paper.",
        intro: "A paper is the minimum public evidence I extracted from a system already under development. I preserve external review, reproducible experiments, version boundaries and the continuing engineering path here.",
        axisOne: "AUTHORIAL SOURCE",
        axisOneValue: "WEN-YAO HSU / SHEN-YAO 888π",
        axisTwo: "PUBLIC ROLE",
        axisTwoValue: "VERIFIABLE CHECKPOINT",
        subject: "SUBJECT",
        evidence: "EVIDENCE",
        boundary: "BOUNDARY",
        responsibility: "RESPONSIBILITY",
        statusOne: "FORMALLY ACCEPTED",
        statusTwo: "AUTHOR PUBLIC RELEASE",
        statusThree: "REPRODUCIBLE EXPERIMENT",
        statusFour: "ENGINEERING CONTINUES",
        section: "PUBLIC VERIFICATION RECORD 01",
        sectionTitle: "I preserve what was externally verified without turning it into the boundary of the system.",
        sectionText: "HF2007 is the first public checkpoint: the smallest externally reviewable layer extracted from an existing engineering path, with a fixed experiment, provenance, hashes and replayable results.",
        recordMeta: "HF2007 · ICAISG 2026 · ACCEPTED 2026-09-09",
        recordSummary: "T0 path legitimacy was compiled into an executable pre-reasoning admission gate and verified on a fixed 51-transition baseline. The paper and experiment preserve that public evidence while the internal system continues beyond this release.",
        cta: "OPEN THE RESEARCH RECORD",
        quote: "The system did not begin with the paper. The paper is the minimum verifiable public evidence extracted from a real development checkpoint.",
        quoteBy: "WEN-YAO HSU / SHEN-YAO 888π",
        quoteNote: "Founder and defining subject · SERENE SCHOOL STUDIO",
      }
    : {
        eyebrow: "公開研究／外部驗證／版本紀錄",
        title: "系統不是從論文開始。",
        intro: "論文是我從已經進入開發與落地的系統中，抽出的最小可驗證公開證據。我在這裡保存外部審查、實驗重現、版本邊界，以及系統繼續向後落地的路徑。",
        axisOne: "主體與定義源",
        axisOneValue: "許文耀／沈耀888π",
        axisTwo: "公開角色",
        axisTwoValue: "可驗證節點",
        subject: "主體",
        evidence: "證據",
        boundary: "邊界",
        responsibility: "責任",
        statusOne: "正式錄取",
        statusTwo: "作者自主公開",
        statusThree: "可重現實驗",
        statusFour: "工程持續落地",
        section: "公開驗證紀錄 01",
        sectionTitle: "我保存外部已經驗證的成果，但不讓它反過來成為系統的邊界。",
        sectionText: "HF2007 是第一個公開節點：從既有工程路徑中抽出的最小外部可審查層，保留固定實驗、來源、Hash 與可回放結果。",
        recordMeta: "HF2007 · ICAISG 2026 · 2026-09-09 正式錄取",
        recordSummary: "T0 路徑合法性已被編譯成推理前可執行的准入閘門，並在固定 51-transition 基線上完成驗證。論文與實驗保存這份公開證據；內部系統則沿著這個已成立的基線繼續向後落地。",
        cta: "進入完整研究紀錄",
        quote: "系統不是從論文開始；論文是我從既有系統的開發節點中，抽出的最小可驗證公開證據。",
        quoteBy: "許文耀／沈耀888π",
        quoteNote: "沉靜流派工作室創辦人／定義主體",
      };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: isEnglish ? "Public Research & Verification Records" : "公開研究與驗證紀錄",
    url: siteUrl(`/${locale}/research`),
    inLanguage: isEnglish ? "en" : "zh-Hant",
    isPartOf: { "@id": siteUrl("/#website") },
    author: { "@id": siteUrl("/#person") },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: 1,
      itemListElement: [{
        "@type": "ListItem",
        position: 1,
        name: hf2007Research.title,
        url: siteUrl(`/${locale}${hf2007ResearchRoute}`),
      }],
    },
  };

  return (
    <>
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <main className={styles.page}>
        <section className={styles.hubHero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{copy.eyebrow}</p>
            <h1>{copy.title}</h1>
            <p>{copy.intro}</p>
            <div className={styles.heroIndex}>
              <span>{copy.axisOne}<b>{copy.axisOneValue}</b></span>
              <span>{copy.axisTwo}<b>{copy.axisTwoValue}</b></span>
            </div>
          </div>
          <div className={styles.gateArtifact} aria-hidden="true">
            <i className={styles.gateRing} />
            <div className={styles.gateCore}><span>PUBLIC<b>T0</b>CHECKPOINT</span></div>
            <span className={styles.gateNode}>{copy.subject}<b>SUBJECT</b></span>
            <span className={styles.gateNode}>{copy.evidence}<b>EVIDENCE</b></span>
            <span className={styles.gateNode}>{copy.boundary}<b>BOUNDARY</b></span>
            <span className={styles.gateNode}>{copy.responsibility}<b>RESPONSIBILITY</b></span>
          </div>
        </section>

        <div className={styles.statusBar} aria-label={isEnglish ? "Research record status" : "研究紀錄狀態"}>
          <span>{copy.statusOne}</span>
          <span>{copy.statusTwo}</span>
          <span>{copy.statusThree}</span>
          <span>{copy.statusFour}</span>
        </div>

        <section className={styles.records} aria-labelledby="research-records-title">
          <header className={styles.sectionHeading}>
            <p className={styles.sectionLabel}>{copy.section}</p>
            <div>
              <h2 id="research-records-title">{copy.sectionTitle}</h2>
              <p>{copy.sectionText}</p>
            </div>
          </header>

          <LocalizedLink className={styles.recordCard} href={hf2007ResearchRoute}>
            <div className={styles.recordMark}><span>T0</span></div>
            <div className={styles.recordCopy}>
              <span className={styles.recordMeta}>{copy.recordMeta}</span>
              <h3>{hf2007Research.title}</h3>
              <p>{copy.recordSummary}</p>
              <span className={styles.recordAction}>{copy.cta}<b aria-hidden="true">↗</b></span>
            </div>
          </LocalizedLink>
        </section>

        <section className={styles.principle} aria-label={isEnglish ? "Research publishing principle" : "研究公開原則"}>
          <blockquote>{copy.quote}</blockquote>
          <div>
            <strong>{copy.quoteBy}</strong>
            <p>{copy.quoteNote}</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
