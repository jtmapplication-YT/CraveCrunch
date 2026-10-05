import { useLocalSearchParams } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import {
  SAMPLE_RESTAURANTS,
  colors,
  radii,
  isHiddenGem,
  motion,
  rankForCrave,
  vibeById,
  type PriceLevel,
  type VibeTagId,
} from '@cravecrunch/core';

import { displayType, fonts } from '@/constants/fonts';

export default function Results() {
  const params = useLocalSearchParams<{ vibes?: string; maxPrice?: string }>();
  const vibes = (params.vibes?.split(',').filter(Boolean) ?? []) as VibeTagId[];
  const maxPrice = Number(params.maxPrice ?? 2) as PriceLevel;

  // TODO: call the web app's /api/crave route for AI picks once it is deployed.
  const picks = rankForCrave(SAMPLE_RESTAURANTS, { vibes, maxPrice, maxDistanceMiles: 5 }).slice(0, 3);

  return (
    <FlatList
      contentContainerStyle={styles.page}
      data={picks}
      keyExtractor={(r) => r.id}
      ListHeaderComponent={<Text style={styles.section}>Best matches</Text>}
      ListFooterComponent={<Text style={styles.note}>Sample data until real restaurants are connected.</Text>}
      renderItem={({ item, index }) => (
        <Animated.View
          entering={FadeInDown.duration(motion.enterMs).delay(index * motion.staggerMs)}
          style={styles.item}>
          <View style={styles.card}>
            {isHiddenGem(item) && <Text style={styles.gem}>💎 Hidden gem</Text>}
            <Text style={styles.name}>{item.name}</Text>
            <View>
              <Text style={styles.meta}>
                {item.vibes.map((v) => vibeById(v)?.emoji).join(' ')} · {item.rating} from {item.reviewCount} reviews
              </Text>
            </View>
          </View>
          {/* One black promo card mid-page breaks up the white. */}
          {index === Math.min(1, picks.length - 1) && (
            <View style={styles.promo}>
              <Text style={styles.promoEyebrow}>💎 GEM HUNTER</Text>
              <Text style={styles.promoTitle}>Know a hole-in-the-wall spot?</Text>
              <Text style={styles.promoBody}>Soon you can add it here and earn the Gem Hunter badge.</Text>
            </View>
          )}
        </Animated.View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  page: { padding: 16, gap: 12 },
  section: { color: colors.ink, fontSize: 24, lineHeight: 29, fontFamily: fonts.extrabold },
  item: { gap: 12 },
  card: {
    backgroundColor: colors.surface,
    borderLeftWidth: 4,
    borderLeftColor: colors.orange,
    borderTopRightRadius: radii.lg,
    borderBottomRightRadius: radii.lg,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    padding: 20,
    gap: 4,
  },
  gem: { color: colors.orangeInk, fontSize: 13, fontFamily: fonts.medium },
  name: { color: colors.ink, ...displayType(24, 30) },
  meta: { color: colors.textSecondary, fontSize: 14, fontFamily: fonts.regular },
  promo: { backgroundColor: colors.ink, borderRadius: radii.card, padding: 18, gap: 6 },
  promoEyebrow: { color: colors.orange, fontSize: 11, fontFamily: fonts.bold, letterSpacing: 0.66 },
  promoTitle: { color: colors.onBrand, ...displayType(24, 30) },
  promoBody: { color: colors.onDarkMuted, fontSize: 14, lineHeight: 21, fontFamily: fonts.regular },
  note: { color: colors.textMuted, fontSize: 12, fontFamily: fonts.medium, marginTop: 8 },
});
