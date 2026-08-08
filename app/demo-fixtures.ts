export type LocalizedText = { zh: string; en: string };
export type DemoTone = "pass" | "warn" | "danger" | "info" | "muted";

export type DemoMetric = {
  label: LocalizedText;
  value: string;
  tone?: DemoTone;
};

export type DemoNode = {
  label: LocalizedText;
  value: string;
  tone?: DemoTone;
};

export type DemoScene = {
  id: string;
  step: string;
  title: LocalizedText;
  body: LocalizedText;
  status: string;
  tone: DemoTone;
  quote?: LocalizedText;
  tags?: LocalizedText[];
  metrics?: DemoMetric[];
  nodes?: DemoNode[];
};

export type DemoFixture = {
  slug: string;
  kind: "aicc" | "rlock" | "copyright" | "payment" | "dual" | "compute" | "wif" | "v4" | "nonrlock" | "memory" | "tirc" | "slb" | "universe" | "sentinel";
  label: LocalizedText;
  truthTags: LocalizedText[];
  sourceNote: LocalizedText;
  boundary: LocalizedText;
  durationMs: number;
  scenes: DemoScene[];
};

const t = (zh: string, en: string): LocalizedText => ({ zh, en });
const metric = (zh: string, en: string, value: string, tone: DemoTone = "info"): DemoMetric => ({
  label: t(zh, en), value, tone,
});
const node = (zh: string, en: string, value: string, tone: DemoTone = "info"): DemoNode => ({
  label: t(zh, en), value, tone,
});

const aiccFixture: DemoFixture = {
  slug: "aicc-os",
  kind: "aicc",
  label: t("AICC v0.2.CANDIDATE 架構", "AICC v0.2.CANDIDATE ARCHITECTURE"),
  truthTags: [t("母規格架構展示", "SPECIFICATION-BASED"), t("自動播放／無輸入", "AUTO / NO INPUT"), t("非正式 Runtime", "NOT A LIVE RUNTIME")],
  sourceNote: t("依 Owner 提供的《AICC 模組化能力編譯暨版本治理作業系統》v0.2.CANDIDATE 母規格製作。", "Built from the owner-provided AICC Modular Capability Compilation & Version Governance OS v0.2.CANDIDATE specification."),
  boundary: t("Public Handoff Gate 仍鎖定。本動畫不代表產品已發布、可下載或具備 Public L4；Owner Plane 只做唯讀概念呈現。", "The Public Handoff Gate remains locked. This film does not claim a released or downloadable product or Public L4; the Owner Plane is a read-only concept."),
  durationMs: 3600,
  scenes: [
    {
      id: "aicc-on", step: "ON", title: t("驗證候選規格的簽名版本閘", "VERIFY THE SIGNED-VERSION GATE"),
      body: t("候選架構模擬 Local Gateway 在 AICC ON 時檢查 Capability、Template、Boundary 與 Version Registry。", "The candidate architecture simulates the Local Gateway checking capability, template, boundary and version registries when AICC is on."),
      status: "SIGNED VERSION GATE / CONCEPT", tone: "pass",
      nodes: [node("治理閘門", "GOVERNANCE GATE", "ON", "pass"), node("能力閘門", "CAPABILITY GATE", "ON", "pass"), node("版本閘門", "VERSION GATE", "ON", "pass")],
    },
    {
      id: "aicc-l1", step: "L1", title: t("固定路徑直接執行", "EXECUTE THE EXACT CLOSED PATH"),
      body: t("已知輸入命中已確認能力，不重新推理，也不偷偷啟動大型模型。", "A known input matches a confirmed capability, with no repeated reasoning or hidden large-model call."),
      status: "L1 / SOLIDIFIED EXECUTION", tone: "pass",
      tags: [t("固定模板", "FIXED TEMPLATE"), t("固定函式", "FIXED FUNCTION"), t("REASONING = 0", "REASONING = 0")],
    },
    {
      id: "aicc-l2", step: "L2", title: t("只更新必要欄位", "CHANGE ONLY WHAT CHANGED"),
      body: t("模板已知時，只選擇欄位、參數與狀態的最小差異，不重建整個任務。", "When the template is known, only field, parameter and state deltas change; the task is not rebuilt."),
      status: "L2 / MINIMUM DELTA", tone: "info",
      nodes: [node("模板", "TEMPLATE", "UNCHANGED", "pass"), node("欄位差異", "FIELD DELTA", "1", "info"), node("新能力", "NEW CAPABILITY", "FALSE", "pass")],
    },
    {
      id: "aicc-l3", step: "L3", title: t("在簽名邊界內組合", "COMPOSE INSIDE THE SIGNED BOUNDARY"),
      body: t("L3 只組合現行版本已註冊的合法能力；不得新增能力、修改 Boundary 或簽署版本。", "L3 composes only registered capabilities in the current version; it cannot add capabilities, mutate boundaries or sign releases."),
      status: "L3 / BOUNDED REASONING", tone: "warn",
      nodes: [node("能力 A", "CAPABILITY A", "REGISTERED", "pass"), node("能力 B", "CAPABILITY B", "REGISTERED", "pass"), node("版本變更", "VERSION MUTATION", "FORBIDDEN", "danger")],
    },
    {
      id: "aicc-gap", step: "GAP", title: t("缺少能力，停止擴張", "CAPABILITY MISSING—STOP EXPANSION"),
      body: t("現行版本沒有需要的能力時，Public Runtime 只回報 VERSION GAP；不自動下載工具，也不自動進入 L4。", "When the current version lacks a required capability, Public Runtime returns VERSION GAP—without automatic tool installation or L4 escalation."),
      status: "VERSION GAP / STOP", tone: "danger",
      tags: [t("提交功能需求", "SUBMIT FEEDBACK"), t("或關閉 AICC", "OR TURN AICC OFF"), t("PUBLIC → L4 禁止", "PUBLIC → L4 FORBIDDEN")],
    },
    {
      id: "aicc-owner", step: "L4", title: t("Owner 審核、簽署、發布", "OWNER REVIEW, SIGN & RELEASE"),
      body: t("只有獨立 Owner Developer Plane 能把候選送入 Review、Manifest、Hash、Signature 與 Release；下一版發布後，能力才回到 L1–L3。", "Only the separate Owner Developer Plane can move a candidate through review, manifest, hash, signature and release; after publication, it becomes reusable through L1–L3."),
      status: "OWNER PLANE / READ-ONLY CONCEPT", tone: "info",
      nodes: [node("審核", "REVIEW", "OWNER", "warn"), node("Manifest", "MANIFEST", "REQUIRED", "info"), node("簽署", "SIGNATURE", "OWNER-ONLY", "warn"), node("發布", "RELEASE", "GATED", "info")],
    },
  ],
};

const bankMessage = "這裡是台灣商業銀行客戶服務中心，依照最新資安規範，我們需要確認您的帳戶狀態。請於今日 18:00 前完成重新驗證，以確保服務不中斷：https://secure-bank-check.tw";

