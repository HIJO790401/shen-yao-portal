# shen-yao-portal

Official personal website for Wen-Yao Hsu / Yao Shen (許文耀 / 沈耀888π), built as a static GitHub Pages site.

## What this repository is

This repository contains the v1 public-facing website for showcasing Semantic Firewall, AI governance, SRCP, SCBKR, media visibility, public evidence links, and official contact information.

## Website purpose

The site is designed to:

- serve as the official bilingual homepage and landing portal;
- route visitors from the homepage to real project detail pages;
- provide public evidence and verification links;
- offer a formal contact page for collaboration, media, and research outreach.

## Technical structure

This project is intentionally simple and GitHub Pages friendly:

- static HTML pages;
- shared CSS in `assets/css/styles.css`;
- lightweight JavaScript for navigation in `assets/js/main.js`;
- image assets stored at the repository root;
- no backend, database, or build system required.

## Image assets

The current site uses the following image assets:

- `hero-desktop.jpg` for large-screen hero backgrounds;
- `hero-mobile.jpg` for mobile hero backgrounds;
- `founder-portrait.jpg` for the founder profile image;
- `assets/favicon.svg` as the site favicon.

If you replace these files, keep the same filenames or update the HTML/CSS references accordingly.

## Page structure

The site currently includes:

- `index.html` — homepage;
- `projects.html` — project overview page;
- `project-semantic-firewall.html` — Semantic Firewall System detail page;
- `project-anti-scam.html` — Anti-Scam Semantic Firewall detail page;
- `project-vpi10.html` — Shen-Yao Semantic Firewall vπ10 detail page;
- `media.html` — media coverage and public visibility page;
- `evidence.html` — public evidence chain / verification links page;
- `contact.html` — official contact page.

## Deploying to GitHub Pages

### Option 1: deploy from the repository root

1. Push this repository to GitHub.
2. Open **Settings** → **Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the branch you want to publish, typically `main` or your default branch.
5. Select the `/ (root)` folder.
6. Save the configuration.

GitHub Pages will publish the static site directly from the repository root.

### Suggested canonical base URL

If the repository is published as a project site under the `HIJO790401` account, the expected base URL is:

`https://hijo790401.github.io/shen-yao-portal/`

If you publish under a different repository name or custom domain, update the canonical and Open Graph URLs in each HTML page.

## Future extension directions

Recommended next steps:

1. add a downloadable resume PDF and link it from `evidence.html`;
2. expand each project into deeper research / whitepaper / case-study pages;
3. add structured data, analytics, and richer SEO / social preview assets.

## Planning notes

- `docs/SHENYAO.PORTAL.SITE.SEQ.v20260330-LATEST.txt` — cloud-backup one-copy record for the latest portal sequence.
- `docs/content-ia-cleanup-audit.md` — information-architecture audit for page-role overlap, duplication, and cleanup sequencing.
- `docs/homepage-integration-plan-youtube-scbkr-rlock.md` — homepage placement strategy for YouTube + SCBKR/R-Lock links (analysis-only, no UI changes yet).
