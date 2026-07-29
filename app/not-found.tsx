import Link from "next/link";
import { SiteHeader } from "./components/SiteHeader";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className={styles.page}>
        <section className={styles.card}>
          <p className={styles.code}>404 · ROUTE NOT FOUND</p>
          <h1>這一道漣漪尚未被記錄。</h1>
          <p>
            你開啟的頁面不存在或已經移動。請返回沉靜流派工作室首頁，或前往實相新聞台 ×
            責任博物館繼續瀏覽。
            <br />
            This page does not exist or has moved. Return to the studio or continue to the
            Reality Newsroom × Responsibility Museum.
          </p>
          <div className={styles.links}>
            <Link href="/zh">返回首頁 / HOME <span aria-hidden="true">→</span></Link>
            <Link href="/zh/news">前往新聞台與博物館 <span aria-hidden="true">→</span></Link>
          </div>
        </section>
      </main>
    </>
  );
}
