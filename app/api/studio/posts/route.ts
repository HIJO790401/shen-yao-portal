import { NextResponse } from "next/server";
import { listAllPosts, removePost, savePost } from "@/db/news";
import { getStudioOwner } from "@/app/studio-auth";
import {
  assertStudioWriteRequest,
  studioCoverUrl,
  studioDate,
  studioError,
  StudioRequestError,
  studioSlug,
  studioText,
  studioVideoUrl,
} from "@/app/studio-guard";

export const dynamic = "force-dynamic";

const categories = new Set(["REPORT", "VIDEO", "SYSTEM", "MUSIC", "ANIMATION", "ANNOUNCEMENT"]);

export async function GET() {
  const owner = await getStudioOwner();
  if (!owner) return NextResponse.json({ error: "只有站主可以進入編輯台" }, { status: 401 });
  return NextResponse.json({ posts: await listAllPosts(), owner: owner.email });
}

export async function POST(request: Request) {
  const owner = await getStudioOwner();
  if (!owner) return NextResponse.json({ error: "請先用站主帳號登入" }, { status: 401 });
  try {
    assertStudioWriteRequest(request);
    const data = await request.json() as Record<string, unknown>;
    const titleZh = studioText(data.title_zh, "中文標題", 180);
    if (!titleZh) throw new StudioRequestError("請填寫中文標題");
    const id = Number(data.id || 0) || undefined;
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
      cover_url: studioCoverUrl(data.cover_url),
      video_url: videoUrl,
      status,
      published_at: studioDate(data.published_at, "發布時間"),
      author_email: owner.email,
    });
    if (!savedId) return NextResponse.json({ error: "找不到要更新的文章" }, { status: 404 });
    return NextResponse.json({ ok: true, id: savedId, slug });
  } catch (error) {
    const issue = studioError(error);
    return NextResponse.json({ error: issue.message }, { status: issue.status });
  }
}

export async function DELETE(request: Request) {
  const owner = await getStudioOwner();
  if (!owner) return NextResponse.json({ error: "請先登入" }, { status: 401 });
  try {
    assertStudioWriteRequest(request);
    const { id } = await request.json() as { id?: number };
    if (!id) throw new StudioRequestError("缺少文章編號");
    const removed = await removePost(Number(id));
    if (!removed) return NextResponse.json({ error: "找不到要刪除的文章" }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (error) {
    const issue = studioError(error);
    return NextResponse.json({ error: issue.message }, { status: issue.status });
  }
}
