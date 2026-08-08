export type HomeProduct = {
  slug: string;
  index: string;
  title: string;
  en: string;
  kind: string;
  kindZh?: string;
  tone: string;
  description: string;
  descriptionEn: string;
  href: string | null;
  statusZh?: "開發中" | "等待作品連結";
  statusEn?: "IN DEVELOPMENT" | "AWAITING PROJECT LINK";
};

export const products: HomeProduct[] = [
  {
    slug: "scbkr",
    index: "01",
    title: "SCBKR 本地責任鏈模型",
    en: "SCBKR Local Responsibility Chain",
    kind: "FLAGSHIP SYSTEM",
    tone: "cyan",
    description: "在模型生成、行動與記憶入庫之前，先建立可驗證、可撤銷、可回放的責任結構。",
    descriptionEn: "Build a verifiable, revocable and replayable responsibility structure before model generation, action or memory storage.",
    href: "/demo/scbkr",
  },
  {
    slug: "anti-scam",
    index: "02",
    title: "反詐騙語意防火牆",
    en: "Anti-Scam Semantic Firewall",
    kind: "LIVE DEMO",
    tone: "red",
    description: "不是判斷訊息像不像詐騙，而是檢查它是否有資格進入人的決策鏈。",
    descriptionEn: "Instead of guessing whether a message looks fraudulent, audit whether it qualifies to enter a human decision chain.",
    href: "/demo/anti-scam-rlock",
  },
  {
    slug: "tirc",
    index: "03",
    title: "TIRC 文件責任邊界",
    en: "Document Responsibility Gate",
    kind: "DOCUMENT SYSTEM",
    tone: "gold",
    description: "把移交、解釋與最終交付拆成三層權限，讓文件意義不再無主漂移。",
    descriptionEn: "Separate transfer, interpretation and final delivery into three rights so document meaning cannot drift without an owner.",
    href: "/demo/tirc-rebuild",
  },
  {
    slug: "wif",
    index: "04",
    title: "WIF 決策資格審計",
    en: "Decision Eligibility Audit",
    kind: "AUDIT ENGINE",
    tone: "violet",
    description: "將網站、影像與金融輸入編譯為責任鏈，再判定是否具備決策資格。",
    descriptionEn: "Compile web, image and financial inputs into responsibility chains before deciding whether they qualify for action.",
    href: "/demo/wif-eligibility",
  },
  {
    slug: "aicc-os",
    index: "05",
    title: "AICC OS｜AI 能力編譯器",
    en: "AICC OS · AI Capability Compiler",
    kind: "v0.2.CANDIDATE · ENGINEERING CANDIDATE",
    kindZh: "v0.2.CANDIDATE｜工程候選",
    tone: "ice",
    description: "將已知能力編譯為可重用路徑：L1 固化執行、L2 最小差異、L3 邊界推理；超出版本就停在 VERSION GAP。",
    descriptionEn: "Compile known capabilities into reusable L1 execution, L2 minimum-delta updates and L3 bounded reasoning, stopping at VERSION GAP when the current version is exceeded.",
    href: "/demo/aicc-os",
  },
];

export const newsItems = [
  {
    date: "2026.07.15",
    category: "PLATFORM",
    title: "沈耀官方網站進入公司級重構階段",
    en: "Shen-Yao official platform enters a full-scale rebuild",
    excerpt: "主站、產品動畫展示與國際實相新聞台將整合為同一個可搜尋、可查證的公開平台。",
    excerptEn: "The main site, motion product demos and Reality Newsroom are becoming one searchable, verifiable public platform.",
    href: "/news/platform-rebuild",
  },
  {
    date: "2026.03.30",
    category: "GOVERNANCE",
    title: "治理不是讓模型更快回答",
    en: "Governance begins before model action",
    excerpt: "責任鏈必須在生成、行動、記憶入庫與證據重用之前成立。",
    excerptEn: "A responsibility chain must exist before generation, action, memory storage or evidence reuse.",
    href: "/news/governance-before-action",
  },
  {
    date: "2025.11.18",
    category: "MEDIA",
    title: "Semantic Firewall 獲 SecurityBrief Asia 報導",
    en: "Semantic Firewall featured by SecurityBrief Asia",
    excerpt: "Sean Mitchell 於 SecurityBrief Asia 從推論成本、對話安全與部署架構介紹語意防火牆。",
    excerptEn: "Sean Mitchell reports on the Semantic Firewall through inference cost, conversational safety and deployment architecture.",
    href: "https://securitybrief.asia/story/semantic-firewall-promises-ai-cost-savings-safer-chat-models",
  },
];
