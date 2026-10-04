---
version: 5
name: CraveCrunch
description: Light, sleek food-finder UI inspired by Uber's design system, with orange as the action color, Night Market layout (orange header bands, black buttons) and a retro diner display face (Shrikhand) and emoji vibe tags. Matches the Figma tokens v0.3.

colors:
  ink: "#000000"            # headings, body, selected chips, dark bands
  text-secondary: "#4b4b4b"
  text-muted: "#6b6b6b"     # captions on white (5.3:1)
  canvas: "#ffffff"
  surface: "#f6f6f6"        # cards, chips, inputs
  elevated: "#eeeeee"
  border-subtle: "#e8e8e8"
  orange: "#ff5a00"         # decorative only: progress, outlines, numbers 24px+
  orange-strong: "#d63f00"  # primary CTA fill under white text (4.6:1)
  orange-ink: "#b83a00"     # small orange text on white, pressed CTA (5.9:1)
  orange-tint: "#fff1e6"    # tinted highlight surfaces
  on-brand: "#ffffff"

typography:
  display-family: Shrikhand 400, sentence case, 24px and up only. Logo, hero headline, screen titles, restaurant names.
  family: Plus Jakarta Sans, then system-ui, -apple-system, Helvetica Neue, Arial. Everything else, including section headings and buttons.
  display-xl: 44 (phone) / 72 (web) / 1.0 / Shrikhand 400
  display-l: 34 / 1.05 / Shrikhand 400
  heading-h1: 24 / 1.2 / 800 / -0.02em
  heading-h2: 20 / 1.25 / 800 / -0.015em
  logo: 24 / Shrikhand 400
  button: 16 / 700
  heading-h3: 16 / 1.3 / 600
  body-l: 16 / 1.5 / 400
  body-m: 14 / 1.5 / 400
  label-m: 13 / 1.3 / 500
  label-s: 11 / 1.3 / 700 / 0.06em / uppercase
  caption: 12 / 1.4 / 500

rounded: { sm: 8, md: 12, lg: 16, pill: 999 }
spacing: [4, 8, 12, 16, 20, 24, 32, 48]
shadow:
  card: 0 8px 24px rgba(0,0,0,0.08)
  soft: 0 4px 12px rgba(0,0,0,0.08)
  brand: 0 6px 16px rgba(255,90,0,0.28)
---

# CraveCrunch design

This file wins over the brand references in `.claude/skills/design-md`. The Figma file and `/mnt/project-files/design/tokens-v0.3.json` hold the same values; change all of them together.

## Feel

Clean white pages, black type, pill-shaped controls and one warm accent. The UI stays quiet so the food and the emoji vibe tags carry the personality. Structure follows the Uber-inspired system (white canvas, black ink, pills, 16px cards, sentence-case headlines, flat surfaces), with orange added as the action color.

## Color rules

- **Orange is the brand color.** The top of key screens (and the web hero) sits on a full-width bright `orange` band with ink text. Ink on `orange` passes contrast (7:1); white on `orange` does not, so never put white text on it.
- The primary CTA ("Crunch it") is a black pill with a white Plus Jakarta Sans 700 label. On a black band, the CTA flips to an `orange` pill with ink text.
- On white, bright `orange` is for bands, the left accent bar on pick cards, progress, and large display text (32px+). Never small text on white.
- Small orange text on white (the 💎 Hidden gem badge, eyebrows, links) uses `orange-ink`.
- Secondary CTA is a `surface` gray pill.
- Selected filter chips are black pills with white text.
- No glows, gradients or atmospheric backdrops; flat orange and black blocks do the work.

## Shapes and depth

- Every tappable control is a pill (999px). Cards use 16px.
- Cards are flat `surface` gray. Pick cards have a 4px `orange` left bar (4px radius on the left, 16px on the right). The craving card on an orange band is white with the `card` shadow.
- A black band mid-page (white text, white pill button) breaks up long white pages.

## Type

- Shrikhand, a chunky retro diner script, is the personality: the logo "CraveCrunch", the hero headline on the orange band, screen titles and restaurant names. Sentence case, never all caps, never below 24px (it gets hard to read).
- Section headings ("Tonight's picks", "What's the budget?") use Plus Jakarta Sans 800 with slight negative tracking.
- One key phrase per headline can turn `orange` on a black band (for example "hole-in-the-wall").
- Uppercase Jakarta only for small `label-s` eyebrows like "QUESTION 1 OF 2": `orange-ink` on white, ink on an orange band.

## Vibe tags

Emoji + label in a `surface` gray pill with an ink label; selected tags are black pills with white labels. The Figma tokens also define tag tints (purple, pink, blue, yellow) for colored tag variants, not used in code yet. The emoji set lives in `packages/core/src/vibes.ts`.

## Motion

Follow the `emil-design-eng` skill: pills scale to 0.97 on press over 160ms with `cubic-bezier(0.23, 1, 0.32, 1)`; result cards fade up with a 50ms stagger; nothing animates from scale 0.

## Code

Tokens live in `packages/core/src/theme.ts`, are mirrored as CSS variables in `apps/web/src/app/globals.css` (`.font-display`), and the app loads the font faces in `apps/mobile/src/app/_layout.tsx` (`@expo-google-fonts/shrikhand`).
