import { NextResponse } from "next/server";
import {
  findPostCoverUrl,
  listAllPosts,
  removePost,
  savePost,
} from "@/db/news";
import { deleteManagedCoverIfUnreferenced } from "@/db/media";
import { getStudioOwner } from "@/app/studio-auth";
import {
  readStudioJson,
  studioCoverUrl,
  studioDate,
  studioError,
  studioId,
  StudioRequestError,
  studioSlug,
  studioText,
  studioVideoUrl,
} from "@/app/studio-guard";

export const dynamic = "force-dynamic";

const categories = new Set(["REPORT", "VIDEO", "SYSTEM", "MUSIC", "ANIMATION", "ANNOUNCEMENT"]);

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
    return privateJson({ posts: await listAllPosts(), owner: owner.email });
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
    const titleZh = studioText(data.title_zh, "中文標題", 180);
    if (!titleZh) throw new StudioRequestError("請填寫中文標題");
    const id = studioId(data.id);
    const slug = studioSlug(data.slug, "report");
    const status = data.status === "published" ? "published" : "draft";
    const summaryZh = studioText(data.summary_zh, "中文摘要", 1_200);
    const bodyZh = studioText(data.body_zh, "中文內文", 50_000);
    const videoUrl = studioVideoUrl(data.video_url);
    if (status === "published" && !summaryZh && !bodyZh && !videoUrl) {
      throw new StudioRequestError("發布前請填寫摘要、內文或影片網址");
    }
    const requestedCategory = studioText(data.category, "分類", 32).toUpperCase();
    const category = categories.has(requestedCategory) ? requestedCategory : "REPORT";
    const coverUrl = studioCoverUrl(data.cover_url);
    const previousCoverUrl = id ? await findPostCoverUrl(id) : "";
    const savedId = await savePost({
      id,
      slug,
      title_zh: titleZh,
      title_en: studioText(data.title_en, "英文標題", 180),
      summary_zh: summaryZh,
      summary_en: studioText(data.summary_en, "英文摘要", 1_200),
      body_zh: bodyZh,
      body_en: studioText(data.body_en, "英文內文", 50_000),
      category,
      cover_url: coverUrl,
      video_url: videoUrl,
      status,
      published_at: studioDate(data.published_at, "發布時間"),
      author_email: owner.email,
    });
    if (!savedId) return privateJson({ error: "找不到要更新的文章" }, 404);
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
    const previousCoverUrl = await findPostCoverUrl(id);
    const removed = await removePost(id);
    if (!removed) return privateJson({ error: "找不到要刪除的文章" }, 404);
    if (previousCoverUrl) {
      await deleteManagedCoverIfUnreferenced(previousCoverUrl);
    }
    return privateJson({ ok: true });
  } catch (error) {
    const issue = studioError(error);
    return privateJson({ error: issue.message }, issue.status);
  }
}
