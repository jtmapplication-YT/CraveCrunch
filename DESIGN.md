---
version: 2
name: CraveCrunch
description: Light, sleek food-finder UI inspired by Uber's design system, with orange as the only action color and emoji vibe tags. Matches the Figma tokens v0.2 (light).

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
  family: Plus Jakarta Sans, then system-ui, -apple-system, Helvetica Neue, Arial
  display-xl: 40 / 1.15 / 800 / -0.025em
  display-l: 32 / 1.2 / 700 / -0.02em
  heading-h1: 24 / 1.28 / 700 / -0.015em
  heading-h2: 20 / 1.35 / 700 / -0.01em
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

This file wins over the brand references in `.claude/skills/design-md`. The Figma file and `/mnt/project-files/design/tokens-v0.2-light.json` hold the same values; change all of them together.

## Feel

Clean white pages, black type, pill-shaped controls and one warm accent. The UI stays quiet so the food and the emoji vibe tags carry the personality. Structure follows the Uber-inspired system (white canvas, black ink, pills, 16px cards, sentence-case headlines, flat surfaces), with orange added as the action color.

## Color rules

- **Orange is the only action color.** The primary CTA ("Crunch it", "Find food") is an `orange-strong` pill with white text; pressed goes to `orange-ink`.
- Bright `orange` is decorative only: progress, selected outlines, match scores and numbers 24px or larger. Never small text, never under white text.
- Small orange text on white (the 💎 Hidden gem badge, eyebrows, links) uses `orange-ink`.
- Secondary CTA is a black pill (white text); tertiary is a `surface` gray pill.
- Selected filter chips are black pills with white text.
- No glows or atmospheric backdrops. Gradients only on food hero images and, optionally, the primary CTA.

## Shapes and depth

- Every tappable control is a pill (999px). Cards use 16px.
- Cards are flat `surface` gray by default; the main craving card gets the `card` shadow.
- A black band mid-page (white text, white pill button) breaks up long white pages.

## Type

- Plus Jakarta Sans everywhere, using the scale above. Headlines are sentence case with slight negative tracking.
- Uppercase only for small `label-s` eyebrows like "QUESTION 1 OF 2", in `orange-ink`.

## Vibe tags

Emoji + label in a gray pill, black label; selected is a black pill with white label. The Figma tokens also define tag tints (purple, pink, blue, yellow) for colored tag variants, not used in code yet. The emoji set lives in `packages/core/src/vibes.ts`.

## Motion

Follow the `emil-design-eng` skill: pills scale to 0.97 on press over 160ms with `cubic-bezier(0.23, 1, 0.32, 1)`; result cards fade up with a 50ms stagger; nothing animates from scale 0.

## Code

Tokens live in `packages/core/src/theme.ts`, are mirrored as CSS variables in `apps/web/src/app/globals.css`, and the app loads the font faces in `apps/mobile/src/app/_layout.tsx`.
