import type { Metadata } from "next";
import Image from "next/image";
import { Lang, LocalizedLink } from "../components/LanguageControl";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { productFamilies } from "../product-audit-data";
import { demoRouteByProductCode } from "../showcase-data";
import { localizedAlternates } from "../site-config";
import demoStyles from "../demo-system.module.css";

export const metadata: Metadata = {
  title: "產品與工程作品",
  description: "沉靜流派工作室的產品與工程作品：已於 Microsoft Store 免費上架的 SCBKR、AICC OS v0.2.CANDIDATE 候選架構、語意防火牆、WIF、TIRC 與固定案例展示。",
  alternates: localizedAlternates("zh", "/products"),
  openGraph: { url: "/zh/products" },
};

export default function ProductsPage() {
  const count = productFamilies.reduce((sum, family) => sum + family.products.length, 0);

  return <>
    <SiteHeader />
    <main className="products-audit-v3">
      <section className="products-hero-v3">
        <div className="products-hero-copy-v3">
          <p className="brand-section-label">CODE-AUDITED SYSTEM ARCHIVE · 2026</p>
          <h1><Lang zh={<>不是把 Repo<br/>包裝成產品。</>} en={<>NOT REPACKAGING<br/>REPOSITORIES.</>} /></h1>
          <p className="products-hero-decree-v3"><Lang zh="是先讀懂每一段輸入、運算、輸出與失敗邊界，再決定它應該如何被看見。" en="Every input, computation, output and failure boundary is read before deciding how a system should be seen." /></p>
          <div className="products-audit-metrics-v3">
            <div><b>{count}</b><span><Lang zh="已盤點作品" en="AUDITED WORKS" /></span></div>
            <div><b>3</b><span><Lang zh="正確系統族" en="SYSTEM FAMILIES" /></span></div>
            <div><b>0</b><span><Lang zh="虛構能力" en="INVENTED CAPABILITIES" /></span></div>
          </div>
        </div>
        <div className="products-orbit-v3" aria-label="沉靜流派系統族視覺圖">
          <i className="products-orbit-ring ring-a" />
          <i className="products-orbit-ring ring-b" />
          <i className="products-orbit-ring ring-c" />
          <div className="products-orbit-core-v3"><Image src="/media/chenjingliupai-symbol.svg" alt="沉靜流派工作室水滴標誌" fill sizes="240px" priority /></div>
          <span className="orbit-label orbit-label-a">SEMANTIC<br/>FIREWALL</span>
          <span className="orbit-label orbit-label-b">RESPONSIBILITY<br/>GOVERNANCE</span>
          <span className="orbit-label orbit-label-c">CREATIVE<br/>MEDIA</span>
        </div>
      </section>

      <section className="audit-principle-v3">
        <span>SCBKR / π1</span>
        <h2><Lang zh={<>能展示多少，<br/><em>由證據決定。</em></>} en={<>EVIDENCE DECIDES<br/><em>WHAT CAN BE SHOWN.</em></>} /></h2>
        <div>
          <p><b>01</b><Lang zh="固定案例就標固定案例，不冒充即時 AI。" en="A fixed case stays labeled as a fixed case, never live AI." /></p>
          <p><b>02</b><Lang zh="估算值就標 Estimate，不冒充實測成本。" en="An estimate stays labeled Estimate, never measured cost." /></p>
          <p><b>03</b><Lang zh="失敗邊界公開標示，先修復再上動畫。" en="Failure boundaries stay visible; repair comes before motion." /></p>
        </div>
      </section>

      <nav className="product-family-nav-v3" aria-label="作品分類">
        {productFamilies.map((family) => <a key={family.id} href={`#${family.id}`}><span>{family.index}</span><Lang zh={family.titleZh} en={family.titleEn} /></a>)}
      </nav>

      <section className="runtime-placeholder-v3 aicc-product-v3" id="aicc-os" aria-labelledby="aicc-product-title">
        <div className="aicc-product-state-v3">
          <span>05 · AICC OS</span>
          <b><i /> <Lang zh="v0.2.CANDIDATE｜工程候選" en="v0.2.CANDIDATE · ENGINEERING CANDIDATE" /></b>
        </div>
        <div className="aicc-product-copy-v3">
          <p><Lang zh="沈耀律法｜本地 AI 執行與治理 Runtime" en="SHEN-YAO LAW · LOCAL AI EXECUTION & GOVERNANCE RUNTIME" /></p>
          <h2 id="aicc-product-title"><Lang zh="AICC 模組化能力編譯暨版本治理作業系統" en="AICC MODULAR CAPABILITY COMPILATION & VERSION GOVERNANCE OS" /></h2>
        </div>
        <div className="aicc-product-boundary-v3">
          <p><Lang
            zh="AICC 不是另一個大模型。它讓已知路徑走 L1、局部差異走 L2、合法能力組合走 L3；超出現行版本時停在 VERSION GAP，不自行升級到 L4。"
            en="AICC is not another model. Known paths use L1, local deltas use L2 and legal capability composition uses L3; anything outside the current version stops at VERSION GAP without automatic L4 escalation."
          /></p>
          <small><Lang
            zh="本頁只展示已定義的候選架構，不代表 Public Runtime 已正式發布或可下載。"
            en="This page presents the defined candidate architecture, not a released or downloadable Public Runtime."
          /></small>
          <LocalizedLink href="/demo/aicc-os"><Lang zh="觀看架構動畫" en="WATCH ARCHITECTURE DEMO" /> <span>▶</span></LocalizedLink>
        </div>
      </section>

      {productFamilies.map((family) => <section className="audited-family-v3" id={family.id} key={family.id}>
        <header className="audited-family-head-v3">
          <div><span>{family.index}</span><p>VERIFIED FAMILY</p></div>
          <div><h2><Lang zh={family.titleZh} en={family.titleEn} /></h2><p><Lang zh={family.introZh} en={family.introEn} /></p></div>
        </header>
        <div className="audited-product-grid-v3">
          {family.products.map((product) => {
            const film = demoRouteByProductCode[product.code];
            return <article className={`audited-product-card-v3 status-${product.status}`} key={product.code}>
              <div className="audited-product-top-v3"><span>{product.code}</span><b><i /> <Lang zh={product.statusZh} en={product.statusEn} /></b></div>
              <h3><Lang zh={product.titleZh} en={product.titleEn} /></h3>
              <dl>
                <div><dt><Lang zh="核實可說" en="VERIFIED" /></dt><dd><Lang zh={product.actualZh} en={product.actualEn} /></dd></div>
                <div><dt><Lang zh="不能宣稱" en="BOUNDARY" /></dt><dd><Lang zh={product.boundaryZh} en={product.boundaryEn} /></dd></div>
                <div><dt><Lang zh="展示施工" en="MOTION ROUTE" /></dt><dd><Lang zh={product.motionZh} en={product.motionEn} /></dd></div>
              </dl>
              <div className={demoStyles.productActions}>
                {product.storeUrl && <a href={product.storeUrl} target="_blank" rel="noreferrer"><Lang zh="Microsoft Store 免費取得" en="GET FREE ON MICROSOFT STORE" /> <span>↗</span></a>}
                {film?.status === "ready" ? <LocalizedLink href={`/demo/${film.slug}`}><Lang zh="觀看固定案例" en="WATCH FIXED CASE" /> <span>▶</span></LocalizedLink> :
                  film ? <LocalizedLink href={`/demo/${film.slug}`}><Lang zh={film.status === "repair" ? "查看修復狀態" : "查看暫緩原因"} en={film.status === "repair" ? "VIEW REPAIR STATE" : "VIEW DEFERRED STATE"} /> <span>→</span></LocalizedLink> : null}
                <a href={product.repo} target="_blank" rel="noreferrer"><Lang zh="原始碼證據" en="SOURCE EVIDENCE" /> <span>↗</span></a>
              </div>
            </article>;
          })}
        </div>
      </section>)}

      <section className="product-next-gate-v3">
        <p className="brand-section-label">NEXT CONSTRUCTION GATE</p>
        <h2><Lang zh={<>動畫不是裝飾。<br/>它必須重播真實運算。</>} en={<>MOTION IS NOT DECORATION.<br/>IT MUST REPLAY REAL COMPUTATION.</>} /></h2>
        <p><Lang zh="十四套作品已接上各自的固定案例或架構時間軸；其中包含 AICC v0.2.CANDIDATE 架構、規則掃描、六案反詐、metadata-only 記憶索引、安全合成文件、非醫療支持案例、確定性哨兵與真實 2D Canvas。僅 SCBKR 本地責任鏈模型依 Owner 指示暫緩動畫。" en="Fourteen works now have dedicated fixed-case or architecture timelines, including the AICC v0.2.CANDIDATE architecture, rule scanning, six anti-scam cases, a metadata-only memory index, a safe synthetic document, non-medical support cases, a deterministic sentinel and a real 2D Canvas. Only the SCBKR Local Responsibility Model remains motion-deferred by the owner." /></p>
        <div><LocalizedLink href="/news"><Lang zh="進入新聞台" en="OPEN NEWSROOM" /> <span>↗</span></LocalizedLink><LocalizedLink href="/"><Lang zh="回到官網" en="BACK TO STUDIO" /> <span>↗</span></LocalizedLink></div>
      </section>
    </main>
    <SiteFooter />
  </>;
}
