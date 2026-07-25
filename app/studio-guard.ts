export class StudioRequestError extends Error {
  constructor(
    message: string,
    readonly status = 400,
  ) {
    super(message);
  }
}

export function assertStudioWriteRequest(request: Request) {
  const requestUrl = new URL(request.url);
  const origin = request.headers.get("origin");
  if (origin && origin !== requestUrl.origin) {
    throw new StudioRequestError("請從本站站主編輯台操作", 403);
  }

  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite && fetchSite !== "same-origin") {
    throw new StudioRequestError("跨站寫入已被阻擋", 403);
  }
}

export function studioText(value: unknown, field: string, maxLength: number) {
  const text = String(value ?? "").trim();
  if (text.length > maxLength) {
    throw new StudioRequestError(`${field}超過 ${maxLength} 字元`);
  }
  return text;
}

export function studioSlug(value: unknown, prefix: string) {
  const raw = studioText(value, "網址代碼", 120) || `${prefix}-${Date.now()}`;
  const slug = raw
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96)
    .replace(/-+$/g, "");
  if (slug.length < 3) throw new StudioRequestError("網址代碼至少需要三個英數字元");
  return slug;
}

export function studioDate(value: unknown, field: string) {
  const raw = studioText(value, field, 64) || new Date().toISOString();
  if (Number.isNaN(Date.parse(raw))) {
    throw new StudioRequestError(`${field}格式不正確`);
  }
  return raw;
}

export function studioCoverUrl(value: unknown) {
  const url = studioText(value, "封面網址", 2_048);
  if (!url) return "";
  if (
    (url.startsWith("/media/") || url.startsWith("/api/media/")) &&
    !url.includes("..")
  ) return url;
  return httpsUrl(url, "封面網址");
}

export function studioEvidenceUrl(value: unknown) {
  const url = studioText(value, "證據連結", 2_048);
  return url ? httpsUrl(url, "證據連結") : "";
}

export function studioVideoUrl(value: unknown) {
  const valueText = studioText(value, "影片網址", 2_048);
  if (!valueText) return "";
  const url = parseHttpsUrl(valueText, "影片網址");
  const host = url.hostname.toLowerCase().replace(/^www\./, "");
  const allowed = (
    host === "youtu.be" ||
    host === "youtube.com" ||
    host.endsWith(".youtube.com") ||
    host === "youtube-nocookie.com" ||
    host.endsWith(".youtube-nocookie.com") ||
    host === "tiktok.com" ||
    host.endsWith(".tiktok.com")
  );
  if (!allowed) {
    throw new StudioRequestError("影片只接受 YouTube 或 TikTok 官方網址");
  }
  return url.toString();
}

export function studioError(error: unknown) {
  if (error instanceof StudioRequestError) {
    return { status: error.status, message: error.message };
  }
  const detail = error instanceof Error ? error.message : "";
  if (/unique constraint|already exists/i.test(detail)) {
    return { status: 409, message: "網址代碼已存在，請換一個代碼" };
  }
  return { status: 500, message: "儲存時發生錯誤，請稍後再試" };
}

function httpsUrl(value: string, field: string) {
  return parseHttpsUrl(value, field).toString();
}

function parseHttpsUrl(value: string, field: string) {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new StudioRequestError(`${field}格式不正確`);
  }
  if (url.protocol !== "https:") {
    throw new StudioRequestError(`${field}必須使用 https://`);
  }
  return url;
}
