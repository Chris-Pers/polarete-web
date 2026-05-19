#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

OUT="logo-variants"
BODY_PATH='M704.673 169.151C781.253 162.893 874.659 184.97 904.962 260.04C1001.83 500.064 662.094 747.374 480.075 855.855V527.195C559.805 490.371 689.991 402.238 733.226 323.645C794.053 207.659 621.857 239.188 563.175 264.788C440.122 312.618 296.829 391.561 227.557 509.844C179.356 627.756 367.633 577.453 420.233 553.276C348.882 614.299 210.622 701.929 125.356 638.345C63.8729 592.485 138.681 492.778 179.049 448.339C306.654 307.892 513.201 184.795 704.673 169.151Z'
DOT_PATH='M531.711 446.392C562.816 446.392 588.031 421.177 588.031 390.073C588.031 358.969 562.816 333.754 531.711 333.754C500.607 333.754 475.392 358.969 475.392 390.073C475.392 421.177 500.607 446.392 531.711 446.392Z'

# id|bg|body|dot|group|name|note
VARIANTS=(
  # A. Watermelon spectrum on white (ink body) — od najjaśniejszego do najciemniejszego
  "01|#ffffff|#161618|#FF8A7E|A. Watermelon spectrum (white bg)|Coral Bright|najjaśniejszy — playful"
  "02|#ffffff|#161618|#FF7164|A. Watermelon spectrum (white bg)|Coral Light|jasny soft coral"
  "03|#ffffff|#161618|#FF5E54|A. Watermelon spectrum (white bg)|Watermelon|current dark hex na bieli"
  "04|#ffffff|#161618|#F0473C|A. Watermelon spectrum (white bg)|Coral Mid|środek skali"
  "05|#ffffff|#161618|#FE4B3F|A. Watermelon spectrum (white bg)|Coral Current Light|current light file (za ciemny)"

  # B. Polaris — granat canvas
  "06|#0a1428|#f5ede0|#FF5E54|B. Polaris (granat)|Cosmic Navy + Coral|deep cosmic + watermelon"
  "07|#141229|#f5ede0|#FF7164|B. Polaris (granat)|Indigo + Soft Coral|fioletowy podton + jaśniejszy coral"
  "08|#0d0f1a|#fafaf5|#e8b85c|B. Polaris (granat)|Midnight + Gold|gwiazda zamiast pulsu"
  "09|#141229|#f5ede0|#e8b85c|B. Polaris (granat)|Indigo + Gold Star|polarna gwiazda jako kropka"
  "10|#141229|#f5ede0|#f5ede0|B. Polaris (granat)|Indigo Mono|monochrom — bez akcentu"

  # C. Marble Academy — jasny canvas
  "11|#f5f0e6|#1a1a1a|#5e6f3f|C. Marble Academy|Marble + Olive|wieniec laurowy"
  "12|#f5f0e6|#1a1a1a|#FF5E54|C. Marble Academy|Marble + Watermelon|coral na marmurze"
  "13|#ede4d3|#2b2218|#7a8b5c|C. Marble Academy|Parchment + Sage|cottage filozofia"
  "14|#ede4d3|#2b2218|#c44d3a|C. Marble Academy|Parchment + Terracotta|antyczna ceramika"

  # D. Hybrid + UI baseline
  "15|#1f1f1f|#f8f3ec|#FF5E54|D. Hybrid / UI|UI Dark (current)|twój obecny UI surface"
  "16|#ffffff|#161618|#FE4B3F|D. Hybrid / UI|Light File (current)|current light SVG"
  "17|#1f1f1f|#f8f3ec|#f8f3ec|D. Hybrid / UI|Mono Dark|UI dark bez akcentu"
  "18|#ffffff|#161618|#161618|D. Hybrid / UI|Mono Light|black on white"
  "19|#f5ede0|#1a1a1a|#e8b85c|D. Hybrid / UI|Cream + Gold|ciepły akademicki"
  "20|#fff5f4|#1a1a1a|#FF5E54|D. Hybrid / UI|Coral Tint Bg|subtle pink bg + coral"

  # E. Brand canvas — kandydaci na brand bg z białym logo (cream body + coral/gold dot)
  "21|#0a1428|#f8f3ec|#FF5E54|E. Brand canvas (logo white)|Cosmic Navy|kosmiczny granat — premium, najczystszy"
  "22|#141229|#f8f3ec|#FF5E54|E. Brand canvas (logo white)|Indigo Polaris|granat z fioletem — mickiewiczowska noc"
  "23|#0d0f1a|#f8f3ec|#FF5E54|E. Brand canvas (logo white)|Midnight Ink|najciemniejszy blue-black, monolit"
  "24|#1f1916|#f8f3ec|#FF5E54|E. Brand canvas (logo white)|Warm Charcoal|UI dark ale cieplejszy (mniej szary)"
  "25|#1a1411|#f8f3ec|#FF5E54|E. Brand canvas (logo white)|Mocha Black|kawowy ciepły black"
  "26|#3d1a18|#f8f3ec|#FF5E54|E. Brand canvas (logo white)|Watermelon Wine|bordo z coral undertone — unique"
  "27|#2a1816|#f8f3ec|#FF5E54|E. Brand canvas (logo white)|Coral Shadow|dark coral, ciepły shadow"
  "28|#1c1620|#f8f3ec|#FF5E54|E. Brand canvas (logo white)|Plum Night|fiolet-czerń, mistycznie"
  "29|#000000|#f8f3ec|#FF5E54|E. Brand canvas (logo white)|Pure Black|absolutny luxury (zimne)"
  "30|#FF5E54|#f8f3ec|#0a1428|E. Brand canvas (logo white)|Watermelon Solid|brand color jako tło (BOLD) — dot navy"
  "31|#d63729|#f8f3ec|#e8b85c|E. Brand canvas (logo white)|Coral Deep Solid|ciemniejszy coral bg + gold dot"
  "32|#0a1428|#f8f3ec|#e8b85c|E. Brand canvas (logo white)|Cosmic + Gold Star|granat + złota gwiazda zamiast coral"

  # F. White body + 2026 trend dot (na Indigo Polaris bg)
  "33|#141229|#ffffff|#F0EEE9|F. Trend dots (white body / Indigo bg)|Cloud Dancer Pantone'26|Pantone 2026 mono — clarity/mindfulness"
  "34|#141229|#ffffff|#FF6347|F. Trend dots (white body / Indigo bg)|Coral Red 2026 trend|trend '26 — twój watermelon w trendzie"
  "35|#141229|#ffffff|#FF5E54|F. Trend dots (white body / Indigo bg)|Watermelon (current brand)|porównanie — current ze Coral Red"
  "36|#141229|#ffffff|#A47864|F. Trend dots (white body / Indigo bg)|Mocha Mousse Pantone'25|warm brown — heritage"
  "37|#141229|#ffffff|#F2D88F|F. Trend dots (white body / Indigo bg)|Butter Yellow viral'25|TikTok hot, optymistyczny"
  "38|#141229|#ffffff|#8ACE00|F. Trend dots (white body / Indigo bg)|Brat Green Charli'24|Gen Z bold, ekstrawertyczny"
  "39|#141229|#ffffff|#D2042D|F. Trend dots (white body / Indigo bg)|Cherry Red tomato girl|mocniejszy niż watermelon, alarm-energy"
  "40|#141229|#ffffff|#967BB6|F. Trend dots (white body / Indigo bg)|Digital Lavender|tech-spiritual — meditation app vibe"
  "41|#141229|#ffffff|#9CAF88|F. Trend dots (white body / Indigo bg)|Sage quiet luxury|calm green — wellness-coded"
  "42|#141229|#ffffff|#CBB674|F. Trend dots (white body / Indigo bg)|Muted Gold 2026 trend|validacja Polaris Gold — heritage"
  "43|#141229|#ffffff|#5B5EA6|F. Trend dots (white body / Indigo bg)|Aura Indigo mystical|kosmiczny purple — Polarete narrative"
  "44|#141229|#ffffff|#722F37|F. Trend dots (white body / Indigo bg)|Burgundy luxury|wine premium — dojrzała ambicja"

  # G. Ink body + dot na Cloud Dancer Pantone 2026 bg
  "45|#F0EEE9|#161618|#FF5E54|G. Cloud Dancer bg (Pantone'26)|Cloud Dancer + Watermelon|brand watermelon na Pantone 2026"
  "46|#F0EEE9|#161618|#FF6347|G. Cloud Dancer bg (Pantone'26)|Cloud Dancer + Coral'26|trend coral red na Pantone bg"
  "47|#F0EEE9|#161618|#CBB674|G. Cloud Dancer bg (Pantone'26)|Cloud Dancer + Muted Gold|trend gold — bardzo zen"
  "48|#F0EEE9|#161618|#4A635D|G. Cloud Dancer bg (Pantone'26)|Cloud Dancer + Smokey Jade|trend '26 jade — quiet calm"
)

