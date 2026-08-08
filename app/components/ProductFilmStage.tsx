"use client";

import { useEffect, useState } from "react";
import type { DemoScene, DemoTone, DemoFixture } from "../demo-fixtures";
import { getDemoFixture } from "../demo-fixtures";
import type { ProductFilm } from "../showcase-data";
import { Lang } from "./LanguageControl";
import { UniverseCanvas } from "./UniverseCanvas";
import styles from "../demo-system.module.css";

const toneClass: Record<DemoTone, string> = {
  pass: styles.tonePass,
  warn: styles.toneWarn,
  danger: styles.toneDanger,
  info: styles.toneInfo,
  muted: styles.toneMuted,
};

function Metrics({ scene }: { scene: DemoScene }) {
  if (!scene.metrics?.length) return null;
  return <div className={styles.metricGrid}>
    {scene.metrics.map((item) => <div className={`${styles.metric} ${toneClass[item.tone ?? "info"]}`} key={`${item.label.zh}-${item.value}`}>
      <span><Lang zh={item.label.zh} en={item.label.en} /></span>
      <b>{item.value}</b>
    </div>)}
  </div>;
}

function Nodes({ scene, pipeline = false }: { scene: DemoScene; pipeline?: boolean }) {
  if (!scene.nodes?.length) return null;
  return <div className={pipeline ? styles.pipeline : styles.nodeGrid}>
    {scene.nodes.map((item, index) => <div className={`${styles.node} ${toneClass[item.tone ?? "info"]}`} key={`${item.label.zh}-${item.value}`}>
      {pipeline && <i>{String(index + 1).padStart(2, "0")}</i>}
      <span><Lang zh={item.label.zh} en={item.label.en} /></span>
      <b>{item.value}</b>
    </div>)}
  </div>;
}

function SceneTags({ scene }: { scene: DemoScene }) {
  if (!scene.tags?.length) return null;
  return <div className={styles.sceneTags}>{scene.tags.map((tag) => <span key={tag.zh}><Lang zh={tag.zh} en={tag.en} /></span>)}</div>;
}

function AiccVisual({ scene }: { scene: DemoScene }) {
  const stages = [
    { key: "ON", label: "GATEWAY" },
    { key: "L1", label: "L1" },
    { key: "L2", label: "L2" },
    { key: "L3", label: "L3" },
    { key: "GAP", label: "VERSION GAP" },
  ];
  const active = Math.max(0, stages.findIndex((stage) => stage.key === scene.step));
  const ownerActive = scene.step === "L4";

  return <div className={styles.aiccVisual}>
    <div className={styles.aiccRuntimeBar}><span>PUBLIC RUNTIME ARCHITECTURE</span><b>v0.2.CANDIDATE</b><em>PUBLIC AUTHORITY · L1–L3 ONLY</em></div>
    <div className={styles.aiccRuntimeCore}>
      <div className={styles.aiccGateway} data-active={scene.step === "ON"}><i /><span>LOCAL GATEWAY</span><b>VERSION GATE</b></div>
      <div className={styles.aiccRoute}>
        {stages.slice(1).map((stage, index) => <div className={`${index + 1 === active ? styles.aiccRouteActive : ""} ${stage.key === "GAP" ? styles.aiccGap : ""}`} key={stage.key}>
          <small>{String(index + 1).padStart(2, "0")}</small><b>{stage.label}</b><i />
        </div>)}
      </div>
    </div>
    <div className={`${styles.aiccPlaneSplit} ${ownerActive ? styles.aiccOwnerActive : ""}`}>
      <div><span>PUBLIC → L4</span><b>AUTO ESCALATION FORBIDDEN</b></div>
      <i aria-hidden="true" />
      <div><small>OWNER DEVELOPER PLANE · READ-ONLY CONCEPT</small><b>REVIEW → MANIFEST → HASH → SIGN → RELEASE</b></div>
    </div>
    <div className={styles.aiccEvidence}><Nodes scene={scene} /><SceneTags scene={scene} /></div>
  </div>;
}

function RLockVisual({ scene }: { scene: DemoScene }) {
  return <div className={styles.rlockVisual}>
    <div className={styles.messageCard}>
      <small>MESSAGE / LOCAL FIXTURE</small>
      <p>{scene.quote ? <Lang zh={scene.quote.zh} en={scene.quote.en} /> : <Lang zh={scene.body.zh} en={scene.body.en} />}</p>
      <div className={styles.scanBeam} />
    </div>
    <div className={styles.logicPanel}><Metrics scene={scene} /><Nodes scene={scene} /><SceneTags scene={scene} /></div>
    <div className={`${styles.lockSeal} ${toneClass[scene.tone]}`}><span>R</span><b>{scene.status}</b></div>
  </div>;
}

