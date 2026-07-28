"use client";

import { Lang } from "../components/LanguageControl";

export function PrintResumeButton({ className }: { className?: string }) {
  return (
    <button className={className} type="button" onClick={() => window.print()}>
      <Lang zh="列印／另存 PDF" en="PRINT / SAVE PDF" />
      <span aria-hidden="true">↓</span>
    </button>
  );
}