# Gradient variants — id|bg_from|bg_to|logo|group|name|note
GRADIENT_VARIANTS=(
  # H. Mono logo + gradient bg (kolory roku 2026)
  "49|#A47864|#4E342E|#F8F3EC|H. Mono + gradient (2026 trends)|Mocha→Chocolate|Pantone'25→trend'26 — twój załącznik"
  "50|#0a1428|#141229|#F8F3EC|H. Mono + gradient (2026 trends)|Cosmic→Indigo Polaris|kosmiczny granat — primary brand"
  "51|#FF5E54|#3d1a18|#F8F3EC|H. Mono + gradient (2026 trends)|Watermelon→Wine|brand glow — coral fade"
  "52|#141229|#5B5EA6|#F8F3EC|H. Mono + gradient (2026 trends)|Indigo→Aura Lavender|narratywny — Polaris się rozjaśnia"
  "53|#0a1428|#722F37|#F8F3EC|H. Mono + gradient (2026 trends)|Cosmic→Burgundy|noc do wina — premium"
  "54|#FFBE98|#FF6347|#161618|H. Mono + gradient (2026 trends)|Peach→Coral Sunset|Pantone'24→trend'26 — energy"
  "55|#9CAF88|#4A635D|#F8F3EC|H. Mono + gradient (2026 trends)|Sage→Smokey Jade|trend'26 nature — quiet calm"
  "56|#F2D88F|#A47864|#161618|H. Mono + gradient (2026 trends)|Butter→Mocha|viral'25→Pantone'25 — warm lift"
  "57|#D2042D|#722F37|#F8F3EC|H. Mono + gradient (2026 trends)|Cherry→Burgundy|tomato girl→luxury wine"
  "58|#967BB6|#141229|#F8F3EC|H. Mono + gradient (2026 trends)|Digital Lavender→Indigo|tech-spiritual fade"
  "59|#F0EEE9|#A47864|#161618|H. Mono + gradient (2026 trends)|Cloud Dancer→Mocha|Pantone'26→Pantone'25 — light premium"
  "60|#F0EEE9|#9CAF88|#161618|H. Mono + gradient (2026 trends)|Cloud Dancer→Sage|Pantone'26→quiet luxury"
  "61|#CBB674|#8C7853|#161618|H. Mono + gradient (2026 trends)|Gold→Bronze|trend'26 metals — heritage"
  "62|#FF5E54|#FF6347|#F8F3EC|H. Mono + gradient (2026 trends)|Watermelon→Coral'26|subtle brand fade — '25→'26"
  "63|#1c1620|#5B5EA6|#F8F3EC|H. Mono + gradient (2026 trends)|Plum→Aura|mistyczny fioletowy fade"
  "64|#8ACE00|#4A635D|#F8F3EC|H. Mono + gradient (2026 trends)|Brat→Jade|Charli'24→trend'26 — vibrant calm"
  "65|#FFBE98|#FF5E54|#F8F3EC|H. Mono + gradient (2026 trends)|Peach→Watermelon|Pantone'24→brand — sunset"
  "66|#141229|#1c1620|#F8F3EC|H. Mono + gradient (2026 trends)|Indigo→Plum|deep brand night fade"
  "67|#E2725B|#4E342E|#F8F3EC|H. Mono + gradient (2026 trends)|Terracotta→Chocolate|earth tones '26 — antiquity"
  "68|#A47864|#F0EEE9|#161618|H. Mono + gradient (2026 trends)|Mocha→Cloud Dancer|Pantone'25→Pantone'26 — heritage to clarity"
)

