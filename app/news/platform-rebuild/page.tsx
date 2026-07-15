import type { Metadata } from "next";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
export const metadata: Metadata = { title: "沈耀官方網站進入公司級重構階段", description: "主站、產品動畫與國際實相新聞台整合計畫。" };
export default function Article(){return <><SiteHeader/><main className="article-page"><article><p className="eyebrow"><span>PLATFORM REPORT</span> 2026.07.15</p><h1>沈耀官方網站進入<br/>公司級重構階段</h1><p className="article-lead">主站、產品動畫展示與國際實相新聞台，將整合成同一個可搜尋、可查證、可長期回放的公開平台。</p><hr/><h2>一個人，也可以建立完整系統</h2><p>本平台由沈耀888π／許文耀獨立研究、設計與開發。它採用公司級網站的資訊架構與視覺品質，但不虛構團隊或組織規模；所有作品、判準與最終責任皆回到同一位具名創建者。</p><h2>產品不再只是靜態頁面</h2><p>SCBKR、反詐騙語意防火牆、TIRC 與 WIF 等作品將以動畫化產品流程呈現，同時保留完整文字、技術說明與公開證據，使人類訪客、搜尋引擎與 AI 系統都能理解。</p><blockquote>公司級品質，不等於虛構公司。專業來自結構、證據、責任與可持續更新。</blockquote><p className="article-sign">沈耀888π／許文耀<br/><span>Independent Developer & System Architect<br/>Taichung, Taiwan</span></p></article></main><SiteFooter/></>}
