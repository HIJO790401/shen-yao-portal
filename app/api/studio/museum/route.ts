import { NextResponse } from "next/server";
import {
  findMuseumCoverUrl,
  listAllMuseumEntries,
  removeMuseumEntry,
  saveMuseumEntry,
} from "@/db/museum";
import { deleteManagedCoverIfUnreferenced } from "@/db/media";
import { getStudioOwner } from "@/app/studio-auth";
import {
  readStudioJson,
  studioCoverUrl,
  studioDate,
  studioError,
  studioEvidenceUrl,
  studioId,
  StudioRequestError,
  studioSlug,
  studioText,
  studioVideoUrl,
} from "@/app/studio-guard";

export const dynamic = "force-dynamic";

const categories = new Set(["RESPONSIBILITY", "EVIDENCE", "VERSION", "REPAIR", "PUBLIC_RECORD"]);

function privateJson(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "cache-control": "private, no-store" },
  });
}

export async function GET() {
  const owner = await getStudioOwner();
  if (!owner) return privateJson({ error: "只有站主可以進入編輯台" }, 401);
  try {
    return privateJson({ entries: await listAllMuseumEntries(), owner: owner.email });
  } catch (error) {
    const issue = studioError(error);
    return privateJson({ error: issue.message }, issue.status);
  }
}

export async function POST(request: Request) {
  const owner = await getStudioOwner();
  if (!owner) return privateJson({ error: "請先用站主帳號登入" }, 401);
  try {
    const data = await readStudioJson(request);
    const titleZh = studioText(data.title_zh, "中文館藏標題", 180);
    if (!titleZh) throw new StudioRequestError("請填寫中文館藏標題");
    const id = studioId(data.id);
    const slug = studioSlug(data.slug, "archive");
    const status = data.status === "published" ? "published" : "draft";
    const guideZh = studioText(data.guide_zh, "中文導覽", 5_000);
    const bodyZh = studioText(data.body_zh, "中文內文", 50_000);
    const videoUrl = studioVideoUrl(data.video_url);
    if (status === "published" && !guideZh && !bodyZh && !videoUrl) {
      throw new StudioRequestError("發布前請填寫導覽、內文或 YouTube 影片網址");
    }
    const requestedCategory = studioText(data.category, "分類", 32).toUpperCase();
    const category = categories.has(requestedCategory) ? requestedCategory : "RESPONSIBILITY";
    const coverUrl = studioCoverUrl(data.cover_url);
    const previousCoverUrl = id ? await findMuseumCoverUrl(id) : "";
    const savedId = await saveMuseumEntry({
      id,
      slug,
      registry_id: studioText(data.registry_id, "館藏編號", 96),
      title_zh: titleZh,
      title_en: studioText(data.title_en, "英文館藏標題", 180),
      subtitle_zh: studioText(data.subtitle_zh, "中文副標題", 500),
      subtitle_en: studioText(data.subtitle_en, "英文副標題", 500),
      guide_zh: guideZh,
      guide_en: studioText(data.guide_en, "英文導覽", 5_000),
      summary_zh: studioText(data.summary_zh, "中文摘要", 1_200),
      summary_en: studioText(data.summary_en, "英文摘要", 1_200),
      body_zh: bodyZh,
      body_en: studioText(data.body_en, "英文內文", 50_000),
      hall_zh: studioText(data.hall_zh, "中文館別", 120),
      hall_en: studioText(data.hall_en, "英文館別", 120),
      verdict_zh: studioText(data.verdict_zh, "中文判詞", 5_000),
      verdict_en: studioText(data.verdict_en, "英文判詞", 5_000),
      repair_zh: studioText(data.repair_zh, "中文修復紀錄", 5_000),
      repair_en: studioText(data.repair_en, "英文修復紀錄", 5_000),
      evidence_url: studioEvidenceUrl(data.evidence_url),
      cover_url: coverUrl,
      video_url: videoUrl,
      category,
      status,
      occurred_at: studioDate(data.occurred_at, "事件時間"),
      author_email: owner.email,
    });
    if (!savedId) return privateJson({ error: "找不到要更新的館藏" }, 404);
    if (previousCoverUrl && previousCoverUrl !== coverUrl) {
      await deleteManagedCoverIfUnreferenced(previousCoverUrl);
    }
    return privateJson({ ok: true, id: savedId, slug });
  } catch (error) {
    const issue = studioError(error);
    return privateJson({ error: issue.message }, issue.status);
  }
}

export async function DELETE(request: Request) {
  const owner = await getStudioOwner();
  if (!owner) return privateJson({ error: "請先登入" }, 401);
  try {
    const data = await readStudioJson(request);
    const id = studioId(data.id, true);
    const previousCoverUrl = await findMuseumCoverUrl(id);
    const removed = await removeMuseumEntry(id);
    if (!removed) return privateJson({ error: "找不到要刪除的館藏" }, 404);
    if (previousCoverUrl) {
      await deleteManagedCoverIfUnreferenced(previousCoverUrl);
    }
    return privateJson({ ok: true });
  } catch (error) {
    const issue = studioError(error);
    return privateJson({ error: issue.message }, issue.status);
  }
}
