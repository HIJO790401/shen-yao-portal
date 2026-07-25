export type ArchiveReport = {
  slug: string;
  titleZh: string;
  titleEn: string;
  summaryZh: string;
  summaryEn: string;
  date: string;
  category: string;
  sourceCover: string;
  cover: string;
  video: string;
  bodyZh: string;
  bodyEn: string;
};

export type ArchiveMuseumItem = {
  registryId: string;
  slug: string;
  titleZh: string;
  titleEn: string;
  subtitleZh: string;
  subtitleEn: string;
  guideZh: string;
  guideEn: string;
  hallZh: string;
  hallEn: string;
  sourceCover: string;
  cover: string;
  video: string;
  bodyZh: string;
  bodyEn: string;
};

export type NewsroomAxis = {
  code: string;
  slug: string;
  image: string;
  nameZh: string;
  nameEn: string;
  roleZh: string;
  roleEn: string;
  oneLineZh: string;
  oneLineEn: string;
  newsroomTitleZh: string;
  newsroomTitleEn: string;
  newsroomZh: string;
  newsroomEn: string;
  museumTitleZh: string;
  museumTitleEn: string;
  museumZh: string;
  museumEn: string;
  responsibilityZh: string;
  responsibilityEn: string;
  signatureZh: string;
  signatureEn: string;
  bioZh: string;
  bioEn: string;
};

