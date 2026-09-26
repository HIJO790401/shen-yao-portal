# 部署前修復與驗收

1. 記錄現有 Git 狀態及套件檔案 rollback 基線。
2. 將 Next.js、eslint-config-next 與 sharp 更新至相容且修復已知高風險公告的版本；重新生成 lockfile。
3. 跑 production audit、型別、lint、build、既有測試與桌機／手機可瀏覽檢查。
4. 只在實際 UI 檢查發現缺口時調整外層材質、互動或排版；保留首頁區塊與品牌水滴視覺。
5. 記錄修復結果、尚待真實 Sites／D1／R2／網域驗證的項目。GitHub main 更新另依現有授權與完整變更審查處理；不在本任務購買或公開部署。
