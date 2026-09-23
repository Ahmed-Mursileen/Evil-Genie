---
name: Evil Genie
description: An amil-baba wall chalking at night that grants any wish; the twist is the fine print painted underneath.
colors:
  night-plaster: "#15101d"
  plaster-bloom: "#231a2f"
  crack-black: "#08060c"
  marigold-paint: "#f2b632"
  marigold-drop-shade: "#9a6108"
  chalking-violet: "#a472ff"
  violet-underpaint: "#4a2396"
  bone-whitewash: "#efe6d8"
  faded-chalk: "#b8abc9"
  paint-ink: "#1b1024"
  yellow-void: "#0d0c07"
  yellow-plaster-bloom: "#1c190b"
  yellow-crack: "#000000"
  yellow-pale-gold: "#f4e27a"
  yellow-drop-shade: "#6b5a06"
  yellow-sign: "#e3c62b"
  yellow-underpaint: "#3d3304"
  yellow-bone: "#efe8c4"
  yellow-faded-chalk: "#b9ae76"
  yellow-ink: "#141203"
typography:
  display:
    fontFamily: "Rubik Spray Paint, Barlow Condensed, sans-serif"
    fontSize: "clamp(3.4rem, 17vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.88
    letterSpacing: "-0.01em"
  display-wide:
    fontFamily: "Rubik Spray Paint, Barlow Condensed, sans-serif"
    fontSize: "clamp(6rem, 10vw, 9rem)"
    fontWeight: 400
    lineHeight: 0.88
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Rubik Spray Paint, sans-serif"
    fontSize: "clamp(2.2rem, 10vw, 3.2rem)"
    fontWeight: 400
    lineHeight: 1
  title:
    fontFamily: "Rubik Spray Paint, sans-serif"
    fontSize: "clamp(1.6rem, 7vw, 2.1rem)"
    fontWeight: 400
    lineHeight: 1.1
  urdu:
    fontFamily: "Noto Nastaliq Urdu, serif"
    fontSize: "clamp(1.5rem, 6vw, 2rem)"
    fontWeight: 700
    lineHeight: 2.2
  twist:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(1.55rem, 6.2vw, 2.15rem)"
    fontWeight: 600
    lineHeight: 1.16
  wish-input:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(1.35rem, 5.4vw, 1.6rem)"
    fontWeight: 600
    lineHeight: 1.2
  tagline:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(1.15rem, 4.6vw, 1.4rem)"
    fontWeight: 600
    letterSpacing: "0.02em"
  body:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 500
    lineHeight: 1.45
  label:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "1.1rem"
    fontWeight: 700
    lineHeight: 1.45
  summon:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(1.5rem, 6vw, 1.85rem)"
    fontWeight: 700
    letterSpacing: "0.06em"
  small:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 600
    fontFeature: "tnum"
rounded:
  none: "0px"
spacing:
  gutter: "16px"
  xs: "0.35rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "1.4rem"
  xl: "1.6rem"
  verdict: "2.6rem"
  section: "3.4rem"
components:
  button-summon:
    backgroundColor: "{colors.marigold-paint}"
    textColor: "{colors.paint-ink}"
    typography: "{typography.summon}"
    rounded: "{rounded.none}"
    padding: "0.95rem 1rem"
    width: "100%"
  button-summon-disabled:
    backgroundColor: "color-mix(in oklab, #f2b632 55%, #15101d)"
    textColor: "{colors.paint-ink}"
  wish-panel:
    backgroundColor: "{colors.bone-whitewash}"
    textColor: "{colors.paint-ink}"
    typography: "{typography.wish-input}"
    rounded: "{rounded.none}"
    padding: "0.25rem 1rem 0.2rem"
  wish-panel-label:
    textColor: "{colors.violet-underpaint}"
    typography: "{typography.label}"
    padding: "0.8rem 1rem 0"
  mood-chip:
    textColor: "{colors.bone-whitewash}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.3rem 0.6rem"
  mood-chip-hover:
    textColor: "{colors.marigold-paint}"
  mood-chip-selected:
    backgroundColor: "{colors.chalking-violet}"
    textColor: "{colors.paint-ink}"
  text-action:
    textColor: "{colors.marigold-paint}"
    typography: "{typography.label}"
    padding: "0.35rem 0"
  text-action-quiet:
    textColor: "{colors.faded-chalk}"
    padding: "0.35rem 0"
  verdict-stamp:
    textColor: "{colors.marigold-paint}"
    typography: "{typography.headline}"
  twist-line:
    textColor: "{colors.bone-whitewash}"
    typography: "{typography.twist}"
    width: "30ch"
---

# Design System: Evil Genie

## Overview

**Creative North Star: "The Amil Baba's Wall at Night"**

