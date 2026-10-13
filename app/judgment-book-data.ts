export type JudgmentLocale = "zh" | "en";

export type JudgmentLocalized = Record<JudgmentLocale, string>;

export type CivilizationCase = {
  id: string;
  code: string;
  kind: "main" | "interlude";
  image: string;
  imageAlt: JudgmentLocalized;
  title: JudgmentLocalized;
  shortVerdict: JudgmentLocalized;
  summary: JudgmentLocalized;
  releaseState: JudgmentLocalized;
};

export const judgmentOfCivilization = {
  id: "judgment-of-civilization",
  slug: "judgment-of-civilization",
  detailRoute: "/books/judgment-of-civilization",
  casesRoute: "/books/judgment-of-civilization/cases",
  title: {
    zh: "虛偽文明的審判",
    en: "The Judgment of a False Civilization",
  },
  titleState: {
    zh: "繁中書名已定；英文為官網工作譯名，正式英文書名尚未定案。",
    en: "The Chinese title is fixed. The English title shown here is a working website translation, not a finalized English-edition title.",
  },
  subtitle: {
    zh: "文明案件檔案／責任證成鏈",
    en: "Civilizational Case Dossiers / Responsibility Proof Chain",
  },
  coverSrc: "/media/books/judgment-of-civilization/cover-draft.jpg",
  coverAlt: {
    zh: "《虛偽文明的審判》創作期封面視覺；官網以文字另行標明現行書名與狀態",
    en: "Draft-period cover artwork for The Judgment of a False Civilization; the current title and status are stated separately in website text",
  },
  authorImage: "/media/books/judgment-of-civilization/author-wenyao.png",
  authorImageAlt: {
    zh: "作者許文耀／沈耀888PI 本人照片",
    en: "Author portrait of Wen-Yao Hsu / Shen-Yao 888PI",
  },
  author: {
    zh: "許文耀／沈耀888PI",
    en: "Wen-Yao Hsu / Shen-Yao 888PI",
  },
  status: {
    zh: "我仍在寫這本 BOOK_DRAFT。現行母檔以八部、34 個暫定案件作為寫作導航；我目前只在官網公開七張案件／番外圖卡，它們不是固定目錄，也不代表已完成 34 章。出版路徑仍由我決定。",
    en: "I am still writing this BOOK_DRAFT. My current source document uses eight parts and 34 provisional cases as a writing map. I have selected only seven case/interlude artworks for this website; they are not a fixed table of contents or a claim that 34 chapters are complete. I have not yet fixed the publication path.",
  },
  introduction: {
    zh: "我逐案解構文明的虛偽：把文明寫成理所當然的祭祀、語言、神話、神、制度與權力，拆回現象、因果、證據、授權、後果與責任，追問誰定義、誰能停止、錯了誰修、最後由誰承擔。",
    en: "I dismantle civilization’s falsehoods case by case. Sacrifice, language, myth, divinity, institutions and power are taken apart and returned to phenomenon, causality, evidence, authorization, consequence and responsibility: who defined them, who can stop them, who repairs failure, and who finally bears the result?",
  },
  method: {
    zh: "每一章我都分成兩層：PART A 保留我的完整正文；PART B 以 RPC-00～15 建立責任證成鏈。外部資料可以成為我觀測的材料，但不能替我取得定義權、判詞權或責任簽名。",
    en: "I build every formal chapter in two layers: PART A preserves my complete text; PART B applies the RPC-00–15 Responsibility Proof Chain. External material may enter as evidence I observe, but it does not acquire my authority to define, judge or sign responsibility.",
  },
  publicRelease: {
    mode: "summaries-only",
    zh: "我目前只公開七張創作圖卡、篇名、短判詞與非連續摘要；這不是全書固定目錄。我不公開完整章節、可下載書稿、EPUB、PDF 或投稿資料。",
    en: "I currently release only seven creative artworks, titles, short verdicts and non-contiguous summaries on this website. This is not the book’s fixed table of contents. I do not release full chapters, a downloadable manuscript, EPUB/PDF files or submission records.",
  },
  publicationPath: "undecided",
  sourceState: {
    checkedAt: "2026-10-14",
    wholeBookState: "BOOK_DRAFT",
    provisionalParts: 8,
    provisionalCases: 34,
    selectedPublicMainCaseCards: 5,
    selectedPublicInterludeCards: 2,
    chapterCompletionClaimed: false,
    fullManuscriptPublic: false,
    englishManuscriptPublic: false,
    storeUrlPublic: false,
    isbnPublic: false,
  },
  cases: [
    {
      id: "case-001",
      code: "CASE 001",
      kind: "main",
      image: "/media/books/judgment-of-civilization/case-001.jpg",
      imageAlt: {
        zh: "祭祀與文明起點的案件圖卡",
        en: "Case artwork for sacrifice and civilization’s first bug",
      },
      title: {
        zh: "祭祀：文明第一個 Bug",
        en: "Sacrifice: Civilization’s First Bug",
      },
      shortVerdict: {
        zh: "死亡沒有證明靈魂；未知必須保留為 UNKNOWN。",
        en: "Death did not prove the soul; what remains unknown must remain UNKNOWN.",
      },
      summary: {
        zh: "我把第一案拉回祭祀成立以前：面對死亡與不可知，人類把恐懼加工成可交換的秩序。我不否定情感；我拒絕讓無法驗證的推測直接取得犧牲他人的授權。",
        en: "I return the first case to the moment before sacrifice became an institution. Faced with death and uncertainty, people turned fear into an exchangeable order. I do not deny emotion; I refuse to let an unverifiable guess acquire authority to sacrifice another.",
      },
      releaseState: { zh: "官網選錄／公開摘要", en: "WEBSITE SELECTION / PUBLIC SUMMARY" },
    },
    {
      id: "case-002",
      code: "CASE 002",
      kind: "main",
      image: "/media/books/judgment-of-civilization/case-002.jpg",
      imageAlt: {
        zh: "語言、名字與不可驗證結構的案件圖卡",
        en: "Case artwork for language, naming and unverifiable structures",
      },
      title: {
        zh: "語言病毒：不可驗證之物如何取得名字",
        en: "The Language Virus: How the Unverifiable Acquired a Name",
      },
      shortVerdict: {
        zh: "名字開始替因果工作時，語言就從描述變成未經驗證的授權。",
        en: "When a name begins doing the work of causality, language becomes unverified authorization.",
      },
      summary: {
        zh: "我在第二案追查名字如何從方便溝通的符號，變成替從未成立的因果背書的工具。只要重複得夠久，標籤就可能看起來像證據；我把名稱、對象與可驗證關係重新拆開。",
        en: "In the second case, I trace how a communicative label becomes a tool that certifies a causality never shown. Repetition can make a label resemble evidence; I separate the name, the object and the verifiable relation again.",
      },
      releaseState: { zh: "官網選錄／公開摘要", en: "WEBSITE SELECTION / PUBLIC SUMMARY" },
    },
    {
      id: "case-003",
      code: "CASE 003",
      kind: "main",
      image: "/media/books/judgment-of-civilization/case-003.jpg",
      imageAlt: {
        zh: "神話、敘事與證據邊界的案件圖卡",
        en: "Case artwork for myth, narrative and evidentiary boundaries",
      },
      title: {
        zh: "神話：描述如何開始取代證據",
        en: "Myth: When Description Began to Replace Evidence",
      },
      shortVerdict: {
        zh: "真正的秩序不能靠名字完成；內部功能與外部後果都必須閉合。",
        en: "A real order cannot be completed by naming alone; internal function and external consequence must both close.",
      },
      summary: {
        zh: "我不把神話當成單純故事；我審查敘事何時取得解釋現實的上位權。當描述不再接受反證、角色不必承擔後果，故事就越過證據，成為文明的預設答案。",
        en: "I do not treat myth as merely story. I examine when narrative acquires superior authority over reality. When description no longer permits refutation and its actors bear no consequence, story crosses the evidence boundary and becomes civilization’s default answer.",
      },
      releaseState: { zh: "官網選錄／公開摘要", en: "WEBSITE SELECTION / PUBLIC SUMMARY" },
    },
    {
      id: "case-004",
      code: "CASE 004",
      kind: "main",
      image: "/media/books/judgment-of-civilization/case-004.jpg",
      imageAlt: {
        zh: "神、授權與現實秩序的案件圖卡",
        en: "Case artwork for divinity, authorization and real-world order",
      },
      title: {
        zh: "神：不可驗證結構如何取得最高授權",
        en: "God: How an Unverifiable Structure Acquired Supreme Authority",
      },
      shortVerdict: {
        zh: "取得多少現實秩序權，就必須交出多少現實責任。",
        en: "The more authority claimed over real order, the more real responsibility must be surrendered to audit.",
      },
      summary: {
        zh: "我把最高授權拉回責任審查：若一個結構能決定服從、懲罰與犧牲，它就不能只用不可驗證保護自己。權力進入現實的每一步，都必須留下授權、停止、修復與承擔的主體。",
        en: "I return supreme authority to responsibility audit. If a structure can demand obedience, punishment or sacrifice, unverifiability cannot shield it. Every step by which power enters reality must identify authorization, stopping power, repair and the subject who bears the result.",
      },
      releaseState: { zh: "官網選錄／公開摘要", en: "WEBSITE SELECTION / PUBLIC SUMMARY" },
    },
    {
      id: "interlude-04-2",
      code: "INTERLUDE 4.2",
      kind: "interlude",
      image: "/media/books/judgment-of-civilization/interlude-04-2.jpg",
      imageAlt: {
        zh: "市場、選擇與日常責任的番外圖卡",
        en: "Interlude artwork for markets, choice and everyday responsibility",
      },
      title: {
        zh: "市場責任鏈：審完文明以後，我還是可以逛人間",
        en: "The Market Responsibility Chain: After Judging Civilization, I Can Still Walk Among People",
      },
      shortVerdict: {
        zh: "我仍然選擇、付錢、帶回家，也承擔結果；這就是人間責任鏈。",
        en: "I still choose, pay, take it home and bear the result. That is an everyday responsibility chain.",
      },
      summary: {
        zh: "我暫時離開審判席，把責任放回市場裡最普通的一次選擇。我保留逛街、喜歡與交易的溫度，同時辨認廣告、價格、需求、決定與後果究竟各落在誰身上。",
        en: "I step away from the bench and return responsibility to an ordinary market choice. I keep the warmth of browsing, liking and exchange while tracing where advertising, price, desire, decision and consequence actually land.",
      },
      releaseState: { zh: "官網選錄／公開摘要", en: "WEBSITE SELECTION / PUBLIC SUMMARY" },
    },
    {
      id: "case-005",
      code: "CASE 005",
      kind: "main",
      image: "/media/books/judgment-of-civilization/case-005.png",
      imageAlt: {
        zh: "制度、權力與主體責任的案件圖卡",
        en: "Case artwork for institutions, power and subject responsibility",
      },
      title: {
        zh: "權力：當制度開始假裝自己是主體",
        en: "Power: When an Institution Began Pretending to Be a Subject",
      },
      shortVerdict: {
        zh: "制度不是主體；模型只會把沒有責任主體的空殼跑得更快。",
        en: "An institution is not a subject; a model only makes a shell without a responsible subject run faster.",
      },
      summary: {
        zh: "我審查『制度如此規定』為何常被用來消失決策者。規則、流程與模型都能承載運算，卻不能代替簽名與承擔；只要錯誤無法回到能停止、修復與負責的人，閉環就沒有成立。",
        en: "I examine how ‘the institution required it’ erases the decision-maker. Rules, procedures and models can carry computation, but not signature or consequence. If failure cannot return to a person able to stop, repair and answer for it, closure never occurred.",
      },
      releaseState: { zh: "官網選錄／公開摘要", en: "WEBSITE SELECTION / PUBLIC SUMMARY" },
    },
    {
      id: "interlude-05-2",
      code: "INTERLUDE 5.2",
      kind: "interlude",
      image: "/media/books/judgment-of-civilization/interlude-05-2.jpg",
      imageAlt: {
        zh: "木頭、模型與外包主體的番外圖卡",
        en: "Interlude artwork for idols, models and outsourced subjecthood",
      },
      title: {
        zh: "從拜木頭到拜模型：誰給你們外包主體的權力",
        en: "From Worshipping Wood to Worshipping Models: Who Authorized You to Outsource the Subject?",
      },
      shortVerdict: {
        zh: "木頭沒有證明自己是神；模型也沒有證明自己是人。",
        en: "Wood never proved itself divine; a model never proved itself human.",
      },
      summary: {
        zh: "我把古老偶像與現代模型放進同一條主體外包鏈。問題不在材料新舊，而在誰把自己的判斷、簽名與後果交給不能承擔的載體，再用便利或敬畏替這次交付合法化。",
        en: "I place ancient idols and modern models on the same chain of outsourced subjecthood. My question is not whether the material is old or new, but who transfers judgment, signature and consequence to a carrier that cannot bear them, then calls the transfer legitimate through convenience or awe.",
      },
      releaseState: { zh: "官網選錄／公開摘要", en: "WEBSITE SELECTION / PUBLIC SUMMARY" },
    },
  ] as readonly CivilizationCase[],
} as const;
