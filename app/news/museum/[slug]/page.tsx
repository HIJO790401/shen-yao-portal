import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { findPublishedMuseumEntry } from "@/db/museum";
import { Lang, LocalizedLink } from "@/app/components/LanguageControl";
import { SiteHeader } from "@/app/components/SiteHeader";
import { SiteFooter } from "@/app/components/SiteFooter";
import { VideoEmbed } from "@/app/components/VideoEmbed";
import { archiveMuseumItems, splitArchiveParagraphs } from "@/app/newsroom-data";

export const dynamic = "force-dynamic";

type MuseumView = {
  slug: string;
  registryId: string;
  titleZh: string;
  titleEn: string;
  subtitleZh: string;
  subtitleEn: string;
  guideZh: string;
  guideEn: string;
  bodyZh: string;
  bodyEn: string;
  hallZh: string;
  hallEn: string;
  cover: string;
  video: string;
  verdictZh: string;
  verdictEn: string;
  repairZh: string;
  repairEn: string;
  evidenceUrl: string;
  occurredAt: string;
  source: "D1" | "ARCHIVE";
};

function archiveMuseumItem(slug: string) {
  return archiveMuseumItems.find((item) => item.slug === slug) ?? null;
}

async function getMuseumItem(slug: string): Promise<MuseumView | null> {
  const archived = archiveMuseumItem(slug);

  try {
    const published = await findPublishedMuseumEntry(slug);
    if (published) {
      return {
        slug: published.slug,
        registryId: published.registry_id || archived?.registryId || `D1-${published.id}`,
        titleZh: published.title_zh || archived?.titleZh || published.slug,
        titleEn: published.title_en || archived?.titleEn || published.title_zh || published.slug,
        subtitleZh: published.subtitle_zh || archived?.subtitleZh || published.summary_zh || "",
        subtitleEn: published.subtitle_en || archived?.subtitleEn || published.summary_en || published.subtitle_zh || archived?.subtitleZh || "",
        guideZh: published.guide_zh || archived?.guideZh || published.summary_zh || "",
        guideEn: published.guide_en || archived?.guideEn || published.summary_en || published.guide_zh || archived?.guideZh || "",
        bodyZh: published.body_zh || archived?.bodyZh || "",
        bodyEn: published.body_en || archived?.bodyEn || published.body_zh || archived?.bodyZh || "",
        hallZh: published.hall_zh || archived?.hallZh || published.category || "責任博物館",
        hallEn: published.hall_en || archived?.hallEn || published.category || "RESPONSIBILITY MUSEUM",
        cover: published.cover_url || archived?.cover || "",
        video: published.video_url || archived?.video || "",
        verdictZh: published.verdict_zh || "",
        verdictEn: published.verdict_en || published.verdict_zh || "",
        repairZh: published.repair_zh || "",
        repairEn: published.repair_en || published.repair_zh || "",
        evidenceUrl: published.evidence_url || "",
        occurredAt: published.occurred_at || "",
        source: "D1",
      };
    }
  } catch {
    // The original five accessions are a complete local fallback when D1 is
    // unavailable, so museum reading never depends on an external repository.
  }

  if (!archived) return null;
  return {
    ...archived,
    verdictZh: "館藏保留原始導覽、影片、正文、封面與具名最終承擔位。",
    verdictEn: "The accession preserves its original guide, video, body, cover and named final bearer.",
    repairZh: "後續修訂須保留版本差異與責任落點，不以無痕覆寫取代回放。",
    repairEn: "Future revisions must preserve version differences and responsibility rather than silently overwrite the record.",
    evidenceUrl: "",
    occurredAt: "",
    source: "ARCHIVE",
  };
}

export function generateStaticParams() {
  return archiveMuseumItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const item = await getMuseumItem((await params).slug);
  if (!item) return { title: "館藏不存在" };
  return {
    title: `${item.titleZh}｜責任博物館`,
    description: item.guideZh || item.subtitleZh || item.titleZh,
    openGraph: {
      title: item.titleZh,
      description: item.guideZh || item.subtitleZh || item.titleZh,
      images: item.cover ? [item.cover] : [],
    },
  };
}

export default async function MuseumDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const item = await getMuseumItem((await params).slug);
  if (!item) notFound();

  const zhParagraphs = splitArchiveParagraphs(item.bodyZh);
  const enParagraphs = splitArchiveParagraphs(item.bodyEn || item.bodyZh);

  return <>
    <SiteHeader />
    <main className="article-page museum-article">
      <article>
        <p className="eyebrow"><span>{item.registryId}</span> · <Lang zh={item.hallZh} en={item.hallEn} /> · {item.source}</p>
        <h1><Lang zh={item.titleZh} en={item.titleEn} /></h1>
        {(item.subtitleZh || item.subtitleEn) && <p className="article-lead"><Lang zh={item.subtitleZh} en={item.subtitleEn || item.subtitleZh} /></p>}

        <VideoEmbed url={item.video} title={item.titleZh} />

        <hr />
        <section aria-label="館藏正文">
          {(item.guideZh || item.guideEn) && <blockquote><Lang zh={item.guideZh} en={item.guideEn || item.guideZh} /></blockquote>}
          <div className="article-body lang-zh">{zhParagraphs.map((text, index) => <p key={index}>{text}</p>)}</div>
          <div className="article-body lang-en">{(enParagraphs.length ? enParagraphs : zhParagraphs).map((text, index) => <p key={index}>{text}</p>)}</div>
        </section>

        {item.cover && <figure>
          <Image
            className="article-cover"
            src={item.cover}
            alt={`${item.titleZh} 館藏封面`}
            width={1600}
            height={900}
            sizes="(max-width: 900px) 100vw, 860px"
            unoptimized={item.cover.startsWith("http")}
          />
          <figcaption><Lang zh={`館藏 ${item.registryId} 卷宗視覺`} en={`Accession dossier visual · ${item.registryId}`} /></figcaption>
        </figure>}

        <section aria-labelledby="museum-responsibility">
          <h2 id="museum-responsibility"><Lang zh="館藏責任與修復" en="ACCESSION RESPONSIBILITY & REPAIR" /></h2>
          <div className="formula">
            <Lang zh={item.verdictZh} en={item.verdictEn || item.verdictZh} />
          </div>
          <p><Lang zh={item.repairZh} en={item.repairEn || item.repairZh} /></p>
          {item.evidenceUrl && <p><a href={item.evidenceUrl} target="_blank" rel="noreferrer"><Lang zh="開啟館藏證據連結" en="OPEN ACCESSION EVIDENCE" /> ↗</a></p>}
          {item.occurredAt && <p><Lang zh="事件／入館日期" en="EVENT / ACCESSION DATE" />：{item.occurredAt.slice(0, 10)}</p>}
          <p className="article-sign">許文耀／沈耀888π<br /><span>責任博物館館主 · 最終發布與公共責任承擔者</span></p>
        </section>

        <LocalizedLink className="text-link" href="/news#museum"><Lang zh="返回新聞台與責任博物館" en="BACK TO NEWSROOM & MUSEUM" /><span>↗</span></LocalizedLink>
      </article>
    </main>
    <SiteFooter />
  </>;
}