Every surface is one stretch of cracked, damp plaster after dark, painted by a street sign-painter who advertises a baba who fixes everything. The wall promises in gold and violet; the genie's verdict is sprayed underneath in bone whitewash, like fine print. Nothing floats above the wall: panels are whitewash brushed onto it, buttons are blocks of paint that drip, choices are chalk underlines, headings are spray lettering. Rough edges come from displacement filters and noise masks, never from rounded corners or card borders.

Density is a single narrow column of painted notices on a phone (40rem max), widening on desktop into a two-column wall where the masthead stays pinned on the left like a permanent sign and the working notices run down the right. The mood is dread with a straight face: the wall is dim, the paint is loud, and the twist is the biggest body-type on the page. Old chalkings, half washed off, sit behind everything at 7–8% opacity so the wall always feels used.

The King in Yellow mood repaints the same wall rather than swapping the layout: every token is redefined on `[data-mood="yellow"]` to black plaster and sick yellow paint, with a 900ms repaint. The rejected category default is the glowing lamp on a purple-gradient card.

**Key Characteristics:**
- One wall, painted: night plaster ground, marigold and violet paint, bone whitewash for fine print.
- Spray-paint display lettering, condensed painted body, Nastaliq for the Urdu promise.
- Zero border-radius anywhere; roughness comes from SVG turbulence displacement and noise masks.
- Paint-native depth only: drop shade and overspray halo on lettering, no UI shadows.
- Motion is physical: spray sweep reveal, lamp rattle and smoke, paint filling a chalk label.
- A mood can repaint the whole wall by redefining tokens, never by changing structure.

## Colors

A dark violet-black plaster ground carrying two loud paint colours and one bone whitewash, all redefined wholesale by the yellow mood.

### Primary
- **Marigold Paint** (marigold-paint): the promise and the call to act. The Murad maango paint block and its drips, the Urdu line, the Manzoor./Nahi. stamp, text actions (Copy karo, Share karo), hover state on chalk labels and history items, error status, selection highlight, and the focus ring.
- **Marigold Drop Shade** (marigold-drop-shade): the sign-painter's offset shade under the violet title and the incised line on the lamp. Never a fill.

### Secondary
- **Chalking Violet** (chalking-violet): the title lettering, section headings in spray (Purani muradein), and the paint that fills a selected mood chip. Ghost chalkings alternate bone and violet.
- **Violet Underpaint** (violet-underpaint): dark violet used on whitewash (the wish label, the over-limit counter, the caret) and for the scrollbar thumb.

### Tertiary (The King in Yellow repaint)
Applied only under `[data-mood="yellow"]`, mapping one-to-one onto the default roles: **Yellow Void** replaces night plaster, **Yellow Plaster Bloom** the bloom, **Yellow Crack** the cracks, **Yellow Pale Gold** the marigold, **Yellow Drop Shade** the drop shade, **Yellow Sign** the chalking violet, **Yellow Underpaint** the violet underpaint, **Yellow Bone** the whitewash, **Yellow Faded Chalk** the faded chalk, **Yellow Ink** the paint ink.

### Neutral
- **Night Plaster** (night-plaster): the wall itself, also the browser theme colour.
- **Plaster Bloom** (plaster-bloom): lighter damp patches (radial blooms on the wall) and the chipped edge of each crack.
- **Crack Black** (crack-black): crack gaps, damp stains mask, the page behind the wall.
- **Bone Whitewash** (bone-whitewash): body text, the twist, and the whitewash panel behind the wish box.
- **Faded Chalk** (faded-chalk): secondary text on the wall: legend, mood hint, status, the "Khwahish thi" line, history wishes, footer, quiet actions, lamp smoke.
- **Paint Ink** (paint-ink): text painted onto a light or paint surface (inside the whitewash, on the gold block, on the violet mood fill).

### Named Rules
**The Paint, Not Pixels Rule.** Every colour sits on the wall as paint. Tints and disabled states are `color-mix(in oklab, …)` of existing tokens (gold 55% into wall for disabled, bone 92% into gold for a focused panel), never new hues.

**The Repaint Rule.** A mood changes the wall by redefining the same custom properties on `[data-mood]`. Components reference `var(--gold)`, `var(--violet)` and friends, never literal hex, so one attribute repaints everything.

**The Fine Print Rule.** The twist is always bone whitewash (or marigold when it is a safety refusal), never violet. Measured contrast holds in both palettes: bone on wall 15.1:1 (yellow 15.9:1), faded chalk on wall 8.6:1, ink on marigold 10.0:1, ink on violet fill 5.6:1 (yellow 11.1:1).

## Typography

**Display Font:** Rubik Spray Paint (fallback Barlow Condensed, sans-serif)
**Body Font:** Barlow Condensed 500/600/700 (fallback Arial Narrow, sans-serif)
**Urdu Font:** Noto Nastaliq Urdu 700, loaded only for the glyphs of ہر مراد پوری via Google Fonts text subsetting

