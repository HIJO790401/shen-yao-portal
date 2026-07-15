import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductFilmStage } from "@/app/components/ProductFilmStage";
import { Lang } from "@/app/components/LanguageControl";
import { SiteHeader } from "@/app/components/SiteHeader";
import { SiteFooter } from "@/app/components/SiteFooter";
import { findFilm, productFilms } from "@/app/showcase-data";

export function generateStaticParams() { return productFilms.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const film = findFilm((await params).slug);
  return film ? { title: `${film.name}｜動畫 DEMO`, description: film.introZh } : {};
}

export default async function ProductFilmPage({ params }: { params: Promise<{ slug: string }> }) {
  const film = findFilm((await params).slug);
  if (!film) notFound();
  return <><SiteHeader/><main className="subpage demo-page"><section className="demo-hero film-hero"><div><p className="eyebrow"><span>PRODUCT FILM {film.index}</span> {film.label}</p><h1><Lang zh={film.headlineZh} en={film.headlineEn}/></h1><p><Lang zh={film.introZh} en={film.introEn}/></p><small className="autoplay-note"><Lang zh="不用輸入任何資料，動畫會自動循環播放。" en="No input required. The film loops automatically."/></small></div><ProductFilmStage film={film}/></section><section className="demo-explain section-pad"><p className="section-index"><Lang zh="三步看懂" en="UNDERSTAND IN THREE STEPS"/></p><div className="steps">{film.steps.map(step=><article key={step.key}><span>{step.key}</span><h2><Lang zh={step.zh} en={step.en}/></h2></article>)}</div><div className="formula">{film.formula}</div><div className="actions"><Link className="button primary" href={`/demo/${film.slug}`}><Lang zh="重新播放動畫" en="REPLAY FILM"/> ↻</Link><Link className="button ghost" href="/products"><Lang zh="返回全部作品" en="BACK TO ALL WORKS"/></Link></div></section></main><SiteFooter/></>;
}
