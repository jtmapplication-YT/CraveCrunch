import 'expo-sqlite/localStorage/install';

import { createClient } from '@supabase/supabase-js';
import { AppState, Platform } from 'react-native';

import { supabaseConfig } from '@cravecrunch/core';

/** One Supabase client for the app. The session is kept on the device so people stay signed in. */
export const supabase = createClient(supabaseConfig.url, supabaseConfig.publishableKey, {
  auth: {
    // Static web rendering runs without localStorage; the browser and native apps have it.
    storage: typeof localStorage === 'undefined' ? undefined : localStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Only refresh the session while the app is in the foreground.
if (Platform.OS !== 'web') {
  AppState.addEventListener('change', (state) => {
    if (state === 'active') supabase.auth.startAutoRefresh();
    else supabase.auth.stopAutoRefresh();
  });
}
