# SCBKR Microsoft Store 官網入口｜驗收證據

驗收時間：2026-08-26T16:43:15+08:00
驗收狀態：READY_FOR_OWNER_REVIEW

## 官方外部證據

- 官方頁面：https://apps.microsoft.com/detail/9n1smmbl6j4d
- Product ID：9N1SMMBL6J4D
- 產品名稱：SCBKR Responsibility Chain Language Model
- 發布者：shenyao888pi
- 開發者：Wen-Yao Hsu / 許文耀
- 公開狀態：免費 Windows 應用；實際安裝仍由 Microsoft Store 依地區與裝置相容性判定
- 官方頁面驗證：HTTP 200，Microsoft 結構化商品資料有效，具可取得／安裝 SKU

## 已完成施工

- 首頁新增 SCBKR Microsoft Store 官方取得入口；原 SCBKR 內部詳情入口保留。
- 產品中心與 SCBKR 詳情頁新增分開的中文／英文 Store CTA。
- 公開履歷新增 Microsoft Store 官方發布紀錄。
- `llms.txt`、頁面 Metadata、SoftwareApplication 結構化資料與 sitemap 已同步。
- Store URL 只掛在 SCBKR；AICC 仍維持 `v0.2.CANDIDATE`。
- SCBKR 官網動畫仍為 deferred／pending，未宣稱動畫完成。

## 自動驗證

- `npx tsc --noEmit`：PASS
- `npm run lint`：PASS
- `npm test`：PASS；production build 完成，33 passed / 0 failed
- `npx drizzle-kit check`：PASS；Everything's fine
- `git diff --check`：PASS；僅 Windows LF/CRLF 提示，無 whitespace error
- 新增程式碼 secret candidate scan：PASS；0 hits
- tracking parameter scan：PASS；0 hits

## 瀏覽器驗收

- 桌機 1280×720：`/zh/demo/scbkr`、`/en/demo/scbkr`、`/zh/products`、`/en/products`、`/zh/resume` 全部 PASS。
- 手機 390×844：上述主要路由及中英文首頁／履歷全部 PASS。
- CTA canonical href：`https://apps.microsoft.com/detail/9n1smmbl6j4d`。
- 外部連結：`target=_blank`、`rel=noreferrer`。
- 頁面水平溢位：0。
- Browser console errors：0；warnings：0。

## 修正歷史

- 新契約測試第一次執行時將 `storeUrl` 型別欄位也誤算為產品資料值，預期數量寫成 2；修正為只計實際資料指派後，完整測試 33/33 通過。程式功能未因此改變。

## 尚未成立的狀態

- 官網動畫素材：未提供，維持待補。
- Sites 正式版本：未儲存。
- 官網正式部署：未執行。
- 網域／DNS：未變更。
- 本紀錄證明目前原始碼候選與本機驗收，不冒充正式網域上線證據。
