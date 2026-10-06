import { StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing, typography } from '../theme/tokens';

export type BadgeTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

const tones: Record<BadgeTone, { bg: string; fg: string }> = {
  neutral: { bg: colors.neutralBg, fg: colors.textMuted },
  success: { bg: colors.successBg, fg: colors.success },
  warning: { bg: colors.warningBg, fg: colors.warning },
  danger: { bg: colors.dangerBg, fg: colors.danger },
  info: { bg: colors.infoBg, fg: colors.info },
};

export function Badge({ label, tone = 'neutral' }: { label: string; tone?: BadgeTone }) {
  return (
    <View style={[styles.badge, { backgroundColor: tones[tone].bg }]}>
      <Text style={[styles.text, { color: tones[tone].fg }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { alignSelf: 'flex-start', borderRadius: radii.pill, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs },
  text: { ...typography.caption, fontWeight: '600' },
});
