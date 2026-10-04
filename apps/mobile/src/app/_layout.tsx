// Per-weight imports so only these faces get bundled.
import { BigShoulders_800ExtraBold } from '@expo-google-fonts/big-shoulders/800ExtraBold';
import { BigShoulders_900Black } from '@expo-google-fonts/big-shoulders/900Black';
import { PlusJakartaSans_400Regular } from '@expo-google-fonts/plus-jakarta-sans/400Regular';
import { PlusJakartaSans_500Medium } from '@expo-google-fonts/plus-jakarta-sans/500Medium';
import { PlusJakartaSans_600SemiBold } from '@expo-google-fonts/plus-jakarta-sans/600SemiBold';
import { PlusJakartaSans_700Bold } from '@expo-google-fonts/plus-jakarta-sans/700Bold';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { colors } from '@cravecrunch/core';

import { fonts } from '@/constants/fonts';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    BigShoulders_800ExtraBold,
    BigShoulders_900Black,
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
  });

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.orange },
          headerTintColor: colors.ink,
          headerTitleStyle: { fontFamily: fonts.display, fontSize: 24 },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: colors.canvas },
        }}>
        <Stack.Screen name="index" options={{ title: 'CRAVECRUNCH' }} />
        <Stack.Screen name="results" options={{ title: 'YOUR PICKS' }} />
      </Stack>
    </>
  );
}
