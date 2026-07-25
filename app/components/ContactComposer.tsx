"use client";

import { FormEvent, useMemo, useState } from "react";
import { buildContactMailto, CONTACT_EMAIL } from "../contact-mailto";
import { Lang, useLocale } from "./LanguageControl";
import styles from "../serene-home.module.css";

const topicLabels = {
  technology: { zh: "技術與系統合作", en: "Technology & systems" },
  research: { zh: "研究與公開文章", en: "Research & public writing" },
  animation: { zh: "動畫與視覺製作", en: "Animation & visual production" },
  music: { zh: "音樂與聲音企劃", en: "Music & sound projects" },
  media: { zh: "媒體採訪與公開活動", en: "Press & public events" },
  other: { zh: "其他合作", en: "Other collaboration" },
} as const;

type Topic = keyof typeof topicLabels;

export function ContactComposer() {
  const locale = useLocale();
  const [name, setName] = useState("");
  const [replyEmail, setReplyEmail] = useState("");
  const [topic, setTopic] = useState<Topic>("technology");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const directMailto = useMemo(() => {
    const defaultSubject = locale === "en"
      ? "Collaboration proposal for Serene School Studio"
      : "沉靜流派工作室合作提案";
    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(defaultSubject)}`;
  }, [locale]);

  const compose = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    try {
      window.location.assign(buildContactMailto({
        locale,
        name,
        replyEmail,
        topicLabel: topicLabels[topic][locale],
        subject,
        message,
      }));
    } catch (issue) {
      setError(issue instanceof Error ? issue.message : "請檢查聯絡內容");
    }
  };

  return (
    <form className={styles.contactComposer} onSubmit={compose}>
      <div className={styles.contactRecipient}>
        <span><Lang zh="固定收件人" en="FIXED RECIPIENT" /></span>
        <strong>{CONTACT_EMAIL}</strong>
      </div>
      <p className={styles.contactLead}>
        <Lang
          zh="填完後會開啟你的預設郵件程式，收件人、主旨與內容都會自動帶入；確認後按下寄出即可。"
          en="Submitting opens your default mail app with the recipient, subject and message prefilled. Review it, then press Send."
        />
      </p>

      <div className={styles.contactFields}>
        <label>
          <span><Lang zh="你的名字" en="YOUR NAME" /></span>
          <input
            required
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label>
          <span><Lang zh="回信信箱" en="REPLY EMAIL" /></span>
          <input
            required
            type="email"
            autoComplete="email"
            value={replyEmail}
            onChange={(event) => setReplyEmail(event.target.value)}
          />
        </label>
        <label>
          <span><Lang zh="合作類型" en="COLLABORATION TYPE" /></span>
          <select value={topic} onChange={(event) => setTopic(event.target.value as Topic)}>
            {Object.entries(topicLabels).map(([value, label]) => (
              <option value={value} key={value}>{label[locale]}</option>
            ))}
          </select>
        </label>
        <label>
          <span><Lang zh="郵件主旨（可留空）" en="SUBJECT (OPTIONAL)" /></span>
          <input
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            placeholder={locale === "en" ? "What would you like to build?" : "想合作什麼？"}
          />
        </label>
        <label className={styles.contactMessage}>
          <span><Lang zh="合作內容" en="MESSAGE" /></span>
          <textarea
            required
            rows={6}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder={locale === "en"
              ? "Describe the purpose, expected outcome and timeframe."
              : "請說明目的、預期成果與大致時間。"}
          />
        </label>
      </div>

      <div className={styles.contactActions}>
        <button type="submit">
          <Lang zh="開啟寄信畫面" en="OPEN EMAIL DRAFT" />
          <span aria-hidden="true">→</span>
        </button>
        <a href={directMailto}><Lang zh="直接開啟空白郵件" en="OPEN A BLANK EMAIL" /></a>
      </div>
      {error ? <p className={styles.contactError} role="alert">{error}</p> : null}
      <p className={styles.contactPrivacy}>
        <Lang
          zh="本站不保存這份聯絡內容；郵件由你自己的信箱寄出。"
          en="This site does not store this message. It is sent from your own email account."
        />
      </p>
    </form>
  );
}
