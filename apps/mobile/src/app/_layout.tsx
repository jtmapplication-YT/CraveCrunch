import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { colors } from '@cravecrunch/core';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.canvas },
          headerTintColor: colors.ink,
          headerShadowVisible: false,
          contentStyle: { backgroundColor: colors.canvas },
        }}>
        <Stack.Screen name="index" options={{ title: 'CraveCrunch' }} />
        <Stack.Screen name="results" options={{ title: 'Your picks' }} />
      </Stack>
    </>
  );
}
