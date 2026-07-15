import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findPublishedPost } from "@/db/news";
import { Lang } from "@/app/components/LanguageControl";
import { SiteHeader } from "@/app/components/SiteHeader";
import { SiteFooter } from "@/app/components/SiteFooter";
import { VideoEmbed } from "@/app/components/VideoEmbed";

export const dynamic = "force-dynamic";

async function getPost(slug: string) {
  try { return await findPublishedPost(slug); } catch { return null; }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return { title: "報導" };
  return { title: post.title_zh, description: post.summary_zh || post.title_zh, openGraph: { images: post.cover_url ? [post.cover_url] : [] } };
}

export default async function PublishedNewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = await getPost((await params).slug);
  if (!post) notFound();
  const zhParagraphs = post.body_zh.split(/\n\s*\n/).filter(Boolean);
  const enParagraphs = post.body_en.split(/\n\s*\n/).filter(Boolean);
  return <><SiteHeader /><main className="article-page published-article"><article>
    <p className="eyebrow">{post.category} · {post.published_at.slice(0, 10)}</p>
    <h1><Lang zh={post.title_zh} en={post.title_en || post.title_zh} /></h1>
    {(post.summary_zh || post.summary_en) && <p className="article-lead"><Lang zh={post.summary_zh} en={post.summary_en || post.summary_zh} /></p>}
    {post.cover_url && <img className="article-cover" src={post.cover_url} alt={post.title_zh} />}
    <VideoEmbed url={post.video_url} title={post.title_zh} />
    <hr />
    <div className="article-body lang-zh">{zhParagraphs.map((text, index) => <p key={index}>{text}</p>)}</div>
    <div className="article-body lang-en">{(enParagraphs.length ? enParagraphs : zhParagraphs).map((text, index) => <p key={index}>{text}</p>)}</div>
    <p className="article-sign">沈耀888π／許文耀<br/><span>沉靜流派工作室 · 國際實相新聞台</span></p>
  </article></main><SiteFooter /></>;
}
