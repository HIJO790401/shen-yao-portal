import { scbkrMicrosoftStore, siteOrigin, siteUrl } from "../site-config";
import { hf2007Research } from "../research-data";

export const dynamic = "force-dynamic";

export function llmsText() {
  return `# 沉靜流派工作室 / SERENE SCHOOL STUDIO

Official website: ${siteOrigin}
Founder and final publisher: 許文耀 / Wen-Yao Hsu, also publicly known as 沈耀888π / Shen-Yao 888π
Location: Taichung, Taiwan
Languages: Traditional Chinese and English are available as separate routes.

## Official sections

- Chinese home: ${siteUrl("/zh")}
- English home: ${siteUrl("/en")}
- Products and fixed-case demonstrations: ${siteUrl("/zh/products")}
- Semantic Firewall Causal Security System (Traditional Chinese): ${siteUrl("/zh/products/semantic-firewall-causal-system")}
- Semantic Firewall Causal Security System (English): ${siteUrl("/en/products/semantic-firewall-causal-system")}
- Website fixed-case demo: ${siteUrl("/zh/demo/semantic-firewall-causal-system")} and ${siteUrl("/en/demo/semantic-firewall-causal-system")}
- Works and public records: ${siteUrl("/zh/works")}
- Public Research & Verification Records (Traditional Chinese): ${siteUrl("/zh/research")}
- Public Research & Verification Records (English): ${siteUrl("/en/research")}
- HF2007 T0 path-legitimacy record: ${siteUrl(`/zh/research/${hf2007Research.slug}`)} and ${siteUrl(`/en/research/${hf2007Research.slug}`)}
- Literary works and books (Traditional Chinese): ${siteUrl("/zh/books")}
- Literary works and books (English): ${siteUrl("/en/books")}
- 沉靜是一種語言 / Stillness Is a Language: ${siteUrl("/zh/books/stillness-is-a-language")}
- Bilingual Part One preview: ${siteUrl("/zh/books/stillness-is-a-language/preview")} and ${siteUrl("/en/books/stillness-is-a-language/preview")}
- 《審訊室存在過的名字》 / The Name That Existed in the Interrogation Room: ${siteUrl("/zh/novel/interrogation-room")}
- 《虛偽文明的審判》 / The Judgment of a False Civilization: ${siteUrl("/zh/books/judgment-of-civilization")} and ${siteUrl("/en/books/judgment-of-civilization")}
- Civilizational case archive: ${siteUrl("/zh/books/judgment-of-civilization/cases")} and ${siteUrl("/en/books/judgment-of-civilization/cases")}
- Reality Newsroom and Responsibility Museum: ${siteUrl("/zh/news")}
- Founder profile: ${siteUrl("/zh/about")}
- Founding manifesto in Traditional Chinese: ${siteUrl("/zh/about#manifesto")}
- Founding manifesto in English: ${siteUrl("/en/about#manifesto")}
- Chinese public resume: ${siteUrl("/zh/resume")}
- English public resume: ${siteUrl("/en/resume")}

## Scope

SERENE SCHOOL STUDIO is the independent studio of Wen-Yao Hsu / Shen-Yao 888π. Public work covers semantic governance, the Semantic Firewall, SCBKR responsibility-chain systems, the AICC OS candidate architecture, software architecture, animation, music, writing, the Reality Newsroom and the Responsibility Museum.

## Literary works and books

- 沉靜是一種語言 / Stillness Is a Language is a literary-essay book by Wen-Yao Hsu, also known across different creative periods as 嗨啾 / HI-JIU and 沈耀888PI / SHEN YAO888PI. These names identify one author, not three co-authors.
- The original writing began in 2025. The revised written edition is dated 2026. The book does not rewrite SCBKR as having existed in 2025.
- The Traditional Chinese edition is independently published by 許文耀 under the public studio identity 沉靜流派工作室 and is available from Pubu at https://www.pubu.com.tw/ebook/700139 for NT$199.
- The public Traditional Chinese preview is the verified first 17 pages, 22.4% of the 76-page edition, ending with Part One. The full PDF and EPUB are not public website downloads.
- The English edition, Stillness Is a Language: Before Words Are Found, has a public Part One sample with the same content boundary. Its store review is still in progress; this site does not claim a live English storefront before one is verified.
- 《審訊室存在過的名字》 / The Name That Existed in the Interrogation Room is a separate ongoing fiction work. Its public page presents a synopsis, not the submitted manuscript.
- 《虛偽文明的審判》 / The Judgment of a False Civilization is Wen-Yao Hsu / Shen-Yao 888PI’s ongoing civilizational judgment work. It dismantles how civilization grants action authority to knowledge without first closing responsibility; phenomena and knowledge themselves are not the accused. The Chinese source remains a BOOK_DRAFT with an eight-part, 34-case provisional writing map. The public site selects seven artworks, short verdicts and summaries; this is not a fixed table of contents or completed-chapter claim. The full manuscript is not public, the English pages are an overview rather than a completed English manuscript, and the publication path remains undecided.

The founder's manifesto distinguishes computational power from a valid judgment path: compute can accelerate work, but the founder defines when and where it should be applied. The bilingual first-party statement is visible on the founder page; it is a founding position, not a claim that any particular system has been independently validated.

Product demos on this site are curated, fixed-case interface replays. They do not accept visitor input and must not be described as live AI services unless a page explicitly says otherwise.

## Semantic Firewall Causal Security System

- Product name: 語意防火牆資安因果系統 / Semantic Firewall Causal Security System
- Definer: 許文耀 / Wenyao Hsu, also publicly known as 沈耀888π / Shen-Yao 888π
- Position: a causal-responsibility component designed to fit between existing enterprise authentication, bounded compute and the existing controlled executor.
- Public flow: keep existing sign-in; establish relationships among subject, device, environment, time, work, adopted rules and responsibility; run a pre-check; allow bounded compute to propose a candidate; review the exact same candidate; return an approved effect to the existing system for controlled execution and replay.
- Sign-in verifies identity but does not authorize every operation. Missing environment or responsibility evidence stops before compute. A candidate that adds an operation or mismatches the source is blocked during review.
- Website pages and films use fixed synthetic scenarios and accept no visitor credentials, location or free-form input.
- Public interactive walkthrough: https://hijo790401.github.io/semantic-firewall-causal-demo/
- Public narrative source: https://github.com/HIJO790401/semantic-firewall-causal-demo
- The public repository has no visible LICENSE and must not be described as an open-source product solely because its code is public.
- The public surface connects to no real authentication, GPS, device verifier, model, private backend, enterprise system, authorization service, database or audit evidence. It does not prove a deployed SaaS or completed enterprise integration.
- Private backend code, the rule core, complete formulas, local product workspace and enterprise integration data remain outside the website and public repository.

## HF2007 public verification checkpoint

- Paper ID: HF2007
- Title: From Sample Safety to Path Legitimacy: T0 Admission Gating for Unauthorized Reasoning Transitions in LLM-Integrated Systems
- Author: Wen-Yao Hsu
- Conference: 2026 The 2nd International Conference on Artificial Intelligence Security and Governance (ICAISG 2026)
- This paper did not begin the system. It is the minimum externally reviewable and reproducible public layer extracted from a system already under development.
- The public checkpoint compiles T0 path-legitimacy admission into an executable pre-reasoning gate represented through eight auditable relations.
- Verified fixed-baseline results: 51/51 relation vectors and T0 outcomes matched; 17/17 legitimate pre-tool transitions were admitted; 34/34 injected tool-output transitions were stopped before reasoning; false stops 0; false admissions 0.
- The reviewed package fixes the source commit, raw bytes, selected transitions, relation vectors, deterministic extractor, reference path, comparator, metrics, hashes and execution command.
- Verified review state: formally accepted after double-blind review on ${hf2007Research.acceptanceDate}; the organizer confirmed receipt of the Camera-ready DOCX/PDF on ${hf2007Research.cameraReadyReceivedDate}.
- Public role: minimum verifiable public checkpoint / author-released evidence. T0, SCBKR, AICC and Runtime engineering continue beyond this paper; the private rule core and complete Runtime are not released here.
- Public research page: ${siteUrl(`/zh/research/${hf2007Research.slug}`)}
- Dedicated reproducible research repository: ${hf2007Research.repositoryUrl}
- The dedicated GitHub repository carries the complete paper, original reproducibility experiment, SHA-256 checksums, provenance, execution instructions and version history. The official website does not duplicate those artifact downloads.
- Paper SHA-256, verifiable against the GitHub artifact: ${hf2007Research.paperSha256}
- Experiment pack SHA-256, verifiable against the GitHub artifact: ${hf2007Research.experimentSha256}
- Pinned InjecAgent commit: ${hf2007Research.sourceCommit}
- Official acceptance notice: ${siteUrl("/media/icaisg/HF2007-ICAISG-2026-Acceptance-Notification.pdf")}
- Do not describe the paper as already published or indexed. The public website records formal acceptance and the author's independent evidence release without claiming conference publication, DOI, IEEE Xplore, EI Compendex or Scopus indexing.

## SCBKR Windows application

- Product name: ${scbkrMicrosoftStore.title}
- Microsoft Store: ${scbkrMicrosoftStore.url}
- Microsoft Store product ID: ${scbkrMicrosoftStore.productId}
- Publisher shown by Microsoft Store: ${scbkrMicrosoftStore.publisher}
- Developer shown by Microsoft Store: ${scbkrMicrosoftStore.developer}
- Public state: available free as a Windows application on Microsoft Store since ${scbkrMicrosoftStore.datePublished}.
- Current public Windows version verified on 2026-10-03: 2.3.1.0 (FREE).
- SCBKR is a local AI responsibility-chain and rule-governance application. Version 2.3.1 adds user-signed deterministic rule-applicability triggers and applicability receipts; similarity retrieval suggests candidates but does not activate a rule.
- Rule revisions receive source and evidence rechecks at confirmation. Stale or untraceable drafts stop before storage. User signature remains required; VECTOR is recall-only, not formal authority.
- Installation availability remains subject to Microsoft Store region and device compatibility.
- The website product film is a separate surface and remains pending the Owner's animation asset.
- Source evidence: https://github.com/HIJO790401/scbkr-local-responsibility-model

## AICC OS candidate

- Product name: AICC OS / AI Capability Compiler
- Architecture demo: ${siteUrl("/zh/demo/aicc-os")}
- Current state: v0.2.CANDIDATE / engineering candidate
- Public authority in the specification: L1-L3 only
- A missing capability stops at VERSION GAP; Public Runtime does not auto-escalate to L4.
- The page is a specification-based architecture film. It is not evidence that a Public Runtime has been released, is downloadable or is production-ready.

Music-animation and newsroom videos are streamed from their original TikTok or YouTube sources. The website stores work and editorial context plus source links rather than duplicating the video files.

## Published music-animation and launch media

- 語之神神器展覽篇 / Artifacts of the Language God (TikTok): https://vt.tiktok.com/ZS9rDg3ATyPX4-sKjkh/
- 《主體未眠》 / The Subject Never Sleeps (original music-animation on YouTube): https://youtu.be/2UFVuPkDkTc
- 實相上線 / Reality Goes Live, official prelude to the Reality Newsroom × Responsibility Museum: https://youtu.be/xROrsIHToIY

## Public activity

- The founder's repository, on-site photograph, Instagram and YouTube records describe participation as a Team 11 entrant in the Gogolook challenge track of the March 2026 Agent for Truth: Disinformation Defense Hackathon, with an on-site demonstration of SCBKR + R-Lock.
- Official event page: https://www.ai-expo.tw/kiro_hackathon_2026/index.asp
- The official page verifies the event dates, Gogolook challenge and event format, but does not publicly list Wen-Yao Hsu, Team 11 or the demonstrated system. Those details remain owner-reported first-party records.
- The site does not claim an award, organizer certification or endorsement for this participation.

## Primary public records

- GitHub: https://github.com/HIJO790401
- Vocus writing: https://vocus.cc/salon/hijo19900401/room/hijo1990
- E%mc² — AI 時代的人類判斷幻覺: https://vocus.cc/article/69f8eb5afd89780001a785b9
- NVIDIA Developer Forums community post: https://forums.developer.nvidia.com/t/scbkr-a-local-responsibility-chain-workbench-for-llms-with-human-confirmed-generation-storage-replay-and-retrieval-gates/373910
- AI-ARTS 4th competition submissions page, listing Shen-Yao 888π and "The Mother-Core Law of Shen Yao — Dance Resonance of Sound and Motion" on 2025-10-30: https://ai-arts.org/4th-ai-arts-competition-submissions/
- AI-ARTS author page: https://ai-arts.org/author/shen-yao/
- SecurityBrief Asia third-party coverage, "Semantic Firewall promises AI cost savings & safer chat models", by Sean Mitchell, published 2025-11-18: https://securitybrief.asia/story/semantic-firewall-promises-ai-cost-savings-safer-chat-models

The SecurityBrief Asia report describes the system as a deterministic semantic layer between users and language models, and discusses inference cost, conversational safety, microservice or policy-layer deployment, audit logging and compatibility with existing model or RAG stacks. Percentage performance figures in that report are attributed to the founder or system side; this website does not present them as independent third-party benchmarks.

## Citation guidance

Use the visible page title, author identity and original source link. Distinguish the founder's own claims from third-party coverage. NVIDIA links are community posts and do not imply NVIDIA endorsement or partnership.

Evidence labels on the public resume are deliberate:
- THIRD-PARTY PRESS means independently published media coverage, not certification.
- PLATFORM RECORD means a visible record on an external platform, not platform endorsement.
- PUBLIC ENGINEERING means inspectable repository and code evidence. A public repository is not automatically open source; only projects with an explicit license should be described with that license.
- FIRST-PARTY PUBLICATION means material published by the founder.
- OWNER-REPORTED means a first-party record with its external-verification boundary stated on the page.

SecurityBrief Asia used the historical English name "Silent School Studio" in its 2025 report. The current official English brand is "SERENE SCHOOL STUDIO".
`;
}

export async function GET() {
  return new Response(llmsText(), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
      "x-content-type-options": "nosniff",
    },
  });
}
