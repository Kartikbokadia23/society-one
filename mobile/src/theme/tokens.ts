/** Design tokens: the only source of colors, spacing and type styles. */
export const colors = {
  primary: '#4F46E5',
  primaryText: '#FFFFFF',
  background: '#F6F7FB',
  surface: '#FFFFFF',
  border: '#E2E5EE',
  text: '#1B1F2A',
  textMuted: '#667085',
  success: '#12805C',
  successBg: '#DDF5EB',
  warning: '#B54708',
  warningBg: '#FEF0C7',
  danger: '#B42318',
  dangerBg: '#FEE4E2',
  info: '#175CD3',
  infoBg: '#D1E9FF',
} as const;

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 } as const;

export const radii = { sm: 6, md: 12, pill: 999 } as const;

export const typography = {
  title: { fontSize: 24, fontWeight: '700' as const, lineHeight: 32 },
  heading: { fontSize: 18, fontWeight: '600' as const, lineHeight: 24 },
  body: { fontSize: 16, fontWeight: '400' as const, lineHeight: 22 },
  caption: { fontSize: 13, fontWeight: '400' as const, lineHeight: 18 },
  label: { fontSize: 14, fontWeight: '600' as const, lineHeight: 20 },
} as const;

export const theme = { colors, spacing, radii, typography };
export type Theme = typeof theme;
