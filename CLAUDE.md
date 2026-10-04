# CraveCrunch

pnpm + Turborepo monorepo: `apps/mobile` (Expo, Android + iOS), `apps/web` (Next.js), `packages/core` (shared TypeScript source, no build step).

- Put logic both apps need in `packages/core` and import it as `@cravecrunch/core`.
- Colors, vibe tags and motion values live in `packages/core/src/theme.ts` and `vibes.ts`; don't hardcode new ones in an app. The web CSS variables in `apps/web/src/app/globals.css` mirror `theme.ts`.
- The look is dark mode by default with neon purple/pink/blue/orange gradients and emoji vibe tags. For UI and animation work, follow the `emil-design-eng` skill.
- In `apps/mobile`, add packages with versions matching the Expo SDK (see `apps/mobile/AGENTS.md`). In `apps/web`, read `apps/web/AGENTS.md` first.
- API keys stay server-side (the Next.js route); never put them in the mobile app.
- Run `pnpm typecheck && pnpm lint && pnpm test` before pushing.
