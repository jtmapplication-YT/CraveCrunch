/**
 * The CraveCrunch Supabase project. Both apps connect with these values.
 *
 * The publishable key is public by design: Row Level Security in `supabase/migrations`
 * decides what it can read and write. Secret (service_role) keys never go here or in any app.
 */
export const supabaseConfig = {
  url: 'https://zcmwtkzccreydethsjcz.supabase.co',
  publishableKey: 'sb_publishable_7MTFyplJyUSY5D7eV_Mt5w_3phCiEvr',
} as const;