# I. Mocha solid canvases — od najjaśniejszego po najciemniejszy (z brand watermelon dot)
SOLID_VARIANTS_I=(
  "69|#A47864|#f8f3ec|#FF5E54|I. Mocha solid canvas|Mocha Mousse Pantone'25|jasny mocha — warmth max"
  "70|#8B5A3C|#f8f3ec|#FF5E54|I. Mocha solid canvas|Burnt Sienna|warm sepia — antique paper"
  "71|#7A5444|#f8f3ec|#FF5E54|I. Mocha solid canvas|Mocha Mid|środek skali — comfort balanced"
  "72|#6F4E37|#f8f3ec|#FF5E54|I. Mocha solid canvas|Tobacco|tobacco brown — matur"
  "73|#5D4037|#f8f3ec|#FF5E54|I. Mocha solid canvas|Walnut|drewno orzechowe — heritage"
  "74|#4E342E|#f8f3ec|#FF5E54|I. Mocha solid canvas|Chocolate Brown'26|trend'26 — heritage canonical"
  "75|#3D2B23|#f8f3ec|#FF5E54|I. Mocha solid canvas|Espresso|warm dark — RECOMMENDED brand canvas"
  "76|#3B2618|#f8f3ec|#FF5E54|I. Mocha solid canvas|Coffee Bean|kawa palona — bardzo dark warm"
  "77|#2A1E1A|#f8f3ec|#FF5E54|I. Mocha solid canvas|Cocoa Bean|near-black warm — premium dark"
  "78|#1A1411|#f8f3ec|#FF5E54|I. Mocha solid canvas|Mocha Black|najciemniejszy mocha — luxury"
)
VARIANTS+=("${SOLID_VARIANTS_I[@]}")

