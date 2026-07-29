import assert from "node:assert/strict";
import test from "node:test";

import {
  localizedAlternates,
  normalizeIntroVideoSource,
  normalizeSiteOrigin,
  siteOrigin,
  siteUrl,
} from "../app/site-config.ts";

const canonicalFallback = "https://silentschool.studio";

test("normalizeSiteOrigin accepts HTTPS origins and strips paths", () => {
  assert.equal(
    normalizeSiteOrigin("  https://Example.COM/path?query=1#fragment  "),
    "https://example.com",
  );
  assert.equal(normalizeSiteOrigin("https://sub.example.com:8443/a"), "https://sub.example.com:8443");
});

test("normalizeSiteOrigin rejects external HTTP, credentials, and malformed values", () => {
  assert.equal(normalizeSiteOrigin("http://example.com"), canonicalFallback);
  assert.equal(normalizeSiteOrigin("https://user:demo@example.com"), canonicalFallback);
  assert.equal(normalizeSiteOrigin("not a URL"), canonicalFallback);
  assert.equal(normalizeSiteOrigin(""), canonicalFallback);
  assert.equal(normalizeSiteOrigin(undefined), canonicalFallback);
});

test("normalizeSiteOrigin permits local HTTP preview origins", () => {
  assert.equal(normalizeSiteOrigin("http://localhost:4174/zh"), "http://localhost:4174");
  assert.equal(normalizeSiteOrigin("http://127.0.0.1:4174/path"), "http://127.0.0.1:4174");
  assert.equal(normalizeSiteOrigin("http://[::1]:4174/path"), "http://[::1]:4174");
});

test("normalizeIntroVideoSource accepts approved local MP4 and WebM paths", () => {
  assert.equal(
    normalizeIntroVideoSource("/media/intro/serene-school-intro.mp4"),
    "/media/intro/serene-school-intro.mp4",
  );
  assert.equal(
    normalizeIntroVideoSource("/media/intro/serene-school-intro.WEBM?version=1#opening"),
    "/media/intro/serene-school-intro.WEBM?version=1#opening",
  );
});

test("normalizeIntroVideoSource rejects unsafe or out-of-scope relative paths", () => {
  for (const value of [
    "media/intro/clip.mp4",
    "/media/clip.mp4",
    "/media/intro/../clip.mp4",
    "/media/intro/clip.mov",
    "/media/intro/clip.mp4/extra",
    "/api/media/covers/clip.mp4",
  ]) {
    assert.equal(normalizeIntroVideoSource(value), undefined, value);
  }
});

test("normalizeIntroVideoSource accepts HTTPS MP4 and WebM and rejects other remote sources", () => {
  assert.equal(
    normalizeIntroVideoSource("https://cdn.example.com/intro/serene.mp4?version=2"),
    "https://cdn.example.com/intro/serene.mp4?version=2",
  );
  assert.equal(
    normalizeIntroVideoSource("https://cdn.example.com/intro/serene.webm"),
    "https://cdn.example.com/intro/serene.webm",
  );
  assert.equal(
    normalizeIntroVideoSource("https://user:demo@cdn.example.com/intro/serene.mp4"),
    undefined,
  );
  assert.equal(normalizeIntroVideoSource("http://cdn.example.com/intro/serene.mp4"), undefined);
  assert.equal(normalizeIntroVideoSource("https://cdn.example.com/intro/serene.mov"), undefined);
  assert.equal(normalizeIntroVideoSource("https://cdn.example.com/watch?v=serene.mp4"), undefined);
  assert.equal(normalizeIntroVideoSource(undefined), undefined);
});

test("siteUrl resolves public paths against the normalized configured origin", () => {
  assert.equal(siteUrl("/zh"), `${siteOrigin}/zh`);
  assert.equal(siteUrl("en/resume"), `${siteOrigin}/en/resume`);
  assert.equal(siteUrl("/#person"), `${siteOrigin}/#person`);
});

test("localizedAlternates creates matching canonical and hreflang routes", () => {
  assert.deepEqual(localizedAlternates("zh", "/news"), {
    canonical: "/zh/news",
    languages: {
      "zh-Hant": "/zh/news",
      en: "/en/news",
      "x-default": "/zh/news",
    },
  });
  assert.deepEqual(localizedAlternates("en", "products"), {
    canonical: "/en/products",
    languages: {
      "zh-Hant": "/zh/products",
      en: "/en/products",
      "x-default": "/zh/products",
    },
  });
  assert.deepEqual(localizedAlternates("en"), {
    canonical: "/en",
    languages: {
      "zh-Hant": "/zh",
      en: "/en",
      "x-default": "/zh",
    },
  });
});
