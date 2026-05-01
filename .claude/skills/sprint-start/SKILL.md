---
name: sprint-start
description: Inicjalizuje nowy sprint w Polarete-Web (landing + blog) — tworzy branch, draft PR i podpina issues do projektu GitHub. Wywołaj gdy użytkownik pisze `/sprint-start` z numerami issues lub mówi "zacznij sprint", "nowy sprint".
---

# Sprint Start — Polarete-Web

Inicjalizuje sprint: branch + draft PR + issues w projekcie GitHub (jeśli istnieje).

## Stałe projektu

- **Repo:** `Chris-Pers/polarete-web`
- **GitHub Project ID:** TBD — utworzyć przy potrzebie multi-issue trackingu

## Kroki

### 1. Parsuj issue numbers z args

Wyciągnij numery issues z argumentów. Jeśli brak — zapytaj użytkownika.

### 2. Pobierz dane issues

```bash
gh issue view <N> --repo Chris-Pers/polarete-web --json number,title,labels,body,milestone
```

### 3. Sprawdź blokery

Jeśli body zawiera `## ⚠️ Zależności` z `Wymaga: #X`:
```bash
gh issue view <X> --repo Chris-Pers/polarete-web --json state
```
Ostrzeż użytkownika jeśli bloker open.

### 4. Utwórz branch

Format: `feat/sprint-<id1>-<id2>-...`

```bash
git checkout main && git pull --quiet
git checkout -b feat/sprint-<ids>
```

### 5. Init commit + push

```bash
git commit --allow-empty -m "chore(claude): init sprint — #<id1> #<id2> ..."
git push -u origin feat/sprint-<ids> --quiet
```

### 6. Utwórz draft PR

```bash
gh pr create --repo Chris-Pers/polarete-web --draft \
  --title "feat: sprint <ids>" \
  --body "## Issues\n\n- closes #<N> <title>\n\n## Status\nDraft — praca w toku." \
  --base main
```

Tytuł PR z scope: `feat(landing): ...`, `feat(blog): ...`, `feat(seo): ...`.

### 7. Dodaj do projektu GitHub (jeśli istnieje)

Pomiń jeśli nie ma project. Inaczej:
```bash
gh api graphql -f query='query { repository(owner:"Chris-Pers", name:"polarete-web") { issue(number:<N>) { id } } }' --jq '.data.repository.issue.id'
gh api graphql -f query='mutation { addProjectV2ItemById(input: {projectId: "<PROJECT_ID>", contentId: "<node_id>"}) { item { id } } }'
```

### 8. Output blok kontekstu

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SPRINT CONTEXT — Issue #<N>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Branch: feat/sprint-<ids>
Issue: #<N> — <title>

git checkout feat/sprint-<ids> && git pull
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Link do draft PR na końcu.
