import type { Metadata } from "next";
import { findPublishedPost } from "@/db/news";
import { archiveReports } from "@/app/newsroom-data";
import { localizedAlternates } from "@/app/site-config";

export { default, dynamic, generateStaticParams } from "../../../news/[slug]/page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale === "en" ? "en" : "zh";
  const archived = archiveReports.find((report) => report.slug === slug);

  let published: Awaited<ReturnType<typeof findPublishedPost>> = null;
  try {
    published = await findPublishedPost(slug);
  } catch {
    // The checked-in archive remains the metadata fallback before D1 is bound.
  }

  const titleZh = published?.title_zh || archived?.titleZh;
  const titleEn = published?.title_en || archived?.titleEn || titleZh;
  const summaryZh = published?.summary_zh || archived?.summaryZh || titleZh;
  const summaryEn = published?.summary_en || archived?.summaryEn || summaryZh;
  const cover = published?.cover_url || archived?.cover || "";
  if (!titleZh) {
    return {
      title: locale === "en" ? "Report not found" : "報導不存在",
      robots: { index: false, follow: false },
    };
  }

  const title = locale === "en" ? titleEn : titleZh;
  const description = (locale === "en" ? summaryEn : summaryZh) || title;
  const path = `/news/${slug}`;

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