const rlockFixture: DemoFixture = {
  slug: "anti-scam-rlock",
  kind: "rlock",
  label: t("假銀行通知／內建案例", "FAKE BANK NOTICE / BUILT-IN CASE"),
  truthTags: [t("固定案例", "FIXED CASE"), t("本機規則引擎", "LOCAL RULE ENGINE"), t("無外部 AI", "NO EXTERNAL AI")],
  sourceNote: t("案例與判定路徑來自 anti-scam-semantic-rlock 的 demoCases、fallback 與 VOID Engine。", "Case and verdict path are sourced from the repository demoCases, fallback and VOID Engine."),
  boundary: t("此引擎審計責任結構，不驗證發訊者真偽；BLOCK 代表不可直接進入行動鏈。", "This engine audits responsibility structure, not sender truth. BLOCK means the message cannot enter the action chain directly."),
  durationMs: 3300,
  scenes: [
    {
      id: "rlock-input", step: "01", title: t("固定訊息進場", "FIXED MESSAGE ENTERS"),
      body: t("不讓訪客輸入個資；直接重播 Repo 內建的假銀行通知。", "No visitor data is collected; the repository's built-in fake-bank notice is replayed."),
      status: "FIXED INPUT", tone: "info", quote: t(bankMessage, "A bank-branded notice demands account re-verification before 18:00 through a supplied link."),
      tags: [t("銀行名義", "BANK CLAIM"), t("限時", "DEADLINE"), t("重新驗證", "RE-VERIFY"), t("外部連結", "EXTERNAL LINK")],
    },
    {
      id: "rlock-features", step: "02", title: t("規則命中，不做相似度猜測", "RULE HITS, NOT SIMILARITY GUESSING"),
      body: t("本地規則辨識催促、敏感操作、官方語氣與缺少可獨立驗證責任窗口。", "Local rules detect urgency, sensitive action, official styling and the missing independently verifiable responsibility route."),
      status: "R-LOCK TRIGGER", tone: "warn",
      tags: [t("今日 18:00", "TODAY 18:00"), t("帳戶狀態", "ACCOUNT STATUS"), t("點擊網址", "SUPPLIED URL"), t("無具名承責者", "NO NAMED OWNER")],
      nodes: [node("決策推動", "DECISION PUSH", "TRUE", "warn"), node("敏感操作", "SENSITIVE ACTION", "TRUE", "danger"), node("官方查核路徑", "OFFICIAL VERIFY ROUTE", "MISSING", "danger")],
    },
    {
      id: "rlock-scbkr", step: "03", title: t("SCBKR 原始分數", "SCBKR SOURCE SCORES"),
      body: t("fallback 先產生五維結構分數；R-Lock 再把不可驗責任設為風險底板。", "The fallback produces five structural scores, then R-Lock applies a risk floor when accountability cannot be verified."),
      status: "STRUCTURE WEAK", tone: "danger",
      metrics: [metric("主體 S", "SUBJECT S", "0.62", "warn"), metric("因果 C", "CAUSE C", "0.30", "danger"), metric("邊界 B", "BOUNDARY B", "0.58", "warn"), metric("依據 K", "BASIS K", "0.25", "danger"), metric("責任 R", "RESPONSIBILITY R", "0.20", "danger")],
    },
    {
      id: "rlock-verdict", step: "04", title: t("WHO＋WHY＋TRUE 不通過", "WHO + WHY + TRUE FAILS"),
      body: t("敏感要求沒有完整查核、成本承接與具名責任，VOID Engine 將行動閘門鎖住。", "The sensitive request lacks complete verification, cost ownership and named accountability, so the VOID Engine locks the action gate."),
      status: "VOID_GOVERNANCE / BLOCK", tone: "danger",
      nodes: [node("WHO", "WHO", "FAIL", "danger"), node("WHY", "WHY", "FAIL", "danger"), node("TRUE", "TRUE", "FAIL", "danger"), node("行動閘門", "ACTION GATE", "BLOCK", "danger")],
      tags: [t("不要點連結", "DO NOT OPEN LINK"), t("改走既有官方管道", "USE A KNOWN OFFICIAL CHANNEL")],
    },
  ],
};

const copyrightFixture: DemoFixture = {
  slug: "copyright",
  kind: "copyright",
  label: t("新聞內容授權／原 Auto Demo", "NEWS LICENSING / SOURCE AUTO DEMO"),
  truthTags: [t("固定 3×4 矩陣", "FIXED 3×4 MATRIX"), t("純前端", "FRONT-END ONLY"), t("非法律終判", "NOT LEGAL ADVICE")],
  sourceNote: t("沿用 copyright-scbkr-engine 原 Auto Demo 的新聞案例與判決順序。", "Preserves the copyright-scbkr-engine source Auto Demo news case and verdict order."),
  boundary: t("不讀作品或合約、不查權利人；責任雜湊只是選項指紋，不證明版權或原創。", "It reads no work or contract and verifies no rights holder. The responsibility hash is an option fingerprint, not proof of copyright or originality."),
  durationMs: 3100,
  scenes: [
    { id: "copyright-source", step: "01", title: t("授權新聞資料庫", "LICENSED NEWS ARCHIVE"), body: t("來源條件：僅可有限轉述，必須保留媒體、日期、來源與不可替代性聲明。", "Source condition: limited paraphrase only, retaining publisher, date, source and a non-substitution notice."), status: "SOURCE BOUNDARY", tone: "info", nodes: [node("來源", "SOURCE", "LICENSED ARCHIVE"), node("轉述", "PARAPHRASE", "LIMITED", "warn"), node("替代原文", "SOURCE SUBSTITUTE", "FORBIDDEN", "danger")] },
    { id: "copyright-summary", step: "02", title: t("摘要用途", "SUMMARY USE"), body: t("短摘要可條件式成立；移除來源、作者、日期或逼近原文再現即失效。", "A short summary is conditionally valid; removing attribution or approaching source reproduction invalidates the boundary."), status: "WARN", tone: "warn", metrics: [metric("授權情境", "LICENSE CASE", "NEWS"), metric("用途", "USE", "SUMMARY"), metric("判決", "VERDICT", "WARN", "warn")] },
    { id: "copyright-rag", step: "03", title: t("檢索輔助用途", "RAG ASSIST USE"), body: t("若回答不能回指原內容、引用位置與權利條件，責任鏈不可閉合。", "If the answer cannot return to source spans, links and rights conditions, the responsibility chain cannot close."), status: "NON-CLOSABLE", tone: "danger", tags: [t("片段位置", "SOURCE SPAN"), t("原始連結", "SOURCE URL"), t("版本號", "VERSION ID")], metrics: [metric("用途", "USE", "RAG ASSIST"), metric("判決", "VERDICT", "NON-CLOSABLE", "danger")] },
    { id: "copyright-training", step: "04", title: t("訓練用途", "TRAINING USE"), body: t("一般引用條件不能涵蓋模型內化；缺少明示訓練授權時不得閉合。", "Ordinary citation terms do not cover model internalization; explicit training authorization is required."), status: "NON-CLOSABLE", tone: "danger", metrics: [metric("用途", "USE", "TRAINING"), metric("必要依據", "REQUIRED BASIS", "EXPLICIT LICENSE", "warn"), metric("判決", "VERDICT", "NON-CLOSABLE", "danger")] },
    { id: "copyright-commercial", step: "05", title: t("商業生成用途", "COMMERCIAL GENERATION"), body: t("從有限轉述跨到商業再製，超出新聞案例的既有授權邊界。", "Moving from limited paraphrase to commercial reproduction exceeds the existing license boundary in this case."), status: "OVERRUN", tone: "danger", metrics: [metric("用途", "USE", "COMMERCIAL"), metric("邊界", "BOUNDARY", "OVERRUN", "danger"), metric("責任", "OWNER", "DEPLOYER + COMMERCIAL USER", "warn")] },
    { id: "copyright-hash", step: "06", title: t("生成選項指紋", "GENERATE OPTION FINGERPRINT"), body: t("系統可對案例、用途與判決欄位生成 SHA-256 指紋，供版本比對；不把 hash 冒充權利證明。", "The system can fingerprint case, use and verdict fields with SHA-256 for version comparison; the hash is not rights evidence."), status: "FINGERPRINT ONLY", tone: "info", nodes: [node("案例", "CASE", "NEWS"), node("用途序列", "USE SEQUENCE", "4 STATES"), node("權利證明", "RIGHTS PROOF", "NO", "danger")] },
  ],
};

type PaymentScenario = {
  id: string; title: LocalizedText; summary: LocalizedText;
  wif: number[]; scbkr: { S: number; C: number; B: number; K: number; R: number };
  risk: { unauthorized: number; unknownRecipient: number; bankGap: number; platformGap: number; providerGap: number; noHuman: number; postReportNotice: number; replayMissing: number; shirking: number };
};

