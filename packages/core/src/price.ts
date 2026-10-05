import type { PriceLevel } from './types';

/**
 * What each $ level means, per person in CAD (Winnipeg launch).
 * Roughly matches how Google Places assigns price levels.
 */
export const PRICE_LEVELS: readonly { level: PriceLevel; symbol: string; range: string }[] = [
  { level: 1, symbol: '$', range: 'Under $15' },
  { level: 2, symbol: '$$', range: '$15–30' },
  { level: 3, symbol: '$$$', range: '$30–60' },
  { level: 4, symbol: '$$$$', range: '$60+' },
];

export function priceRange(level: PriceLevel): string {
  return PRICE_LEVELS[level - 1].range;
}
