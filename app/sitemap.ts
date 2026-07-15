import type { MetadataRoute } from "next";
import { productFilms } from "./showcase-data";
export default function sitemap(): MetadataRoute.Sitemap { const base="https://silentschoolstudio.com"; const films=productFilms.map(({slug})=>`/demo/${slug}`); return ["","/products","/news","/demo/anti-scam","/demo/tirc","/demo/wif",...films,"/news/platform-rebuild","/news/governance-before-action"].map(path=>({url:base+path,lastModified:new Date("2026-07-15"),changeFrequency:path.includes("news")?"weekly":"monthly",priority:path===""?1:.8})); }
