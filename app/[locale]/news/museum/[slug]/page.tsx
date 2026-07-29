import type { Metadata } from "next";
import { findPublishedMuseumEntry } from "@/db/museum";
import { archiveMuseumItems } from "@/app/newsroom-data";
import { localizedAlternates } from "@/app/site-config";

export { default, dynamic, generateStaticParams } from "../../../../news/museum/[slug]/page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale === "en" ? "en" : "zh";
  const archived = archiveMuseumItems.find((item) => item.slug === slug);

  let published: Awaited<ReturnType<typeof findPublishedMuseumEntry>> = null;
  try {
    published = await findPublishedMuseumEntry(slug);
  } catch {
    // The checked-in accessions remain the metadata fallback before D1 is bound.
  }

  const titleZh = published?.title_zh || archived?.titleZh;
  const titleEn = published?.title_en || archived?.titleEn || titleZh;
  const descriptionZh =
    published?.guide_zh ||
    published?.subtitle_zh ||
    published?.summary_zh ||
    archived?.guideZh ||
    archived?.subtitleZh ||
    titleZh;
  const descriptionEn =
    published?.guide_en ||
    published?.subtitle_en ||
    published?.summary_en ||
    archived?.guideEn ||
    archived?.subtitleEn ||
    descriptionZh;
  const cover = published?.cover_url || archived?.cover || "";
  if (!titleZh) {
    return {
      title: locale === "en" ? "Accession not found" : "館藏不存在",
      robots: { index: false, follow: false },
    };
  }

  const title = locale === "en"
    ? `${titleEn} | Responsibility Museum`
    : `${titleZh}｜責任博物館`;
  const description = (locale === "en" ? descriptionEn : descriptionZh) || title;
  const path = `/news/museum/${slug}`;

  return {
    title,
    description,
    alternates: localizedAlternates(locale, path),
    openGraph: {
      url: `/${locale}${path}`,
      title,
      description,
      images: cover ? [cover] : [],
      locale: locale === "en" ? "en_US" : "zh_TW",
      alternateLocale: locale === "en" ? "zh_TW" : "en_US",
    },
  };
}
