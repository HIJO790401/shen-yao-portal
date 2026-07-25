import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { findPublishedPost } from "@/db/news";
import { Lang, LocalizedLink } from "@/app/components/LanguageControl";
import { SiteHeader } from "@/app/components/SiteHeader";
import { SiteFooter } from "@/app/components/SiteFooter";
import { VideoEmbed } from "@/app/components/VideoEmbed";
import { archiveReports, splitArchiveParagraphs } from "@/app/newsroom-data";

export const dynamic = "force-dynamic";

type ReportView = {
  slug: string;
  titleZh: string;
  titleEn: string;
  summaryZh: string;
  summaryEn: string;
  bodyZh: string;
  bodyEn: string;
  category: string;
  date: string;
  cover: string;
  video: string;
  source: "D1" | "ARCHIVE";
};

function archiveReport(slug: string) {
  return archiveReports.find((report) => report.slug === slug) ?? null;
}

async function getReport(slug: string): Promise<ReportView | null> {
  const archived = archiveReport(slug);

  try {
    const published = await findPublishedPost(slug);
    if (published) {
      return {
        slug: published.slug,
        titleZh: published.title_zh || archived?.titleZh || published.slug,
        titleEn: published.title_en || archived?.titleEn || published.title_zh || published.slug,
        summaryZh: published.summary_zh || archived?.summaryZh || "",
        summaryEn: published.summary_en || archived?.summaryEn || published.summary_zh || archived?.summaryZh || "",
        bodyZh: published.body_zh || archived?.bodyZh || "",
        bodyEn: published.body_en || archived?.bodyEn || published.body_zh || archived?.bodyZh || "",
        category: published.category || archived?.category || "REPORT",
        date: published.published_at || archived?.date || "",
        cover: published.cover_url || archived?.cover || "",
        video: published.video_url || archived?.video || "",
        source: "D1",
      };
    }
  } catch {
    // D1 is optional during local preview and cold-start recovery. The complete
    // original archive remains readable without a database connection.
  }

  if (!archived) return null;
  return { ...archived, source: "ARCHIVE" };
}

export function generateStaticParams() {
  return archiveReports.map((report) => ({ slug: report.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const report = await getReport((await params).slug);
  if (!report) return { title: "報導不存在" };
  return {
    title: report.titleZh,
    description: report.summaryZh || report.titleZh,
    openGraph: {
      title: report.titleZh,
      description: report.summaryZh || report.titleZh,
      images: report.cover ? [report.cover] : [],
    },
  };
}

export default async function PublishedNewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const report = await getReport((await params).slug);
  if (!report) notFound();

  const zhParagraphs = splitArchiveParagraphs(report.bodyZh);
  const enParagraphs = splitArchiveParagraphs(report.bodyEn || report.bodyZh);
  const date = report.date ? report.date.slice(0, 10) : "PUBLIC RECORD";

  return <>
    <SiteHeader />
    <main className="article-page published-article">
      <article>
        <p className="eyebrow"><span>{report.source}</span> · {report.category} · {date}</p>
        <h1><Lang zh={report.titleZh} en={report.titleEn} /></h1>
        {(report.summaryZh || report.summaryEn) && <p className="article-lead"><Lang zh={report.summaryZh} en={report.summaryEn || report.summaryZh} /></p>}

        <VideoEmbed url={report.video} title={report.titleZh} />

        <hr />
        <section aria-label="報導正文">
          <div className="article-body lang-zh">{zhParagraphs.map((text, index) => <p key={index}>{text}</p>)}</div>
          <div className="article-body lang-en">{(enParagraphs.length ? enParagraphs : zhParagraphs).map((text, index) => <p key={index}>{text}</p>)}</div>
        </section>

        {report.cover && <figure>
          <Image
            className="article-cover"
            src={report.cover}
            alt={`${report.titleZh} 報導封面`}
            width={1600}
            unoptimized
            height={900}
            sizes="(max-width: 900px) 100vw, 860px"
          />
          <figcaption><Lang zh="原新聞台報導封面／發布卷宗視覺" en="Original newsroom cover / publication dossier visual" /></figcaption>
        </figure>}

        <section aria-labelledby="report-responsibility">
          <h2 id="report-responsibility"><Lang zh="責任收束" en="RESPONSIBILITY CLOSING" /></h2>
          <p><Lang
            zh="本頁保留原新聞台報導的影片、正文與封面。D1 編輯台可發布同一 slug 的新版內容；資料庫不可用時，原始卷宗仍會完整回放。所有對外定稿、修復與最終公共責任回到許文耀／沈耀888π。"
            en="This page preserves the original newsroom video, body and cover. A published D1 record may replace the same slug; if the database is unavailable, the complete archive remains replayable. Final publication, repair and public responsibility return to Wen-Yao Hsu / Shen-Yao 888π."
          /></p>
          <p className="article-sign">許文耀／沈耀888π<br /><span>沉靜流派工作室 · 沈耀國際實相新聞台</span></p>
        </section>

        <LocalizedLink className="text-link" href="/news#reports"><Lang zh="返回新聞台與責任博物館" en="BACK TO NEWSROOM & MUSEUM" /><span>↗</span></LocalizedLink>
      </article>
    </main>
    <SiteFooter />
  </>;
}
