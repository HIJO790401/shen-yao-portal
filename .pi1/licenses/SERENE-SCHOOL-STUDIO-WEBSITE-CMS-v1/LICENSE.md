# 沉靜流派工作室官方網站與 CMS 施工駕照 v1

狀態：`ACTIVE_FOR_LOCAL_AND_GITHUB_WORK`

站主與最終簽收：許文耀／沈耀888π

品牌：沉靜流派工作室／SERENE SCHOOL STUDIO
適用專案：`HIJO790401/shen-yao-portal`

本檔是專案內 canonical active license。施工前須確認 Git remote 為 `https://github.com/HIJO790401/shen-yao-portal.git`，且根目錄同時含 `.openai/hosting.json`、`.pi1`、`app`、`db`。指令衝突時依序採用：站主當次明確指令 > 本駕照 > 本機技能 reference > 當前 task/receipt > 舊歷史文件 > 通用 Sites 預設。

## 准許範圍

- 官方首頁、產品、作品、自介、公共行動與外部文章。
- 實相新聞台 × 責任博物館。
- 站主內容中心：新聞與展品的新增、修改、刪除、草稿、發布。
- 中英文獨立內容、封面圖片、YouTube 連結與外部證據。
- D1 結構化資料、R2 圖片儲存、站主身分驗證。
- 固定收件人的合作寄信介面。
- 自動測試、瀏覽器驗收、GitHub `main` 更新與回放收據。

## 硬邊界

1. 不得把任何密碼、權杖、Cookie 或秘密寫入程式、Git、駕照或收據。
2. 絕不索取、讀出、回傳、截圖或記錄站主密碼；登入只透過服務自己的登入頁，站主權限使用平台驗證身分與伺服器 allowlist。
3. 公開頁只讀已發布內容；草稿與所有寫入 API 必須由伺服器再次授權。
4. D1 保存文字與欄位，R2 保存圖片 bytes；不能只靠 localStorage 或 GitHub 驅動正式內容。
5. 中文與英文分開切換，不在同一內容段落混排。
6. 只使用站主提供、Repo 可證明或可靠公開來源可證明的作品與經歷，不自行虛構。
7. 圖片上傳必須驗證允許的 MIME、實際簽章與大小；禁止 SVG。
8. 合作表單若使用 `mailto:`，網站不得聲稱已代寄或保存訊息。
9. 未經另一個明確授權，不儲存 Sites version、不做 private 或 production deployment、不改公開權限、不購買或綁定網域、不改 DNS；private deployment 仍是外部 deployment，不等於本機預覽。
10. 保留使用者素材、rollback 與無關工作樹變更。
11. GitHub 只保存原始碼，不啟用或依賴 GitHub Pages。
12. 任何付費服務、試用轉付費、網域、企業信箱、第三方寄信或 API billing，都需先列出價格並取得站主付款授權。

## 固定品牌鎖

- 英文品牌固定使用 `SERENE`。
- Hero 人名固定為「許文耀／沈耀888π」，不得改成「暨」。
- 保留「沉靜不是終止，而是讓一切回到本質。」
- 站主真實照片不可改臉，只能做必要裁切、遮罩及色彩對齊。
- Intro Gate 不自動跳過；影片未提供時保留合法佔位與「進入官網」動作，不生成假影片。
- Runtime 0/1 無可查證連結時只能標示開發中／等待連結。
- SecurityBrief Asia 效能數字必須標為受訪主張，不得寫成媒體獨立驗證。
- 站主 allowlist 與合作收件人沿用現有伺服器設定；缺失或衝突時進 `OWNER_REVIEW`，不得猜測。

## 驗收閘

- `typecheck`、`lint`、`build`、`tests` 全通過。
- 首頁、聯絡表單、新聞台、博物館與 `/studio` 在可瀏覽 UI 通過桌面／手機驗收。
- 非站主不能讀草稿或寫入。
- 寫入有同源與欄位驗證；草稿不公開；圖片不能以偽造 MIME 上傳。
- Git 提交不含秘密與未授權素材。
- 正式 D1/R2、登入與發布流程必須在 private deployment 實測後，才可從 `OWNER_REVIEW` 升為 `CLOSE_CANDIDATE`。

## 固定狀態規則

- `OWNER_REVIEW` 是尚未完成外部驗證的總括狀態；以下前三項是其細分狀態。
- 本機 UI 與程式測試通過：`READY_FOR_OWNER_REVIEW`
- GitHub `main` 已更新但未部署：`SOURCE_COMPLETE_NOT_LIVE`
- private deployment 完成且站主 CRUD 實測通過：`DEPLOYMENT_VERIFIED`
- production 與正式網域公開並由站主簽收：`CLOSE`

最終責任與發布簽收仍由許文耀／沈耀888π持有。
