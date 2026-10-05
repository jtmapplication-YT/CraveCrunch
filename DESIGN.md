---
version: 6
name: CraveCrunch
description: Light, sleek food-finder UI inspired by Uber's design system, with orange as the action color, Night Market layout (orange header bands, black buttons) Bricolage Grotesque headlines and emoji vibe tags. Matches tokens v0.5 (Uber DESIGN.md structure).

colors:
  ink: "#000000"            # headings, body, selected chips, dark bands
  text-secondary: "#5e5e5e" # body copy
  text-muted: "#6b6b6b"     # captions on white (5.3:1)
  canvas: "#ffffff"
  surface: "#f6f6f6"        # flat cards
  elevated: "#eeeeee"
  border-subtle: "#e8e8e8"
  subtle: "#efefef"         # chips, inputs, secondary pills, icon buttons on white
  softer: "#f3f3f3"         # inputs and answer tiles inside a white card
  pressed: "#e2e2e2"
  on-dark-muted: "#cfcfcf"  # body text on black promo cards
  orange: "#ff5a00"         # decorative only: progress, outlines, numbers 24px+
  orange-strong: "#d63f00"  # primary CTA fill under white text (4.6:1)
  orange-ink: "#b83a00"     # small orange text on white, pressed CTA (5.9:1)
  orange-tint: "#fff1e6"    # tinted highlight surfaces
  on-brand: "#ffffff"

typography:
  display-family: Bricolage Grotesque 800, -0.02em, sentence case, 20px and up only. Logo, hero headline, screen titles, restaurant names, promo titles.
  family: Plus Jakarta Sans, then system-ui, -apple-system, Helvetica Neue, Arial. Everything else, including section headings and buttons.
  display-xl: 44 (phone) / 72 (web) / 1.0 / Bricolage Grotesque 800 / -0.02em
  display-l: 34 / 1.05 / Bricolage Grotesque 800 / -0.02em
  heading-h1: 24 / 1.2 / 800
  heading-h2: 20 / 1.25 / 800
  logo: 24 / Bricolage Grotesque 800 / -0.02em
  button: 16 / 700
  heading-h3: 16 / 1.3 / 600
  body-l: 16 / 1.5 / 400
  body-m: 14 / 1.5 / 400
  label-m: 13 / 1.3 / 500
  label-s: 11 / 1.3 / 700 / 0.06em / uppercase
  caption: 12 / 1.4 / 500

rounded: { sm: 8, md: 12, lg: 16, pill: 999, input: 8, card: 16 }
spacing: [4, 8, 12, 16, 20, 24, 32, 48]
shadow:
  float: 0 2px 8px rgba(0,0,0,0.16)   # floating pills and icon buttons over content
  form: 0 4px 16px rgba(0,0,0,0.16)   # the form card on the orange band
---

# CraveCrunch design

This file wins over the brand references in `.claude/skills/design-md`. `/mnt/project-files/design/tokens-v0.5.json` holds the same values (its `component` section has the full specs); change all of them together.

## Feel

Clean white pages, black type, pill-shaped controls and one warm accent. The UI stays quiet so the food and the emoji vibe tags carry the personality. Structure follows the Uber-inspired system (white canvas, black ink, pills, 16px cards, sentence-case headlines, flat surfaces), with orange added as the action color.

## Color rules

- **Orange is the brand color.** The top of key screens (and the web hero) sits on a full-width bright `orange` band with ink text. Ink on `orange` passes contrast (7:1); white on `orange` does not, so never put white text on it.
- The primary CTA ("Crunch it") is a black pill with a white Plus Jakarta Sans 700 label. On a black band, the CTA flips to an `orange` pill with ink text.
- On white, bright `orange` is for bands, the left accent bar on pick cards, progress, and large display text (32px+). Never small text on white.
- Small orange text on white (the 💎 Hidden gem badge, eyebrows, links) uses `orange-ink`.
- **Exactly one black pill primary CTA per screen** (height 56). Secondary actions are `subtle` gray pills; buttons on the orange band (Sign in, icon buttons) are white.
- Selected filter chips are black pills with white text.
- No glows, gradients or atmospheric backdrops; flat orange and black blocks do the work.

## Shapes and depth

- Every tappable control is a pill (999px), and icon buttons are 44px circles. Cards use 16px. Inputs are `subtle` (or `softer` inside a white card), 8px corners, height 48, no border.
- Cards are flat `surface` gray with no shadow. Pick cards have a 4px `orange` left bar (4px radius on the left, 16px on the right).
- The form card is white with the `form` shadow and overlaps the orange band by 40px.
- One black promo card mid-page per screen (radius 16, padding 18): `orange` eyebrow, white Bricolage title, `on-dark-muted` body, optional white pill button (height 40).

## Type

- Bricolage Grotesque 800 at -0.02em is the personality: the logo "CraveCrunch", the hero headline on the orange band, screen titles, restaurant names and promo titles. Sentence case, never all caps, never below 20px. It is the only text with tighter tracking.
- Section headings ("Tonight's picks", "What's the budget?") use Plus Jakarta Sans 800. No letter-spacing changes on headlines.
- Uppercase Jakarta only for small `label-s` eyebrows like "QUESTION 1 OF 2": `orange-ink` on white, ink on an orange band.

## Vibe tags

Emoji + label in a `subtle` gray pill (padding 9x14, 13px) with an ink label, white on the orange band; selected tags are black pills with white labels. The Figma tokens also define tag tints (purple, pink, blue, yellow) for colored tag variants, not used in code yet. The emoji set lives in `packages/core/src/vibes.ts`.

## Motion

Follow the `emil-design-eng` skill: pills scale to 0.97 on press over 160ms with `cubic-bezier(0.23, 1, 0.32, 1)`; result cards fade up with a 50ms stagger; nothing animates from scale 0.

## Code

Tokens live in `packages/core/src/theme.ts`, are mirrored as CSS variables in `apps/web/src/app/globals.css` (`.font-display`), and the app loads the font faces in `apps/mobile/src/app/_layout.tsx`. The headline face is set in one place per app: `apps/web/src/app/layout.tsx` and `apps/mobile/src/constants/fonts.ts`.
