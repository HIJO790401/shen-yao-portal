import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const source = (file) => readFile(new URL(file, root), "utf8");

test("publishes bilingual story overview without releasing submitted manuscript text", async () => {
  const [page, works, sitemap, vite, assets] = await Promise.all([
    source("app/[locale]/novel/interrogation-room/page.tsx"),
    source("app/works/page.tsx"),
    source("app/sitemap.ts"),
    source("vite.config.ts"),
    readdir(new URL("public/media/novel/", root)),
  ]);
  assert.match(page, /robots:\s*\{ index: true, follow: true \}/);
  assert.match(page, /我尚未決定由出版社出版或自行出版/);
  assert.match(page, /作品仍由我持續完成/);
  assert.match(page, /外部若要反證，必須對準這些依據/);
  assert.match(works, /公開頁先呈現故事提要/);
  assert.match(sitemap, /\/novel\/interrogation-room/);
  assert.doesNotMatch(page + works + vite, /黎川市警局第三分局二樓|On the second floor of the Third Precinct|__local\/novel/);
  assert.deepEqual(assets.sort(), ["interrogation-room-poster.png", "interrogation-room-scene.png"]);
});