function CopyrightVisual({ scene }: { scene: DemoScene }) {
  return <div className={styles.copyrightVisual}>
    <div className={styles.licensePath}>
      <span>CONTENT</span><i>→</i><span>LICENSE</span><i>→</i><span>USE</span><i>→</i><b className={toneClass[scene.tone]}>{scene.status}</b>
    </div>
    <div className={styles.boundarySheet}>
      <small>RESPONSIBILITY BOUNDARY / SOURCE AUTO DEMO</small>
      <h3><Lang zh={scene.title.zh} en={scene.title.en} /></h3>
      <p><Lang zh={scene.body.zh} en={scene.body.en} /></p>
    </div>
    <Metrics scene={scene} /><Nodes scene={scene} /><SceneTags scene={scene} />
  </div>;
}

function PaymentVisual({ scene }: { scene: DemoScene }) {
  return <div className={styles.paymentVisual}>
    <div className={styles.paymentSignal}><span>WIF-PAY / SIMULATED PAYMENT CASE</span><b className={toneClass[scene.tone]}>{scene.status}</b></div>
    <Nodes scene={scene} pipeline />
    <Metrics scene={scene} />
    <SceneTags scene={scene} />
  </div>;
}

function DualVisual({ scene }: { scene: DemoScene }) {
  return <div className={styles.dualVisual}>
    <div className={styles.enginePair}>
      <div className={scene.step === "A" ? styles.engineActive : ""}><small>ENGINE A</small><b>LEGAL RESPONSIBILITY</b></div>
      <i>×</i>
      <div className={scene.step === "B" ? styles.engineActive : ""}><small>ENGINE B</small><b>COST NARRATIVE</b></div>
    </div>
    <div className={styles.engineVerdict}><span>FIXED DESCRIPTION-LAYER CASE</span><strong className={toneClass[scene.tone]}>{scene.status}</strong></div>
    <Nodes scene={scene} /><Metrics scene={scene} /><SceneTags scene={scene} />
  </div>;
}

function ComputeVisual({ scene }: { scene: DemoScene }) {
  return <div className={styles.computeVisual}>
    <div className={styles.promptConsole}>
      <div><i /><i /><i /><span>SEMANTIC FIREWALL / BROWSER RULE SCAN</span></div>
      <p>{scene.quote && <Lang zh={scene.quote.zh} en={scene.quote.en} />}</p>
    </div>
    <Metrics scene={scene} />
    <div className={styles.scbkrRail}><Nodes scene={scene} /></div>
    <SceneTags scene={scene} />
  </div>;
}

function WifVisual({ scene }: { scene: DemoScene }) {
  return <div className={styles.wifVisual}>
    <div className={styles.objectCompiler}>
      <span>{scene.step}</span>
      <div><small>CURATED INPUT OBJECT</small><b><Lang zh={scene.title.zh} en={scene.title.en} /></b></div>
      <strong className={toneClass[scene.tone]}>{scene.status}</strong>
    </div>
    <Nodes scene={scene} pipeline />
    <SceneTags scene={scene} />
  </div>;
}

function V4Visual({ scene }: { scene: DemoScene }) {
  const active = scene.step === "01" ? 0 : scene.step === "02" ? 1 : scene.step === "03" ? 2 : 3;
  return <div className={styles.v4Visual}>
    <div className={styles.v4Core} data-active={active}>
      <div className={styles.v4Ripple} /><div className={styles.v4Ripple} /><div className={styles.v4Ripple} />
      <div className={styles.v4Drop}><span>V4</span><b>{scene.status}</b></div>
    </div>
    <div className={styles.v4Layers}>
      {["FIXED TEXT", "REGEX SHIELD", "AUDIT", "LOCKED"].map((label, index) => <div className={index <= active ? styles.layerActive : ""} key={label}><span>{String(index + 1).padStart(2, "0")}</span><b>{label}</b></div>)}
    </div>
    <div className={styles.v4Evidence}><Metrics scene={scene} /><Nodes scene={scene} /><SceneTags scene={scene} /></div>
  </div>;
}

function NonRLockVisual({ scene }: { scene: DemoScene }) {
  const routes = ["SAFE", "RISK", "FATAL", "NON-CLOSABLE"];
  return <div className={styles.nonRLockVisual}>
    <div className={styles.caseTicker}><span>CASE {scene.step} / 06</span><b><Lang zh={scene.title.zh} en={scene.title.en} /></b></div>
    <div className={styles.routeRail}>{routes.map((route) => <div className={scene.status === route ? styles.routeActive : ""} key={route}><i /><span>{route}</span></div>)}</div>
    <div className={styles.caseBody}>
      <div><small>FIXED RULE RESULT</small><strong className={toneClass[scene.tone]}>{scene.status}</strong><p><Lang zh={scene.body.zh} en={scene.body.en} /></p></div>
      <div><Nodes scene={scene} /><SceneTags scene={scene} /></div>
    </div>
  </div>;
}

