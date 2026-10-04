import { expect, test } from 'vitest';

import { rankForCrave } from './rank';
import { SAMPLE_RESTAURANTS } from './sample-data';

test('puts the best vibe match first', () => {
  const ranked = rankForCrave(SAMPLE_RESTAURANTS, { vibes: ['spicy', 'street'], maxPrice: 2, maxDistanceMiles: 5 });
  expect(ranked[0].name).toBe('Tacos El Güero');
});

test('drops places over budget', () => {
  const ranked = rankForCrave(SAMPLE_RESTAURANTS, { vibes: ['date-night'], maxPrice: 2, maxDistanceMiles: 5 });
  expect(ranked.map((r) => r.name)).not.toContain('Nonna Lucia');
});
