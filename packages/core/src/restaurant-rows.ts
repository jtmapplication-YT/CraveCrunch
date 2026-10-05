import { PRICE_LEVELS } from './price';
import type { PriceLevel, Restaurant, VibeTagId } from './types';
import { VIBE_TAGS, vibeById } from './vibes';

/** Columns of the `restaurant_cards` view (supabase/migrations/0003). */
export const RESTAURANT_CARD_COLUMNS =
  'id, place_id, name, cuisine, price_level, is_chain, curated, address, neighbourhood, blurb, rating, review_count, lat, lng, vibes';

export interface RestaurantCardRow {
  id: string;
  place_id: string | null;
  name: string;
  cuisine: string[];
  price_level: number | null;
  is_chain: boolean;
  curated: boolean;
  address: string | null;
  neighbourhood: string | null;
  blurb: string | null;
  rating: number | string | null;
  review_count: number | null;
  lat: number;
  lng: number;
  vibes: string[];
}

const VIBE_IDS = new Set<string>(VIBE_TAGS.map((t) => t.id));

/** Turns a `restaurant_cards` row into the shared Restaurant shape. Unknown vibe ids are dropped. */
export function restaurantFromRow(row: RestaurantCardRow): Restaurant {
  return {
    id: row.id,
    placeId: row.place_id ?? undefined,
    name: row.name,
    cuisine: row.cuisine,
    priceLevel: row.price_level ? (row.price_level as PriceLevel) : undefined,
    lat: row.lat,
    lng: row.lng,
    // numeric columns arrive as strings from PostgREST.
    rating: row.rating === null ? undefined : Number(row.rating),
    reviewCount: row.review_count ?? undefined,
    vibes: row.vibes.filter((v): v is VibeTagId => VIBE_IDS.has(v)),
    isChain: row.is_chain,
    recentUpvotes: 0,
    curated: row.curated,
    neighbourhood: row.neighbourhood ?? undefined,
    address: row.address ?? undefined,
    blurb: row.blurb ?? undefined,
  };
}

/** The small line under a spot's name, e.g. "🌮 🌙 · Downtown · $" or "🔥 · 4.8 from 212 reviews · $$". */
export function restaurantMeta(r: Restaurant): string {
  const emojis = r.vibes.map((v) => vibeById(v)?.emoji).join(' ');
  const where = r.rating !== undefined && r.reviewCount ? `${r.rating} from ${r.reviewCount} reviews` : r.neighbourhood;
  const price = PRICE_LEVELS.find((p) => p.level === r.priceLevel)?.symbol;
  return [emojis, where, price].filter(Boolean).join(' · ');
}
