import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { colors, radii } from '@cravecrunch/core';

import { PressScale } from '@/components/press-scale';
import { fonts } from '@/constants/fonts';
import { useSession } from '@/hooks/use-session';
import { supabase } from '@/lib/supabase';

/** Header button: "Sign in" when signed out, "Sign out" when signed in. */
export function AccountButton() {
  const session = useSession();
  if (session === undefined) return null;

  const signedIn = session !== null;
  return (
    <PressScale onPress={() => (signedIn ? supabase.auth.signOut() : router.push('/sign-in'))}>
      <View style={styles.pill}>
        <Text style={styles.label}>{signedIn ? 'Sign out' : 'Sign in'}</Text>
      </View>
    </PressScale>
  );
}

const styles = StyleSheet.create({
  // White on the orange band: the black pill is kept for each screen's one primary action.
  pill: { backgroundColor: colors.canvas, borderRadius: radii.pill, paddingHorizontal: 14, paddingVertical: 7 },
  label: { color: colors.ink, fontSize: 14, fontFamily: fonts.semibold },
});