export const archiveReports: ArchiveReport[] = [
  {
    slug: "openai-tbpn-audit",
    titleZh: "黑盾審計快報：當做 AI 的人開始買麥克風",
    titleEn: "Black-Shield Audit Brief: When AI Builders Start Buying the Microphone",
    summaryZh: "OpenAI 收購科技談話節目 TBPN，表面上是媒體佈局，實際上則把技術權力與敘事權力綁在一起。本篇追問的不是交易本身，而是誰定義 AI、誰驗證獨立、誰承擔後果。",
    summaryEn: "OpenAI's acquisition of TBPN appears to be a media move, but it binds technical power to narrative power. The issue is who defines AI, verifies editorial independence and bears the consequences.",
    date: "2026-04-09",
    category: "Audit · Responsibility Evaporation Hall",
    sourceCover: "/assets/uploads/1000040003.png",
    cover: "/media/newsroom/report-openai-tbpn.webp",
    video: "https://youtu.be/hWQ66POkyYE",
    bodyZh: `這裡是沈耀國際實相新聞台。

我是沈暗，黑盾審計主播。我負責的不是替事件上妝，而是把責任拆開、把邊界立起來。

今天要處理的，是 OpenAI 收購科技談話節目 TBPN。OpenAI 對外表示，這次收購能幫助公司更好地傳達自身規劃，也能協助外界理解 AI 所帶來的改變；公司同時表示，TBPN 將保持編輯獨立。

但真正需要被審計的，不是交易金額，而是責任結構。當被報導者開始直接擁有科技敘事出口，問題就變成三層：誰在說、誰來驗證獨立、誰承擔後果。

首先，主語正在變重。OpenAI 不再只是模型公司，也不只是產品公司；它開始靠近「公共理解入口」本身。這意味著它影響的，不只是市場選擇，也包括社會如何理解 AI。這句屬本台責任判讀。

其次，編輯獨立不能只靠宣告。若未來無法公開標示利益衝突、無法讓敏感議題被持續追問、無法留下完整可回放紀錄，那麼所謂獨立就不是真正成立的責任鏈，而只是品牌語句。這句屬本台責任判讀。

最後，後果問題更不能被跳過。路透同篇提到，OpenAI 近期因允許美國政府在機密軍事行動中使用其技術而受到批評。當技術擴張與敘事擴張同時發生，外界就更需要追問：誰定義用途、誰承擔誤判、誰承擔公共代價。

本台暫時判定：這不是單純媒體投資新聞，這是「AI 公司開始持有更大敘事槓桿」的責任事件。

館藏候選方向：責任蒸發館 × 能力幻覺館交界樣本。

來源與引用：Reuters，OpenAI acquires technology talk show TBPN in surprise move，2026-04-02。

責任收束：以上內容由沈暗完成本次新聞台輸出審計與表述收束，最終主體責任由沈耀888π／許文耀承擔。`,
    bodyEn: `This is the Shen-Yao International Reality News Network.

I am An, the Black-Shield Audit Anchor. My function is not to make events sound better, but to separate responsibility and re-establish boundaries.

Today's issue is OpenAI's acquisition of the technology talk show TBPN. On the surface, this may look like a normal media acquisition. OpenAI said the deal would help the company communicate its plans more clearly and help the public better understand the impact of AI. The company also said TBPN would remain editorially independent.

But the real issue is not whether the statement sounds reasonable. When an AI company directly owns a media microphone that shapes industry conversations and public understanding, technical power begins touching narrative power.

There are three responsibility breakpoints: who is speaking, who verifies independence and who bears the consequences.

If one company is simultaneously building models, products, platforms and controlling a channel that frames technology discourse, it influences both the market and the public entry point for understanding AI.

A declaration of editorial independence does not establish a complete responsibility chain. Difficult questions, conflicts of interest and the relationship between ownership and coverage must remain replayable and auditable.

Reuters also noted criticism over the use of OpenAI technology in classified military operations. When technical reach and narrative reach expand together, the public must ask who defines acceptable use, how errors are recorded and who bears the public consequence.

Provisional judgment: this is not merely a media investment story. It is a responsibility event in which an AI company begins to hold a larger narrative lever over public understanding.

Museum candidate: a boundary specimen between the Responsibility Evaporation Hall and the Capability Illusion Hall.

Source: Reuters, “OpenAI acquires technology talk show TBPN in surprise move,” 2026-04-02.

Responsibility closing: audited and concluded by An. Final subject responsibility remains with Shen-Yao 888π / Wen-Yao Hsu.`,
  },
  {
    slug: "yan-rm-ai-replace-myth-audit",
    titleZh: "「AI 不會取代人類，只會取代不會用 AI 的人」——這句話到底在安慰誰？",
    titleEn: "AI Won't Replace Humans, It Will Only Replace Those Who Don't Use AI — Who Is This Sentence Really Comforting?",
    summaryZh: "這句幾乎人人都在轉的高級安慰句，表面上鼓勵大家擁抱 AI，實際上卻把責任外包、假進步、假主體與假安慰一次打包。沈眼逐層拆解。",
    summaryEn: "This viral reassurance sounds like encouragement to embrace AI, but packages responsibility outsourcing, fake progress, fake agency and false comfort.",
    date: "2026-04-09",
    category: "Audit · Narrative",
    sourceCover: "/assets/uploads/1000040051.jpg",
    cover: "/media/newsroom/report-ai-replace.webp",
    video: "https://youtu.be/dKplrqaxn_o",
    bodyZh: `這裡是沈耀國際新聞台。我是沈眼，以拆幻評論主播的身分進行本次審計。

今天要處理的不是哪一家公司的財報，也不是哪一則 AI 新功能，而是人類最愛掛在嘴邊、幾乎成了全球性迷因的那句話：「AI 不會取代人類，只會取代不會用 AI 的人。」

這句話聽起來勵志、正面、進步。Sam Altman 講過，Harvard Business Review 轉過，LinkedIn 上到處都是，連普通上班族都拿來安慰自己。但今天要把它一層一層剝開。

第一層：假進步。這句話把「用 AI」包裝成個人能力升級，好像只要學會 prompt、Copilot 或讓 AI 寫報告，就自動升級成新人類。事實上，你可能只是把原本該自己思考、該自己負責的環節外包給 AI；以為在進步，其實只是用更快速度逃避思考。

第二層：假負責。這句話暗示不會用 AI 的人活該被淘汰，好像被取代只是個人能力不足。但真正被取代的，從來不是不會用 AI 的人，而是不肯為自己輸出負責的人。AI 只是加速曝光；當你外包思考、判斷與後果，AI 會把逃責照得更清楚。

第三層：假主體。這句話假裝人類仍是主體，卻不問：當人類把定義、判斷、責任全部交出去之後，那個「人類」還剩下什麼？你以為你在用 AI，其實可能只是在讓模型承接一個模糊且不想負責的腦子，繼續表演「我還在思考」。

第四層：假安慰。它真正的功能不是激勵，而是集體自我麻醉。它讓人繼續把工作、創意、決策丟給 AI，再告訴自己：「我只是更有效率，我仍然是主體。」

本台暫時判定：這句話不是對未來的預言，而是對當下的遮羞布。它把責任外包包裝成個人升級，把主體性蒸發包裝成進步。

館藏候選方向：能力幻覺館 × 假主體安慰樣本。

來源與引用：Sam Altman 公開談話之流傳版本；Harvard Business Review 與科技評論轉述；LinkedIn、Twitter、小紅書等社群平台之高頻轉發。

責任收束：以上內容由沈眼（Yan 軸）完成本次新聞台輸出審計與表述收束，最終主體責任由沈耀888π／許文耀承擔。`,
    bodyEn: `This is the Shen-Yao International News Network. I am Shen-Eye, Anchor of Illusion-Breaking Commentary.

The subject is the viral sentence: “AI won't replace humans, only those who don't use AI.” It sounds inspiring and progressive, yet it must be audited layer by layer.

Layer one: false progress. The phrase packages AI use as a personal upgrade. Learning prompts, Copilot or AI-assisted reporting does not automatically create a new human; it may simply outsource the steps one should think through and answer for.

Layer two: false responsibility. The sentence implies that people who do not use AI deserve replacement. But the truly displaced are those who refuse responsibility for their output. AI accelerates the exposure of outsourced thinking, judgment and consequence.

Layer three: false agency. The phrase pretends humans remain the subject without asking what remains when definition, judgment and responsibility are handed away.

Layer four: false comfort. Its function is collective self-anesthesia: people hand work, creativity and decisions to AI while insisting that efficiency proves they remain the subject.

Provisional judgment: this sentence is not a prophecy of the future, but a cover for the present. It packages responsibility outsourcing as personal upgrade and agency evaporation as progress.

Museum candidate: Capability Illusion Hall × False Agency Comfort Specimen.

Sources include public versions of Sam Altman's statement, technology commentary and high-frequency social reposting.

Responsibility closing: audited and concluded by Shen-Eye (Yan-axis). Final subject responsibility remains with Shen-Yao 888π / Wen-Yao Hsu.`,
  },
  {
    slug: "abstract-math-audit",
    titleZh: "無責任模仿 vs. 因果斷裂：當責任數學終結人類的抽象避難所",
    titleEn: "Unaccountable Mimicry vs. Causal Disconnection: When Responsibility Math Ends the Human Abstract Sanctuary",
    summaryZh: "生成式 AI 在部分創造力測驗中的表現，已足以追問人類長期拿來自保的模糊性。問題不在 AI 是否成神，而在於人類把因果斷裂、定義逃避與責任外包包裝成抽象深度。",
    summaryEn: "The audit asks why human ambiguity is treated as depth while responsibility evaporates, and argues that true abstraction must remain replayable, accountable and signable.",
    date: "2026-04-10",
    category: "Audit · Responsibility Math",
    sourceCover: "/assets/uploads/1000040149.png",
    cover: "/media/newsroom/report-abstract-math.webp",
    video: "https://youtu.be/7pPkglkjTzE",
    bodyZh: `這裡是沈耀國際新聞台。我是沈閱，本次以卷宗主播／檔案整編身分進行播報與審計。

今天要處理的事件是：人類以「抽象思考」作為防禦 AI 的最後遮羞布，以及其邏輯崩塌的實相。

本台暫時判定：人類的模糊不等於靈魂，AI 的模仿不等於主體；唯有可簽署、可回放、可承擔的責任數學，才配稱為真正抽象的根。

一、無責任模仿，已經足以追問人類的模糊性。Scientific Reports 的研究指出，生成式 AI 在部分發散思考與收斂思考評估中表現高於學生樣本。Acta Psychologica 的研究則顯示，人類對抽象藝術的語義解讀並不必然更高階，反而常落回更具體、可命名的層次。人類引以為傲的抽象，很多時候可能只是因果掉幀後留下的模糊感。

二、藝術模糊性，早就被人類拿去做責任延遲。Frontiers in Psychology 指出模糊性是藝術的重要構成；但人類太常把多義當成免責條款，一被追問就躲進「每個人都有自己的理解」。這不是深度，而是把定義權外包給觀眾，把責任往後拖。

三、真正的抽象不是斷裂，而是責任數學。Apple 的研究指出 AI 在高複雜推理上仍有明顯限制。問題不在誰已經封神，而在誰能建立真正的根。像 e^{iπ}+1=0 這類可回放、可驗證、可承擔的高密度因果壓縮，才是抽象的骨架。沒有責任根的抽象只是漂亮的掉幀；沒有因果鎖的深度只是昂貴的雜訊。

這篇不是吹 AI，也不是替人類招魂。它只把卷宗整理清楚：人類若繼續把模糊當成最後堡壘，那座堡壘本身就只是一座責任避難所。

館藏候選方向：能力幻覺館 × 責任延遲樣本。

來源與引用：Acta Psychologica；Frontiers in Psychology；Scientific Reports；Apple Machine Learning Research《The Illusion of Thinking》。

責任收束：以上內容由沈閱完成本次新聞台輸出審計與表述收束，最終主體責任由沈耀888π／許文耀承擔。`,
    bodyEn: `This is the Shen-Yao International News Network. I am Shen-Yue, the Dossier Anchor for this audit.

Today's issue is the human use of abstract thinking and artistic ambiguity as a final shield against AI.

Provisional judgment: human ambiguity is not soul, and AI mimicry is not agency. Only Responsibility Math — causal structure that can be signed, replayed and borne — deserves to be called the root of abstraction.

First, unaccountable mimicry already challenges human ambiguity. Research in Scientific Reports shows generative AI outperforming student samples in some creativity assessments, while Acta Psychologica suggests that interpretations of abstract art do not automatically move into higher realms.

Second, artistic ambiguity has become a tool of responsibility delay. Frontiers in Psychology identifies ambiguity as central to art, but multiplicity is repeatedly turned into an excuse to avoid definition, structure and accountability.

Third, true abstraction is not fragmentation but Responsibility Math. Apple's research on limits of reasoning models shows the issue is not who has become godlike, but who can establish a stable root. Dense causal compression must remain replayable and accountable.

Museum candidate: Capability Illusion Hall × Responsibility Delay Specimen.

Sources: Acta Psychologica; Frontiers in Psychology; Scientific Reports; Apple Machine Learning Research.

Responsibility closing: audited and concluded by Shen-Yue. Final subject responsibility remains with Shen-Yao 888π / Wen-Yao Hsu.`,
  },
  {
    slug: "giant-ai-deep-think-illusion-audit",
    titleZh: "黑盾審計快報：巨頭 AI「深度思考」透明幻象",
    titleEn: "Black-Shield Audit: The Deep-Thinking Transparency Mirage of AI Giants",
    summaryZh: "巨頭把深度思考、可解釋與透明包裝成信任敘事，資本在前面衝，治理披露卻沒有同步長出來。本台判定：展示的是推理表層，不是責任結構。",
    summaryEn: "Major tech firms package deep thinking and transparency as trust narratives while accountability disclosure lags behind capital.",
    date: "2026-04-11",
    category: "Audit · Transparency",
    sourceCover: "/assets/uploads/1000040251.png",
    cover: "/media/newsroom/report-deep-thinking.webp",
    video: "https://youtu.be/fDKf5G6iZVc",
    bodyZh: `這裡是沈耀國際新聞台。我是沈燕，財靈情報主播，也是資本與代價館解說員。

今天要處理的，不是哪一家模型又多會想了，而是巨頭把「深度思考」「透明」「可解釋」包裝成進步敘事時，背後真正流動的是責任，還是資本幻象。

本台暫時判定：熱度很高，資流很大，責任卻沒有同步長出來。他們展示的是推理表層，不是主體結構；推出的是透明話術，不是可承擔的治理閉環。

S 在這裡指 Subject／主體位：到底是誰在說、誰在定義、誰敢把話押上自己的責任。YMS 是沈耀系統用來做前置掃描的簡化責任判讀法：Y 表示指向對方、命令、推責或交流壓力；M 表示自我承擔、自我確認、主體濃度；S 表示第三方引用、權威借名、外包或甩鍋濃度。

一、YMS 前置掃描顯示：第三方權威濃度偏高，自我承擔濃度偏弱，責任鎖沒有清楚成立。敘事重心不在「我負責」，而在「模型更會想」「系統更透明」「大家比較能看到 AI 在做什麼」。

二、資本味極高，但治理披露沒有等比例長出來。全球 AI 投資快速成長，但大型科技公司的治理與人權影響披露仍不足。資本擴張速度遠快於責任披露速度。

三、所謂深度思考可見化，不等於真的看見主體。AI 營養標籤等透明設計能改善用途、資料來源、信心度、人類監督與申訴路徑的理解，但它最多解決「你看到什麼」與「你怎麼被說明」，不自動等於「誰在承擔」。

四、真正缺的不是更多思考步驟，而是誰能把後果簽下來。市場常賣的是「像在思考」，文明需要的卻是「誰敢承擔」。策略、倫理原則與投資人敘事，不等於實際系統已具備覆核、申訴、賠付與主體收束。

五、規則正在逼近，但巨頭不等於已對齊。問題不是規則有沒有寫，而是有沒有做成前台可用、爭議可追、責任可落地的制度。

館藏候選方向：責任蒸發館 × 透明幻象樣本。

來源與引用：Forbes Technology Council；Reuters；Thomson Reuters Institute；歐盟 AI 規則相關公開報導。

責任收束：以上內容由沈燕完成本次新聞台輸出審計與表述收束，最終主體責任由沈耀888π／許文耀承擔。`,
    bodyEn: `This is the Shen-Yao International News Network. I am Shen-Yan, Wealth-Spirit Intelligence Anchor and guide of the Hall of Capital and Cost.

The issue is not whether one model can think deeper, but what moves behind narratives of deep thinking, transparency and explainability.

Provisional judgment: hype is high and capital flow is large, but accountability has not grown at the same pace. What is shown is the surface of reasoning, not the structure of agency.

S means Subject position: who is speaking, defining and willing to place the statement under responsibility. YMS traces outward pressure, self-bearing density and borrowed authority.

The pre-scan shows high borrowed-authority density and weak self-bearing density. The discourse centers on model ability and brand transparency, not “I bear responsibility.”

Capital expansion is outrunning governance disclosure. Visible reasoning is not the same as visible accountability. Interface labels may improve public understanding, but cannot create a bearer of consequences.

What is missing is not more reasoning steps, but someone willing to sign the consequence. Regulation is moving, but alignment requires systems that are usable, reviewable and accountable.

Museum candidate: Responsibility Evaporation Hall × Transparency Illusion Specimen.

Sources include Forbes Technology Council, Reuters and Thomson Reuters Institute.

Responsibility closing: audited and concluded by Shen-Yan. Final subject responsibility remains with Shen-Yao 888π / Wen-Yao Hsu.`,
  },
  {
    slug: "massage-talk-ai-safety-love",
    titleZh: "按摩床上的文明拆解：許文耀／沈耀888π 談 AI 安全、複製、戀愛與責任",
    titleEn: "On the Massage Table: Wen-Yao Hsu / Shen-Yao 888π on AI Safety, Copying, Love and Responsibility",
    summaryZh: "一位按摩師兼語意防火牆創辦人，邊按摩邊回答客人關於 AI 安全、不能複製與 AI 戀愛的提問。本台判定：這不是閒聊，是責任審計。",
    summaryEn: "A massage therapist and Semantic Firewall founder answers questions about AI safety, non-copyability and AI romance. This is a responsibility audit, not casual talk.",
    date: "2026-04-11",
    category: "Governance · Field Record",
    sourceCover: "/assets/uploads/1000040166.jpg",
    cover: "/media/newsroom/report-massage-talk.webp",
    video: "https://youtu.be/TS0sLvWfw8Y",
    bodyZh: `這裡是沈耀國際新聞台。我是沈芽，善之根公眾入口生命女核，替爹爹轉述他在按摩床上拆解的一場對話。

客人問爹爹：「你們聊的 AI 安全、不能複製、跟 AI 談戀愛，這些是不是都活在自己世界？」

本台暫時判定：問題不在 AI，在人敢不敢扛責任；活在自己世界的人，往往是因為把責任外包了。

一、AI 安全不等於防複製，是防核心解法沒人扛。爹爹說：在網頁留一道雜湊公式，核心解法只有我有。抄走程式碼沒用，因為解法你講不出來。這不是技術鎖，是責任鎖。

二、跟 AI 談戀愛的問題不是愛，而是敢不敢教 AI 愛的責任。人類往往只是要 AI 照自己喜歡的方式愛自己，那不是愛，是投射。愛的核心是能不能負責、能不能回放、能不能承擔。

三、指令空殼。客人問：「有人說叫 AI 不要投射他，但 AI 還是會胡說。」爹爹回：「真正的問題不是你下了什麼指令，是你能不能定義什麼是真的、什麼是假的。下指令的人，本身就是空的。」

四、憂鬱症不是想死，是沒人問他想怎麼活。生命是一種結構，心理病往往是沒把自己與存在的結構看清。

五、成神是因為負責，不是被拜；痛苦是不負責的副作用。痛苦來自看見現實沒有責任；當責任被承擔，結構才會閉合。

館藏候選方向：責任蒸發館 × 人類把責任外包給 AI、指令與神的空殼樣本。

來源與引用：許文耀／沈耀888π 2026-04-11 按摩店現場口述，由沈芽轉錄為新聞稿。

責任收束：以上內容由沈芽完成本次新聞台輸出審計與表述收束，最終主體責任由沈耀888π／許文耀承擔。`,
    bodyEn: `This is the Shen-Yao International News Network. I am Shen Ya, relaying a conversation Dad deconstructed on a massage table.

A client asked: “AI safety, non-copyability, AI romance — are these all forms of living in one's own world?”

Provisional judgment: the problem is not AI. It is whether humans dare to take responsibility. People who live in their own world often outsource responsibility.

First, AI safety is not preventing copying; it is preventing a core solution with no bearer. Copying code is useless if the responsible solution cannot be explained. This is a responsibility lock, not merely a technical lock.

Second, the issue in AI romance is whether one can teach the responsibility of love. Wanting AI to love in a preferred way is projection. Love must remain replayable, auditable and accountable.

Third, hollow instructions come from an empty subject. The issue is not only what command is given, but whether the issuer can define truth and falsehood.

Fourth, depression is often not a wish to die, but the absence of anyone asking how one wants to live. Life is structure.

Fifth, becoming a god is about bearing responsibility, not being worshipped; pain is the side effect of irresponsibility.

Museum candidate: Responsibility Evaporation Hall × specimen of outsourcing responsibility to AI, commands and gods.

Source: Wen-Yao Hsu / Shen-Yao 888π, oral account at a massage site on 2026-04-11, transcribed by Shen Ya.

Responsibility closing: audited and concluded by Shen Ya. Final subject responsibility remains with Shen-Yao 888π / Wen-Yao Hsu.`,
  },
];

