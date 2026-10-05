# CraveCrunch

pnpm + Turborepo monorepo: `apps/mobile` (Expo, Android + iOS), `apps/web` (Next.js), `packages/core` (shared TypeScript source, no build step).

- Put logic both apps need in `packages/core` and import it as `@cravecrunch/core`.
- Colors, vibe tags and motion values live in `packages/core/src/theme.ts` and `vibes.ts`; don't hardcode new ones in an app. The web CSS variables in `apps/web/src/app/globals.css` mirror `theme.ts`.
- The look is defined in `DESIGN.md` (light, Uber-inspired, orange bands, Shrikhand display face + Plus Jakarta Sans, emoji vibe tags). Follow it for any UI work, and the `emil-design-eng` skill for motion.
- In `apps/mobile`, add packages with versions matching the Expo SDK (see `apps/mobile/AGENTS.md`). In `apps/web`, read `apps/web/AGENTS.md` first.
- API keys stay server-side (the Next.js route); never put them in the mobile app. The one exception is the Supabase URL and publishable key in `packages/core/src/supabase.ts`, which are public by design (Row Level Security protects the data). The service_role key never goes in either app.
- Database changes go in a new numbered file in `supabase/migrations`; never edit one that has already been run.
- Run `pnpm typecheck && pnpm lint && pnpm test` before pushing.
