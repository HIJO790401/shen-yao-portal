import { NextResponse } from "next/server";
import { listAllPosts, removePost, savePost } from "@/db/news";
import { getStudioOwner } from "@/app/studio-auth";

export const dynamic = "force-dynamic";

async function ownerOrReject() {
  const owner = await getStudioOwner();
  return owner;
}

export async function GET() {
  const owner = await ownerOrReject();
  if (!owner) return NextResponse.json({ error: "只有站主可以進入編輯台" }, { status: 401 });
  return NextResponse.json({ posts: await listAllPosts(), owner: owner.email });
}

export async function POST(request: Request) {
  const owner = await ownerOrReject();
  if (!owner) return NextResponse.json({ error: "請先用站主帳號登入" }, { status: 401 });
  const data = await request.json() as Record<string, unknown>;
  const titleZh = String(data.title_zh ?? "").trim();
  if (!titleZh) return NextResponse.json({ error: "請填寫中文標題" }, { status: 400 });
  const id = Number(data.id || 0) || undefined;
  const slug = String(data.slug || `report-${Date.now()}`).replace(/[^a-zA-Z0-9-]/g, "-").toLowerCase();
  const status = data.status === "published" ? "published" : "draft";
  const savedId = await savePost({
    id, slug, title_zh: titleZh, title_en: String(data.title_en ?? "").trim(),
    summary_zh: String(data.summary_zh ?? "").trim(), summary_en: String(data.summary_en ?? "").trim(),
    body_zh: String(data.body_zh ?? "").trim(), body_en: String(data.body_en ?? "").trim(),
    category: String(data.category ?? "REPORT").trim().toUpperCase(), cover_url: String(data.cover_url ?? "").trim(),
    video_url: String(data.video_url ?? "").trim(), status,
    published_at: String(data.published_at || new Date().toISOString()), author_email: owner.email,
  });
  return NextResponse.json({ ok: true, id: savedId, slug });
}

export async function DELETE(request: Request) {
  const owner = await ownerOrReject();
  if (!owner) return NextResponse.json({ error: "請先登入" }, { status: 401 });
  const { id } = await request.json() as { id?: number };
  if (!id) return NextResponse.json({ error: "缺少文章編號" }, { status: 400 });
  await removePost(Number(id));
  return NextResponse.json({ ok: true });
}
