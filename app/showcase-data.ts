export type DemoStatus = "ready" | "repair" | "deferred";

export type ProductFilm = {
  code: string;
  slug: string;
  index: string;
  name: string;
  nameEn: string;
  label: string;
  status: DemoStatus;
  statusZh: string;
  statusEn: string;
  headlineZh: string;
  headlineEn: string;
  introZh: string;
  introEn: string;
  formula: string;
  sourceRepo: string;
  steps: Array<{ key: string; zh: string; en: string }>;
};

export const productFilms: ProductFilm[] = [
  {
    code: "SF-01", slug: "firewall-v4", index: "SF-01", name: "Semantic Firewall V4", nameEn: "Semantic Firewall V4", label: "THREE-LAYER FRONT-END FILM", status: "ready", statusZh: "固定案例動畫可播放", statusEn: "FIXED CASE FILM READY",
    headlineZh: "Regex Shield 先標記，再由 Audit 收束到 LOCKED。", headlineEn: "Regex Shield marks first; Audit then closes the case at LOCKED.",
    introZh: "使用固定文字重演原型的三層前端邏輯，不冒充正式風控後端、身分驗證或商業 API。", introEn: "A fixed text replays the three front-end layers without claiming a production risk backend, identity verification or commercial API.",
    formula: "FIXED TEXT → REGEX SHIELD → AUDIT → LOCKED", sourceRepo: "https://github.com/HIJO790401/-8888-Semantic-Firewall-SystemV4",
    steps: [{ key: "01", zh: "Regex Shield 命中", en: "Regex Shield hits" }, { key: "02", zh: "Audit 彙整責任缺口", en: "Audit gathers responsibility gaps" }, { key: "03", zh: "概念鎖進入 LOCKED", en: "Concept lock reaches LOCKED" }],
  },
  {
    code: "SF-02", slug: "anti-scam-rlock", index: "SF-02", name: "反詐騙語意鎖 R-Lock", nameEn: "Anti-Scam Semantic R-Lock", label: "LOCAL RULE ENGINE", status: "ready", statusZh: "固定案例動畫可播放", statusEn: "FIXED CASE READY",
    headlineZh: "看起來像官方，不代表訊息有資格推動行動。", headlineEn: "Looking official does not qualify a message for action.",
    introZh: "以 Repo 內建假銀行通知重播 SCBKR、R-Lock、WHO＋WHY＋TRUE 與 VOID Gate。", introEn: "The repository's fake-bank fixture replays SCBKR, R-Lock, WHO + WHY + TRUE and the VOID gate.",
    formula: "FIXED MESSAGE → SCBKR → R-LOCK → VOID / BLOCK", sourceRepo: "https://github.com/HIJO790401/anti-scam-semantic-rlock",
    steps: [{ key: "01", zh: "固定訊息進場", en: "Built-in message enters" }, { key: "02", zh: "本地規則與五鏈審計", en: "Local rules and five-chain audit" }, { key: "03", zh: "輸出行動閘門", en: "Output action gate" }],
  },
  {
    code: "SF-03", slug: "anti-scam-non-rlock", index: "SF-03", name: "反詐騙語意防火牆 Non R-Lock", nameEn: "Anti-Scam Semantic Firewall · Non R-Lock", label: "SIX BUILT-IN CASES", status: "ready", statusZh: "六個修復後案例可播放", statusEn: "SIX REPAIRED FIXTURES READY",
    headlineZh: "六個內建案例，清楚分流 SAFE、RISK、FATAL 與 NON-CLOSABLE。", headlineEn: "Six built-in cases route clearly to SAFE, RISK, FATAL and NON-CLOSABLE.",
    introZh: "官網以固定資料複寫原規則核心的前端運作，不讓訪客輸入訊息，也不聲稱即時詐騙偵測。", introEn: "The site replays the source rule core with fixed data, no visitor input and no live scam-detection claim.",
    formula: "SIX FIXTURES → RULE HITS → FOUR-WAY ROUTE", sourceRepo: "https://github.com/HIJO790401/anti-scam-semantic-firewall",
    steps: [{ key: "01", zh: "固定六案輪播", en: "Cycle six fixtures" }, { key: "02", zh: "顯示規則命中", en: "Show rule hits" }, { key: "03", zh: "輸出四級分流", en: "Render four-way routing" }],
  },
  {
    code: "SF-04", slug: "compute-governance", index: "SF-04", name: "Prompt／算力治理掃描器", nameEn: "Prompt & Compute Governance Scanner", label: "BROWSER RULE SCAN", status: "ready", statusZh: "固定文字動畫可播放", statusEn: "FIXED TEXT READY",
    headlineZh: "把命中詞、責任缺口與估算成本攤開。", headlineEn: "Expose pattern hits, responsibility gaps and estimated cost.",
    introZh: "兩段固定文字依 engine.js 重算 SPI、SCBKR、命中數與每字估算成本；成本永遠標示 Estimate。", introEn: "Two fixed texts recompute SPI, SCBKR, hits and per-character cost from engine.js, with cost always labeled Estimate.",
    formula: "FIXED TEXT → RULE HITS → SPI + SCBKR → ESTIMATE", sourceRepo: "https://github.com/HIJO790401/semantic-firewall-system",
    steps: [{ key: "01", zh: "掃描固定文字", en: "Scan fixed text" }, { key: "02", zh: "揭露命中與缺口", en: "Expose hits and gaps" }, { key: "03", zh: "輸出啟發式分數", en: "Output heuristic score" }],
  },
  {
    code: "SF-05", slug: "dual-engine", index: "SF-05", name: "語意防火牆雙引擎", nameEn: "Semantic Firewall Dual Engine", label: "TWO PREWRITTEN CASES", status: "ready", statusZh: "兩個固定案例可播放", statusEn: "TWO FIXED CASES READY",
    headlineZh: "法律責任與成本敘事分開，最後只在責任鏈交會。", headlineEn: "Legal exposure and cost narrative remain separate, meeting only at responsibility.",
    introZh: "保留原 Repo 的兩個預寫案例，不提供任意案件分析、事實查核或正式 API。", introEn: "Preserves the two prewritten source cases without arbitrary-case analysis, fact checking or a production API.",
    formula: "LEGAL CASE × COST CASE → RESPONSIBILITY CROSS-CHECK", sourceRepo: "https://github.com/HIJO790401/semantic-firewall-dual-engine-demo",
    steps: [{ key: "A", zh: "法律責任固定案例", en: "Fixed legal-responsibility case" }, { key: "B", zh: "成本敘事固定案例", en: "Fixed cost-narrative case" }, { key: "π", zh: "只在責任交會", en: "Meet only at responsibility" }],
  },
  {
    code: "SF-06", slug: "copyright", index: "SF-06", name: "著作權 SCBKR 責任邊界引擎", nameEn: "Copyright SCBKR Boundary Engine", label: "FIXED 3×4 MATRIX", status: "ready", statusZh: "原 Auto Demo 可播放", statusEn: "SOURCE AUTO DEMO READY",
    headlineZh: "持有內容，不等於取得使用權限。", headlineEn: "Possession of content does not grant permission.",
    introZh: "固定新聞授權案例依序通過 Summary、RAG、Training 與 Commercial Generation。", introEn: "A fixed news-license case moves through Summary, RAG, Training and Commercial Generation.",
    formula: "LICENSE CASE × USE → BOUNDARY STATE → OPTION FINGERPRINT", sourceRepo: "https://github.com/HIJO790401/copyright-scbkr-engine",
    steps: [{ key: "01", zh: "鎖定授權情境", en: "Lock license case" }, { key: "02", zh: "逐用途判定", en: "Judge each use" }, { key: "03", zh: "保留失敗條件", en: "Preserve failure conditions" }],
  },
  {
    code: "RG-01", slug: "scbkr", index: "RG-01", name: "SCBKR 本地責任鏈模型", nameEn: "SCBKR Local Responsibility Model", label: "OWNER-DEFERRED", status: "deferred", statusZh: "依指示暫緩動畫", statusEn: "MOTION DEFERRED BY OWNER",
    headlineZh: "責任鏈模型保留驗證優先，不用動畫假裝自動理解。", headlineEn: "The responsibility-chain model remains evidence-first, without fake automation.",
    introZh: "真實流程需要使用者簽名、生成、驗收與二次確認；依 Owner 指示，本階段不轉成自動動畫。", introEn: "The real flow requires signature, generation, acceptance and reconfirmation; per the Owner, motion is deferred in this phase.",
    formula: "DRAFT → OWNER SIGNATURE → ACCEPTANCE → RECONFIRMATION", sourceRepo: "https://github.com/HIJO790401/scbkr-local-responsibility-model",
    steps: [{ key: "S", zh: "需要人類簽名", en: "Human signature required" }, { key: "A", zh: "需要人類驗收", en: "Human acceptance required" }, { key: "R", zh: "自動動畫暫緩", en: "Automatic film deferred" }],
  },
  {
    code: "RG-02", slug: "memory-index", index: "RG-02", name: "SCBKR Memory Index", nameEn: "SCBKR Memory Index", label: "METADATA-ONLY INDEX", status: "ready", statusZh: "索引邊界動畫可播放", statusEn: "INDEX-BOUNDARY FILM READY",
    headlineZh: "只索引檔名、路徑與時間；不偷讀內容。", headlineEn: "Index filename, path and time only—never document contents.",
    introZh: "固定 metadata 經 B／R／K Gate 形成 decision-ready JSON，再重播本機關鍵字查詢；不是向量或語意搜尋。", introEn: "Fixed metadata passes B/R/K gates into decision-ready JSON, then replays local keyword search; it is not vector or semantic search.",
    formula: "FILENAME + PATH + MTIME → B/R/K GATE → JSON → KEYWORD QUERY", sourceRepo: "https://github.com/HIJO790401/scbkr-memory-index",
    steps: [{ key: "01", zh: "擷取 metadata", en: "Capture metadata" }, { key: "02", zh: "通過 B／R／K 閘門", en: "Pass B/R/K gates" }, { key: "03", zh: "本機關鍵字召回", en: "Local keyword recall" }],
  },
  {
    code: "RG-03", slug: "wif-eligibility", index: "RG-03", name: "WIF 決策資格審計展示", nameEn: "WIF Decision Eligibility Audit Display", label: "CURATED FIXTURES", status: "ready", statusZh: "三類代表案例可播放", statusEn: "THREE CURATED CASES READY",
    headlineZh: "不是每個物件都有資格進入決策。", headlineEn: "Not every object qualifies to enter a decision.",
    introZh: "Website、Image、Finance 各一個策展案例，重播預寫 gate、缺口與必要驗證。", introEn: "One curated Website, Image and Finance case replays its prewritten gate, gap and required verification.",
    formula: "CURATED OBJECT → CAL → SCBKR → R-LOCK / VOID → GATE", sourceRepo: "https://github.com/HIJO790401/SCBKR-WIF-Decision-Eligibility-Audit-Engine-Demo",
    steps: [{ key: "W", zh: "網站物件", en: "Website object" }, { key: "I", zh: "圖像物件", en: "Image object" }, { key: "F", zh: "金融物件", en: "Finance object" }],
  },
  {
    code: "RG-04", slug: "tirc-rebuild", index: "RG-04", name: "TIRC 文件責任閘門", nameEn: "TIRC Document Responsibility Gate", label: "SAFE SYNTHETIC TXT", status: "ready", statusZh: "安全文件案例可播放", statusEn: "SAFE DOCUMENT FILM READY",
    headlineZh: "一份安全合成 TXT，通過 T1–T3、六欄 ICC 與雜湊鏈。", headlineEn: "One safe synthetic TXT passes T1–T3, six ICC fields and a hash chain.",
    introZh: "不接收訪客檔案；只重播固定合成文件的權限政策、ICC 判定、文件 hash 與 audit hash。", introEn: "No visitor file is accepted; a fixed synthetic document replays actor policy, ICC, document hash and audit hash.",
    formula: "SYNTHETIC TXT → T1/T2/T3 POLICY → SIX ICC FIELDS → HASH CHAIN", sourceRepo: "https://github.com/HIJO790401/TIRC-Document-Gate",
    steps: [{ key: "01", zh: "載入安全合成 TXT", en: "Load safe synthetic TXT" }, { key: "02", zh: "評估 T1–T3 與六欄 ICC", en: "Evaluate T1–T3 and six ICC fields" }, { key: "03", zh: "留下兩段雜湊", en: "Record two hashes" }],
  },
  {
    code: "RG-05", slug: "wif-pay", index: "RG-05", name: "WIF-Pay 付款責任防火牆", nameEn: "WIF-Pay Responsibility Firewall", label: "THREE PAYMENT CASES", status: "ready", statusZh: "三個固定情境可播放", statusEn: "THREE FIXED CASES READY",
    headlineZh: "付款不是一個點，而是四個責任節點的回放。", headlineEn: "A payment is not one point; it is a replay across four responsibility nodes.",
    introZh: "正常訂閱、疑似盜刷禮物與三方推責案例，依原權重重算 WIF、SCBKR、Risk 與責任節點。", introEn: "Normal, suspicious-gift and liability-shirking cases recompute WIF, SCBKR, Risk and responsibility nodes from source weights.",
    formula: "FIXED PAYMENT → WIF + SCBKR + RISK → LIABILITY NODES", sourceRepo: "https://github.com/HIJO790401/Shen-Yao-WIF-Pay-Responsibility-Firewall",
    steps: [{ key: "01", zh: "事件向量", en: "Event vectors" }, { key: "02", zh: "原公式重算", en: "Source formula recompute" }, { key: "03", zh: "責任節點狀態", en: "Responsibility-node states" }],
  },
  {
    code: "RG-06", slug: "semantic-life-bridge", index: "RG-06", name: "SLB 語意生命通道", nameEn: "SLB Semantic Life Bridge", label: "FOUR SUPPORT CASES", status: "ready", statusZh: "四個固定支持案例可播放", statusEn: "FOUR FIXED SUPPORT CASES READY",
    headlineZh: "支持先看人，再看標籤、通道、情境與責任。", headlineEn: "Support starts with the person, then label, channel, context and responsibility.",
    introZh: "四個預寫支持案例只展示語意交集、記憶任務、下一步與責任邊界；永久標示非醫療、非診斷。", introEn: "Four prewritten support cases show overlap, memory tasks, next steps and boundaries, permanently labeled non-medical and non-diagnostic.",
    formula: "PERSON → CHANNEL → CONTEXT → SUPPORT STEP → RESPONSIBILITY", sourceRepo: "https://github.com/HIJO790401/shen-slb-demo",
    steps: [{ key: "P", zh: "人先於標籤", en: "Person before label" }, { key: "C", zh: "固定通道案例", en: "Fixed channel case" }, { key: "R", zh: "非醫療責任邊界", en: "Non-medical boundary" }],
  },
  {
    code: "CM-01", slug: "shen-universe", index: "CM-01", name: "沈靜流派創作宇宙", nameEn: "SERENE SCHOOL CREATIVE UNIVERSE", label: "SOURCE 2D CANVAS", status: "ready", statusZh: "2D Canvas 動畫可播放", statusEn: "2D CANVAS FILM READY",
    headlineZh: "冰與火、星點、連線、心形軌跡，在真實 2D Canvas 中流動。", headlineEn: "Ice, fire, stars, links and a heart path move inside a real 2D Canvas.",
    introZh: "保留原始 2D Canvas 與指標視差；沒有 Three.js、WebGL 3D、後端或可查詢星圖。", introEn: "Preserves the source 2D Canvas and pointer parallax; there is no Three.js, WebGL 3D, backend or queryable star map.",
    formula: "SOURCE 2D CANVAS → ICE / FIRE → LINKS → HEART PATH → PARALLAX", sourceRepo: "https://github.com/HIJO790401/shenjing-universe",
    steps: [{ key: "2D", zh: "繪製星空與雙核心", en: "Draw stars and dual cores" }, { key: "∞", zh: "連線與心形軌跡", en: "Links and heart path" }, { key: "↔", zh: "滑鼠／觸控視差", en: "Pointer parallax" }],
  },
  {
    code: "CM-02", slug: "sy-sentinel", index: "CM-02", name: "SY Sentinel v1.1", nameEn: "SY Sentinel v1.1", label: "DETERMINISTIC SIMULATION", status: "ready", statusZh: "確定性前端模擬可播放", statusEn: "DETERMINISTIC SIMULATION READY",
    headlineZh: "移除隨機證據，只保留固定事件、十三軸與可回放日誌。", headlineEn: "Remove random evidence; retain fixed events, thirteen axes and replayable logs.",
    introZh: "以確定性 fixture 複寫關鍵字命中、字數公式、13 軸與前端 state 日誌；明確標示 Simulation，不冒充真監控或 WORM。", introEn: "Deterministic fixtures replay keyword hits, length formulas, 13 axes and front-end state logs, labeled Simulation—not live monitoring or WORM.",
    formula: "FIXED EVENT → KEYWORD HITS → 13 AXES → DETERMINISTIC LOG", sourceRepo: "https://github.com/HIJO790401/SY-Sentinel-v1.1",
    steps: [{ key: "01", zh: "固定事件進場", en: "Fixed event enters" }, { key: "13", zh: "十三軸同步亮起", en: "Thirteen axes resolve" }, { key: "LOG", zh: "輸出確定性模擬日誌", en: "Emit deterministic simulation log" }],
  },
];

export const demoRouteByProductCode = Object.fromEntries(productFilms.map((film) => [film.code, film])) as Record<string, ProductFilm>;

export function findFilm(slug: string) {
  const legacyAliases: Record<string, string> = {
    "anti-scam": "anti-scam-rlock",
    tirc: "tirc-rebuild",
    wif: "wif-eligibility",
  };
  const resolvedSlug = legacyAliases[slug] ?? slug;
  return productFilms.find((film) => film.slug === resolvedSlug);
}
