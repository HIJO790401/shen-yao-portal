# 沉靜流派 Intro 正式影片｜驗收證據

驗收時間：2026-08-27T18:54:27+08:00
驗收狀態：READY_FOR_OWNER_REVIEW

## 站主素材

- 來源：站主提供的本機檔案 `沉靜流派16：9 循環動畫.mp4`
- 官網檔名：`public/media/intro/serene-school-intro.mp4`
- SHA-256：`C228E1682778C0C01D9A75C6C4156CE77B7D3AAC891E2CA44838043A8D54682C`
- 原檔與官網檔雜湊：完全一致，未轉碼、未改畫面、未改聲音。
- 媒體契約：8.000 秒、1280×720、16:9、24fps、H.264 High、yuv420p、AAC-LC 48kHz 雙聲道。
- 檔案大小：1,953,507 bytes；`moov` 位於 `mdat` 前，已具 faststart。

## 已完成施工

- 本地正式影片成为 Intro 默认来源，不依赖未追踪的 `.env`。
- 合法 `NEXT_PUBLIC_INTRO_VIDEO_URL` 仍可覆盖默认来源；非法值安全回退本地正式影片。
- 普通动态设定：静音自动播放、循环、原生控制、行動裝置 inline 播放。
- 降低动态设定：SSR 不先自动播放；侦测到 `prefers-reduced-motion` 后暂停且不循环，仍可由访客手动控制。
- 正式影片播放时移除重复品牌文字叠层；fallback 仍保留原核准水滴封面与双语说明。
- 手机直式版使用 `object-fit: contain`，完整保留 16:9 文字与水滴构图，不拉伸。
- Intro session key 升为 v2，让曾看过占位画面的同一浏览器会看到正式影片一次。

## 自动验证

- `npx tsc --noEmit`：PASS
- `npm run lint`：PASS
- `npm test`：PASS；production build 完成，34 passed / 0 failed
- `npx drizzle-kit check`：PASS
- `git diff --check`：PASS；仅 Windows LF/CRLF 提示，无 whitespace error
- 新增程式 secret candidate scan：PASS；0 hits
- tracking parameter scan：PASS；0 hits
- MP4 magic、15MB 上限、faststart 顺序与 SHA-256：契约测试 PASS

## 可浏览 UI 验收

- 桌机 1440×900／中文：首页 Intro dialog、正式 MP4、静音、自动播放、循环、原生控制、进入按钮全部 PASS。
- 手机 390×844／英文：完整 16:9 `contain` 构图、全宽进入按钮、双语分离、页面水平溢位 0。
- 媒体响应：HTTP 200、`Content-Type: video/mp4`、`Content-Length: 1953507`。
- 实际播放：`readyState=4`、duration=8、1280×720、muted/autoplay/loop/controls/playsInline 均成立。
- 「ENTER THE STUDIO」实际点击后 dialog 移除、body scroll 恢复、路由不被自动改写。
- Browser console errors：0；warnings：0。
- 目前控制介面没有 OS media preference 模拟能力；降低动态分支以 SSR 行为、实现代码与自动契约测试验收，未改动使用者 Windows 设定。

## 尚未成立的状态

- Sites 正式版本：未储存。
- 官網正式部署：未执行。
- 网域／DNS：未变更。
- 正式网域影音 Range／CDN 行为：待日后部署后复验。
- 本记录证明 GitHub source 候选与本机 UI，不冒充正式网域上线证据。
