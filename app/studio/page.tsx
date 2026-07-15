import { headers } from "next/headers";
import { chatGPTSignInPath, getChatGPTUser } from "../chatgpt-auth";
import { getStudioOwner } from "../studio-auth";
import { listAllPosts } from "@/db/news";
import { StudioEditor } from "./StudioEditor";
import type { NewsPost } from "@/db/news";

export const dynamic = "force-dynamic";

export default async function StudioPage() {
  const owner = await getStudioOwner();
  const user = await getChatGPTUser();
  const host = (await headers()).get("host") || "";
  const localPreview = host.startsWith("localhost") || host.startsWith("127.0.0.1");
  let posts: NewsPost[] = [];
  try { posts = await listAllPosts(); } catch {}
  if (!owner && !localPreview) return <main className="studio-login"><div><span>沉靜流派工作室</span><h1>站主編輯台</h1><p>{user ? `目前登入的帳號 ${user.email} 沒有編輯權限。` : "這裡只有站主本人可以進入。登入後即可發布文章與 YouTube 影片。"}</p><a href={chatGPTSignInPath("/studio")}>{user ? "換站主帳號登入" : "用 ChatGPT 帳號登入"}</a><a className="back-link" href="/">回到官網</a></div></main>;
  return <main className="studio-page"><StudioEditor initialPosts={posts} canSave={Boolean(owner)} ownerEmail={owner?.email} /></main>;
}
