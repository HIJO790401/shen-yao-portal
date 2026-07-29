import type { MetadataRoute } from "next";
import { listPublishedMuseumEntries } from "@/db/museum";
import { listPublishedPosts } from "@/db/news";
import { archiveMuseumItems, archiveReports } from "./newsroom-data";
import { productFilms } from "./showcase-data";
import { siteOrigin } from "./site-config";

const updated = new Date("2026-07-28T00:00:00+08:00");

type SitemapEntry = MetadataRoute.Sitemap[number];
type ChangeFrequency = NonNullable<SitemapEntry["changeFrequency"]>;
type RouteSpec = {
  path: string;
  lastModified: Date;
  changeFrequency: ChangeFrequency;
  priority: number;
};

export const dynamic = "force-dynamic";

function safeDate(value?: string) {
  if (!value) return updated;
  const parsed = new Date(value);
  return Number.isNaN(parsed.valueOf()) ? updated : parsed;
}

function isPublicSlug(value: string) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

function routeSpec(
  path: string,
  lastModified = updated,
  changeFrequency: ChangeFrequency = "monthly",
  priority = 0.82,
): RouteSpec {
  return { path, lastModified, changeFrequency, priority };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = new Map<string, RouteSpec>();
  const add = (entry: RouteSpec) => routes.set(entry.path, entry);

  add(routeSpec("", updated, "monthly", 1));
  for (const path of ["/products", "/works", "/news", "/about", "/resume"]) {
    add(routeSpec(path));
  }
  for (const { slug } of productFilms) {
    if (isPublicSlug(slug)) add(routeSpec(`/demo/${slug}`, updated, "monthly", 0.72));
  }
  for (const report of archiveReports) {
    if (isPublicSlug(report.slug)) {
      add(routeSpec(`/news/${report.slug}`, safeDate(report.date), "weekly"));
    }
  }
  for (const item of archiveMuseumItems) {
    if (isPublicSlug(item.slug)) {
      add(routeSpec(`/news/museum/${item.slug}`, updated, "weekly"));
    }
  }

  try {
    for (const post of await listPublishedPosts()) {
      if (isPublicSlug(post.slug)) {
        add(routeSpec(
          `/news/${post.slug}`,
          safeDate(post.updated_at || post.published_at),
          "weekly",
        ));
      }
    }
  } catch {
    // Local builds and cold-start recovery retain the complete archive sitemap.
  }

  try {
    for (const item of await listPublishedMuseumEntries()) {
      if (isPublicSlug(item.slug)) {
        add(routeSpec(
          `/news/museum/${item.slug}`,
          safeDate(item.updated_at || item.occurred_at),
          "weekly",
        ));
      }
    }
  } catch {
    // Local builds and cold-start recovery retain the complete archive sitemap.
  }

  return (["zh", "en"] as const).flatMap((locale) =>
    [...routes.values()].map(({ path, ...entry }) => ({
      url: `${siteOrigin}/${locale}${path}`,
      ...entry,
      alternates: {
        languages: {
          "zh-Hant": `${siteOrigin}/zh${path}`,
          en: `${siteOrigin}/en${path}`,
          "x-default": `${siteOrigin}/zh${path}`,
        },
      },
    })),
  );
}