**Character:** Rubik Spray Paint is the wall's shouting voice, fuzzy-edged and sprayed; Barlow Condensed is the narrow, upright hand of a sign-painter lettering the fine print. The Nastaliq line is the only calligraphic voice and always sits in marigold at the top.

### Hierarchy
- **Display** (400, clamp(3.4rem, 17vw, 6rem); 0.88): "Evil Genie" only. On wide screens it grows to clamp(6rem, 10vw, 9rem).
- **Headline** (400 spray, clamp(2.2rem, 10vw, 3.2rem); 1): the verdict stamp (Manzoor., Nahi., Mit gaya.), rotated −3deg.
- **Title** (400 spray, clamp(1.6rem, 7vw, 2.1rem)): section headings on the wall (Purani muradein) and the footer sign-off (clamp(1.5rem, 6vw, 2rem), rotated −2deg).
- **Urdu** (700 Nastaliq, clamp(1.5rem, 6vw, 2rem); 2.2, rtl): the promise line above the title.
- **Twist** (600, clamp(1.55rem, 6.2vw, 2.15rem); 1.16; max 30ch; `text-wrap: pretty`): the product. Largest non-spray type on the page.
- **Wish input** (600, clamp(1.35rem, 5.4vw, 1.6rem); 1.2): what the visitor writes on the whitewash.
- **Summon** (700, clamp(1.5rem, 6vw, 1.85rem); 0.06em; uppercase): the paint-block action.
- **Tagline** (600, clamp(1.15rem, 4.6vw, 1.4rem); 0.02em; uppercase): "Har murad poori. Qeemat baad mein." with the second clause in marigold.
- **Body** (500, 1.125rem; 1.45): default wall text, history twists at 1.15rem/600.
- **Label** (700, 1.1rem): wish label, Mizaj legend, mood chips (600), text actions (1.2rem).
- **Small** (600, 0.9rem; tabular numerals): the wish counter row; footer at 0.95rem.

### Named Rules
**The Two Hands Rule.** Spray lettering is for signs (title, stamp, section heads, sign-off, ghost chalkings); everything a visitor reads for meaning is Barlow Condensed. Never set the twist or a control in the spray face.

**The Uppercase Is Paint Rule.** Uppercase with tracking belongs only to painted-on slogans: the tagline and the summon block.

## Layout

A single centred column, `min(100% − 32px, 40rem)`, giving a 16px side gutter on phones. Vertical rhythm is set by generous rem gaps between notices rather than dividers: 1.6rem to the wish panel, 1.4rem to moods and to the summon block, 2.6rem to the verdict, 3.4rem to history, 3.6rem to the footer. Top padding is clamp(20px, 5vh, 56px), becoming 72px at 720px and 96px at 1000px.

At 1000px and up the column becomes a two-column wall, `min(100% − 96px, 78rem)`, with a flexible left track and a fixed 36rem right track and a clamp(3rem, 6vw, 7rem) gap. The masthead sits in the left track, sticky at 72px from the top, with the title enlarged and the tagline capped at 18ch; every other notice runs down the right track.

The first mobile viewport holds Urdu line, title with lamp, tagline, whitewash wish panel, mood chips, and the full-width summon block. Decorative layers (cracks at fixed 200×120px, ghost chalkings, stains) are absolutely placed on the wall behind content and never take layout space.

## Elevation & Depth

There is no UI elevation. The wall is one plane; depth is the plaster itself (noise grain, radial damp blooms, a 1600px damp-stain mask, fixed-size crack slivers) plus paint effects on lettering. The only shadows are text-shadows that a sign-painter or a spray can would make.

### Shadow Vocabulary
- **Drop shade** (`text-shadow: 0.045em 0.05em 0 var(--gold-deep)`): the hard offset shade under the display title, paired with two soft violet overspray halos. On the share card it is 4px 5px 0 / 3px 4px 0 of the shade colour.
- **Overspray halo** (`text-shadow: 0 0 0.3em color-mix(in oklab, var(--gold) 30%, transparent)`): soft glow around sprayed gold words (Urdu line at 35%/10px, stamp at 30%, sign-off at 25%).
- **Fine-print bleed** (`text-shadow: 0 0 0.5em color-mix(in oklab, var(--bone) 16%, transparent)`): the faint bleed of whitewash on the twist.

### Named Rules
**The Paint-Native Depth Rule.** A shadow is allowed only if paint on a wall could make it: a drop shade on lettering or a spray halo. No box-shadows, no floating cards, no blur backdrops.

## Shapes

