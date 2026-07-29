import { env } from "cloudflare:workers";
import { NextResponse } from "next/server";
import { getStudioOwner } from "@/app/studio-auth";
import {
  assertStudioMultipartRequest,
  studioError,
  StudioRequestError,
} from "@/app/studio-guard";
import {
  matchesImageSignature,
  MAX_STUDIO_IMAGE_BYTES,
  MAX_STUDIO_MULTIPART_BYTES,
  STUDIO_IMAGE_TYPES,
} from "@/app/studio-image";

export const dynamic = "force-dynamic";

function privateJson(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "cache-control": "private, no-store" },
  });
}

export async function POST(request: Request) {
  const owner = await getStudioOwner();
  if (!owner) return privateJson({ error: "請先用站主帳號登入" }, 401);
  try {
    assertStudioMultipartRequest(request, MAX_STUDIO_MULTIPART_BYTES);
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) throw new StudioRequestError("請選擇封面圖片");
    const ext = STUDIO_IMAGE_TYPES.get(file.type);
    if (!ext) throw new StudioRequestError("封面只接受 JPG、PNG 或 WebP 圖片");
    if (file.size <= 0) throw new StudioRequestError("圖片內容是空的");
    if (file.size > MAX_STUDIO_IMAGE_BYTES) {
      throw new StudioRequestError("圖片請小於 8MB", 413);
    }

    const bytes = new Uint8Array(await file.arrayBuffer());
    if (!matchesImageSignature(file.type, bytes)) {
      throw new StudioRequestError("圖片格式與檔案內容不一致");
    }

    const key = `covers/${Date.now()}-${crypto.randomUUID()}.${ext}`;
    const media = (env as unknown as { MEDIA?: R2Bucket }).MEDIA;
    if (!media) throw new StudioRequestError("圖片儲存空間尚未連接", 503);
    await media.put(key, bytes, {
      httpMetadata: {
        contentType: file.type,
        contentDisposition: `inline; filename="${key.split("/").pop()}"`,
      },
      customMetadata: {
        owner: owner.email,
        uploadedAt: new Date().toISOString(),
      },
    });
    return privateJson({ ok: true, url: `/api/media/${key}` });
  } catch (error) {
    const issue = studioError(error);
    return privateJson({ error: issue.message }, issue.status);
  }
}
