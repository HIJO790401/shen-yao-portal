import type { Metadata } from "next";
import { Lang, LocalizedLink } from "../../components/LanguageControl";
import { ProductFilmStage } from "../../components/ProductFilmStage";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { findFilm } from "../../showcase-data";
import { localizedAlternates, siteUrl } from "../../site-config";
import styles from "./semantic-firewall-causal.module.css";

const sourceRepo = "https://github.com/HIJO790401/semantic-firewall-causal-demo";
const publicWalkthrough = "https://hijo790401.github.io/semantic-firewall-causal-demo/";
const contactMailto = "mailto:ken0963521@gmail.com?subject=%E8%AA%9E%E6%84%8F%E9%98%B2%E7%81%AB%E7%89%86%E8%B3%87%E5%AE%89%E5%9B%A0%E6%9E%9C%E7%B3%BB%E7%B5%B1%EF%BD%9C%E4%BC%81%E6%A5%AD%E6%8E%A5%E5%85%A5%E6%B4%BD%E8%A9%A2";

export const metadata: Metadata = {
  title: "語意防火牆資安因果系統｜主體規則、作用資格與受控執行",
  description: "許文耀／沈耀888π 定義的語意防火牆資安因果系統：保留既有登入，核對主體、裝置、環境、時間、工作與責任關係，再讓有界算力提出候選，經同一候選後審後交回原系統受控執行與回放。",
  keywords: ["語意防火牆", "資安因果系統", "AI 安全", "AI 治理", "因果責任", "主體規則", "操作授權", "作用資格", "有界算力", "候選後審", "責任鏈", "受控執行", "稽核回放", "許文耀", "沈耀888π"],
  alternates: localizedAlternates("zh", "/products/semantic-firewall-causal-system"),
  openGraph: {
    url: "/zh/products/semantic-firewall-causal-system",
    title: "語意防火牆資安因果系統",
    description: "登入成功只確認身份；本次操作是否具備作用資格，仍須核對完整關係鏈。",
    type: "website",
  },
};

const stages = [
  ["01", "保留既有登入", "KEEP EXISTING SIGN-IN", "登入確認身份；不自動授權每一項操作。", "Sign-in verifies identity; it does not grant every operation."],
  ["02", "建立本次關係", "ESTABLISH RELATIONSHIPS", "把主體、裝置、環境、時間、工作、規則與責任連回同一操作。", "Bind subject, device, environment, time, work, rules and responsibility to one operation."],
  ["03", "前檢作用資格", "PRE-CHECK EFFECT ELIGIBILITY", "缺少必要依據就停止，不讓算力猜測補齊。", "Stop on missing evidence; compute cannot invent the gap."],
  ["04", "有界算力候選", "BOUNDED COMPUTE CANDIDATE", "算力只拿到本次獲准資料，只能提出候選。", "Compute receives only admitted work data and may only propose a candidate."],
  ["05", "同一候選後審", "REVIEW THE EXACT CANDIDATE", "原輸入、版本、範圍與候選不可在途中被替換。", "Input, version, scope and candidate cannot be swapped in transit."],
  ["06", "原系統受控執行", "CONTROLLED SYSTEM EXECUTION", "執行器核對一次性許可後才產生效果。", "The executor creates an effect only after checking a single-use grant."],
  ["07", "回放責任路徑", "REPLAY THE RESPONSIBILITY PATH", "保留關係、候選、後審與效果收據的可追溯位置。", "Keep traceable positions for relationships, candidate, review and effect receipt."],
] as const;

const relations = [
  ["主體", "SUBJECT", "這次是誰在操作", "Who acts this time"],
  ["裝置", "DEVICE", "是否為本次關係中的裝置", "Whether this device belongs to the relationship"],
  ["環境與時間", "ENVIRONMENT & TIME", "觀測是否支持這個工作時窗", "Whether observations support this work window"],
  ["工作與來源", "WORK & SOURCE", "原始資料是否屬於本次工作", "Whether source data belongs to this work"],
  ["允許範圍", "ALLOWED SCOPE", "候選可以做什麼、不能做什麼", "What the candidate may and may not do"],
  ["責任與控制", "RESPONSIBILITY & CONTROL", "誰能執行、停止、修復與承擔", "Who may execute, stop, repair and answer"],
] as const;

