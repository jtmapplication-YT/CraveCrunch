import {
  RESTAURANT_CARD_COLUMNS,
  SAMPLE_RESTAURANTS,
  restaurantFromRow,
  type Restaurant,
  type RestaurantCardRow,
} from '@cravecrunch/core';
import { useEffect, useState } from 'react';

import { supabase } from '@/lib/supabase';

type RestaurantList = { restaurants: Restaurant[]; sample: boolean };

/**
 * Every spot in the database. `undefined` while loading; falls back to the made-up
 * samples when the database isn't seeded or can't be reached (offline).
 */
export function useRestaurants() {
  const [list, setList] = useState<RestaurantList | undefined>(undefined);

  useEffect(() => {
    let active = true;
    supabase
      .from('restaurant_cards')
      .select(RESTAURANT_CARD_COLUMNS)
      .then(({ data, error }) => {
        if (!active) return;
        if (error || !data?.length) setList({ restaurants: SAMPLE_RESTAURANTS, sample: true });
        else setList({ restaurants: (data as unknown as RestaurantCardRow[]).map(restaurantFromRow), sample: false });
      });
    return () => {
      active = false;
    };
  }, []);

  return list;
}
