# 上線前修復驗收｜2026-09-26

狀態：`SOURCE_READY / OWNER_REVIEW / NOT_DEPLOYED`。本站尚無正式公開網址；本紀錄不把本機測試冒充正式站驗收。

## 本輪改動

- Next.js 與對應 ESLint 設定更新至 `16.3.6`；Sharp 更新至 `0.35.4`；針對 `baseline-browser-mapping`、`image-size`、`undici` 鎖定已修復版本，並重新產生 lockfile。
- 新聞台手機版修正裝飾圓點 CSS 誤套到中英文標籤文字的問題，保留原本水紋畫面、排版和頁面結構。
- 首頁外部文章平台標籤由誤字 `VOCS` 改為 `VOCUS`。
- 在既有 SCBKR 展示頁加入獨立的中英文 AI 責任鏈解說，說明路由、模型草擬、Kernel Validator、人類簽名及四庫回放，明示 Store／GitHub 證據能證明的範圍與未證明的安全／法遵主張；原有動畫暫緩決定不變。
- Vite 將 `lucide-react` 排除於一般依賴預先最佳化；RSC 外掛在開發啟動時仍可能輸出不一致最佳化警告，但頁面與正式 build 均正常，這項警告沒有被標為已完全消除。

## 可回放檢查

| 檢查 | 結果 |
|---|---|
| `npx tsc --noEmit` | PASS |
| `npm run lint` | PASS |
| `npm test` | PASS；正式 build 完成，37 passed、0 failed |
| `npm audit --audit-level=moderate` | PASS；found 0 vulnerabilities |
| `npx drizzle-kit check` | PASS；Everything's fine |
| `git diff --check` | PASS；只有 Windows LF→CRLF 提示，無 whitespace error |
| HTTP 路由 | `/zh`、`/en`、`/zh/products`、`/zh/works`、`/zh/news`、`/zh/resume`、`/studio`、`/robots.txt`、`/sitemap.xml`、`/llms.txt` 均 200 |
| 瀏覽器桌機 | 開場影片、首頁、產品、新聞、站主編輯台與 SCBKR 中英文專題可開啟 |
| 手機 390×844 | 新聞台標籤恢復水平排版；首頁、新聞台與編輯台 `scrollWidth < innerWidth` |
| 瀏覽器 console | 驗收頁無 error；開發伺服器仍有非阻擋 RSC 最佳化 warning，不能稱 0 warning |

## 現有 Sites 專案與未成立事項

- `.openai/hosting.json` 已有正式 project ID、D1 `DB` 與 R2 `MEDIA` 綁定名稱；Sites 專案狀態 `active`、站主角色為 `owner`、具 auth client，尚無 live URL 或已綁自訂網域。已讀取目前存取模式為 `custom`，可選 `public`，但本輪未改存取設定。
- 本機 `/studio` 為欄位驗收模式，儲存及圖片上傳按鈕停用。正式站主登入、D1 寫入重讀、R2 上傳回讀、YouTube 嵌入、實際全球 HTTPS、TLS、DNS 與搜尋索引，需在正式部署後驗收，不得預先宣稱 PASS。
- `silentschool.studio` 尚未由站主付款／持有；來源碼內的預定 canonical 不代表實際 DNS 或 Google 已收錄。
- 沒有建立 Sites version、部署、購買網域、填卡號、改 DNS 或改公開存取。GitHub main 來源版本另以實際 push 收據確認，不以本文件推定。

## 付款估算與資料來源

- Porkbun `.studio` 牌價：首年 `US$11.84`，續約 `US$32.44`。
- 臺灣銀行 2026-09-26 美元即期賣出 `31.855`；玉山國外交易手續費以最高約 `1.5%` 保守估算。首年 `11.84 × 31.855 × 1.015 = NT$382.82`，約 `NT$383`；續約約 `NT$1,049`。卡片、清算日、促銷資格、稅與 premium 名稱均須以結帳頁與銀行入帳為準。
- 來源：<https://porkbun.com/tld/studio>、<https://porkbun.com/support/payment_options>、<https://rate.bot.com.tw/xrt?Lang=en-US>、<https://www.esunbank.com/zh-tw/personal/credit-card/payinfo>、<https://help.openai.com/en/articles/20001339-creating-and-managing-chatgpt-sites>。
