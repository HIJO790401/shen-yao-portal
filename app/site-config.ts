const INTENDED_CANONICAL_FALLBACK = "https://silentschool.studio";

export function normalizeSiteOrigin(value?: string) {
  const candidate = value?.trim() || INTENDED_CANONICAL_FALLBACK;
  try {
    const url = new URL(candidate);
    const localHttp =
      url.protocol === "http:" &&
      ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
    if (url.protocol !== "https:" && !localHttp) {
      return INTENDED_CANONICAL_FALLBACK;
    }
    if (url.username || url.password) {
      return INTENDED_CANONICAL_FALLBACK;
    }
    return url.origin;
  } catch {
    return INTENDED_CANONICAL_FALLBACK;
  }
}

export function normalizeIntroVideoSource(value?: string) {
  const candidate = value?.trim();
  if (!candidate) return undefined;

  if (candidate.startsWith("/")) {
    if (
      candidate.startsWith("/media/intro/") &&
      !candidate.includes("..") &&
      /\.(?:mp4|webm)(?:[?#].*)?$/i.test(candidate)
    ) {
      return candidate;
    }
    return undefined;
  }

  try {
    const url = new URL(candidate);
    if (
      url.protocol === "https:" &&
      !url.username &&
      !url.password &&
      /\.(?:mp4|webm)$/i.test(url.pathname)
    ) {
      return url.toString();
    }
  } catch {
    return undefined;
  }
  return undefined;
}

export const siteOrigin = normalizeSiteOrigin(
  process.env.NEXT_PUBLIC_SITE_URL,
);

export const introVideoSource = normalizeIntroVideoSource(
  process.env.NEXT_PUBLIC_INTRO_VIDEO_URL,
);

export function siteUrl(path = "/") {
  return new URL(path, `${siteOrigin}/`).toString();
}

export function localizedAlternates(
  locale: "zh" | "en",
  path = "",
) {
  const normalizedPath = path && path.startsWith("/") ? path : `/${path}`;
  const suffix = normalizedPath === "/" ? "" : normalizedPath;
  return {
    canonical: `/${locale}${suffix}`,
    languages: {
      "zh-Hant": `/zh${suffix}`,
      en: `/en${suffix}`,
      "x-default": `/zh${suffix}`,
    },
  };
}
