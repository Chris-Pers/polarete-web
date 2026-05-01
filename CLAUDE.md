# Polarete-Web — Public Marketing Site

Landing page, blog, docs, changelog dla polarete.com. Source-of-truth dla content engine (poltent czyta MDX z tego repo).

## Stack

Next.js 15 App Router · Tailwind v4 + brand tokens z polarete · MDX · Vercel
Loops.so (waitlist + email) · Vercel Analytics (free) → Plausible (post-launch)

## Architektura

```
polarete-web/
├── app/
│   ├── (marketing)/      # Landing, features, pricing
│   ├── (blog)/           # Blog index + posts (v0.2+)
│   ├── (legal)/          # Privacy, terms
│   ├── api/
│   │   ├── waitlist/     # Loops.so integration
│   │   └── og/           # Dynamic OG images
│   └── globals.css       # Tailwind v4 + brand tokens
├── components/
│   ├── brand/            # Logo, Wordmark
│   ├── sections/         # Hero, Features, FAQ
│   └── ui/               # Button, Input, Card
├── content/              # MDX blog posts (v0.2+)
├── lib/
│   ├── loops.ts
│   └── seo.ts
└── public/
    ├── polarete-mark.svg
    └── polarete-favicon.svg
```

## Decyzje

- **Repo:** **public** — SEO boost + build-in-public credibility
- **Brand:** copy tokens z polarete (`@theme` w globals.css), refactor do `@polarete/brand` przy monorepo migration
- **i18n:** PL primary na MVP, EN w v0.2 via next-intl
- **Hosting:** Vercel Free do ~6K DAU, Pro ($20) potem
- **Email:** Loops.so (free <500 subs)
- **Analytics:** Vercel Analytics na MVP, Plausible po PH launch
- **Theme:** `next-themes` (spójne z polarete app)

## Roadmap

| Wersja | Co |
|--------|-----|
| v0.1.0 | Homepage + waitlist (Loops.so) + SEO + OG |
| v0.2.0 | Blog (MDX) + i18n PL/EN + RSS |
| v0.3.0 | Pricing page + Stripe checkout |
| v0.4.0 | Help docs + Changelog |
| v0.5.0 | Customer stories + Use cases |
| v1.0.0 | Production launch |

## Brand transfer z polarete

Skopiuj z `~/Documents/App/polarete/`:
- `src/styles/globals.css` sekcja `@theme` (kolory, fonts, spacing)
- `public/polarete-mark.svg` → `public/polarete-mark.svg`
- `public/polarete-favicon.svg` → `public/polarete-favicon.svg`

Font Satoshi via Fontshare CDN w `<head>` layoutu.

Skill `polarete-brand` (user-level) — automatyczny przy pracy nad UI.

## Bezpieczeństwo (public repo)

- `.env.local` w `.gitignore` (Loops API key, Stripe key)
- Build-time env z Vercel UI, nie z code
- Brak danych klientów (waitlist email idzie bezpośrednio do Loops, nie do nas)
- ToS + Privacy w v0.2 przed PH launch

## Rules

Auto-loaded z `.claude/rules/`:
- `workflow.md` — Git/GitHub conventions, branches, commits, scopes

## Skills

- `/sprint-start <ids>` — branch + draft PR
- `/sprint-close` — build check → merge → cleanup
- `polarete-brand` (user-level) — UI design system

## Powiązane

- [Polarete app](https://github.com/Chris-Pers/polarete) — main product (private), source of brand tokens
- [Poltent](https://github.com/Chris-Pers/poltent) — content engine (private), czyta blog MDX z tego repo (v0.2+)
- [Go-To-Market Plan](https://www.notion.so/34860e48b6c281248674c4031de4cc3a)
