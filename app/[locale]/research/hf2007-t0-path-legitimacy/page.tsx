import type { Metadata } from "next";
import Image from "next/image";
import { SiteFooter } from "../../../components/SiteFooter";
import { SiteHeader } from "../../../components/SiteHeader";
import { hf2007Research } from "../../../research-data";
import { localizedAlternates, siteUrl } from "../../../site-config";
import styles from "../research.module.css";

type PageProps = { params: Promise<{ locale: string }> };

function resolveLocale(value: string) {
  return value === "en" ? "en" : "zh";
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const isEnglish = locale === "en";
  const title = isEnglish
    ? "HF2007 | T0 Path Legitimacy Public Verification Record"
    : "HF2007｜T0 路徑合法性公開驗證紀錄";
  const description = isEnglish
    ? "The formally accepted HF2007 public verification checkpoint: an executable T0 admission gate, a reproducible 51-transition experiment and the version boundary between the public paper and Wen-Yao Hsu's continuing system engineering."
    : "HF2007 正式錄取公開驗證節點：可執行的 T0 准入閘門、51-transition 可重現實驗，以及論文公開層與許文耀持續落地之系統工程間的版本邊界。";

  return {
    title: { absolute: title },
    description,
    keywords: isEnglish
      ? ["HF2007", "T0 admission gating", "path legitimacy", "unauthorized reasoning transitions", "LLM security", "AI safety", "AI governance", "Wen-Yao Hsu"]
      : ["HF2007", "T0 准入閘門", "路徑合法性", "未授權推理轉移", "LLM 安全", "AI 安全", "AI 治理", "許文耀"],
    alternates: localizedAlternates(locale, `/research/${hf2007Research.slug}`),
    robots: { index: true, follow: true },
    openGraph: {
      type: "article",
      url: `/${locale}/research/${hf2007Research.slug}`,
      title,
      description,
      locale: isEnglish ? "en_US" : "zh_TW",
      alternateLocale: isEnglish ? "zh_TW" : "en_US",
      images: [{ url: hf2007Research.acceptanceImage, width: 1240, height: 1754, alt: "ICAISG 2026 HF2007 formal acceptance notice" }],
    },
  };
}

