import {
  RESTAURANT_CARD_COLUMNS,
  SAMPLE_RESTAURANTS,
  restaurantFromRow,
  type Restaurant,
  type RestaurantCardRow,
} from "@cravecrunch/core";
import { createClient } from "@/lib/supabase/server";

export type RestaurantList = { restaurants: Restaurant[]; sample: boolean };

/** Every spot in the database, or the made-up samples if the database isn't seeded or can't be reached. */
export async function loadRestaurants(): Promise<RestaurantList> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("restaurant_cards").select(RESTAURANT_CARD_COLUMNS);
  if (error || !data?.length) {
    if (error) console.error("Loading restaurants failed, showing samples:", error.message);
    return { restaurants: SAMPLE_RESTAURANTS, sample: true };
  }
  return { restaurants: (data as unknown as RestaurantCardRow[]).map(restaurantFromRow), sample: false };
}
