import { describe, expect, it } from 'vitest';

import { isHiddenGem } from './gem-score';
import { restaurantFromRow, restaurantMeta, type RestaurantCardRow } from './restaurant-rows';

const row: RestaurantCardRow = {
  id: 'r1',
  place_id: null,
  name: "VJ's Drive Inn",
  cuisine: ['burgers'],
  price_level: 1,
  is_chain: false,
  curated: true,
  address: '170 Main St',
  neighbourhood: 'Downtown',
  blurb: 'Famous chili cheeseburgers',
  rating: null,
  review_count: null,
  lat: 49.89,
  lng: -97.13,
  vibes: ['street', 'late-night', 'not-a-vibe'],
};

describe('restaurantFromRow', () => {
  it('maps a view row and drops unknown vibes', () => {
    const r = restaurantFromRow(row);
    expect(r).toMatchObject({ id: 'r1', priceLevel: 1, neighbourhood: 'Downtown', vibes: ['street', 'late-night'] });
    expect(r.rating).toBeUndefined();
  });

  it('reads numeric ratings sent as strings', () => {
    expect(restaurantFromRow({ ...row, rating: '4.6', review_count: 80 }).rating).toBe(4.6);
  });

  it('counts unrated curated spots as hidden gems, but not chains', () => {
    expect(isHiddenGem(restaurantFromRow(row))).toBe(true);
    expect(isHiddenGem(restaurantFromRow({ ...row, curated: false }))).toBe(false);
    expect(isHiddenGem(restaurantFromRow({ ...row, is_chain: true }))).toBe(false);
  });
});

describe('restaurantMeta', () => {
  it('shows the neighbourhood until there are ratings', () => {
    expect(restaurantMeta(restaurantFromRow(row))).toBe('🌮 🌙 · Downtown · $');
    expect(restaurantMeta(restaurantFromRow({ ...row, rating: 4.8, review_count: 212 }))).toBe(
      '🌮 🌙 · 4.8 from 212 reviews · $',
    );
  });
});
