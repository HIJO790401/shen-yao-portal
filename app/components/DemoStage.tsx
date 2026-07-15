import { Lang } from "./LanguageControl";

type DemoStageProps = { variant?: "chain" | "scam" | "tirc" | "wif" };

export function DemoStage({ variant = "chain" }: DemoStageProps) {
  if (variant === "scam") {
    return <div className="demo-screen scam-stage" aria-label="反詐騙責任鏈動畫示範">
      <div className="screen-bar"><span>SCBKR / MESSAGE AUDIT</span><i>LIVE</i></div>
      <div className="message-bubble"><Lang zh="您的帳戶出現異常，請立即點擊連結完成驗證。" en="Your account has an issue. Click this link to verify now." /></div>
      <div className="scan-line" />
      <div className="audit-row"><span>SUBJECT</span><b className="fail">UNVERIFIED</b></div>
      <div className="audit-row"><span>BOUNDARY</span><b className="fail">MISSING</b></div>
      <div className="audit-row"><span>RESPONSIBILITY</span><b className="fail">VOID</b></div>
      <div className="verdict fail">DECISION ELIGIBILITY: REJECTED</div>
    </div>;
  }
  if (variant === "tirc") {
    return <div className="demo-screen tirc-stage" aria-label="TIRC 三重文件閘門動畫示範">
      <div className="screen-bar"><span>TIRC / DOCUMENT TRANSFER</span><i>03 GATES</i></div>
      <div className="document-card"><b>TRANSFER_AGREEMENT.pdf</b><small>SHA-256 / VERIFIED</small></div>
      <div className="gate-flow"><span><Lang zh="移交" en="TRANSFER" /></span><i>→</i><span><Lang zh="解釋" en="INTERPRET" /></span><i>→</i><span><Lang zh="交付" en="DELIVER" /></span></div>
      <div className="permission-track"><i/><i/><i/></div>
      <div className="verdict pass">FINAL DELIVERY AUTHORIZED</div>
    </div>;
  }
  if (variant === "wif") {
    return <div className="demo-screen wif-stage" aria-label="WIF 決策資格動畫示範">
      <div className="screen-bar"><span>SCBKR × WIF / OBJECT COMPILER</span><i>RUN 888π</i></div>
      <div className="orbit"><span>W</span><span>I</span><span>F</span><b>Rπ</b></div>
      <div className="audit-row"><span>STRUCTURAL SCORE</span><b>0.88</b></div>
      <div className="audit-row"><span>REPLAY VALID</span><b className="pass">TRUE</b></div>
      <div className="verdict pass">CLOSE / QUALIFIED</div>
    </div>;
  }
  return <div className="demo-screen chain-stage" aria-label="SCBKR 五鏈動態示範">
    <div className="screen-bar"><span>RESPONSIBILITY CHAIN / ACTIVE</span><i>OWNER LOCKED</i></div>
    <div className="chain-nodes">
      {[["S","主體","SUBJECT"],["C","因果","CAUSALITY"],["B","邊界","BOUNDARY"],["K","依據","KEY"],["R","責任","RESPONSIBILITY"]].map(([key,zh,en], i) => <div key={key} style={{"--delay": `${i * .45}s`} as React.CSSProperties}><b>{key}</b><span><Lang zh={zh} en={en} /></span></div>)}
    </div>
    <div className="pulse-route" />
    <div className="verdict pass">1 → CLOSE</div>
  </div>;
}
