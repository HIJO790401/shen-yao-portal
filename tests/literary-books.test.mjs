import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  booksHubEntries,
  stillnessIsALanguage,
  stillnessPubuUrl,
} from "../app/books-data.ts";
import { stillnessEnglishPreview } from "../app/stillness-preview-data.ts";

const root = new URL("../", import.meta.url);
const rootPath = fileURLToPath(root);
const source = (file) => readFile(new URL(file, root), "utf8");

async function listFilesRecursively(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? listFilesRecursively(target) : [target];
  }));
  return files.flat();
}

test("publishes a bilingual books hierarchy discoverable from the main site", async () => {
  const [header, footer, home, works, hub, detail, preview] = await Promise.all([
    source("app/components/SiteHeader.tsx"),
    source("app/components/SiteFooter.tsx"),
    source("app/page.tsx"),
    source("app/works/page.tsx"),
    source("app/[locale]/books/page.tsx"),
    source("app/[locale]/books/stillness-is-a-language/page.tsx"),
    source("app/[locale]/books/stillness-is-a-language/preview/page.tsx"),
  ]);

  for (const chrome of [header, footer]) {
    assert.match(chrome, /href="\/books"/);
    assert.match(chrome, /zh="書籍"/);
    assert.match(chrome, /en="BOOKS"/);
  }
  assert.match(home, /href="\/books(?:\/stillness-is-a-language)?"/);
  assert.match(home, /沉靜是一種語言/);
  assert.match(works, /文學與書籍/);
  assert.match(works, /LITERATURE & BOOKS/);
  assert.match(works, /href="\/books\/stillness-is-a-language"/);
  assert.match(hub, /booksHubEntries/);
  assert.match(detail, /stillnessIsALanguage\.previewRoute/);
  assert.match(preview, /stillnessEnglishPreview/);
});

