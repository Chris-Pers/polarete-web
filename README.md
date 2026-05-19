# polarete-web

Public marketing site for **polarete.com** — landing, blog (MDX), pricing, docs.

Standalone Next.js 15 App Router app. Source for content engine (poltent) reading blog MDX via GitHub API.

## Stack

- **Framework:** Next.js 15.1 App Router + MDX
- **Styling:** Tailwind v4 `@theme` (brand tokens synced from polarete)
- **i18n:** next-intl (PL primary, EN secondary)
- **Analytics:** PostHog (product) + Vercel Analytics (web)
- **Hosting:** Vercel (Free → Pro przy ~6K DAU)
- **Email:** Loops.so (waitlist + lifecycle) — TBD setup

## Quick start

```bash
npm install
npm run dev
# http://localhost:3000
```

## Scripts

| Command | Co robi |
|---------|---------|
| `npm run dev` | Dev server na :3000 |
| `npm run build` | Production build |
| `npm run start` | Run production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run sync-brand` | Manualny sync brand z lokalnego polarete clone'a |

## Brand sync

Brand tokens, logos i catalog są **live-linked** z polarete monorepo (`apps/landing/` + `brand/`).

### Auto-sync (daily PR)

GitHub Action `.github/workflows/sync-brand.yml` codziennie o 02:00 UTC sprawdza polarete brand i otwiera PR z diff'em jeśli są zmiany.

**Setup (one-time):**

1. Wygeneruj **Fine-grained PAT** w GitHub: Settings → Developer settings → [Personal access tokens (Fine-grained)](https://github.com/settings/personal-access-tokens/new)
   - Resource owner: `Chris-Pers`
   - Repository access: `Chris-Pers/polarete` (read-only)
   - Permissions: **Contents: Read-only**, Metadata: Read-only
   - Expiration: 1 rok
2. Dodaj jako secret w polarete-web:
   - Settings → Secrets and variables → Actions → New repository secret
   - Name: `POLARETE_SYNC_PAT`
   - Value: token z kroku 1
3. **Test:** Actions → "Sync brand from polarete" → "Run workflow" → main

### Manual sync (instant)

```bash
npm run sync-brand
# Lub z innego path:
POLARETE_PATH=/path/to/polarete npm run sync-brand
```

Skopiuje `src/app/globals.css`, `public/*.svg`, `brand/*` z lokalnego clone'a.

## Struktura

```
polarete-web/
├── src/
│   ├── app/                # App Router pages, layout, globals.css
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/         # Navbar, sections (Hero, Features, etc.)
│   ├── i18n/               # next-intl config (routing, request)
│   ├── lib/                # PostHog helpers
│   ├── messages/           # i18n strings (pl.json, en.json)
│   └── middleware.ts       # next-intl middleware
├── public/                 # Logos, favicons (synced)
├── brand/                  # Brand catalog (synced — showcase HTML, logo variants)
├── scripts/
│   └── sync-brand.sh       # Manual brand sync
└── .github/workflows/
    └── sync-brand.yml      # Daily automated sync
```

## Środowisko (env vars)

Skopiuj `.env.example` → `.env.local`:

```bash
# PostHog
NEXT_PUBLIC_POSTHOG_KEY=your_key
NEXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com

# Loops.so (waitlist) — TBD
LOOPS_API_KEY=
```

## Deploy

1. Connect repo w Vercel UI
2. Add env vars (z `.env.local`)
3. Add custom domain: `polarete.com`
4. Deploy

`vercel.json` ma już `framework: nextjs` i region `fra1`.

## Powiązane

- [Polarete app](https://github.com/Chris-Pers/polarete) — main product (private) + source of brand
- [Poltent](https://github.com/Chris-Pers/poltent) — content engine (private)
- [Go-To-Market Plan](https://www.notion.so/34860e48b6c281248674c4031de4cc3a)

## Roadmap

| Wersja | Co |
|--------|-----|
| v0.1.0 | ✅ Landing + i18n PL/EN + brand sync (forked z polarete/apps/landing) |
| v0.2.0 | Blog (MDX) + waitlist (Loops.so) + RSS |
| v0.3.0 | Pricing finalization + Stripe checkout link |
| v0.4.0 | Help docs + Changelog |
| v1.0.0 | Production launch (post-MVP polarete app) |
