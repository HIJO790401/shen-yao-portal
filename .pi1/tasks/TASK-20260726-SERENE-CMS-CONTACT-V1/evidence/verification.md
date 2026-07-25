# Verification record — 2026-07-26

## 確定成立

- GitHub `origin/main` 已更新至 `b5a6a124d442937671787cef57e0239c01621cfb`，未建立 PR。
- `/studio` 具備新聞／影片與責任博物館兩組編輯器。
- 新聞可輸入 slug、分類、日期、封面、YouTube/TikTok、中文與英文標題／摘要／內文、草稿或發布。
- 館藏可輸入館藏編號、slug、館別、分類、事件日期、導覽、封面、YouTube、證據、判詞、修復紀錄、中英文內容、草稿或發布。
- 正式環境非站主會在讀取草稿前被阻擋；管理 API 仍會各自執行伺服器端站主驗證。
- 寫入 API 已加入 same-origin、欄位長度、slug、日期、網址與可發布內容驗證。
- 圖片只接受 JPEG、PNG、WebP，限制 8 MB，並核對 magic bytes；SVG 不接受。
- 更新或刪除不存在內容回 404；重複 slug 回 409。
- 首頁合作表單固定收件人，訪客可填姓名、回信信箱、合作類型、主旨與內容。
- `mailto:` 參數使用 URI 編碼，拒絕錯誤信箱及主旨 CR/LF；沒有 `fetch`、聯絡 API、第三方寄信服務或訊息資料庫。
- 頁尾可直接開啟正確 `/studio`，不再被語言路由改成 `/zh/studio`。
- 本機可重用技能 `C:/Users/thoma/.codex/skills/maintain-serene-school-studio` 已通過 `quick_validate.py`。
- 專案 canonical license 位於 `.pi1/licenses/SERENE-SCHOOL-STUDIO-WEBSITE-CMS-v1/LICENSE.md`。

## 驗證結果

- `npx tsc --noEmit`: PASS。
- `npm run lint`: PASS。
- `npm test`: production build PASS；15 tests passed，0 failed。
- In-app browser `/zh`: 合作表單五類輸入可操作、固定收件人可見、隱私說明可見；沒有送出測試信。
- In-app browser `/studio`: 新聞與館藏標題可輸入，兩個封面欄位存在，中英文分離說明可見，本機驗收模式可見。
- In-app browser：頁尾 Studio href 已驗證為 `/studio`。

## 邊界

- 使用者在對話提供的密碼未寫入程式、Git、技能、駕照、任務或收據。
- 站主登入沿用平台驗證身分加伺服器 email allowlist，不建立自製明文密碼系統。
- 合作表單不會由網站直接寄信；訪客仍需在自己的郵件程式按下寄出。
- 未儲存 Sites version，未做 private 或 production deployment，未改存取權、網域、DNS、企業信箱或任何付費服務。
- 未提交未使用的 newsroom 高解析素材、品牌參考圖與本機 rollback ZIP。

## 尚待正式環境驗證

- 真實站主登入。
- D1 新增、重讀、修改、發布、刪除新聞與館藏。
- R2 上傳、公開讀取、Content-Type 與 ETag。
- 媒體版本歷史、孤兒檔清理與刪除內容時的 R2 生命週期，尚未納入本輪基本 CMS。

Final state: `OWNER_REVIEW / SOURCE_COMPLETE_NOT_LIVE`.
