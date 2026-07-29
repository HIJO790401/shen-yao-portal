import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductFilmStage } from "@/app/components/ProductFilmStage";
import { Lang, LocalizedLink } from "@/app/components/LanguageControl";
import { SiteHeader } from "@/app/components/SiteHeader";
import { SiteFooter } from "@/app/components/SiteFooter";
import { findFilm, productFilms } from "@/app/showcase-data";
import { localizedAlternates } from "@/app/site-config";

export function generateStaticParams() { return productFilms.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const slug = (await params).slug;
  const film = findFilm(slug);
  return film ? {
    title: `${film.name}｜${film.status === "ready" ? "固定案例 DEMO" : "展示狀態"}`,
    description: film.introZh,
    alternates: localizedAlternates("zh", `/demo/${slug}`),
    openGraph: { url: `/zh/demo/${slug}` },
  } : {};
}

export default async function ProductFilmPage({ params }: { params: Promise<{ slug: string }> }) {
  const film = findFilm((await params).slug);
  if (!film) notFound();
  const ready = film.status === "ready";
  return <><SiteHeader/><main className="subpage demo-page">
    <section className="demo-hero film-hero">
      <div>
        <p className="eyebrow"><span>PRODUCT FILM {film.index}</span> {film.label}</p>
        <h1><Lang zh={film.headlineZh} en={film.headlineEn}/></h1>
        <p><Lang zh={film.introZh} en={film.introEn}/></p>
        <small className="autoplay-note"><Lang
          zh={ready ? "不用輸入資料。固定案例會自動循環，可在播放器內暫停或重播。" : "本項目尚未通過動畫資格；頁面只公開修復或暫緩原因。"}
          en={ready ? "No input required. The fixed case loops automatically and can be paused or replayed." : "This item has not passed the motion gate; only its repair or deferral reason is shown."}
        /></small>
      </div>
      <ProductFilmStage film={film}/>
    </section>
    <section className="demo-explain section-pad">
      <p className="section-index"><Lang zh={ready ? "三步看懂" : "目前處理閘門"} en={ready ? "UNDERSTAND IN THREE STEPS" : "CURRENT CONSTRUCTION GATE"}/></p>
      <div className="steps">{film.steps.map(step=><article key={step.key}><span>{step.key}</span><h2><Lang zh={step.zh} en={step.en}/></h2></article>)}</div>
      <div className="formula">{film.formula}</div>
      <div className="actions">
        <a className="button primary" href={film.sourceRepo} target="_blank" rel="noreferrer"><Lang zh="查看原始碼證據" en="OPEN SOURCE EVIDENCE"/> ↗</a>
        <LocalizedLink className="button ghost" href="/products"><Lang zh="返回產品中心" en="BACK TO PRODUCTS"/></LocalizedLink>
      </div>
    </section>
  </main><SiteFooter/></>;
}
