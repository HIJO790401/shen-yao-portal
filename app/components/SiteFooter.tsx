import Link from "next/link";
import { Lang } from "./LanguageControl";

export function SiteFooter() {
  return <footer className="site-footer">
    <div><span className="brand-sigil">沉</span><p><b><Lang zh="沉靜流派工作室｜沈耀888π／許文耀" en="SILENT SCHOOL STUDIO | SHEN-YAO / WEN-YAO HSU" /></b><br/><Lang zh="語意治理・動畫・音樂創作" en="Semantic Governance · Animation · Music" /></p></div>
    <div className="footer-links"><Link href="/products">Products</Link><Link href="/news">Newsroom</Link><a href="https://github.com/HIJO790401">GitHub</a><a href="mailto:ken0963521@gmail.com">Contact</a></div>
    <p className="copyright">© 2026 SILENT SCHOOL STUDIO / SHEN-YAO OFFICIAL. TAIWAN.</p>
  </footer>;
}
