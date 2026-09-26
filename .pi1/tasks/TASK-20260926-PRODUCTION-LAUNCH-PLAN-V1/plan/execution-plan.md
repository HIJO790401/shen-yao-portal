# 沉靜流派工作室正式上線執行方案

日期：2026-09-26
狀態：`PREDEPLOYMENT_SOURCE_VERIFIED / PURCHASE_AND_DEPLOYMENT_NOT_STARTED`

## 已選定方向

- 正式網域：`silentschool.studio`
- 網域註冊商：Porkbun
- 正式主機：現有 ChatGPT Sites 專案（Cloudflare-backed runtime）
- 內容資料庫：Sites 綁定的 Cloudflare D1
- 圖片儲存：Sites 綁定的 Cloudflare R2
- DNS：Porkbun；TLS、全球發佈與 CDN：Sites runtime
- GitHub：只保存來源碼與版本，不使用 GitHub Pages 驅動網站
- 站主內容更新：正式部署後使用 `/studio` 管理新聞、YouTube 報導與責任博物館館藏

這條路沿用現有 Vinext／React／Cloudflare Workers／D1／R2 架構與 Sites 身分驗證，不搬到 WordPress，也不把動態 CMS 降成純靜態頁面。2026-09-26 已讀取現有 Sites 專案：專案為 active、具 auth client、尚無公開部署網址；因此不另建裸 Cloudflare Worker，以免 `/studio` 失去 Sites 驗證身分標頭。

## 2026-09-26 查價

匯率估算採臺灣銀行美元即期賣出 `1 USD = NT$31.855`。玉山 Visa 卡的海外交易費以最高約 1.5% 保守估算；實際入帳仍依卡別、結算日匯率、稅額與銀行帳單為準。此表是網域一般牌價換算，**不是該名稱的付款頁最終報價**。

| 項目 | 美元價格 | 約新台幣 | 加計 1.5% 後約新台幣 |
|---|---:|---:|---:|
| `silentschool.studio` 首年 | US$11.84／年 | NT$377 | NT$383 |
| 網域第二年起續約 | US$32.44／年 | NT$1,033 | NT$1,049 |
| ChatGPT Sites 公測託管 | 目前包含於既有方案的方案限額內 | 無另購主機項目 | 以帳號內 Sites 限額為準 |
| 首年預估付款合計 | US$11.84 | NT$377 | NT$383 |
| 第二年起預估續費合計 | US$32.44 | NT$1,033 | NT$1,049 |

建議網域付款預算：首年預留 NT$450；第二年起每年預留 NT$1,200。ChatGPT Sites 現為公測，官方說明是使用量包含於方案特定限額內，沒有本案需要另購的 US$5/月 Workers 項目；限額可能調整，正式部署前仍須查看帳號當下顯示的 Sites 用量與限制。

## Owner 只需處理的動作

1. 以本人控制的信箱建立或登入 Porkbun 帳號。
2. 購買 `silentschool.studio` 一年；付款前再次確認該名稱不是 Premium 價格、首年價與續約價。自動續約由本人決定，不預設開啟。
3. 付款完成後回報「Porkbun 網域已付款」。不得把密碼、卡號、簡訊驗證碼或 API Token 貼進 GitHub、對話或網站程式碼。

## 付款後由 Codex 執行

