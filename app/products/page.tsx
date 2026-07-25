import type { Metadata } from "next";
import Image from "next/image";
import { Lang, LocalizedLink } from "../components/LanguageControl";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { productFamilies } from "../product-audit-data";
import { demoRouteByProductCode } from "../showcase-data";
import demoStyles from "../demo-system.module.css";

export const metadata: Metadata = {
  title: "產品與工程作品",
  description: "沉靜流派工作室的語意防火牆、SCBKR、WIF、TIRC 與媒體作品；依原始碼核實能力、邊界與展示狀態。",
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

      <section className="runtime-placeholder-v3" aria-labelledby="runtime-placeholder-title">
        <div>
          <span>05 · MODEL RUNTIME 0/1</span>
          <b><i /> <Lang zh="開發中" en="IN DEVELOPMENT" /></b>
        </div>
        <h2 id="runtime-placeholder-title"><Lang zh="模型 Runtime 0/1 閘門監控系統" en="MODEL RUNTIME 0/1 GATE MONITORING SYSTEM" /></h2>
        <p>
          <Lang
            zh="這是駕照指定的合法產品空位。待 Owner 提供可公開作品連結、輸入輸出與失敗邊界證據後，才會接上專屬 Demo；目前不建立假網址，也不宣稱已完成。"
            en="This is the licensed product placeholder. Its dedicated demo will be connected only after the Owner supplies a publishable project link plus input, output and failure-boundary evidence. No fabricated URL or completion claim is present."
          />
        </p>
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
        <p><Lang zh="十三套作品已接上各自的固定案例與專屬時間軸；其中包含規則掃描、六案反詐、metadata-only 記憶索引、安全合成文件、非醫療支持案例、確定性哨兵與真實 2D Canvas。僅 SCBKR 本地責任鏈模型依 Owner 指示暫緩動畫。" en="Thirteen works now have dedicated fixed-case timelines, including rule scanning, six anti-scam cases, a metadata-only memory index, a safe synthetic document, non-medical support cases, a deterministic sentinel and a real 2D Canvas. Only the SCBKR Local Responsibility Model remains motion-deferred by the owner." /></p>
        <div><LocalizedLink href="/news"><Lang zh="進入新聞台" en="OPEN NEWSROOM" /> <span>↗</span></LocalizedLink><LocalizedLink href="/"><Lang zh="回到官網" en="BACK TO STUDIO" /> <span>↗</span></LocalizedLink></div>
      </section>
    </main>
    <SiteFooter />
  </>;
}
