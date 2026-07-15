"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Lang, LanguageControl } from "./LanguageControl";

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
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <Link className="brand" href="/" aria-label="沈耀官方網站首頁">
        <span className="brand-sigil">沉</span>
        <span><b><Lang zh="沉靜流派工作室" en="SILENT SCHOOL STUDIO" /></b><small><Lang zh="沈耀888π／許文耀" en="SHEN-YAO / WEN-YAO HSU" /></small></span>
      </Link>
      <button className="menu-button" aria-expanded={open} onClick={() => setOpen(!open)}>MENU</button>
      <nav className={open ? "is-open" : ""} aria-label="主導覽">
        <Link href="/products" onClick={() => setOpen(false)}><Lang zh="產品" en="PRODUCTS" /></Link>
        <Link href="/news" onClick={() => setOpen(false)}><Lang zh="新聞台" en="NEWSROOM" /></Link>
        <Link href="/#founder" onClick={() => setOpen(false)}><Lang zh="創辦人" en="FOUNDER" /></Link>
        <Link href="/#evidence" onClick={() => setOpen(false)}><Lang zh="證據" en="EVIDENCE" /></Link>
      </nav>
      <LanguageControl />
      <Link className="header-cta" href="/products"><Lang zh="探索系統" en="EXPLORE" /> <span>↗</span></Link>
    </header>
  );
}
