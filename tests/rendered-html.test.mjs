import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function source(path) {
  return readFile(new URL(path, projectRoot), "utf8");
}

function cssRule(css, selector) {
  const start = css.indexOf(`${selector} {`);
  assert.notEqual(start, -1, `missing CSS rule: ${selector}`);
  const open = css.indexOf("{", start);
  let depth = 0;
  for (let index = open; index < css.length; index += 1) {
    if (css[index] === "{") depth += 1;
    if (css[index] === "}") {
      depth -= 1;
      if (depth === 0) return css.slice(start, index + 1);
    }
  }
  assert.fail(`unclosed CSS rule: ${selector}`);
}

test("locks the SERENE brand, founder identity and separate locale routes", async () => {
  const [home, hero, layout, locale, language] = await Promise.all([
    source("app/page.tsx"),
    source("app/components/SereneWaterHero.tsx"),
    source("app/layout.tsx"),
    source("app/[locale]/layout.tsx"),
    source("app/components/LanguageControl.tsx"),
  ]);
  assert.match(home + hero + layout, /SERENE SCHOOL STUDIO/);
  assert.match(hero, /許文耀／沈耀888π/);
  assert.doesNotMatch(hero, /許文耀\s+／|沈耀\s+888π/);
  assert.match(hero, /Founder[\s\S]*許文耀／沈耀888π[\s\S]*沉靜流派工作室[\s\S]*語意防火牆創辦人/);
  assert.match(hero, /古文明符號創作/);
  assert.match(hero, /數學公式與責任研究/);
  assert.match(hero, /語意防火牆系統架構/);
  assert.match(hero, /探索核心系統/);
  assert.match(hero, /認識創辦人/);
  assert.match(hero, /沉靜不是終止，而是讓一切回到本質。/);
  assert.doesNotMatch(hero, /暨/);
  assert.doesNotMatch(home + hero + layout, /SILENT SCHOOL STUDIO/i);
  assert.match(layout, /application\/ld\+json/);
  assert.match(layout, /Wen-Yao Hsu/);
  assert.match(locale, /generateStaticParams/);
  assert.match(locale, /zh-Hant/);
  assert.match(language, /LocalizedLink/);
  assert.match(language, /localizeHref/);
});

