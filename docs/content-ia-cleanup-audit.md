# 站點資訊架構檢查（分類重疊與精簡建議）

> 目的：先盤點「哪些內容重複、分類不清」，再討論一次性整理方案，避免每頁都像在重貼同一份內容。

## 一、目前主要問題（你感覺到的「亂」來源）

## 1) 導流入口重複過多
- GitHub / LinkedIn 同時出現在：`index.html`、`media.html`、`evidence.html`、`contact.html`。
- Demo 入口同時出現在：`projects.html`、各 `project-*.html`、`evidence.html`。

結果：使用者不知道「正式查證」應該去哪一頁，頁面角色邊界變模糊。

## 2) Media 與 Evidence 職責重疊
- `media.html` 同時放「媒體報導」+「公開可驗證入口」。
- `evidence.html` 也放「公開查證入口」。

結果：兩頁都像「入口總表」，語意重複。

## 3) Contact 頁過度承載
- `contact.html` 除了聯絡資訊，也放了 GitHub、LinkedIn、TikTok 等查證/社群入口。

結果：Contact 從「聯絡頁」變成半個「證據頁」，分工不清。

## 4) 專案入口層級混雜
- `projects.html` 有「詳頁 + 外部 demo」雙入口。
- 各 `project-*.html` 又再放一次外部 demo。
- `evidence.html` 也再放 demo。

結果：同一資源被三層重複，視覺上顯得雜，維護成本也高。

## 二、建議的乾淨版分工（資訊架構）

## A. `index.html`（品牌首頁）
只做：
- 品牌定位
- 核心專案導流（到 `projects.html`）
- 媒體與證據導流（到 `media.html` / `evidence.html`）
- 聯絡導流（到 `contact.html`）

不做：
- 大量外部連結清單

## B. `projects.html`（專案總覽）
只做：
- 專案卡 + 進入詳頁（主 CTA）
- 外部 demo 可保留次 CTA，但樣式降權（secondary/tertiary）

## C. `project-*.html`（單一專案敘事）
只做：
- 為什麼做、核心方法、適用場景
- 一個「官方 demo」按鈕（避免重複太多 CTA）

## D. `media.html`（第三方報導）
只做：
- 第三方媒體報導與引用（例如 SecurityBrief Asia）
- 不放完整查證入口總表（僅放「前往 Evidence」）

## E. `evidence.html`（唯一官方查證入口）
只做：
- 所有對外查證連結（GitHub / LinkedIn / YouTube / SCBKR+R-Lock / demos / 履歷）
- 這一頁成為「唯一可引用的 verification hub」

## F. `contact.html`（純聯絡）
只做：
- Email / 地點 / 聯絡聲明
- 最多保留 1 個按鈕：前往 Evidence（查證）

## 三、你目前站點最需要先做的 3 個動作（優先順序）

1. **定錨 Evidence 為唯一查證頁**：其他頁只放「去 Evidence」。
2. **清掉 Contact 的查證連結堆疊**：Contact 回歸聯絡職能。
3. **Media 與 Evidence 去重**：Media 只做媒體，Evidence 只做查證。

## 四、可執行整理版本（兩階段）

### Phase 1（快）
- 不大改版型，只刪重複內容。
- 目標：一週內完成資訊分工乾淨化。

### Phase 2（完整）
- 再調整文案語氣一致性（首頁主張、專案頁方法句型、Evidence 卡片命名規則）。
- 目標：對外看起來像同一個產品體系，而不是多頁拼接。

## 五、你可以直接決策的整理選項

- **方案 S（最保守）**：只做刪重複，不改現有排版。
- **方案 M（建議）**：刪重複 + 調整各頁標題與段落定位句。
- **方案 L（進階）**：M + 重排部分卡片順序與 CTA 層級。

---

如果你同意，我下一步可以直接按「方案 M」幫你動手，先一次把 `media.html` / `evidence.html` / `contact.html` 的分工整理乾淨，再給你看差異。
