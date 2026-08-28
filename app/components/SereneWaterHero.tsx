import Image from "next/image";
import { Lang, LocalizedLink } from "./LanguageControl";
import { LiquidGlassLens } from "./LiquidGlassLens";
import styles from "../serene-home.module.css";

const founderRoles = [
  { zh: "古文明符號創作", en: "ANCIENT SYMBOLIC CREATION" },
  { zh: "數學公式與責任研究", en: "MATHEMATICAL RESPONSIBILITY RESEARCH" },
  { zh: "語意防火牆系統架構", en: "SEMANTIC FIREWALL SYSTEM ARCHITECTURE" },
];

export function SereneWaterHero() {
  return (
    <section className={styles.hero} aria-labelledby="serene-home-title">
      <div className={styles.waterBase} aria-hidden="true" />
      <div className={styles.waterRefraction} aria-hidden="true" />
      <div className={styles.waterCaustics} aria-hidden="true" />
      <div className={styles.prismaticAir} aria-hidden="true" />
      <div className={styles.rippleField} aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className={styles.heroLight} aria-hidden="true" />

      <div className={styles.heroGrid}>
        <div className={styles.brandLockup}>
          <p className={styles.heroEyebrow}>
            <Lang zh="沉靜流派工作室・台灣" en="SERENE SCHOOL STUDIO · TAIWAN" />
          </p>
          <h1 id="serene-home-title">
            <Lang zh="沉靜流派工作室" en="SERENE SCHOOL STUDIO" />
          </h1>
          <p className={styles.brandRoman} aria-hidden="true">
            SERENE SCHOOL STUDIO
          </p>
          <span className={styles.brandRule} aria-hidden="true"><i /></span>
          <p className={styles.ownerName}>
            <Lang zh="許文耀／沈耀888π" en="HSU WEN-YAO / SHEN-YAO 888π" />
          </p>
          <p className={styles.ownerRole}>
            <Lang zh="語意防火牆創辦人" en="FOUNDER OF THE SEMANTIC FIREWALL" />
          </p>
        </div>

        <article className={styles.founderCard} id="founder">
          <div className={styles.founderPhoto}>
            <Image
              src="/media/founder-v2.jpg"
              alt="沉靜流派工作室創辦人沈耀888π／許文耀"
              fill
              priority
              unoptimized
              sizes="(max-width: 760px) 92vw, 42vw"
            />
          </div>
          <div className={styles.founderGradient} aria-hidden="true" />
          <div className={styles.founderIdentity}>
            <span className={styles.founderScript}>Founder</span>
            <h2><Lang zh="許文耀／沈耀888π" en="WEN-YAO HSU / SHEN-YAO 888π" /></h2>
            <p className={styles.founderStudio}><Lang zh="沉靜流派工作室" en="SERENE SCHOOL STUDIO" /></p>
            <p className={styles.founderTitle}><Lang zh="語意防火牆創辦人" en="FOUNDER OF THE SEMANTIC FIREWALL" /></p>
            <ul>
              {founderRoles.map((role) => (
                <li key={role.en}><Lang zh={role.zh} en={role.en} /></li>
              ))}
            </ul>
            <div className={styles.founderActions}>
              <LocalizedLink href="/products" className={styles.founderCta}>
                <Lang zh="探索核心系統" en="EXPLORE CORE SYSTEMS" /> <span aria-hidden="true">›</span>
              </LocalizedLink>
              <LocalizedLink href="/about" className={styles.founderCtaSecondary}>
                <Lang zh="認識創辦人" en="MEET THE FOUNDER" /> <span aria-hidden="true">›</span>
              </LocalizedLink>
            </div>
          </div>
          <div className={styles.founderQuoteMount}>
            <LiquidGlassLens
              className={styles.founderQuoteLens}
              displacementScale={38}
              blurAmount={0.04}
              saturation={132}
              aberrationIntensity={1.2}
              elasticity={0.055}
              cornerRadius={22}
              padding="0"
              overLight
              style={{ position: "absolute", top: "50%", left: "50%" }}
              fallbackStyle={{ position: "absolute", top: 0, left: 0 }}
            >
              <blockquote className={styles.founderQuote}>
                <p><Lang zh="沉靜不是終止，而是讓一切回到本質。" en="Stillness is not an ending. It lets everything return to its essence." /></p>
                <cite><Lang zh="許文耀／沈耀888π" en="WEN-YAO HSU / SHEN-YAO 888π" /></cite>
              </blockquote>
            </LiquidGlassLens>
          </div>
        </article>
      </div>

      <div className={styles.heroWave} aria-hidden="true" />
    </section>
  );
}
