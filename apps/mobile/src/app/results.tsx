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
      ListFooterComponent={<Text style={styles.note}>Sample data until real restaurants are connected.</Text>}
      renderItem={({ item, index }) => (
        <Animated.View
          entering={FadeInDown.duration(motion.enterMs).delay(index * motion.staggerMs)}
          style={styles.card}>
          {isHiddenGem(item) && <Text style={styles.gem}>💎 Hidden gem</Text>}
          <Text style={styles.name}>{item.name}</Text>
          <View>
            <Text style={styles.meta}>
              {item.vibes.map((v) => vibeById(v)?.emoji).join(' ')} · {item.rating} from {item.reviewCount} reviews
            </Text>
          </View>
        </Animated.View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  page: { padding: 16, gap: 12 },
  card: { backgroundColor: colors.canvasSoft, borderRadius: radii.xl, padding: 20, gap: 4 },
  gem: { color: colors.orangeInk, fontSize: 14, fontWeight: '500' },
  name: { color: colors.ink, fontSize: 20, lineHeight: 28, fontWeight: '700' },
  meta: { color: colors.body, fontSize: 14 },
  note: { color: colors.body, fontSize: 12, marginTop: 8 },
});
