import { NextResponse } from "next/server";
import { listAllMuseumEntries, removeMuseumEntry, saveMuseumEntry } from "@/db/museum";
import { getStudioOwner } from "@/app/studio-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const owner = await getStudioOwner();
  if (!owner) return NextResponse.json({ error: "只有站主可以進入編輯台" }, { status: 401 });
  return NextResponse.json({ entries: await listAllMuseumEntries(), owner: owner.email });
}

export async function POST(request: Request) {
  const owner = await getStudioOwner();
  if (!owner) return NextResponse.json({ error: "請先用站主帳號登入" }, { status: 401 });
  const data = await request.json() as Record<string, unknown>;
  const titleZh = String(data.title_zh ?? "").trim();
  if (!titleZh) return NextResponse.json({ error: "請填寫中文館藏標題" }, { status: 400 });
  const id = Number(data.id || 0) || undefined;
  const slug = String(data.slug || `archive-${Date.now()}`).replace(/[^a-zA-Z0-9-]/g, "-").toLowerCase();
  const status = data.status === "published" ? "published" : "draft";
  const savedId = await saveMuseumEntry({
    id, slug, registry_id:String(data.registry_id ?? "").trim(), title_zh:titleZh, title_en:String(data.title_en ?? "").trim(),
    subtitle_zh:String(data.subtitle_zh ?? "").trim(), subtitle_en:String(data.subtitle_en ?? "").trim(),
    guide_zh:String(data.guide_zh ?? "").trim(), guide_en:String(data.guide_en ?? "").trim(),
    summary_zh:String(data.summary_zh ?? "").trim(), summary_en:String(data.summary_en ?? "").trim(),
    body_zh:String(data.body_zh ?? "").trim(), body_en:String(data.body_en ?? "").trim(),
    hall_zh:String(data.hall_zh ?? "").trim(), hall_en:String(data.hall_en ?? "").trim(),
    verdict_zh:String(data.verdict_zh ?? "").trim(), verdict_en:String(data.verdict_en ?? "").trim(), repair_zh:String(data.repair_zh ?? "").trim(), repair_en:String(data.repair_en ?? "").trim(),
    evidence_url:String(data.evidence_url ?? "").trim(), cover_url:String(data.cover_url ?? "").trim(), video_url:String(data.video_url ?? "").trim(),
    category:String(data.category ?? "RESPONSIBILITY").trim().toUpperCase(),
    status, occurred_at:String(data.occurred_at || new Date().toISOString()), author_email:owner.email,
  });
  return NextResponse.json({ ok:true, id:savedId, slug });
}

export async function DELETE(request: Request) {
  const owner = await getStudioOwner();
  if (!owner) return NextResponse.json({ error:"請先登入" }, { status:401 });
  const { id } = await request.json() as { id?:number };
  if (!id) return NextResponse.json({ error:"缺少館藏編號" }, { status:400 });
  await removeMuseumEntry(Number(id));
  return NextResponse.json({ ok:true });
}
