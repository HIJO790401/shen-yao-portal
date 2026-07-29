"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Lang } from "./LanguageControl";
import styles from "../serene-home.module.css";

const SESSION_KEY = "serene-school-intro-seen-v1";
const subscribeToNothing = () => () => {};

type IntroGateProps = {
  src?: string;
  poster?: string;
};

export function IntroGate({ src, poster = "/media/serene-water-16x9.jpg" }: IntroGateProps) {
  const [dismissed, setDismissed] = useState(false);
  const [playbackFailed, setPlaybackFailed] = useState(false);
  const sessionEligible = useSyncExternalStore(
    subscribeToNothing,
    () => {
      try {
        return window.sessionStorage.getItem(SESSION_KEY) !== "1";
      } catch {
        return true;
      }
    },
    () => true,
  );
  const visible = sessionEligible && !dismissed;
  const videoReady = Boolean(src) && !playbackFailed;

  useEffect(() => {
    if (!visible) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  const enterSite = () => {
    try {
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // The intro remains fully usable when storage is unavailable.
    }
    setDismissed(true);
  };

  if (!visible) return null;

  return (
    <div
      className={styles.introGate}
      role="dialog"
      aria-modal="true"
      aria-labelledby="serene-intro-title"
      aria-describedby="serene-intro-note"
    >
      <div className={styles.introMedia}>
        {videoReady ? (
          <video
            className={styles.introVideo}
            src={src}
            poster={poster}
            muted
            autoPlay
            controls
            playsInline
            preload="auto"
            onError={() => setPlaybackFailed(true)}
          />
        ) : (
          <div className={styles.introPlaceholder}>
            <Image src={poster} alt="" fill priority unoptimized sizes="100vw" />
          </div>
        )}
        <div className={styles.introShade} aria-hidden="true" />
        <div className={styles.introBrand}>
          <p>SERENE SCHOOL STUDIO</p>
          <h2 id="serene-intro-title">
            <Lang
              zh={
                videoReady
                  ? "沉靜流派工作室・開場"
                  : src && playbackFailed
                    ? "開場影片暫時無法播放"
                    : "正式開場影片待提供"
              }
              en={
                videoReady
                  ? "SERENE SCHOOL STUDIO · INTRO"
                  : src && playbackFailed
                    ? "INTRO VIDEO UNAVAILABLE"
                    : "FINAL INTRO VIDEO PENDING"
              }
            />
          </h2>
          {!videoReady && (
            <span>
              <Lang
                zh={
                  src && playbackFailed
                    ? "影片載入失敗，已安全回復為你核准的水滴封面；仍可直接進入官網。"
                    : "目前使用你核准的水滴視覺作為合法佔位，不生成替代影片。"
                }
                en={
                  src && playbackFailed
                    ? "Playback failed, so the approved water poster is shown. You can still enter the site."
                    : "The approved water visual is used as a placeholder. No substitute video is generated."
                }
              />
            </span>
          )}
        </div>
      </div>
      <div className={styles.introActions}>
        <button className={styles.introEnter} type="button" onClick={enterSite}>
          <span><Lang zh="進入官網" en="ENTER THE STUDIO" /></span>
          <b aria-hidden="true">→</b>
        </button>
        <p id="serene-intro-note">
          <Lang
            zh="不必等待影片播放完畢；由你決定何時進入。"
            en="You decide when to enter. Watching the entire film is never required."
          />
        </p>
      </div>
    </div>
  );
}
