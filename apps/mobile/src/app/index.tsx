import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { PRICE_LEVELS, VIBE_TAGS, colors, radii, shadows, type PriceLevel, type VibeTagId } from '@cravecrunch/core';

import { PressScale } from '@/components/press-scale';
import { displayType, fonts } from '@/constants/fonts';

export default function CraveQuestionnaire() {
  const [vibes, setVibes] = useState<VibeTagId[]>([]);
  const [maxPrice, setMaxPrice] = useState<PriceLevel>(2);

  const toggleVibe = (id: VibeTagId) =>
    setVibes((current) => (current.includes(id) ? current.filter((v) => v !== id) : [...current, id]));

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.band}>
        <Text style={[styles.eyebrow, styles.eyebrowOnBand]}>QUESTION 1 OF 2</Text>
        <Text style={styles.hero}>What are you craving tonight?</Text>
      </View>
      <View style={styles.formCard}>
        <Text style={styles.cardHint}>Pick your vibes</Text>
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
      </View>

      <View style={styles.body}>
        <Text style={styles.eyebrow}>QUESTION 2 OF 2</Text>
        <Text style={styles.question}>What&apos;s the budget?</Text>
        <Text style={styles.hint}>Per person</Text>
        <View style={styles.prices}>
          {PRICE_LEVELS.map(({ level, symbol, range }) => {
            const on = level === maxPrice;
            return (
              <View key={level} style={styles.priceCell}>
                <PressScale
                  onPress={() => setMaxPrice(level)}
                  accessibilityRole="radio"
                  accessibilityLabel={`${symbol}, ${range} per person`}
                  accessibilityState={{ selected: on }}>
                  <View style={[styles.price, on && styles.chipOn]}>
                    <Text style={[styles.priceSymbol, on && styles.chipTextOn]}>{symbol}</Text>
                    <Text style={[styles.priceRange, on && styles.priceRangeOn]}>{range}</Text>
                  </View>
                </PressScale>
              </View>
            );
          })}
        </View>

        <PressScale
          disabled={vibes.length === 0}
          onPress={() =>
            router.push({
              pathname: '/results',
              params: { vibes: vibes.join(','), maxPrice: String(maxPrice) },
            })
          }>
          <View style={[styles.cta, vibes.length === 0 && styles.ctaDisabled]}>
            <Text style={[styles.ctaText, vibes.length === 0 && styles.ctaTextDisabled]}>
              {vibes.length === 0 ? 'Pick a vibe first' : 'Crunch it 🎲'}
            </Text>
          </View>
        </PressScale>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { paddingBottom: 24 },
  band: {
    backgroundColor: colors.orange,
    paddingHorizontal: 16,
    paddingBottom: 64,
    gap: 6,
  },
  // White form card that overlaps the orange band by 40px.
  formCard: {
    marginTop: -40,
    marginHorizontal: 16,
    padding: 16,
    gap: 12,
    borderRadius: radii.card,
    backgroundColor: colors.canvas,
    boxShadow: shadows.form,
  },
  cardHint: { color: colors.textSecondary, fontSize: 14, fontFamily: fonts.medium },
  body: { padding: 16, gap: 12 },
  eyebrow: {
    color: colors.orangeInk,
    fontSize: 11,
    fontFamily: fonts.bold,
    letterSpacing: 0.66,
    marginTop: 12,
  },
  eyebrowOnBand: { color: colors.ink, marginTop: 4 },
  hero: { color: colors.ink, ...displayType(44, 44) },
  question: { color: colors.ink, fontSize: 24, lineHeight: 29, fontFamily: fonts.extrabold },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: radii.pill,
    backgroundColor: colors.subtle,
  },
  chipOn: { backgroundColor: colors.ink },
  chipText: { color: colors.ink, fontSize: 13, fontFamily: fonts.medium },
  chipTextOn: { color: colors.onBrand },
  hint: { color: colors.textSecondary, fontSize: 14, fontFamily: fonts.medium, marginTop: -6 },
  prices: { flexDirection: 'row', gap: 8 },
  priceCell: { flex: 1 },
  price: { alignItems: 'center', paddingVertical: 9, borderRadius: radii.pill, backgroundColor: colors.subtle },
  priceSymbol: { color: colors.ink, fontSize: 14, fontFamily: fonts.extrabold },
  priceRange: { color: colors.textSecondary, fontSize: 11, fontFamily: fonts.medium },
  priceRangeOn: { color: colors.onBrand },
  cta: {
    marginTop: 20,
    height: 56,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.ink,
  },
  ctaDisabled: { backgroundColor: colors.subtle },
  ctaText: { color: colors.onBrand, fontSize: 16, fontFamily: fonts.bold },
  ctaTextDisabled: { color: colors.textMuted },
});