# J. Mocha gradient bg + brand logo (cream body + watermelon dot) — gradient style z #49, kolory z #75
GRADIENT_BODY_DOT_VARIANTS=(
  "79|#3D2B23|#2A1E1A|#F8F3EC|#FF5E54|J. Mocha gradient + brand logo|Espresso Fade|subtle dark mocha — #75 → cocoa"
  "80|#A47864|#3D2B23|#F8F3EC|#FF5E54|J. Mocha gradient + brand logo|Mocha→Espresso|Pantone'25 → #75 — depth fade"
  "81|#4E342E|#3D2B23|#F8F3EC|#FF5E54|J. Mocha gradient + brand logo|Chocolate→Espresso|trend'26 → #75 — heritage warm"
  "82|#3D2B23|#1A1411|#F8F3EC|#FF5E54|J. Mocha gradient + brand logo|Espresso→Mocha Black|warm dark progression"
  "83|#5D4037|#2A1E1A|#F8F3EC|#FF5E54|J. Mocha gradient + brand logo|Walnut→Cocoa|drewno → kakao — natural fade"

  # K. 50 gradient endpoints — Espresso #3D2B23 jako start, body+dot wymagane
  # Mocha family (10) — depth & shade
  "84|#3D2B23|#A47864|#F8F3EC|#FF5E54|K. 50 gradients (#3D2B23 base)|→ Mocha Mousse|Espresso → Pantone'25 — high visibility"
  "85|#3D2B23|#6F4E37|#F8F3EC|#FF5E54|K. 50 gradients (#3D2B23 base)|→ Tobacco|warm wood fade"
  "86|#3D2B23|#5D4037|#F8F3EC|#FF5E54|K. 50 gradients (#3D2B23 base)|→ Walnut|drewno orzechowe"
  "87|#3D2B23|#7A5444|#F8F3EC|#FF5E54|K. 50 gradients (#3D2B23 base)|→ Mocha Mid|środek skali"
  "88|#3D2B23|#8B5A3C|#F8F3EC|#FF5E54|K. 50 gradients (#3D2B23 base)|→ Burnt Sienna|warm sepia"
  "89|#3D2B23|#C2A48E|#F8F3EC|#FF5E54|K. 50 gradients (#3D2B23 base)|→ Latte|kremowy mocha"
  "90|#3D2B23|#1A1411|#F8F3EC|#FF5E54|K. 50 gradients (#3D2B23 base)|→ Mocha Black|warm dark"
  "91|#3D2B23|#0F0A07|#F8F3EC|#FF5E54|K. 50 gradients (#3D2B23 base)|→ Black Coffee|max dark fade"
  "92|#3D2B23|#2D1810|#F8F3EC|#FF5E54|K. 50 gradients (#3D2B23 base)|→ Burnt Wood|wypalone drewno"
  "93|#3D2B23|#4E342E|#F8F3EC|#FF5E54|K. 50 gradients (#3D2B23 base)|→ Chocolate'26|trend mocha subtle"
  # Coral / Watermelon (10)
  "94|#3D2B23|#FF5E54|#F8F3EC|#F8F3EC|K. 50 gradients (#3D2B23 base)|→ Watermelon|brand spark FLAGSHIP"
  "95|#3D2B23|#FF8A7E|#F8F3EC|#FF5E54|K. 50 gradients (#3D2B23 base)|→ Coral Bright|playful spark"
  "96|#3D2B23|#FF6347|#F8F3EC|#FF5E54|K. 50 gradients (#3D2B23 base)|→ Coral Red'26|trend coral"
  "97|#3D2B23|#d63729|#F8F3EC|#FF5E54|K. 50 gradients (#3D2B23 base)|→ Watermelon Deep|dojrzały coral"
  "98|#3D2B23|#FF7164|#F8F3EC|#FF5E54|K. 50 gradients (#3D2B23 base)|→ Coral Light|jasny coral"
  "99|#3D2B23|#c44d3a|#F8F3EC|#FF5E54|K. 50 gradients (#3D2B23 base)|→ Terracotta|antyk ceramika"
  "100|#3D2B23|#FFBE98|#F8F3EC|#FF5E54|K. 50 gradients (#3D2B23 base)|→ Peach Fuzz'24|Pantone 2024"
  "101|#3D2B23|#E2725B|#F8F3EC|#FF5E54|K. 50 gradients (#3D2B23 base)|→ Earth Coral|warm earth"
  "102|#3D2B23|#FFA180|#F8F3EC|#FF5E54|K. 50 gradients (#3D2B23 base)|→ Sunset Coral|sunset glow"
  "103|#3D2B23|#FF3120|#F8F3EC|#FF5E54|K. 50 gradients (#3D2B23 base)|→ Pomegranate|deep red orange"
  # Burgundy / Wine (5)
  "104|#3D2B23|#722F37|#F8F3EC|#FF5E54|K. 50 gradients (#3D2B23 base)|→ Burgundy|wine luxury"
  "105|#3D2B23|#5D1B25|#F8F3EC|#FF5E54|K. 50 gradients (#3D2B23 base)|→ Deep Wine|premium wine"
  "106|#3D2B23|#B33A3A|#F8F3EC|#FF5E54|K. 50 gradients (#3D2B23 base)|→ Crimson|dramatic red"
  "107|#3D2B23|#8B0000|#F8F3EC|#FF5E54|K. 50 gradients (#3D2B23 base)|→ Dark Red|alarm red"
  "108|#3D2B23|#D2042D|#F8F3EC|#FF5E54|K. 50 gradients (#3D2B23 base)|→ Cherry Red|tomato girl"
  # Gold / Yellow (6)
  "109|#3D2B23|#CBB674|#F8F3EC|#FF5E54|K. 50 gradients (#3D2B23 base)|→ Muted Gold'26|trend gold heritage"
  "110|#3D2B23|#e8b85c|#F8F3EC|#FF5E54|K. 50 gradients (#3D2B23 base)|→ Polaris Gold|gwiazda polarna"
  "111|#3D2B23|#F2D88F|#F8F3EC|#FF5E54|K. 50 gradients (#3D2B23 base)|→ Butter Yellow|viral'25"
  "112|#3D2B23|#DAA520|#F8F3EC|#FF5E54|K. 50 gradients (#3D2B23 base)|→ Goldenrod|vintage gold"
  "113|#3D2B23|#F5DF4D|#F8F3EC|#FF5E54|K. 50 gradients (#3D2B23 base)|→ Lemon Bright|optimism"
  "114|#3D2B23|#B8893D|#F8F3EC|#FF5E54|K. 50 gradients (#3D2B23 base)|→ Bronze|metallic warmth"
  # Trend 2026 / Neutrals warm (5)
  "115|#3D2B23|#4A635D|#F8F3EC|#FF5E54|K. 50 gradients (#3D2B23 base)|→ Smokey Jade'26|trend nature"
  "116|#3D2B23|#CAB9A9|#F8F3EC|#FF5E54|K. 50 gradients (#3D2B23 base)|→ Soft Taupe'26|warm neutral"
  "117|#3D2B23|#F5F5DC|#161618|#FF5E54|K. 50 gradients (#3D2B23 base)|→ Warm Ivory|stary papier (ink logo)"
  "118|#3D2B23|#F0EEE9|#161618|#FF5E54|K. 50 gradients (#3D2B23 base)|→ Cloud Dancer'26|Pantone 2026 fade"
  "119|#3D2B23|#DCC9B6|#161618|#FF5E54|K. 50 gradients (#3D2B23 base)|→ Sand Beige|piasek pustyni"
  # Purple / Lavender (5)
  "120|#3D2B23|#5B5EA6|#F8F3EC|#FF5E54|K. 50 gradients (#3D2B23 base)|→ Aura Indigo|kosmiczny"
  "121|#3D2B23|#967BB6|#F8F3EC|#FF5E54|K. 50 gradients (#3D2B23 base)|→ Digital Lavender|tech-spiritual"
  "122|#3D2B23|#6A4C93|#F8F3EC|#FF5E54|K. 50 gradients (#3D2B23 base)|→ Royal Purple|król wieczoru"
  "123|#3D2B23|#2A1B3D|#F8F3EC|#FF5E54|K. 50 gradients (#3D2B23 base)|→ Plum Night|fioletowa noc"
  "124|#3D2B23|#4A0E4E|#F8F3EC|#FF5E54|K. 50 gradients (#3D2B23 base)|→ Deep Purple|głęboki fiolet"
  # Green family (5)
  "125|#3D2B23|#9CAF88|#F8F3EC|#FF5E54|K. 50 gradients (#3D2B23 base)|→ Sage|quiet luxury"
  "126|#3D2B23|#5e6f3f|#F8F3EC|#FF5E54|K. 50 gradients (#3D2B23 base)|→ Olive Laurel|wieniec mądrości"
  "127|#3D2B23|#228B22|#F8F3EC|#FF5E54|K. 50 gradients (#3D2B23 base)|→ Forest|gęsta zieleń"
  "128|#3D2B23|#8ACE00|#F8F3EC|#FF5E54|K. 50 gradients (#3D2B23 base)|→ Brat Green|Charli'24 bold"
  "129|#3D2B23|#4ade80|#F8F3EC|#FF5E54|K. 50 gradients (#3D2B23 base)|→ Mint Health|space-health color"
  # Neutrals extreme (4)
  "130|#3D2B23|#f8f3ec|#161618|#FF5E54|K. 50 gradients (#3D2B23 base)|→ Creamy Milk|ink logo dla light end"
  "131|#3D2B23|#161618|#F8F3EC|#FF5E54|K. 50 gradients (#3D2B23 base)|→ Ink Black|maksymalny dark"
  "132|#3D2B23|#FFFFFF|#161618|#FF5E54|K. 50 gradients (#3D2B23 base)|→ Pure White|maksymalny jasny"
  "133|#3D2B23|#2c2826|#F8F3EC|#FF5E54|K. 50 gradients (#3D2B23 base)|→ Warm Charcoal|UI dark warm"
)