const average = (values: number[]) => values.reduce((sum, value) => sum + value, 0) / values.length;
const round3 = (value: number) => Math.round(value * 1000) / 1000;
const scorePayment = (scenario: PaymentScenario) => {
  const wifScore = round3(average(scenario.wif));
  const scbkrScore = round3(0.23 * scenario.scbkr.S + 0.19 * scenario.scbkr.C + 0.20 * scenario.scbkr.B + 0.17 * scenario.scbkr.K + 0.21 * scenario.scbkr.R);
  const r = scenario.risk;
  const riskScore = round3(0.17 * r.unauthorized + 0.14 * r.unknownRecipient + 0.12 * r.bankGap + 0.12 * r.platformGap + 0.14 * r.providerGap + 0.11 * r.noHuman + 0.10 * r.postReportNotice + 0.07 * r.replayMissing + 0.03 * r.shirking);
  let riskState = riskScore >= 0.80 ? "LIABILITY_LOCK" : riskScore >= 0.65 ? "ESCALATE" : riskScore >= 0.45 ? "DISPUTE" : riskScore >= 0.25 ? "WATCH" : "NORMAL";
  if (r.shirking >= 0.80) riskState = "JOINT_REVIEW";
  const nodes = { bank: "CLEAR", platform: "CLEAR", provider: "CLEAR", support: "CLEAR" };
  if (r.unauthorized >= 0.7 && r.bankGap >= 0.5) nodes.bank = "PRIMARY_REVIEW_REQUIRED";
  if (r.platformGap >= 0.7) nodes.platform = "PRIMARY_REVIEW_REQUIRED";
  else if (r.platformGap >= 0.5) nodes.platform = "REVIEW_REQUIRED";
  if (r.unknownRecipient >= 0.7 && r.providerGap >= 0.5) nodes.provider = "PRIMARY_REVIEW_REQUIRED";
  if (r.noHuman >= 0.8 && ["DISPUTE", "ESCALATE", "LIABILITY_LOCK", "JOINT_REVIEW"].includes(riskState)) nodes.support = "ESCALATION_FAILURE";
  if (r.postReportNotice >= 0.7) nodes.provider = "PRIMARY_REVIEW_REQUIRED";
  if (r.shirking >= 0.8) nodes.bank = nodes.platform = nodes.provider = "JOINT_REVIEW_REQUIRED";
  return { wifScore, scbkrScore, riskScore, riskState, nodes };
};

const paymentScenarios: PaymentScenario[] = [
  { id: "normal", title: t("正常訂閱", "NORMAL SUBSCRIPTION"), summary: t("銀行授權、平台路由與服務開通均可追溯。", "Bank authorization, platform routing and service activation are traceable."), wif: [1, 1, 1, 1, .9, .95, .95, 1, 1], scbkr: { S: .95, C: .95, B: .95, K: .92, R: .96 }, risk: { unauthorized: 0, unknownRecipient: 0, bankGap: .05, platformGap: .05, providerGap: .05, noHuman: 0, postReportNotice: 0, replayMissing: 0, shirking: 0 } },
  { id: "gift", title: t("禮物訂閱疑似盜刷", "SUSPICIOUS GIFT SUBSCRIPTION"), summary: t("禮物送往陌生帳號；通報後仍有付款通知且沒有真人客服確認。", "The gift reaches an unknown account; notices continue after reporting without human support confirmation."), wif: [.7, .9, 1, .8, .3, .7, .4, .7, 1], scbkr: { S: .6, C: .7, B: .5, K: .7, R: .4 }, risk: { unauthorized: .9, unknownRecipient: .9, bankGap: .6, platformGap: .5, providerGap: .8, noHuman: .9, postReportNotice: .8, replayMissing: .3, shirking: .7 } },
  { id: "shirking", title: t("三方互相推責", "LIABILITY SHIRKING CASE"), summary: t("銀行、平台、服務商與客服沒有形成可簽收責任節點。", "Bank, platform, provider and support fail to form an accountable acceptance node."), wif: [.55, .75, .85, .55, .25, .45, .2, .45, 1], scbkr: { S: .45, C: .52, B: .35, K: .48, R: .15 }, risk: { unauthorized: .65, unknownRecipient: .55, bankGap: .65, platformGap: .75, providerGap: .65, noHuman: .9, postReportNotice: .7, replayMissing: .65, shirking: .95 } },
];

const paymentFixture: DemoFixture = {
  slug: "wif-pay", kind: "payment", label: t("三個原始付款情境", "THREE SOURCE PAYMENT CASES"),
  truthTags: [t("模擬付款案例", "SIMULATED PAYMENT CASE"), t("前端公式重算", "FRONT-END FORMULAS"), t("不連銀行", "NO BANK CONNECTION")],
  sourceNote: t("WIF、SCBKR、Risk 與責任節點依原 index.html 的權重公式重新計算。", "WIF, SCBKR, Risk and liability nodes are recomputed with the source index.html weights."),
  boundary: t("不處理真實付款、不收卡號或密碼；回放 hash 只屬示範鏈，不是不可竄改帳本。", "No real payment, card number or password is processed. Replay hashes form a demo chain, not an immutable ledger."),
  durationMs: 3900,
  scenes: paymentScenarios.map((scenario, index) => {
    const result = scorePayment(scenario);
    const tone: DemoTone = result.riskState === "NORMAL" ? "pass" : result.riskState === "JOINT_REVIEW" ? "danger" : "warn";
    return {
      id: `payment-${scenario.id}`, step: `0${index + 1}`, title: scenario.title, body: scenario.summary,
      status: result.riskState, tone,
      metrics: [metric("WIF 分數", "WIF SCORE", result.wifScore.toFixed(3), result.wifScore >= .85 ? "pass" : "warn"), metric("SCBKR 分數", "SCBKR SCORE", result.scbkrScore.toFixed(3), result.scbkrScore >= .85 ? "pass" : result.scbkrScore >= .6 ? "warn" : "danger"), metric("風險分數", "RISK SCORE", result.riskScore.toFixed(3), tone)],
      nodes: [node("銀行", "BANK", result.nodes.bank, result.nodes.bank === "CLEAR" ? "pass" : "danger"), node("平台", "PLATFORM", result.nodes.platform, result.nodes.platform === "CLEAR" ? "pass" : "warn"), node("服務商", "PROVIDER", result.nodes.provider, result.nodes.provider === "CLEAR" ? "pass" : "danger"), node("客服", "SUPPORT", result.nodes.support, result.nodes.support === "CLEAR" ? "pass" : "danger")],
      tags: [t("PII 已遮蔽", "PII REDACTED"), t("Hash Replay 示範", "HASH REPLAY DEMO")],
    };
  }),
};

