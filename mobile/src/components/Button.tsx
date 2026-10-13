import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { colors, radius, spacing, typography } from '../theme/tokens';

type Props = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  loading?: boolean;
};

export function Button({ title, onPress, variant = 'primary', disabled, loading }: Props) {
  const inactive = disabled || loading;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!inactive }}
      disabled={inactive}
      onPress={onPress}
      style={[styles.base, styles[variant], inactive && styles.inactive]}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'secondary' ? colors.primary : colors.onPrimary} />
      ) : (
        <Text style={[styles.text, variant === 'secondary' && styles.textSecondary]}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { paddingVertical: spacing.md - 4, paddingHorizontal: spacing.lg, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center', minHeight: 48 },
  primary: { backgroundColor: colors.primary },
  secondary: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.primary },
  danger: { backgroundColor: colors.danger },
  inactive: { opacity: 0.5 },
  text: { ...typography.label, color: colors.onPrimary },
  textSecondary: { color: colors.primary },
});
