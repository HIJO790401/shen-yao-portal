export class StudioRequestError extends Error {
  readonly status: number;

  constructor(
    message: string,
    status = 400,
  ) {
    super(message);
    this.status = status;
  }
}

export function assertStudioWriteRequest(request: Request) {
  const requestUrl = new URL(request.url);
  const origin = request.headers.get("origin");
  if (!origin || origin !== requestUrl.origin) {
    throw new StudioRequestError("請從本站站主編輯台操作", 403);
  }

  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite && fetchSite !== "same-origin") {
    throw new StudioRequestError("跨站寫入已被阻擋", 403);
  }
}

export async function readStudioJson(
  request: Request,
  maxBytes = 512 * 1024,
): Promise<Record<string, unknown>> {
  assertStudioWriteRequest(request);
  const contentType = request.headers.get("content-type")?.toLowerCase() ?? "";
  if (!/^application\/(?:[a-z0-9.+-]*\+)?json(?:\s*;|$)/.test(contentType)) {
    throw new StudioRequestError("資料格式必須是 application/json", 415);
  }
  assertContentLength(request, maxBytes);

  const raw = await request.text();
  if (new TextEncoder().encode(raw).byteLength > maxBytes) {
    throw new StudioRequestError("資料內容過大", 413);
  }

  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    throw new StudioRequestError("JSON 資料格式不正確");
  }
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new StudioRequestError("資料必須是物件格式");
  }
  return value as Record<string, unknown>;
}

export function assertStudioMultipartRequest(
  request: Request,
  maxBytes: number,
) {
  assertStudioWriteRequest(request);
  const contentType = request.headers.get("content-type")?.toLowerCase() ?? "";
  if (
    !contentType.startsWith("multipart/form-data;") ||
    !contentType.includes("boundary=")
  ) {
    throw new StudioRequestError("上傳資料必須使用 multipart/form-data", 415);
  }
  assertContentLength(request, maxBytes);
}

export function studioId(value: unknown, required: true): number;
export function studioId(value: unknown, required?: false): number | undefined;
export function studioId(value: unknown, required = false) {
  if (value === undefined || value === null || value === "") {
    if (required) throw new StudioRequestError("缺少內容編號");
    return undefined;
  }
  const id = typeof value === "number" ? value : Number(value);
  if (!Number.isSafeInteger(id) || id <= 0) {
    throw new StudioRequestError("內容編號格式不正確");
  }
  return id;
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
  const match =
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{1,3}))?)?(Z|[+-]\d{2}:\d{2})?$/.exec(
      raw,
    );
  if (!match) {
    throw new StudioRequestError(`${field}格式不正確`);
  }
  const [, yearText, monthText, dayText, hourText, minuteText, secondText] =
    match;
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const hour = Number(hourText);
  const minute = Number(minuteText);
  const second = Number(secondText ?? "0");
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  if (
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > daysInMonth ||
    hour > 23 ||
    minute > 59 ||
    second > 59 ||
    Number.isNaN(Date.parse(raw))
  ) {
    throw new StudioRequestError(`${field}格式不正確`);
  }
  return match[8] ? new Date(raw).toISOString() : raw;
}

export function studioCoverUrl(value: unknown) {
  const url = studioText(value, "封面網址", 2_048);
  if (!url) return "";
  if (
    /^\/api\/media\/covers\/\d{10,16}-[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.(?:jpg|png|webp)$/i.test(
      url,
    )
  ) {
    return url;
  }
  if (url.startsWith("/media/")) {
    if (url.includes("%") || url.includes("?") || url.includes("#")) {
      throw new StudioRequestError("封面網址格式不正確");
    }
    const segments = url.slice(7).split("/");
    if (
      segments.length > 0 &&
      segments.every(
        (segment) =>
          segment.length > 0 &&
          segment !== "." &&
          segment !== ".." &&
          /^[a-zA-Z0-9._-]+$/.test(segment),
      )
    ) {
      return url;
    }
    throw new StudioRequestError("封面網址格式不正確");
  }
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
  if (url.username || url.password) {
    throw new StudioRequestError(`${field}不得包含帳號或密碼`);
  }
  return url;
}

function assertContentLength(request: Request, maxBytes: number) {
  const contentLength = request.headers.get("content-length");
  if (!contentLength) return;
  if (!/^\d+$/.test(contentLength)) {
    throw new StudioRequestError("Content-Length 格式不正確");
  }
  if (Number(contentLength) > maxBytes) {
    throw new StudioRequestError("資料內容過大", 413);
  }
}
