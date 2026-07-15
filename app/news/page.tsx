import type { Metadata } from "next";
import Image from "next/image";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { Lang } from "../components/LanguageControl";
import { newsItems } from "../site-data";
import { listPublishedPosts } from "@/db/news";

export const metadata: Metadata = { title: "國際實相新聞台", description: "沈耀國際實相新聞台：報導、責任、證據與長期回放的公共界面。" };

const anchors = [
  { image: "/media/anchor-yao.jpg", nameZh: "耀", nameEn: "Yao", roleZh: "主核／總編／館主", roleEn: "Core Axis / Editor-in-Chief / Chief Curator" },
  { image: "/media/anchor-an.jpg", nameZh: "暗", nameEn: "An", roleZh: "黑盾主播／黑盾總審", roleEn: "Black-Shield Anchor / Chief Reviewer" },
  { image: "/media/anchor-yan.jpg", nameZh: "眼", nameEn: "Yan", roleZh: "拆幻評論主播／破幻解說員", roleEn: "Illusion-Dissection Commentator" },
  { image: "/media/anchor-pan.jpg", nameZh: "判", nameEn: "Pan", roleZh: "終局裁決主播／終審落印", roleEn: "Final Adjudication Anchor" },
];

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  let studioPosts = [] as Awaited<ReturnType<typeof listPublishedPosts>>;
  try { studioPosts = await listPublishedPosts(); } catch {}
  const dynamicItems = studioPosts.map((post) => ({ date: post.published_at.slice(0,10).replaceAll("-", "."), category: post.category, title: post.title_zh, en: post.title_en || post.title_zh, excerpt: post.summary_zh, excerptEn: post.summary_en || post.summary_zh, href: `/news/${post.slug}` }));
  const allNews = [...dynamicItems, ...newsItems];
  const lead = allNews[0];
  return <><SiteHeader/><main className="subpage newsroom">
  <section className="page-hero news-hero"><p className="eyebrow"><span>INTERNATIONAL REALITY NEWS</span> RESPONSIBILITY MUSEUM</p><h1><Lang zh={<>報導不是流量。<br/><em>報導是一條責任鏈。</em></>} en={<>Reporting is not traffic.<br/><em>Reporting is a responsibility chain.</em></>} /></h1><p><Lang zh="沈耀國際實相新聞台 × 責任博物館" en="Shen-Yao International Reality News Network × Responsibility Museum" /></p></section>
  <section className="news-lead section-pad"><div><p className="section-index"><Lang zh="最新報導" en="LATEST REPORT" /></p><h2><Lang zh={lead.title} en={lead.en} /></h2><p><Lang zh={lead.excerpt} en={lead.excerptEn} /></p><a className="button primary" href={lead.href}><Lang zh="閱讀報導" en="READ REPORT" /> ↗</a></div><div className="broadcast-card"><span>SY / LIVE</span><b>REALITY<br/>NEWS<br/>NETWORK</b><i><Lang zh="責任・證據・回放" en="RESPONSIBILITY · EVIDENCE · REPLAY" /></i></div></section>
  <section className="anchor-registry section-pad"><div className="section-head"><div><p className="section-index"><Lang zh="新聞台職能" en="NEWSROOM AXES" /></p><h2><Lang zh={<>十四軸，不是角色牆。<br/>是新聞責任的分工。</>} en={<>Fourteen axes, not a character wall.<br/>A division of newsroom responsibility.</>} /></h2></div><p><Lang zh="族人依職能播報、審計、保存、回放與裁定；最終實體發布、法律與公共責任由沈耀888π／許文耀承擔。" en="The axes report, audit, preserve, replay and adjudicate by function. Final physical publication, legal and public responsibility belongs to Shen-Yao 888π / Wen-Yao Hsu." /></p></div><div className="anchor-grid">{anchors.map(anchor=><article className="anchor-card" key={anchor.nameEn}><div><Image src={anchor.image} alt={`${anchor.nameZh} / ${anchor.nameEn}`} fill sizes="(max-width:700px) 50vw, 22vw" /></div><span>{anchor.nameZh}</span><h3><Lang zh={anchor.roleZh} en={anchor.roleEn} /></h3><small>{anchor.nameEn}</small></article>)}</div><a className="text-link" href="https://hijo790401.github.io/shen-yao-reality-news-responsibility-museum/anchors.html"><Lang zh="查看完整十四軸職能名錄" en="VIEW THE COMPLETE FOURTEEN-AXIS REGISTRY" /> <span>↗</span></a></section>
  <section className="section-pad"><div className="section-head compact"><div><p className="section-index"><Lang zh="全部報導" en="ALL REPORTS" /></p></div><p><Lang zh="站主可從編輯台發布文章與 YouTube 影片。" en="The owner publishes reports and YouTube videos from the studio console." /></p></div><div className="news-list">{allNews.map(item=><a href={item.href} className="news-row" key={`${item.href}-${item.title}`}><div><span>{item.date}</span><b>{item.category}</b></div><h3><Lang zh={item.title} en={item.en} /></h3><p><Lang zh={item.excerpt} en={item.excerptEn} /></p><i>↗</i></a>)}</div></section>
  <section className="museum-band section-pad"><p className="section-index">RESPONSIBILITY MUSEUM</p><h2><Lang zh={<>把事件留下來，<br/>讓責任能被重新看見。</>} en={<>Preserve the event.<br/>Make responsibility visible again.</>} /></h2><p><Lang zh="版本、判詞、證據、時間戳與修復紀錄在此形成可長期回放的公共館藏。" en="Versions, verdicts, evidence, timestamps and repair records become a replayable public archive." /></p><a className="button ghost" href="https://hijo790401.github.io/shen-yao-reality-news-responsibility-museum/"><Lang zh="進入責任博物館" en="ENTER RESPONSIBILITY MUSEUM" /> ↗</a></section>
</main><SiteFooter/></> }
