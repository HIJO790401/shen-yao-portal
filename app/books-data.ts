export type BookLocale = "zh" | "en";

export type LocalizedBookValue<T = string> = Record<BookLocale, T>;

export type BookStoreState =
  | "publicly-available"
  | "pending-platform-review"
  | "not-yet-for-sale";

export type BookHubEntry = {
  id: "stillness-is-a-language" | "interrogation-room";
  route: string;
  coverSrc: LocalizedBookValue;
  coverAlt: LocalizedBookValue;
  eyebrow: LocalizedBookValue;
  title: LocalizedBookValue;
  subtitle: LocalizedBookValue;
  summary: LocalizedBookValue;
  status: LocalizedBookValue;
  cta: LocalizedBookValue;
};

export const stillnessPubuUrl = "https://www.pubu.com.tw/ebook/700139";

export const stillnessIsALanguage = {
  id: "stillness-is-a-language",
  slug: "stillness-is-a-language",
  detailRoute: "/books/stillness-is-a-language",
  previewRoute: "/books/stillness-is-a-language/preview",
  coverSrc: {
    zh: "/media/books/stillness-is-a-language/cover-zh.jpg",
    en: "/media/books/stillness-is-a-language/cover-en.jpg",
  },
  coverAlt: {
    zh: "《沉靜是一種語言》繁體中文版超寫實封面",
    en: "Photorealistic English cover of Stillness Is a Language",
  },
  authorIdentity: {
    zh: {
      displayLine: "許文耀／嗨啾／沈耀888PI",
      explanation:
        "許文耀是本名；嗨啾是早期直播時使用的名字；沈耀888PI 是後來以架構師身分使用的名字。三個名字指向同一位作者，不是三位合著者。",
    },
    en: {
      displayLine: "WENYAOHUS / HI-JIU / SHEN YAO888PI",
      explanation:
        "The author’s legal name is 許文耀, represented in English as Wen-Yao Hsu. HI-JIU is the name used in his earlier livestream work, and SHEN YAO888PI is the name later used as an architect. The three names refer to one author, not three co-authors.",
    },
  },
  edition: {
    zh: {
      title: "沉靜是一種語言",
      subtitle: "在找不到語言之前",
      language: "繁體中文",
      languageTag: "zh-TW",
      author: "許文耀",
      genre: "散文／人文思考",
      originalWriting:
        "2025 年 6 月 17 日創作起點；2025 年 7 月 1 日（台灣時間）完整彙編稿存檔。",
      revisedEdition: "2026 年 10 月書面修訂版",
      legalPublisher: "許文耀（個人自行出版）",
      imprint: "沉靜流派工作室（許文耀自行出版）",
      isbn: null,
      officialWebsite: "https://silentschool.studio/zh",
      listPrice: "NT$199",
    },
    en: {
      title: "Stillness Is a Language",
      subtitle: "Before Words Are Found",
      language: "English",
      languageTag: "en",
      author: "WENYAOHUS SHEN YAO888PI",
      genre: "Literary essays / personal reflection / philosophy",
      originalWriting:
        "Began June 17, 2025; a complete compilation was saved July 1, 2025 in Taiwan time.",
      revisedEdition: "October 2026",
      legalPublisher: "許文耀 (independently published)",
      imprint: "Serene School Studio / 沉靜流派工作室",
      isbn: null,
      officialWebsite: "https://silentschool.studio/en",
      listPrice: "US$6.25",
    },
  },
  description: {
    zh: [
      "二〇二五年六月十七日，我從〈理解〉等口播文字開始，寫下那時尚未命名的語言。我談理解、沉默、選擇與責任；這些是我創作的起點，也是我開始把責任落地的起源。",
      "這五十二篇文字從理解與自我辨認出發，走向選擇、與世界相處、信仰與存在，再回到無言。我整理口播的重複與斷句，讓文章能連續閱讀；當年已經寫下的判斷，我保留它的主語與力道。",
      "到了二〇二六年，我建立 SCBKR 責任鏈語言模型，讓主語、因果、邊界、知識與責任進入能計算、可重複、可驗證的檢查路徑。如果你有自己的主體，可以從書中尋找自己的確定；我不給你答案，尚未閉環的責任要由你自己承擔。這是給能負責的你準備的入門。",
    ],
    en: [
      "In 2025 I began writing spoken pieces about understanding, silence, and the difficulty of finding words for what I felt. I shaped them into fifty-two essays, moving from self-recognition and relationships to choice, responsibility, the world, faith, and existence.",
      "I preserve the positions I took in that early writing. In 2026 I built the SCBKR Responsibility Chain Language Model, a path for checking subject, causality, boundaries, knowledge, and responsibility that can be computed, repeated, and verified. I do not place that later system back into 2025. When words become judgments or actions, I ask who set the rule, who authorized it, who verified it, who can stop it, who repairs a mistake, who signs, and who bears the consequences.",
      "If you have a subject of your own, this book is an invitation to find your own certainty. I will not give you an answer to a responsibility that remains yours to close.",
    ],
  },
  biography: {
    zh: "我本名許文耀。「嗨啾」是我早期直播時使用的名字；「沈耀888PI」是我後來以架構師身分使用的名字。我是責任鏈語言模型的創造者，也是沉靜流派工作室的創辦人。更多作品與資訊見 https://silentschool.studio/zh。",
    en: "My legal name is 許文耀. HI-JIU was the name I used in my earlier livestream work; SHEN YAO888PI is the name I later used as an architect. I created the Responsibility Chain Language Model and founded Serene School Studio. I began writing these pieces in 2025 and built SCBKR in 2026. I sign my work and take responsibility for its subject and consequences. My studio is at https://silentschool.studio/en.",
  },
  preview: {
    zh: {
      label: "閱讀第一部試讀",
      publicUrl:
        "/media/books/stillness-is-a-language/preview-zh-part-one.pdf",
      format: "PDF",
      scope: "正式排版第 1–17 頁；至第一部〈聽見沉默〉第五篇結束。",
      proportion: "17 / 76 pages · 22.4%",
    },
    en: {
      label: "Read Part One",
      publicUrl: "/en/books/stillness-is-a-language/preview",
      format: "Web reader",
      scope:
        "Author’s Preface, A Note on Reading, and all five essays in Part One: Hearing Silence.",
      proportion: "Approximately 16.46% of the complete English manuscript by word count (2,305 / 14,004 words)",
    },
  },
  stores: {
    zh: {
      state: "publicly-available" as BookStoreState,
      platform: "Pubu",
      price: "NT$199",
      url: stillnessPubuUrl,
      label: "在 Pubu 購買繁中完整版",
      note:
        "Pubu 商品頁已公開；2026 年 10 月 12 日上傳的修正版 EPUB 當時仍在更新排隊轉檔。",
    },
    en: {
      state: "not-yet-for-sale" as BookStoreState,
      platform: "Google Play Books",
      price: "US$6.25",
      url: null,
      label: "Not yet available for sale",
      note:
        "The final fidelity-corrected EPUB remains local and has not been uploaded. Google Play Books account review was still pending on October 12, 2026. No public English product URL has been verified, so no purchase link is exposed.",
    },
  },
  sourceState: {
    checkedAt: "2026-10-12",
    fullChinesePdfPublic: false,
    fullChineseEpubPublic: false,
    fullEnglishManuscriptPublic: false,
    fullEnglishEpubPublic: false,
  },
} as const;

