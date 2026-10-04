import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { colors } from '@cravecrunch/core';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.bg },
          headerTintColor: colors.text,
          contentStyle: { backgroundColor: colors.bg },
        }}>
        <Stack.Screen name="index" options={{ title: 'CraveCrunch' }} />
        <Stack.Screen name="results" options={{ title: 'Your picks' }} />
      </Stack>
    </>
  );
}
