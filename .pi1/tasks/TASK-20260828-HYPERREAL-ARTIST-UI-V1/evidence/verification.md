# Hyperreal Artist UI v1｜Verification receipt

- Task: `TASK-20260828-HYPERREAL-ARTIST-UI-V1`
- Owner: 許文耀／沈耀888π
- Repository: `HIJO790401/shen-yao-portal`
- Branch: `main`
- Baseline HEAD: `0de2fe2c0abae34640b4e06ccafaab34cca3b2ff`
- Verified at: `2026-08-28T23:16:39+08:00`
- Source state: `SOURCE_COMPLETE_NOT_LIVE`
- Final visual gate: `OWNER_REVIEW`

## Implemented source delta

- Preserved the existing homepage order, routes, content placement, CMS/authentication, D1/R2 persistence, intro video and SEO surfaces.
- Added restrained water-caustic, prismatic-light and cinematic depth treatments to the existing homepage materials.
- Kept the supplied founder portrait static and used liquid refraction only on the separate quotation lens.
- Added route-aware, one-time section reveals with a `prefers-reduced-motion` path.
- Added only the required 600/700 weights of `Noto Serif TC` through the existing framework font loader for editorial headings.
- Added a readable CSS fallback and delayed client-only loading for `liquid-glass-react`.

## Open-source material boundary

- `liquid-glass-react@1.1.1` — MIT — Max Rovensky.
- `motion@12.42.2` — MIT — Motion B.V.
- `lenis@1.3.25` — MIT — darkroom.engineering.
- Noto Serif Traditional Chinese — SIL Open Font License 1.1.
- Attributions and license terms are recorded in `THIRD_PARTY_NOTICES.md`.
- No paid asset, paid UI kit, proprietary image or third-party brand artwork was added.

## Automated verification

- `npx tsc --noEmit` — PASS.
- `npm run lint` — PASS.
- `npm test` — PASS; full five-environment Vinext build completed and all 35 tests passed.
- `npx drizzle-kit check` — PASS; `Everything's fine`.
- `npm audit --omit=dev` — PASS; 0 production vulnerabilities after pinning the indirect `nanoid` dependency to the patched MIT release `3.3.18`.
- Build output keeps the optional material in lazy client chunks:
  - `LiquidGlassLens-*.js` — 952 bytes.
  - liquid-glass implementation chunk — 53,150 bytes.
  - homepage CSS — approximately 38.6 KB.
- New regression coverage confirms route-aware reveal registration, progressive liquid-glass loading and reduced-motion fallback.

## Visual and publication boundary

- Owner preview remains available at `http://localhost:4173/zh`.
- Automated in-app browser reload and multi-breakpoint inspection were blocked by the browser URL policy; no workaround or alternate browser automation was used.
- Desktop, tablet, mobile and bilingual visual acceptance therefore remain an explicit Owner review gate.
- No Sites version was saved, no deployment was run, and no domain or DNS state was changed.
- A GitHub source push is not a live-domain deployment.
