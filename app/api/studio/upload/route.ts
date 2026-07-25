import { env } from "cloudflare:workers";
import { NextResponse } from "next/server";
import { getStudioOwner } from "@/app/studio-auth";
import {
  assertStudioWriteRequest,
  studioError,
  StudioRequestError,
} from "@/app/studio-guard";

export const dynamic = "force-dynamic";

const imageTypes = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
]);

export async function POST(request: Request) {
  const owner = await getStudioOwner();
  if (!owner) return NextResponse.json({ error: "請先用站主帳號登入" }, { status: 401 });
  try {
    assertStudioWriteRequest(request);
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) throw new StudioRequestError("請選擇封面圖片");
    const ext = imageTypes.get(file.type);
    if (!ext) throw new StudioRequestError("封面只接受 JPG、PNG 或 WebP 圖片");
    if (file.size <= 0) throw new StudioRequestError("圖片內容是空的");
    if (file.size > 8 * 1024 * 1024) throw new StudioRequestError("圖片請小於 8MB");

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
    return NextResponse.json({ ok: true, url: `/api/media/${key}` });
  } catch (error) {
    const issue = studioError(error);
    return NextResponse.json({ error: issue.message }, { status: issue.status });
  }
}

function matchesImageSignature(type: string, bytes: Uint8Array) {
  if (type === "image/jpeg") {
    return bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  }
  if (type === "image/png") {
    const signature = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
    return bytes.length >= signature.length && signature.every((value, index) => bytes[index] === value);
  }
  if (type === "image/webp") {
    return bytes.length >= 12 &&
      String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" &&
      String.fromCharCode(...bytes.slice(8, 12)) === "WEBP";
  }
  return false;
}
