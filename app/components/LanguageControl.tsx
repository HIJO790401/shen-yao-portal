"use client";

import { createContext, useContext, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export type Locale = "zh" | "en";

const LocaleContext = createContext<Locale>("zh");

export function LocaleProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.lang = locale === "en" ? "en" : "zh-Hant";
    document.documentElement.dataset.locale = locale;
    window.localStorage.setItem("serene-locale", locale);
  }, [locale]);

  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  return useContext(LocaleContext);
}

export function localizeHref(href: string, locale: Locale) {
  if (/^(https?:|mailto:|tel:|#)/.test(href)) return href;
  const clean = href.startsWith("/") ? href : `/${href}`;
  const parts = clean.split("/").filter(Boolean);
  if (parts[0] === "zh" || parts[0] === "en") parts.shift();
  return `/${locale}${parts.length ? `/${parts.join("/")}` : ""}`;
}

export function LanguageControl() {
  const locale = useLocale();
  const pathname = usePathname() || "/";
  const router = useRouter();

  const select = (next: Locale) => {
    window.localStorage.setItem("serene-locale", next);
    router.push(localizeHref(pathname, next));
  };

  return <div className="language-control" aria-label="語言 / Language">
    <button className={locale === "zh" ? "is-active" : ""} onClick={() => select("zh")} aria-pressed={locale === "zh"}>中</button>
    <button className={locale === "en" ? "is-active" : ""} onClick={() => select("en")} aria-pressed={locale === "en"}>EN</button>
  </div>;
}

export function Lang({ zh, en }: { zh: React.ReactNode; en: React.ReactNode }) {
  const locale = useLocale();
  return locale === "en" ? <span lang="en">{en}</span> : <span lang="zh-Hant">{zh}</span>;
}

export function LocalizedLink({ href, children, ...props }: Omit<React.ComponentProps<typeof Link>, "href"> & { href: string }) {
  const locale = useLocale();
  return <Link href={localizeHref(href, locale)} {...props}>{children}</Link>;
}