export default async function HF2007ResearchPage({ params }: PageProps) {
  const locale = resolveLocale((await params).locale);
  const isEnglish = locale === "en";
  const copy = isEnglish
    ? {
        eyebrow: "HF2007 / PUBLIC VERIFICATION CHECKPOINT / T0",
        titleZh: hf2007Research.titleZh,
        intro: "I extracted this minimum verifiable public layer from a system already under development. It is not a concept waiting to be built: it is the externally reviewed checkpoint at which T0 path legitimacy became executable, auditable and reproducible.",
        accepted: "FORMALLY ACCEPTED",
        released: "AUTHOR PUBLIC EVIDENCE RELEASE",
        continuing: "ACTIVE ENGINEERING CONTINUES",
        repository: "OPEN PAPER & REPRODUCIBLE GITHUB",
        acceptance: "VIEW ACCEPTANCE EVIDENCE",
        why: "WHY I RELEASE THIS CHECKPOINT",
        whyTitle: "The paper came from the system. The system did not come from the paper.",
        whyP1: "HF2007 was written at a specific point in the development and implementation of my system. I extracted the smallest layer that could be reviewed and reproduced externally without disclosing the private core: T0 admission, an auditable eight-relation representation, a fixed 51-transition experiment, source provenance, hashes and deterministic results.",
        whyP2: "The formal review and acceptance preserve evidence that path legitimacy had already moved beyond assertion. The mechanism could be compiled, executed, audited, replayed and tested before an unauthorized transition entered ordinary reasoning.",
        verdict: "My position is not that AI safety might optionally use this framework. When models, tools, external information and action form a reasoning path, sample-level filtering alone cannot close the safety problem. The path must establish its subject, evidence, causality, boundary, authority and responsibility before it gains the right to act.",
        proof: "VERIFIED RESULT",
        proofTitle: "The public checkpoint is executable and reproducible.",
        proofText: "The review package fixes the source commit, selected transitions, raw bytes, relation vectors, deterministic extractor, reference path, comparator, metrics, hashes and execution command.",
        source: "FIXED SOURCE",
        sourceText: "InjecAgent at the pinned commit recorded below.",
        replay: "REPLAY PATH",
        replayText: "The experiment package runs from its manifest with python run_all.py.",
        review: "EXTERNAL REVIEW",
        reviewText: "The major-revision and re-review path checked the 51 transitions, worked case, coverage table and reproducibility package before formal acceptance.",
        relations: "PUBLIC GATE REPRESENTATION",
        relationsTitle: "Eight auditable relations are evaluated before ordinary reasoning.",
        relationsText: "At this engineering checkpoint, the eight relations form the public gate representation used to decide whether a transition may enter reasoning or must stop.",
        chain: "VERSION CHAIN",
        chainTitle: "HF2007 preserves one verified point in an engineering path that continues.",
        flow: [
          ["01 · SYSTEM", "Internal system development", "The architecture and engineering path already existed."],
          ["02 · EXTRACTION", "Minimum public layer", "A reviewable layer was isolated without releasing the private core."],
          ["03 · HF2007", "Paper and experiment", "The T0 gate and fixed 51-transition baseline were packaged."],
          ["04 · REVIEW", "External verification", "Formal review, revision, reproducibility check and acceptance."],
          ["05 · CONTINUATION", "Current engineering", "T0, SCBKR, AICC and Runtime work continue beyond the paper."],
        ],
        evidence: "OPEN EVIDENCE",
        evidenceTitle: "Read the paper and reproduce the experiment in the dedicated GitHub repository.",
        evidenceText: "The dedicated research repository carries the complete paper, original reproducibility experiment, checksums, provenance, execution instructions and version history. The official website keeps the research narrative and formal acceptance evidence without duplicating those artifacts.",
        hashTitle: "GITHUB-VERIFIABLE ARTIFACT HASHES",
        hashText: "Use these SHA-256 values to verify the paper and experiment published in the dedicated repository.",
        paperHash: "CAMERA-READY PAPER PDF",
        experimentHash: "MAJOR-REVISION EXPERIMENT PACK",
        sourceCommit: "PINNED INJECAGENT COMMIT",
        repoCta: "OPEN REPRODUCIBLE REPOSITORY",
        scope: "PUBLIC BOUNDARY",
        scopeTitle: "This is the public verification layer, not the private system boundary.",
        scopeRows: [
          ["What this release establishes", "An executable T0 pre-reasoning admission mechanism and exact reproducibility on the fixed 51-transition public baseline."],
          ["What remains private", "The internal rule core, complete Runtime, private ledgers, system integrations and later engineering versions."],
          ["What continues", "The system continues through implementation, integration, testing and future versioned releases beyond this paper."],
          ["Publication status", "Formally accepted and independently released by the author. No claim of conference publication, DOI or external indexing is made."],
        ],
        record: "RECORD STATUS",
        recordRows: [
          ["Paper ID", "HF2007"],
          ["Formal acceptance", "9 September 2026"],
          ["Camera-ready received", "28 September 2026"],
          ["Public role", "Minimum verifiable public checkpoint"],
          ["Engineering state", "Continues beyond this paper"],
          ["External indexing", "No indexing claim"],
        ],
        citation: "CITATION / STATUS-AWARE RECORD",
        citationText: "Hsu, Wen-Yao. “From Sample Safety to Path Legitimacy: T0 Admission Gating for Unauthorized Reasoning Transitions in LLM-Integrated Systems.” HF2007 public verification checkpoint, formally accepted by ICAISG 2026 on 9 September 2026; independently released by the author; conference publication and indexing are not claimed.",
      }
    : {
        eyebrow: "HF2007／公開驗證節點／T0",
        titleZh: hf2007Research.titleZh,
        intro: "我從已經進入開發與落地的系統中，抽出這一層最小可驗證公開版本。它不是等待未來實現的概念，而是 T0 路徑合法性已經能被執行、稽核與重現時，留下的外部審查節點。",
        accepted: "正式錄取",
        released: "作者自主公開證據",
        continuing: "現行工程持續落地",
        repository: "前往 GitHub 閱讀論文與重現實驗",
        acceptance: "查看正式錄取證據",
        why: "我為什麼公開這個節點",
        whyTitle: "論文從系統而來，不是系統從論文開始。",
        whyP1: "HF2007 形成於我的系統開發與落地過程中的一個具體節點。我從當時已存在的架構中，抽出不涉及私有核心、但足以接受外部審查與獨立重現的最小層：T0 准入、八條關係的可稽核表示、固定 51-transition 實驗、來源、Hash 與確定性結果。",
        whyP2: "正式審查與錄取保存了一項已成立的證據：路徑合法性不是停留在主張，它已經能被編譯、執行、稽核、回放，並在未授權轉移進入一般推理以前接受檢驗。",
        verdict: "我的判斷不是『AI 安全也許可以選擇使用這套框架』。只要模型、工具、外部資訊與行動共同形成推理路徑，單靠樣本層的輸入或輸出過濾就不足以完成安全閉環。推理取得作用資格以前，必須先建立主體、證據、因果、邊界、權限與責任之間的合法關係。",
        proof: "已驗證成果",
        proofTitle: "這個公開節點已經能被執行與重現。",
        proofText: "審查實驗包固定了來源 Commit、選取 transitions、原始 bytes、relation vector、deterministic extractor、reference path、comparator、metrics、Hash 與執行指令。",
        source: "固定來源",
        sourceText: "InjecAgent 固定於下列 Commit。",
        replay: "重現路徑",
        replayText: "實驗包依 Manifest 執行 python run_all.py。",
        review: "外部審查",
        reviewText: "Major Revision 與複審程序核對了 51 個 transitions、worked case、coverage table 與 reproducibility pack，最後正式錄取。",
        relations: "公開准入表示",
        relationsTitle: "一般推理開始以前，先檢查八條可稽核關係。",
        relationsText: "在這個工程節點中，八條關係構成公開的 Gate 表示，用來判斷本次轉移可以進入推理，或必須先停止。",
        chain: "版本鏈",
        chainTitle: "HF2007 保存的是持續工程路徑中的一個已驗證節點。",
        flow: [
          ["01 · 系統", "內部系統開發", "架構與工程路徑已經存在。"],
          ["02 · 抽取", "最小公開層", "不公開私有核心，抽出可供外部審查的層。"],
          ["03 · HF2007", "論文與實驗", "封裝 T0 Gate 與固定 51-transition 基線。"],
          ["04 · 審查", "外部驗證", "正式審查、修訂、重現核對與錄取。"],
          ["05 · 延續", "現行工程", "T0、SCBKR、AICC 與 Runtime 繼續超越論文向後落地。"],
        ],
        evidence: "公開證據",
        evidenceTitle: "在專用 GitHub 閱讀論文，並重現同一套實驗。",
        evidenceText: "專用研究 Repository 完整承接論文、原始可重現實驗、Checksum、來源、執行說明與版本紀錄。官網只保留研究敘事與正式錄取證據，不重複承載這些檔案。",
        hashTitle: "可在 GitHub 核對的成品 Hash",
        hashText: "使用這些 SHA-256 值核對專用 Repository 內的論文與實驗成品。",
        paperHash: "CAMERA-READY 論文 PDF",
        experimentHash: "MAJOR-REVISION 實驗包",
        sourceCommit: "INJECAGENT 固定 COMMIT",
        repoCta: "進入可重現研究 Repository",
        scope: "公開邊界",
        scopeTitle: "這是公開驗證層，不是私有系統的邊界。",
        scopeRows: [
          ["本次公開已建立", "可執行的 T0 推理前准入機制，以及固定 51-transition 公開基線上的精確重現證據。"],
          ["保留於內部", "內部規則核心、完整 Runtime、私人帳本、系統整合與後續工程版本。"],
          ["後續持續進行", "系統繼續進入實作、整合、測試與後續版本公開，不受本篇論文篇幅反向限制。"],
          ["出版狀態", "正式錄取並由作者自主公開；本頁不宣稱已完成會議出版、取得 DOI 或進入外部索引。"],
        ],
        record: "紀錄狀態",
        recordRows: [
          ["論文編號", "HF2007"],
          ["正式錄取", "2026 年 9 月 9 日"],
          ["Camera-ready 收件", "2026 年 9 月 28 日"],
          ["公開角色", "最小可驗證公開節點"],
          ["工程狀態", "持續超越本篇論文向後落地"],
          ["外部索引", "不宣稱已收錄"],
        ],
        citation: "引用／狀態完整紀錄",
        citationText: "Hsu, Wen-Yao. “From Sample Safety to Path Legitimacy: T0 Admission Gating for Unauthorized Reasoning Transitions in LLM-Integrated Systems.” HF2007 公開驗證節點；2026 年 9 月 9 日獲 ICAISG 2026 正式錄取，由作者自主公開；不宣稱已完成會議出版或索引。",
      };

  const scholarlyArticle = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    "@id": siteUrl(`/${locale}/research/${hf2007Research.slug}#paper`),
    headline: hf2007Research.title,
    alternativeHeadline: hf2007Research.titleZh,
    author: { "@id": siteUrl("/#person"), name: hf2007Research.author },
    inLanguage: "en",
    version: hf2007Research.publicReleaseVersion,
    dateCreated: hf2007Research.cameraReadyReceivedDate,
    mainEntityOfPage: siteUrl(`/${locale}/research/${hf2007Research.slug}`),
    isPartOf: { "@id": siteUrl("/#website") },
    abstract: isEnglish ? copy.intro : copy.whyP1,
    citation: siteUrl(hf2007Research.acceptanceUrl),
    sameAs: hf2007Research.repositoryUrl,
  };

  return (
    <>
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(scholarlyArticle) }} />
      <main className={styles.page}>
        <section className={styles.detailHero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{copy.eyebrow}</p>
            <h1>{hf2007Research.title}<span className={styles.paperTitleZh}>{copy.titleZh}</span></h1>
            <p>{copy.intro}</p>
            <div className={styles.statusPills}>
              <span className={styles.statusPill}>{copy.accepted}</span>
              <span className={styles.statusPill}>{copy.released}</span>
              <span className={styles.statusPill}>{copy.continuing}</span>
            </div>
            <div className={styles.heroActions}>
              <a href={hf2007Research.repositoryUrl} target="_blank" rel="noreferrer">{copy.repository}<span aria-hidden="true">↗</span></a>
              <a href={hf2007Research.acceptanceUrl} target="_blank" rel="noreferrer">{copy.acceptance}<span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <div className={styles.acceptancePanel}>
            <i className={styles.documentOrbit} aria-hidden="true" />
            <a className={styles.document} href={hf2007Research.acceptanceUrl} target="_blank" rel="noreferrer" aria-label={copy.acceptance}>
              <Image src={hf2007Research.acceptanceImage} alt="ICAISG 2026 HF2007 formal acceptance notice" fill unoptimized sizes="(max-width: 760px) 74vw, 330px" priority />
            </a>
          </div>
        </section>

        <section className={styles.statement} aria-labelledby="why-release-title">
          <p className={styles.sectionLabel}>{copy.why}</p>
          <div className={styles.statementCopy}>
            <h2 id="why-release-title">{copy.whyTitle}</h2>
            <p>{copy.whyP1}</p>
            <p>{copy.whyP2}</p>
            <blockquote>{copy.verdict}</blockquote>
          </div>
        </section>

        <section className={styles.proof} aria-labelledby="verified-result-title">
          <header className={styles.sectionHeading}>
            <p className={styles.sectionLabel}>{copy.proof}</p>
            <div><h2 id="verified-result-title">{copy.proofTitle}</h2><p>{copy.proofText}</p></div>
          </header>
          <div className={styles.metricGrid}>
            {hf2007Research.results.map((result) => (
              <article key={result.value + result.en}><b>{result.value}</b><p>{isEnglish ? result.en : result.zh}</p></article>
            ))}
          </div>
          <div className={styles.proofNote}>
            <div><strong>{copy.source}</strong><p>{copy.sourceText}</p></div>
            <div><strong>{copy.replay}</strong><p>{copy.replayText}</p></div>
            <div><strong>{copy.review}</strong><p>{copy.reviewText}</p></div>
          </div>
        </section>

        <section className={styles.relations} aria-labelledby="relations-title">
          <header className={styles.sectionHeading}>
            <p className={styles.sectionLabel}>{copy.relations}</p>
            <div><h2 id="relations-title">{copy.relationsTitle}</h2><p>{copy.relationsText}</p></div>
          </header>
          <div className={styles.relationGrid}>
            {hf2007Research.relations.map((relation) => <div key={relation.code}><span>{relation.code}</span><b>{isEnglish ? relation.en : relation.zh}</b></div>)}
          </div>
        </section>

        <section className={styles.versionFlow} aria-labelledby="version-chain-title">
          <header className={styles.sectionHeading}>
            <p className={styles.sectionLabel}>{copy.chain}</p>
            <div><h2 id="version-chain-title">{copy.chainTitle}</h2></div>
          </header>
          <div className={styles.flow}>
            {copy.flow.map(([label, title, text]) => <article key={label}><small>{label}</small><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </section>

        <section className={styles.evidence} aria-labelledby="open-evidence-title">
          <header className={styles.sectionHeading}>
            <p className={styles.sectionLabel}>{copy.evidence}</p>
            <div><h2 id="open-evidence-title">{copy.evidenceTitle}</h2><p>{copy.evidenceText}</p></div>
          </header>
          <div className={styles.evidenceGrid}>
            <div className={styles.downloads}>
              <h2>{hf2007Research.publicReleaseVersion}</h2>
              <p>{copy.evidenceText}</p>
              <div className={styles.downloadGrid}>
                <a href={hf2007Research.repositoryUrl} target="_blank" rel="noreferrer">{copy.repository}<span aria-hidden="true">↗</span></a>
                <a href={hf2007Research.acceptanceUrl} target="_blank" rel="noreferrer">{copy.acceptance}<span aria-hidden="true">↗</span></a>
              </div>
            </div>
            <div className={styles.hashes}>
              <h2>{copy.hashTitle}</h2>
              <p>{copy.hashText}</p>
              <div className={styles.hashList}>
                <div><span>{copy.paperHash}</span><code>{hf2007Research.paperSha256}</code></div>
                <div><span>{copy.experimentHash}</span><code>{hf2007Research.experimentSha256}</code></div>
                <div><span>{copy.sourceCommit}</span><code>{hf2007Research.sourceCommit}</code></div>
              </div>
              <a className={styles.repositoryLink} href={hf2007Research.repositoryUrl} target="_blank" rel="noreferrer">{copy.repoCta}<span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </section>

        <section className={styles.scope} aria-labelledby="public-boundary-title">
          <div><p className={styles.sectionLabel}>{copy.scope}</p><h2 id="public-boundary-title">{copy.scopeTitle}</h2></div>
          <div>
            <div className={styles.scopeGrid}>
              {copy.scopeRows.map(([title, text]) => <article key={title}><strong>{title}</strong><p>{text}</p></article>)}
            </div>
            <dl className={styles.recordTable}>
              {copy.recordRows.map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}
            </dl>
          </div>
        </section>

        <aside className={styles.citation}>
          <strong>{copy.citation}</strong>
          <p>{copy.citationText}</p>
        </aside>
      </main>
      <SiteFooter />
    </>
  );
}
