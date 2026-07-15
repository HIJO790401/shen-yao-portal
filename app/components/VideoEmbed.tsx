function youtubeId(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "youtu.be") return parsed.pathname.slice(1).split("/")[0];
    if (parsed.hostname.includes("youtube.com")) {
      if (parsed.pathname.startsWith("/shorts/")) return parsed.pathname.split("/")[2];
      if (parsed.pathname.startsWith("/embed/")) return parsed.pathname.split("/")[2];
      return parsed.searchParams.get("v");
    }
  } catch {}
  return null;
}

export function VideoEmbed({ url, title }: { url: string; title: string }) {
  const id = youtubeId(url);
  if (!url) return null;
  if (id) return <div className="video-embed"><iframe src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}`} title={title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div>;
  return <a className="external-video" href={url} target="_blank" rel="noreferrer">開啟影片觀看 <span>↗</span></a>;
}
