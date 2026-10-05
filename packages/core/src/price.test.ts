import { describe, expect, it } from 'vitest';

import { PRICE_LEVELS, priceRange } from './price';

describe('price levels', () => {
  it('has one entry per level, in order', () => {
    expect(PRICE_LEVELS.map((p) => p.level)).toEqual([1, 2, 3, 4]);
    expect(PRICE_LEVELS.map((p) => p.symbol)).toEqual(['$', '$$', '$$$', '$$$$']);
  });

  it('looks up the range for a level', () => {
    expect(priceRange(1)).toBe('Under $15');
    expect(priceRange(4)).toBe('$60+');
  });
});