const scenarios = [
  {
    index: "A",
    state: "RELATION",
    tone: "pass",
    titleZh: "地圖只是觀測，關係才決定能不能用。",
    titleEn: "A map is an observation; relationships determine admissibility.",
    bodyZh: "合成地圖把觀測點、允許範圍與誤差畫出來，再核對它是否連到這台裝置、這個環境、時間與工作。GPS、IP 或 VPN 都不能單獨授權。",
    bodyEn: "A synthetic map shows an observation, allowed boundary and uncertainty, then relates it to the device, environment, time and work. GPS, IP or VPN alone cannot grant authority.",
  },
  {
    index: "B",
    state: "STOP",
    tone: "warn",
    titleZh: "缺依據，停止受影響操作。",
    titleEn: "Missing evidence stops the affected operation.",
    bodyZh: "身份仍然有效；停止的是這一次操作的作用資格。系統指出缺少的環境或責任關係，不讓模型自行補造，待依據補齊後再按規則核對。",
    bodyEn: "Identity remains valid; only this operation loses effect eligibility. The system identifies the missing environment or responsibility relation instead of letting a model invent it, then waits for rule-based revalidation.",
  },
  {
    index: "C",
    state: "BLOCK",
    tone: "danger",
    titleZh: "候選越界，後審直接攔下。",
    titleEn: "Review blocks a candidate that exceeds scope.",
    bodyZh: "即使登入與前檢通過，候選若夾帶額外操作、改動來源或計算不符，仍不取得作用資格；原執行器不產生檔案。",
    bodyEn: "Even after sign-in and pre-check, a candidate that adds operations, alters sources or mismatches the calculation receives no effect authority; the executor creates no file.",
  },
] as const;

