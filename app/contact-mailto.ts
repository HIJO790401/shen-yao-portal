export const CONTACT_EMAIL = "ken0963521@gmail.com";

type ContactMailtoInput = {
  locale: "zh" | "en";
  name: string;
  replyEmail: string;
  topicLabel: string;
  subject: string;
  message: string;
};

export function buildContactMailto(input: ContactMailtoInput) {
  const name = singleLine(input.name, "姓名", 120);
  const replyEmail = singleLine(input.replyEmail, "回信信箱", 254);
  const topicLabel = singleLine(input.topicLabel, "合作類型", 120);
  const subjectInput = input.subject.trim();
  if (/[\r\n]/.test(subjectInput)) throw new Error("郵件主旨不能包含換行");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(replyEmail)) {
    throw new Error("請填寫正確的回信信箱");
  }

  const message = input.message.trim();
  if (!message) throw new Error("請填寫合作內容");
  if (message.length > 10_000) throw new Error("合作內容請控制在 10,000 字內");

  const subject = subjectInput || (
    input.locale === "en"
      ? `[Serene School Studio] ${topicLabel}`
      : `[沉靜流派工作室] ${topicLabel}`
  );
  if (subject.length > 180) throw new Error("郵件主旨請控制在 180 字內");

  const body = input.locale === "en"
    ? [
        `Name: ${name}`,
        `Reply email: ${replyEmail}`,
        `Collaboration type: ${topicLabel}`,
        "",
        message,
      ].join("\n")
    : [
        `姓名：${name}`,
        `回信信箱：${replyEmail}`,
        `合作類型：${topicLabel}`,
        "",
        message,
      ].join("\n");

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function singleLine(value: string, field: string, maxLength: number) {
  const normalized = value.trim();
  if (!normalized) throw new Error(`請填寫${field}`);
  if (/[\r\n]/.test(normalized)) throw new Error(`${field}不能包含換行`);
  if (normalized.length > maxLength) throw new Error(`${field}超過 ${maxLength} 字元`);
  return normalized;
}
