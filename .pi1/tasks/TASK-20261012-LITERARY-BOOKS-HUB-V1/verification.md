# Verification

- Task: `TASK-20261012-LITERARY-BOOKS-HUB-V1`
- Verified: 2026-10-12 17:05 (Asia/Taipei)
- Baseline commit: `4e482ed4009a42d2e0a8bafa57eede86a4a222ce`
- Release boundary: local implementation and owner review only

## Automated verification

- `npx tsc --noEmit`: PASS
- `npm run lint`: PASS
- `npm test`: PASS
  - production build: PASS
  - full Node test suite: 47 passed, 0 failed
- `git diff --check`: PASS (line-ending notices only; no whitespace errors)

## Public asset boundary

Exactly three book files exist under `public/media/books/stillness-is-a-language/`:

1. `cover-zh.jpg`
2. `cover-en.jpg`
3. `preview-zh-part-one.pdf`

- Chinese preview PDF SHA-256: `A745D5C6DF021068B448026FD77AAB37FDA10A36540C65A2E6046705D32C5B10`
- Public EPUB, DOCX, TXT, complete-book PDF and print-source scan: PASS (none found)
- Owner password literal scan: PASS (none found)

## Browser verification

- Desktop books hub: PASS; no horizontal overflow
- Mobile books hub at 390 × 844: PASS; no horizontal overflow
- Mobile navigation: PASS; all seven destinations visible and usable
- Traditional Chinese detail: PASS
- English detail: PASS; no premature purchase link
- English Part One reader: PASS; server-rendered public text, no Part Two
- English preview boundary: 2,305 / 14,004 words (approximately 16.46%)
- Browser console warnings/errors on reviewed pages: none
- All bilingual hub, detail, preview and Chinese PDF URLs returned HTTP 200

## External state checked

- Pubu product `700139` was publicly reachable on 2026-10-12.
- Displayed public price: NT$199.
- English storefront remains described as under review; no public English purchase URL is emitted.

## Publication state

- Local preview: READY FOR OWNER REVIEW
- Git commit: NOT CREATED
- GitHub push: NOT PERFORMED
- Sites/public deployment: NOT PERFORMED
