import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { colors, radii, spacing, typography } from '../theme';

interface Props {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  loading?: boolean;
}

export function Button({ title, onPress, variant = 'primary', disabled, loading }: Props) {
  const inactive = disabled || loading;
  const primary = variant === 'primary';
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!inactive }}
      disabled={inactive}
      onPress={onPress}
      style={[styles.base, primary ? styles.primary : styles.secondary, inactive && styles.inactive]}
    >
      {loading ? (
        <ActivityIndicator color={primary ? colors.primaryText : colors.primary} />
      ) : (
        <Text style={[styles.text, { color: primary ? colors.primaryText : colors.primary }]}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { paddingVertical: spacing.md - 4, paddingHorizontal: spacing.lg, borderRadius: radii.md, alignItems: 'center', justifyContent: 'center', minHeight: 48 },
  primary: { backgroundColor: colors.primary },
  secondary: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.primary },
  inactive: { opacity: 0.5 },
  text: typography.label,
});
