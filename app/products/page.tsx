import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { Lang } from "../components/LanguageControl";
import { products } from "../site-data";
import { productFilms } from "../showcase-data";

export const metadata: Metadata = { title: "產品與作品", description: "SCBKR、Semantic Firewall、TIRC、WIF 與沈耀888π的責任鏈系統作品。" };

const extended = productFilms.filter((film) => film.slug !== "scbkr");

export default function ProductsPage() {
  return <><SiteHeader/><main className="subpage"><section className="page-hero"><p className="eyebrow"><span>SYSTEM ARCHIVE</span> 01—14</p><h1><Lang zh={<>每個概念，都必須<br/><em>成為可見的系統。</em></>} en={<>EVERY CONCEPT MUST<br/><em>BECOME A VISIBLE SYSTEM.</em></>} /></h1><p><Lang zh="產品、實驗與版本歷程的官方入口。每個系統皆由沈耀888π／許文耀獨立設計與開發；所有 DEMO 均為不用輸入資料的自動動畫展示。" en="The official entrance to products, experiments and version history. Every system is independently designed and developed by Wen-Yao Hsu / Shen-Yao 888π. Every demo is an automatic product film with no data input." /></p></section>
    <section className="catalog section-pad"><p className="section-index"><Lang zh="核心系統" en="CORE SYSTEMS" /></p><div className="product-grid">{products.map((p,i)=><Link href={p.href} className={`product-card ${p.tone}`} key={p.slug}><div className="product-top"><span>{p.index}</span><small>{p.kind}</small></div><div className="mini-visual"><i/><i/><i/><b>{["Rπ","VOID","TIRC","WIF"][i]}</b></div><h2><Lang zh={p.title} en={p.en} /></h2><p><Lang zh={p.description} en={p.descriptionEn} /></p><div className="card-link"><Lang zh="觀看動畫 DEMO" en="WATCH MOTION DEMO" /> <span>↗</span></div></Link>)}</div></section>
    <section className="catalog extended section-pad"><div className="section-head compact"><div><p className="section-index"><Lang zh="全部延伸作品動畫" en="ALL EXTENDED PRODUCT FILMS" /></p><h2><Lang zh="每個作品都有自己的動畫邏輯。" en="Every work has its own motion logic." /></h2></div><p><Lang zh="不是跳回舊版 GitHub 頁面；全部在正式官網內以一致品質播放。" en="No return to old GitHub pages. Every film plays inside the official site at one quality standard." /></p></div><div className="archive-grid">{extended.map((film,index)=><Link href={`/demo/${film.slug}`} key={film.slug}><span>{String(index+5).padStart(2,"0")}</span><div><h2><Lang zh={film.name} en={film.nameEn}/></h2><p><Lang zh={film.introZh} en={film.introEn} /></p><small>{film.label}</small></div><b>↗</b></Link>)}</div></section>
  </main><SiteFooter/></>;
}
