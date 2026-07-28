# 活履歷 V2｜施工與 UI 驗收紀錄

日期：2026-07-28
狀態：`READY_FOR_OWNER_REVIEW`

## 已完成

- 新增 `/resume`、`/zh/resume`、`/en/resume`。
- 中文與英文由既有語言控制切換，站內連結維持目前語系。
- 新增來源分級：第三方媒體、平台紀錄、公開工程、第一方發布、本人紀錄。
- GitHub 系統逐項標示 Runtime、Local Prototype、Demo／PoC 與授權邊界。
- SecurityBrief 數字維持歸因主張，不改寫成獨立 benchmark。
- AI-ARTS 改為第四屆競賽投稿紀錄，不宣稱得獎。
- NVIDIA Developer Forums 明示為社群文章，不宣稱合作、採用或背書。
- 黑客松 Team 11 與展示內容明示為本人／Repo／照片／社群紀錄；官方頁只核對活動本身。
- About、首頁、主導覽、頁尾、Sitemap、`llms.txt` 已同步。
- 移除公開的 `public/Wen-Yao-Hsu-Resume.pdf`；回滾副本僅保留在本機 `.pi1/rollback`。
- 新增原生列印／另存 PDF 按鈕與 A4 友善列印樣式。

## 自動驗收

- `npx tsc --noEmit`：PASS
- `npm run lint`：PASS
- `npm test`：PASS
- `vinext build`：PASS
- Node 測試：16／16 PASS
- `git diff --check`：PASS
- 密碼與舊 PDF 公開引用掃描：PASS

## 實機瀏覽器驗收

- 桌機：1440 × 900
  - H1、人物照同列
  - `document.scrollWidth <= window.innerWidth`
  - 19／19 外部連結皆有 `_blank` 與 `noreferrer`
- 手機：390 × 844
  - 無水平捲動
  - 姓名、角色、摘要、列印按鈕可見且可操作
  - 選單展開後 `/en/resume` 導覽可見
- 中文頁：
  - `html lang=zh-Hant`
  - 中文 Canonical：`https://silentschoolstudio.com/zh/resume`
- 英文頁：
  - `html lang=en`
  - 英文 Canonical：`https://silentschoolstudio.com/en/resume`
  - 主內容三個以上連續漢字段落數：0
- JSON-LD：
  - 每個語系有獨立 `ProfilePage` URL、`@id`、`inLanguage`
  - Person 統一指向 `https://silentschoolstudio.com/#person`
  - SecurityBrief NewsArticle 保留作者 Sean Mitchell 與發布者
- 列印按鈕：
  - 實際點擊成功
  - 頁面未導向、無瀏覽器 Console error
- 瀏覽器 Console：
  - error／warning：0

## 實機修復紀錄

第一輪桌機驗收發現 `.heroAmbient` 被 CSS Grid 視為版面欄位，使人物照落到第二列。已將裝飾容器改為絕對定位，複驗後首屏高度 925px、H1 與人物照同列且無水平溢出。

## 尚未執行

- 未儲存 Sites version。
- 未部署 Sites production。
- 未修改正式網域或 DNS。
- 上述動作依駕照仍需站主另行明確允准。

最終責任與上架終裁：許文耀／沈耀888π。