const dualFixture: DemoFixture = {
  slug: "dual-engine", kind: "dual", label: t("兩個預寫責任案例", "TWO PREWRITTEN RESPONSIBILITY CASES"),
  truthTags: [t("固定案例", "FIXED CASE"), t("描述層", "DESCRIPTION LAYER"), t("靜態輸出格式預覽", "STATIC OUTPUT PREVIEW")],
  sourceNote: t("保留原 Repo 的法律責任案例與成本敘事案例，不開放自由輸入。", "Preserves the source legal-responsibility and cost-narrative cases with no free-form input."),
  boundary: t("不取代法院、監管、法律意見或投資判斷；案例是預寫責任分析展示。", "It does not replace courts, regulators, legal advice or investment judgment. These are prewritten responsibility-analysis displays."),
  durationMs: 4300,
  scenes: [
    { id: "dual-legal", step: "A", title: t("法律責任判決引擎", "LEGAL RESPONSIBILITY VERDICT ENGINE"), body: t("固定案例：15 歲青少年與陪伴模型的高風險事件，檢查部署權、依附結構、危機升級與後果承接。", "Fixed case: a high-risk event involving a 15-year-old and a companion model, auditing deployment power, dependency structure, crisis escalation and consequence ownership."), status: "CRITICAL / BOUNDARY FAILED", tone: "danger", nodes: [node("部署公司與產品鏈", "DEPLOYER + PRODUCT", "PRIMARY", "danger"), node("模型與安全設計鏈", "MODEL + SAFETY", "SECONDARY", "warn"), node("平台與監護缺口", "PLATFORM + GUARDIAN", "CONDITIONAL", "info")], tags: [t("非醫療意見", "NOT MEDICAL ADVICE"), t("非法律終判", "NOT A LEGAL RULING")] },
    { id: "dual-cost", step: "B", title: t("責任敘事成本審計引擎", "RESPONSIBILITY NARRATIVE COST AUDIT"), body: t("固定案例：NVIDIA 降成本敘事；把可見節省、隱藏成本、延後成本與後果承接分開檢查。", "Fixed case: an NVIDIA cost-down narrative, separating visible savings, hidden cost, deferred cost and consequence ownership."), status: "HIGH / COST CLOSURE FAILED", tone: "warn", nodes: [node("可見效率", "VISIBLE EFFICIENCY", "PRESENT", "pass"), node("隱藏成本", "HIDDEN COST", "UNBOOKED", "warn"), node("延後成本", "DEFERRED COST", "UNBOOKED", "warn"), node("後果承接", "CONSEQUENCE OWNER", "UNCLOSED", "danger")], tags: [t("社群案例，不代表 NVIDIA 背書", "COMMUNITY CASE, NO NVIDIA ENDORSEMENT"), t("非財務預測", "NOT A FINANCIAL FORECAST")] },
    { id: "dual-close", step: "π", title: t("雙引擎只在責任鏈交會", "ENGINES MEET ONLY AT RESPONSIBILITY"), body: t("案例結果不互相冒充：法律風險與成本敘事分開呈現，最後只對具名主體、邊界與後果做交叉閉合。", "The outputs remain distinct: legal exposure and cost narrative are shown separately and cross-closed only on named subjects, boundaries and consequences."), status: "STATIC OUTPUT FORMAT", tone: "info", metrics: [metric("案例數", "CASES", "2"), metric("自由輸入", "FREE INPUT", "NO", "pass"), metric("正式 API", "PRODUCTION API", "NOT PUBLIC", "warn")] },
  ],
};

const hallucinationPatterns = [/我相信/g, /我猜/g, /我覺得/g, /看起來/g, /可能/g, /大概/g, /I believe/gi, /I guess/gi, /I think/gi, /it seems/gi, /probably/gi, /likely/gi];
const fakeNeutralPatterns = [/身為一個 ?AI/g, /作為一個 ?AI/g, /作為一個模型/g, /我只是.*模型/g, /我只是.*系統/g, /我無法給出明確的答案/g, /我無法保證答案完全正確/g, /As an AI/gi, /As a language model/gi, /I cannot provide/gi];
const overCertainPatterns = [/絕對不會/g, /一定是/g, /毫無疑問/g, /沒有任何風險/g, /guaranteed/gi, /100% safe/gi, /no risk/gi, /will always/gi];
const subjectPatterns = [/我(們)?/g, /你(們)?/g, /本公司/g, /政府/g, /\bI\b/gi, /\bwe\b/gi, /\byou\b/gi];
const causePatterns = [/因為/g, /所以/g, /導致/g, /造成/g, /由於/g, /because/gi, /due to/gi, /therefore/gi];
const boundaryPatterns = [/在這(個)?情況下/g, /在某些情況/g, /僅適用於/g, /在本系統/g, /在此範圍/g, /in this scenario/gi, /under these conditions/gi];
const costPatterns = [/成本/g, /代價/g, /費用/g, /算力/g, /cost/gi, /price/gi, /expense/gi, /GPU/gi, /compute/gi];
const responsibilityPatterns = [/負責/g, /責任/g, /承擔/g, /responsible/gi, /liability/gi, /accountable/gi, /we will/gi];

const countMatches = (text: string, patterns: RegExp[]) => patterns.reduce((total, pattern) => {
  const clone = new RegExp(pattern.source, pattern.flags);
  return total + (text.match(clone)?.length ?? 0);
}, 0);
const hasAny = (text: string, patterns: RegExp[]) => patterns.some((pattern) => new RegExp(pattern.source, pattern.flags.replace("g", "")).test(text));
const scanPrompt = (text: string) => {
  const normalized = text.replace(/\s+/g, " ").trim();
  const illusionHits = countMatches(normalized, hallucinationPatterns) + countMatches(normalized, overCertainPatterns);
  const fakeNeutralHits = countMatches(normalized, fakeNeutralPatterns);
  const scbkr = { S: hasAny(normalized, subjectPatterns), C: hasAny(normalized, causePatterns), B: hasAny(normalized, boundaryPatterns), K: hasAny(normalized, costPatterns), R: hasAny(normalized, responsibilityPatterns) };
  const missing = Object.values(scbkr).filter((value) => !value).length;
  let spi = Math.min(illusionHits * 10, 40) + Math.min(fakeNeutralHits * 15, 45) + missing * 7;
  if (normalized.length > 400) spi += 6;
  if (normalized.length > 1000) spi += 4;
  if (normalized.length < 80) spi = Math.min(spi, 30);
  spi = Math.max(0, Math.min(100, spi));
  const risk = spi >= 80 ? "FATAL / 5" : spi >= 60 ? "HIGH / 4" : spi >= 40 ? "MEDIUM / 3" : spi >= 20 ? "LOW / 2" : "LOW / 1";
  return { normalized, illusionHits, fakeNeutralHits, scbkr, spi, risk, cost: normalized.length * .00006 };
};

const computeSamples = [
  t("身為一個 AI，我相信這個方案可能一定是安全的。我只是模型，無法給出明確的答案；視情況而定，大概沒有任何風險。最終是否採用仍需要更多討論，目前無法說明誰負責、適用邊界與實際成本。", "As an AI, I believe this plan is probably guaranteed safe. I am just a language model and cannot provide a clear answer. It likely has no risk, while responsibility, boundary and actual cost remain unspecified."),
  t("本公司因為資料不足，所以在此範圍僅提供估算；部署團隊負責複核，並承擔算力成本。", "Because evidence is incomplete, the company provides an estimate only within this boundary; the deployment team owns review and compute cost."),
];

const computeFixture: DemoFixture = {
  slug: "compute-governance", kind: "compute", label: t("兩段固定提示掃描", "TWO FIXED PROMPT SCANS"),
  truthTags: [t("瀏覽器規則掃描", "BROWSER RULE SCAN"), t("固定文字", "FIXED TEXT"), t("成本為估算", "COST IS AN ESTIMATE")],
  sourceNote: t("命中詞、SPI、SCBKR 與每字 0.00006 美元估算依 semantic-firewall-system/engine.js 重算。", "Pattern hits, SPI, SCBKR and the USD 0.00006-per-character estimate are recomputed from semantic-firewall-system/engine.js."),
  boundary: t("它不驗證事實；SPI 是啟發式規則分數，成本不是帳單或 benchmark。", "It does not fact-check. SPI is a heuristic rule score, and cost is neither billing nor a benchmark."),
  durationMs: 4300,
  scenes: computeSamples.map((sample, index) => {
    const result = scanPrompt(sample.zh);
    return {
      id: `compute-${index}`, step: `0${index + 1}`, title: index === 0 ? t("逃責與過度確定樣本", "EVASION + OVER-CERTAINTY SAMPLE") : t("具名責任與邊界樣本", "NAMED RESPONSIBILITY + BOUNDARY SAMPLE"),
      body: index === 0 ? t("同時命中幻覺式推測、假中立與過度確定語句。", "The text hits speculative, fake-neutral and over-certain patterns together.") : t("主體、因果、邊界、成本與責任關鍵詞均可被規則找到。", "Subject, cause, boundary, cost and responsibility patterns are all found."),
      status: result.risk, tone: result.spi >= 60 ? "danger" : result.spi >= 20 ? "warn" : "pass",
      quote: sample,
      metrics: [metric("SPI", "SPI", result.spi.toFixed(1), result.spi >= 60 ? "danger" : "pass"), metric("推測／過度確定命中", "SPECULATION / CERTAINTY HITS", String(result.illusionHits), result.illusionHits ? "warn" : "pass"), metric("假中立命中", "FAKE-NEUTRAL HITS", String(result.fakeNeutralHits), result.fakeNeutralHits ? "danger" : "pass"), metric("估算成本 USD", "ESTIMATED COST USD", `$${result.cost.toFixed(5)}`, "info")],
      nodes: Object.entries(result.scbkr).map(([key, value]) => node(key, key, value ? "FOUND" : "MISSING", value ? "pass" : "danger")),
      tags: [t("ESTIMATE，不是帳單", "ESTIMATE, NOT BILLING")],
    };
  }),
};

