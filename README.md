# 沉靜流派工作室官方網站

**SERENE SCHOOL STUDIO** 是許文耀／沈耀888π的官方網站與內容系統，整合：

- 中、英文分流的工作室門面、履歷、產品與作品頁。
- 不需訪客輸入的產品動畫 DEMO。
- 實相新聞台與責任博物館。
- 站主內容中心 `/studio`：新聞、YouTube 報導與館藏的新增、修改、草稿、發布、刪除與封面管理。
- 搜尋引擎、AI 爬蟲、Open Graph、結構化資料、sitemap、robots 與 `llms.txt`。

## 系統結構

- Vinext／Next App Router：公開網站與伺服器 API。
- Cloudflare D1：新聞與館藏的結構化資料。
- Cloudflare R2：站主上傳的封面圖片。
- Sites 平台身分：登入後由伺服器 email allowlist 判定站主權限。
- GitHub：只保存來源碼，不依賴 GitHub Pages 驅動正式網站。

公開頁只讀 `published` 內容；草稿、上傳及所有寫入都會在伺服器重新驗證身分、同源請求與欄位邊界。密碼、Cookie、權杖及 OAuth 憑證不得寫入此 Repo。

## 本機驗證

需求：Node.js `>=22.13.0`

```bash
npm install
npm run dev
npx tsc --noEmit
npm run lint
npm test
```

`npm test` 會先完成正式建置，再執行品牌、雙語、動畫 DEMO、新聞台、博物館、SEO、CMS 權限、上傳簽章與 D1 migration 測試。

修改 `db/schema.ts` 後使用：

```bash
npm run db:generate
npx drizzle-kit check
```

## 部署狀態

目前是 `SOURCE_COMPLETE_NOT_LIVE` 的部署候選來源：

- 正式開場影片由站主另行提供，未生成替代影片。
- 正式網域與 DNS 由站主付款並另行授權後處理。
- Sites 私有部署、真實登入及 D1／R2 CRUD 驗收完成前，不宣稱 CMS 已正式上線。

部署設定位於 `.openai/hosting.json`，施工與驗收紀錄位於 `.pi1/`。
