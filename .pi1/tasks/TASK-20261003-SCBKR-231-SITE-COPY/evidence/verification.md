# SCBKR 2.3.1 官網文案驗證

- 主體：許文耀／沈耀888π；官網文案施工，不修改 SCBKR Runtime。
- 來源：SCBKR 公開 GitHub `RELEASE_NOTES.md` 的 2.3.1 段落；Microsoft Store 最新公開版本 2.3.1.0 先前由 Partner Center 產品提交頁核實。
- 範圍：首頁產品卡、產品中心 RG-01、SCBKR 詳細頁、中文／英文搜尋摘要與 `llms.txt`。版型、連結、動畫暫緩狀態保留。
- `npx tsc --noEmit`：PASS。
- `npm run lint`：PASS。
- `npm test`：PASS，build 成功，39 tests passed／0 failed。
- 瀏覽器：`/zh/demo/scbkr`、`/en/demo/scbkr`、`/zh/products`、`/zh` 已讀取；桌面與手機寬度 390px 可讀，手機 `scrollWidth` 376px，不見橫向溢出；瀏覽器 error logs 空。
- 搜尋摘要：中文與英文詳細頁 title／description 均包含 2.3.1，且區分各語言；公開頁可見 2.3.1，未見 2.3.0 FREE。
- `git diff --check`：PASS；變動來源碼 diff 的基本 secret pattern 掃描未命中。既有未追蹤 rollback／素材保留未動。
- 未完成：未 Git commit／push，未儲存 Sites version，未部署到 `silentschool.studio`，未作正式網址上的新版本驗收。需 Owner 另行授權發布。
