import { hiddenGemScore } from './gem-score';
import type { CraveAnswers, Restaurant } from './types';

/**
 * Local ranking used before (or instead of) the AI pass:
 * filter by budget, then sort by vibe overlap and gem score.
 */
export function rankForCrave(restaurants: Restaurant[], answers: CraveAnswers): Restaurant[] {
  const wanted = new Set(answers.vibes);
  return restaurants
    .filter((r) => (r.priceLevel ?? 1) <= answers.maxPrice)
    .map((r) => {
      const overlap = wanted.size ? r.vibes.filter((v) => wanted.has(v)).length / wanted.size : 0;
      return { r, score: overlap * 0.6 + hiddenGemScore(r) * 0.4 };
    })
    .sort((a, b) => b.score - a.score)
    .map(({ r }) => r);
}