mkdir -p "$OUT"
rm -f "$OUT"/*.svg

for v in "${VARIANTS[@]}"; do
  IFS='|' read -r id bg body dot group name note <<< "$v"
  cat > "$OUT/${id}-${name// /-}.svg" <<EOF
<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <rect width="1024" height="1024" rx="221.867" fill="${bg}"/>
  <path d="${BODY_PATH}" fill="${body}"/>
  <path d="${DOT_PATH}" fill="${dot}"/>
</svg>
EOF
done

for v in "${GRADIENT_VARIANTS[@]}"; do
  IFS='|' read -r id bg_from bg_to logo group name note <<< "$v"
  cat > "$OUT/${id}-${name// /-}.svg" <<EOF
<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bg_from}"/>
      <stop offset="100%" stop-color="${bg_to}"/>
    </linearGradient>
  </defs>
  <rect width="1024" height="1024" rx="221.867" fill="url(#g${id})"/>
  <path d="${BODY_PATH}" fill="${logo}"/>
  <path d="${DOT_PATH}" fill="${logo}"/>
</svg>
EOF
done

for v in "${GRADIENT_BODY_DOT_VARIANTS[@]}"; do
  IFS='|' read -r id bg_from bg_to body dot group name note <<< "$v"
  cat > "$OUT/${id}-${name// /-}.svg" <<EOF
<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bg_from}"/>
      <stop offset="100%" stop-color="${bg_to}"/>
    </linearGradient>
  </defs>
  <rect width="1024" height="1024" rx="221.867" fill="url(#g${id})"/>
  <path d="${BODY_PATH}" fill="${body}"/>
  <path d="${DOT_PATH}" fill="${dot}"/>
</svg>
EOF
done

echo "Generated $(ls "$OUT"/*.svg | wc -l | tr -d ' ') SVG variants"

# Build HTML gallery
python3 - "$OUT" "${#VARIANTS[@]}" "${#GRADIENT_VARIANTS[@]}" "${VARIANTS[@]}" "${GRADIENT_VARIANTS[@]}" "${GRADIENT_BODY_DOT_VARIANTS[@]}" <<'PYEOF' > index.html
import sys, html
out_dir = sys.argv[1]
solid_count = int(sys.argv[2])
gradient_count = int(sys.argv[3])
all_args = sys.argv[4:]
variants = []
for v in all_args[:solid_count]:
    parts = v.split("|")
    variants.append(dict(kind="solid", id=parts[0], bg=parts[1], body=parts[2], dot=parts[3],
                         group=parts[4], name=parts[5], note=parts[6]))
for v in all_args[solid_count:solid_count+gradient_count]:
    parts = v.split("|")
    variants.append(dict(kind="gradient", id=parts[0], bg_from=parts[1], bg_to=parts[2], logo=parts[3],
                         group=parts[4], name=parts[5], note=parts[6]))
for v in all_args[solid_count+gradient_count:]:
    parts = v.split("|")
    variants.append(dict(kind="gradient2", id=parts[0], bg_from=parts[1], bg_to=parts[2],
                         body=parts[3], dot=parts[4], group=parts[5], name=parts[6], note=parts[7]))

groups = {}
for v in variants:
    groups.setdefault(v["group"], []).append(v)

html_out = ['''<!doctype html>
<html lang="pl"><head><meta charset="utf-8"/>
<title>Polarete — Logo Variants</title>
<style>
  :root { --ink: #1a1a1a; --muted: #6b6b6b; }
  * { box-sizing: border-box; }
  body { margin: 0; padding: 32px; font-family: -apple-system, BlinkMacSystemFont, "Inter", sans-serif; background: #f4f4f1; color: var(--ink); }
  h1 { margin: 0 0 8px; font-weight: 700; letter-spacing: -0.02em; }
  .lede { color: var(--muted); margin: 0 0 32px; max-width: 60ch; }
  h2 { margin: 32px 0 16px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); font-weight: 600; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
  .card { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
  .preview { aspect-ratio: 1; display: flex; align-items: center; justify-content: center; }
  .preview img { width: 78%; height: 78%; }
  .meta { padding: 12px 14px; border-top: 1px solid rgba(0,0,0,0.06); }
  .label { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px; }
  .name { font-weight: 600; font-size: 13px; }
  .id { font-family: ui-monospace, "SF Mono", monospace; font-size: 11px; color: var(--muted); }
  .note { font-size: 11px; color: var(--muted); margin-bottom: 8px; }
  .hexes { display: flex; gap: 6px; font-family: ui-monospace, "SF Mono", monospace; font-size: 10px; }
  .hex { display: flex; align-items: center; gap: 4px; }
  .swatch { width: 10px; height: 10px; border-radius: 2px; border: 1px solid rgba(0,0,0,0.1); }
</style>
</head><body>
<h1>Polarete — 68 wariantów logo</h1>
<p class="lede">A: spektrum watermelon. B: Polaris (granat). C: Marble Academy. D: hybrydy + current. E: brand canvas (white logo). F: trend dots 2026 na granat. G: Cloud Dancer Pantone'26. H: mono logo + gradient (kolory roku 2026).</p>
''']

for group, items in groups.items():
    html_out.append(f'<h2>{html.escape(group)}</h2><div class="grid">')
    for v in items:
        fname = f'{v["id"]}-{v["name"].replace(" ","-")}.svg'
        if v["kind"] == "solid":
            bg_style = v["bg"]
            hexes = f'''
      <span class="hex"><span class="swatch" style="background:{v["bg"]}"></span>{v["bg"]}</span>
      <span class="hex"><span class="swatch" style="background:{v["body"]}"></span>{v["body"]}</span>
      <span class="hex"><span class="swatch" style="background:{v["dot"]}"></span>{v["dot"]}</span>'''
        elif v["kind"] == "gradient":
            bg_style = f'linear-gradient(135deg, {v["bg_from"]}, {v["bg_to"]})'
            hexes = f'''
      <span class="hex"><span class="swatch" style="background:{v["bg_from"]}"></span>{v["bg_from"]}</span>
      <span class="hex"><span class="swatch" style="background:{v["bg_to"]}"></span>{v["bg_to"]}</span>
      <span class="hex"><span class="swatch" style="background:{v["logo"]}"></span>{v["logo"]}</span>'''
        else:  # gradient2
            bg_style = f'linear-gradient(135deg, {v["bg_from"]}, {v["bg_to"]})'
            hexes = f'''
      <span class="hex"><span class="swatch" style="background:{v["bg_from"]}"></span>{v["bg_from"]}</span>
      <span class="hex"><span class="swatch" style="background:{v["bg_to"]}"></span>{v["bg_to"]}</span>
      <span class="hex"><span class="swatch" style="background:{v["body"]}"></span>{v["body"]}</span>
      <span class="hex"><span class="swatch" style="background:{v["dot"]}"></span>{v["dot"]}</span>'''
        html_out.append(f'''
<div class="card">
  <div class="preview" style="background:{bg_style}">
    <img src="{out_dir}/{fname}" alt="{v["name"]}"/>
  </div>
  <div class="meta">
    <div class="label"><span class="name">{html.escape(v["name"])}</span><span class="id">#{v["id"]}</span></div>
    <div class="note">{html.escape(v["note"])}</div>
    <div class="hexes">{hexes}
    </div>
  </div>
</div>''')
    html_out.append('</div>')

html_out.append('</body></html>')
print('\n'.join(html_out))
PYEOF

echo "Generated index.html"