function MemoryVisual({ scene }: { scene: DemoScene }) {
  return <div className={styles.memoryVisual}>
    <div className={styles.memoryHeader}><span>LOCAL INDEX</span><b>FILENAME · PATH · MTIME</b><em>CONTENT_READ = FALSE</em></div>
    <div className={styles.memoryBody}>
      <div className={styles.fileStack}><Nodes scene={scene} /><div className={styles.memoryGate}><i>B</i><i>R</i><i>K</i></div></div>
      <div className={styles.jsonPanel}><small>{scene.status}</small><pre>{scene.quote ? <Lang zh={scene.quote.zh} en={scene.quote.en} /> : <Lang zh={scene.body.zh} en={scene.body.en} />}</pre><SceneTags scene={scene} /></div>
    </div>
  </div>;
}

function TircVisual({ scene }: { scene: DemoScene }) {
  return <div className={styles.tircVisual}>
    <div className={styles.documentSheet}>
      <div><span>TXT</span><b>SERENE_TIRC_DEMO</b><small>SYNTHETIC / UTF-8</small></div>
      <pre>{scene.quote ? <Lang zh={scene.quote.zh} en={scene.quote.en} /> : "owner = Wen-Yao Hsu\npurpose = public fixture\nclassification = synthetic"}</pre>
    </div>
    <div className={styles.tircGate}>
      <div className={styles.policyRail}><span>T1</span><span className={scene.step === "02" ? styles.policyActive : ""}>T2</span><span>T3</span></div>
      <Metrics scene={scene} /><Nodes scene={scene} /><SceneTags scene={scene} />
    </div>
  </div>;
}

function SlbVisual({ scene }: { scene: DemoScene }) {
  return <div className={styles.slbVisual}>
    <div className={styles.nonMedicalBanner}><span>BOUNDARY LOCK</span><b>NOT MEDICAL · NOT DIAGNOSTIC</b></div>
    <div className={styles.bridgeMap}>
      <div className={styles.personNode}><span>PERSON</span><b>01</b></div>
      <div className={styles.bridgeLine}><i /><i /><i /></div>
      <div className={styles.channelNode}><span>{scene.step}</span><b>{scene.status.replace("SUPPORT ROUTE / ", "")}</b></div>
    </div>
    <div className={styles.slbCards}><Nodes scene={scene} /></div>
  </div>;
}

function UniverseVisual({ scene, playing, replayKey }: { scene: DemoScene; playing: boolean; replayKey: number }) {
  return <div className={styles.universeVisual}>
    <UniverseCanvas className={styles.universeCanvas} paused={!playing} replayKey={replayKey} />
    <div className={styles.universeBadge}><b>SOURCE 2D CANVAS</b><span>NOT 3D · NO WEBGL</span></div>
    <div className={styles.universeCaption}><small>{scene.step}</small><strong><Lang zh={scene.title.zh} en={scene.title.en} /></strong><span>{scene.status}</span></div>
  </div>;
}

function SentinelVisual({ scene }: { scene: DemoScene }) {
  return <div className={styles.sentinelVisual}>
    <div className={styles.sentinelTop}><span>SY SENTINEL / SIMULATION</span><b>{scene.status}</b><i>DETERMINISTIC</i></div>
    <div className={styles.sentinelBody}>
      <div className={styles.sentinelRadar}><span>13</span><b>AXES</b>{Array.from({ length: 13 }, (_, index) => <i key={index} style={{ transform: `rotate(${index * (360 / 13)}deg)` }} />)}</div>
      <div className={styles.axisGrid}><Nodes scene={scene} /><Metrics scene={scene} /><SceneTags scene={scene} /></div>
    </div>
    {scene.quote && <pre className={styles.sentinelLog}><Lang zh={scene.quote.zh} en={scene.quote.en} /></pre>}
  </div>;
}

function SceneVisual({ fixture, scene, playing, replayKey }: { fixture: DemoFixture; scene: DemoScene; playing: boolean; replayKey: number }) {
  if (fixture.kind === "aicc") return <AiccVisual scene={scene} />;
  if (fixture.kind === "rlock") return <RLockVisual scene={scene} />;
  if (fixture.kind === "copyright") return <CopyrightVisual scene={scene} />;
  if (fixture.kind === "payment") return <PaymentVisual scene={scene} />;
  if (fixture.kind === "dual") return <DualVisual scene={scene} />;
  if (fixture.kind === "compute") return <ComputeVisual scene={scene} />;
  if (fixture.kind === "v4") return <V4Visual scene={scene} />;
  if (fixture.kind === "nonrlock") return <NonRLockVisual scene={scene} />;
  if (fixture.kind === "memory") return <MemoryVisual scene={scene} />;
  if (fixture.kind === "tirc") return <TircVisual scene={scene} />;
  if (fixture.kind === "slb") return <SlbVisual scene={scene} />;
  if (fixture.kind === "universe") return <UniverseVisual scene={scene} playing={playing} replayKey={replayKey} />;
  if (fixture.kind === "sentinel") return <SentinelVisual scene={scene} />;
  return <WifVisual scene={scene} />;
}

