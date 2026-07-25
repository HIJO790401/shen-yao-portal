import { env } from "cloudflare:workers";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ key: string[] }> }) {
  const { key } = await params;
  if (
    key.length !== 2 ||
    key[0] !== "covers" ||
    !/^[a-zA-Z0-9._-]+$/.test(key[1])
  ) return new Response("找不到圖片", { status: 404 });
  const media = (env as unknown as { MEDIA?: R2Bucket }).MEDIA;
  if (!media) return new Response("圖片空間尚未連接", { status: 503 });
  const object = await media.get(key.join("/"));
  if (!object) return new Response("找不到圖片", { status: 404 });
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("cache-control", "public, max-age=31536000, immutable");
  headers.set("x-content-type-options", "nosniff");
  headers.set("content-security-policy", "default-src 'none'; sandbox");
  return new Response(object.body, { headers });
}
