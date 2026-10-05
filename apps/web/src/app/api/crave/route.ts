import Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod";

import { VIBE_TAGS, rankForCrave, type CraveAnswers } from "@cravecrunch/core";
import { loadRestaurants } from "@/lib/restaurants";

const AnswersSchema = z.object({
  vibes: z.array(z.enum(VIBE_TAGS.map((t) => t.id) as [string, ...string[]])).max(5),
  maxPrice: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]),
  maxDistanceMiles: z.number().positive().max(50),
  notes: z.string().max(300).optional(),
});

const PicksSchema = z.object({
  picks: z.array(z.object({ restaurantId: z.string(), why: z.string() })),
});

/**
 * POST /api/crave — turns questionnaire answers into up to 3 picks.
 * Ranks candidates locally first, then asks Claude to choose and explain.
 * Without ANTHROPIC_API_KEY it returns the local ranking so dev still works.
 */
export async function POST(request: Request) {
  const parsed = AnswersSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: "Invalid answers", issues: parsed.error.issues }, { status: 400 });
  }
  const answers = parsed.data as CraveAnswers;

  // TODO: filter to spots near the diner once locations are verified.
  const { restaurants } = await loadRestaurants();
  const candidates = rankForCrave(restaurants, answers).slice(0, 10);
  const localPicks = candidates.slice(0, 3).map((r) => ({ restaurantId: r.id, why: "Matches your vibe." }));

  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ picks: localPicks, source: "local" });
  }

  const client = new Anthropic();
  const response = await client.beta.messages.parse({
    model: "claude-opus-5-5",
    // If Claude declines, the API retries on Anthropic's recommended fallback model.
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    max_tokens: 2000,
    // Short, latency-sensitive answer, so keep thinking light.
    output_config: { effort: "low", format: betaZodOutputFormat(PicksSchema) },
    system:
      "You are CraveCrunch, a food finder that champions independent, hole-in-the-wall restaurants. " +
      "Pick up to 3 restaurants from the candidates that best fit the diner's mood. " +
      "Only use restaurantId values from the candidates. Each why is one upbeat sentence under 20 words.",
    messages: [
      {
        role: "user",
        content: JSON.stringify({ answers, candidates }),
      },
    ],
  });

  const ids = new Set(candidates.map((r) => r.id));
  const picks = response.parsed_output?.picks.filter((p) => ids.has(p.restaurantId)).slice(0, 3);

  if (response.stop_reason === "refusal" || !picks?.length) {
    return Response.json({ picks: localPicks, source: "local" });
  }
  return Response.json({ picks, source: "claude" });
}
