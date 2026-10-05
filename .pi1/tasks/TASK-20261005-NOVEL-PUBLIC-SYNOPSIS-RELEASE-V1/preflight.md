# 正式發布前驗收

- 站主最後選定：公開中英文作品描述，不公開第一章前十頁；出版或自行出版尚未定案，作品持續更新中。
- 公開頁 `robots` 為 `index, follow`；中英文路徑與 `hreflang` 已在網站地圖列出。
- 已移除本機十頁試閱元件與開發伺服器原稿端點。公開程式、`public` 與建置輸出未找到第一章正文起首字句。
- `npx tsc --noEmit`、`npm run lint`、`npm test` 全通過；後者含 Vinext build 與 41 項測試。
- 本機瀏覽器已核對中英文頁與手機、桌面尺寸；兩種語言均顯示描述而非原稿，手機寬度沒有橫向溢出。
- 發布前狀態：SOURCE_READY；GitHub main 與 Sites production 尚待本輪發布操作完成。