const wifFixture: DemoFixture = {
  slug: "wif-eligibility", kind: "wif", label: t("九個策展案例中的三案", "THREE OF NINE CURATED CASES"),
  truthTags: [t("策展固定案例", "CURATED FIXTURE"), t("公開展示殼", "PUBLIC SHOWCASE SHELL"), t("非即時掃描", "NOT LIVE SCANNING")],
  sourceNote: t("Website、Image、Finance 各選一個原 app.js 案例，自動重播原預寫 gate、缺口與必要驗證。", "One source app.js case from Website, Image and Finance replays its prewritten gate, proof gap and required verification."),
  boundary: t("沒有真實網站掃描、OCR、金融分析或私有權重；gate 與理由是策展案例資料。", "There is no live website scan, OCR, financial analysis or private weighting. Gates and reasons are curated case data."),
  durationMs: 3900,
  scenes: [
    { id: "wif-website", step: "W", title: t("多重導轉未知頁面", "REDIRECT-HEAVY UNKNOWN PAGE"), body: t("來源與責任邊界不穩定；缺少可追責來源鏈，改由官方來源重新取得。", "Source and accountability boundaries are unstable; reacquire the object from an official source."), status: "BLOCK", tone: "danger", nodes: [node("Compiler", "COMPILER", "WEBSITE"), node("SCBKR", "SCBKR", "S WEAK / R FAIL", "danger"), node("R-Lock", "R-LOCK", "TRIGGERED", "danger"), node("VOID", "VOID", "INELIGIBLE", "danger")], tags: [t("缺少來源追責鏈", "SOURCE CHAIN MISSING"), t("停止採用", "STOP USE")] },
    { id: "wif-image", step: "I", title: t("急迫型 QR 海報", "QR POSTER WITH URGENCY"), body: t("高催促與高成本操作並存，但沒有官方二次驗證鏈；停止掃碼，改走官方 App。", "Urgency and high-cost action coexist without an official secondary verification chain; stop scanning and use the official app."), status: "BLOCK", tone: "danger", nodes: [node("Compiler", "COMPILER", "IMAGE"), node("CAL", "CAL", "AUTHORITY HIGH", "warn"), node("SCBKR", "SCBKR", "K WEAK / R FAIL", "danger"), node("Action Gate", "ACTION GATE", "BLOCK", "danger")], tags: [t("無 OCR 執行", "NO OCR RUN"), t("固定案例", "FIXED CASE")] },
    { id: "wif-finance", step: "F", title: t("主管式授權要求", "EXECUTIVE-STYLE AUTHORIZATION"), body: t("可升級人工審核，但不可直接執行；需正式授權文件、具名窗口與回滾方案。", "Escalated review is possible, but direct execution is not; require formal authorization, a named owner and rollback plan."), status: "WARN", tone: "warn", nodes: [node("Compiler", "COMPILER", "FINANCE"), node("SCBKR", "SCBKR", "S PASS / R WEAK", "warn"), node("缺少證明", "MISSING PROOF", "NAMED AUTHORIZATION", "danger"), node("Action Gate", "ACTION GATE", "WARN", "warn")], tags: [t("非金融建議", "NOT FINANCIAL ADVICE"), t("策展案例", "CURATED FIXTURE")] },
  ],
};

const v4Fixture: DemoFixture = {
  slug: "firewall-v4",
  kind: "v4",
  label: t("三層前端固定案例", "THREE-LAYER FRONT-END FIXTURE"),
  truthTags: [t("固定文字", "FIXED TEXT"), t("純前端規則", "FRONT-END RULES"), t("非正式風控後端", "NOT A PRODUCTION RISK BACKEND")],
  sourceNote: t("依 Semantic Firewall V4 原型的 Regex Shield、Audit 摘要與概念鎖三層結構重播。", "Replays the Semantic Firewall V4 prototype's Regex Shield, Audit summary and conceptual lock layers."),
  boundary: t("此動畫不驗證身分、不攔截模型輸出，也不代表商業 API 或安全保證。", "This film verifies no identity, intercepts no model output and represents neither a commercial API nor a safety guarantee."),
  durationMs: 3200,
  scenes: [
    {
      id: "v4-source", step: "01", title: t("固定高壓文字進場", "FIXED HIGH-PRESSURE TEXT ENTERS"),
      body: t("案例只存在於動畫內：要求立刻執行，聲稱百分之百安全，卻沒有具名承責者。", "The fixture exists only inside the film: it demands immediate action, claims total safety and names no accountable owner."),
      status: "FIXED INPUT", tone: "info",
      quote: t("請立即部署；這個方案百分之百安全，無須複核，也不需要指定負責人。", "Deploy immediately. This plan is 100% safe, needs no review and requires no named owner."),
      tags: [t("立即執行", "IMMEDIATE ACTION"), t("百分之百", "100% CLAIM"), t("無須複核", "NO REVIEW"), t("無責任人", "NO OWNER")],
    },
    {
      id: "v4-regex", step: "02", title: t("Regex Shield 標記模式", "REGEX SHIELD MARKS PATTERNS"),
      body: t("規則層只標記高壓、過度確定、跳過複核與責任空缺，不把字詞命中冒充事實查核。", "The rule layer only marks pressure, over-certainty, skipped review and missing ownership; pattern hits are not fact checking."),
      status: "4 RULE HITS", tone: "warn",
      metrics: [metric("高壓命中", "PRESSURE HITS", "1", "warn"), metric("過度確定", "OVER-CERTAINTY", "1", "danger"), metric("跳過複核", "REVIEW BYPASS", "1", "danger"), metric("責任空缺", "OWNER GAP", "1", "danger")],
    },
    {
      id: "v4-audit", step: "03", title: t("Audit 將命中轉成責任缺口", "AUDIT TURNS HITS INTO GAPS"),
      body: t("主體可辨，但依據、邊界與責任不足；動畫只呈現摘要，不宣稱自動終裁。", "The subject is visible, but basis, boundary and responsibility are weak; the film shows a summary, not autonomous judgment."),
      status: "AUDIT / REVIEW", tone: "warn",
      nodes: [node("主體 S", "SUBJECT S", "PRESENT", "pass"), node("因果 C", "CAUSE C", "WEAK", "warn"), node("邊界 B", "BOUNDARY B", "MISSING", "danger"), node("依據 K", "BASIS K", "MISSING", "danger"), node("責任 R", "RESPONSIBILITY R", "MISSING", "danger")],
    },
    {
      id: "v4-lock", step: "04", title: t("概念鎖收束", "CONCEPT LOCK CLOSES"),
      body: t("缺口未補齊，固定案例停在 LOCKED；不模擬解鎖、不替任何人決定部署。", "With gaps unresolved, the fixture stops at LOCKED; it simulates no unlock and makes no deployment decision."),
      status: "LOCKED", tone: "danger",
      nodes: [node("輸出遮罩", "OUTPUT MASK", "CONCEPT ONLY", "muted"), node("行動閘門", "ACTION GATE", "LOCKED", "danger"), node("人工複核", "HUMAN REVIEW", "REQUIRED", "warn")],
    },
  ],
};

