export type PriceLevel = 1 | 2 | 3 | 4;

export type VibeTagId =
  | 'spicy'
  | 'cozy'
  | 'street'
  | 'date-night'
  | 'light'
  | 'big-group'
  | 'late-night'
  | 'sweet'
  | 'drinks'
  | 'healthy';

export interface Restaurant {
  id: string;
  /** Google Places place_id, when the spot came from Places. */
  placeId?: string;
  name: string;
  cuisine: string[];
  priceLevel?: PriceLevel;
  lat: number;
  lng: number;
  rating: number;
  reviewCount: number;
  vibes: VibeTagId[];
  /** True when the brand has many locations. Chains never get the gem badge. */
  isChain: boolean;
  /** Number of CraveCrunch upvotes in the last 30 days. */
  recentUpvotes: number;
}

export interface TasteProfile {
  userId: string;
  likes: string[];
  dislikes: string[];
  dietary: string[];
  allergies: string[];
  maxPrice: PriceLevel;
}

export interface CraveAnswers {
  vibes: VibeTagId[];
  maxPrice: PriceLevel;
  maxDistanceMiles: number;
  notes?: string;
}

export interface CravePick {
  restaurantId: string;
  why: string;
}
