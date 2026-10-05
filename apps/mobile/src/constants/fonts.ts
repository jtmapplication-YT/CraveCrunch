/** Font faces loaded in the root layout. Use these instead of fontWeight. See DESIGN.md. */
export const fonts = {
  /** Bricolage Grotesque 800: logo, screen titles, restaurant names, promo titles. 20px and up only. */
  display: 'BricolageGrotesque_800ExtraBold',
  /** Plus Jakarta Sans: everything else. */
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semibold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
  extrabold: 'PlusJakartaSans_800ExtraBold',
} as const;

/**
 * Display text style. The headline face is set only here and in the root layout,
 * so swapping it is a two-file change. Tracking is -0.02em, as px for React Native.
 */
export function displayType(fontSize: number, lineHeight: number) {
  return { fontFamily: fonts.display, fontSize, lineHeight, letterSpacing: fontSize * -0.02 };
}