export function SemanticFirewallCausalSystemContent({ locale }: { locale: "zh" | "en" }) {
  const film = findFilm("semantic-firewall-causal-system");
  const isEnglish = locale === "en";
  const pageUrl = siteUrl(`/${locale}/products/semantic-firewall-causal-system`);
  const productId = siteUrl("/#semantic-firewall-causal-system");
  const breadcrumbId = `${pageUrl}#breadcrumb`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": productId,
        name: isEnglish ? "Semantic Firewall Causal Security System" : "語意防火牆資安因果系統",
        alternateName: isEnglish ? "語意防火牆資安因果系統" : "Semantic Firewall Causal Security System",
        url: pageUrl,
        inLanguage: isEnglish ? "en" : "zh-Hant",
        category: "AI safety, AI governance and causal-security architecture",
        creator: { "@id": siteUrl("/#person") },
        description: isEnglish
          ? "A causal responsibility component designed to preserve existing authentication, establish operation-specific relationships, bound compute to candidate generation, review the same candidate, and return approved effects to the existing system for controlled execution and replay."
          : "保留既有登入，核對主體、裝置、環境、時間、工作、規則與責任，再讓有界算力提出候選，由同一候選後審後交回原系統受控執行與回放。",
        isBasedOn: sourceRepo,
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: isEnglish ? "Semantic Firewall Causal Security System" : "語意防火牆資安因果系統",
        inLanguage: isEnglish ? "en" : "zh-Hant",
        isPartOf: { "@id": siteUrl("/#website") },
        about: { "@id": productId },
        breadcrumb: { "@id": breadcrumbId },
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: isEnglish ? "Home" : "首頁", item: siteUrl(`/${locale}`) },
          { "@type": "ListItem", position: 2, name: isEnglish ? "Products" : "產品", item: siteUrl(`/${locale}/products`) },
          { "@type": "ListItem", position: 3, name: isEnglish ? "Semantic Firewall Causal Security System" : "語意防火牆資安因果系統", item: pageUrl },
        ],
      },
    ],
  };

  return <>
    <SiteHeader />
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>SEMANTIC FIREWALL · CAUSAL SECURITY SYSTEM</p>
            <h1><Lang zh="語意防火牆資安因果系統" en="SEMANTIC FIREWALL CAUSAL SECURITY SYSTEM" /></h1>
            <p className={styles.decree}><Lang
              zh="登入成功，只確認你是誰；它不替每一項操作自動授權。"
              en="Successful sign-in verifies who you are. It does not authorize every operation."
            /></p>
            <p className={styles.lead}><Lang
              zh="我設計這套系統保留企業既有登入與資安設施，不用登入成功取代操作授權。受保護操作開始前，它依已採納的主體規則，核對主體、裝置、環境、時間、工作、規則與責任是否建立本次作用資格；算力只能在獲准邊界內提出候選。"
              en="I designed this system to preserve an enterprise's existing authentication and security controls without treating successful sign-in as operation-wide authorization. Before a protected operation, it evaluates whether subject, device, environment, time, work, rules and responsibility establish authority for this specific effect. Compute may propose a candidate only inside the admitted boundary."
            /></p>
            <div className={styles.owner}><span><Lang zh="定義者" en="DEFINER" /></span><b><Lang zh="許文耀／沈耀888π" en="WENYAO HSU / SHEN-YAO 888π" /></b></div>
            <div className={styles.actions}>
              <LocalizedLink href="/demo/semantic-firewall-causal-system"><Lang zh="觀看官網 DEMO" en="WATCH WEBSITE DEMO" /> <span>▶</span></LocalizedLink>
              <a href={contactMailto}><Lang zh="企業合作洽詢" en="ENTERPRISE INQUIRY" /> <span>↗</span></a>
            </div>
          </div>
          <div className={styles.systemMap} aria-label="語意防火牆企業接入位置">
            <div className={styles.mapHeader}><span>INTEGRATION POSITION</span><b>FIXED SYNTHETIC NARRATIVE</b></div>
            <div className={styles.mapRail}>
              <div><small>01</small><b>EXISTING<br/>SIGN-IN</b></div><i>→</i>
              <div className={styles.firewallNode}><small>02 / 05</small><b>SEMANTIC<br/>FIREWALL</b><span>PRE-CHECK ↔ REVIEW</span></div><i>↔</i>
              <div><small>04</small><b>BOUNDED<br/>COMPUTE</b></div><i>→</i>
              <div><small>06 / 07</small><b>EXECUTE<br/>+ REPLAY</b></div>
            </div>
            <div className={styles.mapBoundary}><i /><Lang zh="帳密留在原系統；算力沒有採納規則或執行效果的權限。" en="Credentials stay in the existing system; compute cannot adopt rules or execute effects." /></div>
          </div>
        </div>
      </section>

      <section className={styles.flow} aria-labelledby="causal-flow-title">
        <header><p>01 / CONTROLLED PATH</p><h2 id="causal-flow-title"><Lang zh="一條操作，七段關係不能被偷換。" en="ONE OPERATION. SEVEN STAGES THAT CANNOT BE SWAPPED." /></h2></header>
        <div className={styles.stageGrid}>{stages.map(([index, zh, en, bodyZh, bodyEn]) => <article key={index}>
          <span>{index}</span><small>{en}</small><h3><Lang zh={zh} en={en} /></h3><p><Lang zh={bodyZh} en={bodyEn} /></p>
        </article>)}</div>
      </section>

      <section className={styles.relationSection}>
        <div className={styles.relationIntro}><p>02 / RELATIONSHIP LEGALITY</p><h2><Lang zh="不是欄位填滿；是每一條關係都支持這次作用。" en="NOT FILLED FIELDS—RELATIONSHIPS THAT SUPPORT THIS EFFECT." /></h2><p><Lang zh="相同登入身份，在不同裝置、環境、時間或工作下，不會自動繼承同一份操作許可。既有關係可以保留版本與來源；發生變動，只重驗受影響的關係。" en="The same signed-in identity does not automatically inherit the same operation grant across devices, environments, times or work. Existing relationships retain version and source; a change rechecks only the affected relationship." /></p></div>
        <div className={styles.relationMatrix}>{relations.map(([zh, en, bodyZh, bodyEn], index) => <article key={en}>
          <span>{String(index + 1).padStart(2, "0")}</span><div><small>{en}</small><h3><Lang zh={zh} en={en} /></h3><p><Lang zh={bodyZh} en={bodyEn} /></p></div><b>CHECK</b>
        </article>)}</div>
      </section>

      <section className={styles.scenarios}>
        <header><p>03 / THREE PUBLIC SCENARIOS</p><h2><Lang zh="看見差別，才知道防火牆擋的是什麼。" en="SEE THE DIFFERENCE—SEE WHAT THE FIREWALL STOPS." /></h2></header>
        <div className={styles.scenarioGrid}>{scenarios.map((scenario) => <article className={styles[scenario.tone]} key={scenario.index}>
          <div><span>{scenario.index}</span><b>{scenario.state}</b></div><h3><Lang zh={scenario.titleZh} en={scenario.titleEn} /></h3><p><Lang zh={scenario.bodyZh} en={scenario.bodyEn} /></p>
        </article>)}</div>
      </section>

      {film && <section className={styles.demo} aria-labelledby="causal-demo-title">
        <header><p>04 / WEBSITE FIXED-CASE DEMO</p><h2 id="causal-demo-title"><Lang zh="我依官網標準重播，不改動原互動 Demo。" en="I REPLAY IT TO WEBSITE STANDARD WITHOUT ALTERING THE ORIGINAL INTERACTIVE DEMO." /></h2><p><Lang zh="我把官網版本做成不要求訪客輸入的固定合成情境，自動重播接入位置、缺依據停止與候選越界攔截；原公開互動導覽保留原本的設計、程式與互動節奏。" en="I built the website version as a fixed synthetic scenario with no visitor input. It automatically replays integration placement, missing-evidence stops and out-of-scope candidate blocks, while the public interactive walkthrough keeps its original design, code and pacing." /></p></header>
        <ProductFilmStage film={film} />
      </section>}

      <section className={styles.boundary}>
        <div><p>05 / PUBLIC BOUNDARY</p><h2><Lang zh="我公開接入邏輯；私人核心不公開。" en="I PUBLISH THE INTEGRATION LOGIC. I KEEP THE PRIVATE CORE PRIVATE." /></h2></div>
        <div className={styles.boundaryGrid}>
          <article><span>PUBLIC RESULT</span><p><Lang zh="我已把接入順序、關係檢查、停止條件、同一候選後審與回放路徑固化成公開合成導覽。" en="I have encoded the integration sequence, relationship checks, stop conditions, same-candidate review and replay path in a public synthetic walkthrough." /></p></article>
          <article><span>DEMO NOT CONNECTED</span><p><Lang zh="這個官網公開展示不連接真實登入、GPS、裝置核驗、模型、企業系統、授權服務、資料庫或稽核證據。它讓外部看懂接入位置與阻擋邏輯；真正的企業接入仍須在具名環境中逐案施工與驗證。" en="This public website demonstration does not connect to real sign-in, GPS, device verification, a model, an enterprise system, an authorization service, a database or audit evidence. It makes the integration position and blocking logic visible. Any real enterprise integration must still be implemented and verified in a named environment." /></p></article>
          <article><span>PRIVATE</span><p><Lang zh="我不把私人後端、規則核心、完整算式、企業接入資料或本機產品工作區放進官網與公開倉庫。" en="I keep the private backend, rule core, full formulas, enterprise integration data and local product workspace out of the site and public repository." /></p></article>
        </div>
        <div className={styles.evidenceActions}>
          <a href={publicWalkthrough} target="_blank" rel="noreferrer"><Lang zh="開啟原互動導覽" en="OPEN ORIGINAL WALKTHROUGH" /> ↗</a>
          <a href={sourceRepo} target="_blank" rel="noreferrer"><Lang zh="查看公開敘事原始碼" en="VIEW PUBLIC NARRATIVE SOURCE" /> ↗</a>
          <a href={contactMailto}><Lang zh="洽談有界概念驗證與接入" en="DISCUSS A BOUNDED PROOF OF CONCEPT" /> ↗</a>
        </div>
      </section>
    </main>
    <SiteFooter />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
  </>;
}

export default function SemanticFirewallCausalSystemPage() {
  return <SemanticFirewallCausalSystemContent locale="zh" />;
}
