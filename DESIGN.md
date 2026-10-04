---
version: 1
name: CraveCrunch
description: Light, sleek food-finder UI adapted from the Uber-inspired system in .claude/skills/design-md/references/uber.md, with one added accent, Crave Orange, and emoji vibe tags.

colors:
  ink: "#000000"           # headings, body, selected chips, dark bands
  body: "#5e5e5e"          # secondary text
  mute: "#afafaf"          # placeholders, fine print
  canvas: "#ffffff"        # page background
  canvas-soft: "#efefef"   # chips, inputs, soft cards
  canvas-softer: "#f3f3f3"
  surface-pressed: "#e2e2e2"
  orange: "#ff6b00"        # Crave Orange: primary CTA fill (ink text on it)
  orange-ink: "#c2410c"    # orange text on white (gem badge, links), passes AA
  orange-soft: "#fff1e6"   # tinted highlight surfaces
  on-dark: "#ffffff"

typography:
  family: Inter (substitute for Uber Move), system-ui fallback. Weight 700 for display, 400/500 for text.
  display-xxl: 52/64 700
  display-xl: 36/44 700
  display-md: 24/32 700
  display-sm: 20/28 700
  body-lg: 18/24 500
  body-md: 16/24 400
  body-sm: 14/20 400
  button: 16/20 500

rounded:
  md: 8px
  xl: 16px
  pill: 999px

spacing: [4, 6, 8, 12, 16, 20, 24, 32]
---

# CraveCrunch design

This file wins over the brand references in `.claude/skills/design-md`. Change it here when the design changes.

## Feel

Clean white pages, black type, pill-shaped controls and one warm accent. The UI stays quiet so the food and the emoji vibe tags carry the personality. It follows the Uber-inspired system's structure (white canvas, black ink, pills, 16px cards, sentence-case headlines, flat surfaces) and breaks one of its rules on purpose: CraveCrunch adds Crave Orange as its single accent.

## Color rules

- **Crave Orange `#ff6b00`** fills the one primary action per screen ("Crunch it", "Find food"). Text on orange is **ink black**, never white (white on this orange fails contrast).
- **Orange ink `#c2410c`** is for orange text on white: the 💎 Hidden Gem badge, inline links, the active tab label.
- **Ink black** is for all text, selected chips (black pill, white text) and the dark promo band.
- Grays come from the canvas scale. No gradients, no other accent colors.

## Shapes and depth

- Every tappable control is a pill (999px): buttons, vibe chips, budget chips, app-download buttons.
- Cards are 16px radius, flat by default. Only the main craving card gets the soft shadow `0 4px 16px rgba(0,0,0,0.16)`.
- A black band mid-page (white text, white pill button) breaks up long white pages.

## Type

- Inter everywhere. Display weight 700, never letter-spaced. Body 400, buttons 500.
- Sentence case for headlines and buttons. Uppercase only for short eyebrows like "QUESTION 1 OF 2".

## Vibe tags

Emoji + label inside a soft gray pill (`canvas-soft`, ink text). Selected: black pill, white text. The emoji set lives in `packages/core/src/vibes.ts`.

## Motion

Follow the `emil-design-eng` skill: pills scale to 0.97 on press over 160ms with `cubic-bezier(0.23, 1, 0.32, 1)`; result cards fade up with a 50ms stagger; nothing animates from scale 0.

## Code

Tokens live in `packages/core/src/theme.ts` and are mirrored as CSS variables in `apps/web/src/app/globals.css`.
