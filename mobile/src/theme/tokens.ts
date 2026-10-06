// Design tokens: the only source of colors, spacing and typography in the app.
export const colors = {
  primary: '#4F46E5',
  primaryText: '#FFFFFF',
  background: '#F5F6FA',
  surface: '#FFFFFF',
  border: '#E2E4EC',
  text: '#1B1D2A',
  textMuted: '#6B6F85',
  success: '#15803D',
  successBg: '#DCFCE7',
  warning: '#B45309',
  warningBg: '#FEF3C7',
  danger: '#B91C1C',
  dangerBg: '#FEE2E2',
  info: '#1D4ED8',
  infoBg: '#DBEAFE',
  neutralBg: '#ECEEF4',
} as const;

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 } as const;
export const radii = { sm: 6, md: 10, lg: 16, pill: 999 } as const;

export const typography = {
  title: { fontSize: 24, fontWeight: '700', lineHeight: 30 },
  heading: { fontSize: 18, fontWeight: '600', lineHeight: 24 },
  body: { fontSize: 15, fontWeight: '400', lineHeight: 21 },
  label: { fontSize: 13, fontWeight: '600', lineHeight: 18 },
  caption: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
} as const;

export const theme = { colors, spacing, radii, typography };
export type Theme = typeof theme;
