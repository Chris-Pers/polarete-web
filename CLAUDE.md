# polarete-web

Public marketing site dla polarete.com. Fork z `polarete/apps/landing` (fresh start, brak history). Brand live-linked z polarete monorepo via GitHub Action daily sync.

## Stack

Next.js 15.1 App Router · MDX · Tailwind v4 (`@theme` z polarete) · next-intl (PL/EN) · PostHog · Vercel

## Architektura

```
polarete-web/
├── src/
│   ├── app/                # globals.css (brand tokens), layout, page, robots, sitemap
│   ├── components/         # Navbar, sections (Hero, Features, HowItWorks, Pricing, FAQ, Footer)
│   ├── i18n/               # next-intl routing + request
│   ├── lib/posthog.ts
│   ├── messages/{pl,en}.json
│   └── middleware.ts
├── public/                 # Logos, favicons (synced)
├── brand/                  # Brand catalog: showcase HTML + logo variants (synced)
├── scripts/sync-brand.sh   # Manual sync override
└── .github/workflows/sync-brand.yml  # Daily auto-sync PR
```

## Brand sync — live link z polarete

**Source of truth:** `Chris-Pers/polarete` (private monorepo) — `apps/landing/src/app/globals.css` + `apps/landing/public/*.svg` + `brand/`.

**Two paths:**

1. **Auto:** `.github/workflows/sync-brand.yml` — codziennie 02:00 UTC, otwiera PR jeśli są zmiany. Wymaga secret `POLARETE_SYNC_PAT` (fine-grained PAT z read access do polarete).

2. **Manual:** `npm run sync-brand` — z lokalnego clone'a polarete (`$POLARETE_PATH` env, default `~/Documents/App/polarete`).

**Pre-deploy:** zawsze odpalaj manual sync przed dużymi UI release'ami, żeby Vercel build miał aktualne tokens.

## Decyzje techniczne

- **Fresh start** (no git history z polarete) — celowe, czysty repo, history filozofii nie wymaga
- **Standalone Next.js** (NIE pnpm workspace) — łatwiejszy single-project workflow
- **`@/*` aliases tylko** — żadnych `@polarete/*` cross-package imports
- **Brand jako kopia (synced)** — Vercel build wymaga real files, nie symlinks
- **Public repo** — SEO boost + community contributions możliwe

## Setup po pierwszym clone

```bash
git clone git@github.com:Chris-Pers/polarete-web.git
cd polarete-web
npm install

# Brand sync (jeśli zmieniony w polarete od ostatniego commit'a)
npm run sync-brand

# Dev
npm run dev
```

## Rules

Auto-loaded z `.claude/rules/`:
- `workflow.md` — Git/GitHub conventions, branches, commits, scopes (landing, blog, pricing, seo, legal, i18n, infra, ui, analytics)

## Skills

- `/sprint-start <ids>` — branch + draft PR
- `/sprint-close` — build check → merge → cleanup
- `polarete-brand` (user-level w `~/.claude/skills/`) — UI design system, brand tokens, anti-patterns

## Coding principles (z polarete AGENTS.md, ogólne)

1. **Think Before Coding.** State assumptions, present alternatives, ask if unclear.
2. **Simplicity First.** Minimum code. No premature abstractions.
3. **Surgical Changes.** Touch only what you must. Match existing style.
4. **Goal-Driven Execution.** Verifiable goals — test first when fixing.

## UI rules

Brand tokens (auto-synced z polarete):
- `--color-canvas` / `--color-surface` / `--color-ink` / `--color-spark` / `--color-anchor`
- 5% HSL saturation, hue ~30° (invisible warmth)
- Espresso anchor `#3D2B23` — punktowy mocha accent
- Watermelon spark `#FF5E54` dark / `#d63729` light

**Never:** raw hex, `text-white`/`bg-white`, custom button/input/select. Use brand tokens + `@polarete/ui` patterns when applicable (manual port z polarete jeśli brak inline).

## Powiązane

- [Polarete app](https://github.com/Chris-Pers/polarete) — main product (private), brand source
- [Poltent](https://github.com/Chris-Pers/poltent) — content engine (private)
- [Go-To-Market Plan 2026](https://www.notion.so/34860e48b6c281248674c4031de4cc3a)