Corners are square (0px) everywhere, but no edge is clean. Painted fills (whitewash panel, summon block, selected mood) are pseudo-elements run through an SVG `feDisplacementMap` filter (`#rough`, scale 7) and masked by fractal-noise brush textures, so edges wobble and coverage is patchy. Chalk underlines use a finer filter (`#rough-sm`, scale 2.5). The summon block drips: a 1200×44px strip of tapered drips of uneven length hangs from its bottom edge. Lines on the wall are 2px underlines or 1px dashed dividers, never boxes. Stamps and sign-offs are hand-tilted (−3deg, −2deg); ghost chalkings sit between −6deg and 5deg.

## Components

### Buttons
Two kinds only: one paint block and many painted words.
- **Shape:** square, rough-edged paint (0px radius, displacement filter plus brush mask).
- **Summon (primary):** full-width marigold paint block with paint-ink uppercase text, padding 0.95rem 1rem, with drips hanging below. Label changes to "Jaag raha hai…" while loading.
- **Hover / Active:** the paint swells (scale 1.015, 1.06) over 250ms on the ease-out curve; pressed shrinks to 0.99. Focus is the global 3px marigold outline at 3px offset.
- **Disabled / loading:** paint and drips mix 55% marigold into the wall colour; cursor shows progress.
- **Text action (secondary):** marigold words with a 2px underline at 0.3em offset, underline at 45% opacity rising to full on hover. The quiet variant (Aur maango, Mita do) is faded chalk with a 40% underline.

### Chips (mood selector)
- **Style:** chalk labels: bone text over a 2px rough faded-chalk underline at 45% opacity, padding 0.3rem 0.6rem, wrapping with 0.35rem/0.5rem gaps. Native radios, visually hidden.
- **State:** hover turns text marigold. Selected paints a rough violet fill in from the left (scaleX 0→1, 350ms), text becomes paint ink, and the underline disappears. Keyboard focus draws the marigold outline at 2px offset.

### Inputs / Fields (the wish panel)
- **Style:** a borderless textarea on a bone whitewash patch brushed onto the wall (rough filter, soft brush mask). Label in violet underpaint above, counter row below in small tabular type ("Enter to summon" left, n/200 right).
- **Focus:** the textarea's own outline is suppressed; the whitewash warms to 92% bone / 8% marigold over 900ms. Caret is violet underpaint.
- **Error:** over-limit count turns violet underpaint and bold; validation messages appear in the status line in marigold.

### The Verdict (signature component)
A tilted spray stamp (Manzoor. or Nahi.) above the twist, then the "Khwahish thi" line in faded chalk with the wish quoted in bone, then text actions. The twist is split into sentences, each sprayed on with a left-to-right masked sweep (1.5s, ease-out, 0.7s stagger) that starts blurred at 6px and 40% opacity and settles sharp. Focus moves to the stamp and it scrolls into view. Safety refusals render the twist in marigold and drop Copy and Share.

### The Lamp (signature component)
A small painted chiragh in marigold with drop-shade incised lines, sitting beside the title (clamp(72px, 20vw, 104px); 150px on desktop). While waking it rattles (180ms, stepped) and three faded-chalk smoke strokes rise in 0.6s offsets. Under reduced motion the smoke shows statically at 60%.

### Wall History
Older scrawls lower on the wall: a spray section heading, then a list split by 1px dashed faded-chalk rules at 25%. Each entry shows the quoted wish in faded chalk and the twist in bone, clamped to two lines; hovering turns the twist marigold.

### Share Card
The 1200×630 share image repeats the wall: radial plaster bloom, crack slivers, two ghost chalkings, violet spray title with drop shade, the gold stamp, the twist in bold Barlow sized to its length (58/48/40px), and the wish in faded chalk. It follows the yellow repaint when the shared twist was in that mood.

## Do's and Don'ts

### Do:
- **Do** reference colours through the custom properties on `:root` so `[data-mood="yellow"]` can repaint the whole wall.
- **Do** make every fill a rough paint shape: SVG displacement (`#rough`, `#rough-sm`) plus a noise brush mask, 0px radius.
- **Do** keep the twist in bone Barlow Condensed at clamp(1.55rem, 6.2vw, 2.15rem), max 30ch, the largest reading type on the page.
- **Do** keep a single full-width marigold paint block as the only primary action on a surface.
- **Do** mark focus with the 3px marigold outline at 3px offset.
- **Do** honour `prefers-reduced-motion`: animations collapse to 1ms, the spray mask is removed, smoke shows statically.

### Don't:
- **Don't** use rounded pills, bordered cards, or box-shadows; controls are painted blocks and chalk underlines.
- **Don't** put the lamp on a glowing purple-gradient card; that is the category default this world refuses.
- **Don't** set body copy, the twist, or controls in Rubik Spray Paint.
- **Don't** introduce new hues for states; mix existing tokens in oklab.
- **Don't** let decorative layers (cracks, ghost chalkings, stains) take pointer events or layout space.