test("books routes are indexable, bilingual and represented in public discovery files", async () => {
  const [hub, detail, preview, sitemap, llms, rootLayout, localeProxy] = await Promise.all([
    source("app/[locale]/books/page.tsx"),
    source("app/[locale]/books/stillness-is-a-language/page.tsx"),
    source("app/[locale]/books/stillness-is-a-language/preview/page.tsx"),
    source("app/sitemap.ts"),
    source("app/llms.txt/route.ts"),
    source("app/layout.tsx"),
    source("proxy.ts"),
  ]);

  for (const page of [hub, detail, preview]) {
    assert.match(page, /localizedAlternates\(locale,/);
    assert.match(page, /robots:\s*\{ index: true, follow: true \}/);
  }
  assert.match(hub, /"@type": "CollectionPage"/);
  assert.match(detail, /"@type": "Book"/);
  assert.match(detail, /"@type": "BreadcrumbList"/);
  assert.match(detail, /application\/ld\+json/);

  for (const route of [
    "/books",
    "/books/stillness-is-a-language",
    "/books/stillness-is-a-language/preview",
  ]) {
    assert.ok(sitemap.includes(JSON.stringify(route)), `${route} must be included in sitemap source`);
  }
  assert.match(sitemap, /"zh-Hant"/);
  assert.match(sitemap, /"x-default"/);
  assert.match(llms, /Literary works and books/);
  assert.match(llms, /Stillness Is a Language/);
  assert.match(llms, /\/zh\/books\/stillness-is-a-language\/preview/);
  assert.match(llms, /\/en\/books\/stillness-is-a-language\/preview/);
  assert.match(llms, /full PDF and EPUB are not public website downloads/i);
  assert.match(rootLayout, /x-serene-document-language/);
  assert.match(rootLayout, /lang=\{documentLanguage\}/);
  assert.match(localeProxy, /\/en/);
  assert.match(localeProxy, /\/zh/);
});

test("book data preserves bilingual identity, edition and storefront boundaries", () => {
  assert.equal(booksHubEntries.length, 3);
  assert.deepEqual(
    booksHubEntries.map(({ id }) => id),
    [
      "stillness-is-a-language",
      "interrogation-room",
      "judgment-of-civilization",
    ],
  );

  assert.equal(stillnessIsALanguage.edition.zh.title, "沉靜是一種語言");
  assert.equal(stillnessIsALanguage.edition.en.title, "Stillness Is a Language");
  assert.equal(stillnessIsALanguage.edition.zh.subtitle, "在找不到語言之前");
  assert.equal(stillnessIsALanguage.edition.en.subtitle, "Before Words Are Found");
  assert.equal(stillnessIsALanguage.authorIdentity.zh.displayLine, "許文耀／嗨啾／沈耀888PI");
  assert.equal(stillnessIsALanguage.authorIdentity.en.displayLine, "WENYAOHUS / HI-JIU / SHEN YAO888PI");
  assert.match(stillnessIsALanguage.authorIdentity.zh.explanation, /三個名字都指向我，不是三位合著者/);
  assert.match(stillnessIsALanguage.authorIdentity.en.explanation, /All three names refer to me, not three co-authors/i);

  assert.equal(stillnessIsALanguage.stores.zh.state, "publicly-available");
  assert.equal(stillnessIsALanguage.stores.zh.url, stillnessPubuUrl);
  assert.equal(stillnessPubuUrl, "https://www.pubu.com.tw/ebook/700139");
  assert.equal(stillnessIsALanguage.stores.zh.price, "NT$199");
  assert.equal(stillnessIsALanguage.stores.en.state, "not-yet-for-sale");
  assert.equal(stillnessIsALanguage.stores.en.url, null);
  assert.equal(stillnessIsALanguage.stores.en.price, "US$6.25");
  assert.match(stillnessIsALanguage.stores.en.note, /remains local and has not been uploaded/i);

  assert.equal(stillnessIsALanguage.preview.zh.proportion, "17 / 76 pages · 22.4%");
  assert.match(stillnessIsALanguage.preview.en.proportion, /16\.46%.*2,305 \/ 14,004 words/);
  assert.deepEqual(stillnessIsALanguage.sourceState, {
    checkedAt: "2026-10-12",
    fullChinesePdfPublic: false,
    fullChineseEpubPublic: false,
    fullEnglishManuscriptPublic: false,
    fullEnglishEpubPublic: false,
  });
});

test("public book media is exactly the two covers and verified Chinese preview", async () => {
  const assetDirectory = new URL("public/media/books/stillness-is-a-language/", root);
  const assets = (await readdir(assetDirectory)).sort();
  assert.deepEqual(assets, [
    "cover-en.jpg",
    "cover-zh.jpg",
    "preview-zh-part-one.pdf",
  ]);

  const previewPdf = await readFile(new URL("preview-zh-part-one.pdf", assetDirectory));
  const digest = createHash("sha256").update(previewPdf).digest("hex").toUpperCase();
  assert.equal(digest, "A745D5C6DF021068B448026FD77AAB37FDA10A36540C65A2E6046705D32C5B10");
});

test("public tree excludes editable and complete-book source formats", async () => {
  const publicFiles = await listFilesRecursively(path.join(rootPath, "public"));
  const prohibited = publicFiles.filter((file) => /\.(?:epub|docx)$/i.test(file));
  assert.deepEqual(prohibited, []);

  const publicBookFiles = publicFiles
    .filter((file) => file.includes(`${path.sep}media${path.sep}books${path.sep}`))
    .map((file) => path.basename(file));
  assert.doesNotMatch(publicBookFiles.join("\n"), /full|complete|interior|print/i);
});

test("English public sample stops at Part One and contains all five authorized essays", async () => {
  const previewSource = await source("app/stillness-preview-data.ts");
  assert.equal(stillnessEnglishPreview.part.number, 1);
  assert.equal(stillnessEnglishPreview.part.title, "Part One: Hearing Silence");
  assert.equal(stillnessEnglishPreview.part.essays.length, 5);
  assert.deepEqual(
    stillnessEnglishPreview.part.essays.map(({ title }) => title),
    [
      "Understanding",
      "Not Knowing",
      "Understanding Is the Slowest Thing I Have Learned",
      "Things I Still Cannot Learn Online",
      "When People Say “The World Won’t Wait,” I Have Already Crossed Mountains Within",
    ],
  );
  assert.doesNotMatch(previewSource, /Part Two|PART TWO|第二部/);
});

test("English public sample body remains identical to the owner-approved release copy", () => {
  const approvedBody = {
    openingSections: stillnessEnglishPreview.openingSections,
    part: stillnessEnglishPreview.part,
  };
  const digest = createHash("sha256")
    .update(JSON.stringify(approvedBody))
    .digest("hex")
    .toUpperCase();

  assert.equal(
    digest,
    "B00ED399BE495F65877F7ED1AFB23544E8A2E02C75D34BC526624ABC21E0829C",
    "the public English sample changed; recheck every sentence against Stillness_Is_a_Language_English_Sample_Part_One.md before updating this receipt",
  );

  const publicCopy = JSON.stringify(stillnessEnglishPreview);
  for (const unauthorizedSoftening of [
    "Both may still care",
    "People do not necessarily fail to understand you",
    "It can be an open door to honesty and possibility",
    "That was when I felt what understanding could be",
    "This reminder has its place in our time",
  ]) {
    assert.ok(
      !publicCopy.includes(unauthorizedSoftening),
      `owner-approved language must not be softened to: ${unauthorizedSoftening}`,
    );
  }
});
