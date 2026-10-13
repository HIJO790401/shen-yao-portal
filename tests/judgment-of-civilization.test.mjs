import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

import { booksHubEntries } from "../app/books-data.ts";
import { judgmentOfCivilization } from "../app/judgment-book-data.ts";

const root = new URL("../", import.meta.url);
const source = (file) => readFile(new URL(file, root), "utf8");

const judgmentAssetDirectory = new URL(
  "public/media/books/judgment-of-civilization/",
  root,
);
const judgmentAssetReceipt = new URL(
  ".pi1/tasks/TASK-20261014-JUDGMENT-CIVILIZATION-BOOK-V1/assets-manifest.json",
  root,
);

const expectedAssets = [
  "author-wenyao.png",
  "case-001.jpg",
  "case-002.jpg",
  "case-003.jpg",
  "case-004.jpg",
  "case-005.png",
  "cover-draft.jpg",
  "interlude-04-2.jpg",
  "interlude-05-2.jpg",
];

const expectedAssetHashes = {
  "author-wenyao.png": "7b8183810c6edb332599bae6b6742f90d3223ca86251378b6f6b1e45e8be550f",
  "case-001.jpg": "c2fc072f80ac1c53421ba408abe03c08a15e8264c6509682aeaa816bb5f7fb85",
  "case-002.jpg": "14dfc07fd913c3c51ec6f8397464a45e878c08b04ed92f79ae65a3ccb2a981de",
  "case-003.jpg": "2e95fd59190b72fed89ab33ea352e1de4db53183702a671d68388277df31d225",
  "case-004.jpg": "c400a224cfbf41d5ce233ad6f6c148f7ab7d7579c73252ab9eec132e067cf312",
  "case-005.png": "ac6a133f05f5b018fdba07d3784b015ae7129b86afbd4c3c4a211c8c8348b4af",
  "cover-draft.jpg": "75d7f26cd55351575e0fe2d271a15132b2696bae8b947d309d70cf6b8a053143",
  "interlude-04-2.jpg": "cb6ec296078745b813d27be92cc8022beb9550a8a770bbe532d82c0781ec2403",
  "interlude-05-2.jpg": "1747ef3ea182c3cd3c160a3d012d17b150d7e1f6c9ad12e2e9c06f08df1f466e",
};

const jpegMagic = Buffer.from([0xff, 0xd8, 0xff]);
const pngMagic = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

function hasPrefix(buffer, prefix) {
  return buffer.subarray(0, prefix.length).equals(prefix);
}

