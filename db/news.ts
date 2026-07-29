import { env } from "cloudflare:workers";

export type NewsPost = {
  id: number;
  slug: string;
  title_zh: string;
  title_en: string;
  summary_zh: string;
  summary_en: string;
  body_zh: string;
  body_en: string;
  category: string;
  cover_url: string;
  video_url: string;
  status: "draft" | "published";
  published_at: string;
  updated_at: string;
  author_email: string;
};

const createTableSql = `CREATE TABLE IF NOT EXISTS news_posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  title_zh TEXT NOT NULL,
  title_en TEXT NOT NULL DEFAULT '',
  summary_zh TEXT NOT NULL DEFAULT '',
  summary_en TEXT NOT NULL DEFAULT '',
  body_zh TEXT NOT NULL DEFAULT '',
  body_en TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'REPORT',
  cover_url TEXT NOT NULL DEFAULT '',
  video_url TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'draft',
  published_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  author_email TEXT NOT NULL
)`;

const createIndexSql = "CREATE INDEX IF NOT EXISTS news_posts_status_date_idx ON news_posts (status, published_at DESC)";

let databaseReady: Promise<D1Database> | null = null;

async function database() {
  if (!databaseReady) databaseReady = initializeDatabase();
  try {
    return await databaseReady;
  } catch (error) {
    databaseReady = null;
    throw error;
  }
}

async function initializeDatabase() {
  const runtime = env as unknown as { DB: D1Database };
  if (!runtime.DB) throw new Error("新聞資料庫尚未連接");
  await runtime.DB.batch([
    runtime.DB.prepare(createTableSql),
    runtime.DB.prepare(createIndexSql),
  ]);
  return runtime.DB;
}

export async function listPublishedPosts(): Promise<NewsPost[]> {
  const db = await database();
  const result = await db.prepare("SELECT * FROM news_posts WHERE status = 'published' ORDER BY published_at DESC").all<NewsPost>();
  return result.results;
}

export async function listAllPosts(): Promise<NewsPost[]> {
  const db = await database();
  const result = await db.prepare("SELECT * FROM news_posts ORDER BY updated_at DESC").all<NewsPost>();
  return result.results;
}

export async function findPublishedPost(slug: string): Promise<NewsPost | null> {
  const db = await database();
  return db.prepare("SELECT * FROM news_posts WHERE slug = ? AND status = 'published' LIMIT 1").bind(slug).first<NewsPost>();
}

export async function savePost(input: Omit<NewsPost, "id" | "updated_at"> & { id?: number }) {
  const db = await database();
  const now = new Date().toISOString();
  if (input.id) {
    const result = await db.prepare(`UPDATE news_posts SET slug=?, title_zh=?, title_en=?, summary_zh=?, summary_en=?, body_zh=?, body_en=?, category=?, cover_url=?, video_url=?, status=?, published_at=?, updated_at=?, author_email=? WHERE id=?`).bind(
      input.slug, input.title_zh, input.title_en, input.summary_zh, input.summary_en, input.body_zh, input.body_en, input.category, input.cover_url, input.video_url, input.status, input.published_at, now, input.author_email, input.id,
    ).run();
    return result.meta.changes > 0 ? input.id : null;
  }
  const result = await db.prepare(`INSERT INTO news_posts (slug,title_zh,title_en,summary_zh,summary_en,body_zh,body_en,category,cover_url,video_url,status,published_at,updated_at,author_email) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`).bind(
    input.slug, input.title_zh, input.title_en, input.summary_zh, input.summary_en, input.body_zh, input.body_en, input.category, input.cover_url, input.video_url, input.status, input.published_at, now, input.author_email,
  ).run();
  return Number(result.meta.last_row_id);
}

export async function findPostCoverUrl(id: number): Promise<string> {
  const db = await database();
  const row = await db
    .prepare("SELECT cover_url FROM news_posts WHERE id = ? LIMIT 1")
    .bind(id)
    .first<{ cover_url: string }>();
  return row?.cover_url ?? "";
}

export async function removePost(id: number) {
  const db = await database();
  const result = await db.prepare("DELETE FROM news_posts WHERE id = ?").bind(id).run();
  return result.meta.changes > 0;
}
