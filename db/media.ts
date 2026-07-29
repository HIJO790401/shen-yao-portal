import { env } from "cloudflare:workers";
import { managedCoverKeyFromUrl } from "@/app/studio-image";

export async function deleteManagedCoverIfUnreferenced(
  coverUrl: string,
): Promise<boolean> {
  const key = managedCoverKeyFromUrl(coverUrl);
  if (!key) return false;

  try {
    const runtime = env as unknown as {
      DB?: D1Database;
      MEDIA?: R2Bucket;
    };
    if (!runtime.DB || !runtime.MEDIA) return false;

    const reference = await runtime.DB.prepare(
      `SELECT 1 AS found
       FROM (
         SELECT cover_url FROM news_posts WHERE cover_url = ?
         UNION ALL
         SELECT cover_url FROM museum_entries WHERE cover_url = ?
       )
       LIMIT 1`,
    )
      .bind(coverUrl, coverUrl)
      .first<{ found: number }>();
    if (reference) return false;

    await runtime.MEDIA.delete(key);
    return true;
  } catch {
    // Cleanup must never turn a successful content save/delete into a failure.
    // Missing bindings/tables leave the object intact for later maintenance.
    return false;
  }
}
