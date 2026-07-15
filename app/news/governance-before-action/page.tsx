import type { Metadata } from "next";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
export const metadata: Metadata = { title: "治理不是讓模型更快回答", description: "AI 模型行動前的責任鏈原則。" };
export default function Article(){return <><SiteHeader/><main className="article-page"><article><p className="eyebrow"><span>GOVERNANCE</span> 2026.03.30</p><h1>治理不是讓模型<br/>更快回答</h1><p className="article-lead">治理必須在模型回答、行動、記憶入庫與證據重用之前，先建立責任鏈。</p><hr/><h2>先審資格，再接受答案</h2><p>任何輸出在進入人的決策鏈之前，都必須交代主體、因果、邊界、依據與責任。沒有可驗證的責任結構，再流暢的答案也只是未取得決策資格的輸出。</p><div className="formula">S × C × B × K × R → <b>RETURN / VOID</b></div><blockquote>Responsibility must exist before intelligence is allowed to act.</blockquote><p className="article-sign">沈耀888π／許文耀<br/><span>Founder of Semantic Firewall</span></p></article></main><SiteFooter/></>}