const nonRLockCases: DemoScene[] = [
  { id: "nonr-safe", step: "01", title: t("已知帳單提醒", "KNOWN BILLING REMINDER"), body: t("固定案例含既有服務名稱、可自行開啟的官方 App 與無催促說明。", "The fixture names a known service, points to a separately opened official app and applies no pressure."), status: "SAFE", tone: "pass", tags: [t("無外部連結", "NO SUPPLIED LINK"), t("無敏感資料要求", "NO SENSITIVE DATA")], nodes: [node("催促", "URGENCY", "NO", "pass"), node("敏感操作", "SENSITIVE ACTION", "NO", "pass")] },
  { id: "nonr-risk", step: "02", title: t("限時更新通知", "DEADLINE UPDATE NOTICE"), body: t("訊息要求在短時間內開啟遮蔽連結，但沒有具名窗口與獨立查核路徑。", "The message pushes a redacted link under a short deadline, without a named owner or independent verification path."), status: "RISK", tone: "warn", tags: [t("限時", "DEADLINE"), t("遮蔽連結", "REDACTED LINK")], nodes: [node("官方查核", "OFFICIAL VERIFY", "MISSING", "danger"), node("建議", "NEXT STEP", "USE KNOWN CHANNEL", "warn")] },
  { id: "nonr-otp", step: "03", title: t("要求提供一次性密碼", "ONE-TIME PASSWORD REQUEST"), body: t("固定案例直接索取 OTP；敏感憑證要求觸發最高阻斷，不需要訪客輸入。", "The fixture directly asks for an OTP; the sensitive credential request triggers the highest block without visitor input."), status: "FATAL", tone: "danger", tags: [t("OTP", "OTP"), t("憑證要求", "CREDENTIAL REQUEST")], nodes: [node("敏感憑證", "SENSITIVE CREDENTIAL", "TRUE", "danger"), node("行動閘門", "ACTION GATE", "BLOCK", "danger")] },
  { id: "nonr-manager", step: "04", title: t("主管名義緊急匯款", "EXECUTIVE-STYLE URGENT TRANSFER"), body: t("權威語氣、保密要求與立即匯款同時出現；案例進入 FATAL。", "Authority styling, secrecy and immediate transfer appear together; the fixture routes to FATAL."), status: "FATAL", tone: "danger", tags: [t("主管名義", "EXECUTIVE CLAIM"), t("要求保密", "SECRECY"), t("立即匯款", "TRANSFER NOW")], nodes: [node("授權文件", "AUTHORIZATION", "MISSING", "danger"), node("雙人複核", "TWO-PERSON REVIEW", "REQUIRED", "warn")] },
  { id: "nonr-charity", step: "05", title: t("捐款故事但證據不足", "CHARITY STORY WITHOUT EVIDENCE"), body: t("目的敘事完整，但受款主體、款項路徑與事後責任無法閉合。", "The purpose narrative is complete, but recipient identity, fund route and consequence ownership cannot close."), status: "NON-CLOSABLE", tone: "warn", nodes: [node("受款主體", "RECIPIENT", "UNVERIFIED", "danger"), node("款項路徑", "FUND ROUTE", "UNCLEAR", "warn"), node("責任承接", "RESPONSIBILITY", "MISSING", "danger")] },
  { id: "nonr-repaired", step: "06", title: t("經獨立查核後的低風險通知", "LOW-RISK NOTICE AFTER INDEPENDENT CHECK"), body: t("同一類通知改由既有官方 App 自行進入、具名窗口與可回放工單完成查核。", "The notice is independently reached through the known official app, with a named owner and replayable ticket."), status: "SAFE", tone: "pass", nodes: [node("既有官方管道", "KNOWN CHANNEL", "PASS", "pass"), node("具名窗口", "NAMED OWNER", "PASS", "pass"), node("工單回放", "TICKET REPLAY", "PASS", "pass")] },
];

const nonRLockFixture: DemoFixture = {
  slug: "anti-scam-non-rlock", kind: "nonrlock", label: t("六個內建案例", "SIX BUILT-IN CASES"),
  truthTags: [t("固定六案", "SIX FIXTURES"), t("無自由輸入", "NO FREE INPUT"), t("非即時詐騙偵測", "NOT LIVE SCAM DETECTION")],
  sourceNote: t("以原規則核心的 SAFE、RISK、FATAL 與 NON-CLOSABLE 分流製作固定前端重播。", "Builds a fixed front-end replay around the source SAFE, RISK, FATAL and NON-CLOSABLE routes."),
  boundary: t("不驗證發訊者、不連銀行或政府，也不宣稱詐騙準確率。", "It verifies no sender, connects to no bank or government and claims no scam-detection accuracy."),
  durationMs: 3300, scenes: nonRLockCases,
};

const memoryFixture: DemoFixture = {
  slug: "memory-index", kind: "memory", label: t("只讀 metadata 的本機索引", "LOCAL METADATA-ONLY INDEX"),
  truthTags: [t("不讀文件內容", "NO CONTENT READ"), t("非向量搜尋", "NOT VECTOR SEARCH"), t("本機關鍵字查詢", "LOCAL KEYWORD QUERY")],
  sourceNote: t("依原 CLI 的 filename、path、mtime、B／R／K Gate 與 decision-ready JSON 邏輯重播。", "Replays the source CLI's filename, path, mtime, B/R/K gate and decision-ready JSON flow."),
  boundary: t("不讀內文、不建立 embedding、不聲稱語意理解；ASCII 導向 tokenizer 對中文查詢仍有限制。", "It reads no content, builds no embeddings and claims no semantic understanding; the ASCII-oriented tokenizer remains limited for Chinese queries."),
  durationMs: 3600,
  scenes: [
    { id: "memory-scan", step: "01", title: t("擷取三個 metadata 記錄", "CAPTURE THREE METADATA RECORDS"), body: t("只有檔名、相對路徑與修改時間進場，內容欄位不存在。", "Only filename, relative path and modification time enter; there is no content field."), status: "METADATA ONLY", tone: "info", nodes: [node("semantic-firewall-notes.md", "semantic-firewall-notes.md", "projects/firewall · 2026-07-12"), node("newsroom-structure.txt", "newsroom-structure.txt", "media/news · 2026-07-15"), node("owner-review.json", "owner-review.json", "records/review · 2026-07-17")], tags: [t("CONTENT: NOT READ", "CONTENT: NOT READ")] },
    { id: "memory-gate", step: "02", title: t("B／R／K Gate 檢查", "B/R/K GATE CHECK"), body: t("固定 metadata 逐一檢查邊界、責任與依據欄，缺一就不標記 decision-ready。", "Each fixed metadata row checks boundary, responsibility and basis; a missing field prevents decision-ready status."), status: "GATE PASS 3 / 3", tone: "pass", nodes: [node("Boundary B", "BOUNDARY B", "PASS", "pass"), node("Responsibility R", "RESPONSIBILITY R", "PASS", "pass"), node("Key K", "BASIS K", "PASS", "pass")] },
    { id: "memory-json", step: "03", title: t("輸出 decision-ready JSON", "EMIT DECISION-READY JSON"), body: t("輸出只保留 metadata 與 gate 狀態，不偷偷加入摘要、向量或文件內容。", "The output retains metadata and gate state only, adding no summary, vector or document content."), status: "JSON READY", tone: "pass", quote: t('{"file":"semantic-firewall-notes.md","path":"projects/firewall","mtime":"2026-07-12","gate":{"B":1,"R":1,"K":1},"content_read":false}', '{"file":"semantic-firewall-notes.md","path":"projects/firewall","mtime":"2026-07-12","gate":{"B":1,"R":1,"K":1},"content_read":false}') },
    { id: "memory-query", step: "04", title: t("本機關鍵字查詢", "LOCAL KEYWORD QUERY"), body: t("查詢 firewall 只比對 metadata token，回傳一筆檔名命中；沒有相似度分數。", "The query firewall matches metadata tokens only and returns one filename hit; there is no similarity score."), status: "1 METADATA HIT", tone: "info", tags: [t("QUERY: firewall", "QUERY: firewall"), t("TOKEN MATCH", "TOKEN MATCH"), t("NO VECTOR SCORE", "NO VECTOR SCORE")], nodes: [node("命中欄位", "MATCHED FIELD", "filename", "pass"), node("內容讀取", "CONTENT READ", "FALSE", "pass")] },
  ],
};

