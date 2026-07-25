# 沈耀官網駕照 v1.0｜施工前 Rollback 基準

- 專案：沉靜流派工作室官方網站
- Owner：許文耀／沈耀888π
- 分支：`main`
- Git HEAD：`39985742adfb7b7245c01b22e2d5c98bdde657cf`
- 建立日期：`2026-07-26`（Asia/Taipei）
- 正式部署：`0`
- 基準封存：`portal-review-source-baseline.zip`
- 封存大小：`104604180 bytes`
- SHA-256：`50F6859AF8B70B23C63A34568A86B202A6DD8202E6E5ED5F3DF8D69030F49695`

## 封存範圍

包含目前工作樹的程式、路由、資料、測試、公開圖片、`.openai/hosting.json`、D1/R2 宣告與既有 `.pi1` 證據。

排除可重新產生或體積過大的執行產物：`.git`、`node_modules`、`.vinext`、`.wrangler`、`build`、`dist`、`tsconfig.tsbuildinfo` 與本 rollback 目錄本身。

## 保護原則

- 基準建立時工作樹已有大量未提交重構內容。
- 本次不使用 `reset`、`checkout`、`stash` 或任何會覆蓋既有成果的操作。
- 若觸發駕照 Rollback 條件，先停止，再以此封存回放，不擅自回滾 Owner 未簽收的其他變更。

## 待補基準

- 首頁與關鍵路由的可讀 HTML 快照：待本地預覽啟動後補存。
- 畫面截圖：先前本機瀏覽器安全限制禁止自動開啟；不以其他瀏覽器繞過。若 Owner 重新要求瀏覽器驗收，再按授權補存。