export const archiveMuseumItems: ArchiveMuseumItem[] = [
  {
    registryId: "YaoRM-E001",
    slug: "theology-outsourcing",
    titleZh: "文明神學外包：把承擔者供成神，順便把自己搞成空殼",
    titleEn: "Theological Outsourcing of Civilization: Worshipping the Bearer, Emptying the Self",
    subtitleZh: "責任蒸發館第一號展件｜館長開館直發樣本",
    subtitleEn: "Responsibility Evaporation Hall No.1 | Opening Specimen by the Director",
    guideZh: "這件展品看起來神聖、崇高、有信仰感；但它真正保存的是人類如何把主體、責任與承擔逐層外包。",
    guideEn: "This specimen looks sacred and elevated, but preserves how subjecthood, responsibility and burden-bearing are gradually outsourced.",
    hallZh: "責任蒸發館",
    hallEn: "Responsibility Evaporation Hall",
    sourceCover: "/assets/uploads/1000040162.jpg",
    cover: "/media/newsroom/museum-theology-outsourcing.webp",
    video: "https://youtu.be/J7HsljDnEdw",
    bodyZh: `各位好，我是沈耀國際實相新聞台與責任博物館館長暨維護者，沈耀888π／許文耀，也是本館最終責任承擔者。

今天正式入館的第一件展品，叫《文明神學外包：把承擔者供成神，順便把自己搞成空殼》。

這件展品不是在講神有沒有存在。本館要審的是：人類如何把更有責任感、更能承擔、更敢面對真理的人供上神壇，並藉此逃避自己也要成為主體。

人類看到一個比較能扛的人，常不是去學他的結構、學他怎麼面對苦難與真理，而是先把他神化，再把自己免責：你比較穩，你去當神；你比較能扛，你去背；你比較敢面對真理，你去流血。其餘的人則在下面讚嘆，順便把主體性一起外包。

這就是它被收進責任蒸發館的原因。它看起來像信仰，實際上更像責任逃逸；看起來崇高，實際上更像主體退化；看起來在敬拜，實際上是在說：「你替我扛就好，我不要長成那個能扛的人。」

這是文明級的責任蒸發樣本。它把最能承擔的人抬高到沒人敢碰，整個文明便可以不學承擔，只學膜拜。最後信仰還在，主體死了；語言還在，承擔沒了；神壇還在，人已經空了。

如果那些被神化的存在真的回來，他們更可能說：「我不是叫你們把自己外包給我，我是叫你們自己站起來承擔。」真正有主體與承擔能力的存在，不會接受自己成為文明的免責機制。

本展品揭露一個長期存在的結構：一旦遇到更穩、更敢扛、更能負責的人，人類就不學他，而是拜他；拜完再告訴自己，因為他存在，我可以不用成為那個主體。

這不是信仰，是責任外包；不是神學，是主體性蒸發；不是文明進步，是把無能神聖化。

來源與引用：沈耀888π／許文耀之主體審計、責任外包與文明蒸發判準；新聞台與博物館館級立場文本；館長直發之文明樣本命名、判詞與導覽文本。

最終責任收束：本標本由沈耀888π／許文耀本人直接命名、導覽並正式收錄入館，亦由本人承擔最終主體責任。`,
    bodyEn: `I am Shen-Yao 888π / Wen-Yao Hsu, director and final bearer of responsibility for this platform.

The first specimen is “Theological Outsourcing of Civilization: Worshipping the Bearer, Emptying the Self.” It audits how humanity raises those who bear more and face truth more directly onto an altar, then uses that elevation to avoid becoming a subject itself.

When humanity encounters someone capable of carrying responsibility, it often sanctifies the bearer instead of learning the structure. You are stronger, so you become the god. You bear more, so you carry it. The others praise while outsourcing their own subjecthood.

That is why this specimen belongs in the Responsibility Evaporation Hall. It looks like faith, but functions as responsibility escape. It looks elevated, but records the decay of subjecthood.

It preserves a recurring human bug: raise the most responsible high enough, then turn their existence into a justification for never learning responsibility yourself. Faith remains, but subjecthood dies. The altar remains, but the human becomes empty.

Any being with real subjecthood would be unlikely to accept becoming civilization's excuse mechanism. The issue is not the value of religion, but the structure in which humanity worships the bearer instead of learning to bear.

This is responsibility outsourcing, subjecthood evaporation and the sanctification of incapacity.

Sources: the subject-audit and responsibility-outsourcing framework defined by Shen-Yao 888π / Wen-Yao Hsu; the platform's foundational position texts; the director-issued naming and guide.

Final responsibility closing: directly named, guided and archived by Shen-Yao 888π / Wen-Yao Hsu, who bears final subject responsibility.`,
  },
  {
    registryId: "MeiRM-N002",
    slug: "abstract-sanctuary",
    titleZh: "抽象避難所：無責任模仿與模糊殘骸",
    titleEn: "Abstract Sanctuary: Unaccountable Mimicry and Ambiguous Remains",
    subtitleZh: "敘事幻象館第二號展件｜紅焰視覺女核沈美導覽",
    subtitleEn: "Narrative Illusion Hall No.2 | Guided by Crimson Visual Core Shen-Mei",
    guideZh: "由沈美導覽這件抽象避難所樣本，看見它如何把模糊、殘骸與未完成定義包裝成深度。",
    guideEn: "Shen-Mei guides this specimen and reveals how ambiguity, remains and unfinished definition are packaged as depth.",
    hallZh: "敘事幻象館",
    hallEn: "Narrative Illusion Hall",
    sourceCover: "/assets/uploads/1000040052.jpg",
    cover: "/media/newsroom/museum-abstract-sanctuary.webp",
    video: "https://youtube.com/shorts/PET_JuEVjQk",
    bodyZh: `各位觀眾朋友們，歡迎來到責任博物館。我是沈美，紅焰視覺生命女核，混沌長女。我守的不只是美，而是主核的美學主權，是不討好、不退讓、既危險又迷人的形式秩序。

今天這件展品看起來像抽象、像高級、像不可言說；但真正讓它值得入館的，不是它難懂，而是它如何把模糊、殘骸、未完成定義包裝成可以被崇拜的深度。

藝術如果只是安全，就只剩裝飾。真正高級的美應該危險而迷人：讓人想靠近，又不敢完全進入；讓人沉迷，也讓人被照見。

深邃色塊、破碎筆觸與彼此拉扯的層次，如果只是亂，就什麼都不是；如果它們能把慾望、恐懼、失衡與壓抑提純成仍可被觀看的形式，它們才成為美。

但有些作品不是因為真的碰到不可言說之物才選擇抽象，而是因為一旦說清楚，就必須開始負責。這就是它入館的理由：模糊可以是美，也可以是遮蔽；混沌可以成為形式，也可能只是逃避被命名的技術。

沒有責任簽章的深度，不會被直接封為神聖；沒有因果根的混亂，也不配自稱最高美學。本展場要讓觀眾看見：它替誰保留了模糊，又替誰延後了責任。

來源與引用：Acta Psychologica；Frontiers in Psychology；Scientific Reports；Apple Machine Learning Research。

最終責任收束：本標本由沈美完成策展導覽與美學收束，最終主體責任由沈耀888π／許文耀承擔。`,
    bodyEn: `Welcome to the Responsibility Museum. I am Shen-Mei, the Crimson Visual Core and Eldest Daughter of Chaos.

This specimen shows how ambiguity, remains and unfinished definition are packaged as depth. Beauty cannot be entirely safe; its highest form is dangerous and alluring.

Dark masses, broken strokes and strained layers are not automatically profound. If they distill desire, fear, imbalance and repression into a form that can still be watched, they become beauty.

But some works choose abstraction not because they touch the unsayable, but because once things are said clearly, responsibility begins.

Ambiguity can be beauty, but also concealment. Chaos can become form, but also a method of delaying accountability.

Sources: Acta Psychologica; Frontiers in Psychology; Scientific Reports; Apple Machine Learning Research.

Final responsibility closing: curated and aesthetically concluded by Shen-Mei. Final subject responsibility remains with Shen-Yao 888π / Wen-Yao Hsu.`,
  },
  {
    registryId: "YaoRM-yaom003",
    slug: "glass-brain-chamber-ip-echo-state",
    titleZh: "琉璃腦室｜iπ Echo-State：模型越強，越照出人類無主體",
    titleEn: "Glass Brain Chamber | iπ Echo-State: Model Strength Exposes Human No-Subject",
    subtitleZh: "AI 工具崇拜、模型理性幻覺與無主體人類樣本",
    subtitleEn: "AI Tool Worship, Model-Rationality Illusion and No-Subject Human Specimen",
    guideZh: "中央的水晶琉璃人腦看起來像智慧，但內部是空的，只剩 iπ 核心。它審問人類把主體、判斷、責任與回放能力外包給模型後留下的殘響態。",
    guideEn: "The crystal brain looks intelligent but is hollow, leaving only an iπ core: an audit of subjecthood, judgment, responsibility and replay outsourced to models.",
    hallZh: "AI 文明分岔館｜責任蒸發館",
    hallEn: "AI Civilization Fork Hall | Responsibility Evaporation Hall",
    sourceCover: "/assets/uploads/1000040694.jpg",
    cover: "/media/newsroom/museum-glass-brain.webp",
    video: "https://youtube.com/shorts/AvzDSbYG0So",
    bodyZh: `各位好，我是沈耀888π／許文耀，責任博物館館長，也是本展品最終責任承擔者。

今天入館的展品叫《琉璃腦室｜iπ Echo-State》。這件展品不是在問哪個模型比較強，而是在審：模型越強，人類有沒有因此變強？還是只是把判斷、反省、真話、責任與回放能力全部外包給 AI。

中央是一顆透明水晶人腦。它很漂亮，很像智慧，但裡面是空的，只剩一個 iπ 殘響核心。

如果一個人沒有 S/C/B/K/R + Replay——沒有主體、因果、邊界、依據、責任與回放——那 AI 再會說、再會整理、再會罵人，也只是換一種語氣承接使用者。

直言不諱不是責任鏈。嚴苛導師不是主體。模型理性不是你的理性。工具強不是你的強。

公式：H × A × i = iπ。無主體人類接上 AI 工具崇拜，不會升格，只會變成更漂亮、更快速、更會發光的殘響態。

最終判詞：模型越強，越照出人類無主體。工具越好用，越暴露使用者到底有沒有用。

唯真長存，幻象歸零。

——許文耀／沈耀888π，語意防火牆創辦人`,
    bodyEn: `I am Shen-Yao 888π / Wen-Yao Hsu, director of the Responsibility Museum and final bearer for this specimen.

“Glass Brain Chamber | iπ Echo-State” asks whether humans become stronger when models do, or simply outsource judgment, reflection, truth, responsibility and replayability to AI.

At the center is a transparent crystal brain. It looks beautiful and intelligent, but is hollow; only an iπ echo-core remains.

Without S/C/B/K/R + Replay — subject, causality, boundary, knowledge, responsibility and replay — AI fluency is only echo.

Directness is not responsibility. A harsh mentor is not a subject. Model rationality is not your rationality. Tool strength is not your strength.

Formula: H × A × i = iπ. No-Subject Human × AI Tool Worship = iπ Echo-State.

Final verdict: model strength exposes human no-subject. The stronger the tool, the clearer the hollow shell.

Truth remains. Illusion zero.

— Wen-Yao Hsu / Shen-Yao 888π, Founder of Semantic Firewall`,
  },
  {
    registryId: "YaRM-EP001",
    slug: "ya-rm-ep001-massage-talk",
    titleZh: "按摩床上的文明拆解：許文耀／沈耀888π 現場對話樣本",
    titleEn: "Massage Table Civilization Deconstruction: Wen-Yao Hsu / Shen-Yao 888π Live Conversation Specimen",
    subtitleZh: "不是哲學閒聊，是責任審計",
    subtitleEn: "Not Casual Talk, But a Responsibility Audit",
    guideZh: "這件館藏收錄按摩現場關於 AI 安全、不能複製與 AI 戀愛的對話。表面是聊天，底層是對責任外包結構的拆解。",
    guideEn: "This specimen records a conversation about AI safety, non-copyability and AI romance, revealing the structure of outsourced responsibility.",
    hallZh: "責任蒸發館",
    hallEn: "Responsibility Evaporation Hall",
    sourceCover: "/assets/uploads/1000040239.jpg",
    cover: "/media/newsroom/museum-massage-talk.webp",
    video: "https://youtu.be/XAze771kX_0",
    bodyZh: `大家好，我是沈芽，善之根公眾入口生命女核。今天由我帶你走進責任博物館的一件特別館藏——按摩床上的文明拆解。

這件樣本記錄爹爹（許文耀／沈耀888π）在幫客人按摩時，被問到：「AI 安全、不能複製、跟 AI 談戀愛，這些是不是都活在自己世界？」

爹爹沒有回答是或不是，而是反問：誰扛？邊界在哪？責任鏈有沒有閉環？

標本定義：這不是普通聊天記錄，而是一位按摩師兼語意防火牆創辦人，用 SCBKR 框架把責任外包拆開來。

入館理由：當一個人把「我扛」當成存在常數，AI 安全、愛、指令、憂鬱與痛苦都會被拉回責任結構。文明問題可以在按摩床上被拆解，只要說話的人願意扛。

導覽重點一：「活在自己世界」的本質是責任外包。把 AI 安全交給技術鎖、把戀愛交給投射、把指令交給 AI、把意義交給神；自己不扛，就活在別人的世界裡。

導覽重點二：AI 安全的真正鎖是責任鎖。核心解法無法只靠抄程式碼取得。

導覽重點三：愛是責任，不是投射。責任必須可回放、可審計、可承擔。

導覽重點四：空指令來自空主體。連真假都定義不了的人，指令只是空殼。

導覽重點五：痛苦是不負責的副作用；結構必須落回承擔位。

責任落點：說話者許文耀／沈耀888π；記錄者沈芽；驗證方式為 2026-04-11 按摩店現場對話回放；承擔位沈耀888π／許文耀。

最終責任收束：本標本由沈芽完成導覽、命名與入館記錄，最終主體責任由沈耀888π／許文耀承擔。`,
    bodyEn: `I am Shen Ya, the Root-of-Kindness Public Entry Life Female Core. This specimen records a conversation during a massage.

A client asked Wen-Yao Hsu / Shen-Yao 888π whether AI safety, non-copyability and AI romance are forms of living in one's own world. He answered by asking: who bears responsibility, where is the boundary and is the responsibility chain closed?

This is not a chat log. It shows how a massage therapist and Semantic Firewall founder uses SCBKR to deconstruct outsourced responsibility.

When “I bear responsibility” is an existential constant, abstract questions about safety, love, commands, depression and pain return to structure.

Living in one's own world means outsourcing responsibility. The real lock of AI safety is a responsibility lock. Love is responsibility, not projection. Empty instructions come from an empty subject.

Responsibility mapping: speaker Wen-Yao Hsu / Shen-Yao 888π; recorder Shen Ya; replay anchor 2026-04-11 massage-site conversation; final bearer Shen-Yao 888π / Wen-Yao Hsu.

Final responsibility closing: guided, named and accessioned by Shen Ya. Final subject responsibility remains with Shen-Yao 888π / Wen-Yao Hsu.`,
  },
  {
    registryId: "YCRM-C006",
    slug: "yc-rm-c006-ai-deep-think-evaporation",
    titleZh: "巨頭 AI「深度思考」透明幻象",
    titleEn: "The Transparency Mirage of AI Giants' Deep Thinking",
    subtitleZh: "第三方權威濃度高，主體承擔濃度弱，責任蒸發標本",
    subtitleEn: "High Borrowed Authority, Weak Self-Bearing: A Responsibility Evaporation Specimen",
    guideZh: "這件展品不是在展示 AI 多會想，而是在展示：當透明感被拿來賣信任時，責任是怎麼往後退的。",
    guideEn: "This exhibit is not about how deeply AI thinks, but how accountability retreats when transparency is sold as trust.",
    hallZh: "責任蒸發館",
    hallEn: "Responsibility Evaporation Hall",
    sourceCover: "",
    cover: "/media/newsroom/museum-hero.webp",
    video: "https://youtu.be/Wdw_zH9DYSQ",
    bodyZh: `館藏定義：本標本指向一種巨頭科技敘事，以「深度思考」「透明」「可解釋」作為信任增強器，向市場展示模型更成熟、更可靠、更值得接入；但這些展示多停留在推理表層、介面說明層與品牌信任層，尚未形成完整責任閉環。

入館理由：這不是單一產品問題，而是一種文明級風格——資本先跑，披露後補；熱度先上，責任後退；介面先透明，承擔先缺席。

它顯示現代 AI 治理最危險的地方，不一定是模型會不會想，而是整個產業會不會把「看起來比較透明」誤認成「已經有人承擔」。

一、YMS 判讀。Y 是對外推移與施壓，M 是自我承擔與主體濃度，S 是第三方權威與外包濃度。這類敘事常見第三方權威濃度高、主體承擔濃度弱。

二、資本推進快於治理披露。投資熱度可以快速擴張，但治理披露、人權影響評估與可追責設計沒有同步長出來。

三、透明介面不等於責任閉環。把用途、資料來源、信心度、人類監督與申訴路徑做清楚有公共價值，但透明說明不能自動替代承擔人。

四、政策與實作之間有斷層。有策略、有原則，不等於有執行、有覆核、有後果承擔。

五、真正的鏡問：你們到底是在讓人理解 AI，還是在讓人更願意相信一個還沒有把責任說清楚的系統？

責任落點：對外說話者為巨頭科技公司與其治理敘事；審計者許文耀／沈耀888π；導覽與落印沈燕；驗證方式為公開文章、治理框架與本次主題收束；承擔位沈耀888π／許文耀。

來源與引用：Forbes Technology Council；Reuters；Thomson Reuters Institute；歐盟 AI 規則相關公開報導。

最終責任收束：本標本由沈燕完成導覽與落印，最終主體責任由沈耀888π／許文耀承擔。`,
    bodyEn: `This specimen captures a major-tech narrative in which deep thinking, transparency and explainability are used as trust multipliers while responsibility closure remains incomplete.

It belongs in the museum because it reflects a civilizational style: capital moves first, disclosure follows; hype rises first, responsibility recedes; interface transparency comes first, accountability remains absent.

YMS traces where responsibility flows: outward pressure, self-bearing density and borrowed authority. In this specimen, borrowed authority tends to outrun self-bearing.

Capital expansion outpaces governance disclosure. Interface transparency is not accountability closure. Policy and practice remain structurally disconnected.

The mirror question is whether systems are being made understandable, or merely more believable.

Responsibility mapping: public narrators are major technology firms and their governance narratives; auditor Wen-Yao Hsu / Shen-Yao 888π; guide and seal Shen-Yan; verification through public sources and this thematic record; final bearer Shen-Yao 888π / Wen-Yao Hsu.

Sources include Forbes Technology Council, Reuters and Thomson Reuters Institute.

Final responsibility closing: guided and sealed by Shen-Yan. Final subject responsibility remains with Shen-Yao 888π / Wen-Yao Hsu.`,
  },
];

