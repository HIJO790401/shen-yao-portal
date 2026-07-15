import { getChatGPTUser } from "./chatgpt-auth";

// 正式上線前可再加入實際用來登入 ChatGPT 的信箱。
const OWNER_EMAILS = new Set(["ken0963521@gmail.com"]);

export async function getStudioOwner() {
  const user = await getChatGPTUser();
  if (!user || !OWNER_EMAILS.has(user.email.toLowerCase())) return null;
  return user;
}