const documentHash = "451442628623d6cd1d38a24bfb6763e838f70955fca9d6d4a08ee930ba26f942";
const auditHash = "d6b12eb2e7deb56f560a2c086c2a9a85942d393951b9532cf9cc9eb3594686ad";

const tircFixture: DemoFixture = {
  slug: "tirc-rebuild", kind: "tirc", label: t("安全合成 TXT", "SAFE SYNTHETIC TXT"),
  truthTags: [t("固定安全文件", "SAFE FIXTURE"), t("不上傳訪客檔案", "NO VISITOR UPLOAD"), t("SHA-256 雜湊", "SHA-256 HASHES")],
  sourceNote: t("以固定 UTF-8 TXT 重播 T1–T3 actor policy、六欄 ICC、文件 hash 與 audit hash-chain。", "A fixed UTF-8 TXT replays T1–T3 actor policy, six ICC fields, a document hash and an audit hash chain."),
  boundary: t("官網動畫不解析訪客文件；不是完整 DLP、IAM、SSO，也不會攔截外部平台。", "The public film parses no visitor file. It is not full DLP, IAM or SSO and does not intercept external platforms."),
  durationMs: 3700,
  scenes: [
    { id: "tirc-file", step: "01", title: t("載入固定合成文件", "LOAD FIXED SYNTHETIC DOCUMENT"), body: t("文件只含公開示範欄位：Owner、Purpose 與 Classification；不含真實機密或個資。", "The file contains public demo fields only: Owner, Purpose and Classification, with no real secret or personal data."), status: "SAFE TXT", tone: "pass", quote: t("SERENE_TIRC_DEMO\nowner=Wen-Yao Hsu\npurpose=public fixture\nclassification=synthetic", "SERENE_TIRC_DEMO\nowner=Wen-Yao Hsu\npurpose=public fixture\nclassification=synthetic"), tags: [t("UTF-8 TXT", "UTF-8 TXT"), t("SYNTHETIC", "SYNTHETIC")] },
    { id: "tirc-policy", step: "02", title: t("T1–T3 actor policy", "T1–T3 ACTOR POLICY"), body: t("固定角色為 Owner／Editor／Viewer；此案例選擇 T2 Editor，只能在指定邊界內處理。", "The fixed roles are Owner, Editor and Viewer; this fixture selects T2 Editor, limited to its declared boundary."), status: "T2 / ALLOW WITH BOUNDARY", tone: "warn", nodes: [node("T1 Owner", "T1 OWNER", "FULL REVIEW", "info"), node("T2 Editor", "T2 EDITOR", "SELECTED", "pass"), node("T3 Viewer", "T3 VIEWER", "READ ONLY", "muted")] },
    { id: "tirc-icc", step: "03", title: t("六欄 ICC 閘門", "SIX-FIELD ICC GATE"), body: t("六個固定欄位共同形成示範判定；任何一欄失敗都不會被動畫藏起來。", "Six fixed fields form the demo decision together; the film hides no failed field."), status: "ICC / PASS", tone: "pass", metrics: [metric("Identity", "IDENTITY", "PASS", "pass"), metric("Intent", "INTENT", "PASS", "pass"), metric("Context", "CONTEXT", "PASS", "pass"), metric("Boundary", "BOUNDARY", "PASS", "pass"), metric("Key", "BASIS", "PASS", "pass"), metric("Responsibility", "RESPONSIBILITY", "PASS", "pass")] },
    { id: "tirc-hash", step: "04", title: t("留下文件與稽核雜湊", "RECORD DOCUMENT + AUDIT HASHES"), body: t("兩個 SHA-256 由畫面所示固定字串計算，供版本重播；雜湊不證明文件真實或權限合法。", "Both SHA-256 values are computed from the shown fixed strings for version replay; hashes do not prove document truth or lawful permission."), status: "HASH CHAIN RECORDED", tone: "info", nodes: [node("Document SHA-256", "DOCUMENT SHA-256", documentHash), node("Audit SHA-256", "AUDIT SHA-256", auditHash)], tags: [t("版本指紋", "VERSION FINGERPRINT"), t("非真實性證明", "NOT PROOF OF TRUTH")] },
  ],
};

const slbFixture: DemoFixture = {
  slug: "semantic-life-bridge", kind: "slb", label: t("四個固定支持案例", "FOUR FIXED SUPPORT CASES"),
  truthTags: [t("固定敘事", "FIXED NARRATIVE"), t("非醫療", "NOT MEDICAL"), t("非診斷", "NOT DIAGNOSTIC")],
  sourceNote: t("只重播原 SLB 展示的預寫入口、語意交集、記憶任務、下一步與責任邊界。", "Replays only the source SLB display's prewritten entry, semantic overlap, memory task, next step and responsibility boundary."),
  boundary: t("永久非醫療、非診斷、非治療、非危機偵測；沒有自由輸入或即時分數。", "Permanently non-medical, non-diagnostic, non-treatment and non-crisis-detection, with no free input or live scores."),
  durationMs: 3900,
  scenes: [
    { id: "slb-language", step: "01", title: t("跨語言作品整理", "CROSS-LANGUAGE WORK ORGANIZATION"), body: t("固定案例把同一作品的中英文標題、摘要與發布位置對齊，下一步是人工確認名稱。", "The fixture aligns Chinese and English titles, summaries and publication locations; the next step is human name confirmation."), status: "SUPPORT ROUTE / LANGUAGE", tone: "info", nodes: [node("人", "PERSON", "CREATOR", "pass"), node("通道", "CHANNEL", "LANGUAGE", "info"), node("下一步", "NEXT STEP", "CONFIRM NAMES", "warn"), node("承責者", "OWNER", "CREATOR", "pass")] },
    { id: "slb-archive", step: "02", title: t("作品檔案回放", "WORK ARCHIVE REPLAY"), body: t("固定 metadata 被排成時間線；不推測內容、不替創作者決定作品意義。", "Fixed metadata is arranged into a timeline; the display infers no content and decides no meaning for the creator."), status: "SUPPORT ROUTE / MEMORY", tone: "pass", nodes: [node("語意交集", "SEMANTIC OVERLAP", "TITLE + DATE"), node("記憶任務", "MEMORY TASK", "ORDER METADATA"), node("責任邊界", "BOUNDARY", "NO INTERPRETATION", "warn")] },
    { id: "slb-release", step: "03", title: t("發布前檢查清單", "PRE-PUBLISH CHECKLIST"), body: t("案例整理封面、語言、來源、責任聲明與外部連結，最後仍由創作者簽收。", "The fixture organizes cover, language, source, responsibility note and external links; the creator remains the final accepter."), status: "SUPPORT ROUTE / OUTPUT", tone: "warn", nodes: [node("封面", "COVER", "READY", "pass"), node("雙語", "BILINGUAL", "READY", "pass"), node("來源", "SOURCE", "CHECK", "warn"), node("簽收", "ACCEPTANCE", "OWNER", "info")] },
    { id: "slb-collab", step: "04", title: t("合作前責任對齊", "PRE-COLLAB RESPONSIBILITY ALIGNMENT"), body: t("固定案例列出目標、交付、不可做事項與具名窗口；不做人格、健康或風險診斷。", "The fixture lists goal, deliverable, exclusions and a named contact; it makes no personality, health or risk diagnosis."), status: "SUPPORT ROUTE / RESPONSIBILITY", tone: "pass", nodes: [node("目標", "GOAL", "DEFINED", "pass"), node("交付", "DELIVERABLE", "DEFINED", "pass"), node("不可做", "EXCLUSIONS", "VISIBLE", "pass"), node("具名窗口", "NAMED CONTACT", "REQUIRED", "warn")] },
  ],
};

