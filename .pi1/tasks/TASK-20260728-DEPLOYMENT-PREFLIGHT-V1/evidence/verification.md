# 部署前封版 V1｜驗證紀錄

- 任務：`TASK-20260728-DEPLOYMENT-PREFLIGHT-V1`
- 驗證日期：2026-07-29（Asia/Taipei）
- 目前狀態：`OWNER_REVIEW / SOURCE_COMPLETE_NOT_LIVE`
- 正式上線狀態：`NOT_LIVE`

## 主體、專案與 Git 邊界

- 站主與最終簽收：許文耀／沈耀888π。
- 專案根目錄同時包含 `.openai/hosting.json`、`.pi1`、`app`、`db`。
- Git remote 為 `https://github.com/HIJO790401/shen-yao-portal.git`，分支為 `main`。
- 本輪已驗證來源 commit：
  `b98b811672273af89b0d4466d7721522e82231d7`。
- 該 commit 已直接推到 `origin/main`，且推送後已確認遠端與本機 SHA
  完全相同；因此 `SOURCE_COMPLETE_NOT_LIVE` 已成立。
- 未建立 PR、未儲存 Sites version、未部署、未改 DNS、未購買網域或其他付費服務。

## 已成立的原始碼與契約

- 正式網址集中於 `app/site-config.ts`；`NEXT_PUBLIC_SITE_URL` 經
  `normalizeSiteOrigin` 驗證後供 Canonical、hreflang、JSON-LD、Sitemap、
  robots 與 AI discovery 使用。
- `https://silentschool.studio` 目前只是站主指定的 intended canonical
  fallback，不代表網域已購買、已持有或已綁定。專案來源中只有中央設定與其
  行為測試保留這個字串。
- `NEXT_PUBLIC_INTRO_VIDEO_URL` 只接受
  `/media/intro/` 下的 MP4／WebM，或無 credentials 的 HTTPS
  MP4／WebM；未設定、非法或播放失敗時保留站主核准的封面與「進入官網」。
- Intro Gate 不自動進站，最終影片仍由站主提供，未生成替代影片。
- D1 schema、Drizzle journal、`0000`／`0001`／`0002` migrations
  均存在；`0002_illegal_luke_cage.sql` 使用 `CREATE INDEX IF NOT EXISTS`。
- migration 契約同時通過空白資料庫套用與既有 runtime indexes 後重套
  `0002` 的 upgrade-path 測試。
- 公開內容只讀 `published`；Studio 寫入契約涵蓋站主授權、same-origin、
  bounded JSON、slug、日期、URL 與發布欄位。
- 圖片上傳契約只接受 JPEG、PNG、WebP，限制 8 MB，並驗證實際檔頭；
  SVG、截斷檔頭、錯誤 multipart 與不安全封面 URL 會被拒絕。
- 中英文使用獨立路由。英文頁由伺服器輸出 `data-locale="en"`，CSS 以
  `[data-locale="en"]` 選擇語言，不依賴 hydration 才隱藏中文。
- 品牌 404 頁存在，Worker 會補上安全標頭與英文／中文 HTML `lang`。
- Studio 本機預覽可檢查欄位，但儲存按鈕與兩個圖片上傳欄位均停用，
  不會把本機預覽冒充正式站主權限。

## 自動驗證結果

| 驗證 | 結果 |
|---|---|
| `npx tsc --noEmit` | PASS |
| `npm run lint` | PASS |
| `npm run build` | PASS；Vinext 產生 Worker server、client、RSC 與 SSR 產物 |
| `node --test tests/*.test.mjs` | PASS；32 passed、0 failed |
| `npx drizzle-kit check` | PASS；`Everything's fine` |
| `git diff --check` | PASS |
| hardcoded intended-origin scan | PASS；只在中央設定與其測試出現 |
| secret candidate scan | PASS；app、db、worker、tests、`.env.example` 與 package metadata 無候選 |
| `npm audit --omit=dev` | PASS；0 low、0 moderate、0 high、0 critical |

`npm run db:generate` 的既有輸出為 `0002_illegal_luke_cage.sql` 與
`0002_snapshot.json`。本次 evidence-only 階段未再執行會寫入 migration
檔案的產生指令；改以 `drizzle-kit check`、空白資料庫與 upgrade-path
測試驗證現有結果。

## Sites 官方封裝預演

- 官方 `package-site.sh`：PASS。
- 封包項目數：234。
- 封包大小：13,998,417 bytes。
- SHA-256：
  `93e671ed7e340ebd7752958444e2c3e06f0a064e4591fd2af982bf2bb02fdf43`。
- 已確認包含：
  - `dist/server/index.js`
  - `dist/.openai/hosting.json`
  - `dist/.openai/drizzle/0000_parched_joshua_kane.sql`
  - `dist/.openai/drizzle/0001_nostalgic_vapor.sql`
  - `dist/.openai/drizzle/0002_illegal_luke_cage.sql`
- 這只是本機封裝預演；未把封包儲存成 Sites version，也沒有 deployment。
- 直接以一般 Node 執行 `vinext start` 會遇到 Cloudflare
  `cloudflare:` ESM scheme 不支援；因此 production Worker runtime
  仍必須在正式 Sites deployment 驗證，不能以本機 Node 啟動結果替代。

## 尚未成立／必須保留為待驗證

- `SIWC`：原始碼採平台驗證 email 加伺服器 allowlist；尚未在正式 Sites
  環境以站主帳號登入，狀態為 `PENDING_OWNER_PRODUCTION_SIGN_IN`。
- `D1`：schema、migration 與本機契約通過；正式綁定資料庫的新增、重讀、
  修改、發布、刪除仍為 `NOT_E2E_VERIFIED`。
- `R2`：上傳驗證契約通過；正式 bucket 的上傳、公開讀取、Content-Type、
  ETag、刪除與孤兒檔生命週期仍為 `NOT_E2E_VERIFIED`。
- `Sites deployment`：未儲存 version、未部署，runtime bindings、安全標頭、
  SIWC、D1 與 R2 都尚無 production 證據。
- `Domain`：`silentschool.studio` 未驗證購買、所有權、DNS、TLS 或正式綁定。
- `Intro video`：站主最終影片尚未提供；目前只驗證安全接入介面與合法 fallback。
- `Browser console`：桌機 1440 × 900 與手機測試頁的 error／warning
  均為 0；詳見 `browser-qa.md`。

## 升級條件

1. 已完成：驗證來源 commit 已到達 `origin/main`，細分狀態為
   `SOURCE_COMPLETE_NOT_LIVE`。
2. Sites private deployment 後，以站主真實登入完成 D1/R2 CRUD 與上傳回讀，
   才可升為 `DEPLOYMENT_VERIFIED`。
3. 正式網域、TLS、production deployment 與站主簽收全數
   通過後，才可進入 `CLOSE`。
