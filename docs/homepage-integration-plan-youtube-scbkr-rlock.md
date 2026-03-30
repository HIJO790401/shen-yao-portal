# 首頁整合建議（暫不實作）

> 目標：先規劃「YouTube 頻道」與「SCBKR + R-Lock 反詐治理系統」要怎麼放在首頁，並讓整體介紹更鮮明。

## 1) 現況掃描（index.html）

目前首頁已經有完整區塊：

- Hero（個人定位 + 核心主張 + 行動按鈕）
- Positioning（站點定位）
- About（方法與背景）
- Core Projects（四張專案卡）
- Media & Evidence（兩張入口卡）
- Core Thesis（核心主張）
- Contact（聯絡）

### 關鍵觀察

1. 首頁目前「主張」很完整，但「外部即時入口」還不夠前置。
2. 你要放的兩個連結本質不同：
   - YouTube：內容與可信度的持續更新入口（社會證明）。
   - SCBKR + R-Lock 系統：方法論落地 demo（技術證明）。
3. 若直接塞進同一行按鈕，會讓訪客看不出差異，建議做成「雙軌入口」：
   - Learn / Watch（YouTube）
   - Validate / Try (System Demo)

## 2) 建議放置方案（由穩到強）

## 方案 A（低風險，優先）

在首頁 Hero 區塊 `hero-actions` 增加第三顆按鈕（外部站）：

- 按鈕 1：查看專案（站內）
- 按鈕 2：聯絡我（站內）
- 按鈕 3：SCBKR + R-Lock 系統（外部 Demo）

並在 Hero 下方加一行小型 trust-links：

- YouTube Channel
- Anti-Scam Live Demo

**優點**
- 幾乎不破壞現有版型。
- 先把你最重要的「可操作入口」前置。

## 方案 B（推薦，辨識度最高）

在 Hero 與 Positioning 之間新增一個「Live Entry / 即時入口」雙卡區：

- 左卡：YouTube 官方頻道
  - 標籤：Official Channel
  - 說明：案例解說、系統更新、治理觀點
  - CTA：前往 YouTube
- 右卡：SCBKR + R-Lock 反詐治理系統
  - 標籤：Governance Demo
  - 說明：立即檢查訊息是否具備決策資格
  - CTA：開啟系統

**優點**
- 訪客 3 秒內就知道「你做什麼 + 去哪裡驗證」。
- YouTube（內容證明）與系統（技術證明）角色清楚。

## 方案 C（品牌敘事最強）

把首頁敘事改成三層漏斗：

1. 主張（No decision without verifiable responsibility structure）
2. 兩個行動入口（Watch / Try）
3. 再往下看方法（SCBKR、R-Lock、VOID）與專案家族

**優點**
- 評審/合作方看起來最完整。
- 品牌一致性最高。

**成本**
- 需要調整首頁段落順序與文案節奏。

## 3) 介紹文案「更鮮明」建議（可直接替換）

## 3.1 Hero 主標下方（短句）

中文：
> 這不是詐騙關鍵字比對器，而是決策資格審計系統。

英文：
> Not a keyword scam filter, but a decision-qualification audit system.

## 3.2 Positioning 段落（第一句）

中文：
> 我們先問「誰負責、能否驗證、成本誰承擔」，再決定訊息能不能進入人的決策鏈。

英文：
> We first ask who is accountable, what is verifiable, and who bears the cost—before allowing a message into the human decision chain.

## 3.3 Anti-Scam 專案卡（第二行）

中文：
> SCBKR 五維審計 + R-Lock 責任鎖 + VOID 二次裁決，讓「像官方」不再等於「可信」。

英文：
> SCBKR 5D audit + R-Lock + VOID adjudication ensures that “official tone” no longer equals trust.

## 4) 你提供的架構，如何轉成首頁一句話說清楚

建議放在首頁固定短句（可做成 badge 區）：

- WHO 可驗主體
- WHY 可解釋因果
- TRUE 可驗依據與可追責
- Fail 任一項即不具決策資格

搭配你最後定位句：

> No decision without verifiable responsibility structure.

## 5) 實作順序（下一步）

當你說「可以動手」時，建議順序：

1. 先做方案 B（新增 Live Entry 雙卡，不改既有資訊架構）。
2. 微調 Hero / Positioning / Anti-Scam 卡三段文案。
3. 補上 `aria-label`、`target="_blank" rel="noreferrer"` 等可用性細節。
4. 再看是否把 YouTube 放到 `media.html` 首卡（作為站內第二入口）。

## 6) 外部連結（本次需求）

- YouTube：<https://www.youtube.com/@JM-qy7gv>
- SCBKR + R-Lock 反詐治理系統：<https://main.d191ppt14utqe3.amplifyapp.com/>

