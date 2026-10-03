import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductFilmStage } from "@/app/components/ProductFilmStage";
import { Lang, LocalizedLink } from "@/app/components/LanguageControl";
import { SiteHeader } from "@/app/components/SiteHeader";
import { SiteFooter } from "@/app/components/SiteFooter";
import { findFilm, productFilms } from "@/app/showcase-data";
import { localizedAlternates } from "@/app/site-config";
import topicStyles from "../scbkr-topic.module.css";

export function generateStaticParams() { return productFilms.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const slug = (await params).slug;
  const film = findFilm(slug);
  return film ? {
    title: slug === "scbkr" ? "SCBKR 2.3.1｜AI 責任鏈與本地規則治理" : `${film.name}｜${film.presentation === "architecture" ? "候選架構動畫" : film.status === "ready" ? "固定案例 DEMO" : "展示狀態"}`,
    description: slug === "scbkr" ? "許文耀／沈耀888π 的 SCBKR 責任鏈語言模型 2.3.1：使用者簽名規則、明確適用條件、候選召回與確認時證據重查的本地 AI 治理流程。" : film.introZh,
    alternates: localizedAlternates("zh", `/demo/${slug}`),
    openGraph: { url: `/zh/demo/${slug}` },
  } : {};
}

export default async function ProductFilmPage({ params }: { params: Promise<{ slug: string }> }) {
  const film = findFilm((await params).slug);
  if (!film) notFound();
  const ready = film.status === "ready";
  const architecture = film.presentation === "architecture";
  return <><SiteHeader/><main className="subpage demo-page">
    <section className="demo-hero film-hero">
      <div>
        <p className="eyebrow"><span>PRODUCT FILM {film.index}</span> {film.label}</p>
        <h1><Lang zh={film.headlineZh} en={film.headlineEn}/></h1>
        <p><Lang zh={film.introZh} en={film.introEn}/></p>
        <small className="autoplay-note"><Lang
          zh={architecture ? "不用輸入資料。候選架構動畫會自動循環，可在播放器內暫停或重播。" : ready ? "不用輸入資料。固定案例會自動循環，可在播放器內暫停或重播。" : "本項目尚未通過動畫資格；頁面只公開修復或暫緩原因。"}
          en={architecture ? "No input required. The candidate architecture film loops automatically and can be paused or replayed." : ready ? "No input required. The fixed case loops automatically and can be paused or replayed." : "This item has not passed the motion gate; only its repair or deferral reason is shown."}
        /></small>
      </div>
      <ProductFilmStage film={film}/>
    </section>
    <section className="demo-explain section-pad">
      <p className="section-index"><Lang zh={architecture ? "四個核心閘門" : ready ? "三步看懂" : "目前處理閘門"} en={architecture ? "FOUR CORE GATES" : ready ? "UNDERSTAND IN THREE STEPS" : "CURRENT CONSTRUCTION GATE"}/></p>
      <div className="steps">{film.steps.map(step=><article key={step.key}><span>{step.key}</span><h2><Lang zh={step.zh} en={step.en}/></h2></article>)}</div>
      <div className="formula">{film.formula}</div>
      <div className="actions">
        {film.storeUrl && <a className="button primary" href={film.storeUrl} target="_blank" rel="noreferrer"><Lang zh="從 Microsoft Store 免費取得" en="GET FREE FROM MICROSOFT STORE" /> ↗</a>}
        {film.sourceRepo && <a className={`button ${film.storeUrl ? "ghost" : "primary"}`} href={film.sourceRepo} target="_blank" rel="noreferrer"><Lang zh="查看原始碼證據" en="OPEN SOURCE EVIDENCE"/> ↗</a>}
        <LocalizedLink className="button ghost" href="/products"><Lang zh="返回產品中心" en="BACK TO PRODUCTS"/></LocalizedLink>
      </div>
    </section>
    {film.slug === "scbkr" && <section className={topicStyles.topic} aria-labelledby="ai-responsibility-chain-title">
      <div className={topicStyles.inner}>
        <p className={topicStyles.eyebrow}>SCBKR / AI RESPONSIBILITY CHAIN</p>
        <h2 id="ai-responsibility-chain-title"><Lang zh="AI 責任鏈是什麼？" en="What is an AI responsibility chain?" /></h2>
        <p className={topicStyles.lead}><Lang
          zh="在許文耀提出的 SCBKR 架構中，AI 責任鏈不靠模型自行宣稱答案可信，而讓規則適用條件、來源證據與人類簽名各自留下可追溯的位置。公開的 2.3.1 FREE Windows 版可從 Microsoft Store 取得。"
          en="In Wen-Yao Hsu's SCBKR architecture, AI accountability is not a model declaring its own answer trustworthy. Rule applicability, source evidence and human signature each have a traceable place. The public 2.3.1 FREE Windows edition is available from Microsoft Store."
        /></p>
        <div className={topicStyles.grid}>
          <article><span>01 / ROUTE & DRAFT</span><h3><Lang zh="輸入先分類，模型只草擬" en="Route first; the model only drafts" /></h3><p><Lang zh="硬路由選擇處理路徑；已連線模型草擬 S／C／B／K／R，再由 Kernel Validator 檢查結構。草稿不是有效規則。" en="A hard router selects the path; a connected model drafts S/C/B/K/R for Kernel validation. A draft is not an active rule." /></p></article>
          <article><span>02 / APPLICABILITY</span><h3><Lang zh="有適用條件，規則才可命中" en="Rules need applicability conditions" /></h3><p><Lang zh="2.3.1 加入由使用者簽名的確定性觸發條件與適用狀態收據；相似檢索只召回候選，未定義觸發條件的舊規則不會自動啟用。" en="Version 2.3.1 adds user-signed deterministic triggers and applicability receipts. Similarity only retrieves candidates; legacy rules without trigger conditions do not activate automatically." /></p></article>
          <article><span>03 / RECHECK & SIGN</span><h3><Lang zh="確認時重查證據，由人簽名" en="Recheck evidence; human signs" /></h3><p><Lang zh="規則修改在確認時重查來源與證據；過期或不可追溯的草稿停止入庫。使用者確認並簽名後，才進入本地四庫與回放。" en="Rule revisions recheck sources and evidence at confirmation; stale or untraceable drafts stop before storage. Only user confirmation and signature allow local four-store compilation and replay." /></p></article>
        </div>
        <div className={topicStyles.boundary}><h3><Lang zh="公開證據與能力邊界" en="Public evidence and limits" /></h3><p><Lang zh="Microsoft Store 頁面證明應用已公開提供；GitHub 倉庫提供工程來源。這些連結不等於第三方安全認證、法遵保證或任何回答的事實正確性證明。官網的 SCBKR 動畫仍依站主指示暫緩。" en="The Microsoft Store listing shows that the app is publicly available, and the GitHub repository provides engineering source. Neither link proves third-party safety certification, legal compliance or the factual accuracy of any answer. The SCBKR website film remains deferred by the owner." /></p></div>
      </div>
    </section>}
  </main><SiteFooter/></>;
}
