/** Dark neon palette shared by the app and the website. */
export const colors = {
  bg: '#0d0b14',
  surface: '#17131f',
  line: '#2a2336',
  text: '#f1ecf7',
  muted: '#a59bb5',
  purple: '#a855f7',
  pink: '#ec4899',
  blue: '#38bdf8',
  orange: '#fb923c',
} as const;

export const gradients = {
  crave: [colors.purple, colors.pink, colors.orange],
  cool: [colors.blue, colors.purple],
} as const;

/** Motion values, following the emil-design-eng skill. */
export const motion = {
  easeOut: [0.23, 1, 0.32, 1],
  pressScale: 0.97,
  pressMs: 160,
  enterMs: 220,
  staggerMs: 50,
} as const;
