# Ensemble Stage — website

Public marketing / support / privacy pages for the iOS/iPadOS app
**Ensemble Stage（吹奏楽セッティング）**, served via GitHub Pages on a custom domain.

| Page | URL |
| --- | --- |
| Home (landing) | `https://ensemble-stage.margheritaworks.com/` |
| Support / 使い方 | `https://ensemble-stage.margheritaworks.com/support.html` |
| Privacy / プライバシー | `https://ensemble-stage.margheritaworks.com/privacy.html` |
| Sample CSV template | `https://ensemble-stage.margheritaworks.com/sample_roster.csv` |
| Android/Web version sign-up | `https://ensemble-stage.margheritaworks.com/android/` |

App Store: `https://apps.apple.com/jp/app/id6793795823`

## Design

The landing page follows the **“Warm Layered / パターンA”** system (design source:
`docs/sitedesign_update/DESIGN.md`, not deployed): warm off-white surfaces, 1px
hairlines, no shadows, indigo accent `#4E4E9E`, Shippori Mincho headings + Zen Kaku
Gothic body. Tokens and components live in **`styles.css`** (the single stylesheet
for every page). The brand mark is the real app icon (`assets/app-icon.png`).

- `index.html` — one-page landing (hero with a concert-photo backdrop, feature cards,
  demo videos, steps, FAQ, contact). Japanese only. A mobile-only "サポート" link keeps
  the support page reachable when the nav links collapse.
- `support.html` — bilingual (JA/EN) how-to guide with a sticky left table-of-contents
  and an embedded feedback form (see below).
- `privacy.html`, `android/`, `android/unsubscribed/` — bilingual, same design system.
- Language toggle is `lang.js` (switches `.lang-ja` / `.lang-en` within one URL).
- `style.css` is the **old** stylesheet and is no longer referenced by any page.

Cache busting: shared assets are referenced with a `?v=N` query (bump on change) so
GitHub Pages / browsers pick up edits to `styles.css` and reused image/poster names.

## Forms

Both use the shared Cloudflare Worker on `api.margheritaworks.com`.

- **Android/Web wish** (`android/`) — classic HTML form `POST /wish` (`app=ensemble-stage`),
  honeypot + `return` redirect. See `ensemble-stage-android-wish-spec.md` in the portfolio repo.
- **Feedback** (`support.html#contact`) — mirrors the app’s in-app FeedbackView: a
  `fetch()` JSON `POST /feedback` with the same shape
  (`app`, `type`, `message`, `source:"web"`, `client_ts`, optional `email` / `poll`),
  falling back to a `mailto:` on any error. **Requires the Worker to allow this site’s
  origin via CORS** (`Access-Control-Allow-Origin` + `OPTIONS`); otherwise the browser
  POST is blocked and it silently falls back to email.

## Media

- `assets/video/ipad-demo.mp4`, `assets/video/iphone-demo.mp4` — H.264, ~11–12 MB each
  (GitHub Pages limit is 100 MB/file). Posters (`assets/video-*-poster.png`) are real
  frames pulled from the videos.
- `images/roster*.png`, `stage*.png`, `performance*.png`, `member-edit.png` and the hero
  (`assets/hero-devices.png`) are **real device screenshots** used for App Store Connect.
  `images/import.png`, `guest-add*.png`, `guest-canvas*.png` are still SwiftUI-preview renders.

The sample CSV intentionally has **no “part” column** — the part is derived from the
primary instrument inside the app.

## Repo notes

- `docs/` is git-ignored: it holds the design spec and large source screen recordings
  (some >100 MB) that must not be committed. Only the compressed clips under
  `assets/video/` are tracked.
- `.DS_Store` is ignored.
