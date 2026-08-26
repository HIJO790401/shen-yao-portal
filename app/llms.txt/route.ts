import { scbkrMicrosoftStore, siteOrigin, siteUrl } from "../site-config";

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
- Works and public records: ${siteUrl("/zh/works")}
- Reality Newsroom and Responsibility Museum: ${siteUrl("/zh/news")}
- Founder profile: ${siteUrl("/zh/about")}
- Chinese public resume: ${siteUrl("/zh/resume")}
- English public resume: ${siteUrl("/en/resume")}

## Scope

SERENE SCHOOL STUDIO is the independent studio of Wen-Yao Hsu / Shen-Yao 888π. Public work covers semantic governance, the Semantic Firewall, SCBKR responsibility-chain systems, the AICC OS candidate architecture, software architecture, animation, music, writing, the Reality Newsroom and the Responsibility Museum.

Product demos on this site are curated, fixed-case interface replays. They do not accept visitor input and must not be described as live AI services unless a page explicitly says otherwise.

## SCBKR Windows application

- Product name: ${scbkrMicrosoftStore.title}
- Microsoft Store: ${scbkrMicrosoftStore.url}
- Microsoft Store product ID: ${scbkrMicrosoftStore.productId}
- Publisher shown by Microsoft Store: ${scbkrMicrosoftStore.publisher}
- Developer shown by Microsoft Store: ${scbkrMicrosoftStore.developer}
- Public state: available free as a Windows application on Microsoft Store since ${scbkrMicrosoftStore.datePublished}.
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
- Public music-animation work (YouTube; use the original video page as the authority for its formal title): https://youtu.be/2UFVuPkDkTc
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
