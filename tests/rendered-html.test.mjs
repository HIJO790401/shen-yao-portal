import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import { buildContactMailto, CONTACT_EMAIL } from "../app/contact-mailto.ts";

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
  const [home, hero, layout, locale, language, globals] = await Promise.all([
    source("app/page.tsx"),
    source("app/components/SereneWaterHero.tsx"),
    source("app/layout.tsx"),
    source("app/[locale]/layout.tsx"),
    source("app/components/LanguageControl.tsx"),
    source("app/globals.css"),
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
  assert.match(locale, /data-locale=\{locale\}/);
  assert.match(language, /LocalizedLink/);
  assert.match(language, /localizeHref/);
  assert.match(globals, /\[data-locale="en"\] \.lang-zh/);
  assert.match(globals, /\[data-locale="en"\] \.lang-en/);
  assert.doesNotMatch(globals, /html\[data-locale="en"\]/);
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

test("serves curated local raster assets directly in the browser runtime", async () => {
  const [intro, hero, home, works, about, news, reportDetail, museumDetail] = await Promise.all([
    source("app/components/IntroGate.tsx"),
    source("app/components/SereneWaterHero.tsx"),
    source("app/page.tsx"),
    source("app/works/page.tsx"),
    source("app/about/page.tsx"),
    source("app/news/page.tsx"),
    source("app/news/[slug]/page.tsx"),
    source("app/news/museum/[slug]/page.tsx"),
  ]);
  assert.match(intro, /<Image[^>]*\bunoptimized\b[^>]*>/);
  assert.match(hero, /founder-v2\.jpg[\s\S]*?\bunoptimized\b/);
  assert.match(home, /src=\{work\.image\}[^>]*\bunoptimized\b/);
  assert.match(works, /language-god-exhibition-16x9\.png[\s\S]*?\bunoptimized\b/);
  assert.match(about, /founder-v2\.jpg[\s\S]*?\bunoptimized\b/);
  assert.match(about, /agent-for-truth-hackathon\.jpg[\s\S]*?\bunoptimized\b/);
  assert.match(news, /reality-goes-live-16x9\.png[\s\S]*?\bunoptimized\b/);
  assert.match(news, /src=\{axis\.image\}[^>]*\bunoptimized\b/);
  assert.match(reportDetail, /src=\{report\.cover\}[\s\S]*?\bunoptimized\b/);
  assert.match(museumDetail, /src=\{item\.cover\}[\s\S]*?\bunoptimized\b/);
});

test("renders the owner intro video with safe fallback and enters only on owner action", async () => {
  const [home, intro, siteConfig, css, video] = await Promise.all([
    source("app/page.tsx"),
    source("app/components/IntroGate.tsx"),
    source("app/site-config.ts"),
    source("app/serene-home.module.css"),
    readFile(new URL("public/media/intro/serene-school-intro.mp4", projectRoot)),
  ]);
  assert.match(home, /introVideoSource/);
  assert.match(home, /<IntroGate src=\{introVideoSource\}\s*\/>/);
  assert.match(siteConfig, /NEXT_PUBLIC_INTRO_VIDEO_URL/);
  assert.match(siteConfig, /normalizeIntroVideoSource/);
  assert.match(siteConfig, /defaultIntroVideoSource\s*=\s*"\/media\/intro\/serene-school-intro\.mp4"/);
  assert.match(intro, /正式開場影片待提供/);
  assert.match(intro, /不生成替代影片/);
  assert.match(intro, /進入官網/);
  assert.match(intro, /sessionStorage/);
  assert.match(intro, /controls/);
  assert.match(intro, /Boolean\(src\)\s*&&\s*!playbackFailed/);
  assert.match(intro, /onError=\{\(\) => setPlaybackFailed\(true\)\}/);
  assert.match(intro, /\bautoPlay\b/);
  assert.match(intro, /loop=\{!reducedMotion\}/);
  assert.match(intro, /\bmuted\b/);
  assert.match(intro, /\bplaysInline\b/);
  assert.match(intro, /prefers-reduced-motion: reduce/);
  assert.match(intro, /video\.pause\(\)/);
  assert.match(intro, /styles\.introSrOnly/);
  assert.match(css, /\.introVideo\s*\{\s*object-fit:\s*contain;/);
  assert.doesNotMatch(intro, /onEnded=\{enterSite\}|onError=\{enterSite\}/);
  assert.equal(video.subarray(4, 8).toString("ascii"), "ftyp");
  assert.ok(video.length < 15 * 1024 * 1024);
  assert.ok(video.indexOf(Buffer.from("moov")) < video.indexOf(Buffer.from("mdat")), "MP4 must keep faststart metadata before media data");
  assert.equal(
    createHash("sha256").update(video).digest("hex").toUpperCase(),
    "C228E1682778C0C01D9A75C6C4156CE77B7D3AAC891E2CA44838043A8D54682C",
  );
  const actions = intro.slice(intro.indexOf("styles.introActions"));
  assert.ok(
    actions.indexOf("styles.introEnter") < actions.indexOf('id="serene-intro-note"'),
    "the explicit enter action must remain on the left before the supporting note",
  );
});

test("replaces the Runtime 0/1 slot with an honest AICC candidate surface", async () => {
  const [home, siteData, productsPage] = await Promise.all([
    source("app/page.tsx"),
    source("app/site-data.ts"),
    source("app/products/page.tsx"),
  ]);
  const aicc = siteData.slice(siteData.indexOf('slug: "aicc-os"'), siteData.indexOf("];", siteData.indexOf('slug: "aicc-os"')));
  assert.match(aicc, /AICC OS｜AI 能力編譯器/);
  assert.match(aicc, /v0\.2\.CANDIDATE/);
  assert.match(aicc, /href:\s*"\/demo\/aicc-os"/);
  assert.doesNotMatch(aicc, /https?:\/\//);
  assert.match(home, /"AICC"/);
  assert.match(productsPage, /aicc-product-v3/);
  assert.match(productsPage, /Public Runtime 已正式發布或可下載/);
  assert.match(productsPage, /href="\/demo\/aicc-os"/);
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
  const [home, contact, footer] = await Promise.all([
    source("app/page.tsx"),
    source("app/components/ContactComposer.tsx"),
    source("app/components/SiteFooter.tsx"),
  ]);
  assert.match(home, /id="contact"/);
  assert.match(home, /合作聯絡/);
  assert.match(home, /<ContactComposer\s*\/>/);
  assert.match(contact, /CONTACT_EMAIL/);
  assert.match(contact, /window\.location\.assign/);
  assert.match(contact, /buildContactMailto/);
  assert.match(contact, /type="email"/);
  assert.match(contact, /<textarea/);
  assert.match(contact, /本站不保存這份聯絡內容/);
  assert.doesNotMatch(contact, /\bfetch\s*\(|localStorage|\/api\/contact/);
  assert.match(footer, /href="\/studio"/);
});

test("builds a fixed-recipient, encoded mail draft without header injection", () => {
  const href = buildContactMailto({
    locale: "zh",
    name: "許文耀",
    replyEmail: "review@example.com",
    topicLabel: "研究 & 公開文章",
    subject: "合作？#100%",
    message: "第一行\n第二行 & 更多",
  });
  const mail = new URL(href);
  assert.equal(mail.pathname, CONTACT_EMAIL);
  assert.equal(mail.searchParams.get("subject"), "合作？#100%");
  assert.equal(
    mail.searchParams.get("body"),
    "姓名：許文耀\n回信信箱：review@example.com\n合作類型：研究 & 公開文章\n\n第一行\n第二行 & 更多",
  );
  assert.throws(() => buildContactMailto({
    locale: "en",
    name: "Review",
    replyEmail: "not-an-email",
    topicLabel: "Research",
    subject: "Hello",
    message: "Body",
  }), /正確的回信信箱/);
  assert.throws(() => buildContactMailto({
    locale: "en",
    name: "Review",
    replyEmail: "review@example.com",
    topicLabel: "Research",
    subject: "Hello\r\nBcc: injected@example.com",
    message: "Body",
  }), /主旨不能包含換行/);
});

test("turns audited products into no-input, product-specific films", async () => {
  const [films, fixtures, stage, demoPage, localizedDemoPage, works] = await Promise.all([
    source("app/showcase-data.ts"),
    source("app/demo-fixtures.ts"),
    source("app/components/ProductFilmStage.tsx"),
    source("app/demo/[slug]/page.tsx"),
    source("app/[locale]/demo/[slug]/page.tsx"),
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
  assert.match(films + fixtures + stage, /AICC OS/);
  assert.match(films, /presentation: "architecture"/);
  assert.match(films, /SIGNED-VERSION GATE/);
  assert.match(fixtures, /VERSION GAP/);
  assert.match(fixtures, /SIGNED VERSION GATE \/ CONCEPT/);
  assert.match(fixtures, /PUBLIC → L4 FORBIDDEN|PUBLIC → L4 禁止/);
  assert.match(stage, /PUBLIC RUNTIME ARCHITECTURE/);
  assert.match(stage, /PUBLIC AUTHORITY · L1–L3 ONLY/);
  assert.match(demoPage, /候選架構動畫會自動循環/);
  assert.match(demoPage, /四個核心閘門/);
  assert.match(localizedDemoPage, /Candidate architecture film/);
  assert.match(localizedDemoPage, /候選架構動畫/);
  assert.match(works, /SERENE SCHOOL/);
  assert.match(works, /語之神神器展覽篇/);
  assert.match(works, /Artifacts of the Language God/i);
  assert.match(works, /ZS9rDg3ATyPX4-sKjkh/);
  assert.match(works, /2UFVuPkDkTc/);
  assert.doesNotMatch(films + works, /Silent School Creative Universe/i);
  assert.equal((films.match(/status: "deferred"/g) ?? []).length, 1, "only the owner-deferred SCBKR film may remain deferred");
});

test("publishes the verified SCBKR Microsoft Store entry without changing AICC or motion boundaries", async () => {
  const [siteConfig, home, homeData, products, localizedProducts, productData, films, demoPage, resume, localizedResume, localeLayout, llms, layout, sitemap] = await Promise.all([
    source("app/site-config.ts"),
    source("app/page.tsx"),
    source("app/site-data.ts"),
    source("app/products/page.tsx"),
    source("app/[locale]/products/page.tsx"),
    source("app/product-audit-data.ts"),
    source("app/showcase-data.ts"),
    source("app/demo/[slug]/page.tsx"),
    source("app/resume/page.tsx"),
    source("app/[locale]/resume/page.tsx"),
    source("app/[locale]/layout.tsx"),
    source("app/llms.txt/route.ts"),
    source("app/layout.tsx"),
    source("app/sitemap.ts"),
  ]);
  const storeProductId = /9N1SMMBL6J4D/i;
  assert.match(siteConfig, storeProductId);
  assert.match(siteConfig, /https:\/\/apps\.microsoft\.com\/detail\/9n1smmbl6j4d/i);
  assert.match(homeData, /MICROSOFT STORE｜已上架/);
  assert.match(home, /SCBKR Windows 應用免費取得/);
  assert.match(home, /scbkrMicrosoftStore\.url/);
  assert.match(products, /Microsoft Store 免費取得/);
  assert.match(products, /GET FREE ON MICROSOFT STORE/);
  assert.match(localizedProducts, /SCBKR is available free on Microsoft Store/);
  assert.match(demoPage, /從 Microsoft Store 免費取得/);
  assert.match(demoPage, /GET FREE FROM MICROSOFT STORE/);
  assert.match(productData, /storeUrl: scbkrMicrosoftStore\.url/);
  assert.match(films, /storeUrl: scbkrMicrosoftStore\.url/);
  assert.equal((productData.match(/storeUrl:/g) ?? []).length, 1, "SCBKR is the only audited product with a Store value");
  assert.equal((films.match(/storeUrl:/g) ?? []).length, 1, "SCBKR is the only film record with a Store value");
  assert.equal((films.match(/status: "deferred"/g) ?? []).length, 1);
  assert.match(resume, /OFFICIAL DISTRIBUTION · MICROSOFT STORE/);
  assert.match(resume, /dateModified: "2026-08-26"/);
  assert.match(localizedResume, /SCBKR Windows application on Microsoft Store/);
  assert.match(localeLayout, /SCBKR Windows application on Microsoft Store/);
  assert.match(llms, /SCBKR Windows application/);
  assert.match(llms, /Installation availability remains subject to Microsoft Store region and device compatibility/);
  assert.match(layout, /SoftwareApplication/);
  assert.match(layout, /downloadUrl: scbkrMicrosoftStore\.url/);
  assert.match(sitemap, /2026-08-26/);
  assert.match(home + homeData + products + films + llms, /v0\.2\.CANDIDATE/);
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
  assert.match(about, /OWNER-REPORTED HACKATHON RECORD/);
  assert.match(about, /本人紀錄：Gogolook 命題組 Team 11/);
  assert.match(about, /目前未見主辦方公開個人名冊/);
  assert.match(about, /SCBKR \+ R-Lock/);
  assert.match(about, /ai-expo\.tw\/kiro_hackathon_2026/);
  assert.match(about, /instagram\.com\/p\/DW9Jwi5kTZO/);
  assert.match(about, /youtube\.com\/watch\?v=MLZiapRm2_o/);
  assert.doesNotMatch(about, /公開驗證|public test/i);
  assert.doesNotMatch(news, /Team 11|agent-for-truth-hackathon/);
  await access(new URL("public/media/public-activity/agent-for-truth-hackathon.jpg", projectRoot));
});

test("publishes a bilingual source-labelled living resume and removes the legacy PDF surface", async () => {
  const [resume, resumeCss, printButton, localizedResume, header, footer, about, sitemap, llms] = await Promise.all([
    source("app/resume/page.tsx"),
    source("app/resume/resume.module.css"),
    source("app/resume/PrintResumeButton.tsx"),
    source("app/[locale]/resume/page.tsx"),
    source("app/components/SiteHeader.tsx"),
    source("app/components/SiteFooter.tsx"),
    source("app/about/page.tsx"),
    source("app/sitemap.ts"),
    source("app/llms.txt/route.ts"),
  ]);

  assert.match(resume, /VERIFIED PUBLIC PROFILE/);
  assert.match(resume, /許文耀/);
  assert.match(resume, /WEN-YAO HSU/);
  assert.match(resume, /SERENE SCHOOL STUDIO/);
  assert.match(resume, /THIRD-PARTY PRESS/);
  assert.match(resume, /PLATFORM RECORD/);
  assert.match(resume, /PUBLIC ENGINEERING/);
  assert.match(resume, /OWNER-REPORTED/);
  assert.match(resume, /SCBKR/);
  assert.match(resume, /AICC OS/);
  assert.match(resume, /ENGINEERING CANDIDATE; PUBLIC RUNTIME NOT RELEASED/);
  assert.match(resume, /SOURCE COMPLETE \/ DEPLOYMENT PENDING/);
  assert.match(resume, /DEMO \/ POC · NOT A PRODUCTION DECISION SYSTEM/);
  assert.match(resume, /4th-ai-arts-competition-submissions/);
  assert.match(resume, /COMMUNITY CONTENT; NO NVIDIA PARTNERSHIP/);
  assert.match(resume, /歷史英文名稱 Silent School Studio/);
  assert.match(resume, /不虛構公司登記、團隊規模、學位、專利、獎項、客戶、採用或合作關係/);
  assert.match(resume, /getProfileSchema/);
  assert.match(resume, /inLanguage: language/);
  assert.match(resume, /dateModified: "2026-08-26"/);
  assert.match(localizedResume, /\/zh\/resume/);
  assert.match(localizedResume, /\/en\/resume/);
  assert.match(localizedResume, /title: \{ absolute:/);
  assert.match(localizedResume, /"x-default": "\/zh\/resume"/);
  assert.match(localizedResume, /generateMetadata/);
  assert.match(localizedResume, /<ResumePage locale=/);
  assert.match(resume, /founder of SERENE SCHOOL STUDIO/);

  assert.match(printButton, /window\.print\(\)/);
  assert.match(printButton, /type="button"/);
  assert.match(resumeCss, /@media print/);
  assert.match(resumeCss, /prefers-reduced-motion/);
  assert.match(resumeCss, /page-break-inside: avoid/);

  assert.match(header, /href="\/resume"/);
  assert.match(footer, /href="\/resume"/);
  assert.match(about, /<LocalizedLink href="\/resume"/);
  assert.doesNotMatch(about, /Wen-Yao-Hsu-Resume\.pdf/);
  assert.match(sitemap, /"\/resume"/);
  assert.match(llms, /\/zh\/resume/);
  assert.match(llms, /\/en\/resume/);
  assert.match(llms, /Evidence labels on the public resume are deliberate/);

  await assert.rejects(access(new URL("public/Wen-Yao-Hsu-Resume.pdf", projectRoot)));
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

test("protects the owner CMS at the page, API and upload boundaries", async () => {
  const [
    studioPage,
    studioAuth,
    guard,
    postApi,
    museumApi,
    uploadApi,
    studioImage,
    mediaApi,
    editor,
    museumEditor,
    license,
  ] = await Promise.all([
    source("app/studio/page.tsx"),
    source("app/studio-auth.ts"),
    source("app/studio-guard.ts"),
    source("app/api/studio/posts/route.ts"),
    source("app/api/studio/museum/route.ts"),
    source("app/api/studio/upload/route.ts"),
    source("app/studio-image.ts"),
    source("app/api/media/[...key]/route.ts"),
    source("app/studio/StudioEditor.tsx"),
    source("app/studio/MuseumEditor.tsx"),
    source(".pi1/licenses/SERENE-SCHOOL-STUDIO-WEBSITE-CMS-v1/LICENSE.md"),
  ]);

  assert.match(studioAuth, /ken0963521@gmail\.com/);
  assert.match(studioAuth, /getChatGPTUser/);
  assert.ok(
    studioPage.indexOf("if (!owner && !localPreview)") < studioPage.indexOf("listAllPosts()"),
    "owner gate must run before private post reads",
  );
  assert.ok(
    studioPage.indexOf("if (!owner && !localPreview)") < studioPage.indexOf("listAllMuseumEntries()"),
    "owner gate must run before private museum reads",
  );
  assert.match(studioPage, /process\.env\.NODE_ENV === "development"/);
  assert.doesNotMatch(studioPage, /headers\(\)|startsWith\("localhost"\)|startsWith\("127\.0\.0\.1"\)/);

  for (const api of [postApi, museumApi, uploadApi]) {
    assert.match(api, /getStudioOwner/);
    assert.match(api, /private,\s*no-store/);
  }
  for (const api of [postApi, museumApi]) {
    assert.match(api, /readStudioJson\(request\)/);
    assert.match(api, /studioSlug/);
    assert.match(api, /studioVideoUrl/);
    assert.match(api, /studioId/);
    assert.match(api, /deleteManagedCoverIfUnreferenced/);
    assert.match(api, /找不到要更新[\s\S]*?,\s*404\)/);
  }

  assert.match(guard, /sec-fetch-site/);
  assert.match(guard, /!origin \|\| origin !== requestUrl\.origin/);
  assert.match(guard, /application\/json/);
  assert.match(guard, /content-length/);
  assert.match(guard, /url\.protocol !== "https:"/);
  assert.match(guard, /YouTube 或 TikTok 官方網址/);
  assert.doesNotMatch(guard, /javascript:|data:/);

  assert.match(uploadApi, /assertStudioMultipartRequest/);
  assert.match(studioImage, /image\/jpeg/);
  assert.match(studioImage, /image\/png/);
  assert.match(studioImage, /image\/webp/);
  assert.doesNotMatch(studioImage, /image\/svg\+xml/);
  assert.match(uploadApi, /matchesImageSignature/);
  assert.match(uploadApi, /圖片儲存空間尚未連接/);
  assert.match(mediaApi, /nosniff/);
  assert.match(mediaApi, /covers/);

  assert.match(editor, /accept="image\/jpeg,image\/png,image\/webp"/);
  assert.match(editor, /網址代碼/);
  assert.match(museumEditor, /accept="image\/jpeg,image\/png,image\/webp"/);
  assert.match(license, /不得把任何密碼、權杖、Cookie 或秘密寫入程式、Git、駕照或收據/);
  assert.match(license, /OWNER_REVIEW/);
});

test("publishes crawler, AI discovery and structured-search surfaces", async () => {
  const [robots, sitemap, llms, siteConfig, demoMeta, reportMeta, museumMeta] = await Promise.all([
    source("app/robots.ts"),
    source("app/sitemap.ts"),
    source("app/llms.txt/route.ts"),
    source("app/site-config.ts"),
    source("app/[locale]/demo/[slug]/page.tsx"),
    source("app/[locale]/news/[slug]/page.tsx"),
    source("app/[locale]/news/museum/[slug]/page.tsx"),
  ]);
  assert.match(robots, /OAI-SearchBot/);
  assert.match(robots, /GPTBot/);
  assert.match(robots, /sitemap\.xml/);
  assert.match(siteConfig, /normalizeSiteOrigin/);
  assert.match(siteConfig, /NEXT_PUBLIC_SITE_URL/);
  assert.match(sitemap, /\(\["zh", "en"\] as const\)\.flatMap/);
  assert.match(sitemap, /\/resume/);
  assert.match(sitemap, /\/news\/museum/);
  assert.match(sitemap, /listPublishedPosts/);
  assert.match(sitemap, /listPublishedMuseumEntries/);
  assert.match(sitemap, /archiveReports/);
  assert.match(sitemap, /archiveMuseumItems/);
  assert.match(sitemap, /"x-default"/);
  assert.doesNotMatch(sitemap, /const routes = \["\/"/);
  for (const localizedMeta of [demoMeta, reportMeta, museumMeta]) {
    assert.match(localizedMeta, /localizedAlternates\(locale, path\)/);
    assert.match(localizedMeta, /url: `\/\$\{locale\}\$\{path\}`/);
    assert.match(localizedMeta, /locale === "en" \? "en_US" : "zh_TW"/);
    assert.match(localizedMeta, /alternateLocale/);
  }
  assert.match(llms, /SERENE SCHOOL STUDIO/);
  assert.match(llms, /siteUrl\("\/zh"\)/);
  assert.match(llms, /text\/plain; charset=utf-8/);
  assert.match(llms, /Artifacts of the Language God/);
  assert.match(llms, /Agent for Truth/);
  assert.match(llms, /NVIDIA links are community posts/);
  assert.match(llms, /AICC OS candidate/);
  assert.match(llms, /v0\.2\.CANDIDATE/);
});
