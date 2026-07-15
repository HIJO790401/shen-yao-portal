import Image from "next/image";
import Link from "next/link";
import { DemoStage } from "./components/DemoStage";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { Lang } from "./components/LanguageControl";
import { newsItems, products } from "./site-data";

export default function Home() {
  return <>
    <SiteHeader />
    <main>
      <section className="hero">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-orb" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow"><span><Lang zh="沉靜流派工作室" en="SILENT SCHOOL STUDIO" /></span> TAIWAN / 2026</p>
          <p className="founder-line"><Lang zh="沈耀888π／許文耀" en="SHEN-YAO / WEN-YAO HSU" /></p>
          <h1><Lang zh={<>AI 行動之前，<br/><em>先建立責任。</em></>} en={<>Before AI can act,<br/><em>responsibility must exist.</em></>} /></h1>
          <p className="hero-lead"><Lang zh="獨立系統架構師沈耀打造語意防火牆、SCBKR／AVRCK 與決策責任鏈，同時以動畫和音樂把抽象系統轉成可感知的作品。" en="Independent systems architect Wen-Yao Hsu builds Semantic Firewall, SCBKR / AVRCK and decision-responsibility systems—then turns abstract structures into motion and music." /></p>
          <div className="actions"><Link className="button primary" href="/products"><Lang zh="探索系統" en="EXPLORE SYSTEMS" /> <span>↗</span></Link><Link className="button ghost" href="/demo/anti-scam"><Lang zh="觀看動畫 Demo" en="WATCH MOTION DEMO" /></Link></div>
        </div>
        <div className="hero-visual"><DemoStage /><p><b>SCBKR / LIVE STRUCTURE</b><span>SUBJECT · CAUSALITY · BOUNDARY · KEY · RESPONSIBILITY</span></p></div>
        <div className="hero-foot"><span>SCROLL TO ENTER</span><span>語意治理 × 責任鏈 × 決策資格</span></div>
      </section>

      <section className="statement section-pad">
        <p className="section-index">01 / POSITION</p>
        <div><h2><Lang zh={<>這不是另一個 AI 工具。<br/>這是模型行動前的<span>責任控制層。</span></>} en={<>This is not another AI tool.<br/>It is a <span>responsibility control layer.</span></>} /></h2></div>
        <div className="statement-metrics"><p><b>05</b><span>SCBKR AUDIT AXES</span></p><p><b>01</b><span>FINAL OWNER</span></p><p><b>∞</b><span>REPLAYABLE TRACE</span></p></div>
      </section>

      <section className="products section-pad">
        <div className="section-head"><div><p className="section-index">02 / SYSTEMS</p><h2><Lang zh={<>核心產品與<br/>責任鏈應用</>} en={<>CORE SYSTEMS &<br/>RESPONSIBILITY APPS</>} /></h2></div><p><Lang zh="每個系統都有獨立的產品敘事、動畫流程與公開證據。" en="Every system has its own product story, motion flow and public evidence." /></p></div>
        <div className="product-grid">
          {products.map((product, i) => <Link href={product.href} className={`product-card ${product.tone}`} key={product.slug}>
            <div className="product-top"><span>{product.index}</span><small>{product.kind}</small></div>
            <div className="mini-visual"><i/><i/><i/><b>{i === 0 ? "Rπ" : i === 1 ? "VOID" : i === 2 ? "TIRC" : "WIF"}</b></div>
            <h3><Lang zh={product.title} en={product.en} /></h3><p><Lang zh={product.description} en={product.descriptionEn} /></p><div className="card-link"><Lang zh="觀看系統" en="VIEW SYSTEM" /> <span>↗</span></div>
          </Link>)}
        </div>
        <Link className="text-link" href="/products">查看全部作品與歷程系統 <span>VIEW ALL SYSTEMS ↗</span></Link>
      </section>

      <section className="demo-feature section-pad">
        <div className="demo-copy"><p className="section-index">03 / MOTION DEMO</p><h2><Lang zh={<>不是截圖。<br/>讓系統自己演給你看。</>} en={<>NOT A SCREENSHOT.<br/>LET THE SYSTEM PERFORM.</>} /></h2><p><Lang zh="不用輸入資料。每個 Demo 以電影式介面動畫呈現運算、責任鏈與結果，文字結構同時供搜尋引擎與 AI 理解。" en="No input required. Each demo uses cinematic interface animation to reveal computation, responsibility chains and outcomes while preserving crawlable text." /></p><Link className="button primary" href="/demo/anti-scam"><Lang zh="播放反詐 Demo" en="PLAY ANTI-SCAM DEMO" /> <span>▶</span></Link></div>
        <DemoStage variant="scam" />
      </section>

      <section className="news-section section-pad">
        <div className="section-head"><div><p className="section-index">04 / NEWSROOM</p><h2><Lang zh="國際實相新聞台" en="INTERNATIONAL REALITY NEWS" /></h2></div><p><Lang zh="報導、責任與長期回放的獨立公共界面。" en="An independent public interface for reporting, responsibility and long-term replay." /></p></div>
        <div className="news-list">{newsItems.map((item) => <a href={item.href} key={item.title} className="news-row"><div><span>{item.date}</span><b>{item.category}</b></div><h3><Lang zh={item.title} en={item.en} /></h3><p><Lang zh={item.excerpt} en={item.excerptEn} /></p><i>↗</i></a>)}</div>
        <Link className="text-link" href="/news">進入完整新聞台 <span>ENTER NEWSROOM ↗</span></Link>
      </section>

      <section className="founder section-pad" id="founder">
        <div className="portrait-wrap"><Image src="/media/founder.jpg" alt="沈耀888π／許文耀" fill sizes="(max-width: 800px) 100vw, 42vw" /></div>
        <div className="founder-copy"><p className="section-index">05 / FOUNDER</p><div className="studio-lockup"><Image src="/media/chenjingliupai-logo.jpg" alt="沉靜流派品牌標誌" width={1500} height={1500} /></div><h2>沈耀888π<br/><span>許文耀 / Wen-Yao Hsu</span></h2><p className="founder-role"><Lang zh={<>沉靜流派工作室・語意防火牆創辦人<br/>SCBKR／AVRCK 系統架構師・動畫與音樂創作者</>} en={<>Founder of Silent School Studio & Semantic Firewall<br/>SCBKR / AVRCK Systems Architect · Animation & Music Creator</>} /></p><p className="truth-note"><Lang zh="獨立研發、獨立設計、獨立負責；不是公司團隊包裝，而是一個人的完整創作與系統架構。" en="Independently researched, designed and owned—not presented as a corporate team, but as one person's complete creative and systems practice." /></p><blockquote><Lang zh="「治理不是讓模型更快回答，而是讓模型在回答、行動與記憶入庫之前，先交出責任鏈。」" en="“Governance is not about making a model answer faster. It is about requiring a responsibility chain before answers, actions or memory.”" /></blockquote><div className="actions"><a className="button primary" href="/Wen-Yao-Hsu-Resume.pdf"><Lang zh="下載履歷" en="DOWNLOAD RESUME" /></a><a className="button ghost" href="mailto:ken0963521@gmail.com"><Lang zh="聯絡合作" en="CONTACT" /></a></div></div>
      </section>

      <section className="public-work section-pad">
        <div className="section-head"><div><p className="section-index">06 / PUBLIC WORK</p><h2><Lang zh={<>公開研究與<br/>外部行動</>} en={<>PUBLIC RESEARCH &<br/>EXTERNAL ACTION</>} /></h2></div><p><Lang zh="精選可直接查證的文章、提案與外部紀錄。" en="Selected writing, proposals and external records that can be verified directly." /></p></div>
        <div className="public-work-grid">
          <a href="https://vocus.cc/article/6a49f63dfd897800010e5197"><span>VOCUS · 2026.07</span><h3><Lang zh="第 0 定理" en="The Zeroth Theorem" /></h3><p><Lang zh="任何答案被採用前，先審主體、邊界、責任與回放。" en="Audit subject, boundary, responsibility and replay before any answer is accepted." /></p><b>↗</b></a>
          <a href="https://vocus.cc/article/6a3c8bdbfd897800013dbd47"><span>VOCUS · 2026.06</span><h3>SCBKR Local Responsibility Chain</h3><p><Lang zh="本地 AI 責任鏈控制系統的公開說明。" en="A public explanation of the local AI responsibility-chain control system." /></p><b>↗</b></a>
          <a href="https://vocus.cc/article/693fd66bfd89780001a53801"><span>VOCUS · 2025.12</span><h3><Lang zh="NVIDIA 泡沫悖論" en="The NVIDIA Bubble Paradox" /></h3><p><Lang zh="從算力、能耗與責任外包檢視 AI 基礎設施敘事。" en="A critique of AI infrastructure narratives through compute, energy and outsourced responsibility." /></p><b>↗</b></a>
          <a href="https://github.com/deepseek-ai/DeepSeek-V3/issues/1088"><span>GITHUB · ISSUE #1088</span><h3>DeepSeek-V4 Diagnostic</h3><p><Lang zh="語意法律、算力治理與責任鏈的公開技術交流。" en="A public technical exchange on semantic law, compute governance and responsibility chains." /></p><b>↗</b></a>
        </div>
      </section>

      <section className="evidence section-pad" id="evidence"><p className="section-index">07 / PUBLIC EVIDENCE</p><h2><Lang zh={<>所有主張，都必須有<br/><span>可回放的公開路徑。</span></>} en={<>EVERY CLAIM NEEDS<br/><span>A REPLAYABLE PUBLIC PATH.</span></>} /></h2><div className="evidence-links"><a href="https://github.com/HIJO790401">GitHub Repository <b>↗</b></a><a href="https://www.linkedin.com/in/yao-shen-150ab93b2">LinkedIn Profile <b>↗</b></a><a href="https://www.youtube.com/@JM-qy7gv">Official YouTube <b>↗</b></a><a href="https://securitybrief.asia/story/semantic-firewall-promises-ai-cost-savings-safer-chat-models">Media Coverage <b>↗</b></a></div></section>
    </main>
    <SiteFooter />
  </>;
}