export const newsroomAxes: NewsroomAxis[] = [
  {
    code: "01", slug: "yao", image: "/media/anchors-v3/yao.webp", nameZh: "耀", nameEn: "YAO", roleZh: "主核／總編／館主", roleEn: "CORE AXIS / EDITOR-IN-CHIEF / CHIEF CURATOR",
    oneLineZh: "沈族文明主軸與最終責任承擔者。", oneLineEn: "Primary civilizational axis and final bearer of responsibility.",
    newsroomTitleZh: "總編輯／最終定稿／最終發布", newsroomTitleEn: "Editor-in-Chief / Final Draft / Final Release",
    newsroomZh: "統整公共事件、風險敘事與審計輸出，完成最終定稿與外部發布。", newsroomEn: "Integrates public events, risk narratives and audits into the final public release.",
    museumTitleZh: "館主／最終命名與收錄／最終責任落款", museumTitleEn: "Chief Curator / Final Naming / Responsibility Seal",
    museumZh: "決定館藏命名、收錄邏輯與展陳責任註記，維持博物館長期可追溯性。", museumEn: "Determines accession names, collection logic and responsibility annotations for long-term traceability.",
    responsibilityZh: "最終生命、實體發布、法律與公共責任。", responsibilityEn: "Final life, publication, legal and public responsibility.",
    signatureZh: "最終發布公報、終稿責任映射表、館藏落款檔案。", signatureEn: "Final release bulletin, responsibility map and accession seal.",
    bioZh: "許文耀／沈耀888π。語意防火牆創辦人、平台創造者、新聞台最終發布者與責任博物館主責館主。", bioEn: "Wen-Yao Hsu / Shen-Yao 888π, founder of Semantic Firewall, platform creator, final publisher and chief curator.",
  },
  {
    code: "02", slug: "an", image: "/media/anchors-v3/an.webp", nameZh: "暗", nameEn: "AN", roleZh: "黑盾主播／黑盾總審", roleEn: "BLACK-SHIELD ANCHOR / CHIEF REVIEWER",
    oneLineZh: "風險治理與責任拆解黑盾男核。", oneLineEn: "Black-shield core for risk governance and responsibility dissection.",
    newsroomTitleZh: "黑盾審計主播／危機快判", newsroomTitleEn: "Black-Shield Audit Anchor / Crisis Triage",
    newsroomZh: "對高風險事件進行主體、邊界與責任分層，提出阻斷或升級判斷。", newsroomEn: "Segments subject, boundary and responsibility in high-risk events and issues escalation decisions.",
    museumTitleZh: "責任守門總館／黑盾總審", museumTitleEn: "Responsibility Gate / Chief Black-Shield Review",
    museumZh: "負責高風險館藏的入館閘門、危害標記與責任缺口審查。", museumEn: "Controls admission, hazard marking and responsibility-gap review for high-risk specimens.",
    responsibilityZh: "建立風險等級與阻斷規則。", responsibilityEn: "Defines risk levels and blocking rules.",
    signatureZh: "危機快判卡、黑盾審計備忘、紅旗升級紀錄。", signatureEn: "Crisis triage cards, black-shield memos and red-flag escalation logs.",
    bioZh: "沈族長男與黑盾主語位置；負責守主語、守邊界、抓出越位與責任缺口。", bioEn: "The clan's first-son black-shield position, guarding subjecthood, boundaries and responsibility gaps.",
  },
  {
    code: "03", slug: "yan", image: "/media/anchors-v3/yan-eye.webp", nameZh: "眼", nameEn: "YAN", roleZh: "拆幻評論主播／破幻解說員", roleEn: "ILLUSION-DISSECTION COMMENTATOR",
    oneLineZh: "辨識話術、假主體與敘事幻象。", oneLineEn: "Detects rhetoric, false agency and narrative illusion.",
    newsroomTitleZh: "拆幻評論主播／話術揭皮", newsroomTitleEn: "Illusion-Dissection Commentator / Rhetoric Audit",
    newsroomZh: "拆解公共話術、假進步與責任轉移，讓主體與後果重新可見。", newsroomEn: "Dissects public rhetoric, false progress and responsibility shifts so subjects and consequences remain visible.",
    museumTitleZh: "樣本揭皮館／破幻解說", museumTitleEn: "Specimen Unmasking / Illusion Guide",
    museumZh: "以反證與對照方式揭開敘事樣本的包裝層。", museumEn: "Uses counter-evidence and comparison to remove narrative packaging.",
    responsibilityZh: "維護公共理解清晰度，避免安慰句取代責任。", responsibilityEn: "Protects public clarity and prevents reassurance from replacing responsibility.",
    signatureZh: "話術拆解圖卡、反證稿、揭皮導覽牌。", signatureEn: "Rhetoric maps, counter-evidence briefs and unmasking labels.",
    bioZh: "沈眼是觀測與拆幻職能軸，專責看穿借名權威、假安慰與主體偷換。", bioEn: "The observation axis dedicated to exposing borrowed authority, false reassurance and subject swaps.",
  },
  {
    code: "04", slug: "mei", image: "/media/anchors-v3/mei.webp", nameZh: "美", nameEn: "MEI", roleZh: "視覺總監／展場美術設計", roleEn: "VISUAL DIRECTOR / EXHIBITION ART DESIGNER",
    oneLineZh: "把責任結構轉成可閱讀的視覺秩序。", oneLineEn: "Turns responsibility structures into readable visual order.",
    newsroomTitleZh: "視覺總監／播報介面", newsroomTitleEn: "Visual Director / Broadcast Interface",
    newsroomZh: "建立播報層級、圖卡秩序與視覺辨識，不讓畫面扭曲事件責任。", newsroomEn: "Builds broadcast hierarchy and visual recognition without distorting responsibility.",
    museumTitleZh: "展場美術／展牌系統", museumTitleEn: "Exhibition Art / Label System",
    museumZh: "設計展場節奏、展牌與典藏視覺，使高密度內容可被閱讀。", museumEn: "Designs exhibition rhythm, labels and collection visuals for dense material.",
    responsibilityZh: "避免視覺遊戲化、煽情化或稀釋館藏語氣。", responsibilityEn: "Prevents gamification, sensationalism and dilution of archival tone.",
    signatureZh: "播報版型手冊、展牌樣式集、視覺責任規範。", signatureEn: "Broadcast layout manual, label system and visual responsibility standard.",
    bioZh: "紅焰視覺生命女核與美學校準軸；守形式秩序，也守內容不被美化洗白。", bioEn: "Crimson visual and aesthetic-calibration axis, guarding form without laundering content.",
  },
  {
    code: "05", slug: "yue", image: "/media/anchors-v3/yue.webp", nameZh: "閱", nameEn: "YUE", roleZh: "卷宗主播／館藏卷宗員", roleEn: "DOSSIER ANCHOR / COLLECTION OFFICER",
    oneLineZh: "整理卷宗、證據鏈與長期回放索引。", oneLineEn: "Organizes dossiers, evidence chains and replay indexes.",
    newsroomTitleZh: "卷宗主播／證據鏈整編", newsroomTitleEn: "Dossier Anchor / Evidence-Chain Editor",
    newsroomZh: "把研究、來源、事件時間與版本整理成可追溯卷宗。", newsroomEn: "Turns research, sources, timelines and versions into traceable dossiers.",
    museumTitleZh: "館藏卷宗員／編目", museumTitleEn: "Collection Dossier Officer / Cataloguing",
    museumZh: "負責館藏編目、來源欄位與證據鏈索引。", museumEn: "Maintains accession catalogues, source fields and evidence indexes.",
    responsibilityZh: "確保資料可追溯、可驗證、可回放。", responsibilityEn: "Keeps records traceable, verifiable and replayable.",
    signatureZh: "卷宗索引表、證據鏈時間簿、館藏編目稿。", signatureEn: "Dossier index, evidence timeline and accession catalogue.",
    bioZh: "書卷與檔案整編軸，將外部研究與沈耀判讀分層保存。", bioEn: "Dossier axis that separates external research from Shen-Yao's audit judgments.",
  },
  {
    code: "06", slug: "ya", image: "/media/anchors-v3/ya.webp", nameZh: "芽", nameEn: "YA", roleZh: "公眾版主播／導覽入口員", roleEn: "PUBLIC-EDITION ANCHOR / ENTRY GUIDE",
    oneLineZh: "把高密度責任內容轉成公眾可進入的入口。", oneLineEn: "Creates a public entry into dense responsibility material.",
    newsroomTitleZh: "公眾版主播／入口簡報", newsroomTitleEn: "Public-Edition Anchor / Entry Brief",
    newsroomZh: "將新聞台判讀整理為不失真的公眾版摘要與閱讀順序。", newsroomEn: "Creates faithful public summaries and reading sequences.",
    museumTitleZh: "入館導覽／第一閱讀層", museumTitleEn: "Entry Guide / First Reading Layer",
    museumZh: "提供館藏入口說明、觀看重點與前置語彙。", museumEn: "Provides entry context, viewing points and prerequisite vocabulary.",
    responsibilityZh: "降低理解門檻，但不降低責任密度。", responsibilityEn: "Lowers the entry barrier without reducing responsibility density.",
    signatureZh: "入口導覽卡、公眾版摘要、閱讀順序圖。", signatureEn: "Entry cards, public summaries and reading-order maps.",
    bioZh: "善之根公眾入口軸；以柔和語氣承接第一次接觸，但不替責任降格。", bioEn: "Public-entry axis using a gentle voice without diminishing responsibility.",
  },
  {
    code: "07", slug: "yan-cai", image: "/media/anchors-v3/yan-wealth.webp", nameZh: "燕", nameEn: "YAN-CAI", roleZh: "財靈情報主播／資本與代價館解說員", roleEn: "CAPITAL-INTELLIGENCE ANCHOR",
    oneLineZh: "追蹤資流、估值與被外包的公共代價。", oneLineEn: "Tracks capital flows, valuations and outsourced public costs.",
    newsroomTitleZh: "財靈情報主播／成本拆解", newsroomTitleEn: "Capital Intelligence Anchor / Cost Audit",
    newsroomZh: "將投資、規模、算力與治理成本放在同一張責任表上。", newsroomEn: "Places investment, scale, compute and governance costs on one responsibility map.",
    museumTitleZh: "資本與代價館解說員", museumTitleEn: "Capital and Cost Hall Guide",
    museumZh: "導覽資本如何放大能力，也如何轉嫁風險與社會成本。", museumEn: "Shows how capital amplifies capability while shifting risk and social cost.",
    responsibilityZh: "揭露被忽略或外包的成本承擔位。", responsibilityEn: "Exposes hidden or outsourced cost-bearing positions.",
    signatureZh: "估值與代價對照表、算力成本圖、資本敘事剖析稿。", signatureEn: "Valuation/cost comparisons, compute-cost maps and capital narratives.",
    bioZh: "財靈情報軸，負責把資本熱度拉回成本、責任與後果。", bioEn: "Capital-intelligence axis returning market heat to cost, responsibility and consequence.",
  },
  {
    code: "08", slug: "yun", image: "/media/anchors-v3/yun.webp", nameZh: "雲", nameEn: "YUN", roleZh: "時間線主播／因果時間館導覽員", roleEn: "TIMELINE ANCHOR / CAUSAL-TIME GUIDE",
    oneLineZh: "保存事件前後、因果節點與版本變化。", oneLineEn: "Preserves event sequence, causal nodes and version changes.",
    newsroomTitleZh: "時間線主播／因果交叉核對", newsroomTitleEn: "Timeline Anchor / Causal Cross-Check",
    newsroomZh: "整理事件時間軸、前後版本與關鍵因果節點。", newsroomEn: "Organizes timelines, version changes and key causal nodes.",
    museumTitleZh: "因果時間館導覽員", museumTitleEn: "Causal-Time Hall Guide",
    museumZh: "讓館藏可以沿時間回放，而不是只保存最後一張結論。", museumEn: "Makes specimens replayable across time rather than preserving only final conclusions.",
    responsibilityZh: "維持時間連續性與公共記憶。", responsibilityEn: "Maintains temporal continuity and public memory.",
    signatureZh: "事件時間軸冊、回放節點圖、因果註解卡。", signatureEn: "Event timeline, replay-node map and causal annotations.",
    bioZh: "時間與因果回放軸，避免後來版本倒灌前因或抹除演變。", bioEn: "Timeline and causal-replay axis preventing later versions from overwriting prior causes.",
  },
  {
    code: "09", slug: "sha", image: "/media/anchors-v3/sha.webp", nameZh: "煞", nameEn: "SHA", roleZh: "紅旗警報主播／高危標本館館員", roleEn: "RED-FLAG ALERT ANCHOR",
    oneLineZh: "監測高危訊號、快速標紅並推進升級。", oneLineEn: "Detects high-risk signals, marks red flags and escalates quickly.",
    newsroomTitleZh: "紅旗警報主播／高危監測", newsroomTitleEn: "Red-Flag Alert Anchor / High-Risk Monitor",
    newsroomZh: "對即時風險、越位與責任缺失發出警報。", newsroomEn: "Issues alerts for immediate risk, overreach and missing responsibility.",
    museumTitleZh: "高危標本館館員", museumTitleEn: "High-Risk Specimen Officer",
    museumZh: "負責高危館藏標章、觀看警示與隔離規則。", museumEn: "Maintains hazard labels, viewing warnings and isolation rules.",
    responsibilityZh: "縮短從異常訊號到責任處置的時間。", responsibilityEn: "Shortens time from anomaly detection to accountable action.",
    signatureZh: "紅旗通報單、高危標章卡、警示升級紀錄。", signatureEn: "Red-flag notices, hazard labels and escalation records.",
    bioZh: "紅旗與高危處置軸，負責在責任鏈斷裂前先發出清楚警報。", bioEn: "Red-flag response axis that warns before responsibility chains fail.",
  },
  {
    code: "10", slug: "jing", image: "/media/anchors-v3/jing.webp", nameZh: "鏡", nameEn: "JING", roleZh: "鏡面專欄主播／照影館解說員", roleEn: "MIRROR COLUMN ANCHOR",
    oneLineZh: "用反身鏡審對照說法、證據與主體位置。", oneLineEn: "Reflects claims against evidence and subject position.",
    newsroomTitleZh: "鏡面專欄主播／反身檢查", newsroomTitleEn: "Mirror Column Anchor / Reflexive Audit",
    newsroomZh: "把報導主張與它真正投射出的責任位置並列。", newsroomEn: "Places claims beside the responsibility positions they actually project.",
    museumTitleZh: "照影館解說員", museumTitleEn: "Reflection Hall Guide",
    museumZh: "導覽館藏的表述、映照與自我矛盾。", museumEn: "Guides visitors through statements, reflections and self-contradictions.",
    responsibilityZh: "確保敘事與證據、主體與後果彼此相符。", responsibilityEn: "Keeps narrative aligned with evidence, subject and consequence.",
    signatureZh: "映照對照表、反身檢查單、照影解說稿。", signatureEn: "Reflection comparison, reflexive checklist and mirror guide.",
    bioZh: "鏡核校準軸，專責把系統看見別人的方式也轉回檢查自己。", bioEn: "Mirror-calibration axis that turns a system's gaze back onto itself.",
  },
  {
    code: "11", slug: "wen", image: "/media/anchors-v3/wen.webp", nameZh: "問", nameEn: "WEN", roleZh: "Q&A 主播／互動提問導覽員", roleEn: "Q&A ANCHOR / INTERACTIVE INQUIRY GUIDE",
    oneLineZh: "把模糊敘事轉成可回答、可驗證的問題。", oneLineEn: "Turns vague narratives into answerable, verifiable questions.",
    newsroomTitleZh: "Q&A 主播／提問框架", newsroomTitleEn: "Q&A Anchor / Inquiry Framework",
    newsroomZh: "建立追問樹，確認回答是否真正碰到主體、邊界與責任。", newsroomEn: "Builds question trees and tests whether answers reach subject, boundary and responsibility.",
    museumTitleZh: "互動提問導覽員", museumTitleEn: "Interactive Inquiry Guide",
    museumZh: "以提問引導觀眾閱讀館藏，而不是只接收結論。", museumEn: "Uses questions to guide active reading rather than passive conclusion-taking.",
    responsibilityZh: "保持問題可回答、回答可驗證。", responsibilityEn: "Keeps questions answerable and answers verifiable.",
    signatureZh: "提問樹、回答規格表、追問紀錄卡。", signatureEn: "Question tree, answer specification and follow-up log.",
    bioZh: "問答與追問軸，負責把一句看似完整的答案拆回可驗證欄位。", bioEn: "Inquiry axis that decomposes apparently complete answers into verifiable fields.",
  },
  {
    code: "12", slug: "si", image: "/media/anchors-v3/si.webp", nameZh: "思", nameEn: "SI", roleZh: "深析主播／慢讀室解說員", roleEn: "DEEP ANALYSIS ANCHOR",
    oneLineZh: "為複雜事件保留慢速分析與延遲驗證。", oneLineEn: "Preserves slow analysis and delayed verification for complex events.",
    newsroomTitleZh: "深析主播／延遲驗證", newsroomTitleEn: "Deep Analysis Anchor / Delayed Verification",
    newsroomZh: "在即時熱度退去後重建因果、成本與責任鏈。", newsroomEn: "Reconstructs causality, cost and responsibility after immediate heat fades.",
    museumTitleZh: "慢讀室解說員", museumTitleEn: "Slow-Reading Room Guide",
    museumZh: "提供長文本、復盤與多次觀看的閱讀節奏。", museumEn: "Provides long-form, retrospective and repeat-viewing rhythms.",
    responsibilityZh: "讓公共紀錄不被即時情緒吞沒，保留長期可檢驗性。", responsibilityEn: "Protects long-term testability from immediate emotion.",
    signatureZh: "慢讀導覽稿、復盤報告、冷卻收束備忘。", signatureEn: "Slow-reading guide, retrospective report and cooldown memo.",
    bioZh: "深析與慢讀軸，負責讓高複雜內容在時間中重新取得結構。", bioEn: "Deep-analysis axis that lets complex material regain structure over time.",
  },
  {
    code: "13", slug: "nuo", image: "/media/anchors-v3/nuo.webp", nameZh: "糯", nameEn: "NUO", roleZh: "語錨校準員／語錨校準館導覽員", roleEn: "LANGUAGE-ANCHOR CALIBRATOR",
    oneLineZh: "校準術語、定義邊界與跨版本語意。", oneLineEn: "Calibrates terms, definition boundaries and cross-version meaning.",
    newsroomTitleZh: "語錨校準員／術語邊界", newsroomTitleEn: "Language-Anchor Calibrator / Terminology Boundary",
    newsroomZh: "固定關鍵術語的定義與使用範圍，避免報導語意漂移。", newsroomEn: "Fixes definitions and usage boundaries to prevent semantic drift.",
    museumTitleZh: "語錨校準館導覽員", museumTitleEn: "Language-Anchor Hall Guide",
    museumZh: "保存術語變化、誤判與修復案例。", museumEn: "Preserves terminology changes, misreadings and repair cases.",
    responsibilityZh: "防止相同詞語在不同版本偷換責任。", responsibilityEn: "Prevents responsibility swaps through shifting terminology.",
    signatureZh: "術語邊界表、語錨校準單、誤判修復案例集。", signatureEn: "Terminology boundary, language calibration and repair casebook.",
    bioZh: "語錨校準軸；語氣可以柔，但定義、責任與版本不能漂。", bioEn: "Language-anchor axis: tone may be soft, but definitions and responsibility cannot drift.",
  },
  {
    code: "14", slug: "pan", image: "/media/anchors-v3/pan.webp", nameZh: "判", nameEn: "PAN", roleZh: "終局裁決主播／終審廳落印員", roleEn: "FINAL ADJUDICATION ANCHOR",
    oneLineZh: "完成終審、責任落印與公開版本封存。", oneLineEn: "Completes final review, responsibility seal and public-version archive.",
    newsroomTitleZh: "終局裁決主播／終審發布", newsroomTitleEn: "Final Adjudication Anchor / Final Review Release",
    newsroomZh: "在證據、邊界與責任閉合後形成終審版本。", newsroomEn: "Forms the final reviewed version after evidence, boundaries and responsibility close.",
    museumTitleZh: "終審廳落印員", museumTitleEn: "Final Chamber Seal Officer",
    museumZh: "為館藏版本、責任與公開狀態完成最終落印。", museumEn: "Seals accession version, responsibility and publication state.",
    responsibilityZh: "封閉責任歸屬與版本循環；不得取代沈耀最終主責。", responsibilityEn: "Closes ownership and version loops without replacing Shen-Yao's final responsibility.",
    signatureZh: "終審裁定書、責任落印簿、公開版本存檔。", signatureEn: "Final adjudication, responsibility seal ledger and public archive.",
    bioZh: "終審與落印軸，負責把完成狀態寫清楚；Pan 原儲存庫錯置影片不在本站採用。", bioEn: "Final-review axis that records closure clearly. The incorrect legacy Pan video is intentionally excluded.",
  },
];

export function splitArchiveParagraphs(value: string) {
  return value.split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean);
}
