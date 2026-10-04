import { expect, test } from 'vitest';

import { hiddenGemScore, isHiddenGem } from './gem-score';

const base = { rating: 4.8, reviewCount: 120, isChain: false, recentUpvotes: 10 };

test('a highly rated local spot with few reviews is a gem', () => {
  expect(isHiddenGem(base)).toBe(true);
});

test('chains never score', () => {
  expect(hiddenGemScore({ ...base, isChain: true })).toBe(0);
});

test('too few reviews to trust scores zero', () => {
  expect(hiddenGemScore({ ...base, reviewCount: 2 })).toBe(0);
});

test('fewer reviews beats more reviews at the same rating', () => {
  expect(hiddenGemScore(base)).toBeGreaterThan(hiddenGemScore({ ...base, reviewCount: 3000 }));
});

test('a mediocre rating is not a gem however obscure', () => {
  expect(isHiddenGem({ ...base, rating: 3.6, reviewCount: 8 })).toBe(false);
});
