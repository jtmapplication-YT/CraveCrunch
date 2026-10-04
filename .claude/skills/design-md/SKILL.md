---
name: design-md
description: Library of 74 ready-made DESIGN.md design systems inspired by well-known brands (Uber, Airbnb, Apple, Stripe, Spotify, Starbucks, Notion, Linear, and more). Use whenever the user wants UI, a screen, a landing page, or an app styled "like" a brand, asks to pick or apply a design system or DESIGN.md, or is building UI in a project that has (or should have) a DESIGN.md. Also use when the user asks which design styles are available.
---

# DESIGN.md library

Each file in `references/` is a complete design system (colors, typography, spacing, shapes, components, do's and don'ts) written as a DESIGN.md. Following one closely produces UI with a consistent, recognizable look.

## Available designs

airbnb, airtable, apple, binance, bmw-m, bmw, bugatti, cal, claude, clay, clickhouse, cohere, coinbase, composio, cursor, dell-1996, elevenlabs, expo, ferrari, figma, framer, hashicorp, hp, ibm, intercom, kraken, lamborghini, linear.app, lovable, mastercard, meta, minimax, mintlify, miro, mistral.ai, mongodb, nike, nintendo-2001, notion, nvidia, ollama, opencode.ai, pinterest, playstation, posthog, raycast, renault, replicate, resend, revolut, runwayml, sanity, sentry, shopify, slack, spacex, spotify, starbucks, stripe, supabase, superhuman, tesla, theverge, together.ai, uber, vercel, vodafone, voltagent, warp, webflow, wired, wise, x.ai, zapier

## How to use

1. **Project already has a DESIGN.md at its root?** Follow that file. It wins over anything here.
2. **User names a brand or style:** read `references/<brand>.md` in full before writing any UI, then follow its tokens and rules exactly.
3. **User wants it applied to a project:** copy `references/<brand>.md` to the project root as `DESIGN.md` so future sessions pick it up.
4. **User is unsure which to pick:** suggest 2-4 that fit the product (e.g. a food or delivery app: uber, starbucks, airbnb, spotify) with one line each on the feel, and let them choose.

## Rules

- Brand fonts (UberMove, SF Pro, Airbnb Cereal, etc.) are usually proprietary. Use the free fallback in the file's font stack, or suggest a close Google Fonts match (Inter, Manrope, DM Sans), and say so.
- Never use brand logos, names, or trademarked assets in the user's product. These are style references, not branding.
- The user may adapt a system (e.g. add one accent color). Record such changes in the project's DESIGN.md so they persist.

Source: VoltAgent/awesome-design-md (MIT, see LICENSE).
