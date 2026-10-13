import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { getDemoFixture } from "../app/demo-fixtures.ts";

const root = new URL("../", import.meta.url);
const source = (file) => readFile(new URL(file, root), "utf8");
const slug = "semantic-firewall-causal-system";

test("semantic firewall causal product is a bilingual audited product with a direct official-site route", async () => {
  const products = await source("app/product-audit-data.ts");
  assert.match(products, /code: "SF-07"/);
  assert.match(products, /titleZh: "語意防火牆資安因果系統"/);
  assert.match(products, /titleEn: "Semantic Firewall Causal Security System"/);
  assert.match(products, /detailHref: "\/products\/semantic-firewall-causal-system"/);
  assert.match(products, /repo: "https:\/\/github\.com\/HIJO790401\/semantic-firewall-causal-demo"/);
  assert.match(products, /既有登入/);
  assert.match(products, /主體、裝置、環境、時間、工作、規則與責任/);
  assert.match(products, /same-candidate review/i);
  assert.match(products, /固定合成資料/);
  assert.match(products, /no live verification or authorization/i);
});

test("website demo preserves the public walkthrough logic as fixed synthetic no-input scenes", async () => {
  const filmSource = await source("app/showcase-data.ts");
  const fixture = getDemoFixture(slug);
  assert.ok(fixture);
  assert.match(filmSource, /code: "SF-07", slug: "semantic-firewall-causal-system"/);
  assert.match(filmSource, /status: "ready"/);
  assert.match(filmSource, /sourceRepo: "https:\/\/github\.com\/HIJO790401\/semantic-firewall-causal-demo"/);
  assert.equal(fixture.kind, "causal");
  assert.ok(fixture.scenes.length >= 9);

  const payload = JSON.stringify(fixture);
  for (const phrase of [
    "既有登入",
    "主體",
    "裝置",
    "環境",
    "前檢",
    "有界",
    "同一候選",
    "受控執行",
    "回放",
    "STOP",
    "BLOCK",
  ]) {
    assert.match(payload, new RegExp(phrase, "i"));
  }
  assert.match(payload, /synthetic/i);
  assert.match(payload, /no model, private backend/i);
  assert.match(payload, /no (?:live )?(?:verification|authorization)/i);
  assert.doesNotMatch(payload, /production SaaS|completed enterprise integration/i);

  for (const scene of fixture.scenes) {
    assert.ok(scene.title.zh.trim());
    assert.ok(scene.title.en.trim());
    assert.ok(scene.body.zh.trim());
    assert.ok(scene.body.en.trim());
  }
});

test("dedicated product pages expose bilingual metadata, exact boundaries and existing enterprise contact", async () => {
  const [page, localizedPage, css] = await Promise.all([
    source("app/products/semantic-firewall-causal-system/page.tsx"),
    source("app/[locale]/products/semantic-firewall-causal-system/page.tsx"),
    source("app/products/semantic-firewall-causal-system/semantic-firewall-causal.module.css"),
  ]);

  assert.match(page, /許文耀／沈耀888π/);
  assert.match(page, /WENYAO HSU \/ SHEN-YAO 888π/);
  assert.match(page, /登入成功，只確認你是誰/);
  assert.match(page, /Successful sign-in verifies who you are/);
  assert.match(page, /固定合成/);
  assert.match(page, /FIXED SYNTHETIC/);
  assert.match(page, /官網公開展示不連接真實登入、GPS、裝置核驗、模型、企業系統、授權服務、資料庫或稽核證據/);
  assert.match(page, /private backend, rule core, full formulas/i);
  assert.match(page, /mailto:ken0963521@gmail\.com/);
  assert.match(page, /https:\/\/hijo790401\.github\.io\/semantic-firewall-causal-demo\//);
  assert.match(page, /https:\/\/github\.com\/HIJO790401\/semantic-firewall-causal-demo/);
  assert.match(page, /application\/ld\+json/);
  assert.match(page, /"@graph"/);
  assert.match(page, /"@type": "BreadcrumbList"/);
  assert.match(page, /inLanguage: isEnglish \? "en" : "zh-Hant"/);
  assert.match(page, /siteUrl\(`\/\$\{locale\}\/products\/semantic-firewall-causal-system`\)/);
  assert.match(page, /ProductFilmStage/);
  assert.match(localizedPage, /localizedAlternates\(locale,/);
  assert.match(localizedPage, /"causal security system"/);
  assert.match(localizedPage, /Wen-Yao Hsu/);
  assert.match(localizedPage, /en_US/);
  assert.match(localizedPage, /zh_TW/);
  assert.match(css, /@media \(max-width: 720px\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
});

test("causal security product is discoverable in product archive, sitemap, llms and root metadata", async () => {
  const [products, localizedProducts, sitemap, llms, layout, task] = await Promise.all([
    source("app/products/page.tsx"),
    source("app/[locale]/products/page.tsx"),
    source("app/sitemap.ts"),
    source("app/llms.txt/route.ts"),
    source("app/layout.tsx"),
    source(".pi1/tasks/TASK-20261014-SEMANTIC-FIREWALL-CAUSAL-SYSTEM-V1/task.yaml"),
  ]);

  assert.match(products, /product\.detailHref/);
  assert.match(localizedProducts, /AI Safety & Governance Products/);
  assert.match(sitemap, /products\/semantic-firewall-causal-system/);
  assert.match(llms, /Semantic Firewall Causal Security System/);
  assert.match(llms, /keep existing sign-in/i);
  assert.match(llms, /fixed synthetic scenarios/i);
  assert.match(llms, /no visible LICENSE/i);
  assert.match(layout, /effect eligibility/);
  assert.match(layout, /bounded compute/);
  assert.match(task, /39c93a7813245e6f215cc1c6335d5e2484c03d00/);
  assert.match(task, /private_backend/);
  assert.match(task, /final_gate: (?:IN_PROGRESS|READY_FOR_DEPLOYMENT|COMPLETE)/);
});
