import { createBrowserClient } from "@supabase/ssr";
import { supabaseConfig } from "@cravecrunch/core";

/** Supabase client for Client Components. The session lives in cookies so the server can read it too. */
export function createClient() {
  return createBrowserClient(supabaseConfig.url, supabaseConfig.publishableKey);
}
