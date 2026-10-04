import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { VIBE_TAGS, colors, radii, type PriceLevel, type VibeTagId } from '@cravecrunch/core';

import { PressScale } from '@/components/press-scale';

const PRICES: PriceLevel[] = [1, 2, 3, 4];

export default function CraveQuestionnaire() {
  const [vibes, setVibes] = useState<VibeTagId[]>([]);
  const [maxPrice, setMaxPrice] = useState<PriceLevel>(2);

  const toggleVibe = (id: VibeTagId) =>
    setVibes((current) => (current.includes(id) ? current.filter((v) => v !== id) : [...current, id]));

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Text style={styles.eyebrow}>QUESTION 1 OF 2</Text>
      <Text style={styles.question}>What&apos;s the vibe tonight?</Text>
      <View style={styles.chips}>
        {VIBE_TAGS.map((tag) => {
          const on = vibes.includes(tag.id);
          return (
            <PressScale key={tag.id} onPress={() => toggleVibe(tag.id)} accessibilityState={{ selected: on }}>
              <View style={[styles.chip, on && styles.chipOn]}>
                <Text style={[styles.chipText, on && styles.chipTextOn]}>
                  {tag.emoji} {tag.label}
                </Text>
              </View>
            </PressScale>
          );
        })}
      </View>

      <Text style={styles.eyebrow}>QUESTION 2 OF 2</Text>
      <Text style={styles.question}>Budget?</Text>
      <View style={styles.chips}>
        {PRICES.map((p) => {
          const on = p === maxPrice;
          return (
            <PressScale key={p} onPress={() => setMaxPrice(p)} accessibilityState={{ selected: on }}>
              <View style={[styles.chip, on && styles.chipOn]}>
                <Text style={[styles.chipText, on && styles.chipTextOn]}>{'$'.repeat(p)}</Text>
              </View>
            </PressScale>
          );
        })}
      </View>

      <PressScale
        disabled={vibes.length === 0}
        onPress={() =>
          router.push({ pathname: '/results', params: { vibes: vibes.join(','), maxPrice: String(maxPrice) } })
        }>
        <View style={[styles.cta, vibes.length === 0 && styles.ctaDisabled]}>
          <Text style={styles.ctaText}>{vibes.length === 0 ? 'Pick a vibe first' : 'Crunch it 🎲'}</Text>
        </View>
      </PressScale>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { padding: 16, gap: 12 },
  eyebrow: { color: colors.body, fontSize: 12, fontWeight: '500', letterSpacing: 1.2, marginTop: 12 },
  question: { color: colors.ink, fontSize: 24, lineHeight: 32, fontWeight: '700' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: radii.pill, backgroundColor: colors.canvasSoft },
  chipOn: { backgroundColor: colors.ink },
  chipText: { color: colors.ink, fontSize: 14, fontWeight: '500' },
  chipTextOn: { color: colors.onDark },
  cta: { marginTop: 20, borderRadius: radii.pill, paddingVertical: 16, alignItems: 'center', backgroundColor: colors.orange },
  ctaDisabled: { backgroundColor: colors.canvasSoft },
  ctaText: { color: colors.ink, fontSize: 18, fontWeight: '500' },
});
