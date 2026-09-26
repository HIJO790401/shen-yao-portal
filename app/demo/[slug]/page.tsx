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
    title: slug === "scbkr" ? "AI 責任鏈是什麼？｜SCBKR 責任鏈語言模型" : `${film.name}｜${film.presentation === "architecture" ? "候選架構動畫" : film.status === "ready" ? "固定案例 DEMO" : "展示狀態"}`,
    description: slug === "scbkr" ? "許文耀／沈耀888π 的 SCBKR 責任鏈語言模型：了解 AI 責任鏈的硬路由、模型草擬、核心驗證、使用者簽名與回放邊界。" : film.introZh,
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
          zh="在許文耀提出的 SCBKR 架構中，責任鏈不是模型自行宣稱答案可信，而是讓輸入、模型草稿、邊界檢查與人類確認各自留下可追溯的位置。公開的 2.3.0 FREE Windows 版本可從 Microsoft Store 取得。"
          en="In Wen-Yao Hsu's SCBKR architecture, a responsibility chain is not a model claiming its own answer is trustworthy. It gives the input, model draft, boundary validation and human confirmation distinct, traceable positions. The public 2.3.0 FREE Windows edition is available from Microsoft Store."
        /></p>
        <div className={topicStyles.grid}>
          <article><span>01 / ROUTE</span><h3><Lang zh="先分類輸入" en="Route the input first" /></h3><p><Lang zh="硬路由先辨識輸入類型，決定本次要進入哪一條處理路徑；並非所有文字都直接交由模型定論。" en="A hard router classifies the input and selects the processing path; not every text becomes a final model judgment." /></p></article>
          <article><span>02 / VALIDATE</span><h3><Lang zh="草擬與驗證分開" en="Separate drafting from validation" /></h3><p><Lang zh="已連線模型草擬 S／C／B／K／R；Kernel Validator 檢查結構。模型草稿不等於站主或使用者的最終簽名。" en="The connected model drafts S/C/B/K/R; Kernel Validator checks the structure. A model draft is not the owner's or user's final signature." /></p></article>
          <article><span>03 / SIGN & REPLAY</span><h3><Lang zh="由人確認，保留回放" en="Human confirmation and replay" /></h3><p><Lang zh="使用者能修改與簽名；確認後才進入四庫與回放。產品設計將最終責任保留給實際簽名的人。" en="The user can edit and sign. Only after confirmation does the record enter the four stores and replay path. Final responsibility remains with the person who signs." /></p></article>
        </div>
        <div className={topicStyles.boundary}><h3><Lang zh="公開證據與能力邊界" en="Public evidence and limits" /></h3><p><Lang zh="Microsoft Store 頁面證明應用已公開提供；GitHub 倉庫提供工程來源。這些連結不等於第三方安全認證、法遵保證或任何回答的事實正確性證明。官網的 SCBKR 動畫仍依站主指示暫緩。" en="The Microsoft Store listing shows that the app is publicly available, and the GitHub repository provides engineering source. Neither link proves third-party safety certification, legal compliance or the factual accuracy of any answer. The SCBKR website film remains deferred by the owner." /></p></div>
      </div>
    </section>}
  </main><SiteFooter/></>;
}
