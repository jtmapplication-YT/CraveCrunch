/** Light, Uber-inspired palette with Crave Orange as the one accent. See DESIGN.md. */
export const colors = {
  ink: '#000000',
  body: '#5e5e5e',
  mute: '#afafaf',
  canvas: '#ffffff',
  canvasSoft: '#efefef',
  canvasSofter: '#f3f3f3',
  surfacePressed: '#e2e2e2',
  /** Primary CTA fill. Put ink text on it, never white. */
  orange: '#ff6b00',
  /** Orange text on white (gem badge, links). */
  orangeInk: '#c2410c',
  orangeSoft: '#fff1e6',
  onDark: '#ffffff',
} as const;

export const radii = { md: 8, xl: 16, pill: 999 } as const;

/** Motion values, following the emil-design-eng skill. */
export const motion = {
  easeOut: [0.23, 1, 0.32, 1],
  pressScale: 0.97,
  pressMs: 160,
  enterMs: 220,
  staggerMs: 50,
} as const;
