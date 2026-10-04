/**
 * Light, Uber-inspired palette with orange as the one action color.
 * Mirrors the Figma tokens (tokens-v0.2-light). See DESIGN.md.
 */
export const colors = {
  ink: '#000000',
  textSecondary: '#4b4b4b',
  textMuted: '#6b6b6b',
  canvas: '#ffffff',
  surface: '#f6f6f6',
  elevated: '#eeeeee',
  borderSubtle: '#e8e8e8',
  /** Decorative orange: progress, outlines, large numbers. Not for small text or under white text. */
  orange: '#ff5a00',
  /** Primary CTA fill under white text (4.6:1). */
  orangeStrong: '#d63f00',
  /** Small orange text on white, and the pressed CTA (5.9:1). */
  orangeInk: '#b83a00',
  orangeTint: '#fff1e6',
  onBrand: '#ffffff',
} as const;

export const radii = { sm: 8, md: 12, lg: 16, pill: 999 } as const;

/** Motion values, following the emil-design-eng skill. */
export const motion = {
  easeOut: [0.23, 1, 0.32, 1],
  pressScale: 0.97,
  pressMs: 160,
  enterMs: 220,
  staggerMs: 50,
} as const;
