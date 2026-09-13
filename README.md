# Ensemble Stage — website

Public support and privacy pages for the iOS/iPadOS app **Ensemble Stage（吹奏楽セッティング）**,
served via GitHub Pages. English and Japanese are switched within the same URL.

| Page | URL |
| --- | --- |
| Home | `https://isitest1.github.io/ensemble-stage-site/` |
| Support / 使い方 | `https://isitest1.github.io/ensemble-stage-site/support.html` |
| Privacy / プライバシー | `https://isitest1.github.io/ensemble-stage-site/privacy.html` |
| Sample CSV template | `https://isitest1.github.io/ensemble-stage-site/sample_roster.csv` |
| Android/Web version sign-up | `https://isitest1.github.io/ensemble-stage-site/android/` |

The Android/Web sign-up form posts to the shared `mw-feedback-worker` (`POST /wish`, `app=ensemble-stage`), which also backs choka-log's own Android-wish page — see `ensemble-stage-android-wish-spec.md` in the portfolio repo for the full contract.

The sample CSV intentionally has **no “part” column** — the part is derived from the
primary instrument inside the app.

Screenshots in `images/` are rendered from the app’s SwiftUI previews.
