# Git & GitHub Workflow — Polarete-Web

## Branches
| Format | Example |
|--------|---------|
| `feat/short-desc` | `feat/landing-hero` |
| `fix/short-desc` | `fix/og-image-rendering` |
| `refactor/short-desc` | `refactor/seo-helpers` |
| `chore/short-desc` | `chore/update-deps` |
| `docs/short-desc` | `docs/contributing` |

`main` is always stable — never commit directly except `chore(claude):`, `docs:`, one-liners.

## Commit Messages
```
feat(scope): description
fix(scope): description
refactor(scope): description
chore(scope): description
docs(scope): description
```

**Scopes:**
`landing` | `blog` | `pricing` | `seo` | `legal` | `i18n` | `infra` | `ui` | `analytics` | `ci` | `claude`

- `landing` = homepage, marketing pages
- `blog` = MDX blog infra, posts, RSS
- `pricing` = pricing page, Stripe integration
- `seo` = meta tags, sitemap, OG images, structured data
- `legal` = privacy policy, terms, GDPR pages
- `i18n` = next-intl setup, PL/EN translations
- `infra` = Vercel, deploy, env vars
- `ui` = shared components, design tokens
- `analytics` = Vercel/Plausible/PostHog tracking
- `ci` = GitHub Actions, linting
- `claude` = `.claude/` config changes

## Version Tags
```
v0.1.0  — Homepage + waitlist MVP
v0.2.0  — Blog (MDX) + i18n PL/EN
v0.3.0  — Pricing + Stripe checkout
v0.4.0  — Help docs + Changelog
v0.5.0  — Customer stories + Use cases
v1.0.0  — Production launch
```

## Pull Requests
- Każda zmiana przez PR (solo dev też)
- Wyjątki: `chore(claude):`, `docs:`, one-line fixes
- PR title = commit format: `feat(landing): add hero section`
- Auto-delete branch after merge

## GitHub Issues & Labels

**Label set (lekki):**
- **Type:** `feat`, `fix`, `refactor`, `chore`, `docs`
- **Size:** `short`, `medium`, `large`
- **Scope:** dodawane gdy potrzebne

## Public repo notes

- README publiczny — prezentuje produkt, build-in-public credibility
- `.env.local` ZAWSZE w `.gitignore` (zero secrets w commitach)
- Nigdy nie commit'uj API keys, OAuth tokens, Stripe secrets
- Issue templates w `.github/ISSUE_TEMPLATE/` (v0.2+)

## Daily Workflow
```bash
git checkout main && git pull
git checkout -b type/short-desc
# work, commit
gh pr create --draft
# review, merge
git tag vX.Y.Z && git push origin vX.Y.Z
```
