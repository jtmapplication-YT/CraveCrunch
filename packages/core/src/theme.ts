/**
 * Light, Uber-inspired palette with orange as the brand color.
 * Mirrors the design tokens (tokens-v0.4). See DESIGN.md.
 */
export const colors = {
  ink: '#000000',
  textSecondary: '#5e5e5e',
  textMuted: '#6b6b6b',
  canvas: '#ffffff',
  surface: '#f6f6f6',
  elevated: '#eeeeee',
  borderSubtle: '#e8e8e8',
  /** Chips, inputs, secondary pills and icon buttons on white. */
  subtle: '#efefef',
  /** Inputs and answer tiles inside a white card. */
  softer: '#f3f3f3',
  pressed: '#e2e2e2',
  /** Body text on black promo cards. */
  onDarkMuted: '#cfcfcf',
  /** Decorative orange: progress, outlines, large numbers. Not for small text or under white text. */
  orange: '#ff5a00',
  /** Primary CTA fill under white text (4.6:1). */
  orangeStrong: '#d63f00',
  /** Small orange text on white, and the pressed CTA (5.9:1). */
  orangeInk: '#b83a00',
  orangeTint: '#fff1e6',
  onBrand: '#ffffff',
} as const;

export const radii = { sm: 8, md: 12, lg: 16, pill: 999, input: 8, card: 16 } as const;

/** Cards are flat. Shadows only for things floating over content, and the form card. */
export const shadows = {
  float: '0 2px 8px rgba(0,0,0,0.16)',
  form: '0 4px 16px rgba(0,0,0,0.16)',
} as const;

/** Motion values, following the emil-design-eng skill. */
export const motion = {
  easeOut: [0.23, 1, 0.32, 1],
  pressScale: 0.97,
  pressMs: 160,
  enterMs: 220,
  staggerMs: 50,
} as const;
