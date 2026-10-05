import type { Restaurant } from './types';

export const GEM_BADGE_THRESHOLD = 0.65;

/**
 * Scores how much of a hidden gem a spot is, from 0 to 1.
 * High ratings count most, few total reviews push the score up,
 * and recent CraveCrunch upvotes add a small boost. Chains score 0.
 */
type GemInputs = Pick<Restaurant, 'rating' | 'reviewCount' | 'isChain' | 'recentUpvotes' | 'curated'>;

export function hiddenGemScore(r: GemInputs): number {
  if (r.isChain) return 0;
  // Hand-picked spots without ratings yet sit right at the badge line.
  if (r.rating === undefined || r.reviewCount === undefined) return r.curated ? GEM_BADGE_THRESHOLD : 0;
  if (r.reviewCount < 5) return 0;

  const quality = Math.max(0, Math.min(1, (r.rating - 3.5) / 1.5));
  // 5 reviews scores 1, 5,000+ reviews scores 0.
  const obscurity = 1 - Math.min(1, Math.log10(r.reviewCount / 5) / Math.log10(1000));
  const buzz = Math.min(1, r.recentUpvotes / 50);

  const score = quality * 0.6 + obscurity * 0.3 + buzz * 0.1;
  return Math.round(score * 100) / 100;
}

export function isHiddenGem(r: GemInputs): boolean {
  return hiddenGemScore(r) >= GEM_BADGE_THRESHOLD;
}
