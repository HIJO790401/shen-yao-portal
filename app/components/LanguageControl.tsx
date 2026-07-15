"use client";

import { useEffect, useState } from "react";

type Locale = "zh" | "en";

export function LanguageControl() {
  const [locale, setLocale] = useState<Locale>("zh");

  useEffect(() => {
    const saved = window.localStorage.getItem("shenyao-locale") as Locale | null;
    const initial = saved === "en" ? "en" : "zh";
    setLocale(initial);
    document.documentElement.dataset.locale = initial;
    document.documentElement.lang = initial === "en" ? "en" : "zh-Hant";
  }, []);

  const select = (next: Locale) => {
    setLocale(next);
    window.localStorage.setItem("shenyao-locale", next);
    document.documentElement.dataset.locale = next;
    document.documentElement.lang = next === "en" ? "en" : "zh-Hant";
  };

  return <div className="language-control" aria-label="語言 / Language">
    <button className={locale === "zh" ? "is-active" : ""} onClick={() => select("zh")} aria-pressed={locale === "zh"}>中</button>
    <button className={locale === "en" ? "is-active" : ""} onClick={() => select("en")} aria-pressed={locale === "en"}>EN</button>
  </div>;
}

export function Lang({ zh, en }: { zh: React.ReactNode; en: React.ReactNode }) {
  return <><span className="lang-zh">{zh}</span><span className="lang-en">{en}</span></>;
}
