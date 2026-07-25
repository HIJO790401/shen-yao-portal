"use client";

import Image from "next/image";
import Link from "next/link";
import { Lang, LocalizedLink } from "./LanguageControl";
import styles from "./site-chrome.module.css";

export function SiteFooter() {
  return (
    <footer className={`site-footer ${styles.footer}`}>
      <div className={styles.footerTop}>
        <LocalizedLink className={styles.footerBrand} href="/">
          <span className={styles.footerLogo}><Image src="/media/chenjingliupai-symbol.svg" alt="" fill sizes="64px" /></span>
          <span>
            <b><Lang zh="沉靜流派工作室" en="SERENE SCHOOL STUDIO" /></b>
            <small><Lang zh="許文耀／沈耀888π" en="WEN-YAO HSU / SHEN-YAO 888π" /></small>
          </span>
        </LocalizedLink>
        <p className={styles.footerStatement}>
          <Lang
            zh="獨立系統架構、語意治理、動畫與音樂。以可查證的作品建立公開門面。"
            en="Independent systems architecture, semantic governance, animation and music—presented through work that can be verified."
          />
        </p>
      </div>

      <div className={styles.footerMiddle}>
        <nav className={styles.footerNav} aria-label="頁尾導覽 / Footer navigation">
          <LocalizedLink href="/products"><Lang zh="產品" en="PRODUCTS" /></LocalizedLink>
          <LocalizedLink href="/works"><Lang zh="作品" en="WORKS" /></LocalizedLink>
          <LocalizedLink href="/news"><Lang zh="新聞台 × 博物館" en="NEWS × MUSEUM" /></LocalizedLink>
          <LocalizedLink href="/about"><Lang zh="創辦人" en="FOUNDER" /></LocalizedLink>
        </nav>
        <div className={styles.footerExternal}>
          <a href="https://github.com/HIJO790401" target="_blank" rel="noreferrer">GITHUB ↗</a>
          <a href="https://vocus.cc/salon/hijo19900401/room/hijo1990" target="_blank" rel="noreferrer">VOCUS ↗</a>
          <a href="https://ai-arts.org/author/shen-yao/" target="_blank" rel="noreferrer">AI-ARTS ↗</a>
          <a href="mailto:ken0963521@gmail.com?subject=%E6%B2%89%E9%9D%9C%E6%B5%81%E6%B4%BE%E5%B7%A5%E4%BD%9C%E5%AE%A4%E5%90%88%E4%BD%9C%E6%8F%90%E6%A1%88"><Lang zh="合作聯絡" en="CONTACT" /> →</a>
          <Link href="/studio"><Lang zh="站主編輯台" en="OWNER STUDIO" /> →</Link>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>© 2026 <Lang zh="沉靜流派工作室" en="SERENE SCHOOL STUDIO" /></p>
        <p>TAICHUNG · TAIWAN <span aria-hidden="true">/</span> <Lang zh="獨立工作室" en="INDEPENDENT STUDIO" /></p>
      </div>
    </footer>
  );
}
