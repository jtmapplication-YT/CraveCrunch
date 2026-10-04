import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { VIBE_TAGS, colors, gradients, type PriceLevel, type VibeTagId } from '@cravecrunch/core';

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
              {on ? (
                <LinearGradient colors={gradients.crave} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.chip}>
                  <Text style={[styles.chipText, styles.chipTextOn]}>{tag.emoji} {tag.label}</Text>
                </LinearGradient>
              ) : (
                <View style={[styles.chip, styles.chipOff]}>
                  <Text style={styles.chipText}>{tag.emoji} {tag.label}</Text>
                </View>
              )}
            </PressScale>
          );
        })}
      </View>

      <Text style={styles.eyebrow}>QUESTION 2 OF 2</Text>
      <Text style={styles.question}>Budget?</Text>
      <View style={styles.chips}>
        {PRICES.map((p) => (
          <PressScale key={p} onPress={() => setMaxPrice(p)} accessibilityState={{ selected: p === maxPrice }}>
            <View style={[styles.chip, p === maxPrice ? styles.priceOn : styles.chipOff]}>
              <Text style={styles.chipText}>{'$'.repeat(p)}</Text>
            </View>
          </PressScale>
        ))}
      </View>

      <PressScale
        disabled={vibes.length === 0}
        onPress={() =>
          router.push({ pathname: '/results', params: { vibes: vibes.join(','), maxPrice: String(maxPrice) } })
        }>
        <LinearGradient
          colors={gradients.crave}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.cta, vibes.length === 0 && styles.ctaDisabled]}>
          <Text style={styles.ctaText}>{vibes.length === 0 ? 'Pick a vibe first' : 'Crunch it 🎲'}</Text>
        </LinearGradient>
      </PressScale>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { padding: 20, gap: 14 },
  eyebrow: { color: colors.blue, fontSize: 12, letterSpacing: 1.4, marginTop: 8 },
  question: { color: colors.text, fontSize: 22, fontWeight: '800' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999 },
  chipOff: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line },
  priceOn: { backgroundColor: colors.purple },
  chipText: { color: colors.text, fontSize: 15 },
  chipTextOn: { fontWeight: '700' },
  cta: { marginTop: 16, borderRadius: 16, paddingVertical: 16, alignItems: 'center' },
  ctaDisabled: { opacity: 0.4 },
  ctaText: { color: '#fff', fontSize: 17, fontWeight: '800' },
});