function HoldingStage({ film }: { film: ProductFilm }) {
  const isRepair = film.status === "repair";
  return <section className={`${styles.stage} ${styles.holding}`} aria-label={`${film.name} 展示狀態`}>
    <div className={styles.stageTop}>
      <div><span>{film.index}</span><b>{film.nameEn.toUpperCase()}</b></div>
      <strong className={isRepair ? styles.toneDanger : styles.toneMuted}>{isRepair ? "REPAIR" : "DEFERRED"}</strong>
    </div>
    <div className={styles.holdingCore}>
      <span>{isRepair ? "⚠" : "Ⅱ"}</span>
      <div><small>{film.label}</small><h2><Lang zh={film.statusZh} en={film.statusEn} /></h2><p><Lang zh={film.introZh} en={film.introEn} /></p></div>
    </div>
    <div className={styles.holdingRule}><Lang zh="這裡不播放共用換字動畫；原始邏輯修好或邊界確認後，才建立專屬固定案例。" en="No generic relabeled animation plays here. A dedicated fixture will be built only after source logic or boundaries are repaired." /></div>
  </section>;
}

export function ProductFilmStage({ film }: { film: ProductFilm }) {
  const fixture = getDemoFixture(film.slug);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [round, setRound] = useState(0);

  useEffect(() => {
    if (!fixture || !playing || fixture.scenes.length < 2) return;
    const timer = window.setTimeout(() => setSceneIndex((current) => (current + 1) % fixture.scenes.length), fixture.durationMs);
    return () => window.clearTimeout(timer);
  }, [fixture, playing, sceneIndex, round]);

  if (film.status !== "ready" || !fixture) return <HoldingStage film={film} />;

  const scene = fixture.scenes[sceneIndex];
  const replay = () => { setSceneIndex(0); setRound((value) => value + 1); setPlaying(true); };

  return <section className={styles.stage} data-kind={fixture.kind} aria-label={`${film.name} 固定案例自動展示`}>
    <div className={styles.stageTop}>
      <div><span>{film.index}</span><b>{film.nameEn.toUpperCase()}</b></div>
      <strong>AUTO / NO INPUT</strong>
    </div>

    <div className={styles.truthBar}>
      {fixture.truthTags.map((tag) => <span key={tag.zh}><Lang zh={tag.zh} en={tag.en} /></span>)}
    </div>

    <div className={styles.sceneHeader}>
      <div><span>{scene.step}</span><small><Lang zh={fixture.label.zh} en={fixture.label.en} /></small></div>
      <div><h2><Lang zh={scene.title.zh} en={scene.title.en} /></h2><p><Lang zh={scene.body.zh} en={scene.body.en} /></p></div>
      <b className={toneClass[scene.tone]}>{scene.status}</b>
    </div>

    <div className={styles.visualFrame} key={`${scene.id}-${round}`}>
      <SceneVisual fixture={fixture} scene={scene} playing={playing} replayKey={round} />
    </div>

    <div className={styles.playback}>
      <div className={styles.progressTrack}><i style={{ width: `${((sceneIndex + 1) / fixture.scenes.length) * 100}%` }} /></div>
      <span>{String(sceneIndex + 1).padStart(2, "0")} / {String(fixture.scenes.length).padStart(2, "0")}</span>
      <button type="button" onClick={() => setPlaying((value) => !value)} aria-pressed={!playing}><Lang zh={playing ? "暫停" : "繼續"} en={playing ? "PAUSE" : "PLAY"} /> {playing ? "Ⅱ" : "▶"}</button>
      <button type="button" onClick={replay}><Lang zh="重播" en="REPLAY" /> ↻</button>
    </div>

    <div className={styles.transcript} aria-label="完整動畫時間軸">
      {fixture.scenes.map((item, index) => <div className={index === sceneIndex ? styles.transcriptActive : ""} key={item.id}>
        <span>{item.step}</span><b><Lang zh={item.title.zh} en={item.title.en} /></b><small>{item.status}</small>
      </div>)}
    </div>

    <div className={styles.evidenceNote}>
      <p><b><Lang zh="來源" en="SOURCE" /></b><Lang zh={fixture.sourceNote.zh} en={fixture.sourceNote.en} /></p>
      <p><b><Lang zh="邊界" en="BOUNDARY" /></b><Lang zh={fixture.boundary.zh} en={fixture.boundary.en} /></p>
    </div>
  </section>;
}
