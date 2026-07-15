import type { ProductFilm } from "../showcase-data";
import { DemoStage } from "./DemoStage";
import { Lang } from "./LanguageControl";

const labels: Record<ProductFilm["variant"], string[]> = {
  chain: [], firewall:["INPUT","PRE-GATE","MODEL","POST-GATE","OUTPUT"], rlock:["MESSAGE","SUBJECT","COST","OWNER","LOCK"],
  copyright:["CONTENT","LICENSE","USE","BOUNDARY","HASH"], memory:["CHAT","DOCS","MEDIA","INDEX","DECISION"],
  dual:["LEGAL","EVIDENCE","COST","CONSEQUENCE","CLOSE"], compute:["PROMPT","TOKENS","POLLUTION","LOSS","REPAIR"],
  bridge:["PERSON","LABEL","CHANNEL","CONTEXT","RESPONSIBILITY"], payment:["BANK","PLATFORM","SERVICE","SUPPORT","REPLAY"],
  universe:["SYSTEM","ANIMATION","MUSIC","STORY","UNIVERSE"], sentinel:["SIGNAL","OBSERVE","DETECT","BLOCK","REPLAY"],
};

export function ProductFilmStage({ film }: { film: ProductFilm }) {
  if (film.variant === "chain") return <DemoStage variant="chain" />;
  return <div className={`demo-screen product-film film-${film.variant}`} aria-label={`${film.name} 自動動畫示範`}>
    <div className="screen-bar"><span>{film.nameEn.toUpperCase()}</span><i>AUTO PLAY</i></div>
    {film.variant === "dual" ? <div className="dual-film"><div><small>ENGINE A</small><b>LEGAL</b><i/><i/><i/></div><span>×</span><div><small>ENGINE B</small><b>COST</b><i/><i/><i/></div></div> :
      film.variant === "universe" ? <div className="universe-film"><b>888π</b>{labels[film.variant].slice(0,4).map((label,i)=><span key={label} style={{"--i":i} as React.CSSProperties}>{label}</span>)}</div> :
      film.variant === "sentinel" ? <div className="sentinel-film"><div className="radar-sweep"/><b>SY</b>{[0,1,2,3].map(i=><i key={i} style={{"--i":i} as React.CSSProperties}/>)}</div> :
      <div className="film-pipeline">{labels[film.variant].map((label,i)=><div key={label} style={{"--i":i} as React.CSSProperties}><span>{String(i+1).padStart(2,"0")}</span><b>{label}</b></div>)}<i className="film-signal"/></div>}
    <div className="film-status"><span><Lang zh="責任鏈動畫運行中" en="RESPONSIBILITY FILM RUNNING" /></span><b>{film.formula.split("→").at(-1)}</b></div>
  </div>;
}
