#!/usr/bin/env bash
# Manual brand sync from local polarete clone.
#
# Usage:
#   npm run sync-brand
#   # or directly:
#   bash scripts/sync-brand.sh
#
# Requires: polarete repo cloned at $POLARETE_PATH (default: ~/Documents/App/polarete)
#
# For automated daily sync, see .github/workflows/sync-brand.yml

set -euo pipefail

POLARETE_PATH="${POLARETE_PATH:-$HOME/Documents/App/polarete}"

if [ ! -d "$POLARETE_PATH" ]; then
  echo "❌ Polarete repo not found at $POLARETE_PATH"
  echo ""
  echo "Either:"
  echo "  1. Clone polarete first:"
  echo "     git clone git@github.com:Chris-Pers/polarete.git $POLARETE_PATH"
  echo ""
  echo "  2. Or set POLARETE_PATH env var to your existing clone:"
  echo "     POLARETE_PATH=/path/to/polarete npm run sync-brand"
  exit 1
fi

echo "🎨 Syncing brand from $POLARETE_PATH"

# Brand tokens (globals.css)
mkdir -p src/app
cp "$POLARETE_PATH/apps/landing/src/app/globals.css" src/app/globals.css
echo "  ✓ src/app/globals.css"

# Logos
mkdir -p public
cp "$POLARETE_PATH/apps/landing/public/polarete-mark.svg" public/polarete-mark.svg
cp "$POLARETE_PATH/apps/landing/public/polarete-favicon.svg" public/polarete-favicon.svg
echo "  ✓ public/polarete-mark.svg"
echo "  ✓ public/polarete-favicon.svg"

# Brand catalog (showcase HTML, logo variants, source SVG)
mkdir -p brand
rsync -av --delete --quiet \
  --exclude='node_modules' --exclude='.git' \
  "$POLARETE_PATH/brand/" brand/
echo "  ✓ brand/ (full catalog)"

# Show last commit info
cd "$POLARETE_PATH"
LAST_SHA=$(git rev-parse --short HEAD)
LAST_MSG=$(git log -1 --format='%s')
LAST_DATE=$(git log -1 --format='%ai')
cd - > /dev/null

echo ""
echo "✅ Brand synced successfully"
echo "   Source commit: $LAST_SHA ($LAST_DATE)"
echo "   Last message:  $LAST_MSG"
echo ""
echo "Next steps:"
echo "  git diff                              # Review changes"
echo "  git add src/ public/ brand/"
echo "  git commit -m \"chore(brand): manual sync from polarete @ $LAST_SHA\""