1. 已完成依賴漏洞相容性升級與本機回歸測試；正式部署前再以固定 commit 重跑一次，critical／high blocker 未清除前不進 production。
2. 保存可回滾版本並固定待部署 Git commit。
3. 對現有 Sites 專案保存並部署固定 Git commit，保留既有 auth client。
4. 對 Sites 綁定的 D1 套用 `drizzle/0000`、`0001`、`0002` migrations，並驗證 `DB` 與 `MEDIA` 綁定。
5. 設定 `NEXT_PUBLIC_SITE_URL=https://silentschool.studio` 與正式開場影片來源。
6. 由 Sites 新增 `silentschool.studio` 自訂網域，把 Sites 提供的 A／驗證紀錄填入 Porkbun DNS；設定根網域為主站，`www` 以 301 轉址至根網域。
7. 將 Sites 存取範圍改為 public 並部署已保存版本，等待 TLS 生效，驗證全球 HTTPS、快取、安全標頭與手機／桌機介面。
8. 用 `ken0963521@gmail.com` 的正式登入流程驗收 `/studio`。
9. 真實執行新聞與館藏的新增、重讀、修改、草稿、發布、刪除，以及 R2 圖片上傳與回讀。
10. 驗證 YouTube 嵌入、開場影片、中英切換、產品 Demo、履歷、新聞台與責任博物館。
11. 驗證 `robots.txt`、`sitemap.xml`、`llms.txt`、canonical、hreflang 與結構化資料。
12. 建立 Google Search Console 與 Bing Webmaster Tools 站點驗證，提交 sitemap，記錄索引狀態。
13. 檢查 Sites 用量限制與故障回滾步驟，完成部署收據後再宣告正式上線。

## Google 與 AI 搜尋目標

網站上線後具備被搜尋引擎發現的技術條件，不等於保證指定關鍵字排名。Google 明確表示 sitemap 可協助發現頁面，但不保證立即收錄或排名。

正式 SEO 驗收必須包含：

- 公開頁回傳 200，且沒有 `noindex`；`/studio` 與寫入 API 保持不索引。
- sitemap 只列正式 canonical URL，包含中文、英文、Demo、新聞與館藏。
- 首頁、產品頁、SCBKR Demo 與相關專題內容，以可見文字清楚使用「AI 責任鏈」、「責任鏈語言模型」、「語意防火牆」及對應英文，不依賴 `meta keywords`。
- 已在既有 `/zh/demo/scbkr` 與 `/en/demo/scbkr` 頁面補上可由產品入口抵達的 AI 責任鏈主題說明、工作流程、證據邊界與作者身分；上線後仍需以 Google 索引工具驗證實際抓取，不能把本機 200 說成已收錄。
- 將 Microsoft Store、SecurityBrief Asia、GitHub、Vocus、AI-ARTS 等既有外部公開頁正確回鏈到正式網域；第三方報導與第一方主張維持清楚標示。
- Search Console 與 Bing Webmaster Tools 完成所有權驗證、sitemap 提交與 URL inspection。
- 發布或更新重大內容（例如 ICAISG 從錄取升為正式論文庫收錄）時，同步更新可見內文、證據連結、結構化資料、sitemap `lastModified`，並要求重新檢索。

### 廣度型搜尋策略

目標不是用一頁硬塞所有名詞，而是讓每個實際領域都有可索引的穩定入口：每項系統、論文、產品、Demo、音樂動畫、外部活動、新聞與館藏各自具有中文／英文 URL、唯一標題、H1、摘要、正文、證據連結與站內導覽。首頁維持已驗收結構，另外建立主題中心與分類互鏈。新文章或展品從 `/studio` 發布後，自動進入 sitemap 與對應分類，逐步擴張可被搜尋的查詢面。

Google 不使用 `meta keywords`，因此不做隱藏關鍵字堆疊；採用可見內容、清楚命名、內部連結、結構化資料、外部可信回鏈與 Search Console 索引監測。可驗收的是「公開可抓取、具備收錄資格、已提交並能監測」，不能承諾每一頁或每一個查詢一定被 Google 收錄或排名。

## 企業信箱邊界

本次先完成官網與 CMS。Porkbun 免費郵件轉寄或 Cloudflare Email Routing 只能把 `contact@silentschool.studio` 轉寄到 Gmail，不等於完整企業信箱。若需要以該網域直接寄信、保留寄件備份與行事曆，另行選購正式郵件服務並做 SPF／DKIM／DMARC 驗收。

## 停止條件

- 網域結帳價格與本紀錄顯著不同。
- 付款、3D Secure、帳號驗證或所有權驗證需要 Owner 本人操作。
- critical／high 依賴漏洞尚未完成相容性測試。
- D1 migration、R2 上傳、站主登入或 CRUD 任一項失敗。
- DNS／TLS 尚未穩定或正式網域 canonical 不一致。

命中停止條件時不宣稱上線完成，回到 Owner Review 或修復後重測。