export const booksHubEntries: readonly BookHubEntry[] = [
  {
    id: "stillness-is-a-language",
    route: stillnessIsALanguage.detailRoute,
    coverSrc: stillnessIsALanguage.coverSrc,
    coverAlt: stillnessIsALanguage.coverAlt,
    eyebrow: {
      zh: "散文 · 人文思考 · 自行出版",
      en: "LITERARY ESSAYS · REFLECTION · INDEPENDENTLY PUBLISHED",
    },
    title: {
      zh: stillnessIsALanguage.edition.zh.title,
      en: stillnessIsALanguage.edition.en.title,
    },
    subtitle: {
      zh: stillnessIsALanguage.edition.zh.subtitle,
      en: stillnessIsALanguage.edition.en.subtitle,
    },
    summary: {
      zh: stillnessIsALanguage.description.zh[0],
      en: stillnessIsALanguage.description.en[0],
    },
    status: {
      zh: "繁中版已出版 · 第一部公開試讀",
      en: "ZH EDITION PUBLISHED · EN PART ONE PREVIEW · EN STORE NOT PUBLIC",
    },
    cta: { zh: "進入書籍", en: "ENTER BOOK" },
  },
  {
    id: "interrogation-room",
    route: "/novel/interrogation-room",
    coverSrc: {
      zh: "/media/novel/interrogation-room-poster.png",
      en: "/media/novel/interrogation-room-poster.png",
    },
    coverAlt: {
      zh: "《審訊室存在過的名字》原始預告海報",
      en: "Original promotional poster for The Name That Existed in the Interrogation Room",
    },
    eyebrow: {
      zh: "犯罪懸疑 · 世界運行敘事",
      en: "CRIME SUSPENSE · WORLD-RUN NARRATIVE",
    },
    title: {
      zh: "審訊室存在過的名字",
      en: "The Name That Existed in the Interrogation Room",
    },
    subtitle: {
      zh: "所有人都進過審訊室，只有一個名字留了下來。",
      en: "Many entered the interrogation room. Only one name remained.",
    },
    summary: {
      zh: "八點十七分，審訊室迎來一件看似尋常的案件。沈耀不急著讓標籤代替判斷，而是追問行動、規則、證據與責任各自落在誰身上。",
      en: "At 8:17 a.m., an apparently ordinary case reaches the interrogation room. Shen-Yao refuses to let a label stand in for judgment and traces action, rules, evidence, and responsibility.",
    },
    status: {
      zh: "作品進行中 · 正文暫不公開",
      en: "WORK IN PROGRESS · MANUSCRIPT NOT PUBLIC",
    },
    cta: { zh: "查看作品", en: "VIEW WORK" },
  },
];
