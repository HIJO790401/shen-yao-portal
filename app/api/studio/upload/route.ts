import { env } from "cloudflare:workers";
import { NextResponse } from "next/server";
import { getStudioOwner } from "@/app/studio-auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const owner = await getStudioOwner();
  if (!owner) return NextResponse.json({ error: "請先用站主帳號登入" }, { status: 401 });
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "請選擇封面圖片" }, { status: 400 });
  if (!file.type.startsWith("image/")) return NextResponse.json({ error: "封面只能使用圖片" }, { status: 400 });
  if (file.size > 8 * 1024 * 1024) return NextResponse.json({ error: "圖片請小於 8MB" }, { status: 400 });
  const ext = file.name.split(".").pop()?.replace(/[^a-zA-Z0-9]/g, "") || "jpg";
  const key = `covers/${Date.now()}-${crypto.randomUUID()}.${ext}`;
  const media = (env as unknown as { MEDIA: R2Bucket }).MEDIA;
  await media.put(key, await file.arrayBuffer(), { httpMetadata: { contentType: file.type } });
  return NextResponse.json({ ok: true, url: `/api/media/${key}` });
}
