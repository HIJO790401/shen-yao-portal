"use client";

import { FormEvent, useMemo, useState } from "react";
import type { NewsPost } from "@/db/news";
import { VideoEmbed } from "../components/VideoEmbed";

const emptyPost = {
  id: 0, slug: "", title_zh: "", title_en: "", summary_zh: "", summary_en: "",
  body_zh: "", body_en: "", category: "REPORT", cover_url: "", video_url: "",
  status: "draft", published_at: new Date().toISOString().slice(0, 16), updated_at: "", author_email: "",
} as NewsPost;

export function StudioEditor({ initialPosts, canSave, ownerEmail }: { initialPosts: NewsPost[]; canSave: boolean; ownerEmail?: string }) {
  const [posts, setPosts] = useState(initialPosts);
  const [form, setForm] = useState<NewsPost>(emptyPost);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const selected = useMemo(() => posts.find((p) => p.id === form.id), [posts, form.id]);
  const update = (name: keyof NewsPost, value: string | number) => setForm((old) => ({ ...old, [name]: value }));

  async function refresh() {
    const res = await fetch("/api/studio/posts");
    if (res.ok) setPosts(((await res.json()) as { posts: NewsPost[] }).posts);
  }

  async function save(event: FormEvent) {
    event.preventDefault();
    if (!canSave) return setMessage("這是本機驗收畫面；正式上線登入後才能發布。");
    setBusy(true); setMessage("正在儲存…");
    const res = await fetch("/api/studio/posts", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(form) });
    const data = await res.json() as { error?: string; id: number; slug: string };
    setBusy(false);
    if (!res.ok) return setMessage(data.error || "儲存失敗");
    setMessage(form.status === "published" ? "已發布，新聞台現在看得到。" : "草稿已保存。");
    await refresh();
    setForm((old) => ({ ...old, id: data.id, slug: data.slug }));
  }

  async function upload(file?: File) {
    if (!file) return;
    if (!canSave) return setMessage("正式上線登入後才能上傳封面。");
    setBusy(true); setMessage("正在上傳封面…");
    const data = new FormData(); data.append("file", file);
    const res = await fetch("/api/studio/upload", { method: "POST", body: data });
    const result = await res.json() as { error?: string; url: string }; setBusy(false);
    if (!res.ok) return setMessage(result.error || "上傳失敗");
    update("cover_url", result.url); setMessage("封面已上傳，記得按最下方儲存。");
  }

  async function remove() {
    if (!form.id || !canSave || !confirm("確定刪除這篇文章？")) return;
    const res = await fetch("/api/studio/posts", { method: "DELETE", headers: { "content-type": "application/json" }, body: JSON.stringify({ id: form.id }) });
    if (res.ok) { setMessage("文章已刪除。"); setForm(emptyPost); await refresh(); }
  }

  return <div className="studio-shell">
    <aside className="studio-list"><div className="studio-list-head"><div><b>文章與影片</b><small>{ownerEmail ? `登入：${ownerEmail}` : "本機驗收模式"}</small></div><button onClick={() => { setForm(emptyPost); setMessage(""); }}>＋ 新增</button></div>
      {posts.length === 0 && <p className="studio-empty">目前還沒有自行發布的文章。</p>}
      {posts.map((post) => <button className={form.id === post.id ? "is-current" : ""} key={post.id} onClick={() => { setForm({ ...post, published_at: post.published_at.slice(0, 16) }); setMessage(""); }}><span>{post.status === "published" ? "已發布" : "草稿"}</span><b>{post.title_zh}</b><small>{post.category} · {post.published_at.slice(0, 10)}</small></button>)}
    </aside>
    <form className="studio-form" onSubmit={save}>
      <div className="studio-form-title"><div><span>{selected ? "編輯內容" : "建立新內容"}</span><h1>{form.title_zh || "新增一篇報導"}</h1></div><a href="/news" target="_blank">查看新聞台 ↗</a></div>
      {!canSave && <div className="studio-preview-note">這是本機驗收畫面。可以查看所有欄位；正式上線後用站主帳號登入，就能儲存與發布。</div>}
      <fieldset><legend>一、基本資料</legend><label>中文標題（一定要填）<input value={form.title_zh} onChange={(e) => update("title_zh", e.target.value)} placeholder="例如：語意防火牆正式公開" /></label><label>英文標題（國際版顯示）<input value={form.title_en} onChange={(e) => update("title_en", e.target.value)} placeholder="例如：Semantic Firewall is now public" /></label><label>網址代碼（可留空自動產生）<input value={form.slug} onChange={(e) => update("slug", e.target.value)} placeholder="例如：semantic-firewall-public-launch" /></label><div className="studio-two"><label>分類<select value={form.category} onChange={(e) => update("category", e.target.value)}><option value="REPORT">報導</option><option value="VIDEO">影片</option><option value="SYSTEM">系統</option><option value="MUSIC">音樂</option><option value="ANIMATION">動畫</option><option value="ANNOUNCEMENT">公告</option></select></label><label>發布時間<input type="datetime-local" value={form.published_at} onChange={(e) => update("published_at", e.target.value)} /></label></div></fieldset>
      <fieldset><legend>二、封面與影片</legend><label>上傳封面圖片<input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => upload(e.target.files?.[0])} /></label><p className="field-help">封面支援 JPG、PNG、WebP，單張不超過 8MB。</p><label>或貼上封面網址<input value={form.cover_url} onChange={(e) => update("cover_url", e.target.value)} placeholder="https://..." /></label><label>YouTube 或 TikTok 影片連結<input value={form.video_url} onChange={(e) => update("video_url", e.target.value)} placeholder="貼上 YouTube 影片網址，就會自動變成播放器" /></label>{form.video_url && <VideoEmbed url={form.video_url} title={form.title_zh || "影片預覽"} />}</fieldset>
      <fieldset><legend>三、中文內容</legend><label>中文摘要<textarea rows={3} value={form.summary_zh} onChange={(e) => update("summary_zh", e.target.value)} placeholder="用兩三句話說清楚這篇報導在講什麼" /></label><label>中文內文<textarea rows={12} value={form.body_zh} onChange={(e) => update("body_zh", e.target.value)} placeholder="直接寫文章。空一行就會自動分段。" /></label></fieldset>
      <fieldset><legend>四、英文國際版</legend><p className="field-help">中文與英文會分開顯示，不會擠在同一頁。英文可之後再補。</p><label>英文摘要<textarea rows={3} value={form.summary_en} onChange={(e) => update("summary_en", e.target.value)} /></label><label>英文內文<textarea rows={12} value={form.body_en} onChange={(e) => update("body_en", e.target.value)} /></label></fieldset>
      <fieldset><legend>五、儲存或發布</legend><div className="publish-choice"><label><input type="radio" checked={form.status === "draft"} onChange={() => update("status", "draft")} /> 先存草稿，訪客看不到</label><label><input type="radio" checked={form.status === "published"} onChange={() => update("status", "published")} /> 直接發布到新聞台</label></div><div className="studio-actions"><button className="save-button" disabled={busy} type="submit">{busy ? "處理中…" : form.status === "published" ? "發布到新聞台" : "儲存草稿"}</button>{form.id > 0 && <button className="delete-button" type="button" onClick={remove}>刪除文章</button>}</div>{message && <p className="studio-message">{message}</p>}</fieldset>
    </form>
  </div>;
}
