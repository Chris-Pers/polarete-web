---
name: sprint-close
description: Zamyka sprint w Polarete-Web — weryfikuje build, aktualizuje PR, merguje branch do main. Wywołaj gdy użytkownik pisze `/sprint-close`, "zamknij sprint", "merguj sprint", "skończ sprint".
---

# Sprint Close — Polarete-Web

Zamyka sprint: build check → PR ready → merge commit → cleanup.

## Stałe projektu

- **Repo:** `Chris-Pers/polarete-web`
- **Merge strategy:** merge commit (NIGDY squash ani rebase)
- **Build cmd:** `npm run build` (Next.js)

## Kroki

### 1. Wykryj branch

```bash
git branch --show-current
```

Jeśli `main` lub nie pasuje do `feat/sprint-*` — zapytaj.

### 2. Commit niezapisanych zmian

```bash
git status --short
```

Jeśli zmiany — commit od razu:
```bash
git add app/ components/ lib/ public/ content/ .claude/
git commit -m "feat: sprint final changes before close"
git push --quiet
```

Pomiń `.env.local`, `.next/`, `node_modules/`.

### 3. Pobierz stan brancha

```bash
git pull --quiet
git log main..HEAD --oneline
git diff main..HEAD --stat
```

### 4. Zaktualizuj opis PR

```bash
gh pr view --repo Chris-Pers/polarete-web --json number,body,title
```

Zachowaj `## Issues`, dodaj `## Changes`.

```bash
gh pr edit <N> --repo Chris-Pers/polarete-web --body "<updated_body>"
```

### 5. Build check — twarda blokada

```bash
npm run build 2>&1
```

Jeśli fail — zatrzymaj się, pokaż błędy.

### 6. Mark PR ready

```bash
gh pr ready --repo Chris-Pers/polarete-web
```

### 7. Merge do main

```bash
gh pr merge --repo Chris-Pers/polarete-web --merge --delete-branch
git checkout main && git pull --quiet
git branch -d feat/sprint-<ids> 2>/dev/null || true
```

### 8. Zweryfikuj zamknięcie issues

```bash
gh issue view <N> --repo Chris-Pers/polarete-web --json state,number,title
```

### 9. Raport końcowy

```
✓ PR #<N> merged → main
✓ Branch feat/sprint-<ids> usunięty
✓ Issues zamknięte: #<id1>, #<id2>, ...
```

Link do PR na końcu.