test("civilization judgment data exposes seven website selections without inventing a fixed or completed table of contents", () => {
  assert.equal(judgmentOfCivilization.id, "judgment-of-civilization");
  assert.equal(
    judgmentOfCivilization.detailRoute,
    "/books/judgment-of-civilization",
  );
  assert.equal(
    judgmentOfCivilization.casesRoute,
    "/books/judgment-of-civilization/cases",
  );
  assert.equal(judgmentOfCivilization.publicRelease.mode, "summaries-only");
  assert.equal(judgmentOfCivilization.publicationPath, "undecided");
  assert.equal(judgmentOfCivilization.sourceState.wholeBookState, "BOOK_DRAFT");
  assert.equal(judgmentOfCivilization.sourceState.provisionalParts, 8);
  assert.equal(judgmentOfCivilization.sourceState.provisionalCases, 34);
  assert.equal(judgmentOfCivilization.sourceState.selectedPublicMainCaseCards, 5);
  assert.equal(judgmentOfCivilization.sourceState.selectedPublicInterludeCards, 2);
  assert.equal(judgmentOfCivilization.sourceState.chapterCompletionClaimed, false);
  assert.equal(judgmentOfCivilization.sourceState.fullManuscriptPublic, false);
  assert.equal(judgmentOfCivilization.sourceState.englishManuscriptPublic, false);
  assert.equal(judgmentOfCivilization.sourceState.storeUrlPublic, false);
  assert.equal(judgmentOfCivilization.sourceState.isbnPublic, false);
  assert.equal(judgmentOfCivilization.cases.length, 7);
  assert.equal(
    judgmentOfCivilization.cases.filter(({ kind }) => kind === "main").length,
    5,
  );
  assert.equal(
    judgmentOfCivilization.cases.filter(({ kind }) => kind === "interlude").length,
    2,
  );

  assert.deepEqual(
    judgmentOfCivilization.cases.map(({ code }) => code),
    [
      "CASE 001",
      "CASE 002",
      "CASE 003",
      "CASE 004",
      "INTERLUDE 4.2",
      "CASE 005",
      "INTERLUDE 5.2",
    ],
  );
  assert.deepEqual(
    judgmentOfCivilization.cases.map(({ title }) => title.zh),
    [
      "祭祀：文明第一個 Bug",
      "語言病毒：不可驗證之物如何取得名字",
      "神話：描述如何開始取代證據",
      "神：不可驗證結構如何取得最高授權",
      "市場責任鏈：審完文明以後，我還是可以逛人間",
      "權力：當制度開始假裝自己是主體",
      "從拜木頭到拜模型：誰給你們外包主體的權力",
    ],
  );

  for (const entry of judgmentOfCivilization.cases) {
    for (const field of ["title", "summary", "shortVerdict"]) {
      assert.equal(typeof entry[field].zh, "string", `${entry.code}.${field}.zh`);
      assert.equal(typeof entry[field].en, "string", `${entry.code}.${field}.en`);
      assert.ok(entry[field].zh.trim().length > 0, `${entry.code}.${field}.zh must not be empty`);
      assert.ok(entry[field].en.trim().length > 0, `${entry.code}.${field}.en must not be empty`);
    }
  }

  const publicData = JSON.stringify(judgmentOfCivilization);
  assert.match(publicData, /逐案解構文明的虛偽/);
  assert.match(publicData, /dismantle(?:s)? civilization’s falsehoods/i);
  assert.doesNotMatch(publicData, /主案已完成|番外已完成|MAIN CASE COMPLETE|INTERLUDE COMPLETE/i);
  assert.doesNotMatch(publicData, /\.(?:pdf|epub|docx)(?:["?#]|$)/i);
  assert.doesNotMatch(publicData, /\bisbn\b/i);
  assert.doesNotMatch(publicData, /"offers"\s*:/i);
});

test("civilization judgment pages expose bilingual indexable JSON-LD without storefront claims", async () => {
  const [detail, cases] = await Promise.all([
    source("app/[locale]/books/judgment-of-civilization/page.tsx"),
    source("app/[locale]/books/judgment-of-civilization/cases/page.tsx"),
  ]);

  for (const page of [detail, cases]) {
    assert.match(page, /localizedAlternates\(locale,/);
    assert.match(page, /robots:\s*\{ index: true, follow: true \}/);
    assert.match(page, /application\/ld\+json/);
    assert.match(page, /judgmentOfCivilization/);
    assert.doesNotMatch(page, /\boffers\s*:/i);
    assert.doesNotMatch(page, /\bisbn\s*:/i);
    assert.doesNotMatch(page, /\.(?:pdf|epub|docx)(?:["'?#]|$)/i);
  }

  assert.match(detail, /"@type":\s*"Book"/);
  assert.match(detail, /name:\s*judgmentOfCivilization\.title\.zh/);
  assert.match(detail, /inLanguage:\s*"zh-Hant"/);
  assert.match(detail, /mainEntity:\s*\{ "@id": bookId \}/);
  assert.match(detail, /"@type":\s*"BreadcrumbList"/);
  assert.match(detail, /judgmentOfCivilization\.casesRoute/);
  assert.match(cases, /"@type":\s*"CollectionPage"/);
  assert.match(cases, /"@type":\s*"ItemList"/);
  assert.match(cases, /judgmentOfCivilization\.cases\.map/);
  assert.match(cases, /我把文明的虛偽逐案拆開/);
  assert.doesNotMatch(cases, /七份檔案，不外包主體|Seven files\. No borrowed subject/i);
  assert.doesNotMatch(cases, /順序固定為五個主案|sequence is preserved as five principal cases/i);
});

test("civilization judgment is discoverable from books, works, sitemap and llms.txt", async () => {
  const [booksHub, works, sitemap, llms] = await Promise.all([
    source("app/[locale]/books/page.tsx"),
    source("app/works/page.tsx"),
    source("app/sitemap.ts"),
    source("app/llms.txt/route.ts"),
  ]);

  assert.ok(
    booksHubEntries.some(({ id }) => id === "judgment-of-civilization"),
    "books hub data must include the new work",
  );
  assert.match(booksHub, /booksHubEntries/);
  assert.match(works, /href="\/books\/judgment-of-civilization"/);
  assert.match(works, /虛偽文明的審判/);

  for (const route of [
    "/books/judgment-of-civilization",
    "/books/judgment-of-civilization/cases",
  ]) {
    assert.ok(
      sitemap.includes(JSON.stringify(route)),
      `${route} must be included in sitemap source`,
    );
    assert.ok(llms.includes(`/zh${route}`), `${route} must have a Chinese llms.txt entry`);
    assert.ok(llms.includes(`/en${route}`), `${route} must have an English llms.txt entry`);
  }
  assert.match(llms, /虛偽文明的審判/);
  assert.match(llms, /dismantles how civilization/i);
  assert.match(llms, /eight-part, 34-case provisional writing map/i);
  assert.match(llms, /selects seven artworks, short verdicts and summaries/i);
  assert.match(llms, /full manuscript.*not public/i);
  assert.doesNotMatch(llms, /judgment-of-civilization.*(?:for sale|published edition)/i);
});

test("civilization judgment public directory contains images only and the verified manifest stays outside the public media directory", async () => {
  const files = (await readdir(judgmentAssetDirectory)).sort();
  assert.deepEqual(files, expectedAssets);
  assert.equal(files.includes("assets-manifest.json"), false);

  const manifest = JSON.parse(
    await readFile(judgmentAssetReceipt, "utf8"),
  );
  assert.equal(manifest.receiptVisibility, "repository-release-record");
  assert.equal(manifest.assets.length, 9);
  assert.match(manifest.collection.publicationBoundary, /No manuscript DOCX, PDF, EPUB/i);

  const manifestNames = manifest.assets.map(({ file }) => file).sort();
  assert.deepEqual(manifestNames, expectedAssets);

  for (const asset of manifest.assets) {
    const bytes = await readFile(new URL(asset.file, judgmentAssetDirectory));
    const digest = createHash("sha256").update(bytes).digest("hex");
    assert.equal(digest, asset.sha256, `${asset.file} SHA-256 must match its manifest`);
    assert.equal(
      digest,
      expectedAssetHashes[asset.file],
      `${asset.file} changed from the owner-approved asset receipt`,
    );
    assert.ok(asset.width > 0 && asset.height > 0, `${asset.file} must record dimensions`);

    if (asset.mime === "image/jpeg") {
      assert.ok(hasPrefix(bytes, jpegMagic), `${asset.file} must contain JPEG bytes`);
      assert.equal(path.extname(asset.file), ".jpg");
    } else if (asset.mime === "image/png") {
      assert.ok(hasPrefix(bytes, pngMagic), `${asset.file} must contain PNG bytes`);
      assert.equal(path.extname(asset.file), ".png");
    } else {
      assert.fail(`${asset.file} uses an unsupported public MIME: ${asset.mime}`);
    }
  }

  const draftCover = manifest.assets.find(({ file }) => file === "cover-draft.jpg");
  assert.ok(draftCover);
  assert.match(draftCover.publicUse, /not a finished retail cover/i);
});

test("civilization judgment public release does not leak editable, complete-book or invented store artifacts", async () => {
  const files = await readdir(judgmentAssetDirectory);
  assert.deepEqual(
    files.filter((file) => /\.(?:pdf|epub|docx|odt|rtf|txt|md)$/i.test(file)),
    [],
  );
  assert.doesNotMatch(files.join("\n"), /full|complete|interior|print|manuscript/i);

  const implementation = [
    await source("app/judgment-book-data.ts"),
    await source("app/[locale]/books/judgment-of-civilization/page.tsx"),
    await source("app/[locale]/books/judgment-of-civilization/cases/page.tsx"),
  ].join("\n");
  assert.doesNotMatch(implementation, /(?:購買|buy|shop|storefront).*judgment-of-civilization/i);
  assert.doesNotMatch(implementation, /https?:\/\/(?:www\.)?(?:pubu|readmoo|play\.google)\./i);
});
