import type { ReactNode } from 'react';
import { Pressable, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing } from 'react-native-reanimated';

import { motion } from '@cravecrunch/core';

const easeOut = Easing.bezier(...motion.easeOut);

/** Pressable that scales down slightly on press, so taps feel heard. */
export function PressScale({
  children,
  style,
  ...props
}: PressableProps & { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.get() }] }));

  return (
    <Pressable
      {...props}
      onPressIn={(e) => {
        scale.set(withTiming(motion.pressScale, { duration: motion.pressMs, easing: easeOut }));
        props.onPressIn?.(e);
      }}
      onPressOut={(e) => {
        scale.set(withTiming(1, { duration: motion.pressMs, easing: easeOut }));
        props.onPressOut?.(e);
      }}>
      <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
    </Pressable>
  );
}
