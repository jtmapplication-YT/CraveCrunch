# CraveCrunch

Find the destination of your cravings. A mood-based food finder for Android, iOS and the web that spotlights hole-in-the-wall restaurants and lets locals discuss, review and rate them.

## What's here

| Folder | What it is |
| --- | --- |
| `apps/mobile` | Expo (React Native) app for Android and iOS. Questionnaire and results screens. |
| `apps/web` | Next.js website, plus the `/api/crave` route that asks Claude for picks. |
| `packages/core` | Shared TypeScript: types, emoji vibe tags, colors, Hidden Gem score, ranking. |
| `supabase/migrations` | Database schema: profiles, taste profiles, restaurants, reviews, posts, comments, votes. |
| `.claude/skills` | Project skills for Claude, including `emil-design-eng` for UI motion and polish. |

The restaurants shown today are made-up sample data in `packages/core/src/sample-data.ts`.

## Getting started

You need Node.js 22 and pnpm (`npm install -g pnpm`).

```bash
pnpm install
pnpm dev:web      # website at http://localhost:3000
pnpm dev:mobile   # Expo dev server; scan the QR code with the Expo Go app
```

Copy `.env.example` to `apps/web/.env.local` and fill in keys as you set up each service. Without `ANTHROPIC_API_KEY`, `/api/crave` falls back to the local ranking.

## Checks

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

## Building the apps for the stores

Expo's EAS service builds Android and iOS in the cloud, so no Mac is needed: `npx eas-cli@latest build`. Publishing to the App Store needs an Apple Developer account.