test("keeps the supplied image static while animating only the water treatment", async () => {
  const [hero, css, portrait] = await Promise.all([
    source("app/components/SereneWaterHero.tsx"),
    source("app/serene-home.module.css"),
    readFile(new URL("public/media/founder-v2.jpg", projectRoot)),
  ]);
  const founderPhoto = cssRule(css, ".founderPhoto");
  const founderImage = cssRule(css, ".founderPhoto img");
  assert.match(hero + css, /serene-water-16x9\.jpg/);
  assert.match(hero, /founder-v2\.jpg/);
  assert.match(css, /waterRefraction/);
  assert.match(founderPhoto, /top:/);
  assert.match(founderPhoto, /right:/);
  assert.match(founderPhoto, /(?:-webkit-)?mask-image:\s*radial-gradient/);
  assert.doesNotMatch(founderPhoto, /inset:\s*0/);
  assert.doesNotMatch(founderImage, /blur\(|opacity:/);
  assert.match(css, /prefers-reduced-motion/);
  assert.doesNotMatch(hero, /<video|<canvas/);
  assert.equal(
    createHash("sha256").update(portrait).digest("hex").toUpperCase(),
    "24490038C4AA971516F1B47469AA46053B83ED4419FA1DBE17B14F7323F7A634",
  );
  await Promise.all([
    access(new URL("public/media/serene-water-16x9.jpg", projectRoot)),
    access(new URL("public/media/founder-v2.jpg", projectRoot)),
    access(new URL("public/media/chenjingliupai-symbol.svg", projectRoot)),
  ]);
});

test("renders a legal Intro Gate placeholder and enters only on owner action", async () => {
  const [home, intro] = await Promise.all([
    source("app/page.tsx"),
    source("app/components/IntroGate.tsx"),
  ]);
  assert.match(home, /<IntroGate\s*\/>/);
  assert.match(intro, /正式開場影片待提供/);
  assert.match(intro, /不生成替代影片/);
  assert.match(intro, /進入官網/);
  assert.match(intro, /sessionStorage/);
  assert.match(intro, /controls/);
  assert.match(intro, /src\s*\?\s*\(/);
  assert.doesNotMatch(intro, /if\s*\(\s*!src[\s|)]/);
  assert.doesNotMatch(intro, /onEnded=\{enterSite\}|onError=\{enterSite\}/);
  assert.doesNotMatch(intro, /autoPlay/);
});

test("keeps the Runtime 0/1 slot legal, visible and intentionally unlinkable", async () => {
  const [home, siteData, productsPage] = await Promise.all([
    source("app/page.tsx"),
    source("app/site-data.ts"),
    source("app/products/page.tsx"),
  ]);
  const runtime = siteData.slice(siteData.indexOf('slug: "runtime-01"'), siteData.indexOf("];", siteData.indexOf('slug: "runtime-01"')));
  assert.match(runtime, /模型 Runtime 0\/1 閘門監控系統/);
  assert.match(runtime, /href:\s*null/);
  assert.match(runtime, /statusZh:\s*"開發中"/);
  assert.doesNotMatch(runtime, /https?:\/\/|href:\s*"[^"]+"/);
  assert.match(home, /<article className=\{`\$\{styles\.miniProductCard\}/);
  assert.match(productsPage, /runtime-placeholder-v3/);
  assert.match(productsPage, /不建立假網址/);
  const runtimeSection = productsPage.slice(productsPage.indexOf('<section className="runtime-placeholder-v3"'), productsPage.indexOf("</section>", productsPage.indexOf('<section className="runtime-placeholder-v3"')));
  assert.doesNotMatch(runtimeSection, /<a\b|LocalizedLink/);
});

test("retains the quote and compact language control on mobile", async () => {
  const [hero, homeCss, chromeCss] = await Promise.all([
    source("app/components/SereneWaterHero.tsx"),
    source("app/serene-home.module.css"),
    source("app/components/site-chrome.module.css"),
  ]);
  assert.match(hero, /沉靜不是終止，而是讓一切回到本質。/);
  assert.doesNotMatch(homeCss, /\.founderQuote\s*\{\s*display:\s*none/);
  assert.doesNotMatch(homeCss + chromeCss, /\.language-control\)\s*\{\s*display:\s*none/);
  assert.match(homeCss, /\.founderQuote\s*\{[\s\S]*?width:\s*auto/);
});

test("finishes the official home route with a separate collaboration section", async () => {
  const home = await source("app/page.tsx");
  assert.match(home, /id="contact"/);
  assert.match(home, /合作聯絡/);
  assert.match(home, /mailto:ken0963521@gmail\.com/);
});

test("turns audited products into no-input, product-specific fixed-case films", async () => {
  const [films, fixtures, stage, works] = await Promise.all([
    source("app/showcase-data.ts"),
    source("app/demo-fixtures.ts"),
    source("app/components/ProductFilmStage.tsx"),
    source("app/works/page.tsx"),
  ]);
  assert.match(stage, /AUTO \/ NO INPUT/);
  assert.match(stage, /暫停/);
  assert.match(stage, /重播/);
  assert.doesNotMatch(stage, /<input|<textarea/);
  assert.match(fixtures, /FIXED CASE/);
  assert.match(fixtures, /SIMULATED PAYMENT CASE/);
  assert.match(fixtures, /CURATED FIXTURE/);
  assert.match(fixtures, /NOT MEDICAL|非醫療/);
  assert.match(works, /SERENE SCHOOL/);
  assert.match(works, /語之神神器展覽篇/);
  assert.match(works, /Artifacts of the Language God/i);
  assert.match(works, /ZS9rDg3ATyPX4-sKjkh/);
  assert.match(works, /2UFVuPkDkTc/);
  assert.doesNotMatch(films + works, /Silent School Creative Universe/i);
  assert.equal((films.match(/status: "deferred"/g) ?? []).length, 1, "only the owner-deferred SCBKR film may remain deferred");
});

test("integrates the original newsroom archive without a GitHub runtime dependency", async () => {
  const [news, archive, reportDetail, museumDetail] = await Promise.all([
    source("app/news/page.tsx"),
    source("app/newsroom-data.ts"),
    source("app/news/[slug]/page.tsx"),
    source("app/news/museum/[slug]/page.tsx"),
  ]);
  const reportsBlock = archive.split("export const archiveMuseumItems")[0];
  const museumBlock = archive.split("export const archiveMuseumItems")[1].split("export const newsroomAxes")[0];
  const axesBlock = archive.split("export const newsroomAxes")[1];
  assert.equal((reportsBlock.match(/^    slug:/gm) ?? []).length, 5);
  assert.equal((museumBlock.match(/^    slug:/gm) ?? []).length, 5);
  assert.equal((axesBlock.match(/^    code:/gm) ?? []).length, 14);
  for (const id of ["guide", "reports", "videos", "museum", "axes", "responsibility"]) assert.match(news, new RegExp(`id=\\"${id}\\"`));
  assert.match(news, /listPublishedPosts/);
  assert.match(news, /listPublishedMuseumEntries/);
  assert.match(reportDetail, /VideoEmbed/);
  assert.match(museumDetail, /VideoEmbed/);
  assert.match(news, /實相上線/);
  assert.match(news, /xROrsIHToIY/);
  assert.doesNotMatch(news + archive + reportDetail + museumDetail, /api\.github\.com|github\.io\/shen-yao-reality-news-responsibility-museum/);
});

test("keeps the hackathon action trail on the founder site, outside the newsroom", async () => {
  const [home, about, news] = await Promise.all([
    source("app/page.tsx"),
    source("app/about/page.tsx"),
    source("app/news/page.tsx"),
  ]);
  assert.match(home + about, /去偽存真：全民偵查黑客松/);
  assert.match(about, /Gogolook 命題組 Team 11 參賽成員/);
  assert.match(about, /SCBKR \+ R-Lock/);
  assert.match(about, /ai-expo\.tw\/kiro_hackathon_2026/);
  assert.doesNotMatch(news, /Team 11|agent-for-truth-hackathon/);
  await access(new URL("public/media/public-activity/agent-for-truth-hackathon.jpg", projectRoot));
});

test("labels SecurityBrief Asia as dated third-party coverage with claim boundaries", async () => {
  const [home, about, works, siteData, layout, news] = await Promise.all([
    source("app/page.tsx"),
    source("app/about/page.tsx"),
    source("app/works/page.tsx"),
    source("app/site-data.ts"),
    source("app/layout.tsx"),
    source("app/news/page.tsx"),
  ]);
  assert.match(home + about + works, /SECURITYBRIEF ASIA/);
  assert.match(about, /Semantic Firewall promises AI cost savings & safer chat models/);
  assert.match(about + siteData, /2025[.\-]11[.\-]18/);
  assert.match(about, /70–88%/);
  assert.match(home, /不是媒體獨立驗證/);
  assert.match(about + works, /第三方獨立|independent benchmarks/i);
  assert.match(about, /subjectOf/);
  assert.match(about, /NewsArticle/);
  assert.doesNotMatch(layout, /securitybrief\.asia/);
  assert.doesNotMatch(news, /SECURITYBRIEF ASIA|70–88%/);
});

test("preserves the original museum CMS shape in D1 and R2 owner tooling", async () => {
  const [schema, museumDb, editor, upload, hosting] = await Promise.all([
    source("db/schema.ts"),
    source("db/museum.ts"),
    source("app/studio/MuseumEditor.tsx"),
    source("app/api/studio/upload/route.ts"),
    source(".openai/hosting.json"),
  ]);
  for (const field of ["registry_id", "subtitle_zh", "guide_zh", "body_zh", "hall_zh", "video_url", "verdict_zh", "repair_zh"]) {
    assert.match(museumDb, new RegExp(field));
  }
  assert.match(schema, /museumEntries/);
  assert.match(editor, /館藏編號/);
  assert.match(editor, /YouTube 影片網址/);
  assert.match(upload, /R2Bucket/);
  assert.match(hosting, /"d1": "DB"/);
  assert.match(hosting, /"r2": "MEDIA"/);
});

test("publishes crawler, AI discovery and structured-search surfaces", async () => {
  const [robots, sitemap, llms] = await Promise.all([
    source("app/robots.ts"),
    source("app/sitemap.ts"),
    source("public/llms.txt"),
  ]);
  assert.match(robots, /OAI-SearchBot/);
  assert.match(robots, /GPTBot/);
  assert.match(robots, /sitemap\.xml/);
  assert.match(sitemap, /\/zh/);
  assert.match(sitemap, /\/en/);
  assert.match(sitemap, /\/news\/museum/);
  assert.match(llms, /SERENE SCHOOL STUDIO/);
  assert.match(llms, /Artifacts of the Language God/);
  assert.match(llms, /Agent for Truth/);
  assert.match(llms, /NVIDIA links are community posts/);
});
