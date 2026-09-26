# Verification evidence

驗收日期：2026-08-31

## 已成立

- 開場影片與「進入官網」入口保留並可操作。
- 首頁資訊架構、導覽、產品、作品、實相新聞台 × 責任博物館、自介與履歷路由未重排。
- 中文 `/zh` 與英文 `/en` 分開顯示，兩條首頁路由均實際載入。
- 站主照片沿用 `founder-v2.jpg`，未生成、未替換、未加入人物動畫。
- 水景使用同一視覺世界的桌機／手機版本，AVIF 優先、WebP fallback。
- 動畫只作用於水景、折射、焦散與環境光；`prefers-reduced-motion` 有靜態降級。
- 桌機、平板與手機斷點沒有水平溢位；臉部安全區與 CTA 可讀。
- 目前預覽 console 無 error 或 warning。

## 自動驗證

- `npx tsc --noEmit`：PASS
- `npm run lint`：PASS
- `npm test`：PASS，build 成功，35/35 tests passed
- `npx drizzle-kit check`：PASS
- `npm audit --omit=dev --audit-level=high`：PASS，0 vulnerabilities
- `git diff --check`：PASS（僅 Windows LF/CRLF 提示）
- named-file secret scan：PASS，未命中憑證、密碼或私鑰模式

## 邊界

- 這是本機候選成品，狀態為 `READY_FOR_OWNER_REVIEW`。
- 本輪未部署、未更新網域或 DNS、未建立 Sites version、未推送 GitHub。
- GitHub 更新留待站主完成 UI 驗收後執行。
