import type { Restaurant } from './types';

/** Made-up example spots for development until Places and Supabase are wired up. */
export const SAMPLE_RESTAURANTS: Restaurant[] = [
  { id: 'ex-1', name: 'Tacos El Güero', cuisine: ['mexican'], priceLevel: 1, lat: 0, lng: 0, rating: 4.8, reviewCount: 212, vibes: ['spicy', 'street', 'late-night'], isChain: false, recentUpvotes: 34 },
  { id: 'ex-2', name: 'Pho Corner', cuisine: ['vietnamese'], priceLevel: 1, lat: 0, lng: 0, rating: 4.7, reviewCount: 96, vibes: ['cozy', 'healthy'], isChain: false, recentUpvotes: 12 },
  { id: 'ex-3', name: 'Nonna Lucia', cuisine: ['italian'], priceLevel: 3, lat: 0, lng: 0, rating: 4.6, reviewCount: 340, vibes: ['date-night', 'drinks', 'cozy'], isChain: false, recentUpvotes: 8 },
  { id: 'ex-4', name: 'Seoul Fry Club', cuisine: ['korean'], priceLevel: 2, lat: 0, lng: 0, rating: 4.5, reviewCount: 58, vibes: ['spicy', 'big-group', 'drinks'], isChain: false, recentUpvotes: 21 },
  { id: 'ex-5', name: 'Burger Barn', cuisine: ['american'], priceLevel: 2, lat: 0, lng: 0, rating: 4.1, reviewCount: 5200, vibes: ['big-group'], isChain: true, recentUpvotes: 2 },
  { id: 'ex-6', name: 'Dough & Co. Donuts', cuisine: ['bakery'], priceLevel: 1, lat: 0, lng: 0, rating: 4.9, reviewCount: 44, vibes: ['sweet', 'late-night'], isChain: false, recentUpvotes: 40 },
];
