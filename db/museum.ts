import { env } from "cloudflare:workers";

/**
 * Responsibility Museum record.
 *
 * The first group of fields mirrors the original standalone museum CMS so the
 * archive can move into the official site without losing its registry, guide,
 * hall, body or video structure. Verdict / repair / evidence are additive
 * official-site fields and do not overwrite the original material.
 */
export type MuseumEntry = {
  id: number;
  slug: string;
  registry_id: string;
  title_zh: string;
  title_en: string;
  subtitle_zh: string;
  subtitle_en: string;
  guide_zh: string;
  guide_en: string;
  summary_zh: string;
  summary_en: string;
  body_zh: string;
  body_en: string;
  hall_zh: string;
  hall_en: string;
  verdict_zh: string;
  verdict_en: string;
  repair_zh: string;
  repair_en: string;
  evidence_url: string;
  cover_url: string;
  video_url: string;
  category: string;
  status: "draft" | "published";
  occurred_at: string;
  updated_at: string;
  author_email: string;
};

const createTableSql = `CREATE TABLE IF NOT EXISTS museum_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  registry_id TEXT NOT NULL DEFAULT '',
  title_zh TEXT NOT NULL,
  title_en TEXT NOT NULL DEFAULT '',
  subtitle_zh TEXT NOT NULL DEFAULT '',
  subtitle_en TEXT NOT NULL DEFAULT '',
  guide_zh TEXT NOT NULL DEFAULT '',
  guide_en TEXT NOT NULL DEFAULT '',
  summary_zh TEXT NOT NULL DEFAULT '',
  summary_en TEXT NOT NULL DEFAULT '',
  body_zh TEXT NOT NULL DEFAULT '',
  body_en TEXT NOT NULL DEFAULT '',
  hall_zh TEXT NOT NULL DEFAULT '',
  hall_en TEXT NOT NULL DEFAULT '',
  verdict_zh TEXT NOT NULL DEFAULT '',
  verdict_en TEXT NOT NULL DEFAULT '',
  repair_zh TEXT NOT NULL DEFAULT '',
  repair_en TEXT NOT NULL DEFAULT '',
  evidence_url TEXT NOT NULL DEFAULT '',
  cover_url TEXT NOT NULL DEFAULT '',
  video_url TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'RESPONSIBILITY',
  status TEXT NOT NULL DEFAULT 'draft',
  occurred_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  author_email TEXT NOT NULL
)`;

const createIndexSql = "CREATE INDEX IF NOT EXISTS museum_entries_status_date_idx ON museum_entries (status, occurred_at DESC)";

const additiveColumns: Record<string, string> = {
  registry_id: "TEXT NOT NULL DEFAULT ''",
  subtitle_zh: "TEXT NOT NULL DEFAULT ''",
  subtitle_en: "TEXT NOT NULL DEFAULT ''",
  guide_zh: "TEXT NOT NULL DEFAULT ''",
  guide_en: "TEXT NOT NULL DEFAULT ''",
  body_zh: "TEXT NOT NULL DEFAULT ''",
  body_en: "TEXT NOT NULL DEFAULT ''",
  hall_zh: "TEXT NOT NULL DEFAULT ''",
  hall_en: "TEXT NOT NULL DEFAULT ''",
  video_url: "TEXT NOT NULL DEFAULT ''",
};

async function database() {
  const runtime = env as unknown as { DB: D1Database };
  if (!runtime.DB) throw new Error("責任博物館資料庫尚未連接");
  await runtime.DB.prepare(createTableSql).run();

  // Older local previews may already have the first simplified table. Keep it
  // and add only the original CMS fields that are missing.
  const tableInfo = await runtime.DB.prepare("PRAGMA table_info(museum_entries)").all<{ name: string }>();
  const existing = new Set(tableInfo.results.map((column) => column.name));
  const upgrades = Object.entries(additiveColumns)
    .filter(([name]) => !existing.has(name))
    .map(([name, definition]) => runtime.DB.prepare(`ALTER TABLE museum_entries ADD COLUMN ${name} ${definition}`));
  if (upgrades.length) await runtime.DB.batch(upgrades);
  await runtime.DB.prepare(createIndexSql).run();
  return runtime.DB;
}

export async function listPublishedMuseumEntries(): Promise<MuseumEntry[]> {
  const db = await database();
  const result = await db.prepare("SELECT * FROM museum_entries WHERE status = 'published' ORDER BY occurred_at DESC").all<MuseumEntry>();
  return result.results;
}

export async function listAllMuseumEntries(): Promise<MuseumEntry[]> {
  const db = await database();
  const result = await db.prepare("SELECT * FROM museum_entries ORDER BY updated_at DESC").all<MuseumEntry>();
  return result.results;
}

export async function findPublishedMuseumEntry(slug: string): Promise<MuseumEntry | null> {
  const db = await database();
  return db.prepare("SELECT * FROM museum_entries WHERE slug = ? AND status = 'published' LIMIT 1").bind(slug).first<MuseumEntry>();
}

const writableColumns = [
  "slug", "registry_id", "title_zh", "title_en", "subtitle_zh", "subtitle_en",
  "guide_zh", "guide_en", "summary_zh", "summary_en", "body_zh", "body_en",
  "hall_zh", "hall_en", "verdict_zh", "verdict_en", "repair_zh", "repair_en",
  "evidence_url", "cover_url", "video_url", "category", "status", "occurred_at",
  "updated_at", "author_email",
] as const;

export async function saveMuseumEntry(input: Omit<MuseumEntry, "id" | "updated_at"> & { id?: number }) {
  const db = await database();
  const now = new Date().toISOString();
  const values = writableColumns.map((column) => {
    if (column === "updated_at") return now;
    return input[column as keyof typeof input] ?? "";
  });

  if (input.id) {
    const assignments = writableColumns.map((column) => `${column}=?`).join(",");
    const result = await db.prepare(`UPDATE museum_entries SET ${assignments} WHERE id=?`).bind(...values, input.id).run();
    return result.meta.changes > 0 ? input.id : null;
  }

  const placeholders = writableColumns.map(() => "?").join(",");
  const result = await db.prepare(`INSERT INTO museum_entries (${writableColumns.join(",")}) VALUES (${placeholders})`).bind(...values).run();
  return Number(result.meta.last_row_id);
}

export async function removeMuseumEntry(id: number) {
  const db = await database();
  const result = await db.prepare("DELETE FROM museum_entries WHERE id = ?").bind(id).run();
  return result.meta.changes > 0;
}
