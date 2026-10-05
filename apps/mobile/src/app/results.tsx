import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import {
  colors,
  radii,
  isHiddenGem,
  motion,
  rankForCrave,
  restaurantMeta,
  type PriceLevel,
  type VibeTagId,
} from '@cravecrunch/core';

import { displayType, fonts } from '@/constants/fonts';
import { useRestaurants } from '@/hooks/use-restaurants';

export default function Results() {
  const params = useLocalSearchParams<{ vibes?: string; maxPrice?: string }>();
  const vibes = (params.vibes?.split(',').filter(Boolean) ?? []) as VibeTagId[];
  const maxPrice = Number(params.maxPrice ?? 2) as PriceLevel;

  const list = useRestaurants();

  if (!list) return <ActivityIndicator style={styles.loading} color={colors.ink} />;

  // TODO: call the web app's /api/crave route for AI picks once it is deployed.
  const picks = rankForCrave(list.restaurants, { vibes, maxPrice, maxDistanceMiles: 5 }).slice(0, 3);
  const note = list.sample
    ? 'Sample data until real restaurants are connected.'
    : 'Winnipeg spots from our starter list, still being verified. Check allergies with the restaurant.';

  return (
    <FlatList
      contentContainerStyle={styles.page}
      data={picks}
      keyExtractor={(r) => r.id}
      ListHeaderComponent={<Text style={styles.section}>Best matches</Text>}
      ListFooterComponent={<Text style={styles.note}>{note}</Text>}
      renderItem={({ item, index }) => (
        <Animated.View
          entering={FadeInDown.duration(motion.enterMs).delay(index * motion.staggerMs)}
          style={styles.item}>
          <View style={styles.card}>
            {isHiddenGem(item) && <Text style={styles.gem}>💎 Hidden gem</Text>}
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.meta}>{restaurantMeta(item)}</Text>
            {item.blurb && <Text style={styles.blurb}>{item.blurb}</Text>}
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
  loading: { marginTop: 48 },
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
  blurb: { color: colors.ink, fontSize: 14, lineHeight: 21, fontFamily: fonts.regular },
  promo: { backgroundColor: colors.ink, borderRadius: radii.card, padding: 18, gap: 6 },
  promoEyebrow: { color: colors.orange, fontSize: 11, fontFamily: fonts.bold, letterSpacing: 0.66 },
  promoTitle: { color: colors.onBrand, ...displayType(24, 30) },
  promoBody: { color: colors.onDarkMuted, fontSize: 14, lineHeight: 21, fontFamily: fonts.regular },
  note: { color: colors.textMuted, fontSize: 12, fontFamily: fonts.medium, marginTop: 8 },
});
