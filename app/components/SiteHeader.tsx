"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Lang, LanguageControl, LocalizedLink } from "./LanguageControl";
import styles from "./site-chrome.module.css";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <LocalizedLink className={`brand brand-v3 ${styles.brand}`} href="/" aria-label="沉靜流派工作室首頁 / Serene School Studio home">
        <span className={`brand-logo-mini ${styles.logo}`}><Image src="/media/chenjingliupai-symbol.svg" alt="" fill sizes="48px" priority /></span>
        <span className={styles.brandCopy}>
          <b><Lang zh="沉靜流派工作室" en="SERENE SCHOOL STUDIO" /></b>
          <small><Lang zh="許文耀／沈耀888π" en="WEN-YAO HSU / SHEN-YAO 888π" /></small>
        </span>
      </LocalizedLink>

      <button
        className={`menu-button ${styles.menuButton}`}
        type="button"
        aria-label="開啟主選單 / Open main menu"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span /><span /><span />
      </button>

      <nav className={`${styles.nav} ${open ? styles.open : ""}`} aria-label="主導覽 / Main navigation">
        <LocalizedLink href="/" onClick={() => setOpen(false)}><Lang zh="首頁" en="HOME" /></LocalizedLink>
        <LocalizedLink href="/products" onClick={() => setOpen(false)}><Lang zh="產品" en="PRODUCTS" /></LocalizedLink>
        <LocalizedLink href="/works" onClick={() => setOpen(false)}><Lang zh="作品" en="WORKS" /></LocalizedLink>
        <LocalizedLink href="/news" onClick={() => setOpen(false)}><Lang zh="實相新聞台 × 責任博物館" en="NEWS × MUSEUM" /></LocalizedLink>
        <LocalizedLink href="/about" onClick={() => setOpen(false)}><Lang zh="自介" en="ABOUT" /></LocalizedLink>
      </nav>

      <LanguageControl />
    </header>
  );
}
