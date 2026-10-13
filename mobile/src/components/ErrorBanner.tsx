import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing, typography } from '../theme';

interface Props {
  message: string;
  onRetry?: () => void;
}

export function ErrorBanner({ message, onRetry }: Props) {
  return (
    <View accessibilityRole="alert" style={styles.banner}>
      <Text style={styles.text}>{message}</Text>
      {onRetry ? (
        <Pressable accessibilityRole="button" onPress={onRetry}>
          <Text style={styles.retry}>Retry</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  banner: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.dangerBg, borderRadius: radii.md, padding: spacing.md, marginBottom: spacing.md },
  text: { ...typography.body, color: colors.danger, flex: 1 },
  retry: { ...typography.label, color: colors.danger, marginLeft: spacing.md },
});
