# 部署前封版 V1｜瀏覽器 QA

- 任務：`TASK-20260728-DEPLOYMENT-PREFLIGHT-V1`
- 日期：2026-07-29（Asia/Taipei）
- 測試表面：本機可瀏覽 preview
- 狀態：`PASS_WITH_LIVE_CAPABILITIES_PENDING`

## 實測矩陣

| 表面／路徑 | 桌機 | 手機 390 × 844 | 結果 |
|---|---:|---:|---|
| `/zh` | 已驗；最終 1440 × 900 | 已驗 | 中文首頁、導航與獨立語言模式可瀏覽 |
| `/en` | 已驗；先前桌機尺寸未記錄 | 已驗 | 英文首頁可瀏覽，沒有中英同段擠在一起 |
| Intro Gate | 已驗；最終 1440 × 900 | 已驗 | 封面可見；左下「進入官網」按鈕 x=72px，且必須由訪客自行進站 |
| `/zh/demo/anti-scam-rlock` | 已驗 | 已驗 | 固定案例動畫可理解；不要求訪客輸入 |
| `/en/news` | 已驗 | 已驗 | 實相新聞台英文索引可瀏覽 |
| `/en/news/openai-tbpn-audit` | 已驗 | 已驗 | 新聞內容頁可瀏覽 |
| `/en/news/museum/abstract-sanctuary` | 已驗 | 已驗 | 責任博物館展品頁可瀏覽 |
| `/studio` | 已驗 | 已驗 | 本機預覽顯示完整欄位；兩個 submit 與兩個圖片 input 均 disabled |
| `/zh/route-not-found-test` | 已驗 | 已驗 | 品牌 404 顯示；伺服器回應紀錄為 HTTP 404 |

## 語言與無 JavaScript 基線

- 伺服器輸出的 locale wrapper 帶有 `data-locale`。
- 英文模式 CSS 使用 `[data-locale="en"] .lang-zh` 與
  `[data-locale="en"] .lang-en`，不再依賴 client hydration 才選語言。
- 自動契約測試已鎖定上述規則；本輪沒有另外建立「瀏覽器完全停用
  JavaScript」的獨立 profile，因此 dedicated no-JS browser run
  仍記為 `NOT_SEPARATELY_RECORDED`。

## Studio 邊界

- `/studio` 的本機畫面只用於檢查欄位與排版。
- 新聞編輯器與責任博物館編輯器的儲存／發布按鈕均 disabled。
- 兩個圖片上傳 input 均 disabled。
- 沒有送出文章、館藏、圖片、信件或其他資料。
- 這項 PASS 只證明本機預覽不會誤寫；不證明 SIWC 登入、D1 或 R2 正式可用。

## 最終桌機與 Console

- 1440 × 900 的 `/` Intro Gate 與 `/zh` 首頁通過。
- Intro Gate「進入官網」按鈕位於左側，先於右側說明文字；按下後只關閉
  Intro，不自動改寫路由。
- `/zh` 的 `lang=zh-Hant`、正式 canonical、品牌名句、固定合作收件人、
  圖片載入與水平溢位均通過。
- 最終桌機頁與手機測試頁的 console error／warning 都是 0。

## 正式環境待驗證

- 真實站主 SIWC 登入、session 延續、allowlist 成功／拒絕：`PENDING_DEPLOYMENT`。
- 正式 D1 新增、重讀、更新、發布、刪除：`PENDING_DEPLOYMENT`。
- 正式 R2 圖片上傳、回讀、Content-Type、ETag 與刪除：`PENDING_DEPLOYMENT`。
- 站主最終 Intro 影片的 autoplay-muted、播放失敗 fallback、開聲與手機裁切：
  `PENDING_OWNER_VIDEO`。
- 外部 YouTube 實際串流與第三方網路失敗 fallback 沒有納入本輪寫入型驗收。
- 正式網域、TLS、Canonical 回正式 hostname 與 production 404：
  `PENDING_DOMAIN_AND_DEPLOYMENT`。

結論：本機中英文、Intro、固定案例 DEMO、新聞台、責任博物館、
Studio read-only 邊界、品牌 404 與瀏覽器 console 已通過；真實登入與
雲端持久化尚未關閉，總狀態維持 `OWNER_REVIEW`。
