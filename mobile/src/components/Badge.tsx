import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../theme/tokens';

type Tone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

const tones: Record<Tone, { bg: string; fg: string }> = {
  neutral: { bg: colors.border, fg: colors.text },
  success: { bg: colors.successBg, fg: colors.success },
  warning: { bg: colors.warningBg, fg: colors.warning },
  danger: { bg: colors.dangerBg, fg: colors.danger },
  info: { bg: colors.infoBg, fg: colors.info },
};

export function Badge({ label, tone = 'neutral' }: { label: string; tone?: Tone }) {
  return (
    <View style={[styles.badge, { backgroundColor: tones[tone].bg }]}>
      <Text style={[styles.text, { color: tones[tone].fg }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { alignSelf: 'flex-start', paddingHorizontal: spacing.sm + 2, paddingVertical: spacing.xs, borderRadius: radius.pill },
  text: { ...typography.caption, fontWeight: '600' },
});
