import Link from "next/link";
import { chatGPTSignInPath, getChatGPTUser } from "../chatgpt-auth";
import { getStudioOwner } from "../studio-auth";
import { listAllPosts } from "@/db/news";
import { listAllMuseumEntries } from "@/db/museum";
import { StudioEditor } from "./StudioEditor";
import { MuseumEditor } from "./MuseumEditor";
import type { NewsPost } from "@/db/news";
import type { MuseumEntry } from "@/db/museum";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "站主內容中心", robots: { index: false, follow: false } };

export default async function StudioPage() {
  const owner = await getStudioOwner();
  const user = await getChatGPTUser();
  const localPreview = process.env.NODE_ENV === "development";
  if (!owner && !localPreview) return <main className="studio-login"><div><span>沉靜流派工作室</span><h1>站主編輯台</h1><p>{user ? `目前登入的帳號 ${user.email} 沒有編輯權限。` : "這裡只有站主本人可以進入。登入後即可發布文章與 YouTube 影片。"}</p><a href={chatGPTSignInPath("/studio")}>{user ? "換站主帳號登入" : "用 ChatGPT 帳號登入"}</a><Link className="back-link" href="/">回到官網</Link></div></main>;
  let posts: NewsPost[] = [];
  let museumEntries: MuseumEntry[] = [];
  const storageIssues: string[] = [];
  if (owner) {
    try {
      posts = await listAllPosts();
    } catch {
      storageIssues.push("新聞資料庫");
    }
    try {
      museumEntries = await listAllMuseumEntries();
    } catch {
      storageIssues.push("責任博物館資料庫");
    }
  }
  const storageReady = storageIssues.length === 0;
  const canSave = Boolean(owner) && storageReady;
  return <main className="studio-page"><div className="studio-hub-head"><span>SERENE SCHOOL STUDIO</span><h1>站主內容中心</h1><p>新聞報導、YouTube 影片與責任博物館館藏都在這裡管理。</p><nav><a href="#news-editor">文章與影片</a><a href="#museum-editor">責任博物館</a></nav></div>{owner && !storageReady && <div className="studio-preview-note" role="alert"><strong>內容資料庫尚未就緒，已暫停寫入。</strong><br />無法讀取：{storageIssues.join("、")}。請先確認 D1 綁定與 migration，再重新整理本頁；現有內容不會被當成空資料覆寫。</div>}<section id="news-editor"><StudioEditor initialPosts={posts} canSave={canSave} ownerEmail={owner?.email} /></section><section id="museum-editor"><MuseumEditor initialEntries={museumEntries} canSave={canSave} ownerEmail={owner?.email} /></section></main>;
}
