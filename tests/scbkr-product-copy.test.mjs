import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function source(path) {
  return readFile(new URL(path, projectRoot), "utf8");
}

test("SCBKR public copy stays aligned with the 2.3.1 Store release", async () => {
  const [home, showcase, products, detail, localizedMetadata, discovery] = await Promise.all([
    source("app/site-data.ts"),
    source("app/showcase-data.ts"),
    source("app/product-audit-data.ts"),
    source("app/demo/[slug]/page.tsx"),
    source("app/[locale]/demo/[slug]/page.tsx"),
    source("app/llms.txt/route.ts"),
  ]);
  const publicCopy = home + showcase + products + detail + localizedMetadata + discovery;

  assert.doesNotMatch(publicCopy, /2\.3\.0 FREE/);
  for (const content of [home, showcase, products, detail, localizedMetadata, discovery]) {
    assert.match(content, /2\.3\.1/);
  }
  assert.match(showcase, /相似檢索只召回候選/);
  assert.match(detail, /未定義觸發條件的舊規則不會自動啟用/);
  assert.match(detail, /過期或不可追溯的草稿停止入庫/);
  assert.match(products, /legacy rules without applicability triggers remain candidates/i);
  assert.match(discovery, /similarity retrieval suggests candidates but does not activate a rule/i);
  assert.match(detail, /官網的 SCBKR 動畫仍依站主指示暫緩/);
});