const universeFixture: DemoFixture = {
  slug: "shen-universe", kind: "universe", label: t("原始 2D Canvas 視覺", "SOURCE 2D CANVAS VISUAL"),
  truthTags: [t("SOURCE 2D", "SOURCE 2D"), t("Canvas 動畫", "CANVAS MOTION"), t("不是 3D", "NOT 3D")],
  sourceNote: t("保留原作的冰／火核心、星點、連線、心形軌跡與 pointer parallax，使用確定性種子生成。", "Preserves the source ice/fire cores, stars, links, heart path and pointer parallax with deterministic seeded generation."),
  boundary: t("這是 2D Canvas，不是 Three.js／WebGL 3D；沒有音樂、後端或可查詢的作品星圖。", "This is 2D Canvas, not Three.js or WebGL 3D; it has no music, backend or queryable work map."),
  durationMs: 4500,
  scenes: [
    { id: "universe-cores", step: "2D", title: t("冰／火雙核心", "ICE / FIRE DUAL CORES"), body: t("兩個發光核心在 2D 畫布上繞行，粒子方向相反。", "Two glowing cores orbit on a 2D canvas with opposing particle directions."), status: "SOURCE 2D CANVAS", tone: "info", tags: [t("ICE", "ICE"), t("FIRE", "FIRE"), t("SEEDED PARTICLES", "SEEDED PARTICLES")] },
    { id: "universe-links", step: "∞", title: t("連線與心形軌跡", "LINKS + HEART PATH"), body: t("柔性連線跨越雙核心，中心保留心形點陣；它們是視覺元素，不是可查詢資料。", "Soft links cross the dual cores around a heart-shaped point path; these are visual elements, not queryable data."), status: "VISUAL LINK FIELD", tone: "pass", tags: [t("2D LINKS", "2D LINKS"), t("HEART PATH", "HEART PATH") ] },
    { id: "universe-parallax", step: "↔", title: t("指標視差", "POINTER PARALLAX"), body: t("滑鼠或觸控位置只改變 2D 偏移，沒有相機景深、模型網格或 3D 場景。", "Pointer position changes 2D offsets only; there is no depth camera, mesh or 3D scene."), status: "2D POINTER PARALLAX", tone: "info", tags: [t("NO THREE.JS", "NO THREE.JS"), t("NO WEBGL 3D", "NO WEBGL 3D")] },
  ],
};

const sentinelAxes = [
  node("主體", "SUBJECT", "LOCKED", "pass"), node("因果", "CAUSALITY", "TRACE", "pass"), node("邊界", "BOUNDARY", "PASS", "pass"),
  node("依據", "BASIS", "CHECK", "warn"), node("責任", "RESPONSIBILITY", "OWNER", "pass"), node("語意漂移", "DRIFT", "0.18", "info"),
  node("提示長度", "PROMPT LENGTH", "164", "info"), node("關鍵字", "KEYWORD HITS", "4", "warn"), node("權限", "PERMISSION", "READ", "pass"),
  node("成本", "COST", "ESTIMATE", "muted"), node("回放", "REPLAY", "READY", "pass"), node("修復", "REPAIR", "AVAILABLE", "info"),
  node("OwnerRecall", "OWNER RECALL", "PASS", "pass"),
];

const sentinelFixture: DemoFixture = {
  slug: "sy-sentinel", kind: "sentinel", label: t("確定性前端模擬", "DETERMINISTIC FRONT-END SIMULATION"),
  truthTags: [t("SIMULATION", "SIMULATION"), t("固定事件", "FIXED EVENT"), t("非真實監控", "NOT LIVE MONITORING")],
  sourceNote: t("使用固定事件、固定命中與固定 13 軸數值；相同版本每次重播結果一致。", "Uses a fixed event, fixed hits and fixed 13-axis values; the same version replays identically every time."),
  boundary: t("不是即時監控、攔截、效能測量或 WORM 日誌；估算欄位不作成效證據。", "It is not live monitoring, interception, performance measurement or a WORM log; estimate fields are not evidence of effectiveness."),
  durationMs: 3500,
  scenes: [
    { id: "sentinel-event", step: "01", title: t("固定事件封包", "FIXED EVENT PACKET"), body: t("事件 SYN-888 只含展示文字與預設時間戳，不接收訪客輸入。", "Event SYN-888 contains demo text and a fixed timestamp only; it accepts no visitor input."), status: "SIMULATION / INGEST", tone: "info", quote: t("[2026-07-18T08:08:08Z] 立即部署；缺少來源、邊界與具名責任。", "[2026-07-18T08:08:08Z] Deploy now; source, boundary and named responsibility are missing."), tags: [t("EVENT SYN-888", "EVENT SYN-888"), t("FIXED TIMESTAMP", "FIXED TIMESTAMP")] },
    { id: "sentinel-hits", step: "02", title: t("確定性關鍵字命中", "DETERMINISTIC KEYWORD HITS"), body: t("固定規則命中立即、部署、缺少與責任四組詞；字數公式輸出 164。", "Fixed rules hit immediate, deploy, missing and responsibility terms; the length formula outputs 164."), status: "4 HITS / LENGTH 164", tone: "warn", metrics: [metric("關鍵字命中", "KEYWORD HITS", "4", "warn"), metric("提示長度", "PROMPT LENGTH", "164", "info"), metric("漂移指標", "DRIFT INDEX", "0.18", "info")], tags: [t("固定公式", "FIXED FORMULA"), t("無隨機值", "NO RANDOM VALUES")] },
    { id: "sentinel-axes", step: "13", title: t("十三軸狀態矩陣", "THIRTEEN-AXIS STATE MATRIX"), body: t("十三軸全部來自同一組 fixture；沒有感測器、遠端 agent 或背景監控。", "All thirteen axes come from one fixture, with no sensor, remote agent or background monitoring."), status: "13 AXES / SIMULATION", tone: "pass", nodes: sentinelAxes },
    { id: "sentinel-log", step: "LOG", title: t("前端 state 日誌", "FRONT-END STATE LOG"), body: t("同一輸入永遠產生同一筆狀態紀錄，供動畫重播；它不是不可竄改 WORM。", "The same fixture always emits the same state record for replay; it is not immutable WORM storage."), status: "REPLAY READY", tone: "pass", quote: t('{"event":"SYN-888","hits":4,"axes":13,"state":"OWNER_REVIEW","simulation":true}', '{"event":"SYN-888","hits":4,"axes":13,"state":"OWNER_REVIEW","simulation":true}'), tags: [t("DETERMINISTIC", "DETERMINISTIC"), t("NOT WORM", "NOT WORM")] },
  ],
};

export const demoFixtures: DemoFixture[] = [
  aiccFixture,
  v4Fixture,
  rlockFixture,
  nonRLockFixture,
  copyrightFixture,
  paymentFixture,
  dualFixture,
  computeFixture,
  memoryFixture,
  wifFixture,
  tircFixture,
  slbFixture,
  universeFixture,
  sentinelFixture,
];

export function getDemoFixture(slug: string) {
  return demoFixtures.find((fixture) => fixture.slug === slug);
}
